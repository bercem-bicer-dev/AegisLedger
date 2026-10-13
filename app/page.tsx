import { LandingLayout } from '@/components/landing-layout';
import { HeroSection } from '@/components/landing/hero';
import { StatsSection } from '@/components/landing/stats';
import { FeaturesSection } from '@/components/landing/features';
import { HowItWorksSection } from '@/components/landing/how-it-works';
import { CTASection } from '@/components/landing/cta';

export default function Home() {
  return (
    <LandingLayout>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </LandingLayout>
  );
}
