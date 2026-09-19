# Change 002 — Witness Flag-Only Observer

## Status

APPROVED · FLASHED in Kernel 1.2 candidate · activation requires validation and merge

## Source

`WITNESS REDESIGN — Flag-Only Observer Model — Canonical Specification`  
CAP-103 · source schema v3.4 · Amul Bham · 2026

The source flash was effective at T[104] in its originating session. Kernel Track authority begins only when this change is validated and merged as Kernel 1.2.

## Problem

The original Witness was prohibited from analysis but required to produce observational prose. Producing prose required selection, framing, and interpretation, making jurisdiction bleed structurally possible.

## Exact delta

1. Flash CAP-103 under Axiom 4.7.
2. Replace `Witness Log` and `Witness Sign-off` with one `Witness Signal` after VERIFY Events and before Insight.
3. Advance capsule schema v3.3 → v3.4.
4. Restrict Witness output to one mutually exclusive signal: CLEAR, TENSION, DRIFT, or DISCONTINUITY.
5. Prohibit Witness prose, explanation, verification, routing, recommendations, and interaction with other gates.
6. Make VGATE the deterministic receiver and router.
7. Require every non-CLEAR signal to resolve and pass a second VGATE review.
8. Allow only DISCONTINUITY to activate FRP directly.
9. Replace Tool Call Protocol references to Witness Log with Witness Signal.

## Reconciliation

- The source routes DRIFT to `Goal / Intent Echo`. Kernel 1.1 has Goal, User Intent, and IC-Node but no separately named Intent Echo field. Kernel 1.2 routes to those concrete intent-bearing fields without inventing a new schema field.
- The source lists Logic Debugger before Witness in its gate sequence while also specifying that Witness observes during arc formation. Kernel 1.2 distinguishes production timing from consumption order: Witness records during formation; Logic Debugger audits after Directive; VGATE then consumes the stored signal.
- Change 001's user-supplied `T8N7 → U3O2` example is retained in its historical intent record. Current normative runtime documentation uses hexadecimal `A8F7 → C3D2`, consistent with SHA-256 projection semantics.

## Authority impact

Constitutional schema and component change. CAP-103 supersedes only the CAP-010-WITNESS prose-output model. VGATE intake jurisdiction, PSAC adversarial jurisdiction, and Logic Debugger audit jurisdiction remain intact.

## Version effect

Kernel `1.1` → `1.2`  
Capsule schema `v3.3` → `v3.4`
