## RKI — Relational Knowledge Invariant

CAP-011-RKI flashes RKI as an irreducible LAW with constitutional authority:

```text
Ω(K,E) ≠ Ω(K,E') for any E' where edge types are degraded while node set K is held constant.
```

Knowledge topology is a function of both knowledge units and their typed relationships. Preserving nodes while erasing, weakening, reversing, or collapsing relation types does not preserve the same knowledge state.

Edge-type collapse or an untyped edge entering the mesh is a law violation, not merely a schema defect.

### Canonical Relation Record

Every Mesh Edge and DAG Link uses:

```text
SOURCE_CAP → TARGET_CAP | TYPE | status: ACTIVE|RESOLVED|INACTIVE | provenance: LOCAL|INHERITED|IMPORTED|COMPRESSED
```

The relation type and direction are load-bearing. Reversing direction, substituting a generic connection, or retaining only the node pair changes Ω.

### Valid Relation-Type Registry

| Type | Semantics | Lifecycle rule |
|---|---|---|
| DEPENDS_ON | Source requires target as a causal or logical prerequisite | Dependency must remain available while inference is active |
| SCOPED_BY | Target governs the source's admissible scope | Governing constraint cannot be silently weakened |
| VALIDATES | Source provides evidence supporting target | Does not imply identity or causal dependence |
| SUPERSEDES | Source replaces target's active authority | Target remains historical; source becomes authoritative |
| TENSIONS_WITH | Source and target cannot safely co-close without reconciliation | Closure blocked until Mesh Resolution |
| BRANCHES_TO | Source opens an exploratory target branch | Active inference deactivates when branch closes; audit record persists |
| CONVERGES_FROM | Target receives independent incoming paths that reach the same residue | Preserves plurality; does not imply composite synthesis |
| SYNTHESIZES | Target explicitly integrates named inputs into a new composite residue | Every input edge remains traceable |
| WEAKENS | Source partially reduces target authority without replacing it | Reduction magnitude or bounded rationale must be logged |

`SYNTHESIZES` is retained from the active pre-RKI DAG schema. Removing it would silently invalidate already governed links and itself violate RKI.

Any type outside this registry is `UNCLASSIFIED` and blocked until explicitly resolved through a reviewed registry change.

## VGATE-R — Relational Verification Gate

VGATE-R has one jurisdiction: relationship intake. It fires whenever an edge or link is declared, inherited, imported, or survives compression or pruning. It operates adjacent to VGATE and never substitutes for it.

- VGATE → fact and factual-constraint intake.
- VGATE-R → edge and relationship intake.
- Silent overlap is a protocol violation.

### Decision Table

| Condition | Output | Required action |
|---|---|---|
| Type present, unambiguous, locally declared, and registered | PASS | Preserve canonical record and log to KV-Scribe relation storage |
| Type absent at declaration | BLOCK ⚠️ | Require an explicit type before entry |
| Two or more registered types plausibly apply | DEFER | Require explicit resolution; do not guess |
| Relation imported from an external source | VOLATILE | Confirm direction, type, provenance, and source before entry |
| Relation survives compression or pruning | VERIFY | Confirm exact type, direction, status, and provenance survived |
| Untyped or collapsed connection detected in an inference path | FLAG 🔴 | Hard-block inference until restored or rerouted |
| Type not in the registry | UNCLASSIFIED | Block pending a reviewed registry change or valid reclassification |

VGATE-R is eliminative. It may pass, block, defer, require confirmation, or verify preservation. It cannot invent a relation, choose among ambiguous types, or infer an edge from thematic proximity.

Every decision is logged in Audit Log as:

```text
VGATE_R_[OUTCOME] → [source] → [target] → [declared type or NONE] → [reason] → [ISO 8601]
```

### Typed Containers

LCM Mesh Edges and DAG Links are separate structural containers governed by the same registry:

- Mesh Edges describe typed capsule-to-capsule relations, including prerequisites, scope, evidence, authority changes, weakening, and tension.
- DAG Links describe non-linear logic movement through `BRANCHES_TO`, `CONVERGES_FROM`, and `SYNTHESIZES`.

A type remains semantically identical across containers. Container placement cannot repair a missing or invalid type.

### Tension and Authority Enforcement

- `TENSIONS_WITH` blocks both capsules from sealing until both log the same reconciliation outcome: `RECONCILED`, `FORK`, or `ONE_SUPERSEDES_OTHER`.
- `SUPERSEDES` changes active authority ordering but never deletes the superseded node or edge history.
- `WEAKENS` reduces authority partially and must not be compressed into `SUPERSEDES` or an untyped relation.
- `BRANCHES_TO` may become INACTIVE after exploratory closure, but its audit record remains append-only.

## SOC Extension Under RKI

SOC blocks compilation when:

1. output is not traceable to a sealed capsule;
2. an output inference crosses an untyped or UNCLASSIFIED relation;
3. an output inference crosses a collapsed relation whose original type, direction, status, or provenance was not preserved; or
4. a `TENSIONS_WITH` relation remains unresolved.

SOC performs this path audit silently. Output does not compile until the relation is typed, restored, reconciled, or the inference is rerouted through a valid typed path.

Compression cannot restore semantics from the surviving node pair alone. For example, a collapsed `SUPERSEDES` edge does not regain authority ordering merely because both nodes remain.

## Compression and Future JIT Boundary

RKI governs every compression or pruning mechanism from Kernel 1.6 onward. Any surviving relation must preserve its type, direction, status, and provenance. Kernel 1.6 defines and tests this preservation contract but does not activate the JIT Pruning Engine; JIT activation remains a separate reviewed change.

## Jurisdiction Map

- RKI defines the law of relational semantic preservation.
- VGATE-R controls relation intake and preservation checks.
- LCM governs sibling-mesh reconciliation behavior.
- Capsule DAG fields store non-linear logic links.
- KV-Scribe stores canonical typed relation records and append-only history.
- SOC blocks invalid inference paths at compilation.
- JIT, when separately activated, may prune only within the RKI preservation contract.
