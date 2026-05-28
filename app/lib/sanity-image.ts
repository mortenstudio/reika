import { urlFor } from "../../sanity/lib/image";
import type { SanityImageAsset } from "../../types";

export function sanityImageSrc(
  image: SanityImageAsset | undefined
): string | null {
  if (!image) return null;
  if (image.asset?.url) return image.asset.url;
  try {
    return urlFor(image).url() ?? null;
  } catch {
    return null;
  }
}
