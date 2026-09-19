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
- Never alter a file under `releases/`; create a new release version.
- Never treat documentation as constitutional authority.
- Never weaken an inherited constraint without an explicit supersession record.
- Never reuse an untyped relationship for inference.
- Never claim a version is active before its validation suite passes.

## Definition of done

A change is complete only when source, registry, tests, documentation, compiled output, version record, and Git history agree.
