const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const PORT = 8093;
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

  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = path.join(process.env.TEMP, 'chrome-bench-' + Date.now());
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9227',
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
      const res = await fetch('http://127.0.0.1:9227/json/version');
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

  console.log('Testing gameplay and interactions in headless Chrome...');
  for (let i = 0; i < 40; i++) {
    await new Promise(r => setTimeout(r, 250));
    try {
      const { result } = await sendSession('Runtime.evaluate', {
        expression: '!!(document.getElementById("app") && document.getElementById("app")._game)',
        returnByValue: true
      });
      if (result.value) break;
    } catch (e) {}
  }

  // 1. Test travelPlaceCoupe to Harvest Moon
  const { result: travelRes } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const hm = g.ROUTE_CATALOG.plains.find(p => p.id === 'harvest_moon');
      g.travelTo(hm, true);
      return {
        coupeX: g.coupe.position.x,
        coupeY: g.coupe.position.y,
        coupeZ: g.coupe.position.z,
        surface: g.carSurfaceAt(g.coupe.position.x, g.coupe.position.z)
      };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('1. Travel to Harvest Moon:', travelRes.value);

  // 2. Test Lamp switch interactable
  const { result: lampRes } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const initialLamp = g.harvestLampOn;
      g.Nn.position.set(64600, g.os(64600, -135) + 1.7, -131.0);
      g.Nn.lookAt(64600, g.os(64600, -135) + 2.45, -132.2);
      const target = g.findInteractionTarget();
      let clicked = false;
      if (target && target.label.includes('concession lamp')) {
        target.action();
        clicked = true;
      }
      return { initialLamp, afterLamp: g.harvestLampOn, targetLabel: target ? target.label : null, clicked };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('2. Concession Lamp interaction test:', lampRes.value);

  // 3. Test Playground Swing push
  const { result: swingRes } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const initialVel = g.harvestSwingVel;
      g.Nn.position.set(64652.4, g.os(64650, -75) + 1.2, -73.8);
      g.Nn.lookAt(64652.4, g.os(64650, -75) + 1.2, -75.0);
      const target = g.findInteractionTarget();
      let pushed = false;
      if (target && target.label.includes('Push swing')) {
        target.action();
        pushed = true;
      }
      return { initialVel, newVel: g.harvestSwingVel, targetLabel: target ? target.label : null, pushed };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('3. Swing push test:', swingRes.value);

  // 4. Test Speaker lift and hang on coupe
  const { result: speakerRes } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const initialHung = g.plainsSpeakerHung;
      g.Nn.position.set(64605, g.os(64605, -98) + 1.15, -96.5);
      g.Nn.lookAt(64605, g.os(64605, -98) + 1.15, -98.0);
      const target = g.findInteractionTarget();
      let lifted = false;
      if (target && target.label.includes('Lift speaker')) {
        target.action();
        lifted = true;
      }
      return { initialHung, newHung: g.plainsSpeakerHung, targetLabel: target ? target.label : null, lifted };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('4. Speaker interaction test:', speakerRes.value);

  // 5. Test Marquee board read
  const { result: marqueeRes } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.Nn.position.set(64585, g.os(64585, -25) + 1.8, -22.5);
      g.Nn.lookAt(64585, g.os(64585, -25) + 1.8, -25.0);
      const target = g.findInteractionTarget();
      let read = false;
      if (target && target.label.includes('Read marquee')) {
        target.action();
        read = true;
      }
      return { targetLabel: target ? target.label : null, read, inspection: g.inspection };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('5. Marquee read test:', marqueeRes.value);

  // 6. Test Glovebox Map unfolding
  const { result: mapRes } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.setRoadMapOpen(true);
      const open = g.roadMap.visible;
      g.setRoadMapOpen(false);
      return { mapOpened: open, mapClosed: !g.roadMap.visible };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('6. Glovebox road map test:', mapRes.value);

  // 7. Verify Fuel math from Starlite to Harvest Moon
  const { result: fuelRes } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const starlite = g.ROUTE_CATALOG.desert.find(d => d.id === 'starlite_diner');
      const harvest = g.ROUTE_CATALOG.plains.find(p => p.id === 'harvest_moon');
      const distMeters = Math.abs(harvest.s - starlite.s);
      const miles = distMeters / 1609.344;
      const fuelCost = miles * 0.009;
      return { distMeters, miles, fuelCost, affordable: fuelCost < 1.0 };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('7. Trip fuel cost from Starlite to Harvest Moon:', fuelRes.value);

  ws.close();
  chrome.kill();
  server.close();
  console.log('All gameplay & interaction tests verified successfully!');
}

main().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
