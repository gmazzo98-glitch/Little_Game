# Aesthetic direction — Neon Gas: Route 66 Dusk

This is the canonical visual and emotional reference for `index.html`. Use [ROADMAP.md](ROADMAP.md) for implementation order and acceptance status, and [ASSET_GUIDE.md](ASSET_GUIDE.md) for model dimensions, construction recipes, and asset integration.

## The feeling

One lone 1960s gas station on an empty desert highway, caught in the last minutes of dusk. Nostalgia should ache: a memory of a memory, weathered Americana seen from decades later. Gloom without horror. The station's neon is a small act of defiance against an enormous desert and sky.

The player is present; the world gives no evidence of anyone else being here now. Nothing demands attention, triggers a quest, or rewards searching. Stillness and negative space are part of the composition.

## Compose the scene before decorating it

- At the starting eye height, read the station, its canopy, the two pumps, and GAS/OIL sign as distinct silhouettes. The sign supports the station rather than dwarfing it; the canopy does not hide the pumps or front windows.
- Reserve broad areas for empty road, desert, and sky. Both highway directions must appear straight, continuous, and unoccupied through the fog. The desert must feel enormous: a continuous softly rolling surface, long sightlines, and shallow layered mountain silhouettes on the absolute horizon. No cube-grid ground, integer-height steps, rectangular mesa boxes, visible terrain edges, or enclosing mountain wall.
- Make three useful review views: the initial approach, a view beneath the canopy toward the windows, and a view along the highway toward the horizon. Review the reverse direction too.
- Keep detail concentrated around the station and pump island. Simplify distant forms into low, layered mesa silhouettes. Let fog and color separation create depth.
- At thumbnail size, the focal point should still be the small illuminated station within a much larger dark landscape. If the first impression is a brightly colored toy set, revise scale, palette, and lighting.

## Light is the protagonist

Use a slow, continuous, approximately five-minute transition. One progress value should coordinate sky, fog, ambient fill, moonlight, and star visibility. Reach night once and hold until reload; never loop, toggle, or restart on entering or leaving pointer lock.

| Moment | Sky and landscape | Station |
| --- | --- | --- |
| Late dusk, fresh reload | Burnt orange low on the horizon, draining into desaturated violet and deep indigo overhead; no visible stars | Neon already on; cream walls retain dim shape and warmth |
| Blue hour, around two minutes | Warmth recedes continuously into blue-violet; distant layers soften; the first faint stars emerge | Neon becomes the strongest local color; forms remain readable |
| Full night, around five minutes | Near-black sky, dense remote-desert stars, faint Milky Way suggestion once Phase 2 lands, cold moonlight | Small pools of cyan and red light, quiet window glow, readable dark silhouettes |

Do not force the horizon to become completely black at exactly two minutes: the existing five-minute smoothstep is still blending then. Judge continuity across the whole arc.

Neon needs a bright narrow source, a soft nearby glow, and light falling onto neighboring surfaces. Keep the letterforms and tube shapes readable inside the glow. A large flat emissive panel or a thick bloom halo is not a substitute. Shadows ground pumps and canopy columns; avoid crushed black objects, floating props, sharp shadow acne, or white clipped walls.

The GAS sign may occasionally falter like an unhealthy tube. Canopy trim is steadier, windows almost constant. Eventually emissive surfaces and their local lights must flicker together. Flicker remains incidental, never a strobe or a horror cue.

## Palette and surfaces

Use these as color relationships, not mandatory final shader values:

| Role | Direction |
| --- | --- |
| Walls / pump enamel | Aged cream, chalky ivory, dusty porcelain |
| Trim | Faded teal or restrained oxidized red |
| Sand / scrub / mesas | Dusty ochre, gray olive, muted mauve; saturation decreases with distance |
| Dusk | Burnt orange near the horizon; indigo above |
| Neon | Small, saturated warm red/pink accents and cooler cyan trim |
| Night | Blue-black sky and restrained cold moonlight |

Use broad, quiet color fields with sparse wear at seams, edges, lower walls, and sun-exposed trim. Avoid random color noise on every cube, uniform glossy plastic, saturated green cacti, or equal contrast on every surface. Weathering must read from viewing distance; micro-detail comes last. Generate variation procedurally or adapt and embed selected licensed art inside the HTML; never load external texture files at runtime.

## Period shapes and content

