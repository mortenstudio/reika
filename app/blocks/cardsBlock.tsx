import Image from "next/image";
import Link from "next/link";
import type { CardsBlock as CardsBlockData } from "../../types";
import { sanityImageSrc } from "../lib/sanity-image";

interface CardsBlockProps {
  data?: Omit<CardsBlockData, "_type" | "_key">;
}

export default function CardsBlock({ data }: CardsBlockProps) {
  const cards = data?.cards ?? [];
  if (!cards.length) return null;

  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-60">
        <div className="col-span-6 md:col-span-12 flex flex-col gap-8">
          {data?.heading ? (
            <h2 className="text-xs font-mono uppercase bg-[#38422A] text-white rounded-full px-2 py-1 w-fit">
              {data.heading}
            </h2>
          ) : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => {
              const src = sanityImageSrc(card.image);
              const content = (
                <div className="flex flex-col gap-4 py-4 bg-white">
                  {src ? (
                    <div className="aspect-4/3 w-full h-autor rounded-md overflow-hidden">
                      <Image
                        src={src}
                        alt={card.title}
                        width={640}
                        height={360}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-md md:text-lg leading-tight">{card.title}</h3>
                    {card.description ? (
                      <p className="text-base md:text-lg leading-tight opacity-70 w-[90%]">
                        {card.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              );

              return <div key={index}>{content}</div>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
