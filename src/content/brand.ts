// Copy placeholder derivado del brief de marca (Concepto de Marca + Dirección Creativa).
// Reemplazar por contenido real del cliente cuando esté disponible.

export const nav = [
  { label: "Servicios", to: "/servicios" },
  { label: "Trabajos", to: "/trabajos" },
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
    title: "Creación de marca",
    summary: "Para marcas que necesitan nacer bien.",
    detail: "Cuando una empresa está en sus inicios, Craft no empieza por el logo. Empieza por las preguntas: ¿quién sos?, ¿a quién le hablás?, ¿qué te hace diferente? Las respuestas son las que dan forma a todo lo que viene después — concepto, posicionamiento, identidad visual, tono de voz y criterios de comunicación. Craft construye la marca como sistema desde el principio. Para que cuando salga al mercado, salga con claridad.",
    fit: [
      "Estás lanzando un negocio o producto nuevo",
      "Nunca tuviste una estrategia de marca definida",
      "Querés salir al mercado sabiendo exactamente qué lugar ocupás"
    ],
    includes: "diagnóstico inicial, concepto de marca, naming, posicionamiento, propuesta de valor, narrativa, tono de voz, identidad visual, sistema gráfico, aplicaciones y guidelines.",
    result: "Una marca preparada para salir al mercado con coherencia y dirección."
  },
  {
    n: "02",
    title: "Reposicionamiento",
    summary: "Para marcas que crecieron pero su comunicación no las acompañó.",
    detail: "Hay un momento en el que una empresa mira su comunicación y siente que ya no la representa. Cambió el público, creció la oferta, evolucionó el negocio — pero afuera sigue pareciendo lo que era antes. Craft trabaja ese momento. Ordena la estrategia de marca para que cada decisión posterior tenga sentido. No es un cambio estético: es una redefinición del lugar que ocupa la marca y de cómo lo comunica.",
    fit: [
      "Tu comunicación no refleja lo que hace tu empresa hoy",
      "Querés diferenciarte con más claridad de la competencia",
      "Estás en un momento de crecimiento y necesitás ordenar el relato"
    ],
    includes: "auditoría de marca, diagnóstico de comunicación, análisis de competencia, posicionamiento, propuesta de valor, narrativa, tono de voz y lineamientos para canales.",
    result: "Una marca con dirección clara sobre qué lugar ocupa y cómo diferenciarse."
  },
  {
    n: "03",
    title: "Refresh",
    summary: "Para marcas que necesitan una nueva identidad para una nueva etapa.",
    detail: "Algunas marcas tienen recorrido pero llegaron a un punto de quiebre. El negocio cambió, la identidad no. Craft trabaja ese pasaje — construye una nueva identidad que represente la evolución real de la empresa, sin borrar lo que ya se construyó. No es un cambio por moda. Es un cambio con argumento.",
    fit: [
      "Tu identidad visual quedó desactualizada",
      "Estás atravesando un cambio importante en el negocio",
      "Querés presentarte desde un nuevo lugar sin perder lo que construiste"
    ],
    includes: "diagnóstico de marca, ajuste de posicionamiento, nueva identidad visual, sistema gráfico, identidad verbal, aplicaciones principales, sistema visual para redes y estrategia de lanzamiento.",
    result: "Una marca con nueva identidad, comunicación coherente y una forma clara de presentar el cambio."
  }
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
  tags: string[];
};

export const work: WorkCase[] = [
  {
    slug: "caso-01",
    client: "Estudio de Arquitectura",
    category: "Reposicionamiento",
    year: "2025",
    summary: "Un sistema de identidad que actualiza la presencia digital sin perder trayectoria.",
    tags: ["Diagnóstico", "Identidad visual", "Sitio web"],
  },
  {
    slug: "caso-02",
    client: "Marca de Moda",
    category: "Identidad & sistema visual",
    year: "2025",
    summary: "Expansión internacional con un lenguaje visual escalable a nuevos mercados.",
    tags: ["Sistema visual", "Packaging", "Comunicación"],
  },
  {
    slug: "caso-03",
    client: "Cadena de Restaurantes",
    category: "Sistema de franquicia",
    year: "2024",
    summary: "Un sistema visual pensado para replicarse con consistencia en cada local nuevo.",
    tags: ["Sistema de franquicia", "Señalética", "Manual de marca"],
  },
  {
    slug: "caso-04",
    client: "Diseño Industrial",
    category: "Reposicionamiento",
    year: "2024",
    summary: "Reposicionamiento de marca sin perder el peso de una trayectoria consolidada.",
    tags: ["Reposicionamiento", "Identidad visual", "Comunicación estratégica"],
  },
];

export const contactInfo = {
  email: "hola@craftstudio.com.ar",
  city: "La Plata, Argentina",
  tagline: "We craft communication",
};

export const contactForm = {
  needs: [
    "Estoy creando una marca nueva",
    "Tengo una marca y quiero impulsarla",
    "Quiero relanzar/reposicionar mi marca",
    "Otro",
  ],
  budgets: ["Menos de USD 3.000", "USD 3.000 – 8.000", "USD 8.000 – 15.000", "Más de USD 15.000"],
  howFound: ["Instagram", "LinkedIn", "Recomendación", "Google", "Otro"],
};
