import './location-tsx-loader.mjs';
import { registerHooks } from 'node:module';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { locationFixture } from './location-page.fixture.mjs';
import * as catalogue from '../data/locations.ts';
import { brand, serviceNames } from '../data/site.ts';

let published = [];
const fixture = { ...locationFixture, aliases: ['synthetic-alias'] };
globalThis.__locationTestPublished = () => published;
registerHooks({
  resolve(specifier, context, next) {
    if (specifier === '@/data/locations') return { url: 'location-test:catalogue', shortCircuit: true };
    if (specifier === 'next/navigation') return { url: 'location-test:navigation', shortCircuit: true };
    return next(specifier, context);
  },
  load(url, context, next) {
    if (url === 'location-test:catalogue') return { format: 'module', shortCircuit: true, source: 'export const getPublishedLocations = () => globalThis.__locationTestPublished(); export const getPublishedLocation = slug => getPublishedLocations().find(record => record.slug === slug);' };
    if (url === 'location-test:navigation') return { format: 'module', shortCircuit: true, source: 'export function notFound() { throw new Error("NEXT_HTTP_ERROR_FALLBACK;404"); }' };
    return next(url, context);
  },
});
const props = slug => ({ params: Promise.resolve({ slug }) });

test('publication gate agrees across params, route, metadata, hub and sitemap', async () => {
  const route = await import('../app/service-areas/[slug]/page.tsx');
  const { default: sitemap } = await import('../app/sitemap.ts');
  const { default: Hub } = await import('../app/service-areas/page.tsx');
  assert.equal(catalogue.locationRecords.length, 16);
  assert.equal(catalogue.getPublishedLocations().length, 0);
  assert.equal(route.dynamicParams, false);
  assert.deepEqual(route.generateStaticParams(), []);
  assert.equal(sitemap().length, 3);
  assert.doesNotMatch(renderToStaticMarkup(Hub()), /href="\/service-areas\//);
  for (const slug of [...catalogue.locationRecords.map(record => record.slug), 'unknown', fixture.slug]) {
    await assert.rejects(route.default(props(slug)), /;404/);
    await assert.rejects(route.generateMetadata(props(slug)), /;404/);
  }
  published = [fixture];
  try {
    assert.deepEqual(route.generateStaticParams(), [{ slug: fixture.slug }]);
    assert.deepEqual(sitemap().map(entry => entry.url), ['/', '/borewell-services', '/service-areas', `/service-areas/${fixture.slug}`].map(path => brand.url + path));
    assert.match(renderToStaticMarkup(Hub()), new RegExp(`href="/service-areas/${fixture.slug}"`));
    for (const slug of [fixture.aliases[0], 'unknown', 'airport-road']) {
      await assert.rejects(route.default(props(slug)), /;404/);
      await assert.rejects(route.generateMetadata(props(slug)), /;404/);
    }
    const url = `${brand.url}/service-areas/${fixture.slug}`;
    const metadata = await route.generateMetadata(props(fixture.slug));
    assert.equal(metadata.alternates.canonical, url);
    assert.equal(metadata.openGraph.url, url);
    assert.equal(metadata.title.absolute, `Borewell Drilling in ${fixture.name} | Daivik Borewells`);
    assert.equal(metadata.alternates.languages['en-IN'], url);
    assert.ok(metadata.description.includes(fixture.name));
    assert.equal(metadata.openGraph.images[0].url, `${brand.url}/images/hero-user.webp`);
    assert.deepEqual(metadata.twitter.images, [`${brand.url}/images/hero-user.webp`]);
    const html = renderToStaticMarkup(await route.default(props(fixture.slug)));
    for (const text of ['9448417318', ...serviceNames, ...fixture.coverageLabels]) assert.ok(html.includes(text), text);
    for (const href of ['/', '/service-areas', '/borewell-services', '/#site-visit', '/#projects', 'tel:+919448417318']) assert.ok(html.includes(`href="${href}"`), href);
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const graph = schema['@graph'];
    assert.deepEqual(graph.map(item => item['@type']).sort(), ['Organization', 'WebSite', 'WebPage', 'Service', 'BreadcrumbList'].sort());
    assert.equal(graph.find(item => item['@type'] === 'WebPage').url, url);
    const service = graph.find(item => item['@type'] === 'Service');
    assert.equal(service.provider['@id'], `${brand.url}/#business`);
    assert.deepEqual(service.areaServed.map(item => item.name), fixture.coverageLabels);
    assert.deepEqual(graph.find(item => item['@type'] === 'BreadcrumbList').itemListElement.map(item => [item.position, item.name, item.item]), [[1, 'Home', `${brand.url}/`], [2, 'Service areas', `${brand.url}/service-areas`], [3, fixture.name, url]]);
  } finally { published = []; }
});

test('real public selector rejects an approved record alias', () => {
  catalogue.locationRecords.push(fixture);
  try {
    assert.equal(catalogue.getPublishedLocation(fixture.slug), fixture);
    assert.equal(catalogue.getPublishedLocation(fixture.aliases[0]), undefined);
    assert.equal(catalogue.getPublishedLocation('unknown'), undefined);
  } finally { catalogue.locationRecords.splice(catalogue.locationRecords.indexOf(fixture), 1); }
  assert.equal(catalogue.getPublishedLocations().length, 0);
});
