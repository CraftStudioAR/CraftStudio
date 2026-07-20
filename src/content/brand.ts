// Copy placeholder derivado del brief de marca (Concepto de Marca + Dirección Creativa).
// Reemplazar por contenido real del cliente cuando esté disponible.

export const nav = [
  { label: "Servicios", to: "/servicios" },
  { label: "Trabajos", to: "/trabajos" },
  { label: "Estudio", to: "/estudio" },
  { label: "Contacto", to: "/contacto" },
];

export const values = [
  {
    title: "Criterio",
    text: "Decidimos con fundamento, no por tendencia. Cada elección se sostiene sola frente a una pregunta.",
  },
  {
    title: "Oficio",
    text: "La suma del conocimiento técnico que no se delega. Se nota en el detalle que nadie pidió pero todos notan.",
  },
  {
    title: "Intención",
    text: "Nada es decorativo. Si un elemento está, es porque cumple una función dentro del sistema.",
  },
  {
    title: "Honestidad",
    text: "Decimos lo que pensamos aunque no sea lo que el cliente quiere escuchar primero.",
  },
  {
    title: "Profundidad",
    text: "El diagnóstico viene antes que la propuesta. Entendemos el negocio antes de tocar una tipografía.",
  },
  {
    title: "Construcción",
    text: "No entregamos piezas. Construimos sistemas que la marca puede seguir usando sola.",
  },
];

export const services = [
  {
    n: "01",
    title: "Diagnóstico de marca",
    summary:
      "Antes de diseñar, entendemos. Auditoría de identidad, negocio y contexto competitivo.",
    detail:
      "Ninguna solución tiene valor real si antes no existe comprensión profunda del problema. Este programa mapea dónde está parada la marca hoy, qué la frena y qué necesita realmente — no lo que parece que necesita.",
  },
  {
    n: "02",
    title: "Identidad & sistema visual",
    summary:
      "Un sistema de identidad completo, pensado para crecer con la marca, no en contra de ella.",
    detail:
      "Logotipo, paleta, tipografía, aplicaciones. Pero sobre todo: reglas claras para que el sistema se sostenga en manos de terceros, sin depender de nosotros para cada pieza nueva.",
  },
  {
    n: "03",
    title: "Comunicación estratégica",
    summary:
      "Tono de voz, mensajes clave y arquitectura de contenido para hablar con una sola voz.",
    detail:
      "Definimos cómo suena la marca en cada canal — qué dice, qué no dice y por qué. Un marco de mensajes que el equipo interno puede aplicar sin perder consistencia.",
  },
  {
    n: "04",
    title: "Reposicionamiento",
    summary:
      "Para marcas que crecieron más rápido que su comunicación y necesitan ponerse a la altura.",
    detail:
      "Trabajo por programas, no por piezas sueltas. Rediseñamos la percepción de la marca sin descartar la trayectoria construida hasta acá.",
  },
];

export const process = [
  { n: "01", title: "Diagnóstico", text: "Escuchamos, auditamos, entendemos el negocio real detrás del pedido." },
  { n: "02", title: "Estrategia", text: "Definimos el problema antes de proponer una sola solución visual." },
  { n: "03", title: "Diseño", text: "Construimos el sistema con oficio artesanal y precisión técnica." },
  { n: "04", title: "Sistema", text: "Entregamos reglas claras para que la marca lo use sola, sin depender de nosotros." },
];

export type WorkCase = {
  slug: string;
  client: string;
  category: string;
  year: string;
  summary: string;
};

export const work: WorkCase[] = [
  {
    slug: "caso-01",
    client: "Estudio de Arquitectura",
    category: "Reposicionamiento",
    year: "2025",
    summary: "Un sistema de identidad que actualiza la presencia digital sin perder trayectoria.",
  },
  {
    slug: "caso-02",
    client: "Marca de Moda",
    category: "Identidad & sistema visual",
    year: "2025",
    summary: "Expansión internacional con un lenguaje visual escalable a nuevos mercados.",
  },
  {
    slug: "caso-03",
    client: "Cadena de Restaurantes",
    category: "Sistema de franquicia",
    year: "2024",
    summary: "Un sistema visual pensado para replicarse con consistencia en cada local nuevo.",
  },
  {
    slug: "caso-04",
    client: "Diseño Industrial",
    category: "Reposicionamiento",
    year: "2024",
    summary: "Reposicionamiento de marca sin perder el peso de una trayectoria consolidada.",
  },
];

export const contactInfo = {
  email: "hola@craftstudio.com.ar",
  city: "La Plata, Argentina",
  tagline: "We craft communication",
};
