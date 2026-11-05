# NaiguaStore

Static Spanish-language PC hardware storefront for GitHub Pages. Product/category/guide content is generated as HTML and readable without JavaScript. JavaScript adds search, sorting, category filtering and a WhatsApp cart.

## Develop

Node 22+ and Python 3:

```sh
npm ci
npm run build
npm start
```

Open http://localhost:4173. No build-time production dependency or backend is required.

```sh
npm test
npx playwright install chromium
npx playwright test
```

The CI workflow uses the Chrome already installed on the Ubuntu 24.04 runner, tests at 1440, 768 and 390px, uploads screenshots/reports, and deploys only on success.

## Maintain

Edit `data/products.json` for model facts, manufacturer links, reference prices (integer cents), images and specifications. Edit `scripts/build.mjs` for static content and metadata; `assets/styles.css` for styling. Run build after changes. GitHub deploys `dist/` on pushes to main. Set the canonical site URL in build.mjs if the repository or domain changes.

The original four products and reference prices come from the supplied screenshot, not a verified live inventory feed. No stock, taxes, warranty duration, delivery quote or payment availability is confirmed. Do not turn reference prices into schema.org Offers until commercial data is verified. The ASUS GPU photo is illustrative; confirm the actual assembler before representing it as the supplied unit.

`assets/cart.mjs` contains quantity normalization, integer totals and encoded WhatsApp messages. The limit of 99 is a UI limit, not a stock count. Local storage holds only IDs and quantities. Client values are not binding: manually confirm every quote before accepting payment. Opening WhatsApp does not prove a message was sent. No credentials, payment accounts or tracking IDs are included.

## SEO / GEO

- 13 static HTML pages with distinct titles/descriptions/canonicals, Spanish language, semantic headings, internal links, Organization/WebSite/WebPage structured data, Product facts and product breadcrumbs.
- No fake ratings, stock or current Offers. Product rich-result eligibility is not promised.
- Sitemap lists all published content. Compatibility guidance answers specific RAM/SSD questions with manufacturer sources.
- Qualitative search intent checked against Venezuelan component catalogs; no search volumes or ranking guarantees are claimed.
- Project `robots.txt` allows all bots. On GitHub **project** Pages, crawlers consult `https://anyelopetit.github.io/robots.txt`, not this project's nested file. This repository cannot override that domain-root file; use a custom domain or control the user Pages root to publish domain-wide rules. A missing robots.txt (404) does not itself block crawling.
- No Search Console ownership or Analytics account was provided. Submit the sitemap in a verified property separately. No analytics is installed, so there is no claim to track sales from WhatsApp clicks.

See PRODUCT.md, DESIGN.md and docs/ASSETS.md for constraints, visual decisions and source assets.
