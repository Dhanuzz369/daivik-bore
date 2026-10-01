import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, CheckCheck, Droplets, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { FAQ } from "@/components/FAQ";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileContactBar } from "@/components/MobileContactBar";
import { SolutionSelector } from "@/components/SolutionSelector";
import { SiteVisitForm } from "@/components/SiteVisitForm";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Timeline } from "@/components/Timeline";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Motion";
import { areas, brand, equipment, faqs, images, serviceNames, services } from "@/data/site";

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${brand.url}/#business`,
        name: brand.legalName,
        alternateName: "Daivik Borewells Bangalore",
        url: brand.url,
        logo: `${brand.url}/icon.svg`,
        image: `${brand.url}/images/hero-user.webp`,
        email: brand.email,
        telephone: brand.phone,
        description: "Borewell drilling contractor serving homes, apartments, farms and commercial properties across Bangalore with large-rig, compact and robo drilling, casing, deepening and pump installation.",
        address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
        areaServed: areas.map((area) => ({ "@type": "Place", name: `${area}, Bengaluru, Karnataka` })),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: brand.phone,
          email: brand.email,
          contactType: "customer service",
          areaServed: "IN-KA",
          availableLanguage: "English",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Borewell services in Bangalore",
          itemListElement: serviceNames.map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
        },
        knowsAbout: serviceNames,
        slogan: "Water, where you need it.",
      },
      {
        "@type": "WebSite",
        "@id": `${brand.url}/#website`,
        url: brand.url,
        name: brand.name,
        alternateName: "Daivik Borewells Bangalore",
        inLanguage: "en-IN",
        publisher: { "@id": `${brand.url}/#business` },
      },
      {
        "@type": "WebPage",
        "@id": `${brand.url}/#webpage`,
        url: brand.url,
        name: "Borewell Drilling in Bangalore | Daivik Borewells",
        description: "Borewell drilling, casing, deepening and pump installation for Bangalore homes, apartments, farms and commercial properties.",
        isPartOf: { "@id": `${brand.url}/#website` },
        about: { "@id": `${brand.url}/#business` },
        primaryImageOfPage: { "@type": "ImageObject", url: `${brand.url}/images/hero-user.webp`, width: 1448, height: 1086 },
        inLanguage: "en-IN",
      },
      {
        "@type": "Service",
        "@id": `${brand.url}/#borewell-service`,
        name: "Borewell drilling services in Bangalore",
        description: "Site assessment, large-rig, compact and robo borewell drilling, casing, borewell deepening, pump installation and testing.",
        provider: { "@id": `${brand.url}/#business` },
        areaServed: areas.map((area) => ({ "@type": "Place", name: `${area}, Bengaluru, Karnataka` })),
        serviceType: serviceNames,
      },
      {
        "@type": "FAQPage",
        "@id": `${brand.url}/#faq`,
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}

