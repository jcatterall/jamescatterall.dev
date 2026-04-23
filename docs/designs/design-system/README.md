# Nothing-Inspired Portfolio Design System

## Overview

A complete component design system for a **personal developer portfolio site**. The visual language is inspired by Nothing Technology — OLED-dark, dot-matrix driven, instrument-panel precise. Every decision is intentional: monochrome palette, mechanical typography, no decorative flourishes.

**Sources:** No external codebase or Figma was provided. This design system was built entirely from the design language specification supplied in the project brief.

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Terse, precise, technical.** No marketing fluff. No "unlock your potential" copy.
- Write like a commit message or a man page: declarative, lowercase where possible, no trailing periods on labels.
- Labels are always **ALL CAPS** in Space Mono — they are identifiers, not sentences.
- Body copy uses **sentence case**, Space Grotesk — clear and direct.
- First person is sparse. "I built X" → prefer "Built X" or "X — [year]".
- No emoji. No exclamation marks in UI chrome. Dry wit is acceptable in headlines.

### Casing Rules
| Context | Rule |
|---|---|
| Labels, nav links, tags, buttons | ALL CAPS, Space Mono |
| Body paragraphs | Sentence case, Space Grotesk |
| Project titles | Title Case, Space Grotesk |
| Data values (dates, numbers, IDs) | Mixed as needed, Space Mono |
| Error messages | Sentence case, --nd-accent |

### Examples of Good Copy
- `AVAILABLE FOR WORK` (status badge)
- `01 — SELECTED WORK` (section label)
- `Built in Rust. Compiles in 400ms.` (body)
- `LAST UPDATED 2024-11-03` (metadata)
- `NO RESULTS` (empty state headline)

---

## VISUAL FOUNDATIONS

### Color System
- **Background:** Pure OLED black `#000000` — page canvas only.
- **Surfaces:** `#111111` (cards, panels), `#1A1A1A` (raised/hover surfaces).
- **Borders:** `#222222` (subtle), `#333333` (visible/interactive).
- **Text:** `#FFFFFF` (display), `#E8E8E8` (primary), `#999999` (secondary/labels), `#666666` (disabled).
- **Accent:** `#D71921` — single red, used as interrupt/error/active only. Never decorative.
- **Semantic:** `#4A9E5C` (success), `#D4A843` (warning), `#5B9BF6` (interactive/link).
- **No gradients. No tints. No colour photography.**

### Typography
Three roles, strictly bounded:

| Role | Font | Size | Weight | Case | Tracking |
|---|---|---|---|---|---|
| Display / Hero | Doto (dot-matrix) | 36px+ | variable | Mixed | normal |
| Body / Headings | Space Grotesk | 13–24px | 300–600 | Sentence | normal |
| Labels / Data / Captions | Space Mono | 10–13px | 400 | ALL CAPS | 0.06–0.08em |

Never use more than three hierarchy layers on a single screen.

### Spacing
Base unit: **8px**
- `4px` — tight (icon + label gap)
- `8px` — belongs together (field label + input)
- `16px` — same group (card padding sections)
- `24px` — comfortable separation
- `32–48px` — section break
- `64–96px` — new context / hero padding

### Backgrounds & Surfaces
- No background images, no textures by default.
- **Dot-grid motif** (empty states, hero): `radial-gradient(circle, #333 1px, transparent 1px) / 16px 16px` on `#000`.
- Cards: `#111111` fill, `1px solid #333333` border, `12px` radius.
- No shadow. No blur. No backdrop-filter. Depth is expressed by border only.

### Animation & Interaction
- **150–200ms ease-out** for all transitions.
- Only `opacity` and `border-color` animate. Never `transform`, never `scale`, never spring physics.
- Hover: border brightens or text lightens. No glow, no fill flood.
- Focus: `2px solid #5B9BF6` outline, `2px` offset.
- Press: immediate — 0ms, opacity drop to 0.7.

### Borders & Radius
| Element | Radius |
|---|---|
| Buttons, pills, tags | `999px` |
| Cards, panels | `8–12px` |
| Inputs, technical elements | `4px` |
| Never exceed | `16px` on cards |

Borders: `1px solid` only. No `2px` borders except focus outlines and active underlines.

### Iconography → see ICONOGRAPHY section below

### Cards
- `background: #111111`, `border: 1px solid #333333`, `border-radius: 12px`.
- Hover: border → `#666666`. No shadow.
- Internal padding: `24px`.
- No drop shadows. No coloured left borders.

### Corner Radii Summary
- `999px` — pills
- `12px` — cards
- `8px` — tooltips, dropdowns
- `4px` — inputs, code blocks

---

## ICONOGRAPHY

**No custom icon font is defined.** The Nothing-inspired aesthetic intentionally minimises iconography — typographic labelling is preferred over icons.

Where icons are needed:
- Use **Lucide Icons** (CDN: `https://unpkg.com/lucide@latest`) — thin, 1.5px stroke, minimal fill. Matches the precision aesthetic.
- Stroke colour: `--nd-text-secondary` (`#999999`) by default; `--nd-text-primary` on hover.
- Size: 16px in UI chrome, 20px in cards/lists.
- Never use filled icons. Never use icons larger than 24px in navigation.
- No icon fonts. No emoji as icons. No Unicode substitutes.

Lucide icons recommended for portfolio context:
`github`, `external-link`, `terminal`, `code-2`, `layers`, `cpu`, `arrow-up-right`, `mail`, `rss`, `copy`

---

## TOKEN REFERENCE

All tokens defined in `colors_and_type.css`.

---

## FILE INDEX

```
README.md                          — This file
SKILL.md                           — Agent skill definition
colors_and_type.css               — All CSS custom properties (tokens)
fonts/                             — Font files (Doto, Space Grotesk, Space Mono via Google Fonts)
assets/                            — Logos, icons, visual assets
preview/
  colors-base.html                 — Base color swatches
  colors-semantic.html             — Semantic color tokens
  type-display.html                — Doto display specimens
  type-body.html                   — Space Grotesk specimens
  type-mono.html                   — Space Mono label specimens
  spacing-tokens.html              — Spacing scale
  spacing-radius.html              — Border radius tokens
  components-badge.html            — Badge component
  components-button.html           — Button variants
  components-card.html             — Card component
  components-input.html            — Input + Select
  components-tag.html              — Tag/Chip
  components-nav.html              — Navigation bar
  components-stat.html             — Stat row
  components-progress.html         — Progress bar
  components-empty.html            — Empty state
  components-skeleton.html         — Loading skeleton
ui_kits/
  portfolio/
    README.md                      — Portfolio UI kit overview
    index.html                     — Interactive portfolio prototype
    Header.jsx                     — Site header / nav
    Hero.jsx                       — Hero section
    ProjectCard.jsx                — Project card
    WorkSection.jsx                — Selected work grid
    StatBar.jsx                    — Availability / stats strip
```
