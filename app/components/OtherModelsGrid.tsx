"use client";

import type { Model } from "../../types";
import ModelCard from "./ModelCard";
import { SCROLL_REVEAL } from "../lib/intersection-defaults";
import { useIntersectionAnimation } from "../lib/hooks/useIntersectionAnimation";
import Pill from "./Pill";

interface OtherModelsGridProps {
  models: Model[];
}

export default function OtherModelsGrid({ models }: OtherModelsGridProps) {
  const cardRefs = useIntersectionAnimation<HTMLDivElement>({
    ...SCROLL_REVEAL,
    resetKey: models.length,
  });

  if (!models.length) return null;

  return (
    <section>
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-12">
          <div className="flex flex-col gap-8">
          <div className="bg-white py-4 w-fit">
              <Pill variant="yellow">Andre modeller</Pill>
          </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-8">
              {models.map((model, index) => (
                <ModelCard
                  key={model.slug ?? model.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  model={model}
                  viewMode="grid"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
