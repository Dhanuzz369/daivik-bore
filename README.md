# Daivik Borewells

Next.js, React, TypeScript, Tailwind CSS and Framer Motion.

## Local Development

- Install: `npm install`
- Preview: `npm run dev`
- Type check: `npm run typecheck`
- Production build: `npm run build`
- Production server: `npm start`

Business details are maintained in `data/site.ts`. Canonical URLs, robots and sitemap use https://daivikborewells.com. This configuration does not deploy the website or change DNS.

## Design And Imagery

The design system is documented in `design.md` and `tokens.css`.

The hero uses the supplied drilling photograph in a static, full-bleed composition. UI/UX Pro Max's local design-system search and the installed Hallmark/design-system skills informed the redesign.

Final images live in `public/images/`. Production uses `hero-user.webp` for the hero. Below-fold images are lazy-loaded with responsive sizes through Next Image. Fonts are bundled locally.

Scene prompts and source paths are recorded in `scripts/image-manifest.json`. The common generation direction was: soft natural daylight; premium architectural/editorial photography; realistic Indian people, Bangalore properties and machinery; sage-green and cream equipment; understated colour grading; no text, logos, HDR, sci-fi or Western suburbs. All generated photos are illustrative, not a portfolio of actual customer work.

`node scripts/optimize-images.mjs` regenerates the WebP files from the original local generation outputs. Those original paths are machine-specific; the committed WebP assets are sufficient to build and run the site elsewhere.

## Verification

The browser verification callback in `scripts/verify-browser.mjs` runs with Playwright CLI's `run-code`. It checks widths 360, 390, 430, 768, 1024, 1280, 1440 and 1920; screenshots; overflow; images; headings; the mobile menu; FAQ; property selection; internal links; and the WhatsApp form handoff. WhatsApp opening is intercepted during the test so no enquiry is sent.

Verified business claims, customer project photographs and testimonials can be added when supplied. Unverified experience figures, project counts and water-detection percentages are intentionally absent.
