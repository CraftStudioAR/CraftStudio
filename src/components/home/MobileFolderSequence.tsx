import { useRef, useEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassFolder, { type FolderFile } from "../ui/glass-folder-cards";

gsap.registerPlugin(ScrollTrigger);

const CRAFT_FILES: FolderFile[] = [
  { name: "Lookbook 2024", meta: "38 images", art: "dusk" },
  { name: "Invoices", meta: "12 PDFs" },
  { name: "Shoot — Lisbon", meta: "RAW · 2.1 GB", art: "ember" },
  { name: "Contract.pdf", meta: "PDF · 320 KB" },
];

const COLLAGE_PHOTOS = [
  {
    src: "/images/about3.jpg",
    alt: "Craft still life",
    aspect: "aspect-square",
    // Top Left (mesa 03/04)
    target: { x: "-26vw", y: "-13vh", r: -4, w: "38vw" },
  },
  {
    src: "/images/about4.jpg",
    alt: "Craft wine bottle",
    aspect: "aspect-[4/5]",
    // Top Right / Center (mesa 03/04)
    target: { x: "16vw", y: "-10vh", r: 3, w: "36vw" },
  },
  {
    src: "/images/about2.jpg",
    alt: "Craft portrait",
    aspect: "aspect-[3/4]",
    // Middle Right (mesa 03/04)
    target: { x: "28vw", y: "7vh", r: -3, w: "35vw" },
  },
  {
    src: "/images/about1.jpg",
    alt: "Craft black and white",
    aspect: "aspect-[3/4]",
    // Bottom Left (mesa 03/04)
    target: { x: "-24vw", y: "13vh", r: 4, w: "37vw" },
  },
  {
    src: "/images/about5.jpg",
    alt: "Craft object",
    aspect: "aspect-[4/3]",
    // Bottom Right (mesa 03/04)
    target: { x: "18vw", y: "24vh", r: -2, w: "44vw" },
  },
];

export default function MobileFolderSequence({ intro }: { intro: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const folderWrapperRef = useRef<HTMLDivElement>(null);
  const photosRef = useRef<(HTMLDivElement | null)[]>([]);

  const [folderOpen, setFolderOpen] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    const folderWrapper = folderWrapperRef.current;
    if (!container || !stage || !folderWrapper) return;

    const photoNodes = photosRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // Timeline orquestada por ScrollTrigger sobre el contenedor sticky
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress;
            // Mesa 01 -> 02: Al comenzar a scrollear (progreso > 0.08), se abre la carpeta
            if (!userInteracted) {
              if (p > 0.08 && p < 0.95) {
                setFolderOpen(true);
              } else if (p <= 0.04) {
                setFolderOpen(false);
              }
            }
          },
        },
      });

      // FASE 1 & 2 (0% -> 25%): Carpeta centrada, se abre
      // FASE 3 (25% -> 70%): La carpeta baja y las fotos salen y se dispersan (Mesa 03 & 04)
      tl.to(
        folderWrapper,
        {
          y: "32vh",
          scale: 0.88,
          opacity: 0,
          ease: "power2.inOut",
        },
        0.25
      );

      // Dispersión de las 5 fotos editoriales desde la carpeta hacia sus posiciones del storyboard
      photoNodes.forEach((node, i) => {
        const item = COLLAGE_PHOTOS[i];
        tl.fromTo(
          node,
          {
            x: "0vw",
            y: "14vh",
            scale: 0.45,
            rotation: 0,
            opacity: 0,
          },
          {
            x: item.target.x,
            y: item.target.y,
            scale: 1,
            rotation: item.target.r,
            opacity: 1,
            ease: "power2.out",
          },
          0.22 + i * 0.03
        );
      });

      // FASE 4 (70% -> 100%): Movimiento sutil hacia arriba para conectar fluidamente con Proyectos (Mesa 05)
      tl.to(
        stage,
        {
          y: "-12vh",
          ease: "none",
        },
        0.75
      );
    }, containerRef);

    return () => ctx.revert();
  }, [userInteracted]);

  return (
    <div ref={containerRef} className="md:hidden relative w-full h-[270vh]">
      <div className="sticky top-0 flex h-[100dvh] w-full flex-col justify-between pt-20 pb-8 px-5 overflow-hidden">
        {/* Encabezado editorial (Manifiesto) */}
        <div className="relative z-30 flex-shrink-0">
          {intro}
        </div>

        {/* Escenario de animación: Carpeta + Fotos saliendo */}
        <div ref={stageRef} className="relative flex-1 w-full flex items-center justify-center min-h-0">
          {/* Capa de Fotos dispersas (Collage) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            {COLLAGE_PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                ref={(el) => {
                  photosRef.current[i] = el;
                }}
                className="absolute transform-gpu opacity-0 will-change-transform pointer-events-auto"
                style={{ width: photo.target.w }}
              >
                <div className="bg-white p-1.5 shadow-2xl transition-transform duration-300 active:scale-105">
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

          {/* Carpeta Glass Folder (Interactiva por click y por scroll) */}
          <div ref={folderWrapperRef} className="relative z-20 transform-gpu will-change-transform mt-4">
            <GlassFolder
              label="Archives"
              meta="4 items"
              tone="light"
              art="none"
              action="more"
              rounded={false}
              open={folderOpen}
              onOpenChange={(next) => {
                setUserInteracted(true);
                setFolderOpen(next);
              }}
              width={310}
              files={CRAFT_FILES}
              menu={[
                { label: "Ver todos los proyectos", onSelect: () => (window.location.href = "/trabajos") },
                { label: "Compartir portfolio", onSelect: () => navigator.share?.({ title: "Craft Studio", url: window.location.href }) },
              ]}
            />
          </div>
        </div>

        {/* Pista discreta inferior para invitar a interactuar o scrollear */}
        <div className="relative z-30 text-center flex-shrink-0">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40">
            Deslizá para explorar
          </p>
        </div>
      </div>
    </div>
  );
}
