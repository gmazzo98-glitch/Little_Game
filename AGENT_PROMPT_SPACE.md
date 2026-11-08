# Implementation prompt — the space mood

Copy the block below into the implementation agent's chat. It improves the **saucer, the climb out of the atmosphere and the Drift Outpost** on top of the first build, using [SPACE_MOOD.md](SPACE_MOOD.md) as the design authority. It names the real code hooks so the agent edits the right places. Facts about `index.html` were read at commit `7170b39` plus the 2026-11-08 cabin rebuild and must be re-checked by structure, not by line number.

This is a launch prompt, not an authorization to widen scope. The ground game, the Plains, the Pacific Northwest and the coupe are out of scope except where this prompt says a shared hook must not regress.

````text
Work on gmazzo98-glitch/Little_Game, branch vibe/neon-gas-voxel-f660eb. Improve the space layer of Neon Gas (the little saucer, the climb out of the atmosphere, the Drift Outpost on the asteroid) as real, playable game code in index.html. This is an implementation task. Do not stop at a plan, an asset list or a document.

======================================================================
0. WHAT YOU ARE MAKING, IN ONE PARAGRAPH
======================================================================
The space layer should feel like the highway seen from inside a warm room: a small cosy cabin with a real dashboard, the largest dark there is outside the glass, and one small neon outpost on a rock, lit and empty, with soft rain falling on its wet deck. The player can switch the cabin lamp off and just sit in it. If a choice must be made between more things and more stillness, choose stillness. The outpost is far more colourful than the desert, so its restraint must come from HIERARCHY (one hero light, dimmer supporters, no bloom compensation), not from removing colour.

======================================================================
1. READ FIRST (in this order), THEN INSPECT THE LATEST BRANCH
======================================================================
AGENTS.md (including "User-requested exception: the saucer and the asteroid outpost"), SPACE_MOOD.md (the design authority for this task), MOOD.md (the shared grammar), AESTHETIC.md, AMBIENCE.md, ASSET_GUIDE.md, ROADMAP.md (Verification and completion, and the 2026-11-06 and 2026-11-08 space records). Run git status, git log and git remote -v first.

Where documents disagree: the user's current instructions win, then AGENTS.md non-negotiables, then SPACE_MOOD.md, then MOOD.md. Record any disagreement you resolve.

======================================================================
2. HARD RULES
======================================================================
- ONE self-contained index.html. Inline everything. Zero runtime network requests. Must work double-clicked from file://. No build step. Preserve the bundled Three.js and its license notice at the end of the script.
- The ground game stays as written: no space objects, lights or sounds in the desert unless the player is flying or in space mode. The outpost exists only in space mode. Do not touch the world clock model.
- No people, no other ships, no music, no voices, no moving lights other than the Drift Inn beacon, no thunder or lightning, no quest, score, collectible, or minimap beyond the chart.
- No mandatory camera sway or shake at speed. Improve silhouette, composition, palette and light before density, bloom or particle counts.
- Do not claim performance or visual approval you did not measure or see. Software-rendered (SwiftShader) captures prove correctness, not frame time. Implementation and verified acceptance are separate facts; record anything unchecked as pending with the reason.
- Git: another session may be committing to the same working tree. Run git pull --rebase before every push, keep commits small, stage only the files you changed, never use git add -A, and never kill browser processes you did not start. Commit AND push each finished change, end commit messages with the attribution line the harness gives you, and for any index.html change update ROADMAP.md (status and validation record) in the SAME commit. After pushing, verify the remote index.html at the resulting commit. In the handoff name the branch and commit and give exact steps to reach the new content.

======================================================================
3. WHAT THE CODE ALREADY DOES (re-verify by structure)
======================================================================
Shared scope. The game lives in one IIFE that also contains the bundled Three.js. Minified names used by the space code: xi Group, dt Mesh, It BufferGeometry, Et BufferAttribute, P Vector3, Me Color, Pn PointLight, ji MeshStandardMaterial, wi MeshBasicMaterial, rt ShaderMaterial, Cn BoxGeometry, lr SphereGeometry, ba PlaneGeometry, or Points, Qi PointsMaterial, ar InstancedMesh, qt Texture, xt Object3D. IMPORTANT: the game's own Lm is a stripped Lambert (colour, emissive, flat shading only). It ignores maps and vertex colours. Use ji for anything textured or vertex-coloured. There is no LineSegments constructor: submit line pairs the way rainMesh and spRainMesh do (an xt with isLine, isLineSegments, geometry, material).

