"use client";

import { useState, useRef, useEffect, memo, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  ExternalLink,
  ArrowUpRight,
  Layers,
  Lightbulb,
  Cpu,
  Wrench,
  Sparkles,
  Image as ImageIcon,
  FileText,
  Calendar,
  ScanText,
  Brain,
  Users,
  LayoutDashboard,
  Circle,
} from "lucide-react";

const SATELLITE_ICONS = {
  FileText,
  Calendar,
  ScanText,
  Brain,
  Users,
  LayoutDashboard,
  Circle,
};
import { EDUONE } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────────────────────────
// Satellite — orbiting element around the planet
// ─────────────────────────────────────────────────────────────

const Satellite = memo(function Satellite({ satellite, index, total, onSelect, isPaused }) {
  const [hovered, setHovered] = useState(false);
  const Icon = SATELLITE_ICONS[satellite.icon] || Circle;
  const angleStep = 360 / total;
  const startAngle = index * angleStep;

  return (
    <div
      className="absolute inset-0"
      style={{
        animation: isPaused ? "none" : `orbit ${satellite.orbitSpeed}s linear infinite`,
        animationDelay: `${-(startAngle / 360) * satellite.orbitSpeed}s`,
      }}
    >
      {/* Satellite positioned at top of orbit circle */}
      <motion.button
        type="button"
        className="absolute cursor-pointer focus:outline-none"
        style={{
          top: 0,
          left: "50%",
          transform: "translate(-50%, -50%)",
          // Counter-rotate so text stays upright
          animation: isPaused
            ? "none"
            : `orbit ${satellite.orbitSpeed}s linear infinite reverse`,
          animationDelay: `${-(startAngle / 360) * satellite.orbitSpeed}s`,
        }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={() => onSelect(satellite)}
        animate={{
          scale: hovered ? 1.15 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        aria-label={`Explore ${satellite.name}`}
      >
        {/* Satellite body */}
        <div
          className={`
            relative flex flex-col items-center gap-2 rounded-2xl border px-4 py-3
            transition-all duration-500
            ${
              hovered
                ? "border-star/40 bg-void/95 shadow-[0_0_30px_rgba(96,165,250,0.15),0_8px_30px_rgba(0,0,0,0.4)]"
                : "border-border-subtle/50 bg-void/80 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            }
          `}
          style={{ minWidth: 100 }}
        >
          <div
            className={`rounded-lg p-2 transition-all duration-500 ${
              hovered
                ? "bg-star/15 text-star shadow-[0_0_12px_rgba(96,165,250,0.2)]"
                : "bg-light/5 text-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span
            className={`font-mono text-[10px] tracking-wider transition-colors duration-300 whitespace-nowrap ${
              hovered ? "text-star" : "text-muted/70"
            }`}
          >
            {satellite.name}
          </span>

          {/* Hover pulse ring */}
          {hovered && (
            <motion.div
              className="absolute inset-0 rounded-2xl border border-star/20"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>
      </motion.button>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Detail Modal — immersive project deep-dive
// ─────────────────────────────────────────────────────────────

function DetailModal({ satellite, onClose }) {
  const Icon = SATELLITE_ICONS[satellite.icon] || Circle;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const sections = [
    {
      icon: Lightbulb,
      title: "Problem Statement",
      content: EDUONE.problemStatement,
      type: "text",
    },
    {
      icon: Sparkles,
      title: "Solution",
      content: EDUONE.solution,
      type: "text",
    },
    {
      icon: Layers,
      title: "Architecture",
      content: EDUONE.architecture,
      type: "list",
    },
    {
      icon: Wrench,
      title: "Tech Stack",
      content: EDUONE.techStack,
      type: "tags",
    },
    {
      icon: Cpu,
      title: `${satellite.name} — Features`,
      content: satellite.features,
      type: "list",
    },
    {
      icon: ImageIcon,
      title: "Screenshots",
      content: null,
      type: "placeholder",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/85 backdrop-blur-xl" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto mx-4 rounded-2xl border border-border-subtle/50 bg-nebula/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(30,41,59,0.5) transparent" }}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 border-b border-border-subtle/40 bg-nebula/90 backdrop-blur-xl px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl border border-star/20 bg-star/10 p-3">
                <Icon className="h-5 w-5 text-star" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-light">
                  {satellite.name}
                </h3>
                <p className="font-mono text-xs text-muted/60 mt-0.5">
                  EDUONE MODULE
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border-subtle/50 bg-void/50 p-2 text-muted hover:text-light hover:border-light/20 transition-all duration-300"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-8 space-y-10">
          {/* Module description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-muted leading-relaxed text-base"
          >
            {satellite.description}
          </motion.p>

          {/* Sections */}
          {sections.map((section, i) => {
            const SectionIcon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4">
                  <SectionIcon className="h-4 w-4 text-star/60" />
                  <h4 className="font-display text-sm font-semibold tracking-wide text-light/90 uppercase">
                    {section.title}
                  </h4>
                  <div className="h-px flex-1 bg-border-subtle/30" />
                </div>

                {/* Content by type */}
                {section.type === "text" && (
                  <p className="text-sm text-muted/80 leading-relaxed pl-7">
                    {section.content}
                  </p>
                )}

                {section.type === "list" && (
                  <ul className="space-y-2 pl-7">
                    {section.content.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-muted/80"
                      >
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-star/50" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.type === "tags" && (
                  <div className="flex flex-wrap gap-2 pl-7">
                    {section.content.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg border border-border-subtle bg-void/50 px-3 py-1.5 font-mono text-xs text-muted hover:border-star/30 hover:text-star transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {section.type === "placeholder" && (
                  <div className="pl-7 grid grid-cols-2 gap-3">
                    {[1, 2].map((n) => (
                      <div
                        key={n}
                        className="rounded-xl border border-border-subtle/30 bg-void/30 h-32 flex items-center justify-center"
                      >
                        <span className="font-mono text-xs text-muted/30">
                          Screenshot {n}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-3 pt-4 border-t border-border-subtle/30"
          >
            <a
              href={EDUONE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-void/50 px-5 py-2.5 font-mono text-xs text-muted hover:border-star/30 hover:text-star transition-all duration-300"
            >
              GitHub
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <a
              href={EDUONE.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-star/30 bg-star/10 px-5 py-2.5 font-mono text-xs text-star hover:bg-star/20 hover:shadow-[0_0_20px_rgba(96,165,250,0.15)] transition-all duration-300"
            >
              Live Demo
              <ExternalLink className="h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Planet — the central body
// ─────────────────────────────────────────────────────────────

function Planet({ scrollProgress }) {
  const planetScale = useTransform(scrollProgress, [0, 0.3, 0.6], [0.3, 1, 1]);
  const planetOpacity = useTransform(scrollProgress, [0, 0.2], [0, 1]);
  const glowIntensity = useTransform(scrollProgress, [0.2, 0.5], [0, 1]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{
        scale: planetScale,
        opacity: planetOpacity,
      }}
    >
      {/* Atmosphere — outermost glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          opacity: glowIntensity,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.06) 0%, rgba(167,139,250,0.03) 40%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      {/* Planet body */}
      <div className="relative">
        {/* Outer ring */}
        <div
          className="absolute rounded-full border border-star/8"
          style={{
            width: 240,
            height: 240,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Planet surface */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{ width: 180, height: 180 }}
        >
          {/* Base gradient */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 35% 35%, rgba(96,165,250,0.3) 0%, rgba(15,23,42,0.9) 50%, rgba(5,8,22,1) 100%)",
            }}
          />
          {/* Surface texture — subtle bands */}
          <div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: `
                repeating-linear-gradient(
                  175deg,
                  transparent 0px,
                  transparent 8px,
                  rgba(96,165,250,0.05) 8px,
                  rgba(96,165,250,0.05) 10px
                )
              `,
            }}
          />
          {/* Specular highlight */}
          <div
            className="absolute rounded-full"
            style={{
              width: "45%",
              height: "45%",
              top: "12%",
              left: "15%",
              background:
                "radial-gradient(ellipse, rgba(255,255,255,0.08) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          {/* Atmosphere rim */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 0 40px rgba(96,165,250,0.15), inset 0 0 80px rgba(96,165,250,0.05), 0 0 60px rgba(96,165,250,0.1), 0 0 120px rgba(96,165,250,0.05)",
            }}
          />
        </div>

        {/* Planet label — centered inside */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display text-2xl font-bold tracking-[0.15em] text-light/90 md:text-3xl">
            {EDUONE.title}
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-star/50 mt-1 uppercase">
            {EDUONE.subtitle}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────

export default function EduOneSection() {
  const sectionRef = useRef(null);
  const [selectedSatellite, setSelectedSatellite] = useState(null);
  const [orbitsPaused, setOrbitsPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Orbit visibility
  const orbitsOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const handleSelectSatellite = useCallback((satellite) => {
    setOrbitsPaused(true);
    setSelectedSatellite(satellite);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSatellite(null);
    // Resume orbits after a small delay so exit animation isn't jarring
    setTimeout(() => setOrbitsPaused(false), 400);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="eduone"
        className="relative overflow-hidden"
        style={{ minHeight: "110vh", paddingTop: "clamp(80px, 12vw, 200px)", paddingBottom: "clamp(120px, 16vw, 280px)" }}
      >
        {/* Ambient background — deeper and more dramatic than other sections */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 50%, rgba(96,165,250,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 40% 30% at 50% 50%, rgba(167,139,250,0.03) 0%, transparent 50%)
            `,
          }}
        />

        <div className="section-container relative z-10">
          <SectionLabel number="04" title="FLAGSHIP" />

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="mb-8 max-w-2xl"
          >
            <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight leading-tight">
              Discovering a
              <span className="bg-gradient-to-r from-star to-aurora bg-clip-text text-transparent">
                {" "}New World
              </span>
            </h2>
            <p className="text-lg text-muted leading-relaxed md:text-xl">
              {EDUONE.description}
            </p>
          </motion.div>

          {/* Planet system container */}
          <div className="relative flex items-center justify-center" style={{ minHeight: "clamp(450px, 60vh, 650px)" }}>
            {/* Orbit rings (visual only) */}
            <motion.div
              className="absolute"
              style={{
                width: "clamp(340px, 50vw, 500px)",
                height: "clamp(340px, 50vw, 500px)",
                opacity: orbitsOpacity,
              }}
            >
              {/* Orbit path */}
              <div
                className="absolute inset-0 rounded-full border border-border-subtle/15"
              />
              {/* Secondary orbit hint */}
              <div
                className="absolute rounded-full border border-border-subtle/8"
                style={{
                  inset: -30,
                }}
              />

              {/* Satellites */}
              {EDUONE.satellites.map((sat, i) => (
                <Satellite
                  key={sat.id}
                  satellite={sat}
                  index={i}
                  total={EDUONE.satellites.length}
                  onSelect={handleSelectSatellite}
                  isPaused={orbitsPaused}
                />
              ))}
            </motion.div>

            {/* Central planet */}
            <Planet scrollProgress={scrollYProgress} />
          </div>

          {/* Instruction hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center font-mono text-xs text-muted/40 mt-8 tracking-wide"
          >
            Click any module to explore
          </motion.p>
        </div>
      </section>

      {/* Modal overlay */}
      <AnimatePresence>
        {selectedSatellite && (
          <DetailModal
            satellite={selectedSatellite}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}
