import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import Reveal from "../components/Reveal";
import { contactInfo } from "../content/brand";

export default function Contacto() {
  const [sent, setSent] = useState(false);

  // Placeholder: sin backend todavía. Cuando haya uno (Formspree, API propia, etc.)
  // reemplazar este handler por el submit real.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section className="min-h-screen bg-cream px-6 pt-40 pb-32 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
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

          <div className="mt-16 flex flex-col gap-2 text-sm">
            <a href={`mailto:${contactInfo.email}`} data-cursor="Escribir" className="w-fit border-b border-ink/30 pb-1 hover:border-ink">
              {contactInfo.email}
            </a>
            <span className="opacity-60">{contactInfo.city}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <Field label="Nombre" name="nombre" />
              <Field label="Empresa" name="empresa" />
              <Field label="Email" name="email" type="email" />
              <div>
                <label className="text-xs tracking-widest opacity-50 uppercase">Mensaje</label>
                <textarea
                  name="mensaje"
                  required
                  rows={3}
                  className="mt-2 w-full resize-none border-b border-ink/30 bg-transparent py-2 font-serif text-xl italic outline-none placeholder:opacity-30 focus:border-ink"
                  placeholder="Contanos brevemente tu situación"
                />
              </div>

              <button
                type="submit"
                data-cursor="Enviar"
                className="group mt-4 flex w-fit items-center gap-3 text-sm tracking-widest uppercase"
              >
                Enviar mensaje
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
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
