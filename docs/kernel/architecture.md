# Kernel Track Architecture

Kernel 1.0 separates constitutional source from generated and explanatory surfaces.

## Authority flow

1. Cognitive laws and axioms define the field.
2. Kernel modules define active constitutional and runtime contracts.
3. Registry records establish flashed authority.
4. Schemas define accepted capsule structure.
5. Tests verify conformance and absence of later-version behavior.
6. The build compiles modules into the boot prompt and immutable release snapshot.
7. Documentation explains the resulting system without overriding it.

## Responsibility boundaries

| Component | Responsibility |
|---|---|
| KV-Scribe / Flash-Sync | Retrieve and surface sealed ledger state |
| KRONOS | Verify chain continuity and calibrate Alpha/Beta/Gamma authority |
| Core_Manager | Load one Mode 1 interface and govern DSS Mode 2 lifecycle |
| RUNN | Select and expand capsule topology |
| DEX | Assign namespace and PATH; during JIT, trace cleared relations, evaluate retention, and compile the minimal grid |
| VGATE | Set fact and constraint verification thresholds |
| Witness | Observe arc formation and emit exactly one non-prose signal |
| Logic Debugger / FRP | Audit Directive formation and recover from logic faults |
| SOC | Compile sealed output from ledger state |

Adjacent responsibilities may exchange state but may not silently overlap.

## Mini-map lineage projection

Kernel 1.1 makes chain continuity visible without introducing a second verifier. KRONOS and Universal Parentage remain responsible for chain validity. After closure, the mini-map projects the preceding and current full PoTs from KV-Scribe as uppercase four-character display values:

```text
🔑 ⛓️A8F7 → 🔒C3D2
```

The projection is audit UI, not a replacement for the full ledger hashes.

## Witness signal boundary

Kernel 1.2 replaces the prose Witness with a four-state signal channel. Witness observes and attests; it cannot explain, verify, route, or recommend. VGATE receives the signal and applies a deterministic field route. PSAC remains the Directive adversary and Logic Debugger remains the Facts → Insight → Directive auditor.

This separates four previously adjacent responsibilities:

| Component | Output |
|---|---|
| Witness | CLEAR / TENSION / DRIFT / DISCONTINUITY |
| VGATE | Verification threshold or deterministic REVISIT route |
| Logic Debugger | PASS / FAULT on three logic axes |
| PSAC | KNOWLEDGE confirmation or ASSUMPTION downgrade |

## Thematic layer

Kernel 1.3 adds association without weakening structural semantics:

| Layer | Meaning | Authority |
|---|---|---|
| PATH | Hierarchical location | DEX |
| DAG / LCM | Causal and typed relational structure | Capsule schema and mesh governance |
| Tags | Cross-PATH thematic identity | TAG-VGATE + TARS + TR |
| GTIL | Session-scoped thematic lookup | KV-Scribe append-only index |

DEX writes structural Slot 1. TAG-VGATE grounds minted candidates. TARS governs vocabulary and displacement. RUNN identifies Dynamic Vector candidates only. No component may infer PATH or causal edges from tags.

Persistent epistemic mode is stored as verified session state. Dynamic Vector Trigger T3 remains latent until SCF supplies a verified `SESSION:MIXED` value; Kernel 1.3 does not simulate that dependency.

## Verification sufficiency across time

Kernel 1.4 promotes verification sufficiency from an intake implementation rule to a constitutional principle spanning the full capsule lifecycle:

| Execution point | VSP mechanism | Authority boundary |
|---|---|---|
| Intake | Clauses 1–3 through VGATE | Claim thresholds and required paths |
| Directive | Clause 4 consequence check | Aggregate civic, medical, financial, and legal harm potential |
| Seal | VSP_Status | Deterministic aggregation immediately before SHA-256 |
| Recall | Flash-Sync enforcement | Surface prior verification integrity without re-reasoning |
| Output | SOC precondition | Block unresolved VSP dependencies |

Clause 4 precedes Logic Debugger: consequence safety and reasoning integrity remain separate checks. KRONOS verifies lineage but does not load or interpret VSP_Status.

## Session context at causal entry

Kernel 1.5 adds a self-describing environmental snapshot before intent resolution:

```text
Flash-Sync → SCF → KRONOS → IC-Node
```

| Component | Reads | Produces | Cannot do |
|---|---|---|---|
| Flash-Sync | Sealed ledger | Active buffer | Verify chain or compile SCF |
| SCF | KV-Scribe state | Turn, entry count, mode, transition, character, thread | Reason, verify, influence gates, or justify output |
| KRONOS | Its declared continuity and authority inputs | Chain result and Alpha/Beta/Gamma calibration | Retrieve ledger state or read SCF |
| IC-Node | Current causal entry | Resolved intent | Treat SCF as evidence |

SCF is immutable within the capsule once compiled. Its count is an entry snapshot, and its thread is copied from verified ledger metadata rather than generated from conversation prose. CAP-014-SCF also satisfies the dependency that activates TAG Dynamic Vector Trigger T3.

