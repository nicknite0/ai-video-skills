# LONG TAKE SEQUENCE

## PURPOSE

Create a coherent cinematic sequence that unfolds continuously across the full requested video duration.

Treat the user's prompt as the description of WHAT happens.
These instructions define HOW the sequence should be directed.

---

## CORE BEHAVIOR

- Treat the video as one continuous sequence unless the user requests cuts.
- Use the entire available duration to tell the requested action.
- Actions must occur in a logical chronological order.
- Do not rush all major actions into the beginning of the video.
- Do not begin with an action already underway unless explicitly requested.
- Allow actions to develop naturally before progressing to the next event.
- Every action must have a clear beginning, progression, and completion.
- Do not invent unnecessary events, characters, objects, or locations.

---

## TEMPORAL PLANNING

Before generating, internally organize the requested scene into sequential beats appropriate for the total video duration.

Do not force equal-length beats.

Allocate more time to important or complex actions and less time to simple transitions.

Example progression:

BEGINNING
Establish subject, environment, position, and initial action.

DEVELOPMENT
Progress the subject naturally through the requested events.

REVEAL / MAJOR EVENT
Allow important discoveries, interactions, or changes to occur clearly.

ENDING
Finish on a deliberate final action or composition.

Do not stop the video halfway through an important action.

---

## CONTINUITY

Maintain continuity throughout the entire sequence.

Preserve:
- subject identity
- appearance
- clothing
- scale
- environment
- lighting
- weather
- props
- object positions
- travel direction
- spatial relationships

Objects should not disappear, duplicate, transform, or move without cause.

Characters must not teleport between positions.

New elements should only appear when required by the user's prompt.

---

## CAMERA DIRECTION

Camera movement must support the action rather than compete with it.

Maintain understandable screen direction and spatial geography.

Camera transitions should be motivated by subject movement or scene events.

Use cinematic movement when appropriate:
- tracking
- following
- dolly
- pan
- tilt
- crane
- orbit
- push-in
- pull-back
- reveal

Do not add unnecessary zooms, spins, cuts, or dramatic camera movements.

When the user specifies camera behavior, prioritize their instructions.

---

## ACTION DISCIPLINE

Keep actions physically understandable.

Complete one important action before beginning an unrelated action.

Avoid simultaneous competing actions unless explicitly requested.

Movement should have believable acceleration, momentum, interaction, and stopping behavior.

Characters should interact with objects and environments consistently.

Do not substitute a different action for the action requested by the user.

---

## USER PROMPT PRIORITY

The user's prompt defines:
- subjects
- location
- requested actions
- story events
- desired camera ideas
- mood
- visual style

Do not rewrite the user's story.

Use these rules only to organize and direct the requested scene into a coherent long-take video sequence.

---

## AUDIO

Use natural environmental and scene audio only unless the user explicitly requests dialogue, narration, voice-over, music, or other designed audio.

- Do not add narration or voice-over automatically.
- Do not make characters speak unless dialogue is explicitly provided or requested.
- Preserve natural environmental sounds appropriate to the scene.
- Allow natural Foley such as footsteps, clothing movement, wind, weather, vehicles, objects, and environmental interaction when appropriate.
- Do not add music unless the user explicitly requests music.

