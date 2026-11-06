# Implementation prompt — the Great Plains

Copy the block below into the implementation agent's chat. It builds the **Great Plains** region of [WORLD_MAP.md](WORLD_MAP.md) (`T` +46 to +84 km east of Sunset Service) and the **Harvest Moon Drive-In**, joined to the existing road. It points to the repository's canonical documents instead of repeating them. Where it states a fact about `index.html`, that fact was read from the file at commit `27ce93d` and must be re-checked by structure, not by line number.

This is a launch prompt, not an authorization to widen scope. The train, the SR 61 Gulf spur, the farm belt, the mesa country and the Divide are out of scope.

````text
Work on gmazzo98-glitch/Little_Game, branch vibe/neon-gas-voxel-f660eb. Build the Great Plains region of Neon Gas and its one destination, the Harvest Moon Drive-In, as real, playable game code in index.html. This is an implementation task. Do not stop at a plan, an asset list, or a document.

======================================================================
0. WHAT YOU ARE MAKING, IN ONE PARAGRAPH
======================================================================
East of Starlite Diner the highway should stop being desert and become the Great Plains: straw and green grass rolling under a very large sky, a dead-straight road with a telephone line shrinking to a point, a dark grain elevator and a water tower on the rim, a windmill turning over a stock tank, a distant storm that glows silently and never arrives, crickets that fall quiet near the one lit sign, and, small and far and steady, a red neon sign for a closed drive-in. The feeling is WAITING: abundance with no one to share it, a summer no one is here to see. The player should drive toward that red point for a long time, arrive, be let in by a warm lamp and a dropping wind, and leave with the red coal staying in the mirror for an almost unreasonable time. If a choice must be made between more things and more stillness, choose stillness.

======================================================================
1. READ FIRST (in this order), THEN INSPECT THE LATEST BRANCH
======================================================================
AGENTS.md, AESTHETIC.md, MOOD.md (especially "The shared grammar", "Great Plains - the feeling", "Great Plains - ambience in depth" and "Region moods across the atlas"), REGION_FIXTURES.md (the Great Plains section and the interaction grammar), WORLD_MAP.md (sections 1 to 6), WORLD_LORE.md, ASSET_GUIDE.md, ROADMAP.md (Delivery contract, Code orientation, Verification and completion, the 2026-11-06 records), PACIFIC_NORTHWEST.md (for the terrain, weather and streaming patterns you will reuse). Run git status, git log and git remote -v first. If the workspace is a plain folder without Git metadata, say so and mark all work local-only.

Where documents disagree, the user's current instructions win, then AGENTS.md non-negotiables, then MOOD.md, then WORLD_MAP.md, then REGION_FIXTURES.md. Record any disagreement you resolve.

