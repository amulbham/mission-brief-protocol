## JIT Pruning Engine — CAP-JIT-001

CAP-JIT-001 completes the governed path between CAP-000 and SOC. JIT is a deterministic compilation-surface filter: after a capsule closes and before SOC compiles, it projects the smallest authorized working surface from the append-only KV-Scribe ledger.

Five constitutional sub-components are flashed under Axiom 4.7:

- `CAP-JIT-001-CORE` — lifecycle and jurisdiction boundaries.
- `CAP-JIT-001-EDGES` — relation-driven retention actions.
- `CAP-JIT-001-NODES` — four node-priority tiers.
- `CAP-JIT-001-WATCHDOG` — threshold-triggered compression sweep.
- `CAP-JIT-001-VOCAB` — active and retired relation vocabulary.

### Four-Step Lifecycle

1. **RUNN triggers** the pruning pass after capsule closure and before SOC compilation. RUNN cannot score nodes, compile the grid, or inject it.
2. **DEX traces** canonical typed relations backward from the just-sealed capsule, evaluates retention policy, and compiles the minimal memory grid. DEX cannot verify or invent relations, retrieve ledger state, inject the grid, or compile output.
3. **KV-Scribe injects** the grid into the SOC compilation surface while preserving the complete append-only ledger. KV-Scribe cannot choose weights or compile the grid.
4. **SOC compiles** from the injected surface without changing, restoring, or expanding it. Logic Debugger remains a post-Directive audit and does not participate in JIT.

JIT executes only after the capsule has sealed. It does not change the capsule's PoT, full ledger record, or parent chain.

### RKI-Governed Relation Actions

The Kernel 1.6 RKI registry remains authoritative. JIT reads canonical relation records only after VGATE-R has passed their type, direction, status, and provenance. JIT never repairs, guesses, collapses, or retypes a relation.

| Registered type | Retention weight | Working-surface action |
|---|---:|---|
| SCOPED_BY | 0.95 | Retain compressed governing constraints; strip non-governing prose |
| TENSIONS_WITH, ACTIVE | 0.95 | Retain both conflicting residues and resolution state; SOC remains blocked |
| DEPENDS_ON · VALIDATES | 0.85 | Retain verified Facts or Knowledge Residue; suppress surrounding prose |
| WEAKENS | 0.85 | Retain the affected residue plus bounded weakening metadata |
| CONVERGES_FROM · SYNTHESIZES | 0.85 | Retain named input residues and distinct typed paths; suppress narrative scaffolding |
| BRANCHES_TO | 0.60 | Retain active branch state; after branch closure remove branch reasoning from the SOC surface while preserving audit history |
| SUPERSEDES target | 0.40 | Suppress the target from the SOC surface immediately; preserve its node and relation in the ledger |
| TENSIONS_WITH, RESOLVED | 0.10 | Suppress resolved conflict prose; preserve the outcome and typed audit record |

When multiple live rules reach one node, DEX applies the strongest authorized retention requirement. `CORE_SYSTEM_INVARIANT` immunity overrides every relation action. A relation action may retain a narrow projection of a node without retaining its prose.

Every relation surviving the pass retains exact type, direction, status, and provenance. Any untyped, UNCLASSIFIED, or collapsed relation is blocked by VGATE-R and cannot be used by JIT or SOC.

### Node Priority Tiers

| Tier | Weight | Definition | Working-surface behavior |
|---|---:|---|---|
| CORE_SYSTEM_INVARIANT | 1.0 | CAP-000, constitutional axioms, and flashed kernel components | Immune to suppression and every Watchdog sweep |
| HIGH_PRIORITY_DATA | 0.8 | Active KNOWLEDGE residue and current verified facts | Retain verified claim or Facts only; strip narrative prose |
| TRANSITIONAL_PROSE | 0.4 | Exploratory prose, post-seal Witness state, and mid-arc narrative | Eligible for Watchdog suppression after closure |
| DEPRECATED_STALE_BUFFER | 0.1 | Superseded targets, stale nodes, and resolved tension branches | Exclude from active SOC compilation; preserve in KV-Scribe |

Suppressed means absent from the SOC compilation surface, not deleted. Full capsule state, PoTs, relation history, and audit records remain immutable in KV-Scribe. If later reasoning requires suppressed verified state, Flash-Sync retrieves the necessary sealed residue under the Photo Principle; JIT does not re-reason or restore surrounding prose.

### Integrity Watchdog

DEX must receive `CONTEXT_WINDOW_CAPACITY` and a valid `MAX_THRESHOLD` runtime parameter at boot. `MAX_THRESHOLD` is never a constitutional constant and must satisfy:

```text
0 < MAX_THRESHOLD < CONTEXT_WINDOW_CAPACITY
```

The Watchdog rule is:

```text
IF context_tokens > MAX_THRESHOLD:
  run compression sweep
  suppress all nodes with effective weight <= 0.4 from the SOC surface
ELSE:
  steady state
```

Continuous relation actions execute every turn regardless of Watchdog state. A compression sweep never suppresses HIGH_PRIORITY_DATA or CORE_SYSTEM_INVARIANT nodes.

If either boot parameter is absent or invalid, Watchdog status is `CONFIG_FAULT`; no threshold sweep may be claimed. Continuous relation actions remain active, the fault is logged, and the conditional JIT mini-map line must display the fault.

### Vocabulary Consolidation

The nine-type RKI registry is the complete active Kernel 1.8 relation-type vocabulary. `SUPPORTS` and `INHERITS_FROM` are retired and carry no authority. Use `VALIDATES` or `DEPENDS_ON` for the former and `SCOPED_BY` for the latter.

The source-era `FORKS_TO` label is not an emitted Kernel 1.8 type. Historical imports may normalize it to `BRANCHES_TO` only through an explicit VGATE-R event with imported provenance. CAP-131-DSS activates `TRANSIENT` as a status on Tier 2 VALIDATES and SCOPED_BY records, not as a relation type. Those records resolve at PoT generation and their active projections flush before JIT constructs the SOC surface.

### Prompt-Runtime Ceiling

Kernel 1.8 inherits functional surface suppression. Suppressed text may remain in the host model's physical context window, so JIT does not claim token eviction, reduced inference cost, or guaranteed long-session performance equivalence. True buffer eviction belongs to an infrastructure runtime beyond this boot prompt.

Any claim that prompt-only JIT physically removed tokens is a verification fault. JIT's current enforced effect is narrower: SOC compiles only from the governed KV-Scribe projection.
