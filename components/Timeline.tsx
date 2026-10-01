"use client";

import { m, useScroll } from "framer-motion";
import { useRef } from "react";
import { process } from "@/data/site";
import { motionEaseOut } from "@/components/Motion";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 35%"] });

  return <div ref={ref} className="timeline">
    <div className="timeline-track" aria-hidden="true"><m.div data-motion="timeline-track" style={{ scaleX: scrollYProgress }} /></div>
    <ol>
      {process.map((step, index) => <m.li key={step.title} data-motion="timeline-step" initial={{ opacity: 0, transform: "translate3d(0, 14px, 0)" }} whileInView={{ opacity: 1, transform: "translate3d(0, 0, 0)" }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5, delay: index * 0.06, ease: motionEaseOut }}>
        <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
        <h3>{step.title}</h3><p>{step.detail}</p>
      </m.li>)}
    </ol>
  </div>;
}
