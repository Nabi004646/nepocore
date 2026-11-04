# Nepocore — free browser tools for everyday tasks

[Nepocore](https://nepocore.com/) is a public collection of **227 free tools** for images, documents, calculations, study, creative projects and everyday work. Tool pages include instructions, examples and limitations. No application account or paid download tier is required.

## Try a real task

- Use the [scientific calculator](https://nepocore.com/tools/calculator/) for degree-based trigonometry, powers, roots and logarithms.
- Calculate an [IELTS overall band](https://nepocore.com/tools/ielts-overall/) from four section bands, with the pre-rounding average shown.
- Create an [illustrated chibi character](https://nepocore.com/tools/anime-character/) and export PNG or editable SVG.
- Make a custom worksheet in [Worksheet Studio](https://nepocore.com/worksheets/) with your own settings and optional answer keys.
- Browse the [complete toolkit](https://nepocore.com/tools/) and [worked guides](https://nepocore.com/blog/).

Most input processing runs on the visitor's device. Some optional engines or libraries download assets from third-party services; online system voices may use their provider. Browser storage is optional for supported tools and is not a synchronized account. Read the [privacy policy](https://nepocore.com/privacy/) for those boundaries. A local tool does not replace an organization's rules for handling sensitive documents.

## Run and build

Use Node 22 or newer and Python 3. Hosting and the regular build require no paid API, backend database or new Python packages.

```bash
npm run build
npm test
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. ES modules need a web server; double-clicking the HTML through `file://` is not supported.

The public build defaults to `https://nepocore.com/`. For another origin, set the root URL before building:

```bash
SITE_URL=https://example.com/ npm run build
```

The build generates static HTML, unique page metadata, structured data, the sitemap, robots instructions, text companions, feed and source download. Cloudflare Pages uses `npm run build` and output directory `dist`; see [CLOUDFLARE.md](CLOUDFLARE.md). Publishing this repository's main branch triggers the connected Pages deployment.

## Source structure

| Path | Purpose |
| --- | --- |
| `dist/catalog.mjs` and data modules | Canonical tool catalogue used during builds |
| `dist/catalog-client.mjs` | Generated browser catalogue without editorial imports |
| `dist/app.mjs` | Initial hydration and on-demand tool activation |
| `dist/styles.css`, `dist/design.css` | Editable styles; combined into a content-addressed stylesheet |
| `dist/content.mjs`, `dist/search-intents.mjs` | Tool instructions and reviewed page intent |
| `dist/blog-content/` | Original guides with methods and primary references |
| `scripts/build-static.mjs` | Static pages, metadata, browser catalogue and offline shell |
| `scripts/build-worksheets.mjs` | Worksheet Studio and its usage guides |
| `scripts/build-geo.mjs`, `scripts/build-discovery.mjs` | Markdown instructions and public discovery resources |
| `scripts/audit-seo.py`, `tests/` | Crawl, content, performance and functional checks |
| `research/` | Keyword map, evidence, priorities and prepared discovery opportunities |

## Refresh edited content and assets

After changing page titles, descriptions or adding pages, refresh the exact-text social cards in a development environment with Pillow and DejaVu fonts:

```bash
npm run refresh:social
npm test
```

Commit the generated PNG cards and `dist/social-images.mjs`. Cloudflare serves those committed images and does not need Pillow. Cards use content-hashed filenames and 1200 × 630 PNG dimensions; Open Graph and Twitter metadata are specific to each page.

To refresh the keyword inventory after changing the catalogue, run `node scripts/build-keyword-map.mjs`. Research labels distinguish publicly reviewed queries from catalogue-derived candidates; search volume and difficulty are not invented.

## Performance and discoverability

The shared shell preserves pre-rendered content on first load. Editorial data and client route templates load when an interaction needs them. The initial static-import budget is checked in tests, and the build emits one hashed shared stylesheet with an immutable cache policy.

Tool instructions and guides are also available as linked `index.md` files. The text copies use `X-Robots-Tag: noindex, follow` so HTML remains the indexed version. `llms.txt` and `llms-full.txt` are optional discovery aids, not requirements for Google indexing or promises of AI citations.

A sitemap, a passing technical audit and useful content do not guarantee a search position. The research notes describe what was actually checked and what needs further measurement in Search Console.

## License and contribution

The website source is licensed under **AGPL-3.0**; see [LICENSE](LICENSE). Third-party components retain their own license notices.

For a bug or correction, include the affected tool URL, browser, steps to reproduce and expected result. Do not attach private documents, real credentials or personal records. Read [SECURITY.md](SECURITY.md), [TOOLS.md](TOOLS.md) and the [editorial policy](https://nepocore.com/editorial-policy/) for project details.
