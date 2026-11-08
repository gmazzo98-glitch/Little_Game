# Space mood — the saucer and the Drift Outpost

This file is the mood card for the space layer of Neon Gas, the way [MOOD.md](MOOD.md) is for the highway regions. It sits under MOOD.md's shared grammar and next to [AESTHETIC.md](AESTHETIC.md) (light and palette) and [AMBIENCE.md](AMBIENCE.md) (sound). [ROADMAP.md](ROADMAP.md) holds status and validation. Everything here is a design proposal until a roadmap entry says otherwise.

**Status (2026-11-08):** the cabin rules, lamp switch, alien engine voice, long-lasting fuel, chart and fast travel below are implemented in `index.html`; the outpost hierarchy and care traces and the outpost sound layers are still to do. See the validation record in ROADMAP.md and the follow-up brief in [AGENT_PROMPT_SPACE.md](AGENT_PROMPT_SPACE.md).

The space layer is a **user-requested exception** (see AGENTS.md): a hidden saucer in the desert, a climb out of the atmosphere, and an asteroid outpost with a runway, fuel stop, food truck and motel. The ground game is untouched. This file keeps the exception coherent with the rest of the game instead of becoming a second, louder game.

## The feeling

The saucer is the opposite of the highway in one way and identical in another. The highway is a few small lights in a very large dark, seen from outside. The saucer is the same thing seen from the inside: a small warm room, a dashboard glowing like a radio, and outside the glass the largest dark there is. You are not escaping the loneliness of the road. You are taking it somewhere with better stars.

Up there the dark is the same dark, with colour in it. Nebula glow, a blue planet turning below, and one small outpost on a rock whose neon is the only crowd for a very long way: a gas pump, a food truck, a motel with a sign that says there is room. Nobody is serving, nobody is checking in. The sign is on and the lamp behind the truck window is on. It does not rain. Space is dry, clean and still, and the dark is the point.

The player should be able to put the cabin lamp out and just sit in it. That is the moment to design for.

## Mood card

| Field | Space layer |
| --- | --- |
| **Emotional key** | Cosy solitude at the edge of everything; being small, warm and unobserved |
| **Exposure** | Total outside, shelter inside: the glass is the only wall |
| **Temperature feel** | Cold outside, the cabin a warm pocket, the deck cool under neon |
| **Sound floor** | A low alien drone in the cabin, nothing outside; no wind, no insects, no rain |
| **Silence means** | Vacuum plus intention: the outside world makes no sound at all |
| **Light and palette** | Deep blue-black, nebula violet and teal kept low, one warm amber cabin lamp, neon on the outpost in pink, cyan and a little lime and amber |
| **Distance between warm lights** | Enormous: the saucer, then 5 km of nothing, then one rock |
| **Trace type** | Wear in the cabin (leather polish, a worn switch, a mug ring), old paint on the outpost, a repaired sign letter, a ghost rectangle where a vending machine used to stand |
| **How distance fades detail** | Nothing fades. The dark is clean, so distant lights stay sharp and the eye is told how far they are by size alone |

## The shared grammar, applied

MOOD.md's eight rules still hold. In space:

1. **One warm pool in a large dark.** From a distance the outpost resolves as a handful of coloured points, then a deck, then buildings. At most two neon colours dominate any single view.
2. **Approach in a fixed order.** Colour first, silhouette second, sound third (a low transformer hum), detail last. Leaving reverses it. The marker or map must never replace the first stage: the eye finds the colour before the HUD does.
3. **Traces of care.** The outpost shows what it offered, how it was kept going and what was pared away. See the outpost section.
4. **No people, no recent activity.** No ships, no crowds, no moving lights, no music, no voices. The outpost is lit and empty. Debris drifts, nothing else moves.
5. **Quiet is a feature.** Sound events are sparse. Beds are low and slow.
6. **Stillness.** No mandatory camera sway, no shake at speed, no screen-space speed lines beyond the faint dust. Flight FOV widening is the only speed cue and must stay mild.
7. **Time moves one way.** The world clock is unchanged. Space does not reset or pause it. The sky above the atmosphere does not follow dusk to night; it is always night, with the sun fixed.
8. **Neon stays restrained.** The outpost is far more colourful than the desert. Keep it restrained by *hierarchy*: one hero (the Drift Inn beacon or the Orbit Gas ring), supporting tubes dimmer, and no bloom compensation. If a view reads as a toy set at thumbnail size, reduce saturation before reducing size.

