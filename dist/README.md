# Nepocore — 227 free everyday tools

A complete static website for image editing, creators, calculators, IELTS, text, PDFs and development utilities. The downloadable project contains a ready-to-host `dist/` folder, editable source, a static page generator, tests and open-source notices. No backend, database, paid API, account system or file-upload server is needed.

## Run on Linux

From the extracted project folder:

```bash
python3 -m http.server 8000 --directory dist
```

Open `http://localhost:8000`. Use a server rather than double-clicking `index.html`, because browsers restrict ES modules on `file://` URLs.

## GitHub and Cloudflare Pages

See [CLOUDFLARE.md](CLOUDFLARE.md) for automatic deployments from this repository. Use build command `npm run build` and output directory `dist`.

## Deploy

Upload the **contents of `dist/`** to the root of your static hosting. No JavaScript package installation or framework build is required to host the already generated files. Use HTTPS for clipboard, service worker and browser security features.

The ChatGPT Sites copy is owner-private. Search engines cannot index content behind that sign-in gate. The downloaded website can be hosted publicly on your own domain without that gate. No domain, DNS, WordPress installation, or existing `nepocore.com` hosting was changed by this project.

### Set the correct public domain before deployment

The generated canonical URLs and sitemap must match the domain where you actually host this copy. Node.js is needed only to regenerate pages after editing or changing the domain:

```bash
SITE_URL=https://nepocore.com/ node scripts/build-static.mjs
```

Replace that example with the exact domain and optional subdirectory you control. Then upload the regenerated `dist/` contents. The generator creates ordinary directories with `index.html` files; no rewrite configuration is required. After public deployment, submit the public `sitemap.xml` address in Google Search Console. SEO structure helps crawling and understanding; rankings and indexing are not guaranteed.

## What changed in version 8

- Replaced the basic expression field/keypad with a complete scientific keypad: direct and inverse trigonometry, powers, roots, logarithms, exponentials, factorial, absolute value, constants, percentages, remainder and explicit session-only Ans. Keyboard input, Enter, Clear all and Backspace work alongside buttons.
- All trig uses **degrees (DEG)**. Inverse trig returns degrees. Undefined values such as tan(90) produce an explanation rather than a misleading radian result. The parser remains bounded and does not evaluate code.
- `%` is now postfix percent (divide by 100), for example `200*10% = 20`. Use `mod` for remainder. This replaces the earlier calculator’s binary `%` interpretation. The interface and guide explain the change.
- Disabled browser-history autocomplete across every tool form, including dynamically added fields. Text inputs also disable automatic capitalization, correction and spellchecking. These attributes request browser behavior; a browser extension or system-level suggestion service can have its own settings. Optional explicit Save on this device records remain available.
- Editing a tool’s inputs hides the outdated result and download controls until it is updated. Calculator edits immediately clear its old answer. Actual checkbox controls retain normal keyboard/checked behavior, consistent sizing and focus indicators; hidden accessibility labels no longer show as visual clutter.
- Browser audit: **227 tool interfaces, 968 input controls, zero missing autocomplete settings**. Degree examples, keypad/keyboard entry, invalid domains, stale-output refresh, permission checkboxes, optional local saving and 320px/390px layouts were exercised. All **88 automated tests** pass.

## What changed in version 7

- All **31 requested additions** are included, bringing the collection to **227 tools across 25 categories**. PDF.js is served locally and loaded only when a PDF rendering tool is used. Puzzle generation runs in workers.
- **35 original practical guides**, with about **16,000 words**, worked examples, primary references, related tools, search and topic pages. Content is pre-rendered into HTML. AI assistance and editorial limits are disclosed.
- **312 static HTML pages**, **310 sitemap URLs**, article structured data, canonical URLs, an RSS feed and a linked policy/footer section.
- Added Cookie & Storage, Disclaimer, Editorial & Corrections, Accessibility Advertising and Application Security pages; expanded About, Contact, Privacy, Terms and FAQ.
- Browser-local table editors, optional explicit saving, backups and exports for money, business and planning tasks. Nepali printable pages include locally bundled Noto fonts and licenses.
- AdSense remains disabled. There is no fake publisher ID, ad-unlock flow or dummy ads.txt entry. Read **ADSENSE_SETUP.md** for public hosting, actual publisher identity, consent/CMP and application steps. Approval cannot be guaranteed.

