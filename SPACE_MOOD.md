# Space mood — the saucer and the Drift Outpost

This file is the mood card for the space layer of Neon Gas, the way [MOOD.md](MOOD.md) is for the highway regions. It sits under MOOD.md's shared grammar and next to [AESTHETIC.md](AESTHETIC.md) (light and palette) and [AMBIENCE.md](AMBIENCE.md) (sound). [ROADMAP.md](ROADMAP.md) holds status and validation. Everything here is a design proposal until a roadmap entry says otherwise.

**Status (2026-11-08):** S1 saucer polish, S4 space sky and S6 reachability are implemented and verified in index.html (see the 2026-11-08d record in [ROADMAP.md](ROADMAP.md)). Drift Outpost overhaul: **Milestone O0 (baseline & budgets) and O1 (strip skeleton, street deck, props & warps) implemented and verified** (see 2026-11-08f/g records). Locked budgets: spGroup ≤ 140,000 triangles, hero ≤ 12,000 triangles, draw calls ≤ 450, lights strictly constant (12 point, 2 spot), texture memory ≤ 24 MB. Milestones O2–O8 in progress. The saucer, cabin, sound drone, chart and fast travel stay as built.

The space layer is a **user-requested exception** (see AGENTS.md): a hidden saucer in the desert, a climb out of the atmosphere, and an asteroid outpost. The ground game is untouched. This file keeps the exception coherent with the rest of the game instead of becoming a second, louder game, with one deliberate change: **the outpost is now allowed to be loud, colourful, inhabited and funny.** Everything else in space stays calm.

## The feeling

Two moods, one trip, and the contrast is the point.

**The cabin and the open dark** are the highway seen from inside a warm room: a small cabin, a dashboard glowing like a radio, and outside the glass the largest dark there is. That is unchanged. You are not escaping the loneliness of the road; you are taking it somewhere with better stars.

**The Drift Outpost** is the opposite: after all that dark, you find the one party for five kilometres. A roadside strip at the end of the universe, 1960s space-age Americana (Googie boomerang roofs, starbursts, sputnik lamps, a giant gumball machine, a sign for everything) run by a handful of oddballs who are not human and do not say a word. It is not a ghost town and not a theme park. It is a place that is *open*: the pumps are on, the laundromat is spinning, something is cooking, a moth is asleep on the desk, and somebody left a rocket for sale with a price on it.

The emotional key for the outpost is **warm, daft and a little bit tender**: Route 66 by way of Futurama and Hitchhiker's Guide, shot as a pinball machine on the horizon. The player arrives from silence into colour, wanders, finds a new joke at every corner, and can leave again into the dark. Humour comes from objects and small creatures, never from text walls or voices.

The player should still be able to put the cabin lamp out and just sit in the dark first. Then, from there, the outpost glowing in the glass should make them want to go and see.

## Mood card

| Field | Cabin and open space | Drift Outpost |
| --- | --- | --- |
| **Emotional key** | Cosy solitude at the edge of everything | Warm, daft, a little tender: the only party for 5 km |
| **Exposure** | Total outside, shelter inside: the glass is the only wall | Open deck under a huge sky; shelter under canopies, awnings and a dome |
| **Temperature feel** | Cold outside, the cabin a warm pocket | Warm: neon, steam, string lights, warm windows against cold sky |
| **Sound floor** | A low alien drone; nothing outside | A low transformer hum, soft neon buzz, laundromat thump, bubbling, a creature pip now and then; **no music, no voices** |
| **Silence means** | Vacuum plus intention | Not vacuum: the strip is quiet like a place at 3 am that is still open |
| **Light and palette** | Deep blue-black, nebula violet and teal low, one amber cabin lamp | Googie neon on matte pastel: flamingo pink, turquoise, tangerine, mustard, mint, violet; see Colour |
| **Distance between warm lights** | Enormous | Short on the strip (10–30 m): one glow overlaps the next |
| **Trace type** | Cabin wear: leather polish, worn switch, mug ring | Hand-mended and re-lettered: taped hose, re-priced menu, patched sign, a towel line, a rocket with a sold sticker |
| **How distance fades detail** | Nothing fades; size alone says how far | Colour and silhouette read at 5 km, signs at 150 m, props at 30 m, texture at 3 m |

