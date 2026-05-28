"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { slideUpFadeIn, EASING } from "../animations";

interface UseIntersectionAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  distance?: number;
  duration?: number;
  stagger?: number;
  enabled?: boolean;
  resetKey?: unknown;
}

/**
 * Animate elements when they enter the viewport (IntersectionObserver + Framer Motion).
 */
export function useIntersectionAnimation<T extends HTMLElement>(
  options: UseIntersectionAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -50px 0px",
    distance = 30,
    duration = 0.8,
    stagger = 0.15,
    enabled = true,
    resetKey,
  } = options;

  const elementsRef = useRef<(T | null)[]>([]);
  const animatedIds = useRef<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const playingRef = useRef<Map<number, ReturnType<typeof slideUpFadeIn>>>(
    new Map()
  );

  useEffect(() => {
    if (!enabled) return;

    const playingMap = playingRef.current;

    animatedIds.current.clear();
    playingMap.forEach((ctrl) => ctrl.stop());
    playingMap.clear();

    const elements = elementsRef.current.filter(Boolean) as T[];
    if (elements.length === 0) return;

    elements.forEach((element) => {
      const index = elements.indexOf(element);
      if (!animatedIds.current.has(index)) {
        animate(
          element,
          { opacity: 0, y: `${distance}px` },
          { duration: 0, ease: EASING.out }
        );
      }
    });

    if (observerRef.current) {
      elements.forEach((element) => observerRef.current?.unobserve(element));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as T;
            const elementIndex = elements.indexOf(element);

            if (!animatedIds.current.has(elementIndex)) {
              animatedIds.current.add(elementIndex);
              const controls = slideUpFadeIn(
                element,
                distance,
                duration,
                elementIndex * stagger
              );
              playingMap.set(elementIndex, controls);
              void controls.finished.then(() => {
                playingMap.delete(elementIndex);
              });
              observer.unobserve(element);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observerRef.current = observer;

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      elements.forEach((element) => observer.unobserve(element));
      observerRef.current = null;
      playingMap.forEach((ctrl) => ctrl.stop());
      playingMap.clear();
    };
  }, [enabled, threshold, rootMargin, distance, duration, stagger, resetKey]);

  return elementsRef;
}
