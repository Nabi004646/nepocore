import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const tag = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-R6E4FXVHNG"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-R6E4FXVHNG');
</script>`;
let pages = 0;
async function install(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await install(file); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.html')) continue;
    let html = await readFile(file, 'utf8');
    if (!/<head\b/i.test(html)) throw Error(`Missing head in ${file}`);
    // Make repeated builds safe without adding a second loader or config call.
    if (!html.includes(tag)) {
      if (/googletagmanager\.com\/gtag\/js|gtag\s*\(\s*['"]config['"]/.test(html)) {
        throw Error(`Review existing Google tag before installing in ${file}`);
      }
      html = html.replace(/(<head\b[^>]*>\s*(?:<meta\s+charset\s*=\s*["'][^"']+["']\s*>\s*)?)/i, `$1\n${tag}\n`);
      await writeFile(file, html);
    }
    pages++;
  }
}
await install(dist);
if (!pages) throw Error('No HTML pages found for Google tag installation');
console.log(`Google tag G-R6E4FXVHNG installed once in the head of ${pages} pages.`);
