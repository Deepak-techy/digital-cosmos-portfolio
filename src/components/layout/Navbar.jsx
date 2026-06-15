"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_ITEMS, PERSONAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const heroEnd = window.innerHeight * 2.2; // ~73% through the 300vh hero
      const pastHero = window.scrollY > heroEnd;
      setVisible(pastHero);
      setScrolled(window.scrollY > heroEnd + 100);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSection(e, href) {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.header
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
              scrolled
                ? "bg-void/80 backdrop-blur-xl border-b border-border-subtle/50"
                : "bg-void/60 backdrop-blur-lg"
            )}
          >
            <nav className="section-container flex h-20 items-center justify-between">
              {/* Logo */}
              <a
                href="#hero"
                onClick={(e) => scrollToSection(e, "#hero")}
                className="font-display text-lg font-semibold tracking-tight text-light transition-colors hover:text-star"
              >
                DIGITAL{" "}
                <span className="text-star">COSMOS</span>
              </a>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.sectionId}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="relative px-4 py-2 font-mono text-xs tracking-widest uppercase text-muted transition-colors hover:text-light group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-star transition-all duration-300 group-hover:w-3/4" />
                  </a>
                ))}
                <div className="ml-4 h-5 w-px bg-border-subtle" />
                <a
                  href={PERSONAL.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-4 inline-flex items-center gap-1.5 rounded-full border border-star/30 bg-star/5 px-5 py-2 font-mono text-xs tracking-wide text-star transition-all duration-300 hover:bg-star/15 hover:border-star/50 hover:shadow-[0_0_20px_rgba(96,165,250,0.15)]"
                >
                  Resume
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>

              {/* Mobile Toggle */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="relative z-50 md:hidden p-2 text-muted hover:text-light transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-2xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex h-full flex-col items-center justify-center gap-8"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.sectionId}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="font-display text-3xl font-semibold text-light/80 transition-colors hover:text-star"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={PERSONAL.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-star/30 bg-star/10 px-8 py-3 font-mono text-sm text-star"
              >
                Resume
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
