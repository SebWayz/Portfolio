# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Vite)
npm run build    # production build
npm run serve    # preview production build
```

No linter or test suite is configured.

## Architecture

Single-page portfolio. Three files do all the work:

- **`index.html`** — static markup. Bilingual text nodes carry `data-i18n` (plain text) or `data-i18n-html` (HTML) attributes; JS swaps them at runtime. The skills grid (`#skills`) is empty — JS populates it.
- **`main.js`** — one file, no framework. Sections in order:
  1. Skills grid — renders `<div class="skill-card">` elements from a static array using devicon classes.
  2. Three.js scene — space background (`space.jpg`), rotating torus, star field, a logo cube and moon objects. Camera moves on scroll via `document.body.onscroll`.
  3. i18n — `translations` object holds `fr`/`en` dictionaries. `applyTranslations(lang)` walks `[data-i18n]` and `[data-i18n-html]` nodes. Default is `fr`; preference persisted in `localStorage`.
  4. Page-load animations — `splitTextForAnimation()` wraps each character of `h1` and `p.animated-text` in a `<span class="letter">` with CSS custom properties `--i` (char index) and `--start` (base delay ms). Navbar `li` elements get `--i` set so CSS `calc()` staggers their entrance automatically.
- **`style.css`** — layout uses CSS Grid (12-column). Animation delays for staggered elements are driven by `--i` and `--start` custom properties via `calc()`, avoiding per-nth-child repetition. `@media (prefers-reduced-motion)` disables all entrance animations.

## Key conventions

- **Adding a nav item**: add the `<li>` to `index.html` and add both `fr`/`en` keys to the `translations` object in `main.js`. The staggered animation delay is computed automatically from the element's DOM index.
- **Adding a translation key**: add the key under both `fr` and `en` in `translations`, then add the `data-i18n` or `data-i18n-html` attribute to the HTML element.
- **Adding a skill**: append an entry to the `skills` array in `main.js` — `{ slug, label, variant }` maps to a devicon class `devicon-{slug}-{variant}`.
- Static assets (images, PDFs) live in `public/` and are served at the root path.
