import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function Nosotras() {
  return (
    <div data-theme="light" className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* 1. HERO / INTRO SECTION */}
      <section className="pt-32 pb-16 md:pt-44 md:pb-20 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-2 text-xs md:text-sm tracking-widest uppercase text-red font-semibold mb-8">
            <span className="w-4 h-[1.5px] bg-red" />
            <span>Nosotras</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-ink tracking-tight">
                Dos miradas.<br />
                <span className="italic text-red font-serif">Una visión integral.</span>
              </h1>
            </Reveal>
          </div>
          
          <div className="lg:col-span-5 lg:pt-4">
            <Reveal delay={0.2}>
              <p className="text-ink/75 text-base md:text-lg leading-relaxed">
                Craft nace de la unión de dos perspectivas diferentes pero complementarias. Combinamos diferentes disciplinas para entender las marcas en profundidad y encontrar oportunidades de crecimiento.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <hr className="border-ink/10" />
      </div>

      {/* 2. FOUNDER 1: MARÍA TIZIANA NEGRO (Photo Left, Details Right) */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Photo */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative group overflow-hidden rounded-sm bg-ink/5 shadow-md">
                <img 
                  src="/images/tiziana.webp" 
                  alt="María Tiziana Negro" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 left-5 z-10 pointer-events-none">
                  <span className="font-script text-3xl md:text-4xl text-white/90 drop-shadow-md">Tizi</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Details */}
          <div className="lg:col-span-6 flex flex-col">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-red font-medium mb-3">
                <span className="w-4 h-[1.5px] bg-red" />
                <span>Co-Fundadora</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-2">
                María Tiziana Negro
              </h2>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-ink/60 uppercase mb-6 md:mb-8">
                Diseño & Dirección Creativa
              </p>
              <div className="space-y-4 text-ink/80 text-sm sm:text-base leading-relaxed">
                <p>
                  Diseñadora gráfica y digital recibida en Fundación Gutenberg. Busca entender las marcas, sus objetivos y las personas con las que necesitan conectar.
                </p>
                <p>
                  Construye identidades visuales estratégicas que ordenan y potencian su mensaje, permitiéndoles crecer y llegar más lejos sin perder lo que las hace únicas.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <hr className="border-ink/10" />
      </div>

      {/* 3. FOUNDER 2: MARTINA MINCARELLI (Details Left, Photo Right) */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Details */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1">
            <Reveal delay={0.1}>
              <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-red font-medium mb-3">
                <span className="w-4 h-[1.5px] bg-red" />
                <span>Co-Fundadora</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ink mb-2">
                Martina Mincarelli
              </h2>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-ink/60 uppercase mb-6 md:mb-8">
                Dirección Comercial & Marketing
              </p>
              <div className="space-y-4 text-ink/80 text-sm sm:text-base leading-relaxed">
                <p>
                  Estratega de Growth Marketing y Comunicadora Digital recibida en la UNLP. Trabaja sobre la relación entre comunicación y crecimiento del negocio: cómo una marca se posiciona, construye presencia y convierte sus objetivos comerciales en decisiones concretas.
                </p>
                <p>
                  Su mirada une creatividad, análisis y criterio para desarrollar una comunicación clara, coherente y orientada a resultados.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Photo */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <Reveal>
              <div className="relative group overflow-hidden rounded-sm bg-ink/5 shadow-md">
                <img 
                  src="/images/martina.webp" 
                  alt="Martina Mincarelli" 
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute bottom-4 right-5 z-10 pointer-events-none">
                  <span className="font-script text-3xl md:text-4xl text-white/90 drop-shadow-md">Marti</span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 4. NUESTRA FORMA DE TRABAJO (Dark Editorial Section with Full Background Image) */}
      <section data-theme="dark" className="relative bg-ink text-cream py-20 md:py-28 px-6 md:px-12 lg:px-20 mt-8 overflow-hidden">
        {/* Background Image covering the entire section */}
        <img 
          src="/images/nosotras.webp" 
          alt="Nuestra forma de trabajo" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Gradient Overlay: Difuminado como antes sobre el texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/75 via-45% to-transparent z-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Text on the side */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <div className="text-[11px] md:text-xs tracking-[0.25em] uppercase font-bold text-cream/70 mb-8">
                Nuestra forma de trabajo
              </div>
              
              <div className="space-y-6 text-cream/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                <p>
                  No buscamos resolver una necesidad aislada, sino construir un programa estratégico que permita a las marcas comunicar mejor, conectar con las personas correctas y expandir su alcance.
                </p>
                <p>
                  Ese compromiso con la comunicación no termina en los proyectos: Para nosotras, construir una marca también es entender y estudiar el contexto en el que existe: las personas, la cultura, el consumo y los cambios que transforman la forma en que las marcas se comunican.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-white/15">
                <p className="font-serif italic text-base md:text-lg text-cream/90 mb-4">
                  Craft representa una forma de mirar y de hacer:
                </p>
                <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-2 font-serif text-xl sm:text-2xl md:text-3xl text-cream font-light">
                  <span className="hover:text-red transition-colors">Con criterio</span>
                  <span className="text-cream/30">/</span>
                  <span className="hover:text-red transition-colors">Con intención</span>
                  <span className="text-cream/30">/</span>
                  <span className="hover:text-red transition-colors">Con dirección</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Open space to highlight the background image */}
          <div className="hidden lg:block lg:col-span-5" />
        </div>
      </section>

      {/* 5. FOOTER SIGN-OFF BAR */}
      <section className="bg-cream py-10 md:py-14 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto border-t border-ink/10">
        <div className="flex flex-row items-center justify-between">
          <div className="font-script text-3xl sm:text-4xl md:text-5xl text-ink">
            Tizi + Marti
          </div>
          <Link 
            to="/contacto"
            className="group flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-ink hover:text-red transition-colors"
          >
            <span>Trabajemos juntos</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">{"\u2192"}</span>
          </Link>
        </div>
      </section>

    </div>
  );
}