## What changed in version 6

- All six latest requests are covered without duplicate QR/typing entries: the QR generator now has classic, rounded and dotted styles, custom colors, a clear margin and SVG/PNG export; the existing typing test retains WPM and accuracy.
- Four new tools bring the total to **196 tools** across **24 categories**, with **229 static HTML pages** and **227 sitemap URLs**: text-to-speech, an all-in-one text formatter, an original anime character builder and kids’ printable worksheets.
- The Education section has direct alphabet, math, handwriting and coloring shortcuts. Worksheets offer PDF, PNG, SVG and print; math can include a separate answer key. A4 and US Letter are supported.
- Anime artwork has customizable hair, expressions, outfits, accessories, colors, names and backgrounds, with transparent PNG and editable SVG exports. It is an illustrated character builder, without a paid AI dependency.
- Text-to-speech uses the browser/OS speech engine. Installed voices vary; online voices may contact their provider. The tool labels voice types and handles unavailable voices. No audio-file export is claimed.

## What changed in version 5

- Photo drop areas now show a thumbnail, filename, dimensions/file size and an accessible “Image added” status directly beside the upload controls.
- “Change image” replaces a selection; multi-file tools that build a queue also provide a separate “Add images” action. Invalid replacements preserve the accepted photo, and choosing the same file again works.
- Image downloads open an animated, keyboard-accessible popup with a preview, filename, size, “Keep editing” and an optional “Change image” action. The popup reports that a download started; browsers control its final save location and completion.
- Image controls are disabled while an export is running. Preview URLs are released on replacement, clear and navigation. Reduced motion and dark mode apply to the new controls.

## What changed in version 4

- All **80 additional tools** from the expansion plan are implemented, for **192 tools** across **23 categories**. See `TOOLS.md` for every tool and the exact 80-item coverage checklist.
- **224 static HTML pages** and **222 sitemap URLs**. Every tool has a unique URL, title, description, canonical, guide, example and structured data.
- Tool engines now load on demand. GIF, PCM WAV and file hashing use dedicated workers; workers and camera/microphone tracks stop on navigation.
- The homepage shows a smaller starter collection with a complete all-tools directory, task shortcuts, grouped navigation, cached search tokens and new pastel discovery cards. Offscreen cards use content visibility.
- The supplied logo remains the favicon, app icon and header mark. Mobile layouts and reduced-motion controls remain supported.
- No paid API, account system, database or file-upload server is required. Heavy original background-removal and OCR engines download models only when requested.

## Earlier tool releases (retained)

