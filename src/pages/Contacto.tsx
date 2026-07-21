import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import CursorSpotlight from "../components/CursorSpotlight";
import GlyphMark from "../components/GlyphMark";
import { LogoMark } from "../components/Logo";
import { contactInfo, contactForm } from "../content/brand";

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [need, setNeed] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [howFound, setHowFound] = useState<string | null>(null);

  // Placeholder: sin backend todavía. Cuando haya uno (Formspree, API propia, etc.)
  // reemplazar este handler por el submit real (incluyendo need/budget/howFound).
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <CursorSpotlight className="min-h-screen bg-cream px-6 pt-40 pb-32 md:px-10">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-6 text-sm tracking-widest text-red uppercase">Contacto</p>
            <h1 className="font-serif text-5xl italic md:text-6xl">
              Contanos qué necesita
              <br />
              tu marca.
            </h1>
            <p className="mt-8 max-w-sm text-lg opacity-70">
              Sin formularios de venta apurada. Un diagnóstico empieza con una conversación real.
            </p>

            <div className="mt-10 flex flex-col gap-2 text-sm">
              <a
                href={`mailto:${contactInfo.email}`}
                data-cursor="Escribir"
                className="w-fit border-b border-ink/30 pb-1 hover:border-ink"
              >
                {contactInfo.email}
              </a>
              <span className="opacity-60">{contactInfo.city}</span>
            </div>
          </Reveal>

          {/* Bloque visual atmosférico — no tenemos local físico ni sesión de
              fotos todavía, así que el "más visual, no solo texto" se resuelve
              con el mismo lenguaje de vidrio/grano/glifo del resto del sitio.
              Reemplazar por fotografía real cuando esté disponible. */}
          <Reveal delay={0.1}>
            <div className="glass-panel relative mt-12 flex aspect-[4/3] max-w-md items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-ink">
              <GlyphMark
                variant={9}
                className="absolute h-[70%] w-[70%] text-cream/10 transition-transform duration-700 group-hover:scale-105"
              />
              <LogoMark className="relative h-16 w-16 text-cream/70" />
              <div className="grain-overlay !absolute !opacity-15" />
              <div className="glass-sheen" />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          {sent ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-full flex-col justify-center"
            >
              <p className="font-serif text-4xl italic">Gracias.</p>
              <p className="mt-4 max-w-sm opacity-70">
                Recibimos tu mensaje. Te respondemos a la brevedad para coordinar una primera
                conversación.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              <PillQuestion
                label="¿Cuál de estas necesidades te representa más?"
                options={contactForm.needs}
                value={need}
                onChange={setNeed}
              />

              <PillQuestion
                label="¿Con qué presupuesto contás para este proyecto?"
                options={contactForm.budgets}
                value={budget}
                onChange={setBudget}
              />

              <PillQuestion
                label="¿Cómo llegaste a nosotros?"
                options={contactForm.howFound}
                value={howFound}
                onChange={setHowFound}
              />

              <div className="grid gap-8 sm:grid-cols-2">
                <Field label="Nombre" name="nombre" />
                <Field label="Empresa" name="empresa" />
              </div>
              <Field label="Email" name="email" type="email" />
              <div>
                <label className="text-xs tracking-widest opacity-50 uppercase">
                  Contanos un poco más
                </label>
                <textarea
                  name="mensaje"
                  required
                  rows={3}
                  className="mt-2 w-full resize-none border-b border-ink/30 bg-transparent py-2 font-serif text-xl italic outline-none placeholder:opacity-30 focus:border-ink"
                  placeholder="Tu marca y tu situación, en pocas palabras"
                />
              </div>

              <Magnetic strength={0.3} className="mt-2">
                <button
                  type="submit"
                  data-cursor="Enviar"
                  className="group flex w-fit items-center gap-3 text-sm tracking-widest uppercase"
                >
                  Enviar mensaje
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </button>
              </Magnetic>
            </form>
          )}
        </Reveal>
      </div>
    </CursorSpotlight>
  );
}

function PillQuestion({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs tracking-widest opacity-50 uppercase">{label}</label>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              key={opt}
              type="button"
              data-cursor="Elegir"
              onClick={() => onChange(opt)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                active
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/25 hover:border-ink/60"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="text-xs tracking-widest opacity-50 uppercase">{label}</label>
      <input
        type={type}
        name={name}
        required
        className="mt-2 w-full border-b border-ink/30 bg-transparent py-2 font-serif text-xl italic outline-none placeholder:opacity-30 focus:border-ink"
      />
    </div>
  );
}
