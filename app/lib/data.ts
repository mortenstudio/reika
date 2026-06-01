import { client } from "../../sanity/lib/client";
import { homePageQuery, settingsQuery } from "../../sanity/lib/queries";
import type { HomeDocument, SettingsDocument } from "../../types";

/**
 * Fetch home page data from Sanity
 */
export async function getHomePageData(): Promise<HomeDocument | null> {
  try {
    const data = await client.fetch(homePageQuery);
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching home page data:", error);
    }
    return null;
  }
}

/**
 * Fetch settings data from Sanity
 */
export async function getSettings(): Promise<SettingsDocument | null> {
  try {
    const data = await client.fetch(settingsQuery);
    return data;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching settings:", error);
    }
    return null;
  }
}

/**
 * Fetch all page data in parallel
 */
export async function getPageData() {
  const [homePageData, settings] = await Promise.all([
    getHomePageData(),
    getSettings(),
  ]);

  return { homePageData, settings };
}
