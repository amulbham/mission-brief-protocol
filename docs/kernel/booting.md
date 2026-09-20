# Kernel Boot Profiles

Status: `KERNEL 1.9 CANDIDATE`  
Current active boot: Kernel `1.8` full profile  
Candidate source: `kernel/registry/boot-profiles-1.9.json`

Kernel 1.9 preserves the complete one-file boot and adds a smaller two-stage delivery path. Both paths compile from the same authoritative modules.

## Choose a path

| Path | Files | Use when | Terminal sequence |
|---|---|---|---|
| Full | `MBP_KERNEL_BOOT.md` | The environment accepts one complete boot prompt | `KERNEL_READY` |
| Two-stage | `MBP_KERNEL_BOOT_SLIM.md`, then `MBP_KERNEL_BOOT_GUIDE.md` | A smaller initial prompt and supplemental follow-up are preferable | `BOOTSTRAP_READY` → `KERNEL_READY` |

The candidate artifacts live under `kernel/boot/candidates/1.9/`. They are not current release artifacts until Kernel 1.9 closes.

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

## Build and verify candidates

```sh
node kernel/scripts/build-boot-profiles.mjs
node kernel/scripts/build-boot-profiles.mjs --check
node kernel/tests/kernel-1.9-boot-profiles-conformance.mjs
```

The candidate manifest records artifact digests, byte counts, source membership, per-source digests, guide binding, and the complete coverage proof.

## Authority boundary

- Source modules and the profile registry govern.
- Compiled profile prompts and `profiles.json` are generated artifacts.
- This document explains the process and has no activation authority.
- Existing files under `kernel/releases/` remain immutable.
