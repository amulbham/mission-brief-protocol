# Kernel Track Architecture

The repository separates five concerns:

| Surface | Role | Authority |
|---|---|---|
| `kernel/modules/` | Maintainable constitutional and operational source | Normative |
| `kernel/registry/` | Machine-readable invariant and dependency state | Normative after validation |
| `kernel/tests/` | Executable verification evidence | Validation only |
| `kernel/boot/` | Deterministically compiled prompt | Generated |
| `docs/kernel/` | Human-readable explanation | Non-normative |

Historical root, `prompt/`, and `runtime/` files remain intact as provenance. The Kernel Track may cite them but cannot silently inherit authority from them.
