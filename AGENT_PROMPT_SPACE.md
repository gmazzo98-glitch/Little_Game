# Implementation prompt — the Drift Outpost overhaul

Copy the block below into the implementation agent's chat. It overhauls **the Drift Outpost** (the asteroid strip) so it is vibrant, full, inhabited and well modelled, while the game stays fluid. [SPACE_MOOD.md](SPACE_MOOD.md) is the design authority: the prompt gives the task, the code hooks and the process, and SPACE_MOOD.md gives the strip, the roster, the colour rules, the life, the quality bar and the acceptance list. Facts about `index.html` were read at commit `8b00484` and must be re-checked by structure, not by line number.

Background: the owner's 2026-11-08 review said the outpost is "really boring and really doesn't transmit any vibe". It should be "rich, colourful, quirky, with good quality models, and maybe some life". The saucer, cabin, drone, chart and fast travel (milestones S0–S6 of the earlier prompt) are done and out of scope.

This is a launch prompt, not an authorization to widen scope. The ground game, the Plains, the Pacific Northwest, the coupe and the saucer cabin are out of scope except where a shared hook must not regress.

````text
Work on gmazzo98-glitch/Little_Game, branch vibe/neon-gas-voxel-f660eb. Overhaul the Drift Outpost in index.html: real, playable game code, not a plan or an asset list. Make it vibrant, fuller, quirkier, inhabited and better modelled, while keeping gameplay fluid.

======================================================================
0. THE GOAL IN ONE PARAGRAPH
======================================================================
Today the outpost is three small buildings 60 m apart on a flat grey disc, and nothing moves. Replace it with a STRIP: a 1960s space-age (Googie) roadside street of about a dozen places within roughly 140 m, with a main street, a plaza, a landmark gumball machine, a laundromat, a lounge with a black-hole sign, a used-rocket lot with an inflatable dancer, a greenhouse dome, a telescope and more, lived in by a small cast of silent non-human residents and a few dozen cute ambient creatures. After the cabin's dark, arriving should feel like finding the only party for five kilometres: warm, daft, a little tender, colourful with hierarchy. Calm stays everywhere else: the cabin, open space, camera and sound floor are unchanged. Gameplay must stay fluid: no hitches, no snags, constant light count.

======================================================================
1. READ FIRST, THEN INSPECT THE LATEST BRANCH
======================================================================
AGENTS.md (including the saucer and outpost exception), SPACE_MOOD.md (design authority for this task; read all of it), MOOD.md, AESTHETIC.md, AMBIENCE.md, ASSET_GUIDE.md, ROADMAP.md (Verification and completion, and the 2026-11-06 and 2026-11-08 / 08b / 08c / 08d space records). Run git status, git log and git remote -v first.

Where documents disagree: the user's current instructions win, then AGENTS.md non-negotiables, then SPACE_MOOD.md, then MOOD.md. NOTE: MOOD.md and the earlier space file said "no people, no recent activity, only one thing pulses". The owner's 2026-11-08 review overrides that for the OUTPOST ONLY: non-human residents and a budgeted amount of motion are wanted. No humans, ever. Record the disagreement you resolve.

======================================================================
2. HARD RULES
======================================================================
- ONE self-contained index.html. Inline everything, including every texture and model. Zero runtime network requests. Must work double-clicked from file://. No build step. Preserve the bundled Three.js and its license notice at the end of the script.
- The ground game stays as written: no space objects, lights, creatures or sounds in the desert unless the player is flying or in space mode. The outpost exists only in space mode. Do not touch the world clock.
- Calm elsewhere: no changes to the cabin, drone, open-space mood, chart or fast-travel behaviour beyond adding two warp rows. No camera sway or shake. No rain or any weather (steam and greenhouse spores are local effects).
- No humans, no other ships, no music, no voices or speech-like sound, no readable dialogue, no quest, score, collectible or currency, no violence or harm to creatures.
- THE LIGHT COUNT MUST STAY CONSTANT. Do not add or remove lights at runtime and do not add new point lights per building: a changed light count recompiles every material and freezes the game for seconds (the 2026-11-08c bug). Colour and glow must come from emissive materials, additive halo sprites, and coloured light pools painted into the deck texture. Re-find the existing light pool (localLightGroups, spLights) and move or retarget its lights only.
- Do not claim performance or visual approval you did not measure or see. SwiftShader captures prove correctness, not frame time. Implementation and verified acceptance are separate facts; record anything unchecked as pending with the reason.
- Git: another session may be committing to the same working tree. Run git pull --rebase before every push, keep commits small, stage only the files you changed, never use git add -A, and never kill browser processes you did not start. Commit AND push each finished milestone, end commit messages with the attribution line the harness gives you, and for any index.html change update ROADMAP.md (status and validation record) and SPACE_MOOD.md in the SAME commit. After pushing, verify the remote index.html at the resulting commit. In the handoff name the branch and commit and give exact steps to reach the new content.

