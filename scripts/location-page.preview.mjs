// Generate a standalone, no-JS fixture outside public/ and app/.
import './location-tsx-loader.mjs';
import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { locationFixture } from './location-page.fixture.mjs';
import { locationRecords } from '../data/locations.ts';
import { brand } from '../data/site.ts';
import { assertPreviewDestination } from './location-preview-paths.mjs';

const output = resolve(process.argv[2] || '/tmp/daivik-location-fixture');
const root = fileURLToPath(new URL('../', import.meta.url));
const airportDraft = process.argv.includes('--airport-road');
await assertPreviewDestination(output, root, airportDraft);
const { LocationPage } = await import('../components/LocationPage.tsx');
const css = await postcss([tailwind()]).process(await readFile('app/globals.css', 'utf8'), { from: resolve('app/globals.css') });
await mkdir(output, { recursive: true });
await cp('public/images', resolve(output, 'images'), { recursive: true });
await writeFile(resolve(output, 'fixture.css'), css.css);
const location = airportDraft ? {
  ...locationRecords.find(record => record.slug === 'devanahalli-airport-road'),
  introduction: 'Share your exact site location and entrance details to arrange a free site visit. Machine choice and drilling requirements are assessed for the actual property.',
  sections: [{ heading: 'Prepare for a site visit', body: 'Share a map pin, a site contact, access photographs, entrance width, overhead clearance and your intended water use.' }],
  questions: [{ question: 'Can water availability be guaranteed?', answer: 'Groundwater availability and yield depend on geology and cannot be guaranteed.' }],
} : locationFixture;
const title = airportDraft ? 'Draft preview: Devanahalli / Airport Road' : 'Synthetic location test fixture';
const banner = airportDraft ? '<aside style="padding:12px;background:#fff;color:#111">Draft preview: Devanahalli / Airport Road. Local publication evidence pending. Noindex; unpublished design preview.</aside>' : '';
const rendered = renderToStaticMarkup(createElement(LocationPage, { location })).replaceAll('src="/images/', 'src="./images/');
const html = airportDraft ? rendered.replace(/(<a\b[^>]*\bhref=")\/(?!\/)/g, `$1${brand.url}/`) : rendered;
await writeFile(resolve(output, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title}</title><link rel="stylesheet" href="./fixture.css"></head><body>${banner}${html}</body></html>`);
console.log(`${title}: ${output}/index.html`);
