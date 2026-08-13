# No Bull Home Services

This repository is the recoverable public source of truth for the website at
[nobullhome.com](https://nobullhome.com). It contains a static frontend copy
copy of every route published in the site's sitemap on August 13, 2026, plus the
additional public styling, images, metadata, structured data, links, and client-side
FAQ behavior needed to reproduce the visible website.

## Run locally

Node.js 18 or newer is the only requirement.

```bash
npm start
```

The local mirror starts at `http://127.0.0.1:4173`. To validate every route,
asset, and internal link:

```bash
npm test
```

## Repository layout

- `index.html` and each route directory contain the live, server-rendered page HTML.
- `assets/index-DDtQlzmV.css` is the exact public production stylesheet.
- `assets/site.js` recreates the observable FAQ accordion without depending on the
  inaccessible deployment runtime.
- `images/` contains the three public project images used by the site.
- `robots.txt`, `sitemap.xml`, and `CNAME` contain the public crawl and domain setup.
- `scripts/capture-public-site.mjs` is a repeatable owner-only refresh utility.
- `PUBLIC_SITE_RECOVERY.md` records what was recovered and what cannot be inferred
  from the public site.

## Publishing

The site is plain static HTML, CSS, JavaScript, and WebP assets, so it can be served
by GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, or any ordinary
web server that maps route directories to `index.html`.

The contact page intentionally embeds the live public quote form at
`https://os.arorix.com/f/arorixhomesolutions`; submitting that form depends on the
separate Arorix OS service and is not implemented in this repository.

- Customer-facing brand: No Bull Home Services
- Operating entity: Arorix Home Solutions LLC d/b/a No Bull Home Services
- Service area: Lexington and Central Kentucky
