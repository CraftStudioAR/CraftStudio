import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Las 5 fotos reales de Craft con Z-INDEX FIJO E INMUTABLE
// Esto asegura que NUNCA cambien de orden de superposición entre sí durante el scroll
const CRAFT_PHOTOS = [
  {
    src: "/images/about3.jpg",
    alt: "Craft still life",
    aspect: "aspect-square",
    // Capa base en el fondo
    fixedZ: 10,
    stacked: { x: -6, y: 15, r: -2.5 },
    // Mesa 03 & 04: Izquierda arriba (debajo del texto, con margen seguro)
    target: { x: "-24vw", y: "-8vh", r: -4, w: "38vw" },
  },
  {
    src: "/images/about4.jpg",
    alt: "Craft wine bottle",
    aspect: "aspect-[4/5]",
    fixedZ: 12,
    stacked: { x: 5, y: 12, r: 2 },
    // Mesa 03 & 04: Centro derecha arriba
    target: { x: "18vw", y: "-5vh", r: 3, w: "36vw" },
  },
  {
    src: "/images/about2.jpg",
    alt: "Craft portrait",
    aspect: "aspect-[3/4]",
    fixedZ: 14,
    stacked: { x: -3, y: 8, r: -1 },
    // Mesa 03 & 04: Derecha centro
    target: { x: "24vw", y: "8vh", r: -2.5, w: "34vw" },
  },
  {
    src: "/images/about1.jpg",
    alt: "Craft black and white",
    aspect: "aspect-[3/4]",
    fixedZ: 16,
    stacked: { x: 6, y: 4, r: 3 },
    // Mesa 03 & 04: Izquierda abajo
    target: { x: "-22vw", y: "15vh", r: 4, w: "37vw" },
  },
  {
    src: "/images/about5.jpg",
    alt: "Craft object",
    aspect: "aspect-[4/3]",
    fixedZ: 18,
    stacked: { x: 0, y: 0, r: -1.5 },
    // Mesa 03 & 04: Derecha abajo en primer plano
    target: { x: "15vw", y: "24vh", r: -2, w: "43vw" },
  },
];

// Medidas exactas de la carpeta con esquinas rectas arquitectónicas Craft
const W = 310;
const H = 230;
const FRONT_H = 160;
const BACK_PATH_SHARP = "M0 28 L130 28 L152 0 L310 0 L310 230 L0 230 Z";
const FRONT_PATH_SHARP = "M0 0 L108 0 L130 26 L310 26 L310 " + FRONT_H + " L0 " + FRONT_H + " Z";

