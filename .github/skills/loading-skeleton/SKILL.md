---
name: loading-skeleton
description: "Build and maintain loading skeleton screens for Next.js page routes. Use when: adding a new page, updating a page layout, writing a loading.tsx, auditing skeleton fidelity, fixing skeleton/loaded-page misalignment. Produces pixel-faithful Suspense fallbacks that match the real page layout in structure, spacing, and proportions using the Nothing design system."
---

# Loading Skeleton

Every page route must have a `loading.tsx` (Next.js Suspense fallback) whose skeleton is a structural mirror of the final loaded page. Skeletons must be updated in the same change as any layout edit.

## Rules

1. **No page wrapper inside the skeleton.** `loading.tsx` renders _inside_ the page's `<main>` — never add a `.page` / `--nd-space-*` wrapper. The only root element is the equivalent of the loaded component's outermost layout element.

2. **Match the layout exactly.** Copy the CSS grid/flex container from the real component's `.module.css` directly into `loading.module.css`. Same `display`, `gap`, `grid-template-columns`, `@media` breakpoints, `padding`, `align-items`.

3. **Render individual items — never a single block.** Each logical unit in the real UI gets its own skeleton element:
   - A row of chips → one `<div className={styles.skeletonChip}>` per chip, with approximate widths matching the real labels
   - A row of swatches → one `<div className={styles.skeletonSwatch}>` per swatch
   - A list of cards → one skeleton card per card
4. **Match heights from real CSS.** Extract `height` from the real component's CSS — don't guess:
   - Input fields → same `height` as `.input`
   - Buttons → same `min-height` as `.btn`
   - Labels → calculate from `font-size` × `line-height`

5. **Preview cards must match their real counterpart exactly:**
   - Same `background-color` (e.g. `white` for barcode cards, `var(--nd-surface)` for dark cards)
   - Same `border`, `border-radius`, `box-shadow`
   - SVG/image area: use `aspect-ratio` derived from the real viewBox (`width / height`)
   - Include all sub-rows (e.g. a digits row below a barcode SVG)

6. **Pulse animation on leaf elements only.** Apply `animation: pulse 1.8s ease-in-out infinite` to the actual skeleton shapes, not their containers. Stagger `animation-delay` by ~50ms per element for a wave effect.

7. **Use `var(--nd-surface-raised)` as the skeleton fill color.** This is the design system's canonical skeleton colour on dark backgrounds. For white-background cards, use `rgba(0,0,0,0.06)` so it's visible against white.

8. **Validate with Playwright.** After writing or updating a skeleton, screenshot both states and compare visually.

## Procedure

### Adding a skeleton for a new page

1. Read the page's `page.tsx` to understand the `<main>` wrapper structure (padding, gap).
2. Read `BarcodePageClient.tsx` (or equivalent) and the main component file to map the full component tree.
3. Read every relevant `.module.css` to extract exact dimensions, gaps, and border-radius values.
4. Write `loading.tsx` — structure mirrors the loaded JSX, replacing interactive elements with `<div>` skeleton shapes.
5. Write `loading.module.css` — copy layout rules verbatim, add skeleton shape rules.
6. Lock the loading state temporarily to test: in the page client component, replace `return <RealComponent />` with `return <LoadingComponent />`.
7. Start the dev server (`bun run app:dev` from the workspace root), open the page in Playwright, screenshot it.
8. Restore the real component, reload, screenshot again.
9. Compare both screenshots. Fix any misalignments.

### Updating an existing skeleton after a layout change

1. Identify which layout properties changed (gap, columns, padding, new fields, removed fields).
2. Apply the same changes to `loading.module.css` and the JSX in `loading.tsx`.
3. Validate with Playwright as above.

## File Conventions

```
src/app/<route>/
├── page.tsx           # Server component — renders <main> wrapper + <Suspense fallback={<Loading />}>
├── page.module.css    # Page-level layout only (max-width, padding, header styles)
├── loading.tsx        # Skeleton — no page wrapper, mirrors BarcodeGenerator's outermost div
└── loading.module.css # Skeleton styles — layout copied from component, plus skeleton shapes
```

## Nothing Design System Tokens (skeleton-relevant)

```
--nd-surface-raised  → skeleton fill on dark backgrounds
--nd-border-visible  → border on skeleton cards
--nd-border-width    → 1px border
--nd-border-width-thick → 2px border (thick card borders)
--nd-radius-sm   → 4px
--nd-radius-md   → 6px
--nd-radius-xl   → 12px
--nd-radius-pill → 999px
--nd-shadow-card → 0 8px 24px rgba(0,0,0,0.6)
--nd-space-xs  → 4px  | --nd-space-sm  → 8px  | --nd-space-md → 16px
--nd-space-lg  → 24px | --nd-space-xl  → 32px | --nd-space-2xl → 48px
```

## Existing Reference: Barcode Page

The barcode page skeleton is the canonical implementation to reference.

- [loading.tsx](../../../app/src/app/barcode/loading.tsx)
- [loading.module.css](../../../app/src/app/barcode/loading.module.css)
- Real component: [BarcodeGenerator.tsx](../../../app/src/components/barcode/BarcodeGenerator.tsx)
- Real component CSS: [BarcodeGenerator.module.css](../../../app/src/components/barcode/BarcodeGenerator.module.css)
