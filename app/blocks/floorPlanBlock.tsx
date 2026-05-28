"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type {
  FloorPlanBlock as FloorPlanBlockData,
  FloorPlanBlockItem,
} from "../../types";
import { sanityImageSrc } from "../lib/sanity-image";
import { EASING } from "../lib/animations";

function FloorPlanCard({
  item,
  index,
  heading,
}: {
  item: FloorPlanBlockItem;
  index: number;
  heading?: string;
}) {
  const src = sanityImageSrc(item.image);
  if (!src) return null;

  return (
    <figure className="relative flex w-full md:w-[calc(42%-1.5rem)] shrink-0 flex-col gap-3 py-4 bg-white">
      <div className="w-full rounded-md overflow-hidden bg-[#E8F7FF] p-6 md:p-12">
        <Image
          src={src}
          alt={
            item.alt || item.caption || heading || `Floor plan ${index + 1}`
          }
          width={1280}
          height={960}
          className="object-contain w-full h-auto mix-blend-multiply"
          sizes="(max-width: 768px) 83vw, 33vw"
        />
      </div>
      {item.caption ? (
        <figcaption className="text-sm md:text-base opacity-70">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

interface FloorPlanBlockViewProps {
  floorPlans: FloorPlanBlockItem[];
  heading?: string;
}

function FloorPlanBlockView({ floorPlans, heading }: FloorPlanBlockViewProps) {
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
      className="relative pt-16 md:pt-24"
      style={{ height: `calc(100svh + ${scrollDistance}px)` }}
      aria-label={heading ?? "Floor plans"}
    >
      <div
        ref={contentRef}
        className="sticky flex flex-col"
        style={{ top: stickyTop }}
      >
        <div className="mx-4">
          {heading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: EASING.out }}
            >
              <div className="bg-white py-2 md:py-4 mb-4 md:mb-8 w-fit">
                <h2 className="text-xs font-mono uppercase bg-[#B2DDF4] text-black rounded-full px-2 py-1 w-fit">
                  {heading}
                </h2>
              </div>
            </motion.div>
          ) : null}
        </div>

        <div ref={viewportRef} className="overflow-hidden px-4">
          <motion.div ref={trackRef} className="flex gap-8" style={{ x }}>
            {floorPlans.map((item, index) => (
              <FloorPlanCard
                key={index}
                item={item}
                index={index}
                heading={heading}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FloorPlanBlockProps {
  data?: Omit<FloorPlanBlockData, "_type" | "_key">;
}

export default function FloorPlanBlock({ data }: FloorPlanBlockProps) {
  const floorPlans = data?.floorPlans?.filter((item) => item.image) ?? [];
  if (!floorPlans.length) return null;

  return (
    <FloorPlanBlockView floorPlans={floorPlans} heading={data?.heading} />
  );
}
