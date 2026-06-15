"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function StarField() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const createStars = useCallback((width, height, count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      // Each star has a "birth" scroll threshold — when it begins to appear
      const birthThreshold = Math.random() * 0.6; // Stars appear between 0% - 60% scroll through hero
      const distFromCenter = Math.random(); // 0 = center, 1 = edge
      
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Stars originate from center, so store their offset from center
        originX: width / 2,
        originY: height / 2,
        radius: Math.random() * 1.8 + 0.2,
        baseOpacity: Math.random() * 0.8 + 0.15,
        twinkleSpeed: Math.random() * 0.015 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        birthThreshold,
        distFromCenter,
        // For the zoom expansion effect
        angle: Math.random() * Math.PI * 2,
        dist: 50 + Math.random() * Math.max(width, height) * 0.8,
      });
    }
    return stars;
  }, []);

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
      const count = isMobile ? 120 : 350;
      starsRef.current = createStars(width, height, count);
    }

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.body);

    function handleScroll() {
      // Calculate how far through the hero section we've scrolled (0 to 1+)
      const heroHeight = window.innerHeight * 3; // Hero section is 300vh
      targetScrollRef.current = Math.min(window.scrollY / heroHeight, 1);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let time = 0;
    let isVisible = true;

    function handleVisibility() {
      isVisible = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", handleVisibility);

    function draw() {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      // Smooth interpolation for the scroll value
      scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.08;
      const scroll = scrollRef.current;

      ctx.clearRect(0, 0, width, height);
      time += 1;

      const cx = width / 2;
      const cy = window.innerHeight / 2;

      for (const star of starsRef.current) {
        // Star visibility: fades in based on scroll position and its birth threshold
        const scrollBeyondBirth = Math.max(0, scroll - star.birthThreshold * 0.3);
        const starVisibility = Math.min(scrollBeyondBirth / 0.25, 1);

        if (starVisibility <= 0) continue;

        // Zoom expansion: stars move outward from center as user scrolls
        const zoomFactor = 1 + scroll * 1.5;
        const dx = star.x - cx;
        const dy = star.y - cy;
        const expandedX = cx + dx * zoomFactor;
        const expandedY = cy + dy * zoomFactor;

        // Twinkle
        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
        const alpha = star.baseOpacity * (0.4 + twinkle * 0.6) * starVisibility;

        if (alpha < 0.01) continue;

        // Draw star
        ctx.beginPath();
        ctx.arc(expandedX, expandedY, star.radius * (0.6 + starVisibility * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Subtle blue glow on brighter/larger stars
        if (star.radius > 1.2 && starVisibility > 0.5) {
          ctx.beginPath();
          ctx.arc(expandedX, expandedY, star.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha * 0.06})`;
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      resizeObserver.disconnect();
    };
  }, [createStars, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
