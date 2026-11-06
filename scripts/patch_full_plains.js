// Complete integration script for Great Plains in index.html
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('Beginning full Great Plains integration...');

function replaceOnce(str, target, replacement, label) {
  if (!str.includes(target)) throw new Error(`Target not found: ${label}`);
  return str.replace(target, replacement);
}

// ---------------------------------------------------------------------------
// 1. Great Plains Builders & Grass/Fence Streaming
// ---------------------------------------------------------------------------
const plainsBuildersSource = fs.readFileSync(path.join(__dirname, 'build_plains_complete.js'), 'utf8');
// Extract the plainsBuildersCode and plainsGrassAndFencesCode
const startBuilders = plainsBuildersSource.indexOf('const plainsBuildersCode = `') + 'const plainsBuildersCode = `'.length;
const endBuilders = plainsBuildersSource.indexOf('`;\n\n// -------------------------------------------------------------\n// 2. Instanced Grass Tufts');
const plainsBuildersCode = plainsBuildersSource.substring(startBuilders, endBuilders);

const startGrass = plainsBuildersSource.indexOf('const plainsGrassAndFencesCode = `') + 'const plainsGrassAndFencesCode = `'.length;
const endGrass = plainsBuildersSource.indexOf('`;\n\n// Insert builders into index.html');
const plainsGrassAndFencesCode = plainsBuildersSource.substring(startGrass, endGrass);

const insertionMarker = 'function buildStationGestures() {';
html = replaceOnce(html, insertionMarker, plainsBuildersCode + '\n' + plainsGrassAndFencesCode + '\n' + insertionMarker, 'plains builders and grass');
console.log('1. Plains builders and streaming added.');

// ---------------------------------------------------------------------------
// 2. Road Signs & Starlite Diner Mileage Trace
// ---------------------------------------------------------------------------
// Add Great Plains roadside signs in buildRoadSigns()
const roadSignsTarget = `  buildHighwayBoard(forkX + 92, -6.2, Math.PI * .58, 'JCT 14', ['STATE ROUTE 14  AHEAD', 'FERN BEND  •  CEDAR GORGE  ↗', 'U.S. 66 WEST  CONTINUES STRAIGHT']);`;
const roadSignsReplacement = `  buildHighwayBoard(forkX + 92, -6.2, Math.PI * .58, 'JCT 14', ['STATE ROUTE 14  AHEAD', 'FERN BEND  •  CEDAR GORGE  ↗', 'U.S. 66 WEST  CONTINUES STRAIGHT']);
  // Great Plains roadside distance signs:
  buildHighwayBoard(dinerX + 75, 5.8, -Math.PI * 0.5, 'US 66', ['HARVEST MOON  38 MI', 'CLOSED FOR SEASON', 'U.S. 66 EAST']);
  buildHighwayBoard(63100, 5.8, -Math.PI * 0.5, 'US 66', ['HARVEST MOON DRIVE-IN', '1 MILE  •  ENTRANCE ON LEFT', 'HISTORIC ROUTE 66']);`;
html = replaceOnce(html, roadSignsTarget, roadSignsReplacement, 'road signs');

// Starlite Diner counter slip mileage trace
const dinerSlipTarget = `    ctx.fillText('Left the bar lamp & neon burning.',18,184);
    agePaint(ctx,w,h,1966,.85);`;
const dinerSlipReplacement = `    ctx.fillText('Left the bar lamp & neon burning.',18,184);
    ctx.fillText('Harvest Moon Drive-In 38 mi east — closed.',18,208);
    agePaint(ctx,w,h,1966,.85);`;
html = replaceOnce(html, dinerSlipTarget, dinerSlipReplacement, 'diner slip mileage trace');
console.log('2. Roadside signs and diner mileage trace added.');

