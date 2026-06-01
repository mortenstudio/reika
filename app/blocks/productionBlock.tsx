"use client";

import type { ProductionBlock as ProductionBlockData, ProductionPhase } from "../../types";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Pill from "../components/Pill";

function ProductionPhaseCard({ phase }: { phase: ProductionPhase }) {
  return (
    <article className="relative flex w-[77vw] md:w-[31.5vw] shrink-0 flex-col py-4 bg-white">
      <div className="bg-[#E8F7FF] rounded-md p-4 md:p-6 lg:p-8 flex flex-col gap-4 md:gap-6 lg:gap-8 aspect-square w-full">
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-xs md:text-sm lg:text-base">{phase.title}</h3>
          {phase.duration ? (
            <Pill variant="blue">{phase.duration}</Pill>
          ) : null}
        </div>

        <div className="text-xs md:text-sm lg:text-base flex-1">
          {phase.description}
        </div>

        {phase.features && phase.features.length > 0 && (
          <ul className="list-disc text-xs md:text-sm lg:text-base flex flex-col gap-1">
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
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    setScrollRange(track.scrollWidth);
    setViewportWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    measure();

    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const distance = Math.max(0, scrollRange - viewportWidth);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      className="relative my-30 md:my-40 lg:my-50 xl:my-60"
      style={{ height: `calc(100vh + ${distance}px)` }}
      aria-label={heading}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="mx-4 mb-8">
          <div className="flex flex-col gap-8 lg:w-3/4">
            <div className="bg-white py-4 w-fit">
              {heading ? (
                <Pill variant="green">{heading}</Pill>
              ) : null}
            </div>
            <div className="bg-white py-4">
              {subheading ? (
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  {subheading}
                </h2>
              ) : null}
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          className="flex gap-8 px-4 will-change-transform"
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
    </section>
  );
}

interface ProductionBlockProps {
  data?: Omit<ProductionBlockData, "_type" | "_key">;
}

export default function ProductionBlock({ data }: ProductionBlockProps) {
  const phases: ProductionPhase[] = data?.phases;
  const heading = data?.heading;
  const subheading = data?.subheading;

  return (
    <ProductionBlockView
      phases={phases}
      heading={heading}
      subheading={subheading}
    />
  );
}
