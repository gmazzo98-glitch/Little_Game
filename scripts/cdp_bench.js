const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const PORT = 8089;
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
  const profileDir = path.join(process.env.TEMP, 'chrome-bench-' + Date.now());
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu-watchdog',
    '--window-size=960,540',
    '--disable-background-networking',
    '--no-default-browser-check',
    '--user-data-dir=' + profileDir,
    'about:blank'
  ]);

  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise(r => setTimeout(r, 200));
    try {
      const res = await fetch('http://127.0.0.1:9223/json/version');
      const data = await res.json();
      wsUrl = data.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  if (!wsUrl) {
    throw new Error('Could not connect to Chrome debugging port');
  }
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

  // Create new target / page
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
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 960,
    height: 540,
    deviceScaleFactor: 1,
    mobile: false
  });

  console.log('Waiting for page load and _game export...');
  let gameReady = false;
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 250));
    try {
      const { result } = await sendSession('Runtime.evaluate', {
        expression: '!!(document.getElementById("app") && document.getElementById("app")._game)',
        returnByValue: true
      });
      if (result.value) {
        gameReady = true;
        break;
      }
    } catch (e) {}
  }

  if (!gameReady) {
    throw new Error('Game did not initialize in time');
  }
  console.log('Game initialized successfully!');

  // Measure baseline poses:
  // 1. Sunset Service
  // 2. Starlite Diner
  // 3. SR 14 Fork
  // Times: dusk (clock 18.0 / elapsedTime 2), blue hour (120), night (305)
  const poses = [
    { name: 'sunset', x: 0, y: 1.7, z: 10, lookX: 0, lookY: 2.5, lookZ: -12 },
    { name: 'starlite', x: 4600, y: 1.7, z: 12, lookX: 4600, lookY: 2.5, lookZ: -12 },
    { name: 'sr14_fork', x: -9600, y: 1.7, z: 12, lookX: -9620, lookY: 2.5, lookZ: -12 }
  ];

  const times = [
    { name: 'dusk', elapsed: 2, clock: 18.0 },
    { name: 'blue_hour', elapsed: 120, clock: 19.5 },
    { name: 'night', elapsed: 305, clock: 22.0 }
  ];

  const results = [];

  for (const pose of poses) {
    for (const t of times) {
      console.log(`Setting pose ${pose.name} at ${t.name}...`);
      await sendSession('Runtime.evaluate', {
        expression: `(function() {
          const g = document.getElementById("app")._game;
          g.Nn.position.set(${pose.x}, g.os(${pose.x}, ${pose.z}) + ${pose.y}, ${pose.z});
          g.Nn.lookAt(${pose.lookX}, ${pose.lookY}, ${pose.lookZ});
          if (typeof recenterDesert === 'function') recenterDesert(${pose.x}, ${pose.z}, Infinity);
          if (g.updateTelephoneLine) g.updateTelephoneLine(${pose.x});
          if (g.updateForestPool) g.updateForestPool(${pose.x}, ${pose.z});
          if (g.updateMileposts) g.updateMileposts(${pose.x});
          // Set elapsed / clock
          window._forceElapsed = ${t.elapsed};
          window._forceClock = ${t.clock};
        })()`,
        awaitPromise: true
      });

      // Warm up 10 frames
      await sendSession('Runtime.evaluate', {
        expression: `new Promise(r => {
          let count = 0;
          function f() { if (++count > 10) r(); else requestAnimationFrame(f); }
          requestAnimationFrame(f);
        })`,
        awaitPromise: true
      });

      // Measure 60 frames
      const { result: benchRes } = await sendSession('Runtime.evaluate', {
        expression: `new Promise(r => {
          const times = [];
          let last = performance.now();
          function f() {
            const now = performance.now();
            times.push(now - last);
            last = now;
            if (times.length >= 60) {
              times.sort((a,b) => a - b);
              const median = times[Math.floor(times.length * 0.5)];
              const p95 = times[Math.floor(times.length * 0.95)];
              r({ median, p95 });
            } else {
              requestAnimationFrame(f);
            }
          }
          requestAnimationFrame(f);
        })`,
        awaitPromise: true,
        returnByValue: true
      });

      console.log(`  -> ${pose.name} (${t.name}): median ${benchRes.value.median.toFixed(2)} ms, p95 ${benchRes.value.p95.toFixed(2)} ms`);
      results.push({ pose: pose.name, time: t.name, ...benchRes.value });

      // Capture screenshot
      const { data: b64 } = await sendSession('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
      const imgPath = path.join(__dirname, '..', 'captures', `baseline_${pose.name}_${t.name}.jpg`);
      fs.writeFileSync(imgPath, Buffer.from(b64, 'base64'));
    }
  }

  // Also verify current east of Starlite
  const { result: eastCheck } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const h_starlite = g.os(4600, 0);
      const h_east10k = g.os(10000, 0);
      const h_east20k = g.os(20000, 0);
      const h_east46k = g.os(46000, 0);
      const h_east64k = g.os(64600, 0);
      const surf_road = g.carSurfaceAt(46000, 0);
      const surf_shoulder = g.carSurfaceAt(46000, 4.5);
      const surf_desert = g.carSurfaceAt(46000, 15);
      return {
        heights: { h_starlite, h_east10k, h_east20k, h_east46k, h_east64k },
        surfaces: { surf_road, surf_shoulder, surf_desert }
      };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('East check baseline:', JSON.stringify(eastCheck.value, null, 2));

  // Write summary
  fs.writeFileSync(path.join(__dirname, '..', 'captures', 'baseline_p0_results.json'), JSON.stringify({ results, eastCheck: eastCheck.value }, null, 2));

  ws.close();
  chrome.kill();
  server.close();
  console.log('Baseline benchmark finished successfully!');
}

main().catch(e => {
  console.error('Benchmark failed:', e);
  process.exit(1);
});

