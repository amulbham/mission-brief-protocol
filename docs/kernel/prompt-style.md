# Kernel Prompt Presentation Standard

Status: `KERNEL 1.9 CANDIDATE`  
Profile format: `1.0`

This standard governs generated boot-prompt presentation. It does not redefine semantic modules or create kernel authority.

## Artifact structure

Every generated FULL, SLIM, and GUIDE artifact uses this order:

1. One current H1 naming the target kernel candidate.
2. One generated-artifact notice.
3. One `Boot Identity` section containing a fenced machine-readable block.
4. One horizontal boundary.
5. The registered semantic source fragments in profile order.

The identity block records:

```text
PROFILE_FORMAT
PROFILE
TARGET_KERNEL
BASELINE_KERNEL
PROFILE_REGISTRY_SHA256
ACTIVATION
AUTHORIZED_TERMINAL
STANDALONE_AUTHORITY          GUIDE only
GUIDE_EXPECTED_SHA256         SLIM only
```

## Heading rules

- Exactly one H1 is allowed per artifact.
- Semantic component sections use H2 and lower levels.
- Historical source H1 headings are not emitted beneath the current artifact H1.
- Source headings are not renamed or reordered by the presentation formatter.
- Generated identity always precedes semantic content.

## Whitespace rules

- LF newlines only.
- No trailing spaces or tabs.
- Blank lines separate headings, blocks, tables, and prose.
- Exactly one terminal newline.
- The formatter may remove presentation-only leading H1 text; it may not rewrite semantic prose.

## Traceability

The compiled profile manifest records two hashes for every source selection:

- `source_sha256` — exact selected semantic-source bytes before presentation formatting.
- `compiled_sha256` — the fragment after the registered presentation transform.

Artifact SHA-256 values bind the complete formatted output. For the two-stage path, the formatted GUIDE artifact digest is embedded in formatted SLIM.

## Editing rule

Never edit generated prompt files directly. Change the authoritative module, profile registry, or formatter; then rebuild and run the parity and conformance checks.

```sh
node kernel/scripts/build-boot-profiles.mjs
node kernel/scripts/build-boot-profiles.mjs --check
node kernel/tests/kernel-1.9-prompt-format-conformance.mjs
```

## Review boundary

A presentation-only change must preserve source coverage and runtime behavior. If a change modifies semantic prose, source order, component inclusion, activation behavior, or authority, it is not formatting and must follow the corresponding kernel-change process.
