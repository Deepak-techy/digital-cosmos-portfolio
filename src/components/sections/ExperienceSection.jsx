"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import { EXPERIENCE } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

function TimelineItem({ experience, index, isLast }) {
  return (
    <motion.div
      variants={fadeUp}
      className="relative pl-10 pb-16 md:pl-16 last:pb-0"
    >
      {/* Timeline node */}
      <div className="absolute left-0 top-1 md:left-5">
        <div className="relative flex h-8 w-8 items-center justify-center">
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border border-star/30 animate-star-pulse" style={{ animationDelay: `${index * 0.5}s` }} />
          {/* Core dot */}
          <div className="h-3 w-3 rounded-full bg-star shadow-[0_0_12px_rgba(96,165,250,0.5)]" />
        </div>
      </div>

      {/* Content Card */}
      <div className="group rounded-2xl border border-border-subtle bg-nebula/30 p-8 transition-all duration-500 hover:border-star/20 hover:bg-nebula/50 backdrop-blur-sm md:p-10">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-light md:text-2xl">
              {experience.role}
            </h3>
            <div className="mt-1 flex items-center gap-2 text-star">
              <Briefcase className="h-3.5 w-3.5" />
              <span className="font-mono text-sm">{experience.company}</span>
            </div>
          </div>
          <span className="font-mono text-xs tracking-widest text-muted/70 whitespace-nowrap">
            {experience.period}
          </span>
        </div>

        {/* Description */}
        <p className="text-muted leading-relaxed mb-6 text-base">
          {experience.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-2.5">
          {experience.highlights.map((highlight, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted/80">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-star/60" />
              <span className="leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const timelineRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const line = lineRef.current;
    if (!line) return;

    gsap.fromTo(
      line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 60%",
          end: "bottom 60%",
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
      id="experience"
      className="relative section-padding overflow-hidden"
    >
      <GradientBlob
        color="star"
        size="md"
        className="top-[20%] -right-[200px] opacity-10"
      />

      <div className="section-container">
        <SectionLabel number="10" title="ORBIT" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight">
            Tracing the
            <span className="text-star"> Orbit</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            Each orbit represents a chapter — a place where I grew, built, and
            left my mark on the systems I touched.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-[15px] top-0 bottom-0 w-px origin-top md:left-[36px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(96,165,250,0.3), rgba(96,165,250,0.1), transparent)",
            }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {EXPERIENCE.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                experience={exp}
                index={i}
                isLast={i === EXPERIENCE.length - 1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
