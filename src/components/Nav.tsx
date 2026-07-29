import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Magnetic from "./Magnetic";
import { LogoLockupHorizontal } from "./Logo";
import { nav } from "../content/brand";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [forceHidden, setForceHidden] = useState(false);
  const location = useLocation();

  const isDarkBg = location.pathname === "/";
  
  const displayNav = nav;

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Solid bg logic: Wait until past the hero section (approx 90% of screen height) on home, else 50px
      const isHome = window.location.pathname === "/";
      setSolid(currentScrollY > (isHome ? window.innerHeight * 0.9 : 50));

      // The auto-hide logic on scroll down has been removed as requested, 
      // so the nav remains permanently visible on screen (except when forceHidden by specific sections).
      
      lastScrollY = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Listen for custom events to force hide the nav in specific sections (e.g. WorkSection)
    const handleForceHide = () => setForceHidden(true);
    const handleForceShow = () => setForceHidden(false);
    window.addEventListener("nav-force-hide", handleForceHide);
    window.addEventListener("nav-force-show", handleForceShow);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("nav-force-hide", handleForceHide);
      window.removeEventListener("nav-force-show", handleForceShow);
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

  // Determine colors based on state and route
  const isNavDarkText = (solid && !open) || (!solid && !open && !isDarkBg);
  const hamburgerColor = isNavDarkText ? "bg-ink" : "bg-cream";

  return (
    <>
      <header
        style={{
          transform: (hidden || forceHidden) && !open ? "translateY(-100%)" : "translateY(0)",
        }}
        className={`fixed top-0 right-0 left-0 z-[100] flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-10 ${
          solid && !open ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-transparent"
        } ${isNavDarkText ? "text-ink" : "text-cream"}`}
      >
        <Magnetic strength={0.25}>
          <Link to="/" data-cursor="Inicio" onClick={() => setOpen(false)} className="block">
            <LogoLockupHorizontal className="h-7 md:h-10 transition-all duration-300" />
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
            className={`block h-[1.5px] w-7 transition-colors duration-300 ${hamburgerColor}`}
          />
          <span
            style={{ opacity: open ? 0 : 1 }}
            className={`block h-[1.5px] w-7 transition-colors duration-300 ${hamburgerColor}`}
          />
          <span
            style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
            className={`block h-[1.5px] w-7 transition-colors duration-300 ${hamburgerColor}`}
          />
        </button>

        <nav className="hidden items-center gap-9 text-sm tracking-wide uppercase md:flex">
          {displayNav.map((item) => (
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
      </header>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-navy px-8 pt-20 pb-10 md:hidden overflow-y-auto"
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
                        `font-serif text-5xl block transition-colors ${isActive ? "text-cream italic" : "text-cream/60"}`
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
                <a href="#" className="text-cream/70 text-sm font-medium hover:text-cream transition-colors">
                  Instagram {"\u2197\uFE0E"}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
