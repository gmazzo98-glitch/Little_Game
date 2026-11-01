# Working on Neon Gas

Read [AESTHETIC.md](AESTHETIC.md), then [ROADMAP.md](ROADMAP.md), before changing the scene. The user's current instructions take precedence. These files are the project's art direction and execution plan, not optional background.

## Scope

- Build one first-person, walkable 1960s gas station on an empty desert highway. Preserve melancholy, isolation, and stillness.
- Ship one self-contained `index.html`: inline Three.js, CSS, shaders, and game code; zero runtime network requests; double-click `file://` support. No build system or asset pipeline.
- Keep the repository small: the playable file, project documentation, this contributor guide, and the existing concept illustration. Verification can use temporary files outside the repository.
- Preserve the bundled Three.js code and license. The game begins at `function Vm(i)` with `var pn=Vm(1966)` inside the existing IIFE. The license notice is at the **end** of the script, not before the game. Locate these by structure if names change.

## Choose work from the roadmap

1. Start with the earliest unfinished dependency. **Graphics foundation G0 is next.** Sky effects, sound, and micro-life wait until the visual foundation passes.
2. Name the milestone and the visual problem being solved before editing. Prefer a focused change with a visible acceptance criterion.
3. Use one approved rendering style per change set. Crisp voxel is the current implementation; painterly flat-shade is the preferred alternative to evaluate. Do not silently switch styles or claim its projected performance gain as measured.
4. Keep `AESTHETIC.md` authoritative for mood and `ROADMAP.md` authoritative for priority/status. Update both when an agreed direction changes; do not create competing prompt or design documents.
5. Every `index.html` change must update the relevant roadmap status and validation record in the same commit, even when a phase remains in progress. Implementation and verified acceptance are separate facts.

## Non-negotiables

- Approximately five minutes from late dusk through blue hour to full night, one way, then hold. No toggle, loop, or reset on pointer unlock.
- Warm horizon, restrained cyan/red neon, desaturated desert, cold moonlight, and stars gated out of orange dusk.
- Empty highway. No people, vehicles, distant train lights, other buildings, campfires, music, or recent human activity. Sparse insects are reserved for Phase 5.
- No mandatory camera sway or theatrical effects. Idle framing stays still.
- Improve silhouettes, composition, palette, and light before increasing voxel density, bloom, or particle counts.
- Target steady 60 fps on a named mid-range laptop; record the actual viewport, pixel ratio, hardware, and measurements. Do not substitute instance or draw-call counts for frame-time evidence.

## Completion checks

Follow the verification procedure in [ROADMAP.md](ROADMAP.md#verification-and-completion). Extract **every** inline script and run `node --check`; inspect resource references and network-producing code; open the actual delivered file offline; review dusk, blue hour, and night from matching views; test movement/collision/pointer lock; measure performance for graphical changes.

If a check cannot run, record exactly what remains unverified and leave acceptance open. A concept image is not a game screenshot, and static code inspection is not visual approval. Report the changed behavior, evidence, limitations, and next unfinished milestone.
