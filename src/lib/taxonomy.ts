// Shared labels for article types and topics. The keys are what you write in
// a content file's front matter; the labels are what readers see.

export const ARTICLE_TYPES = {
  "field-notes": {
    label: "Field Notes",
    description: "Stories and lessons from experience",
    layout: "journal",
  },
  insight: {
    label: "Insights",
    description: "Perspectives on strategy, organisations and systems",
    layout: "feature",
  },
  "how-to": {
    label: "How-To",
    description: "Practical guides and tools",
    layout: "feature",
  },
} as const;

export type ArticleType = keyof typeof ARTICLE_TYPES;

// The five areas of expertise, used as topics across writing, videos and lessons.
export const TOPICS = {
  "youth-power": "Youth Power & Leadership",
  "strategy-institutions": "Strategy & Institutions",
  "systems-partnerships": "Systems & Partnerships",
  "programme-design": "Programme Design & Innovation",
  "evidence-mel": "Evidence, MEL & Accountability",
} as const;

export type Topic = keyof typeof TOPICS;

export const ARTICLE_TYPE_KEYS = Object.keys(ARTICLE_TYPES) as [
  ArticleType,
  ...ArticleType[],
];
export const TOPIC_KEYS = Object.keys(TOPICS) as [Topic, ...Topic[]];
