import React from "react";
import { CheckCircle2 } from "lucide-react";

export const TrustStrip: React.FC = () => {
  const items = [
    "One point of contact",
    "Flexible remote execution",
    "Faster project coordination",
    "Access to the right specialists"
  ];

  return (
    <div className="bg-[#070709] py-6 border-b border-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-4">
          <div className="text-zinc-500 font-bold text-xs uppercase tracking-wider">
            Why Partner With Us:
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                <CheckCircle2 className="h-4.5 w-4.5 text-brand-red flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
