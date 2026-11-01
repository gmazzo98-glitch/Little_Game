# Ambient Roadmap — "Neon Gas: Route 66 Dusk"

Canonical feature roadmap for the ambient/atmosphere systems of this project.
Every AI agent (or human) changing `index.html` should read this first, along
with `AESTHETIC.md`, and should keep the roadmap's phase statuses updated in
the same commit as any change.

## Hard constraints (apply to every phase)

- **One file.** `index.html` must remain fully self-contained: three.js
  bundled inline, no external assets, no network requests, no CDN. It must
  run from a double-click on `file://`.
- **No new life.** No people, cars, traffic, animals (except Phase 5 insects),
  music, or signs of recent human presence. See `AESTHETIC.md`.
- **Performance budget.** Steady 60 fps on a mid-range laptop; the scene is
  instanced-voxel based — keep draw calls low. Prefer animating existing
  uniforms/intensities over adding geometry.
- **Minified bundle.** The game script is a minified IIFE at the bottom of
  `index.html` (between `<script>` and `</script>`). Identifier names below
  are from the current bundle; **re-locate them by structure if the bundle
  changes**. The game code begins right after the three.js license block —
  search for the seeded RNG `function Vm(i)` (`pn(1966)`), everything after it
  is ours and editable.

## Code orientation (current bundle)

| Thing | Identifier | Notes |
|---|---|---|
| Renderer / scene / camera | `mn` / `Nt` / `Nn` | tone mapping ACES |
| Sky dome | `Xm` | `ShaderMaterial`, uniforms `sunDir` (+ `uNight` since Phase 1) |
| Stars | `Nt.userData.stars` | `Points`, `PointsMaterial` opacity is animated |
| Fog | `Nt.fog` | `Fog(0x2A1633, 45, 230)`, color lerped in the loop |
| Hemisphere light | `Nt.userData.hemi` | intensity dimmed at night |
| Moon directional | `Qt` | intensity raised at night |
| Canopy point light | `Ec` | subtle hum flicker |
| Pole-sign GAS neon light | `$n` | the flickering "last light" |
| Render loop | `Cc()` | all ambient animation happens here, per frame |
| Clock | `eg` | use `eg.elapsedTime` for long-period motion |

Voxel rendering notes (keep blocky, not Minecraft-flat):

- Detail voxels are subdivided at **0.35u** (`ce()` voxel step); ground /
  terrain cells pass `{solid:1}` and stay single 1u cubes for perf
  (~211k instances, 50 instanced groups).
- Voxel materials get an `onBeforeCompile` gradient: a smooth vertical
  brightness ramp (×0.85→×1.15 per voxel) so faces are not flat
  single colors. Cubes stay sharp-edged — no rounding.
- `os()` terrain height blends smoothly to 0 across ~6u from the road /
  station-pad rectangles (smoothstep on the distance to their union), so the
  street is level with its surroundings instead of a sunken trench.

## Phase 1 — Dusk-to-night cycle ✅ (implemented)

The core ask: a **slow (≈5 min), one-way transition from last-light dusk to
deep starry night**, never a fast toggle.

Implemented behavior (all driven from `Cc()` via a single progress value
`k = smoothstep(elapsedTime / 300s)`):

- Sky: new `uNight` uniform mixes the shader palettes
  (dusk orange/indigo → near-black night) and fades the sun disc + horizon
  glow to zero.
- Fog color lerps `0x2A1633` → night `(10,12,30)/255` keeping the gloom.
- Hemisphere light dims to ~20% of dusk value; moon directional gains ~+0.5
  intensity as it becomes the dominant cold light.
- Star field **tripled to 2600 stars**, opacity fades in from `k = 0.3`
  (blue hour) to full night — stars must not be visible in the orange dusk.
- Neon: the GAS pole sign (`$n`) flickers like an unhealthy old tube
  (erratic dips, rare deep dropouts); canopy light has a faint hum shimmer.

