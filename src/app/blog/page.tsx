import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { formatBlogDate, getFeaturedArticle, getPublishedArticles } from "@/lib/blog";

export const metadata = {
  title: "Wroves Blog | Insights, Technology & Digital Growth",
  description:
    "Practical insights from Wroves on websites, web applications, AI automation, digital services, and business growth.",
};

export default function BlogPage() {
  const articles = getPublishedArticles();
  const featured = getFeaturedArticle();
  const latest = articles.filter((article) => article.id !== featured?.id);

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-zinc-100">
      <Navbar />

      <section className="border-b border-zinc-900/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">Wroves Journal</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">Ideas that help businesses move forward.</h1>
            <p className="mt-6 text-lg leading-8 text-zinc-400">
              Practical guidance on websites, web applications, AI automation, digital marketing, and the online services businesses need to grow.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-2 rounded-2xl border border-zinc-800 bg-zinc-950/60 overflow-hidden hover:border-zinc-700 transition-colors">
            <div className="aspect-[16/10] lg:aspect-auto bg-zinc-900 overflow-hidden">
              <img src={featured.featuredImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-zinc-500">
                <span>{featured.category}</span><span>•</span><span>{featured.readingTime}</span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-semibold tracking-tight group-hover:text-white">{featured.title}</h2>
              <p className="mt-5 text-zinc-400 leading-7">{featured.excerpt}</p>
              <div className="mt-8 text-sm text-zinc-500">{formatBlogDate(featured.publishedAt)} · {featured.author}</div>
            </div>
          </Link>
        )}

        <div className="mt-16">
          <div className="flex items-end justify-between gap-6 border-b border-zinc-900 pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">Latest</p>
              <h2 className="mt-2 text-2xl font-semibold">Latest articles</h2>
            </div>
          </div>

          {latest.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {latest.map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`} className="group rounded-2xl border border-zinc-800 bg-zinc-950/40 overflow-hidden hover:border-zinc-700 transition-colors">
                  <div className="aspect-[16/10] bg-zinc-900 overflow-hidden">
                    <img src={article.featuredImage} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-wider text-zinc-500">{article.category}</div>
                    <h3 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-white">{article.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400 line-clamp-3">{article.excerpt}</p>
                    <div className="mt-5 text-xs text-zinc-600">{formatBlogDate(article.publishedAt)} · {article.readingTime}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-zinc-500">New articles are coming soon.</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
