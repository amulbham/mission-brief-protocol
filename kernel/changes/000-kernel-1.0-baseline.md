# Change 000 — Kernel 1.0 Baseline

## Status

APPROVED FOR BASELINE · activation requires validation and merge

## Intent

Establish the original two-part MBP boot prompt supplied in-session as the first clean Kernel Track release.

## Authority boundary

This record creates no new behavior. It converts the supplied prompt into maintainable constitutional modules, a machine-readable invariant registry, deterministic compiled output, conformance tests, and an immutable release snapshot.

## Source reconciliation

- The original prompt arrived in two consecutive messages.
- The second message repeated the final RUNN topology cases before completing DEX. That duplicate transition text is retained once.
- Formatting, headings, punctuation, and tables are normalized for maintainability without changing the operative rules.
- The supplied 35-page PDF is a later composite, not the baseline source. Its SHA-256 is recorded in `registry/source-manifest-1.0.json` as reference evidence only.

## Explicit exclusions

The following post-baseline changes are not active in Kernel 1.0:

- explicit parent-hash → current-hash mini-map projection
- Witness flag-only redesign
- TAG, TARS, TAG-VGATE, and thematic indexes
- VSP and VSP_Status
- SCF
- RKI and VGATE-R
- JIT edge-retention extension
- DSS and DSS mini-map state strip

## Acceptance criteria

1. All baseline modules appear in the manifest in canonical order.
2. The compiled boot is a deterministic concatenation of those modules.
3. Current boot and immutable `releases/1.0` snapshot are byte-identical.
4. Registry version and source manifest identify Kernel 1.0.
5. Required baseline systems are present and post-baseline systems are absent.
6. Documentation paths resolve and the component index distinguishes ACTIVE from PLANNED.
7. Full validation passes before `VERSION` and `CHANGELOG` represent 1.0 as active.

## Version effect

`0.0.0-foundation` → `1.0`
