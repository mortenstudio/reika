import type { HomeDocument } from "../../types";
import { DEFAULT_HERO_DATA } from "./constants";
import { getVideoUrlFromBlob } from "./utils/video";

export async function resolveHeroBlobVideoUrl(
  homePageData: HomeDocument | null | undefined
): Promise<string | undefined> {
  return getVideoUrlFromBlob(
    DEFAULT_HERO_DATA.videoFileName,
    homePageData?.hero?.video?.asset?.url ?? DEFAULT_HERO_DATA.videoFallback
  );
}
