"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollAndAnimationProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // 3. Connect Lenis scroll event to ScrollTrigger update
    lenis.on("scroll", ScrollTrigger.update);

    // 4. Drive Lenis via GSAP ticker (only one animation frame loop)
    const tickHandler = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickHandler);
    gsap.ticker.lagSmoothing(0);

    // 5. Expose lenis to window for backward compatibility/global access
    window.__lenis = lenis;

    // 6. Handle reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(20);
    }

    return () => {
      gsap.ticker.remove(tickHandler);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return children;
}
