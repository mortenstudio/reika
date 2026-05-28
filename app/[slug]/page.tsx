import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllPageSlugParams } from "../lib/pages";
import { sanityImageSrc } from "../lib/sanity-image";
import { renderPageContentBlock } from "../lib/page-content-blocks";
import type { PageDocument, PageContentBlock } from "../../types";

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

  const summary = page.description?.trim() || page.introduction?.trim();

  return {
    title: `${page.name} | Reika`,
    description: summary?.slice(0, 160),
  };
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
        <div className="relative z-0 grid grid-cols-6 md:grid-cols-12 gap-y-60 mx-4 my-30 md:my-60">
          {imageSrc ? (
            <div className="col-span-12">
              <div className="aspect-video w-full rounded-md overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={page.name}
                  width={960}
                  height={540}
                  className="object-cover w-full h-full"
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          ) : null}
          <div className="col-span-6 md:col-span-7 lg:col-span-8">
            <div className="flex bg-white py-4">
              {introduction ? (
                <div className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                  {introduction}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {hasContentBlocks ? (
        page.contentBlocks!.map((block: PageContentBlock) =>
          renderPageContentBlock(block)
        )
      ) : !hasHeader ? (
        <section>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-60">
            <p className="col-span-6 md:col-span-9 text-lg opacity-60 bg-white py-4">
              No content yet.
            </p>
          </div>
        </section>
      ) : null}
    </main>
  );
}
