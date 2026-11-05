# Image compressor

Canonical page: https://nepocore.com/tools/image-compressor/

Compress a browser-readable photo to JPEG or WebP on your device. Use manual quality for visual control, or choose a target file size such as 100 KB. Target mode searches export quality at the chosen dimensions and clearly reports whether the limit was met.

## How to use it

1. Choose your image and check the visible original preview. Inputs are limited to 25 MB and 24 megapixels.
2. Choose JPEG or WebP and set Maximum width. The tool keeps the proportions and does not enlarge a smaller image.
3. Choose a Target file size in KB, or leave it at 0 for manual quality. Run Compress image.
4. Check the exact byte count, dimensions and target status. Inspect text and faces before downloading the copy.

## Example

For a form asking for a JPEG under 100 KB, choose JPEG, enter 100 in Target file size and start with the maximum width the form permits. If the target is not met, lower the width and try again. This tool treats 100 KB as 100,000 bytes.

## Limits and checks

A file-size target is not guaranteed. Target mode keeps the chosen dimensions and tries qualities from 1 to 100. Lowering width may be necessary. JPEG replaces transparency with white, and animated inputs become one still frame.

## Fit an upload limit without guessing

An application form can impose three separate requirements: image format, pixel dimensions and maximum file size. Meeting only the KB limit is not enough. Read all three requirements before processing the image, then use the preview and the exported dimensions to check your copy.

In target mode, Nepocore tries a bounded search of browser encoder quality settings and keeps an output only after measuring its actual bytes. It shows Target met or Target not met. It does not rename an oversized file or label the quality slider as a percentage of detail preserved.

## Choose the next adjustment



| What you see | What to try |
| --- | --- |
| Target not met | Reduce maximum width if the receiving service permits it, then compress again. |
| Blurred lettering | Use a higher quality or larger allowed dimensions; inspect at normal viewing size. |
| Output larger than original | Keep the original when it already meets the requirements. |
| Transparent logo | Use WebP if accepted, or the PNG image converter when preserving transparency matters. |

## Task questions

### Can I compress an image to 50 KB, 100 KB or 200 KB?

Enter 50, 100 or 200 as the target. The result measures against 50,000, 100,000 or 200,000 bytes. Some images cannot fit at the chosen dimensions; check the status and reduce the width if allowed.

### Is the quality setting the amount of detail retained?

No. It is a browser encoder setting. Different photographs and browsers can produce different sizes and artifacts at the same setting. Inspect the exported image.

### Is the original photo uploaded or overwritten?

Processing takes place in your browser. The download is a new copy, and the original is not overwritten by the tool.

## Continue your task

- [Set exact image dimensions](https://nepocore.com/tools/image-resizer/)
- [Convert PNG, JPEG and WebP](https://nepocore.com/tools/image-converter/)
- [Arrange a photo for printing](https://nepocore.com/tools/passport-photo/)

## Method and references

- [MDN: canvas image export and quality](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)

## Access and processing

Free to use without an account. Interactive processing requires JavaScript in a modern browser. Input is processed in the browser rather than sent to a processing server. Optional browser storage is not a synchronized account.


---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
