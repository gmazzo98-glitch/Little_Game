# World map — where every biome goes and how they connect

This is the long-range atlas for Neon Gas. It is a plan, not an authorization. Only the Sunset basin, the dry foothills, Cedar Gorge and Fern Bend exist in `index.html`. Everything else below is reserved ground. [WORLD_LORE.md](WORLD_LORE.md) still decides what may be built next, [MOOD.md](MOOD.md) decides how each region feels, [PACIFIC_NORTHWEST.md](PACIFIC_NORTHWEST.md) holds the western spur in detail, and [ROADMAP.md](ROADMAP.md) holds status. The non-negotiables in [AGENTS.md](AGENTS.md) apply to every region: one player, one coupe, no traffic, no people, no recent human activity, no music, no theatrical camera.

The goal of the atlas is one idea: **the map is a ring and a spine, not a list of levels.** A driver can leave Sunset in any direction and keep finding the next kind of weather, and the two western roads meet again at the sea so the world has a shape you can feel by driving it.

## 1. The shape

Sunset Service is the hub and the origin of the trunk coordinate `T` (kilometres, east is positive). U.S. 66 is the spine. Three spurs leave the spine (SR 14 to the northwest, SR 89 to the north, SR 61 to the south), and the two western roads close into a ring at the sea.

```
                                                         SNOW COUNTRY (dead end at a snow gate)
                                                              ▲  SR 89 north, T +44
                                                              │
  PACIFIC COAST ◄── Cedar estuary ◄── Fern Bend ◄── Gorge ◄─┐ │
   (north end)            SR 14, 90 km from the fork         │ │
        │                                                  fork   
        │ Coast Highway, 70 km                             │ │
        │ headlands and fog                                │ │
        ▼                                                  │ │
  PACIFIC COAST ◄── Coast Range ◄── Playa ◄── Cinder Field ─┴─ CINDER COURT ─ SUNSET ─ STARLITE ─ MESA ─ DIVIDE ─ PLAINS ─ FARM BELT ─ LAKES
   (south end)      fog descent      salt flat   black basalt   T −4.6        T 0     T +4.6                  │ SR 61 south, T +72
                                                                                                         GULF BAYOU (dead end at water)
```

| Piece | Road | Length | Ends at |
| --- | --- | --- | --- |
| Spine, west | U.S. 66 from the SR 14 fork to the sea | 50 km | Coast Highway, south end |
| Spine, east | U.S. 66 from Starlite to the lake | 113 km | Lake Shore Drive, east terminus |
| Northwest spur | SR 14 from the fork to the sea (exists to km 30, then streams) | 90 km | Coast Highway, north end |
| Coast Highway | Joins the two western roads along the shore | 70 km | Both ends meet the sea roads |
| Snow spur | SR 89 north from the Divide | 36 km | Snow gate, turn around |
| Gulf spur | SR 61 south from the Plains | 48 km | Causeway end at the water |

**Why a ring in the west.** Today the through road beyond Fern Bend has nowhere to go. A ring gives it an ending that is a place, and it lets a long drive return you to somewhere you saw from the other side. The Coast Highway is also the one stretch where both western roads can be seen in a single landscape.

**Why dead ends in the north, south and east.** The Snow spur, the Gulf spur and the lake terminus each end where the world ends: a gate, a causeway, a shoreline. A dead end is a mood (the road gives out) and it is cheap, because nothing has to connect onward.

## 2. Reading the coordinates

All distances are driven distance along the named road. Drive time uses the coupe's 50 mph reference (22.4 m/s), about 0.74 minutes per km. The world clock runs a 48-minute day, so one day is about 64 km at that pace. The existing route-distance helper `s` (kilometres from Cinder Court, SR 14 measured with the 1.12 bend factor) stays valid for the northwest spur. `T` is new and only meant for planning and the paper map.

