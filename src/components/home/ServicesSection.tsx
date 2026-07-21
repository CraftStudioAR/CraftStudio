import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import GlyphMark from "../GlyphMark";
import { services } from "../../content/brand";

export default function ServicesSection() {
  return (
    <section className="bg-cream px-6 py-40 md:px-10 relative overflow-hidden">
      <GlyphMark
        variant={17}
        className="pointer-events-none absolute -right-20 -top-20 z-0 h-[50vw] w-[50vw] max-w-[500px] text-ink/[0.03] md:-right-10 -rotate-12"
      />
      <div className="mx-auto max-w-6xl relative z-10">
        <Reveal>
          <div className="mb-20 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-6xl italic md:text-8xl">Servicios</h2>
            <Magnetic>
              <Link
                to="/servicios"
                data-cursor="Ver todo"
                className="border-b border-ink/40 pb-1 text-sm tracking-wide uppercase hover:border-ink"
              >
                Ver programas ↗
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <div className="border-t border-ink/10">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <Link
                to="/servicios"
                data-cursor="Ver"
                className="group flex flex-col gap-4 py-10 transition-all duration-700 hover:bg-red/[0.04] md:flex-row md:items-start md:gap-16 border-b border-ink/10 relative overflow-hidden px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl"
              >
                <span className="font-serif text-2xl opacity-40 transition-colors duration-500 group-hover:text-red group-hover:opacity-100 md:w-16 pt-1">
                  {s.n}
                </span>
                <div className="flex-1">
                  <span className="block font-serif text-3xl italic transition-transform duration-700 group-hover:translate-x-2 md:text-5xl mb-4">
                    {s.title}
                  </span>
                  <span className="block max-w-lg text-lg opacity-60 leading-relaxed transition-all duration-700 group-hover:opacity-90 group-hover:translate-x-2">
                    {s.summary}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
