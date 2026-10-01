import type { Metadata } from "next";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Header } from "@/components/Header";
import { MobileContactBar } from "@/components/MobileContactBar";
import { brand, serviceDirectory } from "@/data/site";

export const metadata: Metadata = {
  title: "Borewell Services in Bangalore",
  description: "Borewell drilling, compact and robo drilling, groundwater assessment, casing, deepening and submersible pump installation across Bangalore.",
  alternates: { canonical: "/borewell-services" },
};

export default function BorewellServicesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Borewell services in Bangalore",
    itemListElement: serviceDirectory.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@type": "Service", name: service.name, description: service.description, provider: { "@id": `${brand.url}/#business` }, areaServed: "Bengaluru, Karnataka" },
    })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <Header />
    <main className="directory-page">
      <header className="directory-hero wrap"><p className="eyebrow">COMPLETE WATER SOLUTIONS</p><h1>Borewell services<br />in Bangalore.</h1><p>From assessing access to installing the pump, Daivik Borewells coordinates the work your site needs.</p></header>
      <section className="wrap directory-grid" aria-label="Borewell services">
        {serviceDirectory.map((service, index) => <article key={service.name}><span>0{index + 1}</span><h2>{service.name}</h2><p>{service.description}</p><a href={`${brand.url}/#site-visit`}>Discuss this service <ArrowUpRight size={16} aria-hidden="true" /></a></article>)}
      </section>
      <section className="directory-contact"><div className="wrap"><h2>Tell us about your site.</h2><p>Machine suitability, scope and scheduling are confirmed after discussing your location and access.</p><div><a href={brand.phoneHref}><Phone size={17} aria-hidden="true" /> {brand.phone}</a><a href={brand.emailHref}><Mail size={17} aria-hidden="true" /> {brand.email}</a></div></div></section>
    </main>
    <MobileContactBar />
  </>;
}
