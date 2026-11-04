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

## Take the coupe out

The sea-green coupe is parked on the shoulder to the left of Sunset Service. Approach the driver-side handle, click it, then click the exposed driver’s seat. Close the door with the inside handle or **C** before driving.

| Driving control | Action |
| --- | --- |
| W / S | Accelerate / slow down and reverse |
| A / D | Steer |
| Space | Brake |
| Click DOME / PANEL / LIGHTS | Toggle the cabin lamp, instrument lighting, or headlights |
| F | Get out once stopped |
| R | Unfold or fold the road map while stopped with the glovebox open |
| E | Activate the part you are aiming at |

The normal mouse-look mode uses the center reticle for clicks. **Play with cursor and right-drag to look** lets you aim clicks with the visible mouse cursor.

While stopped, use **Open glovebox** on the passenger side. Aim at the folded paper on the inside of the lid and use **Unfold road map**. The cabin lamp lights the map. Use **Fold map** to return it to the open lid, then aim at the edge of the lid to close the compartment. Two roadside destinations stand an equal 4.6 km (18 period miles on the map and office mileage strip) in opposite directions from Sunset Service:

- **West (`x = -4600`) — Cinder Court Motor Lodge:** Turn **left** out of Sunset Service past the `WEST / ROUTE 66` shield and drive straight toward the **setting sun** to reach the motel, its coral-and-turquoise neon sign, and its walkable furnished show room (Room 1).
- **East (`x = +4600`) — Starlite Diner & Bar:** Turn **right** out of Sunset Service past the `EAST / ROUTE 66` shield and drive straight toward the **rising moon** to reach the 1960s streamliner diner and cocktail lounge, complete with its rose-and-gold pylon sign, glowing `BAR` neon window, checkerboard diner booths and pie/coffee counter, and soft-lit mahogany bar with a working bar lamp and bartender's till drawer.

[See the coupe's cabin at night](captures/coupe-cabin.jpg).

## Development direction

**The graphics are a prototype. The next work is the graphics foundation, before additional atmosphere features.** More stars, particles, and audio cannot substitute for convincing station silhouettes, an expansive empty horizon, deliberate materials, and believable neon lighting.

- [AESTHETIC.md](AESTHETIC.md): canonical mood, composition, palette, and the two approved rendering styles.
- [ROADMAP.md](ROADMAP.md): implementation audit, ordered milestones, acceptance criteria, and verification procedure. Follow the current unfinished milestone.
- [AGENTS.md](AGENTS.md): instructions for contributors and coding agents; requires roadmap updates alongside scene changes.
- [ASSET_GUIDE.md](ASSET_GUIDE.md): concrete model specifications, dimensions, construction recipes, free source candidates, provenance, and offline embedding instructions.
- [AGENT_PROMPT.md](AGENT_PROMPT.md): ready-to-copy prompt that asks agents to implement the graphical overhaul.

The selected renderer uses painterly surface meshes and modeled props. The desert is now a continuous, softly rolling surface with a world-space highway and distant layered mountain silhouettes. The player-centered terrain and camera-centered sky keep the background expansive; the old ground cube grid and rectangular mesa boxes have been removed. The historical voxel version remains in Git history only.

[View the actual before/after highway comparison](captures/landscape-comparison.jpg). These are browser-rendered review captures at a fixed dusk state, not concept illustrations. Close-up asset/light polish and performance verification remain tracked in the roadmap.

The station now carries faded Sunset branding, dusty recessed shop windows, porcelain-style cream/teal trim, readable vintage meters, visible cyan roof tubes, and quiet warm canopy lighting. [Compare the station detailing](captures/station-comparison.jpg). The [telephone poles and sagging wires](captures/telephone-line.jpg) continue along the highway in both directions and follow the player's progress through a bounded reusable pool.

The asset plan favors custom station/pump/sign models and selective free desert props. Downloaded art must be adapted to the same scale and material language, then embedded in the HTML. The asset guide includes a fully procedural fallback so unavailable downloads do not stall the game.

## Repository contents

| File | Purpose |
| --- | --- |
| `index.html` | The complete playable deliverable |
| `AESTHETIC.md` | Art direction and visual acceptance rules |
| [AMBIENCE.md](AMBIENCE.md) | Atmosphere ideas, design experiments, and review routes |
| `ROADMAP.md` | Priorities, dependencies, phase status, and validation |
| `AGENTS.md` | Contributor workflow |
| `ASSET_GUIDE.md` | Asset quality targets, modeling recipes, source candidates, and integration contract |
| `AGENT_PROMPT.md` | Implementation-agent launch prompt |
| `preview.jpg` | Existing AI-generated concept illustration; **not an in-game render or evidence of achieved quality** |

Do not add a framework, package manifest, generated build directory, or external runtime asset dependency for routine scene work. Only retain authoring files/preparation scripts needed to reproduce actual implemented assets, as described in the asset guide. Keep temporary verification files outside the repository. The embedded Three.js license must remain intact.
