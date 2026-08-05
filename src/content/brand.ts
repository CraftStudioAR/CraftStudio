// Copy placeholder derivado del brief de marca (Concepto de Marca + Dirección Creativa).
// Reemplazar por contenido real del cliente cuando esté disponible.

export const nav = [
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/trabajos" },
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

export type ProjectImage = { publicId: string; alt: string };

export type ProjectBlock =
  | { type: "image"; image: ProjectImage }
  | { type: "imageFeature"; main: ProjectImage; stacked: [ProjectImage, ProjectImage] }
  | {
      type: "imagePair";
      images: [ProjectImage, ProjectImage];
      mobileLayout?: "pair" | "stack";
      /** Aspect ratio CSS (ej. "9 / 10") que ambas imágenes comparten, para igualar su altura cuando sus proporciones naturales no coinciden. Si se omite, cada imagen usa su altura natural. */
      aspect?: string;
    }
  | { type: "imageText"; image: ProjectImage; text: string }
  | { type: "keywords"; items: string[] }
  | { type: "quote"; image: ProjectImage; quote: string };

export type WorkCase = {
  slug: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  tags: string[];
  cover?: ProjectImage;
  scope?: string[];
  description?: string;
  blocks?: ProjectBlock[];
};

export const work: WorkCase[] = [
  {
    slug: "etiqueta-emily-dickinson",
    client: "Diseño de etiqueta inspirada en Emily Dickinson",
    category: "Activación",
    year: "2025",
    summary:
      "Desarrollo de una etiqueta de vino basada en un concepto literario, combinando narrativa, ilustración y diseño editorial.",
    tags: [],
    scope: ["Diseño de packaging", "Dirección de arte", "Conceptualización", "Ilustración"],
    description:
      "Este proyecto nace como un homenaje a Emily Dickinson y a uno de sus poemas más emblemáticos: Hope is the thing with feathers. Más que diseñar una etiqueta, el objetivo fue transformar una obra literaria en una experiencia visual capaz de transmitir la sensibilidad de la autora y convertir la botella en un objeto narrativo.",
    cover: { publicId: "Etiqueta_Vino_13_jyhh3q", alt: "Pila de corchos de vino" },
    blocks: [
      {
        type: "image",
        image: { publicId: "Etiqueta_Vino_1_jwbjnl", alt: "Barriles de roble en la bodega, cartel HORNOS" },
      },
      {
        type: "imageFeature",
        main: { publicId: "Etiqueta_Vino_2_obsspl", alt: "Botella Emily en balde de hielo junto a limones y quesos" },
        stacked: [
          { publicId: "Etiqueta_Vino_3_sc5fyy", alt: "Uvas verdes con el logo Emily superpuesto" },
          { publicId: "Etiqueta_Vino_4_ys4utr", alt: "Puerta de la bodega de maduración" },
        ],
      },
      { type: "keywords", items: ["LIBERTAD", "MUNDO INTERIOR", "ESPERANZA"] },
      {
        type: "imagePair",
        mobileLayout: "pair",
        aspect: "9 / 10",
        images: [
          { publicId: "Etiqueta_Vino_5_ue990f", alt: "Viñedo entre montañas" },
          { publicId: "Etiqueta_Vino_6_xwcawc", alt: "Botella Emily sobre baldosas verdes" },
        ],
      },
      {
        type: "imageText",
        image: { publicId: "Etiqueta_Vino_7_ihwg8r", alt: "Libro de diseño abierto mostrando la etiqueta" },
        text: "Partimos del poema Hope is the thing with feathers para desarrollar una narrativa visual. La composición, las ilustraciones y los recursos gráficos fueron pensados para reflejar la esperanza, la escritura y el legado de Emily Dickinson, convirtiendo la etiqueta en una pieza que invita a descubrir la historia detrás del vino.",
      },
      {
        type: "imagePair",
        mobileLayout: "stack",
        images: [
          { publicId: "Etiqueta_Vino_8_nra45o", alt: "Bocetos a mano del diseño de la etiqueta" },
          { publicId: "Etiqueta_Vino_9_tjhx8b", alt: "Planos con las medidas de la etiqueta" },
        ],
      },
      {
        type: "image",
        image: { publicId: "Etiqueta_Vino_10_rddwol", alt: "Picnic con burrata, copa de vino y botella Emily en bolsa de red" },
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "Etiqueta_Vino_11_o61a69", alt: "Estantería de una bodega con botellas" },
          { publicId: "Etiqueta_Vino_12_lxacxh", alt: "Botella Emily sobre un banco de madera" },
        ],
      },
      {
        type: "imageText",
        image: { publicId: "Etiqueta_Vino_13_jyhh3q", alt: "Pila de corchos de vino" },
        text: "El diseño representa la vida de Emily Dickinson y cómo, desde la intimidad de su habitación, fue capaz de crear mundos a través de la escritura. Aunque vivió gran parte de su vida en aislamiento, encontró en las palabras una forma de libertad.\n\nEl pájaro representa la esperanza; la pluma que cae, la transformación; y la pluma de escritura simboliza la libertad que Emily encontró en su poesía. La tipografía manuscrita evocan sus manuscritos originales, reforzando el carácter íntimo y personal de sus poemas.",
      },
      {
        type: "quote",
        image: { publicId: "Etiqueta_Vino_14_nt9zbd", alt: "Viñedo al atardecer" },
        quote: "Hope is the thing with feathers",
      },
    ],
  },
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
