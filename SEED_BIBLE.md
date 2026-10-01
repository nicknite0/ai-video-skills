# WAN 3.0 Seed Bible

## Purpose

This is a living experimental reference for understanding how seeds affect WAN 3.0 video generation.

The goal is to separate:
- seed variation,
- prompt behavior,
- Director Skill behavior,
- and normal model randomness.

Do not assume a seed is good or bad from one generation. Record what actually happens and build conclusions from repeated tests.

---

## 1. Core Concept

A seed is a numerical starting point used by the generation process.

Simplified:

**Prompt + Settings + Seed + Reference/Skill Inputs -> Generation -> Video**

Changing the seed can produce a different realization of the same prompt.

A seed is **not a quality setting**.

### GOLDEN RULE — SEED VALUE != QUALITY

A larger seed number does not mean:
- higher quality,
- better prompt adherence,
- better cinematography,
- better continuity,
- better characters,
- or better motion.

The seed number should be treated as an identifier for a starting state, not a strength or quality scale.

Nearby seed numbers should not be assumed to produce nearby-looking results.

---

## 2. What a Seed May Influence

Changing only the seed may influence:

- character appearance
- facial details
- clothing details
- environment layout
- prop placement
- composition
- framing
- camera interpretation
- lighting
- color distribution
- character blocking
- movement
- action timing
- reactions
- background details
- continuity success
- overall realization of the scene

These are behaviors to observe experimentally. A seed does not directly instruct WAN to make any of these better.

---

## 3. What a Seed Does Not Replace

A seed does not replace:

- a clear prompt
- Director Skill instructions
- reference images
- continuity instructions
- spatial information
- good action sequencing
- good character descriptions

A strong seed result does not fix a fundamentally weak or contradictory prompt.

---

## 4. Reproducibility

The purpose of a fixed seed is to reduce generation randomness and make results more reproducible.

However, WAN 3.0 through a hosted generation pipeline may not be perfectly deterministic.

Therefore:

**Do not assume: Same Prompt + Same Seed + Same Settings = Identical Video until tested.**

We will classify reproducibility from our own WAN/Kie experiments.

### Reproducibility Levels

**EXACT** — generation is effectively identical.

**STRONG** — same composition, characters, blocking and scene structure with only small differences.

**PARTIAL** — recognizable similarities remain, but important details or motion change.

**WEAK** — generation is substantially different despite the same seed and settings.

**UNKNOWN** — repeat test has not been performed.

---

## 5. Experimental Test Modes

### NORMAL TEST — Seed 0

Most early Director Skill testing used Seed 0.

These tests remain valuable because they represent normal working generations and helped reveal recurring strengths and failures.

Do not discard historical Seed 0 tests.

### FIXED-SEED TEST

Use the exact same:

- prompt
- seed
- model
- duration
- resolution
- audio setting
- reference inputs
- Director/Skill version

Change only the variable being tested.

Example:

**A:** Prompt + Seed X + No Director

**B:** Same Prompt + Seed X + Director

This helps isolate the influence of Director Skill.

### RULE TEST

Use:

**A:** Director version A + Prompt + Seed X

**B:** Director version B + Same Prompt + Same Seed X

Only one Director rule should change when possible.

This is useful for determining whether a new rule actually changes WAN behavior.

### MULTI-SEED VALIDATION

A rule that works on one seed is not automatically proven.

After a controlled test succeeds, eventually test the behavior across additional seeds.

This helps prevent optimizing Director around one unusually cooperative generation.

---

## 6. Seed + Prompt Relationship

A future experiment should test whether a fixed seed preserves scene structure when the prompt receives one small change.

Example:

**A:** fixed seed + original prompt

**B:** same seed + prompt with one small detail changed

Observe:

- camera position
- environment
- character identity
- character position
- movement
- lighting
- scene structure

Do not assume a fixed seed will preserve everything except the changed detail. WAN must demonstrate this experimentally.

---

## 7. Seed + Director Skill Relationship

This is one of the primary uses of seed testing.

Controlled Director comparison:

