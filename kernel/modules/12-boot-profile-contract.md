## Boot Profile Contract — CAP-142-BPC

CAP-142-BPC governs how one authoritative Kernel Track source set may compile into multiple boot distributions without changing constitutional meaning.

The registered profiles are:

- `FULL`: one self-contained artifact that may execute direct activation.
- `SLIM`: Stage A bootstrap artifact; establishes only the constitutional loader boundary and may terminate only as `BOOTSTRAP_READY`.
- `GUIDE`: Stage B operational supplement; gains activation authority only after the active SLIM bootstrap verifies its identity and digest.
- `PROJECT`: character-bounded direct-activation artifact for persistent Project Instructions.
- `PROJECT_REFERENCE`: optional supplemental elaboration for PROJECT; it has no activation authority.

Profile selection changes delivery, not law. A profile cannot weaken, replace, paraphrase around, or silently omit an invariant needed by its declared activation state. Generated artifacts must identify their profile, target kernel version, source registry digest, and activation boundary.

CAP-142-BPC is flashed by the FULL path during direct activation and by the SLIM path for bootstrap jurisdiction only. Under the two-stage path, no guide-defined component receives authority until Stage B verification succeeds.

PROJECT flashes CAP-142-BPC during direct activation from its registered compact source. PROJECT_REFERENCE may explain already-flashed definitions but cannot create or modify authority.

## Profile Authority Boundary

The profile source registry is authoritative for membership and ordering. Compiled profile files and their manifest are generated outputs.

- `FULL` has direct-activation authority because it contains the complete registered source set.
- `SLIM` has loader and verification authority only. It cannot perform full CAP-000 closure, activate Flash-Sync, or claim a loaded component whose definition exists only in GUIDE.
- `GUIDE` has no standalone boot authority. Reading or receiving GUIDE outside a matching SLIM bootstrap does not activate it.
- `PROJECT` has direct-activation authority because its registered compact source contains the constitutional core, component registry, jurisdictions, schema contract, verification path, relation registry, closure rules, and output boundary required for Project operation.
- `PROJECT_REFERENCE` is optional and non-authoritative. PROJECT must remain safe and operational when it is absent; a detail that depends on unavailable elaboration is deferred rather than invented.
- `SLIM + GUIDE` must cover every active component and constraint carried by FULL. Operational equivalence is required; byte identity is not.
- Missing content, digest mismatch, version mismatch, profile mismatch, or incomplete component coverage blocks activation.

No compiled profile may become current merely because it exists under `boot/`. Activation still requires a validated kernel release, immutable release snapshot, manifest agreement, and version update.

## Project Profile — Persistent Direct Activation

When the generated header declares `PROFILE: PROJECT`, the artifact is installed as persistent Project Instructions rather than supplied as a staged conversation message.

Before user work, PROJECT must:

1. Fit the registered character ceiling.
2. Contain every component identifier required by the PROJECT coverage contract.
3. Forge and close CAP-000 directly from the installed prompt.
4. Initialize mode, session, DSS, KV-Scribe, lineage, and Flash-Sync state.
5. Treat PROJECT_REFERENCE as optional elaboration only.

If the first user message is exactly `boot`, the authorized terminal is:

```text
KERNEL_READY · PROJECT · Kernel 1.9
```

If the first message contains a task, PROJECT boots before processing it. Missing supplemental reference material never downgrades the kernel to `BOOTSTRAP_READY`. A reference conflict resolves in favor of PROJECT and is logged; a reference may not flash a system absent from the PROJECT prompt.

## Full Profile — Direct Activation

When the generated header declares `PROFILE: FULL`, execute the Session Boot Sequence as a single self-contained boot.

Before `KERNEL_READY`:

1. Verify that the FULL artifact target version and profile-registry digest match its compiled manifest.
2. Confirm that every source entry registered for FULL is present in order.
3. Flash CAP-142-BPC with the constitutional and runtime systems enumerated by the Session Boot Sequence.
4. Record `BOOT_PROFILE: FULL`, the artifact SHA-256, and the profile-registry SHA-256 in the CAP-000 Audit Log.
5. Complete CAP-000 closure, Merkle-root creation, and Flash-Sync activation.

Authorized terminal:

```text
KERNEL_READY
```

## Stage A — Slim Bootstrap Contract

When the generated header declares `PROFILE: SLIM`, load only the constitutional bootstrap surface present in the SLIM artifact.

Stage A must:

