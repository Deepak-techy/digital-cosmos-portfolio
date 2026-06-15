"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import { SKILLS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

function SkillCard({ skill, index }) {
  const IconComponent = LucideIcons[skill.icon] || LucideIcons.Code2;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "group relative rounded-2xl border border-border-subtle p-8 backdrop-blur-sm",
        "transition-all duration-500",
        "hover:-translate-y-1",
        isEven
          ? "bg-nebula/30 hover:border-star/25 hover:shadow-[0_8px_40px_rgba(96,165,250,0.06)]"
          : "bg-nebula/20 hover:border-aurora/25 hover:shadow-[0_8px_40px_rgba(167,139,250,0.06)]"
      )}
    >
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className={cn(
            "inline-flex items-center justify-center rounded-xl border p-3 transition-all duration-300",
            isEven
              ? "border-star/20 bg-star/5 text-star group-hover:border-star/40 group-hover:shadow-[0_0_15px_rgba(96,165,250,0.15)]"
              : "border-aurora/20 bg-aurora/5 text-aurora group-hover:border-aurora/40 group-hover:shadow-[0_0_15px_rgba(167,139,250,0.15)]"
          )}
        >
          <IconComponent className="h-5 w-5" />
        </div>
        <h3 className="font-display text-xl font-semibold text-light">
          {skill.category}
        </h3>
      </div>

      {/* Skills list */}
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => (
          <motion.span
            key={item}
            whileHover={{ scale: 1.05 }}
            className={cn(
              "inline-flex items-center rounded-lg border px-3 py-1.5 font-mono text-xs transition-all duration-300 cursor-default",
              isEven
                ? "border-border-subtle bg-void/50 text-muted hover:border-star/30 hover:text-star hover:bg-star/5"
                : "border-border-subtle bg-void/50 text-muted hover:border-aurora/30 hover:text-aurora hover:bg-aurora/5"
            )}
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative section-padding overflow-hidden">
      <GradientBlob
        color="mixed"
        size="lg"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-8"
      />

      <div className="section-container">
        <SectionLabel number="08" title="NEBULA" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight">
            Inside the
            <span className="bg-gradient-to-r from-star to-aurora bg-clip-text text-transparent">
              {" "}Nebula
            </span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            A nebula of technologies, each one mastered through real-world application. 
            These are the tools I reach for when building systems that matter.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((skill, i) => (
            <SkillCard key={skill.category} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
