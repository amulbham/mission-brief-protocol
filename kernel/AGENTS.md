# Kernel Track Agent Guide

## Source precedence

1. Constitutional kernel modules and flashed invariant records
2. Capsule and relation schemas
3. Approved change records
4. Conformance and regression evidence
5. Compiled boot prompt
6. Explanatory documentation

Lower layers may explain or compile higher layers but may not silently redefine them.

## Required change order

1. State the intended change and affected authority boundary.
2. Add or update the numbered change record.
3. Update source modules and machine-readable registry records.
4. Add focused conformance tests.
5. Run all inherited regression tests.
6. Update the component index and affected documentation.
7. Compile the boot prompt deterministically.
8. Verify the compiled digest and release snapshot.
9. Update `VERSION` and `CHANGELOG.md` only after every gate passes.

## Invariants

- Never edit `boot/MBP_KERNEL_BOOT.md` directly; it is generated from modules.
- Never edit files under `boot/candidates/` directly; generate them with the applicable candidate build script.
- Prompt presentation may strip or normalize generated formatting only. Semantic prose, source order, and authority must remain traceable through source and compiled fragment digests.
- Never alter a file under `releases/`; create a new release version.
- Never treat documentation as constitutional authority.
- Treat `schema/capsule-fields-v3.11.json` as the field-level catalog for the active v3.11 schema. Preserve exact label order against `modules/20-capsule-schema.md`.
- Never edit `../docs/kernel/capsule-schema.md` directly; generate it with `node kernel/scripts/build-schema-guide.mjs`.
- Never weaken an inherited constraint without an explicit supersession record.
- Never reuse an untyped relationship for inference.
- Never claim a version is active before its validation suite passes.
- A SLIM boot may claim only `BOOTSTRAP_READY` until its bound GUIDE passes every CAP-142-BPC check and CAP-000 closes.
- Every generated profile must contain exactly one current H1 and one machine-readable Boot Identity block.

## Definition of done

A change is complete only when source, registry, tests, documentation, compiled output, version record, and Git history agree.
