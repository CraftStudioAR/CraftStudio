import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import Reveal from "../Reveal";
import GlyphMark from "../GlyphMark";
import Lightbox from "./Lightbox";
import { cld } from "../../lib/cloudinary";
import type { ProjectBlock, ProjectImage, Stat } from "../../content/brand";

/** Imágenes de un bloque, en el orden en que se ven en pantalla. */
function blockImages(block: ProjectBlock): ProjectImage[] {
  switch (block.type) {
    case "image":
    case "imageText":
    case "quote":
      return [block.image];
    case "imageFeature":
      return [block.main, ...block.stacked];
    case "imagePair":
      return [...block.images];
    case "keywords":
    case "stats":
    case "testimonial":
      return [];
  }
}

function Img({
  image,
  transforms,
  className = "",
  aspect,
  onOpen,
}: {
  image: ProjectImage;
  transforms?: string;
  className?: string;
  /** CSS aspect-ratio value (ej. "9 / 10"). Se aplica vía style porque Tailwind no puede generar clases con valores dinámicos. */
  aspect?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar imagen: ${image.alt}`}
      className="group/img block w-full overflow-hidden rounded-2xl"
    >
      <img
        src={cld(image.publicId, transforms)}
        alt={image.alt}
        loading="lazy"
        style={aspect ? { aspectRatio: aspect } : undefined}
        className={`w-full transition-transform duration-700 ease-out group-hover/img:scale-[1.03] ${className}`}
      />
    </button>
  );
}

function TextBox({ text }: { text: string }) {
  return (
    <div className="flex flex-col justify-center gap-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 md:p-10">
      {text.split("\n\n").map((paragraph, i) => (
        <p key={i} className="text-lg leading-relaxed text-ink/80 md:text-xl">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/** Número que cuenta desde cero al entrar en pantalla. Con reduced motion aparece ya formado. */
function StatNumber({ stat, className }: { stat: Stat; className: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? stat.value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setValue,
    });
    return () => controls.stop();
  }, [inView, reduceMotion, stat.value]);

  const decimals = stat.decimals ?? 0;
  const formatted = value.toLocaleString("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {stat.prefix}
      {formatted}
      {stat.suffix}
    </span>
  );
}

function StatsPanel({
  title,
  items,
  highlight,
}: {
  title?: string;
  items: Stat[];
  highlight?: Stat;
}) {
  return (
    <div
      data-theme="dark"
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-[#B8381D] via-[#A52F18] to-[#751C0C] px-6 py-12 text-cream shadow-2xl backdrop-blur-xl md:px-12 md:py-16"
    >
      {/* Mismo tratamiento glassmorphism que la tarjeta de consulta enviada en Contacto. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-black/30 blur-3xl" />
      <div className="glass-sheen" />

      <div className="relative z-10 flex flex-col gap-10 md:gap-14">
        {title && (
          <p className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-cream/70">
            <span className="h-[1px] w-12 bg-cream/40" />
            {title}
          </p>
        )}

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-10">
          {items.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-3">
              <span className="h-[1px] w-8 bg-cream/40" />
              <StatNumber
                stat={stat}
                className="font-serif text-4xl leading-none drop-shadow-md md:text-6xl"
              />
              <span className="text-xs tracking-widest uppercase text-cream/70 md:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {highlight && (
          <div className="flex flex-col gap-3 border-t border-cream/25 pt-8 md:flex-row md:items-baseline md:gap-8">
            <StatNumber
              stat={highlight}
              className="font-serif text-5xl leading-none drop-shadow-md md:text-7xl"
            />
            <span className="text-sm tracking-widest uppercase text-cream/80 md:text-base">
              {highlight.label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function Testimonial({ quote, author, role }: { quote: string; author: string; role: string }) {
  return (
    <figure className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.02] px-8 py-12 md:px-16 md:py-20">
      {/* Comilla del brandboard, como marca de agua detrás del testimonio. */}
      <GlyphMark
        variant={12}
        className="pointer-events-none absolute -top-4 left-4 w-24 text-red/10 md:left-8 md:w-36"
      />
      <blockquote className="relative font-serif text-2xl leading-[1.25] italic text-balance text-navy md:text-4xl">
        {quote}
      </blockquote>
      <figcaption className="relative mt-8 flex items-center gap-4">
        <span className="h-[1px] w-10 bg-red" />
        <span className="text-xs font-bold tracking-widest uppercase text-ink/60">
          {author} — {role}
        </span>
      </figcaption>
    </figure>
  );
}

export default function ProjectBlocks({
  blocks,
  afterFirstBlock,
}: {
  blocks: ProjectBlock[];
  /** Se intercala justo debajo del primer bloque. El caso abre con una imagen y
   *  recién después llega el texto, sin partir la galería en dos lightbox. */
  afterFirstBlock?: ReactNode;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = blocks.flatMap(blockImages);

  // Índice global con el que arranca cada bloque, para que el lightbox abra la
  // imagen que se clickeó aunque un bloque tenga varias.
  let cursor = 0;
  const startIndexes = blocks.map((block) => {
    const start = cursor;
    cursor += blockImages(block).length;
    return start;
  });

  return (
    <>
      <div className="flex flex-col gap-6 md:gap-10">
        {blocks.map((block, i) => (
          <Fragment key={i}>
            <Reveal delay={Math.min(i * 0.05, 0.3)}>
              <Block block={block} startIndex={startIndexes[i]} onOpen={setOpenIndex} />
            </Reveal>
            {i === 0 && afterFirstBlock}
          </Fragment>
        ))}
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </>
  );
}

function Block({
  block,
  startIndex,
  onOpen,
}: {
  block: ProjectBlock;
  startIndex: number;
  onOpen: (index: number) => void;
}) {
  switch (block.type) {
    case "image":
      return (
        <Img
          image={block.image}
          transforms="f_auto,q_auto,w_1600"
          onOpen={() => onOpen(startIndex)}
        />
      );

    case "imageFeature":
      return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
          <Img
            image={block.main}
            transforms="f_auto,q_auto,w_1200"
            onOpen={() => onOpen(startIndex)}
          />
          <div className="grid grid-cols-2 gap-3 self-start md:grid-cols-1 md:gap-6">
            {block.stacked.map((image, i) => (
              <Img
                key={image.publicId}
                image={image}
                transforms="f_auto,q_auto,w_900"
                onOpen={() => onOpen(startIndex + 1 + i)}
              />
            ))}
          </div>
        </div>
      );

    case "imagePair": {
      const stackOnMobile = block.mobileLayout === "stack";

      // Anchos proporcionales al ratio de cada foto sobre una base 0: las dos terminan
      // con el mismo alto (base disponible / suma de ratios) sin perder un solo pixel.
      if (block.matchHeight && block.images.every((image) => image.ratio)) {
        return (
          <div className="flex items-start gap-3 md:gap-6">
            {block.images.map((image, i) => (
              <div key={image.publicId} className="min-w-0" style={{ flex: `${image.ratio} 1 0%` }}>
                <Img
                  image={image}
                  transforms="f_auto,q_auto,w_1200"
                  onOpen={() => onOpen(startIndex + i)}
                />
              </div>
            ))}
          </div>
        );
      }

      return (
        <div
          className={`grid items-start gap-3 md:grid-cols-2 md:gap-6 ${
            stackOnMobile ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {block.images.map((image, i) => (
            <Img
              key={image.publicId}
              image={image}
              transforms="f_auto,q_auto,w_1200"
              aspect={block.aspect}
              className={block.aspect ? "object-cover" : ""}
              onOpen={() => onOpen(startIndex + i)}
            />
          ))}
        </div>
      );
    }

    case "imageText": {
      // heightFrom "image": la imagen va en su alto natural y el texto se estira
      // hasta igualarla (el grid ya estira por defecto). "text" (default): al reves,
      // la imagen no aporta alto propio y se estira hasta el alto del texto.
      const heightFromImage = block.heightFrom === "image";
      return (
        <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-2 md:gap-6">
          {heightFromImage ? (
            <Img
              image={block.image}
              transforms="f_auto,q_auto,w_1200"
              onOpen={() => onOpen(startIndex)}
            />
          ) : (
            <button
              type="button"
              onClick={() => onOpen(startIndex)}
              aria-label={`Ampliar imagen: ${block.image.alt}`}
              className="group/img relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-auto"
            >
              <img
                src={cld(block.image.publicId, "f_auto,q_auto,w_1200")}
                alt={block.image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
              />
            </button>
          )}
          <TextBox text={block.text} />
        </div>
      );
    }

    case "keywords":
      return (
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 py-4 text-center">
          {block.items.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {i > 0 && <span className="text-ink/30">·</span>}
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-ink/60 md:text-sm">
                {item}
              </span>
            </span>
          ))}
        </div>
      );

    case "quote":
      return (
        <Img
          image={block.image}
          transforms="f_auto,q_auto,w_1920"
          onOpen={() => onOpen(startIndex)}
        />
      );

    case "stats":
      return <StatsPanel title={block.title} items={block.items} highlight={block.highlight} />;

    case "testimonial":
      return <Testimonial quote={block.quote} author={block.author} role={block.role} />;
  }
}
