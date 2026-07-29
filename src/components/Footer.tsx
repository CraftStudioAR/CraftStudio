import { Link } from "react-router-dom";
import { LogoWordmark } from "./Logo";
import { nav, contactInfo } from "../content/brand";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream pt-10 pb-6 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8">
        
        {/* Top: Call to Action & Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          
          <div className="flex flex-col items-start">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 leading-[1.1]">
              Empecemos a <span className="text-red italic">construir.</span>
            </h2>
            <Link
              to="/contacto"
              data-cursor="Escribir"
              className="inline-flex items-center justify-center rounded-full border border-cream/20 px-6 py-2 text-xs tracking-widest uppercase hover:bg-cream hover:text-navy transition-colors duration-300"
            >
              Contactar al estudio
            </Link>
          </div>

          <div className="flex gap-12 md:gap-16">
            <div className="flex flex-col gap-2">
              <h3 className="text-[9px] tracking-widest uppercase text-cream/40 mb-1 font-medium">Navegación</h3>
              {nav.map((item) => (
                <Link key={item.to} to={item.to} data-cursor="Ver" className="text-xs transition-colors w-fit opacity-80 hover:opacity-100 hover:text-cream">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[9px] tracking-widest uppercase text-cream/40 mb-1 font-medium">Contacto</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-xs transition-colors opacity-80 hover:opacity-100 hover:text-cream">{contactInfo.email}</a>
              <span className="text-xs opacity-60">{contactInfo.city}</span>
            </div>
          </div>
          
        </div>

        {/* Bottom: Logo and Socials */}
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-4 pt-4 border-t border-cream/10">
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-start text-[10px] tracking-widest uppercase text-cream/50">
            © {new Date().getFullYear()} Craft Studio
          </div>

          <div className="w-full md:w-1/3 flex justify-center">
            <LogoWordmark className="w-32 md:w-40 h-auto text-cream opacity-90" />
          </div>

          <div className="w-full md:w-1/3 flex justify-center md:justify-end text-[10px] tracking-widest uppercase text-cream/60 font-medium">
            <a href="#" className="hover:text-cream opacity-80 hover:opacity-100 transition-all">
              Instagram
            </a>
          </div>

        </div>
        
      </div>
    </footer>
  );
}
