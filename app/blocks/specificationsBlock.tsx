import type { ReactNode } from "react";
import type { ModelSpecifications } from "../../types";

interface SpecificationsBlockProps {
  data: ModelSpecifications;
}

type SpecItem = {
  label: string;
  value: ReactNode;
};

function SpecCell({ label, value }: SpecItem) {
  if (value == null || value === "") return null;

  return (
    <div className="flex flex-col gap-1 min-w-0">
      <span className="text-xs font-mono uppercase opacity-70">{label}</span>
      <div className="text-sm md:text-base font-mono leading-snug">{value}</div>
    </div>
  );
}

function specValue(value: unknown): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

function formatPrice(price: unknown): string | null {
  const trimmed = specValue(price);
  if (!trimmed) return null;
  if (/^fra:/i.test(trimmed)) return trimmed;
  return `Fra: ${trimmed}`;
}

export default function SpecificationsBlock({ data }: SpecificationsBlockProps) {
  const sizeBya = specValue(data.sizeBya);
  const sizeBra = specValue(data.sizeBra);
  const sizeSummary = specValue(data.size);
  const hasSize = Boolean(sizeBya || sizeBra);
  const price = formatPrice(data.price);

  const rowOne: SpecItem[] = [
    {
      label: "Pris?:",
      value: price,
    },
    {
      label: "Størrelse:",
      value: hasSize ? (
        <div className="flex flex-col gap-0.5">
          {sizeBya ? <span>BYA: {sizeBya}</span> : null}
          {sizeBra ? <span>BRA: {sizeBra}</span> : null}
        </div>
      ) : sizeSummary ? (
        <span>{sizeSummary}</span>
      ) : null,
    },
    {
      label: "Ant rom:",
      value: specValue(data.rooms),
    },
    {
      label: "Etasjer:",
      value: specValue(data.floors),
    },
    {
      label: "Soverom:",
      value: specValue(data.bedrooms),
    },
    {
      label: "Bad:",
      value: specValue(data.bathrooms),
    },
  ];

  const rowTwo: SpecItem[] = [
    {
      label: "Vekt:",
      value: specValue(data.weight),
    },
    {
      label: "Takhøyde:",
      value: specValue(data.ceilingHeight),
    },
    {
      label: "Moduler:",
      value: specValue(data.modules),
    },
  ];

  const visibleRowOne = rowOne.filter((item) => item.value != null && item.value !== "");
  const visibleRowTwo = rowTwo.filter((item) => item.value != null && item.value !== "");

  if (visibleRowOne.length === 0 && visibleRowTwo.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="bg-white py-4 mx-4 my-16 md:my-24">
        <div className="rounded-md bg-[#FFFDCE] p-6 md:p-8 flex flex-col gap-6 md:gap-8">
          <div className="text-xs font-mono uppercase bg-[#FFEA7D] text-black rounded-full px-2 py-1 w-fit">
            Spesifikasjoner
          </div>

          {visibleRowOne.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              {visibleRowOne.map((item) => (
                <SpecCell key={item.label} {...item} />
              ))}
            </div>
          ) : null}

          {visibleRowTwo.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              {visibleRowTwo.map((item) => (
                <SpecCell key={item.label} {...item} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
