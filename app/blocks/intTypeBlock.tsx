"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import type { IntTypeBlock as IntTypeBlockData, ModelType } from "../../types";
import Pill from "../components/Pill";
import ScrollReveal from "../components/ScrollReveal";
import { EASING } from "../lib/animations";
import Image from "next/image";

interface IntTypeBlockProps {
  data?: Omit<IntTypeBlockData, "_type" | "_key">;
  types?: ModelType[];
}

export default function IntTypeBlock({ data, types }: IntTypeBlockProps) {
  const filteredTypes = types?.filter((t) => t.image?.asset?.url) ?? [];
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  if (filteredTypes.length === 0) return null;

  return (
    <section>
      <ScrollReveal className="grid grid-cols-6 md:grid-cols-12 gap-x-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-6 md:col-span-12">
          <div className="flex flex-col md:gap-4 lg:gap-8 lg:w-3/4 mb-8">
            {data?.title && (
              <div className="bg-white py-4 w-fit">
                <Pill variant="green">{data.title}</Pill>
              </div>
            )}

            {data?.heading && (
              <div className="bg-white py-4">
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  {data.heading}
                </h2>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-6 md:col-span-12">
          <div className="bg-white py-4">
            <div className="relative w-full h-[calc(80vh-2rem)] lg:h-[calc(100vh-2rem)] overflow-hidden rounded-md bg-[#ECE7DA]">
              <div className="absolute bottom-4 lg:bottom-8 right-4 lg:right-1/2 lg:translate-x-1/2 z-80 w-max">
                <div className="flex flex-col lg:flex-row flex-wrap gap-1">
                  {filteredTypes.map((type, ti) => (
                    <button
                      key={type._key}
                      type="button"
                      onClick={() => setActiveTypeIndex(ti)}
                      className={`px-2.5 lg:px-3 py-1.5 lg:py-2 cursor-pointer rounded-md text-xs md:text-sm lg:text-base select-none transition-all duration-200 ${
                        ti === activeTypeIndex
                          ? "bg-[#534129]/20 text-black cursor-default!"
                          : "bg-[#534129]/10 text-black hover:bg-[#534129]/20"
                      }`}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="absolute left-4 lg:left-8 bottom-4 lg:bottom-8 z-80">
                {filteredTypes.map((type, ti) => (
                  <motion.div
                    key={type._key}
                    animate={{
                      opacity: ti === activeTypeIndex ? 1 : 0,
                      y: ti === activeTypeIndex ? 0 : 8,
                    }}
                    transition={{ duration: 0.3, ease: EASING.out }}
                    className={ti === activeTypeIndex ? "" : "sr-only"}
                    aria-hidden={ti !== activeTypeIndex}
                  >
                    {type.description && (
                      <div className="mt-8 text-3xs lg:text-2xs font-mono uppercase select-none [&_p]:mb-3 md:[&_p]:mb-6 [&_p:last-child]:mb-0">
                        <PortableText value={type.description} />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              {filteredTypes.map((type, ti) =>
                type.image?.asset?.url ? (
                  <Image
                    key={type._key}
                    src={type.image.asset.url}
                    alt={type.name}
                    fill
                    priority={ti === 0}
                    className={`select-none scale-120 w-full h-full mix-blend-multiply object-contain transition-opacity duration-400 ease-out ${
                      ti === activeTypeIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ) : null,
              )}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