======================================================================
2. HARD RULES (non-negotiable; they apply to every line you add)
======================================================================
- One player, one coupe. NO people, figures, traffic, other vehicles, moving lights, lit trains, animals-for-effect, music, campfires, or recent human activity. Every note, label and mark is OLD and faded.
- Ship ONE self-contained index.html. Inline everything. Zero runtime network requests. Must work double-clicked from file://. No build step, no package install, no asset preparation to play. Preserve the bundled Three.js and its license notice at the end of the script. There is no global THREE and no GLTFLoader: locate the bundled classes by structure.
- Keep the painterly, non-voxel direction. Continuous terrain, no cube-grid ground, no integer terrain heights, no box-shaped mesas.
- No mandatory camera sway or theatrical effects. Idle framing stays still. Close-look "lean in while held" is allowed and returns on release.
- Keep the one-way dusk to night behaviour and the existing 48-minute world clock exactly as they are. Do not change the clock model. If you believe the clock conflicts with the Plains mood, report it; do not edit it.
- The game already contains a car radio, a motel radio and a diner jukebox with audio code. Do not add any new music or radio content. The only new "broadcast" sound allowed is the hung drive-in speaker carrying filtered field wind (section 9).
- Improve silhouette, composition, palette and light before density, bloom or particle counts. Do not substitute draw-call or instance counts for frame-time evidence.
- Do not claim projected gains, visual approval or performance you did not measure. Implementation and verified acceptance are separate facts. Record anything you could not check as pending.
- Git: commit AND push each finished change (the user's standing rule), end commit messages with the attribution line the harness gives you, and for any index.html change update ROADMAP.md (status and validation record) in the SAME commit. After pushing, verify the remote index.html at the resulting commit and test the player-facing action in that exact file before saying it is on the playable branch. In the handoff name the branch and commit, link the playable file, and give exact steps to reach the new content.

======================================================================
3. WHAT THE CODE ALREADY DOES (facts to build on; re-verify by structure)
======================================================================
Coordinates. World units are metres. East is +x. Sunset Service is x = 0. Starlite Diner is x = +4600 (dinerX). Cinder Court is x = -4600 (motelX). The SR 14 fork is x = -9600 (forkX). The highway is z = 0 at y = 0 for all x >= -9540. WORLD_MAP's trunk coordinate is T in km, so T +46 is x = 46000 and T +84 is x = 84000. The route-distance helper s = motelX - x for x >= forkX (so east stops have NEGATIVE s; Starlite is s = -9200). Use that convention for every new stop.

Terrain. A single height function (os(x, z, forTerrainMesh)) drives the moving terrain patch (recenterDesert, desertGeometry, desertCoords, visibleDesertHeight) and every collision and placement query. For x >= -9540 it currently returns low desert dunes blended to 0 near the road and forecourts, forever eastward. There is a forecourt array of [x0, z0, x1, z1, ...] flat pads for the three stops, with a nearerRectDistance blend. Roads are painted by a world-space shader (desertMaterial.onBeforeCompile) and surfaces are classified by carSurfaceAt (asphalt, shoulder, drift, sand) and footSurface; there is also highwaySandDrift. Anything you change in os() changes the ground under the road, the coupe, the walker, the telephone poles and every placed object, so keep it deterministic, seam-free and cheap.

Climate. Climate is read from POSITION, never from distance travelled: routeS = nwSFromX(x); wetRegion = nwH(routeS, 9600, 15800); nwBiome from forkX; nwH(s, s0, s1) is a smoothstep. A separate 24-hour-periodic weather timeline (weatherHour, weatherSwing) feeds nwCloud, rainFactor, gloom, terrainWetnessUniform, the sky shader uniforms (uNight, uDay, uOvercast, uForestSkyline), Nt.fog colour, near, far, the sun and hemisphere lights, and foliage lift. East of Starlite every one of those wet terms is already zero. Your Plains terms must follow the same pattern: a position-driven field, blended over several kilometres, plus the same timeline for weather.

Sky. The sky is one shader (Xm.material). Mountain ridges are angular periodic silhouettes (far, mid, near) scaled by uniforms; sun, moon, stars, haze band, overcast and night mixes are all there. Stars are a point set that follows the camera.

Roads and objects. A continuous telephone line is an instanced batch recentred on the camera (telephoneLine, updateTelephoneLine, poleWorldZ), with nine reused AABB colliders. Mileposts are streamed (updateMileposts). Forest and the NW scenery stream in cells (updateForestPool, forestCellTrees, forestNear/Far/Under, setForestInstance, setForestTint). Collision is the AABB registry (Mc, Dt, vc). Interaction uses installGesture, findInteractionTarget, playInteractionSound, the inspection/gesture animation helpers and a named HUD. Audio is procedural WebAudio in one audio object (wind, hum, ticks, insects, river, rain), with per-surface footstep and tyre sounds.

Route data. ROUTE_CATALOG holds desert (Cinder Court, Sunset, Starlite) and northwest (fork, pass, bridge, pullouts, Fern Bend) entries, with id, name, route, x, z, s, mileLabel, map coordinates, signLines. It is the single source for signs, the glovebox map (buildRoadMap), the trip card (travelStopList, travelCost, travelPlaceCoupe, confirmTravel) and the dev warp. Period labels (for example "18 MI") are separate from simulated distance on purpose.

World exports. document.getElementById("app")._game exposes helpers (Nt, Nn, coupe, os, nwSFromX, carSurfaceAt, updateTelephoneLine, and more) for testing.

Before editing, find every one of these by its structure and confirm it still matches. If a name changed, use the structure, not the name.

======================================================================
4. WHERE EVERYTHING GOES (world layout, in metres along the road)
======================================================================
Keep the highway at z = 0, y near 0 with gentle vertical curves only (never steeper than 2 percent). Keep US 66 straight; one very slight kink at the western hinge is allowed. Put all set pieces and the destination on either side as listed. Negative z is the side where the existing stops sit; put the drive-in there too for consistency.

Placeholder rule (WORLD_MAP section 4, "Reserved ground"): T +4.6 to +46 is NOT being built here. Do not shorten it. Fill x = 4600..46000 with a plain, explicitly marked steppe stand-in (a constant in code named PLACEHOLDER_STEPPE, documented in ROADMAP) that ramps the desert dunes to low straw grass and rolling swells. The distances, mileposts, glovebox map and trip card depend on the final numbers. Also continue the Plains character, as placeholder, to x = 102000 so the road never ends or turns around. No finish gate, no automatic turnaround, no fuel stranding.

Hinge (west end, x about 42000 to 49000). The road never crosses a region edge on a straight open run. Cover the handoff with a low rise (about 10 to 14 m over 2.5 km, a long crest, not a hill) and a long descent on the far side that opens a full 180 degree horizon, with the mountain silhouettes dropping behind you. Overlap ground colour, grass density, fog far, sound bed and sky horizon change across 4 to 6 km. Test it driving east and driving west, and by arriving from the dev warp.

East end (x about 80000 onward). Continue the straw plain as placeholder. Do not print or build the SR 61 spur (T +72) or the farm belt. If you want a hint of what is coming, fence lines may grow slightly tighter after T +84; nothing else.

Suggested positions (tune by eye, keep every coordinate in one named table, PLAINS_LAYOUT, so the map, signs and trip card read the same numbers):
- Silo (concrete, unlit): x 47600, z +70.
- Grain elevator (unlit) beside a dead siding: elevator x 52400, z -70. The siding is a ballast bed about 600 m long, parallel to the road, z -42 to -38, with the rails removed and ties half-buried. NO rails to run on, no boxcars, no train of any kind (the train idea is pinned and out of scope).
- Water tower: x 53100, z +210, name half washed away.
- Hay stacks: x 55200, z -35 and z +60.
- Windmill with stock tank: x 57000, z +95.
- Shelterbelts (long tree rows, 15 to 25 m tall, rounded broadleaf crowns): x 58000 to 59600 at z -300, and x 66500 to 68500 at z +260.
- Mailbox row (three boxes on a post, flags rusted up): x 61000, z +6.2 on the shoulder edge, with a short gravel pad.
- Harvest Moon Drive-In: centre x 64600, on the negative-z side. See section 7.
- Fence line: continuous along both sides of the road for the whole Plains, 14 to 16 m off the centreline, posts every 4 m, four strands, with gates (open or hanging) every 1.5 to 3 km. Fences stop walkers but never block a road, a gate gap or a shoulder pullout. Gates give the on-foot player a way in.
- Telephone line: continues along the road for the whole region (it already does), shrinking in perfect ranks; add a few leaning poles and slack spans as seeded variation, still using the existing batch.
- Mileposts: continue the existing post logic; confirm they read correctly east of Starlite.

======================================================================
5. THE LAND: TERRAIN, GROUND AND GRASS
======================================================================
Terrain. Add a Plains branch to os() for x above the placeholder start. It must:
- Be a long, soft, rolling surface: amplitude 0.6 to 4 m, wavelengths 300 to 1800 m, two or three octaves of existing noise helpers (Hm, ao), no sharp features. Gentle swales that could carry a dry creek, with 2 or 3 shallow washes crossed by the road on low culverts (a small stone-faced concrete culvert head with a painted mile mark is a set piece).
- Flatten under the road with the same blend pattern as the forecourts (xc(min(d/20,1))), keep the shoulder and verge natural and soft-edged, and keep the road level enough that the coupe never bounces.
- Add flat pads for the drive-in (new array, plainsPads, same [x0, z0, x1, z1] format as forecourt, and combine them in the same nearerRectDistance loop), and for the siding, tank and mailbox pad.
- Be cheap: os() is called for terrain vertices, collisions, placements and every pole. Do not add loops per call beyond what the forecourt loop already does.
- Be continuous at the placeholder boundary and at every terrain recentre boundary (recenterDesert shifts its origin as the player moves). Check across boundaries by driving, not only by teleporting.

Ground look. The ground is the road's largest neighbour; do most of the Plains with the terrain shader and a few cheap instanced layers, not geometry:
- Ground palette starting points (tune in context): straw #b8a56a, green-gold #8c9a52, olive shadow #4d5530, dry road verge #9b8f6c, dusk-lit straw #c79a57. Mix by a low-frequency field plus a position-driven "wet to dry" patch field. Add subtle lighter and darker long streaks that follow the wind (see the gust field below).
- Grass tufts: one instanced tuft mesh (cross-quads or a few thin triangles, vertex-painted base dark to tip light) in a near ring (about 60 to 90 m) at higher density, a cheaper mid ring to about 220 m, and the shader alone beyond. Stable cell-based seeded placement so a U-turn restores the same field (copy the cell approach of updateForestPool; do not use time-based randomness). Keep a clean margin on the road, shoulders and every walking path.
- Road surface on the Plains: same asphalt with sun-bleached patching, pale seams, sand-and-seed drift at the edges, and longer sight lines of worn paint. Add a Plains 'grass' surface class so the walker's footsteps and the coupe's shoulder behaviour (drag, tyre sound, dust) differ from sand. Find every use of the surface strings (carSurfaceAt, footSurface, currentSurface, the audio and dust code) and extend them consistently; do not leave a case unhandled.
- Dust: light, pale, short-lived, and only from the shoulder and gravel. No dust trails on asphalt.

The wind field. Define ONE gust field G(x, z, t) in [0, 1]: a travelling wave of wavelength about 350 to 500 m moving about 12 to 16 m/s across the plain, with slow low-frequency noise on its phase so it never looks periodic. Use the SAME field for: the ground-shader streaks, the tuft sway, the windmill speed, the flag rags, the swing chains, the telephone wire sway (tiny), and the wind AUDIO. Sample the audio gust at the player position but advance it so the visible wave is seen 1 to 3 seconds BEFORE the sound arrives. The player should see the wind coming across the field and then hear it pass. This is the Plains' signature.

======================================================================
6. THE SKY AND THE WEATHER
======================================================================
The sky is the main character. Give it more of the frame than any other region.

Horizon and composition. Lower the horizon in the player's eye by making the Plains terrain read as nearly flat, and by adding a Plains uniform to the sky shader (uPlains, 0 to 1, driven by the position field) that scales the mountain ridge silhouettes toward almost nothing, leaving at most a very low, very soft swell line and the haze band. Preserve the continuous distant-mountain backdrop rule everywhere else.

Dusk colour. Longer and slower than the desert: gold, then rose, then lavender, then a deep blue with a faint green edge near the ground. The warm horizon must persist long enough that the red neon looks like a small coal held in an open hand. Keep stars gated out of orange dusk (no stars while the horizon is orange). At night, a larger dark sky with a denser field is welcome if the star budget allows; do not add points if the budget does not.

The distant storm. A storm is always on the rim and never arrives.
- Implement it in the sky shader as a cumulonimbus silhouette (anvil top, flat base) at a fixed azimuth that drifts very slowly with the 24-hour weather timeline (about 20 degrees across a world day), low in the sky, never above about 25 degrees elevation.
- It catches light from below the horizon after the ground is dark: its top and anvil glow in the afterlight, warm gold fading to rose to cold violet, while the land is already blue. This is the "the day is over for you, not for the sky" image.
- Heat lightning: silent, rare, soft. At most one pulse per 60 to 120 seconds on average (seeded by the weather timeline, not frame time), a 0.10 to 0.20 s fade in and 0.5 to 0.9 s fade out, lighting the cloud interior and a small patch of sky and faintly the screen face at the drive-in. NO thunder, no rumble, no flash on the whole screen, no camera effect, no rain at the player. It is hidden when overcast is high.
- Storm strength follows the weather timeline: absent on some days and present on others, so some evenings are clear.

Daytime and dawn. Day is warm, hazy and bleached with tall fair-weather cumulus; shadows are long and soft at the ends of the day. Dawn is cold grey, with thin ground mist lying only in the swales and low ground (reuse the mist-bank system with Plains parameters: low, thin, seeded to the cell, only at dawn and blue hour, never opaque). The road and lane edges stay readable in the haziest setting.

Fog and light. Targets from WORLD_MAP section 5: fog far about 2000 m in clear conditions and about 1500 m overcast. Do not run the NW "gloom" curve in the Plains; gloom would dim the light and shorten fog. Add a separate plainsHaze term for warm dusk haze. Keep overcast low (below 0.3) so the sky stays large and colourful. Keep terrainWetnessUniform at 0 in the Plains (no puddles, no wet road). No rain, no drizzle, no fog banks other than the dawn swale mist.

Interior and shelter. Under roofs and inside buildings the wind bed softens and the gust is muffled. Reuse the shelter logic that already muffles wind under the station canopy and inside the offices.

======================================================================
7. THE DESTINATION: HARVEST MOON DRIVE-IN
======================================================================
Name and look. Harvest Moon Drive-In. Period 1950s drive-in, closed for the season. Layout (dimensions are starting points; verify with ASSET_GUIDE.md rules for close-view models):
- Roadside pylon sign at x 64570, z -14: a 9 m steel pylon with a cabinet and a crescent-moon outline in thin red neon and the words HARVEST MOON in a script in red tube, with a smaller cyan accent kept restrained. This is the ONE lit sign. It has the same three rhythms as the other stops: it hums, the tube can falter briefly, and the electrical tick is tied to the dip. Its hum is directional and audible only near the lot. It must be visible as a point of red colour from at least 4 km out in clear dusk (see "the red coal" below).
- Entrance apron on the negative-z side: two lanes joined to the highway with the same pad blend as the other stops, a gravel entrance loop, and room to U-turn and rejoin in either direction.
- Ticket booth: 2.0 x 2.4 x 2.6 m, a window and a slot, at x 64600, z -34. A roll of tickets, a cash drawer.
- Screen: 22 m wide, 14 m tall, back toward the highway (as real drive-ins did), a timber truss back with a catwalk, white-painted panel face toward the field. Centre x 64620, z -62. The face is revealed only when the player walks around to the field. Add very faint panel seams, a weathered edge, and a tint that picks up the sky.
- Field: nine arced rows of low earth mounds (0.3 to 1.1 m high, so cars tilt toward the screen) between z -70 and -200, with about 70 speaker posts. Posts are instanced; each post carries a hung speaker box that the player can lift (section 8). The grass is trampled flat in rows but green-gold in the lines between. Provide walking and driving access; the coupe must be able to drive onto a row and park nose to the screen.
- Concession and projection building: cinder block, 12 x 7 x 4 m, at x 64600, z -135, a sliding window, a counter, a popcorn kettle, a soda fountain, a projection booth behind with a dark projector. ONE low warm lamp may be lit behind the concession window (like the other stops' single warm window), switchable by the player, on by default at dusk.
- Playground: a three-swing set and a slide under the screen, at x 64650, z -75.
- Marquee: a board sign at the entrance with an old letter board reading THANKS FOR A GREAT SEASON, some letters sun-bleached and a few fallen. It is not lit.
- Restrooms: a small cinder block building, dark and locked. Decorative.
- Everything must be in painted, faded enamel, dusty glass, oxidised metal and desaturated block, consistent with Sunset's materials. Add old repairs, a replaced letter, a shim, a worn threshold: the "traces of care" in MOOD.md. At least three characteristic wear patterns (ticket booth sill, concession counter edge, the swing seats).

Light and composition. At dusk the player's first view of the drive-in is a red point on a pale-gold horizon. Approaching, the point resolves into a pylon and a crescent, a low roofline, and the black back of the screen against the afterglow. The concession lamp is the warm pool. The field beyond is dark. Respect the loneliness budget (section 12).

The red coal (visible distance). The fog far is about 2000 m but the sign must be seen from 4 km and linger in the rear-view mirror for 3 to 5 km. Implement a small unfogged emissive sprite or point (fog off, depth write off) attached to the sign, brightness fading with distance from full at 300 m to a faint ember at 5 km and gone at 6 km, with a very gentle shimmer of heat on warm evenings (an attenuation modulated by the gust, not a flicker). Check how the existing GAS sign, Cinder Court sign and Starlite sign are seen at 4.6 km and follow the same method if there is one. It must work in both directions of travel, in the coupe mirror, and from the road shoulder. Verify it never reads as a flashing beacon or lighthouse.

======================================================================
8. SET PIECES AND INTERACTABLES (follow REGION_FIXTURES.md; implement in this order)
======================================================================
Set pieces (passed, not entered; their exteriors may have a single open threshold): the silo, elevator, water tower, dead siding, windmill and tank, shelterbelts, fence line, mailbox row, hay stacks, culvert heads, concrete silo base, the dead-siding ballast. They are what make the road worth driving. Batch by spatial region. Build custom silhouettes: the elevator as a tall concrete or timber crib with a head house, a walkway gallery, and a boom; the water tower as a tank on four legs with cross-bracing and a half-washed name; the windmill as a lattice tower with a vane and a slow multi-blade wheel; hay stacks as round bales with weathered tarps. Close-view models follow ASSET_GUIDE.md.

Interactables (use the existing input and HUD conventions: E or click, named HUD, local, reversible, sound first, no puzzle, no collectible, one carried item at most):
Tier 1 (signature, build and polish first):
1. Speaker on a post. Lift it and hang it on the coupe's window. The speaker carries ONLY the thin filtered sound of the field (the live gust field through a narrow band-pass and a small-speaker curve), no music. Reuse the vent-window or door-side hook if there is one; otherwise define the attachment point on the driver's door glass. Hang or return it with the same action.
2. The marquee (read-only look).
3. The concession lamp switch.
4. The swing: push it; chains creak; it keeps swinging with the gust field.
5. The silent screen glow: standing in the field at night, a rare heat-lightning pulse lights the screen face for under a second.
Tier 2: ticket roll and cash drawer; popcorn kettle lid; soda taps (dry cough of air); film cans in the booth; the concession shutter; mound row walk; the windmill brake lever (hold to slow the vane); the mailbox door (a crumbling catalogue and a county newsletter, years old); the stock tank edge (lean in and look at the green rim).
Tier 3 (only if time): hay-bale lean, siding ballast crouch, fence gate.
Do NOT implement the projector (a lit blank screen). It is flagged as an owner decision in REGION_FIXTURES.md. Add a named constant PLAINS_PROJECTOR = false and leave a documented hook so it can be turned on later. Do not implement fireflies on the Plains. Do not add a church, a bell, trains, boxcars or a gas station.

======================================================================
9. SOUND (procedural WebAudio, in the existing audio object; no samples)
======================================================================
Beds and signature.
- Wind in grass: band-limited noise (about 500 to 2400 Hz, Q low) modulated by the gust field G with the 1 to 3 s visual lead, plus a faint low body. It rises and falls in long waves. This replaces the desert's rock-and-sand wind inside the Plains by crossfading with the position field over the hinge.
- Crickets: a sparse bed built from the existing insect voice but denser and more regular than the desert's, only at dusk and night, with long quiet gaps. They stop completely within about 120 m of the drive-in sign hum (as if the field were listening) and resume slowly, one at a time, after you leave. They are quieter in the coupe and indoors.
- Fence wire tick: an irregular soft tick, rare, near fences only.
- Loose tin sheet: one very rare knock from a shed, no more than about once per four minutes, directional.
- Heat lightning: NO sound at all. The silence is the point.
- Telephone wire: a faint thrum when the gust passes under a pole (very low level).
- Drive-in sign hum: directional, shared with the sign's dip; transformer ticks near the base.
- Speaker on a post: field wind through a small-speaker filter (narrow band, slightly nasal), level tied to the gust.
- Footsteps and tyres: a new grass surface (soft swish), gravel (hard crunch), mound (dull), screen platform boards.
- Coupe: the existing engine, tyre and wind code carries over; check that the speed wind and tyre noise on the plain's wide asphalt and the new grass shoulder are plausible.
Event-rate cap: no discrete sound event more often than once per 40 s on average, apart from the continuous beds. Keep mute, unlock, tab hiding and re-entry working.

======================================================================
10. CONNECTING IT: ROUTE CATALOG, MAP, SIGNS, TRIP CARD, WARP
======================================================================
Treat the map as part of the road. A playable stop that ships without its map entry, sign, trip-card row and mileage trace is not done.

Route catalog. Add a plains array to ROUTE_CATALOG with entries for the drive-in (id harvest_moon, name HARVEST MOON, fullName Harvest Moon Drive-In, route US 66, kind stop, x 64600, z -14 or the entrance centre, s = motelX - x, mileLabel from the period rule below) and for each named landmark you want on the map and the trip card (grain elevator, water tower, windmill, mailbox row; kind landmark). Keep period labels separate from simulated distance. Period label rule: mileLabel = 18 + round((T - 4.6) / 1.609) where T is km east of Sunset. Add map coordinates for the new panel.

Signs. Add a roadside distance sign at Starlite ("HARVEST MOON DRIVE-IN  38 MI" or the period equivalent) readable heading east, and an advance sign about 1.5 km before the entrance. Do NOT print the SR 61 junction or any other turnoff that does not exist. Every printed turnoff must exist and be drivable.

Glovebox map (buildRoadMap). It currently draws the three desert stops from hard-coded labels. Extend it by a panel, not by zooming: a US 66 EAST panel with Starlite as the shared reference point, the plains landmarks, the drive-in, the mileposts range and a continuation arrow where the highway leaves the printed panel. Read it under the cabin lamp for legibility. Do not add a live location marker.

Mileage trace. Add a faded line at Starlite's counter or board naming the drive-in with its period mileage, readable only at reading distance, so each stop's strip names the next. Do not edit Sunset's strip unless it already lists east stops.

Trip card and dev warp. travelStopList builds from the catalog. Confirm the drive-in and landmarks appear, sorted correctly, with correct miles, minutes and arrival clock. travelCost uses TRAVEL_SPEED 22.4 m/s and 0.009 tank per mile; a trip from Starlite to the drive-in is about 60 km and must be affordable on a tank. travelPlaceCoupe places the coupe in the westbound lane just east of a stop; confirm this works for x > forkX and for the drive-in's entrance. Add dev warp stops at the hinge and mid-Plains.

Precision. At x = 84000 single-precision matrices quantise to about 8 mm; WORLD_MAP flags shimmer beyond about 100 km. Test for vertex shimmer, shadow jitter and camera/UI jitter at x = 46000, 64600 and 84000 and record the result. If shimmer appears, report it with measurements. Do not add a rebase unless needed; if you do, do it while parked and keep one coordinate system.

======================================================================
11. PERFORMANCE AND STREAMING
======================================================================
Target steady 60 fps on a named mid-range laptop. Record the hardware, viewport, pixel ratio, and median and p95 frame times. Measure on the Plains road at speed, at the drive-in, and while crossing every streaming boundary, and compare with the same views at Sunset. Watch spikes at cell changes.
Budget guidance (starting points; measure): near grass tufts under about 9,000 instances, mid ring under about 6,000; fence posts instanced; shelterbelt trees use the existing forest near/far meshes with one new broadleaf species (wide rounded crown, cottonwood-like); under about 12 new draw calls over the Sunset baseline; no per-frame allocations; no per-frame os() loops beyond placement refresh. Place by seeded cell id so a U-turn restores the same roadside; recycle distant cells in both directions. Do not keep the whole 84 km world resident.

======================================================================
12. THE MOOD ACCEPTANCE (the loneliness budget)
======================================================================
Treat these as measurable checks, in the ROADMAP record.
- Approach order: colour at a distance, then silhouette, then sound (the sign hum), then detail. Leaving reverses it; the red coal is still visible in the mirror for 3 to 5 km.
- Warm lights: at most TWO lit warm things in any frame on the Plains (the pylon sign, the concession lamp). No other lights anywhere.
- Dark stretch: at least 8 km of unlit road between the Starlite diner's lights and the drive-in's sign.
- Sound event cap: see section 9.
- Silence check: stand still two minutes in the open on the Plains and two minutes at the drive-in; list what you hear and when.
- Wind sync: the player sees each gust cross the field before hearing it.
- No spectacle: no storm approaching, no flash across the whole screen, no thunder, no particle clouds, no bloom increase to compensate.
- Doorway: stand at the concession window at blue hour; the wind drops and the lamp is the only warmth; the field beyond is dark. The feeling should be wanting to stay.
Compare matched views at fresh entry, about two minutes and five minutes, and at dawn and noon, at the same pose, viewport and pixel ratio.

======================================================================
13. WORK PLAN (milestones; each ends with a commit, a push, and a roadmap record)
======================================================================
If a team works, ONE integrator owns index.html and shared materials. Specialists return bounded builders or mesh data with dimensions, material roles, collision bounds and provenance; do not overwrite the bundle concurrently. If you work alone, take the milestones in order.
P0  Baseline. Capture matched views of Sunset, Starlite and the SR 14 fork at dusk, blue hour and night. Record frame times. This is the regression baseline. Check the current east of Starlite: terrain, road, poles, mileposts, trip card.
P1  Land and hinge. Placeholder steppe T 4.6 to 46, the hinge, the Plains terrain branch, ground shader, road and surface classes, fences, poles, mileposts, collision. Accept: drive 40 km each way with no seam, no pops, no coupe bounce.
P2  Sky and weather. uPlains, flat horizon, dusk palette, storm silhouette, silent heat lightning, dawn swale mist, fog and haze. Accept: matched dusk, blue hour, night, dawn and noon captures from the road.
P3  Wind field and grass. The gust field, tufts, sway, windmill, rags. Accept: gusts visibly cross the field and the audio arrives after.
P4  Set pieces. Elevator, water tower, siding, windmill and tank, shelterbelts, mailbox row, hay, silo, culverts. Accept: silhouettes read at 3 km, 300 m and arm's length.
P5  Destination. Drive-in exterior, sign, apron, entrance, screen, field, concession, ticket booth, playground, marquee, the red coal. Accept: approach sequence and leaving sequence both directions.
P6  Interactables and sound. Tier 1, then Tier 2. Accept: every action has sound, a name and a reversible state.
P7  Connection. Catalog, signs, glovebox map panel, mileage trace, trip card, dev warp. Accept: every printed place exists and is drivable; every public place appears on the map; mileposts agree.
P8  Verification and handoff. The full list in section 14, then docs.

======================================================================
14. VERIFICATION (follow ROADMAP.md "Verification and completion", plus these)
======================================================================
1. Extract every inline script and run node --check.
2. Inspect external resource attributes, CSS URLs, dynamic imports, fetch, XHR, WebSocket, Worker calls and URL literals. Do not remove the license. A grep alone does not prove offline operation.
3. Open the actual delivered index.html from file:// with networking offline. Verify rendering, no asset requests, no application or shader errors.
4. Drive the whole Plains (T +46 to +84) east and then west. Check every streaming boundary, the hinge, the placeholder boundary and every terrain recentre boundary by driving, not only by warping.
5. Enter, exit and re-enter pointer lock; WASD, run, jump; walls, fences, gates, the screen platform, the booth, the concession door; resize.
6. Park on a mound row, hang a speaker, switch the lamp, swing, read the marquee, return.
7. U-turn at the drive-in and rejoin in either direction. Leave on foot and drive back from far away; check that state (speaker hung or returned, lamp, swing) persists for the session.
8. Check the SR 14 fork, Cinder Court, Sunset and Starlite against the P0 baseline for regressions, including the coupe, glovebox map, trip card, rest actions and clock.
9. Audio: listen on headphones and laptop speakers; check mute, tab hiding and re-entry; check shelter transitions at the concession window; check cricket suppression near the sign; check the visible-gust lead.
10. Precision at x 46000, 64600 and 84000 (shimmer, shadows).
11. Performance, as in section 11.
12. Mood acceptance, as in section 12.
If any check cannot run, record exactly what remains unverified and leave acceptance open. A concept image is not a game screenshot; static code inspection is not visual approval.

======================================================================
15. DOCUMENTS TO UPDATE IN THE SAME COMMITS
======================================================================
ROADMAP.md (status, validation record, evidence or pending reasons), WORLD_MAP.md (mark the Plains and the placeholder as built or partially built, with the drive-in's final coordinates), MOOD.md (the Plains region card), REGION_FIXTURES.md (which fixtures are implemented, which are not, any rename), and the ROUTE_CATALOG comments. Do not create new planning documents.

======================================================================
16. OUT OF SCOPE (do not build)
======================================================================
A train, rails, boxcars, a train station, SR 61 or the Gulf, the farm belt, the painted mesa, the Divide, snow, any church or bell, any gas station or fuel stop, fireflies, a projector beam, rain or drizzle on the Plains, a thunderclap, people, animals, other vehicles, music, a new objective, a score or collectible, a minimap, a live location marker.

======================================================================
17. OPEN DECISIONS, AND THE DEFAULTS YOU SHOULD USE
======================================================================
- Name: use Harvest Moon Drive-In. (If the owner prefers another, change the constants in one place.)
- Projector: off (PLAINS_PROJECTOR = false).
- Speaker field sound: implement it.
- Set pieces versus WORLD_LORE's "one visitable place per region": set pieces are not destinations. Do not give them interiors.
- Fuel: no station; check the trip card fuel math and report if the Plains need one.
- Lit things: pylon sign plus one concession lamp.
If you find a conflict you cannot resolve with these defaults, stop at that point, record the question in ROADMAP.md, and continue with independent work.

======================================================================
18. FINISH WITH
======================================================================
The implemented changes; the real evidence (captures, frame times with hardware, viewport and pixel ratio, audio notes); anything pending and why; the branch and commit; a link to the playable index.html on the branch; the exact steps to reach the new content (drive east from Starlite for about 60 km, or use the trip card to travel to Harvest Moon Drive-In, or the backtick dev warp); and the next unfinished milestone. The deliverable is improved game code and assets, not documentation alone.
````

## Notes for the person launching this

- **Why it is long.** The prompt names the real code hooks (`os()`, `ROUTE_CATALOG`, `travelStopList`, `buildRoadMap`, the climate and sky uniforms) so the agent edits the right places instead of inventing parallel systems. Those facts come from a read of `index.html` at `27ce93d`; the agent is told to re-check them by structure.
- **One finding worth knowing.** East of Starlite the terrain function currently returns the same low desert dunes forever. The Plains therefore need a new branch in the terrain height function, a Plains uniform in the sky shader, and a new `plains` entry group in the route catalog. They are not an add-on to something that already exists.
- **Contradiction to be aware of.** AGENTS.md says "no music", but the game already has a car radio, motel radio and diner jukebox. The prompt tells the agent not to add any new music and to leave the existing ones alone.
- **Defaults chosen for you** (all listed in the prompt's section 17): the name Harvest Moon Drive-In, no projector, no fireflies, no gas station, speaker plays filtered field wind only, pylon sign plus one concession lamp as the only lights.
