export const revalidate = 60;

import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllPageSlugParams } from "../lib/pages";
import { sanityImageSrc } from "../lib/sanity-image";
import { renderPageContentBlock } from "../lib/page-content-blocks";
import type { PageDocument, PageContentBlock } from "../../types";
import ScrollReveal from "../components/ScrollReveal";

function pageImageSrc(page: PageDocument): string | null {
  return sanityImageSrc(page.image);
}

function pageIntroduction(page: PageDocument): string | null {
  const text = page.introduction?.trim() || page.description?.trim();
  return text || null;
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPageSlugParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return { title: "Side ikke funnet" };
  }

  const fallbackDescription = page.description?.trim() || page.introduction?.trim();

  const metadata: Metadata = {
    title: page.seoTitle || `${page.name} | Reika`,
    description: page.seoDescription || fallbackDescription?.slice(0, 160),
  };

  if (page.seoImage?.asset?.url) {
    metadata.openGraph = {
      images: [{ url: page.seoImage.asset.url }],
    };
    metadata.twitter = {
      card: "summary_large_image",
      images: [page.seoImage.asset.url],
    };
  }

  return metadata;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const imageSrc = pageImageSrc(page);
  const introduction = pageIntroduction(page);
  const hasContentBlocks = Boolean(page.contentBlocks?.length);
  const hasHeader = Boolean(imageSrc || page.name || introduction);

  return (
    <main className="relative min-h-screen">
      {hasHeader ? (
        <div className="relative z-0 grid grid-cols-6 md:grid-cols-12 md:gap-y-10 lg:gap-y-20 xl:gap-y-30 mx-4 mt-80 mb-30 md:mb-40 lg:mb-50 xl:mb-60">
          {imageSrc ? (
            <ScrollReveal className="col-span-12">
              <div className="py-4 bg-white">
                <Image
                  src={imageSrc}
                  alt={page.name}
                  width={960}
                  height={540}
                  className="object-cover w-full h-auto aspect-video rounded-md select-none"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </ScrollReveal>
          ) : null}
          <ScrollReveal className="col-span-6 md:col-span-7 lg:col-span-10" delay={0.15}>
            <div className="flex bg-white py-4">
              {introduction ? (
                <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  {introduction}
                </div>
              ) : null}
            </div>
          </ScrollReveal>
        </div>
      ) : null}

      {hasContentBlocks ? (
        page.contentBlocks!.map((block: PageContentBlock) =>
          renderPageContentBlock(block)
        )
      ) : !hasHeader ? (
        <section>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
            <p className="col-span-6 md:col-span-10 text-lg opacity-60 bg-white py-4">
              No content yet.
            </p>
          </div>
        </section>
      ) : null}
    </main>
  );
}
