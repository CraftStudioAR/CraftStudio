import { useState, useEffect } from "react";
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

export default function CraftLab() {
  const [articlesList, setArticlesList] = useState<Article[]>([]);

  useEffect(() => {
    getCraftLabArticles().then((data: any) => setArticlesList(data));
  }, []);
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
            
            {articlesList.map((article, index) => (
              <Reveal key={article.id} delay={0.1 * (index % 3)}>
                <Link to={`/craft-lab/${article.slug}`} className="break-inside-avoid mb-16 flex flex-col group cursor-pointer block">
                  
                  {/* Tarjeta Visual */}
                  <div className={`relative w-full ${article.aspect || 'aspect-[4/5]'} overflow-hidden rounded-2xl bg-ink/5 mb-6`}>
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

                </Link>
              </Reveal>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
}
