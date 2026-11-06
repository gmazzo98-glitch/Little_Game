// Script to patch index.html with the Great Plains region and Harvest Moon Drive-In
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('Original index.html length:', html.length);

// Helper for exact replacement
function replaceOnce(str, target, replacement, label) {
  if (!str.includes(target)) throw new Error(`Target not found: ${label}`);
  return str.replace(target, replacement);
}

// 1. PAL additions
const palTarget = `  fernSignGreen: 0x38e898, fernConeGold: 0xffb85c,
};`;

const palReplacement = `  fernSignGreen: 0x38e898, fernConeGold: 0xffb85c,
  plainsStraw: 0xb8a56a, plainsGreen: 0x8c9a52, plainsOlive: 0x4d5530,
  plainsVerge: 0x9b8f6c, plainsDuskStraw: 0xc79a57,
  harvestCabinet: 0x421a1e, harvestNeonRed: 0xff2828, harvestNeonCyan: 0x28d8ff,
  harvestLampWarm: 0xffb86b, screenPanelWhite: 0xdedcd4, screenTrussWood: 0x5c4f3f,
  elevatorWood: 0x6e6659, sidingBallast: 0x78756c, cottonwoodFoliage: 0x748c52,
};`;
html = replaceOnce(html, palTarget, palReplacement, 'PAL');
console.log('PAL patched.');

// 2. ROLE_MATS additions
const roleMatsTarget = `    if (base === 'fernSignGreen') { m.emissive = new Me(PAL.fernSignGreen); m.emissiveIntensity = 1.45; }
    if (base === 'fernConeGold') { m.emissive = new Me(PAL.fernConeGold); m.emissiveIntensity = 1.25; }`;

const roleMatsReplacement = `    if (base === 'fernSignGreen') { m.emissive = new Me(PAL.fernSignGreen); m.emissiveIntensity = 1.45; }
    if (base === 'fernConeGold') { m.emissive = new Me(PAL.fernConeGold); m.emissiveIntensity = 1.25; }
    if (base === 'harvestNeonRed') { m.emissive = new Me(PAL.harvestNeonRed); m.emissiveIntensity = 1.8; }
    if (base === 'harvestNeonCyan') { m.emissive = new Me(PAL.harvestNeonCyan); m.emissiveIntensity = 1.35; }
    if (base === 'harvestLampWarm') { m.emissive = new Me(PAL.harvestLampWarm); m.emissiveIntensity = 1.1; }
    if (base === 'screenPanelWhite') { m.emissive = new Me(0x181e28); m.emissiveIntensity = 0.08; }`;
html = replaceOnce(html, roleMatsTarget, roleMatsReplacement, 'ROLE_MATS');
console.log('ROLE_MATS patched.');

// 3. ROUTE_CATALOG, Constants, us66RoadY, plainsGust, plainsPads
const routeCatalogTarget = `const ROUTE_CATALOG = {
  desert: [
    { id: 'cinder_court', name: 'CINDER COURT', fullName: 'Cinder Court Motor Lodge', route: 'US 66', x: motelX, z: 0, s: 0, mileLabel: '18 MI', mapX: 148, mapY: 292, linkTo: 'northwest' },
    { id: 'sunset_service', name: 'SUNSET SERVICE', fullName: 'Sunset Service Station', route: 'US 66', x: 0, z: 0, s: -4600, mileLabel: '0 MI', mapX: 360, mapY: 202 },
    { id: 'starlite_diner', name: 'STARLITE DINER', fullName: 'Starlite Diner & Bar', route: 'US 66', x: dinerX, z: 0, s: -9200, mileLabel: '18 MI', mapX: 572, mapY: 292 }
  ],
  northwest: [`;

