# PDF compressor

Canonical page: https://nepocore.com/tools/pdf-compressor/

Create a PDF copy using one of two methods. Structure rewrite saves the document without intentionally rendering its pages as pictures. Image-based copy renders each page as JPEG at your chosen resolution and quality. Neither method promises that every PDF will shrink.

## How to use it

1. Choose an unprotected PDF of up to 30 MB and wait for its page count to appear.
2. Start with Structure rewrite when selectable text and document features matter.
3. For a scan, consider Image-based copy and choose Raster resolution and JPEG quality. This method supports up to 40 pages.
4. Create the copy, compare input and output bytes, then open the downloaded PDF and inspect every important page. Keep the original.

## Example

For a photo-heavy scan, try an image-based copy at 120 DPI and 65% JPEG quality. Inspect small text and stamps. If they are unclear, raise the resolution or keep the original. These are starting settings, not a promised size reduction.

## Limits and checks

Rewriting a PDF changes its bytes and can invalidate digital signatures. Image-based copies remove selectable text, links, forms and annotations. A structure rewrite is not a guarantee that every advanced PDF feature is preserved.

## Choose a compression method for your document



| Method | Useful starting point | Tradeoff to check |
| --- | --- | --- |
| Structure rewrite | Text-based documents where page rasterization is undesirable | May make little difference or increase file size; verify document features. |
| Image-based copy | Large scans where a readable picture of each page is sufficient | Text is no longer selectable and interactive features are removed. |

## Check more than the file size

Open the new file before submitting it. Check page count, orientation, small text, stamps and any required signatures. If the recipient needs searchable text, accessible reading order or fillable fields, an image-based copy can make the document unsuitable even when it is smaller.

A PDF already optimized by its creator may not shrink. Nepocore reports the measured percentage change and offers the original alongside the new file. There is no guaranteed 100 KB or 1 MB result. Avoid repeated recompression of the only copy of an important document.

## Task questions

### Can this compress a PDF without uploading it?

Yes. PDF processing uses locally loaded browser libraries. The PDF contents are not sent to a Nepocore processing server. The libraries and page assets still need to load.

### Why did my PDF get larger?

The original may already use efficient compression, while a new structure or raster copy can add data. Compare the measured output with the original and retain the smaller suitable version.

### Can I process a password-protected PDF?

No. Choose an unprotected copy that you are authorized to process.

## Continue your task

- [Extract only the pages you need](https://nepocore.com/tools/pdf-extract/)
- [Combine PDF files](https://nepocore.com/tools/pdf-merge/)
- [Export PDF pages as images](https://nepocore.com/tools/pdf-to-images/)

## Method and references

- [pdf-lib: document creation and modification](https://pdf-lib.js.org/)
- [PDF.js: browser rendering engine](https://mozilla.github.io/pdf.js/)

## Access and processing

Free to use without an account. Interactive processing requires JavaScript in a modern browser. Input is processed in the browser rather than sent to a processing server. Optional browser storage is not a synchronized account.


---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
