import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { SectionContainer } from "../ui/SectionContainer";
import { ArrowRight } from "lucide-react";

interface ServiceCardsProps {
  limit?: number;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ limit }) => {
  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <SectionContainer bg="darker" borderBottom={true} id="services">
      <div className="space-y-12">
        {/* Header Block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-brand-red font-semibold text-sm tracking-wider uppercase">Capability Directory</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-100 tracking-tight">
            Services businesses come to Wroves for
          </h2>
          <p className="text-zinc-400 leading-relaxed font-normal">
            Whether you need a website, a custom web app, marketing execution, or support building digital systems around your business, Wroves helps you get the right work moving.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service) => (
            <div
              key={service.id}
              className="bg-zinc-900/20 border border-zinc-900/60 p-8 rounded-lg flex flex-col justify-between hover:border-zinc-800 transition-all duration-200"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-zinc-200">{service.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal">{service.shortDesc}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-zinc-900/60">
                <Link
                  href={`/services#${service.id}`}
                  className="inline-flex items-center text-xs font-semibold text-brand-red hover:text-brand-red-hover transition-colors group"
                >
                  Explore service details
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Section Footer CTA */}
        <div className="text-center pt-4">
          <p className="text-zinc-400 text-sm mb-4 font-normal">
            Need something else? Tell us what you&rsquo;re trying to build or improve.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center font-semibold text-sm text-zinc-100 hover:text-white underline decoration-brand-red underline-offset-4 decoration-2 hover:decoration-brand-red-hover transition-all"
          >
            Discuss a custom digital requirement
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
};
