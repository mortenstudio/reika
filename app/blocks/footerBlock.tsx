import Logo from "../components/Logo";
import { DEFAULT_FOOTER_DATA } from "../lib/constants";
import type { SettingsDocument } from "../../types";

type FooterData = NonNullable<SettingsDocument["footer"]>;

interface FooterBlockProps {
  data?: FooterData;
}

const PLATFORM_LABELS: Record<string, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter",
  linkedin: "LinkedIn",
};

function formatPlatform(platform: string): string {
  return PLATFORM_LABELS[platform.toLowerCase()] ?? platform;
}

export default function FooterBlock({ data }: FooterBlockProps) {
  const contactText = data?.contactText ?? DEFAULT_FOOTER_DATA.contactText;
  const contactEmail = data?.contactEmail ?? DEFAULT_FOOTER_DATA.contactEmail;
  const contactEmailUrl =
    data?.contactEmailUrl ?? DEFAULT_FOOTER_DATA.contactEmailUrl;
  const findUsText = data?.findUsText ?? DEFAULT_FOOTER_DATA.findUsText;
  const address = data?.address ?? DEFAULT_FOOTER_DATA.address;
  const addressUrl = data?.addressUrl ?? DEFAULT_FOOTER_DATA.addressUrl;
  const followUsText = data?.followUsText ?? DEFAULT_FOOTER_DATA.followUsText;
  const socialLinks = data?.socialLinks ?? DEFAULT_FOOTER_DATA.socialLinks;

  return (
    <footer>
      <div className="mx-4 pt-4 bg-white">
        <div className="flex flex-col gap-80 p-5 mb-4 rounded-md bg-[#534129] text-white">
          <div className="grid grid-cols-6 md:grid-cols-12 gap-8">
            <div className="col-span-6">
              <div className="flex flex-col">
                <div className="text-md md:text-lg leading-5 mb-2">
                  {contactText}
                </div>
                <a
                  href={`mailto:${contactEmailUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-md md:text-lg underline underline-offset-3 decoration-1 decoration-white/33 hover:decoration-transparent transition-all duration-200"
                >
                  {contactEmail}
                </a>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="flex flex-col">
                <div className="text-md md:text-lg leading-5 mb-2">
                  {findUsText}
                </div>
                <a
                  href={addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit text-md md:text-lg underline underline-offset-3 decoration-1 decoration-white/33 hover:decoration-transparent transition-all duration-200"
                >
                  {address}
                </a>
              </div>
            </div>
            <div className="col-span-6 md:col-span-3">
              <div className="flex flex-col">
                <div className="text-md md:text-lg leading-5 mb-2">
                  {followUsText}
                </div>
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={`${link.platform}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit text-md md:text-lg underline underline-offset-3 decoration-1 decoration-white/33 hover:decoration-transparent transition-all duration-200"
                    >
                      {formatPlatform(link.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-8 items-end">
            <div className="col-span-6 md:col-span-12">
              <Logo className="fill-white w-full!" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
