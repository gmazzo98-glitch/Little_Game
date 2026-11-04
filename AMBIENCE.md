# Ambience — Neon Gas

The station should feel like the one place you can make out for miles. From the road it is a few small lights. Beneath the canopy it is painted steel, concrete, and the hum of a transformer. Inside, the desert is still there beyond the doorway, but you hear less of it. When you leave, those differences should make the station feel farther away with every turn of the wheels.

These are design notes and candidate experiments. [AESTHETIC.md](AESTHETIC.md) governs the mood, [ROADMAP.md](ROADMAP.md) records implementation and acceptance, and [ASSET_GUIDE.md](ASSET_GUIDE.md) governs asset work. The roadmap already records the dusk cycle, basic stars, GAS dips, wind, directional sign audio, footsteps, night insects, coupe engine, and the source-level moth and dust effects. Build on those systems. Keep additions compatible with the single offline HTML, the fixed idle camera, the empty highway, and the one-way descent into night.

## One place at five distances

| Where you are | What you can see | What you can hear |
| --- | --- | --- |
| Highway shoulder | Mountain layers, the receding telephone line, and a small red and cyan station silhouette | Open wind. The station's hum emerges only as you get close. |
| Driveway | The canopy separates from the building. The two pumps appear in warm pools. | Sand gives way to asphalt, then the harder sound of the apron. |
| Beneath the canopy | The underside of the roof, the edge of the pump island, and the doorway strip | The GAS hum comes from the sign's direction. Wind softens and steps land on concrete. |
| Inside the office | A warm wall, a worn counter, and a blue rectangle of desert through the doorway | Wind is muffled. A close, short footfall carries a little grit. The hum is faint through the wall. |
| In the coupe leaving | Amber gauges below the windshield. A red point diminishing in the mirror. | Soft V8 idle gives way to tire sound and wind as the player drives. |

Build these relationships so they work in either direction. A player can stand at the threshold, back out halfway, go around the building, or head straight for the coupe. Each change should follow where they actually are. The route is a review sequence, with no prescribed timing or triggers for a set piece.

## Sky, horizon, and the long road

- **Late dusk.** Keep burnt orange low and directional. Let the upper sky cool first, with enough purple remaining to separate the distant ridges. The nearest pole can still show its crossarm and the first few wire spans. Farther away, those wires should lose contrast progressively into haze.
- **Blue hour.** Introduce a few bright stars high in the sky before the dim ones become perceptible. The eye should have to leave the canopy for the stars to register. Preserve the low violet band long enough that the last light feels like it has somewhere to go.
- **Full night.** Let a denser field emerge with a faint, broken, oblique Milky Way. Try using brightness and placement within the current star budget before adding points. Keep a few brighter stars as anchors, give the rest restrained size and brightness variation, and keep any twinkle slow and independent. The band should read as depth when you look up, with plenty of dark sky around it. A small, cold moon disc can make sense of the existing shadow direction if its halo stays quiet.
- **Give the horizon a last readable edge.** Test a low, desaturated violet band that leaves just enough separation between mountain layers at night. The road still has to run straight out of sight in both directions. Review both views so the atmospheric layering works around the entire horizon.
- **Let the line vanish before the landscape.** At night, the nearest crossarm can remain legible while successive wires fade into the background and poles become silhouettes. Achieve it through contrast and fog. The actual poles and connected wires should still continue as the player travels.
- **Give the asphalt a middle distance.** Let nearby paint read as worn and dusty, then simplify the center dashes into a sparse rhythm before they blend into haze. In the coupe's headlight beam, a little pale shoulder grit can define the edge of the road. Review from standing height and from the driver's seat. The visible paint should help the eye judge distance without turning the road into a bright stripe.

Check the same highway and station views on fresh entry, near two minutes, at five minutes, and after the night hold. Also watch the intervening change from a fixed camera. The first star should be something a patient observer notices, with zero visible stars during orange dusk. The road and sky should still have large areas that draw very little attention.

## Light that gives the station shape

- **Three rhythms.** The red GAS tube can falter briefly. Cyan trim should look steady. The office should feel almost constant. Keep the tube, its spill, its hum, and the electrical tick tied to the same dip. Tune the effect by watching what happens to the nearby surfaces when the sign recovers.
- **A red reflection at one angle.** Test a faint trace in the dark storefront glass that fades with the tube. It should sit within the pane and become easiest to see as you pass obliquely. Use a soft local treatment aligned to the real sign and pane. At most angles the glazing should retain its own dark value.
- **A line across the threshold.** Put a narrow warm strip where light can actually leave the open doorway. Let it pick out the lip of the sill and a little apron, then taper. From inside, the dark blue opening and the lit floor should frame each other. Keep the aperture physically walkable.
- **A side that goes quiet.** Walk around the corner and let the canopy pools and the hum fall away. The rear wall needs just enough cold fill to read as a plane, with a little tonal separation at its base. Round the other corner and recover the warmth in stages, starting with light catching the ground before the pump island comes fully into view.
- **Let the pumps interrupt the light.** Keep the top of a crown readable in warm light and the hose legible against a quieter background. The island curb and column feet should carry small contact shadows. Inspect those silhouettes before raising the lamp levels.

The lit parts should be small enough that stepping out of them matters. Compare the road-facing view at thumbnail size and the glazing at walking distance. Use the existing light roles and shadow budget first.

## Sound you notice when it goes away

