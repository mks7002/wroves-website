import React from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { ClipboardList, Users2, Workflow } from "lucide-react";

export const WhatWrovesDoes: React.FC = () => {
  const cards = [
    {
      icon: ClipboardList,
      title: "Project scoping",
      description: "We help break down what you actually need before execution starts, refining specifications to remove ambiguities and set clear goals."
    },
    {
      icon: Users2,
      title: "Specialist sourcing",
      description: "We connect projects with the right remote specialists, freelancers, or delivery teams qualified for your specific technical stack or marketing goals."
    },
    {
      icon: Workflow,
      title: "Execution coordination",
      description: "We keep communication, timelines, and milestones moving forward through one central point of contact. You don't have to manage the noise."
    }
  ];

  return (
    <SectionContainer bg="dark" borderBottom={true} id="what-we-do">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Intro */}
        <div className="lg:col-span-1 space-y-6">
          <span className="text-brand-red font-semibold text-sm tracking-wider uppercase">Our Core Model</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight leading-tight">
            A simpler way to get digital work done
          </h2>
          <p className="text-zinc-400 leading-relaxed font-normal">
            Wroves helps businesses plan, source, and execute digital projects without the usual back-and-forth of hiring, coordinating, and managing multiple people on their own. We act as your project-side partner &mdash; helping structure the work, match the right execution resources, and move the project forward.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-zinc-900/40 border border-zinc-900 hover:border-zinc-800/80 p-8 rounded-lg space-y-4 group transition-all duration-200"
              >
                <div className="h-10 w-10 rounded bg-brand-red/10 flex items-center justify-center text-brand-red transition-colors group-hover:bg-brand-red/15">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-zinc-200 group-hover:text-zinc-100 transition-colors">
                  {card.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </SectionContainer>
  );
};
