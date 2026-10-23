import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Las 5 fotos reales de Craft que están dentro de la carpeta y luego se dispersan en el collage
const CRAFT_PHOTOS = [
  {
    src: "/images/about3.jpg",
    alt: "Craft still life",
    aspect: "aspect-square",
    // Posición inicial apilada en la carpeta (px relativos al centro de la carpeta)
    stacked: { x: -8, y: 0, r: -2 },
    // Posición final dispersa en el collage (Mesa 03 & 04)
    target: { x: "-26vw", y: "-13vh", r: -5, w: "39vw" },
  },
  {
    src: "/images/about4.jpg",
    alt: "Craft wine bottle",
    aspect: "aspect-[4/5]",
    stacked: { x: 4, y: -4, r: 2 },
    target: { x: "18vw", y: "-9vh", r: 3, w: "37vw" },
  },
  {
    src: "/images/about2.jpg",
    alt: "Craft portrait",
    aspect: "aspect-[3/4]",
    stacked: { x: -4, y: -8, r: -1 },
    target: { x: "28vw", y: "8vh", r: -3, w: "35vw" },
  },
  {
    src: "/images/about1.jpg",
    alt: "Craft black and white",
    aspect: "aspect-[3/4]",
    stacked: { x: 6, y: -12, r: 3 },
    target: { x: "-24vw", y: "14vh", r: 4, w: "38vw" },
  },
  {
    src: "/images/about5.jpg",
    alt: "Craft object",
    aspect: "aspect-[4/3]",
    stacked: { x: 0, y: -16, r: -2 },
    target: { x: "16vw", y: "24vh", r: -2, w: "43vw" },
  },
];

// Medidas base de la carpeta vectorial (esquinas rectas arquitectónicas Craft)
const W = 320;
const H = 256;
const FRONT_H = 184;
const BACK_PATH_SHARP = "M0 32 L136 32 L158 0 L320 0 L320 256 L0 256 Z";
const FRONT_PATH_SHARP = "M0 0 L110 0 L132 30 L320 30 L320 " + FRONT_H + " L0 " + FRONT_H + " Z";

