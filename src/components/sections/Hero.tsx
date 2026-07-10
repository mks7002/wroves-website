import React from "react";
import { Button } from "../ui/Button";

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-[#0c0c0e] pt-24 pb-16 md:pt-32 md:pb-24 border-b border-zinc-900/50">
      {/* Background gradients for visual depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-3xl" />
        <div className="absolute top-10 right-10 w-[250px] h-[250px] rounded-full bg-zinc-800/10 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl space-y-8">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-zinc-800 bg-zinc-900/50 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
            Managed Remote Execution &bull; Service Brokerage
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-100 tracking-tight leading-[1.1]">
            Digital services, web builds, and growth execution &mdash;{" "}
            <span className="text-brand-red block sm:inline">
              handled through one trusted point of contact.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-normal max-w-3xl">
            Wroves helps businesses get digital work done without the hassle of managing multiple freelancers or building a full in-house team. From websites and web apps to marketing, lead generation, and automation, we help scope the work, source the right specialists, and keep execution moving.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="/get-started" variant="primary" size="lg">
              Discuss Your Project
            </Button>
            <Button href="/how-it-works" variant="outline" size="lg">
              See How It Works
            </Button>
          </div>

          {/* Microcopy */}
          <p className="text-xs text-zinc-500 font-medium">
            Tell us what you need. We&rsquo;ll help you figure out the right path to get it done.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 border-t border-zinc-900 pt-8">
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">180+</div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Specialists in Network</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">94%</div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Client Satisfaction</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">40+</div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Skill Verticals</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">6+ yrs</div>
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Coordinated Delivery</div>
          </div>
        </div>

      </div>
    </div>
  );
};