- **One wind bed, different shelter.** In the open, give the wind a slow, broad rise and fall. Beneath the canopy, reduce some of the higher edge while leaving the desert audible. Inside the office, bring the level and cutoff down farther. Use a short, smooth transition as you cross the doorway so pacing across the sill never sounds like a switch. Judge the difference by walking back out after standing inside.
- **Direction and obstruction are separate.** Keep the hum anchored to the physical GAS sign. Test a gentle drop in level and upper harmonics when the station shell lies between the listener and sign. The wall should matter even when you stand as close as you did outside. At the open door, let some sound leak back in from the right direction. Begin with the building and door geometry as simple acoustic boundaries.
- **Separate surfaces with texture.** Give the asphalt a dull impact, the sandy shoulder a softer scuff, the canopy concrete a slightly harder attack, and the office floor a dry grit tail. Preserve steps based on grounded travel. Compare surfaces at the same walking pace and level so differences come from the sound itself. Listen for clean stopping, jumping, landing, and the first step back after leaving the coupe.
- **Keep the office tail short.** If the room still sounds like the open apron, try a barely audible early reflection on steps. It should die between footfalls. A large reverberant room would make this small office sound empty in the wrong way.
- **Reserve night sounds for night.** Keep the existing insect chirps sparse. A quiet interval long enough to forget them is part of the mix. Try reducing their level while sheltered or inside the coupe. Electrical ticks should be close enough to place at the sign and rare enough to feel incidental.
- **Let the coupe close around the player.** Test filtering the exterior wind and hum while seated. With the engine idling, let its low pulse dominate gently. At speed, bring in a restrained rolling sound tied to actual motion, with a little more grit on the shoulder. After stopping and stepping out, the desert should feel open again. The engine response should follow the player's inputs, with the existing engine fade on exit.

Listen on headphones and laptop speakers. Walk an open-road-to-office loop and then the reverse, once at dusk and once at night. Test mute, unlock, tab hiding, and re-entry. At a comfortable playback volume, steps and the sign should be discernible close up and the quiet intervals should still feel quiet.

## A place worn by ordinary use

Choose a few marks with different viewing distances. The facade already carries the station's identity. Inside, concentrate wear where someone used to stand, reach, or hang something.

| Where | Candidate mark | What makes it believable |
| --- | --- | --- |
| Office wall | A pale calendar rectangle with two pinholes | Slightly less faded paint under the old footprint. Let the boundary soften into the wall. |
| Beside the counter | Four cleaner bolt marks where a fixture once sat | A small regular pattern interrupted by age, readable only when close. |
| Apron or base trim | A faded stripe broken by an old repair | A dull patch with a little color difference, with the original stripe visibly interrupted at its edges. |
| Door sill | A shallow, off-center worn spot | Put it where the clear walking route crosses the threshold. Let the narrow warm strip reveal the wear. |
| Counter and floor | A dull patch at elbow height and a worn crescent behind the counter | Align the two marks with where a person could plausibly have stood and turned. |
| Pump nozzle | Slight polish on the grip | Keep the cradle and recess dusty so the contact point reads at arm's length. |
| Pump meter | A rubbed inspection stamp with a year and initials | Small, faded, period-appropriate lettering on the existing meter art. The main dial remains the first thing you read. |

Start with the calendar ghost or the floor crescent and see if one is enough for the office. Reuse the station's paint and texture methods. The best marks read first as changes in the material, with their meaning becoming apparent as you approach.

## Interior proposal — the Sunset Service office

From the pump island, the open office door is a narrow cut in the cream wall. A low strip of amber catches the worn sill. The cyan canopy still lights your side of the doorway. The warm strip is the only part of the room you can see clearly until you take a step closer.

Inside, there is room to stop just beyond the door. The wind loses its edge. To your right, a single enamel-shaded lamp picks out the front lip of a service counter and the blank window of a mechanical till. At the back left, a parts bench sits under two long shelves, one nearly bare. Between them, the floor is worn along the route people took from the door to the counter. Turn around from the back wall and the doorway frames a piece of blue desert. At night, the red of the GAS sign may briefly weaken on the glass as its hum drops.

### Layout and furnishings

Use the existing single-story shell as one room with two functions. The public counter faces the entrance from the right. The parts bench and its cabinet sit against the left rear wall. Keep a clear central aisle from the open door to the rear wall, and leave enough space to round the counter and turn back without catching on furniture. A short loop inside the room is enough to let visitors see the same fixtures from different angles. The coupe, two pumps, and highway remain the other places to go.

| Area | First impression | Detail at walking distance |
| --- | --- | --- |
| Door and sill | Cool jamb around a warm strip on the floor | Scuffed metal at the latch, a shallow worn spot off-center on the sill, a few chips in the faded teal paint |
| Public counter | Long cream laminate edge above faded teal panels | A recessed toe kick, one polished elbow patch, a small empty change tray, and a mechanical till with a dark display |
| Parts bench | Broad, dull timber worktop and shallow shelves | Oxidized drawer pulls, four bolt marks where a bench fixture used to sit, and one shelf edge marked with a painted stock number |
| Near wall | A low, sun-faded red drawer cabinet | Worn label slots and one replaced pull in a slightly different finish |
| Back wall | Quiet cream plaster with a faded service board | A pale calendar ghost and two pinholes beside the board, plus a former coat-hook hole lower down |
| Front glazing | Dark panes with deep sills and a hint of old blinds | Dust at the lower edge, small surviving sections of louvre, and a reflection that belongs to the sign outside |
| Floor | Muted, worn commercial tile | A broad crescent of polish in the path to the counter, dulled tile at the entrance, and old repair grout beside the bench |

