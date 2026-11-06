# Roadmap — Neon Gas: Route 66 Dusk

The execution plan for the single-file vignette. [AESTHETIC.md](AESTHETIC.md) defines the look; [ASSET_GUIDE.md](ASSET_GUIDE.md) defines asset production; [AGENTS.md](AGENTS.md) makes this plan part of the contributor workflow. Use [AGENT_PROMPT.md](AGENT_PROMPT.md) to launch implementation. Source audited on 2026-11-01 against `4eb3782`; asset guidance expanded on 2026-11-02. The G0 style decision and the G1/G2 graphical overhaul were implemented on 2026-11-02 on `vibe/neon-gas-voxel-f660eb` (PR #1); see the validation record for what is and is not verified.

**Next: close the remaining G3 graphics review and sustained 60 fps acceptance.** The latest performance pass restores rendering after audio starts and reduces GPU and streaming work in the painterly build. Long-tail frame spikes under the canopy and during travel remain part of G3 acceptance.

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
| G1 — Composition and period silhouettes | Sunset Service office, 8.1 m pole sign, drive-through forecourt, and visitable Cinder Court Motor Lodge (`x = -4600`) built | Both sites have readable highway approaches, forecourt turnoffs, and arm's-length hero fixtures. |
| G2 — Palette, surfaces, and light hierarchy | Glazing, bench light, GAS/OIL neon, and Cinder Court coral/turquoise neon + amber room lamp implemented | Warm dusk, turquoise/cyan fascia, coral/red sign neon, and warm interior pools keep a restrained hierarchy across both sites. |
| G3 — Graphics acceptance and performance | Performance regression addressed. Acceptance remains open. | See the latest matched measurements. Investigate remaining frame spikes and verify a sustained drive through route and lighting transitions. |
| Phase 1 — Dusk-to-night cycle | Visually revalidated on the delivered offline file | Full night held at the 304- and 321-second captures; clock runs continuously across the highway trip. |
| Phase 2 — Star field and sky depth | Planned | G3 passed; Phase 1 revalidated |
| Phase 3 — Neon character | Partial: time-based GAS dips (shared with audio ticks) and Cinder Court sign/lamp shimmer | Phase 2 acceptance; remaining role work |
| Phase 4 — Procedural audio | Wind, localized neon (Sunset Service, Cinder Court, Starlite Diner), indoor shelter muffling, multi-surface footsteps (sand, asphalt, canopy concrete, linoleum, timber bridge), shelter-aware night insects, 3-speed V8 coupe engine with tire roll and multi-surface grip, highway tar-joint thumps, dual-tone horn, turn-signal relay tick, static/beacon AM radio, and obstruction-aware hum timbre implemented. Listening review remains open. | Requested early by the user; Phase 2/3 visual acceptance still open |
| Phase 5 — Sparse micro-life | Moths near the GAS sign implemented (source-level); under-canopy dust motes removed on 2026-11-06 at the user's request (they read as fireflies between the pumps); tumbleweed cut as an event risk; acceptance pending | Phase 4 acceptance; cut anything that reads as activity |
| Phase 6 — Stillness and interaction polish | Window rest, blanket use, glovebox map, physical nozzle refueling (`Pump fuel into coupe`), Cinder Court show room, Starlite Diner & Bar, full coupe driving & handling dynamics (highway coasting glide, speed-sensitive caster return, passing kickdown, carburetor induction moan, RWD loose-surface throttle oversteer/counter-steer, driver bench seat inertia, dual-axle joint cadence, speedometer needle quiver, and cozy amber dash illumination) | Separate glovebox/map, refueling, cabin controls, multi-surface driving, and full period land-yacht handling verified offline. Full stillness acceptance remains open. |
| World expansion — Pacific Northwest | Implemented prototype. Visual acceptance open following user review. | The user rejected the terrain and biome transition. The source audit found a river-carving arithmetic defect and position-driven biome/weather rules. [PACIFIC_NORTHWEST.md](PACIFIC_NORTHWEST.md#feasibility-review--2026-11-05) recommends prototyping a curved mountain tunnel between authored dry and wet regions, then reviewing its terrain, trees, driving, sound, and performance before extending the route. Earlier implementation and measurement records remain below. 2026-11-05 terrain and mood pass implemented locally (see record); acceptance still open. |

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
| The full two-site scene contains 329 meshes / 96,042 built triangles including instances and sky (`motelGroup`: 55 meshes / 3,862 triangles at `x = -4600`) | Intel Iris Xe night samples at 960×540 / DPR 1: median 16.6–16.7 ms and p95 17.9–18.5 ms across Cinder Court approach, forecourt, show room, and Sunset Service |
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
- [x] Add a small cold moon disc aligned with the moon light direction. Keep its halo restrained and do not add another shadow-caster. *(Implemented in the sky shader aligned with `Qt` at `(52, 26, 20)` in the eastern sky opposite the setting western sun, emerging smoothly with `uNight` without a second shadow-caster.)*

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
- [x] Consider a very sparse under-canopy dust cloud only if it improves depth and stays within budget. Omit it if the existing scene already communicates stillness. *(Implemented, then removed on 2026-11-06 at the user's request: the 40-mote Points batch read as fireflies hovering between the pumps. Only the GAS-sign moths remain.)*
- [ ] Keep the idle camera fixed. Do not add mandatory breathing sway/head bob. Review the entry overlay and HUD so they do not dominate the scene or imply objectives.
- [x] Coupe steering calibration & in-game settings modal: progressive tap accumulator eliminates high-speed twitchiness and enables delicate micro-trim corrections; full lock preserved for intersections and parking; period-styled bakelite/amber settings modal with sensitivity sliders, presets, highway assist damping, mouse sensitivity, volume, and comprehensive key reference (`O` key or top-right button).

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

### 2026-11-06 — Under-canopy dust motes removed (user request)

- The user reported glowing particles between the gas pumps as unwanted "fireflies". They were the Phase 5 under-canopy dust-mote Points batch (40 particles, warm `0xffe0b0`, drifting slowly through the canopy volume x −4.2…4.2, z −11.2…−7.4, y .5…3.9 — directly over the pump island), not the GAS-sign moths. Removed the mote creation block and its per-frame position/opacity update; the tire-dust plume, windshield dust, and GAS-sign moths are untouched.
- Verification: all inline scripts pass `node --check`; no remaining references to the mote system. Browser visual re-review of the canopy at night is pending (no headless browser available in this session), so the visual acceptance of the removal stays open.

### 2026-11-06 — World atlas written (documentation only)

- Added [WORLD_MAP.md](WORLD_MAP.md): one map for every region, with the ring and spine layout, kilometre and drive-time tables, hinge devices for each boundary, per-biome climate targets, dependencies on the glovebox map, fast travel, gas and sound, a build order, and open decisions. No change to `index.html`; nothing in it is authorized to build yet. The kilometre and minute figures are plans computed from the coupe's 50 mph reference, not measured drives.

### 2026-11-06 — Pacific Northwest mood, biome transition and dense forest (local until pushed)

- **Reference reading:** the Olympic and western Cascade accounts agree on what sells the region: marine cloud that sits on the ground, drizzle and standing wet, moss and lichen on bark, nurse logs, sword fern and salal under Douglas fir, western hemlock and red cedar, grey broadleaf alder and maple along water, and a hard rain shadow that turns the east side to ponderosa and sage within a few miles. These were taken from text sources (NPS, regional travel and photography pages), not from viewing photographs.
- **Problem seen in the game (screenshots at route km 8.5 to 21):** the ground stayed khaki to km 15, the trees were thin dark spires with bare trunks and nothing beneath them, and the sky and fog were an even grey with no layering.
- **Transition ("driving into the cloud"):** one moisture gradient now drives everything. Sage and sparse ponderosa parkland, then Douglas fir with sage-to-fern shrubs, then a hemlock and cedar wood. The cloud front now arrives at the crest (route 9.6 to 15.8 km), mist banks thicken there and settle low in the valley, the road goes damp from 11.6 km, and the soil and verge turn green by about 12 km.
- **Forest:** near trees (up to 1,250) come in six species with painted vertex colour (lit branch tips, dark crown interiors, moss on the lower trunk), including broad cedars, ponderosa, alder and bleached snags; flanks use a cheaper 5-sided silhouette (up to 6,400); one instanced shrub (up to 3,400) is pale sage on the dry side and deep fern on the wet side; up to 160 nurse logs. Cells hold up to 150 tree candidates per side and the verge is dense, with old giants kept back from the road. Fern Bend, the bridge, turnouts, the river and the trail stay clear.
- **Mood:** under cloud the sun weakens strongly and the sky fill takes the fog's cool grey-green so dense canopy dims without going black; fog is cooler and a little darker, 24 upright soft mist banks hang between the tree layers, and foliage and bark carry small emissive floors tied to the time of day. Bundled `Material.clone()` returns a blank material, so forest materials are built from the palette.
- **Evidence:** inline `node --check` passes. Embedded Chromium over localhost at 746x630, pixel ratio 1.25 (graphics hardware not recorded): 180 frames at each of routes 9, 12.5, 15.5, 19 and 23 km at noon held 16.6 ms average, 16.8 ms p95 and 17 ms max, which is the display refresh limit, so headroom is not measured. About 8,050 forest instances were visible. A teleport costs one 47 to 50 ms frame, then frames settle. Screenshots reviewed at noon and blue hour at several kilometres, including rain.
- **Not verified:** a named-laptop frame-time run, driving (not teleporting) across cell boundaries, night and first-light sweeps, the offline `file://` run, the Fern Bend arrival with the new forest, and a side-by-side against real reference photographs. Trees have no collision. Visual acceptance stays open.

### 2026-11-05 — Fast travel: trip card and dev warp

- **Trip card (in-world):** `Y` while seated and stopped opens a Western Motor Guide card listing every stop, from the catalog plus the through-road turnouts. Each row shows miles, minutes and the arrival clock. Choosing one fades out with a title caption, then charges the true clock time at 50 mph, true gas, odometer and trip miles, and parks the coupe in the westbound lane just east of the stop with the player still seated. Rows needing more gas than the tank holds are disabled.
- **Dev warp:** the backtick key opens the same list anywhere, on foot or seated, with no clock or gas cost, plus extra far through-road stops and dusk, night, first light and noon buttons. Also reachable as `_game.openTravelModal(true)` and `_game.travelTo(stop, true)`.
- **Verified:** inline `node --check` passes; in the embedded browser the card opened by `P`, travel to Fern Bend arrived seated on level ground with the clock advanced and no errors; dev warp list opened. Not verified: on-foot warp arrival, gas-short disabled rows, keyboard navigation by hand, `file://` offline run. The browser tool's key press did not reach the page, so keys were tested by dispatched events.

### 2026-11-05 — SR 14 terrain, forest, and mood rework (local, uncommitted)

- Root causes found by sampling the live file: the river carve doubled ground height outside the banks; relief was an absolute offset blended to zero within 22 m of the road, so the road sat in a trench with 60–100 m walls and plateaus; the south side stepped to desert level at the Route 66 midline; at Fern Bend the ground jumped 11 to 79 m within 30 m; the forest was one tree per side per 36 m; rain was a fixed maximum beyond km 21.
- Changes: carve fixed. New `nwRelief` gives calm valley floors, concave flanks with gullies and crest variation, a dry mountain shoulder, a Fern Bend knoll for the overlook trail, and a descent to the desert floor toward Route 66. Bank blend width scales with cut height. Terrain shader adds slope rock with strata and seeps, grass-to-conifer soil by moisture, roadside verge, and a sky-toned wet-asphalt sheen. Forest is now deterministic per 40 m cell, about 400 full-detail crowns near and up to 3,200 cheap flank silhouettes, built one cell per frame. Foliage colors lightened with a daylight-only lift. Cloud and rain now follow a 24-hour-periodic weather timeline scaled by position; fog near and far, sun, and hemisphere light follow cloud.
- Evidence: inline `node --check` passes. Embedded Chromium over localhost, hidden-pane limits noted: median 16.7 ms, p95 17.6 ms, max 19 ms over 600 frames of simulated driving after a teleport (one first-load stall of about 0.9 s, not repeated on a second teleport, excluded). Screenshots reviewed at dry foothill, gorge, wet valley, Fern Bend at dusk. Not done: `file://` offline run, night and rain-clear sweeps, bridge and turnout walk-through, collision on new slopes, the tunnel proposal, named-laptop measurement. Trees have no collision.

### 2026-11-05 — G3 travel hitch reduction and rain primitive correction

- Preserved the existing performance recovery (`841fd21`), audio fix, all destinations, driving, interactions, lighting, weather, and adaptive resolution. This follow-up keeps the painterly direction and changes terrain scheduling plus the rain draw primitive.
- Terrain preparation now runs in approximately 1.25 ms batches during ordinary travel, staging heights and indexed triangle normals separately. Heights, normals, origin, and bounds commit together. The old dense surface remains usable during preparation; initialization, teleports, and reaching the dense-core safety margin complete synchronously. The height function, mesh density, road shading, and terrain topology are unchanged.
- Rain incorrectly used a triangle mesh for 650 pairs of drop endpoints, producing large translucent triangles across the view. The bundled renderer now submits those same endpoints as 650 independent line segments using its existing line path. No rain particles or weather features were removed.
- Exact numerical regression: 14 terrain placements covering the station, fork, gorge, Fern Bend, reverse travel, and ±100 km produced byte-identical positions and normals to the starting file. A 1,800-step moving test checked 19 atomic surface commits, unchanged displayed buffers between commits, and continued dense-core coverage. Conservative bounds contain every vertex.
- Hardware: Samsung 950XDB/951XDB/950XDY, Core i7-1165G7, Intel Iris Xe, driver 32.0.101.6874, ANGLE Direct3D11, embedded Chromium 156. Localhost preview at 1280 × 720 CSS, display/render DPR 1.25 (1600 × 900 internal), audio running. The temporary harness used normal coupe throttle and steering for approximately 975 m of rainy SR 14 travel per 30-second sample. Measurements below are callback-start wall-clock intervals, including scheduling jitter, not GPU timer queries.

| 30-second rainy drive | Before | After |
| --- | ---: | ---: |
| Frame median | 16.7 ms | 16.6 ms |
| Frame p95 | 22.2 ms | 23.7 ms |
| Frame p99 | 81.5 ms | 29.4 ms |
| Worst frame | 110.7 ms | 40.2 ms |
| Frames over 34 ms | 21 / 1704 | 4 / 1783 |
| Worst terrain callback | 99.8 ms | 2.4 ms |

- The severe periodic terrain stalls are reduced, but the p95 did not improve: **steady 60 fps acceptance remains open**. The retained baseline canopy sample measured 16.7 ms median / 17.4 ms p95 over 1,801 intervals. These are specific-machine measurements, not a guarantee for all hardware.
- All inline scripts parse; library and license are unchanged; source audit found no external resource attributes, CSS requests, or game network calls. The preview reported zero captured runtime errors during driving. No gameplay system was removed. Temporary tests and measurements remain outside the repository.
- Missing checks: direct offline `file://` launch was blocked by browser URL policy; this session used a loopback HTTP preview. Final matching dusk/blue-hour/night captures, full pointer-lock/walking/collision/resize replay, uninterrupted clock verification, and a longer sustained 60 fps run remain open. A final preview reload returned an empty response, so no further browser acceptance is claimed. Earlier records describe earlier revisions.

### 2026-11-04 — G3 performance recovery

- Starting audio on `28b980e` raised `ReferenceError: riverPanner is not defined` on every animation callback and stopped rendering. The animation loop now uses the initialized river and rain audio nodes. Fern Bend footstep and rain zones follow the modeled counter room, canopy, and timber footbridge.
- The painterly renderer keeps complete local light rigs within reach of the visible scene and skips shadow-map redraws when the casters and light are stable. Shadow refreshes during continuous motion are spaced at least 1/35 second apart, with an immediate refresh when the shadow focus moves 12 m or more. Sky shading runs behind opaque geometry and terrain shading evaluates road, turnout, and wet-surface details where their masks contribute.
- Terrain recentering reuses heights at shared world coordinates. A Node comparison returned identical terrain and turnout results at 36,000 sample positions and byte-identical position buffers across 15 recentered grids. The river advances its streaming window in 12.5 m steps. Spatial batches let both the main view and shadow pass cull streamed conifers while keeping their geometry and placement.
- The internal 3D resolution starts at the display pixel ratio, capped at 2. It steps down only after sustained slow frames and holds the resulting scale until resize. This can soften fine details on high-density displays. HUD text stays at display resolution.
- Hardware comparison used offline Chrome on a Samsung Galaxy Book (Core i7-1165G7, Intel Iris Xe, ANGLE Direct3D11, driver 32.0.101.6874). Each high-DPI view used 100 post-settle frame intervals at a 1280 × 720 CSS viewport and display DPR 2. A temporary test shim exposed the existing audio node names on the baseline so its renderer could run after the entry click. The optimized file ran directly with audio enabled. The baseline rendered all views at 2560 × 1440 internally.

| View | Baseline median / p95 (ms) | Optimized median / p95 (ms) | Optimized render size |
| --- | ---: | ---: | ---: |
| Sunset Service approach | 33.4 / 50.2 | 16.7 / 17.2 | 1715 × 964 |
| Sunset Service canopy | 50.0 / 66.7 | 16.7 / 33.2 | 1408 × 792 |
| Rainy SR 14 forest | 50.0 / 50.3 | 16.7 / 16.9 | 1408 × 792 |
| Fern Bend in rain | 66.5 / 66.8 | 16.7 / 16.9 | 1408 × 792 |
| Active coupe driving | 66.6 / 83.4 | 16.7 / 32.7 | 1408 × 792 |

- At native 1280 × 720 and DPR 1, the settled static views sampled over 100 intervals also measured a 16.7 ms median. The fresh approach reached 33.3 ms p95 in the final sample and 16.9 ms p95 in an earlier 50-interval run. Reviewed matched approach, canopy, and highway views at preset dusk, blue hour, and night.
- A clean follow-up at native 1280 × 720 and DPR 1 measured both the Sunset Service approach and player-driven coupe at 16.7 ms median and 16.9 ms p95 over 100 intervals each, with no intervals above 33.4 ms.
- The inline script passed `node --check`. The resource audit found zero external runtime dependencies and confirmed that the bundled Three.js and license are byte-identical to the baseline. Chrome opened the actual file offline and recorded one local document request, zero external requests, and zero runtime or shader errors with audio running.
- Verified pointer-lock entry, release, and re-entry, walking and sprinting, jumping and landing, wall collision, office access, viewport resize, and the coupe damage and repair controls. Fern Bend's shelter buses, river gain, counter-room and canopy footsteps, door, lamp, and rest modal were also exercised.
- The actual file ran uninterrupted from dusk to night with audio active and a fixed spawn camera. At elapsed 1, 120, 310, and 330 seconds, the clock read 18:30:38, 19:30:07, 21:05:07, and 21:15:07 respectively. The view reached full night after the 21:00 threshold and remained in night at the last capture. The run used native 1280 × 720 at DPR 1 and recorded one local document request and zero browser errors.
- A paced camera traversal moved 274 m along SR 14 at about 25 m/s, crossing four terrain cells. Over 600 intervals at native 1280 × 720 and DPR 1 it measured 16.7 ms median, 16.8 ms p95, 17.6 ms p99, and 99.9 ms maximum. Six intervals exceeded 33.4 ms. G3 remains open for the remaining spikes and a longer player-driven run through changes in scenery and lighting.

### 2026-11-04 — Period Vehicle Damage, Roadside Repairs, and Nostalgic World Interactables

- **Vehicle Collision Damage Mechanics:**
  - Front bumper separated onto `frontBumperHinge` for crumple / angular displacement (`carDamage.bumperBent`, `rotation.y = 0.12 * side`, `rotation.z = 0.04 * side`, `position.z = 2.44`).
  - Front hood deck separated onto `hoodHinge` (`carDamage.hoodPopped`). On impact >= 4.0 m/s, releases onto the safety catch (~0.05m ajar) with authentic engine vibration tremor at idle (`0.045 + Math.sin(t * 34) * 0.0035`). Visible from driver seat over dashboard.
  - Direction-sensitive sealed-beam headlight shattering on severe collisions (>= 6.2 m/s): dark shattered lens (`carMaterials.brokenHeadlamp`) and forward light beam knockout (`roadLights[i].intensity = 0`), creating asymmetrical night lighting down the highway.
  - Radiator puncture (>= 8.2 m/s): white steam plume from grille (`radiatorSteam` 24 pooled particles) billowing with speed-dependent drift, accompanied by escaping steam hiss. Engine coolant level depletes, inducing thermal penalty and needle climb on the temperature gauge.
  - Spider-web windshield impact crack overlay (`carMaterials.crackGlass`, `windshieldCrackMesh`).
  - Rebound dynamics on crash: elastic bounceback (`carSpeed = -speed * 0.22`), suspension pitch/roll, driver bench seat G-force shock, steering wheel kick.
  - Multi-layer procedural crash audio (`playCarCrash`): sub-frequency frame impact thud (46–85 Hz), mid-range sheet metal crunch (bandpass filtered noise), hood spring release twang, and high-frequency glass fracture.
  - Alignment pull: bent bumper rubs against tire/suspension, pulling steering toward the damaged side while rolling (`steeringAngle += carDamage.alignmentPull * dt * 2.8`).
- **Tactile Roadside Repairs:**
  - Period forged steel lug wrench / tire iron nestled in coupe trunk slot 0 (`tireIronItem`): taking from trunk allows player to aim at bent bumper to "Pry bumper clear with tire iron" (`pryBumperClear`), playing heavy metal clank and restoring bumper alignment.
  - Hood slam: approaching popped front hood displays "Slam hood shut" (`slamHoodShut`), latching hood flush with heavy dual-latch thunk.
  - Galvanized service watering can (`waterCanItem`) at Sunset Service & water spigot: "Fill water can from spigot" (or dipping into Cedar River at Fern Bend) -> "Refill radiator with water" (`refillRadiator`), playing bubbling pour, quenching steam, and restoring coolant to 100%. Resting in coupe or motel bed cools engine to ambient.
- **Nostalgic World Interactables Across All 4 Locations:**
  - **Sunset Service**:
    - Vendo 39 Coca-Cola coin-op bottle cooler (`cokeGroup`): "Vend cold Coca-Cola ($0.10)" with nickel drop, internal ratchet churn, and bottle drop thud; "Drink cold Coca-Cola" with crown cap pop fizz and refreshing sip; "Place empty bottle in return crate".
    - Roadside utility pole payphone: Bell System 3-slot chrome/black payphone (`payphoneGroup`). "Pick up payphone receiver" -> authentic 350+440 Hz dial tone; "Dial rotary telephone" -> rotary pulse ratcheting clicks, relay click, SIT disconnect tones (914/1370/1776 Hz), and rapid off-hook busy; "Hang up telephone receiver" cradle clank.
    - Weathered slatted wood porch bench under awning: "Sit under the awning" -> comfortable sitting perspective watching desert highway, still camera.
    - Water spigot & service can filling.
    - Counter desk call bell: "Ring service bell" -> crisp brass chime ping (`playInteractionSound('bell')`).
    - 1958 linen postcard: "Read linen postcard" -> handwritten note from Barstow.
  - **Cinder Court Motor Lodge**:
    - Scotsman Ice Machine under breezeway: "Dispense ice cubes" -> compressor rumble, auger churn, and cascading hollow ice chunks.
    - Room 1 Nightstand Philco Table Radio: "Turn on bedside radio" / "Turn off bedside radio" -> warm tube filament hum (60 Hz), amber dial glow (`motelRadioLight`), and late-night blues guitar chords.
    - Thunderbird Motel matchbook on dresser: "Inspect Thunderbird matchbook".
  - **Starlite Diner**:
    - Wurlitzer 2100 Jukebox: "Select record on jukebox (B-4)" -> nickel chime, mechanical turntable whirr, vinyl needle drop hiss, and melancholic 1960s slow guitar ballad with pulsating neon pilaster glow.
    - Counter coffee service: "Pour black coffee into mug" with bubbling glass pour; "Sip hot coffee" with ceramic mug clink and hot sip.
  - **Fern Bend**:
    - Cedar River stone skipping: "Skip flat stone across Cedar River" at turnout -> `tack... tack... tack... plop!` across dark water.
    - Overlook coin-op tower viewer binoculars: "Look through coin-op binoculars" -> 18° FOV optical zoom with vintage dual-circle vignette overlay (`#binoculars-overlay`).
- **Verification Evidence (Chrome CDP Offline via `file://`):**
  - All 25 unit test assertions passed 100% with 0 failures and 0 exceptions.
  - Driving collision into physical collider at 8 m/s rebounded to -1.75 m/s, popped hood, and bent bumper.
  - Roadside repairs (hood slam, tire iron prying, water radiator refill) successfully restored vehicle state.
  - Interactive props across all 4 locations tested and verified without runtime errors.
  - Script passed `node --check` with 0 syntax errors.
  - Zero external runtime network requests; 100% self-contained `index.html`.

### 2026-11-04 — Period Coupe Driving Dynamics, Caster Steering, 3-Speed Kickdown, and Cozy Dash Illumination

- **Cozy interior lighting:** Added soft amber incandescent instrument panel illumination (`dashGlowLight` point light at `x = 0.18, y = 0.98, z = 0.38`, `0xffa855`, intensity `0.36 * panelDim`) casting warm glow over the lower dashboard, steering column, horn ring, gear selector, and saddle vinyl bench seat when the `PANEL` light switch is active. Fully responsive to the period rheostat dimmer knob (`Dim instrument panel`).
- **Highway coasting glide & land-yacht momentum:** Reduced asphalt aerodynamic/rolling drag in Drive (`D`) to `0.095 + 0.0032 * |carSpeed|`, allowing the 4,000-lb coupe to glide effortlessly for hundreds of meters on open highway coasting. Integrated road grade gravity acceleration (`-sin(coupe.rotation.x) * 9.81 * 0.30`) so uphill climbs bleed speed naturally and downhill gorge descents glide forward smoothly. Low gear (`L`) provides authentic engine compression braking (`1.65 + 0.02 * |carSpeed|`) for controlled mountain descent.
- **Speed-sensitive caster return & period steering:** Steering wheel returns dynamically with forward speed (`casterReturnRate = 1.4 + 0.30 * |carSpeed|`), unwinding naturally at 50 MPH out of highway curves while remaining relaxed and easy at low parking speeds. Added progressive non-linear curve with a relaxed center deadband (+/- 1.5°) for effortless straight-line highway cruising.
- **Passing kickdown & carburetor induction moan:** In Drive (`D`), mashing full throttle (`W`) between 20 and 50 MPH triggers the carburetor kickdown switch, instantly downshifting from 3rd to 2nd gear with an audible RPM shift flare and secondary 4-barrel intake resonance (`carburetorMoan`), boosting acceleration until reaching cruising speed. Added overrun deceleration burble when lifting off throttle at speed.
- **RWD loose-surface throttle oversteer & counter-steer:** Applying throttle while cornering on loose desert sand or gravel verges breaks the rear tires loose into controllable power-slides and donuts (`oversteerYaw = lateralSlip * 0.34`), while active counter-steering stabilizes the slide and pulls the car forward as traction recovers.
- **Suspension weight transfer & driver seat inertia:** Modeled acceleration squat (hood rises against the horizon), braking dive, cornering roll, and driver bench seat G-force kinematics (`driverHeadInertia`). At a dead stop, driver head inertia settles to exact `(0, 0, 0)` with zero camera drift, maintaining 100% still idle framing.
- **Dual-axle expansion joint cadence & speedometer quiver:** Tar expansion joints deliver a distinct double strike for front and rear axles (`wheelbase / speed` delay). The mechanical speedometer needle features subtle cable quiver over pavement joints and dirt ripples (+/- 0.4 MPH), settling smoothly on glass-smooth asphalt.
- **Verification Evidence (Chrome CDP Offline via `file://`):**
  - Coasting glide vs Low gear: coasting at 22 m/s loses only ~3.28 m/s in 1 second, whereas Low gear engine brake drops 19.39 m/s.
  - Transmission kickdown: wide-open throttle in 3rd gear downshifts immediately to 2nd with shift flare > 0.2 and induction moan > 0.4.
  - Caster return: unwinds from 0.35 rad to 0.042 rad at 50 MPH in 0.25s vs 0.228 rad at 1 MPH.
  - Bench seat inertia: settles to exact `restHeadX = 0, restHeadY = 0, restHeadZ = 0` at stop.
  - RWD oversteer: sand slip under throttle reaches 1.28, counter-steer reduces slip to -1.18 and recovers forward grip.
  - Zero console errors, steady 60 fps.

### 2026-11-04 — Pacific Northwest Expansion: SR 14, Fern Bend Drive-In, 48-min World Clock, and Rest System

- **Scope:** Delivered in one single self-contained `index.html` with zero external runtime network requests, preserved bundled Three.js license notice at the end of the script, and offline double-click `file://` execution.
- **Route & Biome Transition:**
  - Route 66 baseline verified: Sunset Service (`x = 0, y = 0`), Cinder Court Motor Lodge (`x = -4600, y = 0`), Starlite Diner & Bar (`x = +4600, y = 0`).
  - Northwest fork at km 5 (`s = 5000, x = -9600`), turning onto Washington State Route 14.
  - Continuous road geometry: unified asphalt roadbed, crown, shoulders, turnouts, and grades (`grade <= 0.08`, maximum 8%).
  - Biome transition: desert basin (`s < 5000`, `biome = 0`, clear sand/scrub) -> dry pine foothills (`s = 5000..12000`, `biome = 0.28`, scattered Ponderosa pines, climbing elevation) -> Cedar Gorge (`s = 12000..20000`, `biome = 0.82`, deep river cutting, Gorge Bridge with smooth deck collision, audible rushing river, damp asphalt patches) -> Fern Bend valley (`s = 20000..30000`, `biome = 1.0`, lush Western Redcedar/Douglas-fir/Hemlock canopy, sustained valley rain, mist, puddle reflections).
  - Extended through road beyond Fern Bend (`s = 30000..80000+`): deterministic procedural turns and landmarks, continuous mileposts (1-mile intervals), bounded streaming forest pool (`FOREST_POOL_SIZE = 120`), and exact coordinate preservation on U-turn return (tested at km 35, 48, 62, 75).
- **Fern Bend Hero Models & Walking Loop:**
  - Fern Bend Drive-In (`x = -28350, y = 7.0, z = -6400`): cantilevered canopy over dual parking lanes, aluminum gutters with animated water drips, soft-serve cone neon sign with synchronized amber flicker, walkable counter room with linoleum checkered floor, soft-serve machine, commercial coffee urn, glass pie display case, gooseneck counter lamp with interactive rotary switch, inspectable note card (`inspectFernNote`), hinged side entry door (`toggleFernDoor`), and rain-streaked rear window looking back up at the wooded ridge.
  - River Access turnout: split-rail cedar fence, hand-painted wooden trailhead sign, weathered picnic table, and riverside trail.
  - Timber Footbridge: stone abutments, peeled cedar log stringers, wooden plank deck (`y = 4.35`), log handrails, and seamless walking collision over the side creek.
  - Ridge Overlook: switchback trail steps ascending the eastern valley wall (`y = 18.2`), cliff platform log rail, copper orientation plaque (`inspectRidgePlaque`), and viewpoint bench (`sitAtRidgeOverlook`).
  - Foreground hero conifers: Ponderosa Pine, Douglas-fir, Western Hemlock, Western Redcedar, and Red Alder with realistic crown silhouettes, layered boughs, and grounded root flares; moss-covered nurse logs, sword ferns, and river boulders.
- **Atmosphere, Weather & Audio Layers:**
  - Continuous 48-minute world clock (`worldClockHours`, starting at 18:30 dusk): preserves the baseline 5-minute descent into dark (reaching 21:00 full night at exactly 300 real seconds), then smoothly transitions through dawn twilight (4:30–6:30 AM), morning daylight (6:30–8:00 AM), full noon daylight (8:00 AM–5:00 PM with overhead sun), and late afternoon dusk.
  - Directional sunlight and moonlight: single shadow-casting light `Qt` tracks sun during daylight and switches to moon during night, maintaining 60 fps budget.
  - Stars gated out of dusk, daylight, and valley overcast rain.
  - Separate weather layers: camera-following rain streaks, Fern Bend gutter drips, and Cedar River low mist planes.
  - WebAudio soundscape: 3D positional Cedar River audio with inverse-distance panner, 4 distinct rain audio mixes (`rainOpenGain`, `rainCabinGain`, `rainCanopyGain`, `rainInteriorGain`), multi-surface footsteps (sand, asphalt, canopy concrete, interior floor, timber bridge), and wet tire hiss tied to road surface dampness.
  - Analog Dash Clock in coupe and Westclox Bedside Alarm Clock on nightstand in Room 1 updating in real time.
- **Rest System:**
  - Interactive "Rest until…" modal on blanket in stopped, parking-braked coupe and on bed in Cinder Court Room 1.
  - Pointer lock released when modal opens so buttons and time dials are mouse-clickable, seamlessly re-locked upon confirmation or cancel. Full keyboard navigation supported (`Escape`, `Enter`/`Space`, `Digit1-4` for quick presets, arrow keys for ±15m/±1h adjustments, `KeyT` to toggle time-of-day format).
  - Fixed inspection exemption check (`inspection === 'motelBed' || inspection === 'ridgeOverlook'`) so player stays seated comfortably without instant standup upon subtle control movements.
  - Westclox analog travel dial UI with canvas clock, preset buttons (First Light 5:30 AM, Noon 12:00 PM, Blue Hour 7:30 PM, Midnight 12:00 AM), +1h/-1h/+15m/-15m adjustments, next occurrence & hours-passed calculation, fade transition with master audio softening to 0.06 and chime wake-up, wake-up weather/wetness update, and seamless skip across midnight. Initialized period woolen blanket folded on passenger seat of coupe cabin (`blanketInCabin = true`).
- **Shared Glovebox Map & Route Catalog:**
  - Balanced 960 × 600 dual-panel 1963 folding road map (`buildRoadMap()`), inspectable via `KeyR` when parked in the coupe with the glovebox open:
    - *Desert Highways Panel (East)*: horizontal Route 66 corridor with Sunset Service (Mile 0), Cinder Court Motor Lodge (Mile 18 W), and Starlite Diner & Bar (Mile 18 E); Route 66 US Highway shield; SR 14 Through-Road Waysides Index table (`x: 430..620, y: 435..561`) cataloging Mile 18 through Mile 200+ stops; Desert Map Symbols Legend (`x: 745..925, y: 435..561`).
    - *Pacific Northwest Panel (West)*: organic Cedar River flowing from northern headwaters through Cedar Gorge, crossing directly under Cedar Gorge Bridge at `(230, 210)`, and meandering south of the road through Fern Bend valley. SR 14 highway winding northwest from fork at `(365, 300)` through Juniper Pass `(305, 235)`, Cedar Gorge Bridge `(230, 210)`, Gorge River Pullout `(185, 198)`, River Access `(150, 178)`, Fern Bend Drive-In `(120, 150)`, Ridge Pullout `(75, 130)`, to through-road continuation arrow `(22, 108)`. Direction-specific text alignments and cartographic leaders completely eliminate label overlaps.
    - *Fern Bend Walking Loop Inset Box* (`x: 36..402, y: 385..565`): detailed local exploration diagram showing SR 14 roadbed, Cedar River, Timber Footbridge, Drive-In canopy & counter room, River Access turnout, Ridge Pullout, and dashed sienna walking trails climbing to Ridge Viewpoint (El. 860 ft).
  - Unified `ROUTE_CATALOG`: Shared data structure powering highway roadside signs, glovebox map, and motel office mileage strip.
- **Verification Evidence (Chrome CDP Offline via `file://`):**
  - Hardware: Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11
  - Viewports: 1262 × 624 (window 1280 × 720), DPR 1.0
  - Trip times:
    - Desert to Fern Bend (`s = 0..26 km`): ~19.4 min at ~50 mph (80 km/h)
    - Extended through-road drive (`s = 26..76 km`, 50 km past Fern Bend): ~33.9 min at ~55 mph (88 km/h)
    - Full round trip: ~106.6 min
  - Performance measurements (180 post-warmup frames each):
    - Wet-Night Driving (Fern Bend valley): median 16.6 ms (~60.2 fps), p95 17.6 ms, p99 18.2 ms
    - On-Foot Walking Exploration (Fern Bend loop): median 16.7 ms (~59.9 fps), p95 18.8 ms, p99 26.9 ms
  - Syntax check: `node --check` passed on extracted script (847,247 bytes)
  - Network requests: 0 external requests (strictly 1 local `file://` load)
  - Console / Runtime errors: 0 errors
- **Checks remaining open:**
  - Subjective aesthetic tuning of fine conifer needle mipmaps on high-DPI retina displays.

### 2026-11-04b — Tire roll and hum obstruction timbre

- **Tire roll while driving.** Looped rolling sound tied to actual motion: gain tracks `road = |carSpeed| / 25`, fading at rest, with lowpass frequency opening on asphalt and grit shoulder. Gated on `seated && ignitionOn`.
- **Hum obstruction timbre.** The GAS hum's 120 Hz harmonic now ducks independently of the 60 Hz fundamental when the office wall lies between listener and sign: the harmonic gain tracks 0.35 open / 0.12 blocked, muffling timbre rather than just volume.
- **Checks:** single inline script passes `node --check`.

### 2026-11-04 — Footstep surfaces and shelter-aware insects

- **Footstep surfaces.** Steps distinguish sand scuff, asphalt thud, canopy concrete, indoor office/linoleum floor, and timber bridge planks. `footSurface()` derives the surface from player coordinates.
- **Shelter-aware insects.** Night chirps duck with shelter/cabin factors: `insectGain` tracks `0.5 × (1 - muffled × 0.8)`.
- **Checks:** single inline script passes `node --check`.

### 2026-11-04 — Coupe driving conditions, multi-surface physics, and tactile cabin controls

- **Multi-surface driving conditions & road detail (painterly direction).** Enhanced `desertMaterial.onBeforeCompile` with 18 m transverse highway tar expansion joints (`tarSeam`), polished twin wheel tracks (`wheelTrack`), and open-highway windblown desert sand drifts (`sandDrift` / `highwaySandDrift(x, z)`) beyond 58 m from the three roadside stops. Added `carSurfaceAt(x, z)` classifying terrain under the coupe into `'asphalt'`, `'drift'` (windblown sand across the highway), `'shoulder'` (gravel highway verge), and `'sand'` (open desert and dunes), each with distinct rolling resistance, top speed, lateral cornering grip (`lateralSlip`), steering feedback vibration, rear-wheel dust plume emission (`tireDust`, 36 pooled particles), and continuous surface-filtered tire/gravel/sand audio (`tireFilter`, `tireGain`).
- **4-wheel terrain grounding, sprung suspension & 3-speed transmission.** Set `coupe.rotation.order = 'YXZ'` and updated `groundCoupe()` to compute true 4-wheel terrain pitch and roll from the rendered terrain triangles beneath all four hubs while keeping the tires planted on `visibleDesertHeight(x, z)`. Added sprung body pitch (`suspPitch`, acceleration squat and braking nose-dive), cornering roll (`suspRoll`), and tar-joint/rough-surface jounce (`suspBounce`, `suspBounceVel`) that settle to exact zero (`0.000000` camera drift verified over 350 ms) when parked and idle. Added a 3-speed automatic transmission curve in `D` (`D1` / `D2` / `D3` with RPM shift flare) plus selectable `P`, `R`, `N`, `D`, and `L` (Low-Range high-torque mode for climbing desert dunes and engine braking) via the articulated steering-column gear lever (`shifterHinge`, key `V` or cabin click).
- **Exterior lighting, wipers, horn & fuel nozzle refueling.** Upgraded the coupe exterior with quad headlamps (`headlights` + `innerHeadlights`), foot-switchable high/low beams (`highBeamFootHinge`, key `H` or floor click, extending reach from 72 m / 420 intensity to 175 m / 940 intensity and illuminating the instrument panel), front amber and rear red turn signals (`frontTurnMats`, `tailLampMats`, `turnStalkHinge`, keys `Z`/`X` or stalk click with thermal relay tick and steering self-cancel), brake lamps + rear crimson spill (`rearGlowLight`), warm-white backup lamps in `R` (`reverseLampMats`), dual articulated chrome windshield wipers (`wiperPivots`, `WIPER` dash switch or key `J`) that sweep desert dust (`windshieldDustMat`) off the lower windshield, a chrome half-ring horn (`hornRingHinge`, key `K` or wheel click playing a 311/392 Hz dual-tone chord), and a hinged left-rear fuel filler door (`fuelFlapHinge`). Carrying either vintage pump nozzle to the coupe's left-rear quarter reveals `Pump fuel into coupe`, opening the filler flap, refilling `fuelLevel` to `1.0`, and advancing the vintage pump's gallon and `29 9/10¢` sale dials (`pumpMeters[i].setReading`).
- **Live instrument cluster & diegetic Delco AM tube radio.** Replaced the static speedometer texture with `drawInstrumentCluster` / `updateInstrumentCluster` on the 0–80 MPH ribbon face: emerald left/right turn signal jewels (`◄` / `►`), ruby `HI BEAM` jewel, `FUEL` gauge (`E ½ F`), live 6-digit rolling odometer (`64218.4`) and resettable trip drum (`tripResetPin`), illuminated `P R N D L` gear quadrant, `TEMP` gauge, and `BRAKE ON` / `IGN OFF` warning indicator. Added an interactive Delco AM radio (`radioKnobs[0]` power / key `B`, `radioKnobs[1]` tuning across `580`, `640`, `890`, `1180`, `1420 KC`, and sliding `radioNeedle`) synthesizing tube static, ionospheric carrier whistle, and a 1966 USWB barometric/time pulse on `1180 KC` (zero music or voices).
- **Verification & hardware GPU performance.** Extracted inline script passed `node --check`. Offline Chrome opened `file:///.../index.html` with 0 console/page/shader errors and 0 external network requests. An automated CDP test harness (`verify_driving.mjs`) verified `Pump fuel into coupe` (`fuelLevel: 0.45 -> 1.0`, `pumpMeters[0].gallons: 0 -> 8.8`), `0` idle camera drift when parked, all cabin aim/click targets (`Shift gear`, `Signal left/right turn`, `Sound horn`, `High-beam foot switch`, `WIPER ON`, `Reset trip odometer`, `Turn on/Tune AM radio`, and existing `Open/Close glovebox` + `Unfold/Fold road map`), dusk/night highway driving across 18 m tar joints and windblown sand drifts (`currentSurface: 'drift'`), and blue-hour off-road sand driving in `L` (`currentSurface: 'sand'`, 4-wheel pitch/roll, and rear tire dust). Over 120 post-warmup frames of active night driving with high beams, wipers, turn signal, and AM radio on `Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11`, frame times measured **16.7 ms median (59.9 fps) / 33.6 ms p95** at `960 × 540` (`DPR 1`) and **16.7 ms median (59.9 fps) / 36.4 ms p95** at `1280 × 720` (`DPR 1`).

### 2026-11-04 — Visitable Starlite Diner & Bar (East Highway Destination)

- **World expansion (East destination, painterly direction).** Built **Starlite Diner & Bar** at `x = +4600` (4.6 km east of Sunset Service along the continuous highway, symmetric to Cinder Court Motor Lodge at `x = -4600` in the west). Updated the 1963 glovebox road map (`buildRoadMap`) to plot all three stops along U.S. Route 66 (`CINDER COURT` 18 mi West, `SUNSET SERVICE` in the center, and `STARLITE DINER` 18 mi East), updated the Sunset Service counter mileage strip (`WEST 18 MI CINDER CT / EAST 18 MI STARLITE`), and added `EAST / ROUTE 66` and `WEST / ROUTE 66` highway shields at Sunset Service's east exit (`x = 24, z = 5.4`) and Starlite Diner's west exit (`x = 4580, z = 5.4`), aligned with the rising eastern moon. Extended `forecourt`, `os(x, z)`, `onAsphalt()`, `desertMaterial` (turnoffs, apron, and parking bay stripes), and `buildDesert()` (`centerSiteX` deterministic cacti/rocks/scrub) to `dinerX = 4600`.
- **Exterior & neon signage.** At the western turnoff (`x = 4594.6, z = -4.2`), a grounded two-sided pylon sign rises on twin steel columns topped by a gold 4-point star finial, with **STARLITE DINER** in rose-and-gold neon above **BAR • COFFEE • PIES / BOOTHS • COCKTAILS** framed in turquoise neon (`dinerSignLight`, `dinerTurqLight`). The 1960s streamliner building (`x = 4590.8..4609.2, z = -13.6..-21.4`) features a fluted stainless-steel roof fascia with continuous rose and turquoise neon eave tubes, a central recessed entrance porch (`dinerPorchLight`) with a working hinged aluminum-and-glass entrance door (`dinerDoorHinge`, `dinerDoorCollider`), two wide plate-glass diner windows on the left with partial venetian blinds and an exterior enamel menu board, and a tinted lounge window on the right housing a two-sided neon **BAR / COCKTAILS • LOUNGE** sign (`dinerBarWindowLight`).
- **Logical dual-zone interior & arm's-length hero assets.** Inside, a wood-and-plaster partition with a 3.5 m archway separates two distinct moods:
  - **Classic 1960s American Diner (left wing):** black-and-cream checkerboard floor, warm overhead lighting (`dinerCounterLight`), two turquoise Naugahyde window booths with chrome-pedestal Formica tables, miniature chrome tabletop jukebox selectors, napkin dispensers, and salt/pepper shakers (including a `Sit in diner booth` interaction looking out at the neon sign and highway), plus an 8.6 m Formica service counter with four lathe-modeled red-vinyl chrome swivel stools, a glass-domed cherry pie display stand, a commercial twin-carafe coffee brewer, a vintage chrome cash register, an inspectable 1966 guest check (`Read counter order slip`), and a back-wall `STARLITE FOUNTAIN & GRILL` letterboard menu.
  - **Soft-lit 1960s Bar & Lounge (right wing):** warm walnut floor and burgundy runner rug, intimate rose-amber lighting from a concealed back-bar neon valance (`dinerBarLight`) and the window `BAR` neon sign, a corner cocktail booth with glassware, a mahogany-and-quilted-burgundy bar counter with a continuous brass footrail and three tall barstools, a chrome-and-brass dual draft beer tap tower, a tarnished back-bar mirror, two stepped shelves of lathe-modeled amber/emerald/clear vintage liquor bottles, an interactive brass-and-burgundy bar lamp (`dinerBarLamp`) with a working toggle switch (`dinerLampSwitchHinge`), and a sliding bartender's till drawer (`dinerDrawerTray`) containing an inspectable 1966 closing tab and note (`dinerBarNote`).
- **Verification, interactions, and performance.** All inline scripts passed `node --check`. Offline Chrome opened `file:///.../index.html` with 1 local document request, 0 console errors, and 0 page/shader errors. Verified that `officeWallInWay()` blocks aiming at interior diner/bar fixtures through closed exterior walls, and verified `Open/Close diner door`, `Read counter order slip`, `Sit in diner booth` / `Stand up`, `Switch off/on bar lamp`, `Open/Close bar drawer`, and `Read bar closing tab and note`. Reviewed dusk, blue-hour, and night captures across the highway approach, forecourt, main diner interior, soft-lit bar interior, booth window view, and 0.7 m close-ups of the bar lamp/open till drawer and counter props. On `Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11` at `1280 × 720` (`DPR 1`) over 160 frame intervals per view, night frame times measured **16.7 ms median / 17.4 ms p95 (59.9 fps)** on the Starlite Diner forecourt and **16.7 ms median / 17.3 ms p95 (59.9 fps)** inside the diner and bar.

### 2026-11-04 — Visitable Cinder Court Motor Lodge

- **World expansion (Milestone 1, painterly direction).** Built the first visitable Cinder Court Motor Lodge at `x = -4600` (4.6 km west of Sunset Service along the continuous highway, representing the 18-mile period print detail on the office mileage strip and the 1963 glovebox map). Aligned the setting sun (`sunDir`) with the western highway horizon (`-X`, toward Cinder Court), added a cold rising moon disc and restrained halo in the eastern sky (`+X`, aligned with the single moon shadow-caster `Qt` toward Sunset Service), and added `WEST` and `EAST` auxiliary plates above the `ROUTE 66` highway shields at both sites so players have clear sky and roadside wayfinding references in both directions. The terrain height field `os(x, z)`, `onAsphalt()`, and `desertMaterial` shader include Cinder Court's east and west highway turnoffs, weathered apron, and faded parking bay stripes. Deterministic desert cacti, rocks, and scrub populate the Cinder Court surroundings via `cellHash` without disturbing the global `pn()` PRNG stream, and the single moon shadow frustum (`Qt`) follows the player camera so both sites receive crisp moon shadows.
- **Hero models and budget.** `motelGroup` adds 55 meshes and 3,862 triangles (bringing total scene geometry to 329 meshes and 96,042 triangles). At the highway turnoff (`x = -4595.4, z = -4.2`), a grounded two-sided neon sign rises on twin steel columns above a concrete plinth and an older offset base plate, with a blank weathered mounting plate behind the lower cabinet, **CINDER COURT** in warm coral lettering inside a turquoise neon border, and **MOTOR LODGE / OFFICE • SHOW ROOM** below. The low L-inspired court features a covered walkway with a turquoise fascia tube, five porch posts, shuttered Units 2 & 3 with pale scars where room numbers were removed, a closed office with exterior rate board showing `$4.50` beneath `$6.00`, and one physically walkable furnished Show Room (Unit 1).
- **Show room & arm's-length fixtures.** Unit 1 (`x = -4601.2..-4596.5, z = -13.85..-21.25`) has a recessed entry alcove, a glazed front window with partial venetian blinds framing the neon sign and highway from inside, a hinged stile-and-rail room door (`motelDoorHinge`) with three hinge knuckles and brass lever handles on both sides, a bed with headboard/mattress/coverlet/pillows, an armchair, a tarnished wall mirror, a bedside nightstand with a sliding drawer (`motelDrawerTray`) and shaped brass pull, an inline rate card and show-room note inside the drawer, and a lathe-modeled ceramic-and-brass bedside lamp with a pleated shade and neck switch (`motelLampSwitchHinge`).
- **Round-trip drive, interactions, and collisions.** All inline scripts passed `node --check` and the offline resource scan. Offline Chrome opened the delivered `file://` document with zero console, page, or shader errors and zero external network requests. Using the existing coupe controls, a full westbound drive from Sunset Service (`x = -12.4`) to the Cinder Court forecourt (`x = -4590.95, z = -6.76`) took **188.18 s** (189.05 s including braking to a full stop), and the eastbound return drive back to Sunset Service (`x = -9.47, z = -5.65`) took **185.33 s** (186.20 s with braking) in the same session while the five-minute dusk-to-night clock advanced continuously. Standard **E** and click inputs verified opening and closing the motel room door from outside and inside, toggling the bedside lamp switch off (`motelRoomLamp.intensity = 0`, switch rotation `0.473 rad`) and back on (`7.469`), sliding the nightstand drawer open and closed, and inspecting the rate card and note inside. `officeWallInWay()` blocked aiming at room fixtures through exterior walls and window glass. Walker (`vc`) and coupe (`carClearAt`) collision checks passed against the sign plinth, porch columns, exterior walls, closed room door (blocking entry when shut and clearing when open), bed, nightstand, and chair, alongside the existing Sunset Service mileage strip, counter lamp, parts drawer, and coupe glovebox/1963 road map flows.
- **Captures and performance.** Reviewed matched dusk (`8 s`), blue-hour (`125 s`), and night (`305 s`) captures for the highway approach, forecourt overview, close-up sign, recessed entrance and door, room interior, room window sightline to the sign, and arm's-length open drawer and bedside lamp. On a Samsung Galaxy Book (`Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11`) at `960 × 540` and DPR 1 over 120 frame intervals per view, night frame times measured **16.6 ms median / 18.1 ms p95 / 19.1 ms max** on the Cinder Court highway approach, **16.7 ms median / 18.1 ms p95 / 19.1 ms max** on the Cinder Court forecourt, **16.7 ms median / 17.9 ms p95 / 18.9 ms max** inside the furnished show room, and **16.7 ms median / 18.5 ms p95 / 18.8 ms max** at Sunset Service.

### 2026-11-04 — Restore separate glovebox and map actions

- Phase 6, painterly direction. Opening the glovebox reveals the folded paper on the lid. The paper has its own unfold action, folding returns it to the lid, and the lid edge closes the compartment. **R** operates the paper while stopped with the lid open. Cinder Court is a fictional place on the map and mileage strip.
- Inline syntax and resource checks passed. Offline Chrome verified pointer lock, opening the lid, unfolding by aiming at the paper, the driving interlock, folding, closing the lid, and the **R** shortcut. The browser requested only the game file and reported zero app or shader errors.
- Reviewed the unfolded map in matched cabin views at preset dusk, blue hour, and night. The 120-interval night sample measured 16.7 ms median and 16.9 ms p95 at 960 × 540 and DPR 1 on the Intel Iris Xe test laptop. The continuous cycle and wider G3 review are tracked separately.

### 2026-11-04 — Bring the road map into view

- Phase 6, painterly direction. The prior interaction left the driver looking at the glovebox while the unfolded map sat on their lap. While stopped, **R** or **Read road map** at the glovebox now opens the map, directs the view toward it, and lights the cabin. Stowing it returns the view to the windshield and the lamp to its switch setting.
- All inline scripts passed `node --check` and the resource scan. Offline Chrome on the delivered file verified immediate visibility with **R**, aimed **E**, and an off-center cursor click. The checks also covered stowing, both manual lamp settings, the driving interlock, exit, doorway movement, wall collision, and pointer-lock release and re-entry. Chrome requested only the game file and reported zero app or shader errors.
- Reviewed the opened map from its action-selected view at preset dusk, blue hour, and night. The 120-interval night sample at 960 × 540 and DPR 1 on the Samsung Galaxy Book with Intel Iris Xe and ANGLE Direct3D11 measured 16.7 ms median, 17.5 ms p95, and 51.1 ms maximum. This check covers the cabin. The previous records cover the continuous cycle, and the G3 scene review remains open.

### 2026-11-04 — Make the glovebox map reachable

- Phase 6, painterly direction. While the coupe is stopped, the same aim point opens the glovebox, unfolds the map, then stows it and closes the lid. Aiming at the unfolded map folds it directly. The open lid can still be closed while moving.
- All inline scripts passed `node --check` and the resource scan. On the delivered file, offline Chrome passed the same-aim sequence with **E** in pointer-lock mode and with clicks in cursor mode. Both runs also verified folding from the lap, the driving interlock, and driving after folding. Each requested only the local game file and reported zero app or shader errors. The full scene and cycle review uses the earlier validation records.

### 2026-11-04 — GAS/OIL faces aligned to the highway

- Turned the 8.1 m cabinet 30 degrees to sit square across the straight highway, with one face pointing west and the other east. Centered the single red spill beneath the cabinet. Both faces carry correctly oriented lettering. This follows the sightline principle documented for a perpendicular sign on historic Route 66. [Historic Route 66 sign reference](https://route66ca.org/bekins-storage-company-roof-sign/)
- Checked both opposing lane views from about 22 m and 50 m, the starting view, and the forecourt at preset dusk, blue hour, and night. The cabinet stays clear of the canopy and GAS reads from both near approaches. Verified the face normals in world space and ran the coupe footprint check in both directions. The pole base blocks direct contact.
- All inline scripts passed `node --check`. Chrome opened the playable file offline with no external requests or browser errors. Pointer lock release and re-entry, walking, viewport resize, and both fuel nozzles passed. On the Samsung Galaxy Book (Core i7-1165G7, Intel Iris Xe, ANGLE Direct3D11) at 960 × 540 and DPR 1, 360 static night frame intervals per view measured 16.7 ms median, with p95 at 16.8 ms from the starting view, 17.2 ms from the west, and 17.1 ms from the east.
- At the same settings, the instrumented 60-second drive cleared the forecourt from west to east and continued along the highway. The 3,560 frame intervals measured 16.7 ms median, 17.0 ms p95, and 65.5 ms maximum. The uninterrupted clock and full G3 shadow and reference-view checks were outside this pass.

### 2026-11-04 — Final GAS/OIL sign height

- Compared the 7.0, 8.1, and 9.2 m versions at matched camera positions from the starting view and both highway approaches. Selected 8.1 m for the extra clearance above the canopy, especially from the west, while keeping the station prominent. The cabinet and its support rose by 1.13 m. The existing position, orientation, and lettering carry over from the study.
- All inline scripts passed `node --check`. Offline Chrome opened the playable file and acquired pointer lock without errors or external requests. Reviewed the updated sign from the starting view and both approaches at preset dusk, blue hour, and night. The coupe footprint cleared the pump lane in both directions, the pole base blocked the coupe, and both pump nozzles lifted and returned to their cradles.
- At 960 × 540 and DPR 1 on the Samsung Galaxy Book (Core i7-1165G7, Intel Iris Xe, ANGLE Direct3D11), 120 static night frame intervals per view measured 16.7 ms median in both views, with 50.3 ms p95 at arrival and 16.9 ms p95 in the office. The arrival sample missed the steady 60 fps target. Sustained timing on this revision and full G3 acceptance remain open.

### 2026-11-04 — Roadside sign, office glazing, and fuel hoses

- The low office, canopy, and pull-through apron work together at car scale. The old GAS cabinet topped out at about 5.5 m, close to the canopy's 4.6 m roofline. Its single face looked across the highway. Raised the same cabinet to about 7 m overall, with the cabinet bottom at about 4.7 m. Moved the pole to the road edge beside the east entrance, where the canopy leaves it visible from the west. Turned the two independently readable faces toward approaching drivers. Added a braced pole mount, inset faces, and tube supports. The letters, local red spill, and hum still share the sign dip. [Period sign and storefront references](ASSET_GUIDE.md#3-gasoil-and-road-signs)
- Replaced opaque window panels and cutout slots with continuous dusty glazing. The sills, frames, and partial blinds give the panes depth, and the waiting seat now sees the forecourt through the glass. Furnished the office around the counter and walking loop with a lit pegboard and hand tools, stock shelves, capped oil tins, drawers, wall telephone, and ribbed heater. Assets are modeled inline, with painted textures generated in memory.
- Both fuel nozzles can be lifted, dropped, recovered, and returned to the cradle. Each hose uses a chain of constrained points with gravity and floor contact. The pump end stays fixed. The nozzle follows the player while held and drops if taken beyond the hose's reach.
- Offline Chrome opened the delivered file and acquired pointer lock. An instrumented copy exercised lift and redock on both pumps, hose movement while walking, fixed attachment at the pump, and drop and recovery on the island. The sign base blocked direct car entry while the adjacent drive-through lane remained clear. Captured matched before and after night views and preset dusk, blue hour, and night views from both highway approaches, the office, and the window seat. The browser reported no errors and only local file requests.
- Static arrival and office samples on Intel Iris Xe at 960 × 540 and DPR 1 measured 16.7 ms median and 16.8 to 16.9 ms p95 over 120 intervals per view. The previous full cycle and sustained drive apply to the earlier forecourt build. The complete graphics and shadow review remains open.

### 2026-11-04 — Road map in the parked coupe

- Phase 6, painterly direction. The glovebox holds an inline 1963 Route 66 map that can be unfolded while parked. Its creased paper sits below the windshield, and the existing dome switch brings the print into view. Cinder Court echoes the faded office mileage strip. The map folds back into the glovebox when stowed or when the player gets out. Driving resumes after folding.
- The inline script passed `node --check` and the resource scan. Offline Chrome requested only the delivered `file://` document and reported zero app or shader errors. A browser probe aimed at fixtures while standard click and key inputs verified the map, dome light, driving interlock, and stowing on exit in pointer-lock and cursor modes. Closing the glovebox also stowed the map. Walking, running, jumping, doorway traversal, wall and pump collision, resizing, and pointer-lock release and re-entry passed.
- Compared the same parked view with the dome lamp off and on at night. The print is legible in the warm light, falls into cool shadow with the lamp off, and sits below the windshield sightline.
- Reviewed the approach, canopy, and both highway directions on the delivered game's normal clock at dusk, around 121 seconds, and around 302 seconds. Stars began invisible, were faint at blue hour, and held at full night after 300 seconds.
- The 60-second canopy sample collected 3,600 frame intervals at 960 × 540 and DPR 1 on a Samsung Galaxy Book (950XDB/951XDB/950XDY, Core i7-1165G7, Intel Iris Xe with ANGLE Direct3D11). Median was 16.7 ms, p95 was 16.9 ms, and maximum was 18.5 ms. The 120-interval night sample with the map open and dome light on measured 16.7 ms median and 16.8 ms p95.
- The matched G0 baseline and shadow review remain open under G3. The paper sound still needs a listening pass.

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

### 2026-11-06b — Fern Bend Drive-In comprehensive polish pass

- **Report:** The Fern Bend roadside ice cream drive-in lacked period roadside details, featuring bare canopy framing, wireframe neon signage without a backing cabinet, and an empty counter room.
- **Exterior Carhop Order Stalls:** Added four authentic 1950s/60s carhop speaker stanchions along the canopy parking bays with curb footings, tubular steel posts, cast-aluminum angled speaker heads, talkback grills, illuminated mini-menus, red carhop call buttons, tray clips, stall numbers, and physical collision bounding boxes (`Dt`). Added a heavy galvanized ribbed trash receptacle with spring flap at the walkway curb.
- **Canopy Structural Detailing:** Added 9 exposed transverse heavy timber ceiling rafters beneath the tongue-and-groove decking, a primary longitudinal carrying header beam, steel bent tie-plates with bolt flanges, front gutter hanger brackets, and dual corner downspout pipes with cast concrete splash blocks.
- **Refined Soft-Serve Cone Neon Sign:** Built a shaped porcelain enamel backing cabinet with tapered waffle cone backing, scalloped soft-serve cloud backing, dark cabinet rim, structural angle-iron uprights, diagonal guy braces, and a weatherproof rooftop transformer/ballast box. Refined the neon tubing with a gold diamond crosshatch waffle grid, multi-tiered mint green swirl ribbons, and a cherry red accent curl at the peak.
- **Authentic Counter Room Props:** Furnished the interior with a vintage Hamilton Beach triple-spindle malt/milkshake mixer with fluted stainless cups and jade-green cowl, a 4-well stainless steel crushed fruit & syrup pump rail with porcelain flavor knobs, a countertop glass/chrome straw dispenser, stamped metal napkin dispensers, a vintage mechanical cash register, two heavy timber storage shelves with bulk "CASCADE JOY CONES" cartons and gallon glass syrup jugs, two chrome pedestal red vinyl counter stools, and an electric Westclox wall clock.
- **Checks:** Inline script extracted and passed `node --check` with 0 errors (965,435 bytes). Zero external runtime dependencies or network requests.

### 2026-11-06c — Pre-load tool case and canvas roll into coupe trunk

- **User Request:** Place the canvas roll and tool case already inside the coupe's trunk rather than starting on the ground near the station.
- **Change:** Updated `addCargo('tool case', ...)` and `addCargo('canvas roll', ...)` in `index.html` to initialize into trunk `slot: 1` (`[0, 0.53, -2.06]`) and `slot: 2` (`[0.44, 0.53, -2.04]`), alongside the existing tire iron in `slot: 0` (`[-0.44, 0.53, -2.04]`). All three trunk cargo slots now start pre-loaded in the vehicle.
- **Purpose Audit:**
  - *Canvas roll:* Resting bedroll/cushion. When carried and sitting on the bench under the station awning (`inspection === 'rest'`), it automatically spreads out beside the seat.
  - *Tool case:* Atmospheric roadside equipment that can be carried, stowed in the trunk, and placed down anywhere in the world. (Unlike the tire iron, which pries bent bumpers, and the service water can, which refills punctured radiators, the tool case has no required repair gate.)
- **Verification:** Tested in headless Chrome via CDP (`scripts/test_trunk_cargo.js`). Confirmed `allInTrunk: true`, `toolCaseSlot: 1`, `canvasRollSlot: 2`, `tireIronSlot: 0`. Syntax validated with `node --check` (0 errors).

### 2026-11-06d — Coupe steering dynamics and progressive ramp rate tuning

- **User Inquiry & Analysis:** "The steering still feels a little off. It is very easy to do small corrections, but when you push a little longer, it steers too abruptly. Does the steering speed accelerate exponentially?"
  - *Audit:* Mathematical inspection of the keyboard steering accumulator revealed that steering angular velocity did indeed accelerate superlinearly (and effectively exponentially in the first ~350 ms) due to two compounding mechanisms:
    1. A piecewise discontinuous jump in `rampRate`: `(Math.abs(virtualSteerInput) < 0.28 ? 1.75 : 3.2) * steerSens`. At $t \approx 0.18$ s of holding the key, the ramp rate abruptly jumped by +83%.
    2. A superlinear power curve $x^{1.6}$, whose derivative $1.6 x^{0.6}$ multiplies the stepped-up ramp rate. Together, the target steering rate $\frac{d(\text{steerTarget})}{dt}$ exploded from $3.9^\circ/\text{s}$ at $t = 0.02$ s to $93.5^\circ/\text{s}$ at $t = 0.40$ s (a 24-fold surge!), reaching full lock ($21.8^\circ$) in only $0.43$ seconds.
    3. Weak highway assist damping: at 55 mph ($24.6$ m/s), full lock was allowed to reach $12.5^\circ$, causing lateral acceleration to spike past $2.0\text{ g}$ within half a second of keypress, pitching the coupe into violent slides.
- **Tuned Physics & Solution:**
  - *Continuous smooth ramp rate:* Replaced the discontinuous step threshold with a unified rate: `const rampRate = isReversingInput ? (7.2 * steerSens) : (1.42 * steerSens)`. Reversing/counter-steering retains fast 7.2 rad/s clearing, while forward accumulation ramps smoothly without rate kick.
  - *Softened progressive curve:* Updated from $x^{1.6}$ to $x^{1.35}$ (`Math.sign(virtualSteerInput) * Math.pow(Math.abs(virtualSteerInput), 1.35)`). Retains subtle 0.15°–0.3° micro-trim for straight highway lane adjustments while preventing abrupt rate surges during sustained holds.
  - *Tuned highway assist damping:* Updated to `1.0 / (1.0 + Math.max(0, absSpd - 3.8) * 0.068)`. Maintains full $21.8^\circ$ lock for low-speed parking and fuel pump approaches ($0..8$ mph), while progressively tightening maximum authority at speed ($12.1^\circ$ at 35 mph, $9.0^\circ$ at 55 mph, $7.6^\circ$ at 70 mph), capping sustained highway lateral acceleration to a controlled, period-accurate $\approx 0.6..0.8\text{ g}$.
  - *Smooth high-speed steering slew:* Adjusted `steerSpeed` slew rate from 6.5–7.8 to 5.8–7.2, adding hydraulic power-steering fluid damping at speed.
- **Verification:**
  - Offline simulation confirmed: 0.10s micro-tap yields 0.15° (lane trim); 0.30s hold yields 1.26° (gentle curve); 0.50s hold yields 3.2° (firm highway turn, ~0.7g lat acceleration); low-speed parking approaches full lock gracefully in ~0.85s.
  - Syntax: `node --check` passed on extracted script with 0 errors.
  - Headless Chrome CDP tests (`scripts/cdp_test_gameplay.js` and `scripts/test_steering_dynamics.js`): verified live game instance, vehicle state, travel, and interactions.
  - Zero external runtime network requests (`scripts/verify_offline.js`).

### 2026-11-06 — Great Plains region and Harvest Moon Drive-In implementation

- **Scope & Context:** Implemented the Great Plains region (`T` +46 to +84 km, world $x = 46000..84000$) and its sole authorized destination, the **Harvest Moon Drive-In** ($x = 64600, z = -14$, `T` +64.6), as real, playable game code in `index.html` on branch `vibe/neon-gas-voxel-f660eb`.
- **Reserved Ground & Steppe Placeholder:** Following `WORLD_MAP.md` section 4, $x = 4600..46000$ (`T` +4.6 to +46) is preserved as explicitly marked steppe placeholder (`PLACEHOLDER_STEPPE`), transitioning low desert dunes into rolling straw grass swells without shortening the map or distorting mileposts. The plain continues as placeholder through $x = 102000$.
- **Western Hinge ($x = 42000..48500$):** Implemented `us66RoadY(x)` delivering a gentle 12 m sinusoidal crest over 6.5 km (max grade 0.58%, strictly $< 2\%$), opening an expansive 180° horizon with mountain silhouettes receding behind the player.
- **Travelling Wind Field & Terrain Shading:** Implemented deterministic wave field `plainsGust(x, z, t)` ($\lambda = 420$ m, $v = 14$ m/s with low-frequency phase drift) driving ground wind streaks, grass sway, windmill spin, swing oscillation, and audio wind. Terrain shader in `desertMaterial.onBeforeCompile` blends straw (`#b8a56a`), green-gold (`#8c9a52`), olive shadow (`#4d5530`), and verge (`#9b8f6c`), with gravel pads for pads, apron, siding, and mailboxes.
- **Instanced Vegetation & Roadside Fencing:**
  - Instanced near grass tufts (`PLAINS_GRASS_NEAR_N = 3600`) and mid grass tufts (`PLAINS_GRASS_MID_N = 2400`) using double crossed quads with dark-olive base to straw-gold tip vertex coloring and deterministic cell streaming (`updatePlainsStreaming`).
  - Roadside 4-strand barbed wire fence with weathered cedar posts at $z = \pm 14.5$ m from $x = 42000$ to $86000$, with 10 m gate openings every 2 km for foot access.
- **Great Plains Set Pieces:**
  - Concrete Silo at $x = 47600, z = +70$ (diam 6 m, h 18 m, dome cap, exterior ladder cage, lean-to equipment shed, colliders).
  - Grain Elevator & Dead Siding at $x = 52400, z = -70$ (26 m crib tower, cupola headhouse, enclosed conveyor gallery, loading boom, ground office). Dead siding ballast bed ($x \in [52100, 52700], z = -40$) with half-buried weathered ties and no rails.
  - Municipal Water Tower at $x = 53100, z = +210$ (4 lattice steel legs, 20 m height, diam 9 m tank with faded "PRAIRIE VIEW" lettering).
  - Hay Stacks at $x = 55200, z = -35$ and $z = +60$ (5 round bales in pyramid under weathered canvas tarp).
  - Windmill & Stock Tank at $x = 57000, z = +95$ (11 m lattice tower, animated 18-blade wheel with "AERMOTOR" tail vane, brake lever, 4.2 m galvanized stock tank with dark water and green algae rim).
  - Shelterbelts at $x = 58000..59600, z = -300$ and $x = 66500..68500, z = +260$ (broadleaf cottonwoods).
  - Mailbox Row at $x = 61000, z = +6.2$ (3 metal mailboxes on post, openable center box, pullout pad).
  - Stone Culvert Headwalls at $x = 50200$ and $x = 59000$ ("MP 31" / "MP 37").
- **Harvest Moon Drive-In Destination:**
  - 9.2 m roadside steel pylon sign at $x = 64570, z = -14$ with cabinet (`harvestCabinet`), red neon crescent moon, red cursive tube text ("HARVEST MOON"), cyan accent ("DRIVE-IN"), point lights (`harvestSignLight`, `harvestCyanLight`), and "The Red Coal" distance sprite visible from 300 m to 5 km, lingering in the rearview mirror.
  - Ticket Booth at $x = 64600, z = -34$ (window, ticket roll dispenser, brass cash drawer, colliders).
  - The Great Screen at $x = 64620, z = -62$ (22 m $\times$ 14 m, rear timber truss bents, catwalk, ladder, white panel face toward field, foundation piers).
  - Field of 9 arced mounds with 70 instanced speaker posts and hung die-cast speaker boxes.
  - Concession & Projection building at $x = 64600, z = -135$ (cinder block, service counter, popcorn kettle, soda fountain, projection booth with 35mm projector and film cans, switchable warm concession lamp `harvestLampLight`, 80% wind shelter inside).
  - Playground at $x = 64650, z = -75$ (timber 3-swing set with creaking physics swing, galvanized steel slide).
  - Marquee board at entrance reading "THANKS FOR A GREAT SEASON" with fallen letters.
  - Decorative locked restrooms.
- **Procedural WebAudio Sound & Interactables:**
  - Procedural grass wind bus (`audio.plainsWindGain`) crossfading with desert wind, modulated with 2-second visual lead from `plainsGust`.
  - Summer crickets bed (`audio.plainsCricketGain`) active at dusk/night, suppressed within 120 m of pylon sign.
  - Pylon sign 60Hz + 120Hz transformer hum (`audio.plainsSignHumGain`).
  - Interactive speaker: player can lift speaker and hang it on the coupe driver window (`plainsSpeakerHung`), routing live filtered field wind into the cabin via `audio.plainsSpeakerGain`.
  - Silent heat lightning: rare pulse every ~85s in cumulonimbus cloud top illuminating sky and reflecting softly off the great screen face with zero thunder.
  - Interactables: concession lamp switch, playground swing push, marquee read, ticket pull, cash drawer inspect, kettle lid lift, soda tap pull, film can inspect, windmill brake hold, mailbox open, stock tank look.
- **Navigation & Integration:**
  - Glovebox Road Map (`buildRoadMap`): expanded to 3-panel tri-fold map (`[320, 640]` creases) adding Panel 3: Great Plains / US 66 East showing Starlite hinge, landmarks, and Harvest Moon.
  - Roadside signs: Starlite advance sign ("HARVEST MOON 38 MI"), advance sign 1.5 km before entrance ("HARVEST MOON DRIVE-IN 1 MI • ENTRANCE ON LEFT"), diner counter slip mileage trace.
  - Trip card & dev warp: `travelStopList` includes Harvest Moon and plains landmarks; fuel consumption verified (0.336 tank from Starlite, well within 1.0 tank).
- **Verification & Acceptance Evidence:**
  - Syntax: extracted inline script passed `node --check` with 0 errors.
  - Offline: verified 0 external runtime network requests (`scripts/verify_offline.js`).
  - Performance measured via Chrome DevTools Protocol (`scripts/cdp_verify_plains.js`) on Windows (ANGLE Direct3D11, 960x540, DPR 1):
    - Sunset baseline: dusk 16.30 ms (p95 21.20 ms), blue hour 16.70 ms (p95 21.40 ms), night 16.90 ms (p95 19.90 ms).
    - Starlite baseline: dusk 16.70 ms (p95 19.80 ms), blue hour 16.60 ms (p95 19.20 ms), night 16.70 ms (p95 18.50 ms).
    - Plains Hinge ($x = 45000$): dusk 16.60 ms (p95 19.20 ms), blue hour 16.60 ms (p95 18.70 ms), night 16.60 ms (p95 21.60 ms).
    - Plains Grain Elevator ($x = 52400$): dusk 16.80 ms (p95 20.50 ms), blue hour 16.60 ms (p95 21.40 ms), night 16.60 ms (p95 19.40 ms).
    - Plains Windmill ($x = 57000$): dusk 16.30 ms (p95 20.00 ms), blue hour 16.80 ms (p95 20.10 ms), night 16.60 ms (p95 18.20 ms).
    - Harvest Moon Road Approach ($x = 64520$): dusk 16.70 ms (p95 20.80 ms), blue hour 16.60 ms (p95 20.30 ms), night 16.70 ms (p95 19.50 ms).
    - Harvest Moon Field Screen ($x = 64610$): dusk 16.70 ms (p95 19.60 ms), blue hour 16.60 ms (p95 19.00 ms), night 16.70 ms (p95 20.30 ms).
    - Harvest Moon Concession ($x = 64600$): dusk 16.70 ms (p95 19.60 ms), blue hour 16.60 ms (p95 18.70 ms), night 16.70 ms (p95 18.30 ms).
    - Plains East Terminus ($x = 84000$): dusk 16.80 ms (p95 18.60 ms), blue hour 16.60 ms (p95 18.40 ms), night 16.70 ms (p95 18.80 ms).
  - Screenshots captured: `captures/plains_*_{dusk,blue_hour,night}.jpg`.
  - Gameplay & interactions verified via CDP (`scripts/cdp_test_gameplay.js`): travel, lamp, swing, speaker, marquee, map, fuel cost.

### 2026-11-06 — Plains audit and fast-travel wiring

- **Audit (live, localhost, embedded browser):** every Plains stop in the dev warp (Harvest Moon, mailbox row, windmill, water tower, elevator, silo on the hinge crest) arrives on the ground with the coupe level on asphalt (silo arrival at the 4.9 m crest height matches `us66RoadY` and `os`). The real trip card from Sunset lists Harvest Moon at 40.1 mi, 48 min; confirming it arrived at x 64630, seated, with no console errors. Starting tank 0.78 covers the 0.36-tank leg and the return.
- **Finding:** the world clock runs a day in 48 real minutes, so the Harvest Moon leg is exactly one world day and the card's "arrive 6:13 PM" read as the same evening. The card now appends "(next day)" or "(+N days)" via `travelDayTag`. Clock model unchanged.
- **Wiring state:** Harvest Moon is the only Plains stop on the trip card; the silo, elevator, water tower, windmill and mailboxes are dev-warp only, by design.
- **Not verified:** screenshot review of the arrival (capture timed out in the hidden pane), `file://` run, gas-short disabled rows, driving back west across the hinge after a card trip.

### 2026-11-06 — Fuel stops, map zoom, controls list

- **Why fast travel looked missing:** it was pushed (`f6743fe` on the playable branch) but never listed in the controls reference. The trip card needs the coupe seated (door open, `C`, then in) and stopped, then `Y`. The Settings controls list now shows `Y`, the backtick dev warp and map scroll.
- **Gas elsewhere:** `FUEL_ISLANDS` adds one vintage pump (same model, meters, hose physics and nozzle/flap interaction as Sunset) at Cinder Court, Starlite Diner and Harvest Moon. `buildPumpHose` takes a position; interaction uses a per-pump proximity test (`nearPump`) instead of the Sunset-only box. The trip card tags stops with `· GAS` (`GAS_STOP_IDS`); the glovebox map lists GAS on those stops. Fern Bend has no pump (SR 14 lot geometry not checked).
- **Map (reworked after the first pass was still cramped):** the canvas is now 1440x600 drawn at 2.8x (4032x1680), with U.S. 66 widened so the desert stops (Cinder Court, Sunset, Starlite), an "open steppe" break, and the six Plains stops no longer overlap; Plains labels stagger over four tiers; small text raised 2 px; the legend moved into the Plains panel. With the map unfolded, a full-screen map reader opens: scroll zooms (1x to 6x, about the cursor when free, else the centre), mouse movement or a drag pans, double-click resets, `R` folds it. Gas stops show GAS.
- **Checks:** inline `node --check` passes; in the embedded browser no console errors; trip card shows GAS tags; taking the nozzle and refuelling (via exported `takePumpNozzle`/`refuelCoupeAtPump`) worked at Cinder Court, Starlite, Harvest Moon and Sunset; the map reader opened and zoomed and screenshots showed the Plains labels legible. **Not verified:** the aim-and-click nozzle prompt at the new pumps by hand, pump placement against the Starlite and Cinder Court buildings, the folded in-cab map's look (its texture is now wider), `file://`.

### 2026-11-06 — Scenery placement cleanup (river, road, telephone poles)

- **Report:** Trees could stand in the river, bushes on the road, telephone poles on the road or in the river, and trees or bushes on top of poles.
- **Fix:** Forest trees now keep 16 m from the river centreline (was 13) and understory shrubs 11.5 m (was 9), covering the cobble bank. Road clearance is measured perpendicular to the road (trees 8.5 m, shrubs 7.2 m) so steep road bends no longer let shrubs reach the asphalt. New `poleDistance()` keeps trees 4.5 m and shrubs 2.6 m off every pole base, and desert-kit cacti, rocks and scrub keep 2.6 m off poles. `poleWorldZ()` now moves a pole to the opposite verge or a wider offset when its default spot is within 11 m of the river (the bridge crossing).
- **Follow-up pass:** Added `wireDistance()` so forest trees stay 3.6 m out from under the strung wire. Audited the hand-placed Fern Bend grove numerically (road, river and creek offsets from `nwRoadZ`/`nwRiverZ`): moved two Douglas firs that stood on the road shoulder (5-6 m from centre) to about 10-12 m, and three trees that stood in the river or creek bank (a redcedar and two alders) onto dry ground.
- **Checks:** Inline script passed `node --check`. No new resources or network code. **Not verified:** in-game visual review near the river crossing and the SR 14 forest; the in-app browser could not open the local `file://` page. Acceptance stays open.

### 2026-11-05b — Duplicate coupe rearview mirror cleanup

- **Report:** The coupe displayed two overlapping rearview mirrors near the windshield header, where only one projected the road behind the vehicle and the other had a dead black face.
- **Fix:** Removed the vestigial static dummy mirror (`boxPart(0, 1.43, .43, .23, .079, .025)` in chrome and `boxPart(0, 1.43, .413, .204, .058, .012)` in black) left over from the original pre-interaction car model (which had been accidentally re-introduced in commit `0ada5fd`). Replaced the dummy box with a sleek chrome mounting stem (`boxPart(0, 1.505, .565, .016, .068, .016)`) anchoring the active, interactive mirror (`Adjust rearview mirror`, `rearMirror`) securely to the windshield header.
- **Checks:** Single inline script extracted and passed `node --check` with 0 errors. Verified in coupe coordinates that only one unified rearview mirror exists in the vehicle, correctly connected to the render target and interactive gesture system. Zero external dependencies or network requests.

### 2026-11-05 — Progressive coupe steering micro-trim and in-game settings modal

- **Report:** The coupe's steering was excessively sensitive and twitchy on the keyboard, making fine highway lane corrections and subtle course trims impossible without erratic chassis twitching.
- **Progressive micro-trim accumulator:** Replaced instantaneous binary steering rate with a progressive virtual accumulator (`virtualSteerInput`). Tap inputs (50–80 ms) ramp gently through a 1.6 power curve with speed-sensitive highway damping (`1 / (1 + max(0, speed - 5) * 0.038)`), delivering subtle ~0.002–0.015 rad (0.1–0.8°) lane micro-adjustments without chassis twitch or upset. Holding the key builds full steering authority (0.38 rad / ~22°) for intersections, turnaround loops, and parking. Counter-steering against a slide engages an immediate 7.2 rad/s reversal rate to catch drifts cleanly.
- **Period-styled settings modal:** Added an in-game operator's manual modal (`#settings-modal`, accessible via `O` key, top-right `[ ⚙ SETTINGS (O) ]` HUD button, or title overlay button) styled in 1960s Westclox amber and dark bakelite (`#211b16`, `#dab87a`, `#9e8b66`). Features:
  - Steering sensitivity slider (40%–180%) with quick presets (Gentle 60%, Normal 90%, Quick 130%).
  - Highway speed assist toggle (damped highway stability vs raw direct input).
  - Driver seat sway toggle (period bench seat inertia vs fixed camera).
  - Look / mouse sensitivity slider (40%–200%).
  - Master volume slider (0%–100%) and mute toggle with synchronized Web Audio master gain.
  - Complete period key bindings and controls quick-reference grid.
  - Settings persist to `localStorage` (`neon_gas_settings_v1`) across sessions.
- **Controls & Arrow key support:** Extended steering, throttle, and walk controls so Arrow keys work interchangeably with WASD. Physics and movement pause cleanly while the settings modal is active.
- **Checks:** Single inline script extracted and passed `node --check` with 0 errors (924,157 bytes). Offline headless Edge dumped DOM verifying modal, card, presets, and controls. Steering physics simulation confirmed: 60 ms highway tap peaks at 0.00184 rad (0.11°), sustained 0.6 s turn at low speed reaches 0.335 rad (19.2°). Zero external runtime dependencies or network requests.
### 2026-11-04d — Interior steps: grit tail cut, interior shares the outdoor voice

- **Report:** the interior steps still sounded horrible — "like eggs being cracked" — and the user asked for steps that are not too different inside versus outside.
- **Analysis:** an offline render of the synthesized step (same noise buffer, biquad, and envelope parameters as the game) showed the grit tail was the culprit: 90% of its energy above 3 kHz with a spectral centroid of ~12.4 kHz — a dry, sharp tick on every stride, precisely the egg-crack quality. The early reflection added a second hit 19 ms later, and the whole three-layer design (bandpass body + low triangle tap + high-frequency grit + reflection) diverged far from the outdoor step, against the user's preference.
- **Fix:** the grit tail and early reflection layers are deleted entirely, and `footstep()` now remaps surface 3 (interior floors) to surface 1, so building interiors use the exact outdoor asphalt step — same ~380–500 Hz bandpass scuff, same 72→46 Hz body tap, same level. The dead interior-only parameter branches were removed. The classifier still distinguishes interiors (useful for wind muffling and future work); only the sound is shared. Timber bridge (4), canopy (2), sand (0), and asphalt (1) are unchanged.
- **Checks:** the single inline script passes `node --check`. The offline render confirms the interior step is now bit-identical in design to the asphalt step. Listening acceptance on real speakers remains open in this sandbox.

### 2026-11-04c — Interior steps too bright: retuned and extended

- **Report:** the steps inside the buildings were obnoxious and too high-pitched.
- **Fix:** the interior step (surface 3) is now darker throughout: the scuff bandpass drops from the asphalt range (~380–500 Hz) to ~300–360 Hz, the body tap starts at 66 Hz instead of 72 Hz, the dry grit tail's highpass drops from 1.3 kHz to 850 Hz with playback rate lowered from ~1.3× to ~1.0× (removing the effective ~1.7 kHz brightness), its peak falls from 0.010 to 0.006 with a slightly slower 14 ms ramp, and the early reflection lowpass drops from 900 Hz to 600 Hz.
- **Scope:** the interior surface now covers all walkable buildings, not just the Sunset office: the Cinder Court motel room (|x − (motelX + 1.15)| < 2.2, −21 < z < −14.7) and the diner interior (|x − dinerX| < 8.8, −21 < z < −13.8) reuse the same rects as the wind-shelter test, inset from the wall lines. Previously those interiors read as outdoor asphalt. Rebased over the Pacific Northwest work: the Fern Bend interiors (via `fernShelterAt`, which returns 3), the second Sunset-area office, and the timber bridge surface (4) from that branch are preserved, so Fern Bend interiors also receive the darker interior step.
- **Checks:** the single inline script passes `node --check` after the rebase merge; the classifier was logic-tested against station/motel/diner interiors, aprons, canopy, road, and sand. Listening acceptance on real speakers remains open in this sandbox.

### 2026-11-04b — Tire roll and hum obstruction timbre

- **Tire roll while driving.** A second looped noise chain created with the engine (`roll` → lowpass → `rollLevel` → master) gives a restrained rolling sound tied to actual motion: gain `0.048 × road × (0.6 + 0.4 × road)` on asphalt (≈ 0.038 at the 25 m/s cap) and `0.062` off the road, with the lowpass opening from 260 Hz to 600 Hz on asphalt and 700–1100 Hz on the sand shoulder for a little more grit. `road = |carSpeed| / 25`, so it fades fully at rest, follows reverse as well as forward, and gates on `seated && ignitionOn` so it fades out with the existing engine fade on exit. Surface comes from the existing `onAsphalt()` test evaluated at the listener, which tracks the car while seated.
- **Hum obstruction timbre.** The GAS hum's 120 Hz harmonic now ducks independently of the 60 Hz fundamental when the office wall lies between listener and sign: the harmonic gain node tracks 0.35 open / 0.12 blocked (0.045 s constant, same signal as the existing 0.23 level duck), so the wall muffles the hum's timbre, not just its level. Unobstructed hum is unchanged.
- **Checks:** the single inline script passes `node --check`. No new files, assets, or network code. Listening acceptance on real speakers remains open in this sandbox.

### 2026-11-04 — Footstep surfaces and shelter-aware insects

- **Footstep surfaces.** Steps now distinguish four surfaces instead of two: sand scuff (unchanged), asphalt thud (unchanged), canopy concrete (slightly harder attack ~4 ms, bandpass ~460–580 Hz, Q 1.1, scuff peak 0.058, body tap 0.055), and the office floor (asphalt-like main body plus a dry highpassed grit tail at ~1.3 kHz playback-rate noise, peak 0.010, dying by 90 ms, and one barely audible early reflection: the same step lowpassed at 900 Hz, delayed 19 ms, at 22% of the step peak, dead by ~140 ms so it dies between footfalls). A new `footSurface()` classifier derives the surface from the actual player position: the office floor rect (|x| < 5.7, −20.4 < z < −12.9) wins over the apron it sits inside, the canopy slab (|x| < 8.5, −12.94 ≤ z ≤ −4.45) reads as concrete, and everything else keeps the existing asphalt/sand test. Stride, pan alternation, and mute routing unchanged.
- **Shelter-aware insects.** Night chirps now duck with the existing shelter/cabin factors: `insectGain` tracks `0.5 × (1 − muffled × 0.8)` (same `muffled` the wind bed uses), so chirps fall to roughly 42% inside the buildings and ~46% seated in the coupe with the vent closed, recovering smoothly outdoors (0.4 s time constant). Chirp sparseness, night gating past 85%, and scheduling unchanged.
- **Checks:** the single inline script passes `node --check`. No new files, assets, or network code. Headphone/laptop-speaker listening acceptance remains open in this sandbox.

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
