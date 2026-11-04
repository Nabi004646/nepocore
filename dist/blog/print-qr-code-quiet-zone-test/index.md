# Make a QR code that still scans after printing

Canonical page: https://nepocore.com/blog/print-qr-code-quiet-zone-test/

By Nepocore. Published 2026-10-28; updated 2026-11-04.

Keep the quiet zone, choose a clear destination and test the actual printed result before distributing it.

## Quick answer

Use the full intended destination, preserve the clear quiet zone, and test the actual printed code on more than one device. A static QR code keeps the encoded destination; styling cannot correct a mistyped address.

## Start with the destination, then style it

A useful QR code gives a scanner exactly the information the visitor expects. For a website, use the full HTTPS address and check that it opens the intended page. A static code stores that address directly. Changing a page at the same address is different from changing the destination encoded in an already printed code.

Nepocore does not add a redirect or tracking service. That keeps the destination visible and avoids a dependency on a separate short-link account. It also means a typo remains a typo in every printed copy. Read the entered text carefully and test the decoded value before adding decorative colors or a logo.

## Protect the empty border

The quiet zone is the clear area around the square. DENSO WAVE specifies four modules around a standard QR code. A module is one grid unit, not a fixed number of millimetres. Keep that border when placing the SVG or PNG into a card, poster or slide. Cropping right to the dark squares removes part of the design needed for detection.

Use a light, plain background and a dark foreground with clear separation. A photograph behind the code or a decorative frame touching the grid can interfere with scanning. A text contrast score is useful for text design, but is not a QR-scanning certification.

## Test density and decoration together

Longer content generally makes a denser grid. At the same printed width, each module then becomes smaller. A short destination can therefore be easier to print at a useful size, but do not sacrifice trust by choosing a link service the reader cannot verify.

Error correction helps recover codewords; its advertised percentages are not a guarantee that a logo can cover the same percentage of the image. A logo can damage important patterns. Treat logos, rounded styles and unusual colors as extra variables that require real scanning tests.

1. Generate the code with its quiet zone intact.
2. Download SVG for a layout that needs scaling, or a sufficiently large PNG.
3. Read the export with QR reader and verify the complete decoded value.
4. Print a sample at the final physical size.
5. Scan the printed sample with more than one phone where possible.

## Test the context people will actually use

Scan from the distance, lighting and angle expected in use. A code beside a counter is different from one on a wall across a room. Glossy paper, folds and poor printer output can change a result that worked perfectly on screen. Keep essential instructions or a readable web address nearby so the QR code is not the only route.

Before a large print run, confirm that the destination is public, mobile-friendly and stable. Scanning a code does not establish that a site is safe. Readers should still review the displayed destination before opening it, and a QR reader should not automatically navigate to an untrusted address.

## Put it into practice

- [Custom QR code generator](https://nepocore.com/tools/qr-code/)
- [QR code scanner](https://nepocore.com/tools/qr-reader/)
- [Business card & vCard maker](https://nepocore.com/tools/business-card/)

## References and method notes

The references explain underlying formats, APIs or methods; they do not endorse Nepocore. Examples and instructions are original to this guide.

- [DENSO WAVE: QR code printing and quiet zone](https://www.qrcode.com/en/howto/code.html)
- [DENSO WAVE: QR error correction](https://www.qrcode.com/en/about/error_correction.html)
- [MDN: image file formats](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types)

Prepared with AI assistance. No specialist, clinical or financial review is claimed. Check important outputs and current recipient requirements.

---

[About Nepocore](https://nepocore.com/about/) · [Editorial and corrections policy](https://nepocore.com/editorial-policy/) · [Privacy and processing details](https://nepocore.com/privacy/)
