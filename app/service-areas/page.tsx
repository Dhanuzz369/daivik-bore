import type { Metadata } from "next";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileContactBar } from "@/components/MobileContactBar";
import { areas, brand } from "@/data/site";

export const metadata: Metadata = {
  title: "Borewell Service Areas in Bengaluru",
  description: "Daivik Borewells serves Thalaghattapura, Kanakapura Road, Uttarahalli, JP Nagar, Banashankari and nearby South Bengaluru areas.",
  alternates: { canonical: "/service-areas" },
};

export default function ServiceAreasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Borewell drilling across Bengaluru",
    provider: { "@id": `${brand.url}/#business` },
    areaServed: areas.map((area) => ({ "@type": "Place", name: `${area}, Bengaluru, Karnataka` })),
    serviceType: "Borewell drilling and complete water solutions",
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Header />
    <main className="directory-page">
      <header className="directory-hero wrap"><p className="eyebrow"><MapPin size={14} aria-hidden="true" /> BENGALURU SERVICE AREA</p><h1>Local knowledge.<br />The right machine.</h1><p>We serve properties across South Bengaluru and nearby corridors. Share your location so access and scheduling can be confirmed.</p></header>
      <section className="wrap area-directory" aria-label="Borewell service areas">
        {areas.map((area) => <div key={area}><Check size={16} aria-hidden="true" /><span>{area}</span></div>)}
      </section>
      <section className="directory-contact"><div className="wrap"><h2>Is your area not listed?</h2><p>Nearby Bengaluru locations may still be covered. Send the site location and entrance details for confirmation.</p><a href={brand.whatsapp}>Share your location <ArrowUpRight size={17} aria-hidden="true" /></a></div></section>
    </main>
    <MobileContactBar />
  </>;
}