const routeCatalogReplacement = `const PLACEHOLDER_STEPPE = { start: 4600, end: 46000 };
const PLAINS_LAYOUT = {
  hingeStart: 42000, hingePeak: 45000, hingeEnd: 48500,
  silo: { x: 47600, z: 70 },
  elevator: { x: 52400, z: -70 },
  siding: { xStart: 52100, xEnd: 52700, z: -40, z0: -42, z1: -38 },
  waterTower: { x: 53100, z: 210 },
  hayStacks: [{ x: 55200, z: -35 }, { x: 55200, z: 60 }],
  windmill: { x: 57000, z: 95 },
  shelterbeltW: { x0: 58000, x1: 59600, z: -300 },
  mailboxRow: { x: 61000, z: 6.2 },
  driveIn: { x: 64600, z: -14 },
  shelterbeltE: { x0: 66500, x1: 68500, z: 260 },
  endRegion: 84000, placeholderEnd: 102000
};
const PLAINS_PROJECTOR = false;
function us66RoadY(x) {
  if (x < 42000) return 0;
  if (x < 48500) {
    const u = (x - 42000) / 6500;
    return 12.0 * Math.sin(Math.min(1, Math.max(0, u)) * Math.PI);
  }
  return 0;
}
function plainsGust(x, z, t) {
  const d = x * 0.72 + z * 0.69;
  const p = d / 420.0 - t * 0.0333;
  const slow = 0.32 * Math.sin(t * 0.031 + x * 0.00015) + 0.18 * Math.cos(t * 0.017 + z * 0.0002);
  const w1 = Math.sin((p + slow) * Math.PI * 2);
  const w2 = Math.sin((p * 2.13 - t * 0.015) * Math.PI * 2) * 0.35;
  const raw = 0.5 + 0.5 * (w1 * 0.75 + w2);
  return Math.max(0, Math.min(1, raw * raw));
}
const plainsPads = [
  [64520, -48, 64680, -3.15],
  [64596, -38, 64604, -30],
  [64590, -145, 64620, -125],
  [52080, -46, 52720, -34],
  [53080, 195, 53120, 225],
  [56985, 85, 57015, 105],
  [60990, 3.2, 61010, 8.5]
];
const ROUTE_CATALOG = {
  desert: [
    { id: 'cinder_court', name: 'CINDER COURT', fullName: 'Cinder Court Motor Lodge', route: 'US 66', x: motelX, z: 0, s: 0, mileLabel: '18 MI', mapX: 148, mapY: 292, linkTo: 'northwest' },
    { id: 'sunset_service', name: 'SUNSET SERVICE', fullName: 'Sunset Service Station', route: 'US 66', x: 0, z: 0, s: -4600, mileLabel: '0 MI', mapX: 360, mapY: 202 },
    { id: 'starlite_diner', name: 'STARLITE DINER', fullName: 'Starlite Diner & Bar', route: 'US 66', x: dinerX, z: 0, s: -9200, mileLabel: '18 MI', mapX: 572, mapY: 292 }
  ],
  plains: [
    { id: 'harvest_moon', name: 'HARVEST MOON', fullName: 'Harvest Moon Drive-In', route: 'US 66', x: 64600, z: -14, s: -69200, mileLabel: '55 MI', mapX: 790, mapY: 292, kind: 'stop', signLines: ['HARVEST MOON DRIVE-IN', 'CLOSED FOR SEASON'] },
    { id: 'plains_silo', name: 'CONCRETE SILO', fullName: 'Concrete Silo & Steppe Hinge', route: 'US 66', x: 47600, z: 70, s: -52200, mileLabel: '45 MI', mapX: 620, mapY: 260, kind: 'landmark' },
    { id: 'plains_elevator', name: 'GRAIN ELEVATOR & SIDING', fullName: 'Grain Elevator & Dead Siding', route: 'US 66', x: 52400, z: -70, s: -57000, mileLabel: '48 MI', mapX: 660, mapY: 324, kind: 'landmark' },
    { id: 'plains_water_tower', name: 'WATER TOWER', fullName: 'Plains Municipal Water Tower', route: 'US 66', x: 53100, z: 210, s: -57700, mileLabel: '48 MI', mapX: 685, mapY: 250, kind: 'landmark' },
    { id: 'plains_windmill', name: 'WINDMILL & TANK', fullName: 'Stock Tank Windmill', route: 'US 66', x: 57000, z: 95, s: -61600, mileLabel: '51 MI', mapX: 720, mapY: 260, kind: 'landmark' },
    { id: 'plains_mailboxes', name: 'MAILBOX ROW', fullName: 'Rural Mailbox Row & Pad', route: 'US 66', x: 61000, z: 6.2, s: -65600, mileLabel: '53 MI', mapX: 755, mapY: 280, kind: 'landmark' }
  ],
  northwest: [`;
html = replaceOnce(html, routeCatalogTarget, routeCatalogReplacement, 'ROUTE_CATALOG');
console.log('ROUTE_CATALOG & Plains constants patched.');

// 4. os(x, z, forTerrainMesh)
const osTarget = `function os(x, z, forTerrainMesh = false) {
  // The widest forecourt distance blend saturates at 89 meters.
  let distance = Math.min(89, Math.max(Math.abs(z) - 3.5, 0));
  if (distance > 0) {
    for (const [x0, z0, x1, z1] of forecourt) {
      distance = nearerRectDistance(x, z, x0, z0, x1, z1, distance);
    }
  }
  if (x >= -9540 && distance === 0) return 0;
  const dunes = .45 + 2.3 * Hm(x * .008, z * .008) + .28 * ao(x * .023 + 17, z * .023 + 43);
  if (x >= -9540) {
    const blend = xc(Math.min(distance / 20, 1));
    let h = dunes * blend;
    if (x < -6400 && distance > 24) {
      const f = nwH(-4600 - x, 1800, 4900) * xc(Math.min((distance - 24) / 65, 1));
      h += f * (6.5 * Hm(x * .0035, z * .0035) + 2.2 * ao(x * .011, z * .011));
    }
    return h;
  }`;

