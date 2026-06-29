import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";
import { getSettings } from "./lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const metadata: Metadata = {
    title: settings?.seoTitle || "REIKA - Modulhus som vokser med deg",
    description:
      settings?.seoDescription ||
      "Reika modulhus er designet for moderne liv i endring. Bo smart og fleksibelt i bærekraftige modulhus i massivtre.",
  };

  if (settings?.seoImage?.asset?.url) {
    metadata.openGraph = {
      images: [{ url: settings.seoImage.asset.url }],
    };
    metadata.twitter = {
      card: "summary_large_image",
      images: [settings.seoImage.asset.url],
    };
  }

  return metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="no">
      <body>
        <SiteChrome settings={settings}>{children}</SiteChrome>
      </body>
    </html>
  );
}
