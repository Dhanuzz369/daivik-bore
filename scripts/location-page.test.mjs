import './location-tsx-loader.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { locationFixture } from './location-page.fixture.mjs';

test('actual location component renders contacts, services and approved content without redirects', async () => {
  assert.ok(existsSync(new URL('../components/LocationPage.tsx', import.meta.url)), 'LocationPage component must exist');
  const { LocationPage } = await import('../components/LocationPage.tsx');
  const html = renderToStaticMarkup(createElement(LocationPage, { location: locationFixture }));
  assert.match(html, /9448417318/);
  for (const href of ['tel:+919448417318', 'mailto:daivikborewells@gmail.com', '/', '/borewell-services', '/service-areas', '/#site-visit', '/#projects']) {
    assert.ok(html.includes(`href="${href}"`), `Missing ${href}`);
  }
  assert.match(html, /href="https:\/\/wa.me\/919448417318/);
  for (const service of ['Borewell drilling', 'Compact borewell drilling', 'Robo borewell drilling', 'Groundwater site assessment', 'Borewell casing installation', 'Borewell deepening', 'Submersible pump installation']) assert.ok(html.includes(service), service);
  for (const text of [locationFixture.name, locationFixture.introduction, locationFixture.sections[0].heading, locationFixture.sections[0].body, locationFixture.questions[0].question, locationFixture.questions[0].answer]) assert.ok(html.includes(text), text);
  assert.match(html, /href="\/#projects"[^>]*>[^<]*Service scenarios/);
  assert.match(html, /hero-user/);
  assert.match(html, /<footer/);
  assert.match(html, /aria-label="Quick contact"/);
  assert.match(html, /Prepare for your site visit/);
  assert.doesNotMatch(html, /<script|http-equiv="refresh"|window\.location|opacity:0/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
});
