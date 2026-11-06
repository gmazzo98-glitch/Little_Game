const { spawn } = require('child_process');
const path = require('path');
// Opens the delivered index.html over file:// in headless Chrome (Windows path below), checks errors and network use,
// walks the road x 4000..102000 for height/surface continuity and samples frame time at named Plains places.
const fileUrl = require('url').pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const PORT = 9333;
(async () => {
  const profile = path.join(process.env.TEMP, 'chrome-plains-' + Date.now());
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new', '--remote-debugging-port=' + PORT, '--window-size=960,540',
    '--no-default-browser-check', '--user-data-dir=' + profile, '--autoplay-policy=no-user-gesture-required', 'about:blank']);
  let ws;
  for (let i = 0; i < 50; i++) {
    await new Promise(r => setTimeout(r, 200));
    try { const v = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); const pg = v.find(t => t.type === 'page'); if (pg) { ws = new WebSocket(pg.webSocketDebuggerUrl); break; } } catch (e) {}
  }
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  let id = 1; const pending = new Map(); const errors = [], requests = [], logs = [];
  ws.onmessage = ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text + ' ' + (m.params.exceptionDetails.exception?.description || '').slice(0, 300));
    if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning')) logs.push(m.params.type + ': ' + m.params.args.map(a => a.value || a.description).join(' ').slice(0, 300));
    if (m.method === 'Network.requestWillBeSent') requests.push(m.params.request.url.slice(0, 120));
  };
  const send = (method, params = {}) => new Promise(res => { const i = id++; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const evalJs = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true, timeout: 600000 }); if (r.result.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 500)); return r.result.result.value; };
  await send('Runtime.enable'); await send('Network.enable'); await send('Page.enable');
  await send('Page.navigate', { url: fileUrl });
  await new Promise(r => setTimeout(r, 6000));
  const out = {};
  out.href = await evalJs('location.href');
  out.ready = await evalJs('!!document.getElementById("app")._game');
  out.gpu = await evalJs(`(()=>{const c=document.createElement('canvas');const gl=c.getContext('webgl');const e=gl.getExtension('WEBGL_debug_renderer_info');return e?gl.getParameter(e.UNMASKED_RENDERER_WEBGL):'n/a'})()`);
  await evalJs('document.getElementById("overlay").style.display="none"');
  // Frame-time sampler
  const sampler = `window.__ft = async (n) => { const t=[]; let last=performance.now(); for(let i=0;i<n;i++){ await new Promise(r=>requestAnimationFrame(r)); const now=performance.now(); t.push(now-last); last=now;} t.sort((a,b)=>a-b); const sum=t.reduce((a,b)=>a+b,0); return {n, mean:+(sum/n).toFixed(2), median:+t[Math.floor(n/2)].toFixed(2), p95:+t[Math.floor(n*.95)].toFixed(2), max:+t[n-1].toFixed(2)}; }`;
  await evalJs(sampler);
  // Drive test: step along the road in 400 m hops from x=4000 to 102000, checking height/surface continuity
  out.drive = await evalJs(`(async()=>{
    const g=document.getElementById('app')._game; const res={steps:0,maxJump:0,jumpAt:null,badSurface:[],nanY:0,minFt:1e9,worstFt:0};
    let prevY=null;
    for(let x=4000;x<=102000;x+=400){
      g.travelTo({name:'x',s:g.nwSFromX(x-30),mile:''},true);
      const c=g.coupe.position; const y=c.y; if(!isFinite(y)) res.nanY++;
      if(prevY!==null){const j=Math.abs(y-prevY); if(j>res.maxJump){res.maxJump=j;res.jumpAt=x;}}
      prevY=y; const sf=g.carSurfaceAt(c.x,c.z); if(sf!=='asphalt'&&res.badSurface.length<5)res.badSurface.push(x+':'+sf);
      res.steps++;
      if(x%2000===0) await new Promise(r=>requestAnimationFrame(r));
    }
    return res; })()`);
  // Frame time at named places, three times of day
  const places = { 'Hinge crest': 45000, 'Grain elevator': 52400, 'Windmill': 57000, 'Harvest Moon': 64600, 'East end': 84000, 'Sunset (baseline)': 0 };
  out.perf = {};
  for (const [name, x] of Object.entries(places)) {
    for (const [tn, hr] of [['dusk', 18.6], ['blue', 19.4], ['night', 21.5]]) {
      const key = name + ' / ' + tn;
      out.perf[key] = await evalJs(`(async()=>{const g=document.getElementById('app')._game; g.worldClockHours=${hr}; g.travelTo({name:'x',s:g.nwSFromX(${x}-30),mile:''},true); await new Promise(r=>setTimeout(r,1500)); return await window.__ft(240);})()`);
    }
  }
  out.errors = errors; out.consoleIssues = logs.slice(0, 10);
  out.nonFileRequests = requests.filter(u => !u.startsWith('file:') && !u.startsWith('data:') && !u.startsWith('blob:'));
  console.log(JSON.stringify(out, null, 1));
  ws.close(); chrome.kill();
  process.exit(0);
})().catch(e => { console.error('FAIL', e); process.exit(1); });