======================================================================
3. WHAT THE CODE ALREADY DOES (re-verify by structure)
======================================================================
Shared scope. The game lives in one IIFE that also contains the bundled Three.js. Minified names: xi Group, dt Mesh, It BufferGeometry, Et BufferAttribute, P Vector3, Me Color, Pn PointLight, ji MeshStandardMaterial, wi MeshBasicMaterial, rt ShaderMaterial, Cn BoxGeometry, lr SphereGeometry, ba PlaneGeometry, or Points, Qi PointsMaterial, ar InstancedMesh, qt Texture, xt Object3D. IMPORTANT: the game's own Lm is a stripped Lambert (colour, emissive, flat shading only). It ignores maps and vertex colours. Use ji (standard) or rt (shader) for anything textured, vertex-coloured or animated in a shader. There is no LineSegments constructor: submit line pairs the way rainMesh and spRainMesh did if you need them. There is no guaranteed THREE namespace or GLTFLoader; map the bundled classes first. A BufferGeometry merge helper may not exist: write one (concatenate attributes and indices per material).

Space code (search for the banner "EASTER EGG: the little saucer"):
- Constants: UFO_HOME, UFO_TIERS, SP (planet and asteroid numbers: SP.ax/ay/az asteroid centre, SP.cut, SP.plR = 236 deck radius, SP.py deck height = SP.ay + SP.cut), spSun, ufoPlateau (walkable disc, radius 200 m).
- Helpers: ufoLatheGeo(profile, segs, [angles]), ufoTubeGeo, ufoCircle, ufoAdd, ufoBox, ufoBall, ufoNeon (tube plus additive halo), ufoHaloMat, ufoSign (canvas neon lettering), ufoCanvasTex, ufoGeo, ufoSmooth, ufoM (shared material set with warm, bulb, brass, trim). Prefer extending these over inventing parallel ones.
- spBuild() lazily builds spGroup: nebula dome, 6000 stars, sun, procedural Earth shader, atmosphere shell, the asteroid mesh, skirt, the canvas-painted deck (a 2048 canvas from spPaintDeck, standard material with emissiveMap), debris InstancedMesh, and spBuildOutpost(parent, rnd).
- spBuildOutpost builds, inside group O at (SP.ax, SP.py, SP.az): ORBIT GAS at local (-40, 48), NOVA NOSH truck at (23, 44), DRIFT INN at (80, -14) with a bell at (72.5, -4), runway lights at z 85 and 113 from x -200 to 120, a mast at (130, 60), 22 crystal clusters on the rim, and pooled lights through a col(...) helper. Colliders use Dt(x0, z0, x1, z1, y0, y1) in world coordinates. Pump and bell positions are exported as spPumps and spBell (used by refuelling and audio). spNeonPulse holds the pulsing emissives.
- Warp targets in UFO_WARPS (home, sky, orbit, runway, pumps) and the warp card; keep all of them valid after you move things. Add two rows: Main Street and The Plaza.
- Sound: ufoAudioStart/ufoAudioUpdate, a transformer hum near Orbit Gas, boots on the deck (footSurface 9), a thermal clink. Add the strip's beds and events as described in SPACE_MOOD.md "Sound".
- Test hooks: document.getElementById("app")._game exposes ufo, ufoShip, spGroup, SP, ufoLamp, ufoWarp, ufoToggleLights, UFO_DOME, ufoBoard, ufoExit, ufoHome, spBuild, ufoSetSpace, ufoGroundAt and older hooks. Extend with what you need (for example the strip layout and the creature list) for tests.
- Scripts already in scripts/: check_cabin_clip.js, verify_offline.js, plus test runners. Reuse them. Do not commit captures.

