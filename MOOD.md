# Mood — Neon Gas

This file defines how every region of Neon Gas produces the same underlying feeling: a nostalgic, lonely 1960s road, with a few small lights in a very large dark. It does not replace [AESTHETIC.md](AESTHETIC.md), which governs lighting and palette, or [AMBIENCE.md](AMBIENCE.md), which holds the desert's detailed design notes. It sits above them. Its job is to keep new regions consistent in feeling while letting each one have its own character. [ROADMAP.md](ROADMAP.md) records status and validation. Everything here is a design proposal until a roadmap entry says otherwise.

## The shared grammar

These rules hold in every region. They are the reason the game still feels like one game when the scenery changes. Implement them as parameters that blend by world position, not as per-region special cases.

1. **One warm pool in a large dark.** Any destination is a small lit place. Most of the frame draws little attention.
2. **Approach in a fixed order.** A destination resolves first as colour at a distance, then silhouette, then sound (the sign hum), then detail. Leaving reverses the order: lettering goes first, then the canopy, then the last colour.
3. **Traces of care.** Every stop shows what it offered, how it was kept going, and what was pared away. Use physical evidence (shims, worn patches, ghost rectangles, a repaired sign letter), not printed explanation.
4. **No people, no recent activity.** No traffic, figures, fresh signs of habitation, or music. Age is visible; absence is not explained.
5. **Quiet is a feature.** Sparse sounds, with intervals long enough to forget them. Silence is placed, not left over.
6. **Stillness.** No mandatory camera sway or theatrical effects. Weather and light change slowly.
7. **Time moves one way.** Dusk deepens toward night. See the clock note below.
8. **Neon stays restrained.** Red and cyan tube light with local spill. Brightness and bloom do not substitute for composition.

## Region mood cards

Each region gets one card with the same fields. A new region is not ready to build until its card is filled in. Each region should invert at least one axis of its neighbour (exposure, temperature, sound density, light colour) while keeping the grammar above.

| Field | Desert (implemented) | Pacific Northwest (in progress) |
| --- | --- | --- |
| **Emotional key** | Relief at arriving, tinged with having arrived late | Shelter in a damp hush; the world close and muffled |
| **Exposure** | Open, huge sightlines | Enclosed, layered ridges, tree canopy, low cloud |
| **Temperature feel** | Dry, cooling after sun | Cold, wet, breath-visible |
| **Sound floor** | Broad wind; sign hum; sparse insects | Rain bed, drips, river, tyre hiss; wind softened |
| **Silence means** | Space: sound carried far | Density: sound absorbed |
| **Light and palette** | Burnt orange to violet to cold moonlight; red and cyan neon | Grey-green, rust, damp dark; red neon doubled in wet asphalt |
| **Distance between warm lights** | Very long (km of dark) | Long, but visibility is shorter, so each light appears late |
| **Trace type** | Ghost rectangles, bench wear, mileage strip | Water stain, rot, rust, hose-down drains, faded menu |
| **How distance fades detail** | Haze and long contrast falloff | Fog and canopy occlusion |

Add a card here, with these same fields, before starting any new region.

The space layer (the hidden saucer and the Drift Outpost) has its own card in [SPACE_MOOD.md](SPACE_MOOD.md). It applies the shared grammar above and is a user-requested exception; see AGENTS.md.

## Desert additions to test

These extend [AMBIENCE.md](AMBIENCE.md); they do not repeat it.

- **Cooling metal.** Pumps and sign hardware tick softly as the air cools after dusk.
- **Silent heat lightning** far off on the horizon at blue hour, rare, with no thunder.
- **Warm-to-cold ground.** Asphalt and sand changing their look as the night cools.

## Pacific Northwest mood layer

PACIFIC_NORTHWEST.md covers the engineering. This section is the missing emotional layer for it.

