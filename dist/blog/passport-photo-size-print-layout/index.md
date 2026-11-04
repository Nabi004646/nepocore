# Prepare a passport photo layout without confusing size with approval

Canonical page: https://nepocore.com/blog/passport-photo-size-print-layout/

By Nepocore. Published 2026-10-28; updated 2026-11-04.

Understand millimetres, pixel dimensions and print scaling before making a photo sheet.

## Quick answer

Check the issuing authority’s current photo requirements before cropping or printing. Physical size alone does not establish acceptance: head position, lighting, background and permitted edits also matter. Nepocore makes a layout and does not certify compliance.

## Get the authority’s specifications first

A correctly sized rectangle can still be an unacceptable passport or visa photograph. The issuing authority may specify head size, eye position, background, expression, lighting, age of the photo and whether digital alteration is allowed. Obtain those current requirements directly from the authority before using any layout editor.

Nepocore supplies editable crop dimensions and a printable sheet. It does not certify a photo or assess compliance. A 35 × 45 mm example is a convenient demonstration, not a universal passport standard. Avoid changing facial features or assuming that a background edit is permitted.

## Translate a physical size into enough pixels

The layout is designed using 300 pixels per inch. For a 35 mm wide image, calculate 35 ÷ 25.4 × 300, which is about 413 pixels. A 45 mm height is about 531 pixels. Rounding to whole pixels is normal; a print workflow must also preserve the intended physical dimensions.

The PNG contains the designed pixel dimensions, but browser canvas exports may carry 96-DPI metadata. That metadata can cause a printing application to suggest a different physical size. Use the PDF layout for the intended sheet dimensions, select actual size or 100%, and verify a test print with a ruler.

## Build and inspect the sheet

Upload a sharp, appropriately captured photograph. Confirm the small preview in the upload area, then enter the width and height from the official requirements. Adjust zoom and position so the framing matches those requirements. Avoid over-zooming a low-resolution photo: it magnifies blur along with the subject.

1. Choose A4, Letter or the small photo-sheet option that matches the paper.
2. Set the number of copies and review the complete result.
3. Download the PDF and inspect every edge before printing.
4. Disable automatic fit-to-page scaling when the printer supports actual-size output.
5. Measure a test copy and compare it with the required millimetres.

## Keep a digital master and a print copy

A digital submission may require a particular pixel size, byte limit or file format instead of a paper sheet. Read that specification separately. Export a single image for the digital process and a PDF sheet for physical printing; do not send a screenshot of the sheet as the application photograph.

Printer margins, driver scaling and paper settings can change a physical result. If a copy measures too small, check scaling before changing the crop dimensions. Keep the unedited original and the authority’s instructions alongside the finished copy. When in doubt about acceptance, use the authority’s approved service or ask it directly.

## Put it into practice

- [Passport photo layout editor](https://nepocore.com/tools/passport-photo/)
- [Photo cropper](https://nepocore.com/tools/image-cropper/)
- [Image resizer](https://nepocore.com/tools/image-resizer/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [MDN: canvas toBlob and resolution metadata](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)
- [MDN: printing web content](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing)
- [MDN: printed page sizes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@page/size)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
