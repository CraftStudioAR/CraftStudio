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
        // Calculate the exact distance to scroll horizontally
        const totalWidth = workScrollRef.current.scrollWidth - window.innerWidth;
        
        gsap.to(workScrollRef.current, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: workContainerRef.current,
            start: "top top",
            end: `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            onEnter: () => window.dispatchEvent(new Event("nav-force-hide")),
            onLeave: () => window.dispatchEvent(new Event("nav-force-show")),
            onEnterBack: () => window.dispatchEvent(new Event("nav-force-hide")),
            onLeaveBack: () => window.dispatchEvent(new Event("nav-force-show")),
          }
        });
      }
    }, workContainerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={workContainerRef} data-theme="dark" className="bg-ink text-cream h-screen overflow-hidden flex flex-col relative">
      <div className="px-6 md:px-10 pt-10 md:pt-14 pb-8 md:pb-10 flex-shrink-0 flex flex-col lg:flex-row lg:items-start justify-between gap-6 md:gap-10">
        <Reveal>
          <div className="flex flex-col items-start gap-6 max-w-4xl">
            <div>
              <p className="text-cream/50 text-[10px] tracking-widest uppercase mb-4 flex items-center gap-3">
                ✦ Portafolio
              </p>
              <h2 className="font-sans font-medium tracking-tight text-5xl md:text-7xl lg:text-8xl break-words md:whitespace-nowrap">
                Casos Destacados
              </h2>
            </div>
            <p className="text-base md:text-xl text-cream/70 text-balance max-w-2xl">
              Te compartimos una selección de marcas que ya confiaron en nuestra mirada.
            </p>
          </div>
        </Reveal>
        
        <Reveal delay={0.2} className="lg:mt-10">
          <Magnetic>
            <Link
              to="/trabajos"
              className="group relative flex justify-center items-center gap-4 rounded-full px-8 py-3.5 bg-ink text-cream border border-cream/50 hover:border-cream hover:bg-white/5 transition-all hover:scale-105 shadow-xl w-full md:w-auto"
            >
              <span className="font-bold uppercase tracking-widest text-xs md:text-sm">Ver todos los proyectos</span>
              <span className="text-xl leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">{"\u2197\uFE0E"}</span>
            </Link>
          </Magnetic>
        </Reveal>
      </div>
      
      {/* Horizontal scroll track */}
      <div className="flex-1 flex items-center pl-6 md:pl-10 pb-24 md:pb-36">
        <div ref={workScrollRef} className="flex gap-10 md:gap-20 pr-12 md:pr-32 items-start">
          {work.map((w, i) => (
            <div key={w.slug} className="w-[85vw] max-w-md shrink-0">
              <WorkCard work={w} index={i} total={work.length} to={`/trabajos/${w.slug}`} cursorLabel="Ver caso" />
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