// ---------------------------------------------------------------------------
// 3. Glovebox Map (buildRoadMap) - Add 3rd Panel: US 66 East / Great Plains
// ---------------------------------------------------------------------------
const mapDividerTarget = `      // Section divider line
      ctx.strokeStyle = '#766e4e'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(416, 21); ctx.lineTo(416, 579); ctx.stroke();`;

const mapDividerReplacement = `      // Section divider lines for 3-panel map (x=320, 640)
      ctx.strokeStyle = '#766e4e'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(320, 21); ctx.lineTo(320, 579); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(640, 21); ctx.lineTo(640, 579); ctx.stroke();

      // Right panel (Great Plains) warm straw tint
      ctx.fillStyle = 'rgba(184, 165, 106, 0.09)';
      ctx.fillRect(641, 21, 298, 558);`;
html = replaceOnce(html, mapDividerTarget, mapDividerReplacement, 'map dividers');

// Update map headers
const mapHeadersTarget = `      ctx.fillStyle = '#4c4233'; ctx.font = 'bold 30px Georgia,serif';
      ctx.fillText('DESERT HIGHWAYS', 438, 54);
      ctx.font = 'bold 15px Georgia,serif';
      ctx.fillText('U.S. ROUTE 66 MOTOR GUIDE', 440, 74);
      ctx.textAlign = 'right';
      ctx.font = 'bold 13px Georgia,serif';
      ctx.fillText('1963 EDITION  •  SECTION 4', 924, 74);`;

const mapHeadersReplacement = `      ctx.fillStyle = '#4c4233'; ctx.font = 'bold 22px Georgia,serif';
      ctx.fillText('DESERT HIGHWAYS', 336, 52);
      ctx.font = 'bold 12px Georgia,serif';
      ctx.fillText('U.S. 66 CENTRAL • NEEDLES TO STARLITE', 338, 70);

      // Panel 3 Header: Great Plains
      ctx.fillStyle = '#4a3f28'; ctx.font = 'bold 22px Georgia,serif';
      ctx.fillText('GREAT PLAINS', 658, 52);
      ctx.font = 'bold 12px Georgia,serif';
      ctx.fillText('U.S. 66 EAST • MILEPOSTS 38–55', 658, 70);
      ctx.textAlign = 'right';
      ctx.font = 'bold 11px Georgia,serif';
      ctx.fillText('1963 MOTOR GUIDE', 924, 70);`;
html = replaceOnce(html, mapHeadersTarget, mapHeadersReplacement, 'map headers');

// Draw Great Plains Road & Stops in Panel 3
const mapStopsTarget = `      for (const st of desertStops) {
        ctx.strokeStyle = '#904e43'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(st.x, r66Y); ctx.lineTo(st.x, st.above ? r66Y - 18 : r66Y + 20); ctx.stroke();

        ctx.fillStyle = '#904e43';
        ctx.beginPath(); ctx.arc(st.x, r66Y, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e2d6b4';
        ctx.beginPath(); ctx.arc(st.x, r66Y, 2.5, 0, Math.PI * 2); ctx.fill();

        const ly = st.above ? r66Y - 42 : r66Y + 44;
        ctx.fillStyle = '#3a3429'; ctx.font = 'bold 15px Georgia,serif'; ctx.textAlign = 'center';
        ctx.fillText(st.name, st.x, ly);
        ctx.font = 'bold 12px Georgia,serif'; ctx.fillStyle = '#6e473b';
        ctx.fillText(st.sub + '  •  ' + st.miles, st.x, ly + 15);
        ctx.font = '11px Arial,sans-serif'; ctx.fillStyle = '#5c543f';
        ctx.fillText(st.amen, st.x, ly + 28);
      }`;

