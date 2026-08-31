import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import WorkCard from "../WorkCard";
import { getProjects } from "../../lib/supabaseClient";
import type { WorkCase } from "../../content/brand";

gsap.registerPlugin(ScrollTrigger);

export default function WorkSection() {
  const [projectsList, setProjectsList] = useState<WorkCase[]>([]);
  const workContainerRef = useRef<HTMLDivElement>(null);
  const workScrollRef = useRef<HTMLDivElement>(null);

  const displayList = projectsList.filter((p) => p.featured).length > 0
    ? projectsList.filter((p) => p.featured)
    : projectsList;

  useEffect(() => {
    getProjects().then(setProjectsList);
  }, []);

  useEffect(() => {
    if (displayList.length === 0) return;

    const ctx = gsap.context(() => {
      // Horizontal Scroll for Work Section
      if (workContainerRef.current && workScrollRef.current) {
        const getScrollDistance = () => {
          if (!workScrollRef.current) return 0;
          const isMobile = window.innerWidth < 768;
          // In mobile, provide extra margin so the last card passes fully into view before unpinning
          const extraMobile = isMobile ? 100 : 0;
          return workScrollRef.current.scrollWidth - window.innerWidth + extraMobile;
        };

        gsap.to(workScrollRef.current, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: workContainerRef.current,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onEnter: () => window.dispatchEvent(new Event("nav-force-hide")),
            onLeave: () => window.dispatchEvent(new Event("nav-force-show")),
            onEnterBack: () => window.dispatchEvent(new Event("nav-force-hide")),
            onLeaveBack: () => window.dispatchEvent(new Event("nav-force-show")),
          }
        });
      }
    }, workContainerRef);
    
    return () => ctx.revert();
  }, [displayList]);

  return (
    <section ref={workContainerRef} data-theme="dark" className="bg-ink text-cream h-[100dvh] md:h-screen overflow-hidden flex flex-col justify-between relative">
      {/* Header */}
      <div className="px-6 md:px-10 pt-14 sm:pt-16 md:pt-10 lg:pt-14 pb-0 md:pb-4 flex-shrink-0">
        <Reveal>
          <div className="flex flex-col items-start max-w-7xl">
            <p className="text-xs md:text-sm tracking-widest text-red uppercase mb-1.5 md:mb-3 flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-red" /> Portafolio
            </p>
            <h2 className="font-sans font-medium tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-cream leading-[1.05]">
              Proyectos
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-cream/80 max-w-xl leading-relaxed mt-1 md:mt-2">
              Algunas marcas que ya confiaron en nuestra mirada
            </p>
          </div>
        </Reveal>
      </div>
      
      {/* Horizontal scroll track */}
      <div className="flex-1 flex items-center pl-6 md:pl-10 md:pb-20 lg:pb-24">
        <div ref={workScrollRef} className="flex gap-5 sm:gap-8 md:gap-14 lg:gap-20 pr-16 md:pr-32 items-start">
          {displayList.map((w, i) => (
            <div key={w.slug} className="w-[82vw] sm:w-[65vw] md:w-[32vw] lg:w-[28vw] xl:w-[26vw] max-w-md shrink-0">
              <WorkCard work={w} index={i} total={displayList.length} to={`/trabajos/${w.slug}`} cursorLabel="Ver caso" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar (No "Desliza" text) */}
      <div className="px-6 pb-14 sm:pb-16 pt-0 flex justify-end md:hidden z-40 flex-shrink-0">
        <Link
          to="/trabajos"
          className="flex items-center gap-2 rounded-xl px-5 py-2.5 bg-white text-ink font-semibold text-xs shadow-xl active:scale-95 transition-transform"
        >
          <span>Ver todos los proyectos</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-2.5 h-2.5 shrink-0"
          >
            <line x1="2" y1="10" x2="10" y2="2" />
            <polyline points="4 2 10 2 10 8" />
          </svg>
        </Link>
      </div>

      {/* Desktop Bottom Right Button (100% original) */}
      <div className="hidden md:block absolute bottom-6 right-6 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 z-50">
        <Magnetic>
          <Link
            to="/trabajos"
            className="group flex justify-center items-center gap-3 rounded-xl px-6 py-3 lg:px-8 lg:py-3.5 bg-white text-ink hover:scale-105 transition-transform duration-300 shadow-xl"
          >
            <span className="font-bold tracking-tight text-sm lg:text-base">Ver todos los proyectos</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 shrink-0"
              >
                <line x1="2" y1="10" x2="10" y2="2" />
                <polyline points="4 2 10 2 10 8" />
              </svg>
            </span>
          </Link>
        </Magnetic>
      </div>
      
    </section>
  );
}
