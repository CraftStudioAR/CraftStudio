import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Copia de la referencia (Pinterest, pin 736901557818416811), medida cuadro por cuadro:
// un campo de fotos chicas (acá una esfera que gira sobre su eje) y, de a una, una foto
// sale del fondo, viene a primer plano casi centrada, se queda un momento creciendo apenas
// y vuelve al campo mientras la siguiente ya viene. Solo las fotos de Craft.

// ratio = ancho / alto real de cada foto
const photos = [
  { src: "/images/about1.jpg", ratio: 821 / 1024 },
  { src: "/images/about2.jpg", ratio: 821 / 1024 },
  { src: "/images/about3.jpg", ratio: 819 / 1024 },
  { src: "/images/about4.jpg", ratio: 924 / 1024 },
  { src: "/images/about5.jpg", ratio: 1024 / 768 },
];

// Azar con semilla: la esfera sale igual en cada carga.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// cubic-bezier(x1, y1, x2, y2) como en CSS.
function bezier(x1: number, y1: number, x2: number, y2: number) {
  const a = (p1: number, p2: number) => 1 - 3 * p2 + 3 * p1;
  const b = (p1: number, p2: number) => 3 * p2 - 6 * p1;
  const c = (p1: number) => 3 * p1;
  const at = (t: number, p1: number, p2: number) => ((a(p1, p2) * t + b(p1, p2)) * t + c(p1)) * t;
  const slope = (t: number, p1: number, p2: number) => 3 * a(p1, p2) * t * t + 2 * b(p1, p2) * t + c(p1);
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const s = slope(t, x1, x2);
      if (Math.abs(s) < 1e-6) break;
      t -= (at(t, x1, x2) - x) / s;
    }
    return at(t, y1, y2);
  };
}
// Movimiento en pantalla: ease-in-out fuerte (--ease-in-out del sistema de motion).
const easeInOut = bezier(0.77, 0, 0.175, 1);

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const rad = (d: number) => (d * Math.PI) / 180;

// --- Campo: esfera de fotos chicas ---
const COUNT = 110;
const MAX_LAT = 72; // grados: la esfera se recorta arriba y abajo
const rand = seeded(11);
const golden = Math.PI * (3 - Math.sqrt(5));
// Reparto de Fibonacci: piezas parejas en toda la esfera, sin amontonarse.
const field = Array.from({ length: COUNT }, (_, i) => {
  const v = 1 - (2 * (i + 0.5)) / COUNT;
  return {
    photo: photos[i % photos.length],
    lon: (i * golden * 180) / Math.PI,
    lat: Math.asin(v) * (180 / Math.PI) * (MAX_LAT / 90),
    r: 0.88 + rand() * 0.24, // capas apenas distintas: más profundidad
    w: 30 + rand() * 42,
    // Cómo queda en la pila del centro (antes de abrirse y después de guardarse).
    sx: (rand() * 2 - 1) * 6,
    sy: (rand() * 2 - 1) * 6,
    sr: (rand() * 2 - 1) * 4,
  };
});

// --- Las que pasan a primer plano: una por foto ---
// ox/oy: de qué parte del fondo sale (fracción de la pantalla desde el centro).
// fx/fy: dónde se queda en primer plano (en el video no siempre es el centro exacto).
const heroes = photos.map((photo, i) => ({
  photo,
  w: 90,
  ox: [-0.3, 0.32, -0.12, 0.26, -0.28][i],
  oy: [-0.22, 0.18, 0.28, -0.3, 0.12][i],
  fx: [-0.04, 0.05, 0, -0.05, 0.03][i],
  fy: [-0.06, 0.02, -0.03, 0.04, -0.02][i],
  // En la pila: apenas corridas y giradas, como fotos apoyadas una sobre otra.
  sx: [0, -7, 6, -4, 8][i],
  sy: [0, 5, -6, 7, -3][i],
  sr: [-2, 4, -5, 3, -3.5][i],
}));

const PERSPECTIVE = 700; // igual que .photo-tunnel en index.css
const CAM_BACK = 0.55; // cuánto se corre la cámara hacia atrás, en radios
const FIELD_TURN = 200; // grados que gira la esfera durante todo el sticky
const DRAG_TURN = 220; // grados por cada ancho de pantalla arrastrado
const FOCUS_WIDTH = 0.56; // ancho de la foto en primer plano, en fracción de la pantalla
const HOLD_GROW = 0.06; // cuánto crece mientras se queda adelante