- **Wet neon.** The red sign and the cone sign double in wet asphalt and haze. This is the main neon payoff of the region, so prioritise it over weather variety.
- **Sounds of enclosure.** Gutter drips, culvert trickle, wet tyre hiss, the coupe's heater tick, and a player-operated wiper rhythm. Keep camera motion still.
- **Old, unlit history.** A cold mill burner silhouette, a closed cannery roofline, a rain-stained phone booth with one weak light. Always old traces, never recent activity.
- **A hush at each boundary.** Strip the sound for a beat before a new region begins.
- **Fern Bend traces.** Give the drive-in the same three layers as Sunset Service: what it offered (menu, cone dispenser, service window), how it was kept (patched gutter, replaced letter, hose-down drain), and what was pared away (flavours crossed out, shortened hours).
- **Slow weather.** Overcast, drizzle, and fog change over many minutes, not seconds. Weather variety must not become spectacle.
- **Lane edges stay readable** in the foggiest setting.

## Candidate future regions

[WORLD_MAP.md](WORLD_MAP.md) places every region on one map and says how each one connects. Use it with the table below.

Ranked by fit and build cost. Each needs a mood card and a roadmap entry before work starts.

| Biome | Emotional key | Neon payoff | Notes |
| --- | --- | --- | --- |
| **Great Plains (built)** (Kansas, Nebraska) | Waiting, expectancy | Harvest Moon Drive-In red neon sign under a huge sky; unlit grain elevator, water tower, windmill | Built and verified on `vibe/neon-gas-voxel-f660eb`. Warm summer dusk, crickets, distant storm cloud with silent heat lightning. Red coal in mirror for 3–5 km. Overhauled 2026-11-09: layered dusk sky, painted farm-mosaic ground with a visible gust field, dense wind-bent meadow, shaped cottonwoods, dark farmsteads at the ends of farm lanes; see ROADMAP. |
| **Great Lakes off-season resort strip** | A season that ended | "Vacancy" neon in grey cold light; boarded kiosks; empty beach lot | Strong 1960s nostalgia. Lake gives a flat horizon without waves. No gulls or crowds. |
| **Gulf Coast bayou** | Memory, decay | Neon on black water, haloed in humid air | Heaviest to build. Dense insect sound conflicts with "sparse insects"; use it only if the station becomes a pocket of silence inside thick sound. |
| **Northern snow** (Montana, Dakotas) | Hush | Neon glow on snow at blue hour | Overlaps the NW's muffling. Keep for later. |

Recommended order: Great Plains, then Great Lakes off-season. Bayou last, if at all.

### Great Plains — the feeling

The land lies down and the sky stands up. For miles there is nothing to lean on, only the highway laid across the grass like a thread somebody forgot to pull, and above it a sky so large it makes you quiet. The last of summer's light stays long, gold on the wheat and then rose and then the colour of an old bruise, and somewhere on the rim of the world a storm is building that will never reach you. It flickers without sound, a slow white pulse behind the cloud, the way a thought does when you almost remember something. A grain elevator stands against it, dark and enormous, a cathedral built for harvests that stopped coming, and beside it a water tower with a name half washed away. Nobody is there. Nobody has been for years, and the wind going through the wheat is the only voice left that remembers how to speak. Then, small and far and impossibly steady, there is a light: one motel sign, a few letters of warm red, burning for a guest who isn't coming. You feel it before you can read it. It is the oldest kind of relief, the kind that comes with an ache, because you know the room will be kept and the road will be empty and the light will still be on when you drive away, getting smaller in the mirror until the dark closes over it like water. You are not sad exactly. You are only the one who is here, now, at the end of a long day, in a country that was made for being crossed and was never really made for staying, and for a minute, standing in the doorway with the crickets stopped and the sky going on forever, you want to stay anyway.

*Build notes:* flat heightfield with long, soft swells; no lit trains or traffic; the elevator and water tower stay unlit; heat lightning is silent and rare; crickets are sparse and stop near the sign hum; the one warm light is the motel or drive-in, seen first as colour.

### Great Plains — ambience in depth

The desert is about being exposed to dryness and distance. The Plains are about being exposed to *time*. Everything is green and gold and alive, and still it feels left behind. Summer is at its fullest and nobody is there to see it. That is the ache: abundance with no one to share it.

**The sky is the main character.** Give it more of the frame than any other region. Let the horizon sit low, so the player feels small under it. At dusk the colour is slower than in the desert: gold, then rose, then lavender, then a deep blue that holds a green edge near the ground. Cloud towers far away catch the last light after the ground has gone dark, so the top of a storm glows while the land is already night. That detail alone says *the day is over for you, not yet for the sky*.

