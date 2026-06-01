import type { ValuesBlock as ValuesBlockData } from "../../types";
import { DEFAULT_VALUES_PARAGRAPHS } from "../lib/constants";

interface ValuesBlockProps {
  data?: Omit<ValuesBlockData, "_type" | "_key">;
}

export default function ValuesBlock({ data }: ValuesBlockProps) {
  const paragraphs = data?.paragraphs || DEFAULT_VALUES_PARAGRAPHS;

  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-6 md:col-start-3 md:col-span-8 lg:col-start-4 lg:col-span-6">
          <div className="flex flex-col gap-8 bg-white py-4">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-md md:text-lg lg:text-xl xl:text-2xl"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}