Before editing, find each of these by structure and confirm it still matches. Map the real classes before using any helper.

======================================================================
4. WHAT TO DO (milestones; each ends with a commit, a push and a roadmap record)
======================================================================
O0  Baseline and budgets. Capture matched baseline stills of the current outpost from fixed viewpoints (gate end of the runway, runway at 150 m, Pump Court at 3 m, Nova Nosh, Drift Inn, deck centre 360 degrees) at one viewport. Measure and record: triangle count of spGroup, draw calls, number of lights, texture memory, build time of spBuild, and frame time on the deck and in open space (on a named laptop if available; otherwise record pending). Choose and write down the budgets (see SPACE_MOOD.md "Performance and fluid gameplay" and "Model quality bar") from these numbers. A plaza regression of more than 1 ms against this baseline fails the pass.

O1  The strip skeleton. Lay out the zones from SPACE_MOOD.md "Site plan" without breaking runway, pumps, bell, parking ring, warp targets or colliders. Rebuild the deck texture (spPaintDeck) into a street: kerbs, crossings, bay markings, tiled plaza, cracks, chalk hopscotch, coloured light pools under each sign and window, a lit rim. Add the gate arch, sputnik lamp posts, benches, bins, planters, bollards and cable runs as instanced or merged props placed by hand-made clusters, not a grid. Add the two warp rows. Verify walking, colliders and warps; commit.

O2  Hero upgrades (tier A, existing). Rebuild ORBIT GAS (Googie boomerang canopy, real pumps with crowns, dials, nozzles and hose reels, air-water-warp post), NOVA NOSH (chrome trim, swooping awning, rotating taco sign, stools, steam), DRIFT INN (distinct pastel pods, ladders, rooftop deck, towel line, lobby window, VACANCY sign that can change). Keep every existing trace of care (re-lettered I, taped hose, crossed-out menu, worn bell, ghost rectangle). Meet the Model quality bar at 150 m, 30 m and 3 m; capture all three for each.

O3  New buildings. Tier A first: SPIN CYCLE, THE EVENT HORIZON, PLANET POP, ZORP'S USED ROCKETS. Then tier B: the greenhouse dome, PAR SEC mini golf, the SEE YOUR HOUSE telescope deck. Each has a silhouette, a hue family, a joke and a trace of care as in the roster. Follow the colour rules: one hue family per building, lime and mint reserved for living things, candy colours only at Planet Pop.

O4  Life. Implement the residents (PUMPKIN, the cook, the clerk, the tube-dancer, the lizard) and the ambient creatures (hop-hops, sky jellies, moths; the sky whale only if budgets allow) as in SPACE_MOOD.md "Life". Tiny seeded state machines, instanced where repeated, updated only within 150 m, no per-frame allocation, no hard colliders on wanderers, soft avoidance, no creature narrows a gap below 1.2 m. Minimal interaction only: bell makes the clerk wake and the sign change; refuelling makes PUMPKIN wipe; the telescope zooms to Earth briefly. Glyph bubbles only (?, !, zzz, a star).

O5  Sound and light polish. Add the soft beds and events from SPACE_MOOD.md (neon buzz, laundromat drum, greenhouse bubbles, fan whir, creature pips at most once per 20 s on average, none beyond 40 m, nothing above about 3 kHz outside the cabin). No music, no voices. Mute and tab hiding keep working. Tune the pooled lights so the nearest building's colour is the strongest; do not add lights.

O6  Fluidity. Make the build hitch-free: build the outpost in slices across frames while climbing (no frame over about 30 ms from the build), warm shaders before it is visible, no multi-second stall on first entry, boarding or leaving. Merge static geometry per building and material, instance repeated props, cull building groups and detail by distance. Check the 3.2 km threshold specifically.

