"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

export function useHorizontalScrollSection(
  trackRef: RefObject<HTMLDivElement | null>,
  viewportRef: RefObject<HTMLElement | null>,
) {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const measure = () => {
      setScrollDistance(
        Math.max(0, track.scrollWidth - viewport.clientWidth),
      );
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [trackRef, viewportRef]);

  return { sectionRef, x, scrollDistance };
}
