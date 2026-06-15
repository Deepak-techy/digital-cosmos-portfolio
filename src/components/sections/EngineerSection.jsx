"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

// ─────────────────────────────────────────────────────────────
// Neural Network Nodes
// ─────────────────────────────────────────────────────────────

const NEURAL_NODES = [
  { id: "projects", label: "Projects", angle: -75, description: "Every line of code written with intent" },
  { id: "internships", label: "Internships", angle: -45, description: "Real-world problems, real solutions" },
  { id: "hackathons", label: "Hackathons", angle: -15, description: "Innovation under pressure" },
  { id: "leadership", label: "Leadership", angle: 15, description: "Guiding teams toward shared vision" },
  { id: "research", label: "Research", angle: 45, description: "Understanding the why behind the how" },
  { id: "ai", label: "AI", angle: 75, description: "Teaching machines to think" },
  { id: "development", label: "Development", angle: 105, description: "Building systems that scale and endure" },
];

const CENTER_RADIUS_PCT = 42; // distance of outer nodes from center (%)

// ─────────────────────────────────────────────────────────────
// Particle System — animated dots flowing along connections
// ─────────────────────────────────────────────────────────────

function ParticleCanvas({ nodes, containerSize, isVisible }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  // Create particles once when nodes or containerSize changes
  useEffect(() => {
    if (!containerSize.width) return;

    const w = containerSize.width;
    const h = containerSize.height;
    const cx = w / 2;
    const cy = h / 2;

    const particles = [];
    for (const node of nodes) {
      const rad = (node.angle * Math.PI) / 180;
      const radius = Math.min(w, h) * (CENTER_RADIUS_PCT / 100);
      const nx = cx + radius * Math.cos(rad);
      const ny = cy + radius * Math.sin(rad);

      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        particles.push({
          startX: nx,
          startY: ny,
          endX: cx,
          endY: cy,
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.003,
          opacity: 0.3 + Math.random() * 0.5,
          size: 1 + Math.random() * 1.5,
        });
      }
    }
    particlesRef.current = particles;
  }, [nodes, containerSize]);

  // Run the draw loop only when visible
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerSize.width) return;

    if (!isVisible) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const w = containerSize.width;
    const h = containerSize.height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
          p.opacity = 0.3 + Math.random() * 0.5;
        }

        const t = p.progress * p.progress;
        const x = p.startX + (p.endX - p.startX) * t;
        const y = p.startY + (p.endY - p.startY) * t;

        const fadeIn = Math.min(p.progress * 5, 1);
        const fadeOut = Math.min((1 - p.progress) * 4, 1);
        const alpha = p.opacity * fadeIn * fadeOut;

        if (alpha < 0.01) continue;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
        ctx.fill();

        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [containerSize, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: containerSize.width,
        height: containerSize.height,
        zIndex: 5,
      }}
      aria-hidden="true"
    />
  );
}

// ─────────────────────────────────────────────────────────────
// Connection Lines (SVG)
// ─────────────────────────────────────────────────────────────

const ConnectionLines = memo(function ConnectionLines({ nodes, activeNode }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {nodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const nx = 50 + CENTER_RADIUS_PCT * Math.cos(rad);
        const ny = 50 + CENTER_RADIUS_PCT * Math.sin(rad);
        const isActive = activeNode === node.id;

        // Curved path via quadratic bezier
        const mx = (nx + 50) / 2;
        const my = (ny + 50) / 2;
        // Slight curve offset perpendicular to the line
        const perpX = -(ny - 50) * 0.08;
        const perpY = (nx - 50) * 0.08;

        return (
          <path
            key={node.id}
            d={`M ${nx} ${ny} Q ${mx + perpX} ${my + perpY} 50 50`}
            fill="none"
            stroke={isActive ? "rgba(96,165,250,0.25)" : "rgba(96,165,250,0.06)"}
            strokeWidth={isActive ? 0.4 : 0.2}
            style={{ transition: "stroke 0.5s ease, stroke-width 0.5s ease" }}
          />
        );
      })}
    </svg>
  );
});

// ─────────────────────────────────────────────────────────────
// Outer Node
// ─────────────────────────────────────────────────────────────

