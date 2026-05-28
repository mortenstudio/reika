import type { ReactNode } from "react";
import type { ContentBlock } from "../../types";
import IntroductionBlock from "../blocks/introductionBlock";
import ModelsBlock from "../blocks/modelsBlock";
import ProductionBlock from "../blocks/productionBlock";
import ValuesBlock from "../blocks/valuesBlock";
import AccordionBlock from "../blocks/accordionBlock";

export function renderContentBlock(block: ContentBlock): ReactNode {
  switch (block._type) {
    case "introductionBlock":
      return <IntroductionBlock key={block._key} data={block} />;
    case "valuesBlock":
      return <ValuesBlock key={block._key} data={block} />;
    case "modelsBlock":
      return <ModelsBlock key={block._key} data={block} />;
    case "productionBlock":
      return <ProductionBlock key={block._key} data={block} />;
    case "accordionBlock":
      return <AccordionBlock key={block._key} data={block} />;
    default:
      return null;
  }
}
