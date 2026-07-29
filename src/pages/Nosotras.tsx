import Reveal from "../components/Reveal";

export default function Nosotras() {
  return (
    <div data-theme="light" className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* 1. HERO Y MANIFIESTO CORTO */}
      <section className="relative px-6 pt-40 pb-20 md:pt-48 md:pb-32 md:px-10 overflow-hidden z-10 flex flex-col items-center text-center">
        <div className="mx-auto max-w-[1000px] w-full flex flex-col items-center gap-12 md:gap-16">
          
          <Reveal>
            <p className="text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-4 text-red font-bold">
              <span className="w-8 h-[1px] bg-red" /> El Estudio <span className="w-8 h-[1px] bg-red" />
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-serif italic text-7xl md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight text-navy">
              Nosotras<span className="text-red">.</span>
            </h1>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h2 className="font-sans font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance text-navy mt-4 md:mt-8">
              Dos miradas.<br/>
              <span className="font-serif italic text-red">Una visión integral.</span>
            </h2>
          </Reveal>

          <div className="mt-8 md:mt-12 text-xl md:text-3xl text-ink/80 leading-relaxed text-balance text-center max-w-[800px] mx-auto">
            <Reveal delay={0.3}>
              <p>
                <strong className="font-serif italic text-red pr-2 font-normal">Craft</strong> nace de la unión de dos perspectivas diferentes pero complementarias. Combinamos disciplinas para entender las marcas en profundidad y encontrar oportunidades de crecimiento.
              </p>
            </Reveal>
          </div>

        </div>
      </section>

      {/* 2. FUNDADORAS (Intercalado) */}
      <section className="px-6 py-20 md:py-24 md:px-10 relative z-10">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Tiziana */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 group">
              <Reveal>
                <div data-theme="dark" className="relative w-48 h-60 md:w-56 md:h-72 shrink-0 overflow-hidden rounded-xl bg-ink/5 mx-auto lg:mx-0">
                  <img 
                    src="/images/tiziana.jpg" 
                    alt="María Tiziana Negro" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-col text-center lg:text-left pt-4">
                  <h3 className="font-serif italic text-3xl md:text-4xl mb-2 text-navy">
                    Tiziana Negro
                  </h3>
                  <p className="text-red font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6">
                    Diseño & Dirección Creativa
                  </p>
                  <div className="text-ink/70 text-sm md:text-base leading-relaxed text-balance space-y-4">
                    <p>Diseñadora gráfica y digital recibida en Fundación Gutenberg. Busca entender las marcas, sus objetivos y las personas con las que necesitan conectar.</p>
                    <p>Construye identidades visuales estratégicas que ordenan y potencian su mensaje, permitiéndoles crecer y llegar más lejos sin perder lo que las hace únicas.</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Martina */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 group">
              <Reveal>
                <div data-theme="dark" className="relative w-48 h-60 md:w-56 md:h-72 shrink-0 overflow-hidden rounded-xl bg-ink/5 mx-auto lg:mx-0">
                  <img 
                    src="/images/martina.jpg" 
                    alt="Martina Mincarelli" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-col text-center lg:text-left pt-4">
                  <h3 className="font-serif italic text-3xl md:text-4xl mb-2 text-navy">
                    Martina Mincarelli
                  </h3>
                  <p className="text-red font-bold tracking-widest uppercase text-[10px] md:text-xs mb-6">
                    Growth Marketing & Performance
                  </p>
                  <div className="text-ink/70 text-sm md:text-base leading-relaxed text-balance space-y-4">
                    <p>Estratega de Growth Marketing y Comunicadora Digital recibida en la UNLP. Trabaja sobre la relación entre comunicación y crecimiento del negocio: cómo una marca se posiciona, construye presencia y convierte sus objetivos comerciales en decisiones concretas.</p>
                    <p>Su mirada une creatividad, análisis y criterio para desarrollar una comunicación clara, coherente y orientada a resultados.</p>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FILOSOFÍA FINAL (Cierre dinámico) */}
      <section className="px-6 pb-32 md:pb-48 pt-10 md:pt-16 md:px-10 relative z-20">
        <div className="max-w-[1200px] mx-auto border-t border-ink/10 pt-16 md:pt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Texto a la izquierda */}
            <Reveal>
              <p className="text-2xl md:text-4xl text-navy font-serif italic leading-snug md:leading-relaxed text-balance">
                No buscamos resolver una necesidad aislada, sino construir un programa estratégico que permita a las marcas comunicar mejor, conectar con las personas correctas y expandir su alcance.
              </p>
            </Reveal>
            
            {/* Contenedor blanco a la derecha */}
            <Reveal delay={0.2}>
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-ink/5 relative">
                {/* Acento decorativo */}
                <span className="absolute top-0 left-8 w-12 h-[2px] bg-red -translate-y-[1px]"></span>
                <p className="text-lg md:text-xl text-ink/70 leading-relaxed text-balance">
                  Ese compromiso con la comunicación no termina en los proyectos: Para nosotras, construir una marca también es entender y estudiar el contexto en el que existe: las personas, la cultura, el consumo y los cambios que transforman la forma en que las marcas se comunican.
                </p>
              </div>
            </Reveal>

          </div>
          
          {/* Cita final centrada */}
          <Reveal delay={0.4}>
            <div className="mt-20 md:mt-32 text-center max-w-[800px] mx-auto relative">
              <p className="text-3xl md:text-5xl font-serif italic text-navy/90 leading-tight">
                “Craft representa una forma de mirar y de hacer: diagnosticar, definir y construir con criterio, intención y dirección.”
              </p>
            </div>
          </Reveal>

        </div>
      </section>

    </div>
  );
}
