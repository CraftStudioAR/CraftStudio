import Marquee from "../components/Marquee";
import HeroSection from "../components/home/HeroSection";
import FoundersSection from "../components/home/FoundersSection";
import WorkSection from "../components/home/WorkSection";
import ServicesSection from "../components/home/ServicesSection";
import StudioSection from "../components/home/StudioSection";

export default function Home() {
  return (
    <div className="bg-cream">
      {/* 1. Hero Section (Pinned, shrinks as rectangle) */}
      <HeroSection />

      {/* 2. Founders & Intro Section */}
      <FoundersSection />

      {/* 3. Brands Marquee (Clean, faded edges) */}
      <div className="relative z-20 w-full bg-cream pt-4 pb-12 md:pt-8 md:pb-20 border-b border-ink/5">
        <div className="mx-auto w-full max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <Marquee items={["Logo Marca", "Logo Marca", "Logo Marca", "Logo Marca", "Logo Marca", "Logo Marca", "Logo Marca"]} className="text-ink" />
        </div>
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
