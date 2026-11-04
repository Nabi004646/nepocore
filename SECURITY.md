# Application security notes

Reviewed 28 October 2026 for the Nepocore v7 update. This is a focused source and browser review, not an independent penetration test, certification or a promise that the application has no vulnerabilities.

## Architecture and boundaries

The application is a static browser toolkit. It has no application upload server, database, payment flow or API credentials. Hosting infrastructure and any private-site authentication remain the host’s responsibility. Uploaded files and entered tool data are processed in the page unless the visitor explicitly exports or locally saves a record. System online speech voices are a documented exception: their provider may receive text.

No advertising or analytics is enabled. Adding either later introduces new third-party code and privacy boundaries and requires its own review. See ADSENSE_SETUP.md.

## Controls checked

- User-provided table cells, captions rendered in SVG, filenames displayed in HTML, guide metadata and HAR values pass through HTML/XML escaping. Generated vCards escape separators and all CR/LF variants so a supplied line break cannot become another contact field.
- Markdown is parsed with Marked 18.1.2 and sanitized with the bundled DOMPurify 3.4.17 using an HTML profile. Scripts, embedded media, forms and style attributes are excluded from the preview; links use a separate browsing context with `noopener noreferrer`. No template evaluation is applied to the result.
- Raster uploads are restricted to supported MIME types, 25 MB per image and 24 million pixels. Multi-image operations also apply count and combined-byte limits. Decoding and output-canvas allocation can still exhaust memory on constrained devices; limits are not a guarantee for every browser.
- New PDF tools accept unprotected files up to 30 MB, limit selected pages and rendered pixels, use a locally bundled PDF.js 6.4.299 core/worker pair and do not instantiate the PDF viewer or an action/script runner. XFA is disabled. Text extraction is capped at five million characters. A PDF is not automatically safe just because a renderer opens it.
- Puzzle generation and other heavy supported tasks run in workers. Active workers, object URLs and document-loading tasks are released on navigation/replacement. Output URLs are temporary local browser references, not public upload addresses.
- Local-saving tables validate backup row counts, field types and input size. Saving is opt-in. Browser local storage is not encrypted application storage, an account, a secure vault or a permanent backup. Shared browser profiles can expose saved records.
- CSV exports neutralize formula-like string cells by default. A raw-export option elsewhere in the toolkit should be used only when the visitor intentionally accepts spreadsheet interpretation.
- HMAC uses native SubtleCrypto in a secure context, validates key encodings and expected digest lengths, and passes an RFC 4231 reference vector with native verification. It is not encryption, a password-storage scheme or public-key signing. No real keys are included in examples.
- HAR viewing does not replay requests. The reduced export uses an allowlist and removes headers, cookies, bodies, original timestamps and query values. Hostnames and paths remain and can still contain secrets; every export must be reviewed before sharing.
- Camera and microphone are requested only by explicit tool actions. Uploaded files are available as a camera alternative. Hardware use was not exercised in the cloud preview.
- The generated `_headers` file supplies `nosniff`, a referrer policy and a restricted feature policy for hosts that support that format. Actual production response headers must be checked on the chosen host. No claim is made that every static host applies `_headers` automatically.

## Dependency and policy checks

The upstream DOMPurify release/advisory pages and PDF.js advisory page were checked for this review. The bundled versions are DOMPurify 3.4.17 and PDF.js 6.4.299. This limited check is not an exhaustive software-composition audit of every transitive dependency or model runtime. Preserve licenses and provenance; review upstream advisories again before future releases.

- https://github.com/cure53/DOMPurify/releases
- https://github.com/cure53/DOMPurify/security/advisories
- https://github.com/mozilla/pdf.js/security/advisories
- https://www.rfc-editor.org/rfc/rfc4231

Some existing optional OCR/background-removal engines obtain pinned engine/model resources from third-party hosts on demand. Those hosts receive normal request metadata. A restrictive CSP must be designed and browser-tested against all those imports, workers, WASM and models before deployment; an untested blanket policy was not added in this release.

## Reporting an issue

Email admin@nepocore.com with the tool URL, a minimal reproduction, browser version and expected behavior. Use synthetic data. Do not send passwords, production keys, private certificates, medical records or sensitive HAR logs. No response-time commitment or bug-bounty program is implied. For an upstream-library vulnerability, also follow that project’s reporting process.

Future public hosting, consent/ad integrations, server features, file retention or accounts change the threat model and require a new review.