| Region | Road | `T` or `s` range (km) | Length (km) | Minutes at 50 mph |
| --- | --- | --- | --- | --- |
| Coast Range fog descent | U.S. 66 | `T` −60 to −44 | 16 | 11.9 |
| Salt playa | U.S. 66 | `T` −44 to −26 | 18 | 13.4 |
| Cinder field | U.S. 66 | `T` −26 to −9.6 | 16.4 | 12.2 |
| **Sunset basin (exists)** | U.S. 66 | `T` −9.6 to +4.6 | 14.2 | 10.6 |
| Painted mesa country | U.S. 66 | `T` +4.6 to +24 | 19.4 | 14.4 |
| The Divide (high pass) | U.S. 66 | `T` +24 to +46 | 22 | 16.4 |
| Great Plains | U.S. 66 | `T` +46 to +84 | 38 | 28.3 |
| Farm belt | U.S. 66 | `T` +84 to +102 | 18 | 13.4 |
| Great Lakes strip | U.S. 66 | `T` +102 to +118 | 16 | 11.9 |
| **Dry foothills (exists)** | SR 14 | `s` 5 to 12.5 | 7.5 | 5.6 |
| **Cedar Gorge (exists)** | SR 14 | `s` 12.5 to 26 | 13.5 | 10.0 |
| **Fern Bend valley (exists, streams after 30)** | SR 14 | `s` 26 to 62 | 36 | 26.8 |
| Lower river and tidal flats | SR 14 | `s` 62 to 85 | 23 | 17.1 |
| Cedar estuary | SR 14 | `s` 85 to 95 | 10 | 7.4 |
| Coast Highway | — | 0 to 70 | 70 | 52.1 |
| Snow country | SR 89 | 0 to 36 | 36 | 26.8 |
| Gulf flatwoods and bayou | SR 61 | 0 to 48 | 48 | 35.7 |

A single trip from the western sea to the lake is about 178 km, roughly two hours and ten minutes of driving, or a little under three in-game days. Nobody is expected to drive it in one sitting. The trip card and the dev warp (see [ROADMAP.md](ROADMAP.md)) cover the long legs, and each region should be worth a single evening on its own.

## 3. The biomes

Each entry gives the place, what holds it together, and the one destination it would earn. For what each region should make the player *feel*, see "Region moods across the atlas" in [MOOD.md](MOOD.md), and for the structures and interactables that carry it, see [REGION_FIXTURES.md](REGION_FIXTURES.md). Destinations follow the lore rule: only one new visitable place per region, and none is authorized until it is commissioned.

### West

**Cinder field** (`T` −26 to −9.6, immediately west of the SR 14 fork). Black basalt flows and low cinder cones over tan ground, wiry creosote, no grass. The colour flips from sand to coal and the horizon gets lumpy. The cones are small and near, so the sky is still huge but the foreground is rough. Sound is wind plus the crunch of tyres on cinder shoulders. *Destination:* a roadside lunch counter set in a cut of the black rock, one lit window.

**Salt playa** (`T` −44 to −26). A dry lake: perfectly flat, pale, with a mirage band at the horizon and the largest sky in the game. This is the cheapest terrain to build (a plane) and the strongest night: starlight and moon on white ground, the road a dark ribbon. Few vertical features. *Destination:* a single dark timing hut and a sign, nothing lit. It is the one region that would earn an unlit stop, because the dark is the point there.

**Coast Range fog descent** (`T` −60 to −44). The road climbs out of the playa to a ridge, then descends into a marine layer lying in the valley below. You see the cloud top from above in clear light, then drive down into it. This is the inverse of the Cascade crossing on SR 14, where you climb into the cloud, so the two western hinges rhyme without repeating. Vegetation steps from chaparral to bay laurel and live oak to a first redwood grove at the bottom. *Destination:* a cold, empty roadside shrine of a diner, found inside the fog.

**Pacific coast** (the shared end of the western roads). Headlands, sea stacks, a grey sea with no visible waves beyond the surf line, fog lying on the water. The Coast Highway runs north and south along the cliffs and drops to the estuary at its north end. Sound is surf and foghorn-free quiet. *Destination:* one tidewater motor court on a headland, a sibling of Cinder Court.

**Cedar estuary and lower river** (`s` 62 to 95 on SR 14). The Fern Bend valley widens, the conifers give way to alder and spruce, and the river spreads into braids and tidal mud. Mist is thick and low. This is the west's slowest, wettest stretch and the natural end of the northwest spur. *Destination:* none; this stretch is for driving.

