import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Reveal from "../components/Reveal";
import Marquee from "../components/Marquee";
import Magnetic from "../components/Magnetic";
import WorkCard from "../components/WorkCard";
import Ripple from "../components/Ripple";
import GlyphMark from "../components/GlyphMark";
import { LogoMark } from "../components/Logo";
import { services, values, work, contactInfo } from "../content/brand";

gsap.registerPlugin(ScrollTrigger);

const manifesto =
  "Existimos para darle forma al mensaje de las marcas que tienen algo real para decir.";

const tickerWords = ["Identidad", "Estrategia", "Sistemas", "Comunicación"];

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const spy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const glyphBackX = useTransform(spx, (v) => v * 26);
  const glyphBackY = useTransform(spy, (v) => v * 26);
  const glyphFrontX = useTransform(spx, (v) => v * -44);
  const glyphFrontY = useTransform(spy, (v) => v * -44);
  const headlineX = useTransform(spx, (v) => v * 10);
  const headlineY = useTransform(spy, (v) => v * 6);

  // spotlight de cursor — mismo px/py del parallax, sin trackear el mouse dos veces.
  // Se pasa como variables CSS (--mx/--my) en vez de interpolar el string del
  // gradiente entero, así el navegador no tiene que re-parsear el valor completo
  // de `background` en cada frame.
  const spotlightX = useTransform(spx, (v) => `${(v + 0.5) * 100}%`);
  const spotlightY = useTransform(spy, (v) => `${(v + 0.5) * 100}%`);

  const prefersReducedMotion = useReducedMotion();
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => setTickerIndex((i) => (i + 1) % tickerWords.length), 2200);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  function onHeroMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // entrada cinética — se dispara una sola vez al montar, no con el scroll
      const words = headlineRef.current?.querySelectorAll("[data-word]");
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-eyebrow]",
        { opacity: 0, y: -14 },
        { opacity: 0.6, y: 0, duration: 0.7 },
      )
        .fromTo(
          words ?? [],
          { yPercent: 115, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.12 },
          "-=0.35",
        )
        .fromTo(
          "[data-tagline]",
          { opacity: 0, y: 18, scale: 0.96 },
          { opacity: 0.8, y: 0, scale: 1, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          "[data-badge]",
          { opacity: 0, scale: 0.4, rotate: -35 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" },
          "-=0.7",
        )
        .fromTo(
          "[data-bottombar]",
          { opacity: 0 },
          { opacity: 0.6, duration: 0.6 },
          "-=0.3",
        );

      const words2 = manifestoRef.current?.querySelectorAll("span");
      if (words2?.length) {
        gsap.fromTo(
          words2,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.06,
            ease: "none",
            scrollTrigger: {
              trigger: manifestoRef.current,
              start: "top 85%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* HERO — sin salto de color al scrollear. Movimiento ambiental constante
          (ondas + isotipo en paralaje) más entrada cinética al montar. */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMouseMove}
        className="relative flex h-screen flex-col justify-between overflow-hidden bg-cream px-6 pt-32 pb-14 text-ink md:px-10"
      >
        <Ripple className="z-0" />

        {/* bloques de color difuminados — rompen el monocromo cream/ink, solo con
            los 4 hex de marca + opacidad/blur */}
        <div className="pointer-events-none absolute -top-32 right-[-10%] z-0 h-[46vw] w-[46vw] max-w-[560px] rounded-full bg-navy/[0.12] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 z-0 h-[38vw] w-[38vw] max-w-[460px] rounded-full bg-red/[0.10] blur-3xl" />

        {/* spotlight que sigue al cursor — mismo px/py que ya alimenta el paralaje */}
        <motion.div
          style={{ "--mx": spotlightX, "--my": spotlightY } as CSSProperties}
          className="pointer-events-none absolute inset-0 z-0 [background:radial-gradient(circle_38vw_at_var(--mx)_var(--my),rgb(165_47_24/0.12),rgb(10_4_36/0.10)_45%,transparent_72%)]"
        />

        {/* capas de fondo — isotipo gigante y fantasma, "capas" + "profundidad" del brief */}
        <motion.div
          style={{ x: glyphBackX, y: glyphBackY }}
          className="pointer-events-none absolute -top-16 -left-24 z-0 h-[60vw] w-[60vw] max-w-[560px] opacity-[0.05]"
        >
          <LogoMark className="h-full w-full rotate-12" />
        </motion.div>
        <motion.div
          style={{ x: glyphFrontX, y: glyphFrontY }}
          className="pointer-events-none absolute -right-20 bottom-[6%] z-0 h-[42vw] w-[42vw] max-w-[420px] opacity-[0.07]"
        >
          <LogoMark className="h-full w-full -rotate-6" />
        </motion.div>

        <p data-eyebrow className="relative z-10 max-w-md text-sm tracking-widest uppercase opacity-0">
          Estudio de identidad &amp; comunicación estratégica — La Plata, AR
        </p>

        <motion.div
          style={{ x: headlineX, y: headlineY }}
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.014, 1] }}
          transition={prefersReducedMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <h1
            ref={headlineRef}
            className="font-serif flex flex-wrap text-[15vw] leading-[0.9] italic md:text-[9.5vw]"
          >
            <span className="overflow-hidden pb-[0.05em]">
              <span data-word className="inline-block">
                Craft
              </span>
            </span>
            <span className="text-red ml-[0.22em] overflow-hidden pb-[0.05em]">
              <span data-word className="inline-block">
                Studio
              </span>
            </span>
          </h1>
          <p data-tagline className="font-script mt-6 text-3xl opacity-0 md:text-4xl">
            {contactInfo.tagline}
          </p>
        </motion.div>

        {/* insignia magnética — isotipo real, gira sobre sí y lleva a Trabajos (desktop) */}
        <div data-badge className="absolute right-6 bottom-28 z-10 hidden opacity-0 md:right-10 md:block">
          <Magnetic strength={0.4}>
            <Link
              to="/trabajos"
              data-cursor="Ver trabajos"
              className="glass-panel group relative flex h-28 w-28 items-center justify-center rounded-full"
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite]">
                <path id="badge-ring" fill="none" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                <text fontSize="7.4" letterSpacing="1.5" fill="currentColor" className="uppercase">
                  <textPath href="#badge-ring">Ver trabajos ✦ Ver trabajos ✦ </textPath>
                </text>
              </svg>
              <LogoMark className="h-8 w-8 transition-transform duration-500 group-hover:scale-110" />
            </Link>
          </Magnetic>
        </div>

        {/* mismo llamado a Trabajos pero como pill inline en mobile, donde no hay
            espacio para el badge circular absoluto */}
        <div data-badge className="relative z-10 mt-6 opacity-0 md:hidden">
          <Magnetic strength={0.3}>
            <Link
              to="/trabajos"
              data-cursor="Ver trabajos"
              className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs tracking-widest uppercase"
            >
              <LogoMark className="h-4 w-4" />
              Ver trabajos ↗
            </Link>
          </Magnetic>
        </div>

        <div
          data-bottombar
          className="relative z-10 flex items-end justify-between text-xs tracking-widest uppercase opacity-0"
        >
          <span className="flex items-center gap-2">
            Scroll
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </span>
          <span className="hidden items-center gap-2 md:flex">
            <span className="text-red">✦</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={tickerWords[tickerIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {tickerWords[tickerIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>01 — Manifiesto</span>
        </div>
      </section>

      {/* MARQUEE — eco textual del "carrusel" del brief; sin logos de cliente
          reales todavía, así que corre los valores del estudio como firma */}
      <div className="border-y border-ink/10 bg-cream py-6 text-ink">
        <Marquee items={values.map((v) => v.title)} />
      </div>

      {/* MANIFIESTO */}
      <section className="relative overflow-hidden bg-navy px-6 py-40 text-cream md:px-10">
        <GlyphMark
          variant={2}
          className="pointer-events-none absolute -right-24 -bottom-24 z-0 h-[50vw] w-[50vw] max-w-[520px] text-cream/[0.05] md:-right-10"
        />
        <div className="grain-overlay !absolute !opacity-10" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <p className="mb-10 text-sm tracking-widest text-red uppercase">Propósito</p>
          <p ref={manifestoRef} className="font-serif text-4xl leading-[1.25] italic md:text-6xl">
            {manifesto.split(" ").map((w, i) => (
              <span key={i} className="inline-block mr-[0.25em]">
                {w}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* SERVICIOS — resumen */}
      <section className="bg-cream px-6 py-32 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif text-5xl italic md:text-6xl">Servicios</h2>
              <Magnetic>
                <Link
                  to="/servicios"
                  data-cursor="Ver todo"
                  className="border-b border-ink/40 pb-1 text-sm tracking-wide uppercase hover:border-ink"
                >
                  Ver todos los programas ↗
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <Link
                  to="/servicios"
                  data-cursor="Ver"
                  className="group flex flex-col gap-2 py-8 transition-colors duration-500 hover:bg-red/[0.035] md:flex-row md:items-center md:gap-10"
                >
                  <span className="font-serif text-lg opacity-40 transition-colors duration-500 group-hover:text-red group-hover:opacity-100 md:w-16">
                    {s.n}
                  </span>
                  <span className="font-serif text-2xl italic transition-transform duration-500 group-hover:translate-x-2 md:w-1/3 md:text-3xl">
                    {s.title}
                  </span>
                  <span className="text-sm opacity-60 md:flex-1">{s.summary}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRABAJOS — resumen */}
      <section className="bg-ink px-6 py-32 text-cream md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-serif text-5xl italic md:text-6xl">Trabajos</h2>
              <Magnetic>
                <Link
                  to="/trabajos"
                  data-cursor="Ver todo"
                  className="border-b border-cream/40 pb-1 text-sm tracking-wide uppercase hover:border-cream"
                >
                  Ver todos los casos ↗
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {work.slice(0, 2).map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.08}>
                <WorkCard work={w} index={i} total={work.length} to="/trabajos" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ESTUDIO — resumen */}
      <section className="bg-cream px-6 py-32 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="font-serif text-5xl italic md:text-6xl">Estudio</h2>
            <p className="mt-6 max-w-md text-lg opacity-70">
              Un estudio que piensa como estratega y construye como artesano. Criterio, oficio e
              intención antes que tendencia.
            </p>
            <Magnetic className="mt-8">
              <Link
                to="/estudio"
                data-cursor="Conocer"
                className="inline-block border-b border-ink/40 pb-1 text-sm tracking-wide uppercase hover:border-ink"
              >
                Conocer el estudio ↗
              </Link>
            </Magnetic>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            {values.slice(0, 4).map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <p className="text-xs tracking-widest text-red uppercase">{`0${i + 1}`}</p>
                <p className="font-serif mt-1 text-xl italic">{v.title}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
