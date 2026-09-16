import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

const OWNER = "mks7002";
const REPO = "wroves-website";
const PATH = "src/data/blog.json";
const BRANCH = "main";

function githubHeaders() {
  const token = process.env.WROVES_GITHUB_TOKEN;
  if (!token) throw new Error("WROVES_GITHUB_TOKEN is not configured");
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function requireAdmin() {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get("wroves_admin_session")?.value);
}

async function readBlogFile() {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}?ref=${BRANCH}`,
    { headers: githubHeaders(), cache: "no-store" },
  );
  if (!response.ok) throw new Error(`GitHub read failed: ${response.status}`);
  const data = await response.json();
  const json = Buffer.from(data.content, "base64").toString("utf8");
  return { sha: data.sha as string, articles: JSON.parse(json) as unknown[] };
}

async function writeBlogFile(articles: unknown[], sha: string, message: string) {
  const content = `${JSON.stringify(articles, null, 2)}\n`;
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`, {
    method: "PUT",
    headers: { ...githubHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ message, content: Buffer.from(content).toString("base64"), sha, branch: BRANCH }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`GitHub write failed: ${response.status} ${details}`);
  }
  return response.json();
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const result = await readBlogFile();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load articles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const action = body?.action;
    const article = body?.article;

    const current = await readBlogFile();
    const articles = [...current.articles] as Record<string, unknown>[];

    if (action === "save") {
      if (!article || typeof article !== "object") {
        return NextResponse.json({ error: "Article payload is required" }, { status: 400 });
      }

      const required = ["id", "title", "slug", "excerpt", "category", "author", "publishedAt", "readingTime", "featuredImage", "status", "seoTitle", "seoDescription", "content"];
      for (const key of required) {
        if (typeof article[key] !== "string" || !article[key].trim()) {
          return NextResponse.json({ error: `${key} is required` }, { status: 400 });
        }
      }

      const normalized = {
        ...article,
        featured: Boolean(article.featured),
        tags: Array.isArray(article.tags) ? article.tags : [],
      };
      const index = articles.findIndex((item) => item.id === normalized.id);
      if (index >= 0) articles[index] = normalized;
      else articles.unshift(normalized);

      const result = await writeBlogFile(
        articles,
        current.sha,
        `${index >= 0 ? "Update" : "Create"} blog article: ${normalized.title}`,
      );
      return NextResponse.json({ ok: true, action: index >= 0 ? "updated" : "created", result });
    }

    if (action === "delete") {
      if (typeof body?.id !== "string" || !body.id) {
        return NextResponse.json({ error: "Article id is required" }, { status: 400 });
      }
      const next = articles.filter((item) => item.id !== body.id);
      if (next.length === articles.length) return NextResponse.json({ error: "Article not found" }, { status: 404 });
      await writeBlogFile(next, current.sha, `Delete blog article: ${body.id}`);
      return NextResponse.json({ ok: true, action: "deleted" });
    }

    return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to save article" }, { status: 500 });
  }
}
