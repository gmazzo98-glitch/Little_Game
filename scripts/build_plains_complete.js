// Complete Great Plains builder & integration script
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('Building Great Plains complete features...');

function replaceOnce(str, target, replacement, label) {
  if (!str.includes(target)) throw new Error(`Target not found: ${label}`);
  return str.replace(target, replacement);
}

// -------------------------------------------------------------
// 1. Great Plains Group & Set Pieces Builders
// -------------------------------------------------------------
const plainsBuildersCode = `
// ===========================================================================
// GREAT PLAINS: SET PIECES & HARVEST MOON DRIVE-IN BUILDERS
// ===========================================================================

const plainsGroup = new xi();
plainsGroup.name = 'Great Plains Landmarks';
Nt.add(plainsGroup);

const harvestMoonGroup = new xi();
harvestMoonGroup.name = 'Harvest Moon Drive-In';
Nt.add(harvestMoonGroup);

// Harvest Moon Point Lights
const harvestSignLight = new Pn(0xff2828, 12, 45, 2);
harvestSignLight.position.set(64570, 7.5, -14);
Nt.add(harvestSignLight);

const harvestCyanLight = new Pn(0x28d8ff, 3.8, 18, 2);
harvestCyanLight.position.set(64570, 5.2, -14);
Nt.add(harvestCyanLight);

const harvestLampLight = new Pn(0xffb86b, 8.5, 14, 2);
harvestLampLight.position.set(64600, 2.2, -134);
Nt.add(harvestLampLight);

// Interactive state variables
let harvestLampOn = true;
let plainsSpeakerHung = false;
let harvestSwingAngle = 0, harvestSwingVel = 0;
let windmillAngle = 0;
let mailboxOpen = false;
let cashDrawerOpen = false;
let kettleLidOpen = false;
let counterWindowSlide = 0;
let windmillBrakeHeld = false;

// Red Coal distant unfogged emissive sprite at pylon top (x=64570, y=9.8, z=-14)
let redCoalMesh = (function() {
  const geo = new It();
  // Small billboard quad
  const s = 1.6;
  const pos = [-s,-s,0,  s,-s,0,  s,s,0,  -s,-s,0,  s,s,0,  -s,s,0];
  geo.setAttribute('position', new Et(new Float32Array(pos), 3));
  const mat = new ji({
    color: 0xff1515,
    emissive: 0xff1515,
    emissiveIntensity: 2.5,
    fog: false,
    depthWrite: false,
    transparent: true,
    opacity: 0
  });
  const m = new dt(geo, mat);
  m.position.set(64570, 9.8, -14);
  m.renderOrder = 999;
  Nt.add(m);
  return m;
})();

// Playground swing hinge reference
let harvestSwingHinge = null;
let windmillWheelGroup = null;
let hungSpeakerOnCoupe = null;
let middleMailboxDoor = null;

// Cylinder / lathe helper
function makeCylinderParts(rTop, rBot, height, segs, role, opts = {}) {
  const pts = [];
  const y0 = opts.y0 || 0;
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const r = rBot + (rTop - rBot) * t;
    pts.push([r, y0 + height * t]);
  }
  return { ...latheGeom(pts, opts.radialSegs || 12), matrix: opts.matrix || matIdentity() };
}

(function buildGreatPlainsSetPieces() {
  const parts = {}, add = (role, p) => (parts[role] = parts[role] || []).push(p);

  // -------------------------------------------------------------
  // 1. Concrete Silo (x=47600, z=+70)
  // -------------------------------------------------------------
  const sx = 47600, sz = 70, sy = os(sx, sz);
  // Silo main concrete tube (diam 6m, h 18m)
  add('plaster', { ...latheGeom([[3.0, 0], [3.0, 18.0]], 16), matrix: matTranslate(sx, sy, sz) });
  // Dome cap
  const domePts = [];
  for (let i = 0; i <= 8; i++) {
    const a = (i / 8) * (Math.PI / 2);
    domePts.push([3.0 * Math.cos(a), 18.0 + 2.8 * Math.sin(a)]);
  }
  add('wornMetal', { ...latheGeom(domePts, 16), matrix: matTranslate(sx, sy, sz) });
  // Exterior ladder cage
  for (let y = 1; y < 18; y += 0.8) {
    add('wornMetal', boxPart(sx + 3.15, sy + y, sz, 0.1, 0.04, 0.5));
  }
  // Lean-to equipment shed at foot (6 x 3.5 x 3.8m)
  add('weatheredWood', boxPart(sx, sy + 1.9, sz - 4.5, 5.8, 3.8, 3.2));
  add('roofMetal', boxPart(sx, sy + 3.9, sz - 4.6, 6.2, 0.12, 3.6));
  Dt(sx - 3.2, sz - 3.2, sx + 3.2, sz + 3.2, sy, sy + 21);
  Dt(sx - 3.0, sz - 6.2, sx + 3.0, sz - 2.8, sy, sy + 4.2);

  // -------------------------------------------------------------
  // 2. Grain Elevator & Dead Siding (x=52400, z=-70)
  // -------------------------------------------------------------
  const ex = 52400, ez = -70, ey = os(ex, ez);
  // Crib elevator main body (10m wide, 14m deep, 24m high)
  add('elevatorWood', boxPart(ex, ey + 12.0, ez, 10.0, 24.0, 14.0));
  // Headhouse on top (6 x 8 x 5m)
  add('elevatorWood', boxPart(ex, ey + 26.5, ez, 6.0, 5.0, 8.0));
  add('roofMetal', boxPart(ex, ey + 29.2, ez, 6.6, 0.3, 8.6));
  // Enclosed conveyor gallery / bridge down to siding
  add('elevatorWood', boxPart(ex, ey + 18.0, ez + 12.0, 2.4, 3.2, 10.0));
  // Loading boom & spout
  add('wornMetal', boxPart(ex, ey + 14.0, ez + 18.0, 0.4, 0.4, 6.0));
  // Ground office shack
  add('weatheredWood', boxPart(ex + 6.8, ey + 1.8, ez, 3.4, 3.6, 4.2));
  add('roofMetal', boxPart(ex + 6.8, ey + 3.7, ez, 3.8, 0.1, 4.6));
  Dt(ex - 5.5, ez - 7.5, ex + 5.5, ez + 7.5, ey, ey + 30);
  Dt(ex + 5.0, ez - 2.5, ex + 8.8, ez + 2.5, ey, ey + 4.0);

  // Dead siding: 600m ballast bed (x=52100..52700, z=-40), NO rails
  for (let bx = 52100; bx <= 52700; bx += 2.0) {
    const by = os(bx, -40);
    // Half-buried weathered ties
    add('weatheredWood', boxPart(bx, by + 0.08, -40, 0.22, 0.14, 2.6));
  }

  // -------------------------------------------------------------
  // 3. Water Tower (x=53100, z=+210)
  // -------------------------------------------------------------
  const wx = 53100, wz = 210, wy = os(wx, wz);
  // 4 steel lattice legs up to 20m
  for (const dx of [-3.8, 3.8]) {
    for (const dz of [-3.8, 3.8]) {
      add('wornMetal', boxPart(wx + dx, wy + 10.0, wz + dz, 0.35, 20.0, 0.35));
    }
  }
  // Cross bracing
  for (let h = 4.0; h <= 18.0; h += 4.5) {
    add('wornMetal', boxPart(wx, wy + h, wz - 3.8, 7.6, 0.2, 0.2));
    add('wornMetal', boxPart(wx, wy + h, wz + 3.8, 7.6, 0.2, 0.2));
    add('wornMetal', boxPart(wx - 3.8, wy + h, wz, 0.2, 0.2, 7.6));
    add('wornMetal', boxPart(wx + 3.8, wy + h, wz, 0.2, 0.2, 7.6));
  }
  // Central riser pipe (diam 0.85m)
  add('wornMetal', { ...latheGeom([[0.42, 0], [0.42, 20.0]], 8), matrix: matTranslate(wx, wy, wz) });
  // Cylindrical tank (diam 9m, h 6.5m)
  add('wornMetal', { ...latheGeom([[4.5, 20.0], [4.5, 26.5]], 16), matrix: matTranslate(wx, wy, wz) });
  // Tank conical roof
  const tankRoofPts = [];
  for (let i = 0; i <= 6; i++) {
    const t = i / 6;
    tankRoofPts.push([(1 - t) * 4.6, 26.5 + t * 2.2]);
  }
  add('wornMetal', { ...latheGeom(tankRoofPts, 16), matrix: matTranslate(wx, wy, wz) });
  Dt(wx - 4.2, wz - 4.2, wx + 4.2, wz + 4.2, wy, wy + 29);

  // Painted washed-away town name on tank face
  paintedSurface(4.2, 1.8, (ctx) => {
    ctx.fillStyle = '#8a8880';
    ctx.fillRect(0, 0, 512, 256);
    ctx.fillStyle = 'rgba(50, 48, 44, 0.55)';
    ctx.font = 'bold 54px Georgia,serif';
    ctx.textAlign = 'center';
    ctx.fillText('PRAIRIE VIEW', 256, 120);
    ctx.font = '24px Georgia,serif';
    ctx.fillText('MUNICIPAL WATER', 256, 165);
    // Weathering streaks
    ctx.fillStyle = 'rgba(120, 115, 100, 0.35)';
    for (let i = 0; i < 20; i++) {
      ctx.fillRect(i * 26 + 10, 0, 6 + (i % 5) * 2, 256);
    }
  }, matTranslate(wx, wy + 23.5, wz - 4.52));

  // -------------------------------------------------------------
  // 4. Hay Stacks (x=55200, z=-35 and +60)
  // -------------------------------------------------------------
  for (const [hx, hz] of [[55200, -35], [55200, 60]]) {
    const hy = os(hx, hz);
    // 5 round bales in pyramid (diam 1.7m, length 1.8m)
    for (const [bx, bz, by] of [[-1.2, 0, 0.85], [1.2, 0, 0.85], [-0.6, 0, 2.3], [0.6, 0, 2.3], [0, 0, 3.6]]) {
      add('plainsStraw', boxPart(hx + bx, hy + by, hz + bz, 1.7, 1.6, 1.8));
    }
    // Weathered dark grey tarp over top
    add('rubber', boxPart(hx, hy + 2.6, hz, 3.4, 2.4, 2.2));
    Dt(hx - 2.0, hz - 1.2, hx + 2.0, hz + 1.2, hy, hy + 4.0);
  }

  // -------------------------------------------------------------
  // 5. Windmill & Stock Tank (x=57000, z=+95)
  // -------------------------------------------------------------
  const mx = 57000, mz = 95, my = os(mx, mz);
  // 4-leg lattice tower (height 11m)
  for (const dx of [-1.1, 1.1]) {
    for (const dz of [-1.1, 1.1]) {
      add('wornMetal', boxPart(mx + dx * 0.9, my + 5.5, mz + dz * 0.9, 0.12, 11.0, 0.12));
    }
  }
  for (let h = 2.0; h <= 10.0; h += 2.2) {
    add('wornMetal', boxPart(mx, my + h, mz - 0.9, 1.8, 0.08, 0.08));
    add('wornMetal', boxPart(mx, my + h, mz + 0.9, 1.8, 0.08, 0.08));
    add('wornMetal', boxPart(mx - 0.9, my + h, mz, 0.08, 0.08, 1.8));
    add('wornMetal', boxPart(mx + 0.9, my + h, mz, 0.08, 0.08, 1.8));
  }
  // Brake lever on tower leg at y=1.3m
  add('wornMetal', boxPart(mx + 0.95, my + 1.3, mz, 0.18, 0.45, 0.08));

  // Circular galvanized stock tank (diam 4.2m, h 0.9m) at x=57000, z=93
  const tankGround = os(mx, mz - 2.0);
  // Tank rim
  add('wornMetal', { ...latheGeom([[2.1, 0], [2.1, 0.9], [1.98, 0.9], [1.98, 0]], 16), matrix: matTranslate(mx, tankGround, mz - 2.0) });
  // Dark algae water disc
  add('wetAsphalt', boxPart(mx, tankGround + 0.78, mz - 2.0, 3.9, 0.04, 3.9));
  Dt(mx - 1.2, mz - 1.2, mx + 1.2, mz + 1.2, my, my + 12);
  Dt(mx - 2.2, mz - 4.2, mx + 2.2, mz + 0.2, tankGround, tankGround + 1.0);

  // -------------------------------------------------------------
  // 6. Mailbox Row (x=61000, z=+6.2)
  // -------------------------------------------------------------
  const mbx = 61000, mbz = 6.2, mby = os(mbx, mbz);
  // 2 cedar posts and cross beam
  add('weatheredWood', boxPart(mbx - 0.8, mby + 0.55, mbz, 0.12, 1.1, 0.12));
  add('weatheredWood', boxPart(mbx + 0.8, mby + 0.55, mbz, 0.12, 1.1, 0.12));
  add('weatheredWood', boxPart(mbx, mby + 1.05, mbz, 2.2, 0.10, 0.22));
  // 3 metal mailboxes
  for (const bx of [-0.65, 0.0, 0.65]) {
    add('wornMetal', boxPart(mbx + bx, mby + 1.22, mbz, 0.32, 0.30, 0.65));
    // Red flag
    add('fadedRed', boxPart(mbx + bx + 0.18, mby + 1.34, mbz + 0.15, 0.02, 0.22, 0.06));
  }
  Dt(mbx - 1.2, mbz - 0.25, mbx + 1.2, mbz + 0.25, mby, mby + 1.5);

  // -------------------------------------------------------------
  // 7. Stone Culverts (x=50200 and x=59000)
  // -------------------------------------------------------------
  for (const [cx, mp] of [[50200, '31'], [59000, '37']]) {
    for (const cz of [-5.2, 5.2]) {
      const cy = os(cx, cz);
      add('plaster', boxPart(cx, cy + 0.45, cz, 3.2, 0.9, 0.4));
      add('wornMetal', boxPart(cx, cy + 0.92, cz, 3.4, 0.08, 0.46));
      Dt(cx - 1.7, cz - 0.25, cx + 1.7, cz + 0.25, cy, cy + 1.1);
    }
  }

  // -------------------------------------------------------------
  // 8. Shelterbelts (Cottonwoods at z=-300 and z=+260)
  // -------------------------------------------------------------
  // West shelterbelt: x=58000..59600, z=-300
  for (let tx = 58000; tx <= 59600; tx += 65) {
    const tz = -300 + (tx % 3) * 14;
    const ty = os(tx, tz);
    add('darkWood', boxPart(tx, ty + 7.5, tz, 0.9, 15.0, 0.9));
    add('cottonwoodFoliage', boxPart(tx, ty + 15.0, tz, 14.0, 10.0, 14.0));
  }
  // East shelterbelt: x=66500..68500, z=+260
  for (let tx = 66500; tx <= 68500; tx += 70) {
    const tz = 260 + (tx % 3) * 12;
    const ty = os(tx, tz);
    add('darkWood', boxPart(tx, ty + 7.5, tz, 0.9, 15.0, 0.9));
    add('cottonwoodFoliage', boxPart(tx, ty + 15.0, tz, 14.0, 10.0, 14.0));
  }

  // Add all set pieces to plainsGroup
  for (const role in parts) {
    addRoleMesh(plainsGroup, role, parts[role]);
  }

  // Windmill spinning wheel mesh (attached to dynamic group for rotation)
  windmillWheelGroup = new xi();
  windmillWheelGroup.position.set(mx, my + 11.0, mz);
  const wheelParts = [], addWheel = (role, p) => (wheelParts.push(p));
  // 18 blades in circle
  for (let b = 0; b < 18; b++) {
    const ang = (b / 18) * Math.PI * 2;
    const bx = Math.cos(ang) * 1.3, by = Math.sin(ang) * 1.3;
    addWheel('wornMetal', boxPart(bx, by, 0, 0.25, 0.9, 0.02));
  }
  // Wheel hub & tail vane
  addWheel('wornMetal', boxPart(0, 0, 0, 0.45, 0.45, 0.35));
  addWheel('wornMetal', boxPart(0, 0, 1.6, 0.04, 0.65, 2.6));
  addRoleMesh(windmillWheelGroup, 'wornMetal', wheelParts);
  Nt.add(windmillWheelGroup);

})();

// ===========================================================================
// HARVEST MOON DRIVE-IN BUILDER (x=64600, z=-14)
// ===========================================================================
(function buildHarvestMoonDriveIn() {
  const parts = {}, add = (role, p) => (parts[role] = parts[role] || []).push(p);

  // -------------------------------------------------------------
  // 1. Roadside Pylon Sign (x=64570, z=-14)
  // -------------------------------------------------------------
  const px = 64570, pz = -14, py = os(px, pz);
  // Twin tapered steel pylon columns (h 9.2m)
  add('wornMetal', boxPart(px - 1.8, py + 4.6, pz, 0.35, 9.2, 0.35));
  add('wornMetal', boxPart(px + 1.8, py + 4.6, pz, 0.35, 9.2, 0.35));
  // Cross lace bracing
  for (let h = 2.0; h <= 7.0; h += 2.0) {
    add('wornMetal', boxPart(px, py + h, pz, 3.6, 0.12, 0.12));
  }
  // Large metal cabinet sign (5.2 x 2.4 x 0.55m) at h=7.5m
  add('harvestCabinet', boxPart(px, py + 7.5, pz, 5.2, 2.4, 0.55));
  // Red neon crescent moon (lathe arc)
  const moonPts = [];
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI * 0.45 + (i / 10) * Math.PI * 0.9;
    moonPts.push([1.1 * Math.cos(a), 1.1 * Math.sin(a)]);
  }
  add('harvestNeonRed', { ...tubeGeom(moonPts.map(p => [p[0] - 1.4, p[1], 0.3]), 0.04, 4, false), matrix: matTranslate(px, py + 7.5, pz) });
  // Script neon tubes: "HARVEST MOON"
  add('harvestNeonRed', boxPart(px + 0.4, py + 7.8, pz + 0.3, 3.2, 0.55, 0.08));
  // Cyan neon accent underline: "DRIVE-IN"
  add('harvestNeonCyan', boxPart(px + 0.4, py + 6.9, pz + 0.3, 2.6, 0.32, 0.08));
  Dt(px - 2.2, pz - 0.4, px + 2.2, pz + 0.4, py, py + 9.5);

  // -------------------------------------------------------------
  // 2. Ticket Booth (x=64600, z=-34)
  // -------------------------------------------------------------
  const tbx = 64600, tbz = -34, tby = os(tbx, tbz);
  // Concrete plinth
  add('plaster', boxPart(tbx, tby + 0.08, tbz, 2.6, 0.16, 3.0));
  // Booth walls (2.0 x 2.4 x 2.6m)
  add('wallCream', boxPart(tbx, tby + 1.35, tbz, 2.0, 2.4, 2.4));
  // Overhanging roof with soffit
  add('soffit', boxPart(tbx, tby + 2.65, tbz, 2.8, 0.18, 3.2));
  add('roofMetal', boxPart(tbx, tby + 2.78, tbz, 2.9, 0.08, 3.3));
  // Window shelf and slot facing incoming driveway
  add('darkWood', boxPart(tbx + 1.05, tby + 1.05, tbz, 0.25, 0.08, 1.2));
  // Ticket dispenser & cash drawer
  add('brass', boxPart(tbx + 1.02, tby + 1.18, tbz - 0.25, 0.12, 0.18, 0.12));
  add('brass', boxPart(tbx + 0.92, tby + 0.92, tbz, 0.32, 0.12, 0.45));
  Dt(tbx - 1.1, tbz - 1.3, tbx + 1.1, tbz + 1.3, tby, tby + 2.9);

  // -------------------------------------------------------------
  // 3. The Great Screen (x=64620, z=-62)
  // -------------------------------------------------------------
  const scx = 64620, scz = -62, scy = os(scx, scz);
  // 4 massive vertical timber bents (w 22m, h 14m, bottom at y=3.5m)
  for (const bx of [-8.5, -2.8, 2.8, 8.5]) {
    add('screenTrussWood', boxPart(scx + bx, scy + 10.5, scz + 1.5, 0.55, 14.0, 0.55));
    // Diagonal tie-back struts to concrete deadmen piers behind (+z)
    add('screenTrussWood', boxPart(scx + bx, scy + 6.0, scz + 4.5, 0.35, 11.0, 0.35));
    add('plaster', boxPart(scx + bx, scy + 0.4, scz + 7.5, 1.2, 0.8, 1.2));
  }
  // Cross bracing & catwalk behind screen
  add('screenTrussWood', boxPart(scx, scy + 9.5, scz + 1.6, 22.0, 0.18, 1.2));
  add('wornMetal', boxPart(scx, scy + 10.5, scz + 2.2, 22.0, 0.06, 0.06));
  // Screen panel face facing field (-z): 22m wide x 14m tall
  add('screenPanelWhite', boxPart(scx, scy + 10.5, scz, 22.0, 14.0, 0.25));
  // Weathered top and bottom edge trim
  add('screenTrussWood', boxPart(scx, scy + 17.6, scz, 22.4, 0.25, 0.35));
  add('screenTrussWood', boxPart(scx, scy + 3.4, scz, 22.4, 0.25, 0.35));
  // Massive ground piers
  for (const px of [-10, -5, 0, 5, 10]) {
    add('plaster', boxPart(scx + px, scy + 1.5, scz, 1.2, 3.2, 1.2));
  }
  Dt(scx - 11.5, scz - 0.5, scx + 11.5, scz + 8.0, scy, scy + 18.0);

  // -------------------------------------------------------------
  // 4. Concession & Projection Building (x=64600, z=-135)
  // -------------------------------------------------------------
  const cnx = 64600, cnz = -135, cny = os(cnx, cnz);
  // Concrete foundation slab (12.5 x 7.5 x 0.15m)
  add('plaster', boxPart(cnx, cny + 0.08, cnz, 12.5, 0.16, 7.5));
  // Cinder block exterior walls (12.0 x 7.0 x 4.0m)
  // South wall with entrance door opening
  add('wallCream', boxPart(cnx - 4.0, cny + 2.0, cnz - 3.4, 3.8, 4.0, 0.3));
  add('wallCream', boxPart(cnx + 3.5, cny + 2.0, cnz - 3.4, 4.8, 4.0, 0.3));
  add('wallCream', boxPart(cnx - 1.0, cny + 3.3, cnz - 3.4, 2.2, 1.4, 0.3));
  // North wall facing field with serving window
  add('wallCream', boxPart(cnx - 4.2, cny + 2.0, cnz + 3.4, 3.4, 4.0, 0.3));
  add('wallCream', boxPart(cnx + 4.2, cny + 2.0, cnz + 3.4, 3.4, 4.0, 0.3));
  add('wallCream', boxPart(cnx, cny + 0.6, cnz + 3.4, 5.0, 1.2, 0.3));
  add('wallCream', boxPart(cnx, cny + 3.2, cnz + 3.4, 5.0, 1.6, 0.3));
  // East and West walls
  add('wallCream', boxPart(cnx - 5.9, cny + 2.0, cnz, 0.3, 4.0, 7.0));
  add('wallCream', boxPart(cnx + 5.9, cny + 2.0, cnz, 0.3, 4.0, 7.0));
  // Flat gravel roof with metal coping
  add('roofMetal', boxPart(cnx, cny + 4.1, cnz, 12.3, 0.22, 7.3));

  // Concession counter (facing field)
  add('darkWood', boxPart(cnx, cny + 1.1, cnz + 2.8, 4.8, 0.1, 0.8));
  // Popcorn kettle on counter
  add('wornMetal', boxPart(cnx - 1.2, cny + 1.35, cnz + 2.8, 0.55, 0.45, 0.45));
  add('brass', boxPart(cnx - 1.2, cny + 1.60, cnz + 2.8, 0.52, 0.06, 0.42));
  // Vintage 3-tap soda draft tower
  add('wornMetal', boxPart(cnx + 1.1, cny + 1.4, cnz + 2.8, 0.22, 0.55, 0.22));
  for (const tox of [-0.08, 0, 0.08]) {
    add('brass', boxPart(cnx + 1.1 + tox, cny + 1.62, cnz + 2.92, 0.04, 0.12, 0.15));
  }
  // Warm lamp fixture over counter
  add('brass', boxPart(cnx, cny + 2.8, cnz + 2.8, 0.12, 0.55, 0.12));
  add('harvestCabinet', boxPart(cnx, cny + 2.45, cnz + 2.8, 0.45, 0.22, 0.45));

  // Projection booth in rear (+z interior): elevated floor & dual-reel projector
  add('weatheredWood', boxPart(cnx, cny + 0.6, cnz - 1.2, 5.0, 0.4, 3.2));
  // Projector body & carbon arc lamphouse
  add('darkWood', boxPart(cnx, cny + 1.6, cnz - 1.2, 0.8, 1.5, 1.2));
  add('wornMetal', boxPart(cnx, cny + 2.4, cnz - 1.2, 0.7, 0.6, 0.9));
  // Upper and lower 35mm film reel canisters (diam 0.65m)
  add('wornMetal', { ...latheGeom([[0.32, 0], [0.32, 0.1]], 12), matrix: matTranslate(cnx, cny + 2.7, cnz - 0.7) });
  add('wornMetal', { ...latheGeom([[0.32, 0], [0.32, 0.1]], 12), matrix: matTranslate(cnx, cny + 1.1, cnz - 0.7) });
  // Stack of 3 film cans on metal shelf
  for (let c = 0; c < 3; c++) {
    add('wornMetal', { ...latheGeom([[0.28, 0], [0.28, 0.07]], 12), matrix: matTranslate(cnx + 1.8, cny + 1.1 + c * 0.08, cnz - 1.2) });
  }

  // Colliders for concession building
  Dt(cnx - 6.2, cnz - 3.7, cnx + 6.2, cnz + 3.7, cny, cny + 4.5);

  // -------------------------------------------------------------
  // 5. Playground (x=64650, z=-75)
  // -------------------------------------------------------------
  const pgx = 64650, pgz = -75, pgy = os(pgx, pgz);
  // 3-swing timber A-frame (4 legs, cross beam at h=3.6m)
  add('weatheredWood', boxPart(pgx - 4.0, pgy + 1.8, pgz - 1.2, 0.2, 3.8, 0.2));
  add('weatheredWood', boxPart(pgx - 4.0, pgy + 1.8, pgz + 1.2, 0.2, 3.8, 0.2));
  add('weatheredWood', boxPart(pgx + 4.0, pgy + 1.8, pgz - 1.2, 0.2, 3.8, 0.2));
  add('weatheredWood', boxPart(pgx + 4.0, pgy + 1.8, pgz + 1.2, 0.2, 3.8, 0.2));
  add('weatheredWood', boxPart(pgx, pgy + 3.6, pgz, 8.4, 0.22, 0.22));
  // 2 static swing seats
  for (const sx of [-2.4, 0.0]) {
    add('wornMetal', boxPart(pgx + sx, pgy + 1.8, pgz, 0.03, 3.4, 0.03));
    add('rubber', boxPart(pgx + sx, pgy + 0.45, pgz, 0.55, 0.05, 0.22));
  }
  // Galvanized steel slide at x=64660, z=-75
  add('wornMetal', boxPart(pgx + 8.0, pgy + 1.6, pgz, 0.8, 3.2, 4.2));
  Dt(pgx - 4.4, pgz - 1.5, pgx + 4.4, pgz + 1.5, pgy, pgy + 4.0);
  Dt(pgx + 6.8, pgz - 1.0, pgx + 9.2, pgz + 1.0, pgy, pgy + 3.5);

  // Dynamic swing (3rd swing at x=pgx+2.4)
  harvestSwingHinge = new xi();
  harvestSwingHinge.position.set(pgx + 2.4, pgy + 3.6, pgz);
  const swParts = [];
  swParts.push(boxPart(0, -1.6, 0, 0.04, 3.2, 0.04));
  swParts.push(boxPart(0, -3.15, 0, 0.55, 0.05, 0.22));
  addRoleMesh(harvestSwingHinge, 'rubber', swParts);
  Nt.add(harvestSwingHinge);

  // -------------------------------------------------------------
  // 6. Marquee Board (x=64585, z=-25)
  // -------------------------------------------------------------
  const mqx = 64585, mqz = -25, mqy = os(mqx, mqz);
  add('weatheredWood', boxPart(mqx - 1.8, mqy + 1.4, mqz, 0.2, 2.8, 0.2));
  add('weatheredWood', boxPart(mqx + 1.8, mqy + 1.4, mqz, 0.2, 2.8, 0.2));
  add('wallCream', boxPart(mqx, mqy + 1.8, mqz, 3.6, 1.4, 0.15));
  Dt(mqx - 2.0, mqz - 0.25, mqx + 2.0, mqz + 0.25, mqy, mqy + 2.8);

  // Painted marquee text
  paintedSurface(3.4, 1.2, (ctx) => {
    ctx.fillStyle = '#eae4d2';
    ctx.fillRect(0, 0, 512, 256);
    ctx.strokeStyle = '#8a2b22';
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, 492, 236);
    ctx.fillStyle = '#2a2622';
    ctx.font = 'bold 32px Arial,sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('THANKS FOR A', 256, 95);
    ctx.fillText('GREAT SEASON', 256, 155);
    // Missing / fallen letters detail
    ctx.fillStyle = '#a69e8b';
    ctx.font = 'italic 18px Georgia,serif';
    ctx.fillText('•  AUTUMN CLOSURE  •', 256, 210);
  }, matTranslate(mqx, mqy + 1.8, mqz + 0.09));

  // -------------------------------------------------------------
  // 7. Decorative Restrooms (x=64625, z=-140)
  // -------------------------------------------------------------
  const rrx = 64625, rrz = -140, rry = os(rrx, rrz);
  add('wallCream', boxPart(rrx, rry + 1.6, rrz, 4.5, 3.2, 3.2));
  add('roofMetal', boxPart(rrx, rry + 3.25, rrz, 4.8, 0.12, 3.5));
  // Two locked wooden doors
  add('weatheredWood', boxPart(rrx - 1.1, rry + 1.1, rrz + 1.62, 0.95, 2.1, 0.06));
  add('weatheredWood', boxPart(rrx + 1.1, rry + 1.1, rrz + 1.62, 0.95, 2.1, 0.06));
  Dt(rrx - 2.4, rrz - 1.8, rrx + 2.4, rrz + 1.8, rry, rry + 3.5);

  // -------------------------------------------------------------
  // 8. Speaker Posts on Mound Rows
  // -------------------------------------------------------------
  // 70 speaker posts along 9 arced mound rows
  for (let row = 0; row < 9; row++) {
    const rz = -75 - row * 13.5;
    const count = 7 + (row % 3);
    for (let s = 0; s < count; s++) {
      const u = (s / (count - 1)) - 0.5;
      const spx = 64620 + u * (38 + row * 8);
      const spz = rz + Math.abs(u) * 6.5;
      const spy = os(spx, spz);
      // Steel pipe post
      add('wornMetal', boxPart(spx, spy + 0.6, spz, 0.07, 1.2, 0.07));
      // Speaker junction box & hung speaker
      add('wornMetal', boxPart(spx, spy + 1.18, spz, 0.18, 0.12, 0.14));
      add('darkWood', boxPart(spx, spy + 1.05, spz - 0.09, 0.14, 0.22, 0.10));
    }
  }

  // Add all Harvest Moon parts to harvestMoonGroup
  for (const role in parts) {
    addRoleMesh(harvestMoonGroup, role, parts[role]);
  }

})();

// Window-hung speaker on coupe (visible when hung)
hungSpeakerOnCoupe = (function() {
  const g = new xi();
  g.name = 'Hung Drive-In Speaker';
  const parts = [];
  parts.push(boxPart(0, 0, 0, 0.14, 0.22, 0.10));
  parts.push(boxPart(0, 0.12, 0, 0.04, 0.06, 0.12));
  addRoleMesh(g, 'darkWood', parts);
  // Positioned on driver window glass
  g.position.set(-0.84, 1.08, -0.25);
  g.visible = false;
  coupe.add(g);
  return g;
})();
`;

