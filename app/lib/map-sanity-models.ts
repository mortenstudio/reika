import type {
  Model,
  ModelDocument,
  ModelsBlock as ModelsBlockData,
} from "../../types";
import { DEFAULT_MODELS } from "./constants";
import { urlFor } from "../../sanity/lib/image";

function imageUrl(
  image: NonNullable<ModelDocument["images"]>[number] | undefined,
  fallback: string,
): string | null {
  if (image?.asset?.url) return image.asset.url;
  if (image?.asset) return urlFor(image).url() || fallback;
  return null;
}

function modelImageUrls(
  images: ModelDocument["images"],
  index: number,
): string[] {
  const fallback = `images/reika-${index + 1}.jpg`;
  if (!images?.length) return [fallback];

  const urls = images
    .map((img) => imageUrl(img, fallback))
    .filter((u): u is string => u !== null);

  return urls.length ? urls : [fallback];
}

export function mapModelDocumentsToModels(documents: ModelDocument[]): Model[] {
  return documents.map((model, index) => ({
    id: index + 1,
    name: model.name,
    description: model.description,
    size: model.size,
    capacity: model.capacity,
    rooms: model.rooms,
    floors: model.floors,
    slug: model.slug?.current,
    images: modelImageUrls(model.images, index),
  }));
}

/**
 * Map Sanity model entries to the `Model` shape used by the UI.
 */
export function mapSanityModelsToModels(
  data: Pick<ModelsBlockData, "models"> | undefined
): Model[] {
  if (!data?.models?.length) {
    return DEFAULT_MODELS;
  }

  return mapModelDocumentsToModels(data.models as ModelDocument[]);
}
