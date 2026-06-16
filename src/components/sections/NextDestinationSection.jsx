"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, FileText, Radio, ArrowRight, RotateCcw, X, CheckCircle } from "lucide-react";
import { PERSONAL, NEXT_DESTINATION } from "@/lib/constants";
import SectionLabel from "@/components/ui/SectionLabel";
import { useSectionSound } from "@/hooks/useSectionSound";

// ─────────────────────────────────────────────────────────────
// SVGs for GitHub and LinkedIn Icons
// ─────────────────────────────────────────────────────────────

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Galaxy Canvas simulation
// ─────────────────────────────────────────────────────────────

const GalaxyCanvas = memo(function GalaxyCanvas({ warpActive, onWarpComplete }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const warpProgress = useRef(0);
  const scaleRef = useRef(1);

  // Initialize spiral stars
  useEffect(() => {
    const stars = [];
    const armCount = 3;
    const starCount = 300;
    const maxRadius = 400;

    for (let i = 0; i < starCount; i++) {
      const isCore = Math.random() < 0.15;
      const arm = Math.floor(Math.random() * armCount);
      const armAngle = (arm * 2 * Math.PI) / armCount;

      let dist, angle, size, speed, color, opacity;

      if (isCore) {
        // Core cluster: tightly bound, white/blue glow
        dist = Math.pow(Math.random(), 2) * 50;
        angle = Math.random() * Math.PI * 2;
        size = Math.random() * 2.5 + 1.2;
        speed = (0.015 + Math.random() * 0.02) * (Math.random() > 0.5 ? 1 : -1);
        color = "rgba(240, 246, 255, 1)";
        opacity = Math.random() * 0.7 + 0.3;
      } else {
        // Arm spiral stars
        const t = Math.random();
        const theta = t * Math.PI * 3.5; // spirals wrapping
        dist = 40 + Math.pow(t, 1.3) * maxRadius;
        angle = theta + armAngle + (Math.random() - 0.5) * 0.35; // arm spread
        size = Math.random() * 1.8 + 0.4;
        speed = 0.005 + (0.012 * (1 - t)); // inner orbits faster
        opacity = Math.random() * 0.6 + 0.2;

        // Color variance: blue, purple, magenta hints
        const colorRand = Math.random();
        if (colorRand < 0.45) {
          color = "rgba(96, 165, 250, 1)"; // Star blue
        } else if (colorRand < 0.8) {
          color = "rgba(167, 139, 250, 1)"; // Aurora purple
        } else {
          color = "rgba(255, 255, 255, 1)"; // White stars
        }
      }

      stars.push({
        x: 0,
        y: 0,
        px: 0, // previous frame coords for warp speed streaks
        py: 0,
        dist,
        angle,
        speed,
        size,
        color,
        opacity,
        z: Math.random() * 200 - 100 // Depth perspective
      });
    }

    starsRef.current = stars;
  }, []);

  // Warp animation timeline
  useEffect(() => {
    if (warpActive) {
      // Animate zoom scale and warp speed progress using GSAP
      gsap.to(warpProgress, {
        current: 1,
        duration: 3,
        ease: "power3.in",
      });

      gsap.to(scaleRef, {
        current: 12,
        duration: 3.2,
        ease: "power4.in",
        onComplete: onWarpComplete
      });
    } else {
      warpProgress.current = 0;
      scaleRef.current = 1;
    }
  }, [warpActive, onWarpComplete]);

  // Main animation frame loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracker
    function handleMouseMove(e) {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.08;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.08;
    }
    window.addEventListener("mousemove", handleMouseMove);

    function draw() {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse offset interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const cx = width / 2 + mouse.x;
      const cy = height / 2 + mouse.y;

      const warp = warpProgress.current;
      const scale = scaleRef.current;

      for (const star of starsRef.current) {
        // Orbit speed scales up dynamically during warp jump
        const speedMultiplier = 1 + warp * 50;
        star.angle += star.speed * speedMultiplier;

        // Polar to Cartesian
        const baseRadius = star.dist * scale;
        const targetX = baseRadius * Math.cos(star.angle);
        const targetY = baseRadius * Math.sin(star.angle);

        // Perspective projection
        const depthFactor = warpActive ? 1 + warp * 60 : 1;
        const screenX = cx + targetX * depthFactor;
        const screenY = cy + targetY * depthFactor;

        // Skip rendering if out of viewport
        if (screenX < 0 || screenX > width || screenY < 0 || screenY > height) {
          continue;
        }

        const alpha = star.opacity * (1 - warp * 0.7);

        ctx.strokeStyle = star.color;
        ctx.fillStyle = star.color;
        ctx.lineWidth = star.size * (1 + warp * 1.5);

        if (warpActive && warp > 0.1) {
          // Streak line: connect current position to previous position
          ctx.beginPath();
          ctx.moveTo(star.px || screenX, star.py || screenY);
          ctx.lineTo(screenX, screenY);
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
          ctx.stroke();
        } else {
          // Radial core star glow or simple dot
          ctx.beginPath();
          ctx.arc(screenX, screenY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color.includes("250") ? "96,165,250" : star.color.includes("139") ? "167,139,250" : "255,255,255"}, ${alpha})`;
          ctx.fill();
        }

        // Cache coordinates
        star.px = screenX;
        star.py = screenY;
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [warpActive]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 bg-transparent"
      aria-hidden="true"
    />
  );
});

// ─────────────────────────────────────────────────────────────
// Transmitter Form Panel
// ─────────────────────────────────────────────────────────────

const TransmitterForm = memo(function TransmitterForm({ formOpen, onClose }) {
  const [formStatus, setFormStatus] = useState("idle"); // "idle" | "sending" | "success"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Antenna diagnostics show missing parameters. Check inputs.");
      return;
    }
    setError("");
    setFormStatus("sending");

    // Simulate futuristic transmission telemetry
    setTimeout(() => {
      setFormStatus("success");
    }, 2500);
  };

  return (
    <AnimatePresence>
      {formOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 80 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-void/90 border-l border-border-subtle/40 backdrop-blur-2xl z-[150] shadow-[0_0_80px_rgba(0,0,0,0.8)]"
        >
          <div className="flex h-full flex-col p-8 justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between border-b border-border-subtle/30 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-star/30 bg-star/5 text-star">
                    <Radio className="h-4 w-4 animate-star-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold tracking-wider uppercase text-light">
                      Signal Transmitter
                    </h3>
                    <span className="font-mono text-[9px] text-muted/50">
                      FREQ ID: 1420.4 MHz (Hydrogen Line)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-border-subtle/40 bg-void/50 p-2 text-muted hover:text-light transition-all duration-300"
                  aria-label="Close transmitter panel"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 px-4 space-y-6"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-star/20 bg-star/5 text-star mb-2">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-light">
                    TRANSMISSION BROADCAST SUCCESSFUL
                  </h4>
                  <p className="text-xs text-muted/70 leading-relaxed font-mono">
                    Your signal has been encrypted and broadcast into the cosmos. Deepak will receive the telemetry shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                      Call Sign (Your Name)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={formStatus === "sending"}
                      className="w-full rounded-lg border border-border-subtle bg-void/50 px-4 py-3 font-mono text-xs text-light placeholder-muted/30 focus:border-star/50 focus:outline-none focus:ring-1 focus:ring-star/20 transition-all duration-300"
                      placeholder="e.g. Commander Shepard"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                      Comms Frequency (Your Email)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={formStatus === "sending"}
                      className="w-full rounded-lg border border-border-subtle bg-void/50 px-4 py-3 font-mono text-xs text-light placeholder-muted/30 focus:border-star/50 focus:outline-none focus:ring-1 focus:ring-star/20 transition-all duration-300"
                      placeholder="e.g. shepard@alliance.com"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                      Payload (Your Message)
                    </label>
                    <textarea
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={formStatus === "sending"}
                      className="w-full rounded-lg border border-border-subtle bg-void/50 px-4 py-3 font-mono text-xs text-light placeholder-muted/30 focus:border-star/50 focus:outline-none focus:ring-1 focus:ring-star/20 transition-all duration-300 resize-none"
                      placeholder="Begin transmission..."
                    />
                  </div>

                  {error && (
                    <p className="font-mono text-[10px] text-red-400 mt-2">
                      ▲ {error}
                    </p>
                  )}

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full relative cursor-pointer flex items-center justify-center gap-2 rounded-xl border border-star/30 bg-star/5 hover:bg-star/15 py-4 font-mono text-xs text-star font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "sending" ? (
                      <span className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full border border-t-transparent border-star animate-spin" />
                        Transmitting...
                      </span>
                    ) : (
                      <>
                        Broadcast Signal
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Footer diagnostics */}
            <div className="border-t border-border-subtle/30 pt-6 text-[9px] font-mono text-muted/30">
              <div className="flex justify-between">
                <span>ENCRYPTION: SHIELD-256</span>
                <span>STATUS: STABLE</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// ─────────────────────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────────────────────

export default function NextDestinationSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [formOpen, setFormOpen] = useState(false);
  const [warpActive, setWarpActive] = useState(false);
  const [creditsVisible, setCreditsVisible] = useState(false);

  // Hopeful futuristic tone
  useSectionSound("hopefulTone", sectionRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    // Localized background darkening context
    const ctx = gsap.context(() => {
      gsap.to(section, {
        backgroundColor: "#000000",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 10%",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleWarpTrigger = useCallback(() => {
    setWarpActive(true);
  }, []);

  const handleWarpComplete = useCallback(() => {
    setCreditsVisible(true);
  }, []);

  const handleRestart = useCallback(() => {
    // Reset state first
    setCreditsVisible(false);
    setWarpActive(false);
    // Smooth scroll back to hero
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        className="relative overflow-hidden transition-colors duration-1000"
        style={{ minHeight: "100vh", backgroundColor: "transparent" }}
      >
        <div ref={containerRef} className="section-container relative z-10 py-24 flex flex-col justify-between min-h-screen">
          <SectionLabel number="12" title="LAUNCH" />

          {/* Galaxy Canvas simulator */}
          <GalaxyCanvas warpActive={warpActive} onWarpComplete={handleWarpComplete} />

          {/* Central Information Panel */}
          <div className="my-auto text-center max-w-4xl mx-auto space-y-16 relative z-10">
            {/* Title */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl font-bold text-light/90 md:text-5xl lg:text-7xl tracking-tight leading-none uppercase glow-text-star"
              >
                {NEXT_DESTINATION.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-muted/70 leading-relaxed md:text-xl font-mono"
              >
                {NEXT_DESTINATION.tagline}
              </motion.p>
            </div>

            {/* Orbiting / Floating Items */}
            <div className="flex flex-wrap justify-center gap-3">
              {NEXT_DESTINATION.items.map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.08 }}
                  whileHover={{ scale: 1.06, borderColor: "rgba(96,165,250,0.4)" }}
                  className="inline-block rounded-full border border-border-subtle bg-void/60 backdrop-blur-md px-6 py-2.5 font-mono text-xs text-muted/80 hover:text-star hover:bg-star/5 transition-all duration-300"
                >
                  {item}
                </motion.span>
              ))}
            </div>

            {/* Futuristic Button Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 pt-6"
            >
              {/* Dynamic Signal Transmitter Form Panel toggle */}
              <button
                type="button"
                onClick={() => setFormOpen(true)}
                className="group cursor-pointer relative inline-flex items-center gap-2 rounded-full border border-star/40 bg-star/5 px-8 py-3.5 font-mono text-xs text-star tracking-widest uppercase font-bold transition-all duration-300 hover:bg-star/15 hover:border-star/70 hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]"
              >
                <Radio className="h-4 w-4 animate-star-pulse" />
                Signal Transmitter
              </button>

              {/* PDF Resume */}
              <a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-void/40 backdrop-blur-md px-7 py-3.5 font-mono text-xs text-muted hover:text-light hover:border-light/20 transition-all duration-300"
              >
                <FileText className="h-3.5 w-3.5" />
                Telemetry (Resume)
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-void/40 backdrop-blur-md px-5 py-3.5 font-mono text-xs text-muted hover:text-light hover:border-light/20 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-void/40 backdrop-blur-md px-5 py-3.5 font-mono text-xs text-muted hover:text-light hover:border-light/20 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-3.5 w-3.5" />
              </a>

              {/* Direct email */}
              <a
                href={`mailto:${PERSONAL.email}`}
                className="group inline-flex items-center gap-2 rounded-full border border-border-subtle bg-void/40 backdrop-blur-md px-5 py-3.5 font-mono text-xs text-muted hover:text-light hover:border-light/20 transition-all duration-300"
                aria-label="Send Email"
              >
                <Mail className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </div>

          {/* Bottom trigger for Warp speed closing credits */}
          <div className="flex flex-col items-center">
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.4 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onClick={handleWarpTrigger}
              className="font-mono text-[10px] tracking-[0.25em] text-star/60 hover:text-star uppercase transition-all duration-300 cursor-pointer"
            >
              [ LAUNCH WARP DRIVE ]
            </motion.button>
          </div>
        </div>
      </section>

      {/* Slide-out message transmitter control panel */}
      <TransmitterForm formOpen={formOpen} onClose={() => setFormOpen(false)} />

      {/* Cinematic Warp Speed Overlay & Ending Credits */}
      <AnimatePresence>
        {creditsVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-6"
          >
            {/* Cinematic scrolling credit layout */}
            <div className="text-center space-y-16 select-none max-w-xl mx-auto">
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
                  className="font-display text-2xl font-bold tracking-[0.2em] text-light uppercase leading-none"
                >
                  {PERSONAL.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1.2, duration: 1.2 }}
                  className="font-mono text-xs tracking-[0.35em] text-star uppercase"
                >
                  {PERSONAL.role}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2.2, duration: 1.5 }}
                className="font-mono text-[9px] tracking-widest text-muted space-y-2"
              >
                <p>SHIPPED PROTOTYPES: 50+</p>
                <p>SYSTEM UPTIME DIAGNOSTIC: 99.9%</p>
                <p>ORBIT COMPLETE</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 1 }}
              >
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 border border-border-subtle bg-void/50 rounded-full px-6 py-2.5 font-mono text-[10px] tracking-widest text-muted hover:text-star hover:border-star/30 transition-all duration-300 uppercase cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  Restart Voyage
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
