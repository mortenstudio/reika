import { ReactNode } from "react";

export type PillVariant = "blue" | "green" | "lime" | "brown" | "yellow";

const variantClasses: Record<PillVariant, string> = {
  blue: "bg-[#B2DDF4] text-black",
  green: "bg-[#38422A] text-white",
  lime: "bg-[#E5F1CC] text-black",
  brown: "bg-[#534129] text-white",
  yellow: "bg-[#FFEA7D] text-black",
};

interface PillProps {
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
}

export default function Pill({
  children,
  variant = "blue",
  className = "",
}: PillProps) {
  return (
    <div
      className={`text-3xs md:text-2xs lg:text-xs font-mono uppercase rounded-full px-2.5 lg:px-3.5 py-1.5 lg:py-2 select-none ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
