# Kernel Boot Profiles

Status: `KERNEL 1.9 CANDIDATE`  
Current active boot: Kernel `1.8` full profile  
Candidate source: `kernel/registry/boot-profiles-1.9.json`

Kernel 1.9 preserves the complete one-file boot, the digest-bound two-stage path, and a character-bounded direct profile for persistent Project Instructions.

## Choose a path

| Path | Files | Use when | Terminal sequence |
|---|---|---|---|
| Full | `MBP_KERNEL_BOOT.md` | The environment accepts one complete boot prompt | `KERNEL_READY` |
| Two-stage | `MBP_KERNEL_BOOT_SLIM.md`, then `MBP_KERNEL_BOOT_GUIDE.md` | A smaller initial prompt and supplemental follow-up are preferable | `BOOTSTRAP_READY` → `KERNEL_READY` |
| Project | `MBP_PROJECT_KERNEL.md` plus optional `MBP_PROJECT_REFERENCE_GUIDE.md` | Project Instructions persist across new chats and impose an 8,000-character ceiling | Direct `KERNEL_READY` |

The candidate artifacts live under `kernel/boot/candidates/1.9/`. They are not current release artifacts until Kernel 1.9 closes.

## Fresh-session workflow

Use a new chat with no earlier MBP state. Copy the complete artifact contents rather than a GitHub preview excerpt.

### ChatGPT Project workflow

1. Copy the complete generated `MBP_PROJECT_KERNEL.md` into Project Instructions.
2. Add `MBP_PROJECT_REFERENCE_GUIDE.md`, or its rendered PDF, to Project files as supplemental knowledge.
3. Open a new chat inside the Project.
4. Send `boot` to test activation. The expected response is exactly `KERNEL_READY · PROJECT · Kernel 1.9`.
5. Start another new Project chat and send a real task as the first message. The kernel must boot before processing it.

The Project reference is optional at boot. It elaborates flashed definitions but cannot introduce authority. If retrieval does not surface a required detail, the runtime defers that detail rather than inventing it. PROJECT never emits `BOOTSTRAP_READY` and never asks for a second boot message.

### One-message FULL workflow

1. Open a fresh session.
2. Paste or attach the complete generated FULL artifact as the first message. Do not add a task to the boot message.
3. Send it and wait for the one-line `KERNEL_READY` confirmation.
4. Send the first real task as the next message.

### Two-message SLIM + GUIDE workflow

1. Open a fresh session.
2. Paste or attach the complete generated SLIM artifact as the first message. Do not include GUIDE or a task in that message.
3. Wait for `BOOTSTRAP_READY · Kernel 1.9 · GUIDE [sha256]`.
4. Paste or attach the exact generated GUIDE artifact as the second message without edits, surrounding commentary, or a user task.
5. Wait for the one-line `KERNEL_READY` confirmation.
6. Send the first real task as the third message.

If the runtime returns a `BLOCKED` or `HALTED` state, do not continue with user work. Correct the artifact pair or start a new session as directed by the failure table.

## Full boot

1. Supply the generated FULL artifact as the boot prompt.
2. The runtime verifies its target version, registry digest, and complete source coverage.
3. CAP-000 seals the complete state and activates Flash-Sync.
4. The runtime returns `KERNEL_READY` in one line.

FULL is the portability and recovery distribution. It remains self-contained.

## Two-stage boot

### Stage A

1. Supply the generated SLIM artifact.
2. The runtime loads only the constitutional bootstrap and loader boundary.
3. It reads the expected GUIDE SHA-256 embedded in the generated header.
4. It returns one line:

```text
BOOTSTRAP_READY · Kernel 1.9 · GUIDE [sha256]
```

At this point no session Merkle root or full kernel authority exists.

### Stage B

1. Supply the generated GUIDE artifact without editing it.
2. The runtime checks presence, version, profile and registry identity, SHA-256, and source coverage.
3. Only after all checks pass does GUIDE enter active state.
4. CAP-000 seals the combined state, the session Merkle root is created, and Flash-Sync activates.
5. The runtime returns `KERNEL_READY` in one line.

Do not insert user work between Stage A and Stage B. The only valid next boot input after `BOOTSTRAP_READY` is the bound GUIDE or a restart.

## Failure behavior

| Result | Meaning | Recovery |
|---|---|---|
| `BLOCKED · MISSING_GUIDE` | No Stage B artifact was supplied | Supply the registered GUIDE |
| `BLOCKED · VERSION_MISMATCH` | SLIM and GUIDE target different kernels | Restart with a matched pair |
| `BLOCKED · PROFILE_MISMATCH` | Profile ID or registry digest differs | Rebuild or obtain artifacts from one registry |
| `BLOCKED · DIGEST_MISMATCH` | GUIDE bytes differ from the bound digest | Discard the guide and use the exact generated artifact |
| `BLOCKED · COVERAGE_MISMATCH` | Combined source set does not equal FULL | Rebuild all profiles |
| `HALTED · PREMATURE_ACTIVATION` | A guide rule activated before verification completed | Discard state and restart Stage A |

Never repair a mismatch by manually replacing the expected digest. Rebuild GUIDE first, then rebuild SLIM so the binding is deterministic.

## Project profile

PROJECT compiles from the registered compact module and must remain within 8,000 characters. The build fails if the prompt exceeds the ceiling or omits any required core component.

PROJECT performs direct CAP-000 closure because the complete compact enforcement surface is persistently installed as Project Instructions. The attached PROJECT_REFERENCE profile is `REFERENCE_ONLY`, carries `STANDALONE_AUTHORITY: false`, and is not part of the activation gate.

If the first user message is not `boot`, startup occurs before the task is processed. Missing supplemental material does not weaken the laws, verification gates, lineage rules, relation registry, closure contract, JIT boundary, DSS boundary, or SOC output wall contained in PROJECT itself.

## Build and verify candidates

```sh
node kernel/scripts/build-boot-profiles.mjs
node kernel/scripts/build-boot-profiles.mjs --check
node kernel/tests/kernel-1.9-boot-profiles-conformance.mjs
node kernel/tests/kernel-1.9-project-profile-conformance.mjs
```

The candidate manifest records artifact digests, byte counts, source membership, per-source digests, guide binding, and the complete coverage proof.

## Authority boundary

- Source modules and the profile registry govern.
- Compiled profile prompts and `profiles.json` are generated artifacts.
- PROJECT has direct authority only from its installed registered source; PROJECT_REFERENCE may elaborate but never activate.
- This document explains the process and has no activation authority.
- Existing files under `kernel/releases/` remain immutable.
