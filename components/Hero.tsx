"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { m } from "framer-motion";
import { brand } from "@/data/site";
import { motionEaseOut } from "@/components/Motion";

export function Hero() {
  const item = {
    hidden: { opacity: 1, transform: "translate3d(0, 16px, 0)" },
    visible: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <picture className="hero-picture">
          <Image src="/images/hero-user.webp" alt="Borewell drilling rig operating on a Bangalore site" fill sizes="100vw" quality={60} preload fetchPriority="high" />
        </picture>
        <m.div className="hero-shade" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: motionEaseOut }} />
        <div className="wrap hero-inner">
          <m.div className="hero-copy" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { delayChildren: 0.04, staggerChildren: 0.05 } } }}>
            <m.p className="eyebrow" data-motion="hero-copy" variants={item} transition={{ duration: 0.45, ease: motionEaseOut }}><MapPin size={14} aria-hidden="true" /> ROOTED IN BANGALORE</m.p>
            <m.h1 id="hero-title" data-motion="hero-copy" variants={item} transition={{ duration: 0.5, ease: motionEaseOut }}>Daivik<br />Borewells<span>.</span></m.h1>
            <m.p className="hero-tagline" data-motion="hero-copy" variants={item} transition={{ duration: 0.45, ease: motionEaseOut }}>Water, where you need it.</m.p>
            <m.p className="hero-description" data-motion="hero-copy" variants={item} transition={{ duration: 0.45, ease: motionEaseOut }}>Narrow road? Existing building?<br />We have a machine for it.</m.p>
            <m.div className="hero-actions" data-motion="hero-copy" variants={item} transition={{ duration: 0.45, ease: motionEaseOut }}>
              <a href={brand.phoneHref} className="button button-primary"><Phone size={17} aria-hidden="true" /> Call now</a>
              <a href={brand.whatsapp} className="button button-light"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
            </m.div>
            <m.a href="#site-visit" className="text-link hero-site-link" data-motion="hero-copy" variants={item} transition={{ duration: 0.45, ease: motionEaseOut }}>Get a free site visit <ArrowUpRight size={17} aria-hidden="true" /></m.a>
          </m.div>
        </div>
      </section>
      <m.div className="assurance-strip" data-motion="hero-assurance" initial={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }} animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }} transition={{ duration: 0.45, delay: 0.28, ease: motionEaseOut }}>
        <div className="wrap assurance-inner">
          <span>Borewell drilling & complete water solutions</span>
          <span>Large rigs <i /> Compact machines <i /> Robo drilling</span>
          <a href="#solutions">Find your solution <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
      </m.div>
    </>
  );
}
