# Daivik Borewells SEO Baseline

Audit date: 10 October 2026 (Asia/Kolkata). Source revision: `f155b2b`.
Status: Historical pre-change baseline below. Implementation completed at `752fe25`; refreshed production observations follow. Historical findings are not a statement of current defects.

## Refreshed Production Baseline

10 October 2026, after the previous approved implementation. Fresh evidence: `docs/DAIVIK_SEO_REFRESH_EVIDENCE.json` and `docs/DAIVIK_LIGHTHOUSE_REFRESH.json`. No website changes made for this refresh.

- All three discovered HTML routes return 200. Canonicals, robots sitemap declaration and sitemap page URLs consistently use `https://www.daivikborewells.com`. The root canonical without a trailing slash denotes the same root URL.
- Sitemap parses as XML, contains exactly the three existing public page URLs, and has no synthetic lastmod, priority or changefreq. No private or hypothetical routes.
- All three pages have unique titles/descriptions, index/follow directives, one H1, parsed JSON-LD and no unresolved same-page fragment links in the crawl.
- Organization/WebSite/WebPage appear on each route; directories have BreadcrumbList. Homepage has Service and visible-question FAQPage; directory ItemList contains verified services. No invented physical address or review/rating schema.
- Current initial-HTML main word counts including UI: homepage 1,015; service hub 377; coverage hub 200. Counts are observations, not quality thresholds.
- Live mobile Lighthouse 13.0.1, 10:51 UTC: performance 99, accessibility/best practices/SEO 100; LCP 2.168s, FCP 1.076s, TBT 32ms, CLS 0. Simulated mobile network and 4x CPU slowdown. A single lab run does not establish field INP or guarantee every visit under three seconds.
- Earlier browser regression, build/typecheck and desktop/mobile visual checks remain documented in `DAIVIK_SEO_IMPLEMENTATION_REPORT.md`; they were not rerun as part of this documentation-only refresh. Raw crawl does not prove every external link works or Google indexing.

Resolved historical findings: T1, C1, C2, L1, S1, T2, T3, T4, A1, A2 and touch/readability refinements. Remaining priorities: authentic project evidence, operational service detail, exact public business model/hours and authorized search/conversion measurement. New brief adds Bhartiya City and named industrial corridors; plan review precedes customer-facing additions.

Specialist coverage: previous full audit covered technical, local, content, schema, sitemap, performance, visual and GEO/AEO checks. This refresh rechecks production crawl/schema/metadata/sitemap and mobile performance and extends locality research; it is not a claim that every specialist or authenticated integration ran again. DataForSEO, Firecrawl, GSC, GA4, Maps geo-grid and AI-citation measurement remain unavailable in this session. No fabricated aggregate audit score.

## Problem Definition

The site has a fast, crawlable Next.js foundation and working telephone/WhatsApp contact paths. Its strongest opportunities are consistent canonical-host signals, resilient enquiry access, substantially more useful service information, and accurate Bengaluru-wide coverage. This is an accuracy and customer-decision project, not a keyword-volume or ranking-guarantee project.

## Evidence And Method

- Inspected all repository page routes, components, metadata, configuration, images and contact code.
- Used installed SEO suite v1.9.6 instructions, its public-URL-validating `fetch_page.py`, BeautifulSoup and XML parsing. Crawled the homepage plus all sitemap URLs and ordinary internal page links; three distinct HTML page paths discovered. Robots allowed the crawl; one-second delay, maximum three redirects and 500-page ceiling.
- Inspected live desktop/mobile rendering with Playwright at 1440px and 390px; tested menu, FAQ, form handoff, disabled JavaScript and reduced-motion behavior. No WhatsApp message sent; synthetic form details only.
- Ran fresh Lighthouse 13.0.1 mobile and desktop tests against the live `www` homepage. These are single-run simulated lab measurements, not field Core Web Vitals.
- Production build and TypeScript checks passed. No lint or test-suite script is configured in `package.json`; the existing browser script is a manual verification helper.
- Machine-readable observations: `docs/DAIVIK_SEO_BASELINE_EVIDENCE.json` and `docs/DAIVIK_LIGHTHOUSE_BASELINE.json`. Screenshots: `output/playwright/seo-baseline-*.png` (local, ignored).
- No shared SEO cache existed. SEO helper dependencies were installed in a temporary Python environment, without changing application dependencies. Web-tool fetches of this site failed; direct public fetcher and browser requests succeeded.

## Route And Hosting Inventory

