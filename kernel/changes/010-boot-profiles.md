# Change 010 — Governed Boot Profiles

## Status

IMPLEMENTED AS CANDIDATE · Kernel 1.9 work package WP-3 · activation requires final Kernel 1.9 validation and release merge

## Intent

Preserve the complete self-contained boot while adding a smaller, digest-bound two-stage path that cannot claim full readiness before its operational guide is verified.

## Exact delta

1. Define FULL, SLIM, and GUIDE profiles under CAP-142-BPC.
2. Keep the active Kernel 1.8 boot and all immutable releases unchanged during candidate work.
3. Compile Kernel 1.9 candidates from one registered source set.
4. Bind the exact GUIDE SHA-256 into SLIM after GUIDE compilation.
5. Restrict Stage A to `BOOTSTRAP_READY` and block `KERNEL_READY` until Stage B verification and CAP-000 closure.
6. Verify guide presence, kernel version, profile and registry identity, digest, and complete source coverage in a fixed order.
7. Prove `COVERAGE(SLIM ∪ GUIDE) = COVERAGE(FULL)` over registered module-section atoms.
8. Add deterministic candidate build, parity check, and activation-state conformance cases.

## Reconciliations

### Axiom 4.7

CAP-142-BPC is recorded in the Kernel 1.9 candidate invariant registry. It has bootstrap jurisdiction inside SLIM but no current Kernel Track authority until the validated Kernel 1.9 release activates it.

### Output before CAP-000

Stage A uses the governed T[0] pre-ledger exception already defined for boot confirmation. `BOOTSTRAP_READY` carries no ledger authority. Full output authority begins only after CAP-000 seals and Flash-Sync activates.

### Guide authority

GUIDE is normative compiled input, not explanatory documentation. It has no standalone activation authority and cannot enter active state before the bound digest and coverage checks pass.

### Source ordering

The compiled manifest preserves the canonical FULL atom order. SLIM and GUIDE may distribute those atoms across two files; the manifest proves identity and coverage even though the combined bytes are not identical to FULL.

## Authority impact

Constitutional boot-distribution addition upon Kernel 1.9 activation. No capsule field, relation type, relation status, verification threshold, or runtime component jurisdiction changes.

## Version effect

Planned Kernel `1.8` → `1.9`.  
Capsule schema remains `v3.11`.
