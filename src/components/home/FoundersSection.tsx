import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlyphMark from "../GlyphMark";

gsap.registerPlugin(ScrollTrigger);

const manifesto = [
  { t: "Construimos", s: "" },
  { t: "la", s: "" },
  { t: "forma", s: "" },
  { t: "en", s: "" },
  { t: "la", s: "" },
  { t: "que", s: "" },
  { t: "tu", s: "font-serif italic font-medium text-red" },
  { t: "marca", s: "font-serif italic font-medium text-red" },
  { t: "se", s: "" },
  { t: "presenta", s: "" },
  { t: "al", s: "" },
  { t: "mundo.", s: "" },
];

function MagneticImage({
  src,
  alt = "",
  className = "",
  initialRotate = 0,
}: {
  src: string;
  alt?: string;
  className?: string;
  initialRotate?: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imgRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const px = x / (rect.width / 2); // -1 to 1
    const py = y / (rect.height / 2); // -1 to 1

    // Follow cursor with subtle translation & 3D tilt
    gsap.to(imgRef.current, {
      x: px * 20,
      y: py * 20,
      rotateX: -py * 12,
      rotateY: px * 12,
      scale: 1.08,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="float-drift pointer-events-auto cursor-pointer hover:z-50"
      style={{ perspective: 1000 }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} will-change-transform transition-shadow duration-300 hover:shadow-2xl`}
        style={{ transform: `rotate(${initialRotate}deg)` }}
      />
    </div>
  );
}

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

      // 1. Scroll-triggered Parallax (Pronounced, lively movement on scroll, completely still when not scrolling)
      const images = containerRef.current?.querySelectorAll(".parallax-img");
      if (images?.length) {
        const isMobile = window.innerWidth < 768;
        images.forEach((img, i) => {
          const speed = parseFloat(img.getAttribute("data-speed") || "1");
          const yFactor = isMobile ? -110 : -70;
          const xFactor = isMobile ? 20 : 12;
          const rotFactor = isMobile ? 6 : 3.5;
          gsap.to(img, {
            yPercent: yFactor * speed,
            xPercent: (i % 2 === 0 ? 1 : -1) * xFactor * speed,
            rotation: (i % 2 === 0 ? 1 : -1) * (rotFactor * speed),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} data-theme="light" className="relative z-10 bg-cream text-ink px-6 py-20 sm:py-24 md:pt-32 md:pb-28 md:px-10 md:min-h-screen flex flex-col items-center justify-center">
      <GlyphMark
        variant={1}
        className="pointer-events-none absolute -left-20 top-10 z-0 h-[40vw] w-[40vw] max-w-[400px] text-ink/[0.03] md:-left-10 rotate-12"
      />
      
      {/* 1. DESKTOP FLOATING PARALLAX IMAGES (Subtly overlapping editorial collage) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left */}
        <div data-speed="1.1" className="parallax-img absolute top-28 left-[5%] z-10">
          <MagneticImage
            src="/images/lab1.jpg"
            initialRotate={-2}
            className="w-52 aspect-[3/4] object-cover opacity-85 rounded-sm shadow-md"
          />
        </div>
        {/* Center Left (Overlaps bottom of Top Left) */}
        <div data-speed="0.8" className="parallax-img absolute top-[40%] left-[8%] z-20">
          <MagneticImage
            src="/images/lab2.jpg"
            initialRotate={2}
            className="w-72 aspect-square object-cover opacity-90 rounded-sm shadow-lg"
          />
        </div>
        {/* Top Right */}
        <div data-speed="1.3" className="parallax-img absolute top-40 right-[12%] z-10">
          <MagneticImage
            src="/images/martina.webp"
            initialRotate={3}
            className="w-44 aspect-[4/5] object-cover opacity-90 rounded-sm shadow-md"
          />
        </div>
        {/* Bottom Right (Overlaps bottom of Top Right) */}
        <div data-speed="0.6" className="parallax-img absolute top-[52%] right-[8%] z-20">
          <MagneticImage
            src="/images/lab3.jpg"
            initialRotate={-2}
            className="w-56 aspect-[4/5] object-cover opacity-90 rounded-sm shadow-lg"
          />
        </div>
        {/* Bottom Center */}
        <div data-speed="0.7" className="parallax-img absolute bottom-6 left-[33%] z-15">
          <MagneticImage
            src="/images/tiziana.webp"
            initialRotate={1}
            className="w-64 aspect-[4/3] object-cover opacity-80 rounded-sm shadow-md"
          />
        </div>
      </div>

      {/* 2. MOBILE FLOATING PARALLAX IMAGES (Layered collage framing with lively travel) */}
      <div className="block md:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left */}
        <div data-speed="1.2" className="parallax-img absolute top-10 left-2 z-10">
          <MagneticImage
            src="/images/lab1.jpg"
            initialRotate={-6}
            className="w-22 aspect-[3/4] object-cover opacity-80 shadow-sm rounded-sm"
          />
        </div>
        {/* Top Right */}
        <div data-speed="1.4" className="parallax-img absolute top-8 right-2 z-20">
          <MagneticImage
            src="/images/martina.webp"
            initialRotate={6}
            className="w-22 aspect-[4/5] object-cover opacity-90 shadow-md rounded-sm"
          />
        </div>
        {/* Bottom Left */}
        <div data-speed="1.1" className="parallax-img absolute bottom-12 left-2 z-10">
          <MagneticImage
            src="/images/lab2.jpg"
            initialRotate={3}
            className="w-24 aspect-square object-cover opacity-80 shadow-sm rounded-sm"
          />
        </div>
        {/* Bottom Right */}
        <div data-speed="1.3" className="parallax-img absolute bottom-14 right-2 z-20">
          <MagneticImage
            src="/images/lab3.jpg"
            initialRotate={-6}
            className="w-22 aspect-[4/5] object-cover opacity-85 shadow-md rounded-sm"
          />
        </div>
        {/* Bottom Center (Slightly overlaps bottom left and right images) */}
        <div data-speed="0.9" className="parallax-img absolute bottom-2 left-[26%] z-30">
          <MagneticImage
            src="/images/tiziana.webp"
            initialRotate={1}
            className="w-28 aspect-[4/3] object-cover opacity-85 shadow-lg rounded-sm"
          />
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl flex flex-col items-center pointer-events-none">
        
        {/* Declaración Principal */}
        <div className="text-center max-w-3xl mx-auto my-14 md:my-0 mb-14 md:mb-18 px-6 sm:px-4">
          <p
            ref={textRef}
            className="font-serif text-[30px] sm:text-[38px] md:text-6xl lg:text-7xl leading-[1.18] md:leading-[1.1] text-ink/90 text-balance mb-6 md:mb-8"
          >
            {manifesto.map((w, i) => (
              <span key={i} className={`inline-block mr-[0.25em] gsap-word ${w.s}`}>
                {w.t}
              </span>
            ))}
          </p>
          <div className="max-w-xl mx-auto mt-4 md:mt-6 text-center text-balance">
            <p className="text-sm sm:text-base md:text-lg text-ink/80 font-sans tracking-wide [text-shadow:_0_0_10px_#f2ebe9,_0_0_20px_#f2ebe9]">
              Construimos sistemas que escalan y representan aquello que hace único a cada proyecto.
            </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}
