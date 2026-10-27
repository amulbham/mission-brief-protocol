# Mission Brief Protocol (MBP)

Mission Brief Protocol is my ongoing research project about reasoning, constraints, memory, and verification in AI systems. It began with prompt-based experiments and has grown into a broader framework, alongside a versioned kernel with build tools and tests.

The central question is whether giving reasoning more explicit structure can make a system's decisions easier to examine and its working state easier to preserve. The architecture proposes mechanisms for doing that; the repository's implementations and test records are where particular behaviors can be checked.

## Where to start

- [Kernel track](kernel/README.md) — the newer, modular implementation and its current status.
- [Build and validation scripts](kernel/scripts/) and [tests](kernel/tests/) — executable checks and regression records.
- [Current kernel boot file](kernel/boot/MBP_KERNEL_BOOT.md) — generated boot artifact; check the kernel README before using it.
- [Architecture and knowledge theory](MBP_Theory_Of_Knowledge.md) — the theoretical side of the work.
- [Schema reference](SCHEMA.md) — the root schema document.
- [Early prompt-based version](prompt/MBP_Reddit_Final.md) — part of the project's historical development.

**Versioning note:** The root README still describes earlier v4.7-era architecture; `kernel/` is a separate, later reconstruction track. Do not infer that their version numbers describe one continuous released software product. Check the appropriate subdirectory for the current status of each track.

---


## The Problem

Existing safety and alignment methods address important parts of model behavior. MBP investigates another part of the problem: whether a reasoning workflow can make its constraints, corrections, and verification steps visible as structured state.

A fluent answer is not necessarily a verified answer. The project began by asking how a system could distinguish those cases, preserve what was checked, and expose changes rather than silently rewriting its own record.

MBP begins with a different question: **what if the reasoning process itself had a structure that could be inspected and checked?**

---

## The Insight

Cognition behaves like a force. Ungoverned, it bleeds across domains, contaminates conclusions, loops without resolution, and dissipates into confident noise.

You don't govern a force by filtering its exhaust. You build a container and put the force inside it first.

> *MBP proposes a capsule as the unit of governed work: a structured record with a declared scope, constraints, verification events, and an output boundary. Work outside that record has no authority within the proposed protocol.*

---

## The Core Law

```
Cognition outside capsules has no authority.
```

The verification gates, ledger, and output compiler are designed around that constraint.

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

In the proposed flow, internal reasoning and presented output are separated, with the ledger acting as the intended boundary.

**The proposed distinction:** MBP separates the reasoning process from the output it is permitted to present. Its Sealed Output Compiler (SOC) is designed to read from a verified ledger rather than simply reproduce the latest reasoning text. Whether a particular implementation enforces that boundary must be tested.

---

## The Kernel — Eight Axioms

The root architecture is organized around eight constitutional constraints. In the proposed system, components that violate these rules are not authorized to close or publish state. Implementations must enforce that behavior separately.

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

These eight constraints organize the architecture described below.

---

## Output Invariants

The proposed output boundary is described by four constitutional invariants:

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

MBP uses an operating-system analogy to organize the proposed components: process governance, memory, validation, output compilation, and relationships between capsules.

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

## Proposed mechanisms and research questions

**Compiled Not Generated**
In the architecture, output is meant to be assembled from a ledger of verified state rather than drawn directly from an unconstrained reasoning trace. SOC is the proposed boundary. The strength of that boundary depends on the implementation and its tests.

**Tamper-Evident Reasoning**
The design includes SHA-256 seals and parent-hash links to make stored capsule histories tamper-evident. That property applies where the ledger and hash chain are actually implemented and validated.

**Auditable Knowledge**
The framework treats `KNOWLEDGE` as a proposed closure state rather than a confidence label. Capsule links are intended to preserve the provenance of a conclusion; the amount of reconstruction possible depends on what the actual record contains.

**Proposed verification controls**
The design includes fact-intake checks, a logic audit, a pre-closure challenge, and schema validation. These are intended to catch unsupported conclusions and inconsistent records. Their effect on hallucination rates needs direct evaluation.

**Logical Density Metric**
`📦` counts every closed capsule since boot — not tokens, not turns, but verified reasoning units. Simple question = `📦+1`. Complex multi-domain query = `📦+12`. The depth of reasoning is visible at a glance.

**Cross-model design goal**
MBP is not tied conceptually to one model family. Portability is a goal of the protocol; consistency across providers and implementations is an empirical question.

**Long-session continuity**
The project explores whether structured checkpoints and a ledger can reduce context drift across long interactions. Historical long-session experiments are part of the research, but comparable benchmark evidence for zero drift or complete recall is not established by this README.

**Cross-session state import (proposed)**
The architecture calls for importing verified state from prior sessions instead of reconstructing everything from conversation history. Full mesh-import tooling remains on the roadmap.

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

Root-level field descriptions: see [SCHEMA.md](SCHEMA.md); the separate kernel schemas live under [kernel/schema/](kernel/schema/).

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

The historical prompt design uses `boot` as an entry point.

Its intended boot sequence introduces the constitutional axioms, schema, verification gate, compiler, ledger, and topology controller before handling a user query. The example below illustrates that design; it is not an independent execution trace.

```
▸ MBP · T0 · 📦6 | KERNEL 🟢
CAP-000 · CAP-001-SCHEMA · CAP-002-VGATE
CAP-003-SOC · CAP-004-SCRIBE · CAP-005-RUNN
───────────
└─ ISOLATED · genesis · kernel sealed
   📌 six capsules flashed · awaiting query
```

**Historical slim prompt:** [prompt/MBP_Reddit_Final.md](prompt/MBP_Reddit_Final.md)
**Modular kernel track:** [kernel/README.md](kernel/README.md) (see its versioned releases and build notes).

---

## Repository Guide

| Path | What it contains |
|---|---|
| [`kernel/README.md`](kernel/README.md) | Kernel track, current version, and maintenance instructions |
| [`kernel/modules/`](kernel/modules/) | Maintainable kernel source sections |
| [`kernel/scripts/`](kernel/scripts/) | Build and validation tooling |
| [`kernel/tests/`](kernel/tests/) | Conformance checks and regression tests |
| [`kernel/releases/`](kernel/releases/) | Versioned kernel snapshots |
| [`runtime/README.md`](runtime/README.md) | Experimental runtime integration notes |
| [`AXIOMS.md`](AXIOMS.md) | Root-level constitutional axioms |
| [`SCHEMA.md`](SCHEMA.md) | Root-level schema reference |
| [`MBP_Theory_Of_Knowledge.md`](MBP_Theory_Of_Knowledge.md) | Theoretical account of knowledge and closure |
| [`prompt/`](prompt/) | Historical prompt-oriented artifacts |
| [`docs/genesis/`](docs/genesis/) | Early project history |

The conceptual documents explain what MBP proposes. Tests and runtime artifacts should be read for narrower, inspectable claims about what a particular version currently does.

---


## Status

MBP remains an active research project. The root documentation preserves an earlier prompt-era architecture, including v4.7 material. The separate [`kernel/` track](kernel/README.md) provides modular source files, deterministic build scripts, versioned snapshots, and focused conformance/regression checks; its own README is the place to confirm the latest candidate or released version.

The research includes historical session experiments and ongoing runtime work. Their scope and results should be assessed from specific test records, not inferred from the framework's intended properties. Cross-model portability, long-session consistency, and reductions in hallucination are research questions rather than universal guarantees.

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