**Sound is wind in grass, not wind on rock.**
- A soft, constant hush that rises and falls in long waves as gusts cross the field and arrive at the player a second late. The sound should visibly *travel*.
- Crickets and a single distant insect line, sparse, stopping the moment the sign hum comes into earshot, as if the field itself were listening.
- A fence wire ticking. A loose sheet of tin on an old shed, rare, once in a long while.
- Almost-thunder: no sound at all with the heat lightning. The silence is the point.
- Near the motel, the hum of a transformer is the only mechanical voice for miles.

**Light is generous, then withdrawn.** For the first minutes, long gold shadows stretch across the grass and the road. They go cold and blue slowly. The motel's red and the diner or drive-in's warmer tones should appear against a sky that still has colour in it, so neon feels like a small coal held in an open hand.

**Distance is the loneliest thing here.** The road runs dead straight to a point. Telephone poles shrink in perfect ranks. Let the player see a light for a very long time before reaching it, longer than in the desert. The waiting is the feeling. Then, leaving, the same light stays visible in the mirror for an almost unreasonable time, a red grain that refuses to go out.

**The five distances**

| Where you are | What you can see | What you can hear |
| --- | --- | --- |
| Open highway | A flat horizon, a vast sky, a dark elevator on the rim, one red point far ahead | Grass hush, tyres, the sign nowhere yet |
| Approaching, a few hundred metres | The sign resolves to letters. A low roofline. A water tower with its name half gone. | The field's insects stop. A faint transformer hum. |
| The gravel lot | Warm pools on pale gravel. Painted doors. A cooler by the office with no label. | Gravel under boots, wind in the wire, the sign more clearly |
| At the door | A key rack with one key gone. A lamp. The field visible through the window. | The wind drops, the hum becomes close and physical |
| Leaving | The sign in the mirror, a tiny red coal, still there | Engine, tyres, then wind taking the engine's place |

**Traces of care, Plains edition**
- A hand-lettered rate card with three prices, each crossed out and rewritten.
- A faded handpainted sign for a church supper, a county fair, or a harvest dance that is long over. Old, not recent.
- A mailbox with a flag that has rusted in the up position.
- A worn path through the grass from the motel to the road, the way people used to wait for a ride.
- Mud-dauber nests under the eave. A wasp-paper corner. Nature moving in, gently.
- A child's measuring marks on a doorframe, if the motel was also someone's home. Heights only, no names, no dates.

**What to feel, moment by moment**

| Moment | Feeling | What carries it |
| --- | --- | --- |
| Leaving the last place behind | Smallness | The horizon drops low, the sky grows |
| Seeing the first light | Hope that is almost embarrassing | A red point, too far to be sure of |
| Driving toward it for a long time | Patience turning into tenderness | Telephone poles, grass hush, no destination in reach |
| Arriving | Being let in | Gravel, a warm lamp, the wind dropping |
| Standing in the doorway at blue hour | Wanting to stay | Sky still holding colour, the room still holding warmth |
| Driving away | Loss, quiet and unspeakable | The red coal in the mirror lasting too long |

**Guardrails.** No people, no distant vehicles, no lit trains, no music. The elevator and tower stay dark. Lightning stays silent. Insects stay sparse. The point is not to fill the Plains with things but to let their emptiness feel like a held breath.

## Region moods across the atlas

[WORLD_MAP.md](WORLD_MAP.md) fixes where each biome sits. This section fixes what each one should *do to the player*. Every region answers the same question in its own voice: **what does it feel like to be the only person here, and what does this place make you miss?** Loneliness is the constant. Nostalgia is what differs. Each region misses something different: a day, a sea, a childhood, a season, a home that was never yours.

Each entry gives the feeling in one line, what it does to the player, what carries it (light, sound, trace), what it inverts from its neighbour, and a guardrail. None of this is authorization to build. Regions beyond the ones in `index.html` remain reserved ground.

For the structures, interactables, ground traces and sound events that carry each of these moods, see [REGION_FIXTURES.md](REGION_FIXTURES.md).

### The emotional route in one table

