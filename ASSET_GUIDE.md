# Asset and modeling brief — Neon Gas

**Build a convincing place, with finished models the player can walk up to.** The current box assemblies are a blockout, not the quality target. This guide defines how to replace them. [AESTHETIC.md](AESTHETIC.md) owns the mood; [ROADMAP.md](ROADMAP.md) owns priority and status; [AGENTS.md](AGENTS.md) owns the workflow. Use [AGENT_PROMPT.md](AGENT_PROMPT.md) to start implementation.

## Production decision

Continue with **custom low-poly, painterly models for the station, pumps, and signs**, with broad shaded surfaces, deliberate bevels, readable recesses, and selective wear. Build these directly with Three.js geometry/embedded mesh data, or author them in Blender and embed the result. The painterly direction is selected; the voxel renderer is a historical comparison only. Preserve the continuous non-voxel ground and remote mountain backdrop.

Use free third-party models selectively for secondary rocks, scrub, or cacti if they improve the scene after recoloring and rescaling. Do not download a city pack and place it wholesale. Custom hero assets are the fallback whenever a suitable free model is missing, modern-looking, too dense, or awkward to embed. Asset hunting must not become a dependency that prevents implementation.

The game remains a quiet **first-person exploration game**: approaching the station, walking beneath the canopy, inspecting the pumps and windows, and looking down the empty road should be worthwhile. Preserve usable controls, grounded collisions, and readable navigation. This brief does not introduce quests, collectibles, enemies, vehicles, or evidence of recent activity.

## Verified free sources

Source pages checked on **2026-11-02**. These are candidates, **not assets already imported or archive-level license audits**. No downloaded model is included by this documentation change. Verify the exact file and its bundled license before use, and record what was actually selected.

