import { animate } from "framer-motion";

/** Durations in seconds */
export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.3,
    normal: 0.8,
    slow: 1,
  },
  stagger: {
    fast: 0.1,
    normal: 0.15,
    slow: 0.2,
  },
} as const;

/** Approximates GSAP power easing for tweens */
export const EASING = {
  out: [0.22, 1, 0.36, 1] as [number, number, number, number],
  in: [0.7, 0, 0.84, 0] as [number, number, number, number],
  smooth: [0.33, 1, 0.68, 1] as [number, number, number, number],
};

/**
 * Slide up and crossfade (element should be visible in DOM; animates from hidden state).
 */
export function slideUpFadeIn(
  element: Element,
  distance: number = 30,
  duration: number = ANIMATION_CONFIG.duration.normal,
  delay: number = 0
): ReturnType<typeof animate> {
  return animate(
    element,
    { opacity: [0, 1], y: [`${distance}px`, 0] },
    {
      duration,
      delay,
      ease: EASING.out,
    }
  );
}
