import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `Privacy policy for ${siteConfig.name} digital services.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        <SectionContainer bg="dark" className="pt-24 pb-8 md:pt-32">
          <PageIntro title="Privacy Policy" subtitle="Last Updated: July 2026" />
        </SectionContainer>
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="max-w-3xl mx-auto prose prose-invert text-zinc-400 space-y-6 text-sm font-normal leading-relaxed">
            <p>
              At Wroves, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and safeguard your data when you submit inquiries or use our website.
            </p>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">1. Information We Collect</h2>
            <p>
              When you submit a project inquiry or join our specialist network, we collect info such as your name, email address, phone number, company name, website links, project details, budgets, and capabilities. We also collect metadata like timestamps to protect against spam.
            </p>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">2. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Review your digital project requirements and draft execution proposals.</li>
              <li>Match your project scopes with qualified specialists from our curated remote network.</li>
              <li>Coordinate communications and delivery updates if you execute a contract with us.</li>
              <li>Review qualifications for our partner network applications.</li>
            </ul>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">3. Data Sharing & Third Parties</h2>
            <p>
              We do not sell your personal data. We share project scope details (excluding private contact details during initial vetting, where possible) with pre-vetted specialists in our remote broker network to evaluate project delivery feasibility and estimate pricing.
            </p>
            <h2 className="text-zinc-200 font-bold text-lg pt-4 border-b border-zinc-900 pb-2">4. Contact Us</h2>
            <p>
              If you have any questions regarding this privacy policy or wish to request data deletion, please contact hello@wroves.com.
            </p>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
