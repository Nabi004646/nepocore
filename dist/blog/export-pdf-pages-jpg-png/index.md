# Export PDF pages as JPG or PNG without losing track of resolution

Canonical page: https://nepocore.com/blog/export-pdf-pages-jpg-png/

By Nepocore. Published 2026-10-28; updated 2026-11-04.

Choose page ranges and pixel density, then decide between a single image and a ZIP of page images.

## Quick answer

Choose the required pages and resolution, export them as images, then check page order and filenames. Rasterizing a PDF preserves its visible appearance but removes selectable text, form fields and clickable links from the image copy.

## Decide why you need an image

A page image is useful for a preview, a presentation or an application that cannot display PDF. It is less useful when the recipient needs selectable text, accessible structure, form fields or clickable links. Rasterizing a page turns its visible appearance into pixels and leaves those PDF features behind. Keep the source document.

Use PDF to JPG / PNG to choose individual pages or ranges. For example, 3, 1-2 exports page three followed by pages one and two. Page numbers refer to positions in the file, which may differ from printed page labels such as an introduction numbered with Roman numerals. Check the preview and filenames after export.

## Relate DPI to page dimensions

PDF page dimensions are measured in points, with 72 points per inch. An A4 page is approximately 8.27 × 11.69 inches. At 150 pixels per inch, its rendered image is about 1240 × 1754 pixels. At 300, both dimensions double and the pixel count becomes about four times larger.

Higher density can improve small text, but it also increases memory and output size. The tool caps a rendered page at eight million pixels. Very large source pages may therefore export below the requested nominal resolution. Review the actual dimensions reported for the output rather than relying only on the DPI input.

## Choose format and range deliberately

JPEG is often convenient for scanned photographs and smaller sharing copies. PNG preserves sharp pixel boundaries without lossy JPEG artifacts and can suit diagrams or screenshots, but may create larger files. Compare the actual results for your document.

1. Choose an unprotected PDF no larger than the displayed limit.
2. Confirm the filename and page count in the upload status.
3. Enter a small page selection first.
4. Set JPEG or PNG and a suitable resolution.
5. Export one image, or download the ZIP when several pages are selected.

The operation renders pages sequentially and limits each export to 30 selected pages. A large batch also has a combined output limit. If the operation is too large for your device, use fewer pages or a lower resolution. Closing the tool cancels its active document work.

## Check before replacing or sharing anything

Open the downloaded images. Inspect the smallest important text, page orientation, margins and any light-colored marks. ZIP files use numbered page names, which makes it easier to preserve the selected order in another application. Do not assume a successful download proves the page content is readable.

A screenshot of a PDF viewer may include interface buttons, a cursor or an incomplete page. Direct page rendering avoids those incidental elements. It still does not redact hidden source information in the original PDF: if you need to share only the rendered images, share those new files and keep the original separate. Use an appropriate redaction workflow for sensitive source documents.

## Put it into practice

- [PDF to JPG / PNG](https://nepocore.com/tools/pdf-to-images/)
- [Extract PDF pages](https://nepocore.com/tools/pdf-extract/)
- [Image compressor](https://nepocore.com/tools/image-compressor/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [Mozilla PDF.js: page-rendering examples](https://mozilla.github.io/pdf.js/examples/)
- [MDN: image file formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
