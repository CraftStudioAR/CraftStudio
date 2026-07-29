import Reveal from "../components/Reveal";

export default function Nosotras() {
  return (
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-40 pb-16 md:pt-48 md:pb-24 md:px-10 overflow-hidden z-10">
        <div className="mx-auto max-w-[1400px] w-full relative z-10">
          <Reveal>
            <p className="text-xs md:text-sm tracking-widest uppercase mb-6 flex items-center gap-4 text-red font-bold">
              <span className="w-8 h-[1px] bg-red" /> El Equipo
            </p>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h1 className="font-serif italic text-6xl md:text-8xl lg:text-[10rem] leading-[0.85] tracking-tight text-navy">
              Nosotras<span className="text-red">.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* 2. FILOSOFÍA - SPLIT SCREEN EDITORIAL (Todo crema, sin cortes) */}
      <section className="px-6 pb-24 md:pb-40 md:px-10 relative z-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Título Pegajoso (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit">
            <Reveal>
              <h2 className="font-sans font-medium text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance text-navy">
                Dos miradas.<br/>
                <span className="font-serif italic text-red">Una visión<br/>integral.</span>
              </h2>
            </Reveal>
          </div>
          
          {/* Textos que scrollean */}
          <div className="lg:col-span-7 space-y-16 md:space-y-24 mt-8 lg:mt-0">
            <Reveal delay={0.1}>
              <p className="text-2xl md:text-4xl text-ink/90 font-medium leading-snug md:leading-snug text-balance">
                <span className="font-serif italic text-red pr-2">Craft</span> nace de la unión de dos perspectivas diferentes pero complementarias. Combinamos disciplinas para entender las marcas en profundidad y encontrar su verdadero potencial.
              </p>
            </Reveal>
            
            <Reveal>
              <div className="flex flex-col gap-6 pl-4 md:pl-10 border-l border-ink/10">
                <p className="text-lg md:text-xl text-ink/70 leading-relaxed text-balance">
                  No buscamos resolver una necesidad aislada, sino construir un programa estratégico que permita a las marcas comunicar mejor, conectar con las personas correctas y expandir su alcance.
                </p>
                <p className="text-lg md:text-xl text-ink/70 leading-relaxed text-balance">
                  Ese compromiso no termina en los proyectos: para nosotras, construir una marca también es estudiar el contexto en el que existe: las personas, la cultura, el consumo y los constantes cambios del mundo digital.
                </p>
              </div>
            </Reveal>
          </div>
          
        </div>
      </section>

      {/* 3. LAS FUNDADORAS - CLEAN GRID */}
      <section className="px-6 pb-24 md:pb-40 md:px-10 relative z-10 border-t border-ink/10 pt-24 md:pt-40">
        <div className="max-w-[1400px] mx-auto">
          
          <Reveal>
            <h2 className="font-serif italic text-5xl md:text-6xl text-navy mb-20">Quienes lo hacen posible.</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Tiziana */}
            <div className="flex flex-col group">
              <Reveal>
                <div className="relative overflow-hidden aspect-[4/5] mb-8 rounded-2xl bg-ink/5">
                  <img 
                    src="/images/tiziana.jpg" 
                    alt="María Tiziana Negro" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </Reveal>
              <Reveal>
                <h3 className="font-serif italic text-3xl md:text-4xl mb-2 text-navy">
                  María Tiziana Negro
                </h3>
                <p className="text-red font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6">
                  Co-Fundadora · Diseño & Dirección Creativa
                </p>
                <p className="text-ink/70 text-base md:text-lg leading-relaxed text-balance">
                  Diseñadora gráfica y digital recibida en Fundación Gutenberg. Busca entender las marcas, sus objetivos y las personas con las que necesitan conectar. Construye identidades visuales estratégicas que ordenan y potencian su mensaje, permitiéndoles crecer y llegar más lejos sin perder lo que las hace únicas.
                </p>
              </Reveal>
            </div>

            {/* Martina */}
            <div className="flex flex-col group md:mt-24">
              <Reveal>
                <div className="relative overflow-hidden aspect-[4/5] mb-8 rounded-2xl bg-ink/5">
                  <img 
                    src="/images/martina.jpg" 
                    alt="Martina Mincarelli" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              </Reveal>
              <Reveal>
                <h3 className="font-serif italic text-3xl md:text-4xl mb-2 text-navy">
                  Martina Mincarelli
                </h3>
                <p className="text-red font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6">
                  Co-Fundadora · Growth Marketing & Performance
                </p>
                <p className="text-ink/70 text-base md:text-lg leading-relaxed text-balance">
                  Estratega de Growth Marketing y Comunicadora Digital recibida en la UNLP. Trabaja sobre la relación entre comunicación y crecimiento del negocio: cómo una marca se posiciona, construye presencia y convierte sus objetivos comerciales en decisiones concretas. Su mirada une creatividad, análisis y criterio.
                </p>
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
