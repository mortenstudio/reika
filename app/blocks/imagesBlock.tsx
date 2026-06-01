import Image from "next/image";
import type { ImagesBlock as ImagesBlockData } from "../../types";
import { sanityImageSrc } from "../lib/sanity-image";
import ScrollReveal from "../components/ScrollReveal";

interface ImagesBlockProps {
  data?: Omit<ImagesBlockData, "_type" | "_key">;
}

export default function ImagesBlock({ data }: ImagesBlockProps) {
  const images = data?.images?.filter((item) => item.image) ?? [];
  if (!images.length) return null;

  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-6 md:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {images.map((item, index) => {
            const src = sanityImageSrc(item.image);
            if (!src) return null;

            return (
              <ScrollReveal key={index} as="figure" className="flex flex-col" delay={index * 0.15}>
                <div className="w-full h-auto py-4 bg-white">
                  <Image
                    src={src}
                    alt={item.alt || item.caption || `Image ${index + 1}`}
                    width={960}
                    height={540}
                    className="object-cover w-full h-auto rounded-md select-none"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {item.caption ? (
                    <figcaption className="text-xs md:text-sm lg:text-base bg-white py-4 md:w-3/4">
                      {item.caption} 
                    </figcaption>
                  ) : null}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