export default function MobileFolderSequence({ intro }: { intro: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const folderBackRef = useRef<HTMLDivElement>(null);
  const folderFrontRef = useRef<HTMLDivElement>(null);
  const folderKeyRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const folderBack = folderBackRef.current;
    const folderFront = folderFrontRef.current;
    const folderKey = folderKeyRef.current;
    if (!section || !stage || !folderBack || !folderFront) return;

    const photoNodes = photoRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // Usar GSAP ScrollTrigger pin en lugar de CSS sticky
      // Esto elimina al 100% el temblor / stutter entre Lenis y el navegador móvil
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // =========================================================================
      // FASE 1: (0% -> 22%)
      // La carpeta cerrada se abre: el panel frontal de vidrio se inclina hacia adelante (Mesa 02)
      // =========================================================================
      tl.to(
        folderFront,
        {
          rotateX: -26,
          transformOrigin: "50% 100%",
          ease: "power2.out",
        },
        0.02
      );

      // Las fotos dentro de la carpeta suben ligeramente asomándose (Mesa 02)
      photoNodes.forEach((node, i) => {
        tl.to(
          node,
          {
            y: "-=36",
            ease: "power2.out",
          },
          0.04 + i * 0.015
        );
      });

      // =========================================================================
      // FASE 2: (22% -> 70%)
      // La carpeta se desliza hacia abajo y se desvanece (Mesa 03)
      // Mientras tanto, las 5 fotos de Craft salen de la carpeta y se dispersan (Mesa 03 & 04)
      // =========================================================================
      tl.to(
        [folderBack, folderFront, folderKey],
        {
          y: "+=180",
          scale: 0.9,
          opacity: 0,
          ease: "power2.inOut",
        },
        0.24
      );

      photoNodes.forEach((node, i) => {
        const item = CRAFT_PHOTOS[i];
        tl.to(
          node,
          {
            x: item.target.x,
            y: item.target.y,
            width: item.target.w,
            rotation: item.target.r,
            scale: 1,
            zIndex: 20 + i,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
            ease: "power2.out",
          },
          0.22 + i * 0.035
        );
      });

      // =========================================================================
      // FASE 3: (70% -> 100%)
      // El collage y el escenario suben con suavidad hacia la sección Proyectos (Mesa 05)
      // =========================================================================
      tl.to(
        stage,
        {
          y: "-14vh",
          ease: "none",
        },
        0.72
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="md:hidden relative w-full h-screen bg-cream text-ink flex flex-col justify-between pt-20 pb-6 px-5 overflow-hidden"
    >
      {/* 1. Encabezado editorial (Manifiesto de marca) */}
      <div className="relative z-30 flex-shrink-0">
        {intro}
      </div>

      {/* 2. Escenario interactivo central (Carpeta + Fotos saliendo) */}
      <div
        ref={stageRef}
        className="relative flex-1 w-full flex items-center justify-center min-h-0 select-none"
        style={{ perspective: "1200px" }}
      >
        {/* Contenedor relativo de la carpeta con dimensiones fijas 320x256 */}
        <div className="relative w-[320px] h-[256px] flex items-center justify-center transform-gpu">
          {/* PANEL TRASERO DE LA CARPETA (Glass Back) */}
          <div
            ref={folderBackRef}
            className="absolute inset-0 z-0 pointer-events-none transform-gpu will-change-transform"
            style={{
              clipPath: `path('${BACK_PATH_SHARP}')`,
              background: "linear-gradient(180deg, #f0ece9 0%, #e2ddd8 100%)",
            }}
          >
            <div className="absolute inset-0 bg-white/30" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} ${H}`}>
              <path d={BACK_PATH_SHARP} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
            </svg>
          </div>

          {/* LAS 5 FOTOS REALES DE CRAFT: Comienzan dentro de la carpeta y vuelan afuera */}
          {CRAFT_PHOTOS.map((photo, i) => (
            <div
              key={photo.src}
              ref={(el) => {
                photoRefs.current[i] = el;
              }}
              className="absolute transform-gpu will-change-transform z-10"
              style={{
                width: "220px",
                transform: `translate(${photo.stacked.x}px, ${photo.stacked.y}px) rotate(${photo.stacked.r}deg)`,
              }}
            >
              {/* Marco fotográfico estilo paspartú editorial */}
              <div className="bg-white p-1.5 shadow-lg border border-black/5 transition-transform duration-200">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  decoding="async"
                  className={`block w-full ${photo.aspect} object-cover`}
                />
              </div>
            </div>
          ))}

          {/* PANEL FRONTAL DE VIDRIO ESMERILADO (Glass Front Panel) */}
          <div
            ref={folderFrontRef}
            className="absolute left-0 bottom-0 w-[320px] h-[184px] z-20 transform-gpu will-change-transform"
            style={{
              clipPath: `path('${FRONT_PATH_SHARP}')`,
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(254,250,249,0.75) 45%, rgba(254,250,249,0.96) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 16px 36px -10px rgba(0,0,0,0.12)",
            }}
          >
            {/* Brillo sutil de vidrio */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/30 to-white/60" />

            {/* Borde vectorial nítido */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} ${FRONT_H}`}>
              <path d={FRONT_PATH_SHARP} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            </svg>

            {/* Etiqueta editorial: "Archives 5 items" */}
            <div className="absolute left-5 bottom-5 z-20 flex flex-col gap-0.5 pointer-events-none text-ink">
              <span className="font-sans font-semibold text-[15px] tracking-tight text-ink">
                Archives
              </span>
              <span className="font-mono text-[10px] tracking-wider text-ink/50 uppercase">
                5 items
              </span>
            </div>
          </div>

          {/* BOTÓN MÁS (···) EN LA ESQUINA INFERIOR DERECHA */}
          <div
            ref={folderKeyRef}
            className="absolute right-4 bottom-4 z-30 w-11 h-11 bg-white/90 backdrop-blur-md border border-black/10 shadow-md flex items-center justify-center transform-gpu will-change-transform active:scale-95 transition-transform"
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ink/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/70" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Indicador inferior sutil */}
      <div className="relative z-30 text-center flex-shrink-0">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/35">
          Deslizá para explorar
        </p>
      </div>
    </div>
  );
}
