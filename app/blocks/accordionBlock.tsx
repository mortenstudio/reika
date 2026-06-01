import type { AccordionBlock as AccordionBlockData } from "../../types";
import { DEFAULT_ACCORDION_ITEMS, DEFAULT_ACCORDION_TITLE } from "../lib/constants";
import Accordion from "../components/Accordion";
import Pill from "../components/Pill";
import ScrollReveal from "../components/ScrollReveal";

interface AccordionBlockProps {
  data?: Omit<AccordionBlockData, "_type" | "_key">;
}

export default function AccordionBlock({ data }: AccordionBlockProps) {
  const items = data?.items || DEFAULT_ACCORDION_ITEMS;
  const accordionData = items.map((item, index) => ({
    id: index + 1,
    title: item.title,
    content: item.content,
  }));

  return (
    <section>
      <ScrollReveal className="grid grid-cols-6 md:grid-cols-12 gap-8 mx-4 my-30 md:my-40 lg:my-50 xl:my-60">
        <div className="col-span-6">
          <div className="bg-white py-4 w-fit">
            {data.title ? (
              <Pill variant="yellow">{data.title}</Pill>
            ) : null}
          </div>
        </div>
        <div className="col-span-6 lg:col-span-5">
          <div className="py-4 bg-white">
            <Accordion items={accordionData} defaultOpenIndex={0} />
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}