| Route | Observed Result | Purpose |
|---|---|---|
| `/` | 200 on `www`; apex redirects 308 to `www` | Main services, equipment, process, FAQ and enquiry form |
| `/borewell-services` | 200 | Seven-service directory |
| `/service-areas` | 200 | South Bengaluru coverage directory |
| `/robots.txt` | 200, allows all public paths | References apex-domain sitemap |
| `/sitemap.xml` | 200, valid XML, three page URLs | Lists apex URLs that redirect |
| `/llms.txt` | 200 | Optional existing business summary |
| `/manifest.webmanifest`, `/icon.svg` | Present in production build | App identity and icon |
| `/missing-seo-audit-page` | 404 | Correct unknown-route response |

No separate about/contact/quote, private quote tool, calculator, PDF generation, API enquiry endpoint or location-detail routes were found. About and contact content are homepage sections. All three pages are statically prerendered by Next.js 16.3.8 and served on Vercel. Important text, FAQs and JSON-LD exist in initial HTML, including the client components' prerendered text. Crawlable HTML and visual availability without JavaScript are different checks.

The Vercel alias also returns 200 with the same homepage ETag as the custom domain. HTTPS, HSTS, gzip and Vercel cache hits were observed. Application HTML uses revalidation caching; do not apply immutable caching to HTML. No analytics integration was found in the inspected source. Indexing is permitted, but actual Google index coverage cannot be determined without Search Console.

## Prioritized Findings

| ID / Severity | Finding And Evidence | Business Impact | Proposed Correction | Validation |
|---|---|---|---|---|
| T1 / High | Live apex redirects to `www`, but all rendered canonicals, sitemap locations and business IDs declare apex. `data/site.ts:12`, `app/layout.tsx:8`, `app/robots.ts:10`, `app/sitemap.ts:7`. | Conflicting preferred-URL signals and needless redirected sitemap requests. | Recommend adopting the already-serving `www` host consistently; preserve all paths. | Fetch every canonical and sitemap URL: direct 200; one preferred host; aliases converge. |
| C1 / High | No-JavaScript live test: both contact reveal wrappers remain `opacity:0`. `components/Motion.tsx:31`, `app/page.tsx:181`. | Visitors with failed hydration cannot see crucial enquiry content. | Visible server-rendered content; animate as enhancement after hydration. | Disable JavaScript: hero, services, contact details and fallback remain visible. |
| C2 / High | Form lacks action/method; native submission navigated to `/?name=Audit+Only&phone=9000000000&location=Audit+Only&requirement=home`. `components/SiteVisitForm.tsx:50`. | Failed JavaScript exposes personal details in URLs/history and fails to prepare WhatsApp. | Enable JS-dependent submission only after hydration; visible telephone/WhatsApp fallback. No new backend required. | Native/pre-hydration tests must never serialize enquiry fields to URL. |
| L1 / High | Owner confirms entire Bengaluru and six named corridors, but visible content/metadata limit coverage to South Bengaluru. `data/site.ts:67`, `data/site.ts:95`, `app/service-areas/page.tsx:9`. | Accurate services appear unavailable to customers elsewhere. | Update existing coverage page, homepage, FAQ and schema using owner-confirmed areas. | Review all public coverage statements against facts inventory. |
| S1 / Medium | Business graph uses deprecated `ProfessionalService` plus `LocalBusiness`; address only gives city/state/country. `app/page.tsx:20`, `app/page.tsx:30`. | Obsolete typing; incomplete address is not a verified physical location or Google rich-result eligibility. | Use consistent Organization identity until physical address is supplied; retain verified Service relationships. | Parse JSON-LD; Schema.org validation; Google eligibility distinguished from vocabulary validity. |
| T2 / Medium | Both directory pages have no ordinary incoming page links from homepage navigation/content; sitemap is their primary page discovery source. | Customers and crawlers have poor access to useful detail. | Add contextual directory links, shared navigation/footer and breadcrumbs. | All public pages reachable in at most two clicks; route/anchor checks. |
| Q1 / Medium | Initial HTML main-content counts including UI: homepage 879 words, services 193, areas 77. Directory content mostly brief descriptions or names. | Limited answers to scope, preparation and quote questions. | Add useful service explanations, access checklist, cost factors and limitations; no word-count quotas. | Owner/technical review; each section answers a concrete customer question. |
| T3 / Medium | All sitemap `lastmod` values use `new Date()` at generation. Live values: 2026-10-01T12:28:37.084Z. `app/sitemap.ts:7`. | Rebuild dates do not establish meaningful content changes. | Omit dates or maintain real content modification dates; omit ignored priority/changefreq. | Generated XML and content history check. |
| T4 / Medium | Directory canonicals are route-specific, but rendered `og:url` is homepage and social titles/descriptions inherit homepage copy. `app/layout.tsx:23`. | Misleading shared previews. | Per-route Open Graph/Twitter metadata. | Inspect actual generated head on every route. |
| A1 / Medium | `MotionConfig reducedMotion="never"`; CSS only partially suppresses movement. `components/Motion.tsx:9`, `app/globals.css:510`. | Reduced-motion preference is not consistently respected. | Respect preference in hero, reveal, timeline and scrolling; content immediately visible. | Browser preference tests before and after hydration. |
| A2 / Medium | Generic validation alert has no field error associations or focus strategy. `components/SiteVisitForm.tsx:31`. | Errors are harder to resolve, particularly with assistive technology. | Field errors, `aria-invalid`, descriptions and first-error focus. | Invalid input, keyboard and screen-reader checks. |
| E1 / Medium | Gallery explicitly labels illustrative scenarios; no genuine completed-work evidence supplied. Hero image location/ownership is undocumented. | Original experience cannot be substantiated by illustrations. | Keep illustrations distinct; collect permission-backed work evidence and neutral image descriptions. | Owner provenance records and content review. |
| A3 / Low | Menu and gallery controls are below 48px touch recommendation; important notes are 9-10px. `app/globals.css:393`, `app/globals.css:459`. | Small targets/text reduce mobile comfort. | Expand touch areas and important text while preserving design. | 390px/360px and zoom checks; current sizes alone do not prove WCAG AA failure. |
| P1 / Low | Lighthouse estimates 58 KiB unused JS, 12 KiB legacy JS and an unattributed forced reflow. | Some remaining load/main-thread overhead. | Profile only meaningful app-owned work; preserve working motion and framework compatibility. | Compare same-condition lab runs; no broad refactor to chase scanner notices. |

