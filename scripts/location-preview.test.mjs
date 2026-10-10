import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { mkdtempSync, readFileSync, rmSync, mkdirSync, symlinkSync, existsSync, realpathSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { isWithinPath, assertPreviewDestination } from './location-preview-paths.mjs';

test('containment distinguishes dot-prefixed children from actual parent traversal', () => {
  const root = resolve('/tmp/preview-guard');
  for (const name of ['', 'normal', '..preview', '..draft', '..preview/nested']) assert.equal(isWithinPath(root, resolve(root, name)), true, name);
  for (const path of [resolve(root, '..'), resolve(root, '../sibling'), `${root}-sibling`]) assert.equal(isWithinPath(root, path), false, path);
});

test('guard rejects protected dot-prefixed and symlink destinations without writing output', async () => {
  const scratch = mkdtempSync(resolve(tmpdir(), 'daivik-path-guard-'));
  const root = resolve(scratch, 'repo');
  mkdirSync(resolve(root, 'app'), {recursive:true});
  mkdirSync(resolve(root, 'public'));
  for (const name of ['app', 'public', 'repo']) symlinkSync(name === 'repo' ? root : resolve(root, name), resolve(scratch, `${name}-link`), 'dir');
  try {
    for (const output of [resolve(root, 'app/..preview'), resolve(root, 'public/..preview'), resolve(scratch, 'app-link/..preview'), resolve(scratch, 'public-link/..preview')]) {
      await assert.rejects(assertPreviewDestination(output, root, false), /outside app\/ and public\//);
      assert.equal(existsSync(output), false);
    }
    for (const output of [resolve(root, '..draft'), resolve(scratch, 'repo-link/..draft')]) {
      await assert.rejects(assertPreviewDestination(output, root, true), /outside the repository/);
      assert.equal(existsSync(output), false);
    }
    await assert.rejects(assertPreviewDestination(root, root, false), /outside app\/ and public\//);
    assert.equal(await assertPreviewDestination(resolve(scratch, '..outside'), root, true), resolve(realpathSync(scratch), '..outside'));
  } finally { rmSync(scratch, {recursive:true, force:true}); }
});

for (const path of ['app', 'public', 'app/test-preview', 'public/test-preview']) {
  test(`preview rejects ${path} before rendering or writing`, () => {
    const result = spawnSync(process.execPath, ['scripts/location-page.preview.mjs', resolve(path)], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /outside app\/ and public\//);
  });
}
test('Airport Road draft is visibly unpublished and default remains synthetic', () => {
  const output = mkdtempSync(resolve(tmpdir(), 'daivik-draft-test-'));
  try {
    const draft = spawnSync(process.execPath, ['scripts/location-page.preview.mjs', output, '--airport-road'], {encoding:'utf8'});
    assert.equal(draft.status, 0, draft.stderr);
    const html = readFileSync(resolve(output, 'index.html'), 'utf8');
    assert.match(html, /Draft preview: Devanahalli \/ Airport Road/);
    assert.match(html, /Local publication evidence pending/);
    assert.match(html, /noindex,nofollow/);
    assert.ok(html.includes('href="https://www.daivikborewells.com/"'));
    assert.ok(html.includes('href="https://www.daivikborewells.com/#projects"'));
    assert.ok(html.includes('href="#location-main"'));
    assert.ok(html.includes('href="./fixture.css"'));
    assert.ok(html.includes('src="./images/hero-user.webp"'));
    assert.doesNotMatch(html, /<a\b[^>]*\bhref="\/(?!\/)/);
    const standard = spawnSync(process.execPath, ['scripts/location-page.preview.mjs', output], {encoding:'utf8'});
    assert.equal(standard.status, 0, standard.stderr);
    assert.match(readFileSync(resolve(output, 'index.html'), 'utf8'), /Synthetic Aerospace/);
    assert.ok(readFileSync(resolve(output, 'index.html'), 'utf8').includes('href="/#projects"'));
  } finally { rmSync(output, {recursive:true, force:true}); }
});
