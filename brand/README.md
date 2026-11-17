# Iterators brand pack for GitHub

The organization README and the repositories link to these files by raw URL, so every repository shows the same
logo without carrying a copy of it.

## Colors

| Role | Value | Where |
|---|---|---|
| Navy | `#0d1553` | Wordmark on light backgrounds, code band on the social cards, version badges |
| Light ink | `#eef0f7` | Wordmark on GitHub's dark background |
| Orange | `#ff7700` | The accent: highlighted tokens on the social cards |
| Mark orange and amber | `#f36d21`, `#ffa400` | The four shapes of the mark, never recolored |

Orange is never used for text on white, because it reaches only 2.66:1 against it.

## Files

| File | Use |
|---|---|
| `logo.svg` | Mark and wordmark, for light backgrounds. |
| `logo-dark.svg` | The same, with a light wordmark for GitHub's dark mode. |
| `logo-white.svg` | The same, with a white wordmark for navy or photographic backgrounds. |
| `mark.svg` | The mark alone, for small spaces. |
| `fonts/` | Figtree and JetBrains Mono (SIL Open Font License 1.1), used to render the social cards. |
| `social/` | The social preview cards: `cards.json` (text and code per repository), `generate.mjs` (the renderer) and `png/` (the output). |

The logo geometry is copied unchanged from the Illustrator export of the Iterators logo.

## Light and dark logo in a README

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/theiterators/.github/main/brand/logo-dark.svg">
  <img alt="Iterators" src="https://raw.githubusercontent.com/theiterators/.github/main/brand/logo.svg" width="200">
</picture>
```

Keep `<picture>` at the top level of the Markdown. Wrapped in a link or a paragraph, GitHub moves the image out of
the `<picture>` element and the dark version never shows.

## Social preview cards

Each pinned repository gets a 1280×640 card: the repository name, one sentence on what it gives you, and a few lines
of its real code. The cards carry no versions or dates, so they never need redrawing after a release.

```bash
cd brand/social
npm install
npx playwright install chromium
node generate.mjs              # every card
node generate.mjs baklava      # one card
```

Upload each `png/<repo>.png` in that repository under Settings, General, Social preview.

To add a card, add an entry to `cards.json`. Copy the code from the repository's README or docs and only leave
lines out; `{{ }}` marks the one or two tokens that carry the point, drawn in orange.