| Category | Tools |
| --- | --- |
| Image tools (15) | Image converter, Image compressor, Image resizer, Photo cropper, Rotate & flip, Background remover, Image color palette, Image to text · OCR, Photo filter editor, Image to Base64, Base64 to image, Image metadata remover, Photo redactor, Pixel art upscaler, Round profile picture |
| Creator studio (8) | Meme maker, Social image resizer, Screenshot studio, Watermark maker, Favicon maker, Photo collage, Quote card maker, Anime character creator |
| Calculators (29) | Scientific calculator, Percentage calculator, Discount & tax, Loan & EMI calculator, Compound interest, Tip & bill splitter, Age calculator, Date difference, Unit converter, BMI calculator, Aspect ratio, Savings goal, Average & statistics, Fraction calculator, Scientific notation converter, Ratio splitter, Number rounding tool, Time duration calculator, Speed, distance & time, Fuel & trip cost, Electricity cost calculator, Simple interest calculator, Inflation calculator, Return on investment, Break-even calculator, Margin & markup, Salary & wage converter, Add or subtract days, Working days calculator |
| Study & IELTS (12) | IELTS band calculator, IELTS listening score, IELTS reading score, Weighted GPA calculator, Final grade calculator, Reading speed test, Study session planner, Typing speed & accuracy, Spaced-repetition flashcards, Negative marking calculator, APA & MLA citation formatter, Attendance target calculator |
| Text tools (15) | Word & character counter, Text case converter, Text cleaner, Text comparison, Lorem ipsum generator, SRT ↔ VTT converter, Emoji picker, Sort text lines, Reverse text, Find & replace text, Remove Latin accents, HTML to plain text, Text to list, Text to speech, All-in-one text formatter |
| Developer tools (27) | JSON formatter, Base64 encoder / decoder, URL encoder / decoder, Password generator, UUID generator, SHA hash generator, Unix timestamp converter, Color converter, UTM link builder, CSS gradient maker, Glass effect generator, Color contrast checker, Markdown to HTML, JSON to CSV, Number base converter, URL slug generator, HTML entity encoder, Regular expression tester, JWT decoder, CSV to JSON, XML formatter & validator, JSON comparison, Cron expression builder, CSS box-shadow maker, CSS corner radius maker, Fluid font-size generator, Color harmony palette |
| PDF tools (5) | Images to PDF, Merge PDFs, Extract PDF pages, Rotate PDF pages, Add PDF page numbers |
| Everyday essentials (6) | Custom QR code generator, Random name picker, Focus timer, Stopwatch, QR code scanner, Random number generator |
| SEO & web (3) | SEO meta tag generator, robots.txt generator, XML sitemap generator |
| Health & wellness (5) | BMR calculator, TDEE calculator, Macro calculator, Calories burned estimator, Sleep duration planner |
| Pregnancy & periods (5) | Pregnancy due date calculator, Pregnancy week & trimester, Period calendar, Estimated ovulation window, Contraction timer & log |
| Parenting & family (5) | Baby age calculator, Feeding journal, Diaper log, Baby name shortlist, Pregnancy announcement maker |
| Sports & training (10) | Running pace & splits, Cricket required run rate, Tournament bracket generator, Chess clock, Estimated one-rep max, Interval workout timer, Barbell plate calculator, Training volume tracker, Cycling gear calculator, Swimming pace calculator |
| Fun & photo booth (5) | Cuteness meter · just for fun, Photo booth strips, Sticker outline maker, Pet trading-card maker, Couple initials poster |
| Career & business (5) | Resume PDF builder, Cover letter builder, Invoice generator, Freelance hourly-rate calculator, Project quotation builder |
| Nepal tools (5) | BS ↔ AD date converter, Unicode ↔ Preeti converter, NEB grade calculator, Nepali holiday calendar, Number to Nepali words |
| Home & solar (5) | Paint quantity calculator, Tile quantity calculator, Concrete volume calculator, Solar energy estimator, Solar payback calculator |
| Travel & events (5) | Time-zone meeting planner, Group trip expense settlement, Packing checklist, Birthday countdown, Calendar invitation generator |
| Audio & animation (5) | Voice recorder, Audio trimmer, Audio to WAV converter, GIF maker, Subtitle timing shifter |
| Food & cooking (5) | Recipe portion scaler, Ingredient cost calculator, Cost per serving calculator, Coffee brewing ratio, Oven temperature converter |
| Science & electronics (5) | Ohm’s law calculator, Resistor colour decoder, LED resistor calculator, Kinetic energy calculator, Projectile motion simulator |
| Games & practice (5) | eDPI calculator, Mouse sensitivity converter, Reaction-time game, Aim trainer, Memory matching challenge |
| Security & privacy (5) | Passphrase generator, File checksum verifier, Content Security Policy builder, PEM certificate viewer, URL structure inspector |
| Education & worksheets (1) | Kids’ printable worksheets |

## Local AI and OCR

**Background removal:** IMG.LY background removal 1.7.0 and ONNX Runtime Web 1.21.0 use the small `isnet_quint8` model. Runtime/model assets (roughly 40–60 MB) download from IMG.LY’s CDN on first use. Images are processed locally. Slower devices may take a minute or more. Fine hair, glass and complex backgrounds can need manual refinement. Solid-color removal does not need a model or network.

**OCR:** Tesseract.js 7.0.0 uses a local web worker with the 7.0.0 core and English, Nepali, or combined language data. Engine/language assets download from jsDelivr or the configured Tesseract language-data CDN. The image stays on the device. Clear printed text works best; proofread names and numbers. Model and OCR language assets are not bundled into this ZIP.

## Formats and limits

