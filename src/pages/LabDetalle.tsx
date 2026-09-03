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

import SEO from "../components/SEO";
import { buildArticleSchema, buildBreadcrumbSchema } from "../utils/seoSchemas";

export default function LabDetalle() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | undefined | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showMobileShareMenu, setShowMobileShareMenu] = useState(false);

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
  const paragraphs = article.content 
    ? article.content.split('\n\n').filter((p) => p.trim().length > 0)
    : [];

  const rawBlocks = article.blocks;
  const parsedBlocks: any[] = Array.isArray(rawBlocks)
    ? rawBlocks
    : typeof rawBlocks === 'string'
    ? (() => { try { return JSON.parse(rawBlocks); } catch { return []; } })()
    : [];

  const hasBlocks = parsedBlocks.length > 0;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = article ? article.title : '';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer');
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareTitle} — ${shareUrl}`)}`, '_blank', 'noopener,noreferrer');
  };

  const handleMobileShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `Lee "${shareTitle}" en Craft Lab`,
          url: shareUrl,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setShowMobileShareMenu((prev) => !prev);
        }
      }
    } else {
      setShowMobileShareMenu((prev) => !prev);
    }
  };

  return (
    <div className="bg-cream min-h-screen font-sans text-ink selection:bg-red selection:text-cream">
      <SEO
        title={`${article.title} — Craft Lab`}
        description={article.desc}
        ogType="article"
        keywords={`${article.title}, ${article.category}, craft lab, ensayo de diseño, branding`}
        jsonLd={[
          buildArticleSchema(article),
          buildBreadcrumbSchema([
            { name: "Inicio", url: "/" },
            { name: "Craft Lab", url: "/craft-lab" },
            { name: article.title, url: `/craft-lab/${article.slug}` }
          ])
        ]}
      />
      
      {/* HEADER EDITORIAL */}
      <section className="relative px-6 pt-32 pb-6 md:pt-36 md:pb-8 md:px-10 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto w-full flex flex-col items-start text-left">
          <Reveal>
            <Link 
              to="/craft-lab" 
              className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-red mb-8 hover:opacity-70 transition-opacity"
            >
              ← Volver a Craft Lab
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] md:text-xs tracking-widest text-red uppercase font-bold bg-red/10 px-4 py-1.5 rounded-lg">
                {article.category}
              </span>
              <span className="text-[10px] md:text-xs tracking-widest text-ink/50 uppercase font-bold py-1">
                {article.date}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <h1 className="font-serif italic text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.9] tracking-tight text-navy mb-6 text-balance text-left">
              {article.title}
            </h1>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-xl md:text-2xl text-ink/70 font-medium leading-relaxed text-balance text-left">
              {article.desc}
            </p>
          </Reveal>
        </div>
      </section>

      {/* PORTADA */}
      <section className="px-6 md:px-10 mb-6 md:mb-8">
        <Reveal delay={0.4}>
          <div className="max-w-6xl mx-auto w-full aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden relative bg-ink/5">
            <img 
              src={getImageUrl(article.image)} 
              alt={article.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* CONTENIDO (BLOCKS O PÁRRAFOS DE FALLBACK) */}
      <section className="px-6 md:px-10 pb-32 md:pb-40">
        <div className="max-w-6xl mx-auto w-full space-y-6 md:space-y-7 text-left">
          {hasBlocks ? (
            <ProjectBlocks blocks={parsedBlocks} />
          ) : (
            paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.1}>
                <p className="text-lg md:text-2xl text-ink/80 leading-relaxed font-serif text-left">
                  {paragraph}
                </p>
              </Reveal>
            ))
          )}
          
          <Reveal>
            <div className="mt-20 pt-10 border-t border-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center justify-between w-full md:w-auto gap-4">
                <p className="text-sm tracking-widest uppercase font-bold opacity-60">
                  Compartir este artículo
                </p>

                {/* Botón redondo con solo el icono para Mobile (al lado del título) */}
                <button
                  type="button"
                  onClick={handleMobileShare}
                  aria-label="Compartir artículo"
                  className="md:hidden w-10 h-10 rounded-full border border-ink/20 bg-white text-ink hover:bg-ink hover:text-cream transition-all duration-300 active:scale-95 flex items-center justify-center cursor-pointer shadow-xs shrink-0"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 text-red"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
              </div>

              {/* Menú desplegable de opciones en Mobile (si no se usa share nativo o como fallback) */}
              {showMobileShareMenu && (
                <div className="md:hidden w-full grid grid-cols-2 gap-2 pt-1 animate-fadeIn">
                  <button 
                    type="button"
                    onClick={shareLinkedIn}
                    className="px-4 py-3 rounded-2xl border border-ink/15 text-[11px] tracking-wider uppercase font-bold bg-white text-ink hover:bg-ink hover:text-cream text-center transition-all cursor-pointer"
                  >
                    LinkedIn
                  </button>
                  <button 
                    type="button"
                    onClick={shareTwitter}
                    className="px-4 py-3 rounded-2xl border border-ink/15 text-[11px] tracking-wider uppercase font-bold bg-white text-ink hover:bg-ink hover:text-cream text-center transition-all cursor-pointer"
                  >
                    X (Twitter)
                  </button>
                  <button 
                    type="button"
                    onClick={shareWhatsApp}
                    className="px-4 py-3 rounded-2xl border border-ink/15 text-[11px] tracking-wider uppercase font-bold bg-white text-ink hover:bg-ink hover:text-cream text-center transition-all cursor-pointer"
                  >
                    WhatsApp
                  </button>
                  <button 
                    type="button"
                    onClick={handleCopyLink}
                    className={`px-4 py-3 rounded-2xl border text-[11px] tracking-wider uppercase font-bold text-center transition-all cursor-pointer ${
                      copied ? 'bg-red text-cream border-red' : 'border-ink/15 bg-white text-ink hover:bg-ink hover:text-cream'
                    }`}
                  >
                    {copied ? '¡Copiado!' : 'Copiar Link'}
                  </button>
                </div>
              )}

              {/* Botones inline para Desktop */}
              <div className="hidden md:flex flex-wrap gap-3">
                <button 
                  type="button"
                  onClick={shareLinkedIn}
                  className="px-5 py-2.5 rounded-full border border-ink/20 text-xs tracking-widest uppercase font-bold hover:bg-ink hover:text-cream transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  LinkedIn
                </button>
                <button 
                  type="button"
                  onClick={shareTwitter}
                  className="px-5 py-2.5 rounded-full border border-ink/20 text-xs tracking-widest uppercase font-bold hover:bg-ink hover:text-cream transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  X (Twitter)
                </button>
                <button 
                  type="button"
                  onClick={shareWhatsApp}
                  className="px-5 py-2.5 rounded-full border border-ink/20 text-xs tracking-widest uppercase font-bold hover:bg-ink hover:text-cream transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  WhatsApp
                </button>
                <button 
                  type="button"
                  onClick={handleCopyLink}
                  className={`px-5 py-2.5 rounded-full border text-xs tracking-widest uppercase font-bold transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer ${
                    copied 
                      ? 'bg-red text-cream border-red' 
                      : 'border-ink/20 hover:bg-ink hover:text-cream'
                  }`}
                >
                  {copied ? '¡Link Copiado!' : 'Copiar Link'}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
