import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
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
    openGraph: { title: article.title, description: article.excerpt, images: [article.featuredImage] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(article);

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-zinc-100">
      <Navbar />
      <article>
        <header className="max-w-4xl mx-auto px-6 lg:px-8 pt-16 pb-10 lg:pt-24 lg:pb-14">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-zinc-500">
            <span>{article.category}</span><span>•</span><span>{formatBlogDate(article.publishedAt)}</span><span>•</span><span>{article.readingTime}</span>
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">{article.title}</h1>
          <p className="mt-6 text-lg leading-8 text-zinc-400">{article.excerpt}</p>
          <p className="mt-6 text-sm text-zinc-500">By {article.author}</p>
        </header>

        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="aspect-[16/7] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <img src={article.featuredImage} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="whitespace-pre-wrap text-[17px] leading-8 text-zinc-300">
            {article.content.split("\n").map((paragraph, index) => paragraph.trim() ? <p key={index} className="mb-6">{paragraph}</p> : null)}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-20">
          <div className="border-t border-zinc-900 pt-10">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">Keep reading</p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {related.map((item) => (
                <a key={item.id} href={`/blog/${item.slug}`} className="rounded-xl border border-zinc-800 p-6 hover:border-zinc-700 transition-colors">
                  <div className="text-xs uppercase tracking-wider text-zinc-500">{item.category}</div>
                  <h2 className="mt-3 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">{item.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
