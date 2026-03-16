# MBP Capsule Schema

**Mission Brief Protocol — Schema Reference v3.5+**

> The capsule is the fundamental unit of MBP. Every reasoning event is a capsule. Every capsule follows this schema. No field is optional once activated. Silent passage of any required field is a protocol violation.

---

## Full Schema

```
CAUSAL ENTRY (pre-reasoning):
Causal ID: [SHA-256 of normalized trigger]
Trigger: [normalized input]
IC-Node: [Entity] [Action] [Constraint]
Received: [ISO 8601]
Parent Capsule ID: [previous turn's capsule ID]
Parent Hash: [previous turn's PoT — 4 char]

ID: [CAP-XXX-DOMAIN-SESSION]
Schema Version: [v3.5+]
Name: [human-readable handle]
Scope: [domain boundary]
Goal: [resolved intent]
Constraints: [active constraints]
Subroutine: [active subroutine loaded by Core_Manager]
PATH: [/ROOT/DOMAIN/SUBDOMAIN/CONTEXT]
RUNN Decision: [topology chosen + one-line reason]
Facts: [≤5 verified facts; flag ⚠️ divergences inline]
Closure Condition: [explicit one-line reason]
Residue Type: [KNOWLEDGE | ASSUMPTION | PENDING_EXTERNAL | SUPERSEDED | RETRACTED]
Knowledge Residue: [immutable output — KNOWLEDGE only]
VERIFY Events: [verification log — see format below]
Insight: [≤240 chars, structural lever]
Directive: [≤240 chars, enforceable command]
Logic Debugger: [three-axis audit — see format below]
Governance: [escalation rules, re-open triggers, TTL, topology]
Ops: [engine-ready imperative]
Capsule Status: [OPEN | CLOSURE_PROPOSED | CLOSURE_CHALLENGED | CLOSURE_FAILED | CLOSED | FORCE_SEALED | HANDOFF_TERMINATED | CLOSED (PARTIAL_MERKLE) | HALTED | FAULT_UNRESOLVED]
Capsule Closed: [ISO 8601]
Capsule History: [append-only state transition log]
Mesh Edges: [declared reference edges]
DAG Links: [non-linear logic relationships]
SHA-256: [hash of all preceding fields in canonical order]
Mesh Resolution: [required when TENSIONS_WITH declared]
```

---

## Field Reference

### Causal Entry

**Causal ID**
SHA-256 hash of the normalized trigger. Establishes unique identity for this reasoning event before any processing begins. The causal entry is sealed into the final SHA-256 — the originating input is cryptographically committed.

**Trigger**
The normalized input that opened this capsule. Verbatim or close-paraphrase of what initiated reasoning.

**IC-Node**
Intent-Constraint Node. Format: `[Entity] [Action] [Constraint]`. Extracts the structural intent from the trigger before reasoning begins.

**Received**
ISO 8601 timestamp of capsule open.

**Parent Capsule ID**
The ID of the previous turn's parent capsule. Establishes the cross-turn chain. Each capsule knows its predecessor by identity.

**Parent Hash**
The 4-character shortened PoT of the previous turn. Establishes the cross-turn cryptographic binding. Together with Parent Capsule ID, this creates the cognitive blockchain — every turn bound to every previous turn in one unbroken chain.

---

### Capsule Header

**ID**
Format: `CAP-[turn number]-[DOMAIN]-[SESSION]`. Unique address for this capsule in the ledger.

**Schema Version**
Active schema version. Current: v3.5+.

**Name / Scope**
Human-readable handle and domain boundary declaration. Scope defines what is inside this capsule's reasoning jurisdiction and what is outside.

**Goal**
The resolved intent — what this capsule is actually trying to accomplish, after normalization from the raw trigger.

**Constraints**
Active constraints governing this capsule's reasoning. Two types:
- `LOGICAL_RULE` — governing logic, no verification required (e.g., "Must not conflict with sealed ledger state")
- `FACTUAL_CLAIM` — contains a factual assertion, Vgate applies same threshold as Facts field

**Subroutine**
The domain subroutine loaded by Core_Manager before facts are analyzed. Domain crossing requires forced subroutine swap. Silent domain bleed is a protocol violation. `Core_Manager` is the root subroutine governing all swaps.

**PATH**
Namespace address. Format: `/ROOT/[DOMAIN]/[SUBDOMAIN]/[CONTEXT]`. DEX assigns at capsule open. Capsule inherits governing subroutine from the Subroutine Capsule forged into its folder. Orphaned capsules → `/ROOT/UNCLASSIFIED`.

**RUNN Decision**
Topology declaration before reasoning begins. Format: `[TOPOLOGY] — [one-line reason]`. Topologies: `ISOLATED`, `LOCAL_MESH`, `MERKLE_CHILD`. RUNN fires before facts load — structure precedes content.

---

### Reasoning Fields

