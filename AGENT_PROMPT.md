# Implementation prompt

Copy the prompt below into the implementation agent's chat. It points to the repository's canonical instructions; milestone status belongs in `ROADMAP.md`.

```text
Work on gmazzo98-glitch/Little_Game. Turn Neon Gas from a graphical blockout into a polished, playable first-person desert gas-station exploration game.

Read AGENTS.md, AESTHETIC.md, ROADMAP.md, and ASSET_GUIDE.md before editing. Follow their mood, model specifications, asset sources, offline integration rules, milestone order, and acceptance criteria. Inspect the latest branch and existing changes first.

Implement the work; do not stop at another plan or asset list. Continue the selected painterly, non-voxel direction, finish G1's models/composition and G2's materials/lighting, then G3's verification. Preserve the continuous desert surface, world-space highway, and remote layered mountain horizon. Do not restore cube-grid ground, stepped terrain heights, or box mesas; G0's historical comparison is already recorded.

Custom-build the hero station, canopy, two vintage pumps, and GAS/OIL/STOP/Route 66 signs using ASSET_GUIDE.md. Pumps need rounded or deliberately stepped crowns, inset meters, trim, modeled nozzles, and hanging hoses. Buildings need layered roof edges, recessed windows/doorways, and grounded columns. Improve terrain, cacti, poles/wires, and the road's continuity to the horizon. More cubes or bloom alone is not a completed asset pass.

Use the verified free sources only where they fit. Check the exact selected asset's license, recolor/rescale it, record provenance, and embed all required data. If a suitable asset is unavailable, make it using the guide. Keep index.html self-contained, offline and double-click playable; no runtime asset/CDN requests. Preserve the bundled Three.js license and the one-way five-minute dusk-to-night cycle.

Preserve loneliness and stillness: no people, vehicles, train lights, other buildings, music, new objectives, or mandatory camera sway. Keep controls, collisions, and the open doorway working. Leave later atmosphere features until the graphics gates pass.

If using a team, assign one integrator to index.html and shared materials; model specialists return bounded builders/mesh data with dimensions, material roles, collision bounds, and provenance. Avoid concurrent overwrites of the bundle.

Capture actual before/after game views at dusk, blue hour, and night; inspect close models without bloom; measure frame times on stated hardware; run script, offline/network, and interaction checks. If a tool blocks a check, record it as pending and continue independent implementation. Never invent visual approval or performance evidence.

Update ROADMAP.md in the same commit as scene changes. Finish with implemented changes, real evidence, remaining issues, and the next unfinished milestone. The deliverable is improved game code and assets, not documentation alone.
```
