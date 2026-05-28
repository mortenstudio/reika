import type { IntroductionBlock as IntroductionBlockData } from "../../types";
import { DEFAULT_INTRODUCTION_TEXT } from "../lib/constants";

interface IntroductionBlockProps {
  data?: Omit<IntroductionBlockData, "_type" | "_key">;
}

export default function IntroductionBlock({ data }: IntroductionBlockProps) {
  return (
    <section>
      <div className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-60">
        <div className="col-span-6 md:col-span-9">
          <div className="text-3xl md:text-4xl lg:text-5xl leading-tight bg-white py-4">
            {data?.text || DEFAULT_INTRODUCTION_TEXT}
          </div>
        </div>
      </div>
    </section>
  );
}