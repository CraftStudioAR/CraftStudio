import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Las 5 fotos reales de Craft, coordinadas para el collage inferior sin tocar el texto superior
const CRAFT_PHOTOS = [
  {
    src: "/images/about3.jpg",
    alt: "Craft still life",
    aspect: "aspect-square",
    // Posición apilada dentro de la carpeta
    stacked: { x: -6, y: 15, r: -2.5 },
    // Mesa 03 & 04: Izquierda arriba (debajo del texto, con margen seguro)
    target: { x: "-24vw", y: "-8vh", r: -4, w: "38vw" },
  },
  {
    src: "/images/about4.jpg",
    alt: "Craft wine bottle",
    aspect: "aspect-[4/5]",
    stacked: { x: 5, y: 12, r: 2 },
    // Mesa 03 & 04: Centro derecha arriba
    target: { x: "18vw", y: "-5vh", r: 3, w: "36vw" },
  },
  {
    src: "/images/about2.jpg",
    alt: "Craft portrait",
    aspect: "aspect-[3/4]",
    stacked: { x: -3, y: 8, r: -1 },
    // Mesa 03 & 04: Derecha centro
    target: { x: "24vw", y: "8vh", r: -2.5, w: "34vw" },
  },
  {
    src: "/images/about1.jpg",
    alt: "Craft black and white",
    aspect: "aspect-[3/4]",
    stacked: { x: 6, y: 4, r: 3 },
    // Mesa 03 & 04: Izquierda abajo
    target: { x: "-22vw", y: "15vh", r: 4, w: "37vw" },
  },
  {
    src: "/images/about5.jpg",
    alt: "Craft object",
    aspect: "aspect-[4/3]",
    stacked: { x: 0, y: 0, r: -1.5 },
    // Mesa 03 & 04: Derecha abajo
    target: { x: "15vw", y: "24vh", r: -2, w: "43vw" },
  },
];

// Medidas exactas de la carpeta (esquinas rectas arquitectónicas Craft)
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
  const folderKeyRef = useRef<HTMLDivElement>(null);
  const pocketClipRef = useRef<HTMLDivElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const folderBack = folderBackRef.current;
    const folderFront = folderFrontRef.current;
    const folderKey = folderKeyRef.current;
    const pocketClip = pocketClipRef.current;
    if (!section || !stage || !folderBack || !folderFront || !pocketClip) return;

    const photoNodes = photoRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // Usar GSAP ScrollTrigger con pin nativo: sin temblor, sincronizado con Lenis
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=260%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // =========================================================================
      // FASE 1 (0% -> 25%):
      // Apertura elegante de la carpeta (Mesa 01 -> Mesa 02)
      // La solapa frontal se inclina hacia adelante suavemente.
      // Las fotos se asoman hacia arriba dentro de la carpeta.
      // =========================================================================
      tl.to(
        folderFront,
        {
          rotateX: -15,
          transformOrigin: "50% 100%",
          ease: "sine.inOut",
          duration: 0.25,
        },
        0.02
      );

      photoNodes.forEach((node, i) => {
        tl.to(
          node,
          {
            y: "-=24",
            ease: "sine.out",
            duration: 0.22,
          },
          0.04 + i * 0.02
        );
      });

      // =========================================================================
      // FASE 2 (25% -> 75%):
      // Transición progresiva y fluida:
      // - La carpeta se desliza hacia abajo saliendo de la pantalla (Mesa 03)
      // - El clip inferior se libera para que las fotos salgan libres
      // - Las 5 fotos se elevan suavemente hacia el espacio visual INFERIOR al texto
      //   (NUNCA suben a tapar el texto, quedan perfectamente entre Y:-8vh y Y:24vh)
      // =========================================================================
      
      // Liberar el clip inferior suavemente conforme la carpeta desciende
      tl.to(
        pocketClip,
        {
          clipPath: "inset(-500px -300px -400px -300px)",
          ease: "power1.inOut",
          duration: 0.2,
        },
        0.24
      );

      // Descenso de la carpeta hacia abajo
      tl.to(
        [folderBack, folderFront, folderKey],
        {
          y: "+=220",
          scale: 0.92,
          opacity: 0,
          ease: "power1.inOut",
          duration: 0.42,
        },
        0.25
      );

      // Dispersión suave y ordenada de las fotos hacia el collage
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
            ease: "sine.out",
            duration: 0.46,
          },
          0.26 + i * 0.05
        );
      });

      // =========================================================================
      // FASE 3 (75% -> 100%):
      // El collage y la escena acompañan el scroll hacia arriba para conectar
      // con la sección Proyectos (Mesa 05) de forma natural y sin saltos
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
      className="md:hidden relative w-full h-screen bg-cream text-ink flex flex-col justify-between pt-16 pb-4 px-5 overflow-hidden"
    >
      {/* 1. Encabezado editorial: El texto se mantiene SIEMPRE visible y despejado arriba */}
      <div className="relative z-30 flex-shrink-0 pt-2 pb-2">
        {intro}
      </div>

      {/* 2. Área visual para la carpeta y el collage (Estrictamente debajo del texto) */}
      <div
        ref={stageRef}
        className="relative flex-1 w-full flex items-center justify-center min-h-0 select-none overflow-visible"
        style={{ perspective: "1000px" }}
      >
        {/* Contenedor de la carpeta centrada */}
        <div className="relative w-[310px] h-[230px] flex items-center justify-center transform-gpu">
          {/* PANEL TRASERO (Back) */}
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

          {/* CONTENEDOR DEL BOLSILLO CON CLIP INFERIOR ESTRICTO:
              inset(-300px -100px 0px -100px)
              El 0px en el fondo garantiza matemáticamente que NINGUNA imagen
              sobresalga por debajo de la base de la carpeta. */}
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
                  transform: `translate(${photo.stacked.x}px, ${photo.stacked.y}px) rotate(${photo.stacked.r}deg)`,
                }}
              >
                {/* Marco de fotografía editorial Craft */}
                <div className="bg-white p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.14)] border border-black/5">
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

          {/* PANEL FRONTAL DE VIDRIO ESMERILADO (Front Glass) */}
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

          {/* BOTÓN MÁS (···) */}
          <div
            ref={folderKeyRef}
            className="absolute right-3.5 bottom-3.5 z-30 w-10 h-10 bg-white/90 backdrop-blur-md border border-black/10 shadow-sm flex items-center justify-center transform-gpu will-change-transform pointer-events-auto"
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-ink/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/70" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink/70" />
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
