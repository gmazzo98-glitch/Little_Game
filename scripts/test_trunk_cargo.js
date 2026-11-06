const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function main() {
  const PORT = 8094;
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
    '--remote-debugging-port=9228',
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
      const res = await fetch('http://127.0.0.1:9228/json/version');
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

  console.log('Testing trunk cargo initialization in headless Chrome...');
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

  const { result: cargoStatus } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      const items = g.cargoItems.map(item => ({
        label: item.label,
        slot: item.slot,
        parentIsCoupe: item.mesh.parent === g.coupe,
        pos: [item.mesh.position.x, item.mesh.position.y, item.mesh.position.z]
      }));
      return items;
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('Cargo items status:', JSON.stringify(cargoStatus.value, null, 2));

  // Verify trunk opening and taking an item
  const { result: trunkInteraction } = await sendSession('Runtime.evaluate', {
    expression: `(function() {
      const g = document.getElementById("app")._game;
      g.toggleTrunk();
      // Find tool case
      const toolCase = g.cargoItems.find(i => i.label === 'tool case');
      const canvasRoll = g.cargoItems.find(i => i.label === 'canvas roll');
      const tireIron = g.cargoItems.find(i => i.label === 'tire iron');
      return {
        toolCaseSlot: toolCase.slot,
        canvasRollSlot: canvasRoll.slot,
        tireIronSlot: tireIron.slot,
        allInTrunk: toolCase.slot >= 0 && canvasRoll.slot >= 0 && tireIron.slot >= 0
      };
    })()`,
    awaitPromise: true,
    returnByValue: true
  });
  console.log('Trunk interaction test:', JSON.stringify(trunkInteraction.value, null, 2));

  ws.close();
  chrome.kill();
  server.close();
  console.log('Trunk cargo test complete!');
}

main().catch(e => {
  console.error('Test failed:', e);
  process.exit(1);
});
