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

// The five areas of expertise. Used as topics across writing, videos and
// lessons, and as the "Where I contribute" areas on the home page.
export const TOPICS = {
  "strategic-leadership": "Strategic Leadership",
  "organisational-development": "Organisational Development",
  "social-impact": "Social Impact",
  "youth-leadership": "Youth Leadership",
  "evidence-learning": "Evidence & Learning",
} as const;

export type Topic = keyof typeof TOPICS;

export const ARTICLE_TYPE_KEYS = Object.keys(ARTICLE_TYPES) as [
  ArticleType,
  ...ArticleType[],
];
export const TOPIC_KEYS = Object.keys(TOPICS) as [Topic, ...Topic[]];

// Writing themes: optional labels on individual articles. They are areas of
// thought leadership and exploration, not core professional competencies.
export const THEMES = {
  "social-innovation": "Social Innovation",
  "ai-digital": "Exploring: AI & Digital",
} as const;

export type Theme = keyof typeof THEMES;
export const THEME_KEYS = Object.keys(THEMES) as [Theme, ...Theme[]];