Begin with the counter, bench, sill, floor, and service board. The till and red cabinet can follow if the room needs clearer silhouettes. A few fixtures with weight and joinery will carry the room. Keep the counter surface mostly bare. The sill, counter, and bench each deserve one characteristic wear pattern that can be seen under their own light.

### Light and sound from inside

- **The room's anchor is a small warm pool.** Place one warm source beneath an enamel shade above the counter, with enough reach to reveal its front edge and a little of the floor. At dusk the doorway provides broad cool fill. At night let the back corners darken while the aisle and door stay easy to read. Try relocating or reshaping existing lighting first and inspect the exterior for light leaking through the walls.
- **Carry neon across the threshold in pieces.** The canopy's cyan can touch the upper jamb or the inside lip of the sill where the geometry permits it. The red GAS sign can leave a weak, angle-dependent mark on the pane that faces it. The red trace should dip with the actual sign and its hum. The counter light should stay nearly constant through that dip. Compare the window from inside, outside, and at the angle where the trace should fall away.
- **Let the room sound smaller.** Crossing the sill should soften the wind and dull the higher part of the hum. The open doorway should admit some of both, and standing near the back wall should make them harder to place. Give the tiles a dry, close impact with a little grit, then try a very short room reflection only if the surface change alone feels flat. The shift should work while walking slowly, backing out halfway, and standing still in the doorway.
- **Give the eye time to settle.** The pale laminate edge and doorway strip should guide you at night. From the back wall, the blue opening becomes the brightest outdoor shape in the room. Let the appearance follow the fixed light sources and the existing five-minute cycle so the change is visible even while standing still.

### Lore told by the fixtures

**Proposed fiction.** Hart and Vale ran Sunset Service as a small highway stop that gradually took on repair work. The two surnames can appear together once, on a sun-faded service board. They suggest a history of ownership without assigning roles or inventing a dramatic fate for either person.

| Year | A trace the player could find | What it suggests |
| --- | --- | --- |
| 1961 | A faint original **AIR & WATER** line on the service board | A modest fuel stop where a driver could pull in for the basics |
| 1964 | **BELTS / HOSES** lettered in a slightly different hand below it, with shallow wear along the parts bench | The work grew from serving cars to keeping them going |
| 1966 | A smaller **PARTS BY ORDER** strip screwed over part of the board | The station stocked less and leaned on orders before the room emptied |

The dates are possible inscriptions, with 1966 as the latest surviving one. A player should be able to infer the sequence from old paint, the bench, and the shelf even if they never read the board. Leave the reason the station went quiet open. The calendar is gone, the till is empty, the doorway stays open, and the sign still hums. Those details can coexist without an explanation printed on the wall.

Two follow-up ideas if the room feels too anonymous after the first pass:

- **A stock code that connects two places.** Paint a small code on an oil-cabinet drawer and repeat it in a faded stencil on the matching shelf. A visitor who notices both can piece together how the room was used.
- **One permanent repair.** A replacement section of counter edging, slightly lighter than the original, crosses the most worn spot. Give it old fasteners and soften its edges into the surrounding wear. It tells a smaller, more believable story than another written note.

### Twenty-four more lore proposals

The business may have grown by getting drivers back on the road with what was at hand. That gives Hart and Vale a shared history without spelling out who did which job. The evidence can run from a generous promise on the forecourt, through years of improvisation at the bench, to the gradual thinning of what the station offered. Each entry is a candidate. Several tell overlapping parts of the story, so the room can stay spare.

**What people came here for**

1. **Water was for everyone.** Near a capped pipe beside the approach, a surviving fragment of painted lettering reads **WATER • NO CHARGE**. The pipe and the chalky mineral fan below it make the offer legible even if the letters have faded. Let low dusk light catch the deposit at ankle height.
2. **They worked on cars pointed either way.** Two old, almost buried wheel-stop scars sit at opposite angles along the edge of the apron. They hint that drivers pulled over from either direction and stopped where the hose would reach. Let the two scars become apparent from opposite approaches.
3. **They kept change for the road.** The counter's shallow change tray has narrow coin channels, one rubbed down to bare metal. Angle it so the lamp only picks out the polished groove from the customer side. The wear implies thousands of small transactions.
4. **Directions were part of the service.** Below the counter glass, preserve a small, bleached mileage strip with east and west arrows and distances to fictional stops. A scratched correction on one number suggests somebody measured it again. Keep the strip visible only from the place where a customer would have stood.
5. **The office once offered a place to wait.** Two rounded scuffs at chair-leg height and a darker patch beneath the front pane mark a former waiting spot. From that patch you can see the pump island through the door. The missing chair lets the empty space do the work.
6. **The wind used to ring the doorbell.** Leave a small, tarnished spring bell mounted above the open door, with its striker held back by an old bent clip. The spring and clip tell the story at close range. Its present silence fits the way the wind drops at the threshold.

**How they kept things working**

7. **The bench was sized around ordinary jobs.** Mark three graduations directly in the bench edge under a thin coat of varnish. A belt could be stretched along that edge to judge its length. Let the shortest interval be easiest to read, where hands wore through the finish.
8. **One drawer never belonged to the cabinet.** Give the red cabinet a shorter drawer shimmed into the opening with strips of wood. Leave the exposed shim ends dull and greasy. The carpenter's solution should read in silhouette when the bench light grazes it.
9. **They hung a funnel where it could drain.** Put a narrow dark stain below one surviving peg at the end of the bench and a lighter spot where the metal rim shielded the wall. The tool is gone and the habit remains visible. This could stand in for any loose tools on the worktop.
10. **Someone learned where the floor ran downhill.** Use a small, shallow drainage groove that starts beside the bench and ends at a flush, sealed floor grate. Tile edges near the groove show that it was cut after the room was built. Keep the grade and collision flat where the player walks.
11. **The bench had a second life.** Let one end of the timber worktop retain a sliver of stenciled shipping text beneath its edge. It only resolves when you walk around the end and look back. It suggests they built the bench from what arrived at the station.
12. **One pump took longer to fix.** A small service plate on the back of one pump carries two crossed punch marks next to a fastener of a different finish. Give the other pump a plain plate in the same place. The comparison makes the repair feel specific to this station.

