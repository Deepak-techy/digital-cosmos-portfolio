"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import { ACHIEVEMENTS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

function AnimatedCounter({ target, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const num = parseInt(target.replace(/\D/g, ""), 10) || 0;
          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * num));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target, duration]);

  const prefix = target.includes("+") ? "" : "";
  const displaySuffix = target.includes("+") ? "+" : target.includes("x") ? "x" : suffix;

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {displaySuffix}
    </span>
  );
}

function AchievementCard({ achievement, index }) {
  const IconComponent = LucideIcons[achievement.icon] || LucideIcons.Star;

  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl border border-border-subtle bg-nebula/30 p-8 transition-all duration-500 hover:border-aurora/25 hover:bg-nebula/50 backdrop-blur-sm md:p-10"
    >
      {/* Glow dot */}
      <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-12 bg-gradient-to-r from-transparent via-aurora/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Icon */}
      <div className="mb-6 inline-flex items-center justify-center rounded-xl border border-aurora/20 bg-aurora/5 p-3 text-aurora transition-all duration-300 group-hover:border-aurora/40 group-hover:shadow-[0_0_20px_rgba(167,139,250,0.15)]">
        <IconComponent className="h-6 w-6" />
      </div>

      {/* Metric */}
      <div className="font-display text-4xl font-bold text-light mb-3 glow-text-aurora md:text-5xl">
        <AnimatedCounter target={achievement.metric} />
      </div>

      {/* Title */}
      <h3 className="font-display text-lg font-semibold text-light/90 mb-2">
        {achievement.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed">
        {achievement.description}
      </p>
    </motion.div>
  );
}

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="relative section-padding overflow-hidden"
    >
      <GradientBlob
        color="aurora"
        size="lg"
        className="top-[30%] left-1/2 -translate-x-1/2 opacity-10"
      />

      <div className="section-container">
        <SectionLabel number="04" title="CONSTELLATIONS" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight">
            Mapping the
            <span className="text-aurora"> Constellations</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            Achievements are the constellations of my journey — patterns formed
            by milestones that reveal the shape of progress.
          </p>
        </motion.div>

        {/* SVG Constellation Lines (desktop only) */}
        <div className="relative">
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            aria-hidden="true"
          >
            <motion.line
              x1="25%" y1="30%" x2="75%" y2="30%"
              stroke="rgba(167,139,250,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.line
              x1="25%" y1="70%" x2="75%" y2="70%"
              stroke="rgba(167,139,250,0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.line
              x1="50%" y1="10%" x2="50%" y2="90%"
              stroke="rgba(96,165,250,0.06)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1, ease: [0.76, 0, 0.24, 1] }}
            />
          </svg>

          {/* Achievement Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {ACHIEVEMENTS.map((achievement, i) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                index={i}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
