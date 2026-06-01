import type { ReactNode } from "react";
import type { ModelContentBlock, ModelSpecifications } from "../../types";
import TextBlock from "../blocks/textBlock";
import FloorPlanBlock from "../blocks/floorPlanBlock";
import ImageBlock from "../blocks/imageBlock";
import CarouselBlock from "../blocks/carouselBlock";
import CardsBlock from "../blocks/cardsBlock";
import ImagesBlock from "../blocks/imagesBlock";
import SpecificationsBlock from "../blocks/specificationsBlock";

function modelSpecifications(
  model: ModelSpecifications,
): ModelSpecifications {
  return {
    price: model.price,
    size: model.size,
    sizeBya: model.sizeBya,
    sizeBra: model.sizeBra,
    rooms: model.rooms,
    floors: model.floors,
    bedrooms: model.bedrooms,
    bathrooms: model.bathrooms,
    weight: model.weight,
    ceilingHeight: model.ceilingHeight,
    modules: model.modules,
  };
}

export function renderModelContentBlock(
  block: ModelContentBlock,
  model?: ModelSpecifications,
): ReactNode {
  switch (block._type) {
    case "specificationsBlock":
      return model ? (
        <SpecificationsBlock
          key={block._key}
          data={modelSpecifications(model)}
        />
      ) : null;
    case "textBlock":
      return <TextBlock key={block._key} data={block} />;
    case "floorPlanBlock":
      return <FloorPlanBlock key={block._key} data={block} />;
    case "imageBlock":
      return <ImageBlock key={block._key} data={block} />;
    case "imagesBlock":
      return <ImagesBlock key={block._key} data={block} />;
    case "carouselBlock":
      return <CarouselBlock key={block._key} data={block} />;
    case "cardsBlock":
      return <CardsBlock key={block._key} data={block} />;
    default:
      return null;
  }
}
