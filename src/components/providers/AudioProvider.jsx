"use client";

import { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";
import { CosmicSoundEngine } from "@/lib/CosmicSoundEngine";

// ─────────────────────────────────────────────────────────────
// Audio Context
// ─────────────────────────────────────────────────────────────

const AudioContext = createContext(null);

const LS_MUTED_KEY = "cosmos-audio-muted";
const LS_VOLUME_KEY = "cosmos-audio-volume";

export function AudioProvider({ children }) {
  const engineRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.5);

  // Restore preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedMuted = localStorage.getItem(LS_MUTED_KEY);
      const savedVolume = localStorage.getItem(LS_VOLUME_KEY);
      if (savedVolume !== null) {
        setVolumeState(parseFloat(savedVolume));
      }
      if (savedMuted === "true") {
        setIsMuted(true);
      } else if (savedMuted === "false") {
        setIsMuted(false);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Lazy engine creation
  const getEngine = useCallback(() => {
    if (!engineRef.current) {
      engineRef.current = new CosmicSoundEngine();
    }
    return engineRef.current;
  }, []);

  // Enable audio manually if needed
  const enable = useCallback(async () => {
    const engine = getEngine();
    await engine.resume();

    let savedVol = 0.5;
    try {
      const sv = localStorage.getItem(LS_VOLUME_KEY);
      if (sv !== null) savedVol = parseFloat(sv);
    } catch { /* */ }

    engine.setVolume(savedVol);
    engine.setMuted(false);
    setVolumeState(savedVol);
    setIsEnabled(true);
    setIsMuted(false);

    engine.startAmbience();

    try {
      localStorage.setItem(LS_MUTED_KEY, "false");
    } catch { /* */ }
  }, [getEngine]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const engine = getEngine();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    engine.setMuted(newMuted);

    if (!newMuted) {
      engine.resume().then(() => {
        engine.startAmbience();
      });
    }

    try {
      localStorage.setItem(LS_MUTED_KEY, String(newMuted));
    } catch { /* */ }
  }, [isMuted, getEngine]);

  // Set volume
  const setVolume = useCallback((v) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    const engine = getEngine();
    engine.setVolume(clamped);

    try {
      localStorage.setItem(LS_VOLUME_KEY, String(clamped));
    } catch { /* */ }
  }, [getEngine]);

  // Play a named sound
  const playSound = useCallback((soundName) => {
    if (isMuted) return;
    const engine = getEngine();
    if (typeof engine[soundName] === "function") {
      const ctx = engine._ensureContext();
      console.log(`[AudioProvider] Playing sound: ${soundName}. Context state: ${ctx ? ctx.state : 'null'}`);
      engine[soundName]();
    }
  }, [isMuted, getEngine]);

  // Global user interaction listener to trigger audio playback (autoplay workaround)
  useEffect(() => {
    let started = false;
    
    const initAudioOnGesture = async () => {
      if (started || isMuted) return;
      
      try {
        const engine = getEngine();
        await engine.resume();
        
        // Apply saved volume/mute settings
        let savedVol = 0.5;
        try {
          const sv = localStorage.getItem(LS_VOLUME_KEY);
          if (sv !== null) savedVol = parseFloat(sv);
        } catch { /* */ }
        
        engine.setVolume(savedVol);
        engine.setMuted(false);
        engine.startAmbience();
        
        started = true;
        
        // Remove event listeners
        cleanupListeners();
      } catch (e) {
        console.warn("Failed to initialize audio on user gesture:", e);
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", initAudioOnGesture);
      window.removeEventListener("keydown", initAudioOnGesture);
      window.removeEventListener("scroll", initAudioOnGesture);
      window.removeEventListener("touchstart", initAudioOnGesture);
    };

    // Only attach if user hasn't explicitly muted
    if (!isMuted) {
      window.addEventListener("click", initAudioOnGesture);
      window.addEventListener("keydown", initAudioOnGesture);
      window.addEventListener("scroll", initAudioOnGesture);
      window.addEventListener("touchstart", initAudioOnGesture);
    }

    return () => {
      cleanupListeners();
    };
  }, [getEngine, isMuted]);

  // Global interaction sound effects (delegation)
  useEffect(() => {
    let lastHoveredEl = null;

    const handleMouseOver = (e) => {
      if (isMuted) return;
      const target = e.target;
      if (!target) return;

      const interactiveEl = target.closest("button, a, [role='button'], .cursor-pointer, input[type='button'], input[type='submit']");
      if (interactiveEl) {
        if (lastHoveredEl === interactiveEl) return;
        lastHoveredEl = interactiveEl;
        playSound("hoverTick");
      } else {
        lastHoveredEl = null;
      }
    };

    const handleClick = (e) => {
      if (isMuted) return;
      const target = e.target;
      if (!target) return;

      const interactiveEl = target.closest("button, a, [role='button'], .cursor-pointer, input[type='button'], input[type='submit']");
      if (interactiveEl) {
        playSound("uiClick");
      }
    };

    // Attach listeners
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("click", handleClick);
    };
  }, [isMuted, playSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (engineRef.current) {
        engineRef.current.dispose();
        engineRef.current = null;
      }
    };
  }, []);

  return (
    <AudioContext value={{
      isEnabled,
      isMuted,
      volume,
      enable,
      toggleMute,
      setVolume,
      playSound,
      engine: engineRef,
    }}>
      {children}
    </AudioContext>
  );
}

// ─────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    return {
      isEnabled: false,
      isMuted: true,
      volume: 0,
      enable: () => {},
      toggleMute: () => {},
      setVolume: () => {},
      playSound: () => {},
      engine: { current: null },
    };
  }
  return ctx;
}
