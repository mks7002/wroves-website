import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://wroves.com";
  const staticPages = [
    "",
    "/about",
    "/services",
    "/how-it-works",
    "/blog",
    "/editorial-policy",
    "/contact",
    "/get-started",
    "/partners",
    "/privacy",
    "/terms",
  ];

  const pages: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
  }));

  const articles: MetadataRoute.Sitemap = getPublishedArticles().map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...articles];
}