| Region | Feeling | What it misses |
| --- | --- | --- |
| Pacific coast | Bittersweet completion | The end of a journey |
| Coast Range | Gentle dread, being swallowed | A clear view you had a minute ago |
| Salt playa | The held breath | Water that was here once |
| Cinder field | Bracing aftermath | Something violent that went quiet |
| **Sunset basin (exists)** | Relief, arriving late | A day that is ending |
| Painted mesa | Wistful romance | A postcard you never visited |
| The Divide | Perspective | The ground you just climbed from |
| Snow country | Total hush | A childhood evening indoors |
| Great Plains | Waiting | A season no one is here to see |
| Farm belt | Homesickness for a stranger's home | Belonging |
| Great Lakes strip | Gentle grief | The last day of a holiday |
| Gulf bayou | Heavy tenderness | A porch in summer |
| Dry foothills, Cedar Gorge, Fern Bend (exist) | Anticipation, narrowing, shelter | See the Pacific Northwest layer above |
| Cedar estuary | The long exhale | Nothing; that is the point |

Read left to right as a drive, the route is a breath: tension at the cinder field, held at the playa, swallowed in the fog, released at the sea. The east is a slower day ending: warmth at the mesa, altitude at the Divide, waiting on the plains, and a season that is over at the lake.

### West

**Cinder field — bracing aftermath** (`T` −26 to −9.6). The land here burned once and went quiet. Black rock runs up to the road. Nothing grows but creosote. The cones are small and near, so the sky is still enormous but the ground is close and rough, and the contrast makes you feel exposed in a new way. Not the exposure of distance, the exposure of a hard surface with nowhere soft to land.
- *What it does to you:* it makes you sit up. You came from the warm basin and the world has gone dark underfoot. Then, at dusk, the black rock holds the last orange like an ember that will not quite go out, and you feel the tenderness of something old and violent that has finally calmed.
- *Light:* orange on coal, never glow. The rock catches the sky, it does not emit.
- *Sound:* tyres crunching on the cinder shoulder, wind through creosote, and the rock itself ticking as it cools after sunset. This is the region's signature sound and the clearest cousin of the desert's cooling metal.
- *Trace:* a lunch counter set in a cut of the black rock, one lit window. Soot-dark lintel, a polished hand-height patch on the stone door frame, stools worn at the same angle.
- *Inverts:* colour and texture (tan to coal).
- *Guardrail:* no lava glow, no embers, no particles. Anything that reads as fire is theatre.

**Salt playa — the held breath** (`T` −44 to −26). A dry lake: flat, pale, silent, and the largest sky in the game. At dusk the pale ground meets the pale sky and the horizon line disappears, so you drive through a soft nothing. At night, moon on white ground makes the road a thin dark ribbon, and the dark is the point.
- *What it does to you:* it quiets your own mind. There is nothing to compare yourself to, no vertical thing, no scale. People in a place like this tend to talk less and listen more. The nostalgia is for water. This was a lake. The land remembers it as a smooth white absence, and a faint mirage band at dusk shows you the water that is not there.
- *Light:* pink, then cold blue, then moon on white. Very little warm anywhere.
- *Sound:* near silence, a thin wind, your tyres on hard ground. Footsteps are crisp and carry.
- *Trace:* a dark timing hut and a sign. Someone once timed cars across the flat. The hut is the only upright thing for miles.
- *Inverts:* relief and sky size (from rough cones to a plane).
- *Guardrail:* mirage stays subtle, never a mirror-water effect. **Decision needed:** this is the one stop that is meant to be unlit, which breaks "one warm pool in a large dark". Either allow a single exception here (the moon is the pool) or give the hut one dim, steady window. I recommend the exception, because a place that is not lit and that you stand in anyway is the strongest version of the feeling.

**Coast Range fog descent — gentle dread** (`T` −60 to −44). You climb a ridge out of the playa in clear light and see the cloud deck lying in the valley below, flat and bright like a floor. Then you drive down into it. The world closes. Colour drains. The horizon goes. The headlights become the only world.
- *What it does to you:* tenderness mixed with a little fear. You had a view and you gave it up, and nothing tells you how long the white will last. The nostalgia is for the clear view you had a minute ago, and for the feeling of walking into a photograph that has faded. At the bottom is a first redwood grove, and the scale of old trees is a reminder of time beyond any life.
- *Light:* grey with a pink band while you are above, then a headlight cone in white. Lane edges must stay readable.
- *Sound:* the wind drops out in steps as you descend, then drip, soft tyre hiss, the grove's hush.
- *Trace:* a cold, empty roadside diner found inside the fog, seen first as a glow with no shape.
- *Inverts:* dry to wet, open to enclosed. It is the mirror of the SR 14 climb into cloud, where you climb into the cloud; here you start in light and lose it.
- *Guardrail:* no figures in the fog, no ghost lights. That trope is the opposite of the project's honesty about emptiness.