Space code (search for the comment banner "EASTER EGG: the little saucer"):
- Constants: UFO_HOME (saucer parking), UFO_TIERS and UFO_TIER_NAMES (six speeds), SP (planet, asteroid, deck numbers; SP.py is the deck height), spSun.
- Geometry helpers: ufoLatheGeo (optional angle range), ufoTubeGeo, ufoCircle, ufoAdd, ufoBox, ufoBall, ufoNeon (tube plus additive halo), ufoSign (canvas neon lettering), ufoCanvasTex.
- The saucer: ufoShip (Group) with ufoHull (tilts) and ufoCabin (never tilts). UFO_DOME is the canopy ellipsoid; UFO_EYE is the pilot's eye. ufoLamp holds the cabin lamp, dash glow, bulb material, halos and the lamp switch. ufoDash has two live canvas gauges (cluster, nav) redrawn about 8 times a second by ufoDrawDash.
- State and flight: ufo (flying, landed, vel, tier, fuel, speed), ufoBoard, ufoExit, ufoUpdate (thrust, auto-brake, ground clamp), ufoPlaceCamera, ufoGroundAt (plateau override only in space), ufoHome, ufoCollider.
- Space mode: ufoSetSpace(on) hides every child of the scene except lights, the saucer, spGroup, stars and ufoDust; ufoFrame fades sky and fog from 900 m to 3.2 km and enters space mode above 3.2 km with hysteresis. os() has one early return over the deck (ufoPlateau) while ufoSpace is true. Camera near/far change to 0.4/130000 in space.
- spBuild() lazily builds spGroup: nebula dome, 6000 stars, sun, procedural Earth shader (earthMat), atmosphere shell, the asteroid (vertex-coloured ji), skirt, canvas-painted deck (spPaintDeck), and the outpost (spBuildOutpost: ORBIT GAS, NOVA NOSH, DRIFT INN, runway lights, mast, crystals, eight shared point lights in one localLightGroups entry with space:'only').
- Rain: spRainMesh (1,000 line streaks around the camera, bent by saucer velocity), spRainUpdate (slow weather field, dry under the Orbit Gas canopy, wet-deck roughness, filtered-noise bed). spRain.force pins the weather for tests.
- Map and travel: ufoDrawChart (R, a canvas star chart), ufoMarkerUpdate (waypoint to the outpost), UFO_WARPS and ufoWarp(id) (home, sky, orbit, runway, pumps), ufoWarpWithFade, and the trip card (travelStopList appends UFO_WARPS; openTravelModal switches to a "FLIGHT COMPUTER" card while flying or in space).
- Test hooks: document.getElementById("app")._game exposes ufo, ufoShip, spGroup, SP, spRain, ufoLamp, ufoWarp, ufoToggleLights, UFO_DOME, ufoBoard, ufoExit, ufoHome, spBuild, ufoSetSpace, ufoGroundAt, plus the older game hooks.
- Keys: E board/step out/use, F step out, 1-6 or wheel speed, WASD/Space/C fly, L cabin lamp, R chart, Y or backquote warp card.

Before editing, find each of these by structure and confirm it still matches.

======================================================================
4. WHAT TO DO (milestones; each ends with a commit, a push and a roadmap record)
======================================================================
S0  Baseline. From the desert: board, climb, enter space, reach the deck by flying and by the warp card, step out, walk, refuel, step back in, return to the desert. Capture matched stills (cabin lamp on and off, open space with the planet, deck at the runway, Orbit Gas, Nova Nosh, Drift Inn, rain on and off) at one viewport. Record what already works so you can detect regressions.

S1  Saucer polish. The cabin passes the clip test (keep it passing: write the vertex-level ellipsoid margin check into a scripts/ file if useful, and run it after every cabin change). Improve the exterior: consistent hull curvature, fewer and better parts, panel seams, one repair patch, matte metal catching the cabin glow. Add traces of care to the cabin (polished seat edge, worn switch, mug ring, a strip of tape on the dash). Optional: beading drops on the canopy while raining. Keep the palette rule from SPACE_MOOD.md. Make L feel physical: the rocker moves with the fade, and a faint click sound.

S2  Outpost hierarchy and care. Establish one hero (Orbit Gas ring, cyan with a pink accent) and one coal (Drift Inn beacon); reduce competing saturation; one lime and one amber only. Add the traces of care listed in SPACE_MOOD.md (repaired sign letter, taped hose, crossed-out menu, worn bell, ghost rectangle on the deck). Give Drift Inn a more convincing silhouette and pod detail (the pods are currently plain flat-shaded ellipsoids). Make the Nova Nosh window the one warm pool. Keep it empty and still.

S3  Rain and wet neon. Wet-deck reflection of the neon (a cheap faked mirror pass or vertical streak planes under signs; no environment map exists), tiny ring ripples where drops land near the player, dry zones under the canopy and the Nova Nosh awning, soft sound muffling at cover edges. Rain must start and stop slowly, never produce thunder or a screen flash. Check it with spRain.force at 0, 0.5 and 1.

