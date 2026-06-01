"use client";

import { usePathname } from "next/navigation";
import HeaderBlock from "../blocks/headerBlock";
import FooterBlock from "../blocks/footerBlock";
import GridLayout from "./GridLayout";
import type { SettingsDocument } from "../../types";

type SiteChromeProps = {
  settings: SettingsDocument | null;
  children: React.ReactNode;
};

export default function SiteChrome({ settings, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  const headerData = {
    tagline: settings?.tagline,
    subtagline: settings?.subtagline,
    navigation: settings?.navigation,
  };

  return (
    <>
      <HeaderBlock data={headerData} />
      {children}
      <FooterBlock data={settings?.footer} />
      <GridLayout />
    </>
  );
}
