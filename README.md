# Franklin Paul Anand

The personal website of Franklin Paul Anand: writing, videos and lessons on
strategic leadership, organisational development and social impact.

Built with [Astro](https://astro.build) and published with GitHub Pages.

> **Not launched yet.** Search engines are asked not to index the site until
> launch (`ALLOW_INDEXING` in `src/lib/site.ts` stays `false`).

## Where things are

| Path                           | What it is                                           |
| ------------------------------ | ---------------------------------------------------- |
| `content/`                     | All website text: articles, videos, lessons, profile |
| `content/README.md`            | How to add and edit content                          |
| `docs/publishing-checklist.md` | Check this before publishing anything                |
| `src/`                         | The site's pages, components and styles              |
| `src/lib/paths.ts`             | `link()`: builds every internal link                 |
| `tests/`                       | Content checks run on every change                   |

## Working on the site

You need Node.js 22 and pnpm.

```bash
pnpm install
pnpm dev      # local preview at http://localhost:4321
pnpm check    # formatting, tests, type checks and a full build
```

## Publishing

- **Pull requests** run the checks in `.github/workflows/ci.yml`. Nothing is
  published from a pull request.
- **Changes merged into `main`** are published by
  `.github/workflows/deploy.yml`, once GitHub Pages is switched on
  (Settings → Pages → Source: GitHub Actions). The workflow builds the site
  for the address GitHub Pages provides and uses no secrets.
- The site can live in a sub-folder (`BASE_PATH`, e.g. `/franklin-paul-anand`)
  or at the root of its own domain (`BASE_PATH=/`). `SITE_URL` is the
  address's scheme and host.

## Contact form

The contact form (on the Contact page) sends messages directly from the visitor's browser to
[Formspree](https://formspree.io). Nothing is stored on this site or in this
repository. See the Privacy page for details.
