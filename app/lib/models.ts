import { client } from "../../sanity/lib/client";
import {
  modelBySlugQuery,
  modelSlugsQuery,
  modelsQuery,
} from "../../sanity/lib/queries";
import type { ModelDocument } from "../../types";

export async function getAllModels(): Promise<ModelDocument[]> {
  try {
    const data = await client.fetch<ModelDocument[]>(modelsQuery);
    return data ?? [];
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching models:", error);
    }
    return [];
  }
}

export async function getModelBySlug(
  slug: string
): Promise<ModelDocument | null> {
  try {
    const data = await client.fetch<ModelDocument | null>(modelBySlugQuery, {
      slug,
    });
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching model by slug:", error);
    }
    return null;
  }
}

export async function getAllModelSlugParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await client.fetch<string[]>(modelSlugsQuery);
    return (slugs ?? []).filter(Boolean).map((slug) => ({ slug }));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching model slugs:", error);
    }
    return [];
  }
}
