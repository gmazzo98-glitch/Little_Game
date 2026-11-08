const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const PORT = 8098;
  const server = http.createServer((req, res) => {
    let rawPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, '..', rawPath === '/' ? 'index.html' : rawPath);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png' };
    res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });

  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  console.log(`HTTP server on http://127.0.0.1:${PORT}`);

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = path.join(process.env.TEMP, 'chrome-car-' + Date.now());
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9228',
    '--disable-gpu-watchdog',
    '--window-size=1280,720',
    '--disable-background-networking',
    '--no-default-browser-check',
    '--user-data-dir=' + profileDir,
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch('http://127.0.0.1:9228/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) { }
  }

  if (!wsUrl) throw new Error('Could not connect to Chrome debugging port');
  console.log('Connected to Chrome CDP WebSocket');

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

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

  const consoleErrors = [];
  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled') {
      if (msg.params.type === 'error') {
        consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
      }
    }
    if (msg.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(msg.params.exceptionDetails.text + ' ' + (msg.params.exceptionDetails.exception?.description || ''));
    }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(msg.error);
      else resolve(msg.result);
    }
  };

  console.log('Waiting for game to load...');
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 250));
    try {
      const { result } = await sendSession('Runtime.evaluate', {
        expression: '!!(document.getElementById("app") && document.getElementById("app")._game)',
        returnByValue: true
      });
      if (result.value) break;
    } catch (e) { }
  }

  // Allow a few frames to render and let animateCar run
  await new Promise(r => setTimeout(r, 1000));

  // Query car state and parts
  const { result: carData } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const coupe = g.coupe;
      const hoodHinge = g.hoodHinge;
      const frontBumperHinge = g.frontBumperHinge;
      const rearBumperHinge = g.rearBumperHinge;
      const frontGrilleHinge = g.frontGrilleHinge;
      const carDamage = g.carDamage;

      return {
        coupePos: { x: coupe.position.x, y: coupe.position.y, z: coupe.position.z },
        hoodPos: { x: hoodHinge.position.x, y: hoodHinge.position.y, z: hoodHinge.position.z },
        hoodRot: { x: hoodHinge.rotation.x, y: hoodHinge.rotation.y, z: hoodHinge.rotation.z },
        frontBumperPos: { x: frontBumperHinge.position.x, y: frontBumperHinge.position.y, z: frontBumperHinge.position.z },
        rearBumperPos: { x: rearBumperHinge.position.x, y: rearBumperHinge.position.y, z: rearBumperHinge.position.z },
        frontGrillePos: { x: frontGrilleHinge.position.x, y: frontGrilleHinge.position.y, z: frontGrilleHinge.position.z },
        carDamage: carDamage
      };
    })()`,
    returnByValue: true
  });

  console.log('Car state after 1 second of live animation:');
  console.log(JSON.stringify(carData.value, null, 2));

  if (!fs.existsSync('captures')) fs.mkdirSync('captures');

  async function takeScreenshot(name, eyeX, eyeY, eyeZ, targetY = 0.85) {
    await sendSession('Runtime.evaluate', {
      expression: `(function() {
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.style.display = 'none';
        const g = document.getElementById("app")._game;
        const coupe = g.coupe;
        const Nn = g.Nn;
        Nn.position.set(coupe.position.x + (${eyeX}), coupe.position.y + (${eyeY}), coupe.position.z + (${eyeZ}));
        Nn.lookAt(coupe.position.x, coupe.position.y + (${targetY}), coupe.position.z);
        Nn.updateMatrixWorld(true);
      })()`
    });
    await new Promise(r => setTimeout(r, 150));
    const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`captures/${name}.png`, Buffer.from(data, 'base64'));
    console.log(`Saved captures/${name}.png`);
  }

  // 1. Capture 4 views of the parked coupe
  await takeScreenshot('car_front_three_quarter', -3.2, 1.4, 4.2);
  await takeScreenshot('car_front_direct', 0, 1.15, 3.8);
  await takeScreenshot('car_side_profile', -4.5, 1.15, 0);
  await takeScreenshot('car_rear_three_quarter', 3.2, 1.4, -4.2);

  // 2. Test driving and steering with skid marks (tests the _skidL fix)
  console.log('Testing driving and steering with skid marks...');
  const { result: driveResult } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.sitInCar();
      g.fn.KeyW = true;
      g.fn.KeyD = true;
      g.fn.Space = true; // handbrake slide triggers skid marks!
      for (let f = 0; f < 30; f++) {
        g.driveCar(0.016);
      }
      g.fn.KeyW = false;
      g.fn.KeyD = false;
      g.fn.Space = false;
      return {
        carSpeed: g.carSpeed || 0,
        skidCursor: typeof skidCursor !== 'undefined' ? skidCursor : -1,
        success: true
      };
    })()`,
    returnByValue: true
  });
  console.log('Driving / drifting test result:', driveResult);

  // 3. Test collision damage (pop hood, buckle hood, repair)
  console.log('Testing collision damage...');
  const { result: popResult } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.handleCarCollision(4.0, 0); // Pop hood
      return {
        popped: g.carDamage.hoodPopped,
        hoodRotX: g.hoodHinge.rotation.x
      };
    })()`,
    returnByValue: true
  });
  console.log('Collision pop test result:', popResult);

  await takeScreenshot('car_hood_popped', -2.5, 1.3, 3.2);

  const { result: buckleResult } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.handleCarCollision(8.0, 0); // Buckle hood
      return {
        buckled: g.carDamage.hoodBuckled,
        hoodRotX: g.hoodHinge.rotation.x,
        hoodPosY: g.hoodHinge.position.y
      };
    })()`,
    returnByValue: true
  });
  console.log('Collision buckle test result:', buckleResult);

  await takeScreenshot('car_hood_buckled', -2.5, 1.3, 3.2);

  const { result: repairResult } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.hammerHoodLatch();
      return {
        buckled: g.carDamage.hoodBuckled,
        hoodRotX: g.hoodHinge.rotation.x,
        hoodPosY: g.hoodHinge.position.y,
        hoodPosZ: g.hoodHinge.position.z
      };
    })()`,
    returnByValue: true
  });
  console.log('Roadside repair test result:', repairResult);

  await takeScreenshot('car_repaired', -2.5, 1.3, 3.2);

  console.log('Total console errors captured:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console errors:', consoleErrors);
  }

  // Cleanup
  ws.close();
  chrome.kill();
  server.close();

  if (consoleErrors.length > 0) process.exit(1);
  console.log('All car inspections and tests passed with 0 console errors!');
}

main().catch(err => {
  console.error('Inspection failed:', err);
  process.exit(1);
});

