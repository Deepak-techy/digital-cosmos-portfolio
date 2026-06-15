"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GROWTH } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

const STAR_SIZES = {
  sm: { radius: 4, glow: 12, ring: 20 },
  md: { radius: 6, glow: 18, ring: 28 },
  lg: { radius: 8, glow: 24, ring: 36 },
  xl: { radius: 11, glow: 34, ring: 48 },
};

// Pre-computed ambient dust to avoid hydration mismatch and Math.random() in render
const AMBIENT_DUST = [
  { width: 2.1, height: 2.1, left: "7%", top: "85%", opacity: 0.18, delay: "1.2s", duration: "3.4s" },
  { width: 1.5, height: 1.5, left: "82%", top: "14%", opacity: 0.25, delay: "0.4s", duration: "2.1s" },
  { width: 2.8, height: 2.8, left: "24%", top: "73%", opacity: 0.12, delay: "2.7s", duration: "4.5s" },
  { width: 1.2, height: 1.2, left: "67%", top: "25%", opacity: 0.29, delay: "3.1s", duration: "2.8s" },
  { width: 2.0, height: 2.0, left: "91%", top: "54%", opacity: 0.15, delay: "0.8s", duration: "3.9s" },
  { width: 1.7, height: 1.7, left: "15%", top: "62%", opacity: 0.22, delay: "1.9s", duration: "4.2s" },
  { width: 2.5, height: 2.5, left: "38%", top: "41%", opacity: 0.11, delay: "2.3s", duration: "3.1s" },
  { width: 1.4, height: 1.4, left: "55%", top: "91%", opacity: 0.27, delay: "0.2s", duration: "2.5s" },
  { width: 2.3, height: 2.3, left: "3%", top: "21%", opacity: 0.14, delay: "3.5s", duration: "4.8s" },
  { width: 1.9, height: 1.9, left: "88%", top: "8%", opacity: 0.20, delay: "1.5s", duration: "3.7s" },
  { width: 2.6, height: 2.6, left: "49%", top: "63%", opacity: 0.13, delay: "2.9s", duration: "4.1s" },
  { width: 1.3, height: 1.3, left: "76%", top: "52%", opacity: 0.28, delay: "0.6s", duration: "2.3s" },
  { width: 2.2, height: 2.2, left: "33%", top: "12%", opacity: 0.16, delay: "1.7s", duration: "3.5s" },
  { width: 1.6, height: 1.6, left: "71%", top: "83%", opacity: 0.24, delay: "3.8s", duration: "2.9s" },
  { width: 2.7, height: 2.7, left: "44%", top: "79%", opacity: 0.10, delay: "2.1s", duration: "4.7s" },
  { width: 1.8, height: 1.8, left: "29%", top: "29%", opacity: 0.19, delay: "1.0s", duration: "3.2s" },
  { width: 2.4, height: 2.4, left: "61%", top: "48%", opacity: 0.21, delay: "0.7s", duration: "2.7s" },
  { width: 1.1, height: 1.1, left: "95%", top: "33%", opacity: 0.26, delay: "3.2s", duration: "2.4s" },
  { width: 2.9, height: 2.9, left: "10%", top: "50%", opacity: 0.14, delay: "2.5s", duration: "4.9s" },
  { width: 1.6, height: 1.6, left: "80%", top: "70%", opacity: 0.23, delay: "1.4s", duration: "3.0s" },
  { width: 2.0, height: 2.0, left: "51%", top: "28%", opacity: 0.17, delay: "0.5s", duration: "3.6s" },
  { width: 1.4, height: 1.4, left: "20%", top: "95%", opacity: 0.28, delay: "3.9s", duration: "2.0s" },
  { width: 2.5, height: 2.5, left: "68%", top: "76%", opacity: 0.12, delay: "2.2s", duration: "3.3s" },
  { width: 1.7, height: 1.7, left: "87%", top: "42%", opacity: 0.20, delay: "0.9s", duration: "2.2s" },
  { width: 2.3, height: 2.3, left: "42%", top: "15%", opacity: 0.15, delay: "3.3s", duration: "4.3s" },
  { width: 1.5, height: 1.5, left: "75%", top: "95%", opacity: 0.24, delay: "1.1s", duration: "2.6s" },
  { width: 2.8, height: 2.8, left: "12%", top: "10%", opacity: 0.11, delay: "2.8s", duration: "4.6s" },
  { width: 1.3, height: 1.3, left: "60%", top: "5%", opacity: 0.30, delay: "3.0s", duration: "2.2s" },
  { width: 2.1, height: 2.1, left: "94%", top: "90%", opacity: 0.16, delay: "0.3s", duration: "3.8s" },
  { width: 1.8, height: 1.8, left: "31%", top: "71%", opacity: 0.22, delay: "1.8s", duration: "4.0s" },
  { width: 2.6, height: 2.6, left: "48%", top: "47%", opacity: 0.13, delay: "2.4s", duration: "3.5s" },
  { width: 1.2, height: 1.2, left: "73%", top: "37%", opacity: 0.27, delay: "0.1s", duration: "2.5s" },
  { width: 2.4, height: 2.4, left: "27%", top: "3%", opacity: 0.14, delay: "3.6s", duration: "4.2s" },
  { width: 1.9, height: 1.9, left: "85%", top: "61%", opacity: 0.21, delay: "1.6s", duration: "3.9s" },
  { width: 2.7, height: 2.7, left: "53%", top: "82%", opacity: 0.10, delay: "2.0s", duration: "4.7s" },
];

