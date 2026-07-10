import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: siteConfig.seo.aboutTitle,
  description: siteConfig.seo.aboutMeta,
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
  openGraph: {
    title: siteConfig.seo.aboutTitle,
    description: siteConfig.seo.aboutMeta,
    url: `${siteConfig.url}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  const pillars = [
    {
      title: "One point of contact",
      desc: "Forget juggling Slack workspaces, email threads, and invoicing systems with multiple providers. We manage communication in one place."
    },
    {
      title: "Flexible, project-based support",
      desc: "Access specialized skillsets exactly when your campaign or product roadmap needs them, without long-term employment liability."
    },
    {
      title: "Access to broader execution capability",
      desc: "From full-stack Next.js applications and Stripe configurations to custom email funnels and creator outreach strategies."
    },
    {
      title: "Reduced operational friction",
      desc: "We scope projects and coordinate delivery milestones behind the scenes. You see results, not resource conflicts."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        {/* Intro */}
        <SectionContainer bg="dark" className="pt-24 pb-12 md:pt-32">
          <PageIntro
            badge="About Us"
            title="About Wroves"
            subtitle="Wroves exists to make digital execution easier for businesses that need things done but don’t want the friction of hiring, coordinating, and managing everything from scratch."
          />
        </SectionContainer>

        {/* Narrative Sections */}
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Column 1: Problem & Approach */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-wider text-brand-red">
                  The Problem
                </h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
                  Getting digital work done often means juggling scattered freelancers, unclear scopes, inconsistent communication, and too much time spent figuring out who should do what. For many businesses, the challenge isn&rsquo;t just deciding what they need &mdash; it&rsquo;s getting the right work moving without creating a project management mess.
                </p>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-wider text-brand-red">
                  The Wroves Approach
                </h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
                  Wroves helps bridge that gap. We work as a managed digital execution partner &mdash; helping clients clarify what needs to happen, connect the project with the right remote execution support, and keep work moving through a more coordinated process.
                </p>
              </div>
            </div>

            {/* Column 2: What We Help With & Core Why */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-100 uppercase tracking-wider text-brand-red">
                  What we help with
                </h2>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
                  From websites and web apps to lead generation, outreach, marketing support, and automation, Wroves is built to help businesses move digital work forward with less friction and more clarity.
                </p>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-900/60 p-6 rounded-lg space-y-4">
                <h2 className="text-sm font-bold text-zinc-200 uppercase tracking-widest">
                  Our Execution Standard
                </h2>
                <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-normal">
                  We don&rsquo;t hide behind vague buzzwords or claim to have an army of thousands. We maintain a verified, vetted network of specialists who have delivered real-world results. We evaluate every project, select the best talent, and coordinate quality checks.
                </p>
              </div>
            </div>

          </div>
        </SectionContainer>

        {/* Why the model works details */}
        <SectionContainer bg="dark" className="border-t border-zinc-900/50">
          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight">
                Why the model works
              </h2>
              <p className="text-zinc-400 text-sm font-normal">
                By aligning scoping expertise with specialist delivery, we manage details so you can manage results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {pillars.map((pillar, index) => (
                <div key={index} className="flex gap-3.5 p-6 bg-zinc-900/20 border border-zinc-900/80 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-brand-red flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-zinc-200">{pillar.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-normal">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>

        {/* Founder's Vision Section */}
        <SectionContainer bg="darker" className="border-t border-zinc-900/50 relative">
          <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-900/80 rounded-xl p-8 md:p-12 relative overflow-hidden">
            {/* Ambient blur background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Profile Avatar Mock */}
              <div className="flex-shrink-0 h-20 w-20 rounded-full bg-zinc-905 border-2 border-brand-red/80 flex items-center justify-center text-zinc-300 font-extrabold text-2xl tracking-tighter">
                MS
              </div>
              
              <div className="space-y-6">
                <span className="text-brand-red font-semibold text-xs tracking-widest uppercase">Founder&rsquo;s Vision</span>
                
                <blockquote className="text-zinc-300 text-base md:text-lg italic leading-relaxed font-medium">
                  &ldquo;Our mission at Wroves is simple: to eliminate the friction between business ambition and execution. We believe that companies shouldn&rsquo;t be bogged down by the complexities of hiring, vetting, and managing separate freelancers. By establishing a single, trusted coordinator layer, we empower founders to scale their visions while providing elite remote specialists with high-impact projects. We Rise, we Own our execution, and we deliver Value.&rdquo;
                </blockquote>
                
                <div>
                  <div className="text-zinc-100 font-bold text-base">Mayank Singh</div>
                  <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Founder &amp; Director, Wroves</div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        {/* Closing CTA */}
        <SectionContainer bg="dark" className="py-16 text-center border-t border-zinc-900/50">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100">
              Simplify Your Execution
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-normal">
              If you need digital work done and want a simpler way to move it forward, talk to Wroves.
            </p>
            <div className="pt-2">
              <Button href="/get-started" variant="primary" size="lg">
                Discuss Your Requirements
              </Button>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