- Image input: browser-readable JPEG, PNG, WebP, GIF, BMP and AVIF; animated images use one frame.
- Image output: JPEG, PNG and WebP where supported. Creator tools export PNG; the favicon maker also exports PNG-encoded ICO.
- HEIC, RAW, PSD, TIFF and animated output are not implemented.
- Images: 25 MB / 24 MP each. PDF processing: 60 MB combined and up to 100 files. Collages: up to nine images. Actual device memory can impose a smaller practical limit.
- PDFs: no password-protected documents, PDF text editing or OCR of PDF pages. Image-to-PDF exports flatten onto white JPEG images.
- Subtitle conversion handles pasted SRT/VTT text. It does not transcribe audio or burn captions into video; SRT drops VTT styling and position settings.
- QR scanning displays decoded text and does not automatically visit the destination. It is not a destination safety checker.
- Markdown export uses a sanitizer and removes scripts, embedded media, styles and form controls from the preview.
- JSON-to-CSV can neutralize formula-like text values. Nested objects remain serialized JSON text.
- New utilities: exact integer fraction arithmetic, large-integer base conversion, credit-weighted GPA, weekend/holiday-aware working days, quoted-field CSV import, bounded regex execution in a worker, JWT decoding, SEO-file generation and CSS previews.
- Pixel art enlargement uses nearest-neighbor scaling, not AI reconstruction. Photo redaction covers one rectangle per export; repeat on the exported copy for more regions. Metadata removal re-encodes pixels without copying original metadata.
- Working days exclude Saturday/Sunday plus entered holidays; this is not an official Nepal holiday calendar. GPA uses grade points and credit weights entered by the visitor.
- The cron builder generates a five-field expression; the study planner generates text. Neither creates scheduled jobs, notifications or calendar events. JWT decoding does not verify signatures.
- Financial calculators are estimates; IELTS raw-score bands are indicative; adult BMI is a screening calculation, not a diagnosis.

## New collection limits and methods

- Health estimates use published formulas with visible assumptions. The BMR/TDEE equations are limited to the adult study range. Macro splits and activity MET/PAL values are entered by the visitor. No clinical review is claimed.
- Pregnancy/cycle dates are estimates, not pregnancy tests or reliable contraception. Contraction, feeding and diaper tools log inputs without clinical interpretation and do not save automatically.
- The cuteness score is randomized entertainment, prominently labelled. It does not infer appearance, personality or health.
- BS dates use a bundled month table: BS2000-01-01–2090-12-30 = AD1943-04-14–2034-04-13. Holiday data covers BS2083 only and retains national/community/regional scopes and undated notices. It needs a new sourced dataset for later years.
- NEB estimates use the named 2078 directive/fourth amendment2081, grade theory/internal components separately, require entered actual component credits, and do not average an NG as zero.
- Preeti conversion is encoding conversion; the destination document needs a Preeti font. No proprietary font is bundled.
- New audio inputs are capped at20MB,10minutes and12million decoded mono/stereo samples; output is PCM16 WAV. Voice recording is capped at five minutes. GIF creation uses2–20 frames, at most50MB combined, with256–768px square output.
- The certificate viewer parses one public certificate, including SAN/date/fingerprint fields. It does not verify trust chains or revocation. File hash verification is not a malware scan. URL inspection does not visit or reputation-check the URL.
- Resume, letter, invoice and quote tools support printable documents with browser Print / Save PDF and standalone HTML downloads. Tax, legal requirements and employment outcomes are not inferred.
- Flashcards and packing checklists offer explicit optional local saving. Other new journals are session-only. Timers are in-page tools and do not create background automations.

## Privacy

Images, PDFs and text remain in browser memory. Theme, motion, layout and favorites use local storage. Flashcards, packing lists, habits and the new planning tables use local storage only if the visitor opts in. Reproductive/family journals stay in memory unless exported. Camera and microphone access is explicit and streams stop on cleanup. A service worker caches the static interface. Optional model/engine asset hosts receive ordinary request metadata, but not your images. This version contains no analytics or advertising scripts. The Contact link opens the visitor’s email app for `admin@nepocore.com`.

## Edit and build

