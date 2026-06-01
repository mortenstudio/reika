"use client";

import type { ModelsBlock as ModelsBlockData } from "../../types";
import { mapSanityModelsToModels } from "../lib/map-sanity-models";
import { useState, useRef, useCallback } from "react";
import { animate, stagger, motion } from "framer-motion";
import Image from "next/image";
import { Model } from "../../types";
import ModelCard from "../components/ModelCard";
import { SCROLL_REVEAL } from "../lib/intersection-defaults";
import { useIntersectionAnimation } from "../lib/hooks/useIntersectionAnimation";
import { ANIMATION_CONFIG, EASING } from "../lib/animations";
import Pill from "../components/Pill";

interface ModelsBlockViewProps {
  models: Model[];
}

function ModelsBlockView({ models }: ModelsBlockViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [hoveredModel, setHoveredModel] = useState<Model | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const cardRefs = useIntersectionAnimation<HTMLDivElement>({
    ...SCROLL_REVEAL,
    resetKey: models.length,
  });

  const handleListMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (viewMode === "list") {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    },
    [viewMode]
  );

  const handleModelHover = useCallback((model: Model | null) => {
    setHoveredModel(model);
  }, []);

  const handleViewModeChange = async (mode: "grid" | "list") => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (cards.length === 0) {
      setViewMode(mode);
      return;
    }

    await animate(cards, { opacity: 0, y: 30 }, {
      duration: 0.4,
      delay: stagger(0.05),
      ease: EASING.in,
    });

    setViewMode(mode);

    await new Promise<void>((r) => requestAnimationFrame(() => r()));

    const next = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (next.length === 0) return;

    await animate(next, { opacity: 1, y: 0 }, {
      duration: ANIMATION_CONFIG.duration.normal,
      delay: stagger(ANIMATION_CONFIG.stagger.normal, { startDelay: 0.1 }),
      ease: EASING.out,
    });
  };

  return (
    <section>
      {viewMode === "list" && (
        <motion.div
          className="fixed pointer-events-none z-50 w-64 md:w-80 lg:w-120 h-auto aspect-video rounded-md overflow-hidden"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            x: "-50%",
            y: "-50%",
          }}
          initial={false}
          animate={{
            opacity: hoveredModel ? 1 : 0,
            scale: hoveredModel ? 1 : 0.9,
            visibility: hoveredModel ? "visible" : "hidden",
          }}
          transition={{ duration: 0.5, ease: EASING.smooth }}
        >
          {hoveredModel && (
            <Image
              src={hoveredModel.images[0]}
              alt={hoveredModel.name}
              width={480}
              height={360}
              className="object-cover w-full h-full select-none"
            />
          )}
        </motion.div>
      )}
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-12">
          <div className="flex justify-between items-center lg:mb-8">
          <div className="bg-white py-4 w-fit">
            <Pill variant="yellow">Våre modeller</Pill>
          </div>
            <div className="flex justify-self-end gap-1 w-fit bg-white py-4 ">
              <button
                type="button"
                onClick={() => handleViewModeChange("grid")}
                className={`px-2.5 lg:px-3 py-1.5 lg:py-2 cursor-pointer rounded-md text-xs md:text-sm lg:text-base select-none ${
                  viewMode === "grid"
                    ? "bg-[#534129] text-white cursor-default! rounded-[20px]!"
                    : "bg-[#F3ECDA] text-black hover:bg-[#534129] hover:text-white hover:rounded-[20px] transition-all duration-200"
                }`}
                aria-label="Grid view"
              >
                Detaljert
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange("list")}
                className={`px-2.5 lg:px-3 py-1.5 lg:py-2 cursor-pointer rounded-md text-xs md:text-sm lg:text-base select-none ${
                  viewMode === "list"
                    ? "bg-[#534129] text-white cursor-default! rounded-[20px]!"
                    : "bg-[#F3ECDA] text-black hover:bg-[#534129] hover:text-white hover:rounded-[20px] transition-all duration-200"
                }`}
                aria-label="List view"
              >
                Kompakt
              </button>
            </div>
          </div>
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-y-4 lg:gap-y-8"
                : "flex flex-col py-4 bg-white gap-y-2"
            }
            onMouseMove={handleListMouseMove}
            onMouseLeave={() => handleModelHover(null)}
          >
            {models.map((model, index) => (
              <ModelCard
                key={model.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                model={model}
                viewMode={viewMode}
                onHover={handleModelHover}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


interface ModelsBlockProps {
  data?: Omit<ModelsBlockData, "_type" | "_key">;
}

export default function ModelsBlock({ data }: ModelsBlockProps) {
  const models = mapSanityModelsToModels(data);
  return <ModelsBlockView models={models} />;
}
