# Daivik Borewells Location Pages

Date: 11 October 2026. Status: specification and implementation plan approved. Framework implemented locally through subagents; publication remains evidence-gated, with all 16 records pending.

## Purpose

Help customers searching for borewell drillers in a genuinely served area understand services, prepare a useful enquiry and reach Daivik Borewells. Each published page must be useful on its own, not merely funnel a search visitor to the homepage. Search appearance, indexing, Maps placement and AI citations are not guaranteed.

## Architecture

Preserve `/`, `/borewell-services` and `/service-areas`. Add statically rendered `/service-areas/[slug]` pages using the installed Next.js conventions. A typed location-content catalogue owns slugs, names, aliases, verified coverage, substantive local content and publication status. Only reviewed, publication-ready records generate routes and sitemap entries. Unknown or unpublished slugs return 404. Do not expose empty or placeholder routes.

One URL owns overlapping spelling/corridor intent. Bangalore/Bengaluru, Bhartiya/Bharathiya spelling variations and industrial park aliases do not get duplicate pages. Existing URLs remain intact. Location pages are self-canonical; they do not canonicalize or automatically redirect to the homepage.

## Area Catalogue

Every owner-confirmed area remains visible in the coverage hub. The catalogue can represent all confirmed locations; a dedicated indexable page requires enough distinct verified content. Grouping does not claim additional geography or an office.

| Proposed Slug | Coverage / Aliases | Scope |
|---|---|---|
| `devanahalli-airport-road` | Devanahalli, Airport Road, Bagalur | Airport corridor; separately named parks only with accurate identity |
| `nelamangala` | Nelamangala | Keep distinct from Dabaspet/Sompura |
| `doddaballapura` | Doddaballapura, Apparel Park | No invented textile customer/project claims |
| `kanakapura-road` | Kanakapura Road | Harohalli remains separate |
| `kengeri` | Kengeri, RR Nagar where already confirmed | No assertion that the names are interchangeable |
| `hosur-road` | Hosur Road, Electronic City, Bommasandra, Attibele | Corridor page initially; no blanket Hosur town/Tamil Nadu coverage |
| `bhartiya-city-thanisandra` | Bhartiya City, Thanisandra; Bharathiya spelling variant | No association with the developer or claims of completed work there |
| `whitefield` | EPIP Whitefield | Only confirmed service geography; no tenant affiliations |
| `peenya` | Peenya | Industrial-site enquiry planning |
| `jigani` | Jigani | Ambiguous BMS-Jigani link-road label excluded |
| `dabaspet-sompura` | Dabaspet, Sompura | Exact phases excluded pending verification |
| `hoskote` | Hoskote Industrial Area | No invented local project/groundwater conditions |
| `bidadi` | Bidadi | Confirmed surrounding corridor |
| `harohalli` | Harohalli | Confirmed surrounding corridor |
| `aerospace-hardware-parks` | Bengaluru Aerospace Park, Hardware Park / Huvinayakanahalli | No invented IT Park/SEZ identity or KIADB endorsement |
| `south-bengaluru` | Thalaghattapura, Uttarahalli, JP Nagar, Banashankari, Jayanagar, Bannerghatta Road, NICE Road corridor | Existing Bengaluru neighbourhood coverage; individual pages only when distinct value is established |

The citywide intent remains owned by the homepage. Electronic City/Bommasandra/Attibele and individual south-Bengaluru neighbourhoods can receive separate pages later if evidence demonstrates distinct customer value; do not publish interchangeable pages to satisfy keyword variants.

## Publication Gate

Coverage is owner-confirmed; unique local operations/project evidence is not yet supplied. Before indexing each record, review its distinct customer purpose and original local substance. Useful evidence may include actual access/mobilization arrangements, documented local service scope, permission-backed project evidence or accurate customer-specific preparation requirements. General borewell advice with only a swapped place name is insufficient. Never invent local geology, yield, depth, offices, travel times, availability, permissions, project history or customers.

Implementation may prepare the shared template and catalogue while keeping unsupported records unpublished. Report which pages actually meet the gate; do not imply all candidate pages launched. No arbitrary word-count quota or synthetic uniqueness percentage is used as proof of quality.

## Page Experience

- Reuse the homepage logo, typefaces, pastel design tokens, header, footer/contact navigation and mobile contact bar. Retain the supplied drilling-rig image; do not label it as work completed in that locality.
- Full-width, unframed hero with Daivik Borewells identity, readable locality heading, concise service scope and immediate call/WhatsApp actions. Avoid decorative card stacks and oversized compact-panel text.
- Show `9448417318` prominently, linked to `tel:+919448417318`. Free site visit and email `daivikborewells@gmail.com` use confirmed business facts.
- Include drilling, compact/robo options, groundwater site assessment, casing, deepening and submersible pump installation. Explain suitability depends on the actual property; no automatic local machine/depth guarantee.
- Provide distinct approved locality guidance, preparation checklist, relevant service explanations and visible questions/answers. Unsupported service methods stay excluded.
- Provide ordinary links to `/`, `/borewell-services`, `/service-areas`, `/#site-visit` and `/#projects`. Label the existing gallery as service scenarios, not verified completed local projects.
- Keep users on the location page until they choose a link; no timed or automatic redirects.
- Motion remains progressive enhancement using existing Framer Motion conventions; essential content visible before JavaScript, reduced-motion preferences respected.

## Keywords And Structured Data

Each page owns a natural commercial cluster: borewell drilling/drillers/contractors in its location, relevant service terms and authentic customer questions. Use a descriptive title, H1, meta description, contextual links and meaningful image alt text. Do not repeat every variation in every paragraph, add hidden keyword lists or claim generic keyword meta tags deliver rankings.

Use the www canonical origin, route-specific Open Graph/Twitter metadata and images, existing Organization identity, WebPage, Service with reviewed coverage and matching BreadcrumbList. Do not invent physical addresses, coordinates, reviews or LocalBusiness eligibility. Visible FAQs do not imply a Google rich-result or AI-citation guarantee.

Sitemap lists only approved, indexable, generated routes returning direct 200. No speculative URLs, artificial modification dates or arbitrary priority/changefreq. Hub links provide normal HTML discovery of every published page.

## Verification

Read installed Next.js dynamic-route/static-generation/metadata documentation before coding. Add failing tests for generated vs unpublished slugs, route-specific canonical/social metadata, visible phone/services/home/gallery links and matching schema. Then implement and rerun.

Check all published routes, sitemap XML and link targets; unknown slugs 404. Verify no-JS content, keyboard interaction, reduced motion, WhatsApp destination without sending messages, and no horizontal overflow at 360px, 390px and 1440px. Capture and inspect desktop/mobile screenshots. Run production build, TypeScript and diff checks. Measure comparable-condition performance without treating lab TBT as field INP. Independent final review checks duplicate content and unsupported facts.

## Release And Decisions

Written-spec approval precedes implementation planning; plan review precedes product edits. Recommend inline implementation with an independent final review because the changes share one catalogue/template. GitHub push, deployment, DNS, Google Business Profile and authenticated analytics changes require separate authorization. Existing uncommitted work is preserved.

Owner decision needed: approve this specification and the evidence-gated grouped rollout. Real local details are required to publish dedicated pages where the current record contains coverage alone.
