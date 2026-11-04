# Nepocore search growth work — 5 November 2026

## What the research establishes

Public search results were reviewed for ten task clusters: degree-based scientific calculations, illustrated chibi creation, IELTS overall-band rounding, printable arithmetic worksheets, local image conversion, Nepali date conversion, Nepali font conversion, custom word searches, local PDF merging and QR exports. Eleven existing tools map directly to those reviewed clusters. A twelfth tool page, typing practice, received a clearer description based on its shipped behavior.

The full inventory is [keyword-map.csv](keyword-map.csv), with 227 tool rows. [search-evidence.json](search-evidence.json) records the reviewed queries and example result pages. Other rows are explicitly marked as catalogue-derived candidates, not independently reviewed keyword opportunities.

No search-volume, keyword-difficulty, traffic or current-position numbers were available from a keyword provider or a fresh Search Console export. The P1/P2/P3 labels reflect task fit and a practical implementation order; they are not measured difficulty scores or promises of first-page results. This review was not a localized Nepal rank-tracking study.

## Changes implemented

| Area | Completed change |
| --- | --- |
| 12 tool pages | Specific page titles, meta descriptions, visible H1s and practical task questions matched to real functionality |
| 5 worksheet activity pages | Distinct titles and descriptions for math, weekly packs, spelling, word search and handwriting |
| Scientific calculator guide | Original worked examples for DEG inputs, grouping, logs, roots, factorials and domain limits |
| IELTS guide | Original score combinations, averaging, half-band boundaries and recipient-specific limitations |
| Chibi guide | Illustrated-parts workflow, reproducible choices, transparent PNG/SVG exports and file-format checks |
| Teaching resource | A six-page A4 PDF with three 20-question activities, separate answer keys, HTML equivalents and structured data |
| Internal discovery | Tool-to-guide links, homepage field notes, resource links in the main footer and Worksheet Studio |
| Crawler resources | Updated sitemap, feed dates, text companions and discovery directories; PDF canonical header points to the resource page |
| Project presence | Current public-product README with contextual links and the correct AGPL-3.0 license |

The website now has 227 tools, 38 main practical guides, three additional Worksheet Studio guides, 325 generated HTML pages and 323 indexable canonical URLs. “Indexable” is a technical eligibility statement, not a claim that Google has indexed or ranked every page.

## Why these priorities

- A degree-only calculator should state DEG explicitly. Adding an unimplemented radian mode to attract a query would mislead users.
- A manual illustrated chibi builder should serve avatar/character customization searches. Prompt-based or photo-based AI generation is a different task.
- Worksheet searches often name the output and answer key. The resource pack supplies an immediately usable example and an accessible alternative to the PDF.
- IELTS visitors need the formula and rounding worked out, plus an explanation that overall scores do not decide admissions or visas.
- Local image/PDF processing is relevant, but absolute claims of unlimited capacity or universal privacy were not added. Device memory, optional engines and organizational requirements still matter.
- Nepal-specific conversion pages state their supported range or encoding boundaries instead of implying universal conversion coverage.

## Backlinks: completed versus prepared

The source repository's README now provides contextual routes into the actual product and teaching resources. This is one project-controlled referral source; it is not seven independent editorial endorsements or proof of ranking credit.

Seven external opportunities were researched: AlternativeTo, Product Hunt, DEV, SaaSHub, OpenAlternative, Teaching Ideas and MathsLinks. Their current entry points, audience fit, limitations and draft copy are in [BACKLINK_OPPORTUNITIES.md](BACKLINK_OPPORTUNITIES.md); [backlink-tracker.csv](backlink-tracker.csv) records all seven as prepared, not published.

No external account was created, paid placement purchased, community post published, directory form submitted or editor contacted. Inclusion on another website depends on its owner and review process. The original resource and accurate product copy are ready for that review; no backlink is required to use the practice pack.

## Validation

- 100 automated tests pass, including every new worked calculation, keyword coverage, all 60 worksheet answers and page-specific metadata.
- Offline SEO audit checks all 325 generated HTML pages, 323 sitemap URLs, 20,798 internal links and 2,890 local asset references with no reported issue.
- All 323 indexable pages are reachable from the homepage in the generated link graph.
- The six PDF pages were rendered and inspected; question/answer pagination and A4 dimensions were checked.
- The existing startup JavaScript budget continues to pass. Research and expanded editorial content do not join the initial module graph.

Public HTTP deployment checks are recorded after Cloudflare publishes the commit. Browser-based review is not assumed from an offline audit, and lab SEO scores are not presented as search rankings.

## Next measurement cycle

After Google has had time to recrawl, compare matching date ranges in Search Console. Export query and page data together where possible. Track impressions, clicks, CTR and average position for the priority URLs, and inspect indexing/canonical status when an important page has no impressions. A site-wide average alone can hide changes in the query mix.

For each external placement, record the resulting public URL and referral visits before marking it published. Improve the resource when teachers or readers report a real issue. Expand the next tool cluster using observed queries and actual user tasks rather than publishing many near-identical keyword pages.

## Primary guidance

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google link-spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Canonical URLs, including non-HTML resources: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Official IELTS scoring: https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail

The prospect document links to each platform's own submission or contribution information. Evidence was reviewed on the date above and may change.
