import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import Footer from "../components/Footer";

// Generar una lista falsa para demostrar las tarjetas ricas
const articles = [
  { id: "01", date: "24 OCT", title: "La construcción de valor", category: "Estrategia", image: "/images/lab1.jpg", desc: "Cómo las marcas modernas trasladan su propuesta de valor a un ecosistema digital saturado." },
  { id: "02", date: "18 OCT", title: "Tipografía como identidad", category: "Diseño", image: "/images/lab2.jpg", desc: "El rol de las variables tipográficas en la construcción de una voz de marca reconocible." },
  { id: "03", date: "05 OCT", title: "Comunicación digital", category: "Cultura", image: "/images/lab3.jpg", desc: "Análisis del nuevo paradigma de comunicación asíncrona y su impacto en las comunidades." },
  { id: "04", date: "22 SEP", title: "El fin del branding tradicional", category: "Estrategia", image: "/images/lab1.jpg", desc: "Por qué los manuales de marca rígidos están siendo reemplazados por sistemas fluidos." },
  { id: "05", date: "14 SEP", title: "Micro-interacciones en UX", category: "Diseño", image: "/images/lab2.jpg", desc: "Pequeños detalles en la interfaz que generan grandes impactos emocionales en el usuario." },
];

export default function CraftLab() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Usamos el scroll vertical de esta sección para desplazar el contenido horizontalmente
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mapeamos el progreso de scroll (0 a 1) a un desplazamiento en X
  // Ajustamos el valor final para que se puedan ver todas las tarjetas
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* HERO SECTION */}
      <section className="relative px-6 pt-40 pb-16 md:pt-48 md:pb-32 md:px-10 overflow-hidden z-10">
        <div className="mx-auto max-w-[1400px] w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <Reveal>
              <h1 className="font-serif italic text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight text-navy">
                Craft Lab<span className="text-red">.</span>
              </h1>
            </Reveal>
          </div>
          <div className="md:pb-4">
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl text-ink/80 font-medium leading-relaxed text-balance max-w-xl">
                Un espacio editorial de ideas, ensayos y curadurías donde desglosamos la <span className="font-serif italic text-red">mirada Craft</span>: observar el contexto para entender cómo las marcas se construyen, se comunican y responden al paradigma actual.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL SECTION */}
      <section ref={targetRef} className="relative h-[300vh] border-t border-ink/10">
        {/* El contenedor pegajoso que se queda en pantalla mientras scrolleamos */}
        <div className="sticky top-0 h-screen flex items-center overflow-hidden bg-cream">
          
          <motion.div style={{ x }} className="flex gap-8 md:gap-16 px-6 md:px-10">
            {articles.map((article, index) => {
              return (
                <div 
                  key={article.id} 
                  className="w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 flex flex-col group cursor-pointer"
                >
                  {/* Tarjeta Visual */}
                  <div className="relative w-full aspect-[4/5] lg:aspect-[4/5] overflow-hidden rounded-2xl bg-ink/5 mb-6 md:mb-8">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-cream text-ink font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        Leer Artículo
                      </div>
                    </div>
                  </div>

                  {/* Metadatos y Título */}
                  <div className="flex flex-col flex-1">
                    <div className="flex gap-3 mb-4">
                      <span className="text-[10px] tracking-widest text-red uppercase font-bold bg-red/10 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-[10px] tracking-widest text-ink/50 uppercase font-bold py-1">
                        {article.date}
                      </span>
                    </div>
                    
                    <h2 className="font-serif italic text-4xl md:text-5xl text-navy mb-4 group-hover:text-red transition-colors">
                      {article.title}
                    </h2>
                    
                    <p className="text-base md:text-lg opacity-70 text-balance line-clamp-3">
                      {article.desc}
                    </p>
                  </div>

                </div>
              );
            })}
            
            {/* Espaciador al final para que no corte abruptamente */}
            <div className="w-[10vw] flex-shrink-0"></div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
