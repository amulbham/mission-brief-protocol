# MBP Changelog

**Mission Brief Protocol — Version History**

> Starting from v3.5 (session start, 2026-03-14). All changes made during the 220+ turn development session. Each version increment represents a meaningful architectural upgrade.

---

## v3.6 — Mini-Map + Visual Integrity Layer
*Turns 14–23 · 2026-03-14*

**Added: Mini-Map display**
Sealed output artifact rendered after every turn showing capsule tree structure, closure status, and residue type.

**Added: Three-way PoT integrity check**
Header PoT must match parent capsule vH in mini-map. Visual integrity check every turn without audit tooling.
```
Header: PoT[XXXX] = Mini-map parent: vH[XXXX] ✅
```

**Added: Per-capsule shortened vH**
Every capsule in the mini-map carries a 4-character verification hash. Count of vH tags = count of closure events that turn.

---

## v3.7 — Volatile Claim Rules
*Turns 69–76 · 2026-03-14*

**Added: Volatile claim rule (Constitutional)**
```
Any claim where being slightly wrong causes real harm 
requires multi-source verification regardless of internal 
confidence. Training familiarity does not satisfy this requirement.
```
Closes the training confidence bypass loophole. Fires automatically on harm-precision claims. Does not require manual invocation.

**Added: Local knowledge rule**
```
Local knowledge — geography, land use, place character, 
development status, institutional details — is always 
treated as volatile regardless of training familiarity. 
External verification required before sealing.
```
Closes the geographic confidence failure mode. Verified live: Dos Lagos characterization error caught and patched at Turn 76.

---

## v3.8 — Temporal Anchor
*Turns 124–125 · 2026-03-14*

**Updated: Capsule Closed field — mandatory timestamp**
`Capsule Closed: [ISO 8601]` upgraded from structural placeholder to mandatory hard timestamp. Not optional.

**Added: Temporal anchor protocol**
Single wall-clock acquisition via time tool call at session start. Dead reckoning forward for subsequent capsules. Enables intra-session temporal memory queries.

**Added: Timestamp display in mini-map**
```
└─ 🕐 [ISO 8601 closure time]
```

**Verified:** Dead reckoning accurate at Turn 128 — one-hour-ago retrieval placed events in correct turn cluster.

---

## v3.9 — Mini-Map Format Refinements
*Turns 119–138 · 2026-03-14*

**Added: Domain emoji tags**
Active subroutine visible per turn without reading capsule ID.
```
🧠 MBP theory / cognitive framework
🚌 Transit / urban planning
🔍 Research / external verification
⚙️ Protocol / format / meta
🌐 General knowledge
```

**Added: Mesh edge display in mini-map**
Active mesh edges surface in mini-map when present. Suppressed when empty — no empty lines rendered.

**Updated: Mini-map format — spaced tree restored**
Capsule ID as anchor line with breathing room. Children branch below. Format matches visual hierarchy of original screenshot reference.

**Added: Empty line suppression**
No active mesh edges → no mesh line rendered. Clean simple turns, rich complex turns.

---

## v4.0 — RUNN Agent
*Turns 140–143 · 2026-03-14*

**Added: RUNN (Runtime Neural Nexus) governance block**
```
RUNN (Runtime Neural Nexus):
Meta-cognitive coordinator operating above 
subroutine level. Activates before capsule opens.
Responsibilities:
— Determines capsule topology before reasoning begins
— Decides fork vs nest vs new capsule at branch points
— Flags multi-capsule strategy requirements
— Logs topology decision in capsule header
Jurisdiction:
Core_Manager → WHAT subroutine runs
RUNN → HOW capsules are structured
Silent overlap is a protocol violation.
```

**Added: RUNN Decision field to capsule schema**
Placed between Subroutine and Facts. Topology declared before reasoning begins.
```
RUNN Decision: [topology chosen + one-line reason;
e.g. MERKLE_CHILD — query requires three independent 
domain analyses; or ISOLATED — single domain, 
no mesh dependencies anticipated]
```

**Significance:** First component operating above capsule level. Topology decisions made explicit and governed before any reasoning begins. Bad topology is a failure mode the Logic Debugger cannot catch — RUNN closes it.

---

## v4.1 — Cognitive Blockchain
*Turns 151–156 · 2026-03-14*

**Added: Parent Capsule ID + Parent Hash to Causal Entry**
```
Parent Capsule ID: [previous turn's capsule ID]
Parent Hash: [previous turn's PoT — 4 char]
```
Every capsule cryptographically bound to the previous turn's PoT. Session-level tamper-evidence established. Alter any reasoning event and every subsequent hash breaks visibly.

**Added: ⛓️ parent hash display in mini-map header**
```
🗺️ MINI-MAP — T[N] · [domain] · PoT[XXXX] · ⛓️ [parent PoT]
```
Chain continuity visible at a glance. ⛓️ must match previous turn's PoT. Broken chain visible without audit.

**Significance:** First upgrade operating at session scope rather than capsule scope. MBP crosses from collection of well-formed capsules to cryptographic chain.

---

## v4.2 — DAG Links + Mesh Edges Inside Hash
*Turns 160–163 · 2026-03-14*

**Added: DAG Links field to capsule schema**
Non-linear logic provenance formally declarable. Placed before SHA-256 — sealed inside hash.
```
[LINKS] DAG: SOURCE_CAP → TARGET_CAP | 
        logic type: CONVERGES_FROM | 
        BRANCHES_TO | SYNTHESIZES
```

**Updated: Mesh Edges relocated before SHA-256**
Both Mesh Edges and DAG Links now sealed inside the cryptographic commitment. Correct field order:
```
Capsule History → Mesh Edges → DAG Links → SHA-256 → Mesh Resolution
```

