"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { PageIntro } from "@/components/ui/PageIntro";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";

export default function PartnersPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    portfolio: "",
    expertise: "",
    bio: "",
    honeypot: "",
  });
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(Date.now().toString());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Simple validation
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim() || !formData.email.includes("@")) tempErrors.email = "Valid email is required.";
    if (!formData.portfolio.trim()) tempErrors.portfolio = "Portfolio or LinkedIn URL is required.";
    if (!formData.expertise) tempErrors.expertise = "Please select your primary expertise.";
    if (!formData.bio.trim() || formData.bio.length < 15) tempErrors.bio = "Please tell us about your experience in at least 15 characters.";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setStatus("loading");

    // Honeypot check
    if (formData.honeypot.trim()) {
      // Simulate success for bots
      setTimeout(() => setStatus("success"), 1000);
      return;
    }

    try {
      // For now, save interest via a mock or log. In the future, this can submit to a /api/partners endpoint
      // We will make a POST to the same lead pipeline but flag it as a partner application,
      // or simply log it and show a success screen.
      console.log("[Partner Application Submitted]:", { ...formData, timestamp });
      
      // Let's delay to simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-[#0c0c0e]">
        {/* Header Block */}
        <SectionContainer bg="dark" className="pt-24 pb-8 md:pt-32">
          <PageIntro
            badge="Partner Network"
            title="Join the Wroves partner network"
            subtitle="Wroves works with remote specialists and service partners across web, marketing, automation, design, outreach, and related digital execution areas. If you’d like to be considered for future project opportunities, you can express interest here."
          />
        </SectionContainer>

        {/* Content & Form */}
        <SectionContainer bg="darker" className="py-12 border-t border-zinc-900/50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            
            {/* Column 1: Network Pitch */}
            <div className="lg:col-span-1 space-y-6 self-start lg:sticky lg:top-28">
              <h2 className="text-xl font-bold text-zinc-100">Why partner with Wroves?</h2>
              <ul className="space-y-4 text-sm text-zinc-400 font-normal leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-brand-red font-bold">&bull;</span>
                  <span><strong>Zero Client Sourcing Effort:</strong> We manage project acquisition, contract negotiation, and invoicing. You focus entirely on delivery.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-red font-bold">&bull;</span>
                  <span><strong>Clear, Structured Briefs:</strong> We scope projects and resolve client alignment issues *before* bringing you on board.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-red font-bold">&bull;</span>
                  <span><strong>Reliable Compensation:</strong> No chasing clients for payments. Wroves handles disbursements transparently on pre-agreed project milestones.</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Application Form */}
            <div className="lg:col-span-2">
              {status === "success" ? (
                <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-8 text-center space-y-6 animate-fadeIn">
                  <div className="h-16 w-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-zinc-100">Application Received</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
                      Thank you for expressing interest in joining the Wroves network. We catalog skillsets and portfolio links, and will reach out when a project matching your specific vertical is scoped.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 md:p-10 space-y-6 shadow-2xl">
                  {status === "error" && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md text-sm font-medium">
                      An error occurred. Please try again.
                    </div>
                  )}

                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Full Name" error={errors.name} required>
                      <input
                        type="text"
                        name="name"
                        placeholder="Alice Smith"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </FormField>

                    <FormField label="Email Address" error={errors.email} required>
                      <input
                        type="email"
                        name="email"
                        placeholder="alice@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </FormField>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Portfolio or LinkedIn URL" error={errors.portfolio} required>
                      <input
                        type="url"
                        name="portfolio"
                        placeholder="https://github.com/alice or linkedin link"
                        value={formData.portfolio}
                        onChange={handleChange}
                      />
                    </FormField>

                    <FormField label="Primary Expertise" error={errors.expertise} required>
                      <select name="expertise" value={formData.expertise} onChange={handleChange}>
                        <option value="" disabled>Select expertise</option>
                        <option value="Web Development">Web Development (Frontend / Backend)</option>
                        <option value="Design">UI/UX & Brand Design</option>
                        <option value="Copywriting">Copywriting & Content Strategy</option>
                        <option value="SEO">SEO Strategy & Content Architecture</option>
                        <option value="Social Media">Social Media Campaign Management</option>
                        <option value="Automation">Workflow Automation (Zapier/Make)</option>
                        <option value="Outreach">B2B Outreach / Creator Sourcing</option>
                        <option value="Project Management">Project & Delivery Coordination</option>
                        <option value="Other">Other</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Short Bio & Experience Summary" error={errors.bio} required>
                    <textarea
                      name="bio"
                      rows={5}
                      placeholder="Briefly summarize your core skills, systems you work with, and types of projects you have successfully delivered in the past..."
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </FormField>

                  <div className="pt-2 flex justify-end">
                    <Button type="submit" variant="primary" size="md" isLoading={status === "loading"}>
                      Submit Application
                    </Button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </SectionContainer>
      </main>
      <Footer />
    </>
  );
}
