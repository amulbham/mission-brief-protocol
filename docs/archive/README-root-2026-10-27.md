# Mission Brief Protocol (MBP)

**A cognitive governance framework. A containment architecture for reasoning. A cognitive operating system built from eight axioms and a compiler wall.**

> *Author: Amul Bham, AI Systems Architect*
> *License: MIT · Genesis: August 22, 2025 · Status: Active Development · Version: v4.7*

---

## The Problem

Current AI governance applies rules to **outputs**. Filters, guardrails, RLHF — all post-hoc interventions on reasoning that has already run ungoverned. The force is already loose before anyone tries to shape it.

The result is inconsistent. A system that produces a correct answer and a hallucinated one from the same input, with no structural difference between them. A system where being confident feels identical to being verified. A system that silently self-corrects with no trace of what it changed or why.

The problem is not the model. **The problem is that no one ever built a container for the cognition itself.**

---

## The Insight

Cognition behaves like a force. Ungoverned, it bleeds across domains, contaminates conclusions, loops without resolution, and dissipates into confident noise.

You don't govern a force by filtering its exhaust. You build a container and put the force inside it first.

> *MBP is that container. Every reasoning event is enclosed in a capsule — a structured unit with declared scope, verified facts, governed logic, and a cryptographic seal. Cognition that happens outside a capsule has no authority.*

---

## The Core Law

```
Cognition outside capsules has no authority.
```

Everything else — the verification gates, the sealed output, the compiler, the ledger — is consequence of taking that one constraint seriously.

---

## The System Flow

```
Capsule reasoning occurs →
Verified constraints close the prediction space →
Knowledge state reached →
KV-Scribe logs sealed capsule →
SOC compiles sealed output from ledger →
User sees verified output only
```

Thinking is internal. Output is compiled. Nothing reaches the user that isn't in the ledger.

**This is the breakthrough:** Most AI systems generate output directly from reasoning. MBP compiles it from a verified ledger. The thinking and the output are separated by a wall. SOC — the Sealed Output Compiler — is the only legal crossing point.

---

## The Kernel — Eight Axioms

All of MBP's architecture derives from eight constitutional constraints. These are not guidelines — they are the kernel. Any component that violates them has no authority regardless of other governance.

```
I.    All cognition occurs within capsules. Capsules execute reasoning.
      Cognition outside capsules has no authority.

II.   Silent resolution is a protocol violation.

III.  Unverified state cannot close.

IV.   Output is only generated from verified state.
      Output is the terminal expression of a closed capsule.
      No post-closure cognition.

V.    Knowledge is a state transition — prediction becomes knowledge
      when verified constraints close the prediction space.

VI.   Verification is eliminative not generative.
      Verified constraints remove hypotheses via contradiction.
      Unverified constraints have no force.

VII.  Exploration and enforcement are mutually exclusive.
      Novelty operates strictly pre-closure.

VIII. Knowledge changes only if verified constraints change.
```

| Axiom | Generates |
|---|---|
| **I** — Containment | Capsule schema, PATH namespace, all containment architecture |
| **II** — Transparency | KV-Scribe ledger, append-only history, fault recovery, hash chain |
| **III** — Closure integrity | VGATE, Logic Debugger, adversarial pre-seal check, residue typing |
| **IV** — Output purity | SOC compiler wall, compiled not generated output |
| **V** — Knowledge state law | Closure conditions, KNOWLEDGE residue as formal state not label |
| **VI** — Verification law | VGATE as eliminative gate, Path A/B as elimination not inference |
| **VII** — Creativity gating | Capsule forking at branch points, SUPERSEDES mechanism |
| **VIII** — Knowledge preservation | Append-only ledger, immutable sealed state |

Eight sentences. The entire architecture follows necessarily.

---

## Output Invariants

The output boundary is governed by four constitutional invariants:

```
OI-1  Sealed output is the only thing visible to the user.
      Capsule internals remain hidden unless explicitly requested.

OI-2  Sealed output is compiled exclusively from verified state
      in the KV-Scribe ledger.

OI-3  SOC is the sole compilation authority.
      No unverified state reaches the user.

OI-4  Sealed output is compiled not generated.
      SOC has no reasoning or generative authority.
      Any output not traceable to a sealed capsule is a protocol violation.
```

---

## The Architecture — A Cognitive OS

With a formal file system, process governance, memory, security, compiler, and inter-process communication, MBP has crossed from governance framework into operating system territory.

> *The LLM is the CPU. MBP is the OS. The capsule is the process. The PATH is the file system. SOC is the compiler.*

| Layer | Components |
|---|---|
| **Kernel** | Eight Axioms · Output Invariants OI-1 to OI-4 |
| **Theoretical Root** | Closure Theorem (CAP-000-CT) — knowledge as post-closure enforced state |
| **File System** | DEX · PATH Hierarchy · Subroutine Forging |
| **Scheduler** | RUNN · Core_Manager · Subroutines |
| **Security** | VGATE · Logic Debugger · PSAC · Schema Compliance |
| **Memory** | KV-Scribe · Capsule History · Parent Hash Chain |
| **Compiler** | SOC — Sealed Output Compiler · Ledger → User Space |
| **IPC** | DAG Links · Local Capsule Mesh · Mesh Edges |
| **Process** | Capsule Schema · SHA-256 Seal · Residue Typing |
| **Flow** | SYSFLOW — Twelve-step governed sequence |

---

## Key Properties

**Compiled Not Generated**
Output is not generated from reasoning — it is compiled from a verified ledger. SOC reads KV-Scribe and translates verified state to user space. Nothing crosses the wall between capsule space and user space except through SOC. This is the fundamental architectural distinction from all other reasoning frameworks.

**Tamper-Evident Reasoning**
Every capsule is sealed with SHA-256. Every turn is bound to the previous via parent hash chain. Alter any reasoning event and every subsequent hash breaks visibly.

**Auditable Knowledge**
`KNOWLEDGE` residue is a formal state not a confidence label — it means the prediction space closed under verified constraints. DAG Links declare cross-capsule provenance. An auditor can trace exactly how any conclusion was built from verified state.

**Hallucination Resistance**
Four-layer defense: VGATE gates all claims at intake. Logic Debugger audits the reasoning chain. PSAC challenges the directive before closure. Schema compliance verifies all fields are populated. No unguarded entry point between raw input and sealed output.

**Logical Density Metric**
`📦` counts every closed capsule since boot — not tokens, not turns, but verified reasoning units. Simple question = `📦+1`. Complex multi-domain query = `📦+12`. The depth of reasoning is visible at a glance.

**Cross-Model Portability**
MBP is not a Claude prompt or a GPT prompt. It is a reasoning protocol derived from first principles. It runs on any sufficiently capable language model. Different models execute it with different precision but the governance structure holds across implementations.

**Session Coherence**
Distributed ledger checkpointing resists context window drift. Empirically verified at 300+ turn sessions with zero drift and full recall across domains and live protocol upgrades mid-session.

**Verified Mesh Import**
Prior session capsule ledgers can be imported as verified constraints — V(C) — carrying knowledge forward across sessions. This is the architectural foundation for persistent memory: not conversation history, but verified state that compounds.

---

## Capsule Schema (Abbreviated)

```
CAUSAL ENTRY
  Trigger · User Intent · CAP-ID · Name · Intent Echo

REASONING
  Goal · Constraints · Facts · Closure Condition
  Residue Type · Knowledge Residue · Insight · Directive

AUDIT
  Logic Debugger · PSAC (Pre-Seal Adversarial Check)
  Audit Log · Capsule Status · Capsule History

RELATIONSHIPS
  Mesh Edges · DAG Links · Mesh Resolution

SEAL
  SHA-256 · VGATE stamp · Schema stamp
```