**Pacific coast — bittersweet completion** (shared end of the western roads). Headlands, sea stacks, a grey sea with fog on the water. The Coast Highway runs along the cliffs. You cannot drive farther west. This is where the old promise of the road runs out.
- *What it does to you:* gratitude and ache together. Every westbound dream of the era ended at this edge, and standing here you feel the journey finish. The sea is a slow rhythm like breathing, and it reminds you how small a car is on a continent.
- *Light:* pearl grey and rose, and a horizon with no lights on it. No ships, no distant boats, no lit buoys. The empty horizon is the loneliest thing in the game.
- *Sound:* surf as the one slow pulse, and wind. No foghorn.
- *Trace:* a tidewater motor court on a headland, sibling of Cinder Court. Cinder Court was the last desert stop. This is the last stop of all. Its Vacancy sign faces the sea, which nobody approaches from. Salt-pitted paint, a rate card with two prices.
- *Inverts:* enclosed to open, sound bed (from fog hush to surf).
- *Guardrail:* no gulls or other wildlife for effect, no boats, no pier lights.

**Cedar estuary and lower river — the long exhale** (`s` 62 to 95). The river spreads into braids and tidal mud, the conifers give way to alder and spruce, and mist lies low on the water. Nothing here is waiting for you.
- *What it does to you:* it slows you down. After the weight of Fern Bend's rain, the air is lighter and the land seems to forgive. It is the one stretch with no destination, and the lack of one is the emotion: a long, uncomplaining drift toward the sea.
- *Light:* soft grey, a little silver on the water.
- *Sound:* mud ticking as it drains, reeds, a faint wind.
- *Trace:* old pilings in the flat, the stumps of a cannery or a dock. Nothing else.
- *Inverts:* enclosed to open.
- *Guardrail:* do not fill it. The emptiness is the content.

### East

**Painted mesa country — wistful romance** (`T` +4.6 to +24). Red and orange buttes, layered rock, juniper, long shadows. The warmest palette in the game, and the best backdrop for red and cyan neon.
- *What it does to you:* you feel the postcard. This is the place you have seen on a calendar and never visited, and the pleasure is the borrowed memory of it. It is the most romantic region and the most easily cliché, so it works best quiet.
- *Light:* deep orange to violet, with long shadows that lie like cloth across the road.
- *Sound:* dry grit, wind in the slickrock gaps, and the one good echo in the game: your own engine answering once off a butte. The world answers you, then goes quiet again.
- *Trace:* a trading post with a neon arrow, closed for the night. A dusty rack of postcards with faded views of places that are barely a few miles away. A shelf of jarred rock specimens with hand-lettered labels.
- *Inverts:* colour and scale.
- *Guardrail:* no people, no figures, no stereotypes in the goods or signage. Keep the stock generic: postcards, rock, tin cups.

**The Divide — perspective** (`T` +24 to +46). Pinyon climbs to ponderosa, then aspen and spruce, then a patch of snow at the crest. The air thins and cools. The road is the longest climb in the game.
- *What it does to you:* the crest is the emotional pivot of the whole route. You can look back and see where you have been, and ahead and see where you can't yet see. It feels like holding your breath, then letting it go.
- *Light:* gold, then cold, as you climb.
- *Sound:* wind in pines, thinning as the trees thin. A little ringing, as if your ears had popped.
- *Trace:* a pullout with a weathered elevation sign, repainted twice with two different numbers. A dry stone trough. Wear on the pullout's edge where cars have stopped for years.
- *Inverts:* warm to cold. Switchbacks and rock cuts hide the handoff.
- *Guardrail:* no overlook set piece, no theatrical reveal. The view is allowed to be modest.

