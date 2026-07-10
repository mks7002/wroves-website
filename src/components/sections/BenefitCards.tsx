import React from "react";
import { benefits } from "@/data/benefits";
import { SectionContainer } from "../ui/SectionContainer";
import { ShieldCheck } from "lucide-react";

export const BenefitCards: React.FC = () => {
  return (
    <SectionContainer bg="darker" borderBottom={true} id="why-wroves">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-red font-semibold text-sm tracking-wider uppercase">Strategic Advantage</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Why businesses work with Wroves
          </h2>
          <p className="text-zinc-400 leading-relaxed font-normal">
            We bridge the gap between flexible remote talent and professional agency-level coordination. Here is what we bring to the table:
          </p>
        </div>

        {/* Benefits Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/10 border border-zinc-900/80 p-8 rounded-lg space-y-4 hover:border-zinc-800 transition-colors duration-150"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-brand-red flex-shrink-0" />
                <h3 className="text-lg font-bold text-zinc-200">{benefit.title}</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </SectionContainer>
  );
};
