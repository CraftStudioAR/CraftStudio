import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  jsonLd?: object | object[];
}

const DEFAULT_DOMAIN = "https://craftstudio.com.ar";
const DEFAULT_TITLE = "Craft Studio — Estudio de Identidad y Comunicación Estratégica";
const DEFAULT_DESCRIPTION =
  "Craft Studio es un estudio de identidad visual, branding y comunicación estratégica en Buenos Aires. Pensamos el problema y diseñamos la solución para marcas en crecimiento.";
const DEFAULT_KEYWORDS =
  "Craft Studio, branding, identidad visual, comunicación estratégica, estrategia de marca, dirección de arte, growth marketing, estudio de diseño Buenos Aires, rebranding";
const DEFAULT_OG_IMAGE = "https://res.cloudinary.com/kre7pjni/image/upload/v1788450125/nosotras_j5jzzu.webp";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
}: SEOProps) {
  const location = useLocation();
  const currentUrl = canonical || `${DEFAULT_DOMAIN}${location.pathname}`;
  const fullTitle = title ? `${title} | Craft Studio` : DEFAULT_TITLE;

  useEffect(() => {
    // 1. Document Title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (selector: string, keyName: string, keyValue: string, contentName: string, contentValue: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(keyName, keyValue);
        document.head.appendChild(element);
      }
      element.setAttribute(contentName, contentValue);
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard Meta Tags
    setMetaTag('meta[name="description"]', 'name', 'description', 'content', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', 'content', keywords);
    setMetaTag('meta[name="robots"]', 'name', 'robots', 'content', 'index, follow');
    setMetaTag('meta[name="author"]', 'name', 'author', 'content', 'Craft Studio');

    // OpenGraph Tags
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'content', 'Craft Studio');
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'content', ogType);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', 'content', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', 'content', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', 'content', currentUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', 'content', ogImage);
    setMetaTag('meta[property="og:image:secure_url"]', 'property', 'og:image:secure_url', 'content', ogImage);
    setMetaTag('meta[property="og:image:type"]', 'property', 'og:image:type', 'content', 'image/webp');
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', 'content', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', 'content', '630');
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'content', 'es_AR');

    // Twitter Card Tags
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', 'content', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', 'content', ogImage);

    // Canonical Link
    setLinkTag('canonical', currentUrl);

    // JSON-LD Structured Data
    const scriptId = 'json-ld-seo';
    let scriptElement = document.head.querySelector<HTMLScriptElement>(`script#${scriptId}`);
    if (jsonLd) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(jsonLd);
    } else if (scriptElement) {
      scriptElement.remove();
    }
  }, [fullTitle, description, keywords, currentUrl, ogImage, ogType, jsonLd]);

  return null;
}
