import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { contactInfo } from "../content/brand";

const areas = [
  "Diseño gráfico",
  "Comunicación y contenidos",
  "Estrategia de marca",
  "Diseño UX/UI",
  "Fotografía y producción visual",
  "Community management",
  "Redacción y copywriting",
  "Otro"
];

const TABS = [
  { id: 1, label: "El Rol" },
  { id: 2, label: "Experiencia" },
  { id: 3, label: "Tus Datos" },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
};

export default function Sumate() {
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const [area, setArea] = useState<string | null>(null);
  const [otherArea, setOtherArea] = useState("");
  
  const [formData, setFormData] = useState({
    nombre: "",
    ciudad: "",
    tareas: "",
    portfolio: "",
    interes: "",
    telefono: "",
    email: "",
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '';
      if (!accessKey) {
        console.warn('VITE_WEB3FORMS_KEY no está configurada.');
        setSent(true);
        return;
      }

      const selectedArea = area === 'Otro' && otherArea ? `Otro (${otherArea})` : area;

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Nuevo Perfil Postulante - ${formData.nombre} (${selectedArea})`,
          from_name: formData.nombre,
          reply_to: formData.email,
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          ciudad: formData.ciudad,
          area: selectedArea,
          portfolio: formData.portfolio,
          tareas: formData.tareas,
          interes: formData.interes,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSent(true);
      } else {
        setSubmitError(data.message || 'Error al enviar el perfil.');
      }
    } catch (err: any) {
      console.error('Error submitting form to Web3Forms:', err);
      setSubmitError('Ocurrió un error al enviar tu postulación. Por favor, intentá nuevamente.');
    } finally {
      setSubmitting(false);
    }
  }

  function nextStep() {
    if (activeStep < 3) {
      setDirection(1);
      setActiveStep(prev => prev + 1);
    }
  }

  function prevStep() {
    if (activeStep > 1) {
      setDirection(-1);
      setActiveStep(prev => prev - 1);
    }
  }

  function navigateToStep(step: number) {
    if (step < activeStep) {
      setDirection(-1);
      setActiveStep(step);
    }
  }

  return (
    <div className="min-h-screen bg-cream text-ink relative overflow-hidden">


      <div className="px-6 pt-32 pb-20 md:pt-40 md:pb-32 md:px-10 mx-auto max-w-5xl flex flex-col items-center relative z-10">
          
          {/* ENCABEZADO CENTRADO */}
          <div className="w-full text-center flex flex-col items-center mb-16 relative z-10">
            <div>
              <Reveal>
                <p className="mb-6 text-[10px] md:text-xs tracking-widest text-red uppercase flex items-center justify-center gap-4 font-bold">
                  <span className="w-8 md:w-12 h-[1px] bg-red" /> SUMATE AL EQUIPO <span className="w-8 md:w-12 h-[1px] bg-red hidden md:block" />
                </p>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl italic leading-[0.9] tracking-tight text-navy">
                  Contanos quién sos
                </h1>
                <p className="mt-8 mx-auto max-w-3xl text-lg md:text-xl opacity-70 font-medium text-balance">
                  No buscamos perfiles para ejecutar tareas. Buscamos personas que piensen, que hagan preguntas y que se involucren de verdad con cada proyecto.
                </p>
              </Reveal>
            </div>
          </div>

          {/* EL ARCHIVERO INTERACTIVO */}
          <div className="w-full flex flex-col">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative bg-gradient-to-br from-[#B8381D] via-[#A52F18] to-[#751C0C] text-cream rounded-2xl p-12 md:p-20 flex-1 w-full flex flex-col justify-center items-center text-center shadow-2xl overflow-hidden min-h-[500px] border border-white/20 backdrop-blur-xl"
              >
                {/* Textura y efectos de luz glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10 pointer-events-none" />
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/30 rounded-full blur-3xl pointer-events-none" />
                <div className="glass-sheen" />

                <h3 className="font-serif italic text-4xl sm:text-5xl md:text-6xl mb-6 relative z-10 text-cream drop-shadow-md">
                  Craft recibió tu perfil.
                </h3>
                <p className="text-base sm:text-lg md:text-xl text-cream/90 max-w-xl text-balance leading-relaxed relative z-10 font-normal">
                  Lo revisamos con atención y te contactamos si hay una oportunidad de construir juntos.
                </p>
              </motion.div>
            ) : (
              <div className="w-full flex flex-col relative min-h-[300px] h-auto">
                
                {/* PESTAÑAS DEL ARCHIVERO */}
                <div className="flex items-end gap-1 md:gap-2 mb-[-1px] relative z-20 px-8 md:px-12">
                  {TABS.map((tab) => {
                    const isActive = activeStep === tab.id;
                    const isPast = activeStep > tab.id;
                    return (
                        <button
                          key={tab.id}
                          onClick={() => navigateToStep(tab.id)}
                          disabled={!isPast && !isActive}
                          className={`relative flex-1 flex justify-center items-center px-1 md:px-2 lg:px-4 py-3 md:py-5 rounded-t-xl md:rounded-t-xl font-bold text-[10px] sm:text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 border border-b-0
                          ${isActive 
                            ? "bg-white border-ink/10 text-navy z-10 shadow-[-5px_-5px_15px_rgba(0,0,0,0.02)]" 
                            : "bg-[#e5dfdb] border-transparent text-ink/30 hover:bg-[#eae4e0] mt-2 cursor-pointer"
                          }`}
                      >
                        <span className="flex items-center gap-1 md:gap-2 truncate text-center">
                          <span className={isActive ? 'text-red' : ''}>0{tab.id}</span>
                          <span className="truncate hidden md:inline">{tab.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* CUERPO DEL ARCHIVERO */}
                <div className="bg-white rounded-2xl md:rounded-2xl border border-ink/10 shadow-[0_15px_40px_rgb(0,0,0,0.06)] flex-1 relative overflow-hidden z-10 flex flex-col">
                  <form onSubmit={handleSubmit} className="w-full h-full relative flex flex-col">
                    <AnimatePresence mode="wait" custom={direction}>
                      
                      {/* PASO 1: El Rol */}
                      {activeStep === 1 && (
                        <motion.div
                          key="step1"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5 }}
                          className="w-full flex flex-col p-6 md:p-12 bg-white flex-1"
                        >
                          <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">01 / El Rol</span>
                          <h2 className="font-serif italic text-2xl md:text-4xl mb-6 md:mb-8 text-navy">¿En qué área te desarrollás?</h2>
                          
                          <div className="flex flex-wrap gap-2 md:gap-3">
                            {areas.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setArea(opt)}
                                className={`rounded-full border px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                                  area === opt
                                    ? "border-red text-cream bg-red shadow-md scale-[1.05]"
                                    : "border-ink/20 hover:border-ink/60 bg-transparent text-ink"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          
                          {area === "Otro" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-6">
                              <Field label="Especificá el área *" name="otherArea" value={otherArea} onChange={(e) => setOtherArea(e.target.value)} />
                            </motion.div>
                          )}

                          <div className="mt-8 pt-8 border-t border-ink/5">
                            <label className="text-[10px] tracking-widest opacity-50 uppercase font-bold mb-3 block">
                              ¿Por qué te interesa sumarte a Craft? *
                            </label>
                            <textarea
                              name="interes"
                              value={formData.interes}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full resize-none border-b border-ink/20 bg-[#faf8f6] hover:bg-white rounded-t-lg px-4 py-3 font-sans text-base outline-none placeholder:opacity-30 focus:border-red focus:bg-white transition-colors"
                              placeholder="No hace falta que sea formal. Contanos qué tipo de trabajo estás buscando..."
                            />
                          </div>
                          
                          <div className="flex justify-end pt-6 mt-auto">
                             <NextButton onClick={nextStep} disabled={!area || (area === "Otro" && !otherArea) || !formData.interes} />
                          </div>
                        </motion.div>
                      )}

                      {/* PASO 2: Experiencia */}
                      {activeStep === 2 && (
                        <motion.div
                          key="step2"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5 }}
                          className="w-full flex flex-col p-6 md:p-12 bg-white flex-1"
                        >
                          <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">02 / Experiencia</span>
                          <h2 className="font-serif italic text-2xl md:text-3xl mb-8 text-navy">Tu Experiencia</h2>
                          
                          <div className="mb-8">
                            <label className="text-[10px] tracking-widest opacity-50 uppercase font-bold mb-3 block">
                              Contanos un poco de vos. ¿Qué tareas llevás a cabo en tu trabajo del día a día? *
                            </label>
                            <textarea
                              name="tareas"
                              value={formData.tareas}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full resize-none border-b border-ink/20 bg-[#faf8f6] hover:bg-white rounded-t-lg px-4 py-3 font-sans text-base outline-none placeholder:opacity-30 focus:border-red focus:bg-white transition-colors"
                              placeholder="Sin apuro. Con tus palabras."
                            />
                          </div>

                          <div className="pt-8 border-t border-ink/5">
                            <label className="text-[10px] tracking-widest opacity-50 uppercase font-bold mb-3 block">
                              ¿Dónde podemos ver tu trabajo? Dejanos el link de tu CV y portfolio. *
                            </label>
                            <textarea
                              name="portfolio"
                              value={formData.portfolio}
                              onChange={handleInputChange}
                              rows={2}
                              className="w-full resize-none border-b border-ink/20 bg-[#faf8f6] hover:bg-white rounded-t-lg px-4 py-3 font-sans text-base outline-none placeholder:opacity-30 focus:border-red focus:bg-white transition-colors"
                              placeholder="Compartí links, imágenes o lo que te represente..."
                            />
                          </div>

                          <div className="flex justify-between items-center mt-auto pt-6">
                            <button type="button" onClick={prevStep} className="group flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                              <svg className="w-3 h-3 mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                              Atrás
                            </button>
                            <NextButton onClick={nextStep} disabled={!formData.tareas || !formData.portfolio} />
                          </div>
                        </motion.div>
                      )}

                      {/* PASO 3: Datos */}
                      {activeStep === 3 && (
                        <motion.div
                          key="step3"
                          custom={direction}
                          variants={slideVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5 }}
                          className="w-full flex flex-col p-6 md:p-12 bg-white flex-1"
                        >
                          <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">03 / Tus Datos</span>
                          <h2 className="font-serif italic text-2xl md:text-3xl mb-8 text-navy">Tus Datos Personales</h2>
                          
                          <div className="flex flex-col gap-6 flex-1">
                            <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                              <Field label="Nombre y Apellido *" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                              <Field label="Ciudad *" name="ciudad" value={formData.ciudad} onChange={handleInputChange} />
                            </div>
                            <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                              <Field label="Tu número de teléfono *" name="telefono" type="tel" value={formData.telefono} onChange={handleInputChange} />
                              <Field label="Tu mail *" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-auto pt-6">
                             <button type="button" onClick={prevStep} className="group flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                               <svg className="w-3 h-3 mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                               Atrás
                             </button>
                             
                             <div className="flex flex-col items-end gap-2">
                               {submitError && (
                                 <p className="text-red text-[10px] font-bold uppercase tracking-widest mb-1 animate-fadeIn">
                                   {submitError}
                                 </p>
                               )}
                               <Magnetic strength={0.2}>
                                 <button
                                   type="submit"
                                   className="group flex items-center justify-center gap-3 bg-red text-cream px-6 md:px-8 py-3 md:py-4 rounded-xl text-[10px] md:text-xs tracking-widest uppercase font-bold transition-transform hover:scale-105 shadow-[0_8px_20px_rgba(165,47,24,0.3)] disabled:opacity-50 disabled:pointer-events-none hover:bg-[#8a2613] cursor-pointer"
                                   disabled={!formData.nombre || !formData.ciudad || !formData.telefono || !formData.email || submitting}
                                 >
                                   {submitting ? 'Enviando...' : 'Enviar Perfil'}
                                   <svg className="w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                                 </button>
                               </Magnetic>
                             </div>
                           </div>
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </form>
                </div>
              </div>
            )}
          </div>

          {/* Mail alineado a la derecha con presencia y estilo */}
          <div className="w-full flex justify-end mt-6 mb-12">
            <a
              href={`mailto:${contactInfo.email}`}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white border border-ink/15 text-navy hover:text-red hover:border-red/40 hover:shadow-md transition-all duration-300 text-sm md:text-base font-medium tracking-wide shadow-sm"
            >
              <svg className="w-4 h-4 text-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span>{contactInfo.email}</span>
              <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES

function NextButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-widest uppercase px-5 md:px-6 py-3 rounded-full transition-all disabled:opacity-30 hover:-translate-y-1 shadow-lg bg-ink text-cream hover:bg-navy"
    >
      Siguiente
      <svg className="w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
  );
}

function Field({ label, name, type = "text", value, onChange }: { label: string; name: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="flex flex-col relative group">
      <label className="text-[10px] tracking-widest opacity-50 uppercase font-bold mb-2 group-focus-within:text-red group-focus-within:opacity-100 transition-all">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border-b border-ink/20 bg-[#faf8f6] hover:bg-white px-0 py-2 font-sans text-base md:text-lg outline-none focus:border-red focus:bg-transparent transition-colors rounded-none"
      />
    </div>
  );
}