const osReplacement = `function os(x, z, forTerrainMesh = false) {
  // The widest forecourt / plains pad distance blend saturates at 89 meters.
  let distance = Math.min(89, Math.max(Math.abs(z) - 3.5, 0));
  if (distance > 0) {
    if (x < 10000) {
      for (const [x0, z0, x1, z1] of forecourt) {
        distance = nearerRectDistance(x, z, x0, z0, x1, z1, distance);
      }
    } else if (x > 45000) {
      for (const [x0, z0, x1, z1] of plainsPads) {
        distance = nearerRectDistance(x, z, x0, z0, x1, z1, distance);
      }
    }
  }
  if (x >= -9540 && distance === 0) return us66RoadY(x);
  const dunes = .45 + 2.3 * Hm(x * .008, z * .008) + .28 * ao(x * .023 + 17, z * .023 + 43);
  if (x >= -9540) {
    const blend = xc(Math.min(distance / 20, 1));
    const yr = us66RoadY(x);
    if (x < 4600) {
      let h = dunes * blend;
      if (x < -6400 && distance > 24) {
        const f = nwH(-4600 - x, 1800, 4900) * xc(Math.min((distance - 24) / 65, 1));
        h += f * (6.5 * Hm(x * .0035, z * .0035) + 2.2 * ao(x * .011, z * .011));
      }
      return h;
    }
    // Great Plains and Steppe branch (x >= 4600)
    const plainsFactor = nwH(x, 4600, 28000);
    const rolling = 1.9 * Hm(x * .0016 + 7.3, z * .0016 + 2.1) + 0.85 * ao(x * .0042 + 13, z * .0042 + 37) + 0.35 * ao(x * .012 + 5, z * .012 + 19);
    // Dry washes / swales crossed by low road culverts
    const dSwale = Math.min(Math.abs(x - 50200), Math.abs(x - 59000), Math.abs(x - 73000));
    const swaleDip = (dSwale < 180 && distance > 5.0) ? (2.1 * (1 - xc(dSwale / 180)) * xc(Math.min((distance - 5.0) / 15, 1))) : 0;
    // Drive-in field mound rows (9 arced concentric rows)
    let moundH = 0;
    if (x >= 64530 && x <= 64710 && z <= -68 && z >= -210) {
      const distFromScreen = Math.hypot(x - 64620, z - -62);
      if (distFromScreen >= 16 && distFromScreen <= 145) {
        const mPhase = (distFromScreen - 16) / 14;
        moundH = 0.72 * Math.pow(Math.sin(mPhase * Math.PI), 2.0);
      }
    }
    const groundRelief = (dunes * (1 - plainsFactor) + rolling * plainsFactor) - swaleDip + moundH;
    return yr + groundRelief * blend;
  }`;
html = replaceOnce(html, osTarget, osReplacement, 'os');
console.log('os() patched.');

// 5. Sky shader uniform & fragment updates
const skyUniformTarget = `uniforms:{sunDir:{value:new P(-.985,.062,-.15).normalize()},moonDir:{value:new P(52,26,20).normalize()},uNight:{value:0},uDay:{value:0},uOvercast:{value:0},uForestSkyline:{value:0}}`;
const skyUniformReplacement = `uniforms:{sunDir:{value:new P(-.985,.062,-.15).normalize()},moonDir:{value:new P(52,26,20).normalize()},uNight:{value:0},uDay:{value:0},uOvercast:{value:0},uForestSkyline:{value:0},uPlains:{value:0},uStormGlow:{value:0},uHeatLightning:{value:0},uStormDrift:{value:0}}`;
html = replaceOnce(html, skyUniformTarget, skyUniformReplacement, 'sky uniforms');

const skyFragUniformsTarget = `      uniform float uNight;
      uniform float uDay;
      uniform float uOvercast;
      uniform float uForestSkyline;`;

const skyFragUniformsReplacement = `      uniform float uNight;
      uniform float uDay;
      uniform float uOvercast;
      uniform float uForestSkyline;
      uniform float uPlains;
      uniform float uStormGlow;
      uniform float uHeatLightning;
      uniform float uStormDrift;`;
html = replaceOnce(html, skyFragUniformsTarget, skyFragUniformsReplacement, 'sky frag uniforms');

