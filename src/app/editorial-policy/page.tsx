import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Wroves approaches article quality, sourcing, corrections, commercial transparency, and responsible use of AI-assisted tools.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0e] text-zinc-100">
      <Navbar />
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">Wroves Journal</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight">Editorial Policy</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-400">
          This page explains the standards Wroves aims to follow when publishing educational and informational content.
        </p>

        <div className="mt-12 space-y-10 text-zinc-300 leading-8">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-100">Purpose and scope</h2>
            <p className="mt-3">
              Wroves Journal focuses on websites, web applications, AI automation, digital marketing,
              online operations, and business technology. Articles should help readers understand a
              decision, evaluate an approach, or solve a practical problem.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-100">Accuracy and sourcing</h2>
            <p className="mt-3">
              We aim to distinguish general guidance from time-sensitive facts. When an article depends
              on changing product features, pricing, regulations, statistics, or technical documentation,
              readers should verify the latest details with the relevant primary source before making an
              important decision.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-100">Original value</h2>
            <p className="mt-3">
              Our goal is not to publish articles simply because a topic is trending. Wroves aims to add
              practical context, examples, comparisons, implementation considerations, or decision-making
              guidance that is useful to the intended reader.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-100">AI-assisted tools</h2>
            <p className="mt-3">
              Wroves may use software and AI-assisted tools during research, outlining, editing, or drafting.
              These tools do not change our responsibility for what is published. Content should be checked
              for relevance, clarity, factual accuracy where practical, and consistency with this editorial policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-100">Corrections</h2>
            <p className="mt-3">
              If you believe an article contains an important factual error, outdated statement, broken source,
              or misleading wording, please contact Wroves with the article URL and the specific issue.
            </p>
            <Link href="/contact" className="inline-block mt-3 text-zinc-100 hover:underline">
              Contact Wroves about a correction →
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-100">Commercial transparency</h2>
            <p className="mt-3">
              Wroves is a digital service coordination business. Some educational articles may discuss
              services that Wroves also helps clients execute. Informational content should not present
              marketing claims as independent facts, and service inquiries remain separate from editorial guidance.
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </main>
  );
}
