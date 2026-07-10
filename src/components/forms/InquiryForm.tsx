"use client";

import React, { useState, useEffect, useRef } from "react";
import { inquirySchema, InquiryInput } from "@/lib/validation/inquiry";
import { Button } from "../ui/Button";
import { FormField } from "../ui/FormField";

interface InquiryFormProps {
  source?: string;
  submitButtonText?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  source = "Direct",
  submitButtonText = "Submit Project Inquiry",
}) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formLoadTimestamp, setFormLoadTimestamp] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState<InquiryInput>({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    projectType: "",
    budget: "",
    timeline: "",
    details: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Capture timestamp when component loads to perform bot duration check
  useEffect(() => {
    setFormLoadTimestamp(Date.now().toString());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field if present
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
    setStatus("loading");
    setErrors({});
    setErrorMessage("");

    const fullData = {
      ...formData,
      source,
      formTimestamp: formLoadTimestamp,
    };

    // Client-side validation with Zod
    const validation = inquirySchema.safeParse(fullData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        const path = err.path[0] as string;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      setStatus("idle");
      
      // Scroll to the first error
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors && Array.isArray(responseData.errors)) {
          const apiErrors: Record<string, string> = {};
          responseData.errors.forEach((err: any) => {
            apiErrors[err.field] = err.message;
          });
          setErrors(apiErrors);
          throw new Error("Validation failed. Please review the highlighted fields.");
        } else {
          throw new Error(responseData.message || "Something went wrong. Please try again.");
        }
      }

      setStatus("success");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        website: "",
        projectType: "",
        budget: "",
        timeline: "",
        details: "",
        honeypot: "",
      });
    } catch (err: any) {
      console.error("[Form Submit Error]:", err);
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-zinc-950 border border-zinc-900 rounded-lg p-8 md:p-12 text-center space-y-6 max-w-2xl mx-auto animate-fadeIn">
        <div className="h-16 w-16 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-zinc-100">Inquiry Received Successfully</h3>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
            Thank you for sharing your project details. We will review your requirements, draft a tentative execution path, and get back to you shortly.
          </p>
        </div>
        <div className="pt-4">
          <Button onClick={() => setStatus("idle")} variant="outline" size="sm">
            Submit another inquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="bg-zinc-950 border border-zinc-900 rounded-xl p-6 md:p-10 space-y-6 max-w-3xl mx-auto shadow-2xl"
      noValidate
    >
      {/* General Submission Error */}
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-md text-sm font-medium animate-fadeIn">
          {errorMessage}
        </div>
      )}

      {/* Honeypot field (hidden from screen readers and visual layouts) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="honeypot">Leave this field blank</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact: Full Name */}
        <FormField label="Full Name" error={errors.name} required>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
          />
        </FormField>

        {/* Contact: Email */}
        <FormField label="Email Address" error={errors.email} required>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </FormField>

        {/* Contact: WhatsApp / Phone */}
        <FormField label="WhatsApp / Phone Number" error={errors.phone}>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+1 (555) 000-0000 (Optional)"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </FormField>

        {/* Business: Company Name */}
        <FormField label="Company / Brand Name" error={errors.company}>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Acme Corp (Optional)"
            value={formData.company || ""}
            onChange={handleChange}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Link */}
        <FormField label="Website / Instagram / Business Link" error={errors.website}>
          <input
            type="url"
            id="website"
            name="website"
            placeholder="https://example.com (Optional)"
            value={formData.website || ""}
            onChange={handleChange}
          />
        </FormField>

        {/* Service Type */}
        <FormField label="What do you need help with?" error={errors.projectType} required>
          <select
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          >
            <option value="" disabled>Select an option</option>
            <option value="Website Development">Website Development</option>
            <option value="Custom Web Application">Custom Web Application</option>
            <option value="Landing Page / Funnel">Landing Page / Funnel</option>
            <option value="E-commerce Setup">E-commerce Setup</option>
            <option value="Social Media Marketing">Social Media Marketing</option>
            <option value="Lead Generation">Lead Generation</option>
            <option value="Creator / Influencer Outreach">Creator / Influencer Outreach</option>
            <option value="AI Automation / Workflow">AI Automation / Workflow</option>
            <option value="Branding / Design / Content">Branding / Design / Content</option>
            <option value="Other">Other</option>
          </select>
        </FormField>

        {/* Budget */}
        <FormField label="Approximate Budget" error={errors.budget} required>
          <select id="budget" name="budget" value={formData.budget} onChange={handleChange}>
            <option value="" disabled>Select a budget range</option>
            <option value="Under $500">Under $500</option>
            <option value="$500–$1,500">$500–$1,500</option>
            <option value="$1,500–$5,000">$1,500–$5,000</option>
            <option value="$5,000+">$5,000+</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </FormField>

        {/* Timeline */}
        <FormField label="Preferred Timeline" error={errors.timeline}>
          <select id="timeline" name="timeline" value={formData.timeline || ""} onChange={handleChange}>
            <option value="" disabled>Select preferred timeline</option>
            <option value="Urgent (Less than 2 weeks)">Urgent (Less than 2 weeks)</option>
            <option value="1 month">1 month</option>
            <option value="1-3 months">1-3 months</option>
            <option value="Flexible / No rush">Flexible / No rush</option>
          </select>
        </FormField>
      </div>

      {/* Details text area */}
      <FormField label="Project Details / Requirements" error={errors.details} required>
        <textarea
          id="details"
          name="details"
          rows={5}
          placeholder="Please describe the outcome you want to achieve, features required, integrations, or details about your target audience..."
          value={formData.details}
          onChange={handleChange}
        />
      </FormField>

      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full md:w-auto"
          isLoading={status === "loading"}
        >
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};