**How they kept the lights on**

13. **The sign came before the canopy trim.** Run the older sign conduit along the wall in a straight line. The newer cyan feed steps around it on shallow saddles. Both can follow plausible physical routes without adding a readable label or another light.
14. **They left one circuit separate.** Inside the office, a small Bakelite switch plate has worn lettering for **SIGN** and **COUNTER**. Its placement suggests somebody could keep the sign alive while working under one interior lamp. Make it a fixed fixture with enough shape to catch amber on its edge.
15. **A storm once moved the sign.** At the sign base, show a hairline offset between the original bolt pattern and a later, slightly rotated mounting plate. Set the cabinet square enough to read from the road. The repair is a close detail and leaves the highway silhouette intact.
16. **A letter survived a replacement.** Give one GAS letter an old paint shadow offset a little from its current tube. Its newer fasteners can read a shade darker than the others. A dip might briefly make the shadow easier to see, using the existing synchronized sign behavior.
17. **They shielded the lamp to see the road.** Give the counter shade a dark rolled lip on its window side so the lit work surface stays visible while the pane stays dark. The idea can be tested from the position where someone at the till would have looked out. It explains the room's directional light through a physical choice.
18. **They moved the sign hardware away from the counter.** A patched cable hole low behind the till and a newer conduit high near the outer corner imply the original feed was rerouted. Use the current sign hum to locate the present source outside. The old hole can read as a tiny patch in the plaster.

**What was pared away**

19. **Their hours got shorter.** Paint an old closing hour on the lower edge of the office pane, then leave the faded outline of a smaller strip that once covered it. Only a few characters need to survive. Keep it low contrast so it reads after the main **OFFICE** lettering.
20. **A service line was painted over.** Under the service board's **PARTS BY ORDER** strip, let two letters of an older line remain visible at one edge. Give the older paint a wider footprint so the replacement reads as a deliberate edit. This could replace an extra dated inscription while still connecting the years.
21. **They stopped filling every bin.** Leave narrow strips of dark wood at the shelf edges where removable dividers once stood, with the fullest set of scars on the lowest shelf. The lower shelf suggests the years of heavier stock, and the long upper shelf gives the eye somewhere to rest.
22. **The route was patched one turn at a time.** On the driveway, add a small wedge of older asphalt whose seam follows the wide arc a car would take leaving the pumps. Let the coupe's headlights reveal it at night on departure. Keep the seam level and faint in daylight so it reads as maintenance.
23. **The last thing anyone took down was ordinary.** Where a curtain rod used to cross the office window, leave one empty saddle bracket and two screw holes at the other end. The small asymmetry shows best when you turn back toward the window from the rear wall. It can coexist with the surviving short louvres if the rod sits below them.
24. **Someone left the place ready for another morning.** Give the latch a well-used hold-open catch with an old repair around its mounting screws. Seen from inside, the catch makes sense of the door's resting angle and frames the blue desert beyond. The open door can suggest a familiar habit while leaving the station's eventual fate open.

For a first pass, pair **Water was for everyone** at the approach, **The bench was sized around ordinary jobs** inside, and **The sign came before the canopy trim** outside. Add **They stopped filling every bin** if the room still needs a hint of how business changed. Those traces give the place a public face, a working history, and a sense of things thinning out. Let the service board carry the dates. Painted traces can share existing surfaces, while fixtures should earn their silhouette and stay out of the walking route.

### Review before expanding the room

Stand at the pumps and see whether the doorway reads at dusk, blue hour, and night. Stop just inside to judge the balance of amber on the counter and blue at the door. Walk to the rear wall, circle the counter, and return outside to check the aisle and the sound transition. At each time, check the windows from both sides and look for reflections that agree with the actual sign. Read the board from one step away, then back up until it becomes part of the wall. That is about how prominent the lore should be.

## Arrival, departure, and return

- **Arrival in fragments.** Look for cyan along the edge of the ivory roof, a sliver of red in a chrome hubcap, and a little warm color against the saddle vinyl. Use existing paint and metal shapes to catch the station's colors. As the coupe moves away, those accents should diminish with distance.
- **A cabin at night.** Keep the amber gauge faces readable and leave the road ahead the darkest large area in the view. Use the coupe's existing separation between instrument and cabin lights to make each control feel distinct. Keep reflections away from the part of the windshield the player uses to steer.
- **The station in the mirror.** Prototype a small rearward cue that follows the coupe's heading, the real sign position, and distance. The station starts as a small shape and eventually becomes a red point. It disappears when it leaves the mirror angle or passes behind an obstruction. If a convincing mirror needs a second scene render, measure it separately before committing to that cost.
- **Find your way back by color.** On the return trip, test whether the sign is the first recognizable part of the station. Then let the canopy line resolve, followed by the pump island and the warm doorway. Check both highway approaches so that the red marker feels physically located.

A useful playthrough starts inside the office. Stand still for a moment, walk out into the wind, start the coupe, and drive away. See how long the station remains identifiable behind you. Turn back and see which feature you recognize first. The contrast between being somewhere and being back out on the road is the emotional beat.

