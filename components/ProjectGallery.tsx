"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/site";
import { Reveal } from "@/components/Motion";

export function ProjectGallery() {
  const track = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const element = track.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth * 0.8, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <>
    <Reveal className="section-heading">
      <div><p className="eyebrow">BUILT AROUND YOUR PROPERTY</p><h2>Different sites.<br /><em>The same care.</em></h2></div>
      <div className="gallery-navigation"><button className="icon-button" aria-label="Previous property types" title="Previous property types" onClick={() => scroll(-1)}><ArrowLeft size={21} /></button><button className="icon-button" aria-label="Next property types" title="Next property types" onClick={() => scroll(1)}><ArrowRight size={21} /></button></div>
    </Reveal>
    <Reveal delay={0.06}>
      <div ref={track} className="project-gallery" aria-label="Property types we serve" tabIndex={0}>
        {projects.map((project) => <a className="project-item" href={`#solution-${project.key}`} key={project.type}>
          <div className="project-image"><Image src={project.image} alt={`Illustrative ${project.type.toLowerCase()} in Karnataka`} fill sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 38vw" /><span>ILLUSTRATIVE SCENARIO</span></div>
          <div className="project-caption"><div><h3>{project.type}</h3><p>{project.service}</p></div><ArrowUpRight size={22} aria-hidden="true" /></div>
        </a>)}
      </div>
    </Reveal>
  </>;
}
