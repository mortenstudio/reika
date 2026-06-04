"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import type { TypeBlock as TypeBlockData } from "../../types";
import Pill from "../components/Pill";
import ScrollReveal from "../components/ScrollReveal";
import { EASING } from "../lib/animations";
import Image from "next/image";

interface TypeBlockProps {
  data?: Omit<TypeBlockData, "_type" | "_key">;
}

export default function TypeBlock({ data }: TypeBlockProps) {
  const models = data?.models?.filter((m) => m.types && m.types.length > 0) ?? [];
  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  if (models.length === 0) return null;

  const hasAnyImage = models.some((m) =>
    m.types?.some((t) => t.image?.asset?.url)
  );

  const handleModelChange = (index: number) => {
    setActiveModelIndex(index);
    setActiveTypeIndex(0);
  };

  const isActive = (mi: number, ti: number) =>
    mi === activeModelIndex && ti === activeTypeIndex;

  return (
    <section>
      <ScrollReveal className="grid grid-cols-6 md:grid-cols-12 gap-x-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-6 md:col-span-12">
        <div className="flex flex-col md:gap-4 lg:gap-8 lg:w-3/4 mb-8">
          {data?.title && (
            <div className="bg-white py-4 w-fit">
              <Pill variant="lightgreen">{data.title}</Pill>
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
          {hasAnyImage && (
            <div className="bg-white py-4">
              <div className="relative w-full h-[calc(80vh-2rem)] lg:h-[calc(100vh-2rem)] overflow-hidden rounded-md bg-[#ECE7DA]">
                {models.length > 1 && (
                  <div className="absolute top-4 lg:top-8 left-4 lg:left-1/2 lg:-translate-x-1/2 z-80 lg:w-max flex flex-col lg:flex-row lg:items-center gap-1">
                    {models.map((model, index) => (
                      <button
                        key={model._id}
                        type="button"
                        onClick={() => handleModelChange(index)}
                        className={`px-2.5 lg:px-3 py-1.5 lg:py-2 cursor-pointer rounded-md text-xs md:text-sm lg:text-base select-none transition-all duration-200 ${index === activeModelIndex
                          ? "bg-[#38422A] text-white cursor-default!"
                          : "bg-white text-black hover:bg-[#38422A] hover:text-white"
                          }`}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                )}
                <div className="absolute bottom-4 lg:bottom-8 right-4 lg:right-1/2 lg:translate-x-1/2 z-80 w-max">
                  {models.map((model, mi) => {
                    const types = model.types ?? [];
                    return (
                      <motion.div
                        key={model._id}
                        animate={{ opacity: mi === activeModelIndex ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: EASING.out }}
                        className={mi === activeModelIndex ? "" : "pointer-events-none absolute inset-0 overflow-hidden h-0"}
                        aria-hidden={mi !== activeModelIndex}
                      >
                        <div className="flex flex-col lg:flex-row flex-wrap gap-1">
                          {types.map((type, ti) => (
                            <button
                              key={type._key}
                              type="button"
                              tabIndex={mi === activeModelIndex ? 0 : -1}
                              onClick={() => setActiveTypeIndex(ti)}
                              className={`px-2.5 lg:px-3 py-1.5 lg:py-2 cursor-pointer rounded-md text-xs md:text-sm lg:text-base select-none transition-all duration-200 ${ti === activeTypeIndex && mi === activeModelIndex
                                ? "bg-[#534129]/20 text-black cursor-default!"
                                : "bg-[#534129]/10 text-black hover:bg-[#534129]/20"
                                }`}
                            >
                              {type.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="absolute left-4 lg:left-8 bottom-4 lg:bottom-8 z-80">
                  {models.map((model, mi) =>
                    model.types?.map((type, ti) => (
                      <motion.div
                        key={`${model._id}-${type._key}`}
                        animate={{
                          opacity: isActive(mi, ti) ? 1 : 0,
                          y: isActive(mi, ti) ? 0 : 8,
                        }}
                        transition={{ duration: 0.3, ease: EASING.out }}
                        className={isActive(mi, ti) ? "" : "sr-only"}
                        aria-hidden={!isActive(mi, ti)}
                      >
                        {type.description && (
                          <div className="mt-8 text-3xs lg:text-2xs font-mono uppercase select-none [&_p]:mb-3 md:[&_p]:mb-6 [&_p:last-child]:mb-0">
                            <PortableText value={type.description} />
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
                {models.map((model, mi) =>
                  model.types?.map((type, ti) =>
                    type.image?.asset?.url ? (
                      <Image
                        key={`${model._id}-${type._key}`}
                        src={type.image.asset.url}
                        alt={type.name}
                        fill
                        priority={mi === 0 && ti === 0}
                        className={`select-none scale-120 w-full h-full mix-blend-multiply object-contain transition-opacity duration-400 ease-out ${isActive(mi, ti) ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    ) : null
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </ScrollReveal>
    </section>
  );
}
