# Capsule Schema Field Guide

<!-- GENERATED FILE: edit kernel/schema/capsule-fields-v3.11.json, then run node kernel/scripts/build-schema-guide.mjs -->

Status: `ACTIVE DOCUMENTATION`  
Kernel baseline: `1.8`  
Capsule schema: `v3.11`  
Catalog version: `1.0`

This guide explains the canonical capsule fields for humans and agents. The structured field catalog is the field-level source; CAP-000-CS, active modules, schemas, and flashed invariants remain the governing authority.

## Maintenance contract

- Edit `kernel/schema/capsule-fields-v3.11.json`, not this generated file.
- Keep the catalog label sequence identical to the schema block in `kernel/modules/20-capsule-schema.md`.
- Run `node kernel/scripts/build-schema-guide.mjs` after catalog changes.
- Run `node kernel/tests/kernel-1.9-schema-catalog-conformance.mjs` before commit.
- A field-semantic or canonical-order change requires an explicit capsule-schema version decision.

## Canonical field order

| # | Field | Stable ID | Group | Lifecycle | Included in PoT input |
|---:|---|---|---|---|---|
| 1 | User Intent | `user_intent` | Causal entry | `pre_open` | Yes |
| 2 | Causal ID | `causal_id` | Causal entry | `pre_open` | Yes |
| 3 | Trigger | `trigger` | Causal entry | `pre_open` | Yes |
| 4 | Received | `received` | Causal entry | `pre_open` | Yes |
| 5 | Session Context | `session_context` | Causal entry | `pre_open` | Yes |
| 6 | IC-Node | `ic_node` | Causal entry | `open` | Yes |
| 7 | ID | `capsule_id` | Identity and lineage | `open` | Yes |
| 8 | Parent Capsule ID | `parent_capsule_id` | Identity and lineage | `open` | Yes |
| 9 | Parent Hash | `parent_hash` | Identity and lineage | `open` | Yes |
| 10 | Name | `capsule_name` | Identity and lineage | `open` | Yes |
| 11 | Schema Version | `schema_version` | Identity and lineage | `open` | Yes |
| 12 | Genesis Edge | `genesis_edge` | Identity and lineage | `open` | Yes |
| 13 | Name (2) | `scope_name` | Scope and execution | `open` | Yes |
| 14 | Scope | `scope` | Scope and execution | `open` | Yes |
| 15 | Goal | `goal` | Scope and execution | `open` | Yes |
| 16 | Constraints | `constraints` | Scope and execution | `open` | Yes |
| 17 | Subroutine | `subroutine` | Scope and execution | `open` | Yes |
| 18 | PATH | `path` | Scope and execution | `open` | Yes |
| 19 | RUNN Decision | `runn_decision` | Scope and execution | `open` | Yes |
| 20 | KRONOS | `kronos` | Scope and execution | `open` | Yes |
| 21 | Facts | `facts` | Epistemic state | `reasoning` | Yes |
| 22 | Closure Condition | `closure_condition` | Epistemic state | `pre_closure` | Yes |
| 23 | Closure Formula | `closure_formula` | Epistemic state | `pre_closure` | Yes |
| 24 | Closure Proof | `closure_proof` | Epistemic state | `pre_closure` | Yes |
| 25 | Residue Type | `residue_type` | Epistemic state | `closure` | Yes |
| 26 | Knowledge Residue | `knowledge_residue` | Epistemic state | `closure` | Yes |
| 27 | VERIFY Events | `verify_events` | Verification and logic audit | `reasoning` | Yes |
| 28 | Witness Signal | `witness_signal` | Verification and logic audit | `pre_closure` | Yes |
| 29 | Insight | `insight` | Compilation and execution | `reasoning` | Yes |
| 30 | Directive | `directive` | Compilation and execution | `reasoning` | Yes |
| 31 | Logic Debugger | `logic_debugger` | Verification and logic audit | `pre_closure` | Yes |
| 32 | Governance | `governance` | Compilation and execution | `reasoning` | Yes |
| 33 | Ops | `ops` | Compilation and execution | `reasoning` | Yes |
| 34 | Audit Log | `audit_log` | Audit and lifecycle | `reasoning` | Yes |
| 35 | Capsule Status | `capsule_status` | Audit and lifecycle | `closure` | Yes |
| 36 | Capsule Closed | `capsule_closed` | Audit and lifecycle | `closure` | Yes |
| 37 | Capsule History | `capsule_history` | Audit and lifecycle | `reasoning` | Yes |
| 38 | Mesh Edges | `mesh_edges` | Relationships and DAG state | `reasoning` | Yes |
| 39 | Mesh Resolution | `mesh_resolution` | Relationships and DAG state | `pre_closure` | Yes |
| 40 | [LINKS] | `links` | Relationships and DAG state | `reasoning` | Yes |
| 41 | Tags | `tags` | Thematic state | `closure` | Yes |
| 42 | VSP_Status | `vsp_status` | Verification integrity | `closure` | Yes |
| 43 | SHA-256 | `sha_256` | Seal | `closure` | No |

