import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "motion/react";
import { LogoWordmark } from "../Logo";

gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "craft",
  "embrace",
  "shape",
  "design",
  "develop",
  "curate"
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Reveal Animation
      gsap.fromTo(
        "[data-hero-logo]",
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );
      
      gsap.fromTo(
        "[data-hero-tagline]",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1 }
      );

      // 2. Pin Hero and Parallax Content on Scroll
      const heroTl = gsap.timeline();
      
      // El hero entero se achica como un rectángulo
      heroTl.to(heroRef.current, { scale: 0.95, ease: "none" }, 0);
      
      // El scroll desaparece suavemente
      heroTl.to("[data-hero-scroll]", { opacity: 0, ease: "none" }, 0);
      
      // Todo el contenido sube para mantenerse centrado en la porción visible
      heroTl.to("[data-hero-content]", { y: "-50vh", ease: "none" }, 0);

      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: false, // Allows next section to overlap!
        animation: heroTl,
        scrub: true,
      });
    }, heroRef);
    return () => {
      ctx.revert();
    };
  }, []);

  // Word slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      data-theme="dark"
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden text-cream"
    >
      {/* Background Hero Image */}
      <img
        src="/images/hero_backup.webp"
        alt="Craft Studio"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          objectPosition: "55% center",
        }}
      />
      
      <div data-hero-content className="relative z-10 flex flex-col items-center justify-center text-center w-full">
        <div data-hero-logo className="w-[85vw] max-w-5xl opacity-0 flex justify-center relative">
          <LogoWordmark className="w-full h-auto text-cream drop-shadow-2xl" />
        </div>
        
        <div data-hero-tagline className="-mt-6 sm:-mt-8 md:-mt-14 opacity-0 z-20 flex flex-col items-center w-full px-4 sm:px-6 relative">
          <div className="h-10 sm:h-14 md:h-20 flex items-center justify-center">
            <h2 className="flex items-center text-[18px] xs:text-[21px] sm:text-[30px] md:text-[40px] text-cream tracking-wide text-center m-0 whitespace-nowrap">
              <span className="font-sans">we</span>
              <span className="relative inline-flex items-center justify-center min-w-[75px] xs:min-w-[90px] sm:min-w-[150px] md:min-w-[210px] h-[1.8em] mx-1 sm:mx-2 md:mx-4 [perspective:600px]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentWordIndex}
                    initial={{
                      rotateX: -60,
                      y: "-75%",
                      opacity: 0,
                    }}
                    animate={{
                      rotateX: 0,
                      y: "0%",
                      opacity: 1,
                    }}
                    exit={{
                      rotateX: 60,
                      y: "75%",
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                    }}
                    className="absolute font-script text-[26px] xs:text-[30px] sm:text-5xl md:text-6xl text-cream pt-0.5 sm:pt-1 md:pt-2 whitespace-nowrap drop-shadow-md"
                  >
                    {WORDS[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="font-sans">communication</span>
            </h2>
          </div>
          
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-2.5 sm:gap-4 items-center justify-center w-full">
            <Link
              to="/contacto"
              className="w-[205px] sm:w-auto text-center bg-cream hover:bg-white text-red px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-xl text-xs sm:text-sm md:text-base font-semibold tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(242,235,233,0.1)]"
            >
              Contanos tu proyecto
            </Link>
            <Link
              to="/trabajos"
              className="w-[205px] sm:w-auto text-center glass-panel group overflow-hidden text-cream px-6 py-2.5 sm:px-8 sm:py-3.5 rounded-xl text-xs sm:text-sm md:text-base font-medium tracking-wide transition-all hover:scale-105"
            >
              <span className="relative z-10">Ver proyectos</span>
              <div className="glass-sheen"></div>
            </Link>
          </div>
        </div>
      </div>
      
      <div data-hero-scroll className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 opacity-50 flex flex-col items-center animate-bounce pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cream to-transparent" />
      </div>
    </section>
  );
}
