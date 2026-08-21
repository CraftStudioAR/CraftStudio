import { useRef, useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import ProjectBlocks from "../components/work/ProjectBlocks";
import { getProjectBySlug } from "../lib/supabaseClient";
import type { WorkCase } from "../content/brand";

function getResponsiveTextStyle(
  elementId: string,
  sizeMobile: string,
  sizeTablet: string,
  sizeDesktop: string
) {
  let className = "";
  let style: React.CSSProperties = {};
  let styleElement: React.ReactNode = null;

  const classes = [];
  if (sizeMobile.startsWith("text-")) classes.push(sizeMobile);
  if (sizeTablet.startsWith("text-")) classes.push(`md:${sizeTablet}`);
  if (sizeDesktop.startsWith("text-")) classes.push(`lg:${sizeDesktop}`);
  className = classes.join(" ");

  const hasCustom = !sizeMobile.startsWith("text-") || !sizeTablet.startsWith("text-") || !sizeDesktop.startsWith("text-");
  if (hasCustom) {
    const cssRules = [];
    if (!sizeMobile.startsWith("text-")) {
      cssRules.push(`#${elementId} { font-size: ${sizeMobile}; }`);
    }
    if (!sizeTablet.startsWith("text-")) {
      cssRules.push(`@media (min-width: 768px) { #${elementId} { font-size: ${sizeTablet}; } }`);
    }
    if (!sizeDesktop.startsWith("text-")) {
      cssRules.push(`@media (min-width: 1024px) { #${elementId} { font-size: ${sizeDesktop}; } }`);
    }
    styleElement = (
      <style dangerouslySetInnerHTML={{ __html: cssRules.join("\n") }} />
    );
  }

  return { className, style, styleElement };
}

export default function TrabajoDetalle() {
  const { slug } = useParams();
  const [project, setProject] = useState<WorkCase | undefined | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      getProjectBySlug(slug).then((proj) => {
        setProject(proj || undefined);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center text-ink font-mono text-xs">
        Cargando caso...
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/trabajos" replace />;
  }

  // Animaciones para el hero
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };



  return (
    <div className="bg-cream min-h-screen text-ink selection:bg-red selection:text-cream">
      
      {/* 1. HERO DEL PROYECTO */}
      <section className="px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">

          {/* Volver */}
          <div className="mb-10">
            <Link 
              to="/trabajos"
              className="inline-flex items-center gap-3 text-xs tracking-widest uppercase font-bold text-red hover:opacity-70 transition-opacity"
            >
              <span>←</span>
              <span className="border-b border-red/30 pb-0.5">Volver a todos los trabajos</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-4 md:gap-5"
          >
            {/* Título principal: tipo de trabajo */}
            {(() => {
              const titleId = `title-detail-${Math.random().toString(36).substr(2, 9)}`;
              const { className: titleSizeClass, style: titleSizeStyle, styleElement: titleStyleElement } = getResponsiveTextStyle(
                titleId,
                project.titleStyle?.sizeMobile || 'text-4xl',
                project.titleStyle?.sizeTablet || 'text-6xl',
                project.titleStyle?.sizeDesktop || 'text-[9rem]'
              );
              return (
                <>
                  {titleStyleElement}
                  <motion.h1
                    id={titleId}
                    variants={itemVariants}
                    className={`font-serif text-[#0a0424] text-balance ${
                      project.titleStyle?.bold ? 'font-bold' : 'font-normal'
                    } ${
                      project.titleStyle?.italic !== false ? 'italic' : 'not-italic'
                    } ${
                      project.titleStyle?.tracking || 'tracking-tight'
                    } ${
                      project.titleStyle?.leading || 'leading-[0.95]'
                    } ${titleSizeClass}`}
                    style={titleSizeStyle}
                  >
                    {project.title ?? project.client}
                  </motion.h1>
                </>
              );
            })()}

            {/* Nombre de la marca debajo, más chico */}
            {project.title && (() => {
              const clientId = `client-site-${Math.random().toString(36).substr(2, 9)}`;
              const { className: clientSizeClass, style: clientSizeStyle, styleElement: clientStyleElement } = getResponsiveTextStyle(
                clientId,
                project.clientStyle?.sizeMobile || 'text-sm',
                project.clientStyle?.sizeTablet || 'text-sm',
                project.clientStyle?.sizeDesktop || 'text-base'
              );
              return (
                <>
                  {clientStyleElement}
                  <motion.p
                    id={clientId}
                    variants={itemVariants}
                    className={`font-sans font-bold uppercase tracking-widest text-ink/70 ${clientSizeClass}`}
                    style={{ letterSpacing: '0.15em', ...clientSizeStyle }}
                  >
                    {project.client}
                  </motion.p>
                </>
              );
            })()}
            
            <motion.div variants={itemVariants} className="w-16 h-[1px] bg-red mt-1"></motion.div>
            
            {(() => {
              const summaryId = `summary-site-${Math.random().toString(36).substr(2, 9)}`;
              const { className: summarySizeClass, style: summarySizeStyle, styleElement: summaryStyleElement } = getResponsiveTextStyle(
                summaryId,
                project.summaryStyle?.sizeMobile || 'text-base',
                project.summaryStyle?.sizeTablet || 'text-base',
                project.summaryStyle?.sizeDesktop || 'text-lg'
              );
              return (
                <>
                  {summaryStyleElement}
                  <motion.p
                    id={summaryId}
                    variants={itemVariants}
                    className={`font-medium leading-[1.5] text-balance max-w-2xl text-ink/80 ${summarySizeClass}`}
                    style={summarySizeStyle}
                  >
                    {project.summary}
                  </motion.p>
                </>
              );
            })()}
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col gap-10 lg:pt-6"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-ink/40">Modalidad</h4>
              <p className="text-xl md:text-2xl font-medium">{project.category}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-ink/40">Año</h4>
              <p className="text-xl md:text-2xl font-medium">{project.year}</p>
            </motion.div>

            {project.scope && project.scope.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                <h4 className="text-xs font-bold tracking-widest uppercase text-ink/40">Alcance del proyecto</h4>
                <div className="flex flex-wrap gap-2">
                  {project.scope.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-lg text-xs tracking-wide font-medium bg-ink/5 border border-ink/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          </div>
        </div>
      </section>


      {/* 3. GALERÍA DEL PROYECTO */}
      {project.blocks && project.blocks.length > 0 && (
        <section className="px-6 pb-32 md:px-10">
          <div className="max-w-[1400px] mx-auto">
            <ProjectBlocks blocks={project.blocks} />
          </div>
        </section>
      )}

      {/* 4. NEXT PROJECT CTA (StudioSection style but custom text) */}
      <div className="bg-cream">
        <ProjectCTA />
      </div>

    </div>
  );
}

// Inline component for the CTA to handle its own scroll animations
function ProjectCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <div ref={containerRef} className="px-4 md:px-10 pb-10 md:pb-20 perspective-1000">
      {/* Mismo efecto vidrio que el menu (glass-panel + sheen) y caja mas baja,
          para que se lea como cierre de pagina y no como otra pieza del proyecto. */}
      <motion.section
        style={{ scale }}
        className="group relative overflow-hidden rounded-2xl glass-panel glass-panel-light text-ink flex flex-col items-center justify-center max-w-xl mx-auto"
      >
        <div className="glass-sheen" />

        <div className="w-full relative z-10 px-6 md:px-10 py-10 md:py-14 flex flex-col items-center justify-center text-center mx-auto">
          <Reveal>
            <p className="text-xs font-bold tracking-widest uppercase text-red mb-3">
              ¿Listo para el tuyo?
            </p>
            <h2 className="font-sans font-semibold tracking-tight text-2xl sm:text-3xl md:text-4xl leading-tight mb-6 text-navy">
              Hablemos de tu marca.
            </h2>

            <Link
              to="/contacto"
              className="inline-block bg-navy hover:bg-ink text-cream px-8 py-4 rounded-xl text-sm font-bold tracking-widest uppercase transition-transform hover:scale-105 shadow-lg shadow-black/10"
            >
              Iniciar un proyecto
            </Link>
          </Reveal>
        </div>
      </motion.section>
    </div>
  );
}
