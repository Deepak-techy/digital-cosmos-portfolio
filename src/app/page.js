"use client";

import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import AnimationProvider from "@/components/providers/AnimationProvider";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import OriginSection from "@/components/sections/OriginSection";
import GrowthSection from "@/components/sections/GrowthSection";
import EduOneSection from "@/components/sections/EduOneSection";
import EngineerSection from "@/components/sections/EngineerSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import TechGalaxySection from "@/components/sections/TechGalaxySection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

// Dynamically import StarField (heavy canvas) — no SSR
const StarField = dynamic(() => import("@/components/ui/StarField"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScrollProvider>
      <AnimationProvider>
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
          <ContactSection />
        </main>

        <Footer />
      </AnimationProvider>
    </SmoothScrollProvider>
  );
}
