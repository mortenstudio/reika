import type { ReactNode } from "react";
import type { PageContentBlock } from "../../types";
import TextBlock from "../blocks/textBlock";
import ImagesBlock from "../blocks/imagesBlock";
import CarouselBlock from "../blocks/carouselBlock";
import ModelsBlock from "../blocks/modelsBlock";
import ContactBlock from "../blocks/contactBlock";
import AccordionBlock from "../blocks/accordionBlock";
import StepsBlock from "../blocks/stepsBlock";
import CardsBlock from "../blocks/cardsBlock";

export function renderPageContentBlock(block: PageContentBlock): ReactNode {
  switch (block._type) {
    case "textBlock":
      return <TextBlock key={block._key} data={block} />;
    case "imagesBlock":
      return <ImagesBlock key={block._key} data={block} />;
    case "carouselBlock":
      return <CarouselBlock key={block._key} data={block} />;
    case "modelsBlock":
      return <ModelsBlock key={block._key} data={block} />;
    case "contactBlock":
      return <ContactBlock key={block._key} data={block} />;
    case "accordionBlock":
      return <AccordionBlock key={block._key} data={block} />;
    case "stepsBlock":
      return <StepsBlock key={block._key} data={block} />;
    case "cardsBlock":
      return <CardsBlock key={block._key} data={block} />;
    default:
      return null;
  }
}
