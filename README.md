# Neon Gas — Route 66 Dusk

A small, walkable 3D vignette: one 1960s gas station, an empty desert highway, and the last light fading into a star-heavy night. Nostalgic Americana, with loneliness and stillness at its center.

## Play

Download `index.html` and double-click it in a desktop browser with WebGL and pointer-lock support. Click the entry overlay to look around.

| Control | Action |
| --- | --- |
| WASD | Walk |
| Mouse | Look |
| Shift | Run |
| Space | Jump |
| Esc | Release the pointer / show the overlay |

The game is entirely inside `index.html`, including Three.js. No installation, server, build step, CDN, separate asset downloads, or internet connection is required to play. Reload starts a new dusk; the current cycle reaches night in about five minutes and holds. Currently that clock also advances while the entry overlay is visible; pausing it is tracked in Phase 6.

## Development direction

**The graphics are a prototype. The next work is the graphics foundation, before additional atmosphere features.** More stars, particles, and audio cannot substitute for convincing station silhouettes, an expansive empty horizon, deliberate materials, and believable neon lighting.

- [AESTHETIC.md](AESTHETIC.md): canonical mood, composition, palette, and the two approved rendering styles.
- [ROADMAP.md](ROADMAP.md): implementation audit, ordered milestones, acceptance criteria, and verification procedure. Start at G0.
- [AGENTS.md](AGENTS.md): instructions for contributors and coding agents; requires roadmap updates alongside scene changes.
- [ASSET_GUIDE.md](ASSET_GUIDE.md): concrete model specifications, dimensions, construction recipes, free source candidates, provenance, and offline embedding instructions.
- [AGENT_PROMPT.md](AGENT_PROMPT.md): ready-to-copy prompt that asks agents to implement the graphical overhaul.

The current renderer uses crisp voxel geometry. Painterly flat-shade is the preferred alternative to evaluate for softer shapes and a lighter rendering budget. A style comparison and measured visual/performance review must precede choosing it; neither style overrides the mood or offline requirement.

The asset plan favors custom station/pump/sign models and selective free desert props. Downloaded art must be adapted to the same scale and material language, then embedded in the HTML. The asset guide includes a fully procedural fallback so unavailable downloads do not stall the game.

## Repository contents

| File | Purpose |
| --- | --- |
| `index.html` | The complete playable deliverable |
| `AESTHETIC.md` | Art direction and visual acceptance rules |
| `ROADMAP.md` | Priorities, dependencies, phase status, and validation |
| `AGENTS.md` | Contributor workflow |
| `ASSET_GUIDE.md` | Asset quality targets, modeling recipes, source candidates, and integration contract |
| `AGENT_PROMPT.md` | Implementation-agent launch prompt |
| `preview.jpg` | Existing AI-generated concept illustration; **not an in-game render or evidence of achieved quality** |

Do not add a framework, package manifest, generated build directory, or external runtime asset dependency for routine scene work. Only retain authoring files/preparation scripts needed to reproduce actual implemented assets, as described in the asset guide. Keep temporary verification files outside the repository. The embedded Three.js license must remain intact.
