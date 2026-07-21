import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlyphMark from "../GlyphMark";
import ScrollGrow from "../ScrollGrow";

gsap.registerPlugin(ScrollTrigger);

const manifesto =
  "Existimos para darle forma al mensaje de las marcas que tienen algo real para decir.";

export default function ManifestoSection() {
  const manifestoContainerRef = useRef<HTMLElement>(null);
  const manifestoTextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Manifesto Text Scramble / Fade
      const words = manifestoTextRef.current?.querySelectorAll("span");
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
              trigger: manifestoContainerRef.current,
              start: "top 70%",
              end: "center center",
              scrub: 1,
            },
          }
        );
      }
    }, manifestoContainerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="manifiesto"
      ref={manifestoContainerRef} 
      className="relative z-10 overflow-hidden bg-cream px-6 py-40 text-ink md:px-10 min-h-screen flex items-center"
    >
      <GlyphMark
        variant={1}
        className="pointer-events-none absolute -left-20 top-10 z-0 h-[40vw] w-[40vw] max-w-[400px] text-ink/[0.03] md:-left-10 rotate-12"
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <ScrollGrow from={0.9} to={1}>
          <p className="mb-12 text-sm tracking-widest text-red uppercase flex items-center gap-4">
            <span className="w-8 h-[1px] bg-red" /> Propósito
          </p>
          <p ref={manifestoTextRef} className="font-serif text-5xl leading-[1.15] italic md:text-7xl lg:text-8xl">
            {manifesto.split(" ").map((w, i) => (
              <span key={i} className="inline-block mr-[0.25em]">
                {w}
              </span>
            ))}
          </p>
        </ScrollGrow>
      </div>
    </section>
  );
}
