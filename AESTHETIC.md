# Aesthetic Direction — "Neon Gas: Route 66 Dusk"

This document is the reference for the look, mood, and feel of the demo in
`index.html`. Any change to the scene should be checked against this list.

## The core feeling

The single feeling this demo must evoke: **a lone gas station on a desert
highway, caught in the last minutes of dusk.**

It is nostalgic — but not warmly so. The nostalgia is the aching kind:

- **The 1960s, seen from decades later.** Chrome trim, porcelain pumps, a
  hand-painted GAS/OIL pole sign, Route 66 shields. Everything is period-
  correct, but nothing works anymore. It reads as a memory of a memory.
- **Loneliness as a design goal.** There is no one here. No cars pass. No
  second building breaks the horizon. The player should feel like the last
  person on the road. Isolation is not a bug in the scene — it *is* the scene.
- **Gloom without horror.** Dusk fading to a deep, star-heavy night. The
  darkness is melancholic, not threatening. The station is lit only by its own
  neon — the last lights — which makes it feel like a small, futile act of
  defiance against an enormous empty desert and an even bigger sky.
- **Stillness.** Nothing moves except the light. No music, no crowd, no
  traffic. The only sound the player brings is their own footsteps in the
  gravel. The scene should feel like it has been waiting here, alone, since
  1965.

## Light: the slow dusk-to-night transition

Light is the protagonist. The demo must run a **slow, continuous transition
from late dusk to full night**:

1. **Late dusk (start).** The sun has just set. The sky is a gradient of
   burnt orange to deep indigo, with the last warm light clinging to the
   horizon. The desert is dim; the station's neon is already on, but not yet
   the dominant light source.
2. **Blue hour.** The horizon warmth drains away. The sky becomes a cold,
   desaturated blue-violet. The neon (reds, pinks, cyan) starts to bloom and
   dominate — the station becomes the only color in the world.
3. **Full night.** The sky is near-black. **The stars take over.** A dense,
   rich star field — the kind of sky you only see far from any city — is
   essential. The Milky Way band should be faintly suggested. The moon is a
   single, cold, low directional light casting soft shadows. From here the
   cycle may hold or slowly return toward dusk again; it should never feel
   like a fast day/night toggle.

Transition speed: deliberately slow — on the order of several minutes of real
time for the full arc. It must feel inevitable, like watching the last light
leave. Easing should be gentle; no visible "switching" moments.

## Scene content cues

- **The station:** blocky 1960s single-story building. Flat roof, large
  window panes, a modest canopy over the pump island. Faded paint —
  cream/white walls with weathered teal or red trim.
- **Neon:** the main emotional carrier. Roof trim, window frames, and the
  GAS/OIL pole sign all glow. Red neon for GAS, cooler tones elsewhere. Neon
  flickers subtly and occasionally — an old sign that isn't fully healthy.
- **Pumps:** two vintage rounded pumps, slightly rotated, one cap possibly
  off or leaning — small hints of abandonment.
- **Signage:** Route 66 shield, a STOP sign at the empty intersection of the
  highway and the access road, maybe a faded "COLD DRINKS" or "OPEN 24 HRS"
  that no longer tells the truth.
- **Desert:** procedural flat-to-mesa terrain, sand and scrub tones pushed
  toward desaturation. Cacti. Telephone poles marching into the distance,
  their wires sagging — evidence that people were once here.
- **What must NOT be present:** people, cars, other buildings, campfires,
  signs of recent life. The highway is perfect, straight, and completely
  empty in both directions.

## Audio direction (if/when added)

Sparse and diegetic only: wind over gravel, a distant neon hum or buzz, an
occasional electrical tick. Crickets. No music. Silence should be the
default state.

## Reference keywords

`liminal` `americana` `dusk` `blue hour` `isolation` `starfield`
`route 66` `retro signage` `gas station at night` `melancholy` `stillness`
`empty highway` `last light`
