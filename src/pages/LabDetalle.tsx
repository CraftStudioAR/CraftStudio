import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import { getCraftLabArticleBySlug } from "../lib/supabaseClient";
import { getImageUrl } from "../lib/cloudinary";
import ProjectBlocks from "../components/work/ProjectBlocks";

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
  blocks?: any[];
}

export default function LabDetalle() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | undefined | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      setLoading(true);
      getCraftLabArticleBySlug(slug).then((data: any) => {
        setArticle(data || undefined);
        setLoading(false);
      });
    }
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center text-ink font-mono text-xs">
        Cargando artículo...
      </div>
    );
  }

  if (!article) {
    return <Navigate to="/craft-lab" replace />;
  }

  // Dividir el contenido por párrafos para renderizarlo lindo
  const paragraphs = article.content.split('\n\n');

  return (
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      
      {/* HEADER EDITORIAL */}
      <section className="relative px-6 pt-32 pb-16 md:pt-48 md:pb-24 md:px-10 overflow-hidden z-10 max-w-4xl mx-auto">
        <Reveal>
          <Link 
            to="/craft-lab" 
            className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-red mb-12 hover:opacity-70 transition-opacity"
          >
            ← Volver a Craft Lab
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] md:text-xs tracking-widest text-red uppercase font-bold bg-red/10 px-4 py-1.5 rounded-lg">
              {article.category}
            </span>
            <span className="text-[10px] md:text-xs tracking-widest text-ink/50 uppercase font-bold py-1">
              {article.date}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="font-serif italic text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tight text-navy mb-8 text-balance">
            {article.title}
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-xl md:text-3xl text-ink/70 font-medium leading-relaxed text-balance">
            {article.desc}
          </p>
        </Reveal>
      </section>

      {/* PORTADA */}
      <section className="px-6 md:px-10 mb-20 md:mb-32">
        <Reveal delay={0.4}>
          <div className="max-w-6xl mx-auto w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden relative bg-ink/5">
            <img 
              src={getImageUrl(article.image)} 
              alt={article.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* CONTENIDO (READING COLUMN) */}
      <section className="px-6 md:px-10 pb-32 md:pb-40">
        <div className={`${article.blocks && article.blocks.length > 0 ? 'max-w-6xl' : 'max-w-3xl'} mx-auto space-y-8 md:space-y-12`}>
          {article.blocks && article.blocks.length > 0 ? (
            <ProjectBlocks blocks={article.blocks} />
          ) : (
            paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.1}>
                <p className="text-lg md:text-2xl text-ink/80 leading-relaxed font-serif">
                  {paragraph}
                </p>
              </Reveal>
            ))
          )}
          
          <Reveal>
            <div className="mt-20 pt-10 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="text-sm tracking-widest uppercase font-bold opacity-60">
                Compartir este artículo
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-2 rounded-full border border-ink/20 text-xs tracking-widest uppercase font-bold hover:bg-ink hover:text-cream transition-colors">
                  LinkedIn
                </button>
                <button className="px-6 py-2 rounded-full border border-ink/20 text-xs tracking-widest uppercase font-bold hover:bg-ink hover:text-cream transition-colors">
                  Twitter
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
