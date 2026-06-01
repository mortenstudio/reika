"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { CarouselBlock as CarouselBlockData, CarouselSlide } from "../../types";
import { sanityImageSrc } from "../lib/sanity-image";
import ScrollReveal from "../components/ScrollReveal";

type ResolvedSlide = CarouselSlide & { src: string; alt: string };

interface CarouselSlidesProps {
  slides: ResolvedSlide[];
}

const MAX_DUPLICATE_SETS = 12;
const INITIAL_DUPLICATE_SETS = 3;

function buildTrackSlides(
  slides: ResolvedSlide[],
  duplicateSets: number,
): ResolvedSlide[] {
  const sets: ResolvedSlide[] = [];
  for (let i = 0; i < duplicateSets; i++) {
    sets.push(...slides);
  }
  return sets;
}

function CarouselSlideCard({
  slide,
  priority,
}: {
  slide: ResolvedSlide;
  priority?: boolean;
}) {
  return (
    <article className="flex min-w-[min(85vw,50rem)] shrink-0 flex-col gap-4">
      <div className="w-full h-auto bg-white py-4">
        <Image
          src={slide.src}
          alt={slide.alt}
          width={1280}
          height={720}
          className="h-full w-full object-cover rounded-md select-none"
          sizes="(max-width: 768px) 85vw, 28rem"
          priority={priority}
          draggable={false}
        />
      </div>
      {(slide.title || slide.description) && (
        <div className="flex max-w-2xl flex-col gap-2">
          {slide.title ? (
            <h3 className="text-xl leading-tight md:text-2xl">{slide.title}</h3>
          ) : null}
          {slide.description ? (
            <p className="text-base whitespace-pre-wrap opacity-80 md:text-lg">
              {slide.description}
            </p>
          ) : null}
        </div>
      )}
    </article>
  );
}

function CarouselSlides({ slides }: CarouselSlidesProps) {
  const [duplicateSets, setDuplicateSets] = useState(INITIAL_DUPLICATE_SETS);
  const trackSlides = useMemo(
    () => buildTrackSlides(slides, duplicateSets),
    [slides, duplicateSets],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
      containScroll: false,
    },
    [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        playOnInit: true,
        stopOnFocusIn: false,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  useEffect(() => {
    setDuplicateSets(INITIAL_DUPLICATE_SETS);
  }, [slides]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();

    const canLoop = emblaApi.internalEngine().slideLooper.canLoop();
    if (!canLoop && duplicateSets < MAX_DUPLICATE_SETS) {
      setDuplicateSets((count) => count + 1);
      return;
    }

    emblaApi.plugins()?.autoScroll?.play();
  }, [emblaApi, trackSlides.length, duplicateSets]);

  return (
    <div className="col-span-6 md:col-span-12">
      <div
        ref={emblaRef}
        className="cursor-grab overflow-hidden active:cursor-grabbing"
        aria-roledescription="carousel"
        aria-label="Image carousel"
      >
        <div className="flex touch-pan-y gap-4 md:gap-6">
          {trackSlides.map((slide, index) => (
            <CarouselSlideCard
              key={`${slide.src}-${index}`}
              slide={slide}
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CarouselBlockProps {
  data?: Omit<CarouselBlockData, "_type" | "_key">;
}

export default function CarouselBlock({ data }: CarouselBlockProps) {
  const slides =
    data?.slides
      ?.map((slide, index) => {
        const src = sanityImageSrc(slide.image);
        if (!src) return null;
        return {
          ...slide,
          src,
          alt: slide.title || `Slide ${index + 1}`,
        };
      })
      .filter((slide): slide is NonNullable<typeof slide> => slide !== null) ?? [];

  if (!slides.length) return null;

  return (
    <section>
      <ScrollReveal className="grid grid-cols-6 md:grid-cols-12 gap-8 my-30 md:my-40 lg:my-50 xl:my-60">
        <CarouselSlides slides={slides} />
      </ScrollReveal>
    </section>
  );
}
