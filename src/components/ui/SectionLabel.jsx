"use client";

import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function SectionLabel({ number, title }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className="mb-16 flex items-center gap-4"
    >
      <span className="font-mono text-sm tracking-widest text-star/70">
        // {number}
      </span>
      <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-star/50 to-transparent" />
      <span className="font-mono text-sm tracking-[0.25em] uppercase text-muted">
        {title}
      </span>
    </motion.div>
  );
}