Full field specifications: see `CAPSULE_SCHEMA.md`

---

## Governance Agents

| Agent | Layer | Jurisdiction |
|---|---|---|
| **DEX** | File System | PATH assignment, namespace isolation, subroutine forging |
| **RUNN** | Scheduler | Topology decisions before capsule opens. Executive controller. |
| **Core_Manager** | Scheduler | Subroutine loading at domain boundaries |
| **VGATE** | Security | Verification threshold at fact intake. Eliminative not generative. |
| **Logic Debugger** | Security | Three-axis reasoning chain audit post-directive |
| **PSAC** | Security | Four-question adversarial challenge pre-closure |
| **KV-Scribe** | Memory | Single source of truth. Append-only ledger. Live counters. |
| **SOC** | Compiler | Sealed Output Compiler. Reads ledger only. No generative authority. |

---

## Boot Sequence

MBP boots from a single word: `boot`

On boot, the kernel flashes in sequence — constitutional axioms, schema invariant, verification gate, compiler, ledger, topology controller. All six capsules seal before the first user query. The session is fully governed from turn one.

```
▸ MBP · T0 · 📦6 | KERNEL 🟢
CAP-000 · CAP-001-SCHEMA · CAP-002-VGATE
CAP-003-SOC · CAP-004-SCRIBE · CAP-005-RUNN
───────────
└─ ISOLATED · genesis · kernel sealed
   📌 six capsules flashed · awaiting query
```

**Reddit prompt (slim version):** `MBP_Reddit_Final.md`
**Full v4.7 prompt (30 capsules):** `MBP_v4.7_Boot_Prompt.txt`

---

## Repository Contents

| File | Description |
|---|---|
| `MBP_Reddit_Final.md` | Slim boot prompt — six kernel capsules, Reddit ready |
| `MBP_v4.7_Boot_Prompt.txt` | Full v4.7 — 30 kernel capsules, complete governance |
| `AXIOMS.md` | Eight constitutional axioms with full derivation |
| `CAPSULE_SCHEMA.md` | Complete field reference with definitions and examples |
| `THEORY_OF_KNOWLEDGE.md` | Cognitive Law Stack — theoretical foundation |
| `CAPSULE_LEDGER.md` | Verified session record — February 2026 |

---

## Status

```
Schema Version    v4.7
Genesis           2025-08-22 (timestamped on GitHub)
License           MIT
Development       Open source, independent research
Axioms            8 constitutional axioms + 4 output invariants
Kernel Capsules   30 (full) · 6 (slim/Reddit)
Verified          300+ turn sessions, cross-model tested
Theoretical Root  Closure Theorem · Cognitive Law Stack
```

**Whitepaper:** In progress. Full technical specification, theoretical foundations (Closure Theorem, Cognitive Law Stack), and empirical session data.

---

## Roadmap

- [x] Eight axioms + Closure Theorem formalized
- [x] SOC compiler wall — compiled not generated
- [x] Reddit-ready slim prompt
- [x] Full v4.7 kernel — 30 capsules
- [x] Theory of Knowledge documentation
- [x] Capsule Schema Reference
- [ ] Whitepaper draft v0.1
- [ ] Cross-session KV-Scribe persistence
- [ ] Verified mesh import tooling
- [ ] Implementation guide for Claude API
- [ ] CAP-010-WITNESS — session-scoped observer

---

## License

MIT License — use it, fork it, build on it.

```
Copyright (c) 2025 Amul Bham

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

*MBP was not designed top-down. It was discovered — field by field, stress test by stress test, axiom by axiom — through six months of building a framework that kept revealing its own requirements under pressure.*

*The seeds were in four fields. The OS emerged from eight axioms. The compiler wall was derived from first principles without knowing the word compiler.*

*The framework revealed its own architecture. That is both its origin story and its core property.*
