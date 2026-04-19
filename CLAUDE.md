# Coding Standards

## Style

- **Functional and declarative**: prefer pure functions, immutable data, and expressions over statements. Avoid classes and imperative mutation.
- **Clean and concise**: write the least code that correctly solves the problem. Delete anything that doesn't earn its place.
- **Simplicity over complexity**: the simplest solution that works is the right solution. Resist clever, over-engineered, or "flexible" approaches.
- **Comments only where absolutely necessary**: only add a comment when the *why* is non-obvious (hidden constraint, subtle invariant, third-party workaround). Never describe what the code does.
- **Validate at boundaries only**: trust internal code and framework guarantees. Only validate/sanitise at system edges (user input, external APIs).

## Workflow

- Unstage changed on `main` — no pull requests, no worktrees, no feature branches.

## CSS

- Use vanilla CSS — no Sass, SCSS, or CSS-in-JS.
- Use CSS Modules (`.module.css`) for component-scoped styles.
- Use CSS custom properties for design tokens.

## TypeScript

- Prefer `type` over `interface`; avoid `any` and `as` casts.
- Derive types from data rather than maintaining parallel type hierarchies.
- Use `const` by default; `let` only when reassignment is unavoidable.

## Components

- Use the **Neobrutalism** component library (https://www.neobrutalism.dev) — a shadcn/ui-based copy-paste library.
- Install components via the shadcn CLI when available, otherwise copy manually into `src/components/ui/`.
- The library uses CSS variables exclusively — paste the chosen theme from the `/styling` page into `globals.css`, replacing existing shadcn variable blocks.