const NeuralNode = memo(function NeuralNode({ node, isActive, onHover }) {
  const rad = (node.angle * Math.PI) / 180;
  const x = 50 + CENTER_RADIUS_PCT * Math.cos(rad);
  const y = 50 + CENTER_RADIUS_PCT * Math.sin(rad);

  // Position label based on which side of center
  const isLeftSide = x < 50;

  return (
    <div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 20 : 10,
      }}
    >
      <motion.div
        onHoverStart={() => onHover(node.id)}
        onHoverEnd={() => onHover(null)}
        className="relative cursor-default"
        animate={{
          scale: isActive ? 1.3 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Node glow */}
        <div
          className="absolute rounded-full transition-all duration-500"
          style={{
            width: 40,
            height: 40,
            left: -14,
            top: -14,
            background: `radial-gradient(circle, ${isActive ? "rgba(96,165,250,0.15)" : "rgba(96,165,250,0.04)"} 0%, transparent 70%)`,
          }}
        />

        {/* Node core */}
        <div
          className="rounded-full transition-all duration-500"
          style={{
            width: 12,
            height: 12,
            background: `radial-gradient(circle at 35% 35%, ${isActive ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)"} 0%, ${isActive ? "rgba(96,165,250,0.6)" : "rgba(96,165,250,0.2)"} 70%, transparent 100%)`,
            boxShadow: isActive
              ? "0 0 12px rgba(96,165,250,0.3), 0 0 24px rgba(96,165,250,0.1)"
              : "0 0 6px rgba(96,165,250,0.1)",
          }}
        />

        {/* Label */}
        <div
          className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap transition-all duration-400"
          style={{
            ...(isLeftSide
              ? { right: "100%", marginRight: 14, textAlign: "right" }
              : { left: "100%", marginLeft: 14, textAlign: "left" }),
          }}
        >
          <span
            className="block font-mono text-[11px] tracking-[0.1em] transition-colors duration-500"
            style={{ color: isActive ? "rgba(255,255,255,0.9)" : "rgba(148,163,184,0.5)" }}
          >
            {node.label}
          </span>
          {/* Description on hover */}
          <motion.span
            className="block font-sans text-[10px] mt-0.5 leading-tight"
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              height: isActive ? "auto" : 0,
              y: isActive ? 0 : -4,
            }}
            transition={{ duration: 0.3 }}
            style={{ color: "rgba(96,165,250,0.5)", maxWidth: 140 }}
          >
            {node.description}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Center Node — The Engineer
// ─────────────────────────────────────────────────────────────

const CenterNode = memo(function CenterNode() {
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
      {/* Outermost pulse */}
      <div
        className="absolute rounded-full animate-star-pulse"
        style={{
          width: 120,
          height: 120,
          left: -40,
          top: -40,
          background:
            "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          animationDuration: "4s",
        }}
      />

      {/* Orbit ring */}
      <div
        className="absolute rounded-full border border-star/8 animate-orbit"
        style={{
          width: 80,
          height: 80,
          left: -20,
          top: -20,
          animationDuration: "30s",
        }}
      />

      {/* Core */}
      <div
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          background:
            "radial-gradient(circle at 35% 35%, rgba(96,165,250,0.25) 0%, rgba(5,8,22,0.95) 60%)",
          boxShadow:
            "0 0 20px rgba(96,165,250,0.15), 0 0 50px rgba(96,165,250,0.05), inset 0 0 15px rgba(96,165,250,0.1)",
          border: "1px solid rgba(96,165,250,0.15)",
        }}
      >
        {/* Inner bright spot */}
        <div
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(96,165,250,0.3) 100%)",
            boxShadow: "0 0 8px rgba(96,165,250,0.4)",
          }}
        />
      </div>

      {/* Name below */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 text-center whitespace-nowrap">
        <span className="block font-display text-sm font-semibold tracking-[0.15em] text-light/80">
          DEEPAK CHANDRA
        </span>
        <span className="block font-display text-sm font-semibold tracking-[0.15em] text-star/70">
          KALITA
        </span>
      </div>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────

export default function EngineerSection() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Measure container for canvas
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;

    function measure() {
      setContainerSize({
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    }
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Intersection observer for visibility
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleHover = useCallback((id) => {
    setActiveNode(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="engineer"
      className="relative section-padding overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Subtle ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(96,165,250,0.015) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <SectionLabel number="05" title="CONVERGENCE" />

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-8 text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight leading-tight">
            The Engineer Behind
            <span className="text-star"> The Code</span>
          </h2>
          <p className="text-lg text-muted/70 leading-relaxed md:text-xl">
            Every experience — every project, every failure, every breakthrough —
            flowed through a neural network of growth and converged into the
            engineer I am today.
          </p>
        </motion.div>

        {/* Neural network visualization */}
        <motion.div
          ref={mapRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative mx-auto"
          style={{
            width: "100%",
            maxWidth: 650,
            aspectRatio: "1 / 1",
          }}
        >
          {/* Connection lines */}
          <ConnectionLines nodes={NEURAL_NODES} activeNode={activeNode} />

          {/* Particle system */}
          {containerSize.width > 0 && (
            <ParticleCanvas
              nodes={NEURAL_NODES}
              containerSize={containerSize}
              isVisible={isVisible}
            />
          )}

          {/* Center convergence node */}
          <CenterNode />

          {/* Outer neural nodes */}
          {NEURAL_NODES.map((node) => (
            <NeuralNode
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              onHover={handleHover}
            />
          ))}
        </motion.div>

        {/* Reflective quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 text-center max-w-lg mx-auto"
        >
          <p className="text-muted/40 text-sm italic leading-relaxed">
            "The whole is greater than the sum of its parts."
          </p>
          <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-star/20 to-transparent mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
