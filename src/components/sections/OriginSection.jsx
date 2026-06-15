"use client";

import { useState, useRef, useEffect, memo } from "react";
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

// Pre-computed ambient stars to avoid hydration mismatch and Math.random() in render
const AMBIENT_STARS = [
  { width: 2.1, height: 2.1, left: "12%", top: "45%", opacity: 0.18, delay: "1.2s", duration: "3.4s" },
  { width: 1.5, height: 1.5, left: "78%", top: "23%", opacity: 0.25, delay: "0.4s", duration: "2.1s" },
  { width: 2.8, height: 2.8, left: "34%", top: "82%", opacity: 0.12, delay: "2.7s", duration: "4.5s" },
  { width: 1.2, height: 1.2, left: "56%", top: "15%", opacity: 0.29, delay: "3.1s", duration: "2.8s" },
  { width: 2.0, height: 2.0, left: "89%", top: "67%", opacity: 0.15, delay: "0.8s", duration: "3.9s" },
  { width: 1.7, height: 1.7, left: "22%", top: "71%", opacity: 0.22, delay: "1.9s", duration: "4.2s" },
  { width: 2.5, height: 2.5, left: "47%", top: "39%", opacity: 0.11, delay: "2.3s", duration: "3.1s" },
  { width: 1.4, height: 1.4, left: "63%", top: "88%", opacity: 0.27, delay: "0.2s", duration: "2.5s" },
  { width: 2.3, height: 2.3, left: "5%", top: "19%", opacity: 0.14, delay: "3.5s", duration: "4.8s" },
  { width: 1.9, height: 1.9, left: "93%", top: "11%", opacity: 0.20, delay: "1.5s", duration: "3.7s" },
  { width: 2.6, height: 2.6, left: "41%", top: "58%", opacity: 0.13, delay: "2.9s", duration: "4.1s" },
  { width: 1.3, height: 1.3, left: "71%", top: "61%", opacity: 0.28, delay: "0.6s", duration: "2.3s" },
  { width: 2.2, height: 2.2, left: "28%", top: "31%", opacity: 0.16, delay: "1.7s", duration: "3.5s" },
  { width: 1.6, height: 1.6, left: "84%", top: "79%", opacity: 0.24, delay: "3.8s", duration: "2.9s" },
  { width: 2.7, height: 2.7, left: "50%", top: "92%", opacity: 0.10, delay: "2.1s", duration: "4.7s" },
];

const ProjectStar = memo(function ProjectStar({ project, index, containerBounds }) {
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
});

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

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => {
      ctx.revert();
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
          {AMBIENT_STARS.map((star, i) => (
            <div
              key={`ambient-${i}`}
              className="absolute rounded-full animate-star-twinkle"
              style={{
                width: star.width,
                height: star.height,
                left: star.left,
                top: star.top,
                backgroundColor: `rgba(255,255,255,${star.opacity})`,
                animationDelay: star.delay,
                animationDuration: star.duration,
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