**Snow country — total hush** (SR 89, 36 km, dead end). Snow on the ground, snow-laden pines, a road narrowing to a plowed track. It ends at a gate.
- *What it does to you:* even your own sound goes soft. It feels like being a child in a warm room while it snows outside, except you are outside, and the room is a single lit window at the end of the road. Snowlight lifts the night, so the dark is blue and luminous, and you feel the loneliness of a bright place.
- *Distinction from the Pacific Northwest:* the NW is wet, dripping, enclosed, and muffled by water. Snow is dry, open, bright, and hushed by absence. Do not let them share a sound bed.
- *Light:* blue on white, with the one warm window.
- *Sound:* squeaking snow underfoot, a small wind, a sudden quiet when you stop.
- *Trace:* a closed lodge at the gate with one lit window. The player's own footprints are the only marks in the snow, and they should stay legible behind them.
- *Inverts:* sound density and colour.
- *Guardrail:* no plow lights, no animals. Falling snow, if any, is sparse and slow.

**Great Plains — waiting** (`T` +46 to +84). See the two Great Plains sections above. The WORLD_MAP destination is a **drive-in movie screen with one lit sign**. A blank screen at dusk can pick up the storm glow on the horizon, which suits the region: a place built for company, now holding only the sky. The motel in the earlier paragraph can sit alongside it or stand in for it. The mood does not change.

**Farm belt — homesickness for a stranger's home** (`T` +84 to +102). Fenced fields, shelterbelt tree rows, woodlots that deepen toward the east, and dark farmhouses seen only as silhouettes. This is where the first maples and the first lake fog appear.
- *What it does to you:* it is the saddest kind of lonely. You see the shapes of homes, the porch, the barn, the swing, and you feel the pull of belonging to a place that is not yours and has no one in it. It is homesickness for a stranger's house.
- *Light:* warm grey, the dusk coming earlier under the trees. Every house is dark.
- *Sound:* leaves in the shelterbelt, a sound the game has not had yet, soft and dry. Fence wire. Wind in a field of something tall.
- *Trace:* a tire swing hanging still. A porch with a single chair turned toward the road. A windmill turning slowly, since wind drives it and nothing human does.
- *Inverts:* open to partly enclosed.
- *Guardrail:* no dogs, no tractors, no lit windows. **Decision needed:** a mercury yard light on a pole by a barn is the most nostalgic thing in the Midwest, and it also implies somebody pays the electric bill. I recommend leaving it out, because it contradicts the no-recent-human-activity rule.

**Great Lakes off-season strip — gentle grief** (`T` +102 to +118, east terminus). Birch, maple, a flat horizon of water, a resort strip closed for the season. Boarded kiosks, an empty beach lot, a Vacancy sign in grey light.
- *What it does to you:* the Vacancy sign has always meant "yes, we have rooms", and here it means that, and nothing else. The place is advertising its own emptiness. It is the last day of a holiday that has gone on forever. The nostalgia is for summers: ice cream, the sound of a bicycle bell, a Ferris wheel that is not here. You feel grief that is gentle because nothing terrible happened. It just ended.
- *Light:* cold grey, pale pink at the edge, never gold.
- *Sound:* water lapping, wind, and a flag halyard clinking against a metal pole. That one metal sound will carry the region.
- *Trace:* sand drifted over painted parking lines. A boarded ticket window with a faded price list. One motel with a Vacancy sign.
- *Inverts:* warm to cold-grey. This is the east bookend to the west sea: one is the end of a journey, the other is the end of a season.
- *Guardrail:* no gulls, boats, crowds, lit arcade, or amusement rides.

**Gulf flatwoods and bayou — heavy tenderness** (SR 61, 48 km, dead end at water). Grass gives way to longleaf pine, then live oak with moss, then cypress and black water. Humidity is the biome. Every light has a halo. The road ends on a causeway over the water.
- *What it does to you:* it makes the air feel like memory. A porch on a summer night, a screen door, the smell of wet wood. It is the warmest of the lonely regions, and the most sensuous, and it asks you to slow down.
- *Light:* humid amber haze, halos on every light, black water reflecting a single sign.
- *Sound:* a dense bed of frogs and insects along the road. As you approach the destination the bed thins and then stops, so that the camp sits in a pocket of silence. That inversion is the only way this region fits the sparse-insects rule: thick everywhere except where the light is.
- *Trace:* a fish camp on stilts. One beer sign reflected in the water. A cleaning table with scale-shine on the zinc, rusted crab traps, a tide-line on the pilings.
- *Inverts:* dry to humid, sound density.
- *Guardrail:* no boat lights, no alligators or other animals for effect, no dense insects at the destination. If the silent-pocket treatment cannot be made to work, drop the region.