## The shared grammar, applied

MOOD.md's eight rules still hold in the cabin and open space. At the outpost they are applied like this:

1. **One warm pool in a large dark, then a cluster of them.** From 5 km the outpost is a handful of coloured points. From 1 km it is a glowing street with one tall landmark (the Drift Inn beacon). Up close each building owns a pool of coloured light.
2. **Approach in a fixed order.** Colour first, silhouette second, sound third, detail last. Life is the last reveal: nothing moves until you are within about 150 m. The marker or chart never replaces the colour stage.
3. **Traces of care.** Every building shows how it is kept going, and now also how it is *lived in* (towels, pots, stickers, a worn path).
4. **Non-human residents, no humans.** No people, ever. No other ships. The residents are a small cast of machines and creatures; see Life. They do not talk, fight, follow the player or demand attention.
5. **Quiet is a feature, not silence.** Events are sparse and soft. Beds are low. Nothing is shrill. No music, no voices.
6. **Stillness for the camera, motion for the world.** The camera never sways or shakes. The world is allowed to move, gently, in a budgeted way (see Motion budget).
7. **Time moves one way.** The world clock is unchanged. Space does not reset or pause it. The sky above the atmosphere is always night, with the sun fixed.
8. **Colour with hierarchy.** The outpost is far more colourful than the desert; it is kept legible by hierarchy, not by drabness: one hero, one landmark, one hue family per building, living things lit differently from machines. If a view reads as a rainbow instead of a pinball machine at thumbnail size, cut hue families before cutting size.

## The saucer: what to build and why

Brief from the user, 2026-11-08: the seats clipped through the glass; the model was low quality and unpleasant; the cabin was too colourful; it needs a real dashboard; the player must be able to turn the cabin lights on and off to enjoy the space atmosphere. These are implemented. The rules below remain acceptance checks for any cabin change.

### Cabin rules

