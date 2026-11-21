import { getCollection, type CollectionEntry } from "astro:content";

// Drafts (including the example placeholders) are visible only in local
// development previews, never on the published site.
// Example files (named "example-…") are excluded from the live site even if
// their draft flag were changed by mistake.
const visible = ({ id, data }: { id: string; data: { draft: boolean } }) =>
  import.meta.env.DEV || (!data.draft && !id.startsWith("example-"));

// Newest first; articles with the same date are ordered by title so the
// order never changes between builds.
const byDateDesc = (
  a: { data: { date: Date; title: string } },
  b: { data: { date: Date; title: string } },
) =>
  b.data.date.getTime() - a.data.date.getTime() ||
  a.data.title.localeCompare(b.data.title);

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

/**
 * Field Notes in reading order: by entry number (oldest first), then by date
 * for any without a number. Fails the build if two published Field Notes
 * share an entry number.
 */
export function fieldNotesInOrder(articles: CollectionEntry<"articles">[]) {
  const notes = articles.filter((a) => a.data.type === "field-notes");
  const seen = new Map<number, string>();
  for (const note of notes) {
    const n = note.data.entry;
    if (n == null || note.data.draft) continue;
    if (seen.has(n)) {
      throw new Error(
        `Field Notes entry number ${n} is used twice: "${seen.get(n)}" and "${note.id}". Give each a different "entry".`,
      );
    }
    seen.set(n, note.id);
  }
  return [...notes].sort(
    (a, b) =>
      (a.data.entry ?? Number.MAX_SAFE_INTEGER) -
        (b.data.entry ?? Number.MAX_SAFE_INTEGER) ||
      a.data.date.getTime() - b.data.date.getTime() ||
      a.data.title.localeCompare(b.data.title),
  );
}
