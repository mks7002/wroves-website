import articles from "@/data/blog.json";

export type BlogStatus = "draft" | "published" | "scheduled";

export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  featuredImage: string;
  featured: boolean;
  status: BlogStatus;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  content: string;
};

export const blogArticles = articles as BlogArticle[];

const PUBLIC_BLOG_CATEGORIES = new Set([
  "Technology",
  "AI & Automation",
  "Business",
  "Digital Marketing",
  "Web Development",
]);

export function getPublishedArticles() {
  return blogArticles
    .filter(
      (article) =>
        article.status === "published" &&
        PUBLIC_BLOG_CATEGORIES.has(article.category),
    )
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export function getArticleBySlug(slug: string) {
  return getPublishedArticles().find((article) => article.slug === slug);
}

export function getFeaturedArticle() {
  return getPublishedArticles().find((article) => article.featured) ?? getPublishedArticles()[0];
}

export function getRelatedArticles(article: BlogArticle, limit = 3) {
  const sameCategory = getPublishedArticles().filter(
    (item) => item.id !== article.id && item.category === article.category,
  );
  const fallback = getPublishedArticles().filter(
    (item) => item.id !== article.id && item.category !== article.category,
  );
  return [...sameCategory, ...fallback].slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