// Tramo de scroll de cada foto (en fracción de su turno): viene, se queda, se va.
// Los tramos se pisan con los de la vecina: cuando una se va, la otra ya viene.
const IN_START = -0.2;
const IN_END = 0.3;
const OUT_START = 0.72;
const OUT_END = 1.2;
// Turnos de primer plano: la última termina de irse justo antes de que se guarden.
const TURNS = heroes.length - 1 + OUT_END;

// Al principio del sticky las fotos están apiladas en el centro y se abren;
// al final se vuelven a guardar en la pila. En el medio pasan las de primer plano.
const OPEN_END = 0.14;
const CLOSE_START = 0.86;
const STACK_WIDTH = 0.42; // ancho de la pila, en fracción de la pantalla

/** Qué tan abierta está la esfera (0 = pila, 1 = abierta). */
function spread(p: number) {
  if (p < OPEN_END) return easeInOut(p / OPEN_END);
  if (p > CLOSE_START) return 1 - easeInOut((p - CLOSE_START) / (1 - CLOSE_START));
  return 1;
}

/** Cuánto está en primer plano la foto (0 a 1) y cuánto lleva de "quedarse" (0 a 1). */
function heroState(p: number, i: number) {
  const u = heroTurn(p) - i;
  if (u <= IN_START || u >= OUT_END) return { f: 0, hold: 0 };
  if (u < IN_END) return { f: easeInOut((u - IN_START) / (IN_END - IN_START)), hold: 0 };
  if (u <= OUT_START) return { f: 1, hold: (u - IN_END) / (OUT_START - IN_END) };
  return { f: 1 - easeInOut((u - OUT_START) / (OUT_END - OUT_START)), hold: 1 };
}

/** Avance en turnos de primer plano: solo corre mientras la esfera está abierta. */
function heroTurn(p: number) {
  return ((p - OPEN_END) / (CLOSE_START - OPEN_END)) * TURNS;
}

/**
 * Mobile: queda fija (sticky) a pantalla completa mientras se scrollea. Las fotos pasan
 * de a una a primer plano y la esfera de fondo gira; arrastrar de costado también la gira.
 * Tocar una foto del fondo la trae adelante; tocarla de nuevo (o tocar otra) la devuelve.
 */
