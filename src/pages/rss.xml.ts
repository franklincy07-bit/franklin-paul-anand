import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { ARTICLE_TYPES } from "../lib/taxonomy";
import { articleUrl, getArticles } from "../lib/content";
import { SITE_NAME } from "../lib/site";
import { link } from "../lib/paths";

// RSS feed of published writing. Drafts and example files are never included
// (getArticles only returns them in local previews).
export async function GET(context: APIContext) {
  const articles = await getArticles();
  return rss({
    title: `${SITE_NAME} – Writing`,
    description:
      "Field notes, insights and practical guides on strategic leadership, organisational development and social impact.",
    site: new URL(link("/"), context.site).href,
    customData: "<language>en-gb</language>",
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.summary,
      pubDate: a.data.date,
      link: articleUrl(a),
      categories: [ARTICLE_TYPES[a.data.type].label],
    })),
  });
}
