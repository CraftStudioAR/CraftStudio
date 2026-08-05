import { useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { cld } from "../../lib/cloudinary";
import type { ProjectImage } from "../../content/brand";

export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: ProjectImage[];
  /** Índice de la imagen abierta, o null si el lightbox está cerrado. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const isOpen = index !== null;

  const goTo = useCallback(
    (delta: number) => {
      if (index === null) return;
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange],
  );

  // Teclado: Escape cierra, flechas navegan.
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(1);
      if (e.key === "ArrowLeft") goTo(-1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, goTo, onClose]);

  // Evita que la página de atrás scrollee mientras el lightbox está abierto.
  // El elemento que scrollea es <html>, así que bloquear sólo <body> no alcanza.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const previous = {
      html: html.style.overflow,
      body: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };
    // Compensa el ancho de la barra de scroll para que el contenido no salte al bloquear.
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous.html;
      document.body.style.overflow = previous.body;
      document.body.style.paddingRight = previous.paddingRight;
    };
  }, [isOpen]);

  // Sin AnimatePresence a propósito: su animación de salida no desmontaba el
  // overlay y quedaba una capa invisible bloqueando los clicks de toda la página.
  if (index === null) return null;
  const current = images[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Imagen ${index + 1} de ${images.length}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 md:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 text-2xl leading-none text-cream/80 transition hover:border-cream/60 hover:text-cream md:top-6 md:right-6"
      >
        ×
      </button>

      <span className="absolute top-6 left-4 z-10 text-xs tracking-widest text-cream/60 uppercase md:left-10">
        {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(-1);
            }}
            aria-label="Imagen anterior"
            className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-xl text-cream/80 transition hover:border-cream/60 hover:text-cream md:left-6"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goTo(1);
            }}
            aria-label="Imagen siguiente"
            className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-xl text-cream/80 transition hover:border-cream/60 hover:text-cream md:right-6"
          >
            →
          </button>
        </>
      )}

      <motion.img
        key={current.publicId}
        src={cld(current.publicId, "f_auto,q_auto,w_1920")}
        alt={current.alt}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) goTo(1);
          else if (info.offset.x > 80) goTo(-1);
        }}
        className="max-h-full max-w-full rounded-lg object-contain"
      />
    </motion.div>
  );
}
