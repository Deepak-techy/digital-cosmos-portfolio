"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle/50">
      <div className="section-container py-12">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-star/30 to-transparent origin-center"
        />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Copyright */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="font-display text-sm font-semibold text-light/60">
              DIGITAL <span className="text-star/60">COSMOS</span>
            </span>
            <span className="font-mono text-xs text-muted/50">
              © {year} {PERSONAL.name}. All rights reserved.
            </span>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2 font-mono text-xs text-muted/50 hover:text-star transition-colors duration-300"
          >
            Back to origin
            <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
