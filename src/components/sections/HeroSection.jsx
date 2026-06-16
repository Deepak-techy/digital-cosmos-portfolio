"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PERSONAL } from "@/lib/constants";
import { useSectionSound } from "@/hooks/useSectionSound";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Cinematic spacecraft awakening sound
  useSectionSound("awaken", sectionRef, { threshold: 0.1 });

  // Framer Motion scroll-linked transforms for the content container
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text opacity: fully visible at 0%, fades by 30% scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  // Text Y translate: subtle drift upward as it fades
  const textY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  // Background scale: starts at 1, slowly zooms outward
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  // Vignette opacity: darkens the edges as cosmos expands
  const vignetteOpacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 0.6]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll cue: gentle bounce, fades out on scroll
      const cue = scrollCueRef.current;
      if (cue) {
        gsap.to(cue, {
          opacity: 0,
          y: -20,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "5% top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Split the tagline by newline for separate lines
  const taglineLines = PERSONAL.tagline.split("\n");

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* Sticky viewport container — stays visible as user scrolls through 300vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background zoom layer */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: bgScale }}
        >
          {/* Radial gradient: subtle warmth at center, void at edges */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(96,165,250,0.03) 0%, transparent 70%)",
            }}
          />
        </motion.div>

        {/* Expanding vignette — edges darken as space opens up */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, transparent 20%, rgba(5,8,22,0.8) 100%)",
          }}
        />

        {/* Center content */}
        <motion.div
          ref={contentRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6"
          style={{ opacity: textOpacity, y: textY }}
        >
          {/* ── Name ── */}
          <div className="text-center mb-8">
            {/* First name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
              className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-light"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
            >
              {PERSONAL.firstName}
            </motion.h1>

            {/* Middle name — slightly different timing */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.5,
              }}
              className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-light"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
            >
              {PERSONAL.middleName}
            </motion.h1>

            {/* Last name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.7,
              }}
              className="font-display font-bold tracking-[-0.04em] leading-[0.9] text-light"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
            >
              {PERSONAL.lastName}
            </motion.h1>
          </div>

          {/* ── Thin divider ── */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: 1.2,
            }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-light/20 to-transparent mb-8 origin-center"
          />

          {/* ── Role ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
            className="font-mono text-xs tracking-[0.35em] uppercase text-muted/70 mb-8"
          >
            {PERSONAL.role}
          </motion.p>

          {/* ── Tagline ── */}
          <div className="text-center">
            {taglineLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 1.7 + i * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-lg text-muted/60 leading-relaxed md:text-xl"
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* ── Scroll cue ── */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 1 }}
            className="font-mono text-[11px] tracking-[0.25em] text-muted/40 uppercase"
          >
            Scroll to begin journey
          </motion.span>

          {/* Animated arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
          >
            <motion.svg
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
              className="text-muted/30"
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                d="M8 0L8 20M8 20L1 13M8 20L15 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
