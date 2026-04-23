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

## Design System

- Use the **Nothing design system** — OLED dark, dot-matrix aesthetic, typographically driven.
- Components live in `src/components/` — build and extend them from scratch as needed.
- Design tokens live in `src/app/globals.css` as `--nd-*` CSS custom properties.
- Fonts: **Doto** (display/hero), **Space Grotesk** (body/UI), **Space Mono** (labels/data). All loaded via Google Fonts in `layout.tsx`.
- Labels are always Space Mono, ALL CAPS, `--nd-text-secondary`. No shadows, no gradients, no border-radius > 16px on cards.

## Terminal

- The terminal overlay (`src/components/terminal/`) provides keyboard navigation across the site.
- When adding a new page/route, update `ROUTE_MAP` in `src/components/terminal/commands.ts` and add the destination to `COMPLETABLE_COMMANDS` in the same file.
- `ROUTE_MAP` format: `"<alias>": "<next-route>"` — include both the slug and the path (e.g. `"barcode"` and `"/barcode"`).