**Dry foothills, Cedar Gorge, Fern Bend** are already built. See [PACIFIC_NORTHWEST.md](PACIFIC_NORTHWEST.md) and the 2026-11-06 record in [ROADMAP.md](ROADMAP.md).

### East

**Painted mesa country** (`T` +4.6 to +24, past Starlite). Red and orange buttes and low mesas with layered rock, juniper, and slickrock washes. The basin lifts gently into a cuesta and the road passes through a gap in a hogback. Warm palette, long shadows at dusk, very good for the neon (red and cyan on red rock). *Destination:* a trading post with a neon arrow, closed for the night.

**The Divide** (`T` +24 to +46). A real mountain pass: juniper and pinyon climb to ponderosa, aspen and spruce, then a first snow patch at the crest. Temperature feel flips from dry-warm to cold. Switchbacks and rock cuts hide the handoff. At the crest the SR 89 spur leaves to the north. *Destination:* a pass summit pullout with a weathered elevation sign, in the pattern of Juniper Pass.

**Snow country** (SR 89 north, 36 km, dead end). Snow on the ground, snow-laden pines, and a road that narrows to a plowed track. The hush overlaps the northwest's muffling, so keep it for after the Plains and the Lakes. It ends at a snow gate. *Destination:* a closed lodge with a single lit window, at the gate.

**Great Plains** (`T` +46 to +84). Flat or gently rolling grass under a huge sky, cheapest terrain in the game. Warm summer dusk, crickets, a distant storm cloud with no lightning set piece. Grain elevators and a water tower stay dark. This is where waiting is the point, so it is also the longest region. The SR 61 spur leaves to the south at `T` +72. *Destination:* a drive-in movie screen with one lit sign.

**Gulf flatwoods and bayou** (SR 61 south, 48 km, dead end at water). Grass gives way to longleaf pine flatwoods, then live oak draped in moss, then cypress and black water. Humidity is the biome: thick air, halos on every light. The road ends on a causeway over the water. Dense insect sound conflicts with the sparse-insects rule, so use it only if the destination is a pocket of silence inside thick sound (see [MOOD.md](MOOD.md)). *Destination:* a fish camp on stilts with one beer sign reflected in the water.

**Farm belt** (`T` +84 to +102). Fenced fields, shelterbelt tree rows, woodlots that deepen toward the east, dark farmhouses that are silhouettes only. It is the transitional landscape from grass to deciduous forest, so it is also where the first maples and the first fog off the lake appear. *Destination:* none, the transition is the content.

**Great Lakes off-season strip** (`T` +102 to +118, east terminus). Birch and maple, a flat horizon of water, and a resort strip closed for the season: boarded kiosks, a "Vacancy" sign in grey light, an empty beach lot. The road ends on Lake Shore Drive at the water. *Destination:* one motel with a Vacancy sign.

## 4. How regions connect

Every junction between regions has to look different for a reason and has to *feel* like a threshold. Two rules govern all of them.

1. **Each neighbour inverts at least one axis** from the mood card: exposure, temperature, sound density, or light colour. If a new region does not invert something from its neighbour, merge it with the neighbour.
2. **The hinge hides the handoff.** The road never crosses a region edge on a straight run in open view. A bend, a crest, a cut, a bridge, a tunnel, or a weather front covers it, and the vegetation and ground overlap across several kilometres on either side.

