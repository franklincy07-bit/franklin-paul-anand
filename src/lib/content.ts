import { getCollection, type CollectionEntry } from "astro:content";

// Drafts (including the example placeholders) are visible only in local
// development previews, never on the published site.
const visible = ({ data }: { data: { draft: boolean } }) =>
  import.meta.env.DEV || !data.draft;

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.getTime() - a.data.date.getTime();

export async function getArticles(): Promise<CollectionEntry<"articles">[]> {
  return (await getCollection("articles", visible)).sort(byDateDesc);
}

export async function getVideos(): Promise<CollectionEntry<"videos">[]> {
  return (await getCollection("videos", visible)).sort(byDateDesc);
}

export async function getSeries(): Promise<CollectionEntry<"series">[]> {
  return (await getCollection("series", visible)).sort(
    (a, b) => a.data.order - b.data.order,
  );
}

export async function getProfile(): Promise<
  CollectionEntry<"profile">["data"]
> {
  const [entry] = await getCollection("profile");
  if (!entry)
    throw new Error(
      "content/franklin-paul-anand/profile/profile.yaml is missing",
    );
  return entry.data;
}

/** Approximate reading time from the article's Markdown text. */
export function readingMinutes(body: string | undefined): number {
  const words = (body ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const articleUrl = (entry: CollectionEntry<"articles">) =>
  `/writing/${entry.id}/`;
export const videoUrl = (entry: CollectionEntry<"videos">) =>
  `/videos/${entry.id}/`;
export const seriesUrl = (entry: CollectionEntry<"series">) =>
  `/lessons/${entry.id}/`;
