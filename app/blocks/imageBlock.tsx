import Image from "next/image";
import type { ImageBlock as ImageBlockData } from "../../types";
import { sanityImageSrc } from "../lib/sanity-image";

interface ImageBlockProps {
  data?: Omit<ImageBlockData, "_type" | "_key">;
}

export default function ImageBlock({ data }: ImageBlockProps) {
  const src = sanityImageSrc(data?.image);
  if (!src) return null;

  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-60">
        <figure className="col-span-6 md:col-span-12 flex flex-col gap-3">
          <div className="aspect-video w-full rounded-md overflow-hidden bg-black/5">
            <Image
              src={src}
              alt={data?.alt || data?.caption || "Image"}
              width={1280}
              height={720}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
          {data?.caption ? (
            <figcaption className="text-sm md:text-base opacity-70 bg-white py-2">
              {data.caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </section>
  );
}