export default function MobileFolderSequence({ intro }: { intro: ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const folderBackRef = useRef<HTMLDivElement>(null);
  const folderFrontRef = useRef<HTMLDivElement>(null);
  const pocketClipRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const folderBack = folderBackRef.current;
    const folderFront = folderFrontRef.current;
    const pocketClip = pocketClipRef.current;
    if (!section || !stage || !folderBack || !folderFront || !pocketClip) return;

    const photoNodes = photoRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // Timeline ultra fluida con scrub 1 para máxima suavidad al tacto
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=280%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // =========================================================================
      // FASE 1 (0% -> 25%):
      // Apertura suave de la solapa de vidrio (Mesa 01 -> Mesa 02)
      // =========================================================================
      tl.to(
        folderFront,
        {
          rotateX: -14,
          transformOrigin: "50% 100%",
          ease: "power1.inOut",
          duration: 0.25,
        },
        0.02
      );

      photoNodes.forEach((node, i) => {
        tl.to(
          node,
          {
            y: "-=22",
            ease: "power1.out",
            duration: 0.22,
          },
          0.04 + i * 0.02
        );
      });

      // =========================================================================
      // FASE 2 (25% -> 75%):
      // - El clip inferior se desvanece suavemente conforme la carpeta baja
      // - La carpeta se desliza hacia abajo y desaparece
      // - Las fotos planean a sus destinos sin cambiar su zIndex relativo
      // =========================================================================
      tl.to(
        pocketClip,
        {
          clipPath: "inset(-500px -300px -400px -300px)",
          ease: "power1.inOut",
          duration: 0.25,
        },
        0.24
      );

      tl.to(
        [folderBack, folderFront],
        {
          y: "+=220",
          scale: 0.92,
          opacity: 0,
          ease: "power1.inOut",
          duration: 0.44,
        },
        0.25
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
            // NUNCA alteramos el zIndex aquí para que la superposición sea 100% estable
            ease: "power2.out",
            duration: 0.48,
          },
          0.26 + i * 0.045
        );
      });

      // =========================================================================
      // FASE 3 (75% -> 100%):
      // Desplazamiento sutil hacia arriba para conectar fluidamente con Proyectos
      // =========================================================================
      tl.to(
        stage,
        {
          y: "-10vh",
          ease: "none",
          duration: 0.25,
        },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="md:hidden relative w-full h-screen bg-cream text-ink flex flex-col justify-between pt-24 pb-4 px-5 overflow-hidden"
    >
      {/* 1. Encabezado editorial: Texto superior SIEMPRE despejado y visible */}
      <div className="relative z-30 flex-shrink-0 pt-1 pb-2">
        {intro}
      </div>

      {/* 2. Área visual: Carpeta y fotos strictly debajo del texto */}
      <div
        ref={stageRef}
        className="relative flex-1 w-full flex items-center justify-center min-h-0 select-none overflow-visible"
        style={{ perspective: "1000px" }}
      >
        {/* Carpeta */}
        <div className="relative w-[310px] h-[230px] flex items-center justify-center transform-gpu">
          {/* PANEL TRASERO */}
          <div
            ref={folderBackRef}
            className="absolute inset-0 z-0 pointer-events-none transform-gpu will-change-transform"
            style={{
              clipPath: `path('${BACK_PATH_SHARP}')`,
              background: "linear-gradient(180deg, #ede8e4 0%, #ded9d4 100%)",
            }}
          >
            <div className="absolute inset-0 bg-white/20" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} ${H}`}>
              <path d={BACK_PATH_SHARP} fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            </svg>
          </div>

          {/* BOLSILLO CON RECORTE INFERIOR ESTRICTO (0px abajo impide cualquier desborde) */}
          <div
            ref={pocketClipRef}
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            style={{
              clipPath: "inset(-300px -100px 0px -100px)",
            }}
          >
            {CRAFT_PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                ref={(el) => {
                  photoRefs.current[i] = el;
                }}
                className="absolute transform-gpu will-change-transform pointer-events-auto"
                style={{
                  width: "195px",
                  // zIndex fijo y constante: nunca cambia ni se intercambia
                  zIndex: photo.fixedZ,
                  transform: `translate(${photo.stacked.x}px, ${photo.stacked.y}px) rotate(${photo.stacked.r}deg)`,
                }}
              >
                {/* Fotografía sin bordes blancos, con sombra editorial */}
                <div className="overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.22)]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    decoding="async"
                    className={`block w-full ${photo.aspect} object-cover`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* PANEL FRONTAL DE VIDRIO ESMERILADO (Sin el botón de tres puntos) */}
          <div
            ref={folderFrontRef}
            className="absolute left-0 bottom-0 w-[310px] h-[160px] z-20 transform-gpu will-change-transform pointer-events-none"
            style={{
              clipPath: `path('${FRONT_PATH_SHARP}')`,
              backdropFilter: "blur(22px) saturate(1.6)",
              WebkitBackdropFilter: "blur(22px) saturate(1.6)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(254,250,249,0.82) 48%, rgba(254,250,249,0.98) 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.95), 0 16px 36px -10px rgba(0,0,0,0.12)",
            }}
          >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/20 to-white/50" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${W} ${FRONT_H}`}>
              <path d={FRONT_PATH_SHARP} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" />
            </svg>

            {/* Etiqueta: "Archives 5 items" */}
            <div className="absolute left-5 bottom-4 z-20 flex flex-col gap-0.5 text-ink">
              <span className="font-sans font-semibold text-[14px] tracking-tight text-ink">
                Archives
              </span>
              <span className="font-mono text-[9.5px] tracking-wider text-ink/50 uppercase">
                5 items
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Indicador de scroll */}
      <div className="relative z-30 text-center flex-shrink-0 pt-1">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink/35">
          Deslizá para explorar
        </p>
      </div>
    </div>
  );
}
