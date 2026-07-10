import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: siteConfig.seo.servicesTitle,
  description: siteConfig.seo.servicesMeta,
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: siteConfig.seo.servicesTitle,
    description: siteConfig.seo.servicesMeta,
    url: `${siteConfig.url}/services`,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        {/* Intro */}
        <SectionContainer bg="dark" className="pt-24 pb-12 md:pt-32">
          <PageIntro
            badge="Capabilities"
            title="Digital services Wroves helps businesses execute"
            subtitle="Wroves helps businesses scope, source, and coordinate digital work across web, marketing, growth, and automation needs. Whether you need a website, a custom tool, a lead generation system, or remote execution support for a campaign, we help move the work forward through managed coordination and specialist sourcing."
          />
        </SectionContainer>

        {/* Detailed Services Grid */}
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="space-y-16">
            {services.map((service, idx) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 bg-zinc-950/40 border border-zinc-900/80 rounded-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 hover:border-zinc-800 transition-all duration-200"
              >
                {/* Column 1: Title */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="text-zinc-500 font-bold text-xs uppercase tracking-widest">
                    Service Area {idx + 1}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight">
                    {service.title}
                  </h2>
                  <div className="pt-2">
                    <Button href={`/get-started?service=${encodeURIComponent(service.title)}`} variant="outline" size="sm">
                      Inquire about {service.title}
                    </Button>
                  </div>
                </div>

                {/* Column 2: Deep Description */}
                <div className="lg:col-span-1 flex flex-col justify-center">
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-normal">
                    {service.longDesc}
                  </p>
                </div>

                {/* Column 3: Typical Projects / Deliverables */}
                <div className="lg:col-span-1 bg-zinc-900/20 border border-zinc-900/60 p-6 rounded-lg space-y-4 self-center">
                  <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider">
                    Common Execution Needs
                  </h3>
                  <ul className="space-y-3">
                    {service.useCases.map((useCase, uIdx) => (
                      <li key={uIdx} className="flex items-start gap-2.5 text-zinc-400 text-sm font-normal">
                        <Check className="h-4 w-4 text-brand-red flex-shrink-0 mt-0.5" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>

        {/* Section Footer CTA */}
        <SectionContainer bg="dark" className="py-16 md:py-20 border-t border-zinc-900/50 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 tracking-tight">
              Not sure which category fits your project?
            </h2>
            <p className="text-zinc-400 text-sm md:text-base font-normal">
              Tell Wroves what outcome you need, and we will help you map the specifications, estimate scopes, and assign the right specialists.
            </p>
            <div className="pt-2">
              <Button href="/contact" variant="primary" size="lg">
                Tell Us What Outcome You Need
              </Button>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
