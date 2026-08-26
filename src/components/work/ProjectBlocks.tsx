import { Fragment, useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import Reveal from "../Reveal";
import GlyphMark from "../GlyphMark";
import Lightbox from "./Lightbox";
import { cld } from "../../lib/cloudinary";
import type { ProjectBlock, ProjectImage, Stat } from "../../content/brand";

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
    case "text":
      return [];
  }
}

function Img({
  image,
  transforms,
  className = "",
  imgClassName = "",
  aspect,
  onOpen,
}: {
  image: ProjectImage;
  transforms?: string;
  className?: string;
  imgClassName?: string;
  /** CSS aspect-ratio value (ej. "9 / 10"). Se aplica vía style porque Tailwind no puede generar clases con valores dinámicos. */
  aspect?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ampliar imagen: ${image.alt}`}
      className={`group/img block w-full overflow-hidden rounded-2xl ${className}`}
    >
      <img
        src={cld(image.publicId, transforms)}
        alt={image.alt}
        loading="lazy"
        style={aspect ? { aspectRatio: aspect } : undefined}
        className={`w-full transition-transform duration-700 ease-out group-hover/img:scale-[1.03] rounded-2xl ${imgClassName}`}
      />
    </button>
  );
}

function TextBox({
  text,
  className = "",
  fontFamily = 'serif',
  bold = false,
  italic = false,
  sizeMobile = 'text-sm',
  sizeTablet = 'text-base',
  sizeDesktop = 'text-base',
  tracking = 'tracking-normal',
  leading = 'leading-relaxed',
  textAlign = 'left',
}: {
  text: string;
  className?: string;
  fontFamily?: 'serif' | 'sans';
  bold?: boolean;
  italic?: boolean;
  sizeMobile?: string;
  sizeTablet?: string;
  sizeDesktop?: string;
  tracking?: string;
  leading?: string;
  textAlign?: 'left' | 'center' | 'right';
}) {
  const boldClass = bold ? "font-bold" : "font-normal";
  const italicClass = italic ? "italic" : "not-italic";
  const trackingClass = tracking || "tracking-normal";
  const leadingClass = leading || "leading-relaxed";
  const fontFamilyClass = fontFamily === "sans" ? "font-sans" : "font-serif";

  const elementId = `text-box-site-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col justify-center gap-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 md:p-10 ${className}`}>
      {text.split("\n\n").map((paragraph, idx) => {
        const pId = `${elementId}-${idx}`;
        const { className: resolvedSizeClass, style: sizeStyle, styleElement } = getResponsiveTextStyle(
          pId,
          sizeMobile,
          sizeTablet,
          sizeDesktop
        );
        const textClass = `text-ink/80 text-${textAlign} ${fontFamilyClass} ${boldClass} ${italicClass} ${trackingClass} ${leadingClass} ${resolvedSizeClass}`;
        return (
          <Fragment key={idx}>
            {styleElement}
            <p id={pId} className={textClass} style={sizeStyle}>
              {paragraph}
            </p>
          </Fragment>
        );
      })}
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

function Testimonial({
  quote,
  author,
  role,
  fontFamily = 'serif',
  bold = false,
  italic = true,
  sizeMobile = 'text-2xl',
  sizeTablet = 'text-3xl',
  sizeDesktop = 'text-4xl',
  tracking = 'tracking-normal',
  leading = 'leading-[1.25]',
  textAlign = 'left',
}: {
  quote: string;
  author: string;
  role: string;
  fontFamily?: 'serif' | 'sans';
  bold?: boolean;
  italic?: boolean;
  sizeMobile?: string;
  sizeTablet?: string;
  sizeDesktop?: string;
  tracking?: string;
  leading?: string;
  textAlign?: 'left' | 'center' | 'right';
}) {
  const elementId = `testimonial-quote-${Math.random().toString(36).substr(2, 9)}`;
  const { className: resolvedSizeClass, style: sizeStyle, styleElement } = getResponsiveTextStyle(
    elementId,
    sizeMobile,
    sizeTablet,
    sizeDesktop
  );

  const boldClass = bold ? "font-bold" : "font-normal";
  const italicClass = italic ? "italic" : "not-italic";
  const trackingClass = tracking || "tracking-normal";
  const leadingClass = leading || "leading-[1.25]";
  const fontFamilyClass = fontFamily === "sans" ? "font-sans" : "font-serif";

  const alignJustifyClass = textAlign === 'center' ? 'justify-center text-center' : textAlign === 'right' ? 'justify-end text-right' : 'justify-start text-left';

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.02] px-12 py-12 sm:px-16 md:px-24 md:py-20 lg:px-32">
      {styleElement}
      <GlyphMark
        variant={12}
        className="pointer-events-none absolute -top-4 left-6 w-24 text-red/10 sm:left-10 md:left-16 md:w-36"
      />
      <blockquote
        id={elementId}
        className={`relative ${fontFamilyClass} ${boldClass} ${italicClass} text-${textAlign} text-balance text-navy ${trackingClass} ${leadingClass} ${resolvedSizeClass}`}
        style={sizeStyle}
      >
        {quote}
      </blockquote>
      <figcaption className={`relative mt-8 flex items-center gap-4 ${alignJustifyClass}`}>
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
}: {
  blocks: ProjectBlock[];
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
      <div className="flex flex-col gap-5 md:gap-6">
        {blocks.map((block, i) => (
          <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
            <Block block={block} startIndex={startIndexes[i]} onOpen={setOpenIndex} />
          </Reveal>
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
          transforms="f_auto,q_auto,w_2000"
          aspect={block.aspect}
          onOpen={() => onOpen(startIndex)}
        />
      );

    case "imageFeature":
      return (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 items-stretch">
          <Img
            image={block.main}
            transforms="f_auto,q_auto,w_1200"
            className="h-full"
            imgClassName="h-full object-cover"
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

      const count = block.images.length;
      const desktopCols = count === 4 ? "md:grid-cols-4" : count === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
      const mobileCols = stackOnMobile ? "grid-cols-1" : (count === 4 ? "grid-cols-4" : count === 3 ? "grid-cols-3" : "grid-cols-2");

      return (
        <div
          className={`grid items-stretch gap-3 md:gap-6 ${desktopCols} ${mobileCols}`}
        >
          {block.images.map((image, i) => (
            <Img
              key={image.publicId}
              image={image}
              transforms="f_auto,q_auto,w_1200"
              aspect={block.aspect}
              className="h-full w-full"
              imgClassName="h-full object-cover"
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
      
      const isMobileOrderTextFirst = block.mobileOrder === "textFirst";
      const isDesktopOrderRight = block.imagePosition === "right";
      
      const imageOrderClass = `${isMobileOrderTextFirst ? "order-2" : "order-1"} ${isDesktopOrderRight ? "md:order-2" : "md:order-1"}`;
      const textOrderClass = `${isMobileOrderTextFirst ? "order-1" : "order-2"} ${isDesktopOrderRight ? "md:order-1" : "md:order-2"}`;

      // Resolve proportions layout
      const layoutOption = block.layout || '50/50';
      let resolvedLayout = layoutOption;
      if (isDesktopOrderRight) {
        if (layoutOption === '30/70') resolvedLayout = '70/30';
        else if (layoutOption === '40/60') resolvedLayout = '60/40';
        else if (layoutOption === '60/40') resolvedLayout = '40/60';
        else if (layoutOption === '70/30') resolvedLayout = '30/70';
        else if (layoutOption === '66/34') resolvedLayout = '34/66';
        else if (layoutOption === '34/66') resolvedLayout = '66/34';
      }

      const layoutClasses: Record<string, string> = {
        '30/70': 'md:grid-cols-[3fr_7fr]',
        '40/60': 'md:grid-cols-[4fr_6fr]',
        '50/50': 'md:grid-cols-2',
        '60/40': 'md:grid-cols-[6fr_4fr]',
        '70/30': 'md:grid-cols-[7fr_3fr]',
        '66/34': 'md:grid-cols-[66fr_34fr]',
        '34/66': 'md:grid-cols-[34fr_66fr]',
      };
      
      const desktopGridCols = layoutClasses[resolvedLayout] || 'md:grid-cols-2';

      return (
        <div className={`grid grid-cols-1 items-stretch gap-3 ${desktopGridCols} md:gap-6`}>
          {heightFromImage ? (
            <Img
              image={block.image}
              transforms="f_auto,q_auto,w_1200"
              className={imageOrderClass}
              onOpen={() => onOpen(startIndex)}
            />
          ) : (
            <button
              type="button"
              onClick={() => onOpen(startIndex)}
              aria-label={`Ampliar imagen: ${block.image.alt}`}
              className={`group/img relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-auto ${imageOrderClass}`}
            >
              <img
                src={cld(block.image.publicId, "f_auto,q_auto,w_1200")}
                alt={block.image.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.03]"
              />
            </button>
          )}
          <TextBox
            text={block.text}
            className={textOrderClass}
            fontFamily={block.fontFamily}
            bold={block.bold}
            italic={block.italic}
            sizeMobile={block.sizeMobile}
            sizeTablet={block.sizeTablet}
            sizeDesktop={block.sizeDesktop}
            tracking={block.tracking}
            leading={block.leading}
            textAlign={block.textAlign}
          />
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
      return (
        <Testimonial
          quote={block.quote}
          author={block.author}
          role={block.role}
          fontFamily={block.fontFamily}
          bold={block.bold}
          italic={block.italic}
          sizeMobile={block.sizeMobile}
          sizeTablet={block.sizeTablet}
          sizeDesktop={block.sizeDesktop}
          tracking={block.tracking}
          leading={block.leading}
          textAlign={block.textAlign}
        />
      );

    case "text": {
      const containerClass = `w-full my-4 ${
        block.hasContainer 
          ? "rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 md:p-10 shadow-sm" 
          : "px-0"
      }`;

      const innerClass = "w-full flex flex-col gap-4 text-left";

      const boldClass = block.bold ? "font-bold" : "font-normal";
      const italicClass = block.italic ? "italic" : "not-italic";
      const trackingClass = block.tracking || "tracking-normal";
      const leadingClass = block.leading || "leading-relaxed";
      const fontFamily = block.fontFamily === "serif" ? "font-serif" : "font-sans";
      
      const sizeMobile = block.sizeMobile || "text-sm";
      const sizeTablet = block.sizeTablet || "text-base";
      const sizeDesktop = block.sizeDesktop || "text-base";

      const elementId = `text-block-${Math.random().toString(36).substr(2, 9)}`;

      return (
        <div className={containerClass}>
          <div className={innerClass}>
            {block.text.split("\n\n").map((paragraph, idx) => {
              const pId = `${elementId}-${idx}`;
              const { className: resolvedSizeClass, style: sizeStyle, styleElement } = getResponsiveTextStyle(
                pId,
                sizeMobile,
                sizeTablet,
                sizeDesktop
              );
              const textClass = `text-ink/80 text-${block.align || "left"} ${fontFamily} ${boldClass} ${italicClass} ${trackingClass} ${leadingClass} ${resolvedSizeClass}`;
              return (
                <Fragment key={idx}>
                  {styleElement}
                  <p id={pId} className={textClass} style={sizeStyle}>
                    {paragraph}
                  </p>
                </Fragment>
              );
            })}
          </div>
        </div>
      );
    }
  }
}
