"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import { ABOUT } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function AboutSection() {
  return (
    <section id="about" className="relative section-padding overflow-hidden">
      <GradientBlob
        color="aurora"
        size="md"
        className="top-[10%] -right-[200px] opacity-15"
      />

      <div className="section-container">
        <SectionLabel number="02" title="GENESIS" />

        <div className="grid gap-16 lg:grid-cols-[1fr,1.2fr] lg:gap-24 items-start">
          {/* Left — Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-[400px] mx-auto lg:mx-0">
              {/* Abstract avatar frame */}
              <div className="absolute inset-0 rounded-3xl border border-border-subtle bg-gradient-to-br from-nebula to-void" />
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                {/* Orbital rings as decorative element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-orbit" style={{ animationDuration: "25s" }}>
                    <div className="h-[250px] w-[250px] rounded-full border border-star/10" />
                  </div>
                  <div
                    className="absolute animate-orbit"
                    style={{ animationDuration: "35s", animationDirection: "reverse" }}
                  >
                    <div className="h-[180px] w-[180px] rounded-full border border-aurora/10" />
                  </div>
                  <div className="absolute animate-orbit" style={{ animationDuration: "18s" }}>
                    <div className="h-[320px] w-[320px] rounded-full border border-star/5" />
                  </div>
                </div>
                {/* Central glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-star/20 blur-[40px] animate-star-pulse" />
                  <div className="absolute h-3 w-3 rounded-full bg-star shadow-[0_0_20px_rgba(96,165,250,0.6)]" />
                </div>
              </div>
              {/* Corner accents */}
              <div className="absolute -top-px -left-px h-8 w-8 border-t border-l border-star/30 rounded-tl-3xl" />
              <div className="absolute -bottom-px -right-px h-8 w-8 border-b border-r border-star/30 rounded-br-3xl" />
            </div>
          </motion.div>

          {/* Right — Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-7"
          >
            {ABOUT.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="text-lg leading-relaxed text-muted md:text-xl md:leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Pull Quote */}
            <motion.blockquote
              variants={fadeUp}
              className="relative mt-12 pl-8 border-l-2 border-star/30"
            >
              <Quote className="absolute -left-3 -top-2 h-6 w-6 text-star/30" />
              <p className="text-xl font-display font-medium leading-relaxed text-light/90 italic md:text-2xl">
                {ABOUT.quote}
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