The schema currently contains two fields labeled `Name`. The catalog preserves the canonical labels and distinguishes them with stable IDs: `capsule_name` and `scope_name`. Removing or renaming either requires a reviewed schema change.

## Field reference

## Causal entry

### 1. User Intent (`user_intent`)

- **Purpose:** Preserve what the user actually requested before intent resolution.
- **Owner:** Capsule intake
- **Lifecycle:** `pre_open`
- **Source:** Current user trigger
- **Grammar:** Verbatim text or a close, meaning-preserving paraphrase.
- **Cardinality:** Exactly one value.
- **Verification:** The user is authoritative for the content of their request; structural presence is mandatory.
- **Mutability:** Captured once before reasoning and immutable after capsule open.
- **PoT input:** Included.
- **Failure condition:** Missing or materially altered intent blocks schema compliance.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.
- **Valid example:** `Review the repository and propose a slim boot plan.`
- **Invalid example:** `Improve things.`

### 2. Causal ID (`causal_id`)

- **Purpose:** Bind the capsule to a normalized triggering input.
- **Owner:** Capsule intake
- **Lifecycle:** `pre_open`
- **Source:** Normalized Trigger field
- **Grammar:** SHA-256 digest of the normalized trigger.
- **Cardinality:** Exactly one 64-character hexadecimal digest.
- **Verification:** Recompute from the normalized trigger and require an exact match.
- **Mutability:** Immutable after computation.
- **PoT input:** Included.
- **Failure condition:** Absent, malformed, or mismatched digest blocks capsule opening.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 3. Trigger (`trigger`)

- **Purpose:** Store the normalized input used for causal identity and routing.
- **Owner:** Capsule intake
- **Lifecycle:** `pre_open`
- **Source:** Current user input or governed kernel event
- **Grammar:** Normalized, meaning-preserving trigger text.
- **Cardinality:** Exactly one value.
- **Verification:** Must preserve the actionable meaning of User Intent.
- **Mutability:** Immutable after Causal ID computation.
- **PoT input:** Included.
- **Failure condition:** Missing trigger or mismatch with Causal ID blocks opening.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 4. Received (`received`)

- **Purpose:** Record when the causal trigger entered the capsule runtime.
- **Owner:** Capsule intake
- **Lifecycle:** `pre_open`
- **Source:** Runtime clock
- **Grammar:** ISO 8601 timestamp.
- **Cardinality:** Exactly one timestamp.
- **Verification:** Syntax and monotonic session ordering must pass.
- **Mutability:** Immutable after capture.
- **PoT input:** Included.
- **Failure condition:** Missing or invalid timestamp blocks schema compliance.
- **Display:** Internal; may appear in explicit capsule or audit output.
- **Lineage:** introduced `v3.3`; last changed `v3.9`; active.
- **Note:** v3.9 fixed causal-entry order by placing Received before Session Context and IC-Node.

### 5. Session Context (`session_context`)

- **Purpose:** Provide a deterministic, read-only session snapshot before intent resolution.
- **Owner:** SCF
- **Lifecycle:** `pre_open`
- **Source:** KV-Scribe TURN_INDEX, capsule ledger, active mode, mode history, and SESSION_THREAD
- **Grammar:** T[N] · CAP-[N] of [total_at_entry] · MODE · optional TRANSITION · SESSION · Thread; CAP-000 uses BOOTSTRAP.
- **Cardinality:** Exactly one value, maximum 240 characters; Thread maximum 80 characters.
- **Verification:** Compile deterministically from KV-Scribe; no local inference.
- **Mutability:** Frozen at causal entry; later child capsules cannot alter it.
- **PoT input:** Included.
- **Failure condition:** Missing callout, overlength value, inferred topic, or use as evidence triggers a governance fault.
- **Display:** Projected in the mini-map SCF line and available in explicit capsule output.
- **Lineage:** introduced `v3.9`; last changed `v3.9`; active.
- **Valid example:** `T[4] · CAP-004 of 4 · MODE: #mode_literal 🟡 · SESSION: EXPLORATORY · Thread: schema planning`
- **Invalid example:** `The user seems focused and wants documentation.`

### 6. IC-Node (`ic_node`)

