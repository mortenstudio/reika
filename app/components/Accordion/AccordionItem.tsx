"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AccordionItemProps {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const ACCORDION_EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export default function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div
      className={`rounded-md transition-colors duration-200 ${
        isOpen
          ? "bg-[#dedacd] text-black"
          : "bg-[#ECE7DA] hover:bg-[#dedacd] text-black"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between cursor-pointer p-4"
      >
        <span className="text-xs md:text-sm lg:text-base">{title}</span>
        <span className="text-xs md:text-sm lg:text-base">{isOpen ? "−" : "+"}</span>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: ACCORDION_EASE }}
        className="overflow-hidden"
      >
        <div className="text-xs md:text-sm lg:text-base px-4 pb-4 opacity-66">
          {content}
        </div>
      </motion.div>
    </div>
  );
}