## What Sunset Service meant to people

The service board gives the station a public history. There is also a quieter history of people arriving tired, staying just long enough to get their bearings, and going on. The following are fictional possibilities for that history. Pick the ones that feel true together. A detail can guide the art even if the player never reads its full story.

### Before it was much of a station

- **The first light faced the road.** Before the canopy, Hart and Vale put a shaded lamp above the door. Its old mounting holes sit higher than the present trim. From the highway, the lamp would have been the first sign that somebody had gone to the trouble of staying open.
- **They built for the last hour of sun.** A strip of paint inside the west window reveal is several shades paler than the adjoining wall. The light used to reach the counter before the shade was fitted. You can imagine someone moving a stack of receipts an inch at a time to keep working in the glare.
- **People asked about the road ahead.** An old road map was pinned at standing height beside the counter. The cork still has clusters of holes at the bends and crossings, and a pale border where the paper covered it. The most handled part of the map would have been just beyond the edge of town.
- **The station name mattered more after dark.** Under the canopy wordmark, try a barely visible line from the earlier fascia reading **SERVICE UNTIL DARK**. Later paint covers most of it. The red sign still burns long after the last orange has gone out of the sky.

### The minutes people spent here

- **The driver and the passenger waited differently.** From the counter, you can see the pumps straight on. From the former waiting spot by the window, you see only the edge of a pump and a long slice of road. Someone sitting there would have watched the world they were about to return to.
- **Sometimes the relief was just getting out of the wind.** Put one patch of extra wear low on the inside wall near the door, where a boot heel might rest. Stand in that spot and the canopy hum is still faintly audible, but the wind has already softened. It was a place to stand for a minute without needing to buy anything.
- **The station lent things in a particular way.** A shallow cabinet recess is shaped for a hand pump, with a worn strap buckle and a tiny **PLEASE RETURN** plate. The recess is empty. The request sounds like it was made to neighbors even though most drivers were passing through.
- **One mark was made at a child's height.** At the low end of the counter, put a single shallow crescent where a shoe once dragged against the wood. Higher up the laminate is smooth from adult hands. Those two heights can suggest a family waiting through a repair without a photograph or a name.

### Hart and Vale, in the work they left

- **Two people kept records differently.** On a drawer face, one older stock label is centered in careful block lettering. Its replacement is written on the back of the same card in a quicker hand. The drawer still holds the same kind of part. The hands can recur once elsewhere, without assigning either style to a surname.
- **A repair was made to last through another summer.** A brass plate braces the corner of the window frame. Its screw heads sit slightly out of line because the installer worked around a split in the timber. At blue hour the plate catches the cold light while the surrounding paint goes dark.
- **They used the counter after closing.** Under the lamp, one rectangular patch in the laminate is duller than everything around it, as if paper was spread there night after night. Let the mark line up with the working side of the till. The amber pool still falls in exactly the right place to sit down and add up the day.
- **Somebody kept adjusting the door.** Show several generations of thin shims behind the lower hinge. The top layer is cut more neatly than the others. From where the player crosses the sill, it can be almost invisible. From inside, it gives the open door the weight of something that people cared for over years.

### How it got quieter

- **The room shrank before the building did.** A former row of parts displays leaves a series of pale vertical bands along the back wall. Only the bench and one useful cabinet occupy that side now. The empty space tells the same story as **PARTS BY ORDER** at a distance where you cannot read the board.
- **The last posted hours were tentative.** A worn recess below the office lettering once held a reversible hours card. Let one edge of the metal clip be brighter from turning. The card has disappeared. The clip suggests that keeping regular hours gradually became harder.
- **Small jobs may have lasted longest.** Leave a shallow pattern of round impressions on a rubber mat at the bench, the kind that could come from setting down washers and fittings. The larger stock outlines on the wall have faded further. The difference suggests a place still finding uses for itself as business narrowed.
- **The power was left on for a reason we can imagine.** Give the exterior sign feed a tidy little repair where it passes through the wall. At full night, the hum becomes easiest to hear from the empty driveway. Somebody considered that light worth fixing. The scene can leave open whether it was for drivers, for the station, or for the person who had to lock up.

### Feelings to test on a walk

| Moment | Feeling | What could carry it |
| --- | --- | --- |
| You first make out the station | Relief at seeing a place to stop | The GAS sign resolves while the building is still a dark shape |
| You pause at the door | The small comfort of shelter | A trace of warmth at foot level and the wind dropping just inside |
| You stand where a customer stood | A sense of having arrived late | You can see the place for your change and the place someone would have stood across from you |
| You look closely at a repair | Affection for the care someone took | A shim, brace, or correction made by hand, where a factory part would have been simpler to draw |
| You turn back toward the highway | The wish to stay another minute | The lamp still holds its small pool while the doorway has turned blue-black |
| You see the station after leaving | Distance felt as a loss of detail | The lettering goes first, then the canopy, then the remaining color |

Read the same traces from two positions. From the road, Sunset Service can feel like relief. From behind the counter, the road can feel like a whole evening of waiting for someone to arrive. Those two views give the station a story in the present as well as a past. The camper and motel remain open choices while that story takes shape.

## Camper or motel

For the current vignette, the stronger addition is a trace of a motel. The existing coupe already gives the player a small shelter they can carry out into the dark. A second working vehicle would divide that role, and a standing motel would give the player a second destination beside Sunset Service. Both change the premise enough to deserve their own scope decision.