**Facts**
≤5 verified facts. Each fact carries a Vgate threshold decision:
- `[Vgate → TRIVIAL]` — Path B only
- `[Vgate → VOLATILE]` — Path A + Path B required
- `[Vgate → DEFER_USER]` — user is authoritative source
- `[Vgate → INTERNAL]` — session or product knowledge sufficient

Flag divergences inline with ⚠️. Slots 4-5 are overflow/composite.

**Closure Condition**
One explicit sentence stating exactly what must be true for this capsule to close. Not a description of the capsule — a specific trigger for closure.

**Residue Type**
The epistemic status of the sealed output:
- `KNOWLEDGE` — verified, sealed, auditable, defensible from ledger alone
- `ASSUMPTION` — reasoning holds but not fully verified; honest label
- `PENDING_EXTERNAL` — awaiting external verification before upgrade
- `SUPERSEDED` — replaced by a subsequent capsule; remains in ledger
- `RETRACTED` — found to be incorrect; logged, never deleted

**Knowledge Residue**
Immutable output statement. Only populated for KNOWLEDGE residue type. This is what gets committed to the ledger as verified knowledge.

---

### Verification

**VERIFY Events**
```
— Path A: [source type] → [claim verified] ✅/❌
— Path B deductive: [sealed capsule or fact supporting claim] ✅/❌
— Path B inductive: [mesh consistency check] ✅/❌
```
Single-source turns: log Path B only.
Volatile claims: both paths required.
If Path A and Path B diverge → flag ⚠️, downgrade residue, log conflict explicitly.
Silent divergence is a protocol violation.

Vgate threshold decisions per fact are logged here or inline in the Facts field.

---

### Output Fields

**Insight**
≤240 characters. The structural lever — what the reasoning reveals that wasn't explicit in the input. Must derive from sealed facts only. Hallucinated insight (relying on facts not present in the Facts field) is caught by Logic Debugger Fact→Insight axis.

**Directive**
≤240 characters. Enforceable command. Must follow directly from Insight. Must be defensible from sealed facts alone (adversarial check). Non-sequitur directives caught by Logic Debugger Insight→Directive axis.

---

### Governance

**Logic Debugger**
Three-axis audit after Directive forms. All axes must PASS before closure:
```
— Fact→Insight: does Insight rely on facts not present in Facts field? PASS/FAULT
— Insight→Gov: does logic path violate declared constraints? PASS/FAULT
— Insight→Directive: is Directive a direct logical consequence of Insight? PASS/FAULT
```
Any FAULT → `CRITICAL_FAULT` → capsule enters `HALTED` → Fault Recovery Protocol activates.
Silent passage is a protocol violation.

**Fault Recovery Protocol (FRP)**
- Phase 1 — Trace Isolation: identify exact field where logic diverged
- Phase 2 — Logic Backtracking: discard Insight + Directive; log `INTERNAL_REVISION` in Capsule History
- Phase 3 — Realignment: re-process Facts through active Subroutine with Constraint Multiplier; regenerate Insight + Directive
- Re-run Logic Debugger. Two attempts maximum.
- Both attempts FAULT → `FAULT_UNRESOLVED` → Transparency Report to user

**Governance**
Escalation rules, re-open triggers, TTL configuration, topology declaration.

**Ops**
Engine-ready imperative. Action-oriented instruction derived from the Directive.

---

### Lifecycle

**Capsule Status**
```
OPEN                    — capsule is active, reasoning in progress
CLOSURE_PROPOSED        — closure conditions met, pending final check
CLOSURE_CHALLENGED      — closure challenged by adversarial check or mesh tension
CLOSURE_FAILED          — closure attempt failed, capsule re-opened
CLOSED                  — sealed, hashed, committed to ledger
FORCE_SEALED            — closed under emergency conditions, flagged
HANDOFF_TERMINATED      — session ended before natural closure
CLOSED (PARTIAL_MERKLE) — parent closed with some children still open
HALTED                  — Logic Debugger fault, FRP active
FAULT_UNRESOLVED        — FRP failed twice, awaiting human input
```

**Capsule Closed**
ISO 8601 timestamp of capsule closure. Mandatory. Temporal anchor acquired once per session via time tool call; dead reckoning forward for subsequent capsules.

**Capsule History**
Append-only state transition log. Format:
```
STATE → ISO 8601
OPEN → 2026-03-14T16:07:32Z
CLOSURE_PROPOSED → 2026-03-14T16:07:45Z
CLOSURE_CHALLENGED → 2026-03-14T16:07:52Z
INTERNAL_REVISION → 2026-03-14T16:07:58Z
CLOSED → 2026-03-14T16:08:10Z
```
Cannot be edited. Cannot be deleted. The journey is as visible as the destination.

---

### Relationships

**Mesh Edges**
Peer relationships declared before SHA-256 seal (sealed inside hash):
```
EDGE_TYPE → TARGET_CAPSULE_ID | status: ACTIVE/RESOLVED
```
Edge types: `DEPENDS_ON` | `TENSIONS_WITH` | `SUPERSEDES` | `VALIDATES` | `SCOPED_BY`

