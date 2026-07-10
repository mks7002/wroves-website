import React from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Button } from "../ui/Button";

export const CtaSection: React.FC = () => {
  return (
    <SectionContainer bg="dark" borderBottom={false} className="py-20 md:py-28">
      <div className="relative bg-zinc-950 border border-zinc-900 rounded-2xl p-8 md:p-16 text-center space-y-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            Need digital work done without managing everything yourself?
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-normal">
            Tell Wroves what you&rsquo;re trying to build, improve, launch, or automate. We&rsquo;ll help you figure out the next steps and the right execution path.
          </p>
        </div>

        <div className="relative flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button href="/get-started" variant="primary" size="lg">
            Discuss Your Project
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Wroves
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
};
