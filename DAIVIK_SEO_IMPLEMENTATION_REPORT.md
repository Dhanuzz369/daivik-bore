# Daivik SEO Design And Implementation Report

Date: 10 October 2026. Status: owner approved the design and execution. Existing-page implementation completed; validation results below. No new page routes, external lead integrations, account changes or DNS changes.

## Intended Outcome

Help Bengaluru and surrounding-area customers understand the actual services, assess site requirements and make qualified enquiries. Preserve Daivik branding, pastel palette, supplied static hero image, appropriate Framer Motion and existing phone/WhatsApp/email flow. Success means consistent public URLs, correct business information, useful service answers and accessible enquiry paths. Rankings and AI citations cannot be guaranteed.

## Approaches Considered

| Approach | Trade-Off | Decision |
|---|---|---|
| Repair and deepen existing three pages first | Fastest measurable improvement; limited new routing; subsequent detail pages require evidence | Recommended initial release |
| Repair plus create a small set of service detail pages | Better distinct service journeys, but needs operational information and reviewed copy | Follow after initial release when content gates pass |
| Broad locality-page rollout | High maintenance burden and doorway/duplication risk without unique local proof | Do not pursue |

## Proposed Architecture

1. Adopt `https://www.daivikborewells.com` as the recommended public origin because deployment already redirects apex there. Centralize URL creation from `brand.url`; align canonicals, sitemap, robots, schema IDs and social previews. Keep current paths. Choosing apex instead requires a deliberate hosting redirect change, outside this initial code-only scope.
2. Retain `/`, `/borewell-services`, `/service-areas`. Link them directly through header/footer and contextually in page content. Add visible breadcrumbs with matching schema to directory pages. Keep contact and about sections on the homepage unless user research establishes a distinct contact-page need.
3. Homepage: retain brand-name H1 and supplied hero; add a concise service-and-coverage description, owner-confirmed free site visit, meaningful service links and practical preparation guidance. Do not substitute keyword slogans for brand identity.
4. Services hub: distinct descriptions of verified drilling, compact/robo access, assessment, casing, deepening and pump installation. Explain scope, required information, unsuitable conditions, cost factors and next steps. Groundwater assessment is not automatically a geophysical survey: methods/qualifications remain pending.
5. Coverage page: describe all Bengaluru plus Nelamangala, Airport Road/Devanahalli, Doddaballapura, Kanakapura Road, Kengeri and Hosur Road. Use grouped, concise geographic information and shared access/scheduling guidance. No invented branches, local water conditions or locality projects.
6. Consider at most three initial detail pages: drilling/access, groundwater assessment and pump installation. Publish only when each has a distinct customer purpose, reviewed operational detail and sufficient original value. The page map records provisional paths, not approved routes.

## Components And Data Flow

- `data/site.ts`: verified public identity, approved service descriptions and coverage. Add only facts established in the owner checklist. Do not couple illustrative media to claims of completed projects.
- Metadata/JSON-LD: one consistent business ID on all pages; Organization identity while physical address is pending, WebSite/WebPage and verified Service relationships. Remove deprecated ProfessionalService. LocalBusiness eligibility requires real address information; do not fabricate it. Keep useful visible FAQs without treating FAQPage as a Google feature opportunity.
- Motion components: essential server-rendered text remains visible. Apply decorative reveals after hydration; respect reduced-motion settings in all paths.
- Enquiry flow: keep client-side WhatsApp preparation. Submission becomes enabled only when the handler is ready, preventing native GET fallback. Plain contact links work independently of JavaScript. Add field-level errors and first-error focus; retain popup-blocked fallback and honest unsent status. No backend or external lead integration is added.
- Existing `llms.txt`: optional, not a ranking requirement. If retained, align it with confirmed facts and origin. Do not add new AI discovery files or arbitrary GEO/AEO tags.
- Hosting: retain Vercel and installed Next.js conventions. Read relevant local `node_modules/next/dist/docs/` guides before implementation.

## Controlled Stages And Acceptance

