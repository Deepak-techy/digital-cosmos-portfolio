"use client";

import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import { PROJECTS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.article
      variants={fadeUp}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "card-spotlight group relative rounded-2xl border border-border-subtle bg-nebula/40",
        "transition-all duration-500 ease-out backdrop-blur-sm",
        "hover:border-star/25 hover:shadow-[0_8px_40px_rgba(96,165,250,0.06)]",
        "hover:-translate-y-1"
      )}
    >
      <div className="relative z-10 p-8 md:p-10">
        {/* Project number */}
        <div className="mb-6 flex items-center justify-between">
          <span className="font-mono text-xs tracking-widest text-star/50">
            PROJECT.{String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted hover:text-light hover:bg-light/5 transition-all duration-300"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-muted hover:text-star hover:bg-star/5 transition-all duration-300"
                aria-label={`View ${project.title} live`}
              >
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl font-semibold text-light mb-4 group-hover:text-star transition-colors duration-300 md:text-3xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted leading-relaxed mb-8 text-base md:text-lg">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-full border border-border-subtle bg-void/50 px-3.5 py-1.5 font-mono text-xs text-muted transition-all duration-300 hover:border-star/30 hover:text-star hover:bg-star/5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-star/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative section-padding overflow-hidden">
      <GradientBlob
        color="star"
        size="lg"
        className="top-[20%] -left-[300px] opacity-10"
      />
      <GradientBlob
        color="aurora"
        size="md"
        className="bottom-[10%] -right-[200px] opacity-10"
      />

      <div className="section-container">
        <SectionLabel number="06" title="STAR MAP" />

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight">
            Navigating the
            <span className="text-star"> Star Map</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            Each project is a star in my constellation — a point of light born from
            curiosity, shaped by challenges, and refined through iteration.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