- **Nothing may touch the glass.** The canopy is an ellipsoid with a known equation; every cabin object is checked against it with at least a 6 cm margin at all eight bounding-box corners. A failing check is a bug, not a polish item.
- **Palette: restrained and warm.** Graphite, brushed brass, tan leather, cream stitching, dark wool, one muted teal accent. No pink, no saturated red rug, no rainbow bulbs. Amber is the only warm light. Cyan is reserved for the engines and the outpost. (The outpost's loudness stops at the glass.)
- **A real dashboard.** A curved console in front of the pilot with instruments that read the actual state: speed, altitude, fuel, tier, heading to the outpost, a small chart screen. Brass-ringed dials, toggles, a lamp switch with a visible position. Instruments stay faintly visible when the cabin lamp is off.
- **Lights on and off.** **L** toggles the cabin lamp. Off means off: the lamp, the bulb string, the canopy glow and the exterior cabin glow all fade out over about 0.6 s. The dashboard keeps a dim instrument backlight. On by default.
- **Traces of care.** A polished seat edge, a worn switch, a ring where a mug stood, a strip of tape on the dash. No notes, no photographs of people.
- **Exterior quality.** Rounded, consistent hull curvature; fewer, better parts. Panel seams, one repair patch, matte metal that catches the cabin glow.

### Light budget

- One amber cabin lamp (point light), one dashboard glow, engine light only while thrusting. No magenta underglow.
- Ship lights are active only near the player (75 m parked, always while flying).
- **The scene's light count must stay constant** (the light pool from the 2026-11-08c freeze fix). Never add or remove a light at runtime; a changed light count recompiles every material and freezes the game for seconds.

## The outpost: Drift Outpost

A 520 m asteroid cut flat to a 236 m deck, beside the planet. Existing anchors that must keep working (warp targets, fuel, collision, audio, chart): runway 07/25 with its edge lights, the taxiway and the ship parking ring, the Orbit Gas pumps (refuelling), the Drift Inn bell, the mast, the crystal rim, the walkable plateau (colliders inside 200 m of the deck centre).

### Concept: the strip

The first build put three buildings 60 m apart on an empty disc. The overhaul turns the middle of the deck into **a strip with a main street**: eleven to thirteen places within about 140 m, close enough that every vantage shows four or five of them layered in depth, with the runway and the dark beyond as the "edge of town".

Design pillars, in priority order:

1. **A place, not a set of objects.** Streets, kerbs, crossings, lamp posts, planters, bins, bollards, painted bays, kerb-side signs. The ground tells you where to walk.
2. **Every building has a silhouette, a hue and a joke.** From 150 m, in silhouette, you can name it; from 30 m it makes you smile; from 3 m it has texture and a story.
3. **Life you can watch.** Things move, small and sparse. The player is a visitor, never a target.
4. **Colour by zone, hierarchy by rule.** See Colour.
5. **Quality over count.** Fewer, better models, finished to the standard below.

### Site plan (zones, not coordinates; the agent places within these)

| Zone | What lives there | Job |
| --- | --- | --- |
| **The Gate** (arrival end of the runway) | A starburst arch reading DRIFT OUTPOST · POP. 6 (the count changes), two sputnik lamp posts, a "WELCOME, DRIVE SLOWLY" sign for ships | First colour; the first joke; tells you where the strip starts |
| **Pump Court** | ORBIT GAS (existing hero), parking ring, air-and-water post, PUMPKIN the pump robot | The safe first stop; refuelling; hero light |
| **Main Street** | NOVA NOSH, SPIN CYCLE, THE EVENT HORIZON, ZORP'S USED ROCKETS | The busy middle; warm windows; overlapping glow |
| **The Plaza** | PLANET POP gumball machine, benches, a fountain of glowing liquid, hop-hop hangout | The landmark and the place to stand and watch |
| **The Quiet Side** | DRIFT INN with its beacon, towel line, bell, lobby window; the greenhouse dome | The tall silhouette; the tender end of the strip |
| **Back Lot and Rim** | Telescope deck, mini golf, mast, crystal garden, cable runs, a stacked pile of empty fuel drums, a rusted old sign | Reward for wandering; the "behind the scenes" |

### Building roster

Tier **A** are hero models (modelled to the Quality bar). Tier **B** are supporting models. Tier **C** are props. Build A first.

| # | Place | Tier | Silhouette | Hue family | The joke / the trace |
| --- | --- | --- | --- | --- | --- |
| 1 | **ORBIT GAS** (existing) | A | Googie boomerang canopy (replace the flat slab), tall pylon with the ring and a sputnik | Cyan hero, pink accent | Re-lettered sign, taped hose (keep). Pumps with real crowns, dials, nozzles and hose reels. Air post that says AIR · WATER · WARP (the last has a "OUT OF ORDER" hand-written tag) |
| 2 | **NOVA NOSH** (existing) | A | Chrome-trimmed food truck with a swooping awning and a rotating taco sign | Warm pink, amber | Cook creature in the window; steam; crossed-out prices (keep); a queue of two folding stools |
| 3 | **DRIFT INN** (existing) | A | Tall tower of stacked pods, beacon, now with clearly different pod colours, ladders and a rooftop sunbathing deck | Violet tower, each pod a different pastel | **Towel line** across pods (BRING A TOWEL); lobby window with the clerk; VACANCY neon that changes (see Life); worn bell |
| 4 | **SPIN CYCLE** laundromat | A | Low wide building with a wall of round porthole windows, a giant neon sock | Turquoise, tangerine | Each porthole shows tumbling coloured laundry (shader), one is empty and "OUT OF ORDER"; a lone sock on the pavement |
| 5 | **THE EVENT HORIZON** lounge | A | Round dome bar with a swirling black-hole disc above the door, martini-glass neon | Violet, mustard | The black hole is a shader that slowly swirls and bends a ring of lights; a tiny patio with stools and a candle |
| 6 | **PLANET POP** | A | A house-sized gumball machine whose glass globe holds dozens of little planets, on a red-and-cream stand | Candy mixed (this is the one place the palette is allowed to go loud) | Planets bob gently when you are near; a coin slot; a hop-hop sitting inside the exit chute |
| 7 | **ZORP'S USED ROCKETS** | A | A lot of four tin rockets on stilts with price tags, a trailer office, and an **inflatable tube-dancer** | Mustard, red, mint | The tube-dancer flails slowly (vertex shader). Prices change weekly: one is marked down with a SOLD sticker |
| 8 | **Greenhouse dome** (GERTRUDE'S) | B | Geodesic glass dome with glowing alien plants | Lime and mint (living colour) | Plants sway; spore lights drift; a small hand-painted FRESH AIR sign |
| 9 | **PAR SEC mini golf** | B | Three-hole course with a ringed-planet windmill | Pink, cyan, lime | The windmill turns slowly; a ball is stuck in a crater |
| 10 | **Observation deck** "SEE YOUR HOUSE" | B | A big brass telescope on a pedestal, coin box, bench | Brass, cream, pink | Aimed at Earth; the sign says 25¢ · NO REFUNDS ON CLOUDS |
| 11 | **Gate arch**, **sputnik lamp posts**, **mailboxes**, **bus stop with no bus** | B/C | Starburst arch; lamp posts with a small sphere and spikes | Pink, mustard | The bus stop timetable lists only "SOMETIME" |
| 12 | **Props** | C | Benches, bins, planters, crates, stacked drums, cable runs, cones, a vending ghost (keep), a tyre swing | Per zone | Placed in hand-made clusters, never on a grid |

Optional if the budgets hold after tier A and B: a **drive-in screen** looping an abstract shader; a **sky whale** (see Life).

### Colour

The outpost is the colourful place. The rules that keep it from turning into noise:

- **Deck is dark, the world is pastel and matte, the light is neon.** Walls and roofs are matte pastels (cream, mint, powder blue, salmon, mustard) lit warmly. Neon is trim, signs and windows, not walls.
- **Six hue families, with jobs.** Cyan = hero and machines. Pink = signs and welcome. Amber/warm white = windows, interiors, *warmth*. Violet = the Inn and the night. Mustard/tangerine = commerce (rockets, laundry, tacos). Lime/mint = **living things and the greenhouse only**.
- **Living things glow differently from machines.** Machines use hard neon. Creatures, plants and drifting jellies use soft lime, mint, amber and peach glow with no hard edges. The eye learns to find life.
- **One hue family per building, one accent.** Neighbours alternate warm and cool along the street. The only place that may use the whole candy palette is **Planet Pop**.
- **Colour is cast onto the ground without adding lights.** Paint a soft coloured pool under each sign and window into the deck texture (and into emissive decals) so the street picks up each building's colour. Do not add point lights for this.
- **Neon in a lit view stays under about four hue families**, and at most two dominate. If the thumbnail looks like a rainbow, reduce the secondary hues.
- Exact values are a starting point, not canon: flamingo `#ff4fa3`, turquoise `#2fe0d0`, amber `#ffc233`, tangerine `#ff7a3a`, violet `#9a5cff`, mint `#8ff0b8`, lime `#b6ff5a`.

### Life

The outpost is inhabited by non-humans. They are silent, small and a bit absurd. Nothing about them is required or modal, and none can be harmed.

**Residents** (a small named cast, each with a place and a routine):

| Resident | Where | What it does |
| --- | --- | --- |
| **PUMPKIN** | Pump Court | A one-wheeled pump-attendant robot with a bowl head. Rolls a short beat between the pumps; when the saucer parks at the pumps or the player refuels, it faces them and wipes an imaginary windscreen with a squeegee. |
| **The cook** | Nova Nosh window | A round, many-armed creature (three eyes, four arms) flipping something; steam rises. Turns to look when the player stands at the window. |
| **The clerk** | Drift Inn lobby window | A moth-like creature asleep on the desk. Ringing the bell lifts its head, blinks, and **the VACANCY sign changes** (flickers to NO VACANCY, then back). Back to sleep after a few seconds. |
| **The tube-dancer** | Zorp's lot | The inflatable thing. Always dancing. Not alive, but behaves as if. |
| **The lizard** | Drift Inn roof | Sunbathes under the fixed sun. Rolls an eye. |

**Ambient creatures** (cheap, instanced, a few dozen at most):

- **Hop-hops**: small round fuzzy things with two big eyes, a half-dozen at a time. They wander in groups of two or three, pause under neon, bounce when startled, and drift out of the player's way (soft avoidance within 6 m, never a collision). They gather around the gumball machine and the Event Horizon patio.
- **Sky jellies**: slow translucent jellyfish above the strip (eight to twelve), soft lime and peach glow, pulsing at different slow rates. They are the visual signature of the outpost from the air: the first moving thing you see from 150 m.
- **Moths** circling the brightest signs: a handful of tiny points per sign, orbiting.
- **The sky whale** *(optional)*: once in a long while a huge soft-glowing whale drifts across the far sky, in the nebula, very slowly, and is gone. Never closer than a few kilometres. One at a time. It is wonder, not a ship.

**Interaction** is minimal and optional: ring the bell (existing), refuel (existing), look through the telescope (zoom to Earth for a few seconds), maybe nudge a hop-hop. A small plain glyph bubble (a "?", "!", "zzz", a star) is the only "speech". No text dialogue, no voices, no shop currency, no quest.

**Life rules.**

- No humans, no other ships, no pursuit, no violence, no collectibles, no score.
- Residents and critters never block movement or narrow a walking gap below 1.2 m; they have no hard colliders (residents may have a small one at their station).
- Nothing animates beyond about 150 m except the beacon, the Event Horizon swirl, the sky jellies and (if built) the sky whale. Life is a reward for arriving, not something seen from orbit.
- Behaviour is a tiny state machine per kind (idle, wander, startle, rest), seeded for determinism, with no per-frame allocation.

### Motion budget

Motion is allowed but budgeted so the strip feels alive and stays calm. Every moving thing is on this list; adding to it needs a reason and a measurement.

| Motion | Rate | Technique |
| --- | --- | --- |
| Drift Inn beacon | Slow pulse | Emissive pulse (existing) |
| Mast light | One blink every few seconds | Existing |
| Event Horizon swirl | Slow rotation | Shader on one disc |
| Spin Cycle portholes | Slow tumble | Shared shader, one time uniform |
| Gumball planets | Gentle bob near the player | Instanced, updated within 40 m |
| Tube-dancer | Slow flail | Vertex-shader sway |
| Plants and awnings | Faint sway | Vertex-shader sway, shared |
| Windmill, taco sign | Slow turn | One transform each |
| Sky jellies | Slow pulse, slow drift | Instanced or vertex-shader pulse |
| Hop-hops, moths, steam | Wander, orbit, rise | Instanced; updated within 150 m only |
| Residents | Small loops and reactions | A few animated parts each |
| Debris | Drifts around the asteroid | Existing |

### Model quality bar

The brief asks for "good quality models". The bar for tier A:

- **Silhouette first.** Each tier A model is identifiable as a black cut-out from 150 m. Googie shapes (boomerangs, parabolas, cantilevers, starbursts, sputniks) rather than boxes.
- **Three distances.** At 150 m: colour and silhouette. At 30 m: sign, big shapes, a first detail layer. At 3 m: material, small parts, readable lettering, a trace of care. Review every tier A model at all three.
- **No bare boxes above 1 m.** Chamfer or round edges, taper, curve roofs, add a plinth, a trim line, a cap. Use lathe, tube and extruded profiles; at least 12 segments on anything round that reads at 30 m.
- **Surface richness without lights.** Vertex-colour gradients and baked ambient occlusion at contact edges; canvas trim sheets (panel lines, rivets, stripes, grime, stickers, tape); emissive maps for windows with variation (some off, some with curtains or silhouettes); decals for stickers and re-lettering. Textured or vertex-coloured parts use the standard material; the game's own stripped Lambert ignores maps and vertex colours.
- **A story at 3 m.** At least fifteen distinct small parts per hero (vents, hose reels, hinges, rivets, hand-lettered tags, tape, dents, a forgotten cup).
- **Share and merge.** Reuse materials; merge static parts per building per material into one mesh so draw calls drop. Instance anything repeated.
- Calibrated ceilings from O0 baseline (84,752 base tris, 384 draw calls): hero ≤ 12,000 triangles, supporting ≤ 4,000, prop instance ≤ 600, total spGroup ≤ 140,000 triangles, total draw calls ≤ 450. Texture memory ≤ 24 MB. Lights strictly constant (12 point, 2 spot).

### The deck surface

The deck is currently a flat grey disc with hex pavers and a glowing rim. It becomes the strip's ground: a painted street with kerbs, crossings and bay markings; a tiled plaza; patches of cracked tarmac, oil stains, chalk hopscotch and a mended crack; coloured light pools under signs; a lit rim with railings. Keep it a **texture plus a few meshes** rather than more geometry. Hex pavers stay subdued from grazing angles.

## No rain, no weather

There is no rain or weather in space. The owner removed rain on 2026-11-08 ("there should be no rain in space"). Do not reintroduce rain, drizzle, fog, wind, lightning or any weather. Steam from the cook and spores in the greenhouse are local effects, not weather. Wet neon on the deck stays dropped.

## Sound

The saucer's voice is **alien but gentle**: low, slow, a little strange, never bothering, never high-pitched.

- **Engine drone.** Two detuned voices a non-harmonic interval apart (about a tritone, ratio 1.414) so they beat slowly, a sub-octave that swells on a very slow cycle, a slow vibrato, and a soft filtered breath. Pitch leans from about 66 Hz at idle to about 120 Hz at warp. Nothing above roughly 1.4 kHz, no saw edge, no whine.
- **No whoosh at speed.** Speed raises the pitch slightly and opens the filter a little.

| Place | Bed | Event rate cap |
| --- | --- | --- |
| Cabin, parked | The drone at idle level | None beyond the bed |
| Cabin, flying | The drone, pitch and filter leaning with speed | None |
| Open space outside | Nothing | None |
| Deck, on foot | Boots on tarmac; transformer hum near Orbit Gas | One soft knock or tick every 40 s on average |
| Strip, near a building (≤ 25 m) | Soft neon buzz, laundromat drum, greenhouse bubbling, a window-fan whir; each fades in with distance | Creature pips and clinks at most once per 20 s on average, soft, none beyond 40 m |
| Under cover | Hum closer | Same |

Sounds are procedural, soft, with nothing above about 3 kHz outside the cabin. **No music, no voices, no speech-like babble.** The existing car radio, motel radio and jukebox are untouched. Wind and insects stay muted in space. Mute and tab hiding keep working.

## Map and travel

The outpost must not be hard to reach. These are built and stay as they are.

- **Star chart.** **R** while flying (and on the deck) toggles a plain chart: Earth as a disc, the asteroid with its runway to scale, the saucer's position and heading, bearing and distance to the outpost, the altitude band where the sky turns black. Ink on dark paper, no glow.
- **Waypoint.** A small unobtrusive marker toward the outpost, with distance in km, fading inside 400 m.
- **Fast travel.** The flight computer card (**Y** or **`** while flying or on the deck): *Little saucer (desert)*, *Low above the desert*, *Orbit above the outpost*, *Runway 07 threshold*, *Orbit Gas pumps*. The overhaul should add **Main Street** and **The Plaza** as rows, and keep all existing targets valid. Fast travel is free and never moves the world clock.
- **From the ground.** The travel card (`` ` `` on foot) offers *Little saucer* and *Drift Outpost deck*; on the deck it offers *Little saucer (desert)*.
- **Fuel.** Fast travel never needs fuel. Fuel only gates cruising speed.

## Performance and fluid gameplay

The outpost must feel full and run smoothly. Hard rules:

- **Constant light count.** Colour comes from emissive materials, additive halo sprites and colour pools painted into the deck texture, **not** from more point lights. Keep the pooled lights the build already has (re-find and keep the existing pool) and move them with the player.
- **No hitch on arrival.** The outpost is built lazily. Build it in slices across frames while climbing (for example during the fade between 900 m and 3.2 km), one building per frame at most, and warm the shaders before the player sees it. No single frame may take longer than about 30 ms due to the build, and there must be no multi-second stall on first entry (the same class of bug as the 2026-11-08c freeze).
- **Animation is cheap and local.** One time uniform drives shared vertex shaders; instance matrices update only within range; ranges are checked once per frame, not per object; no per-frame allocations.
- **Distance and frustum culling.** Each building is a group that can be culled; detail groups hide beyond a stated range; critters are removed beyond 150 m.
- **Merge and instance.** Static geometry merged per building and material; repeated props instanced.
- **Textures.** Reuse canvas textures; keep each at or below 1024×1024 except the deck; record total texture memory.
- **Collision.** Axis-aligned box colliders (the existing helper), only for solids above 0.5 m, with gaps of at least 1.2 m between solids, rounded corners where possible. Walking from the runway to the Inn and back must never snag.
- **Planet and nebula** stay cheap (planet ≤ 4 octaves, nebula ≤ 3).
- Do not claim frame-time results from software rendering. Measure on a named laptop at the actual viewport and pixel ratio: median and p95 frame time on the deck in the plaza, on Main Street, at the gate, and in open space with the planet in view. A regression of more than one millisecond at the plaza against the O0 baseline fails the pass.

## Acceptance

Checks for the ROADMAP record. The saucer checks 1–4 apply to any cabin change; the rest are the outpost's.

1. **Clip check.** Every cabin object passes the ellipsoid margin test.
2. **Lights.** L darkens the cabin in under a second with a readable dashboard, and returns warm without a pop.
3. **Palette.** The cabin still reads warm brown, graphite and brass; the outpost's colour does not leak in.
4. **Dashboard.** Speed, altitude, fuel and tier match the HUD.
5. **No weather.** None in space.
6. **Approach order.** Climb through the black, find the outpost by colour, then silhouette, then sound, then detail, then life.
7. **Reachability.** Under two minutes with the chart and waypoint; under thirty seconds with fast travel.
8. **Vibe test.** Show the plaza and Main Street captures cold to someone. In five seconds they should say fun, strange or warm, not empty. Record the words.
9. **Density.** From the plaza centre, a 360° turn shows at least six distinct silhouettes. From the gate, four or five buildings layer in depth.
10. **Life.** Within sixty seconds on the strip the player sees at least three different living things move without approaching them. None blocks a path. None appears in the desert, the cabin or open space.
11. **Model quality.** Every tier A model has matched captures at 150 m, 30 m and 3 m, and its fifteen small parts are listed in the roadmap record.
12. **Colour discipline.** At thumbnail size no view looks like a rainbow; the six hue families keep their jobs; Planet Pop is the only candy-coloured place.
13. **Quiet.** Sit on the strip for two minutes and list what you hear and when. No music, no voice-like sound, creature events within the cap.
14. **Fluid.** A sixty-second walk from the runway to the Inn and back shows no frame over about 33 ms in a visible window, with no hitch at the 3.2 km threshold, on the deck or on boarding and leaving. If it cannot be measured, record it as pending.
15. **Gameplay intact.** Refuelling, bell, warp targets, chart and boarding all still work; nothing is snagged; fast travel from every state leaves ship, player, camera, lights and audio consistent.
16. **No regressions.** Desert, station, coupe, travel card and glovebox map unchanged. No space-layer lights, sounds or objects in the desert.

## Open decisions

- **Interactive depth.** Default: the interactions listed under Life, nothing more. A game on top of the strip (a quest, shop or score) is not planned.
- **How many residents.** Default: five named ones and the ambient creatures. Cut to fewer if the strip feels crowded.
- **Sky whale and drive-in screen.** Default: only if the budgets hold after tier A and B.
- **Fuel.** The tank drains about ten times slower than the first build and an empty tank only limits cruise speed. Default: keep it generous.
- **Does the planet turn?** Default: no.
- **Does the Drift Inn have an interior?** Default: no. It has a lobby window and a bell.
- **Cabin lamp from outside.** Default: no.

## Out of scope

Humans, other ships, music, voices or readable dialogue, a quest, a score or collectible, rain or any weather, thunder or lightning, currency or a working shop, combat or harm to creatures, a minimap beyond the chart, a day/night cycle in space, and any change to the ground game's mood or to the cabin's calm.
