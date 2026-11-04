# Roadmap — Neon Gas: Route 66 Dusk

The execution plan for the single-file vignette. [AESTHETIC.md](AESTHETIC.md) defines the look; [ASSET_GUIDE.md](ASSET_GUIDE.md) defines asset production; [AGENTS.md](AGENTS.md) makes this plan part of the contributor workflow. Use [AGENT_PROMPT.md](AGENT_PROMPT.md) to launch implementation. Source audited on 2026-11-01 against `4eb3782`; asset guidance expanded on 2026-11-02. The G0 style decision and the G1/G2 graphical overhaul were implemented on 2026-11-02 on `vibe/neon-gas-voxel-f660eb` (PR #1); see the validation record for what is and is not verified.

**Next: close the remaining G3 graphics review.** The delivered file passed the offline cycle check, and the new forecourt passed a sustained driving sample. The user confirmed the painterly direction, with continuous terrain, a world-space highway, and remote layered mountains. Preserve the Phase 1 cycle and finish the visual foundation before Phase 2.

**Style state:** painterly surfaces and modeled props (style B) are selected. Architecture uses hard-surface meshes; the desert has continuous heights and interpolated normals. The old voxel emitter, cube terrain grid, road-extension boxes, and rectangular mesa solids are removed. The moon remains the only shadow-caster. See the newest validation record and [actual landscape comparison](captures/landscape-comparison.jpg).

## Delivery contract

- One playable `index.html`, with Three.js and all CSS, shaders, geometry, selected model/texture data, and future audio inline. No external runtime assets, CDN, runtime requests, required server, package install, or build to play.
- Keep the documentation focused and preserve the existing concept illustration. `ASSET_GUIDE.md` specifies models and `AGENT_PROMPT.md` launches agents; they do not replace aesthetic or status authority. Allow only source files/license records/preparation scripts genuinely needed for implemented art, following the asset guide; no unused asset packs or parallel application source tree.
- One 1960s station, exactly two pumps, one player-operated period coupe, and a straight desert highway with cacti, poles, and sagging wires. Keep the highway free of traffic, people, train lights, other buildings, music, and recent life. Sparse insects are permitted only in their planned phases.
- About five minutes from dusk through blue hour to night, one way, then hold. No visible switch, loop, or day/night toggle.
- Target steady 60 fps on a named mid-range laptop. Measure whole-frame cost; prefer fewer surfaces, sensible batching, and cheaper lighting over greater voxel density.
- Every scene change must satisfy the aesthetic rules and update this roadmap's status and validation record in the **same commit**. Do not mark a visual gate passed from syntax checks or a concept illustration.

## Status and dependency order

| Work | Status | Dependency / next result |
| --- | --- | --- |
| Repository direction and contributor rules | Complete | This documentation cleanup; runtime unchanged |
| Asset production brief and agent launch prompt | Complete | Specifications and free-source research delivered; actual model production remains in G0–G2 |
| G0 — Baseline and rendering-style decision | **Complete** | Style B (painterly flat-shade) selected with captures + measurements; see validation record 2026-11-02b |
| G1 — Composition and period silhouettes | Office furnished, pole sign raised, and drive-through forecourt built | The sign addresses both highway approaches. The office has clear sightlines through the storefront. |
| G2 — Palette, surfaces, and light hierarchy | Glazing, bench light, and two neon faces implemented | The canopy, glazed office, and higher red sign each have a distinct role. |
| G3 — Graphics acceptance and performance | Offline run and sustained drive verified | Remaining graphics review includes matched G0 views and shadow checks. The 60-second driving sample measured 16.7 ms median and 16.9 ms p95 on Intel Iris Xe at 960 × 540 and DPR 1. |
| Phase 1 — Dusk-to-night cycle | Visually revalidated on the delivered offline file | Full night held at the 304- and 321-second captures. |
| Phase 2 — Star field and sky depth | Planned | G3 passed; Phase 1 revalidated |
| Phase 3 — Neon character | Partial: time-based GAS dips (shared with audio ticks); trim/window roles unchanged | Phase 2 acceptance; remaining role work |
| Phase 4 — Procedural audio | Wind, localized neon, footsteps, night insects, and the coupe engine implemented. Listening review remains open. | Requested early by the user; Phase 2/3 visual acceptance still open |
| Phase 5 — Sparse micro-life | Moths near the GAS sign + under-canopy dust motes implemented (source-level); tumbleweed cut as an event risk; acceptance pending | Phase 4 acceptance; cut anything that reads as activity |
| Phase 6 — Stillness and interaction polish | Window rest, blanket use, and physical nozzle handling | Nozzle input verified. Full stillness acceptance remains open. |

G0–G3 are an added visual foundation, not a renumbering of the original six atmosphere phases. Later phases may be skipped by an explicit scope decision; do not bypass an earlier failed gate silently. Fixes that protect offline play, controls, or the existing cycle can happen at any time.

## What the source actually contains

The selected painterly scene uses code-native hero builders and surface meshes. The latest correction removes the legacy voxel terrain rather than merely changing its material.

| Current implementation | Verification / remaining work |
| --- | --- |
| `os(x,z)` is continuous; no rounded/integer height levels. A single adaptive 123×123 shared-vertex terrain surface follows the player in 64m steps, with its outer edge 12km from its center | 15,129 vertices / 29,768 triangles; finite samples, unit normals, gentle slopes, and recentering tested out to 100km |
| Asphalt, apron, shoulders, center dashes, and edge paint are continuous world-space shading on that surface | Road stays level at z = ±3.2 and 0 for x samples up to ±1,000km; browser views show both highway directions without a road-end box |
| Three periodic angular mountain layers are part of the sky shader; the six rectangular mesa solids are gone | Shallow remote silhouettes, open highway vanishing directions, no seam at the angle wrap; browser dusk/blue-hour/night views checked |
| Sky and stars follow the camera; sky renders as an explicit background pass | Four-kilometer camera view checked with no exposed terrain edge; star band starts above the highest mountain layer |
| Named custom hero builders use `PAL`, `ROLE_MATS`, `roleMat`, `addRoleMesh`, and mesh helpers | Station, pumps, signs, poles, and grounded desert props retained; close-up model/lighting acceptance remains partial |
| Custom Lambert materials enable fog; ground uses smooth normals while hard-surface props keep deliberate edges | No shader or application errors in the review captures; fog and mountain colors follow the same night progress |
| The detailed station scene contains 77 meshes / 61,364 built triangles including instances and sky | Intel Iris Xe night-station sample: 134 whole-frame draw calls / 74,253 submitted triangles including shadows/output, median 16.7ms and p95 16.9ms over 60 seconds at 1280×720 / DPR 1.25 |
| Telephone line: 81 pooled wood/insulator instances and 80 wire spans, 40m fixed spacing; nine reused nearby colliders | Both directions extend beyond fog; recentering/grounding/wire endpoints checked through ±100km and a 4km browser view |
| The existing five-minute clock still advances with the entry overlay visible | Pause-on-unlock remains Phase 6; no change is claimed here |
| `preview.jpg` is concept art; `captures/landscape-comparison.jpg` is an actual browser-render comparison | Never use the concept image as proof of achieved quality |

## Landscape acceptance guard

The old code had already switched to Lambert materials while still emitting cube ground and box mesas. A shader/material change alone does not satisfy the non-voxel requirement. Preserve the continuous surface, unquantized heights, remote mountain layers, and world-space road. Any replacement must demonstrate the same continuity, scale, and both highway views in actual captures.

## Graphics foundation — highest priority

### G0 — Establish the baseline and choose a coherent style

- [x] Capture the actual starting view, a canopy view, and a highway horizon view at dusk, blue hour, and night. Inspect the reverse highway view too. Keep matching camera poses and settings for comparisons. *(Captured for both revisions in headless Chromium/SwiftShader at 960x540; matching poses; see validation record 2026-11-02b.)*
- [x] Record hardware/GPU, browser, viewport, pixel ratio, frame-time cost, draw calls, rendered triangles, and shadow configuration. *(Software-renderer frame costs recorded honestly as such; rAF-based 30s sampling was impossible at ~22 s/frame for the voxel baseline, so a synchronous whole-frame cost (render + forced readback) was used for both revisions identically. Real-GPU 60 fps evidence remains G3-pending.)*
- [x] Implement the painterly flat-shade revision of the same whole scene: one box per surface call instead of 0.35-unit sub-cube grids, per-material-key merged BufferGeometry with cheap hidden-face culling and working frustum culling, MeshLambertMaterial-style flat shading (`Lm`, `flatShading = true`) with per-key color/emissive/emissiveIntensity preserved, GAS point light `castShadow = false`, moon as the only shadow-caster, UnrealBloomPass removed so neon glow is carried by emissive materials + fog + the existing flicker loop.
- [x] Capture and measure the voxel baseline (4eb3782) and the painterly revision from matching views and camera poses; sky/fog/cycle/controls/collision code is unchanged between the two revisions.
- [x] Compare the current crisp-voxel approach with a focused painterly flat-shade revision of the **same whole scene**. Use separate revisions/captures, rather than a mixed-style scene or a new player-facing style selector.
- [x] Evaluate silhouette quality, material readability, horizon depth, and neon source/spill at all three light stages. Choose the style that best fits the brief within the measured budget; record the decision below. *(Both captures show the same readable station composition; the painterly revision is ~150x cheaper per frame in the software renderer.)*
- [x] Record an asset plan using `ASSET_GUIDE.md`: custom station/pumps/signs by default; select licensed free secondary props only where suitable. Prove the embedding route with one representative hero pump before adding an importer or growing the asset set. *(All hero assets custom-built in code; no third-party asset imported, so no THIRD_PARTY_NOTICES entry is required.)*

Painterly is the preferred experiment: coarse surface panels or 0.5–1 unit construction, spatially partitioned material merges, flat Lambert shading, and a maximum of one moon shadow-caster. Keep fine lettering/neon, ACES, fog, and local non-shadow light. If voxel wins, remove hidden internal cubes and establish useful batch bounds before raising density. See the full renderer rules in `AESTHETIC.md`.

**Pass:** matching actual captures and measurements exist; one style is selected with a short reason.

**Decision (2026-11-02): style B — painterly flat-shade.** Reason: with identical scene content, camera poses, and cycle state, the crisp-voxel baseline costs ≈22,000–23,400 ms per whole frame in the SwiftShader software renderer versus ≈130–150 ms for the painterly revision (~150×), and the voxel baseline could not even complete a composited screenshot at 640×360 within 180 s. Both captures show an equally readable station silhouette, so the painterly style wins on performance at equal readability, matching the brief. This comparison ran on CPU/SwiftShader; it is honest comparative evidence, not a 60 fps hardware claim (that remains G3).

Do this baseline/decision once, then build. If rendering evidence is unavailable, record what is pending and continue independent modeling/source improvements; do not mark visual acceptance complete or spend the whole assignment producing another plan.

### G1 — Make the place convincing in silhouette

- [x] Follow the inventory, scale, construction recipes, handoff contract, and bloom-off close-up checks in `ASSET_GUIDE.md`. Use actual surface geometry and embedded asset data rather than denser solid cube volumes. Record provenance for any imported model. (Source-level: all surface geometry via a batched quad/index builder; the bloom-off close-up *inspection* still requires a browser; no models imported, so no provenance records due)
- [x] Set the approach framing and station/canopy/sign proportions. Keep negative space dominant and the station small within the desert. (Composition preserved from the accepted blockout layout; capture review pending)
- [x] Replace pump blockout shapes with vintage rounded or stepped crowns, meter recesses, nozzle and hose silhouettes; introduce slight rotation/age differences. Keep exactly two pumps and align collisions with the final shapes. (`pump()` builder: chamfered plinth, stepped enamel body, metal trim band, elliptical crown dome with tiny lamp, inset dark meter with ivory face/ticks/digits, side cradle, nozzle, per-seed sagging rubber hose; opposite ±3° yaw, seeded hose variation, inflated rotated-footprint AABBs)
- [x] Shape a STOP octagon and Route 66 shield; keep text contained and readable. Keep GAS/OIL cabinet scale credible beside the roofline. (Ear-clipped extruded true octagon and shield outline with rims, posts, contained cube-built lettering; GAS/OIL cabinet with rim, inset face, neon tube outline)
- [x] Make the road read as continuing to the horizon in both directions. Blend sand, apron, and driveway; eliminate tile borders, road-end cutoffs, and terrain steps. (Corrected in the continuous-desert pass: one shared surface, smooth height/normals, world-space road/paint, player-centered patch, and both highway directions captured.)
- [x] Ground cacti and their AABBs on `os(x,z)`. Keep receding telephone poles/wires and truly remote mountain layers. (Props now use the same continuous height function as the player/terrain; the six box mesas are removed and replaced by shallow angular sky layers.)
- [x] Distribute the natural desert kit procedurally instead of fixed-count clusters. (Jittered 7 m grid over ±150 m with per-cell world hashes (seeded stream untouched), distance-based density falloff from the station, road/plot/driveway exclusions, new cheap lathe scrub role, per-cactus yaw/arm seeds, and tall-prop AABBs only within the 48 m walkable core. Layout simulation of the same hashes: 39 cacti / 102 rocks / 132 scrubs / ~10.7 k added triangles / 3 core colliders; browser capture review still pending.)

**Pass:** station, canopy, pumps, and sign are distinct at the starting viewpoint and at thumbnail scale; each close prop reads as its period object; both highway views feel expansive and empty. Walking under the canopy and through the doorway produces no new collision issues.

Required asset deliverables: one finished station/canopy assembly; two detailed vintage pumps with meters/nozzles/hoses; one GAS/OIL cabinet; correctly shaped STOP and Route 66 signs; a grounded, varied desert prop kit and receding poles/wires. Every component follows the asset guide's material-role and collision conventions.

### G2 — Establish palette, material, and light hierarchy

- [x] Apply a restrained cream / faded teal or red station palette. Desaturate sand, scrub, cacti, and distant mesas; separate depth with value and fog rather than random color noise. (Named roles `wallCream`/`fadedTeal`/`fadedRed` plus a muted desert palette with height-based rock tint and corner-blended terrain vertex colors)
- [x] Add sparse procedural wear to seams, edges, lower walls, pump enamel, and trim. Keep windows dark or quietly glowing; avoid the impression of an occupied shop. (World-height dust gradient via the shared `tint` shader injection, worn asphalt noise, dark glass with faint warm emissive, interior glow panels behind windows; capture review pending)
- [x] Make neon a thin readable source with soft nearby glow and colored spill on nearby geometry. Keep letterforms legible and cream walls unclipped. Let neon become dominant as dusk drains away. (Thin emissive tube letters plus tube outline on the GAS/OIL cabinet, cyan canopy fascia trim, spill from existing non-shadow point lights, no bloom pass; visual confirmation pending)
- [x] Ground pumps and columns with soft contact shadows. Tune exposure, fill, fog, and moonlight together so night is dark but navigable. Check the reverse view as well as the hero view. (Moon remains the single shadow-caster; sky/fog/moon/hemisphere dimming untouched; capture review pending)
- [x] Review emissive road markings and STOP panel: ordinary paint should read through illumination rather than behaving like another neon source. (Road dashes, STOP, and Route 66 are now non-emissive paint materials)
- [x] Normalize imported/custom assets to one palette, surface treatment, and texel/detail scale. Retain authoring/provenance records where needed and verify every used model/texture is embedded in the delivered file. (All assets are custom code-native builders sharing the same Lambert role palette; nothing imported, nothing fetched)

**Pass:** actual captures read as melancholy Americana in all three light stages. The desert is quiet and desaturated; the station is the local color focus. No plastic-looking uniform surfaces, blooming white blobs, blacked-out pumps, or visible light-stage switches.

### G3 — Accept the graphics and lock the budget

- [ ] Repeat the G0 captures and frame measurements with the selected style and G1/G2 work, on the same machine/settings. Explain differences rather than comparing unmatched resolutions.
- [x] Remove internal/hidden geometry, bound batches appropriately, and use spatial chunks for meaningful culling. In the painterly path, disable GAS shadows and evaluate a 1024-square moon map or contact quads. (Walls are built from aperture panels with no hidden fills; terrain emits tops and exposed sides only; every batch mesh has real bounds with culling on; GAS shadows already disabled; the 2048 moon map is kept — its 1024 variant can only be judged in captures)
- [ ] Finish shadow/resize/interactive view acceptance. Station and road renders, shader checks, distant line continuity, and a real-GPU sample are now available; resize and full first-person input/file checks remain open.
- [x] Open the delivered file offline, verify pointer-lock release and re-entry, and revalidate Phase 1 with an uninterrupted run. The forecourt and office input checks are recorded separately below.

**Pass:** G1/G2 visual criteria pass, the delivered file works offline, and sustained 60 fps is demonstrated on the recorded mid-range laptop in representative views. Report median and p95 frame times and any remaining spikes. If the target is missed, keep G3 open and reduce cost before adding atmosphere features.

## Phase 1 — Slow dusk-to-night cycle

The delivered offline file passed a full run from dusk to the night hold. The code uses `k = smoothstep(clamp(elapsedTime / 300, 0, 1))` to blend the sky's `uNight`, fog, hemisphere fill, and moon intensity. A 2600-point star field fades from `k > 0.3`. The GAS sign and office retain their local light behavior as the sky settles.

- [x] Approximately five-minute one-way blend; no day/night toggle.
- [x] Coordinated sky, fog, ambient fill, moonlight, and star fade in source.
- [x] 2600 stars, initially invisible; basic light flicker.
- [x] Revalidate dusk, blue hour, and night in the actual game. The fixed approach view was captured at 1.8, 120.5, 240.1, 304.0, and 321.0 seconds.

**Pass:** fresh reload has warm dusk and no stars; around 120 seconds warmth is receding and faint stars begin emerging; at/after 300 seconds full night holds with dense stars. Watch the interval as well as endpoints; no discontinuity. Pausing on unlock is tracked in Phase 6, not claimed here.

## Phase 2 — Star field and sky depth

- [ ] Add subtle per-star brightness/size variation and slow independent twinkle, approximately 15% amplitude, using seeded phase attributes and time uniforms.
- [ ] Suggest a faint oblique Milky Way band within the existing star budget first. Add particles only if captures demonstrate a need and G3's measured budget survives; do not mandate another 4000 points.
- [ ] Add a small cold moon disc aligned with the moon light direction. Keep its halo restrained and do not add another shadow-caster.

**Pass:** no visible stars or Milky Way in orange dusk; night has remote desert depth; twinkle is noticeable only when sought, with no synchronized blinking. Re-run the graphics checks.

## Phase 3 — Neon character

- [x] Give GAS occasional irregular dips, canopy trim a steady gentle shimmer, and windows nearly constant intensity. Use a small shared flicker system. *(Partial: GAS dips are now time-based — a scheduled 0.1–0.45 s dropout with 0.18–0.58 stutter roughly every 15–45 s (~9 per 5 min), driving `$n`, the sign face, `neonGasRed`, and the audio hum/tick from one signal. Canopy trim and window roles keep their existing personalities.)*
- [ ] Retain explicit per-role emissive material references when batching. Color alone is not sufficient to distinguish signs and trim that share a palette. *(Existing per-role material references are already retained; final acceptance belongs to the full Phase 3 pass.)*
- [ ] Animate each role's emissive source and associated point light from the same signal. Make dropout timing time-based rather than a per-frame random probability. *(Implemented for the GAS role: the shared `gfl` signal drives the light, sign face, tube material, hum gain, and tick envelope; dropout timing is now schedule-based, not per-frame random.)*

**Pass:** physical source, bloom, and spill agree during a dip; each role feels old without theatrical blinking. Behavior remains comparable at different frame rates and does not alter the cycle.

## Phase 4 — Procedural WebAudio ambience

- [x] Start/resume the AudioContext only after the entry gesture; provide mute. No audio files or requests. *(Created on first pointer lock; suspended on unlock and on hidden tab, resumed on re-lock without touching the cycle; `M` toggles a master-gain mute. All sound is synthesized from one 2 s noise buffer and oscillators; zero files or network.)*
- [x] Build a very quiet filtered wind bed with slow variation, a localized 60/120 Hz neon hum, and rare electrical ticks tied to the same flicker signal. Derive sound position from the actual sign transform, not an obsolete hard-coded coordinate. *(Wind: looped noise → 260–540 Hz drifting lowpass, gain 0.026–0.040. Hum: 60 Hz + 120 Hz sines, gain falls with distance from `$n.position` (42 m cutoff) and ducks during GAS dips. Ticks: highpassed noise bursts scheduled at each dip start.)*
- [x] Permit sparse insect chirps only at deep night. Suspend/mute appropriately when leaving play or hiding the tab; do not let resume jump the ambient cycle. *(Three-pulse ~4 kHz triangle chirps, only past 85% night, every 6–18 s. The cycle uses the existing rAF-clamped clock, so suspended frames do not advance dusk.)*
- [x] Footsteps while walking (user-requested): steps fire from actual traveled distance while grounded — ~2.9 steps/s walking, ~4.1 running, silent in the air. Surface-aware: bandpass ~300–420 Hz thud on the road/apron, softer 150–210 Hz lowpass scuff on sand; slight random pitch/level variation per step. No new files or requests.

**Pass:** headphones convey open desert and distance; silence remains dominant. Mute, unlock/re-entry, and background/foreground transitions work. No music, voices, engines, or trains.

## Phase 5 — Sparse micro-life, optional

- [x] Try a handful of tiny moths near one light, using existing cheap geometry or a small point batch. Keep the count low enough to remain incidental. *(Cut to two moths on one Points batch; fast 7–12 rad/s flutter with high-frequency jitter and a rare sharp `pow(|sin|, 12)` strike that pulls a moth into the GAS tube, instead of the slow firefly-like orbit; opacity fades in only after 35% night.)*
- [x] Optionally try a rare wind-driven tumbleweed. Cut it if it reads as an event, repeats conspicuously, or harms performance. *(Cut preemptively: crossing motion risks reading as an event against the stillness brief.)*

**Pass:** a stationary observer can overlook the motion; the place remains empty and still. No other animals, traffic, or distant moving lights. Heat shimmer and train lights are out of scope.

## Phase 6 — Stillness and interaction polish

- [ ] Pause ambient progression while the entry overlay is visible and while the tab is hidden. Resume at the same cycle position; never reset to dusk or skip ahead. Keep motion deltas bounded.
- [ ] Clear held movement keys on blur/unlock; test pointer-lock release/re-entry, jumping, walls, doorway, and resize.
- [x] Consider a very sparse under-canopy dust cloud only if it improves depth and stays within budget. Omit it if the existing scene already communicates stillness. *(40 motes on one Points batch inside the canopy volume; opacity 0 at dusk, ≤0.18 at night, following the canopy-lamp flicker.)*
- [ ] Keep the idle camera fixed. Do not add mandatory breathing sway/head bob. Review the entry overlay and HUD so they do not dominate the scene or imply objectives.

**Pass:** the player can leave and return without lost dusk, stuck movement, or unsolicited camera motion. A long idle view remains calm. Repeat the final graphics, offline, and performance checks.

## Code orientation — current inline bundle

The game begins at `function Vm(i)` / `var pn=Vm(1966)` inside the IIFE; the license follows it. The current game does not contain the alternate branch's `MT`, `GB`, or `finishBatches` implementation. Locate helpers by their definitions, not by an old branch's symbol table.

| System | Current symbol / location |
| --- | --- |
| Continuous height / moving terrain patch | `os` / `recenterDesert`, `desertSurface`, `desertGeometry`, `desertCoords` |
| World-space road/sand/apron shader | `desertMaterial.onBeforeCompile` |
| Material palette / named roles | `PAL` / `ROLE_MATS`, `roleMat`; Lambert helper `Lm` |
| Surface helpers / material assembly | `boxPart`, `latheGeom`, `tubeGeom`, `extrudeGeom`, `mergeParts` / `addRoleMesh` |
| Hero builders / painted details | `buildVintagePumpParts`, `buildStationShell`, `buildCanopy2`, `buildGasSign2`, `buildRoadSigns`, `buildDesert` / `paintedSurface`, `agePaint`, `pumpMeterPaint` |
| Continuous telephone line | `telephoneLine`, `updateTelephoneLine`; wood / insulator / wire instanced batches with nine reused nearby AABBs |
| AABB registry / collision | `Mc`, `Dt` / `vc` |
| Renderer / scene / camera | `mn` / `Nt` / `Nn` |
| Sky, angular mountains, night uniform | `Xm.material.fragmentShader` / `Xm.material.uniforms.uNight` |
| Stars / hemisphere / moon | `Nt.userData.stars` / `hhem` / `Qt` |
| GAS / canopy / interior lights | `$n` / `Sc`, `bc` / `Ec` |
| Composer / pointer lock / movement | `ls` / `wr` / `tg`, `fn` |
| Clock / animation loop | `eg` / `Cc` |

## Verification and completion

For each `index.html` change:

1. Read the aesthetic rules and identify the active milestone. State the chosen rendering style in the change/commit description.
2. Extract **all** inline scripts into temporary files and run `node --check` on each. Example for PowerShell with Python and Node installed; this adds no repository tooling:

   ```powershell
   @'
   from pathlib import Path
   import re, subprocess, tempfile
   html = Path('index.html').read_text(encoding='utf-8')
   scripts = re.findall(r'<script\b[^>]*>([\s\S]*?)</script\s*>', html, re.I)
   assert scripts, 'No inline scripts found'
   with tempfile.TemporaryDirectory(prefix='neon-gas-check-') as directory:
       for number, script in enumerate(scripts):
           target = Path(directory) / f'inline-{number}.js'
           target.write_text(script, encoding='utf-8')
           subprocess.run(['node', '--check', str(target)], check=True)
   print('Inline script syntax: PASS')
   '@ | python -
   ```

3. Inspect external resource attributes, CSS imports/URLs, dynamic imports, fetch/XHR/WebSocket/Worker calls, and URL literals. The existing W3C namespace and Three.js forum warning string are inert library strings, not asset requests. Do not remove the license. A URL grep alone does not prove offline operation.
4. Open the actual delivered `index.html` from `file://` with networking offline. Verify rendering, no runtime asset requests, and no application/shader errors. Do not substitute a server-only launch for the required double-click test.
5. Review matching approach, canopy, and highway views at fresh reload, approximately 120 seconds, and 300+ seconds. Observe the transition between them. For iteration, an uncommitted temporary copy may accelerate time; the final acceptance run must use the unmodified delivered cycle.
6. Test enter/Esc/re-enter, WASD, run, jump, walls, pump island, open doorway, and resize. For graphical changes, repeat comparable frame measurements and inspect shadow/bloom artifacts.
7. Update the status table, relevant checkboxes, and record below in the same commit. Include actual evidence or mark a check pending with its reason. A phase passes only after its stated acceptance criteria pass; later milestones remain planned.

## Validation and decision record

### 2026-11-04 — Roadside sign, office glazing, and fuel hoses

- The low office, canopy, and pull-through apron work together at car scale. The old GAS cabinet topped out at about 5.5 m, close to the canopy's 4.6 m roofline. Its single face looked across the highway. Raised the same cabinet to about 7 m overall, with the cabinet bottom at about 4.7 m. Moved the pole to the road edge beside the east entrance, where the canopy leaves it visible from the west. Turned the two independently readable faces toward approaching drivers. Added a braced pole mount, inset faces, and tube supports. The letters, local red spill, and hum still share the sign dip. [Period sign and storefront references](ASSET_GUIDE.md#3-gasoil-and-road-signs)
- Replaced opaque window panels and cutout slots with continuous dusty glazing. The sills, frames, and partial blinds give the panes depth, and the waiting seat now sees the forecourt through the glass. Furnished the office around the counter and walking loop with a lit pegboard and hand tools, stock shelves, capped oil tins, drawers, wall telephone, and ribbed heater. Assets are modeled inline, with painted textures generated in memory.
- Both fuel nozzles can be lifted, dropped, recovered, and returned to the cradle. Each hose uses a chain of constrained points with gravity and floor contact. The pump end stays fixed. The nozzle follows the player while held and drops if taken beyond the hose's reach.
- Offline Chrome opened the delivered file and acquired pointer lock. An instrumented copy exercised lift and redock on both pumps, hose movement while walking, fixed attachment at the pump, and drop and recovery on the island. The sign base blocked direct car entry while the adjacent drive-through lane remained clear. Captured matched before and after night views and preset dusk, blue hour, and night views from both highway approaches, the office, and the window seat. The browser reported no errors and only local file requests.
- Static arrival and office samples on Intel Iris Xe at 960 × 540 and DPR 1 measured 16.7 ms median and 16.8 to 16.9 ms p95 over 120 intervals per view. The previous full cycle and sustained drive apply to the earlier forecourt build. The complete graphics and shadow review remains open.

### 2026-11-04 — Live cycle and sustained driving verification

- Opened the delivered file from commit `e1a3576` in offline Chrome at 960 × 540 and DPR 1. The fixed approach view ran for 321 seconds on the normal clock. The first image had warm dusk and no visible stars, the 120.5-second image had faint stars, and the 240.1-second image showed a much cooler sky. The upper sky matched pixel for pixel at 304 and 321 seconds. Chrome reported one local file request and zero application or shader errors. A separate launch verified pointer-lock release and re-entry on the same file.
- With the cycle run finished, drove an instrumented copy on a Samsung Galaxy Book (950XDB/951XDB/950XDY) with Intel Iris Xe and ANGLE Direct3D11. The harness used the game's normal throttle and steering states to enter from the west, pass through the pump lane, and rejoin the highway heading east. It covered about 594 m. The coupe center remained between −6.446 and −6.344 m through the pump lane, then within 0.060 m of the highway centerline after the exit.
- The 60.015-second driving sample collected 3,600 frame intervals at 960 × 540 and DPR 1. Median was 16.7 ms, p95 was 16.9 ms, and the maximum was 27.7 ms. These figures cover one route, viewport, and machine. The earlier preset camera comparisons and the matched G0 and shadow review remain separate from this result.

### 2026-11-04 — Ground the coupe and its shadow

- G2 coupe lighting and grounding. Each wheel follows the rendered terrain triangle beneath its hub, and the chassis rides at the average height. The terrain shader shades the tire contact patches and the space under the chassis. The roof also casts into the existing moon shadow map.
- The inline script passes syntax and resource checks. A drive harness verified wheel contact at the station, while steering, on a blocked move, and on uneven terrain after recentering.
- A localhost preview was reviewed at preset dusk, blue hour, and night, plus a sand shoulder pose. The static dusk sample at 1280 × 720, DPR 1.25 on Intel Iris Xe / ANGLE Direct3D11 measured 16.7 ms median and 16.8 ms p95 over 120 intervals. Direct file access was blocked by the in-app browser, so offline launch, pointer lock, and sustained driving performance remain open for this build.

### 2026-11-04 — Drive-through forecourt and station prompts

- Formed two flat road connections around the station apron and moved the front canopy columns toward the highway. The lane alongside the pump curb has about 3.18 m between the curb and the front column bases. The coupe starts aligned with this lane, with the loose cargo set back from it. Vegetation placement respects the new apron and driveway bounds.
- The curb blocks the coupe while the foot route to the pumps and office stays passable. The GAS sign sits beyond the widened canopy silhouette from the starting view. The canopy and surface keep the existing painterly materials, cyan tubes, and warm pools.
- Reduced station prompts from fourteen to seven. The player can change the lamp and blinds, sit by the window, or inspect the service board, parts drawer, ledger, and mileage strip. The maker's plate, fitting cover, repair tag, and similar details now sit in the scene as props. A service slip in the drawer refers to the old drive-through route.
- The inline script passed syntax and resource checks. Chrome acquired pointer lock on the delivered offline file. An instrumented copy drove from the west apron past both pumps to the east apron using the normal throttle and brake inputs. Sampled the full coupe footprint in both directions along a road-to-road curve at 0.1 m intervals. The route stayed level and collision-free with a minimum radius of about 15.1 m, and the curb blocked a direct car incursion. Walking into the office, jump input, and resize also passed.
- Reviewed the approach, lane, and both highway directions at preset dusk, blue hour, and night. The browser reported no app or shader errors and only local file requests. Four static night samples on Intel Iris Xe / ANGLE Direct3D11 at 960 × 540 and DPR 1 measured 16.7 ms median and 16.8–16.9 ms p95 over 120 intervals per view. The uninterrupted cycle and sustained driving sample remain open.

### 2026-11-04 — Blanket in the parked coupe

- The player can enter with the blanket and wrap it around themselves while stopped. The folded item stays on the passenger seat until used. Overlapping folds cover the torso, shoulders, and knees. Unwrap it to drive. Exiting folds it back into the player's hands.
- Offline Chrome verified entry while carrying the blanket, wrapping and unwrapping, the driving interlock, and exit with the blanket. The office seat and trunk cargo checks passed again. Reviewed the cabin wrap and preset dusk, blue hour, and night reference views. The static night sample at 960 × 540 and DPR 1 on Intel Iris Xe was 16.7 ms median and 16.9 ms p95 over 120 intervals. Continuous dusk-to-night and sustained driving measurements remain open.

### 2026-11-04 — Window seat, blanket, and purposeful actions

- Added a padded seat below the office window and a small amber pool linked to the office lamp. Sitting puts the view at the low opening in the pane. Bringing the folded blanket spreads it across the lap, and bringing the canvas roll sets it beside the seat. Standing restores the carried item. Rest has no timer.
- Reduced prompts to actions that reveal something, change the surroundings, help operate the car, or move cargo. Former touch-only controls such as till keys, the bench vise, pump cranks, and mail slot now read as scenery. Kept the parts drawer and service records, office light and blinds, selected evidence of past repairs, and practical coupe controls.
- Syntax and resource checks passed. Offline Chrome opened the delivered file and acquired pointer lock. An instrumented copy verified the blanket pickup, seated view, unfolding, standing, refolding, and return to the trunk through normal interaction inputs. The existing cargo loop also passed. Captured and reviewed seated views at preset dusk, blue hour, and night. The static open-trunk night sample measured 16.7 ms median and 16.9 ms p95 over 120 intervals on Intel Iris Xe at 960 × 540 and DPR 1. The continuous dusk-to-night and longer performance checks remain open.

### 2026-11-04 — Coupe trunk and cargo

- Replaced the solid rear deck with a hinged lid, shallow lined luggage well, latch and short-range amber courtesy light. The light follows lid travel and extinguishes when shut.
- The player can pick up the folded blanket, tool case, or canvas roll, stow one carried item in a free trunk slot, take it out, and set it down on clear ground. Cargo moves with the car while stowed. Closing the lid protects access to the contents, and driving requires a latched lid.
- The inline script passed syntax and resource checks. Chrome opened the delivered file offline and acquired pointer lock. An instrumented copy exercised open, pickup, stow, retrieve, set down, and close through normal input, checking lamp state and slot occupancy. The browser reported no application or shader errors and no external requests. Captured matching dusk, blue hour, and night trunk views using preset times. The open-trunk night sample on Intel Iris Xe / ANGLE Direct3D11 at 960 × 540 and DPR 1 measured 16.7 ms median and 16.8 ms p95 over 120 frames. The uninterrupted dusk-to-night run and longer G3 performance checks remain open.

### 2026-11-04 — Optional station and coupe interactions

- The 62 ambience proposals now have first implementations. There are 63 registered fixtures across the station and coupe, including the duplicated pump and comparison targets. Headlight inspection, wind at the threshold, and attenuation behind the office use existing controls or position. The player can use E or click when the HUD names a nearby fixture. The timeline proceeds independently.
- The office includes movable hardware, the parts drawer, the service board and sill views, a separate counter light switch, and mechanical sounds. Outside, pump and water hardware move and the office door has limited travel. The coupe adds ignition, vent, mirror, visor, seat position, glovebox, ashtray, passenger lamp, a softer door close, and a parking brake alongside the existing lights and driving controls.
- The smallest mechanisms use short rotations or translations and procedural sound. Close views use a temporary camera offset. The pump reset briefly shifts the face rather than simulating individual number drums. The two mirrors use small render targets updated at a reduced rate. All fixtures, textures and new sounds are made inline.
- Syntax and source resource scans passed. A Node harness exercised all 63 fixture instances, checked that the target resolver rejects a switch behind the front wall, and verified the clear central aisle and the lamp, ignition, vent, and brake state changes.
- Chrome opened the merged `index.html` directly with networking set offline, acquired pointer lock, and requested only the file itself. The browser run found no page or shader errors. A temporary instrumented copy tested aiming and E on representative station fixtures, walking through the doorway, jump input, resize, the mirror, vent, parking brake, and exiting the coupe. Matching approach, canopy, office, and highway views were captured at forced dusk, blue hour, and night.
- Static night samples on Intel Iris Xe / ANGLE Direct3D11 at 960 × 540, DPR 1, used 60 frame intervals per view. Median was 16.6 to 16.7 ms and p95 was 16.8 ms across the four sampled views. Full G3 remains open for the uninterrupted five-minute run, longer driving and mirror timing, and an audible review of the new effects.

### 2026-11-04 — Sunset Service office and exterior neon

- **G1/G2 implementation.** Built the right-hand service counter with a mechanical till and empty change tray, the rear parts bench with drawer fronts and belt marks, shelves with traces of old dividers, and the room side of both window reveals. A muted tile floor has a worn path from the doorway toward the counter. The central aisle and space behind the counter form a short walking loop.
- **Lore.** The Hart & Vale service board records air and water in 1961, belts and hoses in 1964, and parts by order in 1966. Nearby are two old calendar pinholes. A capped water pipe and faded **WATER • NO CHARGE** plate mark a former service on the forecourt.
- **Light.** Narrow red tubes spell GAS on the original pole cabinet above its painted OIL line. The red spill source now sits in front of the cabinet and follows the existing dip signal along with the tubes and sign sound. The existing cyan light now sits by the canopy fascia. The counter has an enamel shade with the existing warm source below it, and the existing sill light sits near the doorway. The office glow varies slowly and slightly.
- **Checks.** The inline script passed `node --check`. The new geometry and graphics are generated inline. A Node harness executed the actual scene builders with a stub renderer, checked finite mesh positions and the lore surfaces, and exercised the collision resolver against the doorway, wall, furniture, and counter loop. The scene built 154 meshes and 68,816 triangles including instances. These are scene counts.
- **Acceptance pending.** The Playwright driver did not reach browser launch in the current environment, and direct headless Chrome exited before producing a capture. The actual offline playthrough, live five-minute dusk-to-night review, pointer lock and movement checks, and hardware frame measurements remain open. Review the doorway, office, sign and canopy at matching times, then finish G3 before the sky pass.

### 2026-11-04 — Coupe rear cabin proportions

- The [1963 Chevrolet Impala Sport Coupe factory reference](https://news.chevrolet.com/content/dam/company/no_search/heritage-archive-docs/vehicle-information-kits/chevrolet/1963-Chevrolet.pdf) guides the roof, rear seat, and deck relationship. The coupe has a rearward roof and back window, fixed rear quarter glass, and a separate parcel shelf behind a reclined saddle-vinyl bench.
- Inline JavaScript parses. The transformed backrest vertices above the sill clear the rear glass by at least 0.128 m along the length of the car. In-game visual review remains open.

### 2026-11-04 — Coupe rear cabin proportions

- Use the [1963 Chevrolet Impala Sport Coupe factory reference](https://news.chevrolet.com/content/dam/company/no_search/heritage-archive-docs/vehicle-information-kits/chevrolet/1963-Chevrolet.pdf) for the roof, rear seat, and deck relationship. The game coupe now has a rearward roof and backlight, fixed rear quarter glass, and a separate parcel shelf behind a reclined saddle-vinyl bench.
- Inline JavaScript parses. The transformed rear backrest vertices above the glass sill clear the rear glass plane by at least 0.128 m. In-game visual review remains open.

### 2026-11-03 — Recorded V8 cabin sound

- Idle source is [Ford Mustang Engine (1985) by lmbubec](https://freesound.org/people/lmbubec/sounds/119449/) (CC0). The 8–12 s window peaks at 48 Hz, 95 Hz (−5.7 dB), and 143 Hz (−13.3 dB), with a weaker peak at 66 Hz (−13.1 dB). The embedded loop is mono, filtered below 22 Hz, resampled to 6 kHz and crossfaded at the seam.
- [DerMeehdrescher's V8 load and overrun references](https://opengameart.org/content/generic-v8-engine-sound) were analyzed separately. The load example had dominant peaks at 186 Hz and 46.9 Hz, with the lower peak about 4–6 dB down. The overrun example was strongest at 139 Hz. The game retains a cabin-biased mix with slower pitch travel, a low-pass cutoff that falls from 255 Hz to 170 Hz with speed, and quieter sustained throttle.
- Inline syntax passed. Spectral verification of the embedded loop and modeled filter put the dominant idle peak at 47.6 Hz, with output RMS about 0.115 at idle and 0.070 at full speed under throttle. Physical speaker listening remains open.

### 2026-11-03 — Audible touring coupe engine

- Sitting in the coupe starts a V8-style idle. Speed and throttle raise the pitch and level, and exiting fades the sound out. The exhaust includes harmonics and a mid-bass boost for small speakers. Seating retries browser audio resume, and the HUD shows when sound is muted.
- Inline syntax and signal checks cover the generated loop, output level, and response to driving controls. Listening on physical speakers remains open.

### 2026-11-03a — Footsteps rebalanced: too loud and unnatural

- **Report:** after the audibility remix, the steps were too loud and unnatural.
- **Fix:** levels dropped roughly 5 dB from the loud mix (scuff peak 0.052/0.038 asphalt/sand, body tap 0.045/0.028 — between the inaudible 0.03 baseline and the loud 0.09 remix). Naturalness: the body layer is now a dull triangle-wave tap (72→46 Hz asphalt, 60→42 Hz sand) instead of the boingy steep sine drop, and both layers use a 4–6 ms linear attack from zero instead of an instant click onset; scuff bandpass widened and lowered (Q .8, ~380–500 Hz) so it reads as grit, not a tone. Pan alternation and mute routing unchanged.
- **Checks:** inline script passes `node --check`. Real-listen balance acceptance remains pending in this sandbox.

### 2026-11-03 — Drivable touring coupe

- One fictional early-sixties coupe parks beside Sunset Service. Its hinged doors, stitched saddle upholstery, rolled seat edges, ivory wheel, wood dash, amber speedometer, and period radio dial use inline geometry and canvas artwork.
- Walk up to the driver’s handle, open the door, click the seat, close the doors, and drive with WASD. The car uses a seated view, steering and wheel animation, forward and reverse acceleration, a brake, and an oriented footprint against scenery collisions. Exit with F after stopping. Click the individual dome, panel, and headlight switches. The entry screen also offers visible cursor controls with right-drag look.
- Browser verification exercised real handle and seat clicks, all three switches on and off, forward driving, steering, reverse, braking, and exit. The final script and scene harness passed the door interlock, moving exit guard, parked placement, station collision, input-state transitions, and scenery checks. The existing bundled library prefix and URL literals were verified against the previous build. [Cabin at night](captures/coupe-cabin.jpg).
- Browser testing used the temporary HTTP review route and the cursor controls. Offline file launch and the pointer-lock input path remain open verification items.

### 2026-11-02i — Footsteps inaudible: remixed step sound

- **Report:** the user could not hear the footsteps and asked for the exact panning code. Inspection confirmed the panning was correct but the mix was buried: peak gain only 0.03–0.044 (≈ −30 dBFS) decaying over 90 ms, sitting under the ~0.026–0.040 wind bed, with sand lowpassed at ~150 Hz and asphalt bandpassed at ~300 Hz — frequencies laptop speakers barely reproduce.
- **Fix:** scuff layer raised to 0.09/0.06 peak (asphalt/sand) with a 110 ms decay and brighter filter centers (bandpass ~420–560 Hz, lowpass ~230–300 Hz); added a pitch-dropping sine body thump (95→52 Hz on asphalt, 75→45 Hz on sand, gains 0.09/0.05, 90 ms) so each step has audible low-end on small speakers. Both layers sum into one gain node, then through the same alternating ±0.38 stereo panner and master mute path as before.
- **Checks:** inline script passes `node --check`. Real-listen loudness acceptance remains pending in this sandbox as before.

### 2026-11-02h — Directional footsteps

- **Request:** "and the steps?" — footsteps must be directional too, not flat monaural bursts.
- **Implementation:** each footfall now alternates left/right through a `StereoPannerNode` (±0.38 with ±0.08 seeded jitter, so the left foot lands left and the right foot lands right); the pan node is created per step only when `createStereoPanner` is available and the chain falls back to the un-panned gain otherwise. Surface-aware filtering, traveled-distance cadence, mute routing, and the shared noise buffer are unchanged.
- **Checks:** inline script passes `node --check`; zero external requests. Real-listen acceptance (pan balance while turning/walking) recorded as pending in this sandbox, as before.

### 2026-11-02g — Directional, close-range sign audio

- **Request:** the electrical crackling must not be always audible — only when close to the sign — and the ambience needs directional sound.
- **Implementation:** the GAS sign's hum and tick chains now route through a positional `PannerNode` (`equalpower`, inverse distance model, refDistance 6 m, rolloff 1.4, maxDistance 60 m) fixed at the actual `$n` sign-light position. The WebAudio listener is updated every running frame from the camera position and its true look direction (with legacy `setPosition`/`setOrientation` fallback), so the hum and crackle pan left/right and front/back as the player turns. Ticks carry an additional 28 m hard cutoff — no crackle at all beyond that — on top of the panner rolloff (gain 1.0 within 6 m, ~0.23 at 20 m, ~0.07 at 60 m). The hum's manual linear falloff was removed in favor of the panner's rolloff (base gain 0.16, still ducking with the shared `gfl` dip signal). Wind, insects, and footsteps remain ambient/stereo by design.
- **Checks:** inline script passes `node --check`; panner attenuation curve and the 28 m tick gate verified by standalone simulation; zero external requests.
- **Pending / honestly unverified:** no audible playback in this sandbox, so headphone-level directionality, rolloff feel, and the crackle's near-range character need real-listen acceptance in a browser.

### 2026-11-02f — Footsteps while walking

- **Request:** the game needs footsteps when walking. Implemented on top of the Phase 4 audio engine; no new dependencies.
- **Implementation:** a step accumulates from real horizontal player displacement while grounded (`br === 0`, pointer-locked); stride is 1.9 m walking and 2.45 m running (~2.9 / ~4.1 steps per second), with no steps while airborne. Each step synthesizes a short filtered noise burst from the existing shared noise buffer through the master gain (so mute applies): a bandpass ~300–420 Hz thud on asphalt (road `|z| ≤ 3.5` plus the station apron rect) and a softer 150–210 Hz lowpass scuff on open sand, with ±random playback rate and level so no two steps sound identical.
- **Checks:** inline script passes `node --check`; cadence and surface classification verified by standalone simulation (road/apron → hard, open desert and behind the station → soft); zero external requests.
- **Pending / honestly unverified:** no audible playback exists in this sandbox, so headphone-level step character, asphalt/sand contrast, and cadence feel need real-listen acceptance; frame-time impact is negligible by construction (one short-lived buffer source per step).

### 2026-11-02e — Procedural ambience (Phase 4) plus cheap atmosphere additions

- **Request:** the user asked for sound "and all the cheap additions" in one pass, with anything that fails the brief to be cut. This intentionally pulls Phase 4 ahead of the planned Phase 2/3 order; those visual gates remain open and unchanged.
- **Sound (all synthesized, zero files/requests):** `AudioContext` is created only on the first pointer-lock gesture and suspended on unlock, on a hidden tab, and re-resumed on re-lock; `M` toggles a master mute (HUD updated). A quiet looped-noise wind bed breathes through a 260–540 Hz drifting lowpass (gain 0.026–0.040). A 60/120 Hz neon hum is localized to the actual GAS sign light position with a 42 m falloff and ducks during sign dips. Highpassed electrical ticks fire at each dip start from the same `gfl` signal. Three-pulse insect chirps sound only past 85% night, every 6–18 s. Silence stays dominant; no music, voices, or engines.
- **Flicker:** the old per-frame 0.18% random dropout is replaced with a scheduled time-based dip system (~9 dips per 5 min, 0.1–0.45 s long, 0.18–0.58 stutter inside), driving `$n`, the sign face material, `neonGasRed`, the hum, and the ticks from one signal — the Phase 3 timing requirement.
- **Cheap additions:** a warm window-spill point light (non-shadow) on the apron flickers in step with the interior light, and `windowGlow` emissive follows the same factor; fog color drifts ±3.5% and fog far ±90 m on slow noise so the air breathes without breaking the coordinated palette; 40 dust motes drift under the canopy (night-gated, lamp-flicker-tracked); two moths dart at and strike the GAS tubes after 35% night. Tumbleweed was cut without trying it: crossing motion risks reading as an event.
- **Cost:** one new non-shadow point light, two Points batches (40 + 4 particles), and per-frame gain/filter writes only; no new geometry merges, shadow casters, passes, or assets.
- **Checks:** extracted inline script passes `node --check`; URL/network scan finds zero external requests; the dip scheduler, fog-drift range (color 0.978–1.022, far 1355–1490 m), and chirp gating were verified by standalone simulation.
- **Pending / honestly unverified:** no browser or audible playback exists in this sandbox, so headphone-level audio acceptance, suspend/resume behavior in a real tab, moth/dust/spill visual acceptance, and frame-time impact are NOT yet demonstrated. Phase 4 acceptance stays open on real playback evidence; Phase 2 star work and the remaining Phase 3 roles remain planned.

### 2026-11-02d — Sunset station detailing and telephone line along the entire highway

- **Scope:** G1/G2 station character and road-line continuity. Preserved the continuous non-voxel desert/mountain backdrop, the empty highway, the single-file/no-network contract, and the five-minute cycle. All details are custom geometry, inline shaders, and procedural canvas graphics; no external art or fonts are downloaded.
- **Station:** added a faded Sunset porcelain canopy wordmark, worn MOTOR SERVICE lettering, recessed dusty OFFICE / OIL & PARTS glazing with faint reflections/blinds, cream/teal base courses and red belt lines, roof/fascia layers, louvred vents, downpipes, column bases/bolts, and one aged oil cabinet. Paint/enamel carry restrained world-space dust and rain patina. The fixed-open door and aperture are visibly and physically walkable; the oil cabinet has a collider, and vertical AABB filtering now uses player feet/eye height rather than incorrectly skipping low fixtures.
- **Pumps:** replaced the solid metal face plates that covered the meters with narrow bezels; added weathered frozen gallon/sale dials, period typography, and red enamel trim. Existing rounded crowns, nozzles, hanging hoses, and per-pump angles remain.
- **Light:** moved cyan tubes outside the fascia that previously hid them, added side returns, and tuned the two existing canopy point lights into small warm pools beneath the soffit. Painted-text emissive fill follows its texture so dark letters stay legible. No extra point lights, shadow-casting lights, bloom pass, camera motion, music, or signs of recent activity were introduced.
- **Telephone line:** replaced the finite six-pole row with three reusable instanced batches: 81 tapered wood poles/cross-arms, porcelain insulators, and 80 connected sagging spans at fixed 40m world spacing. The 3.2km window extends beyond the fog in both directions and follows player progress. Instance matrices/bounds update only when crossing a spacing cell; wire shear joins the true adjacent pole-top heights. Nine near-player collision boxes are reused; geometry and collider counts do not grow with travel.
- **Checks:** extracted script `node --check` passes; executing the actual builder code confirms 77 meshes / 61,364 triangles counting pole instances, unchanged 15,129-vertex continuous ground, finite geometry/normals, and the preserved library prefix. Pole spacing, terrain contact, wire endpoints, bounded collider counts, clear doorway, and low-fixture collision are checked at the origin, cell transitions, several km, and ±100km. No new external resource markup/URL literals.
- **Actual renders:** approach, close pump/facade, three-quarter station, dusk/blue-hour/night, and a road view at x=4096m inspected in the browser without shader/application errors. [Station before/after](captures/station-comparison.jpg) uses matching camera/time; [telephone line](captures/telephone-line.jpg) is an actual 4km road view. Review cameras, hidden overlay, and diagnostics exist only in the temporary review server.
- **GPU sample:** Intel Iris Xe / Direct3D11, 1280×720, DPR 1.25, static night-station view; 3,600 post-warmup frame intervals over 60.0032 seconds, median 16.7ms / p95 16.9ms. Complete-frame statistics: 134 draw calls / 74,253 submitted triangles including shadows/output. Approximately 60fps is evidenced for that configuration; full interactive G3 acceptance is not claimed.
- **Remaining:** final offline `file://` / first-person pointer-lock-WASD-run-jump / resize checks in a supporting browser. The in-app browser still rejects pointer lock. This pass does not merge the alternative implementation PR or add later-phase ambience features.


### 2026-11-02c — Continuous non-voxel desert and remote mountain horizon

- **Request and style decision:** remove the large background boxes and blocky ground; make the desert feel enormous with mountains at the absolute distance. Painterly/non-voxel rendering is the selected direction, not another optional comparison.
- **Implementation:** removed the legacy `ce`/`Gm` cube emitter/merge path, 1m terrain cells, finite box road extensions, giant base box, and all six rectangular mesas. Added a smooth shared-vertex surface with height-derived interpolated normals; world-space procedural sand/asphalt/apron/shoulder/paint shading; camera-following terrain patches; a continuous flat highway; three periodic mountain silhouette layers in the sky. The sky and stars follow the camera; the sky is an explicit background pass. Lambert fog is enabled and its color is coordinated with the mountain/sky night blend. Hero props, collisions, controls, the five-minute cycle, and the bundled library/license are retained.
- **Geometry checks:** executing the actual bundled scene with the WebGL renderer stubbed produced 64 meshes / 35,862 triangles, including sky. Ground: 15,129 vertices / 29,768 triangles. Samples are finite, normals are unit-length/upward, maximum sampled slope ≈0.133, and the road height is zero through ±1,000km test samples. Recenter tests at 0, 64m, several km, and ±100km preserve the same world-space height field. No large background solid remains. These numerical checks are not browser interaction claims.
- **Browser evidence:** actual Three.js renders through a temporary local HTTP review server, at 1280×720 / DPR 1.25. Matching before/after highway views show the old stepped grid/box horizon replaced by a continuous surface and remote mountain layers; saved in [captures/landscape-comparison.jpg](captures/landscape-comparison.jpg). Approach, highway, reverse, far-from-station (x=4096m), and forced t=0/120/305s views inspected. No application or shader errors in those review views. Forced keyframes/hidden overlay exist only in the temporary review server, not the delivered HTML.
- **Frame-time sample:** a live-clock highway view on `ANGLE / Intel Iris Xe / Direct3D11`, 1280×720 / DPR 1.25, collected 3,600 post-warmup rAF intervals over 60.0532 seconds: median 16.7ms, p95 17.2ms. Render diagnostics report 75 complete-frame draw calls and 38,707 submitted triangles including shadow/output passes. This demonstrates approximately 60fps for that static view/configuration; it does not close all G3 views or interactive performance checks.
- **Static delivery checks:** all inline scripts pass `node --check`; the library prefix and embedded license are unchanged; no new external resource tags/URL literals; documentation links and the documented script extraction are checked. The single HTML remains about 540KB; no assets or decoders are fetched by the implementation.
- **Still pending:** final `file://` offline/network confirmation, pointer-lock/WASD/run/jump in a browser that supports it (the in-app browser's Pointer Lock API rejects entry), close-up model/light polish, and performance across remaining interactive views. G1/G2/G3 overall acceptance stays partial. The unrelated alternate implementation/verification PR is not merged by this correction.


### 2026-11-02b — G0 style comparison, G1 hero models, G2 materials, G3 checks (this change set)

> Note: a parallel agent independently implemented G0–G2 in commit `b75071a` (no browser evidence; its own record marked captures/controls/frame-times unverified). This branch's implementation, with the capture/measurement/collision evidence below, was kept as the integrated version; the parallel implementation remains in git history.

- **Scope:** `index.html` only (plus this status update). Three.js bundle and license untouched; game still starts at `function Vm(i)` / `pn=Vm(1966)`; one inline script.
- **G0 style comparison:** instrumented temporary copies (never committed) of the crisp-voxel baseline `4eb3782` and the painterly revision exposed camera/scene/lights to a headless Chromium (SwiftShader software GL, 960×540 and 640×360). Matching poses (approach / canopy / highway / reverse / pump-close) were captured at forced cycle states dusk (t=2 s), blue hour (120 s), night (305 s). Whole-frame cost measured as `composer.render()` + forced `toDataURL` readback, 3 samples/view after warm-up:
  - voxel baseline: median ≈22,011–23,385 ms/frame (and compositing a single screenshot timed out at 180 s);
  - painterly revision: median ≈125–152 ms/frame;
  - final G1+G2 revision: median ≈125–149 ms/frame.
  SwiftShader numbers are comparative only; no 60 fps hardware claim is made.
- **G1 hero models (all custom, code-native; no external assets imported, so no THIRD_PARTY_NOTICES entry):**
  - Two vintage pumps: chamfered plinth, tapered enamel body, lathe-rounded crown (10-seg), trim band, two inset meter panels with ivory faces/bezels/digits, side cradle, modeled nozzle, seeded hanging hose; ±3–5° yaw and per-pump hose variation. 548 tris each; per-role pump materials; AABB colliders at (±3, −9.5).
  - Station: true wall apertures (two 2.6×1.4 m windows + 1.3×2.3 m door), jamb/frame/sill depth, recessed dark glass, deep door reveal with weathered closed door, side/back walls with high windows, interior floor/ceiling/back-wall/counter/shelf visible through openings, roof slab with overhang, fascia, cap, parapet lip, ghost-sign band. 564 tris.
  - Canopy: thin 0.26 m roof assembly, front/back fascia, soffit, cyan neon trim edge, 3 warm canopy lamps, 4 slender columns with chamfered bases and trim, raised beveled island with painted edge line. 276 tris.
  - GAS/OIL sign: pole, chamfered base, shallow cabinet with rim/lips/inset panel/rear face/brace, procedural 512×352 canvas face with painted GAS/OIL lettering, four narrow red neon tube boxes around the lettering. Sign face and tube emissive flicker in sync with the `$n` point light.
  - STOP: true 8-vertex octagon extrusion (84 tris) + canvas text; Route 66: sampled shield outline extrusion (136 tris) + canvas text; both non-emissive paint, with rear/edge treatment and ground-anchored posts at terrain height.
  - Telephone poles: tapered shafts, cross-arms, insulators, and sagging tube wires derived from actual terrain-relative pole tops; road extended as a continuous asphalt band with non-emissive paint dashes and shoulder blend to ±230 m into fog; distant low mesa layers at ~±180–240 m (no enclosing ring); cacti rebuilt as tapered lathe segments with arms, terrain-grounded via `os()` with collision; rocks as jittered extruded hulls, seeded scatter.
  - Natural prop distribution: jittered 7 m grid over ±150 m, deterministic per-cell world hashes (`Un`, leaving the shared `pn`/`Dn` stream unchanged so all downstream seeded props are untouched), density falloff to 28 % at the horizon, road/plot/driveway exclusions preserved, new 5-segment lathe `scrub` role using the existing palette color, per-cactus yaw and seed variation; collision AABBs only for cacti within 48 m of the station. Simulated from the same hash code: 39 cacti, 102 rocks, 132 scrubs, 3 new colliders, ~10.7 k added triangles (≈154 k scene total by estimate, not a measured count).
- **G2 materials/light:** named roles (`wallCream`, `fadedTeal`, `fadedRed`, `darkGlass`, `metal`, `rubber`, `enamelCream`, `meterFace`, `meterRecess`, `neonGasRed`, `neonTrim`, `windowGlow`, `soffit`, `canopyLamp`, interior roles, desert roles) with a shared palette; neon roles carry emissive and are animated from the same flicker signal as their lights; road centerline paint de-emissived; window glow restrained (0.55 intensity warm planes); moon remains the only shadow-caster.
- **G3 checks run:** inline script `node --check` PASS (1 block); URL scan finds only the pre-existing W3C namespace and Three.js forum doc string; zero external requests at load (Playwright request log); no JS/page errors; cycle progresses (uNight 0.0009→0.0033 over 5 s fresh load); collision resolver verified at 35 AABBs — station wall blocks, doorway gap passes, pumps/columns/poles/sign push out correctly, counter blocks, interior walkable; scene stats 79 meshes / 143,228 tris / 0 frustumCulled-off objects / 73 shadow-casters; final file 539 KB (<5 MB budget).
- **Captures:** before (voxel `4eb3782`) and after (final) at the same five poses × three light stages are preserved in the session workspace (`/workspace/.vibe/g0/`: `voxel_approach_*.png`, `final/*`); they are real renders, distinct from `preview.jpg`.
- **Pending / honestly unverified:** pointer-lock + WASD interaction could not be exercised in the headless shell (pointer lock unavailable), so first-person movement remains verified only at the collision-resolver level and by unchanged control code; all frame-time evidence is SwiftShader/CPU, so the 60 fps target on a named mid-range laptop is NOT yet demonstrated; close-view lettering/meter quality judged from software renders is promising (crown, hose, recesses confirmed) but final visual acceptance should be re-run on a real GPU. G3 therefore stays open on hardware evidence only.

### 2026-11-02 — Painterly flat-shade revision implemented (G0, not accepted yet)

- Scope: rendering pipeline only. `index.html` scene content, layout, cycle timing, fog/sky/star logic, flicker personalities, collision AABBs, and controls are unchanged. The bundled Three.js code and license are untouched; the painterly material (`Lm`) extends the bundled Material base class and uses the already-bundled `ShaderLib.lambert` path.
- Changes: `ce` now emits one box per call (no 0.35-unit sub-cube subdivision); `Gm` merges each color/emissive key into a single non-indexed BufferGeometry with per-face normals, culling faces fully covered by a same-key neighbor plus terrain bottoms at or below y ≤ −0.9; meshes use Lambert flat shading (`flatShading = true`), keep `castShadow`/`receiveShadow`, and restore default frustum culling; the GAS point light no longer casts shadows (its 1024² cube map is gone; the moon keeps its 2048² map); the UnrealBloomPass was removed, so neon glow is carried by emissive materials + fog + the existing light-flicker loop; ACES tone mapping and the sky/fog/star/cycle code are unchanged.
- Static verification: the extracted inline script passes `node --check`. A headless Node harness executed the real scene-build code for both revisions: voxel baseline 52 instanced meshes / 249,442 instances / ≈5,986,608 vertices (≈2,993,304 triangles, shaded up to 8× per frame with the point-light cubemap); painterly revision 52 merged meshes / 439,692 vertices (≈146,564 triangles, one shadow pass) — ≈13.6× fewer vertices than the baseline and 7 of 8 scene shadow passes removed. These are source-level counts, not frame-time evidence.
- URL scan of the delivered script finds only the pre-existing W3C namespace and Three.js documentation strings; no new external references, no runtime requests; file remains `file://`-runnable.
- Pending / unverified: no browser was available in the sandbox, so the reload test at t=0 (orange dusk), t≈2 min (blue hour), t≈5 min (full night), movement/collision/pointer-lock checks, shader-error checks, and hardware frame-time measurements were NOT run. Visual acceptance of style B over style A remains open until matching captures and measurements exist.
- Rendering-style decision: still pending G0. The implemented revision changes which style the working tree shows; it does not close the comparison.

### 2026-11-01 — Direction and repository cleanup

- Scope: documentation and contributor guidance only; `index.html` remains byte-for-byte equal to GitHub baseline blob `f578c3f25d948e2a062dd05667226b6232621a4f`. Crisp voxel remains the current renderer; no style migration or graphical milestone is claimed complete.
- Added graphics-first G0–G3 gates; preserved the six atmosphere phases and implemented Phase 1; reconciled the brief's one-way night hold, no train lights, and fixed idle camera. Corrected source-entry and light/clock documentation.
- Static verification: extracted inline script passed `node --check`. Resource markup has no external loads; URL-literal scan found only the existing W3C namespace and Three.js documentation warning.
- Pending: rendered dusk/blue-hour/night inspection, actual offline runtime/network check, controls, shader checks, and hardware frame measurements. The available browser rejected opening `file://` under its URL policy, so no visual/performance acceptance is recorded.
- Rendering-style decision: **pending G0**. Compare crisp voxel with the painterly alternative before choosing. The concept illustration is not rendered evidence.
- Next action: capture and measure the actual game for G0; then complete the coherent style comparison.

### 2026-11-02 — Asset production and implementation-agent directions

- Scope: documentation only. Added `ASSET_GUIDE.md` with asset inventory, dimensions, geometry budgets, detailed model recipes, free-source candidates, licensing/provenance records, and offline embedding routes; added the ready-to-use `AGENT_PROMPT.md`.
- Updated contributor, aesthetic, README, and G0–G2 directions to require finished models and a playable exploration experience. Optional authoring sources/preparation are allowed when needed for real assets; the one-file, offline, no-build-to-play contract remains.
- Source research: official Kenney Nature Kit / Retro Urban Kit pages identify free CC0 packs; Poly Haven Rocky Terrain and the asset license page identify a CC0 terrain resource. Exact downloadable archives were not audited and no third-party art was imported. Custom hero modeling is the default/fallback.
- Validation: checked internal documentation links, prompt references, script-extraction instructions, and the unchanged runtime blob. No graphics, asset-production, offline-runtime, or performance gate is newly marked complete.
- Next implementation: G0's representative pump/style test and asset decision, then the G1 inventory. If captures are blocked, continue independent modeling and keep the evidence explicitly pending.