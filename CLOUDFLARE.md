# Connect Nepocore to Cloudflare Pages

Create a Cloudflare Pages project using this GitHub repository.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root (leave blank) |
| Node.js | 22 (also set in `.nvmrc`) |
| Environment variable | `SITE_URL=https://nepocore.com/` |

Cloudflare must be granted access to this private repository when you connect it.
After connecting, commits pushed to `main` trigger Cloudflare builds automatically.
The build regenerates static pages, worksheets, canonical URLs, sitemap and the
corresponding source-code download. Python 3 is required for source packaging.

## Edit and verify

Edit application modules and styling in `dist/`, shared HTML in `src/shell.html`,
and guide content in `dist/blog-content/`. Generated page HTML is overwritten by
the build, so change its generator or content module instead.

```bash
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

The repository does not need API secrets or a database. AdSense is disabled;
follow `ADSENSE_SETUP.md` if you decide to configure it later.

This setup does not change your existing Cloudflare deployment or domain. Connect
and verify the new Pages project before moving `nepocore.com` to it.

## Canonical hostname

The sitemap and page canonicals use `https://nepocore.com`. The Pages build
also sends a canonical HTTP Link for requests on `www.nepocore.com`.

For a permanent redirect, add a Cloudflare Single Redirect for
`http.host eq "www.nepocore.com"` with status 301. Use the dynamic target
`concat("https://nepocore.com", http.request.uri.path)` and enable **Preserve query string**.
Pages' `_redirects` file accepts path rules and cannot match source hostnames.
