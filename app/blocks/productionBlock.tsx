"use client";

import type { ProductionBlock as ProductionBlockData, ProductionPhase } from "../../types";
import {
  DEFAULT_PRODUCTION_PHASES,
  DEFAULT_PRODUCTION_HEADING,
  DEFAULT_PRODUCTION_SUBHEADING,
} from "../lib/constants";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASING } from "../lib/animations";

function ProductionPhaseCard({ phase }: { phase: ProductionPhase }) {
  return (
    <article className="relative flex w-5/6 md:w-[calc(33.333%-1.33rem)] shrink-0 flex-col py-4 bg-white">
      <div className="bg-[#E8F7FF] rounded-md p-4 md:p-5 lg:p-6 flex flex-col aspect-square w-full">
        <div className="flex justify-between items-start w-full mb-4 gap-2">
          <h3 className="text-base md:text-lg leading-tight flex-1">{phase.title}</h3>
          {phase.duration && (
            <div className="select-none text-xs font-mono uppercase bg-[#B2DDF4] text-black text-center rounded-full px-2.5 py-1">
              <span>{phase.duration}</span>
            </div>
          )}
        </div>

        <div className="text-md md:text-lg leading-tight flex-1 opacity-66 mb-3">
          {phase.description}
        </div>

        {phase.features && phase.features.length > 0 && (
          <ul className="list-disc text-xs md:text-sm">
            {phase.features.map((feature, featureIndex) => (
              <li key={featureIndex} className="ml-3 pl-1">
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

interface ProductionBlockViewProps {
  phases: ProductionPhase[];
  heading: string;
  subheading: string;
}

function ProductionBlockView({
  phases,
  heading,
  subheading,
}: ProductionBlockViewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [stickyTop, setStickyTop] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  useEffect(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!track || !viewport || !content) return;

    const measure = () => {
      setScrollDistance(Math.max(0, track.scrollWidth - viewport.clientWidth));
      const contentHeight = content.offsetHeight;
      setStickyTop(Math.max(0, (window.innerHeight - contentHeight) / 2));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    observer.observe(viewport);
    observer.observe(content);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100svh + ${scrollDistance}px)` }}
      aria-label={heading}
    >
      <div
        ref={contentRef}
        className="sticky flex flex-col"
        style={{ top: stickyTop }}
      >
        <div className="mx-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: EASING.out }}
          >
            <div className="bg-white py-2 md:py-4 mb-4 md:mb-8 w-fit">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight mb-2 md:mb-4">
                {heading}
              </h2>
              {subheading ? (
                <p className="text-base md:text-lg leading-snug opacity-70 max-w-3xl">
                  {subheading}
                </p>
              ) : null}
            </div>
          </motion.div>
        </div>

        <div ref={viewportRef} className="overflow-hidden mx-4">
          <motion.div
            ref={trackRef}
            className="flex gap-8"
            style={{ x }}
          >
            {phases.map((phase, index) => (
              <ProductionPhaseCard
                key={`${phase.title}-${index}`}
                phase={phase}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ProductionBlockProps {
  data?: Omit<ProductionBlockData, "_type" | "_key">;
}

export default function ProductionBlock({ data }: ProductionBlockProps) {
  const phases: ProductionPhase[] = data?.phases || DEFAULT_PRODUCTION_PHASES;
  const heading = data?.heading || DEFAULT_PRODUCTION_HEADING;
  const subheading = data?.subheading || DEFAULT_PRODUCTION_SUBHEADING;

  return (
    <ProductionBlockView
      phases={phases}
      heading={heading}
      subheading={subheading}
    />
  );
}
