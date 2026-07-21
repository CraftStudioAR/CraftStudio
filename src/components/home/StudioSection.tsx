import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";
import { LogoMark } from "../Logo";
import { values } from "../../content/brand";

export default function StudioSection() {
  return (
    <section className="bg-cream px-6 py-32 md:px-10 border-t border-ink/10">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2 items-center">
        <Reveal>
          <h2 className="font-serif text-6xl italic md:text-8xl">Estudio</h2>
          <p className="mt-8 max-w-md text-xl opacity-75 leading-relaxed">
            Un estudio que piensa como estratega y construye como artesano. Criterio, oficio e
            intención antes que tendencia.
          </p>
          <div className="mt-12 flex gap-4">
            <Magnetic>
              <Link
                to="/estudio"
                data-cursor="Conocer"
                className="glass-panel group relative inline-flex items-center gap-3 rounded-lg px-8 py-4 bg-ink text-cream hover:bg-navy transition-colors duration-300"
              >
                <LogoMark className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                <span className="text-xs tracking-widest uppercase">Conocer el estudio</span>
              </Link>
            </Magnetic>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12">
          {values.slice(0, 4).map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="relative">
                <span className="absolute -left-4 -top-6 text-7xl font-serif italic text-ink/[0.04] pointer-events-none">
                  0{i + 1}
                </span>
                <p className="font-serif text-2xl italic relative z-10">{v.title}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
