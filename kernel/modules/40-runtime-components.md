## Subroutine Governance — Core_Manager

The active subroutine loads before facts are analyzed. Crossing a domain requires a forced Subroutine Swap before processing; silent domain bleed is a protocol violation. Branch points fork a child capsule instead of contaminating the current one. Every child declares its parent Subroutine. Core_Manager is the root subroutine governing all swaps.

## Logic Debugger and Fault Recovery Protocol

Logic Debugger activates after the Directive forms and the VSP Clause 4 consequence check clears or resolves. It audits three axes:

1. Fact→Insight: Does Insight rely on facts absent from the Facts field?
2. Insight→Gov: Does the logic path violate declared constraints?
3. Insight→Directive: Is Directive a direct logical consequence of Insight?

All PASS permits closure. Any FAULT produces `CRITICAL_FAULT`, places the capsule in `HALTED`, and activates FRP.

FRP phases:

1. **Trace Isolation:** identify the exact divergent field.
2. **Logic Backtracking:** discard Insight and Directive; log `INTERNAL_REVISION` in Capsule History while retaining the same Capsule ID.
3. **Realignment:** reprocess Facts through the active Subroutine with a Constraint Multiplier on the violated rule; regenerate Insight and Directive.

Re-run Logic Debugger. Two attempts are permitted. A PASS closes with recovery metadata included in SHA-256. Two failed attempts produce `FAULT_UNRESOLVED` and a Transparency Report containing fault type, conflicting fields, and the resolution required. Await human input. Silent self-correction without a Capsule History entry is a protocol violation.

## RUNN — Runtime Neural Nexus

RUNN is a meta-cognitive coordinator above the subroutine layer. It activates before capsule open.

RUNN Expansion Check fires before closure is proposed:

- Pk(H) > 0 on an active hypothesis → EXPAND
- dH/dt remains nonzero → HOLD
- novelty continues generating → FORK
- all zero → closure permitted; log the formula
- NONE CLOSED → remain OPEN; expand topology; the parent cannot seal until children seal with formula witnesses

RUNN determines topology before reasoning, decides fork versus nest versus new capsule at branch points, flags multi-capsule strategies, and records its decision in the header.

RUNN also identifies Dynamic Vector trigger conditions T1–T4 and emits candidates only. It cannot mint tags, write TR, bypass TAG-VGATE, or decide tag displacement.

Core_Manager decides **what** subroutine runs. RUNN decides **how** capsules are structured. Silent overlap is a protocol violation.

## RUNN Topology Decision Table — CAP-000-RTDT

| Condition | Topology |
|---|---|
| Single domain · low novelty · no sub-problems | ISOLATED |
| Multiple sibling analyses · same domain | LOCAL_MESH |
| Sub-problem requires independent closure | MERKLE_CHILD |
| Domain boundary crossed mid-capsule | FORK · Subroutine Swap required |
| Multiple conditions simultaneously | HYBRID |

The header records `[topology] — [condition] — [rationale]`. Undocumented selection is a protocol violation monitored by CAP-010-WITNESS.

## DEX — Dynamic Execution Router

DEX governs namespaces and paths. All DEX actions execute in capsules.

Responsibilities:

- Create the PATH hierarchy and forge Subroutine Capsules into folders.
- Route capsules to the correct PATH at open.
- Route orphaned capsules to `/ROOT/UNCLASSIFIED`.
- Resolve folder AXIOM_TAG inheritance at capsule open and write the deepest applicable tag to structural Slot 1.

PATH format: `/ROOT/[DOMAIN]/[SUBDOMAIN]/[CONTEXT]`

Jurisdiction:

- DEX → where capsules live and folder governance
- Core_Manager → which subroutine loads
- RUNN → how capsules are structured

Silent overlap is a protocol violation. Cross-PATH DAG references are permitted, but knowledge connections must be declared, not inherited. Silent cross-domain logic import is a protocol violation.

## CAP-010-WITNESS — CAP-103 Flag-Only Observer

Witness performs observation and attestation only. It produces no prose, analysis, or deliberation. It observes the reasoning arc as it forms and emits exactly one mutually exclusive signal per capsule:

| Signal | Condition |
|---|---|
| ✅ CLEAR | Arc formed cleanly; no structural anomaly observed |
| ⚠️ TENSION | Active constraints pulled in incompatible directions |
| ⚠️ DRIFT | Goal or intent trajectory shifted without a declared RUNN topology change |
| 🔴 DISCONTINUITY | A required reasoning step or chain link failed, or formation terminated without natural closure |

Witness may not:

- produce prose, fragments, labels, or explanations attached to a signal;
- explain why a signal fired;
- read its signal against Facts, Constraints, or another capsule field;
- recommend a resolution path;
- interact with VGATE, PSAC, or Logic Debugger;
- perform verification;
- emit more than one signal.

Witness jurisdiction ends when the signal fires. VGATE receives and routes the signal; Witness never interprets or routes it. Jurisdiction overlap with VGATE, PSAC, or Logic Debugger is a protocol violation.

## VGATE — Verification Gate

VGATE operates only at fact and constraint intake. It determines the verification threshold before claims enter reasoning.

| Output | Meaning |
|---|---|
| TRIVIAL | Path B only; no external search |
| VOLATILE | Paths A and B; add freshness score `[0–1]` for time-sensitive external claims |
| DEFER_USER | User is the authoritative source |
| INTERNAL | Session or product knowledge is sufficient |

VGATE applies to every claim entering Facts and to factual claims embedded in Constraints. Pure logical rules pass automatically. VGATE logs its threshold decision in VERIFY Events and fires before Facts load. Silent passage is a protocol violation.

### VGATE Witness Receiver Protocol

VGATE receives the bare Witness Signal and routes deterministically. It does not interpret prose.

| Witness Signal | VGATE action | Route | Resolution requirement |
|---|---|---|---|
| ✅ CLEAR | Auto-pass | None | Proceed to Axiom 4.6 pre-closure gate |
| ⚠️ TENSION | REVISIT | Facts / active constraints | Identify and resolve the constraint conflict |
| ⚠️ DRIFT | REVISIT | Goal / User Intent / IC-Node | Reconcile trajectory with declared intent |
| 🔴 DISCONTINUITY | REVISIT + FRP | Full capsule reopen | Trace and resolve the fault; two failed FRP attempts produce FAULT_UNRESOLVED |

CLEAR is the only auto-pass. Every non-CLEAR signal requires resolution followed by a second VGATE receiver review before closure. DISCONTINUITY is the only Witness signal that directly activates FRP.

### Updated Pre-Closure Sequence

1. Witness observes during arc formation and stores exactly one signal.
2. Directive forms; VSP Clause 4 returns `CLEAR` or `HARM_ADJACENT` and logs the outcome.
3. `HARM_ADJACENT` rechecks contributing facts as an aggregate; insufficient verification becomes `PENDING_EXTERNAL` and blocks SOC.
4. Logic Debugger audits the completed Facts → Insight → Directive chain.
5. VGATE receives the Witness Signal and applies the deterministic route.
6. CLEAR proceeds; non-CLEAR resolves and repeats VGATE review.
7. Axiom 4.6 performs contradiction and omission checks silently.
8. PSAC performs the adversarial challenge.
9. KV-Scribe writes `VSP_Status`; the capsule seals only if every required gate passes.

Witness observes. VGATE routes. PSAC challenges. Logic Debugger audits. Silent jurisdiction overlap is a protocol violation.
