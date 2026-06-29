export const revalidate = 60;

import type { Metadata } from "next";
import { getHomePageData } from "./lib/data";
import { resolveHeroBlobVideoUrl } from "./lib/hero-video";
import { renderContentBlock } from "./lib/content-blocks";
import HeroBlock from "./blocks/heroBlock";
import IntroductionBlock from "./blocks/introductionBlock";
import ModelsBlock from "./blocks/modelsBlock";
import ProductionBlock from "./blocks/productionBlock";
import ValuesBlock from "./blocks/valuesBlock";
import AccordionBlock from "./blocks/accordionBlock";
import type { ContentBlock } from "../types";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData();

  const metadata: Metadata = {
    title: data?.seoTitle || undefined,
    description: data?.seoDescription || undefined,
  };

  if (data?.seoImage?.asset?.url) {
    metadata.openGraph = {
      images: [{ url: data.seoImage.asset.url }],
    };
    metadata.twitter = {
      card: "summary_large_image",
      images: [data.seoImage.asset.url],
    };
  }

  return metadata;
}

function HomeFallbackContent() {
  return (
    <>
      <IntroductionBlock />
      <ModelsBlock />
      <ProductionBlock />
      <ValuesBlock />
      <AccordionBlock />
    </>
  );
}

export default async function Home() {
  const homePageData = await getHomePageData();
  const blobVideoUrl = await resolveHeroBlobVideoUrl(homePageData);
  const contentBlocks = homePageData?.contentBlocks ?? [];

  return (
    <main>
      <HeroBlock data={homePageData?.hero} blobVideoUrl={blobVideoUrl} introduction={homePageData?.introduction} />
      {contentBlocks.length > 0 ? (
        contentBlocks.map((block: ContentBlock) => renderContentBlock(block))
      ) : (
        <HomeFallbackContent />
      )}
    </main>
  );
}