| File or folder | Purpose |
| --- | --- |
| `src/shell.html` | HTML shell used by the static generator |
| `scripts/build-static.mjs` | Generate page HTML, SEO metadata, sitemap and robots.txt |
| `dist/app.mjs` | Client navigation, search, favorites, theme and motion controls |
| `dist/views.mjs` | Shared server/client HTML rendering |
| `dist/content.mjs` | Unique guides, examples and metadata/schema definitions |
| `dist/blog.mjs`, `dist/blog-content/` | Guide rendering, original articles and primary references |
| `dist/pro-data.mjs`, `dist/collections/plus-*.mjs` | All 31 version 7 tools and helpers |
| `src/publishing.json`, `ADSENSE_SETUP.md` | Disabled publisher configuration and owner setup steps |
| `dist/catalog.mjs` | Tools, categories and SVG icons |
| `dist/core.mjs`, `dist/extra-core.mjs`, `dist/advanced-core.mjs` | Pure calculations and format utilities |
| `dist/toolkit.mjs` | Original calculators/text/developer tools and timers |
| `dist/media.mjs`, `dist/creative.mjs` | Image, OCR, creator and PDF tools |
| `dist/extras.mjs` | Design, Markdown, subtitle and data tools |
| `dist/advanced.mjs`, `dist/pdf-core.mjs` | The 52 additional tools and PDF transforms |
| `dist/expansion-data.mjs` | Earlier expansion tool entries and guides |
| `dist/collections-data.mjs`, `dist/collections/` | All 80 new tools, pure helpers, local datasets and workers |
| `dist/collection-sources.mjs` | Health, Nepal, security and other primary source links |
| `scripts/build-icons.py` | Export all favicon/app sizes from the original supplied logo |
| `dist/ui.mjs`, `dist/styles.css` | Forms, outputs, downloads and responsive styling |
| `dist/info.mjs` | Information page content |
| `dist/sw.js` | Offline cache; increase its cache version after significant releases |
| `dist/assets/` | Sharing card, fonts, vendor code and license notices |

After editing source modules or guides:

```bash
SITE_URL=https://your-actual-domain.example/ node scripts/build-static.mjs
node --test tests/*.test.mjs
python3 scripts/package-downloads.py
```

The package script creates the source download inside the site and an outer project ZIP. `scripts/build-icons.py` exports the supplied logo at browser/app sizes. `scripts/build-social-card.py` optionally regenerates the supplied social preview image; it requires Pillow and the documented DejaVu font files, and is not part of hosting or the normal static build.

## Verification

Version 7 security checks also exercised hostile Markdown markup and SVG text: no forbidden preview nodes or injected handlers remained, and card PNG export still succeeded. SECURITY.md records the bounded review scope.

Version 7 browser checks covered all 31 new interfaces, defaults for the calculation/table tools, puzzle generation, room dragging with saved coordinates, habit marks, guide search/navigation, dark theme, and narrow 390px iframe layouts (375px content width) without document overflow. Uploaded fixtures produced passport sheets, pixel art, comics and a drawn signature, with immediate upload confirmation and the download popup. A two-page PDF rendered to images, extracted the expected text, and completed both structure and image-based copies with actual size reporting. Nepali letter pages rendered with bundled fonts and prepared a PDF link. HMAC uses native SubtleCrypto and passes the RFC 4231 vector/verification tests; the HTTP preview correctly blocks it because a secure context is required. Native blob-download completion reporting remains unreliable in the cloud browser, so output preparation and independent byte checks are distinguished from physical-device download/print tests.


88 automated tests cover the original calculations and SEO checks, all 80 promised additions, formula references, pregnancy-date boundaries, exact expense settlement, circuit identities, plate allocation, time-zone transitions, all supported BS month boundaries, scoped holiday dates, NEB component minima, Preeti round trips, WAV bytes, subtitle shifts, CSP validation and real public-certificate parsing.

Browser checks visited all 80 added tool interfaces, exercised calculation defaults, journals, bracket completion, chess switching/reset, interval completion, typing accuracy, flashcard grading and full memory-game completion. Uploaded fixtures produced all photo cards/stickers/strips, three-frame GIFs, WAV conversion/trimming, file hashes and parsed certificates. Existing module types were also rechecked after introducing lazy loading.

Version 6 checks exercised all four worksheet PNG export actions, character customization and a transparent PNG export, text formatting/counts, Education shortcuts and 320px/390px layouts. Actual classic, rounded and corrected dotted QR PNGs decoded successfully with jsQR. PDF byte tests reopen both pages with embedded artwork and exact A4/Letter sizes. The cloud browser had no speech voices, so audible playback was not verified; its no-voice error/recovery UI was checked. The browser does not consistently report PDF download events, so direct PDF preparation was checked alongside byte validation.