### Existing regions, in one line each

- **Dry foothills:** anticipation. The last warm hour before the cold, with the mountain building ahead.
- **Cedar Gorge:** narrowing. Rock and moss close in, the river becomes a sound before it is a sight.
- **Fern Bend:** shelter in rain. The low, warm window under an enormous, dark ridge, with the neon doubled in wet asphalt.

### Cross-region checks

Before any region is accepted:
1. Its mood card exists in this file.
2. It inverts at least one axis from each neighbour, as [WORLD_MAP.md](WORLD_MAP.md) requires.
3. A reader of the card can say what it *misses*, not just what it contains.
4. It has a sound signature that no other region uses (cooling rock, halyard clink, shelterbelt leaves, engine echo).
5. Its one warm light is seen first as colour, and fades last in the mirror.
6. The guardrail is met: no people, no traffic, no music, no theatre.

## Keeping mood independent of region

- **Parameters, not branches.** Fog, wind bed, hum level, spill radius, tyre surface, star visibility, and grade tint are all functions of world position and blend smoothly. A region is a set of values for these, plus its own models.
- **Light-density and quiet budgets.** Cap warm light sources visible in one frame. Set a minimum dark stretch between destinations. Cap the rate of discrete sound events. Record these as checks in the ROADMAP validation record, next to frame time.
- **One trace library.** Reuse the same repertoire across regions (shim, ghost rectangle, worn patch, repaired letter) so each stop feels made by the same world.
- **Chain the stops.** Each stop's mileage strip or map names the next one. Some of those places are already shuttered. The map becomes one story.
- **Transitions are first-class.** Each region boundary gets a signature (tunnel, bridge, fog bank, cattle grid) and a sound-stripping beat.
- **A restrained global grade.** Faded colour, slight halation on neon, and a small tint per region. No grain or effects that read as theatre.

## Clock note

AGENTS.md requires one dusk-to-night descent, then a hold, with no loop. PACIFIC_NORTHWEST.md proposes a 48-minute repeating day. These conflict and need a decision. If a repeating clock is kept, protect the mood this way:

- Dusk and blue hour remain the emotional core.
- Dawn reads as the cold, grey aftermath of the same evening, not a reset.
- Midday is hazy and bleached, never bright and cheerful.
- Weather and overcast can hold a region at a dusky level of light.

Until the decision is recorded, treat the original one-way rule as authoritative.

## Open decisions

- **Radio.** The project rule is no music. A radio that only produces static between stations would be a strong lonely device, but it needs an explicit exception.
- **Clock model.** One-way descent versus a repeating day (above).
- **Atlas-wide mood decisions** (raised by the region moods above): whether the Salt playa gets a single unlit-stop exception to the one-warm-pool grammar; whether a farm-belt yard light is allowed; whether the Gulf bayou is dropped if its silent-pocket sound cannot be made to work; which Great Plains destination is canonical (drive-in screen per WORLD_MAP, or the motel).
- **Next region.** Great Plains is recommended, but the choice is the project owner's.
- **Pinned: driveable train and station.** Proposed 2026-11-06 and set aside by the project owner. If revived: one slow, period-correct railcar, parked at one station, moving only on player input; no other trains, no moving lights seen from the road, no horn set pieces. Revisit after the Plains region is accepted.

## Acceptance

A region's mood is accepted only after real play captures and audio checks, not from reading this file:

1. Matching views at dusk, blue hour, and night, in both travel directions.
2. Approach and departure sequences at the order in the shared grammar.
3. Light-density and quiet budgets measured and recorded.
4. A silence check: stand still for two minutes in the open and under shelter, and note what you hear.
5. Offline `file://` play and the standard checks in [ROADMAP.md](ROADMAP.md#verification-and-completion).

If any check cannot run, record exactly what remains unverified.
