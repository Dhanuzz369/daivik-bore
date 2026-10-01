"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { brand } from "@/data/site";
import { Logo } from "@/components/Logo";

const nav = [["Our machines", "equipment"], ["Services", "services"], ["How we work", "process"], ["FAQs", "faq"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <a className="wordmark" href="/#top" aria-label="Daivik Borewells home" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, id]) => <a href={`/#${id}`} key={id}>{label}</a>)}
        </nav>
        <a href={brand.phoneHref} className="header-phone"><Phone size={16} aria-hidden="true" /> 94484 17318</a>
        <a href="/#site-visit" className="button button-primary header-visit">Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" /></a>
        <button ref={menuButton} className="icon-button menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {open && <nav id="mobile-menu" className="mobile-menu wrap" aria-label="Mobile navigation">
        {nav.map(([label, id]) => <a href={`/#${id}`} key={id} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></a>)}
        <a href="/#site-visit" onClick={() => setOpen(false)}>Get a free site visit<ArrowUpRight size={17} /></a>
      </nav>}
    </header>
  );
}