| Boundary | Hinge device | Axis inverted |
| --- | --- | --- |
| Basin to cinder field | Cinder cones rise on the left and the shoulder turns black over a few hundred metres | Colour, texture |
| Cinder field to playa | A long grade drops onto the lake bed and the cones fall away behind | Relief, sky size |
| Playa to Coast Range | The road climbs a ridge, then descends into a cloud deck lying in the valley | Dry to wet, open to enclosed |
| Coast Range to coast | Fog thins at the last bend and the sea appears below the cliff | Enclosed to open, sound bed |
| Basin to dry foothills (exists) | The SR 14 fork and a rising mountain shoulder | Open to enclosed |
| Dry foothills to Cedar Gorge (exists) | Juniper Pass crest, then the cloud front arrives | Dry to wet, warm to cold |
| Cedar Gorge to Fern Bend (exists) | The bridge, then a river-bank forest | Exposure |
| Fern Bend to estuary | The valley widens, the canopy opens, the river braids | Enclosed to open |
| Estuary to coast | A tidal flat and a low bridge | Fresh to salt |
| Basin to mesa | A gentle cuesta and a gap through a hogback | Colour, scale |
| Mesa to Divide | Switchbacks and rock cuts, with the vegetation climbing | Warm to cold |
| Divide to Plains | The east descent opens a 180° horizon and the mountains fall behind | Enclosed to open |
| Divide to snow | A plateau above the tree line with snow underfoot | Sound density, colour |
| Plains to farm belt | Fences and shelterbelts appear, woodlots deepen | Open to partly enclosed |
| Plains to Gulf | The grass thickens, then pine and moss, then standing water | Dry to humid, sound density |
| Farm belt to Lakes | Maples and birch, then haze, then a flat horizon of water | Warm to cold-grey |
| Sunset basin to Starlite | Existing straight road, no hinge needed | none |

**Ecotones are fields, not lines.** Read the climate from position, as the Pacific Northwest rework already does. Each region contributes a moisture value, a temperature value and an exposure value that blend over 3–6 km across the boundary. Ground colour, vegetation, fog, cloud, sound and light all read from those fields. A U-turn or an approach from the other direction produces the same conditions, because nothing depends on distance travelled.

**The world coordinate system.** Keep one coordinate system and put each region's content at fixed world positions. The dev warp already lists far through-road stops out to km 200, though that range has not been driven or measured. Single-precision matrices quantise to about 1.5 cm at 200 km, which is the figure to watch. If shimmer appears past roughly 100 km from the origin, rebase the world origin at a hub (Cinder Court, Sunset, Starlite, the coast motel) while the player is parked or inside a hinge, so the rebase never shows. Do not build a second coordinate space per region.

**Reserved ground.** Build regions at their final coordinates even when the neighbours are not ready. If Great Plains is built first, fill `T` +4.6 to +46 with a plain steppe stand-in that is explicitly marked as a placeholder, and replace it with the mesa and the Divide later. Do not shorten the placeholder to save work, because the distances, mileposts, glovebox map and trip-card entries all depend on the final numbers.

## 5. Biome parameters

These are targets for the climate field, in the order a driver meets them. Fog far is the distance at which scenery is fully lost to haze in clear weather, then under full overcast. Values are starting points to be tuned in the build, not measurements.

| Region | Ground palette | Cover | Fog far (clear / overcast) | Sound bed | Light at dusk |
| --- | --- | --- | --- | --- | --- |
| Sunset basin | Tan sand, sage | Sparse scrub | 1400 / 1400 | Wind, sign hum | Burnt orange to violet |
| Cinder field | Coal black, tan | Creosote only | 1400 / 1100 | Wind, tyre crunch | Orange on black rock |
| Salt playa | Pale grey-white | None | 2200 / 2000 | Near silence, thin wind | Pink then cold blue |
| Coast Range | Olive, dark soil | Chaparral, oak, redwood | 900 / 330 | Soft wind, drip | Grey with a pink band |
| Pacific coast | Grey sand, wet rock | Dune grass, spruce | 700 / 280 | Surf, wind | Pearl grey and rose |
| Dry foothills | Tan to olive | Sparse ponderosa, sage | 1400 / 1000 | Wind in pines | Amber, long shadows |
| Cedar Gorge | Wet rock, moss | Fir, alder, moss | 1100 / 520 | River, wind | Cold grey-green |
| Fern Bend valley | Dark moss, fern | Fir, hemlock, cedar | 1000 / 520 | Rain bed, drips, river | Blue-grey, wet red neon |
| Painted mesa | Red and orange rock | Juniper, sparse | 1600 / 1400 | Wind, dry grit | Deep orange to violet |
| The Divide | Grey rock, pine duff | Ponderosa, aspen, spruce | 1500 / 700 | Wind in pines | Gold then cold |
| Snow country | White | Snow-laden pine | 700 / 350 | Hush, small wind | Blue on white |
| Great Plains | Straw, green grass | Grass | 2000 / 1500 | Crickets, wind | Warm gold, distant storm |
| Gulf bayou | Dark water, moss | Pine, live oak, cypress | 500 / 300 | Dense insects (only if destination is silent) | Humid amber haze |
| Farm belt | Green and ochre fields | Hedgerow, woodlot | 1200 / 900 | Wind, distant dog-free quiet | Warm grey |
| Great Lakes strip | Grey sand, birch | Birch, maple, beach grass | 800 / 500 | Lapping water, wind | Cold grey, pale pink |

