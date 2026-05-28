import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";
import { getSettings } from "./lib/data";

export const metadata: Metadata = {
  title: "REIKA - Modulhus som vokser med deg",
  description:
    "Reika modulhus er designet for moderne liv i endring. Bo smart og fleksibelt i bærekraftige modulhus i massivtre.",
};

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
