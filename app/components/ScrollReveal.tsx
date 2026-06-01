"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASING } from "../lib/animations";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  delay?: number;
  as?: "div" | "figure" | "footer";
}

const MotionDiv = motion.div;
const MotionFigure = motion.figure;
const MotionFooter = motion.footer;

const components = {
  div: MotionDiv,
  figure: MotionFigure,
  footer: MotionFooter,
} as const;

export default function ScrollReveal({
  children,
  className,
  distance = 30,
  duration = 0.8,
  delay = 0,
  as = "div",
}: ScrollRevealProps) {
  const Component = components[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration, delay, ease: EASING.out }}
    >
      {children}
    </Component>
  );
}