**Prompt + Seed X + No Director**

versus

**Same Prompt + Seed X + Director**

Potential observations:

- shot selection
- shot discipline
- camera movement
- spatial blocking
- performance
- reaction timing
- physical interaction
- continuity
- story emphasis
- ending composition
- audio behavior

A fixed seed may allow us to determine whether a Director rule is causing a behavioral change instead of mistaking random variation for a skill improvement.

---

## 8. Seed Hunting

Seed hunting means keeping the prompt and settings unchanged while trying different seeds.

Purpose:

Find alternative realizations of the same scene without rewriting the prompt.

Do not label a seed globally as GOOD or BAD from one scene.

Instead record:

**Seed X worked well for Prompt/Test Y.**

A seed that performs well on a convenience-store scene may perform poorly on a fight, dialogue scene, horror scene or vehicle scene.

---

## 9. Seed Confidence Levels

### ⚪ UNTESTED
Seed selected but no meaningful result recorded.

### 🟡 OBSERVED
One useful generation has been recorded.

### 🔵 REPRODUCED
The same seed/settings were repeated and produced comparable behavior.

### 🟢 VALIDATED
Seed behavior has been examined across multiple prompts or controlled experiments.

### 🔴 UNRELIABLE
Repeated testing produced inconsistent or unhelpful behavior for the intended experiment.

These labels describe our confidence in observations, not the inherent quality of the seed.

---

## 10. Current Seed Log

| Seed | Test | Director | Settings | Result | Confidence | Notes |
|---:|---|---|---|---|---|---|
| 0 | Locked convenience-store clerk | ON | 15s / 480p / Audio ON | Mixed | 🟡 OBSERVED | Locked camera mostly worked. Clerk orientation was poor and the woman appeared duplicated. |
| 105031 | Locked convenience-store clerk | ON | 15s / 480p / Audio ON | Excellent | 🟡 OBSERVED | Stable locked composition, cleaner blocking, one continuous woman, clerk/counter remained stable. Analyzer detected 0 abrupt visual changes and 0 dark/fade frames. |
| 105031 | Exact reproduction test | ON | 15s / 480p / Audio ON | Pending | ⚪ UNTESTED | Repeat the exact generation without changing the seed, prompt or settings. |

---

## 11. Current Important Observation

The locked convenience-store experiment produced substantially different results between Seed 0 and Seed 105031.

Seed 0:
- locked camera mostly respected
- clerk orientation weaker
- apparent duplicate woman
- continuity issues

Seed 105031:
- locked camera respected
- stable foreground anchor
- cleaner background movement
- one woman remained readable
- woman progressed naturally toward checkout
- no abrupt visual changes detected by Video Director Analyzer

This does **not** prove Seed 105031 is better.

It proves only that Seed 105031 produced a stronger realization of this particular prompt in this observed generation.

---

## 12. Next Seed Experiment

When credits are available:

Repeat the successful locked convenience-store generation using:

- Seed: **105031**
- same exact prompt
- same Director Skill MD
- 15 seconds
- 480p
- Audio ON
- same WAN model/settings

Do not change anything.

Compare the new result against the first Seed 105031 generation.

Primary question:

**How reproducible is WAN 3.0 when the same seed and generation conditions are reused?**

---

## 13. Research Rules

When adding conclusions to this Bible:

1. Separate documented behavior from our observations.
2. Never promote one successful generation into a universal seed rule.
3. Prefer controlled tests where only one variable changes.
4. Keep failed tests; failures are useful evidence.
5. Record exact seed numbers.
6. Record model/settings with every important seed test.
7. Do not assume adjacent seed numbers behave similarly.
8. Do not assume higher seed values produce better results.
9. Do not assume seed behavior transfers between different AI video models.
10. Update conclusions when repeated testing contradicts an earlier assumption.

---

## Status

**Seed Bible V1 — ACTIVE EXPERIMENT**

Current strongest experimental seed result: **105031 / Locked Convenience Store**

Current most important unanswered question: **same-seed reproducibility on Kie WAN 3.0**
