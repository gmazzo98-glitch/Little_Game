# Neon Gas world and building directions

## What the game aims for

Neon Gas is a first-person road vignette set on a fictional stretch of Route 66 in 1966. The desert should feel larger than the places people built in it. The pleasure is in finding a warm pool of light after a long dark drive, touching something someone once used, and deciding whether to stay a little longer. Keep the horizon quiet, the colors weathered, and the player alone. The existing one-way descent from dusk to night continues throughout travel, visits, and the return.

This brief authorizes a future expansion beyond Sunset Service. Start with one visitable destination, Cinder Court. It supersedes the single-building rule in the existing art and scope documents only for the motel described here. Keep using [AESTHETIC.md](AESTHETIC.md) for mood and lighting, [ASSET_GUIDE.md](ASSET_GUIDE.md) for modeling and integration, and [ROADMAP.md](ROADMAP.md) for implementation and verification. Cinder Court currently exists in print only. The antenna below is a separate later proposal.

## The story behind the road

Sunset Service and Cinder Court grew up along the same highway. Travelers bought fuel and asked for directions at Sunset, then drove west to the motel if they were done for the night. A clerk at Sunset kept a small mileage strip in the office. Its faded entry for Cinder Court matches the folded 1963 motor guide in the coupe. The strip is a trace of ordinary hospitality. Someone once answered the same question so often they wrote the answer down.

As through traffic moved to a newer highway, the stops along this stretch began to close. At Cinder Court the owners shut the guest wing and left a few service circuits powered. Their sign and a lamp in a former show room still work. The room was kept furnished so travelers could see what they were paying for, which explains why the bed, chair, and mirror are still there. The rest of the motel tells the same story in quieter ways. Removed room numbers leave pale rectangles. An old mounting plate sits beneath a newer sign face. A sun-bleached rate card has two different prices under successive coats of paint.

The player is a lone driver passing through, with a coupe, an old map, and time to spend. Their history and reason for traveling are left open. The motel has no resident characters, traffic, or fresh signs of habitation. No journal entry needs to explain where the people went. The mileage strip, the worn fixtures, and the room are enough to tell the story.

## First destination — Cinder Court Motor Lodge

**Arrival.** Drive west from Sunset Service on the existing highway. The road should feel empty for several minutes. Keep the printed distance of eighteen miles as a period wayfinding detail and use a compressed starting target of roughly 4–6 km in the game. Tune by timing an ordinary drive in the coupe and record both distance and travel time. The motel sign should resolve gradually near the far end of that drive. Use haze, sightline, scale, and terrain to keep it from reading as Sunset's neighbor. Keep the main road continuous and use a modest turnoff with room to park, turn around, and rejoin in either direction. Walking the route is allowed. Driving is the intended pace.

**Exterior.** Build a single low roadside court with a small office volume, a short row of shuttered rooms, an overhang, and one grounded neon sign. The sign reads **CINDER COURT** with a smaller **MOTOR LODGE** panel. Try thin warm coral lettering and a restrained turquoise accent. Let the thin tubes and localized spill carry the color. The sign and a single window should be legible from the turnoff. The whole facade should sit quietly in the dark.

**One furnished room.** Make one room physically walkable. Use a recessed door, a glazed window, an old bed, a chair, a small nightstand, and a wall mirror. Frame the road or the sign from the window so the room gives the player a reason to pause. A warm amber lamp should feel intimate after the drive. The architecture, door swings, and furniture must leave a clear path back out. Other doors can be modeled as closed without interaction prompts.

**Interactions.** Open and close the room door with its handle, operate the bedside lamp at its switch, and open one nightstand drawer. The drawer can hold a faded motel rate card and a note showing that the show room was used for decades. Let players look closely at the object where they find it. Use the game's existing input and diegetic audio conventions. Each action should give clear feedback at the object, work independently, and be reversible. The coupe's glovebox and paper map remain the natural way to learn where to go. A player should also be able to discover the turnoff by driving west without opening the map.

**Return.** Leave the room, reach the parked coupe, and drive back to Sunset in the same session. At night, the motel should recede to a small point of light and then disappear. The emptiness between the two sites is part of the visit.

## Later proposal — a climbable relay mast

A decommissioned highway relay mast could stand along a separate service spur, far enough from both destinations to require its own trip. It once carried utility or dispatch traffic for this stretch of road. The shelter at its base is stripped. A faded maintenance plate and a locked cabinet suggest the people who drove out to service it. Its appeal is a high, quiet view of the desert, with the road reduced to a line in the distance.

If commissioned later, build an open steel lattice with recognizable tapered sections, bracing, anchor blocks, a service ladder, and a modest platform. Establish a reliable way up and down with visible attachment points and a safe landing before adding any extra interactions. Use deliberate mount and dismount controls and test both directions. A cabinet latch or a fixed maintenance plate is enough at the base. The mast should have no flashing beacon or ambient spectacle. Keep this proposal out of the first motel build so the road still has room to breathe.

## Model and integration standards

- Work in meter scale and the existing painterly direction. Build shaped neon housings, real openings, frames, sills, hardware, and furniture with recognizable silhouettes. Use bevels and joints where they catch light at eye level. Avoid filling the scene with small detail to disguise crude silhouettes.
- Prioritize the motel sign, recessed entry, window frame, room door, bedside lamp, and drawer as close-view assets. Model the door hinge and handle, the lamp shade and switch, and the drawer face, pull, and interior. Use baked or procedural wear at edges and contact points. Keep motel materials consistent with Sunset's faded enamel, dusty glass, oxidized metal, and desaturated stucco.
- Review each hero object from the road, the forecourt, and arm's length under ordinary scene light. Use readable lettering and modest, physically placed light spill. Keep contact shadows grounded and the night route navigable.
- Prefer custom models. Embed any selected licensed assets and record their source and license. Ship the playable game as one offline `index.html` with no runtime downloads or build step. Preserve the bundled Three.js code and license.
- Reuse terrain recentering, road generation, the existing car and controls, and the current lighting and interaction systems. Anchor the motel in world coordinates. Make its visuals and collisions enter and leave the active area together. The return trip should recover the same layout and session interaction state.
- If several agents contribute, assign one integrator to own `index.html` and shared materials. Model contributors should hand over dimensions, pivots, collision bounds, material roles, and preview evidence so the integrator can assemble one coherent build.

## Acceptance and playable branch

The first milestone is a round trip from Sunset Service to a walkable Cinder Court room and back. Verify approach and departure from both directions, parking and turning around, walking through the room doorway, all three room interactions, and state on return. Review matching dusk, blue-hour, and night views. Check the existing Sunset route, the glovebox sequence, and the continuous clock for regressions. Follow the offline, collision, syntax, and measured performance checks in [ROADMAP.md](ROADMAP.md). Record the actual travel time, model budgets, and test hardware. Keep the acceptance record open for anything unverified.

The playable branch is [`vibe/neon-gas-voxel-f660eb`](https://github.com/gmazzo98-glitch/Little_Game/tree/vibe/neon-gas-voxel-f660eb) in `gmazzo98-glitch/Little_Game`. Start from that branch or a work branch based on it. Follow [AGENTS.md](AGENTS.md) for integration and handoff. Once authorized to publish, land the tested change and its roadmap record on the playable branch, verify the remote file at the resulting commit, and give the player a link to that exact `index.html` and steps to reach the new location.
