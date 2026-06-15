"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_GALAXY } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────────────────────────
// Compute positions for each tech on its ring
// ─────────────────────────────────────────────────────────────

function computePositions(galaxy) {
  const map = {};
  for (const ring of galaxy.rings) {
    const count = ring.technologies.length;
    ring.technologies.forEach((tech, i) => {
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2; // start from top
      map[tech.id] = {
        ...tech,
        ringId: ring.id,
        ringRadius: ring.radius,
        angle,
        // x, y as percentage of container
        x: 50 + ring.radius * Math.cos(angle),
        y: 50 + ring.radius * Math.sin(angle),
      };
    });
  }
  return map;
}

// ─────────────────────────────────────────────────────────────
// Tech Node — a celestial body
// ─────────────────────────────────────────────────────────────

function TechNode({ tech, isActive, isConnected, onHover }) {
  const isHighlighted = isActive || isConnected;

  return (
    <div
      className="absolute"
      style={{
        left: `${tech.x}%`,
        top: `${tech.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 30 : isConnected ? 20 : 10,
      }}
    >
      <motion.button
        type="button"
        onHoverStart={() => onHover(tech.id)}
        onHoverEnd={() => onHover(null)}
        onFocus={() => onHover(tech.id)}
        onBlur={() => onHover(null)}
        className="relative cursor-pointer focus:outline-none group"
        animate={{
          scale: isActive ? 1.4 : isConnected ? 1.15 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        aria-label={`${tech.name}: ${tech.years} experience, ${tech.projectCount} projects`}
      >
        {/* Glow aura */}
        <div
          className="absolute rounded-full transition-all duration-500"
          style={{
            width: tech.size * 4,
            height: tech.size * 4,
            left: -(tech.size * 2 - tech.size),
            top: -(tech.size * 2 - tech.size),
            background: `radial-gradient(circle, ${tech.color}${isHighlighted ? "25" : "0A"} 0%, transparent 70%)`,
            filter: isActive ? `blur(8px)` : "blur(4px)",
          }}
        />

        {/* Core */}
        <div
          className="rounded-full transition-all duration-500 flex items-center justify-center"
          style={{
            width: tech.size * 2,
            height: tech.size * 2,
            background: `radial-gradient(circle at 35% 35%, ${tech.color}${isHighlighted ? "50" : "25"} 0%, ${tech.color}${isHighlighted ? "20" : "08"} 60%, transparent 100%)`,
            boxShadow: isHighlighted
              ? `0 0 ${tech.size}px ${tech.color}40, inset 0 0 ${tech.size / 2}px ${tech.color}20`
              : `0 0 ${tech.size / 2}px ${tech.color}15`,
            border: `1px solid ${tech.color}${isHighlighted ? "40" : "15"}`,
          }}
        />

        {/* Label */}
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap transition-all duration-300"
        >
          <span
            className="font-mono text-[10px] tracking-wider transition-colors duration-300 block text-center"
            style={{ color: isHighlighted ? tech.color : "rgba(148,163,184,0.5)" }}
          >
            {tech.name}
          </span>
        </div>
      </motion.button>

      {/* Detail card on hover */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: tech.size * 2 + 16,
              width: 220,
              zIndex: 50,
            }}
          >
            <div
              className="rounded-xl border bg-void/92 backdrop-blur-xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              style={{ borderColor: `${tech.color}20` }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display text-sm font-semibold text-light">
                  {tech.name}
                </h4>
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    color: tech.color,
                    backgroundColor: `${tech.color}10`,
                    border: `1px solid ${tech.color}20`,
                  }}
                >
                  {tech.years}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3 text-xs text-muted/70">
                <div>
                  <span className="font-semibold text-light">{tech.projectCount}</span>{" "}
                  projects
                </div>
              </div>

              {/* Related projects */}
              <div className="space-y-1.5">
                <span className="font-mono text-[9px] tracking-wider text-muted/40 uppercase">
                  Used in
                </span>
                <div className="flex flex-wrap gap-1">
                  {tech.relatedProjects.map((p) => (
                    <span
                      key={p}
                      className="inline-block rounded-md px-2 py-0.5 font-mono text-[9px] border"
                      style={{
                        color: `${tech.color}CC`,
                        backgroundColor: `${tech.color}08`,
                        borderColor: `${tech.color}15`,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Connector */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-px"
              style={{
                bottom: -12,
                height: 12,
                background: `linear-gradient(to bottom, ${tech.color}30, transparent)`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Connection Lines SVG
// ─────────────────────────────────────────────────────────────

function ConnectionLines({ connections, positions, activeTech }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
      aria-hidden="true"
    >
      {connections.map((conn, i) => {
        const from = positions[conn.from];
        const to = positions[conn.to];
        if (!from || !to) return null;

        const isHighlighted =
          activeTech === conn.from || activeTech === conn.to;

        return (
          <motion.line
            key={`conn-${i}`}
            x1={`${from.x}%`}
            y1={`${from.y}%`}
            x2={`${to.x}%`}
            y2={`${to.y}%`}
            stroke={
              isHighlighted
                ? (activeTech === conn.from ? from.color : to.color)
                : "rgba(148,163,184,0.06)"
            }
            strokeWidth={isHighlighted ? 1.2 : 0.5}
            strokeDasharray={isHighlighted ? "none" : "3 8"}
            animate={{
              opacity: isHighlighted ? 0.6 : 0.15,
              strokeWidth: isHighlighted ? 1.2 : 0.5,
            }}
            transition={{ duration: 0.4 }}
          />
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Orbit Rings SVG
// ─────────────────────────────────────────────────────────────

function OrbitRings({ rings, activeTech, positions }) {
  // Determine which ring should be highlighted
  const activeRingId = activeTech ? positions[activeTech]?.ringId : null;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      {rings.map((ring) => {
        const isActive = ring.id === activeRingId;
        return (
          <circle
            key={ring.id}
            cx="50%"
            cy="50%"
            r={`${ring.radius}%`}
            fill="none"
            stroke={isActive ? "rgba(96,165,250,0.15)" : "rgba(30,41,59,0.3)"}
            strokeWidth={isActive ? 1.2 : 0.6}
            strokeDasharray={isActive ? "none" : "2 6"}
            style={{ transition: "all 0.5s ease" }}
          />
        );
      })}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Center Node — "YOU"
// ─────────────────────────────────────────────────────────────

function CenterNode() {
  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 15,
      }}
    >
      {/* Glow */}
      <div
        className="absolute rounded-full animate-star-pulse"
        style={{
          width: 100,
          height: 100,
          left: -30,
          top: -30,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
          animationDuration: "4s",
        }}
      />
      {/* Core */}
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          background:
            "radial-gradient(circle at 35% 35%, rgba(96,165,250,0.3) 0%, rgba(5,8,22,0.95) 70%)",
          boxShadow:
            "0 0 20px rgba(96,165,250,0.15), inset 0 0 10px rgba(96,165,250,0.1)",
          border: "1px solid rgba(96,165,250,0.2)",
        }}
      >
        <span className="font-mono text-[9px] font-semibold tracking-[0.15em] text-star/80">
          YOU
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────

export default function TechGalaxySection() {
  const sectionRef = useRef(null);
  const [activeTech, setActiveTech] = useState(null);

  const positions = useMemo(() => computePositions(TECH_GALAXY), []);

  // Get all tech IDs connected to the active tech
  const connectedIds = useMemo(() => {
    if (!activeTech) return new Set();
    const ids = new Set();
    for (const conn of TECH_GALAXY.connections) {
      if (conn.from === activeTech) ids.add(conn.to);
      if (conn.to === activeTech) ids.add(conn.from);
    }
    return ids;
  }, [activeTech]);

  const handleHover = useCallback((id) => {
    setActiveTech(id);
  }, []);

  // Flatten all technologies
  const allTechs = useMemo(
    () => TECH_GALAXY.rings.flatMap((r) => r.technologies),
    []
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative section-padding overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(96,165,250,0.02) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <SectionLabel number="09" title="GALAXY MAP" />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight leading-tight">
            Technology
            <span className="text-star"> Galaxy</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            A map of the technologies I wield — not self-rated percentages, but
            real-world constellations formed through projects and practice.
          </p>
        </motion.div>

        {/* Galaxy map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="relative mx-auto"
          style={{
            width: "100%",
            maxWidth: 700,
            aspectRatio: "1 / 1",
          }}
        >
          {/* Ring labels */}
          {TECH_GALAXY.rings.map((ring) => (
            <div
              key={ring.id}
              className="absolute font-mono text-[9px] tracking-[0.2em] text-muted/20 uppercase pointer-events-none"
              style={{
                left: "50%",
                top: `${50 - ring.radius - 3}%`,
                transform: "translateX(-50%)",
              }}
            >
              {ring.label}
            </div>
          ))}

          {/* Orbit rings */}
          <OrbitRings
            rings={TECH_GALAXY.rings}
            activeTech={activeTech}
            positions={positions}
          />

          {/* Connection lines */}
          <ConnectionLines
            connections={TECH_GALAXY.connections}
            positions={positions}
            activeTech={activeTech}
          />

          {/* Center node */}
          <CenterNode />

          {/* Tech nodes */}
          {allTechs.map((tech) => (
            <TechNode
              key={tech.id}
              tech={positions[tech.id]}
              isActive={activeTech === tech.id}
              isConnected={connectedIds.has(tech.id)}
              onHover={handleHover}
            />
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 flex-wrap"
        >
          {TECH_GALAXY.rings.map((ring) => (
            <div key={ring.id} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{
                  border: "1px solid rgba(148,163,184,0.3)",
                  backgroundColor:
                    ring.id === "inner"
                      ? "rgba(96,165,250,0.2)"
                      : ring.id === "middle"
                        ? "rgba(167,139,250,0.2)"
                        : "rgba(245,158,11,0.2)",
                }}
              />
              <span className="font-mono text-[10px] tracking-wider text-muted/40">
                {ring.label}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="h-px w-4 bg-muted/20" />
            <span className="font-mono text-[10px] tracking-wider text-muted/40">
              Connection
            </span>
          </div>
        </motion.div>

        {/* Instruction */}
        <p className="text-center font-mono text-xs text-muted/30 mt-6 tracking-wide">
          Hover to explore connections and projects
        </p>
      </div>
    </section>
  );
}
