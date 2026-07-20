import { useState } from "react";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import { services, process } from "../content/brand";

export default function Servicios() {
  const [open, setOpen] = useState<string | null>(services[0]?.n ?? null);

  return (
    <>
      <section className="bg-cream px-6 pt-40 pb-24 md:px-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="mb-6 text-sm tracking-widest text-red uppercase">Servicios</p>
            <h1 className="font-serif text-5xl italic md:text-7xl">Programas, no piezas sueltas.</h1>
            <p className="mt-8 max-w-xl text-lg opacity-70">
              No vendemos entregables aislados. Cada programa parte de un diagnóstico y termina en
              un sistema que la marca puede seguir usando sola.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream px-6 pb-32 md:px-10">
        <div className="mx-auto max-w-4xl">
          {services.map((s) => {
            const isOpen = open === s.n;
            return (
              <div
                key={s.n}
                className={`border-b transition-colors duration-500 ${isOpen ? "border-red/30" : "border-ink/10"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : s.n)}
                  data-cursor={isOpen ? "Cerrar" : "Abrir"}
                  className="flex w-full items-center gap-6 py-8 text-left md:gap-10"
                >
                  <span
                    className={`font-serif text-lg transition-colors duration-500 md:w-16 ${isOpen ? "text-red opacity-100" : "opacity-40"}`}
                  >
                    {s.n}
                  </span>
                  <span className="font-serif flex-1 text-2xl italic md:text-4xl">{s.title}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4 }}
                    className={`text-2xl transition-colors duration-500 ${isOpen ? "text-red opacity-100" : "opacity-50"}`}
                  >
                    +
                  </motion.span>
                </button>
                {/* grid-rows 0fr/1fr anima a "auto height" con CSS puro, sin depender
                    del ciclo de exit-unmount de AnimatePresence */}
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-10 pl-0 text-base opacity-70 md:pl-26">{s.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-ink px-6 py-32 text-cream md:px-10">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-14 text-sm tracking-widest text-red uppercase">Cómo trabajamos</p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
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
