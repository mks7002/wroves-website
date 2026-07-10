import React from "react";
import { cn } from "@/lib/utils/cn";

interface PageIntroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const PageIntro: React.FC<PageIntroProps> = ({
  title,
  subtitle,
  badge,
  className,
}) => {
  return (
    <div className={cn("max-w-3xl mb-12 md:mb-16", className)}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-red/10 text-brand-red border border-brand-red/20 mb-4 tracking-wider uppercase">
          {badge}
        </span>
      )}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-100 tracking-tight mb-6">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
};