S4  Space sky and approach. Make the approach order true: colour first, silhouette second, sound third, detail last. Tune the waypoint and chart so they never replace the colour stage. Keep the planet and nebula cheap (planet at most 4 noise octaves, nebula at most 3). Check star and dust points at 1080p so they read as stars, not squares.

S5  Sound. Cabin hum and air-rush layers, rain bed levels (cabin quiet, deck loud, cover muffled), a transformer hum near Orbit Gas, boots on wet tarmac. Event cap: no discrete sound more often than once per 40 s on average apart from beds. Mute and tab hiding must keep working. Wind and insects stay muted in space and come back cleanly on return.

S6  Reachability. From a fresh load a first-time player should reach the deck in under two minutes with the chart and the waypoint, and in under thirty seconds with fast travel. Test the warp card from the desert on foot (backquote), from the coupe (Y), from the cabin and from the deck. Make sure state is consistent after every warp: ship, player, camera, fov, space mode, terrain recenter, lights, audio, held items.

S7  Performance. Measure on a named laptop at the actual viewport and pixel ratio: median and p95 frame time on the deck in rain, in open space with the planet in view, and in the desert beside the parked saucer (check the 75 m light cull). If anything misses 60 fps, fix it before polishing. Do not substitute draw-call or instance counts for frame times.

S8  Verification and handoff, as in section 6.

======================================================================
5. KNOWN ROUGH EDGES TO FIX OR CONFIRM
======================================================================
- The motel pods and crystals are low-poly and flat. The deck hex pavers glow strongly from low camera angles.
- Stars and flight dust are square points at low resolution.
- The saucer reads best from the front or side. Check the rear and the underside.
- The warp card hint text still mentions "Y trip card in the parked coupe" while in flight.
- Leaving the saucer parked in space and travelling away returns it home silently. Confirm this is understandable (a note?).
- The nav screen scales the outpost blip to a 6 km radius; confirm it reads at 300 m and at 20 km.

======================================================================
6. VERIFICATION (follow ROADMAP.md "Verification and completion", plus these)
======================================================================
1. Extract every inline script and run node --check. Inspect resource attributes, URL literals, fetch, XHR, WebSocket, Worker and dynamic imports. A grep alone does not prove offline operation: open the delivered index.html from file:// with networking off.
2. Clip test: every cabin vertex above the dome base lies inside the canopy ellipsoid with at least 5 cm margin. Record the result.
3. L: the cabin goes dark in under a second, the dashboard stays readable, the exterior cabin glow disappears from outside, and the lamp returns without a pop.
4. Dashboard values (speed, altitude, fuel, tier) match the HUD.
5. Rain: starts and stops slowly, visible in open space and on the deck, dry under cover, silent apart from the bed.
6. Reachability times from section 4 S6.
7. Desert regression: when not flying or in space, no space-layer objects, lights or sounds are visible or audible. Coupe, station, travel card, glovebox map and rest actions unchanged.
8. Pointer lock enter/exit/re-enter, resize, mute, tab hiding.
9. Headless software rendering (SwiftShader) can be very slow on first space frames (shader compile). Use a small viewport to step simulation and a larger one only for stills. This proves correctness, not performance.
If any check cannot run, record exactly what remains unverified and leave acceptance open.

======================================================================
7. DOCUMENTS TO UPDATE IN THE SAME COMMITS
======================================================================
ROADMAP.md (status row and validation record with real evidence or pending reasons), SPACE_MOOD.md (mark implemented items, correct anything the build contradicts), MOOD.md only if the shared grammar changes. Do not create new planning documents.

======================================================================
8. FINISH WITH
======================================================================
The implemented changes; the real evidence (captures, frame times with hardware, viewport and pixel ratio, audio notes); anything pending and why; the branch and commit; a link to the playable index.html on the branch; the exact steps to reach the new content (find the saucer about 87 m west of Sunset Service, press E at the hatch, press Y for the flight computer or climb past 3.2 km and follow the waypoint); and the next unfinished milestone.
````

## Notes for the person launching this

- **Why it names code hooks.** The space layer lives inside a minified bundle with a stripped-down material class that ignores textures and vertex colours. The prompt says so, so the agent does not rediscover it the hard way.
- **Shared working tree.** Another session has been committing to the same folder, including half-finished space changes. The prompt tells the agent to pull before pushing and to stage only its own files.
- **Defaults chosen.** Rain is canon and sparse everywhere, denser near the asteroid. The planet does not turn. The Drift Inn has no interior. The cabin lamp is switchable only from inside.
