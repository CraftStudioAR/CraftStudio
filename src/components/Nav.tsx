import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";
import { LogoLockupHorizontal } from "./Logo";
import { nav } from "../content/brand";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-6 py-5 transition-colors duration-500 md:px-10 ${
        solid ? "bg-cream/85 backdrop-blur-md text-ink" : "bg-transparent text-cream"
      }`}
    >
      <Magnetic strength={0.25}>
        <Link to="/" data-cursor="Inicio" onClick={() => setOpen(false)} className="block">
          <LogoLockupHorizontal className="h-5 md:h-7" />
        </Link>
      </Magnetic>

      <button
        onClick={() => setOpen((v) => !v)}
        data-cursor={open ? "Cerrar" : "Menú"}
        className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[6px] md:hidden"
        aria-label="Menú"
      >
        <span
          style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
          className={`block h-[1.5px] w-6 transition-all duration-300 ${solid ? "bg-ink" : "bg-cream"}`}
        />
        <span
          style={{ opacity: open ? 0 : 1 }}
          className={`block h-[1.5px] w-6 transition-all duration-300 ${solid ? "bg-ink" : "bg-cream"}`}
        />
        <span
          style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
          className={`block h-[1.5px] w-6 transition-all duration-300 ${solid ? "bg-ink" : "bg-cream"}`}
        />
      </button>

      <nav className="hidden items-center gap-9 text-sm tracking-wide uppercase md:flex">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            data-cursor="Ver"
            className={({ isActive }) =>
              `relative py-1 transition-opacity hover:opacity-60 ${isActive ? "opacity-100" : "opacity-70"}`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-dot"
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Panel siempre montado, animado con transición CSS nativa sobre
          clip-path (en vez de un motor JS) para que abrir/cerrar sea 100%
          confiable sin depender de un ciclo de exit-unmount. */}
      <div
        style={{
          clipPath: open ? "circle(150% at 100% 0%)" : "circle(0% at 100% 0%)",
          pointerEvents: open ? "auto" : "none",
          transition: "clip-path 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
        className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-ink px-10 md:hidden"
      >
        {nav.map((item, i) => (
          <div
            key={item.to}
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.4s ease ${open ? 0.15 + i * 0.06 : 0}s, transform 0.4s ease ${open ? 0.15 + i * 0.06 : 0}s`,
            }}
          >
            <NavLink
              to={item.to}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="font-serif-italic text-4xl text-cream"
            >
              {item.label}
            </NavLink>
          </div>
        ))}
      </div>
    </header>
  );
}
