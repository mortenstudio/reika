"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { StepItem, StepsBlock as StepsBlockData } from "../../types";
import { sanityImageSrc } from "../lib/sanity-image";
import { useHorizontalScrollSection } from "../lib/use-horizontal-scroll-section";

interface StepsBlockProps {
  data?: Omit<StepsBlockData, "_type" | "_key">;
}

function StepSlide({ step, index }: { step: StepItem; index: number }) {
  const imageSrc = sanityImageSrc(step.image);

  return (
    <article className="grid grid-cols-6 gap-8 items-start md:grid-cols-12">
      <div className="col-span-6 md:col-span-1">
        <span className="inline-block bg-white py-2 font-mono text-3xl opacity-40 md:text-4xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="col-span-6 flex flex-col gap-4 bg-white py-4 md:col-span-5">
        <h3 className="text-xs md:text-sm lg:text-base">{step.title}</h3>
        <p className="text-xs md:text-sm lg:text-base whitespace-pre-wrap opacity-80">
          {step.description}
        </p>
      </div>
      {imageSrc ? (
        <div className="col-span-6 md:col-span-6">
          <div className="aspect-video w-full overflow-hidden rounded-md bg-black/5">
            <Image
              src={imageSrc}
              alt={step.title}
              width={960}
              height={540}
              className="h-full w-full object-cover select-none"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      ) : null}
    </article>
  );
}

function StepsVerticalList({
  heading,
  steps,
}: {
  heading?: string;
  steps: StepItem[];
}) {
  return (
    <section>
      <div className="mx-4 grid grid-cols-6 md:grid-cols-12 gap-8 my-30 md:my-40 lg:my-50 xl:my-60">
        {heading ? (
          <div className="col-span-6 md:col-span-12">
            <h2 className="w-fit bg-white py-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
              {heading}
            </h2>
          </div>
        ) : null}
        <div className="col-span-6 flex flex-col gap-12 md:col-span-12">
          {steps.map((step, index) => (
            <StepSlide key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepsHorizontalScroll({
  heading,
  steps,
}: {
  heading?: string;
  steps: StepItem[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState<number | undefined>(undefined);
  const { sectionRef, x, scrollDistance } = useHorizontalScrollSection(
    trackRef,
    viewportRef,
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const measure = () => setSlideWidth(viewport.clientWidth);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `calc(100svh + ${scrollDistance}px)` }}
      aria-label={heading ?? "Steps"}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {heading ? (
          <div className="absolute inset-x-0 top-0 z-10 mx-4 pt-8 md:pt-12">
            <h2 className="w-fit bg-white py-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
              {heading}
            </h2>
          </div>
        ) : null}
        <div
          ref={viewportRef}
          className="flex h-full items-center overflow-hidden px-4"
        >
          <motion.div
            ref={trackRef}
            className="flex items-center gap-12"
            style={{ x }}
          >
            {steps.map((step, index) => (
              <div
                key={index}
                className="shrink-0"
                style={{ width: slideWidth }}
              >
                <StepSlide step={step} index={index} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function StepsBlock({ data }: StepsBlockProps) {
  const steps = data?.steps ?? [];
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!steps.length) return null;

  const heading = data?.heading;

  if (prefersReducedMotion || steps.length === 1) {
    return <StepsVerticalList heading={heading} steps={steps} />;
  }

  return <StepsHorizontalScroll heading={heading} steps={steps} />;
}
