
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/home/HeroSection";
import { UserPortalsSection } from "@/components/home/UserPortalsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <UserPortalsSection />
      <FeaturesSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
