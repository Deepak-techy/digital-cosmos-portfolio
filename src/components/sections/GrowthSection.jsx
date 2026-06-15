"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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

function GrowthStar({ project, index }) {
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
}

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
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
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={`dust-${i}`}
              className="absolute rounded-full animate-star-twinkle"
              style={{
                width: Math.random() * 2.5 + 0.5,
                height: Math.random() * 2.5 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(255,255,255,${0.08 + Math.random() * 0.2})`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${1.5 + Math.random() * 3}s`,
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
