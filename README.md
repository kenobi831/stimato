# Stimato

Free flooring estimate calculator for installers — live at https://stimato.app

Static single-page app, no build step. Deployed to Netlify (publish dir: `.`).

- `index.html` — the whole app
- `service-worker.js` — offline shell cache (bump `CACHE_NAME` when index.html changes)
- `manifest.webmanifest`, `icons/` — PWA install
- `robots.txt`, `sitemap.xml` — SEO
