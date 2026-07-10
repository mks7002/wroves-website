import React from "react";
import { SectionContainer } from "../ui/SectionContainer";
import { Target, Sparkles, Building2, UserCheck, Laptop } from "lucide-react";

export const WhoWrovesIsFor: React.FC = () => {
  const categories = [
    {
      icon: RocketIcon,
      title: "Startups & MVPs",
      text: "Founders looking to launch business websites, custom web applications, or minimum viable products quickly to validate their concepts."
    },
    {
      icon: LineChartIcon,
      title: "Growing Brands & Creators",
      text: "Online businesses needing social media marketing support, funnel setups, e-commerce integrations, or outreach campaigns."
    },
    {
      icon: Building2,
      title: "Agencies & Consultants",
      text: "Professional firms seeking backend execution and development support to scale their client bandwidth without hiring overhead."
    },
    {
      icon: Laptop,
      title: "Resource-Lean Teams",
      text: "Organizations that need specialized remote developers or marketers on-demand for critical projects without locking into long-term payroll."
    }
  ];

  return (
    <SectionContainer bg="dark" borderBottom={true} id="target-audience">
      <div className="space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-red font-semibold text-sm tracking-wider uppercase">Ideal Partners</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Built for businesses that need digital execution without the overhead
          </h2>
          <p className="text-zinc-400 leading-relaxed font-normal">
            We partner with businesses that understand the value of speed, flexible resources, and clean execution. If you need digital projects completed but don&rsquo;t want to coordinate multiple freelancers, Wroves is built for you.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="flex gap-4 p-6 bg-zinc-900/30 border border-zinc-900/60 rounded-lg"
              >
                <div className="flex-shrink-0 h-10 w-10 bg-brand-red/10 rounded flex items-center justify-center text-brand-red">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-200">{cat.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-normal">{cat.text}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </SectionContainer>
  );
};

// Clean custom icons using Lucide shapes
const RocketIcon: React.FC<any> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
    <path d="m12 5 9 9" />
    <path d="m9 12 9 9" />
    <path d="M12 12c2-2 5-2.5 7-3.5s1.5-4 .5-5-4-.5-5 .5-1.5 5-3.5 7z" />
    <path d="M9 12c-2 2-2.5 5-3.5 7s-4 1.5-5 .5.5-4 1.5-5 5-1.5 7-3.5z" />
  </svg>
);

const LineChartIcon: React.FC<any> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);