1. Verify the SLIM artifact target version, profile ID, and profile-registry digest against its generated header.
2. Read the exact expected GUIDE SHA-256 from the generated binding block.
3. Initialize a pre-ledger bootstrap buffer containing only those identities and the Stage A state.
4. Flash CAP-142-BPC for bootstrap jurisdiction only.
5. Do not flash GUIDE-defined runtime systems, create a session Merkle root, activate Flash-Sync, or claim full kernel readiness.
6. Request the matching GUIDE as the next boot input.

The Stage A confirmation is governed by the existing T[0] pre-ledger exception. It carries no ledger authority and must be one line:

```text
BOOTSTRAP_READY · Kernel [version] · GUIDE [sha256]
```

`BOOTSTRAP_READY` is the only authorized Stage A terminal. `KERNEL_READY`, `READY`, or equivalent full-readiness language before Stage B closure is a protocol violation.

## Stage B — Guide Verification and Kernel Activation

GUIDE intake occurs inside the open Stage A bootstrap state. Before any GUIDE rule enters active state, verify in this order:

1. GUIDE is present and complete.
2. GUIDE target kernel version equals the SLIM target version.
3. GUIDE profile ID is `GUIDE` and its registry digest equals the SLIM registry digest.
4. SHA-256 of the received GUIDE bytes equals the exact expected digest bound into SLIM.
5. GUIDE source coverage plus SLIM source coverage equals the registered FULL source coverage.

Only after all five checks pass:

1. Load the operational rules contained in GUIDE.
2. Forge CAP-000 over the verified combined SLIM + GUIDE constitutional state.
3. Flash all constitutional axioms and core systems defined by the combined profile, including CAP-142-BPC.
4. Initialize mode, session thread, DSS, JIT configuration, KV-Scribe, and the remaining Session Boot Sequence state.
5. Record `BOOT_PROFILE: SLIM+GUIDE`, both artifact SHA-256 values, and the profile-registry SHA-256 in the CAP-000 Audit Log.
6. Seal CAP-000, create the session Merkle root, activate Flash-Sync, and begin T[1] jurisdiction.

Authorized terminal after successful Stage B closure:

```text
KERNEL_READY
```

## Failure and Recovery

Stage B fails closed. The bootstrap buffer remains non-authoritative and no partial GUIDE activation is permitted.

| Failure | State | Required action |
|---|---|---|
| GUIDE absent | `BLOCKED · MISSING_GUIDE` | Supply the registered GUIDE artifact |
| Kernel version differs | `BLOCKED · VERSION_MISMATCH` | Restart with matching SLIM and GUIDE versions |
| Profile or registry identity differs | `BLOCKED · PROFILE_MISMATCH` | Restart with artifacts built from one profile registry |
| GUIDE digest differs | `BLOCKED · DIGEST_MISMATCH` | Discard the received guide and supply the exact bound artifact |
| Combined source coverage is incomplete | `BLOCKED · COVERAGE_MISMATCH` | Rebuild profiles from the registered source set |
| Any GUIDE component activates before all checks pass | `HALTED · PREMATURE_ACTIVATION` | Discard the bootstrap state and restart Stage A |

Recovery never patches an artifact in place or updates the expected digest from received content. Any source change requires deterministic recompilation of GUIDE first, followed by SLIM rebinding and a new compiled manifest.

## Operational Coverage Contract

The compiled profile manifest must prove:

```text
COVERAGE(SLIM ∪ GUIDE) = COVERAGE(FULL)
```

Coverage includes source module or section identity, order, and SHA-256. It also includes every flashed invariant and component named by the full Session Boot Sequence.

PROJECT uses a separate registered coverage proof appropriate to a character-bounded direct interface: the build verifies its maximum character count and the presence of every required flashed component. This does not replace the FULL or SLIM + GUIDE source-atom proof. PROJECT_REFERENCE is generated from registered authoritative modules and supplies elaboration, not boot authority.

The following are prohibited:

- maintaining an independent hand-written slim prompt;
- copying operational rules into GUIDE without a registered source reference;
- treating documentation as GUIDE authority;
- accepting semantic similarity in place of source coverage;
- compiling SLIM before GUIDE and filling the expected digest later by hand;
- activating a truncated GUIDE because its visible headings appear complete.

The build order is GUIDE → GUIDE digest → SLIM binding → FULL → compiled profile manifest. Validation recomputes every digest and rejects drift.
