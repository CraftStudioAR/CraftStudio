import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigationType } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

// Control dinámico de suavidad: ágil para Hero y About (exactamente "como antes"), y suave/amortiguado para Proyectos hacia abajo
export function setScrollSoftness(mode: "agile" | "soft") {
  if (typeof window === "undefined") return;
  const lenis = (window as any).__craftLenis as Lenis | undefined;
  if (!lenis) return;

  if (mode === "agile") {
    // Modo ágil: como antes, rápido y sin freno en touch para que el About no sea lento
    lenis.options.syncTouch = false;
    lenis.options.duration = 1.0;
    lenis.options.wheelMultiplier = 1.0;
  } else {
    // Modo soft: a partir de Proyectos hacia abajo, suave y amortiguado
    lenis.options.syncTouch = true;
    lenis.options.syncTouchLerp = 0.055;
    lenis.options.touchMultiplier = 0.88;
    lenis.options.touchInertiaExponent = 1.6;
    lenis.options.duration = 1.35;
    lenis.options.wheelMultiplier = 0.85;
  }
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const lenis = new Lenis({
      // Comienza en modo ágil/nativo para Hero y About ("como antes")
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      syncTouch: false,
      syncTouchLerp: 0.055,
      touchMultiplier: 0.88,
      touchInertiaExponent: 1.6,
    });
    lenisRef.current = lenis;
    (window as any).__craftLenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    setScrollSoftness("agile");
    if (navigationType !== "POP") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenisRef.current?.scrollTo(0, { immediate: true });
    }
    
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(t);
  }, [location.pathname, navigationType]);

  return <>{children}</>;
}
