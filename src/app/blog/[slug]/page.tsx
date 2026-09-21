import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { siteConfig } from "@/data/site";
import { formatBlogDate, getArticleBySlug, getPublishedArticles, getRelatedArticles } from "@/lib/blog";

export function generateStaticParams() {
  return getPublishedArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found | Wroves" };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      images: [{ url: article.featuredImage, alt: article.title }],
    },
  };
}

function isHeading(line: string) {
  return (
    /^(Executive Summary|Conclusion|Final Takeaway|Frequently Asked Questions|FAQs|Actionable Takeaways)/i.test(line) ||
    /^\d+(?:\.\d+)*\.?\s+/.test(line)
  );
}

function ArticleContent({ content }: { content: string }) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div className="text-[17px] leading-8 text-zinc-300">
      {lines.map((line, index) => {
        if (isHeading(line)) {
          return (
            <h2 key={index} className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-zinc-100">
              {line}
            </h2>
          );
        }

        if (/^(Q\d+:|Q:|Question:)/i.test(line)) {
          return (
            <h3 key={index} className="mt-8 mb-3 text-lg font-semibold text-zinc-100">
              {line}
            </h3>
          );
        }

        return <p key={index} className="mb-6">{line}</p>;
      })}
    </div>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);
  const articleUrl = `${siteConfig.url}/blog/${article.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: articleUrl,
    url: articleUrl,
  };

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-zinc-100">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article>
        <header className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-10 lg:pt-24 lg:pb-14">
          <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
            ← Back to Wroves Journal
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-zinc-500">
            <span>{article.category}</span><span>•</span><span>{formatBlogDate(article.publishedAt)}</span><span>•</span><span>{article.readingTime}</span>
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">{article.title}</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">{article.excerpt}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
            <span>By {article.author}</span>
            <span aria-hidden="true">•</span>
            <Link href="/editorial-policy" className="hover:text-zinc-300 transition-colors">
              Editorial standards
            </Link>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="aspect-[16/7] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <img src={article.featuredImage} alt={article.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <ArticleContent content={article.content} />

          <aside className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
            <h2 className="text-base font-semibold text-zinc-100">About this article</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Wroves publishes practical guidance on web development, AI automation, digital growth, and business technology.
              Time-sensitive facts, pricing, platform features, and regulations can change, so readers should verify important decisions with primary sources.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link href="/editorial-policy" className="text-zinc-300 hover:text-white">Editorial policy</Link>
              <Link href="/about" className="text-zinc-300 hover:text-white">About Wroves</Link>
              <Link href="/contact" className="text-zinc-300 hover:text-white">Report a correction</Link>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
          <div className="border-t border-zinc-900 pt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">Keep reading</p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {related.map((item) => (
                <Link key={item.id} href={`/blog/${item.slug}`} className="rounded-xl border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
                  <div className="text-xs uppercase tracking-wider text-zinc-500">{item.category}</div>
                  <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-500 line-clamp-3">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
