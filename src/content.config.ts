import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Content lives in /content/franklin-paul-anand at the repository root.
// See content/README.md.
const CONTENT = "../../content/franklin-paul-anand";

const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: `${CONTENT}/pages` }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: `${CONTENT}/projects` }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    link: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, projects };
