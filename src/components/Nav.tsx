import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Magnetic from "./Magnetic";
import { LogoMark } from "./Logo";
import { nav } from "../content/brand";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden] = useState(false);
  const [forceHidden, setForceHidden] = useState(false);
  const location = useLocation();

  const [isOverDark, setIsOverDark] = useState(location.pathname === "/");
  const displayNav = nav;

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    setIsOverDark(location.pathname === "/");
  }, [location.pathname]);

  useEffect(() => {
    let ticking = false;
    
    const checkTheme = () => {
      const navY = 45; 
      
      // Chequeamos 3 puntos a lo largo del ancho de la pantalla
      // 15% (Izquierda), 50% (Centro/Logo), 85% (Derecha/Menú)
      const points = [
        window.innerWidth * 0.15,
        window.innerWidth * 0.5,
        window.innerWidth * 0.85
      ];
      
      let isDark = false;

      for (const x of points) {
        const elements = document.elementsFromPoint(x, navY);
        const themeElement = elements.find(el => {
          if (!el.hasAttribute('data-theme')) return false;
          // Ignorar tarjetas individuales de proyectos (WorkCards) u otros elementos interactivos pequeños
          const isInteractiveOrCard = el.tagName === 'A' || el.tagName === 'BUTTON' || el.classList.contains('group') || el.closest('.group');
          return !isInteractiveOrCard;
        });
        
        if (themeElement && themeElement.getAttribute('data-theme') === 'dark') {
          isDark = true;
          break; // Si toca algo oscuro en cualquier punto, lo volvemos claro por seguridad
        }
      }

      if (isDark) {
        setIsOverDark(true);
      } else {
        const isHome = window.location.pathname === "/";
        setIsOverDark(isHome && window.scrollY < window.innerHeight * 0.9);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkTheme();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Ejecutar chequeo inicialmente y repetirlo por si la página carga dinámicamente
    checkTheme();
    const intervalId = setInterval(checkTheme, 500);

    window.addEventListener("scroll", onScroll, { passive: true });
    
    const handleForceHide = () => setForceHidden(true);
    const handleForceShow = () => setForceHidden(false);
    window.addEventListener("nav-force-hide", handleForceHide);
    window.addEventListener("nav-force-show", handleForceShow);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("nav-force-hide", handleForceHide);
      window.removeEventListener("nav-force-show", handleForceShow);
      clearInterval(intervalId);
    };
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  // Si estamos sobre fondo oscuro, el texto NO debe ser oscuro (debe ser crema).
  // Y si abrimos el menú, el fondo del menú es navy, así que el texto debe ser crema.
  const isNavDarkText = !isOverDark && !open;
  const hamburgerColor = isNavDarkText ? "bg-ink" : "bg-cream";

  return (
    <>
      <header
        style={{
          transform: (hidden || forceHidden) && !open ? "translateY(-100%)" : "translateY(0)",
          pointerEvents: "none" // Para que los clics pasen a través del espacio vacío
        }}
        className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-6 py-5 transition-transform duration-500 md:px-10"
      >
        {/* Logo a la izquierda (glassmorphism) */}
        <div className="flex items-center justify-start pointer-events-auto">
          <Magnetic strength={0.25}>
            <Link 
              to="/" 
              data-cursor="Inicio" 
              onClick={() => setOpen(false)} 
              className={`block glass-panel ${isNavDarkText ? "glass-panel-light text-ink" : "glass-panel-dark text-cream"} group overflow-hidden rounded-full flex items-center justify-center w-14 h-14 md:w-16 md:h-16 transition-all hover:scale-105`}
            >
              <LogoMark className="h-12 md:h-14 w-auto transition-all duration-300 relative z-10" />
              <div className="glass-sheen"></div>
            </Link>
          </Magnetic>
        </div>

        {/* Espaciador central vacio */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
        </div>

        {/* Mobile Hamburger (Círculo glassmorphism derecha - Más chico) */}
        <button
          onClick={() => setOpen((v) => !v)}
          data-cursor={open ? "Cerrar" : "Menú"}
          className={`relative z-50 flex h-14 w-14 flex-col items-center justify-center gap-1 md:hidden pointer-events-auto rounded-full glass-panel ${isNavDarkText ? "glass-panel-light" : "glass-panel-dark"} group overflow-hidden transition-all hover:scale-105`}
          aria-label="Menú"
        >
          <div className="glass-sheen"></div>
          <span
            style={{ transform: open ? "translateY(5.5px) rotate(45deg)" : "none" }}
            className={`block h-[1.5px] w-4 transition-colors duration-300 relative z-10 ${hamburgerColor}`}
          />
          <span
            style={{ opacity: open ? 0 : 1 }}
            className={`block h-[1.5px] w-4 transition-colors duration-300 relative z-10 ${hamburgerColor}`}
          />
          <span
            style={{ transform: open ? "translateY(-5.5px) rotate(-45deg)" : "none" }}
            className={`block h-[1.5px] w-4 transition-colors duration-300 relative z-10 ${hamburgerColor}`}
          />
        </button>

        {/* Desktop Nav Links (Pastilla glassmorphism derecha) */}
        <nav className={`hidden md:flex items-center gap-8 text-sm tracking-wide uppercase px-8 py-3.5 rounded-full pointer-events-auto glass-panel ${isNavDarkText ? "glass-panel-light text-ink" : "glass-panel-dark text-cream"} group overflow-hidden transition-all`}>
          <div className="glass-sheen"></div>
          {displayNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-cursor="Ver"
              className={({ isActive }) =>
                `relative py-1 transition-opacity hover:opacity-60 z-10 ${isActive ? "opacity-100" : "opacity-70"}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-red"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 pt-20 pb-10 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {displayNav.map((item, i) => (
                <div key={item.to} className="overflow-hidden py-1">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => 
                        `font-sans text-3xl tracking-widest uppercase font-bold block transition-all duration-300 ${isActive ? "text-cream opacity-100" : "text-cream/50"}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                </div>
              ))}
            </div>
            
            {/* Contact Info at bottom of menu */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-16 flex flex-col gap-6"
            >
              <div className="w-full h-[1px] bg-cream/10" />
              
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] tracking-widest uppercase text-cream/40">Say Hello</p>
                  <a href="mailto:hola@craftstudio.com.ar" className="text-cream text-sm font-medium hover:text-red transition-colors">
                    hola@craftstudio.com.ar
                  </a>
                </div>
                <a href="#" className="text-cream/70 text-sm font-medium hover:text-cream transition-colors inline-flex items-center gap-1">
                  Instagram
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-2.5 h-2.5 shrink-0"
                  >
                    <line x1="2" y1="10" x2="10" y2="2" />
                    <polyline points="4 2 10 2 10 8" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