const mapStopsReplacement = `      for (const st of desertStops) {
        ctx.strokeStyle = '#904e43'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(st.x, r66Y); ctx.lineTo(st.x, st.above ? r66Y - 18 : r66Y + 20); ctx.stroke();

        ctx.fillStyle = '#904e43';
        ctx.beginPath(); ctx.arc(st.x, r66Y, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e2d6b4';
        ctx.beginPath(); ctx.arc(st.x, r66Y, 2.5, 0, Math.PI * 2); ctx.fill();

        const ly = st.above ? r66Y - 42 : r66Y + 44;
        ctx.fillStyle = '#3a3429'; ctx.font = 'bold 15px Georgia,serif'; ctx.textAlign = 'center';
        ctx.fillText(st.name, st.x, ly);
        ctx.font = 'bold 12px Georgia,serif'; ctx.fillStyle = '#6e473b';
        ctx.fillText(st.sub + '  •  ' + st.miles, st.x, ly + 15);
        ctx.font = '11px Arial,sans-serif'; ctx.fillStyle = '#5c543f';
        ctx.fillText(st.amen, st.x, ly + 28);
      }

      // ==========================================
      // PANEL 3: GREAT PLAINS LANDMARKS & HARVEST MOON
      // ==========================================
      const plainsStops = [
        { x: 672, name: 'CONCRETE SILO', sub: 'MP 45 • STEPPE HINGE', above: true },
        { x: 720, name: 'GRAIN ELEVATOR', sub: 'MP 48 • DEAD SIDING', above: false },
        { x: 760, name: 'WATER TOWER', sub: 'MP 48 • PRAIRIE VIEW', above: true },
        { x: 805, name: 'WINDMILL', sub: 'MP 51 • STOCK TANK', above: true },
        { x: 845, name: 'MAILBOX ROW', sub: 'MP 53 • RURAL POST', above: false },
        { x: 885, name: 'HARVEST MOON', sub: 'DRIVE-IN • MP 55', above: true, dest: true }
      ];

      for (const pst of plainsStops) {
        ctx.strokeStyle = pst.dest ? '#b22e22' : '#7a6a42'; ctx.lineWidth = pst.dest ? 2.5 : 1.5;
        ctx.beginPath(); ctx.moveTo(pst.x, r66Y); ctx.lineTo(pst.x, pst.above ? r66Y - 14 : r66Y + 16); ctx.stroke();

        ctx.fillStyle = pst.dest ? '#b22e22' : '#6b5e3e';
        ctx.beginPath(); ctx.arc(pst.x, r66Y, pst.dest ? 5.5 : 3.5, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f2ead7';
        ctx.beginPath(); ctx.arc(pst.x, r66Y, pst.dest ? 2.2 : 1.4, 0, Math.PI * 2); ctx.fill();

        const ly = pst.above ? r66Y - 32 : r66Y + 36;
        ctx.fillStyle = pst.dest ? '#7e1d15' : '#3c3526';
        ctx.font = pst.dest ? 'bold 12px Georgia,serif' : 'bold 10px Georgia,serif';
        ctx.textAlign = 'center';
        ctx.fillText(pst.name, pst.x, ly);
        ctx.font = '9px Arial,sans-serif'; ctx.fillStyle = '#5c523c';
        ctx.fillText(pst.sub, pst.x, ly + 13);
      }

      // Continuation arrow at right edge to Farm Belt & Lakes
      ctx.fillStyle = '#904e43';
      ctx.beginPath(); ctx.moveTo(924, r66Y); ctx.lineTo(912, r66Y - 5); ctx.lineTo(912, r66Y + 5); ctx.closePath(); ctx.fill();
      ctx.font = 'bold 9px Arial,sans-serif'; ctx.textAlign = 'right'; ctx.fillStyle = '#4a4233';
      ctx.fillText('TO FARM BELT & LAKES →', 922, r66Y - 10);`;
html = replaceOnce(html, mapStopsTarget, mapStopsReplacement, 'map plains panel');
console.log('3. Glovebox map 3-panel layout added.');