## 6. Companion systems the atlas depends on

- **Glovebox map.** The 1963 Western Motor Guide grows by panels, not by zooming. Keep the desert overview as the first panel, add one panel for each spur and one for the coast, and draw the ring on a final overview page. The route catalog in `index.html` already holds stable IDs, mileage and connections for the desert and northwest, and is the single source for signs, the map and the mileage strip. Extend that catalog before building a region, not after.
- **Mile and kilometre posts.** A mile count that runs continuously along each named road, with the count restarting only at a junction sign, keeps distances honest across the whole network.
- **Fast travel.** The trip card (`Y`) lists stops by region and charges real clock time, gas, and trip miles. The first thing the player will notice about the long legs is the clock, so keep the card's arrival times honest. The dev warp (backtick) reaches any reserved `T` or `s` coordinate for testing.
- **Gas.** The fast-travel gas model uses 0.009 of a tank per mile, so a full tank is about 110 miles (177 km). The ring and the spine imply a filling stop every 60–80 km. Reuse the Sunset-style station as a rare, sparse sign of the same chain along the long legs, never as traffic or a settlement. Decide the fuel economy before building the far regions so the ring is drivable but not trivial.
- **Weather and clock.** Each region owns a cloud and rain pattern keyed to the same 24-hour weather timeline already used for the Pacific Northwest. The Plains want a distant storm, the Divide wants a slow passing front, and the coast wants fog that burns off slowly by day.
- **Sound.** One crossfade layer per region, driven by the same position fields as the ground, so tyres and wind change where the surface and exposure change.

## 7. Build order

Build in the order that keeps the world drivable and cheap at every step, and finish the foundation first as [AGENTS.md](AGENTS.md) requires.

1. **Finish the Pacific Northwest to acceptance.** Close the open checks on the 2026-11-06 record: the night and first-light passes, the offline `file://` run, driving across forest cells, and a named-laptop frame measurement.
2. **Cinder field, then salt playa.** Terrain and colour only, no new assets beyond rock. They extend the spine west cheaply, and the playa is the best night in the game.
3. **Coast Range and the Pacific coast.** They reuse the forest and fog work from the Pacific Northwest, and they close the western ring.
4. **Extend SR 14 to the estuary.** This completes the ring: the through road finally ends somewhere you can see from the other side.
5. **Great Plains, with a steppe stand-in for the mesa and the Divide.** [MOOD.md](MOOD.md) recommends this as the next region because the terrain is the cheapest. It is the project owner's call whether it goes before or after the ring.
6. **Painted mesa country, then the Divide, then the Snow spur.** They replace the stand-in and add the climb.
7. **Farm belt, Great Lakes strip, then the Gulf spur last, if at all.** The bayou is the heaviest region to build and its sound conflicts with the sparse-insects rule.

Each step needs its own mood card in [MOOD.md](MOOD.md), a route-catalog entry, and a roadmap record before code, and each ships with its map panel, signs and mileposts.

## 8. Open decisions

- **Ring or spine first.** Whether the west ring (steps 2–4) goes before the Great Plains (step 5).
- **How much of the east is the project.** The Snow, Gulf and Lakes regions are optional and could be dropped without breaking the atlas.
- **The Salt playa's unlit stop.** It needs an explicit exception to the one-warm-pool-in-a-large-dark grammar, or a lit window.
- **Fuel economy and filling stops** along the long legs.
- **Whether `T` is ever shown to the player.** The paper map and signs use mileage on each named road, so `T` stays a planning coordinate unless the owner wants a single combined count.
