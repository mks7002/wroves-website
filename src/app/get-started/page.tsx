import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: siteConfig.seo.getStartedTitle,
  description: siteConfig.seo.getStartedMeta,
  alternates: {
    canonical: `${siteConfig.url}/get-started`,
  },
  openGraph: {
    title: siteConfig.seo.getStartedTitle,
    description: siteConfig.seo.getStartedMeta,
    url: `${siteConfig.url}/get-started`,
    type: "website",
  },
};

export default function GetStartedPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        {/* Header Block */}
        <SectionContainer bg="dark" className="pt-24 pb-8 md:pt-32">
          <PageIntro
            badge="Project Brief"
            title="Start your project with Wroves"
            subtitle="Use this form to share what you’re trying to build, improve, launch, or automate. The more context you provide, the easier it is to understand the project and guide it toward the right execution path."
          />
        </SectionContainer>

        {/* Inquiry Form */}
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 p-6 bg-zinc-900/20 border border-zinc-900/60 rounded-lg flex items-start gap-3">
              <span className="h-2 w-2 rounded-full bg-brand-red mt-1.5 flex-shrink-0 animate-pulse" />
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-normal">
                <strong>Project Scoping Support:</strong> We don&rsquo;t charge for scoping out project pathways. After you submit details, we will help you draft specific project milestones, identify specialist availability, and estimate budgets before you commit to starting.
              </p>
            </div>
            
            <InquiryForm source="Get Started Page" submitButtonText="Submit Project Inquiry" />
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