// ---------------------------------------------------------------------------
// 4. Interactions in findInteractionTarget()
// ---------------------------------------------------------------------------
const interactionGateTarget = `  const nearFernBend=Math.abs(Nn.position.x-fernBendX)<140 && Nn.position.z<-6340 && Nn.position.z>-6465;
  const nearCargo=!seated && !heldPump && !carriedCargo && cargoItems.some(item=>item.slot<0 &&
    item.mesh.position.distanceToSquared(Nn.position)<11);
  if(!nearCar && !nearStation && !nearMotel && !nearDiner && !nearFernBend && !nearCargo)return null;`;

const interactionGateReplacement = `  const nearFernBend=Math.abs(Nn.position.x-fernBendX)<140 && Nn.position.z<-6340 && Nn.position.z>-6465;
  const nearPlains=(Nn.position.x > 45000 && Nn.position.x < 85000);
  const nearCargo=!seated && !heldPump && !carriedCargo && cargoItems.some(item=>item.slot<0 &&
    item.mesh.position.distanceToSquared(Nn.position)<11);
  if(!nearCar && !nearStation && !nearMotel && !nearDiner && !nearFernBend && !nearPlains && !nearCargo)return null;`;
html = replaceOnce(html, interactionGateTarget, interactionGateReplacement, 'interaction gate');

const plainsInteractionsTarget = `    // Ridge viewpoint coin-op binoculars
    target(Nt, -28392, 18.66, -6433, .45, 'Look through coin-op binoculars', () => { inspection = 'binoculars'; playInteractionSound('metal'); });
  }`;

const plainsInteractionsReplacement = `    // Ridge viewpoint coin-op binoculars
    target(Nt, -28392, 18.66, -6433, .45, 'Look through coin-op binoculars', () => { inspection = 'binoculars'; playInteractionSound('metal'); });
  }
  if(!seated && nearPlains) {
    // 1. Speaker on post or window
    if(plainsSpeakerHung) {
      if(Nn.position.distanceTo(coupe.position) < 4.5) {
        target(coupe, -0.84, 1.08, -0.25, 0.45, 'Return speaker to post', () => {
          plainsSpeakerHung = false;
          if(hungSpeakerOnCoupe) hungSpeakerOnCoupe.visible = false;
          playInteractionSound('metal');
        });
      }
    } else {
      target(Nt, 64605, os(64605, -98) + 1.15, -98, 0.45, 'Lift speaker', () => {
        plainsSpeakerHung = true;
        if(hungSpeakerOnCoupe) hungSpeakerOnCoupe.visible = true;
        playInteractionSound('metal');
      });
    }

    // 2. Marquee board
    target(Nt, 64585, os(64585, -25) + 1.8, -25, 0.95, 'Read marquee board', () => {
      inspection = 'read'; inspectionTime = 7;
    });

    // 3. Concession lamp switch
    target(Nt, 64600, os(64600, -135) + 2.45, -132.2, 0.42, harvestLampOn ? 'Switch off concession lamp' : 'Switch on concession lamp', () => {
      harvestLampOn = !harvestLampOn;
      if(harvestLampLight) harvestLampLight.intensity = harvestLampOn ? 8.5 : 0;
      playInteractionSound('click');
    });

    // 4. Playground swing push
    target(Nt, 64652.4, os(64650, -75) + 1.2, -75, 0.75, 'Push swing', () => {
      harvestSwingVel += 2.8;
      playInteractionSound('metal');
    });

    // 5. Ticket booth roll & drawer
    target(Nt, 64601.0, os(64600, -34) + 1.18, -34.25, 0.38, 'Pull ticket from roll', () => {
      playInteractionSound('paper');
    });
    target(Nt, 64600.9, os(64600, -34) + 0.92, -34.0, 0.38, cashDrawerOpen ? 'Close cash drawer' : 'Inspect cash drawer', () => {
      cashDrawerOpen = !cashDrawerOpen;
      playInteractionSound(cashDrawerOpen ? 'bell' : 'wood');
    });

    // 6. Concession counter popcorn kettle & soda tap
    target(Nt, 64598.8, os(64600, -135) + 1.6, -132.2, 0.38, kettleLidOpen ? 'Lower kettle lid' : 'Lift kettle lid', () => {
      kettleLidOpen = !kettleLidOpen;
      playInteractionSound('metal');
    });
    target(Nt, 64601.1, os(64600, -135) + 1.62, -132.08, 0.35, 'Pull soda tap', () => {
      playInteractionSound('air');
    });

    // 7. Projection booth film can
    target(Nt, 64601.8, os(64600, -135) + 1.15, -136.2, 0.38, 'Inspect film can', () => {
      inspection = 'read'; inspectionTime = 6;
      playInteractionSound('metal');
    });

    // 8. Windmill brake lever
    target(Nt, 57000.95, os(57000, 95) + 1.3, 95, 0.38, windmillBrakeHeld ? 'Release windmill brake' : 'Hold windmill brake', () => {
      windmillBrakeHeld = !windmillBrakeHeld;
      playInteractionSound('metal');
    });

    // 9. Mailbox row
    target(Nt, 61000, os(61000, 6.2) + 1.22, 6.2, 0.38, mailboxOpen ? 'Close mailbox' : 'Open mailbox', () => {
      mailboxOpen = !mailboxOpen;
      playInteractionSound(mailboxOpen ? 'metal' : 'wood');
    });

    // 10. Stock tank rim
    target(Nt, 57000, os(57000, 93) + 0.9, 93, 0.65, 'Look into stock tank', () => {
      inspection = 'read'; inspectionTime = 6;
    });
  }`;