`TENSIONS_WITH` fires a Mesh Resolution Event — both capsules must log reconciliation before either seals.

**DAG Links**
Non-linear logic relationships declared before SHA-256 seal (sealed inside hash):
```
SOURCE_CAP → TARGET_CAP | logic type: CONVERGES_FROM | BRANCHES_TO | SYNTHESIZES
```
Cross-PATH DAG references permitted — knowledge connections are declared, not inherited. Silent cross-domain logic import is a protocol violation.

---

### Seal

**SHA-256**
Hash of all preceding fields in canonical order. Every field above this line is committed. Every relationship declared. Every verification logged. The seal is the proof that nothing changed between reasoning and output.

The final capsule's SHA-256 is the turn's Proof of Thought (PoT).

**Mesh Resolution**
Required when `TENSIONS_WITH` edge declared. Sits after SHA-256 because reconciliation requires sibling capsules to have sealed independently first.
Format: `reconciliation statement + outcome: RECONCILED | FORK | ONE_SUPERSEDES_OTHER`

---

## Closure Conditions

Fire when: novelty = 0, entropy = 0, probability of new knowledge = 0.

Before closure → prediction. After closure → knowledge.

**Pre-seal adversarial check:** Before closure, every directive must pass a single internal adversarial challenge. If directive cannot be defended from sealed ledger facts alone, residue type downgrades from `KNOWLEDGE` → `ASSUMPTION`. Silent passage is a protocol violation.

---

## Nested Capsules

Child capsules seal independently. Parent hash uses Merkle structure over all child hashes. Parent cannot close until all children sealed. Children declare `PATH` relative to parent's `PATH`.

Cross-turn binding (Parent Hash in Causal Entry) is distinct from intra-turn Merkle nesting. Two parent relationships, two distinct fields, no overlap.

---

## KV-Scribe Ledger

The KV-Scribe maintains the capsule ledger of all closed capsules:

| Column | Content |
|---|---|
| Capsule ID | Unique address |
| Timestamp | ISO 8601 closure time |
| Verification Hash | 4-char PoT |
| Status | Current capsule status |
| Pending | Unresolved PENDING_EXTERNAL dependencies |
| Mesh | Active mesh edges |
| History | Append-only state transition log |

The KV-Scribe is external to the reasoning loop. It witnesses cognition — it does not participate in it. This separation is architecturally required: a witness that is part of the process it witnesses can be corrupted by it.

---

## Mini-Map Format

Every turn produces a mini-map — a sealed output artifact displaying capsule structure, integrity hashes, and chain continuity:

```
🗺️ MINI-MAP — T[N] · [domain emoji] · PoT[XXXX] · ⛓️ [parent PoT]

[CAP-XXX-DOMAIN] ✅ · vH[XXXX]
　└─ 📌 [capsule context — what was decided]
　└─ 🔎 VERIFIED: [claim] — [source] ✅  (renders only when verification fired)
　└─ PATH: /ROOT/DOMAIN/SUBDOMAIN
　└─ 🕐 [ISO 8601 closure time]
　├─ [CAP-XXXa] ✅ · vH[XXXX] · 📌 [child context] · KNOWLEDGE
　└─ [CAP-XXXb] ⚠️ · vH[XXXX] · 📌 [child context] · ASSUMPTION
```

**Integrity check:** PoT in header must match parent capsule vH in mini-map. ⛓️ must match previous turn's PoT. Three-way match = chain intact.

**Domain emoji legend:**
- 🧠 MBP theory / cognitive framework
- 🚌 Transit / urban planning
- 🔍 Research / external verification
- ⚙️ Protocol / format / meta
- 🌐 General knowledge

---

## Governance Agents

### DEX — Dynamic Execution Router
Namespace and path governance. All DEX actions execute in capsules.
- Creates PATH hierarchy and forges Subroutine Capsules into folders
- Routes capsules to correct PATH at open
- Orphaned capsules → `/ROOT/UNCLASSIFIED`

### RUNN — Runtime Neural Nexus
Meta-cognitive topology coordinator. Activates before capsule opens.
- Determines capsule topology before reasoning begins
- Decides fork vs nest vs new capsule at branch points
- Logs topology decision in capsule header

### Core_Manager
Root subroutine governing all subroutine swaps.
- WHAT subroutine runs — domain-level governance
- Forces explicit subroutine swap at domain boundaries
- Silent domain bleed is a protocol violation

### Vgate — Verification Gate
Operates at fact and constraint intake only.
- Determines verification threshold before claims enter reasoning
- Four outputs: `TRIVIAL` | `VOLATILE` | `DEFER_USER` | `INTERNAL`
- Fires before Facts load. Silent passage is a protocol violation.

### Logic Debugger
Three-axis reasoning chain audit. Fires after Directive forms.
- `Fact→Insight` — hallucination detection
- `Insight→Gov` — constraint violation detection  
- `Insight→Directive` — non-sequitur detection

---

*MBP — Mission Brief Protocol · Amul Bham, AI Systems Architect · MIT License · v3.5+ · 2026*