Version 5 browser checks covered immediate upload previews, invalid-file recovery, same-file replacement, clear/reset, photo-booth and image-to-PDF add/replace queues, GIF generation, downloaded JPEG/PNG files, the download popup, Escape/focus restoration, and 320px/390px iframe layouts. Native file-picker cancellation and physical-device behavior were not exercised.

Live camera/microphone hardware was not exercised in the preview environment. Those controls require an explicit visitor action, supported HTTPS browser and granted device permission. Upload-based photo workflows were tested. Native print-to-PDF depends on the browser’s print dialog; document previews and standalone HTML output were checked. PDF byte generation is tested independently; the preview browser does not consistently report PDF download events. These are verification limits, not claims of universal device support.

## Licenses

The application is **AGPL-3.0**; see `LICENSE`. When redistributing or modifying and hosting the application, preserve notices and provide its corresponding source. Regenerate the footer’s `source.zip` after changing the website.

- IMG.LY background removal 1.7.0: AGPL-3.0 — https://github.com/imgly/background-removal-js
- ONNX Runtime Web 1.21.0: MIT — https://github.com/microsoft/onnxruntime
- qrcode-generator 2.0.4: MIT notice retained in its source.
- pdf-lib 1.17.1: MIT; included notice.
- @noble/hashes 1.8.0: MIT; included notice.
- Tesseract.js 7.0.0 and core: Apache-2.0; included JavaScript notice and upstream language/model licensing applies to downloaded assets.
- jsQR 1.4.0: Apache-2.0; included notice.
- marked 18.1.2: MIT; included notice.
- DOMPurify 3.4.17: its included Apache-2.0/MPL-2.0 licensing notice.
- DM Sans and Manrope: SIL Open Font License; included notices.

Additional vendored data/code:

- modern-gif2.1.0 and modern-palette2.0.0: MIT; included notices. GIF encoding runs in our own disposable worker.
- @peculiar/x5092.0.0 standalone browser parser: MIT; reflect-metadata0.2.2: Apache-2.0. The v2 standalone artifact is retained because upstream v3 removed it. The parser import was adapted to local ESM, with strict outer-DER length validation added by this app.
- EFF short word list:1,296 words, EFF/Joseph Bonneau, CC BY4.0 under EFF’s published copyright policy; included attribution. Six uniformly random words provide approximately62bits of word-choice entropy.
- Nepali date table from nepali-date-converter3.4.0: MIT; included notice.
- @lacspace/preeti1.1.0 and @lacspace/nepal-holidays1.0.0 data: Lacspace Free Licence v1.0, a custom permissive license; included full notices. Do not relabel these as MIT.
- Nepali number vocabulary derived from kushal1o1/nepali-num2word: MIT; included notice; selected common-spelling normalization.

Vendored dependencies retain their own copyright headers. Background-removal package imports were adjusted to the included ONNX browser module. Tesseract’s worker is served locally; its core and language assets load when requested.

- PDF.js 6.4.299 and bundled auxiliary assets: Apache-2.0 and retained third-party notices, served locally.
- Noto Sans Devanagari 2.007: SIL Open Font License 1.1; bundled original font subsets, license and provenance.


## Design refresh — Everyday, upgraded

The shared interface uses `dist/design.css` and `dist/design.mjs`, with a redesigned homepage, tool collections, favorites, browser-local recent history, light/dark themes, and CSS dimensional accents. Tool processing and the original guide content remain available. The standalone Worksheet Studio uses `dist/worksheets/refresh.css`.

Editable desktop and mobile design: https://www.figma.com/design/fdmOVyOGabIQbhgziZfSA2

Set `SITE_URL` to the deployment origin before building. `npm run build` prepares the static site, Worksheet Studio, and corresponding source download. Cloudflare Pages uses `dist` as the output folder.


## Everyday workshop design

The interface uses an editorial, paper-and-ink layout with a horizontal header, an accessible collection drawer, clickable CSS tool objects, a category index, and a creative studio panel. Shared styling in `dist/design.css` covers the tool workspaces, catalogue, guides and light/dark themes. Run `npm run build` before deployment to regenerate every static page from `src/shell.html`.