html = replaceOnce(html, plainsInteractionsTarget, plainsInteractionsReplacement, 'plains interactions');
console.log('4. Interactions for Great Plains added.');

// ---------------------------------------------------------------------------
// 5. Tick Loop: Sky Uniforms, Streaming, Red Coal, Swing, Windmill, Audio
// ---------------------------------------------------------------------------
const tickLoopTarget = `updateMistBanks(wetRegion, rainFactor, t);`;
const tickLoopReplacement = `updateMistBanks(wetRegion, rainFactor, t);

// Great Plains frame tick updates:
const camX = Nn.position.x;
const plainsBiome = Math.max(0, Math.min(1, (camX - 42000) / 6000));

// 1. Sky Uniforms: uPlains scales mountain silhouettes toward 0
if(Xm && Xm.material && Xm.material.uniforms) {
  if(Xm.material.uniforms.uPlains) Xm.material.uniforms.uPlains.value = plainsBiome;
  // Heat lightning: rare, silent pulse every ~85s
  const stormCycle = (t % 85.0) / 85.0;
  let heatFlash = 0;
  if(stormCycle > 0.95 && stormCycle < 0.98) {
    const p = (stormCycle - 0.95) / 0.03;
    heatFlash = p < 0.25 ? (p / 0.25) : Math.max(0, 1.0 - (p - 0.25) / 0.75);
  }
  if(Xm.material.uniforms.uHeatLightning) Xm.material.uniforms.uHeatLightning.value = heatFlash * plainsBiome;
  if(Xm.material.uniforms.uStormGlow) Xm.material.uniforms.uStormGlow.value = (0.25 + 0.45 * (1 - uNight) * (1 - uDay)) * plainsBiome;
  if(Xm.material.uniforms.uStormDrift) Xm.material.uniforms.uStormDrift.value = (weatherHour / 24.0) * 0.35;
  // Silent screen illumination during heat lightning
  if(ROLE_MATS.screenPanelWhite) {
    ROLE_MATS.screenPanelWhite.emissiveIntensity = 0.08 + 0.38 * heatFlash * plainsBiome;
  }
}

// 2. Instanced Grass & Fence Streaming
updatePlainsStreaming(camX, Nn.position.z, t);

// 3. Harvest Moon Sign & Concession Lamp flicker
let hfl = .96 + .04 * Math.sin(t * 31 + 0.8);
let hwfk = 1 + .007 * Math.sin(t * 1.1 + 0.4);
if(harvestSignLight) harvestSignLight.intensity = 12 * hfl;
if(harvestCyanLight) harvestCyanLight.intensity = 3.8 * hfl;
if(harvestLampLight) harvestLampLight.intensity = harvestLampOn ? 8.5 * hwfk : 0;
if(ROLE_MATS.harvestNeonRed) ROLE_MATS.harvestNeonRed.emissiveIntensity = 0.5 + 1.8 * hfl;
if(ROLE_MATS.harvestNeonCyan) ROLE_MATS.harvestNeonCyan.emissiveIntensity = 0.4 + 1.4 * hfl;
if(ROLE_MATS.harvestLampWarm) ROLE_MATS.harvestLampWarm.emissiveIntensity = harvestLampOn ? 1.1 * hwfk : 0.05;

// 4. "The Red Coal" distance sprite (visible from 300m to 5km, lingers in mirror)
if(redCoalMesh) {
  redCoalMesh.quaternion.copy(Nn.quaternion);
  const distSign = Math.hypot(camX - 64570, Nn.position.z - (-14));
  let coalAlpha = 0;
  if(distSign > 40 && distSign <= 300) coalAlpha = (distSign - 40) / 260.0;
  else if(distSign > 300 && distSign <= 4500) coalAlpha = 1.0;
  else if(distSign > 4500 && distSign < 6000) coalAlpha = 1.0 - (distSign - 4500) / 1500.0;
  const coalShimmer = 1.0 + 0.08 * Math.sin(t * 3.4 + distSign * 0.01) * plainsGust(64570, -14, t);
  redCoalMesh.material.opacity = Math.max(0, Math.min(1, coalAlpha * 0.85 * coalShimmer));
}

// 5. Windmill animation
if(windmillWheelGroup) {
  if(!windmillBrakeHeld) {
    const wGust = plainsGust(57000, 95, t);
    windmillAngle += (0.8 + 1.8 * wGust) * i;
  }
  windmillWheelGroup.rotation.z = windmillAngle;
}

// 6. Playground swing physics
if(harvestSwingHinge) {
  const swGust = plainsGust(64650, -75, t);
  harvestSwingVel += (-9.8 / 2.2 * Math.sin(harvestSwingAngle) - 0.25 * harvestSwingVel + 0.18 * (swGust - 0.5)) * i;
  harvestSwingAngle += harvestSwingVel * i;
  harvestSwingHinge.rotation.x = harvestSwingAngle;
}`;
html = replaceOnce(html, tickLoopTarget, tickLoopReplacement, 'tick loop updates');

