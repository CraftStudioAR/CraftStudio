import { useState } from "react";
import Reveal from "../Reveal";
import Lightbox from "./Lightbox";
import { cld } from "../../lib/cloudinary";
import type { ProjectBlock, ProjectImage } from "../../content/brand";

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

export default function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
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
  }
}
