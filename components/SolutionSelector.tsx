"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Building2, Factory, House, Sprout } from "lucide-react";
import { solutions } from "@/data/site";

const icons = [House, Building2, Sprout, Factory];

export function SolutionSelector() {
  const [activeKey, setActiveKey] = useState("home");
  const reduced = useReducedMotion();
  const active = solutions.find((item) => item.key === activeKey) ?? solutions[0];
  useEffect(() => {
    const fromHash = () => {
      const key = window.location.hash.replace("#solution-", "");
      if (solutions.some((item) => item.key === key)) {
        setActiveKey(key);
        document.getElementById("solutions")?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  return (
    <div className="solution-selector">
      <div className="site-options" aria-label="Property type">
        {solutions.map((solution, index) => {
          const Icon = icons[index];
          return <button key={solution.key} type="button" aria-pressed={active.key === solution.key} aria-controls="solution-panel" onClick={() => setActiveKey(solution.key)}>
            <Icon size={25} strokeWidth={1.4} aria-hidden="true" /><span>{solution.label}</span><ArrowUpRight className="option-arrow" size={17} aria-hidden="true" />
          </button>;
        })}
      </div>
      <div className="solution-body" id="solution-panel" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}>
          <m.div className="solution-content" key={active.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.15 }}>
            <div className="solution-photo">
              <Image src={active.image} alt={`Illustrative ${active.label.toLowerCase()} property in Bangalore`} fill sizes="(max-width: 640px) 100vw, 35vw" />
              <span>PROPERTY ILLUSTRATION</span>
            </div>
            <div className="solution-copy">
              <p className="eyebrow">A SOLUTION FOR YOUR {active.label.toUpperCase()}</p>
              <h3>{active.site}</h3>
              <p>{active.service}</p>
              <div className="recommendation"><span>Likely equipment</span><strong>{active.equipment}</strong></div>
              <a href={`#site-visit-${active.key}`} className="text-link">Discuss my {active.label.toLowerCase()} site <ArrowUpRight size={17} aria-hidden="true" /></a>
              <small>Machine suitability is confirmed after a site assessment.</small>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
