import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import WorkCard from "../WorkCard";
import { work } from "../../content/brand";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const workContainerRef = useRef<HTMLDivElement>(null);
  const workScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll for Work Section
      if (workContainerRef.current && workScrollRef.current) {
        const totalWidth = workScrollRef.current.scrollWidth - window.innerWidth + 80;
        
        gsap.to(workScrollRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: workContainerRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            pin: true,
            scrub: 1,
          }
        });
      }
    }, workContainerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={workContainerRef} className="bg-ink text-cream h-screen overflow-hidden flex flex-col">
      <div className="px-6 md:px-10 pt-24 md:pt-32 pb-12 md:pb-20 flex-shrink-0 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-cream/50 text-[10px] tracking-widest uppercase mb-4 flex items-center gap-3">
              ✦ Portafolio
            </p>
            <h2 className="font-sans font-medium tracking-tight text-5xl md:text-7xl lg:text-8xl break-words md:whitespace-nowrap">
              Casos Destacados
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-col items-start lg:items-end gap-6 w-full lg:max-w-sm">
            <p className="text-base md:text-lg text-cream/70 lg:text-right text-balance">
              Te compartimos una selección de marcas que ya confiaron en nuestra mirada.
            </p>
            <Magnetic>
              <Link
                to="/trabajos"
                className="group relative flex md:inline-flex justify-center items-center gap-3 rounded-full px-8 py-3.5 bg-cream text-ink hover:bg-white transition-all hover:scale-105 w-full md:w-auto"
              >
                <span className="font-bold uppercase tracking-widest text-xs">Ver todos los proyectos</span>
                <span className="text-lg leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
      
      {/* Horizontal scroll track */}
      <div className="flex-1 flex items-center pl-6 md:pl-10 pb-12 md:pb-20">
        <div ref={workScrollRef} className="flex gap-10 md:gap-20 pr-[30vw] items-start">
          {work.map((w, i) => (
            <div key={w.slug} className="w-[80vw] max-w-md shrink-0">
              <WorkCard work={w} index={i} total={work.length} to={`/trabajos/${w.slug}`} cursorLabel="Ver caso" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
