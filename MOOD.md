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

Ranked by fit and build cost. Each needs a mood card and a roadmap entry before work starts.

| Biome | Emotional key | Neon payoff | Notes |
| --- | --- | --- | --- |
| **Great Plains** (Kansas, Nebraska) | Waiting, expectancy | Lone motel or drive-in screen under a huge sky; unlit grain elevator and water tower silhouettes | Cheapest terrain (flat). Warm summer dusk, crickets, distant storm cloud. Elevators and towers stay dark. No train lights. |
| **Great Lakes off-season resort strip** | A season that ended | "Vacancy" neon in grey cold light; boarded kiosks; empty beach lot | Strong 1960s nostalgia. Lake gives a flat horizon without waves. No gulls or crowds. |
| **Gulf Coast bayou** | Memory, decay | Neon on black water, haloed in humid air | Heaviest to build. Dense insect sound conflicts with "sparse insects"; use it only if the station becomes a pocket of silence inside thick sound. |
| **Northern snow** (Montana, Dakotas) | Hush | Neon glow on snow at blue hour | Overlaps the NW's muffling. Keep for later. |

Recommended order: Great Plains, then Great Lakes off-season. Bayou last, if at all.

### Great Plains — the feeling

The land lies down and the sky stands up. For miles there is nothing to lean on, only the highway laid across the grass like a thread somebody forgot to pull, and above it a sky so large it makes you quiet. The last of summer's light stays long, gold on the wheat and then rose and then the colour of an old bruise, and somewhere on the rim of the world a storm is building that will never reach you. It flickers without sound, a slow white pulse behind the cloud, the way a thought does when you almost remember something. A grain elevator stands against it, dark and enormous, a cathedral built for harvests that stopped coming, and beside it a water tower with a name half washed away. Nobody is there. Nobody has been for years, and the wind going through the wheat is the only voice left that remembers how to speak. Then, small and far and impossibly steady, there is a light: one motel sign, a few letters of warm red, burning for a guest who isn't coming. You feel it before you can read it. It is the oldest kind of relief, the kind that comes with an ache, because you know the room will be kept and the road will be empty and the light will still be on when you drive away, getting smaller in the mirror until the dark closes over it like water. You are not sad exactly. You are only the one who is here, now, at the end of a long day, in a country that was made for being crossed and was never really made for staying, and for a minute, standing in the doorway with the crickets stopped and the sky going on forever, you want to stay anyway.

*Build notes:* flat heightfield with long, soft swells; no lit trains or traffic; the elevator and water tower stay unlit; heat lightning is silent and rare; crickets are sparse and stop near the sign hum; the one warm light is the motel or drive-in, seen first as colour.

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
- **Next region.** Great Plains is recommended, but the choice is the project owner's.

## Acceptance

A region's mood is accepted only after real play captures and audio checks, not from reading this file:

1. Matching views at dusk, blue hour, and night, in both travel directions.
2. Approach and departure sequences at the order in the shared grammar.
3. Light-density and quiet budgets measured and recorded.
4. A silence check: stand still for two minutes in the open and under shelter, and note what you hear.
5. Offline `file://` play and the standard checks in [ROADMAP.md](ROADMAP.md#verification-and-completion).

If any check cannot run, record exactly what remains unverified.
