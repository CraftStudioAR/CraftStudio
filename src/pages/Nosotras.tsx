import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";

export default function Nosotras() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const imgY1 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <div ref={containerRef} className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-40 pb-24 md:pt-56 md:pb-32 md:px-10 overflow-hidden z-10 min-h-[60vh] flex flex-col justify-end">
        <div className="mx-auto max-w-[1400px] w-full relative z-10">
          <Reveal>
            <p className="text-sm tracking-widest uppercase mb-6 flex items-center gap-4 text-red font-bold">
              <span className="w-12 h-[1px] bg-red" /> El Equipo
            </p>
          </Reveal>
          
          <Reveal delay={0.2}>
            <h1 className="font-serif italic text-7xl md:text-[9rem] lg:text-[12rem] leading-[0.85] tracking-tight mb-12 text-navy -ml-2 md:-ml-4">
              Nosotras<span className="text-red">.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className="px-6 py-24 md:py-32 md:px-10 bg-white relative z-20 rounded-t-[3rem] shadow-2xl">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="font-sans font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-balance text-navy">
                  Dos miradas.<br/>
                  <span className="font-serif italic text-red">Una visión integral.</span>
                </h2>
              </Reveal>
            </div>
            
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              <Reveal delay={0.1}>
                <p className="text-xl md:text-3xl text-ink/80 font-medium leading-snug text-balance">
                  <span className="font-serif italic text-red pr-1">Craft</span> nace de la unión de dos perspectivas diferentes pero complementarias. Combinamos diferentes disciplinas para entender las marcas en profundidad y encontrar oportunidades de crecimiento.
                </p>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="text-lg md:text-xl text-ink/70 leading-relaxed text-balance">
                  No buscamos resolver una necesidad aislada, sino construir un programa estratégico que permita a las marcas comunicar mejor, conectar con las personas correctas y expandir su alcance.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-ink/70 leading-relaxed text-balance">
                  Ese compromiso con la comunicación no termina en los proyectos: Para nosotras, construir una marca también es entender y estudiar el contexto en el que existe: las personas, la cultura, el consumo y los cambios que transforman la forma en que las marcas se comunican.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <div className="border-l-2 border-red pl-6 py-2 mt-8">
                  <p className="text-xl md:text-2xl font-serif italic text-navy leading-snug">
                    "Craft representa una forma de mirar y de hacer: diagnosticar, definir y construir con criterio, intención y dirección."
                  </p>
                </div>
              </Reveal>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. FOUNDERS SECTION */}
      <section className="px-6 py-24 md:py-40 md:px-10 bg-ink text-cream relative z-10">
        <div className="max-w-[1400px] mx-auto">
          
          <Reveal>
            <div className="mb-20 text-center">
              <p className="text-xs md:text-sm tracking-widest uppercase mb-4 text-red font-bold">
                Las Fundadoras
              </p>
              <h2 className="font-serif italic text-5xl md:text-7xl lg:text-8xl">
                Quienes lo hacen posible
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-16">
            
            {/* Tiziana */}
            <Reveal delay={0.2}>
              <div className="flex flex-col group">
                <div className="relative overflow-hidden aspect-[3/4] mb-8 rounded-2xl">
                  <motion.img 
                    style={{ y: imgY1, scale: 1.15 }}
                    src="/images/tiziana.jpg" 
                    alt="María Tiziana Negro" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                
                <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl mb-2 text-white">
                  María Tiziana Negro
                </h3>
                <p className="text-red font-bold tracking-widest uppercase text-xs md:text-sm mb-6">
                  Co-Fundadora · Diseño & Dirección Creativa
                </p>
                <p className="text-cream/70 text-lg leading-relaxed text-balance">
                  Diseñadora gráfica y digital recibida en Fundación Gutenberg. Busca entender las marcas, sus objetivos y las personas con las que necesitan conectar.
                </p>
                <p className="text-cream/70 text-lg leading-relaxed text-balance mt-4">
                  Construye identidades visuales estratégicas que ordenan y potencian su mensaje, permitiéndoles crecer y llegar más lejos sin perder lo que las hace únicas.
                </p>
              </div>
            </Reveal>

            {/* Martina */}
            <Reveal delay={0.4}>
              <div className="flex flex-col group md:mt-24">
                <div className="relative overflow-hidden aspect-[3/4] mb-8 rounded-2xl">
                  <motion.img 
                    style={{ y: imgY2, scale: 1.15 }}
                    src="/images/martina.jpg" 
                    alt="Martina Mincarelli" 
                    className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700" />
                </div>
                
                <h3 className="font-serif italic text-4xl md:text-5xl lg:text-6xl mb-2 text-white">
                  Martina Mincarelli
                </h3>
                <p className="text-red font-bold tracking-widest uppercase text-xs md:text-sm mb-6">
                  Co-Fundadora · Growth Marketing & Performance
                </p>
                <p className="text-cream/70 text-lg leading-relaxed text-balance">
                  Estratega de Growth Marketing y Comunicadora Digital recibida en la UNLP. Trabaja sobre la relación entre comunicación y crecimiento del negocio: cómo una marca se posiciona, construye presencia y convierte sus objetivos comerciales en decisiones concretas.
                </p>
                <p className="text-cream/70 text-lg leading-relaxed text-balance mt-4">
                  Su mirada une creatividad, análisis y criterio para desarrollar una comunicación clara, coherente y orientada a resultados.
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
