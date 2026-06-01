import { PortableText } from "@portabletext/react";
import type { TextBlock as TextBlockData } from "../../types";
import Pill from "../components/Pill";
import ScrollReveal from "../components/ScrollReveal";

interface TextBlockProps {
  data?: Omit<TextBlockData, "_type" | "_key">;
}

export default function TextBlock({ data }: TextBlockProps) {
  if (!data?.body?.length) return null;

  return (
    <section>
      <ScrollReveal className="grid grid-cols-6 md:grid-cols-12 gap-x-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-6 md:col-span-12">
          <div className="bg-white py-4 w-fit">
            {data.title ? (
              <Pill variant="blue">{data.title}</Pill>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 md:col-span-5">
          <div className="bg-white py-4">
            {data.heading ? (
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  {data.heading}
                </h2>
              ) : null}
              </div>
          </div>
        <div className="col-span-6 md:col-start-7 md:col-span-5">
          <div className="bg-white py-4 mt-2">
            <div className="text-xs md:text-sm lg:text-base [&_p]:mb-3 md:[&_p]:mb-6 [&_p:last-child]:mb-0">
              <PortableText value={data.body} />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
