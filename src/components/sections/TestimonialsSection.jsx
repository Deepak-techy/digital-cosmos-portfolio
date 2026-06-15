"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import GradientBlob from "@/components/ui/GradientBlob";
import { TESTIMONIALS } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="group relative rounded-2xl border border-border-subtle bg-nebula/20 p-8 transition-all duration-500 hover:border-aurora/20 hover:bg-nebula/40 backdrop-blur-sm md:p-10"
    >
      {/* Signal indicator */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-aurora/60 animate-star-twinkle" style={{ animationDelay: "0s" }} />
          <div className="h-1.5 w-1.5 rounded-full bg-aurora/40 animate-star-twinkle" style={{ animationDelay: "0.3s" }} />
          <div className="h-1.5 w-1.5 rounded-full bg-aurora/20 animate-star-twinkle" style={{ animationDelay: "0.6s" }} />
        </div>
        <span className="font-mono text-[10px] tracking-widest text-aurora/40 uppercase">
          Transmission received
        </span>
      </div>

      {/* Quote */}
      <div className="relative">
        <Quote className="absolute -top-1 -left-1 h-8 w-8 text-aurora/10" />
        <p className="relative z-10 text-lg leading-relaxed text-light/80 italic pl-4 md:text-xl">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="mt-8 flex items-center gap-4">
        {/* Avatar placeholder */}
        <div className="h-10 w-10 rounded-full border border-aurora/20 bg-aurora/5 flex items-center justify-center">
          <span className="font-display text-sm font-semibold text-aurora">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-light">
            {testimonial.name}
          </p>
          <p className="font-mono text-xs text-muted">
            {testimonial.title} @ {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative section-padding overflow-hidden"
    >
      <GradientBlob
        color="aurora"
        size="md"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-8"
      />

      <div className="section-container">
        <SectionLabel number="11" title="TRANSMISSIONS" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="mb-20 max-w-2xl"
        >
          <h2 className="font-display text-4xl font-bold text-light mb-6 md:text-5xl lg:text-6xl tracking-tight">
            Incoming
            <span className="text-aurora"> Transmissions</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed md:text-xl">
            Signals received from those I&apos;ve had the privilege of working
            alongside — transmissions from across the digital cosmos.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
