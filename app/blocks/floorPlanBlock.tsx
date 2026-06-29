"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import type {
  FloorPlanBlock as FloorPlanBlockData,
  FloorPlanBlockItem,
} from "../../types";
import { sanityImageSrc } from "../lib/sanity-image";
import { EASING } from "../lib/animations";
import Pill from "../components/Pill";

function FloorPlanCard({
  item,
  index,
  heading,
  onClick,
}: {
  item: FloorPlanBlockItem;
  index: number;
  heading?: string;
  onClick: () => void;
}) {
  const src = sanityImageSrc(item.image);
  if (!src) return null;

  return (
    <figure className="relative flex w-full md:w-[calc(42%-1.5rem)] shrink-0 flex-col gap-3 py-4 bg-white">
      <button
        type="button"
        onClick={onClick}
        className="w-full rounded-md overflow-hidden bg-[#E8F7FF] p-6 md:p-12 cursor-zoom-in transition-opacity hover:opacity-90"
      >
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
      </button>
      {item.caption ? (
        <figcaption className="text-xs md:text-sm lg:text-base bg-white pt-1.5 pb-4 md:w-3/4">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Lightbox({
  floorPlans,
  activeIndex,
  heading,
  onClose,
  onPrev,
  onNext,
}: {
  floorPlans: FloorPlanBlockItem[];
  activeIndex: number;
  heading?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = floorPlans[activeIndex];
  const src = sanityImageSrc(item.image);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  if (!src) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-label={item.caption || heading || `Floor plan ${activeIndex + 1}`}
    >
      <div
        className="relative flex flex-col items-center w-full h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-8 right-8 text-black z-10 bg-white rounded-full p-2 cursor-pointer"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="butt">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="rounded-lg overflow-hidden bg-white flex items-center justify-center flex-1 w-full p-4 md:p-8">
          <Image
            src={src}
            alt={item.alt || item.caption || heading || `Floor plan ${activeIndex + 1}`}
            width={2560}
            height={1920}
            className="object-contain w-full h-full"
            sizes="96vw"
            priority
          />
        </div>

        <div className="flex items-center gap-4 py-3 absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          {floorPlans.length > 1 && (
            <button
              type="button"
              onClick={onPrev}
              className="text-black p-2 cursor-pointer"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="miter">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          <span className="text-black text-sbase tabular-nums">
            {item.caption || `${activeIndex + 1} / ${floorPlans.length}`}
          </span>
          {floorPlans.length > 1 && (
            <button
              type="button"
              onClick={onNext}
              className="text-black p-2 cursor-pointer"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="miter">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + floorPlans.length) % floorPlans.length : null)),
    [floorPlans.length],
  );
  const nextLightbox = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % floorPlans.length : null)),
    [floorPlans.length],
  );

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
        <div className="mx-4 md:mb-4 lg:mb-8">
          {heading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: EASING.out }}
            >
              <div className="bg-white py-4 w-fit">
                {heading ? (
                  <Pill variant="blue">{heading}</Pill>
                ) : null}
              </div>
            </motion.div>
          ) : null}
        </div>

        <div ref={viewportRef} className="overflow-hidden px-4">
          <motion.div ref={trackRef} className="flex gap-4 md:gap-6 lg:gap-8" style={{ x }}>
            {floorPlans.map((item, index) => (
              <FloorPlanCard
                key={index}
                item={item}
                index={index}
                heading={heading}
                onClick={() => setLightboxIndex(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            floorPlans={floorPlans}
            activeIndex={lightboxIndex}
            heading={heading}
            onClose={closeLightbox}
            onPrev={prevLightbox}
            onNext={nextLightbox}
          />
        )}
      </AnimatePresence>
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
