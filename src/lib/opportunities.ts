// Opportunities: "Opportunities for people creating change".
// Categories, audiences, regions and the status rules used by the
// Opportunities pages and checked by the content schema.

export const CATEGORIES = {
  "grants-funding": {
    label: "Grants & Funding",
    short: "Grants & Funding",
    intro:
      "Grants, challenge funds, research funding and funding fellowships for nonprofits, youth-led organisations and changemakers.",
  },
  "jobs-careers": {
    label: "Jobs & Career Opportunities",
    short: "Jobs & Careers",
    intro:
      "Jobs, internships, early-career programmes, scholarships, fellowships, volunteering and consulting assignments in development and social impact.",
  },
} as const;

export type Category = keyof typeof CATEGORIES;
export const CATEGORY_KEYS = Object.keys(CATEGORIES) as [
  Category,
  ...Category[],
];

/** Subcategories, each belonging to one category. */
export const SUBCATEGORIES = {
  "ngo-grants": {
    category: "grants-funding",
    label: "Grants for NGOs and nonprofits",
  },
  "youth-led-funding": {
    category: "grants-funding",
    label: "Funding for youth-led organisations",
  },
  "innovation-challenges": {
    category: "grants-funding",
    label: "Innovation and social-impact challenges",
  },
  "research-grants": {
    category: "grants-funding",
    label: "Research and project grants",
  },
  "funding-fellowships": {
    category: "grants-funding",
    label: "Funding fellowships and seed funding",
  },
  "jobs-internships": {
    category: "jobs-careers",
    label: "Jobs and internships",
  },
  "early-career": {
    category: "jobs-careers",
    label: "Graduate and early-career programmes",
  },
  scholarships: { category: "jobs-careers", label: "Scholarships and study" },
  "career-fellowships": {
    category: "jobs-careers",
    label: "Career and leadership fellowships",
  },
  volunteering: {
    category: "jobs-careers",
    label: "Volunteering and youth engagement",
  },
  consulting: {
    category: "jobs-careers",
    label: "Consulting and professional assignments",
  },
} as const satisfies Record<string, { category: Category; label: string }>;

export type Subcategory = keyof typeof SUBCATEGORIES;
export const SUBCATEGORY_KEYS = Object.keys(SUBCATEGORIES) as [
  Subcategory,
  ...Subcategory[],
];

/**
 * Who a listing is for. Every listing says whether individuals or
 * organisations apply, and its audiences must match: an organisational grant
 * is never presented as an individual opportunity.
 */
export const AUDIENCES = {
  "young-people": {
    label: "Young people and students",
    applicant: "individual",
  },
  "young-professionals": {
    label: "Young professionals",
    applicant: "individual",
  },
  "development-professionals": {
    label: "Development-sector professionals",
    applicant: "individual",
  },
  "youth-led-organisations": {
    label: "Youth-led organisations and changemakers",
    applicant: "organisation",
  },
  "ngos-nonprofits": {
    label: "NGOs and nonprofits",
    applicant: "organisation",
  },
} as const;

export type Audience = keyof typeof AUDIENCES;
export const AUDIENCE_KEYS = Object.keys(AUDIENCES) as [
  Audience,
  ...Audience[],
];

export const APPLICANTS = {
  individual: "Individuals",
  organisation: "Organisations",
} as const;
export type Applicant = keyof typeof APPLICANTS;
export const APPLICANT_KEYS = Object.keys(APPLICANTS) as [
  Applicant,
  ...Applicant[],
];

/** India first, then Asia, Africa and global opportunities open to India. */
export const REGIONS = {
  india: "India",
  asia: "Asia",
  africa: "Africa",
  global: "Global",
} as const;
export type Region = keyof typeof REGIONS;
export const REGION_KEYS = Object.keys(REGIONS) as [Region, ...Region[]];

export const INDIA_ELIGIBLE = {
  yes: "Yes",
  no: "No",
  "not-specified": "Not specified – see the official page",
} as const;
export type IndiaEligible = keyof typeof INDIA_ELIGIBLE;
export const INDIA_ELIGIBLE_KEYS = Object.keys(INDIA_ELIGIBLE) as [
  IndiaEligible,
  ...IndiaEligible[],
];

/** Shown wherever the official source doesn't state a fact. */
export const NOT_SPECIFIED = "Not specified – see the official page";

/** Days before the deadline when a listing counts as "Closing soon". */
export const CLOSING_SOON_DAYS = 14;

export type Status =
  "open" | "closing-soon" | "rolling" | "closed" | "archived";

export const STATUS_LABELS: Record<Status, string> = {
  open: "Open",
  "closing-soon": "Closing soon",
  rolling: "Open · no fixed deadline",
  closed: "Closed",
  archived: "Archived",
};

/** Whole days from `today` to `deadline` (0 on the deadline day itself). */
export function daysLeft(deadline: Date, today = new Date()): number {
  const d = Date.UTC(
    deadline.getUTCFullYear(),
    deadline.getUTCMonth(),
    deadline.getUTCDate(),
  );
  const t = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((d - t) / 86_400_000);
}

/**
 * Status is worked out from the deadline; only Archived is set by hand.
 * The pages also recheck it in the visitor's browser each day, so a listing
 * never shows as open after its deadline even without a rebuild.
 */
export function statusOf(
  data: { deadline?: Date | null; archived: boolean },
  today = new Date(),
): Status {
  if (data.archived) return "archived";
  if (!data.deadline) return "rolling";
  const left = daysLeft(data.deadline, today);
  if (left < 0) return "closed";
  if (left <= CLOSING_SOON_DAYS) return "closing-soon";
  return "open";
}

/** Deadline as written on listings, e.g. "31 January 2027". */
export function formatDeadline(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
