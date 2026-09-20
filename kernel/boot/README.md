# Boot Output

This directory contains generated current and candidate boot outputs.

`MBP_KERNEL_BOOT.md` must be produced by the build process from `../modules/`. It must not be edited directly.

## Current release

- `MBP_KERNEL_BOOT.md` — active Kernel 1.8 full boot

## Kernel 1.9 candidate

`candidates/1.9/` contains generated preview artifacts for the governed profile system:

- `MBP_KERNEL_BOOT.md` — complete FULL candidate
- `MBP_KERNEL_BOOT_SLIM.md` — Stage A bootstrap candidate
- `MBP_KERNEL_BOOT_GUIDE.md` — Stage B operational supplement
- `profiles.json` — artifact hashes, source membership, guide binding, and coverage proof

Generate and check them with:

```sh
node kernel/scripts/build-boot-profiles.mjs
node kernel/scripts/build-boot-profiles.mjs --check
```

Candidate presence does not activate Kernel 1.9. Promotion to current boot and immutable release output occurs only after the complete Kernel 1.9 validation and release gate passes.

Candidate presentation follows profile format `1.0`: one current H1, one fenced Boot Identity block, LF newlines, no trailing whitespace, and one terminal newline. See `../../docs/kernel/prompt-style.md`.
