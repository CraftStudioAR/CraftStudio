import { Link } from "react-router-dom";
import { LogoTagline } from "./Logo";
import { nav, contactInfo } from "../content/brand";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream pt-20 pb-10 px-6 md:px-10 border-t border-white/5">
      
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-20">
        
        {/* Top: Simple Call to Action & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="lg:col-span-2 flex flex-col items-start">
            <h2 className="font-serif text-5xl md:text-7xl mb-8 leading-[1.1]">Empecemos a<br/><span className="text-red italic">construir.</span></h2>
            <Link
              to="/contacto"
              data-cursor="Escribir"
              className="inline-flex items-center justify-center rounded-full border border-cream/20 px-8 py-3 text-sm tracking-widest uppercase hover:bg-cream hover:text-navy transition-colors duration-300"
            >
              Contactar al estudio
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] tracking-widest uppercase text-cream/40 mb-2 font-medium">Navegación</h3>
            {nav.map((item) => (
              <Link key={item.to} to={item.to} data-cursor="Ver" className="text-sm transition-colors w-fit opacity-80 hover:opacity-100 hover:text-cream">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-[10px] tracking-widest uppercase text-cream/40 mb-2 font-medium">Contacto</h3>
            <a href={`mailto:${contactInfo.email}`} className="text-sm transition-colors opacity-80 hover:opacity-100 hover:text-cream">{contactInfo.email}</a>
            <span className="text-sm opacity-60">{contactInfo.city}</span>
          </div>
          
        </div>

        {/* Bottom: The Logo and Side Links */}
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-8 pt-8 border-t border-cream/10">
          
          {/* Left: Copyright */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start text-xs tracking-widest uppercase text-cream/50">
            © {new Date().getFullYear()} Craft Studio
          </div>

          {/* Center: LogoTagline (Normal Size) */}
          <div className="w-full md:w-1/3 flex justify-center">
            <LogoTagline className="w-48 md:w-56 h-auto text-cream opacity-90" />
          </div>

          {/* Right: Socials */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-end gap-6 text-xs tracking-widest uppercase text-cream/60 font-medium">
            <a href="#" className="hover:text-cream opacity-80 hover:opacity-100 transition-all">Instagram</a>
            <a href="#" className="hover:text-cream opacity-80 hover:opacity-100 transition-all">LinkedIn</a>
            <a href="#" className="hover:text-cream opacity-80 hover:opacity-100 transition-all">Behance</a>
          </div>

        </div>
        
      </div>
    </footer>
  );
}