// -------------------------------------------------------------
// 2. Instanced Grass Tufts & Roadside Fences (P3)
// -------------------------------------------------------------
const plainsGrassAndFencesCode = `
// ===========================================================================
// GREAT PLAINS: INSTANCED GRASS TUFTS & ROADSIDE FENCES
// ===========================================================================

const PLAINS_GRASS_NEAR_N = 3600;
const PLAINS_GRASS_MID_N = 2400;

// Double crossed quads with vertex colors: dark olive base to straw tip
function makeGrassGeometry() {
  const geo = new It();
  const pos = [], col = [], idx = [];
  const addBlade = (x0, z0, x1, z1, h) => {
    const base = pos.length / 3;
    pos.push(x0, 0, z0,   x1, 0, z1,   x1, h, z1,   x0, h, z0);
    // Dark olive base: (0.24, 0.28, 0.14), Straw gold tip: (0.78, 0.68, 0.40)
    col.push(0.24, 0.28, 0.14,  0.24, 0.28, 0.14,  0.78, 0.68, 0.40,  0.78, 0.68, 0.40);
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  addBlade(-0.24, 0, 0.24, 0, 0.72);
  addBlade(0, -0.24, 0, 0.24, 0.78);
  addBlade(-0.16, -0.16, 0.16, 0.16, 0.65);
  geo.setAttribute('position', new Et(new Float32Array(pos), 3));
  geo.setAttribute('color', new Et(new Float32Array(col), 3));
  geo.setIndex(idx);
  return geo;
}

const grassMat = new Lm({ vertexColors: true, side: 2 });
const plainsNearGrassMesh = new ar(makeGrassGeometry(), grassMat, PLAINS_GRASS_NEAR_N);
const plainsMidGrassMesh = new ar(makeGrassGeometry(), grassMat, PLAINS_GRASS_MID_N);
plainsNearGrassMesh.name = 'Plains near grass tufts';
plainsMidGrassMesh.name = 'Plains mid grass tufts';
plainsNearGrassMesh.frustumCulled = false;
plainsMidGrassMesh.frustumCulled = false;
Nt.add(plainsNearGrassMesh);
Nt.add(plainsMidGrassMesh);

// Fences along US 66: posts at z=+-14.5m every 4m, 4 strands of wire
const PLAINS_FENCE_N = 280;
const fencePostGeo = new It();
const fpData = boxPart(0, 0.65, 0, 0.12, 1.30, 0.12);
fencePostGeo.setAttribute('position', new Et(new Float32Array(fpData.pos), 3));
fencePostGeo.setAttribute('normal', new Et(new Float32Array(fpData.nor), 3));
fencePostGeo.setIndex(fpData.idx);

const fencePostMesh = new ar(fencePostGeo, roleMat('weatheredWood'), PLAINS_FENCE_N);
fencePostMesh.name = 'Plains roadside fence posts';
fencePostMesh.frustumCulled = false;
Nt.add(fencePostMesh);

// Horizontal wire strands (4 continuous strands)
const fenceWireGeo = new It();
const fwParts = [];
for (const wy of [0.35, 0.65, 0.95, 1.25]) {
  fwParts.push(boxPart(2.0, wy, 0, 4.0, 0.02, 0.02));
}
const fwData = mergeParts(fwParts);
fenceWireGeo.setAttribute('position', new Et(new Float32Array(fwData.pos), 3));
fenceWireGeo.setAttribute('normal', new Et(new Float32Array(fwData.nor), 3));
fenceWireGeo.setIndex(fwData.idx);
const fenceWireMesh = new ar(fenceWireGeo, roleMat('wire'), PLAINS_FENCE_N);
fenceWireMesh.name = 'Plains roadside fence wire';
fenceWireMesh.frustumCulled = false;
Nt.add(fenceWireMesh);

// Streaming state
let lastPlainsGrassCell = -999999;
let lastPlainsFenceCell = -999999;
const plainsGrassMat = new $e();

function updatePlainsStreaming(camX, camZ, time) {
  if (camX < 40000) {
    plainsNearGrassMesh.visible = false;
    plainsMidGrassMesh.visible = false;
    fencePostMesh.visible = false;
    fenceWireMesh.visible = false;
    return;
  }
  plainsNearGrassMesh.visible = true;
  plainsMidGrassMesh.visible = true;
  fencePostMesh.visible = true;
  fenceWireMesh.visible = true;

  // 1. Update Roadside Fences
  const fenceCenter = Math.round(camX / 4.0);
  if (fenceCenter !== lastPlainsFenceCell) {
    lastPlainsFenceCell = fenceCenter;
    let fSlot = 0;
    const halfF = PLAINS_FENCE_N >> 2;
    for (let f = fenceCenter - halfF; f <= fenceCenter + halfF; f++) {
      const fx = f * 4.0;
      if (fx < 42000 || fx > 86000) continue;
      // 10m gate opening every 2000m
      if (Math.abs(fx % 2000) < 10) continue;

      for (const fz of [-14.5, 14.5]) {
        // Skip at drive-in entrance on left (negative z)
        if (fz < 0 && fx >= 64520 && fx <= 64680) continue;
        const fy = os(fx, fz);
        plainsGrassMat.makeTranslation(fx, fy, fz);
        fencePostMesh.setMatrixAt(fSlot, plainsGrassMat);
        fenceWireMesh.setMatrixAt(fSlot, plainsGrassMat);
        fSlot++;
        if (fSlot >= PLAINS_FENCE_N) break;
      }
      if (fSlot >= PLAINS_FENCE_N) break;
    }
    while (fSlot < PLAINS_FENCE_N) {
      plainsGrassMat.makeTranslation(0, -999, 0);
      fencePostMesh.setMatrixAt(fSlot, plainsGrassMat);
      fenceWireMesh.setMatrixAt(fSlot, plainsGrassMat);
      fSlot++;
    }
    fencePostMesh.instanceMatrix.needsUpdate = true;
    fenceWireMesh.instanceMatrix.needsUpdate = true;
  }

  // 2. Update Grass Tufts (Deterministic per cell)
  const currentCell = Math.floor(camX / 30.0);
  if (currentCell !== lastPlainsGrassCell) {
    lastPlainsGrassCell = currentCell;
    let nSlot = 0, mSlot = 0;

    // Stream grid around camera: -4 to +4 cells x -4 to +4 cells
    for (let cx = -4; cx <= 4; cx++) {
      for (let cz = -4; cz <= 4; cz++) {
        const cellX = (currentCell + cx) * 30.0;
        const cellZ = Math.round(camZ / 30.0) * 30.0 + cz * 30.0;

        // Seeded generation within cell
        for (let k = 0; k < 45; k++) {
          const rx = Un(cellX * 0.11 + k * 13.7, cellZ * 0.17 + k * 7.1) * 30.0;
          const rz = Un(cellX * 0.19 + k * 5.3, cellZ * 0.23 + k * 11.9) * 30.0;
          const gx = cellX + rx;
          const gz = cellZ + rz;

          // Avoid highway surface and shoulders
          if (Math.abs(gz) < 4.8) continue;
          // Avoid drive-in main lot & buildings
          if (gx >= 64520 && gx <= 64680 && gz <= -10 && gz >= -150) continue;

          const dist = Math.hypot(gx - camX, gz - camZ);
          const gy = os(gx, gz);
          const sc = 0.75 + 0.5 * Un(gx * 0.31, gz * 0.43);

          if (dist <= 85.0 && nSlot < PLAINS_GRASS_NEAR_N) {
            plainsGrassMat.makeTranslation(gx, gy, gz);
            plainsNearGrassMesh.setMatrixAt(nSlot++, plainsGrassMat);
          } else if (dist <= 210.0 && mSlot < PLAINS_GRASS_MID_N) {
            plainsGrassMat.makeTranslation(gx, gy, gz);
            plainsMidGrassMesh.setMatrixAt(mSlot++, plainsGrassMat);
          }
        }
      }
    }
    while (nSlot < PLAINS_GRASS_NEAR_N) {
      plainsGrassMat.makeTranslation(0, -999, 0);
      plainsNearGrassMesh.setMatrixAt(nSlot++, plainsGrassMat);
    }
    while (mSlot < PLAINS_GRASS_MID_N) {
      plainsGrassMat.makeTranslation(0, -999, 0);
      plainsMidGrassMesh.setMatrixAt(mSlot++, plainsGrassMat);
    }
    plainsNearGrassMesh.instanceMatrix.needsUpdate = true;
    plainsMidGrassMesh.instanceMatrix.needsUpdate = true;
  }
}
`;

// Insert builders into index.html right before buildStationGestures
const insertionMarker = 'function buildStationGestures() {';
html = replaceOnce(html, insertionMarker, plainsBuildersCode + '\n' + plainsGrassAndFencesCode + '\n' + insertionMarker, 'plains builders');
console.log('Plains builders and grass/fence streaming inserted.');

fs.writeFileSync(indexPath, html);
console.log('Step 2 complete.');
