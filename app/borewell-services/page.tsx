import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileContactBar } from "@/components/MobileContactBar";
import { brand, contentUpdatedAt, equipment, serviceDirectory } from "@/data/site";
import { directorySchema, faqSchema, jsonLd, serviceDirectorySchema, serviceId, serviceSlug } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Borewell Services in Bangalore: Cost & Permits",
  description: "Borewell drilling, compact and robo drilling, casing, deepening and pump installation across Bangalore, plus what affects borewell cost and the permits to check first.",
  keywords: ["borewell services Bangalore", "borewell drilling services Bengaluru", "robo borewell drilling", "compact borewell drilling", "borewell deepening", "borewell casing installation", "submersible pump installation", "groundwater site assessment", "borewell cost Bangalore", "borewell permission Bengaluru", "KGWA borewell permit"],
  alternates: { canonical: "/borewell-services" },
  openGraph: { title: "Borewell Services | Daivik Borewells", description: "Drilling, site assessment, casing, deepening and pump installation across Bengaluru. Arrange a free site visit.", url: `${brand.url}/borewell-services`, siteName: brand.name, locale: "en_IN", type: "website", images: [{ url: "/images/hero-user.webp", width: 1448, height: 1086, alt: "Borewell drilling rig" }] },
  twitter: { card: "summary_large_image", title: "Borewell Services | Daivik Borewells", description: "Explore borewell services and planning considerations in Bengaluru.", images: ["/images/hero-user.webp"] },
};

const roboAnswer = "Robo borewell drilling uses a track-mounted drilling machine for sites where a truck-mounted rig cannot reach or turn. It is considered for existing homes, narrow lanes, gated compounds and other restricted spaces where entrance width, turning room or overhead clearance is limited. Before recommending it, the team checks the entrance width, the route from the road to the drilling point, overhead obstructions such as wires, slabs and trees, and the working space around the proposed point. Robo drilling is one of three options, alongside large rigs for open plots and compact machines for built-up streets; the right choice depends on the actual site, not the locality name. Like any drilling method, it cannot guarantee groundwater, because depth and yield depend on local geology. Send access photographs and a map pin to arrange a free site visit.";

const machineAccess: Record<string, string> = {
  "Large rigs": "Room for the rig to enter, turn and set up near the drilling point.",
  "Compact drilling": "Entrance width and turning space on narrower roads.",
  "Robo drilling": "Entrance width, overhead clearance and working room at the point.",
};

const serviceQuestions = [
  { question: "What does a site assessment cover?", answer: "A free site visit reviews the location, access, working space and ground conditions before drilling is planned. Share your intended water use and any existing borewell records. Ask about the proposed assessment method and its limitations; a site assessment does not guarantee groundwater availability." },
  { question: "Can my existing borewell be deepened?", answer: "Deepening is considered after assessing the existing borewell, its condition and site access. Share available depth, casing and pump information. Suitability and the proposed scope must be discussed for that borewell; deepening is not appropriate in every case." },
  { question: "What should I share for pump installation?", answer: "Share available borewell results, existing pump details and the property's intended water use. Daivik Borewells offers submersible pump selection, fitting and testing. Confirm the materials, installation work and testing included in your quotation before proceeding." },
  { question: "How is a drilling machine selected?", answer: "Large, compact and robo drilling options are considered according to site access and working space. Entrance width, turning room and overhead clearance matter. Send access photographs and the exact location; machine suitability is confirmed for the site, not from a locality name alone." },
];

const permitSources = [
  { name: "BWSSB official website", href: "https://bwssb.karnataka.gov.in/" },
  { name: "Citizen Matters: groundwater extraction rules in Bengaluru", href: "https://citizenmatters.in/borewell-digging-in-bengaluru-faqs-on-groundwater-extraction/" },
];

