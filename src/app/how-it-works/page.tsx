import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: siteConfig.seo.howItWorksTitle,
  description: siteConfig.seo.howItWorksMeta,
  alternates: {
    canonical: `${siteConfig.url}/how-it-works`,
  },
  openGraph: {
    title: siteConfig.seo.howItWorksTitle,
    description: siteConfig.seo.howItWorksMeta,
    url: `${siteConfig.url}/how-it-works`,
    type: "website",
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      stepNum: "01",
      title: "Start with the requirement",
      body: "Some clients come to Wroves with a clear brief. Others just know the result they want — a new website, a better lead flow, an automation setup, or support with digital execution. Either way, the first step is understanding the business need and the desired outcome."
    },
    {
      stepNum: "02",
      title: "Scope the project",
      body: "Once we understand the requirement, Wroves helps shape the project into a clearer execution plan. That may involve identifying deliverables, clarifying timelines, outlining the type of support needed, and reducing ambiguity before work begins."
    },
    {
      stepNum: "03",
      title: "Match the right execution support",
      body: "Depending on the project, Wroves coordinates the right specialists, remote service providers, or execution resources needed to deliver the work. This allows businesses to access relevant support without having to manually search for and manage every contributor themselves."
    },
    {
      stepNum: "04",
      title: "Coordinate delivery through one point of contact",
      body: "Instead of juggling multiple people and fragmented communication, clients work through one central contact while the project moves through execution. Wroves helps keep communication, coordination, and project momentum in place."
    },
    {
      stepNum: "05",
      title: "Support a wide range of digital projects",
      body: "The model is flexible enough to support websites, web apps, landing pages, lead generation support, creator outreach, marketing execution, AI automation, and other digital service needs that require the right combination of planning and execution support."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        {/* Intro */}
        <SectionContainer bg="dark" className="pt-24 pb-12 md:pt-32">
          <PageIntro
            badge="Process"
            title="How Wroves works"
            subtitle="Wroves is designed for businesses that need digital work done without the overhead of building and managing every piece themselves. We help translate requirements into execution, coordinate the right support, and keep projects moving through one point of contact."
          />
        </SectionContainer>

        {/* Steps Grid */}
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="max-w-4xl mx-auto space-y-12">
            {steps.map((step) => (
              <div
                key={step.stepNum}
                className="bg-zinc-950/30 border border-zinc-900/80 rounded-xl p-8 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start hover:border-zinc-800 transition-colors"
              >
                {/* Number Badge */}
                <div className="text-3xl font-extrabold text-brand-red bg-brand-red/5 border border-brand-red/20 px-4 py-2 rounded flex-shrink-0">
                  {step.stepNum}
                </div>
                
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-100">{step.title}</h2>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Final CTA */}
        <SectionContainer bg="dark" className="py-16 text-center border-t border-zinc-900/50">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100">Ready to start?</h2>
            <p className="text-zinc-400 text-sm md:text-base font-normal">
              Give us the details of your project, and we will formulate a project scoping outline.
            </p>
            <div className="pt-2">
              <Button href="/get-started" variant="primary" size="lg">
                Tell us what you need help with
              </Button>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
