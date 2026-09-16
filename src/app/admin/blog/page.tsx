"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Loader2, LogOut, Plus, Save, Trash2 } from "lucide-react";

interface Article {
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
  status: "draft" | "published" | "scheduled";
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  content: string;
}

const blankArticle = (): Article => ({
  id: `article-${Date.now()}`,
  title: "",
  slug: "",
  excerpt: "",
  category: "Business Growth",
  author: "Wroves",
  publishedAt: new Date().toISOString(),
  readingTime: "5 min read",
  featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=80",
  featured: false,
  status: "draft",
  seoTitle: "",
  seoDescription: "",
  tags: [],
  content: "Start writing your article here...",
});

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export default function AdminBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const sorted = useMemo(() => [...articles].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)), [articles]);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/admin/blog", { cache: "no-store" });
    if (response.status === 401) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }
    const data = await response.json();
    if (!response.ok) setMessage(data.error || "Unable to load articles");
    else {
      setArticles(data.articles);
      setLoggedIn(true);
      if (!selected && data.articles.length) setSelected(data.articles[0]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: loginPassword }) });
    const data = await response.json();
    if (!response.ok) return setMessage(data.error || "Login failed");
    setLoginPassword("");
    await load();
  }

  function update(field: keyof Article, value: string | boolean | string[]) {
    setSelected((current) => current ? { ...current, [field]: value } : current);
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    if (!selected) return;
    setSaving(true);
    setMessage("");
    const payload = { ...selected, slug: selected.slug || slugify(selected.title), tags: selected.tags };
    const response = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "save", article: payload }) });
    const data = await response.json();
    if (!response.ok) setMessage(data.error || "Unable to save");
    else {
      setMessage("Saved. Vercel will redeploy the updated blog automatically.");
      await load();
      setSelected(payload);
    }
    setSaving(false);
  }

  async function removeArticle() {
    if (!selected || !window.confirm(`Delete “${selected.title || "this article"}”?`)) return;
    setSaving(true);
    const response = await fetch("/api/admin/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete", id: selected.id }) });
    const data = await response.json();
    if (!response.ok) setMessage(data.error || "Unable to delete");
    else {
      setSelected(null);
      setMessage("Article deleted.");
      await load();
    }
    setSaving(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setSelected(null);
    setArticles([]);
  }

  if (loading) return <main className="min-h-screen bg-[#0c0c0e] text-zinc-100 flex items-center justify-center"><Loader2 className="animate-spin" /></main>;

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#0c0c0e] text-zinc-100 flex items-center justify-center px-6">
        <form onSubmit={login} className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-200">← Back to Wroves</Link>
          <p className="mt-10 text-xs uppercase tracking-[0.25em] text-zinc-500 font-semibold">Wroves CMS</p>
          <h1 className="mt-3 text-3xl font-semibold">Blog Admin</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">Sign in to create, edit, publish and manage Wroves articles.</p>
          <label className="block mt-8 text-sm text-zinc-400">Admin password<input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-800 bg-[#0c0c0e] px-4 py-3 outline-none focus:border-zinc-500" autoFocus /></label>
          {message && <p className="mt-4 text-sm text-red-400">{message}</p>}
          <button className="mt-6 w-full rounded-lg bg-white text-black px-5 py-3 font-semibold hover:bg-zinc-200">Sign in</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0c0e] text-zinc-100">
      <header className="border-b border-zinc-900 bg-[#0c0c0e]/95 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[0.25em] text-zinc-600">Wroves CMS</p><h1 className="text-xl font-semibold">Blog Admin</h1></div>
          <div className="flex items-center gap-2"><Link href="/blog" target="_blank" className="px-3 py-2 rounded-lg border border-zinc-800 text-sm text-zinc-300 hover:text-white"><Eye className="h-4 w-4 inline mr-2" />View Blog</Link><button onClick={logout} className="px-3 py-2 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-white"><LogOut className="h-4 w-4 inline mr-2" />Log out</button></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-[300px_minmax(0,1fr)] gap-8">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <button onClick={() => setSelected(blankArticle())} className="w-full rounded-lg bg-white text-black py-3 font-semibold hover:bg-zinc-200"><Plus className="h-4 w-4 inline mr-2" />New article</button>
          <div className="mt-6 space-y-2 max-h-[70vh] overflow-auto pr-1">
            {sorted.map((article) => <button key={article.id} onClick={() => setSelected(article)} className={`w-full text-left p-4 rounded-xl border transition-colors ${selected?.id === article.id ? "border-zinc-600 bg-zinc-900" : "border-zinc-900 bg-zinc-950/40 hover:border-zinc-800"}`}><div className="text-xs text-zinc-600 uppercase">{article.status}</div><div className="mt-1 font-medium line-clamp-2">{article.title || "Untitled article"}</div><div className="mt-2 text-xs text-zinc-600">{article.category}</div></button>)}
          </div>
        </aside>

        <section>
          {!selected ? <div className="rounded-2xl border border-dashed border-zinc-800 p-16 text-center text-zinc-500">Choose an article or create a new one.</div> : (
            <form onSubmit={save} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h2 className="text-2xl font-semibold">{selected.id.startsWith("article-") ? "New article" : "Edit article"}</h2><p className="text-sm text-zinc-600 mt-1">Changes are committed to GitHub and then deployed by Vercel.</p></div><div className="flex gap-2"><button type="button" onClick={removeArticle} className="px-4 py-2 rounded-lg border border-red-950 text-red-400 hover:bg-red-950/30"><Trash2 className="h-4 w-4 inline mr-2" />Delete</button><button disabled={saving} className="px-5 py-2 rounded-lg bg-white text-black font-semibold disabled:opacity-50"><Save className="h-4 w-4 inline mr-2" />{saving ? "Saving…" : "Save article"}</button></div></div>
              {message && <div className="rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">{message}</div>}

              <div className="grid md:grid-cols-2 gap-5">
                <label className="md:col-span-2 block text-sm text-zinc-400">Title<input value={selected.title} onChange={(e) => { update("title", e.target.value); if (!selected.slug) update("slug", slugify(e.target.value)); }} className="field" required /></label>
                <label className="block text-sm text-zinc-400">Slug<input value={selected.slug} onChange={(e) => update("slug", slugify(e.target.value))} className="field" required /></label>
                <label className="block text-sm text-zinc-400">Category<input value={selected.category} onChange={(e) => update("category", e.target.value)} className="field" required /></label>
                <label className="block text-sm text-zinc-400">Author<input value={selected.author} onChange={(e) => update("author", e.target.value)} className="field" required /></label>
                <label className="block text-sm text-zinc-400">Reading time<input value={selected.readingTime} onChange={(e) => update("readingTime", e.target.value)} className="field" required /></label>
                <label className="block text-sm text-zinc-400">Publish date<input type="datetime-local" value={selected.publishedAt.slice(0,16)} onChange={(e) => update("publishedAt", new Date(e.target.value).toISOString())} className="field" required /></label>
                <label className="block text-sm text-zinc-400">Status<select value={selected.status} onChange={(e) => update("status", e.target.value)} className="field"><option value="draft">Draft</option><option value="published">Published</option></select></label>
                <label className="md:col-span-2 block text-sm text-zinc-400">Featured image URL<input value={selected.featuredImage} onChange={(e) => update("featuredImage", e.target.value)} className="field" required /></label>
                <label className="md:col-span-2 block text-sm text-zinc-400">Excerpt<textarea value={selected.excerpt} onChange={(e) => update("excerpt", e.target.value)} className="field min-h-28" required /></label>
                <label className="md:col-span-2 block text-sm text-zinc-400">Article content<textarea value={selected.content} onChange={(e) => update("content", e.target.value)} className="field min-h-[420px] font-mono text-sm" required /><span className="mt-2 block text-xs text-zinc-600">Write plain text with blank lines between paragraphs. Existing article pages will format the paragraphs automatically.</span></label>
                <label className="block text-sm text-zinc-400">SEO title<input value={selected.seoTitle} onChange={(e) => update("seoTitle", e.target.value)} className="field" placeholder="50–60 characters" /></label>
                <label className="block text-sm text-zinc-400">SEO description<textarea value={selected.seoDescription} onChange={(e) => update("seoDescription", e.target.value)} className="field min-h-28" placeholder="150–160 characters" /></label>
                <label className="block text-sm text-zinc-400">Tags<input value={selected.tags.join(", ")} onChange={(e) => update("tags", e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean))} className="field" placeholder="web development, AI, business" /></label>
                <label className="flex items-center gap-3 text-sm text-zinc-400 pt-8"><input type="checkbox" checked={selected.featured} onChange={(e) => update("featured", e.target.checked)} className="h-4 w-4" />Feature this article on the blog homepage</label>
              </div>
            </form>
          )}
        </section>
      </div>
      <style jsx>{`.field{margin-top:.5rem;width:100%;border:1px solid rgb(39 39 42);background:#0c0c0e;border-radius:.5rem;padding:.7rem .9rem;color:#f4f4f5;outline:none}.field:focus{border-color:rgb(113 113 122)}`}</style>
    </main>
  );
}
