// Script to append Great Plains builders, interactables, audio, map, and update loop to index.html
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

console.log('Patching Great Plains full content into index.html...');

function replaceOnce(str, target, replacement, label) {
  if (!str.includes(target)) throw new Error(`Target not found: ${label}`);
  return str.replace(target, replacement);
}

// 1. Audio additions in initAudio()
const audioInitTarget = `  audio.rainCanopyGain=makeRainBus("bandpass",1380,.95);
  audio.rainInteriorGain=makeRainBus("lowpass",270,.6);
}`;

const audioInitReplacement = `  audio.rainCanopyGain=makeRainBus("bandpass",1380,.95);
  audio.rainInteriorGain=makeRainBus("lowpass",270,.6);

  // Great Plains audio buses:
  // 1. Grass wind: bandpass filtered noise modulated by gust
  var pwf = c.createBiquadFilter(); pwf.type = "bandpass"; pwf.frequency.value = 1100; pwf.Q.value = 0.55;
  var pwg = c.createGain(); pwg.gain.value = 0;
  var pwSrc = c.createBufferSource(); pwSrc.buffer = b; pwSrc.loop = true;
  pwSrc.connect(pwf); pwf.connect(pwg); pwg.connect(m); pwSrc.start();
  audio.plainsWindFilter = pwf; audio.plainsWindGain = pwg;

  // 2. Plains summer crickets: bandpass insect chirps
  var pcg = c.createGain(); pcg.gain.value = 0; pcg.connect(m);
  audio.plainsCricketGain = pcg;

  // 3. Drive-in sign hum: directional 60Hz + 120Hz at pylon sign
  var sp = c.createPanner(); sp.panningModel = "equalpower"; sp.distanceModel = "inverse";
  sp.refDistance = 8; sp.maxDistance = 140; sp.rolloffFactor = 1.25;
  if (sp.positionX) { sp.positionX.value = 64570; sp.positionY.value = 9.5; sp.positionZ.value = -14; }
  else sp.setPosition(64570, 9.5, -14);
  sp.connect(m); audio.plainsSignPanner = sp;

  var so1 = c.createOscillator(); so1.type = "sine"; so1.frequency.value = 60;
  var so2 = c.createOscillator(); so2.type = "sine"; so2.frequency.value = 120;
  var so2g = c.createGain(); so2g.gain.value = 0.45;
  var shg = c.createGain(); shg.gain.value = 0;
  so1.connect(shg); so2.connect(so2g); so2g.connect(shg); shg.connect(sp);
  so1.start(); so2.start(); audio.plainsSignHumGain = shg;

  // 4. Hung speaker on coupe window: narrow nasal bandpass of field gust
  var skf = c.createBiquadFilter(); skf.type = "bandpass"; skf.frequency.value = 1150; skf.Q.value = 2.2;
  var skg = c.createGain(); skg.gain.value = 0;
  var skSrc = c.createBufferSource(); skSrc.buffer = b; skSrc.loop = true;
  skSrc.connect(skf); skf.connect(skg); skg.connect(m); skSrc.start();
  audio.plainsSpeakerFilter = skf; audio.plainsSpeakerGain = skg;

  audio.nextCricketTick = 0;
  audio.nextFenceTick = 15;
  audio.nextTinKnock = 45;
}`;

html = replaceOnce(html, audioInitTarget, audioInitReplacement, 'audio init');
console.log('Audio init patched.');

// Write back intermediate to ensure safety
fs.writeFileSync(indexPath, html);
console.log('Step 1 complete.');

