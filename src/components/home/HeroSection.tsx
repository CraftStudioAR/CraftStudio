import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Beams from "../Beams";
import { LogoWordmark } from "../Logo";


gsap.registerPlugin(ScrollTrigger);

const WORDS = [
  "craft",
  "position",
  "embrace",
  "shape",
  "design",
  "develop",
  "structure",
  "scale",
  "plan",
  "strengthen",
  "curate",
  "love"
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
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
      window.removeEventListener("resize", checkMobile);
      ctx.revert();
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentWord = WORDS[currentWordIndex];
    const typeSpeed = isDeleting ? 40 : 80;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % WORDS.length);
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex]);

  return (
    <section
      ref={heroRef}
      className="relative flex h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-navy text-cream"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Beams
          beamWidth={2}
          beamHeight={20}
          beamNumber={40}
          lightColor="#F2EBE9" // Sweet White to match brand
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={isMobile ? 90 : 0}
        />
      </div>
      
      <div data-hero-content className="relative z-10 flex flex-col items-center text-center w-full">
        <div data-hero-logo className="w-[85vw] max-w-5xl opacity-0 flex justify-center">
          <LogoWordmark className="w-full h-auto text-cream drop-shadow-2xl" />
        </div>
        
        <div data-hero-tagline className="absolute top-full mt-4 md:mt-0 opacity-0 z-20 flex flex-col items-center w-full px-6">
          <div className="h-12 md:h-16 flex items-center justify-center">
            <p className="font-script text-2xl md:text-4xl text-cream tracking-wide text-center">
              We {displayText} communication
            </p>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xs sm:max-w-none">
            <a
              href="/contacto"
              className="w-full sm:w-auto text-center bg-cream hover:bg-white text-red px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105 shadow-[0_0_20px_rgba(242,235,233,0.1)]"
            >
              Contanos tu proyecto
            </a>
            <a
              href="/trabajos"
              className="w-full sm:w-auto text-center glass-panel group overflow-hidden text-cream px-8 py-3.5 rounded-full font-medium transition-all hover:scale-105"
            >
              <span className="relative z-10">Ver proyectos</span>
              <div className="glass-sheen"></div>
            </a>
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
