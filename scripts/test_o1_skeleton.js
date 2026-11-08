const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const server = http.createServer((req, res) => {
    let rawPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, '..', rawPath === '/' ? 'index.html' : rawPath);
    if (!fs.existsSync(filePath)) { res.writeHead(404); res.end('Not found'); return; }
    const ext = path.extname(filePath);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });

  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;

  const CHROME_PORT = 9256;
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = path.join(process.env.TEMP, 'chrome-o1-' + Date.now());
  const chrome = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${CHROME_PORT}`,
    '--disable-gpu-watchdog',
    '--window-size=960,540',
    '--disable-background-networking',
    '--no-default-browser-check',
    '--user-data-dir=' + profileDir,
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch(`http://127.0.0.1:${CHROME_PORT}/json/version`);
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }
  if (!wsUrl) throw new Error('Could not connect to Chrome debugging port');

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });

  let msgId = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  const { targetId } = await send('Target.createTarget', { url: `http://127.0.0.1:${PORT}/index.html` });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

  function sendSession(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = msgId++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, sessionId, method, params }));
    });
  }

  await sendSession('Page.enable');
  await sendSession('Runtime.enable');

  const consoleLogs = [];
  ws.addEventListener('message', (event) => {
    try {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push(msg.params.args.map(a => a.value || a.description).join(' '));
      } else if (msg.method === 'Runtime.exceptionThrown') {
        console.error('PAGE EXCEPTION:', msg.params.exceptionDetails);
      }
    } catch (e) {}
  });

  console.log('Waiting for game to initialize...');
  let ready = false;
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 250));
    try {
      const { result } = await sendSession('Runtime.evaluate', {
        expression: '!!(document.getElementById("app") && document.getElementById("app")._game && window._shadersReady !== false)',
        returnByValue: true
      });
      if (result.value) { ready = true; break; }
    } catch (e) {}
  }
  if (!ready) throw new Error('Game did not initialize in time');

  // Dismiss entry overlay
  await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const btn = document.getElementById('cursor-entry');
      if (btn) btn.click();
    })()`
  });
  await new Promise(r => setTimeout(r, 400));

  // Test warps and walking
  const testResult = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.spBuild();
      
      // 1. Check warps list
      const warps = g.ufoWarpList();
      const hasMain = warps.some(w => w.special === 'main');
      const hasPlaza = warps.some(w => w.special === 'plaza');
      
      // 2. Test warping to Main Street on foot
      g.ufoWarp('main');
      g.ufoExit();
      const pMain = { x: g.Nn.position.x, y: g.Nn.position.y, z: g.Nn.position.z };
      
      // 3. Test warping to The Plaza
      g.ufoWarp('plaza');
      const pPlaza = { x: g.Nn.position.x, y: g.Nn.position.y, z: g.Nn.position.z };
      
      // 4. Test walking from Runway gate to Drift Inn
      // Path waypoints along the strip
      const waypoints = [
        { x: g.SP.ax - 190, z: g.SP.az + 99 },   // runway
        { x: g.SP.ax - 125, z: g.SP.az + 85 },   // gate arch center
        { x: g.SP.ax - 40,  z: g.SP.az + 85 },   // taxiway junction
        { x: g.SP.ax - 40,  z: g.SP.az + 42 },   // Main street west
        { x: g.SP.ax - 20,  z: g.SP.az + 42 },   // Main street center
        { x: g.SP.ax + 12,  z: g.SP.az + 42 },   // Main street mid
        { x: g.SP.ax + 12,  z: g.SP.az + 10 },   // Plaza
        { x: g.SP.ax + 55,  z: g.SP.az + 10 },   // Quiet side path
        { x: g.SP.ax + 72.5, z: g.SP.az - 1.5 }  // Drift Inn bell podium front
      ];
      
      let collisions = 0;
      let hitDetails = [];
      // Step along the path and test collider bounds
      for (let w = 0; w < waypoints.length - 1; w++) {
        const p0 = waypoints[w], p1 = waypoints[w + 1];
        const steps = 20;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const x = p0.x + (p1.x - p0.x) * t;
          const z = p0.z + (p1.z - p0.z) * t;
          const y = g.SP.py + 1.7;
          // check if inside any Mc box
          for (const box of g.Mc || []) {
            if (box && x >= box.minX && x <= box.maxX && z >= box.minZ && z <= box.maxZ && y >= box.minY && y <= box.maxY) {
              collisions++;
              hitDetails.push({ relX: x - g.SP.ax, relZ: z - g.SP.az, box: { minX: box.minX - g.SP.ax, maxX: box.maxX - g.SP.ax, minZ: box.minZ - g.SP.az, maxZ: box.maxZ - g.SP.az } });
            }
          }
        }
      }
      
      return {
        warpCount: warps.length,
        hasMain,
        hasPlaza,
        pMain,
        pPlaza,
        walkingCollisions: collisions,
        hitDetails,
        deckExists: !!g.spGroup.userData.deck
      };
    })()`,
    returnByValue: true
  });

  console.log('O1 Test Result full:', JSON.stringify(testResult, null, 2));
  console.log('O1 Test Result:', testResult.result ? testResult.result.value : null);

  chrome.kill();
  server.close();
  process.exit(testResult.result.value.walkingCollisions === 0 && testResult.result.value.hasMain && testResult.result.value.hasPlaza ? 0 : 1);
}

main().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
