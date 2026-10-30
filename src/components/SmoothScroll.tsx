import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigationType } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const lenis = new Lenis({
      // Desktop: suave, desaceleración lenta y flotante
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,

      // Mobile / Touch: activar amortiguación en celular para que sea suave y controlado
      syncTouch: true,
      syncTouchLerp: 0.055,
      touchMultiplier: 0.88,
      touchInertiaExponent: 1.6,
    });
    lenisRef.current = lenis;

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
