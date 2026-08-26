import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(true);
  const [visible, setVisible] = useState(true);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Fast, responsive spring without heavy lag or freezing
  const ringX = useSpring(x, { stiffness: 1000, damping: 50, mass: 0.1 });
  const ringY = useSpring(y, { stiffness: 1000, damping: 50, mass: 0.1 });

  const labelRef = useRef<string | null>(null);
  const hasMovedRef = useRef(false);
  const visibleRef = useRef(true);

  useEffect(() => {
    const checkEnabled = () => {
      const isDesktopWidth = window.innerWidth >= 768;
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isDesktop = isDesktopWidth && isFinePointer;
      setEnabled(isDesktop);
      return isDesktop;
    };

    checkEnabled();

    const handleResize = () => {
      const active = checkEnabled();
      if (active) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const updatePosition = (clientX: number, clientY: number) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        x.jump(clientX);
        y.jump(clientY);
      } else {
        x.set(clientX);
        y.set(clientY);
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const move = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      const newLabel = target?.dataset.cursor ?? null;

      if (labelRef.current !== newLabel) {
        labelRef.current = newLabel;
        setLabel(newLabel);
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);
    
    const leave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const enter = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    const focus = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("pointermove", move as any, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("resize", handleResize);
    window.addEventListener("focus", focus);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("pointermove", move as any);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("focus", focus);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  // If disabled on mobile/small screens, ensure html/body gets cursor: auto back
  useEffect(() => {
    if (!enabled) {
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
    } else {
      document.documentElement.style.cursor = "none";
      document.body.style.cursor = "none";
    }
  }, [enabled]);

  if (!enabled) return null;

  const active = Boolean(label);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: ringX,
        y: ringY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
      transition={{ opacity: { duration: 0.1 } }}
    >
      <motion.div
        animate={{
          scale: pressed ? 0.85 : active ? 1.3 : 1,
          rotate: active ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="relative flex items-center justify-center"
        style={{ width: 34, height: 34 }}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="stroke-cream">
          <path d="M1 9V3a2 2 0 0 1 2-2h6" strokeWidth="1.4" />
          <path d="M33 9V3a2 2 0 0 0-2-2h-6" strokeWidth="1.4" />
          <path d="M1 25v6a2 2 0 0 0 2 2h6" strokeWidth="1.4" />
          <path d="M33 25v6a2 2 0 0 1-2 2h-6" strokeWidth="1.4" />
          <circle cx="17" cy="17" r="1.6" className="fill-cream" />
        </svg>
      </motion.div>

      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="bg-cream text-ink absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] tracking-wide uppercase font-medium"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
