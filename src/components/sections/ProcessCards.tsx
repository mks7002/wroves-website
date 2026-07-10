import React from "react";
import { processSteps } from "@/data/process";
import { SectionContainer } from "../ui/SectionContainer";
import { Button } from "../ui/Button";

export const ProcessCards: React.FC = () => {
  return (
    <SectionContainer bg="dark" borderBottom={true} id="how-it-works">
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-red font-semibold text-sm tracking-wider uppercase">Engagement Workflow</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
            How Wroves works
          </h2>
          <p className="text-zinc-400 leading-relaxed font-normal">
            We simplify sourcing and managing digital talent. By taking care of requirements scoping, matching, and coordination, we let you focus on results.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step) => (
            <div key={step.number} className="relative space-y-4">
              {/* Step indicator */}
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border-2 border-brand-red/30 flex items-center justify-center text-zinc-100 font-extrabold text-sm bg-zinc-950">
                  {step.number}
                </div>
                {step.number < 4 && (
                  <div className="hidden lg:block absolute left-[44px] right-0 top-5 h-0.5 border-t border-dashed border-zinc-800 -z-10" />
                )}
              </div>
              
              <h3 className="text-lg font-bold text-zinc-200 pt-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-normal">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Block */}
        <div className="text-center pt-6">
          <Button href="/get-started" variant="primary" size="lg">
            Start Your Project Inquiry
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};
