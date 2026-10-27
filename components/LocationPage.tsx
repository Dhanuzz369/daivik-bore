import Image from "next/image";
import { ArrowUpRight, Check, Mail, MapPin, MessageCircle, Phone, Plus } from "lucide-react";
import { getNearbyLocations, type LocationRecord } from "@/data/locations";
import { brand, images, serviceNames } from "@/data/site";
import { serviceSlug } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { MobileContactBar } from "@/components/MobileContactBar";
import { MotionProvider } from "@/components/Motion";

// Publication validation belongs to the route; this template only presents content.
export function LocationPage({ location }: { location: LocationRecord }) {
  const nearby = getNearbyLocations(location.slug);
  return <MotionProvider><div className="location-page" id="top">
    <a className="skip-link" href="#location-main">Skip to content</a>
    <Header />
    <main id="location-main">
      <section className="location-hero" aria-labelledby="location-title">
        <Image className="location-hero-image" src={images.heroRig} alt="Borewell drilling rig on an open site" fill sizes="100vw" quality={60} preload />
        <div className="location-hero-shade" aria-hidden="true" />
        <div className="wrap location-hero-inner">
          <nav className="location-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/service-areas">Service areas</a></nav>
          <p className="eyebrow"><MapPin size={14} aria-hidden="true" /> DAIVIK BOREWELLS</p>
          <h1 id="location-title">Borewell drilling{" "}<em>in {location.name}.</em></h1>
          <p className="location-hero-description">Borewell contractor serving {location.coverageLabels.join(", ")}. Drilling, casing and pump installation, starting with a free site visit.</p>
          <div className="location-actions"><a className="button button-primary" href={brand.phoneHref}><Phone size={18} aria-hidden="true" />{brand.phone}</a><a className="button button-light" href={brand.whatsapp}><MessageCircle size={18} aria-hidden="true" />WhatsApp</a></div>
          <a className="text-link" href="/#site-visit">Arrange a free site visit <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>
      </section>
      <div className="location-assurance"><div className="wrap"><span>Access-led machine selection</span><span>Drilling, casing &amp; pump installation</span><a href={brand.emailHref}><Mail size={16} aria-hidden="true" />Email our team</a></div></div>
      <section className="section location-guidance"><div className="wrap location-columns">
        <div><p className="eyebrow">YOUR LOCATION. YOUR REQUIREMENTS.</p><h2>Borewell contractors{" "}<em>in {location.name}.</em></h2><p>{location.introduction}</p></div>
        <div className="location-local-sections">{location.sections.map(section => <article key={section.heading}><h3>{section.heading}</h3><p>{section.body}</p></article>)}</div>
      </div></section>
      <section className="section location-coverage"><div className="wrap location-columns">
        <div><p className="eyebrow">WHERE WE WORK</p><h2>Localities covered{" "}<em>in {location.name}.</em></h2><ul className="location-coverage-list">{location.coverageLabels.map(label => <li key={label}><Check size={18} aria-hidden="true" />{label}</li>)}</ul></div>
        <div><h3>Borewell services in {location.name}</h3><ul className="location-service-links">{serviceNames.map(name => <li key={name}><a href={`/borewell-services#${serviceSlug(name)}`}>{name} in {location.name}</a></li>)}</ul>
          {nearby.length > 0 && <><h3>Nearby service areas</h3><ul className="location-service-links">{nearby.map(record => <li key={record.slug}><a href={`/service-areas/${record.slug}`}>Borewell drilling in {record.name}</a></li>)}</ul></>}
        </div>
      </div></section>
      <section className="section location-preparation"><div className="wrap location-columns"><div><p className="eyebrow">BEFORE WE BREAK GROUND</p><h2>Prepare for your site visit</h2><a className="text-link" href="/#site-visit">Book a free site visit <ArrowUpRight size={17} aria-hidden="true" /></a></div><ul>{[
        "Your exact site location and a contact person.", "Property type and intended water use.", "Entrance width, turning space and overhead clearance.", "Access photographs and details of any existing borewell.",
      ].map(item => <li key={item}><Check size={20} aria-hidden="true" /><span>{item}</span></li>)}</ul></div></section>
      <section className="section location-faq"><div className="wrap location-columns"><div><p className="eyebrow">A LITTLE CLARITY</p><h2>{location.name} questions.{" "}<br /><em>Answered.</em></h2><p>Groundwater availability and yield depend on geology and cannot be guaranteed.</p></div><div className="faq-list">{location.questions.map(item => <details key={item.question}><summary>{item.question}<Plus size={18} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div></section>
      <section className="section location-contact"><div className="wrap location-columns"><div><p className="eyebrow">LET&apos;S TALK ABOUT YOUR SITE</p><h2>Your next step?{" "}<br /><em>A conversation.</em></h2><p>Discuss your {location.name} requirement with Daivik Borewells and arrange a free site visit.</p></div><div className="location-contact-links"><a className="location-phone" href={brand.phoneHref}>{brand.phone} <ArrowUpRight size={28} aria-hidden="true" /></a><a className="text-link" href={brand.whatsapp}><MessageCircle size={18} aria-hidden="true" />Start on WhatsApp</a><a className="text-link" href={brand.emailHref}><Mail size={18} aria-hidden="true" />{brand.email}</a><a className="text-link" href="/#site-visit">Book a free site visit <ArrowUpRight size={17} aria-hidden="true" /></a></div></div></section>
    </main>
    <footer className="site-footer"><div className="wrap"><div className="footer-main"><div><a href="/" aria-label="Daivik Borewells home"><Logo /></a><p>Water, where you need it.{" "}<br />Borewell solutions. Bangalore.</p></div><div><h3>Explore</h3><a href="/">Home</a><a href="/borewell-services">Our services</a><a href="/service-areas">Service areas</a><a href="/#projects">Service scenarios</a></div><div><h3>Say hello</h3><a href={brand.phoneHref}>{brand.phone}</a><a href={brand.emailHref}>{brand.email}</a><a href={brand.whatsapp}>WhatsApp</a><a href="/#site-visit">Book a site visit</a><span>Serving Bengaluru, Karnataka</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Daivik Borewells</span><a href="/sitemap.xml">Sitemap</a></div></div></footer>
    <MobileContactBar />
  </div></MotionProvider>;
}
