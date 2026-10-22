import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  { src: "/images/about3.jpg", aspect: "aspect-square" },
  { src: "/images/about1.jpg", aspect: "aspect-[3/4]" },
  { src: "/images/about2.jpg", aspect: "aspect-[4/5]" },
  { src: "/images/about5.jpg", aspect: "aspect-[4/3]" },
  { src: "/images/about4.jpg", aspect: "aspect-[4/5]" },
];

/** Mobile: tira de fotos que se desliza con el scroll; arriba hacia la izquierda, abajo hacia la derecha. */
export default function PhotoStrip({ position }: { position: "top" | "bottom" }) {
  const ref = useRef<HTMLDivElement>(null);
  const row = position === "top" ? [...photos, ...photos] : [...photos.slice().reverse(), ...photos.slice().reverse()];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = ref.current?.querySelector(".strip-track");
      if (!track) return;
      const toLeft = position === "top";
      gsap.fromTo(
        track,
        { xPercent: toLeft ? 0 : -45 },
        {
          xPercent: toLeft ? -45 : 0,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.5 },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, [position]);

  return (
    <div ref={ref} className="md:hidden relative w-[100vw] overflow-hidden py-3">
      <div className="strip-track flex items-center gap-3 w-max px-3">
        {row.map((p, i) => (
          <img
            key={i}
            src={p.src}
            alt=""
            className={`h-32 ${p.aspect} object-cover rounded-sm shadow-md`}
            style={{ transform: `rotate(${((i % 3) - 1) * 2.5}deg) translateY(${i % 2 ? 6 : -6}px)` }}
          />
        ))}
      </div>
    </div>
  );
}
