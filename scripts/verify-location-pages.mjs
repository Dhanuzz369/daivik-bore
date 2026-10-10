import './location-tsx-loader.mjs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { getPublishedLocations, locationRecords } from '../data/locations.ts';
import { brand } from '../data/site.ts';

const base = process.argv[2] || 'http://localhost:3001';
const published = getPublishedLocations();
const expected = ['/', '/borewell-services', '/service-areas', ...published.map(record => `/service-areas/${record.slug}`)].map(path => brand.url + path);
const sitemapResponse = await fetch(`${base}/sitemap.xml`);
assert.equal(sitemapResponse.status, 200);
const xml = await sitemapResponse.text();
const parsed = spawnSync('python3', ['-c', 'import sys,json,xml.etree.ElementTree as ET; root=ET.fromstring(sys.stdin.read()); ns="{http://www.sitemaps.org/schemas/sitemap/0.9}"; assert root.tag == ns+"urlset"; print(json.dumps([node.text for node in root.findall(ns+"url/"+ns+"loc")]))'], { input: xml, encoding: 'utf8' });
assert.equal(parsed.status, 0, `Malformed sitemap XML: ${parsed.stderr}`);
assert.deepEqual(JSON.parse(parsed.stdout), expected);
const robots = await fetch(`${base}/robots.txt`);
assert.equal(robots.status, 200);
assert.ok((await robots.text()).includes(`${brand.url}/sitemap.xml`));
const hub = await (await fetch(`${base}/service-areas`)).text();
const links = [...new Set([...hub.matchAll(/href="(\/service-areas\/[^"#?]+)"/g)].map(match => match[1]))];
assert.deepEqual(links.sort(), published.map(record => `/service-areas/${record.slug}`).sort());
for (const slug of new Set(['unknown-location', 'synthetic-test-only', ...locationRecords.filter(record => !published.includes(record)).map(record => record.slug), ...locationRecords.flatMap(record => record.aliases)])) {
  assert.equal((await fetch(`${base}/service-areas/${slug}`)).status, 404, slug);
}
for (const record of published) {
  const url = `${brand.url}/service-areas/${record.slug}`;
  const response = await fetch(`${base}/service-areas/${record.slug}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.ok(html.includes(`rel="canonical" href="${url}"`));
  assert.ok(html.includes(`property="og:url" content="${url}"`));
  assert.ok(html.includes(`property="og:image" content="${brand.url}/images/hero-user.webp"`));
  assert.ok(html.includes(`name="twitter:image" content="${brand.url}/images/hero-user.webp"`));
}
console.log(`Location HTTP regression passed: ${published.length} published; sitemap ${expected.length}; pending/aliases/unknown 404.`);
