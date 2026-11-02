# Roadmap — Neon Gas: Route 66 Dusk

The execution plan for the single-file vignette. [AESTHETIC.md](AESTHETIC.md) defines the look; [ASSET_GUIDE.md](ASSET_GUIDE.md) defines asset production; [AGENTS.md](AGENTS.md) makes this plan part of the contributor workflow. Use [AGENT_PROMPT.md](AGENT_PROMPT.md) to launch implementation. Source audited on 2026-11-01 against `4eb3782`; asset guidance expanded on 2026-11-02 after checking `a941316` on `vibe/neon-gas-voxel-f660eb` (PR #1). The painterly flat-shade rendering revision was implemented on 2026-11-02 in the same PR; see the validation record for what is and is not verified.

**Next: G0, capture the graphics baseline and compare the approved styles.** Graphics quality is the priority. Complete G0–G3 before adding Phase 2–6 features. Preserve the implemented Phase 1 cycle throughout. This document records a plan and source audit; it does not claim the visual overhaul has already shipped.

**Style state:** the painterly flat-shade revision (style B) is now the implemented renderer — coarsened boxes merged per material key, Lambert flat shading, moon as the only shadow-caster, no bloom pass. It replaces crisp voxel as the working tree state, not as an accepted style decision; G0 captures and measurements against the crisp-voxel baseline are still required before the decision is recorded.

## Delivery contract

- One playable `index.html`, with Three.js and all CSS, shaders, geometry, selected model/texture data, and future audio inline. No external runtime assets, CDN, runtime requests, required server, package install, or build to play.
- Keep the documentation focused and preserve the existing concept illustration. `ASSET_GUIDE.md` specifies models and `AGENT_PROMPT.md` launches agents; they do not replace aesthetic or status authority. Allow only source files/license records/preparation scripts genuinely needed for implemented art, following the asset guide; no unused asset packs or parallel application source tree.
- One 1960s station, exactly two pumps, empty straight highway, desert, cacti, poles, and sagging wires. No people, vehicles, train lights, other buildings, music, or recent life. Sparse insects are permitted only in their planned phases.
- About five minutes from dusk through blue hour to night, one way, then hold. No visible switch, loop, or day/night toggle.
- Target steady 60 fps on a named mid-range laptop. Measure whole-frame cost; prefer fewer surfaces, sensible batching, and cheaper lighting over greater voxel density.
- Every scene change must satisfy the aesthetic rules and update this roadmap's status and validation record in the **same commit**. Do not mark a visual gate passed from syntax checks or a concept illustration.

## Status and dependency order

| Work | Status | Dependency / next result |
| --- | --- | --- |
| Repository direction and contributor rules | Complete | This documentation cleanup; runtime unchanged |
| Asset production brief and agent launch prompt | Complete | Specifications and free-source research delivered; actual model production remains in G0–G2 |
| G0 — Baseline and rendering-style decision | **In progress** | Painterly flat-shade revision implemented; actual game captures and frame measurements still pending |
| G1 — Composition and period silhouettes | Planned | G0 style decision recorded |
| G2 — Palette, surfaces, and light hierarchy | Planned | G1 accepted |
| G3 — Graphics acceptance and performance | Planned | G2 accepted; pass before feature expansion |
| Phase 1 — Dusk-to-night cycle | Implemented; visual revalidation pending | Preserve while completing G0–G3 |
| Phase 2 — Star field and sky depth | Planned | G3 passed; Phase 1 revalidated |
| Phase 3 — Neon character | Planned | Phase 2 accepted; G2 already establishes basic glow |
| Phase 4 — Procedural ambience | Planned | Phase 3 accepted |
| Phase 5 — Sparse micro-life | Planned / optional | Phase 4 accepted; cut if it weakens stillness |
| Phase 6 — Stillness and interaction polish | Planned | Earlier phases accepted or explicitly deferred |

G0–G3 are an added visual foundation, not a renumbering of the original six atmosphere phases. Later phases may be skipped by an explicit scope decision; do not bypass an earlier failed gate silently. Fixes that protect offline play, controls, or the existing cycle can happen at any time.

## What the source actually contains

The current code establishes a useful blockout and an implemented light cycle. It does **not** establish final graphical quality or a measured 60 fps result.

| Source finding | Consequence for the plan |
| --- | --- |
| Same box assembly is used for both pumps; rectangular STOP and Route 66 panels | G1 must establish period silhouettes, asymmetry, and proper sign shapes |
| Road cells run from x = -62 to 62, while fog extends to 230 units | G1 must check and conceal/extend road and terrain termination in both directions |
| Detail boxes were filled with approximately 0.35-unit sub-cubes, including internal cubes; terrain used 1-unit solid cells | Resolved in the painterly revision: one box per `ce` call, merged per material key with cheap hidden-face culling |
| Instanced groups set `frustumCulled = false`; PBR materials and bloom were used | Resolved in the painterly revision: merged meshes with real bounds (culling on), Lambert flat shading, no bloom pass |
| The moon has a 2048-square shadow map; the GAS point light cubemap was removed | Only the moon casts shadows now; verify grounding in captures |
| Road center marks and the STOP panel have emissive values; surfaces use broad repeated colors | G2 must reserve luminous accents for credible light sources and add selective material variation |
| Cactus stems are built from world y = 0 without the terrain offset used by poles/signs | G1 must ground cacti and their collision bounds on actual terrain |
| Cycle uses `eg.elapsedTime`, including time with the overlay visible | Phase 6 must pause progression while unlocked without resetting it |
| GAS light flickers; its emissive materials are not animated with it | Phase 3 must synchronize the visible tube and its spill |
| `preview.jpg` was introduced as an AI-generated illustration | Treat it as concept intent, never an achieved screenshot |

These are source observations, not a substitute for viewing the scene. Validate each visual hypothesis in G0.

## Graphics foundation — highest priority

### G0 — Establish the baseline and choose a coherent style

- [ ] Capture the actual starting view, a canopy view, and a highway horizon view at dusk, blue hour, and night. Inspect the reverse highway view too. Keep matching camera poses and settings for comparisons.
- [ ] Record hardware/GPU, browser, viewport, pixel ratio, frame-time median and p95, draw calls, rendered triangles, and shadow configuration. Sample at least 30 seconds per representative view after warm-up. Include the bloom/shadow passes in measurements.
- [x] Implement the painterly flat-shade revision of the same whole scene: one box per surface call instead of 0.35-unit sub-cube grids, per-material-key merged BufferGeometry with cheap hidden-face culling and working frustum culling, MeshLambertMaterial-style flat shading (`Lm`, `flatShading = true`) with per-key color/emissive/emissiveIntensity preserved, GAS point light `castShadow = false`, moon as the only shadow-caster, UnrealBloomPass removed so neon glow is carried by emissive materials + fog + the existing flicker loop.
- [ ] Capture and measure the voxel baseline (git history) and this painterly revision from matching views and camera poses; sky/fog/cycle/controls/collision code is unchanged between the two revisions.
- [ ] Compare the current crisp-voxel approach with a focused painterly flat-shade revision of the **same whole scene**. Use separate revisions/captures, rather than a mixed-style scene or a new player-facing style selector.
- [ ] Evaluate silhouette quality, material readability, horizon depth, and neon source/spill at all three light stages. Choose the style that best fits the brief within the measured budget; record the decision below.
- [ ] Record an asset plan using `ASSET_GUIDE.md`: custom station/pumps/signs by default; select licensed free secondary props only where suitable. Prove the embedding route with one representative hero pump before adding an importer or growing the asset set.

Painterly is the preferred experiment: coarse surface panels or 0.5–1 unit construction, spatially partitioned material merges, flat Lambert shading, and a maximum of one moon shadow-caster. Keep fine lettering/neon, ACES, fog, and local non-shadow light. If voxel wins, remove hidden internal cubes and establish useful batch bounds before raising density. See the full renderer rules in `AESTHETIC.md`.

**Pass:** matching actual captures and measurements exist; one style is selected with a short reason. A claimed 3–5 times cheaper painterly frame is only a target until measured. No performance or visual approval has been recorded yet.

Do this baseline/decision once, then build. If rendering evidence is unavailable, record what is pending and continue independent modeling/source improvements; do not mark visual acceptance complete or spend the whole assignment producing another plan.

### G1 — Make the place convincing in silhouette

- [ ] Follow the inventory, scale, construction recipes, handoff contract, and bloom-off close-up checks in `ASSET_GUIDE.md`. Use actual surface geometry and embedded asset data rather than denser solid cube volumes. Record provenance for any imported model.
- [ ] Set the approach framing and station/canopy/sign proportions. Keep negative space dominant and the station small within the desert.
- [ ] Replace pump blockout shapes with vintage rounded or stepped crowns, meter recesses, nozzle and hose silhouettes; introduce slight rotation/age differences. Keep exactly two pumps and align collisions with the final shapes.
- [ ] Shape a STOP octagon and Route 66 shield; keep text contained and readable. Keep GAS/OIL cabinet scale credible beside the roofline.
- [ ] Make the road read as continuing to the horizon in both directions. Blend sand, apron, and driveway; eliminate visible tile borders, road-end cutoffs, floating vegetation, and intersecting or buried props.
- [ ] Ground cacti and their AABBs on `os(x,z)`. Establish fewer, broader, more distant mesa layers and receding telephone poles/wires.

**Pass:** station, canopy, pumps, and sign are distinct at the starting viewpoint and at thumbnail scale; each close prop reads as its period object; both highway views feel expansive and empty. Walking under the canopy and through the doorway produces no new collision issues.

Required asset deliverables: one finished station/canopy assembly; two detailed vintage pumps with meters/nozzles/hoses; one GAS/OIL cabinet; correctly shaped STOP and Route 66 signs; a grounded, varied desert prop kit and receding poles/wires. Every component follows the asset guide's material-role and collision conventions.

### G2 — Establish palette, material, and light hierarchy

- [ ] Apply a restrained cream / faded teal or red station palette. Desaturate sand, scrub, cacti, and distant mesas; separate depth with value and fog rather than random color noise.
- [ ] Add sparse procedural wear to seams, edges, lower walls, pump enamel, and trim. Keep windows dark or quietly glowing; avoid the impression of an occupied shop.
- [ ] Make neon a thin readable source with soft nearby bloom and colored spill on nearby geometry. Keep letterforms legible and cream walls unclipped. Let neon become dominant as dusk drains away.
- [ ] Ground pumps and columns with soft contact shadows. Tune exposure, fill, fog, and moonlight together so night is dark but navigable. Check the reverse view as well as the hero view.
- [ ] Review emissive road markings and STOP panel: ordinary paint should read through illumination rather than behaving like another neon source.
- [ ] Normalize imported/custom assets to one palette, surface treatment, and texel/detail scale. Retain authoring/provenance records where needed and verify every used model/texture is embedded in the delivered file.

**Pass:** actual captures read as melancholy Americana in all three light stages. The desert is quiet and desaturated; the station is the local color focus. No plastic-looking uniform surfaces, blooming white blobs, blacked-out pumps, or visible light-stage switches.

### G3 — Accept the graphics and lock the budget

- [ ] Repeat the G0 captures and frame measurements with the selected style and G1/G2 work, on the same machine/settings. Explain differences rather than comparing unmatched resolutions.
- [ ] Remove internal/hidden geometry, bound batches appropriately, and use spatial chunks for meaningful culling. In the painterly path, disable GAS shadows and evaluate a 1024-square moon map or contact quads.
- [ ] Check shadow artifacts, distant popping, shader errors, resize, and long-view costs. Tune pixel ratio/bloom only alongside a matching visual comparison.
- [ ] Complete the offline and interaction checks below and revalidate Phase 1. Keep real screenshots clearly separate from the existing concept image in review evidence.

**Pass:** G1/G2 visual criteria pass, the delivered file works offline, and sustained 60 fps is demonstrated on the recorded mid-range laptop in representative views. Report median and p95 frame times and any remaining spikes. If the target is missed, keep G3 open and reduce cost before adding atmosphere features.

## Phase 1 — Slow dusk-to-night cycle

**Implemented, not newly visually approved in this audit.** Existing code uses `k = smoothstep(clamp(elapsedTime / 300, 0, 1))` to blend the sky's `uNight`, fog, hemisphere fill, and moon intensity. A 2600-point star field fades from `k > 0.3`; GAS and an interior warm point light flicker. Full night holds.

- [x] Approximately five-minute one-way blend; no day/night toggle.
- [x] Coordinated sky, fog, ambient fill, moonlight, and star fade in source.
- [x] 2600 stars, initially invisible; basic light flicker.
- [ ] Revalidate all three time keyframes in the actual game after the graphics foundation.

**Pass:** fresh reload has warm dusk and no stars; around 120 seconds warmth is receding and faint stars begin emerging; at/after 300 seconds full night holds with dense stars. Watch the interval as well as endpoints; no discontinuity. Pausing on unlock is tracked in Phase 6, not claimed here.

## Phase 2 — Star field and sky depth

- [ ] Add subtle per-star brightness/size variation and slow independent twinkle, approximately 15% amplitude, using seeded phase attributes and time uniforms.
- [ ] Suggest a faint oblique Milky Way band within the existing star budget first. Add particles only if captures demonstrate a need and G3's measured budget survives; do not mandate another 4000 points.
- [ ] Add a small cold moon disc aligned with the moon light direction. Keep its halo restrained and do not add another shadow-caster.

**Pass:** no visible stars or Milky Way in orange dusk; night has remote desert depth; twinkle is noticeable only when sought, with no synchronized blinking. Re-run the graphics checks.

## Phase 3 — Neon character

- [ ] Give GAS occasional irregular dips, canopy trim a steady gentle shimmer, and windows nearly constant intensity. Use a small shared flicker system.
- [ ] Retain explicit per-role emissive material references when batching. Color alone is not sufficient to distinguish signs and trim that share a palette.
- [ ] Animate each role's emissive source and associated point light from the same signal. Make dropout timing time-based rather than a per-frame random probability.

**Pass:** physical source, bloom, and spill agree during a dip; each role feels old without theatrical blinking. Behavior remains comparable at different frame rates and does not alter the cycle.

## Phase 4 — Procedural WebAudio ambience

- [ ] Start/resume the AudioContext only after the entry gesture; provide mute. No audio files or requests.
- [ ] Build a very quiet filtered wind bed with slow variation, a localized 60/120 Hz neon hum, and rare electrical ticks tied to the same flicker signal. Derive sound position from the actual sign transform, not an obsolete hard-coded coordinate.
- [ ] Permit sparse insect chirps only at deep night. Suspend/mute appropriately when leaving play or hiding the tab; do not let resume jump the ambient cycle.

**Pass:** headphones convey open desert and distance; silence remains dominant. Mute, unlock/re-entry, and background/foreground transitions work. No music, voices, engines, or trains.

## Phase 5 — Sparse micro-life, optional

- [ ] Try a handful of tiny moths near one light, using existing cheap geometry or a small point batch. Keep the count low enough to remain incidental.
- [ ] Optionally try a rare wind-driven tumbleweed. Cut it if it reads as an event, repeats conspicuously, or harms performance.

**Pass:** a stationary observer can overlook the motion; the place remains empty and still. No other animals, traffic, or distant moving lights. Heat shimmer and train lights are out of scope.

## Phase 6 — Stillness and interaction polish

- [ ] Pause ambient progression while the entry overlay is visible and while the tab is hidden. Resume at the same cycle position; never reset to dusk or skip ahead. Keep motion deltas bounded.
- [ ] Clear held movement keys on blur/unlock; test pointer-lock release/re-entry, jumping, walls, doorway, and resize.
- [ ] Consider a very sparse under-canopy dust cloud only if it improves depth and stays within budget. Omit it if the existing scene already communicates stillness.
- [ ] Keep the idle camera fixed. Do not add mandatory breathing sway/head bob. Review the entry overlay and HUD so they do not dominate the scene or imply objectives.

**Pass:** the player can leave and return without lost dusk, stuck movement, or unsolicited camera motion. A long idle view remains calm. Repeat the final graphics, offline, and performance checks.

## Code orientation — current inline bundle

The game begins at `function Vm(i)` / `var pn=Vm(1966)` inside the single minified IIFE. The bundled license notice follows the IIFE at the **end** of the script. Do not edit the library prefix or assume the license precedes the game. Re-locate symbols by structure if the bundle changes.

| System | Current symbol / location |
| --- | --- |
| Seeded scene RNG | `Vm`, `pn`, `Dn` |
| Terrain height / box collection / merged flush | `os` / `ce` / `Gm`; Lambert material class `Lm` |
| AABB registry / collision | `Mc`, `Dt` / `vc` |
| Renderer / scene / camera | `mn` / `Nt` / `Nn` |
| Sky / night blend uniform | `Xm` / `Xm.material.uniforms.uNight` |
| Stars / hemisphere | `Nt.userData.stars` / `hhem` (`Nt.userData.hemi`) |
| Moon / GAS point light | `Qt` / `$n` at `(11, 5.6, -8.4)` |
| Canopy lights / interior warm light | `Sc`, `bc` / `Ec` at `(0, 3, -17)` |
| Composer / output pass | `ls` (RenderPass + OutputPass; bloom pass `wc` was removed in the painterly revision) |
| Pointer lock / movement keys / player update | `wr` / `fn` / `tg` |
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
