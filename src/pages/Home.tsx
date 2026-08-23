import { useState, useEffect } from "react";
import Marquee from "../components/Marquee";
import HeroSection from "../components/home/HeroSection";
import FoundersSection from "../components/home/FoundersSection";
import WorkSection from "../components/home/WorkSection";
import ServicesSection from "../components/home/ServicesSection";
import LabSection from "../components/home/LabSection";
import StudioSection from "../components/home/StudioSection";
import { getBrandLogos } from "../lib/supabaseClient";

import SEO from "../components/SEO";
import { organizationSchema, websiteSchema } from "../utils/seoSchemas";

export default function Home() {
  const [logos, setLogos] = useState<any[]>([]);

  useEffect(() => {
    const loadLogos = async () => {
      const data = await getBrandLogos();
      setLogos(data);
    };
    loadLogos();
  }, []);

  return (
    <div data-theme="light" className="bg-cream">
      <SEO
        title="Estudio de Identidad y Comunicación Estratégica"
        description="Craft Studio es un estudio de identidad visual, branding y comunicación estratégica en Buenos Aires. Pensamos el problema, diseñamos la solución."
        jsonLd={[organizationSchema, websiteSchema]}
      />
      {/* 1. Hero Section (Pinned, shrinks as rectangle) */}
      <HeroSection />

      {/* 2. Founders & Intro Section */}
      <FoundersSection />

      {/* 3. Work Gallery Section (Horizontal Scroll) */}
      <WorkSection />

      {/* 4. Services Section */}
      <ServicesSection />

      {/* 5. Brands Marquee (Clean, faded edges) */}
      <div className="relative z-20 w-full bg-cream pt-2 pb-12 md:pt-4 md:pb-20 border-b border-ink/5">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10 mb-8 md:mb-12 text-center">
          <p className="text-xs md:text-sm tracking-widest text-red uppercase font-semibold flex items-center justify-center gap-3">
            <span className="w-6 h-[1px] bg-red/40" /> Algunas marcas que confiaron en nosotros <span className="w-6 h-[1px] bg-red/40" />
          </p>
        </div>
        <div className="mx-auto w-full max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {logos.length > 0 && (
            <Marquee items={logos} className="text-ink" />
          )}
        </div>
      </div>

      {/* 7. Craft Lab (Editorial) */}
      <LabSection />

      {/* 8. Cierre (Final CTA) */}
      <StudioSection />
    </div>
  );
}
