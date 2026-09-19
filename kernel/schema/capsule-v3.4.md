# Capsule Schema v3.4

Kernel Track 1.2 carries capsule schema v3.4. Kernel version and capsule-schema version remain separate namespaces.

## Canonical authority

- Base invariant: `CAP-000-CS`
- Change invariant: `CAP-103`
- Prompt source: `../modules/20-capsule-schema.md`
- Delta registry: `../registry/invariants-1.2.json`

## Required field groups

| Group | Required content |
|---|---|
| Causal entry | User Intent, Causal ID, Trigger, IC-Node, Received |
| Identity and lineage | ID, Parent Capsule ID, Parent Hash, Name, Schema Version, Genesis Edge |
| Scope and execution | Scope, Goal, Constraints, Subroutine, PATH, RUNN Decision, KRONOS |
| Epistemic state | Facts, Closure Condition, Closure Formula, Closure Proof, Residue Type, Knowledge Residue |
| Verification | VERIFY Events, Witness Signal, Logic Debugger |
| Compilation | Insight, Directive, Governance, Ops |
| Audit | Audit Log, Capsule Status, Capsule Closed, Capsule History |
| Relations | Mesh Edges, Mesh Resolution, LINKS |
| Seal | SHA-256 over every preceding field in canonical order |

## Witness delta

Removed:

- `Witness Log`
- `Witness Sign-off`

Replacement at the same schema position:

```text
Witness Signal: [✅ CLEAR | ⚠️ TENSION | ⚠️ DRIFT | 🔴 DISCONTINUITY]
```

The signal is singular, mutually exclusive, non-prose, and routed by VGATE.

## Relation vocabulary

Mesh edges: `DEPENDS_ON`, `TENSIONS_WITH`, `SUPERSEDES`, `VALIDATES`, `SCOPED_BY`.

DAG links: `CONVERGES_FROM`, `BRANCHES_TO`, `SYNTHESIZES`.
