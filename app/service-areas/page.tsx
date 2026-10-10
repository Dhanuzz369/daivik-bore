import type { Metadata } from "next";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileContactBar } from "@/components/MobileContactBar";
import { areas, brand } from "@/data/site";
import { directorySchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Borewell Service Areas in Bengaluru",
  description: "Borewell drilling across all Bengaluru, Nelamangala, Devanahalli / Airport Road and Doddaballapura, including Kanakapura Road, Kengeri and Hosur Road. Free site visits.",
  alternates: { canonical: "/service-areas" },
  openGraph: { title: "Bengaluru Borewell Service Areas | Daivik Borewells", description: "All Bengaluru and the Nelamangala, Devanahalli and Doddaballapura corridors. Free site visits.", url: `${brand.url}/service-areas`, siteName: brand.name, locale: "en_IN", type: "website", images: [{ url: "/images/hero-user.webp", width: 1448, height: 1086, alt: "Borewell drilling rig" }] },
  twitter: { card: "summary_large_image", title: "Bengaluru Borewell Service Areas | Daivik Borewells", description: "Explore Bengaluru-wide coverage and arrange a free site visit.", images: ["/images/hero-user.webp"] },
};

export default function ServiceAreasPage() {
  const schema = directorySchema("/service-areas", "Service areas", {
    "@type": "Service",
    name: "Borewell drilling across Bengaluru",
    provider: { "@id": `${brand.url}/#business` },
    areaServed: areas.map((name) => ({ "@type": "Place", name })),
    serviceType: "Borewell drilling and complete water solutions",
  });

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Header />
    <a className="skip-link" href="#main">Skip to content</a>
    <main id="main" className="directory-page">
      <header className="directory-hero wrap"><nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span>Service areas</span></nav><p className="eyebrow"><MapPin size={14} aria-hidden="true" /> BENGALURU SERVICE AREA</p><h1>Borewell services<br />across Bengaluru.</h1><p>Daivik Borewells serves all Bengaluru and the Nelamangala, Airport Road / Devanahalli and Doddaballapura corridors. Kanakapura Road, Kengeri and Hosur Road are included. Site visits are free; share your location to arrange access and scheduling.</p></header>
      <section className="wrap area-directory" aria-label="Borewell service areas">
        {areas.map((area) => <div key={area}><Check size={16} aria-hidden="true" /><span>{area}</span></div>)}
      </section>
      <section className="wrap planning-section"><h2>Planning a visit to your property</h2><div className="planning-grid"><div><h3>Homes and apartment sites</h3><p>Tell us about entrance width, overhead obstacles and available working space. For a shared property, nominate a contact person and discuss access with the association before arranging a visit.</p></div><div><h3>Plots, farms and commercial sites</h3><p>Share a map pin and the approach route, along with your intended water use. The suitable machine and working area are assessed for the actual property, rather than assumed from the locality name.</p></div></div><p>Coverage does not guarantee groundwater availability or a particular drilling depth. Drilling, casing and pump requirements are discussed for your site.</p><a className="text-link" href="/borewell-services">Explore our borewell services <ArrowUpRight size={17} aria-hidden="true" /></a></section>
      <section className="directory-contact"><div className="wrap"><h2>Is your area not listed?</h2><p>Nearby Bengaluru locations may still be covered. Send the site location and entrance details for confirmation.</p><a href={brand.whatsapp}>Share your location <ArrowUpRight size={17} aria-hidden="true" /></a></div></section>
    </main>
    <MobileContactBar />
  </>;
}
