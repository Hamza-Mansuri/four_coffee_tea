import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { checkProductionBuild, checkPublicFiles } from './verify-public-build.mjs';

async function fixture(t) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'gomzi-public-build-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return {
    root,
    async put(filename, content = '') {
      const destination = path.join(root, filename);
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, content);
    },
  };
}

test('allows public images, fonts and PDFs', async (t) => {
  const f = await fixture(t);
  for (const filename of ['photo.webp', 'brand.svg', 'inter.woff2', 'brochure.pdf']) {
    await f.put(`public/assets/${filename}`);
  }
  await checkPublicFiles(f.root);
});

for (const filename of ['assets/.env.production.local', 'assets/page.tsx', 'app.js.map', 'assets/signing.key', 'backup.sql', 'backend/server.js', '.git/config', '.next/server/app.js']) {
  test(`rejects accidental public exposure of ${filename}`, async (t) => {
    const f = await fixture(t);
    await f.put(`public/${filename}`);
    await assert.rejects(checkPublicFiles(f.root), /outside public/);
  });
}

test('rejects public symlinks to private files', async (t) => {
  const f = await fixture(t);
  await f.put('private/file.txt', 'fixture-only');
  await mkdir(path.join(f.root, 'public'));
  await symlink(path.join(f.root, 'private'), path.join(f.root, 'public', 'assets'), process.platform === 'win32' ? 'junction' : 'dir');
  await assert.rejects(checkPublicFiles(f.root), /symlinks/);
});

test('allows private server maps while checking clean browser bundles', async (t) => {
  const f = await fixture(t);
  await f.put('.next/required-server-files.json', JSON.stringify({ config: { productionBrowserSourceMaps: false } }));
  await f.put('.next/static/chunks/app.js', 'console.log("public");');
  await f.put('.next/server/app.js.map', '{}');
  await checkProductionBuild(f.root);
});

for (const [filename, content] of [
  ['app.js.map', '{}'],
  ['app.js', 'console.log("public");\n//# sourceMappingURL=app.js.map'],
  ['app.js', '//# sourceMappingURL=data:application/json;base64,e30='],
  ['app.css', 'body{}/*# sourceMappingURL=app.css.map */'],
]) {
  test(`rejects browser map exposure in ${filename}: ${content.slice(0, 28)}`, async (t) => {
    const f = await fixture(t);
    await f.put('.next/required-server-files.json', JSON.stringify({ config: { productionBrowserSourceMaps: false } }));
    await f.put(`.next/static/chunks/${filename}`, content);
    await assert.rejects(checkProductionBuild(f.root), /source map/);
  });
}

test('rejects a build that enables browser source maps', async (t) => {
  const f = await fixture(t);
  await f.put('.next/required-server-files.json', JSON.stringify({ config: { productionBrowserSourceMaps: true } }));
  await assert.rejects(checkProductionBuild(f.root), /must be disabled/);
});

test('fails when production browser output is missing', async (t) => {
  const f = await fixture(t);
  await f.put('.next/required-server-files.json', JSON.stringify({ config: { productionBrowserSourceMaps: false } }));
  await assert.rejects(checkProductionBuild(f.root), { code: 'ENOENT' });
});
