import { useEffect, useRef } from "react";
import { useAudio } from "@/components/providers/AudioProvider";

/**
 * Play a sound once when a section scrolls into view.
 *
 * @param {string} soundName - Name of the sound method on CosmicSoundEngine
 * @param {React.RefObject} sectionRef - Ref to the section DOM element
 * @param {Object} [options]
 * @param {number} [options.threshold=0.3] - IntersectionObserver threshold
 */
export function useSectionSound(soundName, sectionRef, options = {}) {
  const { playSound, isEnabled, isMuted } = useAudio();
  const hasFired = useRef(false);
  const { threshold = 0.3 } = options;

  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;

    // Reset fire state when audio gets re-enabled after being disabled
    // (but don't reset on every render)

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasFired.current && isEnabled && !isMuted) {
          hasFired.current = true;
          playSound(soundName);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [soundName, sectionRef, threshold, playSound, isEnabled, isMuted]);
}
