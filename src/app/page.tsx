import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhatWrovesDoes } from "@/components/sections/WhatWrovesDoes";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { ProcessCards } from "@/components/sections/ProcessCards";
import { BenefitCards } from "@/components/sections/BenefitCards";
import { WhoWrovesIsFor } from "@/components/sections/WhoWrovesIsFor";
import { ProofProjects } from "@/components/sections/ProofProjects";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: siteConfig.seo.homeTitle,
  description: siteConfig.seo.homeMeta,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeMeta,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.homeTitle,
    description: siteConfig.seo.homeMeta,
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <TrustStrip />
        <WhatWrovesDoes />
        <ServiceCards limit={6} />
        <ProcessCards />
        <BenefitCards />
        <WhoWrovesIsFor />
        <ProofProjects />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