| Source | Verified page information | Suitable use / limits |
| --- | --- | --- |
| [Kenney — Nature Kit](https://kenney.nl/assets/nature-kit) | Official page offers a free 3D nature pack and identifies the license as Creative Commons CC0 | First candidate for secondary desert vegetation and rocks. Inspect the archive for suitable cactus/rock variants; reject forest foliage, bright toy colors, and overly simple close-up hero props. Recolor and normalize scale. Exact filenames/formats have not been audited here. |
| [Kenney — Retro Urban Kit](https://kenney.nl/assets/retro-urban-kit) | Official page identifies a 3D retro urban pack with Creative Commons CC0 licensing | Optional source of adaptable architectural/detail pieces. It is not a verified ready-made 1960s gas-station or vintage-pump kit. Keep only useful parts, with no neighboring city buildings. Custom-build the hero station if the silhouettes do not fit. |
| [Poly Haven — Rocky Terrain](https://polyhaven.com/a/rocky_terrain) | Official asset page identifies Amal Kumar as author and provides terrain texture maps; [Poly Haven's license page](https://polyhaven.com/license) identifies its assets as CC0 | Optional source texture for a downsampled/recolored ground treatment. Its source appearance is realistic and includes vegetation; do not paste it unchanged into the stylized desert. Prefer procedural ground if it fits better. Use downloadable asset maps, not site preview renders. |

The project preference is CC0 for imported art. If a candidate has unclear, conflicting, paid, noncommercial, or attribution obligations that are not being carried through correctly, choose another asset or make it. A site's general reputation or a search-result label is not evidence for an individual file. Do not spend money or create an account to obtain a hero model when the recipes below are sufficient.

When an external asset actually ships, add a concise entry to `THIRD_PARTY_NOTICES.md` and keep any required license text. Record: asset/model name, creator, source page, exact downloaded file/version, license and license-source URL, retrieval date, source-file SHA-256, modifications, and the embedded component it became. Include required credits/license notices inside `index.html` too, so the distributed one-file game carries its obligations. Keep third-party art provenance separate from the existing Three.js notice. Do not create a false list of imported assets from this shortlist.

## Asset inventory and scale

**One world unit is one meter.** Start with these dimensions, then adjust together for composition and walkability. They are art targets, not dimensions measured from a real manufacturer. Use Y-up, ground-level pivots, and front = local +Z for authored props; convert imported coordinate systems at the boundary. The current player eye is about 1.7 meters high.

Triangle counts below are **starting authoring budgets per asset**, not a reason to sacrifice silhouette or proof of performance. Count actual triangles after modifiers/export. Do not fill closed models with hidden geometry.

| Asset | Quantity / approximate size | Required modeling features | Starting budget |
| --- | --- | --- | --- |
| Station shell | 1; about 12m wide × 8m deep; roof around 4m high | Wall thickness at openings, roof fascia/overhang, recessed door and large window frames, restrained seams and wear | 8k–15k triangles including near interior surfaces |
| Canopy and island | 1; about 17m × 8m, underside around 4.4m | Thin 0.25–0.45m roof assembly, readable fascia and soffit, 4 grounded slender columns, raised/beveled island | 3k–6k triangles |
| Vintage pump | 2; roughly 0.8m wide × 0.65m deep × 1.8m high | Rounded/stepped crown, plinth, enamel body, recessed meter, trim band, nozzle, hanging hose | 2k–4k triangles each |
| GAS/OIL sign | 1; cabinet around 3.2m × 2.1m; top roughly 5–5.5m | Pole/base, cabinet thickness and lip, inset face, painted lettering and separate thin neon | 1k–3k triangles |
| Road signs | 1 STOP + 1 Route 66 | True octagon and shield outlines, thin thickness, rear/edge treatment, readable contained lettering | 200–800 triangles each |
| Telephone poles | Repeated line; around 6–8m high | Tapered shaft, cross-arm, a few insulators, sagging wires grounded at actual pole tops | 300–700 triangles per pole; low-segment wires |
| Cacti and scrub | Sparse; 3–4 cactus variants, 1–4.5m high | Tapered segmented trunks/arms, rounded ends, muted colors, terrain contact; no spine geometry carpet | 200–700 triangles per cactus; cheaper scrub |
| Rocks and distant mesas | 4–6 reusable rock variants; broad distant layers | Irregular silhouette, large face groups, muted strata; avoid identical stacked blocks | 80–400 triangles per rock; coarse terrain/mesa surfaces |

Keep the overall main-view visible geometry near or below roughly **150k triangles** as an initial engineering target. Aim for fewer than about **80 main-scene draw calls**, then measure the actual complete frame including shadows and post-processing. These are starting budgets; G3's real 60 fps test remains authoritative. Prefer at most one shadow-casting moon for the painterly scene. Start embedded texture atlases at 512–1024 pixels and aim to keep the complete HTML around 5MB or less; justify an increase with visible benefit and measured load/frame costs.

## How to make the hero assets

### 1. Vintage pumps — the first quality test

Build one convincing pump before populating the whole station. Inspect it from about 1m, 3m, and the initial approach. It must read as a vintage fuel pump in a neutral light test **without bloom or an emissive panel**.

1. Model a low plinth with a chamfered top and a slightly narrower enamel body. Extrude a rounded rectangular profile, use a small bevel, and preserve a curved shoulder silhouette in the selected non-voxel direction. Do not substitute a sphere on a cube.
2. Give the crown soft shoulders and a curved top profile. A few well-placed segments are enough; put geometry where it changes the outline. The front meter is inset into a darker recess, with an ivory face, thin bezel, and simple drawn digits/ticks.
3. Add a restrained metal trim band, side nozzle cradle, a modeled nozzle silhouette, and a dark hose hanging from the side to a lazy curve near the base. Use a low-segment tube or connected tapered segments. A painted line on the front is not a hose.
4. Separate enamel, metal, rubber, meter face, and any tiny existing light into material roles. Meter paper is not a giant cyan lamp. Use subtle edge chips and grime near the base, not random colored speckles.
5. Reuse the geometry for the second pump. Give it a small yaw difference (about 2–5 degrees), a different hose curve, and restrained paint wear; do not lean it far enough to look like a recent crash.
6. Build collision bounds after placement/rotation. Account for the actual rotated footprint while preserving clear walking routes. The hose need not have a tiny collider that catches the player.

**Accept:** the pump has a distinct crown, meter recess, hose, and nozzle in a close three-quarter view; it remains recognizable as a dark silhouette at night. Two cuboids plus bloom fails this test regardless of polygon count.

### 2. Station, canopy, and windows

Start from a clean wall/roof massing plan and the existing doorway. Model the wall sections around actual apertures rather than covering a solid box with a dark rectangle while leaving collision through the door. Add modest roof overhang/fascia, window jamb depth, sills, frame thickness, and a recessed entrance. Use visible interior wall/floor surfaces where the player can see or walk inside; do not let backface gaps expose the sky through the building.

Use a separate canopy roof edge and underside, with slender columns meeting the island/apron. Let local light reveal the soffit and pump crowns. Reduce the heavy block-slab appearance without making columns and roof paper-thin. Windows should have a dark cool face, a frame, and a restrained warm interior cue, not large neon rectangles. Avoid expensive transparent stacks or mirror-like reflections as a default.

**Accept:** roof, wall, window, and door layers read from the approach; pumps remain visible beneath the canopy; close inspection finds intentional junctions, no floating columns, and no inaccessible doorway.

### 3. GAS/OIL and road signs

Make the GAS/OIL cabinet a shallow solid with a rim, inset face, rear surface, and a believable pole/base. Paint lettering onto its face or build it from simple outlines; fit every letter inside the panel. Lay narrow emissive tube paths over the relevant lettering/trim rather than making the whole cabinet glow. Keep a reference to those emissive materials for later synchronized flicker.

Create the STOP panel from an eight-vertex outline and the Route 66 panel from a sampled shield outline, then extrude each a few centimeters. Draw contained text/borders onto a small procedural canvas texture or use cheap outline geometry. Add an edge and back; ordinary sign paint is non-emissive. Signs do not need extra point lights.

**Accept:** each road sign is identifiable by silhouette before the text is readable. GAS letters remain legible inside the bloom; no reversed, mirrored, clipped, or z-fighting labels.

### 4. Desert kit and horizon

Create tapered cactus segments with a few radial sides, rounded caps, and arms that join intentionally; vary height, branching, and yaw with a seed. Build a handful of low-poly rock shapes by perturbing a coarse hull, with stable normals and broad face colors. Place all vegetation/rocks on sampled terrain and update tall-prop collision extents. Do not make every rock a collider or every sand grain a mesh.

Use a continuous terrain surface with shared edges, interpolated normals, and unquantized heights. The road, shoulders, and paint must continue in world coordinates beyond the nearby play patch, in both directions. Do not generate cubes, per-cell vertical walls, rectangular mesa solids, or a visible finite square. Retain the current player-centered patch and shallow, layered sky mountains unless an equally continuous replacement is demonstrated. Scatter less at distance, not more. Space poles into the distance with wire endpoints derived from their actual terrain-relative tops; use a sagging sampled curve.

**Accept:** the landscape reads as a large dry place rather than a square tabletop. Vegetation is sparse, desaturated, grounded, and varied without noise.

The telephone line now uses three reusable instanced batches: wood poles, porcelain insulators, and connected wire spans. Keep 40m world spacing, an 81-pole / 80-span window extending beyond the fog, and the same world-index positions as the player moves. Recenter the pool only when crossing a spacing cell; slope each span to the actual adjacent pole tops, update instance bounds, and reuse the nine near-player collision boxes. Do not allocate new geometry/colliders on every frame or restart the line at the station. Verify both road directions and a view several kilometers away.

## Materials and geometry implementation

Name material roles explicitly: `wallCream`, `fadedTeal`, `fadedRed`, `darkGlass`, `metal`, `rubber`, `sand`, `neonGas`, `neonTrim`, and `windowGlow`. Share static material instances where suitable, but keep independently animated emissive roles distinct even when colors match. Painterly Lambert materials use broad colors and normals; roughness/metalness values apply only if the selected material supports them. Do not add PBR maps that have no effect in the chosen renderer.

Use broad rough paint/enamel surfaces, small bevel highlights, a dark meter recess, and selective grime. Procedural canvas atlases or vertex colors are sufficient; downloaded base-color maps are optional. Color textures must use the renderer's appropriate sRGB color-space annotation; normal/roughness data must not be treated as color. Inspect the actual bundled version before using a current-docs API.

For curves and shaped panels, use available equivalents of BufferGeometry, extrusion, lathe, or tubes. **The present Three.js r160 bundle is tree-shaken and minified inside an IIFE; it does not expose a guaranteed global `THREE` object or every helper/loader.** First map the classes already present. For static assets, embedded vertex/index/normal/UV arrays are often simpler than adding a loader. If a helper is missing, implement the small surface builder or inline only the needed compatible code with its license; do not add a second copy of Three.js or import from a CDN.

Do not convert newly authored curved models back into solid sub-cube volumes. Preserve hard edges with appropriate separate vertices/normals, smooth curved shoulders where intended, and compute valid bounds. Merge only compatible material/attribute layouts, by material and spatial region. Reuse repeated geometry; never merge the whole landscape into one unculled object just to claim one draw call. Build static geometry once, not in the animation loop.

## Offline asset integration

An **external source asset** is allowed at authoring time; an **external runtime dependency** is not. The deliverable remains one `index.html` that works after being copied alone and opened from `file://`.

Preferred paths, in order:

1. **Code-native models:** named builders inside the existing game section, using shared geometry/materials and seeded variants. No additional file load.
2. **Embedded mesh data:** model in Blender or obtain a licensed mesh; apply transforms, set origin/units, triangulate/export, remove hidden faces, bake modifiers, and embed only the required mesh attributes and material roles. Keep a short reproducible authoring/export recipe.
3. **Embedded GLB when justified:** pack all buffers and images into the GLB; inline its bytes; bundle a compatible GLTFLoader and dependencies into the same HTML; decode bytes and use `parse`/`parseAsync`, not `load('assets/model.glb')`. Remove unused cameras/lights/animations and decoder-dependent compression. Validate that no referenced image, buffer, Draco/Meshopt/KTX decoder, font, or worker is fetched. A `.glb` extension alone does not prove self-containment.

Allow a small `assets/source/` directory only when editable custom/source files are genuinely needed, plus relevant license records. Add a preparation script only when required to reproduce an actual imported asset, and document its invocation. These are optional **authoring** resources: playing the committed HTML must never require them, a package install, or a build. Do not commit entire unused packs, caches, or generated alternate builds. Do not create empty pipeline directories for this brief.

## Handoff contract for implementation agents

Deliver an asset as a named builder or a documented embedded mesh, with: meter-scale dimensions, origin/forward convention, material-role map, local collision bounds, useful light/hose anchors, triangle count, and provenance if third-party. A useful shape is `createVintagePump({ variant, materials }) -> { root, colliderLocal, anchors }`; adapt names to the real bundle instead of pasting code that depends on a nonexistent global namespace. World placement is the integration owner's job.

If a team is used, give one integrator ownership of `index.html`, shared materials, and the final roadmap status. Model specialists return bounded model changes and measurements; lighting/environment specialists integrate only through agreed ownership. Do not have several agents independently overwrite the minified bundle. Keep temporary handoff files outside the committed deliverable unless they are necessary authoring sources.

Complete G0 once, record the decision, and move into implementation. If a rendering tool is unavailable, record the missing evidence and continue safe modeling/source work without claiming G0/G3 visual acceptance. Do not end the assignment with another plan, an asset shopping list, or an attractive concept image.

## Definition of a finished asset pass

- Close views show actual shape, depth, recesses, joins, hoses, and readable lettering; distant views preserve a clear silhouette. Bloom-off neutral inspection also passes.
- All assets share scale, palette, shading, and wear language; no default-material imports or mismatched realistic/stylized props remain.
- Compare actual before/after game views at the approach, under the canopy, and along both highway directions; review dusk, blue hour, and night. Site thumbnails and generated beauty images are not acceptance evidence.
- Doorway and pump-island walking routes work, transformed collision bounds fit the models, and nothing floats, clips, z-fights, or exposes unintended holes.
- The delivered HTML passes script checks, offline/file tests, and performance verification in `ROADMAP.md`. Source/provenance and milestone statuses are updated with the same change.

Technical references: [Three.js BufferGeometry](https://threejs.org/docs/pages/BufferGeometry.html), [ExtrudeGeometry](https://threejs.org/docs/pages/ExtrudeGeometry.html), and the [r160 GLTFLoader source](https://github.com/mrdoob/three.js/blob/r160/examples/jsm/loaders/GLTFLoader.js). Current docs explain concepts; match APIs to the installed r160 implementation.