- **Station:** single story, flat roof, large dark window panes, modest canopy over a pump island, cream walls and faded trim. Create a clear hierarchy of wall, roof edge, canopy thickness, columns, and window recesses.
- **Period detailing:** preserve the faded Sunset porcelain wordmark, worn MOTOR SERVICE lettering, dusty OFFICE / OIL & PARTS glazing, cream/teal base course, narrow red belt line, and restrained patina. Use quiet warm canopy pools and visible thin cyan tubes. Detail should imply long abandonment, with no fresh clutter, occupied-shop brightness, or music. The fixed-open door must remain genuinely walkable.
- **Pumps:** exactly two vintage pumps with a base, softly stepped or rounded upper silhouette, inset meter face, nozzle, and hanging hose. Slightly different angles and restrained wear suggest abandonment. Straight identical cuboids are only blockout placeholders.
- **Signage:** a proportionate hand-painted GAS/OIL cabinet with thin neon; a recognizable Route 66 shield and STOP silhouette. Keep letters within their panels and readable from the approach. No new novelty signs to fill empty space.
- **Desert:** a level road and station apron, blended terrain around them, sparse grounded cacti and scrub, distant low mesas, and telephone poles with sagging wires receding toward the horizon. Avoid a visible trench or raised berm across the driveway.
- **Telephone line:** continue poles and connected sagging wires along the entire visible highway in both directions and as the player travels. Keep fixed world spacing and terrain-relative bases; never restore a short row that stops near the station. Recycle distant geometry beyond the fog rather than filling the world with unlimited objects.
- **Absence:** no people, cars, traffic, trains or train lights, other buildings, campfires, animals, music, or signs of recent life. Sparse moths and insect sounds are only permitted at their planned phases. Tumbleweed is optional wind-driven debris, never constant activity.

## Two approved rendering directions

The user has selected the painterly, non-voxel direction. Continue it consistently across the scene. The voxel direction below documents the historical baseline only; do not switch back or reintroduce voxel ground without a new user instruction.

Both directions require finished, recognizable close-up assets: deliberate silhouettes, surface depth, joints, and material separation. The single-file requirement does not require crude cube models. Custom meshes and embedded licensed models are allowed under the integration rules in `ASSET_GUIDE.md`.

### A. Crisp voxel — superseded baseline (still in git history for the G0 comparison)

The historical baseline used sharp cube edges, stepped silhouettes, instanced cube groups, roughly 0.35-unit detail cells, and 1-unit terrain cells. This records the old implementation; it is not a current requirement or a reason to fill models with internal cubes.

The old renderer used MeshStandardMaterial and both moon and GAS point-light shadows. The selected painterly renderer has superseded this pipeline. Finer voxels do not solve the art direction.

### B. Painterly surfaces and modeled props — selected direction

Softer forms, broad tonal planes, layered dusk color, and deliberately modeled props. Use actual surface meshes; give the continuous desert smoothly interpolated normals and continuous heights. Retain crisp architectural edges where appropriate, but no voxel subdivision, tile outlines, or terrain side walls. Thin neon, curved pump crowns, and lettering need intentional geometry rather than a coarse cube grid. Keep wear selective and procedural.

The current landscape uses a player-centered continuous surface, world-space road/paint shading, and three angular mountain layers in the sky. The mountains stay remote at shallow elevation angles; never replace them with nearby rectangular solids. Sky and stars follow the camera, keeping the backdrop beyond the traversable desert.

Merge static boxes by material **and spatial region**, allowing useful frustum culling; one world-spanning mesh per color does not by itself improve culling. Use flat-shaded MeshLambertMaterial where appropriate, hemisphere fill, and a few cheap local point lights. Retain ACES, the coordinated sky/fog palette, and emissive neon.

Use at most one shadow-casting light, the moon directional. The GAS point light must not cast shadows. Test a 1024-square moon map or soft procedural contact quads if they preserve grounding. Do not stack expensive effects to simulate softness.

The suggested 3–5 times lower frame cost versus the voxel baseline is an **experiment target, not a promise**. Compare actual whole-frame times on the same hardware and view; choose by visual quality and sustained performance. Neither path may use bloom to hide unresolved geometry.

## Stillness and sound

The default idle camera is fixed. No compulsory breathing, head bob, drifting horizon, or cinematic camera motion. The light may change without making the world busy.

If added, sound is sparse, procedural, and diegetic: wind, a distant electrical hum, occasional ticks, and later faint insect chirps. No music or human/vehicle cues. Respect browser user-gesture requirements and provide mute. Footsteps are not currently a promised feature.

## Review rule

Assess actual game captures at dusk, blue hour, and night, from matching views. `preview.jpg` is an AI-generated concept illustration, not an achieved render and not evidence of acceptance. Pass the graphics foundation before adding decorative effects; see the roadmap for the exact gates.