Tuning knobs (all in `Cc()`): cycle length `300`, star fade start `0.3`,
flicker thresholds `0.93 / 0.9982`.

Acceptance: fresh reload shows orange dusk; after ~2 min the horizon glow is
gone and stars are emerging; after ~5 min it is full night with a dense star
field; at no point is there a visible "switch".

## Phase 2 — Star field & sky depth ⬜ (next)

- Twinkle: convert stars to a small `ShaderMaterial` with per-star phase
  (use a `seed` attribute), amplitude ~15%, two sine frequencies. Do NOT
  blink uniformly — real scintillation is per-star and slow.
- Milky Way: add a second `Points` cloud (≈4000, size ≤1.5) concentrated in a
  faint band across the sky at a fixed oblique angle; opacity ≤ 0.2, also
  gated by `uNight` progress.
- Moon disc: small glowing disc (sprite or shader dot in the sky dome)
  matching the `Qt` light direction; slight halo via bloom. Not needed to
  cast changing shadows.
- Acceptance: at night the sky reads as remote desert; twinkle is visible
  only when you look for it.

## Phase 3 — Neon character ⬜

- Per-sign flicker personalities (pole GAS sign: sputtering; canopy trim:
  steady with slow pulse; window glow: constant). Drive from a tiny flicker
  function table rather than ad-hoc sines.
- Animate neon **emissive voxels**, not just lights: `Gm()` groups voxels by
  color+emissive key into `InstancedMesh`es before clearing the map — keep a
  reference to the emissive materials (e.g. stash them on `Nt.userData`)
  so their `emissiveIntensity` can flicker in sync with the point lights.
- Acceptance: each neon element feels physically old and distinct; flicker
  is visible in the bloom, not only on the ground.

## Phase 4 — Ambient audio ⬜

Procedural WebAudio only (oscillators + noise buffers), no files:

- Wind: filtered brown/pink noise, slow amplitude LFO, stereo drift.
- Neon buzz: 60 Hz + 120 Hz hum, faint, spatially tied to the pole sign
  (attenuate with player distance to `(11,7,-10)`); buzz dips with flicker.
- Crickets: start after full night (`k > 0.9`), sparse chirps.
- Electrical tick on rare sign dropouts.
- Silence remains the default; every sound ≤ the wind bed.
- Acceptance: headphones give "middle of nowhere at night", not "game".

## Phase 5 — Ambient micro-life ⬜

- Moths: 8–12 small white voxel motes orbiting the canopy lights with
  wandering sine paths — the only motion the station "attracts".
- Heat shimmer: skip (dusk/night, not needed).
- Distant static train light on the horizon: a single dim moving point at
  the far end of the highway, once every few minutes, very slow. Optional —
  only if it doesn't break isolation; when in doubt, cut it.
- Tumbleweed: one every ~4 min crossing the highway; voxel sphere, constant
  slow roll. Must read as wind, not as activity.
- Acceptance: scene feels watched-over by absence, not by emptiness.

## Phase 6 — Stillness polish ⬜

- Very slow ground-level dust motes drifting through the canopy light cones
  (cheap: one `Points` cloud, additive, only under the canopy).
- Subtle camera idle sway (breathing amplitude, only when the player gives
  no input for >10 s).
- Settings guard: pause ambient time progression while the pointer is
  unlocked (overlay visible), so the cycle advances only while playing.

## Verification checklist (run for every ambient change)

1. Extract the script (`sed -n '/<script>/,/<\/script>/p'` minus the tags)
   and run `node --check` on it.
2. Confirm no new external URLs in the file (only the W3C namespace and the
   three.js forum doc-comment may match `https?://`).
3. Reload test at `t=0`, `t≈120 s`, `t≈300 s` — check the three acceptance
   keyframes of Phase 1 still hold.
4. Update the phase status table in this file in the same commit.
