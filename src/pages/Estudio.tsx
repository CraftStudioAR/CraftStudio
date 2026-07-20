import Reveal from "../components/Reveal";
import GlyphMark from "../components/GlyphMark";
import { values, process } from "../content/brand";

export default function Estudio() {
  return (
    <>
      <section className="bg-cream px-6 pt-40 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-6 text-sm tracking-widest text-red uppercase">Estudio</p>
            <h1 className="font-serif text-5xl italic md:text-7xl">
              Pensamos como estratega, construimos como artesano.
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy px-6 py-28 text-cream md:px-10">
        <GlyphMark
          variant={1}
          className="pointer-events-none absolute -top-20 -right-16 z-0 h-[36vw] w-[36vw] max-w-[420px] text-cream/[0.05]"
        />
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-3 relative z-10">
          {[
            { k: "Propósito", v: "Existimos para darle forma al mensaje de las marcas que tienen algo real para decir." },
            { k: "Misión", v: "Pensamos el problema, diseñamos la solución." },
            { k: "Visión", v: "Ser el estudio que las marcas eligen cuando saben que necesitan más que diseño." },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 0.08}>
              <p className="mb-4 text-xs tracking-widest text-red uppercase">{item.k}</p>
              <p className="font-serif text-2xl italic leading-snug">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream px-6 py-32 md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="font-serif mb-14 text-5xl italic md:text-6xl">Valores</h2>
          </Reveal>
          <div className="grid gap-x-10 gap-y-12 border-t border-ink/10 pt-12 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <p className="mb-2 text-xs tracking-widest text-red uppercase">{`0${i + 1}`}</p>
                <p className="font-serif text-2xl italic">{v.title}</p>
                <p className="mt-3 text-sm opacity-70">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink px-6 py-32 text-cream md:px-10">
        <GlyphMark
          variant={3}
          className="pointer-events-none absolute -bottom-24 -left-16 z-0 h-[38vw] w-[38vw] max-w-[440px] text-cream/[0.05]"
        />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-4 text-sm tracking-widest text-red uppercase">Posicionamiento</p>
            <p className="font-serif max-w-3xl text-3xl italic leading-snug md:text-4xl">
              No somos una agencia que acepta todo lo que llega. Tampoco un proveedor de piezas
              gráficas sueltas sin contexto estratégico.
            </p>
          </Reveal>

          <div className="mt-20 grid gap-10 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.06}>
                <p className="font-serif text-3xl italic opacity-40">{p.n}</p>
                <p className="font-serif mt-3 text-xl italic">{p.title}</p>
                <p className="mt-2 text-sm opacity-60">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