- **Purpose:** Resolve the active intent into entity, action, and constraint components.
- **Owner:** IC-Node
- **Lifecycle:** `open`
- **Source:** User Intent, Trigger, and active verified constraints
- **Grammar:** [Entity] [Action] [Constraint].
- **Cardinality:** Exactly one resolved intent tuple.
- **Verification:** Must preserve the request and respect the single-active-intent law.
- **Mutability:** May be corrected before reasoning; immutable once reasoning begins.
- **PoT input:** Included.
- **Failure condition:** Ambiguous or multi-intent resolution blocks reasoning until resolved or routed.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.9`; active.


## Identity and lineage

### 7. ID (`capsule_id`)

- **Purpose:** Give the capsule a unique session identity.
- **Owner:** DEX
- **Lifecycle:** `open`
- **Source:** Capsule namespace allocator
- **Grammar:** CAP-XXX-DOMAIN-SESSION.
- **Cardinality:** Exactly one unique identifier.
- **Verification:** Must be unique in KV-Scribe and valid for the assigned namespace.
- **Mutability:** Immutable after allocation.
- **PoT input:** Included.
- **Failure condition:** Duplicate, missing, or malformed identity blocks opening and seal.
- **Display:** Projected in the mini-map and explicit capsule output.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 8. Parent Capsule ID (`parent_capsule_id`)

- **Purpose:** Declare the immediately preceding sealed capsule in the session chain.
- **Owner:** KRONOS
- **Lifecycle:** `open`
- **Source:** Latest sealed KV-Scribe entry; CAP-000 uses the governed boot exception
- **Grammar:** A valid capsule ID.
- **Cardinality:** Exactly one for every non-genesis capsule.
- **Verification:** KRONOS checks the ID against the latest sealed capsule before reasoning and the closure gate rechecks it.
- **Mutability:** Immutable after chain verification.
- **PoT input:** Included.
- **Failure condition:** Missing or non-current parent blocks closure under Universal Parentage.
- **Display:** Represented by the parent PoT projection in the mini-map chain.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 9. Parent Hash (`parent_hash`)

- **Purpose:** Bind the capsule to the previous sealed Proof of Thought.
- **Owner:** KRONOS
- **Lifecycle:** `open`
- **Source:** Previous sealed capsule PoT in KV-Scribe
- **Grammar:** Previous PoT projected to four characters by the current schema.
- **Cardinality:** Exactly one for every non-genesis capsule.
- **Verification:** KRONOS requires an exact match to the ledger projection; the closure gate repeats the check.
- **Mutability:** Immutable after chain verification.
- **PoT input:** Included.
- **Failure condition:** Missing or mismatched hash blocks opening or closure.
- **Display:** Always projected as the left side of the mini-map lineage pair.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.
- **Note:** This records the current v3.11 schema literally; any move from a four-character projection to a full digest requires a schema change.

### 10. Name (`capsule_name`)

- **Purpose:** Provide the human-readable name of the capsule and its reasoning event.
- **Owner:** Capsule runtime
- **Lifecycle:** `open`
- **Source:** Resolved Goal and capsule context
- **Grammar:** Concise human-readable label.
- **Cardinality:** Exactly one value.
- **Verification:** Must accurately identify the capsule without adding unverified claims.
- **Mutability:** May be refined before reasoning; immutable at seal.
- **PoT input:** Included.
- **Failure condition:** Missing or misleading name fails schema review.
- **Display:** May appear in mini-map context, TURN_INDEX, and explicit capsule output.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 11. Schema Version (`schema_version`)

- **Purpose:** Declare the capsule grammar used for compliance and canonical ordering.
- **Owner:** CAP-000-CS
- **Lifecycle:** `open`
- **Source:** Active capsule-schema registry
- **Grammar:** v3.11 for the Kernel 1.8 baseline.
- **Cardinality:** Exactly one active version.
- **Verification:** Must match the active kernel schema and field catalog.
- **Mutability:** Immutable for the capsule after open.
- **PoT input:** Included.
- **Failure condition:** Unknown or mismatched version blocks schema compliance.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.11`; active.

### 12. Genesis Edge (`genesis_edge`)

