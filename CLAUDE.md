# Coding Standards

## Style

- **Functional and declarative**: prefer pure functions, immutable data, and expressions over statements. Avoid classes and imperative mutation.
- **Clean and concise**: write the least code that correctly solves the problem. Delete anything that doesn't earn its place.
- **Simplicity over complexity**: the simplest solution that works is the right solution. Resist clever, over-engineered, or "flexible" approaches.
- **Comments only where absolutely necessary**: only add a comment when the *why* is non-obvious (hidden constraint, subtle invariant, third-party workaround). Never describe what the code does.
- **Validate at boundaries only**: trust internal code and framework guarantees. Only validate/sanitise at system edges (user input, external APIs).

## Workflow

- Commit directly to `main` — no pull requests, no worktrees, no feature branches.

## TypeScript

- Prefer `type` over `interface`; avoid `any` and `as` casts.
- Derive types from data rather than maintaining parallel type hierarchies.
- Use `const` by default; `let` only when reassignment is unavoidable.
