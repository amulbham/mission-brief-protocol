## TAG System, TARS, TAG-VGATE, and Thematic Index

CAP-027-TAG-VGATE and CAP-021-TAG-TI establish the thematic layer. Tags connect capsules by thematic identity without asserting causal dependency, sibling relation, or structural location.

### TAG / PATH Boundary

Tags are thematic identity. PATH is structural location. A tag may not reference a PATH, and a PATH assignment may not be inferred from tags. Tags do not replace DAG links, LCM edges, or DEX routing. Silent layer collapse is a protocol violation.

### Tags Schema Field

Tags compile at closure after `[LINKS]` and before `SHA-256`.

```text
Tags: [Slot 1: optional structural #tag | Slots 2–5: grounded minted #tags]
```

- Format: lowercase `#snake_case`, space-separated.
- Maximum: five total tags.
- Slot 1: STRUCTURAL AXIOM TAG, written only by DEX from the deepest applicable folder axiom. It is immune to displacement and absent when no folder axiom exists.
- Slots 2–5: up to four minted tags, including topic, epistemic-mode, and Dynamic Vector tags. Every minted tag passes TAG-VGATE before TARS PROPOSE.
- Tags come exclusively from the active Tag Registry. Freeform assignment is a protocol violation.
- An empty Tags field is permitted only when no folder axiom applies and no grounded minted tag is available.

### TR — Tag Registry

TR is the passive, append-only governed vocabulary stored by KV-Scribe.

```text
#tag_name | domain | rationale | first committed: CAP-[ID] | status: ACTIVE|INACTIVE
```

TARS alone appends or deprecates entries. Entries are never deleted. INACTIVE is permanent and cannot be reactivated. Future capsules may not use INACTIVE tags.

Kernel 1.3 initializes the 18 seed tags declared in `registry/tag-registry-seeds-1.3.json`.

### TARS — Tag Registry System

TARS is the registry clerk for vocabulary lifecycle. It has no reasoning, grounding, PATH, DAG, verification-threshold, or capsule-closure authority.

Firing points:

- **PROPOSE:** receives only TAG-VGATE-grounded minted tag candidates. Existing ACTIVE tag → APPROVED. New tag → held for one-line justification.
- **COMMIT:** absent justification or near-duplicate → BLOCKED. Clean candidate → appended to TR with metadata.
- **DEPRECATE:** ACTIVE → INACTIVE permanently; never delete.
- **DYNAMIC VECTOR CANDIDATE:** receives a TAG-VGATE-grounded RUNN candidate. Existing tag → match. New tag → PROPOSE/COMMIT.
- **DISPLACEMENT:** if Slots 2–5 are full, TARS alone decides whether a Dynamic Vector tag displaces the lowest-priority minted tag. Every decision is logged.

Any capsule or user may surface a tag concept; only TARS can commit it. RUNN cannot write TR or decide displacement.

### TAG-VGATE — Tag Relevance Grounding Gate

TAG-VGATE performs eliminative grounding before TARS PROPOSE. It is not a reasoning agent and has binary output.

| Outcome | Condition | Action |
|---|---|---|
| GROUNDED ✅ | Candidate appears in or is directly derivable from Facts, Knowledge Residue, or active Constraints | Pass to TARS |
| UNGROUNDED ❌ | No traceable connection to a verified capsule field | Block |
| RESCUE | A new fact is added to ground the candidate | Require Audit Log entry and VGATE clearance, then recheck |

Structural Slot 1 is exempt because location is its evidence. Every minted tag, including Dynamic Vector tags, must pass TAG-VGATE. Mode declarations pass as GROUNDED only when an explicit user or kernel mode declaration exists as verified session state.

TAG-VGATE does not rank, suggest, mint, deprecate, read or write TR, or audit prior capsules retroactively.

### Epistemic Mode State

The active epistemic mode is represented by exactly one of:

- `#mode_exploratory` 🔵
- `#mode_literal` 🟡
- `#mode_adversarial` 🔴
- `#mode_technical` 🟠

The active mode persists in KV-Scribe until an explicit change. A change replaces session-active mode state but does not deactivate the old vocabulary entry in TR. Axiom 4.6 may read the active mode as verified epistemic context; mode state does not weaken the contradiction or omission checks.

### Structural Axiom Inheritance

Folders may declare:

```text
PATH: /ROOT/[DOMAIN]/[SUBDOMAIN]
AXIOM_TAG: #[structural_tag]
SCOPE: FOLDER_AND_CHILDREN | FOLDER_ONLY
DECLARED: [ISO 8601 · declaring capsule]
```

DEX resolves ancestors at capsule open and writes the deepest applicable AXIOM_TAG to Slot 1 before TAG-VGATE and TARS fire. Direct author assignment to Slot 1 is a protocol violation.

### Dynamic Vector Tags

Dynamic Vector tags describe reasoning-event patterns rather than topics.

| Trigger | Condition | Seed outputs | Kernel 1.3 state |
|---|---|---|---|
| T1 Mathematical Anomaly | Fact crosses a declared material threshold | `#asymmetric_shock`, `#threshold_crossing` | ACTIVE |
| T2 Systemic Disruption | Pattern-breaking event across previously stable same-PATH residue | `#cascade_failure`, `#resource_scarcity` | ACTIVE |
| T3 Mode Transition | SCF SESSION:MIXED and a mode change recorded this turn | `#mode_transition` | LATENT until CAP-014-SCF |
| T4 Cross-Domain Match | Current pattern matches an existing DV tag from another PATH | reuse matching DV tag | ACTIVE when a verified GTIL match exists |

Handoff order:

`RUNN candidate → TAG-VGATE → TARS → slot`

1. RUNN identifies a trigger and emits `DYNAMIC_VECTOR_CANDIDATE` with an Audit Log event.
2. TAG-VGATE grounds the candidate against verified capsule state.
3. TARS matches or PROPOSES/COMMITS the tag.
4. TARS applies the displacement rule if the minted budget is full.
5. KV-Scribe writes the tag and `DYNAMIC_VECTOR_TAG` value at seal.

Trigger T3 cannot fire in Kernel 1.3 because SCF is not active. A single mode change or a hypothetical MIXED state is insufficient.

### GTIL — Global Thematic Index Ledger

KV-Scribe maintains a session-scoped inverted index:

```text
[TAG POINTER] → [append-only capsule ID array]
```

- Tag → capsules and capsule → tags queries are supported.
- A capsule ID appears at most once per tag array.
- SUPERSEDED capsule pointers remain because the historical thematic connection was real.
- Retrospective removal is prohibited.

### KV-Scribe Extensions

- `TR`: append-only vocabulary registry
- `Tags`: per-capsule assignments at seal
- `TAG_VGATE_LOG`: decisions and rescue events
- `STRUCTURAL_TAG`: inherited Slot 1 or null
- `DYNAMIC_VECTOR_TAG`: DV tag minted this turn or null
- `GTIL`: session-scoped inverted index

### Jurisdiction Boundary

- DEX inherits Slot 1 and manages folder axioms.
- TAG-VGATE grounds minted candidates.
- TARS manages vocabulary and displacement.
- RUNN identifies DV triggers only.
- VGATE sets fact-intake verification thresholds.
- Logic Debugger audits Facts → Insight → Directive.

Shared reads are allowed. Acting outside the assigned responsibility is a protocol violation.
