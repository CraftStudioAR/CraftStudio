export const BASE_URL = "https://craftstudio.com.ar";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${BASE_URL}/#organization`,
  "name": "Craft Studio",
  "alternateName": "Craft Studio Argentina",
  "url": BASE_URL,
  "logo": "https://res.cloudinary.com/kre7pjni/image/upload/v1788450125/nosotras_j5jzzu.webp",
  "image": "https://res.cloudinary.com/kre7pjni/image/upload/v1788450125/nosotras_j5jzzu.webp",
  "description": "Estudio de identidad visual, branding y comunicación estratégica en Buenos Aires, Argentina.",
  "email": "hola@craftstudio.com.ar",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Buenos Aires",
    "addressCountry": "AR"
  },
  "areaServed": ["Argentina", "Latinoamérica", "Global"],
  "knowsAbout": [
    "Branding",
    "Identidad Visual",
    "Comunicación Estratégica",
    "Growth Marketing",
    "Dirección de Arte",
    "Diseño de Packaging",
    "Desarrollo Web"
  ],
  "sameAs": [
    "https://instagram.com/craftstudio.ar"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "url": BASE_URL,
  "name": "Craft Studio",
  "description": "Estudio de identidad visual y comunicación estratégica.",
  "publisher": {
    "@id": `${BASE_URL}/#organization`
  },
  "inLanguage": "es-AR"
};

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${BASE_URL}${item.url}`
    }))
  };
}

export function buildProjectSchema(project: {
  title?: string;
  client: string;
  category: string;
  summary: string;
  year: string;
  slug: string;
  cover?: { publicId: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${BASE_URL}/trabajos/${project.slug}/#creativework`,
    "name": `${project.title ?? project.client} — ${project.client}`,
    "headline": project.title ?? project.client,
    "description": project.summary,
    "creator": {
      "@id": `${BASE_URL}/#organization`
    },
    "genre": project.category,
    "dateCreated": project.year,
    "url": `${BASE_URL}/trabajos/${project.slug}`,
    "mainEntityOfPage": `${BASE_URL}/trabajos/${project.slug}`
  };
}

export function buildArticleSchema(article: {
  title: string;
  desc: string;
  slug: string;
  category: string;
  date: string;
  content: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${BASE_URL}/craft-lab/${article.slug}/#article`,
    "headline": article.title,
    "description": article.desc,
    "articleBody": article.content,
    "articleSection": article.category,
    "author": {
      "@id": `${BASE_URL}/#organization`
    },
    "publisher": {
      "@id": `${BASE_URL}/#organization`
    },
    "mainEntityOfPage": `${BASE_URL}/craft-lab/${article.slug}`,
    "inLanguage": "es-AR"
  };
}
