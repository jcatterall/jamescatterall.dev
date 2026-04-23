# Portfolio UI Kit

A high-fidelity, interactive click-through prototype of the developer portfolio site.

## Design Width
1280px desktop. Responsive down to 375px mobile.

## Screens
1. **Hero / Home** — dot-grid background, Doto display name, availability badge, CTA strip
2. **Selected Work** — filterable project grid with segmented control
3. **Project Detail** — stat rows, progress bars, tags, full description
4. **About / Info** — stat strip, bio, skills
5. **Writing** — article list with metadata

## Components
- `Header.jsx` — sticky nav with logo, links, CTA
- `Hero.jsx` — hero section with Doto display, status badge, scroll cue
- `ProjectCard.jsx` — card with tags, hover state, external link
- `WorkSection.jsx` — filterable grid with segmented control
- `StatBar.jsx` — global availability + stats strip
- `Footer.jsx` — minimal footer with links

## Usage
Open `index.html` in a browser. Click through screens using the nav and cards.
All state is localStorage-persisted.
