// Verification script for Great Plains mathematical models and logic

function Un(i, e) {
  let t = Math.sin(i * 127.1 + e * 311.7) * 43758.5453;
  return t - Math.floor(t);
}
function xc(i) {
  return i * i * (3 - 2 * i);
}
function nwH(s, s0, s1) {
  if (s <= s0) return 0;
  if (s >= s1) return 1;
  const t = (s - s0) / (s1 - s0);
  return t * t * (3 - 2 * t);
}

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

// Check road slopes across hinge
console.log('Testing hinge crest slopes:');
let maxSlope = 0;
for (let x = 41900; x <= 48600; x += 10) {
  const slope = Math.abs((us66RoadY(x + 1) - us66RoadY(x - 1)) / 2);
  if (slope > maxSlope) maxSlope = slope;
}
console.log('Max hinge slope:', (maxSlope * 100).toFixed(3) + '% (requirement: < 2.0%)');
if (maxSlope > 0.02) throw new Error('Hinge slope exceeds 2%');

// Check peak of crest
console.log('Hinge peak height at 45250:', us66RoadY(45250).toFixed(2), 'm (expected ~12m)');

// Check gust field bounds
console.log('Testing gust field bounds:');
for (let t = 0; t < 100; t += 2.5) {
  for (let x = 45000; x < 70000; x += 3000) {
    const g = plainsGust(x, 0, t);
    if (g < 0 || g > 1) throw new Error('Gust out of bounds: ' + g);
  }
}
console.log('Gust field bounds [0, 1] verified.');

// Period milepost calculation
const dinerX = 4600;
const T_values = [4.6, 47.6, 52.4, 53.1, 57.0, 61.0, 64.6];
console.log('Period mileposts:');
for (const T of T_values) {
  const mile = 18 + Math.round((T - 4.6) / 1.609);
  console.log(`T = ${T} km -> Mile ${mile}`);
}

console.log('All logic tests passed!');

