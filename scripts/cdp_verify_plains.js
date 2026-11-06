const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const PORT = 8092;
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
    '--remote-debugging-port=9225',
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
      const res = await fetch('http://127.0.0.1:9225/json/version');
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

  console.log('Waiting for game initialization...');
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

  if (!gameReady) throw new Error('Game did not initialize in time');
  console.log('Game initialized successfully!');

  // Define verification poses across Great Plains & baselines
  const poses = [
    { name: 'sunset_baseline', x: 0, y: 1.7, z: 10, lookX: 0, lookY: 2.5, lookZ: -12 },
    { name: 'starlite_baseline', x: 4600, y: 1.7, z: 12, lookX: 4600, lookY: 2.5, lookZ: -12 },
    { name: 'plains_hinge_crest', x: 45000, y: 1.7, z: 0, lookX: 45500, lookY: 14.0, lookZ: 0 },
    { name: 'plains_grain_elevator', x: 52400, y: 1.7, z: -15, lookX: 52400, lookY: 15.0, lookZ: -70 },
    { name: 'plains_windmill_tank', x: 57000, y: 1.7, z: 20, lookX: 57000, lookY: 6.0, lookZ: 95 },
    { name: 'harvest_moon_road_approach', x: 64520, y: 1.7, z: 0, lookX: 64570, lookY: 7.5, lookZ: -14 },
    { name: 'harvest_moon_field_screen', x: 64610, y: 1.7, z: -100, lookX: 64620, lookY: 10.0, lookZ: -62 },
    { name: 'harvest_moon_concession_lamp', x: 64600, y: 1.7, z: -130, lookX: 64600, lookY: 2.2, lookZ: -135 },
    { name: 'plains_east_terminus', x: 84000, y: 1.7, z: 0, lookX: 84500, lookY: 1.7, lookZ: 0 }
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
          const groundY = g.os(${pose.x}, ${pose.z});
          g.Nn.position.set(${pose.x}, groundY + ${pose.y}, ${pose.z});
          g.Nn.lookAt(${pose.lookX}, ${pose.lookY}, ${pose.lookZ});
          if (typeof recenterDesert === 'function') recenterDesert(${pose.x}, ${pose.z}, Infinity);
          if (g.updateTelephoneLine) g.updateTelephoneLine(${pose.x});
          if (g.updateForestPool) g.updateForestPool(${pose.x});
          if (g.updateMileposts) g.updateMileposts(${pose.x});
          if (g.updatePlainsStreaming) g.updatePlainsStreaming(${pose.x}, ${pose.z}, ${t.elapsed});
          window._forceElapsed = ${t.elapsed};
          window._forceClock = ${t.clock};
        })()`,
        awaitPromise: true
      });

      // Warm up
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

      // Save screenshot for key scenes
      if (['harvest_moon_road_approach', 'harvest_moon_field_screen', 'plains_grain_elevator', 'plains_windmill_tank', 'plains_hinge_crest'].includes(pose.name)) {
        const { data: b64 } = await sendSession('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
        const imgPath = path.join(__dirname, '..', 'captures', `plains_${pose.name}_${t.name}.jpg`);
        fs.writeFileSync(imgPath, Buffer.from(b64, 'base64'));
        console.log(`  Captured screenshot: captures/plains_${pose.name}_${t.name}.jpg`);
      }
    }
  }

  // Precision check at 46000, 64600, 84000
  const { result: precisionTest } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const testPoints = [46000, 64600, 84000];
      const out = {};
      for (const px of testPoints) {
        const y = g.os(px, 0);
        const roadY = g.us66RoadY(px);
        const gust = g.plainsGust(px, 0, 10);
        const surf = g.carSurfaceAt(px, 0);
        out[px] = { y, roadY, gust, surf };
      }
      return out;
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('Precision & Determinism Results:', JSON.stringify(precisionTest.value, null, 2));

  // Write verification record
  fs.writeFileSync(path.join(__dirname, '..', 'captures', 'plains_verification_results.json'), JSON.stringify({ results, precisionTest: precisionTest.value }, null, 2));

  ws.close();
  chrome.kill();
  server.close();
  console.log('Great Plains verification finished successfully!');
}

main().catch(e => {
  console.error('Plains verification failed:', e);
  process.exit(1);
});

