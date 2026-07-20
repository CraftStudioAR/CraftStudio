// Ondas concéntricas continuas — inspirado en el patrón "Ripple" de la
// librería de componentes, adaptado a la paleta oficial (navy + red
// alternados, solo opacidad, sin hex nuevos). Da movimiento ambiental
// constante sin depender del scroll.
export default function Ripple({ className = "" }: { className?: string }) {
  const rings = Array.from({ length: 6 });
  return (
    <div className={`pointer-events-none absolute inset-0 flex items-center justify-center ${className}`}>
      {rings.map((_, i) => (
        <span
          key={i}
          className={`ripple-ring absolute rounded-full border ${i % 2 === 0 ? "border-navy/25" : "border-red/20"}`}
          style={{
            width: `${160 + i * 130}px`,
            height: `${160 + i * 130}px`,
            animationDelay: `${i * 0.55}s`,
          }}
        />
      ))}
    </div>
  );
}
