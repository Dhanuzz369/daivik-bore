import type { Metadata } from "next";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileContactBar } from "@/components/MobileContactBar";
import { brand, serviceDirectory } from "@/data/site";
import { directorySchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Borewell Services in Bangalore",
  description: "Borewell drilling, compact and robo drilling, groundwater assessment, casing, deepening and submersible pump installation across Bangalore.",
  alternates: { canonical: "/borewell-services" },
  openGraph: { title: "Borewell Services | Daivik Borewells", description: "Drilling, site assessment, casing, deepening and pump installation across Bengaluru. Arrange a free site visit.", url: `${brand.url}/borewell-services`, siteName: brand.name, locale: "en_IN", type: "website", images: [{ url: "/images/hero-user.webp", width: 1448, height: 1086, alt: "Borewell drilling rig" }] },
  twitter: { card: "summary_large_image", title: "Borewell Services | Daivik Borewells", description: "Explore borewell services and planning considerations in Bengaluru.", images: ["/images/hero-user.webp"] },
};

export default function BorewellServicesPage() {
  const schema = directorySchema("/borewell-services", "Borewell services", {
    "@type": "ItemList",
    name: "Borewell services in Bangalore",
    itemListElement: serviceDirectory.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "Service", name: service.name, description: service.description, provider: { "@id": `${brand.url}/#business` }, areaServed: "Bengaluru, Karnataka" },
    })),
  });

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Header />
    <a className="skip-link" href="#main">Skip to content</a>
    <main id="main" className="directory-page">
      <header className="directory-hero wrap"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Borewell services</span></nav><p className="eyebrow">COMPLETE WATER SOLUTIONS</p><h1>Borewell services<br />in Bangalore.</h1><p>Daivik Borewells provides drilling, site assessment, casing, deepening and submersible pump installation across Bengaluru. A free site visit helps define the access requirements and proposed scope.</p></header>
      <section className="wrap directory-grid" aria-label="Borewell services">
        {serviceDirectory.map((service, index) => <article key={service.name}><span>0{index + 1}</span><h2>{service.name}</h2><p>{service.description}</p><a href="/#site-visit">Discuss this service <ArrowUpRight size={16} aria-hidden="true" /></a></article>)}
      </section>
      <section className="wrap planning-section"><h2>Before you plan a borewell</h2><div className="planning-grid"><div><h3>Prepare your site information</h3><p>Share the exact location, property type and intended water use. Entrance width, turning room, overhead clearance and space around the proposed drilling point help determine which rig is suitable.</p><p>For an existing borewell, share any available depth, casing and pump records. Deepening requires an assessment of its condition and is not suitable in every case.</p></div><div><h3>Understand your quotation</h3><p>Drilling depth, ground conditions, access, mobilization, casing and pump requirements affect the scope and price. Ask which materials, installation work and testing are included before agreeing to proceed.</p><p>A free site visit does not include drilling or installation. Water availability, depth and yield cannot be guaranteed by an assessment or drilling method.</p></div></div><h3>Choosing casing and a pump</h3><p>Casing supports the borewell opening and unstable sections; the proposed material and depth depend on site conditions. Pump selection follows the borewell results and intended water use. Discuss the required installation and testing scope rather than selecting equipment on depth alone.</p><a className="text-link" href="/service-areas">Check our service areas <ArrowUpRight size={17} aria-hidden="true" /></a></section>
      <section className="directory-contact"><div className="wrap"><h2>Tell us about your site.</h2><p>Machine suitability, scope and scheduling are confirmed after discussing your location and access.</p><div><a href={brand.phoneHref}><Phone size={17} aria-hidden="true" /> {brand.phone}</a><a href={brand.emailHref}><Mail size={17} aria-hidden="true" /> {brand.email}</a></div></div></section>
    </main>
    <MobileContactBar />
  </>;
}
