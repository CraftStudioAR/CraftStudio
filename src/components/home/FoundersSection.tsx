import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlyphMark from "../GlyphMark";
import MobileFolderSequence from "./MobileFolderSequence";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

// Cortes de línea pedidos por Craft (capturas del 23/10): cada línea con su estilo.
type Line = { text: string; className?: string };
const accent = "italic font-medium text-red";

const desktopLines: Line[] = [
  { text: "Tu marca tiene mucho para decir." },
  { text: "Nosotras te ayudamos a construir cómo.", className: accent },
];

const mobileLines: Line[] = [
  { text: "Tu marca tiene mucho para" },
  { text: "decir. Nosotras te ayudamos a" },
  { text: "construir cómo.", className: `${accent} text-[1.36em] leading-[1.05] mt-1` },
];

const fullText = desktopLines.map((l) => l.text).join(" ");
const intro =
  "Somos un partner de comunicación para empresas que buscan transformar o potenciar la forma en la que se presentan al mundo.";

/** Manifiesto con la aparición del título de Proyectos: letra por letra al entrar en pantalla. */
function Manifesto({ lines, className }: { lines: Line[]; className: string }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      variants={titleVariants}
      aria-label={fullText}
      className={`font-serif text-ink/90 ${className}`}
    >
      {lines.map((line, lIdx) => (
        <span key={lIdx} aria-hidden="true" className={`block whitespace-nowrap ${line.className ?? ""}`}>
          {line.text.split(" ").map((word, wIdx) => (
            <span key={wIdx} className="inline-block mr-[0.22em] last:mr-0">
              {word.split("").map((char, cIdx) => (
                <motion.span key={cIdx} variants={charVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </motion.p>
  );
}

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

// Mismos valores que el título de Proyectos (pages/Trabajos.tsx)
const titleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const charVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function FoundersSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-triggered Parallax (Pronounced, lively movement on scroll, completely still when not scrolling)
      const images = containerRef.current?.querySelectorAll(".parallax-img");
      if (images?.length) {
        const isMobile = window.innerWidth < 768;
        const isSmallLaptop = window.innerWidth < 1440;
        images.forEach((img, i) => {
          const speed = parseFloat(img.getAttribute("data-speed") || "1");
          const yFactor = isMobile ? -35 : (isSmallLaptop ? -35 : -55);
          // Las imágenes de la derecha (2, 3) se desplazan hacia la DERECHA (+x), 
          // las de la izquierda (0, 1, 4) hacia la IZQUIERDA (-x), alejándose del texto siempre.
          const isRightSide = i === 2 || i === 3;
          const xDir = isRightSide ? 1 : -1;
          const xFactor = isMobile ? 3 : (isSmallLaptop ? 3 : 5);
          const rotFactor = isMobile ? 2 : 2.5;
          gsap.to(img, {
            yPercent: yFactor * speed,
            xPercent: xDir * xFactor * speed,
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
    <section ref={containerRef} data-theme="light" className="relative z-10 bg-cream text-ink md:pt-32 md:pb-28 md:px-10 md:min-h-screen flex flex-col items-center justify-center overflow-x-clip">
      <GlyphMark
        variant={1}
        className="pointer-events-none absolute -left-20 top-10 z-0 h-[40vw] w-[40vw] max-w-[400px] text-ink/[0.03] md:-left-10 rotate-12"
      />
      
      {/* 1. DESKTOP FLOATING PARALLAX IMAGES (Subtly overlapping editorial collage) */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Top Left (Cosmetics) */}
        <div data-speed="1.1" className="parallax-img absolute top-24 md:top-28 left-[3%] lg:left-[5%] z-10">
          <MagneticImage
            src="/images/about3.jpg"
            initialRotate={-2}
            className="w-48 md:w-56 lg:w-60 aspect-square object-cover opacity-90 rounded-sm shadow-md"
          />
        </div>
        {/* Center Left (Guy B&W photo) */}
        <div data-speed="0.8" className="parallax-img absolute top-[42%] left-[2%] lg:left-[4%] xl:left-[6%] z-20">
          <MagneticImage
            src="/images/about1.jpg"
            initialRotate={2}
            className="w-40 md:w-48 lg:w-54 xl:w-58 aspect-[3/4] object-cover opacity-85 rounded-sm shadow-lg"
          />
        </div>
        {/* Top Right (Model) */}
        <div data-speed="1.3" className="parallax-img absolute top-36 md:top-40 right-[8%] lg:right-[12%] z-10">
          <MagneticImage
            src="/images/about2.jpg"
            initialRotate={3}
            className="w-36 md:w-40 lg:w-44 aspect-[4/5] object-cover opacity-90 rounded-sm shadow-md"
          />
        </div>
        {/* Bottom Right (Wine photo - únicamente esta ajustada en tamaño y posición) */}
        <div data-speed="0.6" className="parallax-img absolute top-[56%] right-0 md:right-1 lg:right-[2%] xl:right-[4%] z-20">
          <MagneticImage
            src="/images/about4.jpg"
            initialRotate={-2}
            className="w-40 md:w-48 lg:w-56 xl:w-64 aspect-[4/5] object-cover opacity-90 rounded-sm shadow-lg"
          />
        </div>
        {/* Bottom Left (Pipa & Nala tag) */}
        <div data-speed="0.7" className="parallax-img absolute top-[70%] left-[10%] lg:left-[14%] z-10">
          <MagneticImage
            src="/images/about5.jpg"
            initialRotate={-3}
            className="w-52 md:w-64 lg:w-72 aspect-[4/3] object-cover opacity-90 rounded-sm shadow-lg"
          />
        </div>
      </div>

      {/* DESKTOP: declaración en dos líneas, centrada entre las fotos */}
      <div className="hidden md:flex relative z-20 mx-auto w-full max-w-7xl flex-col items-center pointer-events-none">
        <div className="text-center max-w-5xl mx-auto mb-12 px-6">
          <Manifesto
            lines={desktopLines}
            className="text-[1.6rem] lg:text-[1.9rem] xl:text-[2.6rem] min-[1400px]:text-5xl leading-[1.15] mb-3"
          />
          <p className="max-w-sm xl:max-w-xl min-[1400px]:max-w-2xl mx-auto mt-2 text-balance text-base xl:text-lg min-[1400px]:text-xl text-ink/80 font-sans tracking-wide [text-shadow:_0_0_10px_#FEFAF9,_0_0_20px_#FEFAF9]">
            {intro}
          </p>
        </div>
      </div>

      {/* MOBILE: Secuencia interactiva de carpeta de vidrio y dispersión de collage editorial */}
      <MobileFolderSequence
        intro={
          <div className="px-1">
            <div className="mb-4 flex items-center gap-3 text-red">
              <span className="h-px w-10 bg-red/50" />
              <span className="font-serif text-lg leading-none">01</span>
            </div>
            <Manifesto lines={mobileLines} className="text-[clamp(21px,6.5vw,27px)] leading-[1.18]" />
            <p className="mt-3 max-w-[34ch] text-[12.5px] leading-relaxed text-ink/80 font-sans tracking-wide">{intro}</p>
          </div>
        }
      />
    </section>
  );
}
