import { Link } from "react-router-dom";
import Magnetic from "./Magnetic";
import { LogoMark } from "./Logo";
import { nav, contactInfo } from "../content/brand";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/10 bg-ink px-6 pt-20 pb-8 text-cream md:px-10">
      <div className="mx-auto max-w-6xl">
        <LogoMark className="h-9 w-9 opacity-80" />
        <p className="font-script mt-6 text-2xl text-cream/70">{contactInfo.tagline}</p>
        <Magnetic strength={0.15} className="mt-4 block">
          <Link
            to="/contacto"
            data-cursor="Escribir"
            className="group block font-serif text-[13vw] leading-[0.95] italic md:text-8xl"
          >
            Hablemos
            <span className="ml-4 inline-block transition-transform duration-500 group-hover:translate-x-3 group-hover:-translate-y-3">
              ↗
            </span>
          </Link>
        </Magnetic>

        <div className="mt-16 flex flex-col gap-10 border-t border-cream/15 pt-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-1 text-sm text-cream/60">
            <span>{contactInfo.email}</span>
            <span>{contactInfo.city}</span>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm tracking-wide uppercase">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} data-cursor="Ver" className="opacity-70 hover:opacity-100">
                {item.label}
              </Link>
            ))}
          </nav>

          <span className="text-xs text-cream/40">© {new Date().getFullYear()} Craft Studio</span>
        </div>
      </div>
    </footer>
  );
}
