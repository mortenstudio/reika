import { PortableText } from "@portabletext/react";
import type { TextBlock as TextBlockData } from "../../types";

interface TextBlockProps {
  data?: Omit<TextBlockData, "_type" | "_key">;
}

export default function TextBlock({ data }: TextBlockProps) {
  if (!data?.body?.length) return null;

  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-x-8 mx-4 my-30 md:my-60">
        <div className="col-span-12">
          <div className="bg-white py-4 w-fit">
            {data.title ? (
              <div className="text-xs font-mono uppercase bg-[#B2DDF4] text-black rounded-full px-2 py-1 w-fit">
                {data.title}
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 md:col-span-5">
        <div className="bg-white py-4">
          {data.heading ? (
              <h2 className="text-3xl md:text-4xl lg:text-5xl leading-tight">
                {data.heading}
              </h2>
            ) : null}
            </div>
        </div>
        <div className="col-span-6 md:col-start-7 md:col-span-5">
        <div className="bg-white py-4 mt-2">
          <div className="text-md md:text-lg leading-tight [&_p]:mb-4 [&_p:last-child]:mb-0">
            <PortableText value={data.body} />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
