"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { Button } from "../ui/Button";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-[#0c0c0e]/85 backdrop-blur-md border-b border-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-14 flex items-center bg-black rounded px-2 py-1 overflow-hidden transition-all duration-200 group-hover:border-zinc-800 border border-transparent">
            <img
              src="/logo.jpg"
              alt="Wroves Logo"
              className="h-10 sm:h-11 w-auto object-contain invert brightness-200 contrast-150 mix-blend-screen"
            />
          </div>
          <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase text-zinc-500 font-bold border-l border-zinc-900 pl-3 leading-none">
            We Rise. Own. Value.
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-zinc-100 ${
                  isActive ? "text-zinc-100 font-semibold" : "text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button href="/get-started" variant="primary" size="sm">
            Discuss a Project
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-[#0c0c0e] px-6 py-6 space-y-6 animate-slideDown absolute left-0 right-0 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors hover:text-zinc-100 ${
                    isActive ? "text-zinc-100 font-semibold" : "text-zinc-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-zinc-900">
            <Button
              href="/get-started"
              variant="primary"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Discuss a Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
