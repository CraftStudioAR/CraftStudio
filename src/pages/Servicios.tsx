import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";
import { services, process } from "../content/brand";
import Beams from "../components/Beams";

export default function Servicios() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cream px-6 pt-40 pb-32 md:pt-56 md:px-10 overflow-hidden min-h-[70vh] flex flex-col justify-end">
        {/* Massive Watermark */}
        <div className="absolute top-[40%] md:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
          <h1 className="font-sans font-bold text-[18vw] leading-none tracking-tighter opacity-5 uppercase select-none">
            Servicios
          </h1>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-serif text-6xl md:text-[6rem] lg:text-[7rem] leading-[0.9] italic text-ink">
                Programas, no <br className="hidden md:block"/>piezas sueltas.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 flex items-end">
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl opacity-70 text-balance leading-relaxed border-l-2 border-red pl-6">
                No vendemos entregables aislados. Cada programa parte de un diagnóstico profundo y termina en
                un sistema que la marca puede seguir usando sola.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services List (Open Editorial Grid) */}
      <section className="bg-cream px-6 pb-32 md:pb-48 md:px-10">
        <div className="mx-auto max-w-7xl flex flex-col gap-24 md:gap-40">
          {services.map((s) => (
            <div key={s.n} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 border-t border-ink/10 pt-16 md:pt-20">
              
              {/* Left: Number & Title */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <Reveal>
                  <span className="font-serif text-6xl md:text-8xl text-red italic opacity-50">{s.n}</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <h3 className="font-serif text-4xl md:text-5xl italic leading-tight">{s.title}</h3>
                </Reveal>
              </div>

              {/* Right: Details */}
              <div className="lg:col-span-7 flex flex-col gap-10 lg:pt-24">
                <Reveal delay={0.2}>
                  <p className="text-2xl md:text-3xl leading-snug">{s.summary}</p>
                </Reveal>
                
                <div className="flex flex-col gap-6 border-l border-ink/10 pl-6 md:pl-10">
                  <Reveal delay={0.3}>
                    <p className="text-base md:text-lg opacity-70 leading-relaxed">
                      {s.detail}
                    </p>
                  </Reveal>
                  <Reveal delay={0.4}>
                    <p className="text-xs md:text-sm font-medium tracking-widest text-red uppercase mt-4">
                      FIT IDEAL: <span className="text-ink opacity-80">{s.fit}</span>
                    </p>
                  </Reveal>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Process Section (Cinematic Dark) */}
      <section className="relative overflow-hidden bg-navy px-6 py-32 md:py-48 text-cream md:px-10 rounded-t-[3rem] md:rounded-t-[5rem]">
        
        {/* Background Beams */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <Beams
            beamWidth={2}
            beamHeight={30}
            beamNumber={30}
            lightColor="#F2EBE9"
            speed={2}
            noiseIntensity={1.5}
            scale={isMobile ? 0.3 : 0.5}
            rotation={isMobile ? 90 : 0}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal>
            <p className="mb-16 md:mb-24 text-sm tracking-widest text-red uppercase text-center flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-red"></span>
              Cómo trabajamos
              <span className="w-12 h-[1px] bg-red"></span>
            </p>
          </Reveal>

          <div className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.1} className="flex flex-col">
                <div className="bg-cream/[0.03] border border-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-between hover:bg-cream/[0.08] transition-colors duration-500">
                  <div>
                    <p className="font-serif text-6xl md:text-7xl italic text-red opacity-30 mb-8">{p.n}</p>
                    <p className="font-serif text-3xl md:text-4xl italic mb-4">{p.title}</p>
                  </div>
                  <p className="text-sm opacity-60 leading-relaxed mt-8">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
