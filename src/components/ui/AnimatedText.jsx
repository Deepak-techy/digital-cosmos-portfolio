"use client";

import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  className = "",
  as = "h2",
  delay = 0,
  staggerDelay = 0.03,
  splitBy = "char", // "char" | "word"
}) {
  const Tag = as;
  const items = splitBy === "char" ? text.split("") : text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -60,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="inline-flex flex-wrap overflow-hidden"
        style={{ perspective: "600px" }}
      >
        {items.map((item, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block origin-bottom"
            style={{ transformStyle: "preserve-3d" }}
            aria-hidden="true"
          >
            {item === " " || (splitBy === "word" && i > 0) ? (
              <>
                {splitBy === "word" && i > 0 ? "\u00A0" : ""}
                {item}
              </>
            ) : (
              item
            )}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
