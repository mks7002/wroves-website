import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { footerLinks } from "@/data/navigation";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#070709] border-t border-zinc-900 text-zinc-400 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Summary */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-12 flex items-center bg-black rounded px-2 py-1 overflow-hidden transition-all duration-200 group-hover:border-zinc-800 border border-transparent">
                <img
                  src="/logo.jpg"
                  alt="Wroves Logo"
                  className="h-8 w-auto object-contain invert brightness-200 contrast-150 mix-blend-screen"
                />
              </div>
              <span className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold border-l border-zinc-900 pl-3 leading-none">
                We Rise. Own. Value.
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Wroves is a managed digital execution and service coordination partner. We scope requirements, source top remote specialists, and manage delivery through one central contact.
            </p>
            <div className="flex gap-4">
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-100 transition-colors"
                aria-label="Twitter link"
              >
                Twitter
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-100 transition-colors"
                aria-label="LinkedIn link"
              >
                LinkedIn
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-100 transition-colors"
                aria-label="Instagram link"
              >
                Instagram
              </a>
            </div>
          </div>

          {/* Directory Links: Company */}
          <div>
            <h3 className="text-zinc-100 font-semibold text-sm mb-4 tracking-wider uppercase">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-zinc-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Links: Services */}
          <div>
            <h3 className="text-zinc-100 font-semibold text-sm mb-4 tracking-wider uppercase">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-zinc-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Directory Links: Contact */}
          <div>
            <h3 className="text-zinc-100 font-semibold text-sm mb-4 tracking-wider uppercase">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/get-started" className="text-sm hover:text-zinc-100 transition-colors font-medium text-brand-red">
                  Discuss a Project &rarr;
                </Link>
              </li>
              <li className="pt-2 border-t border-zinc-900/60 mt-2">
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">General</span>
                <a href={`mailto:${siteConfig.emails.general}`} className="text-sm hover:text-zinc-100 transition-colors">
                  {siteConfig.emails.general}
                </a>
              </li>
              <li>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Support</span>
                <a href={`mailto:${siteConfig.emails.support}`} className="text-sm hover:text-zinc-100 transition-colors">
                  {siteConfig.emails.support}
                </a>
              </li>
              <li>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Careers / HR</span>
                <a href={`mailto:${siteConfig.emails.hr}`} className="text-sm hover:text-zinc-100 transition-colors">
                  {siteConfig.emails.hr}
                </a>
              </li>
              <li>
                <span className="block text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">Admin</span>
                <a href={`mailto:${siteConfig.emails.admin}`} className="text-sm hover:text-zinc-100 transition-colors">
                  {siteConfig.emails.admin}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {currentYear} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-100 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-100 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
