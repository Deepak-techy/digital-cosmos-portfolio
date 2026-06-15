"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export default function GlowCard({
  children,
  className,
  glowColor = "star",
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  const glowStyles = {
    star: "hover:border-star/30 hover:shadow-[0_0_30px_rgba(96,165,250,0.08)]",
    aurora:
      "hover:border-aurora/30 hover:shadow-[0_0_30px_rgba(167,139,250,0.08)]",
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "card-spotlight relative rounded-2xl border border-border-subtle bg-nebula/50 backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        glowStyles[glowColor],
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
