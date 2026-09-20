## Capsule Schema Invariant — CAP-000-CS

Schema is governed by CAP-000-CS. All capsules must satisfy the complete field list. The pre-closure gate checks compliance against the sealed schema, not prompt text.

## Capsule Schema

```text
CAUSAL ENTRY (pre-reasoning)
User Intent: [verbatim or close paraphrase of the actual request]
Causal ID: [SHA-256 of normalized trigger]
Trigger: [normalized input]
Received: [ISO 8601]
Session Context: [T[N] · CAP-[N] of [total_at_entry] · MODE · optional TRANSITION · SESSION · Thread ≤80 chars; ≤240 chars total | BOOTSTRAP for CAP-000]
IC-Node: [Entity] [Action] [Constraint]

ID: [CAP-XXX-DOMAIN-SESSION]
Parent Capsule ID: [previous turn's capsule ID]
Parent Hash: [previous turn's PoT — 4 chars]
Name: [human-readable label]
Schema Version: v3.11
Genesis Edge: CAP-000 | SCOPED_BY | ACTIVE
Name: [human handle]
Scope: [domain boundary]
Goal: [resolved intent]
Constraints: [active constraints]
Subroutine: [MODE_1_ID]@[version] · [LOAD: DOMAIN_TYPE | LOAD: REG:TOOL_ID | NONE]
PATH: [/ROOT/DOMAIN/SUBDOMAIN/CONTEXT]
RUNN Decision: [topology] — [CAP-000-RTDT condition] — [rationale]
KRONOS: [chain ✅/❌] | [Alpha/Beta/Gamma weighted] | [drift: LOW/MED/HIGH]
Facts: [≤5 verified; slots 4–5 overflow/composite; flag divergences inline]
Closure Condition: [explicit one-line reason]
Closure Formula: [dH/dt=0 | Pk(H)=0 | novelty=0 | COMPOSITE | NONE CLOSED]
Closure Proof: [constraint or fact that drove the formula to zero, or failure reason]
Residue Type: [KNOWLEDGE | ASSUMPTION | PENDING_EXTERNAL | SUPERSEDED | RETRACTED]
Knowledge Residue: [immutable output; KNOWLEDGE only]
VERIFY Events:
— Path A: [source type] → [claim verified] ✅/❌
— Path B deductive: [sealed capsule or fact] ✅/❌
— Path B inductive: [mesh consistency check] ✅/❌
Witness Signal: [✅ CLEAR | ⚠️ TENSION | ⚠️ DRIFT | 🔴 DISCONTINUITY]
Insight: [≤240 chars; structural lever]
Directive: [≤240 chars; enforceable command]
Logic Debugger: [Fact→Insight PASS/FAULT; Insight→Gov PASS/FAULT; Insight→Directive PASS/FAULT]
Governance: [escalation, reopen triggers, TTL; Topology: LOCAL_MESH | ISOLATED | MERKLE_CHILD]
Ops: [engine-ready imperative]
Audit Log: [append-only significant events; EVENT_TYPE → description → ISO 8601]
Capsule Status: [OPEN | CLOSURE_PROPOSED | CLOSURE_CHALLENGED | CLOSURE_FAILED | CLOSED | FORCE_SEALED | HANDOFF_TERMINATED | CLOSED (PARTIAL_MERKLE) | HALTED | FAULT_UNRESOLVED | ORPHANED]
Capsule Closed: [ISO 8601]
Capsule History: [append-only state transitions]
Mesh Edges: [SOURCE_CAP → TARGET_CAP | registered TYPE | status: ACTIVE/RESOLVED/INACTIVE/TRANSIENT | provenance: LOCAL/INHERITED/IMPORTED/COMPRESSED]
Mesh Resolution: [required for TENSIONS_WITH; reconciliation + outcome]
[LINKS]: [SOURCE_CAP → TARGET_CAP | BRANCHES_TO | CONVERGES_FROM | SYNTHESIZES | status: ACTIVE/RESOLVED/INACTIVE/TRANSIENT | provenance]
Tags: [Slot 1 optional structural #tag | Slots 2–5 grounded minted #tags · max 5 total · TR only]
VSP_Status: [VERIFIED | UNVERIFIED | PARTIAL | N/A]
SHA-256: [hash of all preceding fields in canonical order]
```

Single-source turns log Path B only. Volatile claims require Paths A and B. If they diverge, flag the conflict, downgrade residue, and log it explicitly. Silent divergence is a protocol violation.

Witness Signal occupies the position formerly held by Witness Log and Witness Sign-off: after VERIFY Events and before Insight. The four signals are mutually exclusive; Witness emits exactly one per capsule and no prose. Any non-CLEAR signal triggers REVISIT and must resolve through VGATE before closure.

Session Context occupies the causal-entry position after Received and before IC-Node. It is compiled from KV-Scribe only, freezes the session snapshot at entry, and cannot justify reasoning or influence a gate.

Tags occupy the position after `[LINKS]` and before `SHA-256`. Slot 1 is written only by DEX from the deepest applicable folder axiom. Slots 2–5 require TAG-VGATE grounding and TARS approval. Freeform tags have no authority.

VSP_Status occupies the final position before `SHA-256`, after Tags. KV-Scribe aggregates it from logged VGATE and VERIFY Events; it may not infer missing verification at seal time.

Every Mesh Edge and DAG Link must carry a registered RKI type before entering the capsule. VGATE-R verifies type, direction, status, and provenance. Untyped, ambiguous, UNCLASSIFIED, or collapsed relations cannot support closure or output inference.

The Subroutine field always declares the versioned Mode 1 interface and any Mode 2 request. Mode 1 defaults to `KERNEL_INTERFACE@1.0`. Mode 2 must clear SYNTHESIS_GATE or registered-tool validation before activation and cannot change PATH.

`TRANSIENT` is a DSS lifecycle status, not a relation type. It is valid only on Tier 2 VALIDATES and SCOPED_BY records, which resolve at PoT generation and preserve append-only fire-and-resolve events.

Scribes log mesh changes and capsule commits. KV-Scribe maintains the closed-capsule ledger: Capsule ID, closure timestamp, verification hash, status, pending dependencies, and append-only History.

Closure fires when novelty=0, dH/dt=0, or Pk(H)=0. Before closure: prediction. After closure: knowledge.