// Audio tick loop additions
const audioUpdateTarget = `if (audio.insectGain) audio.insectGain.gain.setTargetAtTime(.5*(1-muffled*.8),now,.4);`;
const audioUpdateReplacement = `if (audio.insectGain) audio.insectGain.gain.setTargetAtTime(.5*(1-muffled*.8)*(1-plainsBiome),now,.4);

// Great Plains Audio Bus Updates:
if(audio.plainsWindGain && plainsBiome > 0.01) {
  // Crossfade desert rock wind with plains grass wind
  audio.windGain.gain.setTargetAtTime((.026+.014*Hm(t*.013,3.1))*(1-muffled)*(1-plainsBiome*0.85), now, .13);
  // Plains gust field with 2-second visual lead
  const gustAud = plainsGust(x, z, t - 2.0);
  const depthDriveIn = Math.min(5.8 - Math.abs(x - 64600), z + 131.5, -138.5 - z);
  const inConcession = depthDriveIn > 0 ? 1 : 0;
  const plainsMuffled = Math.max(shelter * 0.72, cabin, inConcession * 0.8);
  const pWindVol = audio.muted ? 0 : (0.015 + 0.042 * gustAud) * plainsBiome * (1 - plainsMuffled * 0.75);
  audio.plainsWindGain.gain.setTargetAtTime(pWindVol, now, 0.15);
  if(audio.plainsWindFilter) audio.plainsWindFilter.frequency.setTargetAtTime(650 + 850 * gustAud, now, 0.15);

  // Summer crickets: sparse bed, suppressed near pylon sign
  if(audio.plainsCricketGain) {
    const distSign = Math.hypot(x - 64570, z - (-14));
    const signQuiet = Math.max(0, Math.min(1, (distSign - 35) / 85.0));
    const cricketVol = audio.muted ? 0 : 0.22 * plainsBiome * (1.0 - uDay) * signQuiet * (1 - plainsMuffled * 0.85);
    audio.plainsCricketGain.gain.setTargetAtTime(cricketVol, now, 0.3);
  }

  // Pylon Sign hum: directional at x=64570, z=-14
  if(audio.plainsSignHumGain) {
    const distSign = Math.hypot(x - 64570, z - (-14));
    const humAtten = Math.max(0, 1.0 - distSign / 140.0);
    const humVol = audio.muted ? 0 : 0.28 * humAtten * humAtten * hfl * (1 - cabin * 0.65);
    audio.plainsSignHumGain.gain.setTargetAtTime(humVol, now, 0.05);
  }

  // Hung speaker on coupe window
  if(audio.plainsSpeakerGain) {
    const speakerActive = plainsSpeakerHung && seated;
    const spkVol = (audio.muted || !speakerActive) ? 0 : (0.035 + 0.075 * gustAud);
    audio.plainsSpeakerGain.gain.setTargetAtTime(spkVol, now, 0.15);
  }

  // Rare fence wire tick (>=40s interval)
  if(t >= audio.nextFenceTick && Math.abs(z) > 12 && Math.abs(z) < 17 && plainsBiome > 0.5) {
    audio.nextFenceTick = t + 40 + Dn(0, 45);
    playInteractionSound('metal');
  }
  // Rare loose tin sheet knock
  if(t >= audio.nextTinKnock && Math.hypot(x - 52400, z - (-70)) < 180) {
    audio.nextTinKnock = t + 80 + Dn(0, 80);
    playInteractionSound('metal');
  }
}`;
html = replaceOnce(html, audioUpdateTarget, audioUpdateReplacement, 'audio loop updates');
console.log('5. Tick loop and audio bus updates added.');

