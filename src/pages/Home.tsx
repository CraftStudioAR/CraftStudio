import Marquee from "../components/Marquee";
import HeroSection from "../components/home/HeroSection";
import ManifestoSection from "../components/home/ManifestoSection";
import WorkSection from "../components/home/WorkSection";
import ServicesSection from "../components/home/ServicesSection";
import StudioSection from "../components/home/StudioSection";
import { values } from "../content/brand";

export default function Home() {
  return (
    <div className="bg-cream">
      {/* 1. Hero Section (Pinned, shrinks as rectangle) */}
      <HeroSection />

      {/* 2. Manifesto Section (Slides over Hero) */}
      <ManifestoSection />

      {/* 3. Marquee Divider */}
      <div className="border-y border-ink/10 bg-cream py-8 text-ink">
        <Marquee items={values.map((v) => v.title)} />
      </div>

      {/* 4. Work Gallery Section (Horizontal Scroll) */}
      <WorkSection />

      {/* 5. Services Section */}
      <ServicesSection />

      {/* 6. Studio & Values Section */}
      <StudioSection />
    </div>
  );
}
