import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { ARTICLE_TYPE_KEYS, THEME_KEYS, TOPIC_KEYS } from "./lib/taxonomy";

// All Franklin Paul Anand content lives in /content at the repository root,
// so it can be edited without touching code.
// See content/README.md and content/_templates/.
// Files and folders starting with "_" are ignored.
const CONTENT = "./content";

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
      // Optional tall illustration shown beside a Field Note on wide screens.
      sideImage: image().optional(),
      sideImageAlt: z.string().optional(),
      video: reference("videos").nullish(),
      // Optional. Blank lines are ignored, so an empty list hides the section.
      takeaways: z
        .array(z.string().nullish())
        .default([])
        .transform((list) =>
          list.map((t) => (t ?? "").trim()).filter((t) => t.length > 0),
        ),
      // Field Notes only: the permanent entry number (1, 2, 3 …). Set it once;
      // it never changes when other articles are added or removed.
      entry: z.number().int().positive().nullish(),
      // Field Notes only: the three-part card at the top of the article.
      storyCard: z
        .object({
          context: z.string(),
          happened: z.string(),
          learned: z.string(),
        })
        .nullish(),
      // Field Notes only: a reflective question shown near the end.
      question: z.string().nullish(),
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
      .nullish(),
    duration: z.string().nullish(),
    topics,
    series: reference("series").nullish(),
    lesson: z.number().int().positive().nullish(),
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
    // Module number in the Non-profit management course (1–6).
    module: z.number().int().positive().nullish(),
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
    expertise: z
      .array(
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
      )
      .refine(
        (areas) =>
          areas.length === TOPIC_KEYS.length &&
          TOPIC_KEYS.every(
            (key) => areas.filter((a) => a.topic === key).length === 1,
          ),
        { message: "expertise must list each of the five topics exactly once" },
      ),
    // Optional "Beyond the job title" text for the About page. The section
    // stays hidden until this is written by the owner.
    beyondTheTitle: z.array(z.string()).optional(),
    workWithMe: z.object({
      intro: z.string(),
      opportunities: z.array(z.object({ title: z.string(), text: z.string() })),
      note: z.string(),
    }),
    links: z.object({
      linkedin: z.url().optional(),
      youtube: z.url().optional(),
      // Formspree form address (https://formspree.io/f/...). The contact form
      // appears only once this is set.
      contactForm: z
        .string()
        .regex(/^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/, {
          message:
            "contactForm must be a Formspree form address like https://formspree.io/f/abcd1234",
        })
        .optional(),
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
        url: z.string().url().optional(),
      }),
    ),
    languages: z.array(z.string()),
  }),
});

export const collections = { articles, videos, series, profile };
