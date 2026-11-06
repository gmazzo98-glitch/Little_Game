// Test geometry generation for Great Plains set pieces and destination

function boxPart(cx, cy, cz, sx, sy, sz) {
  const x0 = cx - sx / 2, x1 = cx + sx / 2, y0 = cy - sy / 2, y1 = cy + sy / 2, z0 = cz - sz / 2, z1 = cz + sz / 2;
  const pos = [], nor = [], idx = [];
  const quad = (a, b, c, d, n) => {
    const base = pos.length / 3;
    pos.push(a[0], a[1], a[2], b[0], b[1], b[2], c[0], c[1], c[2], d[0], d[1], d[2]);
    for (let i = 0; i < 4; i++) nor.push(n[0], n[1], n[2]);
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  };
  quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1]);
  quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1]);
  quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0]);
  quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0]);
  quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0]);
  quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0]);
  return { pos, nor, idx };
}

function mergeParts(parts) {
  const pos = [], nor = [], idx = [];
  for (const p of parts) {
    const base = pos.length / 3;
    for (let i = 0; i < p.pos.length; i++) pos.push(p.pos[i]);
    for (let i = 0; i < p.nor.length; i++) nor.push(p.nor[i]);
    for (const i of p.idx) idx.push(i + base);
  }
  return { pos, nor, idx };
}

console.log('Testing boxPart and mergeParts...');
const b1 = boxPart(0, 0, 0, 2, 2, 2);
const b2 = boxPart(5, 0, 0, 1, 1, 1);
const merged = mergeParts([b1, b2]);
console.log('Merged vertices:', merged.pos.length / 3, 'triangles:', merged.idx.length / 3);
if (merged.idx.length !== 72) throw new Error('Expected 24 quads = 72 indices');

console.log('Geometry helpers verified!');
