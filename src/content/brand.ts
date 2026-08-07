// Copy placeholder derivado del brief de marca (Concepto de Marca + Dirección Creativa).
// Reemplazar por contenido real del cliente cuando esté disponible.

export const nav = [
  { label: "Servicios", to: "/servicios" },
  { label: "Proyectos", to: "/trabajos" },
  { label: "Nosotras", to: "/nosotras" },
  { label: "Craft Lab", to: "/craft-lab" },
  { label: "Contacto", to: "/contacto" },
];

/** Bajada del hero de Servicios. El "por qué" ya lo cuenta el Home: acá sólo se
 *  ordena cómo está organizada esa forma de trabajar. */
export const modalidadesInfo = {
  description:
    "Contamos con dos formas de acompañar a tu marca. Cada una reúne programas y proyectos pensados para responder a necesidades diferentes. Deslizá y conocé qué incluye cada una.",
};

export const programasInfo = {
  title: "PROGRAMAS",
  description: "Construimos la dirección de una marca a través de procesos estratégicos que responden a distintos momentos: crear, reposicionar o actualizar."
};

export const programas = [
  {
    n: "01",
    title: "Build Program",
    summary: "Para marcas nuevas que necesitan nacer con una base clara.",
    detail: "Construimos el branding, el posicionamiento y los criterios de comunicación para salir al mercado con dirección.",
    fit: [
      "Nueva Marca o Proyecto"
    ]
  },
  {
    n: "02",
    title: "Shift Program",
    summary: "Para marcas que crecieron, cambiaron o ya no comunican lo que realmente son.",
    detail: "Revisamos el posicionamiento, la propuesta de valor y la comunicación para que la marca conecte mejor con su negocio, su público y sus objetivos.",
    fit: [
      "Negocio en evolución",
      "Nuevo público",
      "Mayor diferenciación"
    ]
  },
  {
    n: "03",
    title: "Refresh Program",
    summary: "Para marcas que necesitan actualizar su identidad para representar una nueva etapa.",
    detail: "Actualizamos la identidad visual y el sistema de comunicación para que la marca refleje con mayor coherencia quién es hoy y hacia dónde quiere crecer.",
    fit: [
      "Relanzamiento",
      "Cambio de Imagen"
    ]
  }
];

/** Brand Partnerships no se abre en subcategorías: ya es la modalidad. Una
 *  activación es uno de los proyectos que puede darse dentro de ella, no un
 *  nivel más abajo. */
export const brandPartnershipsInfo = {
  title: "BRAND PARTNERSHIPS",
  description: "Diseñamos y dirigimos acciones de comunicación para marcas que ya cuentan con una dirección definida.",
  detail: "Nos sumamos a proyectos que necesitan una mirada estratégica, creativa y de ejecución. Cada Brand Partnership se construye según los objetivos de la marca y el alcance de la iniciativa.",
  scope: "Desarrollamos campañas, lanzamientos de producto, producciones, activaciones de marca, dirección creativa, experiencias digitales, desarrollo visual, entre otros.",
  ideal: [
    "Lanzar un producto.",
    "Comunicar una fecha clave.",
    "Potenciar una acción comercial.",
    "Desarrollar un proyecto especial.",
    "Coordinación de activaciones online y offline."
  ]
};

export type ProjectImage = {
  publicId: string;
  alt: string;
  /** Proporción natural ancho/alto (ej. 2160/3261). Solo hace falta en pares con matchHeight. */
  ratio?: number;
};

/** Métrica de resultado. El número va aparte del formato para poder animar el conteo. */
export type Stat = {
  value: number;
  /** Decimales al mostrarlo (ej. 1 → "2,1"). */
  decimals?: number;
  /** Se pega delante del número (ej. "+"). */
  prefix?: string;
  /** Se pega detrás del número (ej. " M", " mil", "%"). */
  suffix?: string;
  label: string;
};

export type ProjectBlock =
  | { type: "image"; image: ProjectImage }
  | { type: "imageFeature"; main: ProjectImage; stacked: [ProjectImage, ProjectImage] }
  | {
      type: "imagePair";
      images: [ProjectImage, ProjectImage];
      mobileLayout?: "pair" | "stack";
      /** Aspect ratio CSS (ej. "9 / 10") que ambas imágenes comparten, para igualar su altura cuando sus proporciones naturales no coinciden. Si se omite, cada imagen usa su altura natural. */
      aspect?: string;
      /** Iguala el alto escalando en vez de recortar: la más alta se achica y las dos
       *  conservan su proporción natural. Requiere `ratio` en ambas imágenes y siempre
       *  va en fila, también en mobile (ignora mobileLayout). */
      matchHeight?: boolean;
    }
  | {
      type: "imageText";
      image: ProjectImage;
      text: string;
      /** Quien define el alto de la fila en desktop. "text" (default): la imagen se
       *  estira hasta el alto del texto. "image": la imagen queda en su alto natural
       *  y la caja de texto crece hasta igualarla. */
      heightFrom?: "text" | "image";
    }
  | { type: "keywords"; items: string[] }
  | { type: "quote"; image: ProjectImage; quote: string }
  | {
      type: "stats";
      /** Encabezado del panel (ej. "Resultados Instagram 2024"). */
      title?: string;
      items: Stat[];
      /** Métrica destacada, en una fila propia al pie del panel. */
      highlight?: Stat;
    }
  | { type: "testimonial"; quote: string; author: string; role: string };

