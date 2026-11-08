const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
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

  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  console.log(`HTTP server listening on http://127.0.0.1:${PORT}`);

  const CHROME_PORT = 9248;
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = path.join(process.env.TEMP, 'chrome-o0-' + Date.now());
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
  await sendSession('Emulation.setDeviceMetricsOverride', {
    width: 960,
    height: 540,
    deviceScaleFactor: 1,
    mobile: false
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
  await new Promise(r => setTimeout(r, 500));

  // Run measurement inside page
  const metricsResult = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.spBuild();
      
      let totalTris = 0;
      let meshCount = 0;
      let pointsCount = 0;
      let instancedMeshCount = 0;
      
      const textures = new Set();
      
      function audit(obj) {
        if (!obj) return;
        if (obj.isMesh || obj.isPoints || obj.isInstancedMesh) {
          if (obj.isMesh) meshCount++;
          if (obj.isPoints) pointsCount++;
          if (obj.isInstancedMesh) instancedMeshCount++;
          
          if (obj.geometry) {
            const geo = obj.geometry;
            let tris = 0;
            if (geo.index) tris = geo.index.count / 3;
            else if (geo.attributes && geo.attributes.position) tris = geo.attributes.position.count / 3;
            if (obj.isInstancedMesh && obj.count) tris *= obj.count;
            totalTris += Math.round(tris);
          }
          if (obj.material) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const m of mats) {
              if (m.map) textures.add(m.map);
              if (m.emissiveMap) textures.add(m.emissiveMap);
            }
          }
        }
        if (obj.children) {
          for (const c of obj.children) audit(c);
        }
      }
      audit(g.spGroup);
      
      let texMemoryBytes = 0;
      for (const t of textures) {
        if (t.image && t.image.width && t.image.height) {
          texMemoryBytes += t.image.width * t.image.height * 4;
        }
      }
      
      // spLights and local light groups
      let spLightCount = 0;
      for (const grp of g.spGroup.children) {
        // check lights in spGroup
      }
      const poolPointLights = 12; // fixed pool size
      const poolSpotLights = 2;
      
      return {
        totalTris,
        meshCount,
        pointsCount,
        instancedMeshCount,
        drawCallsEstimate: meshCount + pointsCount + instancedMeshCount,
        uniqueTextures: textures.size,
        texMemoryMB: (texMemoryBytes / (1024 * 1024)).toFixed(2),
        poolPointLights,
        poolSpotLights
      };
    })()`,
    returnByValue: true
  });

  console.log('O0 Metrics Result:', metricsResult.result.value);

  async function takeScreenshot(name) {
    const { data } = await sendSession('Page.captureScreenshot', { format: 'png' });
    const outPath = path.join(__dirname, '..', 'captures', `${name}.png`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, Buffer.from(data, 'base64'));
    console.log(`Captured ${name}.png`);
  }

  // Measure viewpoints
  const viewpoints = [
    {
      name: 'o0_gate_runway',
      desc: 'Gate end of the runway looking east toward outpost',
      setup: `const g = document.getElementById("app")._game;
        g.ufoWarp('runway');
        g.ufoExit();
        g.Nn.position.set(g.SP.ax - 190, g.SP.py + 1.7, g.SP.az + 99);
        g.Nn.lookAt(g.SP.ax - 40, g.SP.py + 4, g.SP.az + 60);`
    },
    {
      name: 'o0_runway_150m',
      desc: 'Runway at 150m from gate',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax - 50, g.SP.py + 1.7, g.SP.az + 99);
        g.Nn.lookAt(g.SP.ax - 40, g.SP.py + 4, g.SP.az + 60);`
    },
    {
      name: 'o0_pump_court_3m',
      desc: 'Pump Court at 3m',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax - 45, g.SP.py + 1.7, g.SP.az + 48 + 3);
        g.Nn.lookAt(g.SP.ax - 45, g.SP.py + 1.8, g.SP.az + 48);`
    },
    {
      name: 'o0_nova_nosh',
      desc: 'Nova Nosh from 12m',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax + 23, g.SP.py + 1.7, g.SP.az + 56);
        g.Nn.lookAt(g.SP.ax + 23, g.SP.py + 2.5, g.SP.az + 44);`
    },
    {
      name: 'o0_drift_inn',
      desc: 'Drift Inn from 25m',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax + 72, g.SP.py + 1.7, g.SP.az + 10);
        g.Nn.lookAt(g.SP.ax + 80, g.SP.py + 12, g.SP.az - 14);`
    },
    {
      name: 'o0_deck_centre_0deg',
      desc: 'Deck centre facing North (0 deg)',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax, g.SP.py + 1.7, g.SP.az);
        g.Nn.lookAt(g.SP.ax, g.SP.py + 1.7, g.SP.az - 50);`
    },
    {
      name: 'o0_deck_centre_90deg',
      desc: 'Deck centre facing East (90 deg)',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax, g.SP.py + 1.7, g.SP.az);
        g.Nn.lookAt(g.SP.ax + 50, g.SP.py + 1.7, g.SP.az);`
    },
    {
      name: 'o0_deck_centre_180deg',
      desc: 'Deck centre facing South (180 deg)',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax, g.SP.py + 1.7, g.SP.az);
        g.Nn.lookAt(g.SP.ax, g.SP.py + 1.7, g.SP.az + 50);`
    },
    {
      name: 'o0_deck_centre_270deg',
      desc: 'Deck centre facing West (270 deg)',
      setup: `const g = document.getElementById("app")._game;
        g.Nn.position.set(g.SP.ax, g.SP.py + 1.7, g.SP.az);
        g.Nn.lookAt(g.SP.ax - 50, g.SP.py + 1.7, g.SP.az);`
    }
  ];

  for (const vp of viewpoints) {
    await sendSession('Runtime.evaluate', { expression: `(function(){ ${vp.setup} })()` });
    await new Promise(r => setTimeout(r, 600));
    await takeScreenshot(vp.name);
  }

  console.log('O0 baseline captures and measurements completed successfully!');
  chrome.kill();
  server.close();
  process.exit(0);
}

main().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
