# Inspect a HAR network log without sharing its secrets

Canonical page: https://nepocore.com/blog/inspect-har-network-log-safely/

By Nepocore. Published 2026-10-28; updated 2026-11-04.

Read timing and size summaries, then understand what a reduced export removes and what it can still reveal.

## Quick answer

Treat a HAR file as sensitive. Review URLs, query parameters, headers and bodies before sharing, even after a sanitized export. A reduced export removes only its defined fields and can still reveal identifiers or private information.

## Treat the log as potentially sensitive

A HAR file records browser network activity. Depending on how it was exported, it can include request URLs, headers, cookies, bodies and response information. Those fields can contain tokens, account identifiers, submitted form values or internal hostnames. A filename ending in .har does not mean the contents are safe to publish.

Chrome offers sanitized HAR export options, but sanitization has a defined scope. Even after common authentication headers and cookies are excluded, URLs, query values or bodies can still contain sensitive information. Review the actual content and the receiving party’s need before sharing a log.

## Use a local summary to find the next question

Open the HAR in Nepocore or load the synthetic sample. The viewer displays request method, URL, status, duration and recorded response bytes. It does not replay requests or automatically open the listed addresses. Sort slowest first to examine long requests, or largest first to inspect recorded payload sizes.

Filter by a URL fragment or status to narrow the table. The interface shows the first 100 matching rows, while the underlying accepted log can contain more. A response-body byte value may be missing or estimated in a HAR, so the total is a summary of recorded values, not a billing or transfer audit.

## Do not add overlapping durations into page load time

Two requests can each take 500 ms while running at the same time. Their duration sum is 1000 ms, but that does not prove the page waited one full second for them in sequence. The viewer labels its total as a sum of request durations because concurrency matters.

Use the table to identify a request worth investigating, then return to a trusted performance tool for a waterfall and the surrounding context. Status codes, redirects, caching and browser scheduling can all affect the experience. A single slow request is evidence to investigate, not a complete diagnosis.

1. Choose a log you are authorized to inspect.
2. Sort or filter to isolate a small question.
3. Compare the relevant URL, status, timing and byte fields.
4. Keep sensitive values out of screenshots and support tickets.
5. Export only what the recipient needs.

## Review even a reduced export

Nepocore’s reduced HAR export rebuilds an allowlisted diagnostic structure. It removes headers, cookies, bodies, original timestamps and query values, replacing query values with REDACTED. It preserves hostnames, paths, methods, status and summary measurements. Paths can still contain names, IDs or tokens.

Read the reduced file before sending it. The CSV summary also includes URLs, so it is not a secret-free alternative. The viewer accepts bounded file sizes and entry counts to limit memory use, but it cannot certify that a log contains no personal information. When reporting a bug, a synthetic reproduction with example.com addresses is often easier to share and understand than a complete production browsing session.

## Put it into practice

- [HAR network-log viewer](https://nepocore.com/tools/har-viewer/)
- [URL encoder / decoder](https://nepocore.com/tools/url-encoder/)
- [JSON formatter](https://nepocore.com/tools/json-formatter/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [Chrome DevTools: network reference and HAR export](https://developer.chrome.com/docs/devtools/network/reference/)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
