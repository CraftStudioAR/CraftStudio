import Reveal from "../components/Reveal";
import WorkCard from "../components/WorkCard";
import { work } from "../content/brand";

export default function Trabajos() {
  return (
    <>
      <section className="bg-cream px-6 pt-40 pb-20 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-6 text-sm tracking-widest text-red uppercase">Trabajos</p>
            <h1 className="font-serif text-5xl italic md:text-7xl">
              Sistemas construidos, no piezas entregadas.
            </h1>
            <p className="mt-8 max-w-xl text-lg opacity-70">
              Una selección de programas de identidad y comunicación. Casos completos disponibles
              a pedido durante una reunión.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-16 md:grid-cols-2">
          {work.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 0.08}>
              <WorkCard work={w} index={i} total={work.length} to="/contacto" cursorLabel="Solicitar caso" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
