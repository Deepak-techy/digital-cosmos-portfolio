"use client";

import { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/components/providers/AudioProvider";

// ─────────────────────────────────────────────────────────────
// Animated Sound Wave Bars (visual indicator)
// ─────────────────────────────────────────────────────────────

const SoundWaveBars = memo(function SoundWaveBars({ active }) {
  const bars = [
    { height: active ? 12 : 3, delay: 0 },
    { height: active ? 16 : 3, delay: 0.15 },
    { height: active ? 10 : 3, delay: 0.3 },
  ];

  return (
    <div className="flex items-end gap-[2px] h-4 w-4 justify-center" aria-hidden="true">
      {bars.map((bar, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-current origin-bottom"
          animate={{
            height: active
              ? [bar.height * 0.4, bar.height, bar.height * 0.6, bar.height * 0.9, bar.height * 0.4]
              : 3,
          }}
          transition={
            active
              ? {
                  duration: 1.2,
                  delay: bar.delay,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
});

// ─────────────────────────────────────────────────────────────
// Muted Icon (speaker with slash)
// ─────────────────────────────────────────────────────────────

function MutedIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Controller
// ─────────────────────────────────────────────────────────────

export default memo(function AudioController() {
  const { isEnabled, isMuted, volume, enable, toggleMute, setVolume } = useAudio();
  const [expanded, setExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const collapseTimer = useRef(null);
  const containerRef = useRef(null);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Auto-collapse after leaving hover
  const handleMouseEnter = useCallback(() => {
    if (collapseTimer.current) {
      clearTimeout(collapseTimer.current);
      collapseTimer.current = null;
    }
    if (isEnabled) setExpanded(true);
  }, [isEnabled]);

  const handleMouseLeave = useCallback(() => {
    collapseTimer.current = setTimeout(() => setExpanded(false), 800);
  }, []);

  // Handle main button click
  const handleClick = useCallback(() => {
    if (!isEnabled) {
      enable();
    } else {
      toggleMute();
    }
  }, [isEnabled, enable, toggleMute]);

  // Handle volume slider
  const handleVolumeChange = useCallback((e) => {
    setVolume(parseFloat(e.target.value));
  }, [setVolume]);

  // Determine visual state
  const isPlaying = isEnabled && !isMuted;

  // Build the label for accessibility
  const label = !isEnabled
    ? "Enable audio experience"
    : isMuted
      ? "Unmute audio"
      : "Mute audio";

  return (
    <div
      ref={containerRef}
      className="fixed top-6 right-6 z-[100] flex items-center gap-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        layout
        className="flex items-center rounded-full border border-border-subtle/50 bg-void/70 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.4)]"
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Volume slider (expanded state only) */}
        <AnimatePresence>
          {expanded && isEnabled && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 100, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden flex items-center pl-4 pr-1"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="audio-volume-slider w-full"
                aria-label="Volume level"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main toggle button */}
        <button
          type="button"
          onClick={handleClick}
          className="relative flex items-center justify-center h-10 w-10 rounded-full text-muted hover:text-star transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-star/40 focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          aria-label={label}
          title={label}
        >
          {/* Invite pulse when audio is not yet enabled */}
          {!isEnabled && (
            <motion.span
              className="absolute inset-0 rounded-full border border-star/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              aria-hidden="true"
            />
          )}

          {/* Icon */}
          {isPlaying ? (
            <SoundWaveBars active={!prefersReducedMotion} />
          ) : (
            <MutedIcon />
          )}
        </button>
      </motion.div>
    </div>
  );
});
