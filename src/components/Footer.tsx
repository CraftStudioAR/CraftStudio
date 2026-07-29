import { Link } from "react-router-dom";
import { LogoWordmark } from "./Logo";
import { nav, contactInfo } from "../content/brand";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream pt-12 pb-8 px-6 md:px-10 border-t border-white/5">
      
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        
        {/* Top: Simple Call to Action & Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-2 flex flex-col items-start">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-[1.1]">Empecemos a<br/><span className="text-red italic">construir.</span></h2>
            <Link
              to="/contacto"
              data-cursor="Escribir"
              className="inline-flex items-center justify-center rounded-full border border-cream/20 px-8 py-3 text-sm tracking-widest uppercase hover:bg-cream hover:text-navy transition-colors duration-300"
            >
              Contactar al estudio
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] tracking-widest uppercase text-cream/40 mb-1 font-medium">Navegación</h3>
            {nav.map((item) => (
              <Link key={item.to} to={item.to} data-cursor="Ver" className="text-sm transition-colors w-fit opacity-80 hover:opacity-100 hover:text-cream">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] tracking-widest uppercase text-cream/40 mb-1 font-medium">Contacto</h3>
            <a href={`mailto:${contactInfo.email}`} className="text-sm transition-colors opacity-80 hover:opacity-100 hover:text-cream">{contactInfo.email}</a>
            <span className="text-sm opacity-60">{contactInfo.city}</span>
          </div>
          
        </div>

        {/* Bottom: The Logo and Side Links */}
        <div className="w-full flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-6 border-t border-cream/10">
          
          {/* Left: Copyright */}
          <div className="w-full md:w-1/3 flex justify-center md:justify-start text-xs tracking-widest uppercase text-cream/50">
            © {new Date().getFullYear()} Craft Studio
          </div>

          {/* Center: LogoWordmark */}
          <div className="w-full md:w-1/3 flex justify-center">
            <LogoWordmark className="w-40 md:w-48 h-auto text-cream opacity-90" />
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
