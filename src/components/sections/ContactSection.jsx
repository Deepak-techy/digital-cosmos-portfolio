"use client";

import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import MagneticButton from "@/components/ui/MagneticButton";
import GradientBlob from "@/components/ui/GradientBlob";
import AnimatedText from "@/components/ui/AnimatedText";
import { PERSONAL } from "@/lib/constants";
import { fadeUp, staggerContainer } from "@/lib/animations";

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialLinks = [
  { icon: GithubIcon, label: "GitHub", href: PERSONAL.socials.github },
  { icon: LinkedinIcon, label: "LinkedIn", href: PERSONAL.socials.linkedin },
  { icon: XIcon, label: "Twitter / X", href: PERSONAL.socials.twitter },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative section-padding overflow-hidden">
      <GradientBlob
        color="star"
        size="lg"
        className="top-1/3 left-1/2 -translate-x-1/2 opacity-10"
      />
      <GradientBlob
        color="aurora"
        size="md"
        className="bottom-0 right-0 opacity-10"
      />

      {/* Background radial pulse */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-star-pulse" style={{ animationDuration: "4s" }}>
          <div className="h-[400px] w-[400px] rounded-full bg-star/3 blur-[100px] md:h-[600px] md:w-[600px]" />
        </div>
      </div>

      <div className="section-container relative z-10">
        <SectionLabel number="08" title="SIGNAL" />

        <div className="text-center max-w-3xl mx-auto">
          {/* Heading */}
          <AnimatedText
            text="Let's build something extraordinary."
            as="h2"
            className="font-display text-4xl font-bold text-light mb-8 md:text-5xl lg:text-6xl tracking-tight leading-tight"
            splitBy="word"
            staggerDelay={0.1}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg text-muted leading-relaxed mb-14 md:text-xl max-w-xl mx-auto"
          >
            Have a project in mind, a team to build, or just want to explore
            possibilities? Send a signal — I&apos;m listening.
          </motion.p>

          {/* Email CTA */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div variants={fadeUp}>
              <MagneticButton href={`mailto:${PERSONAL.email}`}>
                <Mail className="h-4 w-4" />
                {PERSONAL.email}
              </MagneticButton>
            </motion.div>

            {/* Divider */}
            <motion.div variants={fadeUp} className="flex items-center gap-4 w-full max-w-xs">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border-subtle" />
              <span className="font-mono text-xs text-muted/50">OR</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border-subtle" />
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-full border border-border-subtle bg-nebula/30 px-5 py-2.5 font-mono text-xs text-muted transition-all duration-300 hover:border-star/30 hover:text-star hover:bg-star/5 hover:shadow-[0_0_20px_rgba(96,165,250,0.1)]"
                    aria-label={`Visit ${social.label}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {social.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
