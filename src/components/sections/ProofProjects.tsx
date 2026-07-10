import React from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Layers } from "lucide-react";

export const ProofProjects: React.FC = () => {
  const solutions = [
    {
      title: "Website redesign & lead capture",
      category: "Web Presence",
      desc: "Updating legacy business websites to load faster, display correctly on mobile devices, and capture user leads through structured forms."
    },
    {
      title: "Landing page & funnel support",
      category: "Growth Systems",
      desc: "Creating conversion-optimized funnels to direct marketing campaign traffic, capture email addresses, or route inquiries."
    },
    {
      title: "Social media content execution",
      category: "Digital Marketing",
      desc: "Coordinating design and calendar planning resources to establish regular posts and graphics for brand social pages."
    },
    {
      title: "Custom dashboards & internal tools",
      category: "Web Applications",
      desc: "Structuring custom administrative panels, inventory lists, or client portals to streamline business workflows."
    },
    {
      title: "Lead generation & outreach campaigns",
      category: "B2B Outreach",
      desc: "Configuring email sequences, list qualification steps, and calendar tools to secure client introduction meetings."
    },
    {
      title: "AI workflow automations",
      category: "Business Automation",
      desc: "Linking CRM databases with communication platforms (like Slack or Email) using AI tools to handle repetitive data tasks."
    }
  ];

  return (
    <SectionContainer bg="darker" borderBottom={true} id="solution-areas">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-red font-semibold text-sm tracking-wider uppercase">Example Deliverables</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Projects and solution areas Wroves can support
          </h2>
          <p className="text-zinc-400 leading-relaxed font-normal">
            We focus on honest, practical solutions. Here are typical digital scopes Wroves regularly helps clients coordinate and execute.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/10 border border-zinc-900/60 p-8 rounded-lg space-y-4 hover:border-zinc-800 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-900 px-2 py-1 rounded">
                  {sol.category}
                </span>
                <Layers className="h-4 w-4 text-zinc-600" />
              </div>
              <h3 className="text-lg font-bold text-zinc-200">{sol.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-normal">{sol.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </SectionContainer>
  );
};