| Idea | What it adds | What it changes |
| --- | --- | --- |
| Working 1960s camper with a full interior | A private room on wheels. Stop on the shoulder, switch on one amber lamp, and watch the station through a small window above the bench seat. | Best as a possible replacement for the coupe. A camper makes stopping and settling in part of the experience. Its larger silhouette and slower departure also change how the forecourt and highway feel. |
| Small roadside motel | The melancholy of places made for brief stays. A closed office window, blank key rack, and row of dark doors would carry their own history. | Best as the center of a separate vignette. Even a dark motel creates a second frontage to explore and shifts the sense of isolation toward a roadside settlement. |
| A motel remembered at Sunset Service | A single faded mileage strip beneath the counter glass can name a fictional motor court farther down the highway. The player can stand outside afterward and look in that direction. | Gives the empty road a past within the existing station. It can use the proposed mileage strip from the office lore, with the name visible only at reading distance. |

If a camper becomes the main vehicle in a future version, give its interior a bench that folds flat, a shallow enamel sink, a narrow cabinet with worn latches, and one lamp. A rear window framing the shrinking GAS sign would give the interior a reason to exist in this particular landscape. A motel version could center on one guest room and an office, with a single vacancy light serving the same role as the GAS sign.

## Things the player can do

Pull off the highway at either end of the forecourt. The open lane runs along the road side of the pump island, under the canopy. You can stop in the light beside either pump or keep rolling toward the other connection. The parts drawer holds an old service slip from when drivers pulled through here.

At the rear of the coupe, use **E** or click on the trunk latch. A small amber lamp lights the luggage well as the lid rises. Pick up the tool case or canvas roll beside the parked coupe, then aim into the open well to stow it. The folded blanket and any stowed item can be taken back out. Press **G** to set a carried item on clear ground. The trunk needs to be latched before driving.

Carry the blanket to the padded bench below the **OFFICE** window. Use **Sit and unfold blanket** to settle with it across your lap. A small amber lamp warms the seat while the dusty storefront glass frames the pumps and the cold road. Sit as long as you like. Press **E**, click, or move to stand and fold the blanket back up. The canvas roll can rest beside you on the bench.

Aim at either pump nozzle and press **E** or click to lift it. The rubber hose stays attached to the pump and follows the nozzle as you move. Aim at the cradle to hang it back up, or press **G** to let it fall.

You can also get into the coupe while carrying the blanket. While parked, aim at the folded blanket on the passenger seat and press **E** or click to wrap it around yourself. The fabric crosses your chest and covers your knees. Look down and interact to unwrap it before driving. If you get out, you carry it with you.

While parked, press **R** or use **Read road map** at the glovebox. The 1963 map unfolds on your lap in the amber cabin light. The printed Cinder Court is the same name you can find on the office mileage strip, eighteen miles west of Sunset Service. You can look up and sit with the view outside. Stowing the map returns the cabin lamp to its switch setting.

The current prompts focus on actions that expose a detail, change the space, move cargo, or help operate the coupe. The lists below also preserve earlier design ideas. Fixtures such as the till keys, vise, and mail slot now read as scenery.

The current build exposes the station and coupe actions through **E** or a click when a fixture is within reach and under the aim point. The HUD names the fixture. Walk away to end a close view or a rest. The headlight, doorway wind, and sound behind the station respond to position or existing controls. The proposals below describe the intended feel of each action. See the roadmap for what the build and verification cover.

The office now has a counter, parts bench, and service board. A few interactions could make those places feel different after the player has spent time with them. Each proposal gives the player a local, immediate consequence. The dusk clock keeps its own pace, and the room can be understood on a walk through it.

| Interaction | What the player experiences | Why it belongs here |
| --- | --- | --- |
| **Try the dead air hose** | Lift the metal chuck just far enough to feel the weight of the hose. Squeezing the lever gives a small click. Release it and the hose settles back on its hook. | The old promise of air and water becomes something the player can test with their hands. |
| **Open one drawer at the parts bench** | The drawer catches briefly, then slides open a handspan. Amber light reveals a row of pale rectangles where parts boxes once sat. Close it with a hollow wooden knock. | The emptiness has a shape. The bench tells you more when you spend time with it. |
| **Turn over a stock card** | One fixed card in a drawer slot can tilt forward. The reverse carries an older part description in a different hand. Let it settle back when released. | Two people can be present in the lettering for a moment. |
| **Ring the counter bell** | One press makes a bright mechanical note with a short tail. Through the doorway you hear the wind again once it dies away. | A familiar gesture makes the empty space across the counter briefly matter. Try it with a single bell at the customer edge. |
| **Switch off the counter lamp** | The room loses its amber pool. The doorway and the faint neon on the glass come forward. Switch it back on and the counter edge returns. | The player can feel how much shelter one light provides. Give the lamp its own switch and let the exterior GAS sign continue on its own circuit. |
| **Tilt a short run of blinds** | A few slats turn together with a dry rattle. The gap frames one pump or a fragment of the canopy. The room stays mostly dark. | Standing at the window feels like looking out from somebody’s workplace. Keep the sightline local to the existing pane. |
| **Lean closer to the service board** | While held, the view moves a little toward the board. The dates and the screws in the newer strip become easier to read. Release to return to the normal view. | The player chooses to linger over the station’s history. The camera stays still at rest. |
| **Rest against the front sill** | A deliberate press settles the viewpoint a little lower beside the window. From there, a slice of highway fills the opening and the wind sounds farther away. Move to stand again. | Gives waiting a physical position. The change in viewpoint should feel small enough that you still know exactly where you are. |
| **Walk around a humming sign** | On the apron, the hum has a clear direction. Behind the office wall, the upper note drops away. Come back around the corner and it returns. | Walking itself becomes an interaction. The building has an audible edge and the sign occupies a real place. |
| **Pause the engine at the shoulder** | Stop the coupe and let the engine settle into silence. The last red light remains visible outside while tire noise and cabin vibration fall away. | Departure has a quiet midpoint. If the existing controls already cover this, refine the sound and sightline before adding a control. |
| **Open the coupe’s vent window** | A short latch movement and a little more exterior sound enter from that side. At a standstill near the pumps, the sign becomes easier to place. | Carries the office threshold idea into the existing coupe. The cabin can feel open or sheltered by choice. |
| **Use the headlights to read the apron** | From the stopped coupe, the beam picks out the driveway seam and the old water pipe at ground level. Turn away and they recede into the dark. | Gives the driver a second way to notice old maintenance and makes the return trip feel different. |