// ---------------------------------------------------------------------------
// 6. travelStopList & App Exports
// ---------------------------------------------------------------------------
const travelListTarget = `  for (const d of ROUTE_CATALOG.desert) list.push({ name: d.fullName, route: d.route, s: d.s, mile: d.mileLabel });`;
const travelListReplacement = `  for (const d of ROUTE_CATALOG.desert) list.push({ name: d.fullName, route: d.route, s: d.s, mile: d.mileLabel });
  if (ROUTE_CATALOG.plains) {
    for (const p of ROUTE_CATALOG.plains) {
      if (dev || p.kind === 'stop') list.push({ name: p.fullName, route: p.route, s: p.s, mile: p.mileLabel });
    }
  }`;
html = replaceOnce(html, travelListTarget, travelListReplacement, 'travel list');

// Exports in _game
const exportsTarget = `  updateForestPool, updateMileposts, updateRiverSurface,`;
const exportsReplacement = `  updateForestPool, updateMileposts, updateRiverSurface,
  plainsGroup, harvestMoonGroup, updatePlainsStreaming, plainsGust, us66RoadY,`;
html = replaceOnce(html, exportsTarget, exportsReplacement, 'game exports');
console.log('6. travelStopList and game exports updated.');

fs.writeFileSync(indexPath, html);
console.log('Full Great Plains integration successfully written to index.html!');