Existing positives: unique route titles/descriptions; one H1 per page; permissive robots; no unresolved same-page fragment IDs in raw crawl; correct 404; verified phone/email links; responsive optimized images with dimensions; no invented rating/review statistics found. Illustration labels remain visible. No bulk duplicate locality routes currently exist.

## Performance And Functional Baseline

| Metric | Mobile Lab | Desktop Lab |
|---|---:|---:|
| Performance score | 99 | 100 |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| LCP | 2.133 s | 0.470 s |
| FCP | 1.051 s | 0.287 s |
| TBT | 40 ms | 0 ms |
| CLS | 0 | 0 |

Tests ran 10 October 2026 at 15:48-15:49 IST. Mobile used simulated 4x CPU slowdown and Lighthouse mobile network settings. Live homepage, not localhost. LCP below three seconds in this run does not guarantee every visit loads in that time. Field INP, CrUX p75 LCP/CLS and real-user conversions are unavailable. TBT is not INP.

No horizontal page overflow observed on any of the three routes at 390px and 1440px. Telephone/mail destinations match confirmed details. Synthetic JS-enabled submission prepared the correct WhatsApp number/message and honestly reported that it was not sent. The no-JS form defect is independently reproduced. Automated accessibility score 100 does not override the manual/source findings. Lighthouse also flagged experimental label-in-name diagnostics on the wordmark; verify its combined visible/accessibility text during remediation.

Mobile menu opened and Escape closed it with `aria-expanded=false`; the first FAQ expanded. Immediately after reduced-motion navigation to contact, both reveal wrappers still measured opacity zero despite transforms being disabled: current reduced-motion behavior does not provide immediate visibility. Invalid form input triggered native validation before the custom alert, so an empty alert is not evidence that custom field errors pass. Native fallback submission was tested with forced synthetic interaction because its wrapper is visually hidden.

## Search, Local SEO And GEO Limits

Five competitor websites were observed through public search results and first-party pages; see the keyword/page map. These results do not establish Google rank positions, local-pack order, search volumes, difficulty, traffic or authority. Full Google top-ten overlap clustering, Maps geo-grid tests, backlink enumeration and AI-platform citation checks were not available.

The suite's credential check returned no configured Google credentials: no Search Console, GA4, PageSpeed API key or CrUX key. DataForSEO and Firecrawl tools are not exposed in this session. No verified GBP/Bing listing URL or review evidence was supplied. Do not interpret unknown listing health as a missing listing. No artificial aggregate SEO/GEO score is assigned where substantial evidence is missing.

## Primary Guidance

- [Google canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls): align redirects, canonical tags and sitemap signals.
- [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): use canonical URLs and accurate significant modification dates; priority/changefreq are ignored.
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features): ordinary SEO, indexing eligibility and helpful textual content; no special AI files or schema required.
- [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business): physical address and accurate data; rich-result appearance is not guaranteed.
- [Schema.org ProfessionalService](https://schema.org/ProfessionalService): the general local-business type is deprecated.
- [Google documentation updates](https://developers.google.com/search/updates): FAQ rich results retired May 2026. Useful visible FAQs remain appropriate.
- [Google people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): original value, accountability and no preferred word count.
- [Business Profile representation](https://support.google.com/business/answer/3038177): accurately represent a service-area business; no invented offices.

Installed skill statistics and generic schema/word-count prescriptions were not treated as evidence when unsupported or superseded by current primary guidance.
