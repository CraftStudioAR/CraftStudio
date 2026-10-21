import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { getCraftLabArticles } from "../lib/supabaseClient";
import { getImageUrl } from "../lib/cloudinary";

interface Article {
  id: string;
  slug: string;
  date: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  aspect?: string;
  content: string;
}

import SEO from "../components/SEO";
import { buildBreadcrumbSchema } from "../utils/seoSchemas";

// Columnas de la grilla según el ancho (mismos cortes que md y lg de Tailwind)
function useColumnCount() {
  const getCount = () => (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1);
  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
}

export default function CraftLab() {
  const [articlesList, setArticlesList] = useState<Article[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const columnCount = useColumnCount();

  useEffect(() => {
    getCraftLabArticles().then((data: any) => setArticlesList(data));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(articlesList.map((a) => a.category).filter(Boolean))),
    [articlesList]
  );

  const visibleArticles = activeCategory
    ? articlesList.filter((a) => a.category === activeCategory)
    : articlesList;

  // Reparto por filas: la nota i va a la columna i % n, así la más nueva queda
  // arriba a la izquierda y el orden se lee de izquierda a derecha (las columnas
  // CSS lo llenaban de arriba hacia abajo).
  const columns = Array.from({ length: columnCount }, (_, c) =>
    visibleArticles.filter((_, i) => i % columnCount === c)
  );
  return (
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      <SEO
        title="Craft Lab — Ensayos y Cultura de Marca"
        description="Craft Lab es nuestro espacio de pensamiento, investigación y ensayística sobre branding, diseño, tipografía, micro-interacciones y cultura digital."
        keywords="craft lab, ensayos branding, cultura de marca, tipografia como identidad, construccion de valor, pensamiento de diseño"
        jsonLd={buildBreadcrumbSchema([
          { name: "Inicio", url: "/" },
          { name: "Craft Lab", url: "/craft-lab" }
        ])}
      />
      
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
                Un espacio editorial de ideas, ensayos y curadurías donde desglosamos la <span className="font-sans italic text-red">mirada Craft</span>: observar el contexto para entender cómo las marcas se construyen, se comunican y responden al paradigma actual.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MASONRY EDITORIAL GRID SECTION */}
      <section className="px-6 md:px-10 pb-32">
        <div className="mx-auto max-w-[1400px]">
          {/* Filtro por categoría */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
              {[null, ...categories].map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat ?? "todas"}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    aria-pressed={isActive}
                    className={`text-[10px] md:text-xs tracking-widest uppercase font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                      isActive ? "bg-red text-cream" : "bg-red/10 text-red hover:bg-red/20"
                    }`}
                  >
                    {cat ?? "Todas"}
                  </button>
                );
              })}
            </div>
          )}

          {/* Masonry: columnas flex, con las notas repartidas por filas */}
          <div className="flex gap-8 md:gap-12 lg:gap-16 items-start">
            {columns.map((column, c) => (
              <div key={c} className="flex-1 min-w-0 flex flex-col">
                {column.map((article) => (
                  <Reveal key={article.id} delay={0.1 * c}>
                    <Link to={`/craft-lab/${article.slug}`} className="mb-16 flex flex-col group cursor-pointer">
                      
                      {/* Tarjeta Visual */}
                      <div className={`relative w-full ${article.aspect || 'aspect-[4/5]'} overflow-hidden rounded-sm bg-ink/5 mb-6`}>
                        <img 
                          src={getImageUrl(article.image)} 
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
                          <span className="text-[9px] md:text-[10px] tracking-widest text-red uppercase font-bold bg-red/10 px-3.5 py-1.5 rounded-lg">
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

                    </Link>
                  </Reveal>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
