"use client";

import { memo, useCallback, useState, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Model } from "../../types";

interface ModelCardProps {
  model: Model;
  viewMode: "grid" | "list";
  onHover?: (model: Model | null) => void;
}

const ModelCard = forwardRef<HTMLDivElement, ModelCardProps>(
  function ModelCard({ model, viewMode, onHover }, ref) {
    const [isHovered, setIsHovered] = useState(false);
    const hasHoverImage = model.images.length > 1;

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
      if (viewMode === "list" && onHover) {
        onHover(model);
      }
    }, [viewMode, onHover, model]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
      if (viewMode === "list" && onHover) {
        onHover(null);
      }
    }, [viewMode, onHover]);

    const linkHref = model.slug ? `/models/${model.slug}` : null;
    const linkClass =
      "block text-inherit no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 rounded-md";

    if (viewMode === "list") {
      const row = (
        <div className="grid grid-cols-6 lg:grid-cols-12 xl:items-center bg-[#E5F1CC] rounded-md p-4 w-full">
          <div className="col-span-6 lg:col-span-2 mb-3 lg:mb-0">
            <div className="text-xs md:text-sm lg:text-base">
              {model.name}
            </div>
          </div>
          <div className="col-span-6 lg:col-span-6">
            <p className="text-xs md:text-sm lg:text-base">
              {model.description}
            </p>
          </div>
          <div className="col-span-6 lg:col-span-4 lg:justify-self-end flex flex-wrap w-5/6 gap-1 mt-12 lg:mt-0">
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4">
              <span className="opacity-66">Størrelse</span><span>{model.sizeBya} kvm</span>
            </div>
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4">
              <span className="opacity-66">Personer</span><span>{model.capacity}</span>
            </div>
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4">
              <span className="opacity-66">Rom</span><span>{model.rooms}</span>
            </div>
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4">
              <span className="opacity-66">Etasjer</span><span>{model.floors}</span>
            </div>
          </div>
        </div>
      );

      return (
        <div
          ref={ref}
          className="flex flex-row gap-2 bg-white"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: linkHref ? "pointer" : "default" }}
        >
          {linkHref ? (
            <Link href={linkHref} className={`${linkClass} w-full`} scroll>
              {row}
            </Link>
          ) : (
            row
          )}
        </div>
      );
    }

    const gridInner = (
      <div className="flex flex-col gap-2">
        <div className="relative w-full h-auto bg-black/5 aspect-3/2 rounded-md overflow-hidden">
          <Image
            src={model.images[0]}
            alt={model.name}
            width={480}
            height={360}
            className={`object-cover w-full h-full transition-opacity duration-200 select-none ${
              hasHoverImage && isHovered ? "opacity-0" : "opacity-100"
            }`}
          />
          {hasHoverImage && (
            <Image
              src={model.images[1]}
              alt={`${model.name} – 2`}
              width={480}
              height={360}
              className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-200 select-none ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </div>
        <div className="bg-[#E5F1CC] rounded-md p-4 flex flex-col gap-3">
          <h3 className="text-xs md:text-sm lg:text-base">{model.name}</h3>
          <p className="text-xs md:text-sm lg:text-base lg:w-1/2 mb-12">
            {model.description}
          </p>
          <div className="flex flex-row flex-wrap gap-1 w-5/6">
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4 w-fit">
              <span className="opacity-66">Størrelse</span><span>{model.sizeBya} kvm</span>
            </div>
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4 w-fit">
              <span className="opacity-66">Personer</span><span>{model.capacity}</span>
            </div>
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4 w-fit">
              <span className="opacity-66">Rom</span><span>{model.rooms}</span>
            </div>
            <div className="select-none text-3xs lg:text-2xs font-mono uppercase bg-[#38422A] text-white text-center rounded-full px-2 pt-1 pb-0.75 flex gap-4 w-fit">
              <span className="opacity-66">Etasjer</span><span>{model.floors}</span>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        className="flex flex-col gap-2 py-4 bg-white"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {linkHref ? (
          <Link href={linkHref} className={linkClass} scroll>
            {gridInner}
          </Link>
        ) : (
          gridInner
        )}
      </div>
    );
  }
);

export default memo(ModelCard);
