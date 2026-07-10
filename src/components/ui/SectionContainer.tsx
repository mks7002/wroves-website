import React from "react";
import { cn } from "@/lib/utils/cn";

interface SectionContainerProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  bg?: "dark" | "darker" | "none";
  borderBottom?: boolean;
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  className,
  containerClassName,
  bg = "none",
  borderBottom = false,
  children,
}) => {
  const backgrounds = {
    dark: "bg-[#0c0c0e]",
    darker: "bg-[#070709]",
    none: "",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        backgrounds[bg],
        borderBottom && "border-b border-zinc-900",
        className
      )}
    >
      <div className={cn("max-w-7xl mx-auto px-6 lg:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
};
