
import { MainLayout } from "@/components/layout/main-layout";

// Sections
import { HeroSection } from "@/components/home/reworked/HeroSection";
import { FeaturesSection } from "@/components/home/reworked/FeaturesSection";
import { UserPortalsSection } from "@/components/home/reworked/UserPortalsSection";
import { CTASection } from "@/components/home/reworked/CTASection";

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturesSection />
      <UserPortalsSection />
      <CTASection />
    </MainLayout>
  );
}