const reviewedOn = new Date(`${contentUpdatedAt}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function BorewellServicesPage() {
  const schema = directorySchema("/borewell-services", "Borewell services", {
    "@type": "ItemList",
    name: "Borewell services in Bangalore",
    itemListElement: serviceDirectory.map((service, index) => ({ "@type": "ListItem", position: index + 1, item: { "@id": serviceId(service.name) } })),
  }, [...serviceDirectorySchema(), faqSchema(`${brand.url}/borewell-services#faq`, [{ question: "What is robo borewell drilling?", answer: roboAnswer }, ...serviceQuestions])]);

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
    <Header />
    <a className="skip-link" href="#main">Skip to content</a>
    <main id="main" className="directory-page">
      <header className="directory-hero wrap"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Borewell services</span></nav><p className="eyebrow">COMPLETE WATER SOLUTIONS</p><h1>Borewell services{" "}<br />in Bangalore.</h1><p>Daivik Borewells provides borewell drilling services across Bengaluru: large-rig, compact and robo borewell drilling, groundwater site assessment, casing, borewell deepening and submersible pump installation. A free site visit helps define the access requirements and proposed scope.</p></header>
      <section className="wrap directory-grid" aria-label="Borewell services">
        {serviceDirectory.map((service, index) => <article key={service.name} id={serviceSlug(service.name)}><span>0{index + 1}</span><h2>{service.name}</h2><p>{service.description}</p><a href="/#site-visit">Discuss this service <ArrowUpRight size={16} aria-hidden="true" /></a></article>)}
      </section>
      <section className="wrap planning-section" id="drilling-machines" aria-labelledby="machines-heading"><h2 id="machines-heading">Large rig, compact or robo drilling?</h2>
        <div className="machine-figures">{equipment.map(item => <figure key={item.name}><Image src={item.image} alt={`Illustration of ${item.name.toLowerCase()} for ${item.label.toLowerCase()}`} width={480} height={360} sizes="(max-width: 760px) 100vw, 30vw" /><figcaption>{item.name}: {item.label.toLowerCase()}</figcaption></figure>)}</div>
        <div className="machine-table-wrap"><table className="machine-table"><caption>How the three borewell drilling options compare</caption><thead><tr><th scope="col">Option</th><th scope="col">Best for</th><th scope="col">Typical sites</th><th scope="col">What we check</th></tr></thead><tbody>{equipment.map(item => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.label}</td><td>{item.detail}</td><td>{machineAccess[item.name]}</td></tr>)}</tbody></table></div>
        <p className="image-note">Equipment illustrations. Final machine selection depends on access and site conditions.</p>
        <h3 id="robo-borewell-drilling">What is robo borewell drilling?</h3><p>{roboAnswer}</p>
      </section>
      <section className="wrap planning-section"><h2>Before you plan a borewell</h2><div className="planning-grid"><div><h3>Prepare your site information</h3><p>Share the exact location, property type and intended water use. Entrance width, turning room, overhead clearance and space around the proposed drilling point help determine which rig is suitable.</p><p>For an existing borewell, share any available depth, casing and pump records. Deepening requires an assessment of its condition and is not suitable in every case.</p></div><div><h3>Understand your quotation</h3><p>Drilling depth, ground conditions, access, mobilization, casing and pump requirements affect the scope and price. Ask which materials, installation work and testing are included before agreeing to proceed.</p><p>A free site visit does not include drilling or installation. Water availability, depth and yield cannot be guaranteed by an assessment or drilling method.</p></div></div><h3>Choosing casing and a pump</h3><p>Casing supports the borewell opening and unstable sections; the proposed material and depth depend on site conditions. Pump selection follows the borewell results and intended water use. Discuss the required installation and testing scope rather than selecting equipment on depth alone.</p><a className="text-link" href="/service-areas">Check our service areas <ArrowUpRight size={17} aria-hidden="true" /></a></section>
      <section className="wrap planning-section" id="borewell-cost" aria-labelledby="cost-heading"><h2 id="cost-heading">What affects borewell cost in Bengaluru?</h2><p>A borewell quote is built from several parts of the work, so two sites in the same area can cost very different amounts. Ask for an itemised quotation that shows each of these.</p><div className="planning-grid"><div><h3>Drilling depth and ground</h3><p>Depth is the biggest variable. Hard rock, loose soil layers and the depth at which water is struck change drilling time and the machine needed. Depth cannot be fixed in advance, so ask how extra depth is charged.</p></div><div><h3>Access and mobilization</h3><p>Moving a rig to the site, and the machine the access allows, affect the price. Narrow roads or tight entrances may need compact or robo drilling instead of a large rig.</p></div><div><h3>Casing</h3><p>The length, diameter and material of casing depend on the unstable layers found while drilling. Confirm what casing is included and how additional casing is priced.</p></div><div><h3>Pump, cabling and testing</h3><p>The submersible pump, cable, pipes, panel and fittings are chosen after drilling, based on the yield and your water use. Check whether installation, testing and taxes are included.</p></div></div><a className="text-link" href="/#site-visit">Get a free site visit and itemised quote <ArrowUpRight size={17} aria-hidden="true" /></a></section>
      <section className="wrap planning-section" id="borewell-permits" aria-labelledby="permits-heading"><h2 id="permits-heading">Do you need permission to drill a borewell in Bengaluru?</h2><div className="planning-grid"><div><h3>Karnataka Ground Water Authority</h3><p>New borewells in Karnataka are regulated under the Karnataka Ground Water (Regulation and Control of Development and Management) Act, 2011. Bengaluru&apos;s taluks are notified areas, where permission from the Karnataka Ground Water Authority is generally required before drilling.</p></div><div><h3>BWSSB limits</h3><p>Within Bengaluru Water Supply and Sewerage Board limits, BWSSB has also required permission before new borewells are drilled, particularly during water shortages. Apartment associations and commercial sites should check this early.</p></div></div><p>Rules and enforcement change. Check the current requirements for your property with the relevant authority before drilling; this page is general guidance, not legal advice or a permit service.</p><p className="source-note">Sources: {permitSources.map((source, index) => <span key={source.href}>{index > 0 && "; "}<a href={source.href} rel="noopener">{source.name}</a></span>)}. Last reviewed <time dateTime={contentUpdatedAt}>{reviewedOn}</time>.</p></section>
      <section className="wrap planning-section" aria-labelledby="service-questions"><h2 id="service-questions">Questions before you book</h2><div className="planning-grid">{serviceQuestions.map(item => <div key={item.question}><h3>{item.question}</h3><p>{item.answer}</p></div>)}</div><a className="text-link" href="/#site-visit">Share your site details <ArrowUpRight size={17} aria-hidden="true" /></a></section>
      <section className="directory-contact"><div className="wrap"><h2>Tell us about your site.</h2><p>Machine suitability, scope and scheduling are confirmed after discussing your location and access.</p><div><a href={brand.phoneHref}><Phone size={17} aria-hidden="true" /> {brand.phone}</a><a href={brand.emailHref}><Mail size={17} aria-hidden="true" /> {brand.email}</a></div></div></section>
    </main>
    <MobileContactBar />
  </>;
}
