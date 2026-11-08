// Drift Outpost hill town: walk-reachability from the dock (real walk mask and colliders),
// warp landings, interactions, chart, and edge/cliff blocking. Needs Chrome. Usage: node scripts/test_hill_town.js
// usage: node shoot.js shots.json outDir [w h]
// shot: {name, mode:'foot'|'fly', pos:[x,y,z] (deck-local, y above deck), look:[x,y,z], fov, eval}
const http = require('http'), fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const REPO = path.join(__dirname, '..');
(async () => {
  
  
  const W = +process.argv[4] || 1280, H = +process.argv[5] || 720;
  const server = http.createServer((req, res) => {
    const p = path.join(REPO, req.url.split('?')[0] === '/' ? 'index.html' : req.url.split('?')[0]);
    if (!fs.existsSync(p)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': 'text/html' }); fs.createReadStream(p).pipe(res);
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port, CP = 9300 + Math.floor(Math.random() * 500);
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', ['--headless=new', `--remote-debugging-port=${CP}`, `--window-size=${W},${H}`, '--no-default-browser-check', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--user-data-dir=' + path.join(process.env.TEMP, 'chr-shoot-' + Date.now()), 'about:blank']);
  let ws; for (let i = 0; i < 50; i++) { await new Promise(r => setTimeout(r, 200)); try { const d = await (await fetch(`http://127.0.0.1:${CP}/json/version`)).json(); ws = new WebSocket(d.webSocketDebuggerUrl); await new Promise((a, b) => { ws.onopen = a; ws.onerror = b; }); break; } catch (e) { ws = null; } }
  let id = 1; const pend = new Map(); const logs = [];
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { const { a, b } = pend.get(m.id); pend.delete(m.id); m.error ? b(m.error) : a(m.result); } else if (m.method === 'Runtime.exceptionThrown') logs.push('EXC ' + JSON.stringify(m.params.exceptionDetails.exception && m.params.exceptionDetails.exception.description || m.params.exceptionDetails.text)); else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') logs.push('ERR ' + m.params.args.map(a => a.value || a.description).join(' ')); };
  const send = (method, params = {}, sessionId) => new Promise((a, b) => { const i = id++; pend.set(i, { a, b }); ws.send(JSON.stringify({ id: i, method, params, sessionId })); });
  const { targetId } = await send('Target.createTarget', { url: `http://127.0.0.1:${PORT}/index.html` });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const S = (m, p) => send(m, p, sessionId);
  await S('Page.enable'); await S('Runtime.enable');
  await S('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  const ev = async (expression, awaitPromise = true) => { const r = await S('Runtime.evaluate', { expression, returnByValue: true, awaitPromise }); if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails.exception && r.exceptionDetails.exception.description)); return r.result.value; };
  for (let i = 0; i < 120; i++) { await new Promise(r => setTimeout(r, 500)); if (await ev('!!(document.getElementById("app")&&document.getElementById("app")._game)')) break; }
  await ev(`(()=>{const b=document.getElementById('cursor-entry'); if(b) b.click();})()`);
  await new Promise(r => setTimeout(r, 800));
  await ev(`(()=>{const g=document.getElementById("app")._game; g.worldClockHours = g.worldClockHours; })()`);
  const REACH = "const g=document.getElementById(\"app\")._game, S=g.SP; g.spBuild(); g.ufoWarp('dock'); \nconst X0=-150,X1=172,Z0=-114,Z1=64, N=1; const W=Math.ceil((X1-X0)/N)+1, Hh=Math.ceil((Z1-Z0)/N)+1;\nconst boxes=g.Mc.filter(b=>b.maxX-b.minX<400).map(b=>({a:b.minX-S.ax-.35,b:b.maxX-S.ax+.35,c:b.minZ-S.az-.35,d:b.maxZ-S.az+.35,y0:b.minY-S.py,y1:b.maxY-S.py}));\nconst blocked=(x,z,y)=>{ for(const q of boxes){ if(x>q.a&&x<q.b&&z>q.c&&z<q.d&&y+.15<q.y1&&y+1.7>q.y0) return true;} return false;};\nconst ok=new Uint8Array(W*Hh), hh=new Float32Array(W*Hh);\nfor(let j=0;j<Hh;j++)for(let i=0;i<W;i++){const x=X0+i*N,z=Z0+j*N; const h=g.spH(x,z); hh[j*W+i]=h; ok[j*W+i]=(g.spWalkable(x,z)&&!blocked(x,z,h))?1:0;}\nconst idx=(x,z)=>Math.round((z-Z0)/N)*W+Math.round((x-X0)/N);\nconst start=idx(-104,3.5); const seen=new Uint8Array(W*Hh); const q=[start]; seen[start]=1; let cnt=0;\nwhile(q.length){const c=q.pop(); cnt++; const i=c%W, j=(c/W)|0; for(const [di,dj] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]){const ni=i+di,nj=j+dj; if(ni<0||nj<0||ni>=W||nj>=Hh)continue; const n=nj*W+ni; if(seen[n]||!ok[n])continue; if(Math.abs(hh[n]-hh[c])>1.2)continue; seen[n]=1; q.push(n);} }\nconst targets={dock:[-104,3.5],gasPumps:[-62,-9],truckWindow:[-32,-8],spin:[-6,-6],plazaMid:[22,5],planetPop:[22,-9],zorp:[54,-6],innBell:[91,0.5],garage:[79,-11],zoltara:[-18.5,-7],crestTelescope:[14,-88],obsDome:[38,-85],pond:[-2,-44],golf:[-36,-40],cove:[-120,40],wreck:[-112,40],pier:[148,0],pierEnd:[148,0],power:[96,-46],billboard:[-22,-36],ehDoor:[-6,12],greenhouse:[52,13]};\nconst res={reachableCells:cnt}; for(const k in targets){const [x,z]=targets[k]; const c=idx(x,z); res[k]={reach:!!seen[c], walk:!!ok[c], h:+hh[c].toFixed(1)};}\nreturn Object.entries(res).map(([k,v])=>k+\":\"+(typeof v===\"object\"?(v.reach?\"OK\":(v.walk?\"WALKABLE-BUT-DISCONNECTED\":\"BLOCKED\"))+\"@\"+v.h:v)).join(\"  \");\n";
  const FUNC = "const g=document.getElementById(\"app\")._game, S=g.SP; g.spBuild();\nconst raf=()=>new Promise(r=>requestAnimationFrame(r)); const out={}; const frames=async n=>{for(let i=0;i<n;i++) await raf();};\nout.buildMs = Math.round(g.spGroup.userData.buildMs);\nout.warps = [];\nfor (const w of g.ufoWarpList()) {\n  g.ufo.flying=false; try { g.ufoWarp(w.special); } catch(e){ out.warps.push(w.special+': THROW '+e.message); continue; }\n  await frames(4);\n  const p=g.Nn.position, gh=g.ufoGroundAt(p.x,p.z);\n  out.warps.push(w.special+': flying='+g.ufo.flying+' y-ground='+(p.y-gh).toFixed(2)+' local=('+(p.x-S.ax).toFixed(0)+','+(p.z-S.az).toFixed(0)+') h='+(gh-S.py).toFixed(1));\n}\n// interactions\nconst near=(lx,lz,ly=0)=>{ g.ufo.flying=false; g.ufoWarp('main'); g.Nn.position.set(S.ax+lx, S.py+ly+1.7, S.az+lz); const r=g.ufoInteraction(); return r? r.label : null; };\nout.interact = {\n  pump: near(g.spPumps[0].x-S.ax, g.spPumps[0].z-S.az+1.5),\n  bell: near(g.spBell.x-S.ax, g.spBell.z-S.az+1),\n  truck: near(-32, -9),\n  scope0: near(g.spScopes[0].x, g.spScopes[0].z-1.2),\n  bench: near(g.spBenches[0].x, g.spBenches[0].z, 0),\n  board: (()=>{ g.ufo.flying=false; g.ufoWarp('dock'); const r=g.ufoInteraction(); return r? r.label : null; })(),\n};\n// chart + flight computer\ng.ufoWarp('dock'); g.ufoBoard(); await frames(3);\ntry { g.ufoToggleChart(); g.ufoChart.last=-1; g.ufoDrawChart(10); out.chart='drew'; g.ufoToggleChart(); } catch(e){ out.chart='THROW '+e.message; }\ng.ufoExit && g.ufo.landed && g.ufoExit(); await frames(2);\nout.afterExit = {flying:g.ufo.flying, spaceY:(g.Nn.position.y-S.py).toFixed(2)};\n// edge test: walk south into the boardwalk rail\ng.ufo.flying=false; g.ufoWarp('main'); await frames(2);\ng.Nn.position.set(S.ax-60, S.py+1.7, S.az+6); g.Nn.lookAt(S.ax-60, S.py+1.7, S.az+60); g.spLast.ok=false;\ng.fn.KeyW=true; await frames(90); g.fn.KeyW=false;\nout.edge = {z:+(g.Nn.position.z-S.az).toFixed(2), limit:'< 10.5', yAboveGround:+(g.Nn.position.y-(S.py+g.spH(g.Nn.position.x-S.ax,g.Nn.position.z-S.az))).toFixed(2)};\n// cliff test: walk north into the hill face from the shelf\ng.Nn.position.set(S.ax+8, S.py+1.7, S.az-20); g.Nn.lookAt(S.ax+8, S.py+1.7, S.az-80); g.spLast.ok=false;\ng.fn.KeyW=true; await frames(90); g.fn.KeyW=false;\nout.cliff = {z:+(g.Nn.position.z-S.az).toFixed(2), y:+(g.Nn.position.y-S.py).toFixed(2)};\nconst ri=g.renderInfo; out.render={calls:ri.render.calls, triangles:ri.render.triangles};\nreturn out;\n";
  const reach = await ev('(async()=>{' + REACH + '})()');
  const func = await ev('(async()=>{' + FUNC + '})()');
  console.log('REACHABILITY:', reach); console.log('BEHAVIOUR:', JSON.stringify(func, null, 1));
  const bad = [];
  if (/BLOCKED|DISCONNECTED/.test(reach)) bad.push('a destination is not reachable on foot');
  if (func.warps.some(w => /THROW/.test(w) || (!/flying=true/.test(w) && !/y-ground=1\.70/.test(w) && !/home|sky|orbit/.test(w.split(':')[0])))) bad.push('a warp did not land on the ground');
  if (!(func.edge.z < 10.5)) bad.push('walked off the boardwalk edge');
  if (!(func.cliff.z < -20 && func.cliff.z > -28)) bad.push('walked into the cliff');
  for (const k of ['pump', 'bell', 'truck', 'scope0', 'bench', 'board']) if (!func.interact[k]) bad.push('no interaction: ' + k);
  if (func.chart !== 'drew') bad.push('chart failed');
  console.log(bad.length ? 'FAIL: ' + bad.join('; ') : 'PASS');
  chrome.kill(); server.close(); process.exit(bad.length ? 1 : 0);
})().catch(e => { console.error('FAILED', e); process.exit(1); });
