# atlasofmeanings.com

A static single-page atlas of what people say gives life meaning, built from a
1.28M-fragment corpus of unprompted comments across 17 languages and four public sources.

- `index.html` is the whole site. No build step, no dependencies, everything inline.
- Deploy: Cloudflare Pages, connected to this repo. Every push to `main` goes live.
- Source corpus and analysis live in a separate private repo. Nothing here contains
  credentials, raw scraped text, or anything beyond aggregate figures and short
  pseudonymized excerpts.
