# Change 011 — Deterministic Prompt Presentation

## Status

IMPLEMENTED AS CANDIDATE · Kernel 1.9 work package WP-4 · no semantic or runtime authority change

## Intent

Give every Kernel 1.9 boot artifact a clean, current, and machine-checkable presentation without rewriting the authoritative module text or changing active Kernel 1.8 output.

## Exact delta

1. Add a registered prompt-format version and presentation contract.
2. Compile exactly one current H1 into each FULL, SLIM, and GUIDE artifact.
3. Remove the historical `Kernel 1.0` source title from compiled Kernel 1.9 presentation while preserving its substantive preamble text.
4. Place profile identity and digest bindings in one fenced `Boot Identity` block.
5. Normalize candidate output to LF newlines, remove trailing whitespace, and require exactly one terminal newline.
6. Record both semantic-source and formatted-fragment digests in the candidate manifest.
7. Add prompt-format conformance checks for all three artifacts.

## Reconciliations

### Presentation versus authority

Formatting is a compiler responsibility. Source modules remain authoritative and unchanged; generated titles and whitespace carry no independent constitutional authority.

### Historical source title

`00-cognitive-physics.md` retains its original Kernel 1.0 heading as provenance. Kernel 1.9 generated artifacts suppress that H1 because their generated identity already declares the current target. The following substantive preamble remains present.

### Digest traceability

The candidate manifest records a digest of each selected source fragment before presentation formatting and a second digest after formatting. This makes the transformation visible rather than treating formatted output as identical to source bytes.

## Authority impact

None. No invariant, capsule field, closure rule, component jurisdiction, relation, or activation state changes.

## Version effect

Planned Kernel remains `1.9`.  
Capsule schema remains `v3.11`.  
Boot profile format becomes `1.0`.