const GrowthStar = memo(function GrowthStar({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const starConfig = STAR_SIZES[project.size] || STAR_SIZES.md;

  // Determine card position to avoid clipping edges
  const isLeftSide = project.position.x < 40;
  const isTopHalf = project.position.y < 45;

  return (
    <div
      className="absolute"
      style={{
        left: `${project.position.x}%`,
        top: `${project.position.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: hovered ? 40 : 10,
      }}
    >
      {/* Interactive star */}
      <motion.button
        type="button"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative cursor-pointer group focus:outline-none"
        animate={{
          scale: hovered ? 2 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-label={`View project: ${project.title}`}
      >
        {/* Orbit ring — only on larger stars */}
        {(project.size === "lg" || project.size === "xl") && (
          <div
            className="absolute rounded-full border animate-orbit"
            style={{
              width: starConfig.ring * 2,
              height: starConfig.ring * 2,
              left: -(starConfig.ring - starConfig.radius),
              top: -(starConfig.ring - starConfig.radius),
              borderColor: hovered
                ? "rgba(167,139,250,0.2)"
                : "rgba(96,165,250,0.08)",
              animationDuration: `${15 + index * 3}s`,
              transition: "border-color 0.5s ease",
            }}
          />
        )}

        {/* Outer glow — pulsing */}
        <div
          className="absolute rounded-full"
          style={{
            width: starConfig.glow * 2.5,
            height: starConfig.glow * 2.5,
            left: -(starConfig.glow * 1.25 - starConfig.radius),
            top: -(starConfig.glow * 1.25 - starConfig.radius),
            background: hovered
              ? `radial-gradient(circle, rgba(167,139,250,0.25) 0%, rgba(96,165,250,0.08) 50%, transparent 70%)`
              : `radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)`,
            transition: "background 0.5s ease",
            animation: `star-pulse ${3 + index * 0.4}s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`,
          }}
        />

        {/* Inner core */}
        <div
          className="rounded-full transition-all duration-500"
          style={{
            width: starConfig.radius * 2,
            height: starConfig.radius * 2,
            background: hovered
              ? `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(167,139,250,0.8) 40%, rgba(96,165,250,0.4) 70%, transparent 100%)`
              : `radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(96,165,250,0.5) 50%, transparent 100%)`,
            boxShadow: hovered
              ? `0 0 ${starConfig.glow * 1.5}px rgba(167,139,250,0.4), 0 0 ${starConfig.glow * 3}px rgba(96,165,250,0.15)`
              : `0 0 ${starConfig.glow}px rgba(96,165,250,0.25)`,
          }}
        />
      </motion.button>

      {/* Hover card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute pointer-events-none"
            style={{
              width: 280,
              zIndex: 50,
              // Position card intelligently based on star location
              ...(isTopHalf
                ? { top: "100%", marginTop: 16 }
                : { bottom: "100%", marginBottom: 16 }),
              ...(isLeftSide
                ? { left: "-20%", transform: "none" }
                : { right: "-20%", transform: "none" }),
            }}
          >
            <div className="rounded-xl border border-aurora/20 bg-void/92 backdrop-blur-xl p-6 shadow-[0_12px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(167,139,250,0.06)]">
              {/* Title */}
              <h4 className="font-display text-sm font-semibold text-light mb-2.5">
                {project.title}
              </h4>
              {/* Summary */}
              <p className="text-xs text-muted/80 leading-relaxed mb-4">
                {project.summary}
              </p>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-block rounded-full border border-aurora/20 bg-aurora/5 px-2.5 py-0.5 font-mono text-[10px] text-aurora/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* Connector */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-aurora/30 to-transparent"
              style={{
                ...(isTopHalf
                  ? { top: -16, height: 16 }
                  : { bottom: -16, height: 16 }),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

function ConstellationLines({ projects, constellations, revealed }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {constellations.map(([fromIdx, toIdx], i) => {
        const from = projects[fromIdx];
        const to = projects[toIdx];
        if (!from || !to) return null;

        return (
          <motion.line
            key={`line-${i}`}
            x1={`${from.position.x}%`}
            y1={`${from.position.y}%`}
            x2={`${to.position.x}%`}
            y2={`${to.position.y}%`}
            stroke="rgba(167,139,250,0.12)"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              revealed
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        );
      })}
    </svg>
  );
}

export default function GrowthSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const starFieldRef = useRef(null);
  const [constellationsRevealed, setConstellationsRevealed] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;
    const stars = starFieldRef.current;

    if (!section || !content || !stars) return;

    const ctx = gsap.context(() => {
      // Fade in heading
      gsap.fromTo(
        content,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Stars entrance with stagger
      const starElements = stars.querySelectorAll("[data-star]");
      gsap.fromTo(
        starElements,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.5)",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            end: "top 15%",
            scrub: 1,
          },
        }
      );

      // Trigger constellation lines
      ScrollTrigger.create({
        trigger: section,
        start: "top 30%",
        onEnter: () => setConstellationsRevealed(true),
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="growth"
      className="relative section-padding overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Ambient background — richer than Origin */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(167,139,250,0.03) 0%, rgba(96,165,250,0.015) 40%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <SectionLabel number="03" title="GROWTH" />

        {/* Year & Narrative */}
        <div ref={contentRef} className="mb-20 max-w-2xl">
          {/* Year badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-3"
          >
            <div className="h-px w-8 bg-aurora/40" />
            <span className="font-mono text-xl font-semibold tracking-[0.2em] bg-gradient-to-r from-star to-aurora bg-clip-text text-transparent">
              {GROWTH.year}
            </span>
            <div className="h-px w-8 bg-aurora/40" />
          </motion.div>

          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight leading-tight">
            Expanding the
            <span className="bg-gradient-to-r from-star to-aurora bg-clip-text text-transparent">
              {" "}Galaxy
            </span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            {GROWTH.narrative}
          </p>
        </div>

        {/* Star field — richer and larger */}
        <div
          ref={starFieldRef}
          className="relative w-full"
          style={{ height: "clamp(450px, 60vh, 650px)" }}
        >
          {/* Richer ambient dust */}
          {AMBIENT_DUST.map((dust, i) => (
            <div
              key={`dust-${i}`}
              className="absolute rounded-full animate-star-twinkle"
              style={{
                width: dust.width,
                height: dust.height,
                left: dust.left,
                top: dust.top,
                backgroundColor: `rgba(255,255,255,${dust.opacity})`,
                animationDelay: dust.delay,
                animationDuration: dust.duration,
              }}
              aria-hidden="true"
            />
          ))}

          {/* Faint nebula clouds */}
          <div
            className="absolute pointer-events-none rounded-full blur-[80px] animate-gradient-drift"
            style={{
              width: 300,
              height: 200,
              left: "20%",
              top: "30%",
              background:
                "radial-gradient(ellipse, rgba(167,139,250,0.04) 0%, transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute pointer-events-none rounded-full blur-[60px] animate-gradient-drift"
            style={{
              width: 200,
              height: 150,
              right: "15%",
              bottom: "20%",
              background:
                "radial-gradient(ellipse, rgba(96,165,250,0.03) 0%, transparent 70%)",
              animationDelay: "5s",
            }}
            aria-hidden="true"
          />

          {/* Constellation lines */}
          <ConstellationLines
            projects={GROWTH.projects}
            constellations={GROWTH.constellations}
            revealed={constellationsRevealed}
          />

          {/* Project stars */}
          {GROWTH.projects.map((project, i) => (
            <div key={project.id} data-star>
              <GrowthStar project={project} index={i} />
            </div>
          ))}
        </div>

        {/* Transition narrative */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 text-center max-w-xl mx-auto"
        >
          <p className="text-muted/60 text-sm italic leading-relaxed">
            The sparse universe of early experiments evolved into an
            interconnected galaxy of systems — each project building upon the
            last, each challenge sharpening the vision.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
