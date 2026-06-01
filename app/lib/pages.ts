import { client } from "../../sanity/lib/client";
import { pageBySlugQuery, pageSlugsQuery } from "../../sanity/lib/queries";
import type { PageDocument } from "../../types";

export async function getPageBySlug(
  slug: string
): Promise<PageDocument | null> {
  try {
    const data = await client.fetch<PageDocument | null>(pageBySlugQuery, {
      slug,
    });
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching page by slug:", error);
    }
    return null;
  }
}

export async function getAllPageSlugParams(): Promise<{ slug: string }[]> {
  try {
    const slugs = await client.fetch<string[]>(pageSlugsQuery);
    return (slugs ?? []).filter(Boolean).map((slug) => ({ slug }));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching page slugs:", error);
    }
    return [];
  }
}
