import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { ARTICLE_TYPE_KEYS, THEME_KEYS, TOPIC_KEYS } from "./lib/taxonomy";

// All Franklin Paul Anand content lives in /content/franklin-paul-anand at the
// repository root, so it can be edited without touching code.
// See content/README.md and content/franklin-paul-anand/_templates/.
// Files and folders starting with "_" are ignored.
const CONTENT = "../../content/franklin-paul-anand";

const topics = z.array(z.enum(TOPIC_KEYS)).default([]);

/** Writing: Field Notes, Insights and How-To articles. */
const articles = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `${CONTENT}/articles` }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      type: z.enum(ARTICLE_TYPE_KEYS),
      topics,
      // Optional writing themes, e.g. [ai-digital] shows "Exploring: AI & Digital".
      themes: z.array(z.enum(THEME_KEYS)).default([]),
      featured: z.boolean().default(false),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      video: reference("videos").optional(),
      takeaways: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

/** Videos published on YouTube, each with its own page on the site. */
const videos = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `${CONTENT}/videos` }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    // The ID from the YouTube address, e.g. youtube.com/watch?v=THIS_PART.
    // Leave empty until the channel exists – the site shows a placeholder.
    youtubeId: z
      .string()
      .regex(/^[A-Za-z0-9_-]{11}$/)
      .optional(),
    duration: z.string().optional(),
    topics,
    series: reference("series").optional(),
    lesson: z.number().int().positive().optional(),
    takeaways: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/** Lesson series: a group of videos taught in order. */
const series = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: `${CONTENT}/series` }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    topics,
    order: z.number().int().default(100),
    draft: z.boolean().default(false),
  }),
});

const year = z.union([z.number().int(), z.string()]);

/** Profile facts used by the home, About and Work With Me pages. */
const profile = defineCollection({
  loader: glob({ pattern: "profile.yaml", base: `${CONTENT}/profile` }),
  schema: z.object({
    name: z.string(),
    anchorLine: z.string(),
    shortBio: z.array(z.string()),
    descriptor: z.array(z.string()),
    supportingStatement: z.string(),
    aboutIntro: z.array(z.string()),
    expertise: z.array(
      z.object({
        topic: z.enum(TOPIC_KEYS),
        summary: z.string(),
        details: z.array(
          z.object({
            heading: z.string().optional(),
            points: z.array(z.string()),
          }),
        ),
      }),
    ),
    links: z.object({
      linkedin: z.url().optional(),
      youtube: z.url().optional(),
    }),
    career: z.array(
      z.object({
        role: z.string(),
        organisation: z.string(),
        from: year,
        to: year.optional(),
      }),
    ),
    education: z.array(
      z.object({
        qualification: z.string(),
        institution: z.string(),
        from: year,
        to: year,
      }),
    ),
    recognition: z.array(
      z.object({
        title: z.string(),
        year: year.optional(),
        awardedBy: z.string().optional(),
      }),
    ),
    languages: z.array(z.string()),
  }),
});

export const collections = { articles, videos, series, profile };
