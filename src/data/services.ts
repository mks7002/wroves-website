export interface Service {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  useCases: string[];
}

export const services: Service[] = [
  {
    id: "website-development",
    title: "Website Development",
    shortDesc: "Business websites, service websites, landing pages, and other web experiences built to support growth.",
    longDesc: "Need a business website, service website, landing page set, or a stronger online presence? Wroves helps businesses move website projects forward by helping define requirements, coordinate execution, and source the right support for design and development needs.",
    useCases: [
      "Marketing and corporate websites",
      "Portfolio and presentation sites",
      "High-speed landing pages",
      "CMS setups (WordPress, Webflow, custom)",
      "Ongoing maintenance and updates"
    ]
  },
  {
    id: "custom-web-apps",
    title: "Custom Web Applications",
    shortDesc: "Internal tools, portals, dashboards, or custom web-based systems tailored to business workflows.",
    longDesc: "From internal dashboards and portals to more tailored web-based workflows, Wroves helps scope custom web application needs and coordinate the right execution support for projects that go beyond a standard website.",
    useCases: [
      "Client portals and dashboards",
      "Internal productivity tools",
      "Custom SaaS mockups and MVPs",
      "API integrations and data synchronization",
      "Database-backed systems"
    ]
  },
  {
    id: "landing-pages-funnels",
    title: "Landing Pages & Funnels",
    shortDesc: "High-performance landing pages and funnels designed to convert traffic and capture qualified leads.",
    longDesc: "We help map, design, and develop conversion-centric landing pages and multi-step funnels. By coordinating specialists in copywriting, UX design, and conversion optimization, we deliver structures built to convert.",
    useCases: [
      "Lead generation funnels",
      "Product launch landing pages",
      "Ad campaign landing pages",
      "Multi-step application forms",
      "A/B testing support setup"
    ]
  },
  {
    id: "ecommerce-setup",
    title: "E-commerce Setup",
    shortDesc: "Online stores and payment integrations designed for seamless purchases and easy inventory management.",
    longDesc: "Whether launching a new store or improving an existing one, Wroves coordinates specialists to set up, customize, and optimize e-commerce platforms and payment gateways for a frictionless buying experience.",
    useCases: [
      "Shopify store setup and customization",
      "WooCommerce/WordPress storefronts",
      "Stripe and custom payment integrations",
      "Subscription-based product setup",
      "Digital download delivery systems"
    ]
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    shortDesc: "Organic and paid social campaigns planned and executed to build audience engagement and brand presence.",
    longDesc: "Expand your reach on social networks. Wroves helps you coordinate creative, content, and campaign execution specialists who design, write, and manage social media campaigns that resonate with your target demographic.",
    useCases: [
      "Content calendar planning and creation",
      "Social media graphic design",
      "Paid social campaign management (Meta, LinkedIn, etc.)",
      "Audience engagement monitoring",
      "Analytics and monthly reporting"
    ]
  },
  {
    id: "lead-generation",
    title: "Lead Generation Systems",
    shortDesc: "Outreach, funnel support, and lead capture systems designed to help businesses bring in opportunities.",
    longDesc: "If your business needs help bringing in leads, setting up outreach systems, or building prospecting workflows, Wroves can help coordinate lead generation and outreach-focused execution support.",
    useCases: [
      "B2B prospecting setup",
      "Email outreach sequences",
      "Lead scoring and routing workflows",
      "CRM pipeline configuration",
      "Automated follow-up campaigns"
    ]
  },
  {
    id: "creator-influencer-outreach",
    title: "Creator & Influencer Outreach",
    shortDesc: "Targeted campaigns to find, qualify, and negotiate with creators and influencers to promote your brand.",
    longDesc: "Partner with content creators who have the ears of your target market. Wroves scopes outreach initiatives, sources campaign execution support, and helps coordinate negotiations and content tracking.",
    useCases: [
      "Influencer discovery and vetting",
      "Outreach template design and coordination",
      "Contract negotiation support",
      "Campaign tracking and asset management",
      "Performance reporting"
    ]
  },
  {
    id: "ai-automation",
    title: "AI Automation & Workflows",
    shortDesc: "AI agents, automated workflows, and tool integrations to save hours and reduce manual business tasks.",
    longDesc: "Leverage AI to streamline your operations. We help identify repetitive processes, design workflow automations, and coordinate the development of AI-driven systems (using tools like Zapier, Make, and LLM APIs).",
    useCases: [
      "Customer support chatbots and routing",
      "Automated lead enrichment",
      "AI-driven content drafts and summaries",
      "Workflow triggers (CRM to Slack/Email)",
      "Database clean-up automations"
    ]
  },
  {
    id: "branding-design",
    title: "Branding, Design & Content",
    shortDesc: "Visual assets, logos, copy, and brand style guides designed to present your business professionally.",
    longDesc: "Establish a coherent and premium visual brand. Wroves coordinates talented brand strategists, graphic designers, and copywriters to build everything from brand books to sales collateral.",
    useCases: [
      "Logo design and brand guidelines",
      "Sales decks and presentation styling",
      "Website copywriting and content plans",
      "Marketing assets and print design",
      "Rebranding consultation support"
    ]
  }
];
