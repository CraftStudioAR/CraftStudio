import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlyphMark from "../GlyphMark";
import ScrollGrow from "../ScrollGrow";

gsap.registerPlugin(ScrollTrigger);

const manifesto = [
  { t: "Construimos", s: "" },
  { t: "la", s: "" },
  { t: "forma", s: "" },
  { t: "en", s: "" },
  { t: "la", s: "" },
  { t: "que", s: "" },
  { t: "tu", s: "font-sans not-italic font-bold text-red tracking-tight" },
  { t: "marca", s: "font-sans not-italic font-bold text-red tracking-tight" },
  { t: "se", s: "" },
  { t: "presenta", s: "" },
  { t: "al", s: "" },
  { t: "mundo.", s: "" },
];

export default function FoundersSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifesto Text Scramble / Fade
      const words = textRef.current?.querySelectorAll("span.gsap-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0.1, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative z-10 bg-cream text-ink px-6 pt-32 pb-12 md:pb-16 md:px-10 min-h-screen">
      <GlyphMark
        variant={1}
        className="pointer-events-none absolute -left-20 top-10 z-0 h-[40vw] w-[40vw] max-w-[400px] text-ink/[0.03] md:-left-10 rotate-12"
      />
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center">
        
        {/* Declaración Principal */}
        <ScrollGrow from={0.95} to={1}>
          <div className="text-center max-w-4xl mx-auto mb-12 md:mb-20">
            <p className="mb-6 text-xs tracking-widest text-red uppercase flex items-center justify-center gap-4">
              <span className="w-8 h-[1px] bg-red" /> Nuestro Propósito
            </p>
            <p
              ref={textRef}
              className="font-serif text-5xl leading-[1.1] italic md:text-7xl lg:text-8xl text-ink/90 text-balance mb-16 md:mb-24"
            >
              {manifesto.map((w, i) => (
                <span key={i} className={`inline-block mr-[0.25em] gsap-word ${w.s}`}>
                  {w.t}
                </span>
              ))}
            </p>
            <div className="text-lg md:text-xl text-ink/70 leading-relaxed max-w-3xl mx-auto flex flex-col gap-6 text-balance text-left md:text-center mt-10">
              <div className="pl-6 md:pl-0 border-l-2 md:border-l-0 border-red">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-ink mb-3 tracking-tight">Diagnosticamos, definimos y construimos.<br className="hidden md:block" /> En ese orden.</h3>
                <p className="md:px-12">El resultado no es solo visual: es un sistema que funciona, escala y representa con claridad aquello que hace único a cada proyecto.</p>
              </div>
            </div>
          </div>
        </ScrollGrow>
        
      </div>
    </section>
  );
}