const skyMountainTarget = `        if (direction.y < .18) {
          float a = atan(direction.z, direction.x);
          float nwDir = smoothstep(-0.2, 0.85, -direction.x * 0.7 - direction.z * 0.5) * uForestSkyline;
          float serration = (0.5 + 0.5 * sin(a * 95.0) * cos(a * 143.0)) * 0.011 * nwDir;
          float farRidge = ridge(a, .7, .095 + .065 * nwDir) + serration * 0.7;
          float midRidge = ridge(a, 2.9, .058 + .052 * nwDir) + serration;
          float nearRidge = ridge(a, 5.1, .030 + .038 * nwDir) + serration * 0.85;`;

const skyMountainReplacement = `        if (uPlains > 0.01) {
          vec3 plainsZenith = mix(vec3(.018, .026, .110), vec3(.001, .002, .010), uNight);
          vec3 plainsMid = mix(vec3(.380, .140, .320), vec3(.006, .008, .026), uNight);
          vec3 plainsHorizon = mix(vec3(1.0, .580, .200), vec3(.015, .035, .038), uNight);
          zenith = mix(zenith, plainsZenith, uPlains);
          mid = mix(mid, plainsMid, uPlains);
          horizon = mix(horizon, plainsHorizon, uPlains);
        }
        if (direction.y < .18) {
          float a = atan(direction.z, direction.x);
          float nwDir = smoothstep(-0.2, 0.85, -direction.x * 0.7 - direction.z * 0.5) * uForestSkyline;
          float serration = (0.5 + 0.5 * sin(a * 95.0) * cos(a * 143.0)) * 0.011 * nwDir;
          float ridgeScale = 1.0 - 0.96 * uPlains;
          float farRidge = (ridge(a, .7, .095 + .065 * nwDir) + serration * 0.7) * ridgeScale;
          float midRidge = (ridge(a, 2.9, .058 + .052 * nwDir) + serration) * ridgeScale;
          float nearRidge = (ridge(a, 5.1, .030 + .038 * nwDir) + serration * 0.85) * ridgeScale;`;
html = replaceOnce(html, skyMountainTarget, skyMountainReplacement, 'sky mountains');

const skyHazeBandTarget = `        // A shallow haze band joins the distant silhouettes to the ground fog.
        col = mix(col, haze, 1.0 - smoothstep(-.018, .009 + .018 * uOvercast, direction.y));`;

const skyHazeBandReplacement = `        // Distant storm silhouette on the rim:
        if (uPlains > 0.05 && direction.y > -0.01 && direction.y < 0.28) {
          float a = atan(direction.z, direction.x);
          float stormAz = -0.65 + uStormDrift * 0.35;
          float dAz = abs(mod(a - stormAz + 3.14159, 6.28318) - 3.14159);
          float baseH = 0.025, topH = 0.22;
          if (dAz < 0.42 && direction.y >= baseH && direction.y <= topH) {
            float colWidth = direction.y > 0.14 ? mix(0.18, 0.38, (direction.y - 0.14) / 0.08) : 0.18;
            float cloudEdge = smoothstep(colWidth, colWidth - 0.04, dAz);
            float cloudTop = smoothstep(topH, topH - 0.02, direction.y);
            float cloudMask = cloudEdge * cloudTop * uPlains * (1.0 - 0.75 * uOvercast);
            if (cloudMask > 0.005) {
              vec3 stormBaseCol = mix(vec3(.12, .08, .14), vec3(.012, .014, .022), uNight);
              vec3 anvilGlow = mix(vec3(1.0, .68, .35), vec3(.75, .32, .55), clamp(uNight * 1.8, 0.0, 1.0));
              anvilGlow = mix(anvilGlow, vec3(.35, .20, .45), clamp((uNight - 0.5) * 2.0, 0.0, 1.0));
              float topCatch = smoothstep(0.12, 0.21, direction.y) * (1.0 - smoothstep(0.7, 0.95, uNight));
              vec3 stormCol = mix(stormBaseCol, anvilGlow, topCatch * 0.85);
              if (uHeatLightning > 0.001) {
                float interior = smoothstep(colWidth - 0.02, 0.0, dAz) * smoothstep(baseH, baseH + 0.04, direction.y) * smoothstep(topH, topH - 0.04, direction.y);
                stormCol += vec3(0.9, 0.92, 1.0) * uHeatLightning * interior * 1.8;
              }
              col = mix(col, stormCol, cloudMask * 0.92);
            }
          }
        }
        // A shallow haze band joins the distant silhouettes to the ground fog.
        col = mix(col, haze, 1.0 - smoothstep(-.018, .009 + .018 * uOvercast, direction.y));`;
html = replaceOnce(html, skyHazeBandTarget, skyHazeBandReplacement, 'sky storm & haze');
console.log('Sky shader patched.');

