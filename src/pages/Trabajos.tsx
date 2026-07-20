import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { work } from "../content/brand";

const bgs = [
  "from-red to-red-dim",
  "from-navy to-ink",
  "from-ink to-navy",
  "from-red-dim to-ink",
];

export default function Trabajos() {
  return (
    <>
      <section className="bg-cream px-6 pt-40 pb-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-6 text-sm tracking-widest text-red uppercase">Trabajos</p>
            <h1 className="font-serif text-5xl italic md:text-7xl">
              Sistemas construidos, no piezas entregadas.
            </h1>
            <p className="mt-8 max-w-xl text-lg opacity-70">
              Una selección de programas de identidad y comunicación. Casos completos disponibles
              a pedido durante una reunión.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-16 md:grid-cols-2">
          {work.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 0.08}>
              <Link to="/contacto" data-cursor="Solicitar caso" className="group block">
                <div
                  className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br ${bgs[i % bgs.length]}`}
                >
                  <span className="font-serif px-6 text-center text-3xl text-cream/90 italic transition-transform duration-700 ease-out group-hover:scale-105">
                    {w.client}
                  </span>
                  <div className="grain-overlay !absolute !opacity-15" />

                  {/* corner ticks — eco del visor del cursor personalizado */}
                  <span className="absolute top-4 left-4 h-3 w-3 border-t border-l border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                  <span className="absolute top-4 right-4 h-3 w-3 border-t border-r border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                  <span className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />
                  <span className="absolute right-4 bottom-4 h-3 w-3 border-r border-b border-cream/70 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />

                  <span className="absolute right-4 bottom-4 text-xs tracking-widest text-cream/70 uppercase">
                    {String(i + 1).padStart(2, "0")} / {String(work.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="opacity-70">{w.category}</span>
                  <span className="opacity-50">{w.year}</span>
                </div>
                <p className="mt-2 max-w-md text-sm opacity-60">{w.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
