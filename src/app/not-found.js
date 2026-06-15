"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void">
      <div className="text-center section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center">
            <div className="animate-star-pulse">
              <div className="h-40 w-40 rounded-full bg-star/10 blur-[60px]" />
            </div>
            <span className="absolute font-display text-[8rem] font-bold text-light/10">
              404
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-3xl font-bold text-light mb-4 md:text-4xl"
        >
          Lost in the cosmos
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-muted mb-10 text-lg"
        >
          This star doesn&apos;t exist in our universe — yet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <MagneticButton href="/">
            <ArrowLeft className="h-4 w-4" />
            Return to Origin
          </MagneticButton>
        </motion.div>
      </div>
    </div>
  );
}
