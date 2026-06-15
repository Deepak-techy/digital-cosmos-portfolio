"use client";

import { cn } from "@/lib/utils";

export default function GradientBlob({
  className,
  color = "star", // "star" | "aurora" | "mixed"
  size = "lg",    // "sm" | "md" | "lg"
}) {
  const colorMap = {
    star: "bg-star/10",
    aurora: "bg-aurora/10",
    mixed: "bg-gradient-to-br from-star/10 to-aurora/10",
  };

  const sizeMap = {
    sm: "w-[200px] h-[200px]",
    md: "w-[400px] h-[400px]",
    lg: "w-[600px] h-[600px]",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-[120px] animate-gradient-drift",
        colorMap[color],
        sizeMap[size],
        className
      )}
      aria-hidden="true"
    />
  );
}