## The saucer: what to build and why

Brief from the user, 2026-11-08: the seats clipped through the glass; the model was low quality and unpleasant; the cabin was too colourful; it needs a real dashboard; the player must be able to turn the cabin lights on and off to enjoy the space atmosphere.

### Cabin rules

- **Nothing may touch the glass.** The canopy is an ellipsoid with a known equation; every cabin object is checked against it with at least a 6 cm margin at all eight bounding-box corners. A failing check is a bug, not a polish item.
- **Palette: restrained and warm.** Graphite, brushed brass, tan leather, cream stitching, dark wool, one muted teal accent. No pink, no saturated red rug, no rainbow bulbs. Amber is the only warm light. Cyan is reserved for the engines and the outpost.
- **A real dashboard.** A curved console in front of the pilot with instruments that read the actual state: speed, altitude, fuel, tier, heading to the outpost, a small chart screen. Brass-ringed dials, toggles, a lamp switch with a visible position. Instruments are lit from behind and stay faintly visible when the cabin lamp is off.
- **Lights on and off.** **L** toggles the cabin lamp. Off means off: the lamp, the bulb string, the canopy glow and the exterior cabin glow all fade out over about 0.6 s. The dashboard keeps a dim instrument backlight so the player can still read it. On by default.
- **Traces of care.** A polished seat edge, a worn switch, a ring where a mug stood, a strip of tape on the dash. Old, not recent. No notes, no photographs of people.
- **Exterior quality.** Rounded, consistent hull curvature; fewer, better parts. Panel seams, one repair patch, matte metal that catches the cabin glow. No floating decals, no mismatched primary colours.

### Light budget

- One amber cabin lamp (point light), one dashboard glow, engine light only while thrusting. No magenta underglow.
- Ship lights are active only near the player (75 m parked, always while flying). Do not raise this without measuring.

## The outpost: Drift Outpost

A cut deck on a 520 m asteroid beside the planet. Runway 07/25, taxiway, parking ring, three buildings, a mast, crystals on the rim.

| Place | Role | Mood job |
| --- | --- | --- |
| **ORBIT GAS** | Canopy, four pumps, kiosk, pylon sign with a ring. Refuels the saucer. | The first and safest light. The hero sign. Familiar shape, new setting. |
| **NOVA NOSH** | Food truck with an awning, string lights and two tables. | The warm pool. One lit serving window. Sells a taco that tastes like an evening. |
| **DRIFT INN** | A stack of pods around a lit tower, a beacon, a desk bell. | The strange silhouette that you see from far away. The beacon is the outpost's coal. |

Rules:

- **Only one thing pulses.** The Drift Inn beacon, slowly. The mast light may blink once every few seconds. Nothing else flickers, chases or animates.
- **Neon hierarchy.** Orbit Gas ring = hero cyan with a pink accent. Nova Nosh = warm pink window. Drift Inn = violet tower with pod windows in warm white. Lime and amber appear once each.
- **Traces of care.** A repaired letter in a sign, a hose patched with tape at the pumps, a taco menu with prices crossed out and rewritten, a bell with a worn clapper, a rectangle on the deck where a machine once stood.

## No rain, no weather

There is no rain or weather in space. An earlier build had slow neon-tinted rain; the owner removed it on 2026-11-08 ("there should be no rain in space"). Do not reintroduce rain, drizzle, fog, wind, lightning or any weather. Wet neon on the deck is also dropped with it. The only motion outside the glass is drifting debris, the Drift Inn beacon and, in flight, a faint field of dust.

## Sound

The saucer's voice is **alien but gentle**: low, slow, a little strange, never bothering, never high-pitched.

