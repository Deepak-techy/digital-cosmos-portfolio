import { useRef, useCallback } from "react";
import { useAudio } from "@/components/providers/AudioProvider";

/**
 * Returns event handler props to add hover sounds to elements.
 * Includes a debounce to prevent rapid-fire when hovering across lists.
 *
 * @param {string} soundName - Name of the sound method on CosmicSoundEngine
 * @param {number} [debounceMs=60] - Minimum ms between sounds
 * @returns {{ onMouseEnter: Function }} Props to spread on the element
 */
export function useHoverSound(soundName, debounceMs = 60) {
  const { playSound, isEnabled, isMuted } = useAudio();
  const lastPlayed = useRef(0);

  const onMouseEnter = useCallback(() => {
    if (!isEnabled || isMuted) return;
    const now = Date.now();
    if (now - lastPlayed.current < debounceMs) return;
    lastPlayed.current = now;
    playSound(soundName);
  }, [soundName, debounceMs, playSound, isEnabled, isMuted]);

  return { onMouseEnter };
}
