# Daivik Location Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans for inline execution, or superpowers:subagent-driven-development if selected by the owner. Execute task-by-task after plan approval.

**Goal:** Build homepage-matching location pages with accurate keywords, services and contact actions, publishing only records with reviewed local value.

**Architecture:** A typed content catalogue powers a shared location-page component, static route generation, hub links and sitemap entries. One publication predicate controls every public discovery surface. Preserve all existing routes and uncommitted work.

**Tech Stack:** Installed Next.js 16.3.8, React 19.3, TypeScript, existing CSS/Framer Motion/Lucide, Node test runner and Playwright CLI. No new product dependencies.

**Spec:** `docs/superpowers/specs/2026-10-11-location-pages-design.md` (owner-approved).

**Execution:** Owner approved this plan and selected subagent-driven implementation on 11 October 2026. Progress is tracked in `.superpowers/sdd/2026-10-11-location-pages/progress.md`.

## Global Constraints

- Canonical origin `https://www.daivikborewells.com`; existing paths unchanged.
- Phone `9448417318`, tel destination `tel:+919448417318`, WhatsApp number `919448417318`, email `daivikborewells@gmail.com`.
- Preserve supplied static hero, pastel homepage styling and working enquiry flow.
- No fabricated local conditions, projects, offices, coordinates, reviews, machine specifications, travel times or guarantees.
- Locality aliases share one URL. No hidden keyword lists or keyword-only pages.
- Unpublished and unknown records return 404; sitemap/hub contain only published records.
- No push, deployment, DNS or authenticated account changes without separate authorization.
- Read relevant installed Next.js guides before route/metadata code; use apply_patch for manual edits.

## Review Focus

1. A reviewed flag without substantive local evidence must not publish a page (Task 1).
2. Publication state must agree across static params, route lookup, hub and sitemap (Tasks 1/3).
3. Alias/unknown slugs must not create duplicate routes or empty pages (Tasks 1/3).
4. Long locality names and fixed contact controls must remain usable on mobile (Task 2).
5. Local gallery links must not imply illustrations are completed customer projects (Task 2).

## Task 1: Catalogue And Publication Contract

**Files:** create `data/locations.ts`, `scripts/location-catalogue.test.mjs`.

**Interfaces:**
- `LocationRecord`: slug, name, aliases, coverageLabels, introduction, sections `{heading, body}[]`, questions `{question, answer}[]`, evidence `{source, supports}[]`, review `{status: "pending" | "approved", reviewedBy, reviewedAt}`.
- `locationRecords: readonly LocationRecord[]` contains the 16 exact proposed groups from the approved spec.
- `isPublishableLocation(record: LocationRecord): boolean` requires approved review, named reviewer/date, nonempty original local sections and evidence supporting those sections. A mechanically nonempty record is not evidence of human content quality; document review responsibility.
- `getPublishedLocations(): readonly LocationRecord[]` and `getPublishedLocation(slug: string): LocationRecord | undefined` are the only public selectors.

- [ ] Write Node tests with an explicitly synthetic record. Assert pending/coverage-only/empty-evidence records are excluded, an approved substantive fixture is included, unknown/alias slugs return undefined and catalogue slugs are unique.
- [ ] Run `node --experimental-strip-types --test scripts/location-catalogue.test.mjs`; observe failure before implementation. Confirm installed Node supports the flag; use existing TypeScript tooling rather than install dependencies if it does not.
- [ ] Implement interfaces/selectors and all 16 pending catalogue records. Current owner evidence confirms coverage, not unique local service substance: do not mark records approved or invent filler to pass the gate.
- [ ] Run tests; require all pass. Inventory any genuinely supplied additional evidence before promoting records. Record zero published routes if none qualify.

## Task 2: Homepage-Matching Location Experience

**Files:** create `components/LocationPage.tsx`, `scripts/location-page.test.mjs`; modify `app/globals.css` only for namespaced location layout.

**Interfaces:** `LocationPage({ location }: { location: LocationRecord })` renders approved content; public route remains responsible for publication validation. Reuse existing Header, MobileContactBar, Logo, image data and motion helpers. Share existing serviceDirectory rather than duplicate business services.

