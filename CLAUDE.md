# Notes for Claude

This is a **public** repository for the Franklin Paul Anand website (Astro,
published with GitHub Pages).

- **Public repository.** Never commit secrets, keys, tokens, personal contact
  details, drafts, unpublished work or private notes. Drafts stay outside
  this repository.
- **Approval first.** Never merge a pull request, deploy, change GitHub Pages
  settings, repository visibility or domains without the owner's explicit
  approval. Work on a branch and open a pull request for review.
- **Search indexing stays off.** `ALLOW_INDEXING` in `src/lib/site.ts` stays
  `false` until the owner approves launch (a test checks this).
- **Links.** Build every internal link with `link()` from `src/lib/paths.ts`
  (e.g. `link("/about/")`), never a bare `"/about/"`, so the site works under
  a base path such as `/franklin-paul-anand`.
- **Content** lives in `content/` (see `content/README.md`). Check
  `docs/publishing-checklist.md` before anything is published.
- Run `pnpm check` before proposing changes.
- Explain things to the owner in plain, non-technical language.
- **Opportunities.** Only list an opportunity after checking it on the
  organisation's official page; `link` is that page, never an aggregator.
  Never guess a fact: leave unstated fields empty. Exclude opportunities from
  the owner's current employer unless the owner approves an exception with an
  `employerDisclosure`. At most 10 new listings per session, shown to the
  owner for approval first; the owner's merge publishes them. Don't set up
  scheduled or automatic research.
