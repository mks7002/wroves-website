import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { formatBlogDate, getFeaturedArticle, getPublishedArticles } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Wroves Blog | Web, AI Automation & Digital Growth",
  description:
    "Practical Wroves articles on websites, web applications, AI automation, digital marketing, and technology decisions for growing businesses.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Wroves Blog | Web, AI Automation & Digital Growth",
    description:
      "Practical guidance for businesses making better website, automation, marketing, and technology decisions.",
    url: "/blog",
    type: "website",
  },
};

const topics = [
  {
    title: "Web & Product",
    description: "Websites, web applications, UX, performance, platforms, and practical build decisions.",
  },
  {
    title: "AI & Automation",
    description: "Useful automation workflows, implementation choices, safeguards, and realistic business use cases.",
  },
  {
    title: "Digital Growth",
    description: "SEO, digital marketing, lead generation, online operations, and sustainable growth systems.",
  },
];

export default function BlogPage() {
  const articles = getPublishedArticles();
  const featured = getFeaturedArticle();
  const latest = articles.filter((article) => article.id !== featured?.id);

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-zinc-100">
      <Navbar />

      <section className="border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">
              Wroves Journal
            </p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Practical technology guidance for growing businesses.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
              Clear, useful articles on websites, web applications, AI automation, digital marketing,
              and the technology decisions behind better online operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <Link
                href="/editorial-policy"
                className="rounded-full border border-zinc-800 px-4 py-2 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
              >
                Editorial standards
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-zinc-800 px-4 py-2 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
              >
                Explore Wroves services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-12">
        <div className="grid md:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <div key={topic.title} className="rounded-2xl border border-zinc-900 bg-zinc-950/40 p-6">
              <h2 className="font-semibold text-zinc-100">{topic.title}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid lg:grid-cols-2 rounded-2xl border border-zinc-800 bg-zinc-950/60 overflow-hidden hover:border-zinc-700 transition-colors"
          >
            <div className="aspect-[16/10] lg:aspect-auto bg-zinc-900 overflow-hidden">
              <img
                src={featured.featuredImage}
                alt={featured.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-zinc-500">
                <span>Featured</span><span>•</span><span>{featured.category}</span><span>•</span><span>{featured.readingTime}</span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight group-hover:text-white">
                {featured.title}
              </h2>
              <p className="mt-5 text-zinc-400 leading-7">{featured.excerpt}</p>
              <div className="mt-8 text-sm text-zinc-500">
                By {featured.author} · {formatBlogDate(featured.publishedAt)}
              </div>
            </div>
          </Link>
        )}

        <div className="mt-16">
          <div className="flex items-end justify-between gap-6 border-b border-zinc-900 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">Latest</p>
              <h2 className="mt-2 text-2xl font-semibold">Latest articles</h2>
            </div>
            <p className="hidden md:block max-w-lg text-right text-sm leading-6 text-zinc-500">
              Focused on practical web, automation, marketing, and business-technology decisions.
            </p>
          </div>

          {latest.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {latest.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 overflow-hidden hover:border-zinc-700 transition-colors"
                >
                  <div className="aspect-[16/10] bg-zinc-900 overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-wider text-zinc-500">
                      <span>{article.category}</span>
                      <span>{article.readingTime}</span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-white">
                      {article.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400 line-clamp-3">{article.excerpt}</p>
                    <div className="mt-5 text-xs text-zinc-600">
                      By {article.author} · {formatBlogDate(article.publishedAt)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-zinc-500">New articles are coming soon.</p>
          )}
        </div>

        <div className="mt-16 rounded-2xl border border-zinc-900 bg-zinc-950/50 p-7 lg:p-9">
          <h2 className="text-xl font-semibold">How Wroves approaches editorial content</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-zinc-400">
            We aim to publish useful, relevant material that helps readers understand a decision or solve a real business problem.
            We avoid publishing content solely to chase search traffic, and we encourage readers to verify time-sensitive technical,
            pricing, legal, financial, or platform information with primary sources.
          </p>
          <Link href="/editorial-policy" className="inline-block mt-4 text-sm font-medium text-zinc-200 hover:text-white">
            Read our editorial policy →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
