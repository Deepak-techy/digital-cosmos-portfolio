"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimationProvider({ children }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Bridge Lenis with GSAP ScrollTrigger
    const interval = setInterval(() => {
      if (window.__lenis) {
        window.__lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
          window.__lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        clearInterval(interval);
      }
    }, 100);

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(20); // Skip to end states
    }

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return children;
}
