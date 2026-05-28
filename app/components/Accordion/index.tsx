"use client";

import { ReactNode, useState } from "react";
import AccordionItem from "./AccordionItem";
import { SCROLL_REVEAL } from "../../lib/intersection-defaults";
import { useIntersectionAnimation } from "../../lib/hooks/useIntersectionAnimation";

interface AccordionItemData {
  id: string | number;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number | null;
}

export default function Accordion({
  items,
  defaultOpenIndex = 0,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const itemRefs = useIntersectionAnimation<HTMLDivElement>({
    ...SCROLL_REVEAL,
    resetKey: items.length,
  });

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={(el) => {
            itemRefs.current[index] = el;
          }}
        >
          <AccordionItem
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onToggle={() => toggleItem(index)}
          />
        </div>
      ))}
    </div>
  );
}
