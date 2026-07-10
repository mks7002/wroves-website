import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.name}`,
  description: `Terms of service for using ${siteConfig.name} services.`,
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        <SectionContainer bg="dark" className="pt-24 pb-8 md:pt-32">
          <PageIntro title="Terms of Service" subtitle="Last Updated: July 2026" />
        </SectionContainer>
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="max-w-3xl mx-auto prose prose-invert text-zinc-400 space-y-6 text-sm font-normal leading-relaxed">
            <p>
              By accessing this website, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.
            </p>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">1. Scope of Service</h2>
            <p>
              Wroves operates as a managed digital services broker and execution coordinator. Our website serves to catalog capabilities, qualify incoming project briefs, and recruit remote delivery partners. The submission of forms on this website does not constitute a binding delivery contract or project agreement.
            </p>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">2. Scoping and Brokerage Proposals</h2>
            <p>
              Information supplied via our inquiry forms is used to build preliminary project scoping blueprints. While we make every effort to suggest realistic timelines, budget tiers, and technology setups, official binding parameters are only established once a formal Service Agreement is executed by both parties.
            </p>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">3. Network Placement</h2>
            <p>
              Applying to our partner network does not guarantee project assignments, inclusions, or minimum retainer amounts. We review applications and catalog capabilities to match future opportunities.
            </p>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">4. Disclaimers</h2>
            <p>
              Wroves does not guarantee specific ranking results, traffic volumes, or conversion targets, unless explicitly written into a Service Agreement. All site information is presented "as is" for informational and lead qualification purposes.
            </p>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
