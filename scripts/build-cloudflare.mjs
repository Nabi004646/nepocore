import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const cwd = fileURLToPath(new URL('../', import.meta.url));
const env = { ...process.env, SITE_URL: process.env.SITE_URL || 'https://nepocore.com/' };
for (const [command, args] of [
  [process.execPath, ['scripts/build-static.mjs']],
  [process.execPath, ['scripts/build-worksheets.mjs']],
  [process.execPath, ['scripts/build-geo.mjs']],
  [process.execPath, ['scripts/build-discovery.mjs']],
  [process.execPath, ['scripts/install-google-tag.mjs']],
  ['python3', ['scripts/package-downloads.py']],
  ['python3', ['scripts/audit-seo.py']],
]) {
  const result = spawnSync(command, args, { cwd, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status || 1);
}
