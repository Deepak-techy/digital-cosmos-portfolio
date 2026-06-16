"use client";

import dynamic from "next/dynamic";
import ScrollAndAnimationProvider from "@/components/providers/ScrollAndAnimationProvider";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";

// Dynamically import StarField (heavy canvas) — no SSR
const StarField = dynamic(() => import("@/components/ui/StarField"), {
  ssr: false,
});

// Dynamically import below-fold sections for bundle size code splitting
const OriginSection = dynamic(() => import("@/components/sections/OriginSection"), { ssr: false });
const GrowthSection = dynamic(() => import("@/components/sections/GrowthSection"), { ssr: false });
const EduOneSection = dynamic(() => import("@/components/sections/EduOneSection"), { ssr: false });
const EngineerSection = dynamic(() => import("@/components/sections/EngineerSection"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection"), { ssr: false });
const AchievementsSection = dynamic(() => import("@/components/sections/AchievementsSection"), { ssr: false });
const TechGalaxySection = dynamic(() => import("@/components/sections/TechGalaxySection"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/sections/ExperienceSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), { ssr: false });
const NextDestinationSection = dynamic(() => import("@/components/sections/NextDestinationSection"), { ssr: false });

export default function Home() {
  return (
    <ScrollAndAnimationProvider>
      <StarField />
      <Navbar />
      <ScrollProgress />

      <main>
        {/* Act I — Landing */}
        <HeroSection />

        {/* Act II — Journey Timeline */}
        <OriginSection />
        <GrowthSection />

        {/* Act III — Flagship */}
        <EduOneSection />

        {/* Act IV — Convergence */}
        <EngineerSection />

        {/* Act V — Present Day */}
        <AboutSection />
        <ProjectsSection />
        <AchievementsSection />
        <TechGalaxySection />
        <ExperienceSection />
        <TestimonialsSection />
        <NextDestinationSection />
      </main>

      <Footer />
    </ScrollAndAnimationProvider>
  );
}