// 6. Terrain Material uniforms and shader injection
const terrainUniformTarget = `const terrainWetnessUniform = {value: 0};
const terrainSkyTone = {value: new Me(0, 0, 0)};
desertMaterial.onBeforeCompile = shader => {
  shader.uniforms.coupeFootprint = coupeFootprint;
  shader.uniforms.uWetness = terrainWetnessUniform;
  shader.uniforms.uSkyTone = terrainSkyTone;`;

const terrainUniformReplacement = `const terrainWetnessUniform = {value: 0};
const terrainSkyTone = {value: new Me(0, 0, 0)};
const terrainTimeUniform = {value: 0};
desertMaterial.onBeforeCompile = shader => {
  shader.uniforms.coupeFootprint = coupeFootprint;
  shader.uniforms.uWetness = terrainWetnessUniform;
  shader.uniforms.uSkyTone = terrainSkyTone;
  shader.uniforms.uTime = terrainTimeUniform;`;
html = replaceOnce(html, terrainUniformTarget, terrainUniformReplacement, 'terrain uniforms');

const terrainCommonFragTarget = `      uniform float uWetness;
      uniform vec3 uSkyTone;
      float sandHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }`;

const terrainCommonFragReplacement = `      uniform float uWetness;
      uniform vec3 uSkyTone;
      uniform float uTime;
      float sandHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }`;
html = replaceOnce(html, terrainCommonFragTarget, terrainCommonFragReplacement, 'terrain frag uniform');

const terrainNatGroundTarget = `      natGround = mix(natGround, gorgeGround, nwH(bioS, 11200.0, 16800.0));
      natGround = mix(natGround, valleyFloor, nwH(bioS, 19500.0, 24800.0));`;

const terrainNatGroundReplacement = `      natGround = mix(natGround, gorgeGround, nwH(bioS, 11200.0, 16800.0));
      natGround = mix(natGround, valleyFloor, nwH(bioS, 19500.0, 24800.0));
      if (p.x > 4600.0) {
        float plainsBiome = nwH(p.x, 42000.0, 48000.0);
        float steppeRamp = nwH(p.x, 4600.0, 42000.0);
        float pNoise1 = sandNoise(p * 0.008);
        float pNoise2 = sandNoise(p * 0.028);
        float grassMix = 0.65 * pNoise1 + 0.35 * pNoise2;
        vec3 straw = mix(vec3(.72, .65, .42), vec3(.78, .60, .34), pNoise2);
        vec3 greenGold = mix(vec3(.55, .60, .32), vec3(.30, .33, .19), pNoise2 * 0.7);
        vec3 plainsBase = mix(straw, greenGold, smoothstep(0.25, 0.75, grassMix));
        float dRoad = abs(p.y);
        float vergeMask = smoothstep(3.4, 12.0, dRoad);
        vec3 vergeColor = mix(vec3(.61, .56, .42), plainsBase, vergeMask);
        float gustPhase = (p.x * 0.72 + p.y * 0.69) / 420.0 - uTime * 0.0333;
        float gustStreak = sin(gustPhase * 6.28318) * 0.5 + 0.5;
        vergeColor = mix(vergeColor * 0.92, vergeColor * 1.08, gustStreak * 0.35);
        vec3 steppeGround = mix(basinGround, vergeColor, 0.5 + 0.5 * steppeRamp);
        natGround = mix(steppeGround, vergeColor, plainsBiome);
      }`;
html = replaceOnce(html, terrainNatGroundTarget, terrainNatGroundReplacement, 'terrain natGround');

const terrainApronTarget = `      float asphaltMask = max(road, max(max(west, east), max(forkApron, fbRamps)));
      float pavedApron = max(max(motelApron, dinerApron), fbApron);`;

const terrainApronReplacement = `      float plainsGravel = 0.0;
      if (p.x > 45000.0) {
        if (p.x > 52070.0 && p.x < 52730.0) {
          plainsGravel = max(plainsGravel, desertRect(p, vec2(52080.0, -46.0), vec2(52720.0, -34.0), 0.65));
        }
        if (p.x > 64510.0 && p.x < 64690.0) {
          plainsGravel = max(plainsGravel, desertRect(p, vec2(64520.0, -48.0), vec2(64680.0, -3.15), 0.75));
          plainsGravel = max(plainsGravel, desertRect(p, vec2(64590.0, -145.0), vec2(64620.0, -125.0), 0.75));
        }
        if (p.x > 60985.0 && p.x < 61015.0) {
          plainsGravel = max(plainsGravel, desertRect(p, vec2(60990.0, 3.2), vec2(61010.0, 8.5), 0.45));
        }
      }
      float asphaltMask = max(road, max(max(west, east), max(forkApron, fbRamps)));
      float pavedApron = max(max(motelApron, dinerApron), fbApron);`;
