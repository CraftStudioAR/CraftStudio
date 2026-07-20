import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "../components/Reveal";
import { services, values, work, contactInfo } from "../content/brand";

gsap.registerPlugin(ScrollTrigger);

const manifesto =
  "Existimos para darle forma al mensaje de las marcas que tienen algo real para decir.";

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        backgroundColor: "#0a0424",
        color: "#f2ebe9",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const words = manifestoRef.current?.querySelectorAll("span");
      if (words?.length) {
        gsap.fromTo(
          words,
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
      {/* HERO — el fondo pasa de crema a navy a medida que se scrollea, la
          tensión "calma + intriga" del brief traducida a color en movimiento */}
      <section ref={heroRef} className="relative h-[170vh] bg-cream text-ink">
        <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 pt-32 pb-14 md:px-10">
          <p className="max-w-md text-sm tracking-widest uppercase opacity-60">
            Estudio de identidad &amp; comunicación estratégica — La Plata, AR
          </p>

          <div>
            <h1 className="font-serif text-[15vw] leading-[0.9] italic md:text-[9.5vw]">
              Craft Studio
            </h1>
            <p className="font-script mt-6 text-3xl opacity-80 md:text-4xl">
              {contactInfo.tagline}
            </p>
          </div>

          <div className="flex items-end justify-between text-xs tracking-widest uppercase opacity-60">
            <span>Scroll</span>
            <span>01 — Manifiesto</span>
          </div>
        </div>
      </section>

      {/* MANIFIESTO */}
      <section className="bg-navy px-6 py-40 text-cream md:px-10">
        <div className="mx-auto max-w-4xl">
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
              <Link
                to="/servicios"
                data-cursor="Ver todo"
                className="border-b border-ink/40 pb-1 text-sm tracking-wide uppercase hover:border-ink"
              >
                Ver todos los programas ↗
              </Link>
            </div>
          </Reveal>

          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <Link
                  to="/servicios"
                  data-cursor="Ver"
                  className="group flex flex-col gap-2 py-8 md:flex-row md:items-center md:gap-10"
                >
                  <span className="font-serif text-lg opacity-40 md:w-16">{s.n}</span>
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
              <Link
                to="/trabajos"
                data-cursor="Ver todo"
                className="border-b border-cream/40 pb-1 text-sm tracking-wide uppercase hover:border-cream"
              >
                Ver todos los casos ↗
              </Link>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2">
            {work.slice(0, 2).map((w, i) => (
              <Reveal key={w.slug} delay={i * 0.08}>
                <Link to="/trabajos" data-cursor="Ver caso" className="group block">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-red to-red-dim">
                    <span className="font-serif text-3xl text-cream/90 italic transition-transform duration-700 group-hover:scale-105">
                      {w.client}
                    </span>
                    <div className="grain-overlay !absolute !opacity-15" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="opacity-70">{w.category}</span>
                    <span className="opacity-50">{w.year}</span>
                  </div>
                </Link>
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
            <Link
              to="/estudio"
              data-cursor="Conocer"
              className="mt-8 inline-block border-b border-ink/40 pb-1 text-sm tracking-wide uppercase hover:border-ink"
            >
              Conocer el estudio ↗
            </Link>
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
