# PDF compression: compare a structure rewrite with an image-based copy

Canonical page: https://nepocore.com/blog/compress-pdf-structure-or-image-copy/

By Nepocore. Published 2026-10-28; updated 2026-11-04.

Understand why a PDF can get larger, and which features an image-based export removes.

## Quick answer

Try a structure rewrite when you want to retain document features. An image-based copy may reduce large scans but turns pages into pictures and loses text and interactive features. Compare both size and usability with the original.

## A PDF can contain very different things

A short PDF may contain compact vector text, huge photographs, embedded fonts or a mixture of scans and interactive elements. File size alone does not identify the cause. A document made from a few already optimized pages may have little room to shrink. Another may be dominated by unnecessarily large scans.

The compressor offers two distinct operations. A structure rewrite saves a new PDF without intentionally turning each page into a picture. An image-based copy renders each page and embeds JPEG images at a chosen resolution and quality. These operations have different tradeoffs and should be compared with the original.

## Try the less destructive option first

Choose Structure rewrite and create a copy. Compare the reported input and output bytes. If the result is larger, keep the original when size is the only goal. A rewrite is not a promise to optimize every internal stream, remove every unused resource or preserve a digital signature. Rewriting bytes can invalidate signatures.

Open the new copy and inspect page count, orientation and important content. Test any features you need rather than assuming all links, forms or annotations survived the processing library’s rewrite. Keep the untouched source until the recipient has accepted the document.

## Use image-based output for an appropriate scan

A photo-heavy scan may become smaller with a moderate raster resolution and JPEG quality. Start with a small representative document. For an A4 page, 120 pixels per inch gives roughly 992 × 1403 pixels; that may suit reading large print, while small text can require more. There is no single correct setting for all documents.

The image-based copy removes selectable text, links, forms and annotations as interactive PDF features. Visible marks can become part of the page image, but they are no longer editable objects. Accessibility information and text search are not preserved. Do not use this mode when those features are required.

1. Keep an original and create a clearly named copy.
2. Start with moderate resolution and quality.
3. Read the smallest text in the exported file.
4. Compare actual bytes, rather than assuming compression succeeded.
5. Test the recipient’s size limit and document requirements.

## Reduce scope when the document is too large

The tool accepts a PDF up to 30 MB and supports up to 40 pages for image-based copying. It caps rendered page pixels to protect memory. For a larger source, extract only the necessary pages first or use a dedicated document workflow suited to the file.

A smaller PDF is not automatically a better document. If a form stops working, a signature becomes invalid or a table becomes unreadable, the size saving has defeated the purpose. Preserve a searchable master, use a lightweight sharing copy only where appropriate, and tell the recipient if the copy is image-based.

## Put it into practice

- [PDF compressor](https://nepocore.com/tools/pdf-compressor/)
- [Extract PDF pages](https://nepocore.com/tools/pdf-extract/)
- [PDF text extractor](https://nepocore.com/tools/pdf-to-text/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [Mozilla PDF.js: page-rendering examples](https://mozilla.github.io/pdf.js/examples/)
- [Mozilla PDF.js: page text-content API](https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFPageProxy.html)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
