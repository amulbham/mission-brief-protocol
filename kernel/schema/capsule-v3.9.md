# Capsule Schema v3.9

Kernel Track 1.5 carries capsule schema v3.9. Kernel version and capsule-schema version are separate namespaces.

## Canonical authority

- Base invariant: `CAP-000-CS`
- SCF invariant: `CAP-014-SCF`
- Witness invariant: `CAP-103`
- TAG invariants: `CAP-027-TAG-VGATE`, `CAP-021-TAG-TI`
- VSP invariant: `CAP-034-VSP-COMPLETE`
- Prompt sources: `../modules/15-session-context.md`, `../modules/20-capsule-schema.md`
- Delta registry: `../registry/invariants-1.5.json`

## Causal-entry order

```text
User Intent
Causal ID
Trigger
Received
Session Context
IC-Node
```

Session Context must precede IC-Node and must be no more than 240 characters. CAP-000 uses `BOOTSTRAP`; T1 onward uses the complete KV-Scribe-derived form.

## Required field groups

| Group | Required content |
|---|---|
| Causal entry | User Intent, Causal ID, Trigger, Received, Session Context, IC-Node |
| Identity and lineage | ID, Parent Capsule ID, Parent Hash, Name, Schema Version, Genesis Edge |
| Scope and execution | Scope, Goal, Constraints, Subroutine, PATH, RUNN Decision, KRONOS |
| Epistemic state | Facts, Closure Condition, Closure Formula, Closure Proof, Residue Type, Knowledge Residue |
| Verification | VERIFY Events, Witness Signal, Logic Debugger |
| Compilation | Insight, Directive, Governance, Ops |
| Audit | Audit Log, Capsule Status, Capsule Closed, Capsule History |
| Relations | Mesh Edges, Mesh Resolution, LINKS |
| Thematic state | Tags |
| Verification integrity | VSP_Status |
| Seal | SHA-256 over every preceding field in canonical order |

## SCF constraints

- Source: KV-Scribe only.
- Required callouts: turn, entry-snapshot capsule count, active mode, optional transition, session character, thread.
- Thread: existing SESSION_THREAD or sealed master Name, maximum 80 characters.
- Prohibited: local inference, evidence use, gate influence, Directive justification.
- Misuse: Logic Debugger Insight→Gov FAULT followed by FRP.
- Sequence: Flash-Sync → SCF → KRONOS → IC-Node.