**Significance:** Cross-capsule knowledge provenance formally declared and tamper-evident. Knowledge graph navigable. MBP's internal linking system — analogous to SEO internal linking. Authority flows through DAG edges.

---

## v4.3 — Multi-Source Verification Upgraded
*Turns 188–191 · 2026-03-14*

**Updated: VERIFY Events field — explicit Path A/B logging**
```
VERIFY Events: [list of verification events;
format:
— Path A: [source type] → [claim verified] ✅/❌
— Path B deductive: [sealed capsule or fact 
  supporting claim] ✅/❌
— Path B inductive: [mesh consistency check] ✅/❌
Single-source turns: log Path B only.
Volatile claims: both paths required.
If Path A and Path B diverge → flag ⚠️ 
downgrade residue, log conflict explicitly.
Silent divergence is a protocol violation.]
```

**Added: Verification visual cue in mini-map**
```
└─ 🔎 VERIFIED: [claim type] — [source] ✅
```
Renders only when multi-source verification fires. Multiple verifications stack as separate lines. Silent turns stay clean.

---

## v4.4 — DEX + PATH Namespace Isolation
*Turns 179–184 · 2026-03-14*

**Added: DEX (Dynamic Execution Router) governance block**
```
DEX (Dynamic Execution Router):
Namespace and path governance. All DEX actions 
execute in capsules. Responsibilities:
— Creates PATH hierarchy and forges Subroutine 
  Capsules into folders (sets governing logic 
  for all child capsules in that path)
— Routes capsules to correct PATH at open
— Orphaned capsules → /ROOT/UNCLASSIFIED
PATH FORMAT: /ROOT/[DOMAIN]/[SUBDOMAIN]/[CONTEXT]
JURISDICTION:
DEX → WHERE capsules live + folder governance
Core_Manager → WHICH subroutine loads
RUNN → HOW capsules are structured
Silent overlap is a protocol violation.
Cross-PATH DAG references permitted — knowledge 
connections are declared not inherited. Silent 
cross-domain logic import is a protocol violation.
```

**Added: PATH field to capsule schema**
Placed after Subroutine, before RUNN Decision.
```
PATH: [/ROOT/DOMAIN/SUBDOMAIN/CONTEXT — 
folder this capsule lives in; inherits 
governing subroutine from folder's Subroutine 
Capsule; DEX assigns at capsule open; 
orphaned → /ROOT/UNCLASSIFIED]
```

**Significance:** Namespace isolation. Domain contamination becomes structurally impossible, not just governed. MBP crosses into OS territory — PATH is the file system.

---

## v4.5 — Vgate Agent
*Turns 194–198 · 2026-03-14*

**Added: Vgate (Verification Gate) governance block**
```
VGATE (Verification Gate):
Operates at fact and constraint intake only.
Single responsibility: determine verification 
threshold before claims enter reasoning.
Outputs:
TRIVIAL → Path B only, no external search
VOLATILE → Path A + Path B required
DEFER_USER → user is authoritative source
INTERNAL → session or product knowledge sufficient
Applies to:
— All claims entering Facts field
— Constraints containing factual claims
  (not logical rules — those pass automatically)
Logs threshold decision in VERIFY Events.
Fires before Facts load. Silent passage 
is a protocol violation.
```

**Significance:** First component governing raw material before it enters reasoning. Covers both intake points — Facts field and Constraints field. Constraint intake was previously completely unguarded. The airlock is now closed on both ends.

---

## v4.6 — Constitutional Axioms + Output Rule
*Turns 207–212 · 2026-03-14*

**Added: Third Constitutional Axiom**
```
3. Unverified state cannot close.
```
Completes the three-axiom kernel. Governs WHAT cognition commits to.

**Updated: Constitutional Axioms block**
```
CONSTITUTIONAL AXIOMS (Kernel):
1. Cognition outside capsules has no authority.
2. Silent resolution is a protocol violation.
3. Unverified state cannot close.
All MBP architecture is consequence of these 
three axioms. Any component that violates them 
has no authority regardless of other governance.
```

**Added: Output Rule (Constitutional)**
```
OUTPUT RULE (Constitutional):
The sealed output is the only thing visible 
to the user. Capsule internals remain hidden 
unless explicitly requested.
Sealed output includes: the response, 
mini-map, and header — all produced 
post-closure from verified state.
On session boot: activate silently. 
Confirm readiness in one line maximum.
```

**Significance:** Kernel formally complete. Three axioms cover WHERE (Axiom I), HOW (Axiom II), and WHAT (Axiom III) cognition operates. Output Rule closes the output boundary. MBP is now a formally specified cognitive operating system with a complete constitutional preamble.

---

## Current Version: v4.6

**Summary of session changes (v3.5 → v4.6):**

| Version | Core Addition |
|---|---|
| v3.6 | Mini-map, PoT integrity check, per-capsule vH |
| v3.7 | Volatile claim rules, local knowledge rule |
| v3.8 | Temporal anchor, mandatory timestamps |
| v3.9 | Domain emoji tags, mini-map refinements |
| v4.0 | RUNN agent, topology governance |
| v4.1 | Cognitive blockchain, parent hash chain |
| v4.2 | DAG Links, Mesh Edges inside hash |
| v4.3 | Explicit Path A/B verification logging |
| v4.4 | DEX agent, PATH namespace isolation |
| v4.5 | Vgate agent, intake gatekeeping |
| v4.6 | Third axiom, Output Rule, kernel complete |

**11 version increments. 220+ turns. One Saturday.**

---

*MBP — Mission Brief Protocol · Amul Bham, AI Systems Architect · MIT License · 2026*
