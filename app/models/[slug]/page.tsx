export const revalidate = 60;

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModelBySlug, getAllModelSlugParams, getAllModels } from "../../lib/models";
import { mapModelDocumentsToModels } from "../../lib/map-sanity-models";
import ModelImageCarousel from "../../components/ModelImageCarousel";
import OtherModelsGrid from "../../components/OtherModelsGrid";
import { urlFor } from "../../../sanity/lib/image";
import type { ModelDocument, ModelContentBlock } from "../../../types";
import { renderModelContentBlock } from "../../lib/model-content-blocks";
import Pill from "@/app/components/Pill";
import ScrollReveal from "../../components/ScrollReveal";

function modelImageSrcs(model: ModelDocument): string[] {
  if (!model.images?.length) return [];
  return model.images
    .map((img) => {
      if (img.asset?.url) return img.asset.url;
      return urlFor(img).url() ?? null;
    })
    .filter((u): u is string => u !== null);
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllModelSlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = await getModelBySlug(slug);

  if (!model) {
    return { title: "Modell ikke funnet" };
  }

  const metadata: Metadata = {
    title: model.seoTitle || `${model.name} | Reika`,
    description: model.seoDescription || model.description?.slice(0, 160),
  };

  if (model.seoImage?.asset?.url) {
    metadata.openGraph = {
      images: [{ url: model.seoImage.asset.url }],
    };
    metadata.twitter = {
      card: "summary_large_image",
      images: [model.seoImage.asset.url],
    };
  }

  return metadata;
}

export default async function ModelPage({ params }: PageProps) {
  const { slug } = await params;
  const [model, allModels] = await Promise.all([
    getModelBySlug(slug),
    getAllModels(),
  ]);

  if (!model) {
    notFound();
  }

  const imageSrcs = modelImageSrcs(model);
  const hasContentBlocks = Boolean(model.contentBlocks?.length);
  const otherModels = mapModelDocumentsToModels(allModels).filter(
    (m) => m.slug !== slug,
  );

  return (
    <main>
      <div className="grid grid-cols-6 md:grid-cols-12 md:gap-y-10 lg:gap-y-20 xl:gap-y-30 mx-4 mt-70 mb-30 md:mb-40 lg:mb-50 xl:mb-60">
        <ScrollReveal className="col-span-6 md:col-span-7 lg:col-span-8">
          <div className="flex flex-col md:gap-4 lg:gap-8">
            {model.name ? (
              <div className="bg-white py-4 w-fit">
                <Pill variant="blue">{model.name}</Pill>
              </div>
            ) : null}
            {model.description ? (
              <div className="bg-white py-4 w-fit">
                  <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                    {model.description}
                  </div>
              </div>
            ) : null}
          </div> 
        </ScrollReveal>

        {imageSrcs.length > 0 ? (
          <ModelImageCarousel
            images={imageSrcs.map((src, i) => ({
              src,
              alt: `${model.name} ${i + 1}`,
            }))}
          />
        ) : null}
      </div>

      {hasContentBlocks
        ? model.contentBlocks!.map((block: ModelContentBlock) =>
            renderModelContentBlock(block, model),
          )
        : null}

      {otherModels.length > 0 ? <OtherModelsGrid models={otherModels} /> : null}
    </main>
  );
}