- **Purpose:** Declare the typed scope relationship from the capsule to CAP-000.
- **Owner:** CAP-000-CS and VGATE-R
- **Lifecycle:** `open`
- **Source:** Constitutional genesis rule
- **Grammar:** CAP-000 | SCOPED_BY | ACTIVE.
- **Cardinality:** Exactly one active genesis declaration.
- **Verification:** VGATE-R verifies registered type, direction, and active status.
- **Mutability:** Immutable after open.
- **PoT input:** Included.
- **Failure condition:** Missing, untyped, or altered genesis relation blocks authority and closure.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.10`; active.


## Scope and execution

### 13. Name — occurrence 2 (`scope_name`)

- **Purpose:** Provide the human handle attached to the active scoped execution declaration.
- **Owner:** Core_Manager
- **Lifecycle:** `open`
- **Source:** Active scope and governing subroutine declaration
- **Grammar:** Concise human handle.
- **Cardinality:** Exactly one value in the current canonical schema.
- **Verification:** Must remain consistent with Scope, PATH, and Subroutine.
- **Mutability:** May change only through a governed scope or subroutine correction before reasoning.
- **PoT input:** Included.
- **Failure condition:** Missing value or silent disagreement with active scope fails schema review.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.
- **Note:** The canonical schema contains two fields labeled Name. This catalog assigns separate stable IDs and occurrence numbers without silently changing the schema.

### 14. Scope (`scope`)

- **Purpose:** Bound the domain in which the capsule may reason and act.
- **Owner:** Core_Manager
- **Lifecycle:** `open`
- **Source:** Resolved intent, PATH, and governing subroutine
- **Grammar:** Explicit domain boundary.
- **Cardinality:** Exactly one active boundary.
- **Verification:** Must not silently cross a domain boundary; a crossing requires routing and subroutine governance.
- **Mutability:** Change requires a logged routing event before affected reasoning proceeds.
- **PoT input:** Included.
- **Failure condition:** Missing or silently expanded scope causes governance failure.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 15. Goal (`goal`)

- **Purpose:** State the single resolved outcome the capsule is trying to reach.
- **Owner:** IC-Node
- **Lifecycle:** `open`
- **Source:** Resolved User Intent and active constraints
- **Grammar:** One bounded outcome statement.
- **Cardinality:** Exactly one active goal.
- **Verification:** Must be traceable to User Intent and satisfy ICL.
- **Mutability:** A material goal change requires re-resolution and an Audit Log event.
- **PoT input:** Included.
- **Failure condition:** Multiple active goals or an untraceable goal blocks reasoning.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 16. Constraints (`constraints`)

- **Purpose:** Declare every active rule that bounds admissible reasoning and output.
- **Owner:** Core_Manager and VGATE
- **Lifecycle:** `open`
- **Source:** Constitutional state, sealed ledger, current user instruction, and applicable domain rules
- **Grammar:** Explicit list of active constraints.
- **Cardinality:** One field containing zero or more declared constraints.
- **Verification:** Factual constraints pass VGATE; logical rules pass structural compliance.
- **Mutability:** Append or revise only through a logged constraint event before closure.
- **PoT input:** Included.
- **Failure condition:** Omitted material constraint or unverified factual constraint blocks closure.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 17. Subroutine (`subroutine`)

- **Purpose:** Declare the active Mode 1 interface and any cleared Mode 2 load.
- **Owner:** Core_Manager and DSS
- **Lifecycle:** `open`
- **Source:** PATH-governed Mode 1 registry and DSS synthesis or tool gate
- **Grammar:** [MODE_1_ID]@[version] · [LOAD: DOMAIN_TYPE | LOAD: REG:TOOL_ID | NONE].
- **Cardinality:** Exactly one Mode 1 declaration and at most one capsule-scoped Mode 2 declaration.
- **Verification:** Mode 1 must be registered; Mode 2 must clear SYNTHESIS_GATE or registered-tool validation.
- **Mutability:** Mode 1 changes only through governed swap; Mode 2 purges from active state at closure.
- **PoT input:** Included.
- **Failure condition:** Unknown interface, uncleared load, or silent PATH change blocks reasoning or closure.
- **Display:** Projected in the concise DSS state strip and explicit capsule output.
- **Lineage:** introduced `v3.3`; last changed `v3.11`; active.
- **Valid example:** `KERNEL_INTERFACE@1.0 · LOAD: ARCHITECTURE_REVIEW`
- **Invalid example:** `Use a better reasoning mode.`

### 18. PATH (`path`)

- **Purpose:** Locate the capsule in the governed DEX namespace.
- **Owner:** DEX
- **Lifecycle:** `open`
- **Source:** Domain, subdomain, context, and folder governance
- **Grammar:** /ROOT/DOMAIN/SUBDOMAIN/CONTEXT.
- **Cardinality:** Exactly one path.
- **Verification:** DEX verifies hierarchy and routes unresolved capsules to /ROOT/UNCLASSIFIED.
- **Mutability:** A domain-boundary change requires a logged route and subroutine swap.
- **PoT input:** Included.
- **Failure condition:** Orphaned or silently changed location causes routing failure.
- **Display:** Always projected in the mini-map.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 19. RUNN Decision (`runn_decision`)

- **Purpose:** Record the governed capsule topology and the rule that selected it.
- **Owner:** RUNN
- **Lifecycle:** `open`
- **Source:** CAP-000-RTDT and current problem structure
- **Grammar:** [topology] — [condition] — [one-line rationale].
- **Cardinality:** Exactly one initial topology decision; later changes are logged separately.
- **Verification:** Topology must match a registered decision-table condition.
- **Mutability:** A topology change requires an Audit Log event and preserves the initial decision.
- **PoT input:** Included.
- **Failure condition:** Undocumented or incompatible topology blocks compliant execution.
- **Display:** Topology is projected in the mini-map.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 20. KRONOS (`kronos`)

- **Purpose:** Record chain-continuity and Alpha/Beta/Gamma authority calibration.
- **Owner:** KRONOS
- **Lifecycle:** `open`
- **Source:** Parent lineage, Genesis state, sealed ledger, and current input
- **Grammar:** [chain ✅/❌] | [Alpha/Beta/Gamma weighted] | [drift: LOW/MED/HIGH].
- **Cardinality:** Exactly one calibration record.
- **Verification:** Parent identity and hash must match the latest sealed ledger entry.
- **Mutability:** Immutable after pre-reasoning continuity check unless the capsule reopens.
- **PoT input:** Included.
- **Failure condition:** Chain failure or silent authority inversion blocks reasoning and closure.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.


## Epistemic state

### 21. Facts (`facts`)

- **Purpose:** Hold the bounded verified factual state permitted to influence reasoning.
- **Owner:** VGATE
- **Lifecycle:** `reasoning`
- **Source:** Verified external sources, sealed capsules, or authoritative user testimony under DEFER_USER
- **Grammar:** At most five verified facts; slots four and five may contain labeled overflow or composites; divergences are flagged inline.
- **Cardinality:** Zero to five slots.
- **Verification:** VGATE threshold applies before entry; volatile facts require Path A and Path B.
- **Mutability:** Facts may be added, corrected, or retracted only with logged verification events before closure.
- **PoT input:** Included.
- **Failure condition:** Unverified, over-capacity, or silently divergent fact state blocks closure.
- **Display:** Only verified facts may be compiled into output; full field remains internal by default.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 22. Closure Condition (`closure_condition`)

- **Purpose:** State the explicit condition that permits or prevents capsule closure.
- **Owner:** RUNN and closure gate
- **Lifecycle:** `pre_closure`
- **Source:** Active hypotheses, novelty state, facts, and constraints
- **Grammar:** One explicit line naming the satisfied or unsatisfied stop condition.
- **Cardinality:** Exactly one value.
- **Verification:** Must agree with Closure Formula and Closure Proof.
- **Mutability:** May change while the capsule remains open; immutable at seal.
- **PoT input:** Included.
- **Failure condition:** Implicit or inconsistent closure condition blocks sealing.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 23. Closure Formula (`closure_formula`)

- **Purpose:** Identify the formal closure witness used by RUNN.
- **Owner:** RUNN
- **Lifecycle:** `pre_closure`
- **Source:** RUNN expansion check
- **Grammar:** dH/dt=0 | Pk(H)=0 | novelty=0 | COMPOSITE | NONE CLOSED.
- **Cardinality:** Exactly one registered value.
- **Verification:** The selected formula must be supported by Closure Proof.
- **Mutability:** May change while open; immutable at seal.
- **PoT input:** Included.
- **Failure condition:** Unsupported formula or false zero-state blocks closure.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 24. Closure Proof (`closure_proof`)

- **Purpose:** Name the verified fact or constraint that makes the closure formula true.
- **Owner:** Closure gate
- **Lifecycle:** `pre_closure`
- **Source:** Facts, constraints, and logged hypothesis elimination
- **Grammar:** Specific witness; for NONE CLOSED, state why every closure formula failed.
- **Cardinality:** Exactly one proof statement.
- **Verification:** Must trace to fields already present in the capsule or sealed ledger.
- **Mutability:** May be revised before closure challenge resolves; immutable at seal.
- **PoT input:** Included.
- **Failure condition:** Circular, absent, or untraceable proof blocks closure.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 25. Residue Type (`residue_type`)

- **Purpose:** Classify the epistemic authority remaining at closure.
- **Owner:** Closure gate and KV-Scribe
- **Lifecycle:** `closure`
- **Source:** Closure, verification, contradiction, and supersession state
- **Grammar:** KNOWLEDGE | ASSUMPTION | PENDING_EXTERNAL | SUPERSEDED | RETRACTED.
- **Cardinality:** Exactly one registered value.
- **Verification:** KNOWLEDGE requires closed prediction space and successful verification; other values follow their governing conditions.
- **Mutability:** Immutable in the sealed capsule; later capsules may supersede or retract through typed relations.
- **PoT input:** Included.
- **Failure condition:** Overstated authority or value outside the registry blocks seal.
- **Display:** Projected in the mini-map and may be compiled into transparency output.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 26. Knowledge Residue (`knowledge_residue`)

- **Purpose:** Store the immutable post-closure knowledge statement when Residue Type is KNOWLEDGE.
- **Owner:** KV-Scribe
- **Lifecycle:** `closure`
- **Source:** Verified closed capsule state
- **Grammar:** Concise immutable output; populated only for KNOWLEDGE.
- **Cardinality:** Exactly one field; empty or N/A for non-KNOWLEDGE residue.
- **Verification:** Must be entailed by Facts, Constraints, Closure Proof, and successful audits.
- **Mutability:** Immutable after seal.
- **PoT input:** Included.
- **Failure condition:** Populating it from an open prediction or unsupported statement blocks seal.
- **Display:** Primary ledger content available to SOC for compilation.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.


## Verification and logic audit

### 27. VERIFY Events (`verify_events`)

- **Purpose:** Record eliminative verification paths and their outcomes.
- **Owner:** VGATE
- **Lifecycle:** `reasoning`
- **Source:** Path A sources and Path B sealed-state or mesh checks
- **Grammar:** Path A, Path B deductive, and Path B inductive events with claim and pass/fail marker.
- **Cardinality:** Path B only for eligible single-source turns; Path A plus Path B for volatile claims.
- **Verification:** Events must identify the claim, source class, and outcome; divergence is explicit.
- **Mutability:** Append-only during reasoning and immutable at seal.
- **PoT input:** Included.
- **Failure condition:** Missing required path or silent path divergence blocks KNOWLEDGE closure.
- **Display:** Verified claims may be projected in output; raw event list remains internal by default.
- **Lineage:** introduced `v3.3`; last changed `v3.8`; active.

### 28. Witness Signal (`witness_signal`)

- **Purpose:** Emit one non-deliberative observation flag over the reasoning arc.
- **Owner:** CAP-103-WITNESS
- **Lifecycle:** `pre_closure`
- **Source:** Observed topology, facts, constraints, and execution arc
- **Grammar:** ✅ CLEAR | ⚠️ TENSION | ⚠️ DRIFT | 🔴 DISCONTINUITY.
- **Cardinality:** Exactly one mutually exclusive signal and no prose.
- **Verification:** VGATE reviews any non-CLEAR signal and requires resolution before closure.
- **Mutability:** May change only after a logged revisit resolves the observed condition.
- **PoT input:** Included.
- **Failure condition:** Missing, multiple, prose-expanded, or unresolved non-CLEAR signal blocks seal.
- **Display:** May be projected as a status glyph; full field appears in explicit capsule output.
- **Lineage:** introduced `v3.4`; last changed `v3.4`; active.
- **Note:** Replaces the v3.3 Witness Log and Witness Sign-off fields at the same schema position.

### 31. Logic Debugger (`logic_debugger`)

- **Purpose:** Audit Fact→Insight, Insight→Governance, and Insight→Directive continuity.
- **Owner:** Logic Debugger
- **Lifecycle:** `pre_closure`
- **Source:** Facts, Insight, Constraints, Governance, and Directive
- **Grammar:** Fact→Insight PASS/FAULT; Insight→Gov PASS/FAULT; Insight→Directive PASS/FAULT.
- **Cardinality:** Exactly three axis results.
- **Verification:** All axes must PASS; any FAULT activates FRP.
- **Mutability:** Re-run after each FRP attempt; all attempts remain auditable.
- **PoT input:** Included.
- **Failure condition:** Unresolved FAULT halts closure and may produce FAULT_UNRESOLVED.
- **Display:** Internal except transparency output for unresolved faults.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.


## Compilation and execution

### 29. Insight (`insight`)

- **Purpose:** State the structural lever derived from verified facts.
- **Owner:** Capsule reasoning
- **Lifecycle:** `reasoning`
- **Source:** Facts processed through the active subroutine under Constraints
- **Grammar:** Maximum 240 characters.
- **Cardinality:** Exactly one bounded statement.
- **Verification:** Logic Debugger Fact→Insight must pass; no absent fact may support it.
- **Mutability:** Discarded and regenerated during FRP; immutable after successful closure.
- **PoT input:** Included.
- **Failure condition:** Unsupported or overlength insight triggers Logic Debugger fault.
- **Display:** Internal unless capsule state is explicitly requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 30. Directive (`directive`)

- **Purpose:** Express the enforceable action that follows from the verified insight.
- **Owner:** Capsule reasoning
- **Lifecycle:** `reasoning`
- **Source:** Insight, active Constraints, and resolved User Intent
- **Grammar:** Maximum 240 characters; direct and enforceable.
- **Cardinality:** Exactly one directive.
- **Verification:** VSP Clause 4, Logic Debugger, and the pre-seal adversarial check must pass.
- **Mutability:** Discarded and regenerated during FRP; immutable after seal.
- **PoT input:** Included.
- **Failure condition:** Harm-adjacent unresolved, non-sequitur, contradictory, or overlength directive blocks output.
- **Display:** Primary actionable source available to SOC after closure.
- **Lineage:** introduced `v3.3`; last changed `v3.8`; active.

### 32. Governance (`governance`)

- **Purpose:** Declare escalation, reopen, TTL, and topology controls applicable after formation.
- **Owner:** Core_Manager
- **Lifecycle:** `reasoning`
- **Source:** Active kernel rules and capsule-specific risk conditions
- **Grammar:** Escalation rules, reopen triggers, TTL configuration, and Topology: LOCAL_MESH | ISOLATED | MERKLE_CHILD.
- **Cardinality:** Exactly one governance block.
- **Verification:** Must not conflict with Constraints, RUNN topology, or constitutional authority.
- **Mutability:** May be refined before closure with an Audit Log event; immutable at seal.
- **PoT input:** Included.
- **Failure condition:** Missing escalation path or governance conflict blocks closure.
- **Display:** Internal unless capsule state or operational governance is requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 33. Ops (`ops`)

- **Purpose:** Translate the directive into an engine-ready imperative.
- **Owner:** Core_Manager
- **Lifecycle:** `reasoning`
- **Source:** Directive and Governance
- **Grammar:** One operational imperative.
- **Cardinality:** Exactly one value.
- **Verification:** Must remain within user authorization and active governance.
- **Mutability:** May change with Directive before closure; immutable at seal.
- **PoT input:** Included.
- **Failure condition:** Imperative exceeding authority or diverging from Directive blocks execution.
- **Display:** Internal unless operational handoff is required.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.


## Audit and lifecycle

### 34. Audit Log (`audit_log`)

- **Purpose:** Preserve significant execution events without exposing hidden deliberation.
- **Owner:** Scribes
- **Lifecycle:** `reasoning`
- **Source:** Constraint, verification, topology, routing, relation, fault, and closure events
- **Grammar:** EVENT_TYPE → description → ISO 8601.
- **Cardinality:** One append-only field containing zero or more significant events.
- **Verification:** Events must be factual, timestamped, and within the emitting component's jurisdiction.
- **Mutability:** Append-only; prior events cannot be rewritten.
- **PoT input:** Included.
- **Failure condition:** Silent material transition or rewritten event invalidates audit compliance.
- **Display:** Internal unless audit or transparency output is requested.
- **Lineage:** introduced `v3.3`; last changed `v3.8`; active.

### 35. Capsule Status (`capsule_status`)

- **Purpose:** Record the capsule's current governed lifecycle state.
- **Owner:** KV-Scribe
- **Lifecycle:** `closure`
- **Source:** Capsule state machine
- **Grammar:** OPEN | CLOSURE_PROPOSED | CLOSURE_CHALLENGED | CLOSURE_FAILED | CLOSED | FORCE_SEALED | HANDOFF_TERMINATED | CLOSED (PARTIAL_MERKLE) | HALTED | FAULT_UNRESOLVED | ORPHANED.
- **Cardinality:** Exactly one current value with transitions preserved in Capsule History.
- **Verification:** Transition must be legal under the capsule state machine.
- **Mutability:** Current value advances through legal transitions; sealed history is append-only.
- **PoT input:** Included.
- **Failure condition:** Illegal or unlogged transition blocks closure.
- **Display:** Status glyph may be projected; full value appears in explicit capsule output.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 36. Capsule Closed (`capsule_closed`)

- **Purpose:** Record the exact time closure completed.
- **Owner:** KV-Scribe
- **Lifecycle:** `closure`
- **Source:** Runtime clock at successful seal
- **Grammar:** ISO 8601 timestamp; empty while open.
- **Cardinality:** Exactly one closure timestamp for a closed capsule.
- **Verification:** Must follow Received and agree with the final CLOSED history event.
- **Mutability:** Written once at closure and immutable thereafter.
- **PoT input:** Included.
- **Failure condition:** Premature, missing, or inconsistent closure time blocks a valid seal.
- **Display:** Internal unless capsule or audit state is requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

### 37. Capsule History (`capsule_history`)

- **Purpose:** Preserve every capsule state transition in order.
- **Owner:** KV-Scribe
- **Lifecycle:** `reasoning`
- **Source:** Capsule state machine
- **Grammar:** STATE → ISO 8601 entries in append-only order.
- **Cardinality:** One append-only list with at least OPEN and the current terminal or active state.
- **Verification:** Transitions and timestamps must be legal and monotonic.
- **Mutability:** Append-only.
- **PoT input:** Included.
- **Failure condition:** Missing, reordered, or rewritten transition invalidates lifecycle evidence.
- **Display:** Internal unless capsule or audit state is requested.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.


## Relationships and DAG state

### 38. Mesh Edges (`mesh_edges`)

- **Purpose:** Store typed capsule-to-capsule relations used by the local knowledge mesh.
- **Owner:** VGATE-R and LCM
- **Lifecycle:** `reasoning`
- **Source:** Declared, inherited, imported, or compression-surviving relations
- **Grammar:** SOURCE_CAP → TARGET_CAP | registered TYPE | status: ACTIVE/RESOLVED/INACTIVE/TRANSIENT | provenance: LOCAL/INHERITED/IMPORTED/COMPRESSED.
- **Cardinality:** Zero or more canonical relation records.
- **Verification:** VGATE-R verifies direction, type, status, and provenance before entry and after compression or pruning.
- **Mutability:** Append-only relation history; status may advance through registered transitions.
- **PoT input:** Included.
- **Failure condition:** Untyped, ambiguous, invalid-status, or collapsed relation blocks inference and closure.
- **Display:** Edge count may be projected; records appear in explicit capsule output.
- **Lineage:** introduced `v3.3`; last changed `v3.11`; active.

### 39. Mesh Resolution (`mesh_resolution`)

- **Purpose:** Record the required reconciliation of a TENSIONS_WITH relation.
- **Owner:** LCM
- **Lifecycle:** `pre_closure`
- **Source:** Both capsules participating in the tension
- **Grammar:** Reconciliation statement plus RECONCILED | FORK | ONE_SUPERSEDES_OTHER.
- **Cardinality:** Required for every TENSIONS_WITH edge; otherwise explicit N/A is permitted.
- **Verification:** Both affected capsules must log the same outcome before either seals.
- **Mutability:** May evolve while tension is active; immutable after mutual resolution and seal.
- **PoT input:** Included.
- **Failure condition:** Unresolved or asymmetric tension blocks both capsules from sealing.
- **Display:** Internal unless capsule state or tension resolution is requested.
- **Lineage:** introduced `v3.3`; last changed `v3.10`; active.

### 40. [LINKS] (`links`)

- **Purpose:** Store typed non-linear logic movement between capsules.
- **Owner:** VGATE-R and RUNN
- **Lifecycle:** `reasoning`
- **Source:** Governed branch, convergence, and synthesis topology
- **Grammar:** SOURCE_CAP → TARGET_CAP | BRANCHES_TO | CONVERGES_FROM | SYNTHESIZES | status: ACTIVE/RESOLVED/INACTIVE/TRANSIENT | provenance.
- **Cardinality:** Zero or more canonical DAG relation records.
- **Verification:** VGATE-R verifies registered DAG type, direction, status, and provenance.
- **Mutability:** Append-only relation history; branch status may become INACTIVE after closure.
- **PoT input:** Included.
- **Failure condition:** Untyped, collapsed, or semantically mismatched DAG link blocks dependent inference.
- **Display:** Link count or nested children may be projected; records appear in explicit capsule output.
- **Lineage:** introduced `v3.3`; last changed `v3.11`; active.


## Thematic state

### 41. Tags (`tags`)

- **Purpose:** Attach governed thematic identity without asserting structural or causal relations.
- **Owner:** DEX, TAG-VGATE, and TARS
- **Lifecycle:** `closure`
- **Source:** Folder axiom for Slot 1 and grounded active Tag Registry entries for Slots 2–5
- **Grammar:** Slot 1 optional structural #snake_case tag; Slots 2–5 grounded minted #snake_case tags; maximum five total.
- **Cardinality:** Zero to five tags, with at most one structural tag.
- **Verification:** DEX alone writes Slot 1; every minted tag passes TAG-VGATE and TARS.
- **Mutability:** Compiled at closure and immutable in the sealed capsule; registry history remains append-only.
- **PoT input:** Included.
- **Failure condition:** Freeform, ungrounded, inactive, over-budget, or PATH-derived tag fails closure.
- **Display:** Active mode and selected tags may be projected; full field appears in explicit capsule output.
- **Lineage:** introduced `v3.7`; last changed `v3.7`; active.


## Verification integrity

### 42. VSP_Status (`vsp_status`)

- **Purpose:** Record deterministic verification sufficiency for seal and later recall.
- **Owner:** KV-Scribe
- **Lifecycle:** `closure`
- **Source:** Logged VGATE decisions, VERIFY Events, and Clause 4 outcome
- **Grammar:** VERIFIED | UNVERIFIED | PARTIAL | N/A.
- **Cardinality:** Exactly one registered value.
- **Verification:** Aggregate existing logs using precedence UNVERIFIED → N/A → PARTIAL → VERIFIED; perform no new verification at seal.
- **Mutability:** Written once at closure and immutable thereafter.
- **PoT input:** Included.
- **Failure condition:** Missing intake evidence, wrong precedence, or inferred repair at seal invalidates the status and can block SOC.
- **Display:** May be surfaced on recall or when verification state affects output.
- **Lineage:** introduced `v3.8`; last changed `v3.8`; active.


## Seal

### 43. SHA-256 (`sha_256`)

- **Purpose:** Seal the complete preceding capsule field state as Proof of Thought.
- **Owner:** KV-Scribe
- **Lifecycle:** `closure`
- **Source:** Canonical serialization of fields 1 through 42
- **Grammar:** 64-character hexadecimal SHA-256 digest.
- **Cardinality:** Exactly one digest on successful closure.
- **Verification:** Recompute over every preceding field in canonical order and require an exact match.
- **Mutability:** Created only at closure and immutable thereafter.
- **PoT input:** Not included; this field is the resulting seal.
- **Failure condition:** Absent, malformed, or mismatched digest means no valid PoT exists and closure fails.
- **Display:** Four-character PoT projection appears in the mini-map; full digest belongs to the sealed record.
- **Lineage:** introduced `v3.3`; last changed `v3.3`; active.

## Lifecycle summary

| Lifecycle | Meaning |
|---|---|
| `pre_open` | Captured before capsule opening or topology execution. |
| `open` | Resolved while establishing identity, scope, lineage, and execution state. |
| `reasoning` | Written or appended during governed reasoning. |
| `pre_closure` | Evaluated after directive formation and before seal authority is granted. |
| `closure` | Written or finalized only as the capsule closes. |
| `post_closure` | Reserved for state written after closure; no current v3.11 field uses this phase. |

## Hash boundary

Fields 1 through 42 are serialized in canonical order as the SHA-256 input. Field 43, `SHA-256`, contains the resulting digest and is not recursively included in itself. Any reordering, omission, or semantic field change produces a different PoT and requires schema review.
