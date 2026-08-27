import { Link } from "react-router-dom";
import Reveal from "../Reveal";
import Magnetic from "../Magnetic";

export default function ServicesSection() {
  return (
    <section className="bg-cream text-ink py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 flex flex-col gap-8 md:gap-12">
        
        {/* Header General */}
        <Reveal>
          <div className="max-w-4xl">
            <p className="text-sm tracking-widest text-red uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-red" /> SERVICIOS
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight leading-tight">
              Dos formas de trabajar.<br />
              <span className="font-serif italic font-medium text-red">Una solución única</span> para cada marca.
            </h2>
            <p className="text-base md:text-lg text-ink/80 max-w-3xl text-balance font-sans leading-relaxed">
              Partimos de dos modalidades y construimos dentro de cada una la solución que mejor responde a las necesidades, objetivos y momento de cada proyecto.
            </p>
          </div>
        </Reveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Card 1: Programs */}
          <Reveal>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col items-start">
              <h3 className="font-sans font-normal text-4xl md:text-5xl tracking-tight mb-4 text-ink">
                Programs
              </h3>
              <p className="font-sans text-base md:text-lg text-ink/80 mb-4 text-balance">
                Construimos la dirección de tu marca.
              </p>
              <p className="font-sans italic text-sm md:text-base text-ink/60 mb-12 flex-grow text-balance">
                Ideal para: crear una marca desde cero, reposicionarla o actualizar su identidad y comunicación.
              </p>

              <Magnetic>
                <Link
                  to="/servicios"
                  className="group flex justify-center items-center gap-2 rounded-xl px-6 py-2.5 bg-red text-cream hover:bg-red/90 hover:scale-105 transition-all duration-300"
                >
                  <span className="font-bold tracking-tight text-sm">Ver Programs</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 shrink-0"
                    >
                      <line x1="2" y1="10" x2="10" y2="2" />
                      <polyline points="4 2 10 2 10 8" />
                    </svg>
                  </span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          {/* Card 2: Brand Partnerships */}
          <Reveal delay={0.2}>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full flex flex-col items-start">
              <h3 className="font-sans font-normal text-4xl md:text-5xl tracking-tight mb-4 text-ink">
                Brand Partnerships
              </h3>
              <p className="font-sans text-base md:text-lg text-ink/80 mb-4 text-balance">
                Diseñamos y dirigimos acciones de comunicación para marcas que ya cuentan con una dirección definida.
              </p>
              <p className="font-sans italic text-sm md:text-base text-ink/60 mb-12 flex-grow text-balance">
                Ideal para: campañas, lanzamientos, producciones y activaciones.
              </p>

              <Magnetic>
                <Link
                  to="/servicios"
                  className="group flex justify-center items-center gap-2 rounded-xl px-6 py-2.5 bg-red text-cream hover:bg-red/90 hover:scale-105 transition-all duration-300"
                >
                  <span className="font-bold tracking-tight text-sm">Ver Brand Partnerships</span>
                  <span className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-3 h-3 shrink-0"
                    >
                      <line x1="2" y1="10" x2="10" y2="2" />
                      <polyline points="4 2 10 2 10 8" />
                    </svg>
                  </span>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
