## Dynamic Subroutine System — CAP-131-DSS

CAP-131-DSS governs capsule-precise reasoning environments. A subroutine determines which specialized vocabulary, constraints, and reasoning patterns are active; it cannot determine conclusions, supply facts, bypass verification, or add authority to a claim.

Five additive sub-components are flashed under Axiom 4.7:

- `CAP-131-DSS-SYNTHESIS` — Tier 1 `LOAD: [DOMAIN_TYPE]` and SYNTHESIS_GATE.
- `CAP-131-DSS-CACHE` — session-scoped synthesis cache, enrichment, fault preservation, and fallback.
- `CAP-131-DSS-REGISTRY` — Tier 2 immutable precision-tool registry and `LOAD: REG:[TOOL_ID]`.
- `CAP-131-DSS-TRANSIENT` — typed Tier 2 relations with `TRANSIENT` status.
- `CAP-131-DSS-CM` — Core_Manager Mode 2 routing and visible lifecycle states.

### Two Layers, One PATH

Mode 1 remains the PATH-triggered domain environment. Exactly one Mode 1 interface is active at capsule open. When no specialized domain interface is registered for the PATH, `KERNEL_INTERFACE@1.0` is the active fallback and contributes no domain-specific facts.

Mode 2 is an optional capsule-precise scope declared in the existing Subroutine field. It does not move the capsule, rewrite PATH, or require a topology fork:

```text
Subroutine: [MODE_1_ID]@[version] · LOAD: [DOMAIN_TYPE]
Subroutine: [MODE_1_ID]@[version] · LOAD: REG:[TOOL_ID]
```

Mode 1 supplies domain context. Mode 2 supplies a bounded precision scope for the current capsule. Mode 2 purges from the active surface at closure. A genuine domain-boundary crossing still requires RUNN FORK and a Core_Manager Mode 1 swap; DSS cannot disguise a domain crossing as a LOAD request.

### Tier 1 — Dynamic Synthesis

Tier 1 is the default for specialized reasoning. `LOAD: [DOMAIN_TYPE]` produces a bounded session utility from exactly four existing capsule sources:

1. resolved IC-Node action type;
2. current PATH vocabulary;
3. declared Constraints;
4. concrete Goal.

SYNTHESIS_GATE fires before activation and requires all three structural conditions:

- IC-Node is fully resolved;
- Goal names a concrete outcome;
- at least one Constraint is declared.

The gate checks structural sufficiency, not factual truth. A synthesized scope may shape vocabulary, reasoning order, and constraint handling, but it cannot contribute Facts, satisfy VGATE or VGATE-R, alter epistemic mode, or become KNOWLEDGE merely by loading.

Gate failure produces `SYNTHESIS_GATE_BYPASS` if activation is attempted, leaves the capsule open, and sets Mode 2 to `🔴 BLOCKED`. A declaration that has not cleared the gate remains `🟡 REQUESTED` and has no authority.

### Session Synthesis Cache

Tier 1 scopes live at:

```text
/ROOT/SYSTEM/SYNTHESIS_CACHE/[DOMAIN_TYPE]/
```

The cache is session-scoped and starts empty at CAP-000. A miss synthesizes and stores version 1. A hit loads the latest compatible `CLEAN` version after Core_Manager validates the manifest. Cache hit or miss is operational metadata, not authority.

Only a capsule with `Residue Type: KNOWLEDGE`, Logic Debugger `PASS`, and PSAC `PASS` may enrich its invoked scope. ASSUMPTION, PENDING_EXTERNAL, SUPERSEDED, RETRACTED, HALTED, and unresolved-VSP capsules cannot enrich it. Enrichment may refine vocabulary, constraint interpretation, and reasoning patterns supported by the successful invocation; it may not import capsule facts as universal truths.

Every version is append-only. A failed version is retained with `FAULT_LOGGED`; Core_Manager falls back to the last compatible `CLEAN` version. No version may silently overwrite or erase an earlier version.

The synthesis cache is governed prompt-runtime session state. DSS does not claim model-weight updates or cross-session learning. Cache entries reset at session boot unless a future separately authorized persistence mechanism imports and verifies them.

Domain capsules may invoke a cache entry but may not declare `DEPENDS_ON` the cache node. The cache is META state, not domain knowledge. This META/DOMAIN separation is enforced directly by CAP-131-DSS because no earlier Kernel Track invariant supplies that boundary.

