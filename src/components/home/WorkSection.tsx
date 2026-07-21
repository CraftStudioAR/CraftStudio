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
      <div className="px-6 md:px-10 pt-32 md:pt-40 pb-4 flex-shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <Reveal>
          <div>
            <p className="text-cream/50 text-[10px] tracking-widest uppercase mb-4 flex items-center gap-3">
              ✦ Portafolio
            </p>
            <h2 className="font-sans font-medium tracking-tight text-5xl md:text-7xl lg:text-8xl">Casos Destacados</h2>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <Magnetic>
            <Link
              to="/trabajos"
              data-cursor="Ver todo"
              className="border-b border-cream/40 pb-1 text-sm tracking-wide uppercase hover:border-cream"
            >
              Ver todos ↗
            </Link>
          </Magnetic>
        </Reveal>
      </div>
      
      {/* Horizontal scroll track */}
      <div className="flex-1 flex items-center pl-6 md:pl-10">
        <div ref={workScrollRef} className="flex gap-10 md:gap-20 pr-[30vw] items-start">
          {work.map((w, i) => (
            <div key={w.slug} className="w-[80vw] max-w-md shrink-0">
              <WorkCard work={w} index={i} total={work.length} to="/trabajos" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
