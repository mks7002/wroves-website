export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Join Network", href: "/partners" }
  ],
  services: [
    { label: "Web Development", href: "/services#website-development" },
    { label: "Custom Apps", href: "/services#custom-web-apps" },
    { label: "Lead Generation", href: "/services#lead-generation" },
    { label: "AI & Workflows", href: "/services#ai-automation" }
  ],
  contact: [
    { label: "Discuss Project", href: "/get-started" },
    { label: "Inquire Now", href: "/contact" },
    { label: "General Email", href: "mailto:hello@wroves.com" }
  ]
};
