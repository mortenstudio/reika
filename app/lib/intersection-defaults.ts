/**
 * Shared defaults for scroll-into-view reveal animations (IntersectionObserver + Framer Motion).
 */
export const SCROLL_REVEAL = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
  distance: 30,
  duration: 0.8,
  stagger: 0.15,
} as const;
