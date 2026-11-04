# Nepocore SEO implementation and backlink plan

The site is built as crawlable static HTML. These settings apply to the public production site at https://nepocore.com/; they do not guarantee indexing, rankings, backlinks, rich results, or a Core Web Vitals pass.

## Screenshot checklist

| Item | Implementation and verification |
| --- | --- |
| No accidental noindex | All useful content pages are indexable. Favorites and the error document remain intentionally noindex; client-side search results also request noindex. |
| Meta titles | Every generated page has a non-empty, unique title. Client navigation updates titles. |
| Meta descriptions | Every indexable page has a unique description, including the nine guide categories and the guide archive. |
| Image alt text | Generated HTML is checked for alt attributes and dimensions on every image. The current static layout uses CSS/SVG artwork rather than raster image elements; uploaded image previews already use descriptive alt text. Decorative art is hidden from assistive technology. |
| Core Web Vitals | Local fonts use font-display:swap and preloads; the main heading is not delayed by entrance animation; tool engines remain lazy-loaded; cards reserve layout space; content-based versions on entry assets refresh styles and scripts after deployments. Measure real LCP, INP and CLS separately. |
| sitemap.xml | Includes all 319 indexable pages, including Worksheet Studio pages, and excludes favorites/error pages. |
| og:image | Absolute HTTPS WebP sharing images with MIME type, dimensions and descriptive alt metadata. Twitter image/title/description/alt metadata is also included. |
| Broken links | Local links, fragments and assets are checked on every production build. Four worksheet hash values are deliberate tool-state selectors. External third-party URL availability is not inferred from an offline audit. |
| Header hierarchy | Exactly one H1 and no skipped heading levels in generated HTML. |
| Backlink strategy | Four-week plan below; no messages or submissions have been sent. |
| URL slugs | Existing descriptive lowercase paths are retained, preserving established links. No unnecessary slug renaming or redirects. |
| Internal links | Category hubs, the tool catalogue, related guides, tool guides and Worksheet Studio navigation form a crawlable graph. The audit verifies every indexable page is reachable from the homepage. |
| Canonicals | Every indexable page has one self-referencing HTTPS canonical without a query string or fragment. |
| HTTPS | HTTPS canonical URLs and resource links are used throughout. The response headers include HSTS for the current host. Cloudflare's Always Use HTTPS setting governs initial HTTP-to-HTTPS redirects. |
| Compressed images | PNG assets are losslessly optimized when that reduces size. Both 1200×630 sharing images also have lossless WebP versions. Small app icons retain PNG compatibility. |
| Schema | Valid JSON-LD throughout: WebSite, Organization, WebPage/WebApplication, BlogPosting, CollectionPage and BreadcrumbList as appropriate. Worksheet guides have publication dates and author details. |
| Search Console | DNS verification requires Google's actual record and account confirmation. An optional HTML-tag verification token is supported by both HTML builders; see instructions below. This is not a claim that the account is verified. |
| robots.txt | Allows crawling and advertises the canonical sitemap; it does not block required CSS or JavaScript. |
| Mobile responsiveness | Responsive layouts are preserved; mobile search/form text is at least 16px to avoid browser input zoom. Check representative pages at 320, 375, 768 and 1366px. |

## Run the checks

```bash
npm run build
npm test
npm run audit:seo
```

The Cloudflare build runs the SEO audit automatically after producing pages and downloadable source. A regression in titles, descriptions, heading order, canonical URLs, social metadata, schema, internal links, assets, sitemap coverage or page discoverability fails the build.

For development-only image optimization, install Pillow and run `python3 scripts/optimize-images.py`. Pillow is not required in the Cloudflare build because optimized assets are committed.

## Search Console: complete ownership verification

Recommended: create a **Domain** property for `nepocore.com` in https://search.google.com/search-console/ . Google supplies the exact DNS verification value. In Cloudflare DNS, add the TXT record with name `@` and Google's supplied value, then return to Search Console and verify. Keep the record afterward. If Google offers an automatic Cloudflare provider verification flow, follow that flow with the correct account instead.

Alternative: create a URL-prefix property for `https://nepocore.com/`, select the HTML-tag method and copy only the value of the `content` attribute. Set the non-secret Cloudflare build variable `GOOGLE_SITE_VERIFICATION` to that value, or set `searchConsoleVerification` in `src/publishing.json`. Rebuild and verify. Empty configuration intentionally emits no fake verification tag. The token must be Google's exact token; a placeholder cannot verify ownership.

