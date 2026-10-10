# Daivik GEO/AEO Measurement Plan

Date: 10 October 2026. Status: baseline methodology; no observed AI mentions/citations or search traffic claimed.

## Readiness Baseline

Public HTML contains business identity, service descriptions and seven FAQs. Robots allow public crawling. Contact details are consistent. Answers on cost factors, access and lack of groundwater guarantees are useful starting points. Existing `llms.txt` is optional and not evidence of AI adoption. Main limitations are shallow service explanations, missing original work evidence, canonical-host inconsistency and incomplete current coverage copy. Technical visibility without JavaScript needs repair even though text exists in HTML.

Google states no special AI schema/files or additional AI-feature optimization are required; eligibility relies on normal indexing and snippet eligibility. Improve factual, independently understandable answer passages and useful internal links, not arbitrary tags or exact passage-length targets. [Official guidance](https://developers.google.com/search/docs/appearance/ai-features).

## Fixed Query Set

Keep spelling and order constant for comparisons. Bengaluru/Bangalore are alternate variants deliberately included.

| ID | Exact Query | Intent |
|---|---|---|
| Q01 | Daivik Borewells contact number and services | Entity accuracy |
| Q02 | Borewell drilling contractors in Bengaluru | General commercial discovery |
| Q03 | Borewell drilling in Bangalore for an independent house | Residential need |
| Q04 | Borewell drilling in Nelamangala | Verified service area |
| Q05 | Borewell drilling near Bengaluru Airport Road Devanahalli | Airport corridor |
| Q06 | Borewell drilling in Doddaballapura | Verified service area |
| Q07 | Borewell drilling on Kanakapura Road | Verified service area |
| Q08 | Borewell drilling in Kengeri | Verified service area |
| Q09 | Borewell drilling near Hosur Road Bengaluru | Corridor, not all Hosur city |
| Q10 | Can a borewell drilling machine access a narrow road in Bangalore? | Access planning |
| Q11 | What factors affect the cost of borewell drilling in Bengaluru? | Quote planning |
| Q12 | What should an apartment association prepare before a borewell site visit? | Shared-property planning |
| Q13 | What is borewell casing used for? | Service explanation |
| Q14 | Can a groundwater survey guarantee borewell water? | Limits and accuracy |
| Q15 | What information is needed before installing a submersible borewell pump? | Pump planning |
| Q16 | Does Daivik Borewells provide a free site visit in Bengaluru? | Confirmed commercial offer |

## Collection Protocol

At baseline and each 30-day checkpoint, manually run the query set on accessible ChatGPT web search, Perplexity and Google Search (record AI Overview presence); optionally Bing/Copilot. Use fresh conversations and the same declared location/language/device. Enable search where supported, record platform/model/interface and date, and do not prime responses by including the website unless the fixed query itself is branded. Do not interact with accounts without authorization.

Record one observation per query/platform with: run ID, timestamp/timezone, exact query, geography, device/language, platform/model, search mode, response snapshot, AI feature shown, business mentioned, cited URL(s), direct website citation vs third-party mention, facts correct/incorrect, competitors mentioned, inaccessible/error status and notes. Save evidence alongside each record. A feature not shown is different from the business absent; an inaccessible platform is missing data, never a zero citation.

No platform runs were performed in this phase. Plain web-search snippets are not proof of AI citations. Manual results vary by personalization and time; compare repeated observations, not a single answer. Report counts with eligible-observation denominators, platform and query set, without presenting them as universal market visibility.

## Search And Enquiry Measurement

- Search Console, when authorized/configured: query/page/device/country impressions, clicks, CTR, average position, index coverage and sitemap processing. Retain the same query groups and compare periods carefully. Google AI-feature traffic is included in overall Web reporting; do not invent a distinct AI attribution segment.
- GA4 or consent-appropriate analytics, when authorized: call-link click, WhatsApp click, form message prepared and email click. Message preparation is not a sent enquiry; outbound click is not a qualified lead.
- Owner lead log: date, service, location, attribution where known, qualified/unqualified, estimate issued and outcome. Do not put names/phones/messages in analytics event parameters or public reports.
- Performance: comparable mobile/desktop Lighthouse lab samples; CrUX/RUM when available. Report p75 LCP/INP/CLS only from genuine field measurements.
- Local listings: verify GBP service-area model, name/phone/site consistency, authentic review evidence and actual public address/hours settings. Directory presence and Maps performance are separate measurements.

## Follow-Up Schedule

| Checkpoint | Work | Evidence |
|---|---|---|
| 30 days after approved release | Verify canonical/indexing changes, crawl, contact regression, directory discovery and facts; establish query/platform log | Crawl snapshots, Search Console if available, lab settings/results, first recorded AI observations |
| 60 days | Compare qualified enquiries and query groups; review service-page gaps and owner evidence; assess whether first distinct service pages are justified | Comparable data windows and reviewed briefs; no automatic locality expansion |
| 90 days | Evaluate sustained trends, local profile consistency and repeated AI observations; refine content by real customer questions | Trend report with seasonality/data limitations and evidence-backed next priorities |

These are follow-up recommendations, not scheduled automations. No account setup, sitemap submission, DNS change, profile edits or deployment occurred.
