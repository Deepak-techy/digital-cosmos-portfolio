"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "primary", // "primary" | "secondary" | "ghost"
  ...props
}) {
  const buttonRef = useRef(null);

  function handleMouseMove(e) {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }

  function handleMouseLeave() {
    const btn = buttonRef.current;
    if (btn) btn.style.transform = "translate(0, 0)";
  }

  const variants = {
    primary: [
      "bg-star/10 border-star/30 text-star",
      "hover:bg-star/20 hover:border-star/50 hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]",
    ].join(" "),
    secondary: [
      "bg-aurora/10 border-aurora/30 text-aurora",
      "hover:bg-aurora/20 hover:border-aurora/50 hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]",
    ].join(" "),
    ghost: [
      "bg-transparent border-border-subtle text-muted",
      "hover:border-light/20 hover:text-light",
    ].join(" "),
  };

  const classes = cn(
    "relative inline-flex items-center gap-2 rounded-full border px-7 py-3",
    "font-mono text-sm tracking-wide transition-all duration-500 ease-out",
    "cursor-pointer select-none",
    variants[variant],
    className
  );

  const inner = (
    <motion.span
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      {inner}
    </button>
  );
}