O7  Performance. Measure on a named laptop at the actual viewport and pixel ratio: median and p95 frame time at the gate, on Main Street, in the plaza and in open space with the planet in view; compare with O0. If anything misses 60 fps or regresses more than 1 ms, fix it before polishing. Do not substitute draw-call or triangle counts for frame times.

O8  Verification and handoff, as in section 6.

======================================================================
5. KNOWN ROUGH EDGES TO FIX OR CONFIRM
======================================================================
- The deck is a flat grey disc with a faint hex pattern and a glowing rim; the hex pavers glow at grazing angles.
- Buildings are boxes plus lathes; the pods and crystals are flat-shaded. Textured parts need the standard material, not Lm.
- Only the beacon and mast light move today; there is nothing alive.
- The warp card hint text, the nav-screen blip scaling and the "saucer slipped out of orbit" note were fixed in S6; do not regress them.
- Stars and dust are circular points now; keep them so.

======================================================================
6. VERIFICATION (follow ROADMAP.md "Verification and completion", plus SPACE_MOOD.md "Acceptance" items 1-16)
======================================================================
1. Extract every inline script and run node --check. Inspect resource attributes, URL literals, fetch, XHR, WebSocket, Worker and dynamic imports; run scripts/verify_offline.js; and open the delivered index.html from file:// with networking off.
2. Run scripts/check_cabin_clip.js: the cabin must still pass (the cabin is not meant to change).
3. Matched captures at 150 m, 30 m and 3 m of every tier A model, plus the gate, Main Street, the plaza, the Quiet Side and a 360-degree plaza turn.
4. Vibe test, density test and colour discipline from SPACE_MOOD.md acceptance. Show captures cold if a person is available; otherwise record that it is pending.
5. Life: list what moves within 60 s on the strip; confirm nothing moves beyond 150 m except the listed items; confirm nothing blocks a path.
6. Gameplay: walk runway to Inn and back, refuel, ring the bell, board, leave, warp from every state; no snagging; ship, player, camera, fov, lights and audio consistent after each warp.
7. Hitch test: step the 900 m to 3.2 km climb and the first arrival frames; record the worst frame time (SwiftShader proves only that nothing stalls for seconds).
8. Desert regression: no space-layer objects, creatures, lights or sounds in the desert; coupe, station, travel card, glovebox map and rest actions unchanged; pointer lock, resize, mute and tab hiding fine.
If any check cannot run, record exactly what remains unverified and leave acceptance open.

======================================================================
7. DOCUMENTS TO UPDATE IN THE SAME COMMITS
======================================================================
ROADMAP.md (status row and validation record with real evidence or pending reasons), SPACE_MOOD.md (mark implemented items, correct anything the build contradicts, record the final budgets and hue values), AGENTS.md only if the exception wording stops matching the build. Do not create new planning documents.

======================================================================
8. FINISH WITH
======================================================================
The implemented changes; the real evidence (captures, frame times with hardware, viewport and pixel ratio, audio notes, budgets before and after); anything pending and why; the branch and commit; a link to the playable index.html on the branch; the exact steps to reach the new content (find the saucer about 87 m west of Sunset Service, press E at the hatch, press Y for the flight computer and choose Main Street, or climb past 3.2 km and follow the waypoint); and the next unfinished milestone.
````

## Notes for the person launching this

- **Why the design lives in SPACE_MOOD.md.** The roster, colour rules, life, quality bar and acceptance checks are long. They live in one design file so the prompt stays a task and a process, and the two cannot drift.
- **Why it forbids new lights.** The earlier build froze for seconds when the light count changed. Colour is cast from painted deck pools and emissives instead.
- **What it overrides.** The earlier "no people, no recent activity, only one thing pulses" rules are lifted for the outpost only, because of the owner's review. The prompt says so, and says "no humans, ever".
- **Scope is large on purpose, with an escape hatch.** Tier A is built first, tier B only if budgets hold, and the sky whale and drive-in screen are optional. A pass that finishes O0–O4 and measures well is better than one that adds everything and drops frames.
- **Shared working tree.** Another session may commit to the same folder. The prompt tells the agent to pull before pushing and stage only its own files.