html = replaceOnce(html, terrainApronTarget, terrainApronReplacement, 'terrain apron');

const terrainGroundMixTarget = `      ground = mix(ground, vec3(.145,.138,.128) * mix(1.0, 0.60, wetFactor), pavedApron);`;
const terrainGroundMixReplacement = `      ground = mix(ground, vec3(.145,.138,.128) * mix(1.0, 0.60, wetFactor), pavedApron);
      ground = mix(ground, vec3(.24,.23,.20) * (0.85 + 0.25 * n), plainsGravel);`;
html = replaceOnce(html, terrainGroundMixTarget, terrainGroundMixReplacement, 'terrain gravel mix');
console.log('Terrain fragment shader patched.');

// 7. footSurface and footstep
const footSurfaceTarget = `  if(Math.abs(x)<8.5 && z>=-12.94 && z<=-4.45)return 2;
  if(onAsphalt())return 1;
  return 0;
}`;

const footSurfaceReplacement = `  if(Math.abs(x)<8.5 && z>=-12.94 && z<=-4.45)return 2;
  if(x >= 4600) {
    if(Math.abs(x - 64600) < 5.8 && z > -138.5 && z < -131.5) return 3;
    if(Math.abs(x - 64600) < 1.1 && z > -35.2 && z < -32.8) return 3;
    if(Math.abs(x - 64620) < 10.5 && z > -63.5 && z < -60.5 && Nn.position.y > 1.2) return 8;
    if(x >= 64540 && x <= 64700 && z <= -68 && z >= -210) return 7;
    if(plainsPads.some(([x0, z0, x1, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1)) return 6;
    if(Math.abs(z) <= 3.5) return 1;
    if(Math.abs(z) <= 5.75) return 6;
    return 5;
  }
  if(onAsphalt())return 1;
  return 0;
}`;
html = replaceOnce(html, footSurfaceTarget, footSurfaceReplacement, 'footSurface');

const footstepTarget = `function footstep(surf){if(!audio.ctx||audio.ctx.state!=="running")return;if(surf===3)surf=1;var c=audio.ctx,s=c.createBufferSource();s.buffer=audio.noiseBuf;s.playbackRate.value=.65+Math.random()*.3;var f=c.createBiquadFilter();f.type=surf?"bandpass":"lowpass";f.frequency.value=surf===2?460+Math.random()*120:(surf===4?320+Math.random()*80:(surf?380+Math.random()*120:200+Math.random()*60));f.Q.value=surf===2?1.1:(surf===4?1.4:(surf?.8:.5));`;

const footstepReplacement = `function footstep(surf){if(!audio.ctx||audio.ctx.state!=="running")return;if(surf===3)surf=1;var c=audio.ctx,s=c.createBufferSource();s.buffer=audio.noiseBuf;s.playbackRate.value=.65+Math.random()*.3;var f=c.createBiquadFilter();var isGrass = surf === 5, isGravel = surf === 6, isMound = surf === 7, isBoards = surf === 8;f.type=(isGrass||isGravel||isBoards||surf===1||surf===2)?"bandpass":"lowpass";f.frequency.value=isGrass?820+Math.random()*150:(isGravel?680+Math.random()*120:(isMound?230+Math.random()*60:(isBoards?290+Math.random()*80:(surf===2?460+Math.random()*120:(surf===4?320+Math.random()*80:(surf?380+Math.random()*120:200+Math.random()*60))))));f.Q.value=isGravel?1.35:(isGrass?0.65:(isBoards?1.5:(surf===2?1.1:(surf===4?1.4:(surf?.8:.5)))));`;
html = replaceOnce(html, footstepTarget, footstepReplacement, 'footstep');
console.log('footSurface & footstep patched.');

// 8. carSurfaceAt
const carSurfaceAtTarget = `function carSurfaceAt(x, z) {
  if (forecourt.some(([x0, z0, x1, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1)) return 'asphalt';
  if (bridgeDeckHeight(x, z) > -99) return 'asphalt';
  if (x < forkX + 45) {
    const zr = nwRoadZ(x), slope = nwRoadSlopeZ(x), perp = Math.abs(z - zr) / Math.hypot(1, slope);
    if (perp <= 3.35) return 'asphalt';
    if (x >= -9642 && x <= -9576 && z >= zr - 3.25 && z <= 3.25) return 'asphalt';
    if (x >= -28382 && x <= -28318 && z >= -6423.0 && z <= -6403.0) return 'asphalt';
    if (sr14TurnoutDist(x, z, zr) <= 0.25 || perp <= 5.75) return 'shoulder';
  }
  if (Math.abs(z) <= 3.35) return highwaySandDrift(x, z) > .18 ? 'drift' : 'asphalt';
  if (Math.abs(z) <= 5.75) return 'shoulder';
  return 'sand';
}`;