- **Engine drone.** Two detuned voices a non-harmonic interval apart (about a tritone, ratio 1.414) so they beat slowly, a sub-octave that swells on a very slow cycle, a slow vibrato, and a soft filtered breath. Pitch leans from about 66 Hz at idle to about 120 Hz at warp. Nothing above roughly 1.4 kHz, no saw edge, no whine. It should be pleasant enough to leave running while sitting in the dark cabin.
- **No whoosh at speed.** Speed raises the pitch slightly and opens the filter a little. It never becomes loud or shrill.

| Place | Bed | Event rate cap |
| --- | --- | --- |
| Cabin, parked | The drone at idle level | None beyond the bed |
| Cabin, flying | The drone, pitch and filter leaning with speed | None |
| Open space outside | Nothing | None |
| Deck, on foot | Boots on tarmac, a transformer hum near Orbit Gas | One soft knock or tick every 40 s on average |
| Under cover | Hum closer | Same |

Silence is placed. The desert's wind and insects are muted in space. Do not add music. The existing car radio, motel radio and jukebox are untouched.

## Map and travel

The outpost must not be hard to reach. The brief: "there needs to be a map and fast travel".

- **Star chart.** **R** while flying (and on the deck) toggles a plain chart: Earth as a disc, the asteroid with its runway drawn to scale, the saucer's position and heading, the bearing and distance to the outpost, and the altitude band where the sky turns black. Period cartography: ink on dark paper, no glow.
- **Waypoint.** A small unobtrusive marker in the view toward the outpost, with distance in km. It fades out inside 400 m. It is a marker, not a quest.
- **Fast travel.** A flight computer card ( **Y** or **`** while flying or on the deck): *Little saucer (desert)*, *Low above the desert*, *Orbit above the outpost*, *Runway 07 threshold*, *Orbit Gas pumps*. It uses the same card style as the trip card and the same fade-to-black as the coupe's travel. Free. It never moves the world clock.
- **From the ground.** The existing travel card (`` ` `` on foot) gets two extra rows at the end: *Little saucer* and *Drift Outpost deck*. On the deck it offers *Little saucer (desert)*.
- **Fuel.** Fast travel never needs fuel. Fuel only gates cruising speed in flight.

## Performance

- Space adds one planet shader, one nebula dome, a star field and the outpost. Keep the planet and nebula noise cheap (≤ 4 octaves each, nebula ≤ 3) and render the nebula after opaque geometry so covered pixels are rejected early.
- Do not claim frame-time results from software rendering. Measure on a named laptop at the actual viewport and pixel ratio, once on the deck, once in open space with the planet in view.

## Acceptance

Checks for the ROADMAP record:

1. **Clip check.** Every cabin object passes the ellipsoid margin test. Record the test, not a screenshot.
2. **Lights.** Press L: the cabin goes dark in under a second, the dashboard stays readable, and the exterior cabin glow disappears from outside. Press again: warm lamp returns. No pop.
3. **Palette.** At thumbnail size the cabin reads as warm brown, graphite and brass. No saturated primary colour fills more than a few percent of the view.
4. **Dashboard.** Speed, altitude, fuel and tier on the dials match the HUD within a rounding error.
5. **No weather.** No rain, fog, wind or lightning appears anywhere in space.
6. **Approach order.** From the desert, climb through the black, find the outpost by colour, then silhouette, then sound.
7. **Reachability.** From fresh load, the player reaches the deck in under two minutes using the chart and the waypoint, and in under thirty seconds using fast travel.
8. **Quiet.** Sit on the deck for two minutes. List what you hear and when.
9. **No regressions.** Desert, station, coupe, travel card and glovebox map unchanged. The desert has no space-layer lights, sounds or objects in view when not in space.

## Open decisions

- Fuel: the tank drains about ten times slower than the first build (100 % lasts roughly an hour at warp, about eighteen minutes at the top speed) and an empty tank only limits cruise speed. Default: keep it generous.
- Does the planet turn? Default: no. The sun is fixed and the planet is still; the only motion is debris.
- Should the cabin lamp also be switchable from outside, through the hatch? Default: no.
- Does the Drift Inn have an interior? Default: no. It is a silhouette and a bell.

## Out of scope

People, other ships, music, voices, a quest, a score or collectible, rain or any weather, thunder, lightning, a minimap beyond the chart, a day/night cycle in space, any change to the ground game's mood.
