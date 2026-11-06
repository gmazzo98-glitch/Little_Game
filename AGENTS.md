# Working on Neon Gas

Read [AESTHETIC.md](AESTHETIC.md), [ROADMAP.md](ROADMAP.md), and [ASSET_GUIDE.md](ASSET_GUIDE.md) before changing the scene. The user's current instructions take precedence. These files are the project's art direction, execution plan, and modeling specifications, not optional background. [AGENT_PROMPT.md](AGENT_PROMPT.md) is the implementation launch prompt.

## Playable branch

The playable branch is [`vibe/neon-gas-voxel-f660eb`](https://github.com/gmazzo98-glitch/Little_Game/tree/vibe/neon-gas-voxel-f660eb) in `gmazzo98-glitch/Little_Game`. Players download and open the [branch's `index.html`](https://github.com/gmazzo98-glitch/Little_Game/blob/vibe/neon-gas-voxel-f660eb/index.html).

- Before editing, check the repository, branch, and remote. If the workspace is a plain folder without Git metadata, use a checkout of the playable branch or clearly identify the work as local-only.
- When authorized to publish a game change, land it on the playable branch and verify the remote `index.html` at the resulting commit. Test the player-facing action in that exact file before saying the change is available on the playable branch.
- In the handoff, name the branch and commit, link the playable file, and give the exact steps to reach the changed feature. State explicitly when changes are only local or live on a separate branch.

## Scope

[WORLD_LORE.md](WORLD_LORE.md) defines the world and the approved expansion brief. For tasks implementing that brief, build Cinder Court first and follow its limits. The single-station scope below describes the existing build.

- Build one first-person, walkable 1960s gas station on an empty desert highway. Preserve melancholy, isolation, and stillness.
- Ship one self-contained `index.html`: inline Three.js, CSS, shaders, game code, and any selected model/texture data; zero runtime network requests; double-click `file://` support. Playing the committed game must require no build, package install, or asset preparation.
- Keep the repository small: the playable file, project documentation, this contributor guide, and the existing concept illustration. Selected authoring sources, license records, or a reproducible preparation script are allowed only when genuinely needed for an implemented asset; see `ASSET_GUIDE.md`. Verification can use temporary files outside the repository.
- Preserve the bundled Three.js code and license. The game begins at `function Vm(i)` with `var pn=Vm(1966)` inside the existing IIFE. The license notice is at the **end** of the script, not before the game. Locate these by structure if names change.

## User-requested exception: the saucer and the asteroid outpost

The user asked for a hidden player-flyable saucer in the desert and, above the atmosphere, an asteroid outpost (landing strip, fuel stop, food truck, motel) lit in neon. This is a deliberate exception to "no other buildings" and the quiet-highway rule. Keep it contained: the ground game stays as written, the outpost exists only in space mode, and the saucer stays a single parked object until boarded. See the 2026-11-06 record in [ROADMAP.md](ROADMAP.md).

## Choose work from the roadmap

1. Start with the earliest unfinished dependency. G0 selected the painterly direction; finish G1/G2 visual quality and G3 verification. Sky effects, sound, and micro-life wait until the visual foundation passes.
2. Name the milestone and the visual problem being solved before editing. Prefer a focused change with a visible acceptance criterion.
3. Continue the selected painterly, non-voxel direction. The voxel version is a historical baseline, not a current alternative. Preserve the continuous desert surface and distant mountain backdrop; do not restore cube-grid ground, integer terrain heights, or box-shaped mesas. Do not claim projected performance gains as measured.
4. Keep `AESTHETIC.md` authoritative for mood, `ROADMAP.md` for priority/status, and `ASSET_GUIDE.md` for models and integration. `AGENT_PROMPT.md` points agents to those rules; it is not a competing design document. Update affected guidance when an agreed direction changes.
5. Every `index.html` change must update the relevant roadmap status and validation record in the same commit, even when a phase remains in progress. Implementation and verified acceptance are separate facts.

## Asset production expectations

- Implement finished hero models, not denser blockouts: station/window/roof layers, vintage pump crowns/meters/nozzles/hoses, a cabinet sign, and shaped STOP/Route 66 panels. Follow the dimensions, recipes, budgets, and close-view checks in `ASSET_GUIDE.md`.
- Prefer custom hero assets and selective free secondary props. External authoring assets are allowed; external runtime dependencies are not. Inspect the exact license and keep provenance for imported art.
- Map the bundled classes before using geometry helpers: there is no guaranteed global `THREE` namespace or GLTFLoader. Preserve one library instance, compatible APIs, and its license.
- If a team works on the game, one integrator owns `index.html` and shared materials. Specialists provide bounded builders/mesh data, dimensions, material roles, and collision bounds; avoid concurrent bundle overwrites.
- If baseline rendering/capture is blocked, record the missing check and continue safe independent modeling/source work. Do not claim G0/G3 accepted, and do not replace implementation with another roadmap or shopping list.

## Non-negotiables

- Approximately five minutes from late dusk through blue hour to full night, one way, then hold. No toggle, loop, or reset on pointer unlock.
- Warm horizon, restrained cyan/red neon, desaturated desert, cold moonlight, and stars gated out of orange dusk.
- Keep the highway quiet with one player-operated period coupe parked at Sunset Service. No traffic, people, distant train lights, other buildings, campfires, music, or recent human activity. Sparse insects are reserved for Phase 5.
- No mandatory camera sway or theatrical effects. Idle framing stays still.
- Improve silhouettes, composition, palette, and light before increasing voxel density, bloom, or particle counts.
- Target steady 60 fps on a named mid-range laptop; record the actual viewport, pixel ratio, hardware, and measurements. Do not substitute instance or draw-call counts for frame-time evidence.

## Completion checks

Follow the verification procedure in [ROADMAP.md](ROADMAP.md#verification-and-completion). Extract **every** inline script and run `node --check`; inspect resource references and network-producing code; open the actual delivered file offline; review dusk, blue hour, and night from matching views; test movement/collision/pointer lock; measure performance for graphical changes.

If a check cannot run, record exactly what remains unverified and leave acceptance open. A concept image is not a game screenshot, and static code inspection is not visual approval. Report the changed behavior, evidence, limitations, and next unfinished milestone.