After verification, submit `https://nepocore.com/sitemap.xml`. Inspect the homepage and a few priority tool/guide URLs. Use the Page Indexing and Core Web Vitals reports to find actual Google-side issues. Verification and sitemap submission alone do not guarantee indexing.

## Four-week backlink strategy

Start with pages that solve a narrow problem and can be recommended naturally:

- https://nepocore.com/tools/ielts-overall/ for IELTS study resources.
- https://nepocore.com/worksheets/ for teacher and parent practice resources.
- https://nepocore.com/tools/image-converter/ and https://nepocore.com/blog/jpeg-png-webp-choose-image-format/ for image-format tutorials.
- https://nepocore.com/tools/pdf-merge/ for document workflows.
- https://nepocore.com/categories/nepal/ for Nepal-focused resources.

| Week | Work | Track |
| --- | --- | --- |
| 1 | Confirm each target works on mobile. Improve one original worked example or tutorial, with honest limitations and a direct tool link. Add the relevant project link to your existing portfolio and GitHub project description. | Target URL, topic, improvement and publication date. |
| 2 | Find a small set of relevant IELTS tutors, teacher resource pages and Nepal student communities that accept useful resources. Read their submission rules. Prepare individual suggestions that explain the resource's practical use. | Prospect URL, audience fit, submission rules, intended landing page and status. |
| 3 | Contribute one useful walkthrough or original printable example to a community that welcomes it. Ask for an editorial resource link only where it improves the resource page. Do not mass-post or create accounts solely to drop links. | Published contribution URL, editorial link placement and referral visits. |
| 4 | Review referrals and Search Console links/search performance. Follow up once on relevant unanswered suggestions, fix reported problems and improve the most-used target pages. | Links earned, relevant referrals, queries, clicks and useful feedback. |

Use a simple tracking table with: prospect, topic, target page, contact/submission page, status, date, resulting link and referral traffic. A target of a few relevant editorial mentions is an outreach goal, not a promised outcome.

Avoid purchased ranking links, automated directory spam, reciprocal-link requirements and keyword-stuffed anchor text. Keep sponsorships appropriately labeled if used. No outreach, posting or account changes are authorized merely by this plan.

## Performance measurement

Use PageSpeed Insights (https://pagespeed.web.dev/) on the homepage, a tool page, a guide and Worksheet Studio, with mobile selected. Aim for LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile of real visits. Field data can be unavailable for low-traffic/new sites; a lab test or smaller asset file is not proof of passing field Core Web Vitals. Recheck after material content, advertising or script changes.

## References

- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Image SEO: https://developers.google.com/search/docs/appearance/google-images
- Noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Canonicals: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Crawlable links: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- Search Console ownership: https://support.google.com/webmasters/answer/9008080
- Web Vitals: https://web.dev/articles/vitals
- Cloudflare HTTPS: https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/

## One-time external link review

On November 4, 2026, all 46 unique external references linked by generated HTML were attempted through public retrieval. Forty-one were reachable, including one repository confirmed through the GitHub API. Five could not be confirmed because of access restrictions, minimal responses or timeouts; none was identified as a definite broken link. See [EXTERNAL_LINK_REVIEW.json](EXTERNAL_LINK_REVIEW.json). These results are separate from the deterministic offline build audit and do not guarantee future third-party availability.

## Published discovery resources

- `/robots.txt`: crawler rules and the canonical XML sitemap location.
- `/sitemap.xml`: all indexable static pages, including Worksheet Studio.
- `/llms.txt`: concise public site overview with curated links.
- `/llms-full.txt`: expanded tool/guide directory with canonical links and short descriptions. It is not a full-text copy of every page.
- `/blog/feed.xml`: RSS guide updates.
- `/manifest.webmanifest`: installable app metadata; this is not a search ranking file.

The LLM files are generated from the current catalogue on every build and advertised using a `Link` response header with `rel="describedby"`. Common singular spellings `/robot.txt` and `/llm.txt` redirect to their canonical resource names. The llms.txt format is an optional discovery proposal, not a replacement for robots.txt or sitemap.xml and not a promise of Google rankings or AI citations. Specification: https://llmstxt.org/ .
