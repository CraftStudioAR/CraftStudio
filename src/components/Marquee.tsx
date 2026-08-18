import { cld } from "../lib/cloudinary";

export type MarqueeItem = { publicId: string; alt: string } | string;

export default function Marquee({
  items,
  className = "",
}: {
  items: MarqueeItem[];
  className?: string;
}) {
  // Repetir la lista si son pocos elementos para que la animación fluida del marquee no deje huecos.
  const repeatedItems =
    items.length > 0 && items.length < 8
      ? Array.from({ length: Math.ceil(8 / items.length) }, () => items).flat()
      : items;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((rep) => (
          <div key={rep} aria-hidden={rep === 1} className="flex shrink-0 items-center">
            {repeatedItems.map((item, i) => (
              <span key={i} className="flex items-center">
                {typeof item === "string" ? (
                  <span className="font-serif px-12 text-2xl italic whitespace-nowrap opacity-60 md:text-3xl">
                    {item}
                  </span>
                ) : (
                  <img
                    src={cld(item.publicId, "f_auto,q_auto,h_120")}
                    alt={item.alt}
                    loading="lazy"
                    className="mx-10 md:mx-16 h-8 md:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