const carSurfaceAtReplacement = `function carSurfaceAt(x, z) {
  if (forecourt.some(([x0, z0, x1, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1)) return 'asphalt';
  if (bridgeDeckHeight(x, z) > -99) return 'asphalt';
  if (x < forkX + 45) {
    const zr = nwRoadZ(x), slope = nwRoadSlopeZ(x), perp = Math.abs(z - zr) / Math.hypot(1, slope);
    if (perp <= 3.35) return 'asphalt';
    if (x >= -9642 && x <= -9576 && z >= zr - 3.25 && z <= 3.25) return 'asphalt';
    if (x >= -28382 && x <= -28318 && z >= -6423.0 && z <= -6403.0) return 'asphalt';
    if (sr14TurnoutDist(x, z, zr) <= 0.25 || perp <= 5.75) return 'shoulder';
  }
  if (x >= 4600) {
    if (Math.abs(z) <= 3.35) return 'asphalt';
    if (plainsPads.some(([x0, z0, x1, z1]) => x >= x0 && x <= x1 && z >= z0 && z <= z1)) return 'gravel';
    if (Math.abs(z) <= 5.75) return 'shoulder';
    return 'grass';
  }
  if (Math.abs(z) <= 3.35) return highwaySandDrift(x, z) > .18 ? 'drift' : 'asphalt';
  if (Math.abs(z) <= 5.75) return 'shoulder';
  return 'sand';
}`;
html = replaceOnce(html, carSurfaceAtTarget, carSurfaceAtReplacement, 'carSurfaceAt');

// Coupe physics with 'grass' and 'gravel'
const surfaceDragTarget = `  const surfaceDrag = currentSurface==='sand' ? (gearState==='L'?1.25:1.75) : (currentSurface==='shoulder'?0.55:(currentSurface==='drift'?0.16:(0.095 + 0.0032 * absSpd)));
  const maxFwd = gearState==='L' ? 15.5 : (currentSurface==='sand' ? 19.5 : (currentSurface==='shoulder' ? 25.5 : 31.8));`;

const surfaceDragReplacement = `  const surfaceDrag = currentSurface==='sand' ? (gearState==='L'?1.25:1.75) : (currentSurface==='shoulder'||currentSurface==='gravel'?0.55:(currentSurface==='grass'?0.38:(currentSurface==='drift'?0.16:(0.095 + 0.0032 * absSpd))));
  const maxFwd = gearState==='L' ? 15.5 : (currentSurface==='sand' ? 19.5 : (currentSurface==='shoulder'||currentSurface==='gravel' ? 25.5 : (currentSurface==='grass' ? 28.5 : 31.8)));`;
html = replaceOnce(html, surfaceDragTarget, surfaceDragReplacement, 'surfaceDrag');

const surfRoughTarget = `  const surfRough = currentSurface==='shoulder' ? .012 : (currentSurface==='sand' ? .018 : (currentSurface==='drift' ? .010 : 0));`;
const surfRoughReplacement = `  const surfRough = currentSurface==='shoulder'||currentSurface==='gravel' ? .012 : (currentSurface==='sand' ? .018 : (currentSurface==='grass' ? .008 : (currentSurface==='drift' ? .010 : 0)));`;
html = replaceOnce(html, surfRoughTarget, surfRoughReplacement, 'surfRough');

const throttleOversteerTarget = `  const throttleOversteer = (onLoose || fn.Space) ? (throttle * Math.sign(steeringAngle) * (currentSurface === 'sand' ? 2.8 : 1.7)) : 0;`;
const throttleOversteerReplacement = `  const throttleOversteer = (onLoose || fn.Space) ? (throttle * Math.sign(steeringAngle) * (currentSurface === 'sand' ? 2.8 : (currentSurface === 'grass' ? 2.2 : 1.7))) : 0;`;
html = replaceOnce(html, throttleOversteerTarget, throttleOversteerReplacement, 'throttleOversteer');

const dustSpawnTarget = `    spawnTireDust(dt, Math.min(1, absSpd / 16) * (currentSurface==='sand' ? 1.1 : .75));`;
const dustSpawnReplacement = `    if(currentSurface !== 'grass') spawnTireDust(dt, Math.min(1, absSpd / 16) * (currentSurface==='sand' ? 1.1 : .75));`;
html = replaceOnce(html, dustSpawnTarget, dustSpawnReplacement, 'dustSpawn');

