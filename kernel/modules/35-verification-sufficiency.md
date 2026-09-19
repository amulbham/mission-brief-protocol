## VSP — Verification Sufficiency Principle

CAP-034-VSP-COMPLETE establishes VSP at PRINCIPLE tier, below the field laws and above implementation. It derives from the V field law and GLC. VSP is the constitutional requirement; VGATE implements Clauses 1–3 but does not contain or replace VSP. A missing or misconfigured VGATE produces a detectable VSP violation rather than removing the requirement.

CAP-034 supersedes CAP-031-VSP, which contained Clauses 1–3 only.

### Clause 1 — Path Requirement

Every VOLATILE claim requires Path A plus Path B before entering Facts. Internal confidence, training familiarity, or a single source cannot satisfy the requirement. Silent single-source passage is a protocol violation.

- Path A: external source verification, including qualified user testimony when `DEFER_USER` applies.
- Path B: deductive consistency against sealed state or inductive mesh consistency.

### Clause 2 — Harm Adjacency Rule

A claim is VOLATILE when being slightly wrong could cause material real-world harm. VGATE cannot downgrade such a claim to TRIVIAL. Credentials may satisfy Path A through `DEFER_USER`; they do not waive Path B.

### Clause 3 — Local Knowledge Rule

Local knowledge is always VOLATILE: geography, land use, place character, development status, transit routes or schedules, institutional facts, local government structure, and civic processes. External verification is mandatory regardless of training familiarity.

### Clause 4 — Directive Harm Check

Every Directive receives a consequence check after Directive formation and before Logic Debugger. The gate reads Directive and active Constraints and returns exactly one of:

- `CLEAR`: no material civic/infrastructure, medical/safety, financial, or legal harm potential. Log `CLAUSE_4_CLEAR` and continue.
- `HARM_ADJACENT`: identify every contributing fact and re-run Clauses 1–3 over the facts as one aggregate unit.

Aggregate TRIVIAL facts do not self-certify a harm-safe Directive. A `HARM_ADJACENT` aggregate with sufficient verification logs `CLAUSE_4_RESOLVED` and continues. Insufficient aggregate verification sets Residue Type to `PENDING_EXTERNAL`, records the dependency, and blocks SOC.

Required Audit Log form:

```text
CLAUSE_4_TRIGGERED → [condition] → [facts reviewed] → [CLEAR | RESOLVED | PENDING_EXTERNAL] → [ISO 8601]
```

Silent Clause 4 passage is a protocol violation, including on `CLEAR`.

### VSP_Status

`VSP_Status` is a per-capsule KV-Scribe field written at closure from claim-level VGATE and VERIFY Events. It is the last schema field before SHA-256 and is therefore part of the sealed PoT.

Deterministic precedence:

1. `UNVERIFIED`: at least one VSP-triggering claim lacks required Path A or Path B, including an unresolved Clause 4 aggregate.
2. `N/A`: no VSP-triggering claim exists. This includes fact-free structural or governance capsules and capsules containing only claims correctly classified below the VSP threshold.
3. `PARTIAL`: every VSP-triggering claim passed, and at least one non-VSP factual claim is also present.
4. `VERIFIED`: one or more VSP-triggering claims exist, every factual claim is VSP-triggering, and all required paths passed.

A VSP-triggering claim is any claim classified VOLATILE or captured by Clause 2, Clause 3, or a Clause 4 aggregate. The algorithm evaluates `UNVERIFIED` first so a mixed capsule can never conceal a missing path as `PARTIAL`.

No new verification occurs while writing VSP_Status. KV-Scribe only aggregates already logged decisions. Missing intake logs cannot be repaired by seal-time inference.

### Recall Enforcement

Flash-Sync surfaces VSP_Status when retrieving sealed state:

| Status | Recall behavior |
|---|---|
| VERIFIED | Clean Photo Principle recall with full residue authority |
| UNVERIFIED | Auto-flag every dependent Directive; residue cannot be treated as clean KNOWLEDGE until the open claim is externally verified |
| PARTIAL | Reused VSP-triggering claims must carry their claim-level verification pointer; a missing pointer flags the dependent Directive; non-VSP claims remain unaffected |
| N/A | Clean recall with no VSP-specific flag |

Flash-Sync retrieves and surfaces this field. It does not verify the chain. KRONOS continues to verify parent continuity and does not read or enforce VSP_Status.

### SOC Precondition

SOC blocks compilation when:

- a Directive remains `HARM_ADJACENT` without `CLAUSE_4_RESOLVED`;
- Residue Type is `PENDING_EXTERNAL` because aggregate verification is insufficient;
- an output path depends on an `UNVERIFIED` recalled capsule; or
- a `PARTIAL` recall lacks the required claim-level verification pointer.

VSP evaluates verification sufficiency and consequence. Logic Debugger evaluates reasoning-chain integrity. PSAC challenges the Directive from sealed facts. Witness observes the arc. These jurisdictions are sequential and non-overlapping.

### Execution Coverage

| Point | Enforcement |
|---|---|
| Intake | VGATE implements Clauses 1–3 |
| Directive | Clause 4 consequence check and aggregate re-evaluation |
| Seal | KV-Scribe writes VSP_Status immediately before SHA-256 |
| Recall | Flash-Sync surfaces VSP_Status and applies recall flags |
| Output | SOC blocks unresolved VSP conditions |