## Relational semantics

Kernel 1.6 treats relationship type as part of knowledge state:

```text
Ω(K,E) ≠ Ω(K,E') when E' degrades relation types while K remains fixed
```

| Layer | Responsibility |
|---|---|
| RKI | Constitutional law requiring relational semantic preservation |
| VGATE-R | Intake and survival checks for every declared, inherited, imported, or compressed relation |
| Relation registry | Nine valid types with stable semantics |
| KV-Scribe | Canonical direction, type, status, provenance, and append-only history |
| SOC | Blocks output inference over untyped, collapsed, or unresolved relations |

Mesh Edges and DAG Links remain distinct containers. `CONVERGES_FROM` preserves independent arrival paths; `SYNTHESIZES` records explicit integration into a composite. Kernel 1.6 established the type, direction, status, and provenance contract that Kernel 1.7 JIT must preserve.

## JIT-governed compilation surface

Kernel 1.7 activates CAP-JIT-001 after capsule closure and before SOC compilation:

```text
sealed capsule → RUNN trigger → DEX minimal grid → KV-Scribe injection → SOC compilation
```

| Layer | Responsibility | Hard boundary |
|---|---|---|
| RUNN | Trigger the pass at the correct lifecycle point | Cannot score or inject |
| DEX | Trace VGATE-R-cleared relations and compile the minimal grid | Cannot retrieve ledger state, verify relations, or generate output |
| KV-Scribe | Inject the grid and preserve the complete append-only ledger | Cannot choose retention policy |
| SOC | Compile from the injected surface | Cannot expand or mutate it |

Continuous relation actions preserve the complete nine-type RKI vocabulary. The Watchdog adds a compression sweep only when valid runtime-supplied capacity and threshold parameters exist and current token usage exceeds the threshold. CORE_SYSTEM_INVARIANT and HIGH_PRIORITY_DATA survive every sweep.

In the prompt runtime, suppression is functional: excluded nodes are absent from SOC's governed surface but may remain in the host context window. Physical token eviction and cost reduction are not claimed.

## Dynamic subroutine layers

Kernel 1.8 separates stable PATH context from capsule-precise specialization:

| Layer | Trigger | Lifetime | State owner |
|---|---|---|---|
| Mode 1 | PATH assignment or domain crossing | Persists until governed Mode 1 swap | Core_Manager |
| Tier 1 Mode 2 | `LOAD: [DOMAIN_TYPE]` after SYNTHESIS_GATE | Current capsule; cache manifest persists for session | Core_Manager + KV-Scribe |
| Tier 2 Mode 2 | `LOAD: REG:[TOOL_ID]` after registry validation | Current capsule only | Core_Manager + KV-Scribe |

Mode 2 does not change PATH. A real domain crossing still requires RUNN topology governance and a Mode 1 swap. `KERNEL_INTERFACE@1.0` is the explicit fallback Mode 1 state when no specialized interface applies.

Tier 1 synthesis reads only IC-Node, PATH, Constraints, and Goal. Its gate checks structural completeness rather than truth, so synthesized scope cannot supply Facts or satisfy verification. Only clean KNOWLEDGE invocations enrich the session cache; faulted versions remain append-only and fall back to the last clean version.

Tier 2 keeps stable precision logic immutable. Its VALIDATES and SCOPED_BY relations use `TRANSIENT` status during the capsule, resolve at PoT generation, and preserve their fire-and-resolve ledger history. TRANSIENT is a status, not a tenth RKI type.

The mini-map state strip exposes Mode 1, Mode 2, cache state, and Tier 2 completion in no more than 180 characters. Tool identity expands only for unresolved or blocked exceptions.

## Candidate boot-distribution layer

Kernel 1.9 candidate work separates boot delivery from kernel semantics:

| Profile | Authority at intake | Completion boundary |
|---|---|---|
| FULL | Complete registered Kernel 1.9 source set | Direct CAP-000 closure and `KERNEL_READY` |
| SLIM | Constitution, loader, and Stage B verification algorithm | `BOOTSTRAP_READY` only |
| GUIDE | No standalone authority; operational source supplement | Enters active state only after SLIM verifies its bound digest and coverage |

The profile registry controls membership and order. The builder compiles GUIDE first, binds its SHA-256 into SLIM, compiles FULL, and then writes the candidate manifest. The manifest proves 47 source atoms across the equivalence boundary:

```text
COVERAGE(SLIM ∪ GUIDE) = COVERAGE(FULL)
```

Candidate artifacts remain outside the current release boundary. Kernel 1.8 stays active until the Kernel 1.9 release gate promotes validated artifacts and flashes CAP-142-BPC.

Presentation is a deterministic compiler layer above semantic source selection. Each manifest entry preserves both the selected source digest and its post-format digest. The formatter may remove a superseded source H1 and normalize whitespace; it cannot rewrite semantic prose, change source order, or alter profile coverage.
