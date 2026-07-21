import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Beams from "../Beams";
import { LogoWordmark } from "../Logo";
import { contactInfo } from "../../content/brand";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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
      
      // Todo el contenido (logo + tagline) sube para mantenerse centrado en la porción visible
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
      
      <div data-hero-content className="relative z-10 flex flex-col items-center text-center">
        <div data-hero-logo className="w-[85vw] max-w-5xl opacity-0">
          <LogoWordmark className="w-full h-auto text-cream drop-shadow-2xl" />
        </div>
        
        <div data-hero-tagline className="-mt-4 md:-mt-10 opacity-0 z-20">
          <p className="font-script text-2xl md:text-4xl text-cream tracking-wide">
            {contactInfo.tagline}
          </p>
        </div>
      </div>
      
      <div data-hero-scroll className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 opacity-50 flex flex-col items-center animate-bounce">
        <span className="text-[10px] uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cream to-transparent" />
      </div>
    </section>
  );
}
