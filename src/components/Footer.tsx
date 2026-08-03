import { Link } from "react-router-dom";
import { LogoWordmark } from "./Logo";
import { nav, contactInfo } from "../content/brand";

export default function Footer() {
  return (
    <footer data-theme="dark" className="relative bg-ink text-cream pt-14 pb-8 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10">
        
        {/* Top: Call to Action & Info Distributed in Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          
          {/* Left CTA */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6 leading-[1.1] text-cream">
              Empecemos a <span className="text-red italic">construir.</span>
            </h2>
            <Link
              to="/contacto"
              data-cursor="Escribir"
              className="inline-flex items-center justify-center rounded-xl border border-cream/20 px-7 py-3 text-xs tracking-widest uppercase hover:bg-cream hover:text-navy transition-all duration-300 hover:scale-105"
            >
              Contactar al estudio
            </Link>
          </div>

          {/* Spacer on large screens */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Navegación Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="text-[10px] tracking-widest uppercase text-cream/40 mb-1 font-semibold">
              Navegación
            </h3>
            <div className="flex flex-col gap-2.5">
              {nav.map((item) => (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  data-cursor="Ver" 
                  className="text-sm transition-all w-fit opacity-70 hover:opacity-100 hover:text-cream hover:translate-x-1 duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacto Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="text-[10px] tracking-widest uppercase text-cream/40 mb-1 font-semibold">
              Contacto
            </h3>
            <div className="flex flex-col gap-2.5">
              <a 
                href={`mailto:${contactInfo.email}`} 
                className="text-sm transition-colors opacity-70 hover:opacity-100 hover:text-cream w-fit"
              >
                {contactInfo.email}
              </a>
              <span className="text-sm opacity-50">
                {contactInfo.city}
              </span>
            </div>
          </div>
          
        </div>

        {/* Bottom: Logo and Socials */}
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-6 border-t border-cream/10">
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-start text-[10px] tracking-widest uppercase text-cream/40">
            © {new Date().getFullYear()} Craft Studio
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <LogoWordmark className="w-28 md:w-36 h-auto text-cream opacity-80" />
          </div>

          <div className="w-full md:w-1/3 flex justify-center md:justify-end text-[10px] tracking-widest uppercase text-cream/50 font-medium">
            <a href="#" className="hover:text-cream transition-colors">
              Instagram
            </a>
          </div>

        </div>
        
      </div>
    </footer>
  );
}
