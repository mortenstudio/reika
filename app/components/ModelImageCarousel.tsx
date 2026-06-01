"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

export interface ModelCarouselImage {
  src: string;
  alt: string;
}

interface ModelImageCarouselProps {
  images: ModelCarouselImage[];
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      className="size-4.5"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}

export default function ModelImageCarousel({ images }: ModelImageCarouselProps) {
  const hasMultiple = images.length > 1;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: hasMultiple,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="col-span-12 w-full">
      <div className="relative group w-full bg-white py-4">
        <div
          ref={emblaRef}
          className="w-full overflow-hidden"
          aria-roledescription="carousel"
          aria-label="Modellbilder"
        >
          <div className="flex gap-4">
            {images.map((image, i) => (
              <div
                key={image.src}
                className="min-w-0 shrink-0 grow-0 basis-full"
                aria-roledescription="slide"
                aria-hidden={i !== selectedIndex}
              >
                <div className="aspect-5/7 md:aspect-video w-full overflow-hidden rounded-md">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={960}
                    height={540}
                    className="h-full w-full object-cover select-none"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 100vw"
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={scrollPrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-white cursor-pointer p-2 text-black hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Forrige bilde"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white cursor-pointer p-2 text-black hover:bg-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Neste bilde"
            >
              <ChevronIcon direction="right" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
