import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { contactInfo, contactForm } from "../content/brand";
import { LogoWordmark } from "../components/Logo";
import Beams from "../components/Beams";

// Tabs data
const TABS = [
  { id: 1, label: "El Desafío" },
  { id: 2, label: "El Contexto" },
  { id: 3, label: "Tus Datos" },
];

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const [need, setNeed] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [howFound, setHowFound] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    email: "",
    mensaje: "",
  });

  // Check mobile on mount for the Beams rotation
  useState(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  const navigateToStep = (step: number) => {
    setDirection(step > activeStep ? 1 : -1);
    setActiveStep(step);
  };

  const nextStep = () => navigateToStep(Math.min(activeStep + 1, TABS.length));
  const prevStep = () => navigateToStep(Math.max(activeStep - 1, 1));

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 40 : -40,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="min-h-screen bg-cream text-ink relative overflow-hidden">
      <div className="px-6 pt-24 pb-20 md:pt-40 md:pb-32 md:px-10 mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* LADO IZQUIERDO: Título gigante */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[50vh]">
          <div>
            <Reveal>
              <p className="mb-8 text-xs tracking-widest text-red uppercase flex items-center gap-4 font-bold">
                <span className="w-12 h-[1px] bg-red" /> Un Nuevo Proyecto
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl italic leading-[0.9] tracking-tight text-navy">
                Hablemos<br />de tu marca.
              </h1>
              <p className="mt-8 max-w-sm text-xl opacity-70 font-medium text-balance">
                Completá este expediente interactivo para que podamos entender tu situación antes de nuestra primera reunión.
              </p>
            </Reveal>
          </div>

        </div>

        {/* LADO DERECHO: El Archivero Interactivo */}
        <div className="lg:col-span-7 flex flex-col pt-4">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-navy text-cream rounded-[2rem] md:rounded-[4rem] p-12 md:p-20 h-[600px] w-full flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden"
            >
              {/* Background Beams - exactamente como en Hero / Studio */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <Beams
                  beamWidth={2}
                  beamHeight={20}
                  beamNumber={40}
                  lightColor="#F2EBE9"
                  speed={2}
                  noiseIntensity={1.75}
                  scale={0.2}
                  rotation={isMobile ? 90 : 0}
                />
              </div>

              <LogoWordmark className="h-12 text-cream/30 mb-12 relative z-10" />
              <h3 className="font-serif italic text-5xl md:text-6xl mb-6 relative z-10">Expediente Creado</h3>
              <p className="text-xl opacity-70 max-w-md text-balance relative z-10">
                Hemos recibido tu información. Nuestro equipo la analizará y te contactaremos a la brevedad.
              </p>
            </motion.div>
          ) : (
            <div className="w-full flex flex-col relative h-[500px] sm:h-[550px] md:h-[650px]">
              
              {/* PESTAÑAS DEL ARCHIVERO */}
              <div className="flex gap-1 md:gap-2 mb-[-1px] relative z-20 px-2 md:px-8">
                {TABS.map((tab) => {
                  const isActive = activeStep === tab.id;
                  const isPast = activeStep > tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => navigateToStep(tab.id)}
                      disabled={!isPast && !isActive}
                      className={`relative px-3 md:px-8 py-3 md:py-5 rounded-t-[1.5rem] font-bold text-[9px] sm:text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 border border-b-0
                        ${isActive 
                          ? "bg-white border-ink/10 text-navy h-[110%] pb-6 z-10 shadow-[-5px_-5px_15px_rgba(0,0,0,0.02)]" 
                          : "bg-[#e5dfdb] border-transparent text-ink/30 hover:bg-[#eae4e0] mt-2 cursor-pointer"
                        }
                        ${!isPast && !isActive ? "cursor-not-allowed opacity-50" : ""}
                      `}
                    >
                      <span className="flex items-center gap-1 md:gap-2">
                        <span className={isActive ? 'text-red' : ''}>0{tab.id}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* CUERPO DEL ARCHIVERO */}
              <div className="bg-white rounded-[2rem] md:rounded-tl-[2rem] border border-ink/10 shadow-[0_15px_40px_rgb(0,0,0,0.06)] flex-1 relative overflow-hidden z-10 flex flex-col">
                <form onSubmit={handleSubmit} className="w-full h-full relative flex flex-col">
                  <AnimatePresence mode="wait" custom={direction}>
                    
                    {/* PASO 1 */}
                    {activeStep === 1 && (
                      <motion.div
                        key="step1"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex flex-col absolute inset-0 p-6 md:p-12 overflow-y-auto no-scrollbar bg-white"
                      >
                        <h2 className="font-serif italic text-2xl md:text-4xl mb-6 md:mb-8 text-navy">¿Qué necesita tu marca?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start">
                          {contactForm.needs.map((opt, i) => {
                            const isActive = need === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setNeed(opt);
                                  setTimeout(nextStep, 400);
                                }}
                                className={`relative overflow-hidden text-left p-4 md:p-6 rounded-2xl border transition-all duration-300 group ${
                                  isActive 
                                    ? "bg-navy border-navy text-cream shadow-xl scale-[1.02]" 
                                    : "bg-[#faf8f6] border-ink/10 text-ink hover:border-ink/30 hover:bg-white"
                                }`}
                              >
                                <span className={`text-[10px] font-bold tracking-widest uppercase mb-3 block transition-colors ${isActive ? 'text-red' : 'text-ink/30'}`}>Opción 0{i+1}</span>
                                <span className="font-sans font-medium text-base sm:text-lg md:text-xl leading-tight relative z-10">{opt}</span>
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex justify-end pt-6 mt-auto border-t border-ink/5">
                           <NextButton onClick={nextStep} disabled={!need} />
                        </div>
                      </motion.div>
                    )}

                    {/* PASO 2 */}
                    {activeStep === 2 && (
                      <motion.div
                        key="step2"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex flex-col absolute inset-0 p-6 md:p-12 overflow-y-auto no-scrollbar bg-white"
                      >
                        <div className="flex flex-col gap-10 flex-1 content-start">
                          <div>
                            <h2 className="font-serif italic text-2xl md:text-3xl mb-6 text-navy">Presupuesto estimado</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {contactForm.budgets.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setBudget(opt)}
                                  className={`px-4 py-3 md:px-6 md:py-4 rounded-xl border text-left transition-all duration-300 ${
                                    budget === opt
                                      ? "bg-ink text-cream border-ink shadow-lg scale-[1.02]"
                                      : "bg-[#faf8f6] border-ink/10 hover:border-ink/30 text-ink"
                                  }`}
                                >
                                  <span className="font-sans font-medium text-sm">{opt}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-ink/5 pt-8">
                            <h2 className="font-serif italic text-2xl md:text-3xl mb-6 text-navy">¿Cómo nos conociste?</h2>
                            <div className="flex flex-wrap gap-3">
                              {contactForm.howFound.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setHowFound(opt)}
                                  className={`rounded-full border px-4 py-2 md:px-6 md:py-3 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                                    howFound === opt
                                      ? "border-red text-cream bg-red shadow-md scale-[1.05]"
                                      : "border-ink/20 hover:border-ink/60 bg-transparent text-ink"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-6 border-t border-ink/5">
                          <button type="button" onClick={prevStep} className="group flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                            Atrás
                          </button>
                          <NextButton onClick={nextStep} disabled={!budget || !howFound} />
                        </div>
                      </motion.div>
                    )}

                    {/* PASO 3 */}
                    {activeStep === 3 && (
                      <motion.div
                        key="step3"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="w-full h-full flex flex-col absolute inset-0 p-6 md:p-12 overflow-y-auto no-scrollbar bg-white"
                      >
                        <h2 className="font-serif italic text-2xl md:text-3xl mb-8 text-navy">Tus Datos</h2>
                        <div className="flex flex-col gap-6 flex-1">
                          <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                            <Field label="Nombre" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                            <Field label="Empresa" name="empresa" value={formData.empresa} onChange={handleInputChange} />
                          </div>
                          <Field label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-end mb-2">
                              <label className="text-[10px] tracking-widest opacity-50 uppercase font-bold">
                                Mensaje
                              </label>
                              <span className="text-[10px] tracking-widest opacity-30 uppercase font-bold">Opcional</span>
                            </div>
                            <textarea
                              name="mensaje"
                              value={formData.mensaje}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full resize-none border-b border-ink/20 bg-[#faf8f6] hover:bg-white rounded-t-lg px-4 py-2 md:py-3 font-sans text-base md:text-xl outline-none placeholder:opacity-30 focus:border-red focus:bg-white transition-colors"
                              placeholder="Desarrolla brevemente tu situación..."
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-6 border-t border-ink/5">
                          <button type="button" onClick={prevStep} className="group flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                            Atrás
                          </button>
                          <Magnetic strength={0.2}>
                            <button
                              type="submit"
                              className="group flex items-center justify-center gap-3 bg-red text-cream px-6 md:px-8 py-3 md:py-4 rounded-full text-[10px] md:text-xs tracking-widest uppercase font-bold transition-transform hover:scale-105 shadow-[0_8px_20px_rgba(165,47,24,0.3)] disabled:opacity-50 disabled:pointer-events-none hover:bg-[#8a2613]"
                              disabled={!formData.nombre || !formData.email}
                            >
                              Enviar Expediente
                              <svg className="w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                            </button>
                          </Magnetic>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* O ESCRÍBENOS DIRECTAMENTE (Moved here, below the whole grid layout) */}
      <div className="px-6 pb-20 md:pb-32 mx-auto max-w-[1400px] flex justify-center lg:justify-end">
        <Reveal delay={0.2}>
          <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-2">
            <span className="text-[10px] tracking-widest uppercase opacity-40 font-bold">O Escríbenos Directamente</span>
            <a
              href={`mailto:${contactInfo.email}`}
              className="font-serif italic text-3xl md:text-4xl hover:text-red transition-colors inline-block"
            >
              {contactInfo.email}
            </a>
          </div>
        </Reveal>
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
      Continuar
      <svg className="w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
  );
}

function Field({ 
  label, 
  name, 
  type = "text",
  value,
  onChange
}: { 
  label: string; 
  name: string; 
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="text-[10px] tracking-widest opacity-50 uppercase font-bold block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        className="w-full border-b border-ink/20 bg-[#faf8f6] hover:bg-white rounded-t-lg px-4 py-2 md:py-3 font-sans text-base md:text-xl outline-none placeholder:opacity-30 focus:border-red focus:bg-white transition-colors"
      />
    </div>
  );
}
