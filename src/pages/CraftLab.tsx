
import Reveal from "../components/Reveal";

// Generar una lista falsa para demostrar las tarjetas ricas
const articles = [
  { id: "01", date: "24 OCT", title: "La construcción de valor", category: "Estrategia", image: "/images/lab1.jpg", desc: "Cómo las marcas modernas trasladan su propuesta de valor a un ecosistema digital saturado.", aspect: "aspect-[4/5]" },
  { id: "02", date: "18 OCT", title: "Tipografía como identidad", category: "Diseño", image: "/images/lab2.jpg", desc: "El rol de las variables tipográficas en la construcción de una voz de marca reconocible.", aspect: "aspect-[1/1]" },
  { id: "03", date: "05 OCT", title: "Comunicación digital", category: "Cultura", image: "/images/lab3.jpg", desc: "Análisis del nuevo paradigma de comunicación asíncrona y su impacto en las comunidades.", aspect: "aspect-[3/4]" },
  { id: "04", date: "22 SEP", title: "El fin del branding tradicional", category: "Estrategia", image: "/images/lab1.jpg", desc: "Por qué los manuales de marca rígidos están siendo reemplazados por sistemas fluidos.", aspect: "aspect-[4/3]" },
  { id: "05", date: "14 SEP", title: "Micro-interacciones en UX", category: "Diseño", image: "/images/lab2.jpg", desc: "Pequeños detalles en la interfaz que generan grandes impactos emocionales en el usuario.", aspect: "aspect-[4/5]" },
  { id: "06", date: "01 SEP", title: "El nuevo lujo", category: "Estrategia", image: "/images/lab3.jpg", desc: "El lujo silencioso y la experiencia sobre la ostentación en el diseño contemporáneo.", aspect: "aspect-[1/1]" },
  { id: "07", date: "28 AGO", title: "Narrativas visuales", category: "Arte", image: "/images/lab1.jpg", desc: "El uso del arte 3D y el surrealismo para construir mundos inmersivos de marca.", aspect: "aspect-[3/4]" },
  { id: "08", date: "15 AGO", title: "Minimalismo cálido", category: "Diseño", image: "/images/lab2.jpg", desc: "La evolución estética del minimalismo frío hacia paletas y texturas orgánicas.", aspect: "aspect-[4/5]" },
];

export default function CraftLab() {
  return (
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* HERO SECTION */}
      <section className="relative px-6 pt-40 pb-16 md:pt-48 md:pb-24 md:px-10 overflow-hidden z-10">
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

      {/* MASONRY EDITORIAL GRID SECTION */}
      <section className="px-6 md:px-10 pb-32">
        <div className="mx-auto max-w-[1400px]">
          {/* CSS Columns para efecto Masonry real */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-12 lg:gap-16">
            
            {articles.map((article, index) => (
              <Reveal key={article.id} delay={0.1 * (index % 3)}>
                <div className="break-inside-avoid mb-16 flex flex-col group cursor-pointer">
                  
                  {/* Tarjeta Visual */}
                  <div className={`relative w-full ${article.aspect} overflow-hidden rounded-2xl bg-ink/5 mb-6`}>
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <div className="bg-cream text-ink font-bold text-[10px] uppercase tracking-widest px-6 py-3 rounded-full translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                        Leer Artículo
                      </div>
                    </div>
                  </div>

                  {/* Metadatos y Título (Ajustados para grilla) */}
                  <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[9px] md:text-[10px] tracking-widest text-red uppercase font-bold bg-red/10 px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-[9px] md:text-[10px] tracking-widest text-ink/50 uppercase font-bold py-1">
                        {article.date}
                      </span>
                    </div>
                    
                    <h2 className="font-serif italic text-3xl md:text-4xl text-navy mb-3 group-hover:text-red transition-colors leading-[1.1]">
                      {article.title}
                    </h2>
                    
                    <p className="text-sm md:text-base opacity-70 text-balance line-clamp-3 leading-relaxed">
                      {article.desc}
                    </p>
                  </div>

                </div>
              </Reveal>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}
