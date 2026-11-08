// Clip test script for Little Saucer cabin vertices
// Verifies that every cabin vertex above the dome base (y > UFO_DOME.cy)
// lies inside the canopy ellipsoid with at least 5 cm margin.
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

  const CHROME_PORT = 9246;
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = path.join(process.env.TEMP, 'chrome-clip-test-' + Date.now());
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
    } catch (e) { }
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

  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 250));
    try {
      const { result } = await sendSession('Runtime.evaluate', {
        expression: '!!(document.getElementById("app") && document.getElementById("app")._game)',
        returnByValue: true
      });
      if (result.value) break;
    } catch (e) { }
  }

  const evalRes = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const D = g.UFO_DOME;
      const ship = g.ufoShip;
      const cabin = ship.children[1]; // ufoCabin is index 1
      
      let meshesChecked = 0;
      let totalVertices = 0;
      let aboveBaseVertices = 0;
      let failures = [];
      let minMargin = 999;
      
      // We check all descendant meshes in cabin except the canopy assembly (indices 0..5)
      for (let cIdx = 6; cIdx < cabin.children.length; cIdx++) {
        const root = cabin.children[cIdx];
        root.traverse(obj => {
          if (!obj.isMesh || !obj.geometry) return;
          meshesChecked++;
          obj.updateWorldMatrix(true, false);
          cabin.updateWorldMatrix(true, false);
          
          const m = obj.matrixWorld.clone().premultiply(cabin.matrixWorld.clone().invert());
          const pos = obj.geometry.attributes.position;
          if (!pos) return;
          
          for (let i = 0; i < pos.count; i++) {
            totalVertices++;
            const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i);
            const e = m.elements;
            const x = e[0]*vx + e[4]*vy + e[8]*vz + e[12];
            const y = e[1]*vx + e[5]*vy + e[9]*vz + e[13];
            const z = e[2]*vx + e[6]*vy + e[10]*vz + e[14];
            
            if (y > D.cy) {
              aboveBaseVertices++;
              const dirX = x - D.cx, dirY = y - D.cy, dirZ = z - D.cz;
              const distCenter = Math.hypot(dirX, dirY, dirZ);
              if (distCenter > 1e-4) {
                const uX = dirX / distCenter, uY = dirY / distCenter, uZ = dirZ / distCenter;
                const R_ell = 1.0 / Math.sqrt((uX/D.rx)**2 + (uY/D.ry)**2 + (uZ/D.rz)**2);
                const margin = R_ell - distCenter;
                if (margin < minMargin) minMargin = margin;
                if (margin < 0.05) {
                  failures.push({
                    mesh: obj.name || obj.type,
                    localPos: [vx, vy, vz],
                    cabinPos: [x, y, z],
                    margin,
                    distCenter,
                    R_ell
                  });
                }
              }
            }
          }
        });
      }
      
      return {
        meshesChecked,
        totalVertices,
        aboveBaseVertices,
        failuresCount: failures.length,
        minMarginMeters: minMargin,
        failures: failures.slice(0, 5)
      };
    })()`,
    returnByValue: true
  });

  console.log('CLIP TEST RESULT:');
  console.log(JSON.stringify(evalRes.result.value, null, 2));

  chrome.kill();
  server.close();
  process.exit(evalRes.result.value.failuresCount > 0 ? 1 : 0);
}

main().catch(err => {
  console.error('ERROR:', err);
  process.exit(1);
});