export default function Home() {
  return (
    <>
      <JsonLd />
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />

        <section id="solutions" className="section section-solutions">
          {["home", "apartment", "farm", "commercial"].map((key) => <span key={key} id={`solution-${key}`} className="anchor-target" aria-hidden="true" />)}
          <div className="wrap">
            <Reveal className="section-heading compact-heading">
              <div><p className="eyebrow">YOUR SITE. YOUR SOLUTION.</p><h2>What are you planning for?</h2></div>
              <p>A home, a harvest, a whole new project.<br />It starts with the right borewell.</p>
            </Reveal>
            <Reveal delay={0.08}><SolutionSelector /></Reveal>
          </div>
        </section>

        <section id="equipment" className="section equipment-section">
          <div className="wrap">
            <Reveal className="section-heading">
              <div><p className="eyebrow">THE RIGHT MACHINE MAKES THE DIFFERENCE</p><h2>One site.<br /><em>Three ways to drill.</em></h2></div>
              <div className="section-aside"><p>Big open plot or a narrow lane.<br />We start with the space you have.</p><a className="text-link" href="#site-visit">Find the right fit <ArrowUpRight size={17} aria-hidden="true" /></a></div>
            </Reveal>
            <div className="equipment-track" aria-label="Drilling equipment options" tabIndex={0}>
              {equipment.map((item, index) => <Reveal className="equipment-motion" delay={index * 0.07} key={item.name}><article className={`equipment-item tone-${item.tone}`}>
                <div className="equipment-image">
                  <Image src={item.image} alt={`Illustration of ${item.name.toLowerCase()} for ${item.label.toLowerCase()}`} fill sizes="(max-width: 640px) 82vw, (max-width: 900px) 46vw, 31vw" />
                  <span className="equipment-number">0{index + 1}</span>
                </div>
                <div className="equipment-copy"><p className="eyebrow">{item.label.toUpperCase()}</p><h3>{item.name}</h3><p>{item.description}</p><div><small>{item.detail}</small><a href="#site-visit" className="icon-button" aria-label={`Enquire about ${item.name.toLowerCase()}`} title={`Enquire about ${item.name.toLowerCase()}`}><ArrowUpRight size={21} /></a></div></div>
              </article></Reveal>)}
            </div>
            <p className="image-note">Equipment illustrations. Final machine selection depends on access and site conditions.</p>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="wrap services-layout">
            <Reveal className="services-intro" direction="left"><p className="eyebrow">MORE THAN DRILLING</p><h2>From the first survey<br /><em>to the first flow.</em></h2><p>One coordinated borewell solution.<br />Every stage considered.</p><div className="services-photo"><Image src={images.survey} alt="Illustration of an Indian technician assessing a borewell site with survey equipment" fill sizes="(max-width: 760px) 100vw, 40vw" /></div></Reveal>
            <Reveal className="service-list" direction="right" delay={0.08}>
              {services.map((service, index) => <a key={service.name} href="#site-visit" className="service-row">
                <span className="service-index">0{index + 1}</span>
                <div><p className="eyebrow">{service.label.toUpperCase()}</p><h3>{service.name}</h3><p>{service.description}</p></div>
                <div className="service-thumbnail"><Image src={service.image} alt="" fill sizes="96px" /></div>
                <ArrowUpRight size={21} aria-hidden="true" />
              </a>)}
              <a href={brand.whatsapp} className="text-link service-question">Not sure where to start? Talk to us <MessageCircle size={18} aria-hidden="true" /></a>
            </Reveal>
          </div>
        </section>

        <section id="process" className="section process-section">
          <div className="wrap">
            <Reveal className="section-heading"><div><p className="eyebrow">ONE TEAM. START TO FINISH.</p><h2>A clear path to water.</h2></div><a className="text-link" href="#site-visit">Start with a site visit <ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>
            <Timeline />
          </div>
        </section>

        <section id="about" className="care-section">
          <Reveal className="care-image" direction="left" amount={0.3}><Image src={images.water} alt="Illustration of clear water flowing from a borewell outlet" fill sizes="(max-width: 760px) 100vw, 50vw" /></Reveal>
          <Reveal className="care-copy" direction="right" amount={0.3}><p className="eyebrow">GOOD WORK STARTS BELOW THE SURFACE</p><h2>Grounded in care.<br /><em>Built for your site.</em></h2>
            <ul className="care-points">
              <li><ShieldCheck size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>Access comes first</h3><p>A machine selected for the room you actually have.</p></div></li>
              <li><CheckCheck size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>A clear scope</h3><p>Understand the work before drilling begins.</p></div></li>
              <li><Droplets size={22} strokeWidth={1.5} aria-hidden="true" /><div><h3>From drilling to handover</h3><p>Casing, pump installation and testing, coordinated.</p></div></li>
            </ul>
            <p className="groundwater-note">Every site is different. Groundwater availability and yield depend on local geology and cannot be guaranteed.</p>
          </Reveal>
        </section>

        <section id="projects" className="section projects-section"><div className="wrap"><ProjectGallery /></div></section>

        <section id="areas" className="section areas-section">
          <div className="wrap areas-layout">
            <Reveal direction="left"><p className="eyebrow"><MapPin size={14} aria-hidden="true" /> CLOSE TO YOUR SITE</p><h2>Bangalore.<br /><em>And your corner of it.</em></h2><p>Borewell contractors for South Bangalore,<br />from established neighbourhoods to growing layouts.</p><a href={brand.maps} target="_blank" rel="noopener noreferrer" className="text-link">Explore the service area <ArrowUpRight size={17} aria-hidden="true" /></a></Reveal>
            <Reveal direction="right" delay={0.08}><ul className="area-list">{areas.map((area) => <li key={area}><Check size={15} aria-hidden="true" />{area}</li>)}</ul><p className="area-note">A little further out? <a href={brand.whatsapp}>Share your location <ArrowUpRight size={14} aria-hidden="true" /></a></p></Reveal>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="wrap faq-layout">
            <Reveal direction="left"><p className="eyebrow">BEFORE WE BREAK GROUND</p><h2>Good questions.<br /><em>Straight answers.</em></h2><p>Still have something on your mind?</p><a href={brand.phoneHref} className="text-link">Ask our team <Phone size={16} aria-hidden="true" /></a></Reveal>
            <Reveal direction="right" delay={0.08}><FAQ /></Reveal>
          </div>
        </section>

        <section id="site-visit" className="section contact-section">
          {["home", "apartment", "farm", "commercial"].map((key) => <span key={key} id={`site-visit-${key}`} className="anchor-target" aria-hidden="true" />)}
          <div className="wrap contact-layout">
            <Reveal className="contact-copy" direction="left"><p className="eyebrow">LET'S TALK ABOUT YOUR SITE</p><h2>Your next step?<br /><em>A conversation.</em></h2><p>Tell us where you are.<br />We&apos;ll help you work out what comes next.</p><a className="contact-number" href={brand.phoneHref}>94484 17318 <ArrowUpRight size={28} aria-hidden="true" /></a><span className="contact-caption">Call Daivik Borewells</span><a href={brand.whatsapp} className="text-link"><MessageCircle size={18} aria-hidden="true" /> Prefer WhatsApp? Start here</a><a href={brand.emailHref} className="text-link"><Mail size={18} aria-hidden="true" /> {brand.email}</a></Reveal>
            <Reveal direction="right" delay={0.08}><SiteVisitForm /></Reveal>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-main">
            <div><a className="wordmark footer-brand" href="#top" aria-label="Daivik Borewells home"><Logo /></a><p>Water, where you need it.<br />Borewell solutions. Bangalore.</p></div>
            <div><h3>Explore</h3><a href="#equipment">Our machines</a><a href="#services">Our services</a><a href="#process">How we work</a><a href="#faq">FAQs</a></div>
            <div><h3>Say hello</h3><a href={brand.phoneHref}>+91 94484 17318</a><a href={brand.emailHref}>{brand.email}</a><a href={brand.whatsapp}>WhatsApp <ArrowUpRight size={13} aria-hidden="true" /></a><a href="#site-visit">Book a site visit</a><span>Bangalore, Karnataka</span></div>
            <a href="#top" className="back-top" aria-label="Back to top" title="Back to top"><ArrowDown size={22} aria-hidden="true" /></a>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Daivik Borewells</span><a href="/sitemap.xml">Sitemap</a></div>
        </div>
      </footer>
      <MobileContactBar />
    </>
  );
}
