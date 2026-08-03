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
  { id: 2, label: "El Proyecto" },
  { id: 3, label: "El Contexto" },
  { id: 4, label: "Tus Datos" },
];

export default function Contacto() {
  const [sent, setSent] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  const [need, setNeed] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [howFound, setHowFound] = useState<string | null>(null);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    marca: "",
    redes: "",
    proyectoInfo: "",
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

  const NextButton = ({ onClick, disabled }: { onClick: () => void, disabled?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`group flex items-center justify-center gap-2 px-8 py-4 bg-navy text-cream rounded-full font-bold tracking-widest text-xs uppercase transition-all duration-300 ${disabled ? "opacity-30 cursor-not-allowed" : "hover:bg-red hover:scale-105"}`}
    >
      Siguiente
      <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
    </button>
  );

  return (
    <div className="min-h-screen bg-cream text-ink relative overflow-hidden">
      <div className="px-6 pt-32 pb-20 md:pt-40 md:pb-32 md:px-10 mx-auto max-w-5xl flex flex-col items-center relative z-10">
        
        {/* ENCABEZADO CENTRADO */}
        <div className="w-full text-center flex flex-col items-center mb-16 relative z-10">
          <div>
            <Reveal>
              <p className="mb-6 text-[10px] md:text-xs tracking-widest text-red uppercase flex items-center justify-center gap-4 font-bold">
                <span className="w-8 md:w-12 h-[1px] bg-red" /> SECCIÓN / CONTACTANOS <span className="w-8 md:w-12 h-[1px] bg-red hidden md:block" />
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl italic leading-[0.9] tracking-tight text-navy">
                Hablemos de tu proyecto
              </h1>
              <p className="mt-6 mx-auto max-w-4xl text-base sm:text-lg opacity-75 font-normal leading-relaxed text-balance">
                Nos gustaría saber un poco más sobre vos, tu marca y lo que estás buscando. Completá este breve formulario y nos pondremos en contacto con vos lo antes posible!
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
              className="bg-navy text-cream rounded-2xl md:rounded-2xl p-12 md:p-20 min-h-[500px] w-full flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden"
            >
              {/* Background Beams */}
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

              <LogoWordmark className="h-10 md:h-12 text-cream/30 mb-8 relative z-10" />
              <h3 className="font-serif italic text-4xl sm:text-5xl md:text-6xl mb-6 relative z-10 text-cream">
                Craft recibió tu consulta.
              </h3>
              <div className="flex flex-col gap-4 max-w-lg text-cream/80 text-base md:text-lg font-normal leading-relaxed relative z-10">
                <p>
                  Gracias por tomarte el tiempo de contarnos sobre tu proyecto. Lo leemos con atención y te contactamos.
                </p>
                <p className="text-sm md:text-base opacity-75">
                  Mientras tanto, si querés conocer un poco más sobre cómo piensa Craft, pasate por <a href="/lab" className="text-cream underline hover:text-red transition-colors font-medium">Craft Lab</a>.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="w-full flex flex-col relative min-h-[300px] h-auto">
              
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
                          }
                          ${!isPast && !isActive ? "cursor-not-allowed opacity-50" : ""}
                        `}
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
                        className="w-full flex flex-col relative p-6 md:p-12 bg-white flex-1"
                      >
                        <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">01 / El Desafío</span>
                        <h2 className="font-serif italic text-2xl md:text-4xl mb-6 md:mb-8 text-navy">¿Qué necesita tu marca?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 content-start mb-8 md:mb-12">
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

                        <div className="flex justify-end pt-6 mt-auto">
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
                        className="w-full flex flex-col relative p-6 md:p-12 bg-white flex-1"
                      >
                        <div className="flex flex-col gap-10 flex-1 content-start">
                          <div>
                            <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">02 / El Proyecto</span>
                            <label className="text-[10px] tracking-widest opacity-50 uppercase font-bold mb-3 block">
                              ¿Qué hace tu marca y qué te gustaría lograr trabajando juntos?
                            </label>
                            <textarea
                              name="proyectoInfo"
                              value={formData.proyectoInfo}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full resize-none border-b border-ink/20 bg-[#faf8f6] hover:bg-white rounded-t-lg px-4 py-3 font-sans text-base outline-none placeholder:opacity-30 focus:border-red focus:bg-white transition-colors"
                              placeholder="Contanos un poco más sobre tu proyecto..."
                            />
                          </div>
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
                        </div>
                        <div className="flex justify-between items-center mt-auto pt-8">
                          <button type="button" onClick={prevStep} className="group flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                            Atrás
                          </button>
                          <NextButton onClick={nextStep} disabled={!formData.proyectoInfo || !budget} />
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
                        className="w-full flex flex-col relative p-6 md:p-12 bg-white flex-1"
                      >
                        <div className="flex flex-col gap-10 flex-1 content-start">

                          <div>
                            <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">03 / El Contexto</span>
                            <h2 className="font-serif italic text-2xl md:text-3xl mb-4 text-navy">¿Cuándo te gustaría empezar?</h2>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                              {contactForm.timelines.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setTimeline(opt)}
                                  className={`rounded-full border px-4 py-2 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                                    timeline === opt
                                      ? "border-red text-cream bg-red shadow-md scale-[1.05]"
                                      : "border-ink/20 hover:border-ink/60 bg-transparent text-ink"
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="border-t border-ink/5 pt-10">
                            <h2 className="font-serif italic text-2xl md:text-3xl mb-4 text-navy">¿Cómo llegaste a Craft?</h2>
                            <div className="flex flex-wrap gap-2 md:gap-3">
                              {contactForm.howFound.map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setHowFound(opt)}
                                  className={`rounded-full border px-4 py-2 text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
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

                        <div className="flex justify-between items-center mt-auto pt-6">
                          <button type="button" onClick={prevStep} className="group flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                            Atrás
                          </button>
                          <NextButton onClick={nextStep} disabled={!timeline || !howFound} />
                        </div>
                      </motion.div>
                    )}

                    {/* PASO 4 */}
                    {activeStep === 4 && (
                      <motion.div
                        key="step4"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="w-full flex flex-col relative p-6 md:p-12 bg-white flex-1"
                      >
                        <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">04 / Tus Datos</span>
                        <h2 className="font-serif italic text-2xl md:text-3xl mb-8 text-navy">Tus Datos</h2>
                        <div className="flex flex-col gap-6 flex-1">
                          <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                            <Field label="Nombre Completo" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                            <Field label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                          </div>
                          <div className="grid gap-4 md:gap-6 sm:grid-cols-2">
                            <Field label="Teléfono" name="telefono" type="tel" value={formData.telefono} onChange={handleInputChange} />
                            <Field label="Nombre de la marca o proyecto" name="marca" value={formData.marca} onChange={handleInputChange} />
                          </div>
                          <Field label="Redes Sociales y/o sitio web" name="redes" value={formData.redes} onChange={handleInputChange} />
                        </div>

                        <div className="flex justify-between items-center mt-auto pt-6">
                          <button type="button" onClick={prevStep} className="group flex items-center text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity">
                            <svg className="w-3 h-3 mr-1.5 inline-block transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                            Atrás
                          </button>
                          <Magnetic strength={0.2}>
                            <button
                              type="submit"
                              className="group flex items-center justify-center gap-3 bg-red text-cream px-6 md:px-8 py-3 md:py-4 rounded-xl text-[10px] md:text-xs tracking-widest uppercase font-bold transition-transform hover:scale-105 shadow-[0_8px_20px_rgba(165,47,24,0.3)] disabled:opacity-50 disabled:pointer-events-none hover:bg-[#8a2613]"
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
      
      {/* SUMATE AL EQUIPO BANNER */}
      <div className="px-6 pb-28 mx-auto max-w-[900px] flex flex-col items-center text-center">
        <Reveal>
          <span className="text-[10px] tracking-widest text-red uppercase font-bold block mb-4">SUMATE AL EQUIPO</span>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-navy mb-5">
            Sumate a nuestro equipo.
          </h2>
          <p className="text-base sm:text-lg opacity-70 mb-8 max-w-xl mx-auto text-balance leading-relaxed">
            Si compartís la manera en que Craft entiende el trabajo: con criterio, con proceso y con compromiso real, nos gustaría conocerte.
          </p>
          <a 
            href="/sumate" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group inline-flex items-center justify-center gap-3 bg-red text-cream px-8 py-3.5 rounded-xl text-xs tracking-widest uppercase font-bold transition-all duration-300 hover:scale-105 shadow-[0_8px_20px_rgba(165,47,24,0.25)] hover:bg-[#8a2613]"
          >
            contanos sobre vos
            <svg className="w-4 h-4 inline-block transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </Reveal>
      </div>
    </div>
  );
}

// COMPONENTES AUXILIARES

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