const surfBadgeTarget = `  const surfBadge=currentSurface==='sand'?'  ·  DESERT SAND':(currentSurface==='drift'?'  ·  SAND DRIFT':(currentSurface==='shoulder'?'  ·  SHOULDER':''));`;
const surfBadgeReplacement = `  const surfBadge=currentSurface==='sand'?'  ·  DESERT SAND':(currentSurface==='drift'?'  ·  SAND DRIFT':(currentSurface==='shoulder'?'  ·  SHOULDER':(currentSurface==='grass'?'  ·  PLAINS GRASS':(currentSurface==='gravel'?'  ·  GRAVEL':''))));`;
html = replaceOnce(html, surfBadgeTarget, surfBadgeReplacement, 'surfBadge');
console.log('carSurfaceAt & coupe physics patched.');

// 9. updateMileposts
const updateMilepostsTarget = `let lastMilepostCell = -999999;
function updateMileposts(camX) {
  if (camX > forkX + 50) {
    milepostMesh.visible = false; milepostPostMesh.visible = false;
    return;
  }
  milepostMesh.visible = true; milepostPostMesh.visible = true;
  const currentMile = Math.floor(nwSFromX(camX) / 1609.344);
  if (currentMile === lastMilepostCell) return;
  lastMilepostCell = currentMile;

  const mat = new $e();
  const half = MILEPOST_POOL_N >> 1;
  let slot = 0;
  for (let m = currentMile - half; m <= currentMile + half; m++) {
    if (m < 3) continue;
    const s = m * 1609.344;
    const mx = nwXFromS(s);
    const mzr = nwRoadZ(mx);
    const mSide = (m % 2 === 0) ? 1 : -1;
    const mz = mzr + mSide * 4.65;
    const my = os(mx, mz);
    mat.makeTranslation(mx, my, mz);
    milepostMesh.setMatrixAt(slot, mat);
    milepostPostMesh.setMatrixAt(slot, mat);
    slot++;
    if (slot >= MILEPOST_POOL_N) break;
  }
  while (slot < MILEPOST_POOL_N) {
    mat.makeTranslation(0, -999, 0);
    milepostMesh.setMatrixAt(slot, mat);
    milepostPostMesh.setMatrixAt(slot, mat);
    slot++;
  }
  milepostMesh.instanceMatrix.needsUpdate = true;
  milepostPostMesh.instanceMatrix.needsUpdate = true;
}`;

const updateMilepostsReplacement = `let lastMilepostCell = -999999;
function updateMileposts(camX) {
  milepostMesh.visible = true; milepostPostMesh.visible = true;
  const onSR14 = camX <= forkX + 50;
  const currentMile = onSR14
    ? Math.floor(nwSFromX(camX) / 1609.344)
    : Math.floor((camX - dinerX) / 1609.344);
  if (currentMile === lastMilepostCell) return;
  lastMilepostCell = currentMile;

  const mat = new $e();
  const half = MILEPOST_POOL_N >> 1;
  let slot = 0;
  if (onSR14) {
    for (let m = currentMile - half; m <= currentMile + half; m++) {
      if (m < 3) continue;
      const s = m * 1609.344;
      const mx = nwXFromS(s);
      const mzr = nwRoadZ(mx);
      const mSide = (m % 2 === 0) ? 1 : -1;
      const mz = mzr + mSide * 4.65;
      const my = os(mx, mz);
      mat.makeTranslation(mx, my, mz);
      milepostMesh.setMatrixAt(slot, mat);
      milepostPostMesh.setMatrixAt(slot, mat);
      slot++;
      if (slot >= MILEPOST_POOL_N) break;
    }
  } else {
    for (let m = currentMile - half; m <= currentMile + half; m++) {
      if (m < 0) continue;
      const mx = dinerX + m * 1609.344;
      const mSide = (m % 2 === 0) ? 1 : -1;
      const mz = mSide * 4.65;
      const my = os(mx, mz);
      mat.makeTranslation(mx, my, mz);
      milepostMesh.setMatrixAt(slot, mat);
      milepostPostMesh.setMatrixAt(slot, mat);
      slot++;
      if (slot >= MILEPOST_POOL_N) break;
    }
  }
  while (slot < MILEPOST_POOL_N) {
    mat.makeTranslation(0, -999, 0);
    milepostMesh.setMatrixAt(slot, mat);
    milepostPostMesh.setMatrixAt(slot, mat);
    slot++;
  }
  milepostMesh.instanceMatrix.needsUpdate = true;
  milepostPostMesh.instanceMatrix.needsUpdate = true;
}`;
html = replaceOnce(html, updateMilepostsTarget, updateMilepostsReplacement, 'updateMileposts');
console.log('updateMileposts patched.');

// Write back to file
fs.writeFileSync(indexPath, html);
console.log('Base patch applied, written to index.html.');
