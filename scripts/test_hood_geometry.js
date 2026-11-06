const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Extract and syntax-check the inline game script
const scriptMatch = html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
if (!scriptMatch) {
  throw new Error('No inline script found in index.html');
}
const js = scriptMatch[1];
console.log('Extracted inline script length:', js.length, 'bytes');

try {
  new vm.Script(js, { filename: 'index_inline.js' });
  console.log('✓ Syntax check passed: 0 syntax errors.');
} catch (err) {
  console.error('✗ Syntax check failed:', err);
  process.exit(1);
}

// 2. Audit hood rest geometry and animation targets
const checks = [
  {
    name: 'hoodHinge creation position',
    pattern: /hoodHinge\.position\.set\(\s*0\s*,\s*1\.01\s*,\s*\.?72\s*\)/,
    desc: 'hoodHinge must be created at (0, 1.01, 0.72)'
  },
  {
    name: 'animateCar undamaged Y target',
    pattern: /hoodHinge\.position\.y\s*\+=\s*\(\s*1\.01\s*-\s*hoodHinge\.position\.y\s*\)/,
    desc: 'Undamaged hood Y must target 1.01 (flush with cowl/fenders)'
  },
  {
    name: 'animateCar undamaged Z target',
    pattern: /hoodHinge\.position\.z\s*\+=\s*\(\s*0?\.72\s*-\s*hoodHinge\.position\.z\s*\)/,
    desc: 'Undamaged hood Z must target 0.72'
  },
  {
    name: 'animateCar undamaged rotation target',
    pattern: /hoodHinge\.rotation\.x\s*\+=\s*\(\s*0\s*-\s*hoodHinge\.rotation\.x\s*\)/,
    desc: 'Undamaged hood rotation.x must target 0'
  },
  {
    name: 'animateCar popped negative rotation (upward lift)',
    pattern: /hoodHinge\.rotation\.x\s*\+=\s*\(\s*-0\.038/,
    desc: 'Popped hood rotation.x must be negative to lift front edge upward'
  },
  {
    name: 'animateCar buckled negative rotation (upward tenting)',
    pattern: /hoodHinge\.rotation\.x\s*\+=\s*\(\s*-0\.14/,
    desc: 'Buckled hood rotation.x must be -0.14 for severe upward tenting'
  },
  {
    name: 'animateCar buckled upward Y tenting',
    pattern: /hoodHinge\.position\.y\s*\+=\s*\(\s*1\.03/,
    desc: 'Buckled hood Y must tent up to 1.03'
  },
  {
    name: 'slamHoodShut restoration',
    pattern: /function slamHoodShut\(\)\s*\{[\s\S]*?hoodHinge\.position\.set\(0,\s*1\.01,\s*\.?72\)/,
    desc: 'slamHoodShut must restore hood position to (0, 1.01, 0.72)'
  },
  {
    name: 'hammerHoodLatch restoration',
    pattern: /function hammerHoodLatch\(\)\s*\{[\s\S]*?hoodHinge\.position\.set\(0,\s*1\.01,\s*\.?72\)/,
    desc: 'hammerHoodLatch must restore hood position to (0, 1.01, 0.72)'
  },
  {
    name: 'handleCarCollision popped rotation',
    pattern: /carDamage\.hoodPopped\s*=\s*true;\s*hoodHinge\.rotation\.x\s*=\s*-0\.038;/,
    desc: 'Collision pop must set rotation.x = -0.038'
  },
  {
    name: 'handleCarCollision buckled tenting',
    pattern: /carDamage\.hoodBuckled\s*=\s*true;\s*hoodHinge\.rotation\.x\s*=\s*-0\.14;\s*hoodHinge\.position\.y\s*=\s*1\.03;/,
    desc: 'Collision buckle must set rotation.x = -0.14 and position.y = 1.03'
  }
];

let allPassed = true;
for (const c of checks) {
  if (c.pattern.test(js)) {
    console.log(`✓ [PASS] ${c.name}`);
  } else {
    console.error(`✗ [FAIL] ${c.name}: ${c.desc}`);
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
}

console.log('\nAll hood rest geometry, damaging features, and roadside repair checks PASSED!');

