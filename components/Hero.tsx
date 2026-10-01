"use client";

import { ArrowDown, ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { brand } from "@/data/site";
import { motionEaseOut } from "@/components/Motion";

export function Hero() {
  const item = {
    hidden: { opacity: 0, transform: "translate3d(0, 16px, 0)" },
    visible: { opacity: 1, transform: "translate3d(0, 0, 0)" },
  };

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <motion.picture
          className="hero-picture"
          data-motion="hero-image"
          initial={{ opacity: 0, transform: "scale(1.025)" }}
          animate={{ opacity: 1, transform: "scale(1)" }}
          transition={{ duration: 1.1, ease: motionEaseOut }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-user.webp" alt="Borewell drilling rig operating on a Bangalore site" width={1448} height={1086} fetchPriority="high" loading="eager" />
        </motion.picture>
        <motion.div className="hero-shade" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: motionEaseOut }} />
        <div className="wrap hero-inner">
          <motion.div className="hero-copy" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { delayChildren: 0.12, staggerChildren: 0.07 } } }}>
            <motion.p className="eyebrow" data-motion="hero-copy" variants={item} transition={{ duration: 0.55, ease: motionEaseOut }}><MapPin size={14} aria-hidden="true" /> ROOTED IN BANGALORE</motion.p>
            <motion.h1 id="hero-title" data-motion="hero-copy" variants={item} transition={{ duration: 0.65, ease: motionEaseOut }}>Daivik<br />Borewells<span>.</span></motion.h1>
            <motion.p className="hero-tagline" data-motion="hero-copy" variants={item} transition={{ duration: 0.6, ease: motionEaseOut }}>Water, where you need it.</motion.p>
            <motion.p className="hero-description" data-motion="hero-copy" variants={item} transition={{ duration: 0.55, ease: motionEaseOut }}>Narrow road? Existing building?<br />We have a machine for it.</motion.p>
            <motion.div className="hero-actions" data-motion="hero-copy" variants={item} transition={{ duration: 0.55, ease: motionEaseOut }}>
              <a href={brand.phoneHref} className="button button-primary"><Phone size={17} aria-hidden="true" /> Call now</a>
              <a href={brand.whatsapp} className="button button-light"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
            </motion.div>
            <motion.a href="#site-visit" className="text-link hero-site-link" data-motion="hero-copy" variants={item} transition={{ duration: 0.55, ease: motionEaseOut }}>Get a free site visit <ArrowUpRight size={17} aria-hidden="true" /></motion.a>
          </motion.div>
        </div>
      </section>
      <motion.div className="assurance-strip" data-motion="hero-assurance" initial={{ opacity: 0, transform: "translate3d(0, 12px, 0)" }} animate={{ opacity: 1, transform: "translate3d(0, 0, 0)" }} transition={{ duration: 0.55, delay: 0.42, ease: motionEaseOut }}>
        <div className="wrap assurance-inner">
          <span>Borewell drilling & complete water solutions</span>
          <span>Large rigs <i /> Compact machines <i /> Robo drilling</span>
          <a href="#solutions">Find your solution <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
      </motion.div>
    </>
  );
}
