// Copy placeholder derivado del brief de marca (Concepto de Marca + Dirección Creativa).
// Reemplazar por contenido real del cliente cuando esté disponible.

export const nav = [
  { label: "Servicios", to: "/servicios" },
  { label: "Trabajos", to: "/trabajos" },
  { label: "Nosotras", to: "/nosotras" },
  { label: "Craft Lab", to: "/craft-lab" },
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

export const programasInfo = {
  title: "PROGRAMAS",
  description: "Para marcas que necesitan construir, ordenar o redefinir su identidad, posicionamiento y comunicación.",
  ideal: "Ideal si: tu marca está en un momento de cambio, crecimiento o definición y necesita un proceso estructural que vaya más allá de una acción puntual."
};

export const programas = [
  {
    n: "01",
    title: "Creación de Marca",
    summary: "Para marcas nuevas que necesitan nacer con una base clara.",
    detail: "Trabajamos sobre el branding, el posicionamiento y los criterios de comunicación para que la marca pueda salir al mercado con dirección.",
    fit: [
      "Lanzar una marca",
      "Crear una nueva unidad de negocio",
      "Presentar un proyecto desde cero"
    ],
    includes: "",
    result: ""
  },
  {
    n: "02",
    title: "Reposicionamiento",
    summary: "Para marcas que ya existen, pero necesitan redefinir cómo son percibidas.",
    detail: "Ordenamos la estrategia, el mensaje, la propuesta de valor y la forma en que la marca se comunica para que ocupe un lugar más claro.",
    fit: [
      "Tu marca creció",
      "Cambió de público",
      "Amplió su oferta o ya no comunica lo que realmente es"
    ],
    includes: "",
    result: ""
  },
  {
    n: "03",
    title: "Refresh",
    summary: "Para marcas que necesitan actualizar su identidad.",
    detail: "Trabajamos sobre una nueva etapa visual y comunicacional, alineada al momento actual de la marca y a lo que necesita proyectar.",
    fit: [
      "Renovar la identidad",
      "Modernizar la imagen",
      "Relanzar la marca con mayor coherencia"
    ],
    includes: "",
    result: ""
  }
];

export const brandPartnershipsInfo = {
  title: "BRAND PARTNERSHIPS",
  description: "Acompañamientos estratégicos y creativos para marcas que necesitan activar una acción puntual o sostener una dirección ya construida.",
  ideal: "Ideal si: ya tenés una identidad definida y lo que necesitás es poner en movimiento una acción concreta o mantener la coherencia de lo que ya construiste."
};

export const brandPartnerships = [
  {
    n: "01",
    title: "Activación",
    summary: "Para marcas que necesitan comunicar una campaña, lanzamiento o acción puntual con una idea clara.",
    detail: "Acompañamos el concepto, los mensajes, la dirección creativa y la bajada por canales para que la acción tenga coherencia con la marca.",
    fit: [
      "Necesitás lanzar un nuevo producto",
      "Querés comunicar una campaña o fecha clave",
      "Buscás acompañar una acción comercial puntual"
    ],
    includes: "concepto de campaña, mensajes clave, dirección creativa, diseño de piezas para canales, bajada estratégica y acompañamiento en ejecución.",
    result: "Una acción o campaña lanzada con coherencia visual, verbal y estratégica."
  },
  {
    n: "02",
    title: "Continuidad",
    summary: "Para marcas que ya trabajaron un programa con Craft y necesitan sostener la dirección.",
    detail: "Acompañamos la implementación desde una mirada estratégica y creativa, ayudando a que cada decisión siga respondiendo al sistema definido.",
    fit: [
      "Necesitás ordenar tus próximos pasos",
      "Buscás revisar y mejorar campañas activas",
      "Querés sostener una estrategia ya desarrollada"
    ],
    includes: "revisión estratégica continua, consultoría creativa, curaduría de contenidos, acompañamiento en producción y ajuste de piezas de comunicación.",
    result: "Una marca que se mantiene coherente, relevante y fiel a su sistema de identidad a lo largo del tiempo."
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
  city: "Buenos Aires, Argentina",
  tagline: "We craft communication",
};

export const contactForm = {
  needs: [
    "Estoy empezando un proyecto desde cero.",
    "Quiero hacer crecer una marca que ya existe.",
    "Necesito relanzar o reposicionar mi marca.",
    "Me interesa lanzar una campaña específica para mi proyecto.",
    "No estoy seguro, me gustaría recibir orientación.",
  ],
  budgets: [
    "Entre $500.000 y $1.000.000",
    "Entre $1.000.000 y $2.000.000",
    "Entre $2.000.000 y $5.000.000",
    "Más de $5.000.000",
  ],
  howFound: ["Instagram", "TikTok", "Google", "Recomendación", "Otro"],
  timelines: [
    "Lo antes posible.",
    "Dentro del próximo mes.",
    "En los próximos 2 o 3 meses.",
    "Solo estoy explorando opciones.",
  ]
};
