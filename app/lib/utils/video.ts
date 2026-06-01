import { list } from "@vercel/blob";

/**
 * Fetches video URL from Vercel Blob storage
 * @param fileName - The name or prefix of the video file in Vercel Blob
 * @param fallbackUrl - Fallback URL if blob fetch fails or file not found
 * @returns The video URL from Blob or fallback URL
 */
export async function getVideoUrlFromBlob(
  fileName?: string,
  fallbackUrl?: string
): Promise<string | undefined> {
  // If no fileName provided, return fallback
  if (!fileName) {
    return fallbackUrl;
  }

  try {
    const { blobs } = await list({
      prefix: fileName,
      limit: 1,
    });

    if (blobs.length > 0 && blobs[0].url) {
      return blobs[0].url;
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error fetching video from Vercel Blob:", error);
    }
  }

  // Return fallback if blob fetch fails or file not found
  return fallbackUrl;
}
