"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ORIGIN } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

const STAR_SIZES = {
  sm: { radius: 3, glow: 8, hoverRadius: 6 },
  md: { radius: 4.5, glow: 14, hoverRadius: 8 },
  lg: { radius: 6, glow: 20, hoverRadius: 10 },
  xl: { radius: 8, glow: 28, hoverRadius: 14 },
};

function ProjectStar({ project, index, containerBounds }) {
  const [hovered, setHovered] = useState(false);
  const starConfig = STAR_SIZES[project.size] || STAR_SIZES.sm;

  return (
    <div
      className="absolute"
      style={{
        left: `${project.position.x}%`,
        top: `${project.position.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: hovered ? 30 : 10,
      }}
    >
      {/* Star core + glow */}
      <motion.button
        type="button"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative cursor-pointer group focus:outline-none"
        animate={{
          scale: hovered ? 1.8 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-label={`View project: ${project.title}`}
      >
        {/* Outer glow */}
        <div
          className="absolute rounded-full animate-star-pulse"
          style={{
            width: starConfig.glow * 2,
            height: starConfig.glow * 2,
            left: -(starConfig.glow - starConfig.radius),
            top: -(starConfig.glow - starConfig.radius),
            background: `radial-gradient(circle, rgba(96,165,250,0.15) 0%, transparent 70%)`,
            animationDelay: `${index * 0.7}s`,
            animationDuration: `${3 + index * 0.5}s`,
          }}
        />
        {/* Inner star */}
        <div
          className="rounded-full"
          style={{
            width: starConfig.radius * 2,
            height: starConfig.radius * 2,
            background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(96,165,250,0.6) 60%, transparent 100%)`,
            boxShadow: `0 0 ${starConfig.glow}px rgba(96,165,250,0.3)`,
          }}
        />
      </motion.button>

      {/* Hover card */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 pointer-events-none"
            style={{ zIndex: 50 }}
          >
            <div className="rounded-xl border border-border-subtle/60 bg-void/90 backdrop-blur-xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
              {/* Project title */}
              <h4 className="font-display text-sm font-semibold text-light mb-2">
                {project.title}
              </h4>
              {/* Summary */}
              <p className="text-xs text-muted/80 leading-relaxed mb-3">
                {project.summary}
              </p>
              {/* Tech */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="inline-block rounded-full border border-star/20 bg-star/5 px-2 py-0.5 font-mono text-[10px] text-star/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* Connector line from star to card */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-star/30 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OriginSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const starFieldRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;
    const stars = starFieldRef.current;

    if (!section || !content || !stars) return;

    // Fade in the year + narrative on scroll
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

    // Stars fade in staggered
    const starElements = stars.querySelectorAll("[data-star]");
    gsap.fromTo(
      starElements,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(2)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "top 10%",
          scrub: 1,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="relative section-padding overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="section-container">
        <SectionLabel number="02" title="ORIGIN" />

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
            <div className="h-px w-8 bg-star/40" />
            <span className="font-mono text-xl font-semibold tracking-[0.2em] text-star">
              {ORIGIN.year}
            </span>
            <div className="h-px w-8 bg-star/40" />
          </motion.div>

          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight leading-tight">
            The First
            <span className="text-star"> Spark</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            {ORIGIN.narrative}
          </p>
        </div>

        {/* Star field */}
        <div
          ref={starFieldRef}
          className="relative w-full"
          style={{ height: "clamp(400px, 55vh, 600px)" }}
        >
          {/* Ambient background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(96,165,250,0.02) 0%, transparent 70%)",
            }}
          />

          {/* Sparse decorative dots (ambient stars) */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`ambient-${i}`}
              className="absolute rounded-full animate-star-twinkle"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: `rgba(255,255,255,${0.1 + Math.random() * 0.2})`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
              aria-hidden="true"
            />
          ))}

          {/* Project stars */}
          {ORIGIN.projects.map((project, i) => (
            <div key={project.id} data-star>
              <ProjectStar project={project} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
