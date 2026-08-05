import { useRef } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Reveal from "../components/Reveal";
import GlyphMark from "../components/GlyphMark";
import ProjectBlocks from "../components/work/ProjectBlocks";
import { work } from "../content/brand";

export default function TrabajoDetalle() {
  const { slug } = useParams();
  const project = work.find((w) => w.slug === slug);



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
      
      {/* 1. HEADER / VOLVER */}
      <div className="px-6 pt-32 pb-8 md:px-10 md:pt-40 max-w-[1400px] mx-auto">
        <Link 
          to="/trabajos"
          className="inline-flex items-center gap-3 text-xs tracking-widest uppercase font-bold text-red hover:opacity-70 transition-opacity"
        >
          <span>←</span>
          <span className="border-b border-red/30 pb-0.5">Volver a todos los trabajos</span>
        </Link>
      </div>

      {/* 2. HERO DEL PROYECTO */}
      <section className="px-6 pb-20 md:px-10 md:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col gap-6 md:gap-8"
          >
            <motion.h1
              variants={itemVariants}
              className={`font-serif italic leading-[0.95] tracking-tight text-navy text-balance ${
                project.client.length > 28
                  ? "text-4xl md:text-6xl lg:text-7xl"
                  : "text-6xl md:text-8xl lg:text-[9rem]"
              }`}
            >
              {project.client}
            </motion.h1>
            
            <motion.div variants={itemVariants} className="w-24 h-[1px] bg-red"></motion.div>
            
            <motion.p variants={itemVariants} className="text-2xl md:text-4xl font-medium leading-[1.3] text-balance max-w-2xl">
              {project.summary}
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex flex-col gap-10 lg:pt-6"
          >
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-ink/40">Categoría</h4>
              <p className="text-xl md:text-2xl font-medium">{project.category}</p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-widest uppercase text-ink/40">Año</h4>
              <p className="text-xl md:text-2xl font-medium">{project.year}</p>
            </motion.div>

            {project.tags && project.tags.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                <h4 className="text-xs font-bold tracking-widest uppercase text-ink/40">Entregables</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-2xl text-sm tracking-wide font-medium bg-ink/5 border border-ink/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {project.scope && project.scope.length > 0 && (
              <motion.div variants={itemVariants} className="flex flex-col gap-4">
                <h4 className="text-xs font-bold tracking-widest uppercase text-ink/40">Alcance del proyecto</h4>
                <div className="flex flex-wrap gap-2">
                  {project.scope.map((item) => (
                    <span
                      key={item}
                      className="px-4 py-2 rounded-2xl text-sm tracking-wide font-medium bg-ink/5 border border-ink/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

        </div>
      </section>

      {/* 3. DESCRIPCIÓN EXTENDIDA */}
      {project.description && (
        <section className="px-6 pb-16 md:px-10 md:pb-20">
          <div className="max-w-[1400px] mx-auto">
            <Reveal>
              <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 md:p-10">
                <p className="text-lg leading-relaxed text-ink/80 md:text-xl">{project.description}</p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 4. GALERÍA DEL PROYECTO */}
      <section className="px-6 pb-32 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          {project.blocks && project.blocks.length > 0 ? (
            <ProjectBlocks blocks={project.blocks} />
          ) : (
            <div className="flex flex-col gap-6 md:gap-10">
              {/* Main Hero Image Placeholder */}
              <Reveal>
                <div data-theme="dark" className="w-full aspect-video md:aspect-[21/9] rounded-2xl md:rounded-2xl bg-navy relative overflow-hidden flex items-center justify-center">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-navy to-ink"></div>
                  <GlyphMark variant={0} className="w-[80vw] md:w-[40vw] text-cream/5 absolute opacity-50 mix-blend-overlay" />
                  <div className="grain-overlay !absolute !opacity-20" />
                  <p className="text-cream/40 font-serif italic text-2xl md:text-4xl relative z-10">
                    [ Fotografía del Proyecto ]
                  </p>
                </div>
              </Reveal>

              {/* Secondary Images Grid Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <Reveal delay={0.1}>
                  <div className="w-full aspect-square md:aspect-[4/3] rounded-2xl bg-cream border border-ink/10 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red rounded-full blur-[100px] opacity-10"></div>
                    <div className="grain-overlay !absolute !opacity-10" />
                    <p className="text-ink/30 font-serif italic text-xl relative z-10">
                      [ Detalle 01 ]
                    </p>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <div data-theme="dark" className="w-full aspect-square md:aspect-[4/3] rounded-2xl bg-ink relative overflow-hidden flex items-center justify-center">
                    <div className="glass-sheen" />
                    <GlyphMark variant={1} className="w-[60vw] md:w-[30vw] text-cream/10 absolute opacity-30" />
                    <p className="text-cream/30 font-serif italic text-xl relative z-10">
                      [ Detalle 02 ]
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          )}
        </div>
      </section>

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
      <motion.section
        style={{ scale }}
        data-theme="dark"
        className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#B8381D] via-[#A52F18] to-[#751C0C] text-cream shadow-2xl backdrop-blur-xl md:rounded-2xl flex flex-col items-center justify-center"
      >
        {/* Textura y efectos de luz glassmorphism — mismo tratamiento que la tarjeta
            de consulta enviada en Contacto y Sumate. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />
        <div className="glass-sheen" />

        <div className="w-full relative z-10 px-6 md:px-10 lg:px-20 py-24 md:py-32 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs font-bold tracking-widest uppercase text-cream/70 mb-6">
              ¿Listo para el tuyo?
            </p>
            <h2 className="font-serif italic font-medium tracking-tight text-5xl md:text-7xl lg:text-8xl leading-none mb-12">
              Hablemos de tu marca.
            </h2>
            
            <Link 
              to="/contacto"
              className="inline-block bg-cream hover:bg-white text-navy px-10 py-5 rounded-xl text-sm font-bold tracking-widest uppercase transition-transform hover:scale-105 shadow-xl shadow-black/10"
            >
              Iniciar un proyecto
            </Link>
          </Reveal>
        </div>
      </motion.section>
    </div>
  );
}