export type WorkCase = {
  slug: string;
  client: string;
  /** Qué se hizo, en concreto (ej. "Concepto y Diseño de Packaging"). El detalle
   *  del proceso y las decisiones van en el caso, no acá. */
  title?: string;
  /** Modalidad bajo la que se trabajó: un programa ("Shift Program") o "Brand Partnership". */
  category: string;
  year: string;
  summary: string;
  cover?: ProjectImage;
  scope?: string[];
  description?: string;
  blocks?: ProjectBlock[];
};

export const work: WorkCase[] = [
  {
    slug: "yokoo-studio",
    client: "Yokoo Studio",
    title: "Reposicionamiento de Comunicación",
    category: "Shift Program",
    year: "2022-2025",
    summary:
      "Acompañamos la evolución de Yokoo Studio durante más de dos años a través de un proceso de reposicionamiento de su comunicación, desarrollando una estrategia de Growth Marketing que integró contenido, campañas y experiencias para impulsar una nueva etapa de crecimiento.",
    scope: [
      "Estrategia de comunicación",
      "Growth Marketing",
      "Lanzamiento de producto",
      "Activaciones",
      "Influencer Marketing",
      "Ecommerce",
    ],
    description:
      "Yokoo Studio atravesaba una etapa de crecimiento y necesitaba que su comunicación evolucionara al mismo ritmo que el negocio. Entre 2023 y septiembre de 2025 trabajamos de forma cercana con los fundadores y en articulación con las distintas áreas de la marca, desarrollando una estrategia de comunicación con enfoque en Growth Marketing.",
    cover: { publicId: "1_ad1dsz", alt: "Campaña Yokoo Studio The Making: buzo navy con el logo dorado en el set de producción" },
    blocks: [
      {
        type: "image",
        image: { publicId: "2_nzdgkt", alt: "Perfil con gorro tejido Yokoo Studio y campera verde lima sobre un fondo de montañas nevadas" },
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "3_dbmzui", alt: "Remera gris con la estampa are we living a dream? vista de espaldas" },
          { publicId: "6_m9updu", alt: "Dos modelos con remeras Yokoo en la rampa rosa de un skatepark" },
        ],
      },
      {
        type: "imageText",
        // La foto manda el alto de la fila: entra completa y el texto se estira hasta igualarla.
        heightFrom: "image",
        image: { publicId: "4_bdbaii", alt: "Tres polaroids de la campaña sobre el cemento de una cancha de tenis" },
        text: "A través de campañas, contenido, e-commerce, lanzamientos y experiencias, construimos un sistema de comunicación consistente que acompañó el crecimiento del negocio, fortaleció el posicionamiento de la marca y dio coherencia a cada punto de contacto.",
      },
      {
        type: "imagePair",
        // Stack en mobile: la pieza de social media tiene tipografía fina y a media columna no se lee.
        mobileLayout: "stack",
        images: [
          { publicId: "1_ad1dsz", alt: "Campaña Yokoo Studio The Making: buzo navy con el logo dorado en el set de producción" },
          { publicId: "7_u1ra22", alt: "Sistema de Instagram Stories de la colección Yokoo Basics" },
        ],
      },
      {
        type: "stats",
        title: "Resultados Instagram 2024",
        items: [
          { value: 2.1, decimals: 1, suffix: " M", label: "visualizaciones" },
          { value: 613, suffix: " mil", label: "cuentas alcanzadas" },
          { value: 109, suffix: " mil", label: "visitas al perfil" },
          { value: 27.6, decimals: 1, suffix: " mil", label: "clics al sitio web" },
        ],
        highlight: { value: 70, prefix: "+", suffix: "%", label: "de crecimiento respecto al año anterior" },
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        // La foto es más alta que el afiche: se achica hasta igualarlo, sin recortar ninguna.
        matchHeight: true,
        images: [
          {
            publicId: "_DSC0060_oxxois",
            alt: "Modelo sentado en el piso con remera negra Yokoo y jean claro",
            ratio: 2160 / 3261,
          },
          {
            publicId: "5_be6hok",
            alt: "Afiche de la activación con Loli Café por el día de la primavera",
            ratio: 3024 / 4032,
          },
        ],
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "8_am0iqp", alt: "Modelo con buzo blanco Yokoo y raqueta al hombro en una cancha de tenis" },
          { publicId: "9_j7ton6", alt: "Retrato en blanco y negro con remera Yokoo entre tambores metálicos" },
        ],
      },
      {
        type: "testimonial",
        quote:
          "Craft es un equipo de creativas increíbles. Responsables de hacer crecer nuestra marca de indumentaria con su gran dedicación y su conocimiento del mercado argentino. Son un equipo que está constantemente capacitándose y conoce las últimas tendencias dentro de las plataformas más importantes.",
        author: "Valentina",
        role: "Co Founder en Yokoo Studio",
      },
    ],
  },
  {
    slug: "nomade-cafe",
    client: "Nómade Café",
    title: "Implementación de marca",
    category: "Brand Partnership",
    year: "2025",
    summary:
      "Acompañamos el lanzamiento de una nueva etapa para Nómade Café, desarrollando una estrategia de comunicación y contenido que trasladó su rebranding a una experiencia de marca consistente.",
    scope: ["Estrategia de comunicación", "Dirección creativa", "Producción de contenido"],
    description:
      "Luego de su rebranding, Nómade necesitaba transformar su nueva identidad en una comunicación que conectara con las personas. Trabajamos junto al equipo de la marca para desarrollar una estrategia de contenido que diera continuidad al nuevo posicionamiento, llevando esa identidad al día a día a través de fotografía, video y una línea editorial coherente.",
    cover: { publicId: "1_m9fjpj", alt: "Vaso de café con leche sobre una mesa azul con el logo de Nómade" },
    blocks: [
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "1_m9fjpj", alt: "Vaso de café con leche sobre una mesa azul con el logo de Nómade" },
          { publicId: "4_g9ac1n", alt: "Cartel de neón Los nómades también descansan sobre el sillón del salón" },
        ],
      },
      {
        type: "imageText",
        // La foto manda el alto de la fila: entra completa y el texto se estira hasta igualarla.
        heightFrom: "image",
        image: { publicId: "2_j95hnl", alt: "Fachada del local en blanco y negro con el vinilo Take (me) Away en la ventana" },
        text: "Más que generar publicaciones, el desafío fue convertir una nueva identidad en una experiencia de marca reconocible en cada punto de contacto digital.",
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "3_wlvhhq", alt: "Sándwich de focaccia sostenido a contraluz" },
          { publicId: "5_iplaat", alt: "Vista cenital de dos sándwiches y un capuchino con latte art" },
        ],
      },
      {
        type: "stats",
        title: "Resultados primeros 3 meses",
        items: [
          { value: 474, prefix: "+", suffix: " mil", label: "visualizaciones orgánicas" },
          { value: 119, prefix: "+", suffix: " mil", label: "cuentas alcanzadas" },
          { value: 426, prefix: "+", suffix: "%", label: "visitas al perfil" },
          { value: 677, prefix: "+", suffix: "%", label: "clics en el enlace de la bio" },
        ],
      },
    ],
  },
  {
    slug: "usa-magazine",
    client: "USA Magazine",
    title: "Producción editorial de moda",
    category: "Brand Partnership",
    year: "2021",
    summary:
      "Desarrollamos una producción editorial publicada en USA Magazine (EE.UU) construyendo una narrativa visual donde la dirección de arte, la fotografía y el estilismo dialogan para crear una identidad estética propia.",
    scope: ["Dirección de arte", "Producción fotográfica", "Dirección creativa", "Color grading"],
    cover: { publicId: "1_fpqfnp", alt: "Retrato en blanco y negro de cuerpo entero frente a un edificio industrial" },
    blocks: [
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "1_fpqfnp", alt: "Retrato en blanco y negro de cuerpo entero frente a un edificio industrial" },
          { publicId: "2_y8s0iw", alt: "Primer plano de la campera de cuero amarilla contra el cielo" },
        ],
      },
      {
        // Díptico armado como doble página de revista: va a ancho completo.
        type: "image",
        image: { publicId: "3_anxmbl", alt: "Doble página con el look completo y un retrato sonriendo en blanco y negro" },
      },
      {
        type: "imageText",
        // La foto manda el alto de la fila: entra completa y el texto se estira hasta igualarla.
        heightFrom: "image",
        image: { publicId: "4_kj5mtb", alt: "Vista cenital recostado en una silla de playa con camisa floral" },
        text: "Desarrollada para una publicación internacional, esta producción explora la moda desde una mirada editorial, donde cada imagen responde a una narrativa visual. La dirección de arte, la composición y la estética de la serie fueron trabajadas para construir un relato con identidad propia, pensado para el lenguaje de una revista de moda.",
      },
    ],
  },
  {
    slug: "dart-haus",
    client: "Dart Haus",
    title: "Dirección de arte y producción",
    category: "Brand Partnership",
    year: "2023",
    summary:
      "Desarrollamos una producción editorial para comunicar el universo de Dart Haus, un concept store donde la curaduría y la experiencia del espacio son parte central de la marca.",
    scope: ["Dirección de arte", "Producción fotográfica", "Styling", "Curaduría visual"],
    cover: { publicId: "2_oth8vi", alt: "Bodegón cenital de bases y potes de maquillaje sobre una bandeja negra" },
    blocks: [
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "1_sotz3p", alt: "Retrato de perfil en blanco y negro con anillos de vidrio apoyados en el hombro" },
          { publicId: "2_oth8vi", alt: "Bodegón cenital de bases y potes de maquillaje sobre una bandeja negra" },
        ],
      },
      {
        type: "imageText",
        // La foto manda el alto de la fila: entra completa y el texto se estira hasta igualarla.
        heightFrom: "image",
        image: { publicId: "3_ojtukr", alt: "Vidriera del local en blanco y negro con una persona pasando desenfocada" },
        text: "Sus creadoras necesitaban que su comunicación transmitiera el valor de la curaduría y no solo de los productos que comercializan. El proyecto consistió en desarrollar una producción editorial capaz de reflejar la identidad del espacio, construir una narrativa visual coherente y comunicar la experiencia de la concept store en cada imagen.",
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "4_pdb9qy", alt: "Piezas de cerámica dibujadas a mano sobre un estante blanco" },
          { publicId: "5_kst9tw", alt: "Perchero con prendas celestes y blancas junto a un espejo de forma orgánica" },
        ],
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "6_jnlnex", alt: "Detalle de un choker de red con perlas sobre un blazer beige" },
          { publicId: "7_ives99", alt: "Vitrina de vidrio con aros y anillos de la curaduría de la tienda" },
        ],
      },
    ],
  },
  {
    slug: "adon-management",
    client: "Adon Management",
    title: "Producción editorial de moda",
    category: "Brand Partnership",
    year: "2022",
    summary:
      "Producción editorial realizada junto a Adon Management, explorando una narrativa visual donde la moda, la dirección de arte y la fotografía construyen una identidad estética propia.",
    scope: [
      "Dirección de arte",
      "Producción fotográfica",
      "Styling",
      "Dirección creativa",
      "Retoque",
    ],
    description:
      "Realizada en colaboración con Adon, esta producción nace de la búsqueda por desarrollar un lenguaje visual de carácter editorial. Más que retratar modelos, el objetivo fue construir una serie de imágenes con una identidad estética definida, donde cada decisión de arte, estilismo y composición aportara a una narrativa común.",
    cover: { publicId: "1_ttirsu", alt: "Retrato en blanco y negro con tapado de piel y encaje en la calle" },
    blocks: [
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "1_ttirsu", alt: "Retrato en blanco y negro con tapado de piel y encaje en la calle" },
          { publicId: "2_wijnpb", alt: "Detalle de las hojas de un agave a contraluz" },
        ],
      },
      {
        type: "imagePair",
        mobileLayout: "pair",
        images: [
          { publicId: "3_ust9rh", alt: "Retrato de cuerpo entero sentada en un banco de plaza con campera de cuero" },
          { publicId: "4_o5zgzh", alt: "Primer plano apoyada en la mano, con collar de perlas y campera de cuero negra" },
        ],
      },
    ],
  },
  {
    slug: "etiqueta-emily-dickinson",
    client: "Concepto y Diseño de Packaging",
    title: "Diseño de etiqueta inspirada en Emily Dickinson",
    category: "Brand Partnership",
    year: "2025",
    summary:
      "Desarrollamos un sistema visual para una etiqueta de vino que transforma una obra literaria en una experiencia de marca, combinando narrativa, ilustración y diseño de arte.",
    scope: ["Diseño de packaging", "Dirección de arte", "Conceptualización", "Ilustración"],
    description:
      "Este proyecto nace como un homenaje a Emily Dickinson y a uno de sus poemas más emblemáticos: Hope is the thing with feathers. Más que diseñar una etiqueta, el objetivo fue transformar una obra literaria en una experiencia visual capaz de transmitir la sensibilidad de la autora y convertir la botella en un objeto narrativo.",
    // La portada tiene que mostrar el trabajo de diseño, no el contexto: va la botella.
    cover: { publicId: "Etiqueta_Vino_2_obsspl", alt: "Botella Emily en balde de hielo junto a limones y quesos" },
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
        // Queda en su alto natural para igualar a los dos libros del bloque siguiente.
        heightFrom: "image",
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
