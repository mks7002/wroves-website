import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: siteConfig.seo.contactTitle,
  description: siteConfig.seo.contactMeta,
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  openGraph: {
    title: siteConfig.seo.contactTitle,
    description: siteConfig.seo.contactMeta,
    url: `${siteConfig.url}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        {/* Page Header */}
        <SectionContainer bg="dark" className="pt-24 pb-8 md:pt-32">
          <PageIntro
            badge="Contact Us"
            title="Tell us what you need help with"
            subtitle="Whether you need a website, a custom web app, lead generation support, marketing execution, automation help, or another digital service, Wroves can help you figure out the next step and the right execution path."
          />
        </SectionContainer>

        {/* Form Container */}
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <InquiryForm source="Contact Page" submitButtonText="Submit Inquiry" />
          </div>
        </SectionContainer>

        {/* Department-specific contact details */}
        <SectionContainer bg="dark" className="py-16 border-t border-zinc-900/50">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
            <div>
              <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">General Inquiries</span>
              <a href={`mailto:${siteConfig.emails.general}`} className="text-zinc-300 hover:text-white font-semibold text-sm underline decoration-brand-red underline-offset-4 decoration-2">
                {siteConfig.emails.general}
              </a>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Technical Support</span>
              <a href={`mailto:${siteConfig.emails.support}`} className="text-zinc-300 hover:text-white font-semibold text-sm underline decoration-brand-red underline-offset-4 decoration-2">
                {siteConfig.emails.support}
              </a>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Careers & HR</span>
              <a href={`mailto:${siteConfig.emails.hr}`} className="text-zinc-300 hover:text-white font-semibold text-sm underline decoration-brand-red underline-offset-4 decoration-2">
                {siteConfig.emails.hr}
              </a>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Administration</span>
              <a href={`mailto:${siteConfig.emails.admin}`} className="text-zinc-300 hover:text-white font-semibold text-sm underline decoration-brand-red underline-offset-4 decoration-2">
                {siteConfig.emails.admin}
              </a>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
