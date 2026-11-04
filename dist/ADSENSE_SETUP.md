# Nepocore: publishing and AdSense preparation

Prepared 28 October 2026. This is an implementation handoff, not a guarantee of approval or a substitute for the publisher’s policy and legal obligations.

## Included in this release

- 227 working browser tools across 25 categories, including the full 31-tool addition.
- 35 original practical guides (about 16,000 words in total), each with a specific task, worked examples, limitations, relevant tool links and primary references. Article count is a project choice, not a Google requirement.
- Crawlable static article and tool HTML; unique titles and descriptions; canonical URLs; BlogPosting, WebApplication and breadcrumb data; sitemap; robots file; RSS feed; mobile layouts and accessible navigation.
- About, Contact, Privacy, Terms, FAQ, Cookie & Storage, Disclaimer, Editorial & Corrections, Accessibility, Application Security and Advertising pages. Privacy is a published Google requirement; the other trust pages support a clear, useful site and are not all universally mandated AdSense pages.
- No ad scripts, ad placeholders, affiliate links, analytics, invented publisher IDs or fabricated ads.txt entry. Downloads remain ungated. The logo and favicon are retained.

## What the owner must do before applying

1. **Choose the actual public site and account.** The ChatGPT Sites copy remains owner-private, preserving its existing access. Google cannot review a site hidden behind that sign-in gate. Host the downloaded `dist/` contents on a publicly accessible domain you control, or explicitly change the hosting audience separately. Do not submit the private preview as a public review URL. Confirm the contact mailbox works and replace any project details that do not describe your operation.
2. **Set the real domain.** Run `SITE_URL=https://your-domain.example/ node scripts/build-static.mjs` with the actual production root. Upload the regenerated `dist/` contents. Check direct article URLs, 404 behavior, HTTPS, mobile layouts, downloads, navigation and external references. Submit the real sitemap in Search Console if appropriate. Indexing and ranking are not guaranteed.
3. **Use the eligible publisher’s actual AdSense account.** Complete Google’s account, ownership, identity, address, payment and other applicable checks. Do not create duplicate accounts to work around a rejection. The application and review status belong to Google and the account holder.
4. **Set ownership metadata when Google requests it.** In `src/publishing.json`, replace the empty `publisherId` with the real `ca-pub-` ID followed by 16 digits. Keep `advertisingEnabled` false. Rebuild. This produces ownership metadata and an `ads.txt` entry for that actual publisher; it does not load ads. Never deploy sample IDs. Confirm the final `ads.txt` root and publisher relationship are correct for the actual account. Google describes ads.txt as recommended, not a universal approval prerequisite.
5. **Prepare consent and disclosures before ad requests.** Choose and configure the actual vendors and applicable privacy/consent controls. For personalized Google ads in the EEA, UK and Switzerland, use a Google-certified CMP integrated with the IAB TCF. Other ad modes can have different eligibility, but do not remove applicable consent obligations. A hand-built cookie banner is not a certified CMP. Update Privacy and Cookies with the actual purposes, vendors, retention details and consent withdrawal route. Do not claim a consent panel exists before it is implemented.
6. **Review the whole site and placement scope.** Google may review every page. The planned first ad scope is suitable general-audience blog pages after review. This conservative project choice keeps tool controls, upload/download areas, dialogs, empty/error screens, games and child-oriented activities out of the initial integration. Do not add ordinary AdSense “watch an ad to download” or misleading download buttons. Privacy and cookie policy pages must remain free of ad and CMP tags.
7. **Implement and test the actual ad integration separately.** This release deliberately refuses `advertisingEnabled: true`; an actual consent-aware placement implementation is still required. Do not simply paste an automatic ad script into every page. Test consent states, withdrawal, mobile overlap, keyboard use and script failures with the actual account setup. Follow current age-treatment guidance; do not copy deprecated TFUA/TFCD snippets without checking Google’s current instructions.
8. **Request review and respond to the actual decision.** There is no published fixed minimum article count, word count, domain age or traffic number in the cited eligibility page that guarantees acceptance. Original useful content, functionality, navigation, compliant traffic and account eligibility matter. Follow the specific issues in the AdSense dashboard if Google requests changes. Continue maintaining references, tools and notices after approval.

## Current source configuration

`src/publishing.json` is empty of publisher credentials and keeps advertising disabled. The build validates the publisher ID format, generates metadata only when a real ID is supplied, and generates no `ads.txt` when the ID is empty. No ad or CMP JavaScript is generated. A well-formed ID is not proof of ownership; use only the ID from your account.

Public hosting, account verification, CMP selection/consent configuration, production ad placement and Google’s review cannot be completed from a static code package alone. No AdSense application has been submitted through this project.

## Official references checked for this preparation

- [Eligibility and original content](https://support.google.com/adsense/answer/9724?hl=en)
- [Making pages ready for AdSense](https://support.google.com/adsense/answer/7299563?hl=en-GB)
- [Common approval issues and whole-site review](https://support.google.com/adsense/answer/81904?hl=en)
- [Site access and review](https://support.google.com/adsense/answer/161351?hl=en)
- [Required privacy content](https://support.google.com/adsense/answer/1348695?hl=en)
- [Publisher privacy disclosures](https://support.google.com/publisherpolicies/answer/10437794?hl=en)
- [Privacy-policy URL and script-tag restrictions](https://support.google.com/adsense/answer/10961370?hl=en)
- [Google-certified CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en)
- [EU user consent policy](https://support.google.com/adsense/answer/7670013?hl=en)
- [Age-treatment settings](https://support.google.com/adsense/answer/9007197?hl=en)
- [ads.txt setup](https://support.google.com/adsense/answer/12171612?hl=en-EN)
- [Site ownership and connection](https://support.google.com/adsense/answer/7584263?hl=en)
- [Ad placement policies](https://support.google.com/adsense/answer/1346295?hl=en)
- [AdSense program policies](https://support.google.com/adsense/answer/48182?hl=en)

Policies can change. Check the current account guidance again when enabling advertising.

## Worksheet Studio addition — November 4, 2026

The new `/worksheets/` studio includes five browser-local generators, direct PDF export, print CSS, answer previews, a weekly pack, five crawlable generator pages and three original product usage guides. Run `SITE_URL=https://nepocore.com/ node scripts/build-static.mjs` followed by `SITE_URL=https://nepocore.com/ node scripts/build-worksheets.mjs` to regenerate. The second command preserves existing tools and adds a visible homepage discovery link.

Advertising remains disabled. Do not treat the studio or its child-oriented worksheets as a ready-made ad placement. Review audience treatment and place any approved advertising appropriately for the actual audience. There is no certified CMP or live ad integration in this release. The owner must supply their genuine publisher ID and configure consent before ad serving, including the UK/EEA requirements. Existing policy pages and ownership metadata should be reviewed against the actual operator and vendors.

The Sites copy remains owner-private. The Cloudflare upload ZIP contains the full public site with canonical URLs for nepocore.com and includes existing tools. Upload it to the existing Pages project to keep the domain connection. No DNS or production hosting was changed by preparing this archive. Keep the current deployment available for rollback.