### A first playable combination

Start with **one bench drawer, the counter lamp, and the change in sound around the wall**. The drawer lets you touch the station’s past. The lamp lets you alter the room in the present. The sound change connects both to the desert outside. Place the drawer and lamp far enough apart that the player walks through the room to try both. Keep their states local. A drawer can stay where the player left it, and the lamp can stay on or off for the visit.

Try the sequence at blue hour. Follow the warm sill inside, open the drawer, and look toward the door with the lamp off. Turn it on again before leaving. Walk around the side wall and listen for the hum to thin, then return to the front. Check that the three interactions still make sense in reverse and that a player can walk straight through without using any of them.

The bench drawer and lamp can use a single nearby interaction input, with a small prompt while looking directly at the fixture. Opening, closing, and switching should work from either side where the player can reach. Check the drawer’s clearance from the aisle and keep the doorway and exit readable with the lamp off. Compare the sound from matched positions so the wall changes the sense of distance without an abrupt volume step.

## Fifty more interaction proposals

These are candidates to try individually. Each should make the place feel more particular through a gesture, a sound, or something the player notices. Give the room plenty of stretches where the player can simply stand and listen.

### At the counter

1. **Press a till key.** One brass linkage moves under the dark display and falls back with a dry clack. The worn key is easier to spot by its polish than by its number.
2. **Rock the empty change tray.** Tip the tray against its recessed edge and hear one short scrape. Its underside is the original color, still bright beside the surface worn by coins.
3. **Roll the stamp wheel.** Turn the knurled wheel of a fixed date stamp one notch. The rubber drum has an uneven face where the most used digits have flattened.
4. **Fold back the counter ledger cover.** A tethered ledger opens to one faded spread. Columns for cash and credit end at different places, suggesting how the station served regulars and strangers.
5. **Lift the counter gate.** A short hinged section at the end of the counter swings up with a wooden creak. Walk through and see the same room from where the attendant stood.
6. **Turn an old price drum by hand.** Thumb a loose wheel on a retired counter price display. One digit briefly lines up with its neighbors before the worn detent lets it drift.
7. **Slide the service window latch.** The bolt travels a fraction of an inch into its keeper. Years of trying to make it line up have left three little scrapes below the catch.
8. **Turn the hours-card clip.** Rotate the empty metal clip once. One side is lighter where the missing card shielded it from sunlight.
9. **Test the counter stool.** Give its seat a quarter turn and hear the dry bearing. A semicircle on the tile shows how often someone turned from the till to the road.
10. **Tip the mileage strip toward the light.** The westbound figures emerge as the glass catches the counter lamp. Viewed flat, the hand-corrected mileage nearly disappears.

### At the parts bench

11. **Crank the empty vise.** The screw takes up a little slack before the jaws move. The click at the end comes from the tool itself, close and small.
12. **Swing a bench stop into place.** A short steel tab folds up from the worktop and lines up with the old belt marks. A player can infer how somebody measured parts there.
13. **Turn the parts carousel.** Rotate a shallow fixed rack one position. The label frames pass through the light, showing which compartments were repainted and which stayed bare.
14. **Lift an empty shelf bracket.** A hinged bracket folds down against the wall. Its underside reveals a band of cleaner paint the width of a former shelf.
15. **Roll a tethered inspection mirror.** Tilt the little mirror at the bench and catch a sliver of the doorway. Its clipped shape gives you a new view of the room you just crossed.
16. **Slide a shop ruler out of its channel.** Pull it only to its stop. Two worn markings line up with the cuts on the bench edge.
17. **Press the treadle of a disconnected bench tool.** The lever moves underfoot and returns on its spring. You hear the link move beneath the worktop.
18. **Rotate a captive oil funnel.** The funnel pivots on its wall hook. The dark drip mark behind it becomes visible as the funnel moves aside.
19. **Brush dust from a recessed maker’s plate.** One pass exposes the shape of the old lettering. The surrounding dust softens its edge so it looks like something the player uncovered by hand.
20. **Lift the bench’s rubber mat by one corner.** The raised edge reveals older varnish underneath. Set it down and the bench looks like a surface somebody once wanted to protect.

### Under the canopy