export default function PhotoTunnel({ intro }: { intro: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const stage = stageRef.current;
    if (!el || !stage) return;
    const fieldNodes = Array.from(stage.querySelectorAll<HTMLElement>("[data-field]"));
    const heroNodes = Array.from(stage.querySelectorAll<HTMLElement>("[data-hero]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0; // avance del sticky (0 a 1)
    let progress = 0; // el que se dibuja, persigue a target
    let dragTurn = 0; // grados que aporta el arrastre
    let velocity = 0; // inercia del arrastre al soltar
    let turn = 0; // giro de la esfera que se dibuja
    let dirty = true;
    const tapFocus = field.map(() => ({ f: 0 }));
    let tapped = -1;

    // Cached layout values – updated on resize / ScrollTrigger refresh, NOT every scroll event.
    let elTop = 0;
    let elHeight = 0;
    const measureLayout = () => {
      const r = el.getBoundingClientRect();
      elTop = r.top + window.scrollY;
      elHeight = r.height;
    };
    measureLayout();

    // 0 cuando el bloque toca arriba, 1 cuando se termina de despegar.
    const readScroll = () => {
      const span = elHeight - window.innerHeight;
      target = span > 0 ? clamp01((window.scrollY - elTop) / span) : 0;
    };
    readScroll();
    progress = target;
    turn = progress * FIELD_TURN;

    // Pose de primer plano: de frente, a FOCUS_WIDTH de la pantalla (y un poco más con grow).
    const frontZ = (w: number, W: number, grow: number) =>
      PERSPECTIVE - (PERSPECTIVE * w) / (FOCUS_WIDTH * W * (1 + grow));

    const render = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const R = Math.max(W, H) * 0.75;
      const s = spread(progress);
      const k0 = 1 - s;

      fieldNodes.forEach((node, i) => {
        const c = field[i];
        const lon = c.lon + turn;
        // El mismo ángulo entre -180 y 180: al abrirse gira lo justo, no las vueltas acumuladas.
        const face = (((lon % 360) + 540) % 360) - 180;
        const r = R * c.r;
        // Posición en la esfera (centro en el origen, adelante es -z).
        // Un poco más angosta que alta: menos fotos cortadas en los costados.
        const x = 0.85 * r * Math.cos(rad(c.lat)) * Math.sin(rad(lon));
        const y = r * Math.sin(rad(c.lat));
        const zc = -r * Math.cos(rad(c.lat)) * Math.cos(rad(lon));
        // Distancia a la cámara (corrida hacia atrás); las de atrás o al costado no se ven.
        const depth = -(zc - R * CAM_BACK);
        const vis = clamp01((depth - 120) / 220);

        const f = tapFocus[i].f;
        // La pila son solo las cinco fotos reales: el campo aparece a medida que se abre
        // y se desvanece al guardarse.
        const op = vis * s * s * (1 - f) + f;

        // Skip fully hidden nodes entirely — saves ~80% of transform writes on mobile.
        if (op < 0.005 && f < 0.005) {
          if (node.style.opacity !== "0") {
            node.style.opacity = "0";
            node.style.transform = "translate(-50%,-50%) translate3d(0,0,-9999px) scale(0)";
          }
          return;
        }

        // Mezcla entre la pila del centro y su lugar en la esfera. La pila está a la misma
        // profundidad que el frente de la esfera (así no se agrandan al pasar) y la escala
        // iguala los anchos; el índice las ordena de abajo hacia arriba.
        const stackDepth = R * (1 + CAM_BACK);
        const stackScale = (STACK_WIDTH * W * stackDepth) / (c.w * PERSPECTIVE);
        const sc = stackScale * k0 + s;
        const ex = c.sx * k0 + x * s;
        const ey = c.sy * k0 + y * s;
        const ez = (PERSPECTIVE - stackDepth + i * 0.4) * k0 + (PERSPECTIVE - depth) * s;

        const k = 1 - f;
        const pz = ez * k + frontZ(c.w, W, 0) * f;
        node.style.transform =
          `translate(-50%, -50%) translate3d(${ex * k}px, ${ey * k}px, ${pz}px) ` +
          `rotateY(${-face * s * k}deg) rotateX(${c.lat * s * k}deg) rotateZ(${c.sr * k0 * k}deg) ` +
          `scale(${sc * k + f})`;
        node.style.opacity = String(op);
      });

      heroNodes.forEach((node, i) => {
        const h = heroes[i];
        const { f, hold } = heroState(progress, i);
        // Lugar de base: en la pila del centro (cerrada) o chica en el fondo del campo (abierta).
        // Desde ahí viene a primer plano y vuelve.
        const farZ = PERSPECTIVE - R * 2.1;
        const stackDepth = R * (1 + CAM_BACK);
        const stackZ = PERSPECTIVE - stackDepth + (heroes.length - i) * 2; // la primera queda arriba
        const stackScale = (STACK_WIDTH * W * stackDepth) / (h.w * PERSPECTIVE);
        const bx = h.sx * k0 + h.ox * W * 1.6 * s;
        const by = h.sy * k0 + h.oy * H * 1.6 * s;
        const bz = stackZ * k0 + farZ * s;
        const k = 1 - f;
        const x = bx * k + h.fx * W * f;
        const y = by * k + h.fy * H * f;
        const z = bz * k + frontZ(h.w, W, HOLD_GROW * hold) * f;
        const sc = (stackScale * k0 + s) * k + f;
        node.style.transform =
          `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateZ(${h.sr * k0 * k}deg) scale(${sc})`;
        // Cerrada se ve en la pila; abierta se confunde con el campo y solo se apaga del todo
        // antes y después de su turno.
        const u = heroTurn(progress) - i;
        const turnOp = clamp01(Math.min((u - IN_START + 0.35) / 0.15, (OUT_END + 0.35 - u) / 0.15));
        const op = k0 + turnOp * s;
        node.style.opacity = String(op);
      });
    };

    const tick = () => {
      if (Math.abs(velocity) > 0.01) {
        dragTurn += velocity;
        velocity *= 0.93;
        dirty = true;
      } else {
        velocity = 0;
      }
      // Lenis already smooths the scroll — no second lerp needed.
      // Direct tracking eliminates the springy double-smoothing that caused jitter.
      if (progress !== target) {
        progress = target;
        dirty = true;
      }
      const nextTurn = progress * FIELD_TURN + dragTurn;
      if (turn !== nextTurn) {
        turn = nextTurn;
        dirty = true;
      }
      if (dirty) {
        render();
        dirty = false;
      }
    };

    // Solo corre mientras está en pantalla.
    let running = false;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        gsap.ticker.add(tick);
        running = true;
      } else if (!entry.isIntersecting && running) {
        gsap.ticker.remove(tick);
        running = false;
      }
    });
    io.observe(el);

    const onScroll = () => {
      readScroll();
      dirty = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      measureLayout();
      dirty = true;
    };
    window.addEventListener("resize", onResize);

    const setTapped = (i: number) => {
      const prev = tapped;
      tapped = i === tapped ? -1 : i;
      const d = reduced ? 0 : 0.55;
      if (prev >= 0) {
        gsap.to(tapFocus[prev], { f: 0, duration: d * 0.8, ease: "power3.out", onUpdate: () => void (dirty = true) });
      }
      if (tapped >= 0) {
        gsap.to(tapFocus[tapped], { f: 1, duration: d, ease: "power3.out", onUpdate: () => void (dirty = true) });
      }
    };

    // Arrastre de costado (el scroll vertical sigue siendo del navegador: touch-action pan-y).
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastT = 0;
    let dragging = false;
    let moved = false;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      startX = lastX = e.clientX;
      startY = e.clientY;
      lastT = performance.now();
      velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (Math.abs(e.clientX - startX) > 8 || Math.abs(e.clientY - startY) > 8) moved = true;
      const now = performance.now();
      const step = ((e.clientX - lastX) / stage.clientWidth) * DRAG_TURN;
      dragTurn += step;
      velocity = (step / Math.max(1, now - lastT)) * 16; // por cuadro de ~16 ms
      lastX = e.clientX;
      lastT = now;
      dirty = true;
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (reduced) velocity = 0;
      if (moved) return;
      // Fue un toque: traer adelante la foto tocada del fondo, o devolver la que estaba.
      velocity = 0;
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-field]");
      if (card) setTapped(Number(card.dataset.field));
      else if (tapped >= 0) setTapped(tapped);
    };
    const onCancel = () => void (dragging = false);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onCancel);

    render();
    // Este bloque suma varios altos de pantalla: que el pin de Proyectos (más abajo) se recalcule.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      io.disconnect();
      cancelAnimationFrame(refresh);
      if (running) gsap.ticker.remove(tick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onCancel);
      gsap.killTweensOf(tapFocus);
    };
  }, []);

  return (
    // El alto extra es el recorrido del sticky: se abre la pila, pasan las cinco fotos y se guardan.
    // Texto y galería quedan fijos juntos en una pantalla; la galería ocupa lo que sobra.
    <div ref={ref} className="md:hidden relative w-[100vw] h-[560svh]">
      <div className="sticky top-0 flex h-[100svh] w-full flex-col pt-24">
        {intro}
        <div className="tunnel-frame relative mt-5 min-h-0 flex-1">
          <div ref={stageRef} aria-hidden="true" className="photo-tunnel absolute inset-0 overflow-hidden select-none">
            {field.map((c, i) => (
              <div key={`f${i}`} data-field={i} className="tunnel-card absolute left-1/2 top-1/2" style={{ width: c.w, opacity: 0 }}>
                <img
                  src={c.photo.src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  decoding="async"
                  className="block w-full object-cover rounded-[6px]"
                  style={{ aspectRatio: String(c.photo.ratio) }}
                />
              </div>
            ))}
            {heroes.map((h, i) => (
              <div key={`h${i}`} data-hero={i} className="tunnel-card absolute left-1/2 top-1/2" style={{ width: h.w }}>
                <img
                  src={h.photo.src}
                  alt=""
                  draggable={false}
                  decoding="async"
                  className="block w-full object-cover rounded-[8px]"
                  style={{ aspectRatio: String(h.photo.ratio) }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