| Stage | Work | Acceptance And Dependencies |
|---|---|---|
| A: Baseline | Repository, crawl, rendering, measurement and business inventory | Completed; evidence saved |
| B: Design review | Review this design, preferred host, keyword/page map and facts | Owner approval before customer-facing implementation |
| C: Technical fixes | Canonical consistency, sitemap dates, direct links, route metadata, schema identity | Production HTML/XML parse; every sitemap URL direct 200; no duplicate identities or broken routes |
| D: Existing content | Service detail, free visit, explicit coverage, useful headings/answers | Owner-approved facts; technical reviewer checks explanations; natural language |
| E: Local relevance | Expand existing coverage page; optional distinct pages only after gates pass | No doorway pages or fictitious offices; documented coverage and maintainable unique information |
| F: GEO/AEO and evidence | Direct answer passages, linked explanations, genuine project evidence when supplied | Answers stand alone; schema matches visible content; no fabricated quotes/reviews |
| G: Conversion/performance | Visible-before-JS motion, robust form fallback, errors, reduced motion, touch/readability refinements | Safe handoff tests, no personal data in URL, keyboard/mobile/no-JS tests; compare fresh Lighthouse |
| H: Review | Diff review, typecheck/build, crawl, rendered schema/metadata, browser regression | All required checks pass; report actual implemented files and remaining limitations |

Prioritize C1/C2 enquiry resilience and T1 canonical consistency within the first implementation batch even though conversion is also reviewed in Stage G. Preserve current capabilities throughout.

## Validation Design

Write focused regression tests for demonstrated form URL leakage, essential content without JS, canonical/sitemap host consistency and schema parsing. Use synthetic data and intercept external WhatsApp navigation. Test popup blocking, invalid inputs, requirement selection, edit-after-submit, mobile menu Escape, keyboard focus and reduced motion. Do not test external messaging by sending real leads.

Run `npm run typecheck`, `npm run build`, production-route and browser checks; `git diff --check`. No existing lint suite was found. Validate JSON-LD with Schema.org and relevant Google Rich Results tests after approved changes; generic Service/Organization vocabulary does not imply a dedicated Google rich result. Search Console URL Inspection requires owner-provided access and is outstanding.

Record matching-condition performance measurements after implementation, including URL, device, throttling, version and time. Target lab LCP <=2.5s, CLS <=0.1 and no meaningful regression. Field targets require CrUX/RUM; do not substitute TBT for INP. Existing single-run mobile LCP already measures below three seconds.

## Change Ledger

Implemented: www canonical origin and host-specific redirects, canonical-only sitemap without artificial modification dates, consistent Organization identity without an invented address, route-specific social metadata/images, directory breadcrumbs and incoming links. Expanded verified Bengaluru/corridor coverage and visible FAQs; added site-preparation, scope, quotation and casing/pump guidance to existing directory pages. Updated optional llms.txt to match current facts.

Enquiry resilience: server-visible reveals and timeline, reduced-motion preference, static readable hero overlay, submission disabled before hydration, no-JS call/WhatsApp fallback, field-level error associations and first-invalid-field focus. Existing unsent-message status, popup-blocked fallback and edit-after-submit clearing remain intact. Increased mobile touch areas and explanatory text. Supplied static hero and pastel styling retained.

Validation: original rendered regression suite failed on baseline, then passed after fixes. Production build and typecheck passed. Browser tests confirmed invalid-field focus, correct intercepted WhatsApp destination, unsent status and stale-status clearing; no messages sent. No overflow on the three routes at 360px, 390px and 1440px. Local production mobile Lighthouse: performance 96, accessibility/best practices/SEO 100, LCP 2.827s, TBT 26.5ms, CLS 0. This localhost lab run is not directly comparable to the earlier live-domain 99/2.133s run; field INP remains unavailable.

Independent review identified directory social-image inheritance being replaced by route metadata; explicit Open Graph/Twitter images restored and covered by rendered assertions. No other important findings reported.

Owner approved www origin and staged existing-page approach. Distinct new service/locality routes, genuine work evidence, exact public address/hours and authenticated search/analytics validation remain conditional on missing information in `DAIVIK_OWNER_EVIDENCE_CHECKLIST.md`. No fabricated reviews, offices, project records or ranking guarantees added.
