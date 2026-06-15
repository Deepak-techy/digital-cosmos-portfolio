"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function ScrollProgress() {
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    function handleScroll() {
      // Only show after the hero section
      setVisible(window.scrollY > window.innerHeight * 2.2);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left"
          style={{
            scaleX,
            background: "linear-gradient(90deg, #60A5FA, #A78BFA)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