21. **Lift a fuel nozzle from its cradle.** The hose draws a little straighter and the cradle lever rises with a click. Setting it back seats the weight with a dull knock.
22. **Turn the pump’s reset crank.** A partial turn moves the meter drums just far enough to hear the teeth catch. The faces settle back into line when the handle returns.
23. **Rattle a pump’s service flap.** The latch gives a little and the thin metal answers. Try the other pump and hear a heavier, shorter note from the repaired catch.
24. **Press a rubber edge on the pump island.** The old strip flexes under a hand and springs back. The exposed side shows where a tire once rubbed across it.
25. **Raise the water pipe’s hinged cover.** The cover clicks against its stop and reveals the capped fitting and mineral stain beneath. Lowering it makes the faded promise above it feel older.
26. **Turn a disconnected water valve.** The handle moves through a gritty quarter turn. The only sound is the stem turning against its seat.
27. **Lift the oil cabinet’s hinged label frame.** An older painted grade peeks out below the newer plate. The cabinet has served the same purpose through more than one coat of paint.
28. **Check the sign’s maintenance tag.** Turn a captive metal tag at the base of the GAS pole. Its reverse shows a penciled replacement-letter code, visible by the sign’s own light.
29. **Press the canopy’s old service button.** The button travels and rebounds with a tired spring. Its one local click gives the hand something to do before the open air swallows the sound.
30. **Run a hand over the driveway seam.** From a deliberate crouch, trace where a patch crosses the old paint. A fingertip gesture could reveal the difference between coarse asphalt and the smooth worn stripe.

### At the threshold and around the building

31. **Ease the office door a few degrees.** The hold-open catch allows a little play. Move it against that limit and hear the hinge shift as the amber strip changes shape.
32. **Touch the loose end of the door sweep.** The rubber flap bends back to show a thin line of cleaner paint. Its soft slap sounds different from the hard latch above it.
33. **Push the mail slot inward.** One push reveals a narrow strip of warm interior light from outside. Its return has a small, familiar metal flap sound.
34. **Tap the front glass once.** Near the center it sounds thin. Near the frame it sounds duller. The little difference is enough to make the pane feel like part of the building.
35. **Cup an ear at the wall grille.** A deliberate listen brings the short, hollow air sound of the grille forward. Step back and the broad desert wind returns.
36. **Nudge a loose louvre on the rear vent.** One slat moves a few millimeters with a small rattle. The warm front of the station feels farther away from this darker side.
37. **Knock on the wall beside an old repair.** The patched portion answers with a shorter sound than the hollow panel next to it. Both surfaces look nearly identical until you get close.
38. **Shade your eyes from the neon.** A held gesture raises a hand at the edge of the view. With the brightest tube covered, the mountain line becomes easier to make out.
39. **Sight through the old sign bracket.** Put your eye near an empty bracket beside the door. It frames the driveway and suggests where a smaller sign once told drivers to turn in.
40. **Stop just short of the sill.** Ease forward and hear the desert split between the exposed ear and the sheltered one. Turn in place and the balance changes with the doorway.

### In the coupe and on the empty road

41. **Dim the dash with its rheostat.** Turn the knob until the amber numbers sit just above the dark. The view through the windshield begins to carry more of the scene.
42. **Tip the rearview mirror by hand.** Adjust it a few degrees to bring the station into view after pulling away. A little farther along, the red point dwindles into the haze.
43. **Flip down the sun visor.** At dusk it cuts off a narrow edge of orange glare. The faded underside and its brittle hinge briefly fill the upper part of the view.
44. **Move the seat one notch.** Pull the lever and feel the seat catch just forward or back. The hood line changes against the horizon and the cabin feels like a physical space.
45. **Open the glovebox.** Its door falls only to the stop. Inside, a crease in the liner records years of carrying folded maps. The amber instruments just reach the edge.
46. **Check the ashtray.** Pull it out just enough to reveal a brighter strip of chrome that never saw daylight. Push it home with one restrained click.
47. **Switch off the cabin lamp from the passenger side.** Reach for the small switch and watch the cream headliner disappear into shadow. The amber instruments stay readable and the canopy becomes clearer through the side glass.
48. **Close the door gently.** Release it from close range for a subdued latch, or push it from farther out for a heavier thud. The sound makes the cabin feel separate from the open highway.
49. **Pull the parking brake on the shoulder.** The ratchet gives two or three clicks and the car settles. The gesture marks the difference between slowing down and choosing to stay for a moment.
50. **Step out and look back through the empty driver’s window.** From outside, the wheel and amber gauges sit between you and the horizon. The familiar cabin becomes one more small lit place in the landscape.

The gestures work best when the response belongs to the object. A wooden drawer can catch, a metal cover can ring, and a small switch can change how much of the room you see. For an early prototype, compare one interaction that reveals a trace of work, one that changes shelter, and one that makes departure feel deliberate.

## Order and review

1. **Finish the open G3 checks and revalidate the current cycle.** Use the real offline file, including pointer lock, movement, doorway collision, and the existing coupe. Establish matching views and a frame-time baseline.
2. **Phase 2 first.** Prototype the staged stars and faint Milky Way with the current budget. Then compare the remaining horizon and moon treatment against the baseline at dusk, blue hour, and night. Review both directions of the highway.
3. **Develop the threshold.** In the relevant light and audio passes, pair one doorway light treatment with one sheltered sound transition. Review it from both sides, then test the quiet side of the station. Try the glass reflection after the red, cyan, and warm roles already read.
4. **Select close details.** Try one office trace and one pump wear detail. Compare at the approach, at a few meters, and within arm's reach. Keep only details that help the station feel used and weathered.
5. **Review the coupe and the night idle.** Test the departure and return from both directions. Spend time standing still in the open and under the canopy. Judge the existing moths, dust, and insects in that context before adding motion.

For each accepted scene change, record the relevant views, offline and interaction checks, and whole-frame measurements in the roadmap. Compare changes at the same pose, cycle time, viewport, and pixel ratio on the same hardware. A detail earns its place when it makes one of the transitions clearer or makes a long, still view more rewarding.
