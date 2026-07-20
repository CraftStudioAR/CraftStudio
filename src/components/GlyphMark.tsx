// Marcas abstractas inspiradas en el pilar gráfico del brief: glifos hechos a
// mano, alterados, con outline duplicado que evoca el "retype" y las capas.
const GLYPHS = [
  // asterisco alterado
  "M100 20 L100 180 M28 60 L172 140 M172 60 L28 140",
  // ampersand suelto
  "M150 150C110 170 60 160 55 125C50 95 90 90 110 105C130 120 100 150 70 145C45 140 40 110 60 90C80 68 120 55 140 75C155 90 150 115 130 125",
  // pilcrow / marca de párrafo
  "M120 30 L120 170 M95 30 L95 100 M60 30 H130 A35 35 0 0 1 95 100 H70 A35 35 0 0 1 95 30",
  // interrobang suelto
  "M70 30 C70 70 85 80 85 110 M85 150 V152 M140 40 L128 120 M128 150 V152",
];

export default function GlyphMark({
  variant = 0,
  className = "",
}: {
  variant?: number;
  className?: string;
}) {
  const d = GLYPHS[variant % GLYPHS.length];
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path d={d} stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
        transform="translate(6 5) rotate(-2 100 100)"
      />
    </svg>
  );
}