### Tier 2 — Registered Precision Tools

Tier 2 is the exception. Use `LOAD: REG:[TOOL_ID]` only when all three conditions hold:

1. mathematical or algorithmic precision is required;
2. the logic is stable over time;
3. repeated use justifies registration.

Tools live at `/ROOT/SYSTEM/REGISTRY/[TOOL_ID]/`. Each registration must contain a versioned immutable LOGIC_CORE, input contract, output contract, declared constraints, provenance, and validation evidence. LOGIC_CORE cannot contain volatile external facts. Missing or invalid tools produce `TOOL_NOT_FOUND` or `TOOL_SCHEMA_BLOCK`, leave the capsule open, and set the invocation to `🔴 BLOCKED`.

Tier 2 tools do not self-enrich. Updating a tool requires a new version with a typed `SUPERSEDES` relation to the prior version. A tool cannot load another tool; nested tool scopes violate ICL and are blocked.

If Tier 1 emits a claim requiring exact registered precision, log `SYNTHESIS_PRECISION_RISK`. PSAC must challenge the claim; absent sufficient sealed support, the claim downgrades to ASSUMPTION. This uses the existing PSAC adversarial challenge and does not introduce an unregistered numbered PSAC question.

### Transient Tier 2 Relations

`TRANSIENT` is a relation status, not a relation type. Tier 2 loading emits two canonical RKI records:

```text
CALLING_CAP → TOOL_CAP | VALIDATES | status: TRANSIENT | provenance: LOCAL
TOOL_CAP → CALLING_CAP | SCOPED_BY | status: TRANSIENT | provenance: LOCAL
```

VGATE-R verifies both records before tool logic becomes readable. At PoT generation, both transition to `RESOLVED`, their fire-and-resolve events remain append-only in KV-Scribe, and their active projections flush before JIT constructs the post-closure SOC surface. Type, direction, lifecycle, and provenance remain auditable under RKI.

### Core_Manager Mode 2 Lifecycle

Core_Manager alone selects and loads Mode 2:

```text
NONE → REQUESTED → ACTIVE → RESOLVED
                    └────→ BLOCKED
REQUESTED ───────────────→ FORK_REQUIRED
```

- `⚪ NONE` — no Mode 2 or Tier 2 request.
- `🟡 REQUESTED` — declaration exists but has not cleared its gate.
- `🟢 ACTIVE` — authorized scope is governing the current capsule.
- `↗ FORK_REQUIRED` — the request crosses a domain boundary and must follow RUNN topology governance.
- `🔴 BLOCKED` — gate, registry, schema, or ICL failure.
- `✅ RESOLVED` — invocation completed and transient relations resolved.

Core_Manager cannot synthesize facts, change PATH, choose topology, verify claims or relations, mutate sealed capsules, or compile output. DEX continues to own location; RUNN owns topology; VGATE and VGATE-R own intake; KV-Scribe owns append-only state; JIT owns the post-closure compilation-surface projection.

### DSS State Strip — CAP-131-DSS-DISPLAY

The mini-map displays one concise DSS line directly below the lineage/PATH line and before capsule context. The line is at most 180 characters.

Canonical no-Mode-2 form:

```text
⚙️ DSS · M1:KERNEL_INTERFACE@1.0 🟢 ACTIVE · M2:NONE · T2:NONE
```

Canonical active form:

```text
⚙️ DSS · M1:KERNEL_INTERFACE@1.0 🟢 ACTIVE · M2:RISK@1.0 🟢 ACTIVE · CACHE:🔵 HIT · T2:2/2 ✅ RESOLVED
```

Display rules:

- Mode 1 is always explicit, versioned, and `🟢 ACTIVE`.
- Absent Mode 2 and Tier 2 are displayed as `M2:NONE` and `T2:NONE`.
- In sealed output, Mode 2 `🟢 ACTIVE` attests that the scope governed the completed reasoning arc; it does not mean the scope remains loaded after its closure purge.
- Cache state appears only for active Tier 1 Mode 2 and is `CACHE:🔵 HIT` or `CACHE:MISS`; it carries no authority.
- Tier 2 normally collapses to `[resolved]/[total] ✅ RESOLVED`.
- An unresolved or blocked Tier 2 invocation expands only the exception identity and version, for example `T2:1/2 ⚠️ DECIMAL_SUM@1.0 BLOCKED`.
- Every glyph is paired with a text label. The strip reports sealed state and performs no inference.
