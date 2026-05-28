import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModelBySlug, getAllModelSlugParams, getAllModels } from "../../lib/models";
import { mapModelDocumentsToModels } from "../../lib/map-sanity-models";
import ModelImageCarousel from "../../components/ModelImageCarousel";
import OtherModelsGrid from "../../components/OtherModelsGrid";
import { urlFor } from "../../../sanity/lib/image";
import type { ModelDocument, ModelContentBlock } from "../../../types";
import { renderModelContentBlock } from "../../lib/model-content-blocks";

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

  return {
    title: `${model.name} | Reika`,
    description: model.description?.slice(0, 160),
  };
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
      <div className="grid grid-cols-6 md:grid-cols-12 gap-y-12 md:gap-y-30 mx-4 my-30 md:my-60">
        <div className="col-span-6 md:col-span-7 lg:col-span-8 flex flex-col gap-6 bg-white py-4">
          <h1 className="text-xs font-mono uppercase bg-[#B2DDF4] text-black rounded-full px-2 py-1 w-fit">
            {model.name}
          </h1>
          {model.description ? (
            <div className="text-3xl md:text-4xl lg:text-5xl leading-tight">
              {model.description}
            </div>
          ) : null}
        </div>

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