- [ ] Add failing render-contract tests using a clearly synthetic fixture: visible `9448417318`, tel/WhatsApp/email destinations, all seven service names, links to `/`, `/borewell-services`, `/service-areas`, `/#site-visit`, `/#projects`; gallery label says service scenarios. Verify no automatic redirect/script and essential content exists in rendered HTML.
- [ ] Implement full-width supplied-image hero, readable brand/locality heading, call/WhatsApp actions, original local sections, services, preparation and FAQs, gallery/home links and contact footer. Use homepage tokens/typefaces; no nested cards or fabricated local media.
- [ ] Run render tests. Use temporary test-only fixture rendering for screenshots if no production record qualifies; do not introduce a public preview route or include fixture data in static params/sitemap. Remove temporary fixture changes before final build.
- [ ] Inspect 360px, 390px and 1440px screenshots, image loading, long heading wrapping, keyboard links and reduced motion. Essential server text stays visible without JavaScript.

## Task 3: Routing, Metadata, Discovery And Regression

**Files:** create `app/service-areas/[slug]/page.tsx`, `scripts/verify-location-pages.mjs`; modify `app/service-areas/page.tsx`, `app/sitemap.ts`, `scripts/verify-seo.mjs`; add location schema helper to `lib/seo.ts` without altering directory behavior.

**Interfaces:**
- `generateStaticParams()` yields `{slug}` from `getPublishedLocations()` only.
- Route `params` uses the installed Next.js documented asynchronous type; lookup `getPublishedLocation(slug)` or call `notFound()`.
- `generateMetadata()` returns descriptive locality title/description, self-canonical and explicit Open Graph/Twitter images/URL for published record; unpublished requests do not emit public locality metadata.
- `locationSchema(location: LocationRecord)` returns Organization/WebSite/WebPage/Service and three-level BreadcrumbList (Home -> Service areas -> locality), using existing stable business ID.

- [ ] Read installed dynamic segments, generateStaticParams, generateMetadata and notFound docs. Resolve empty published catalogue behavior using documented static configuration; no hypothetical production routes.
- [ ] Add failing integration tests for missing location template/routing contracts. Use the approved synthetic fixture only in isolated tests, never as a public locality record. Assert unknown/unpublished URLs 404, published route metadata/schema/phone/services/links, and exact sitemap/public-selector agreement.
- [ ] Implement the route, metadata and location schema. Add hub links and sitemap entries only from the shared published selector. Preserve three existing page entries. Update prior regression's hard-coded three-route sitemap assertion to expected actual published catalogue count, rather than delete the assertion.
- [ ] Run catalogue/render/integration tests, `npm run typecheck`, `npm run build`, `git diff --check`. Start local production server on a free port for Playwright; stop it after verification. Validate real generated robots/XML/HTML, no-JS contact/form fallback, reduced motion and existing WhatsApp handoff without sending a message.
- [ ] Run comparable-condition mobile Lighthouse and record LCP/CLS/TBT, environment and uncertainty. Do not substitute TBT for field INP or make ranking guarantees.
- [ ] Obtain independent final review for unsupported claims, publication leaks, duplicate content and regressions; fix important findings with failing-then-passing tests.
- [ ] Update `DAIVIK_IMPLEMENTATION_REPORT.md` and keyword map with actual published/pending records, test outputs and evidence gaps. Provide local preview, explicitly distinguish fixture preview from published pages. Do not push/deploy under this approval.

## Acceptance And Evidence Gap

The template/catalogue can be complete while no locality page meets publication criteria. Owner approval of this plan must not be interpreted as unique local evidence or an instruction to bypass the approved quality gate. Report that distinction plainly. Existing coverage remains available through the hub while original local details are collected.

## Self-Review

Catalogue controls all publication surfaces; component owns presentation; route owns indexable metadata/schema. Tests cover missing evidence, alias/unknown URLs, sitemap consistency, visible contacts/services/navigation and mobile/no-JS behavior. No existing enquiry calculation/integration is changed. All 16 groups have explicit ownership in the approved spec; none is silently promised indexing or ranking.

## Execution Outcome

11 October 2026: Tasks1/2/3 implemented with subagent task reviews. Catalogue16pending/0published; original local evidence still needed. Airport Road selected first and a labelled standalone draft generated outside repository. Fifteen Node tests and local build/typecheck/browser/HTTP/XML checks pass. Hero framing, preview containment and FAQ publication validation corrected with regressions/scoped review. Final review found no remaining important issues. Hydrated locality behavior is deferred until before first real release. Evidence is recorded in the plan ledger and `DAIVIK_IMPLEMENTATION_REPORT.md`. No commit, push or deployment.
