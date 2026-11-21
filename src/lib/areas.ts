// The five areas of expertise each have their own colour and icon, used on
// the homepage ("Where I contribute") and the About page, so the areas are
// easy to tell apart and look the same everywhere.
//
// color: bright shade, for use on the dark teal band
// ink:   darker shade, for text and lines on paper or white (passes AA)
// tint:  very light shade, for small backgrounds on paper or white
// icon:  SVG path data for a 24×24 line icon

export interface AreaStyle {
  color: string;
  ink: string;
  tint: string;
  icon: string[];
}

export const AREA_STYLE: Record<string, AreaStyle> = {
  "strategic-leadership": {
    // apricot · compass
    color: "#f0956b",
    ink: "#a94a22",
    tint: "#fbe9e0",
    icon: [
      "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z",
      "M15.5 8.5 13.5 13.5 8.5 15.5 10.5 10.5Z",
    ],
  },
  "organisational-development": {
    // aqua · stacked layers
    color: "#7fcfc9",
    ink: "#1d6f6a",
    tint: "#ddf1ef",
    icon: ["M12 3 3 8l9 5 9-5-9-5Z", "M3 12.5l9 5 9-5", "M3 16.5l9 5 9-5"],
  },
  "social-impact": {
    // gold · ripples
    color: "#ecc15a",
    ink: "#80600a",
    tint: "#f7eccb",
    icon: [
      "M12 10a2 2 0 1 0 0 4a2 2 0 1 0 0-4Z",
      "M12 6a6 6 0 1 0 0 12a6 6 0 1 0 0-12Z",
      "M12 2.5a9.5 9.5 0 1 0 0 19a9.5 9.5 0 1 0 0-19Z",
    ],
  },
  "youth-leadership": {
    // sage · sprout
    color: "#a9d38e",
    ink: "#44712c",
    tint: "#e6f1dc",
    icon: [
      "M12 21v-9",
      "M12 12C12 8 9 5 4 5c0 4 3 7 8 7Z",
      "M12 14.5c0-3 2.5-5.5 7-5.5 0 3-2.5 5.5-7 5.5Z",
    ],
  },
  "evidence-learning": {
    // lavender · bar chart
    color: "#bfb0f0",
    ink: "#5b47a8",
    tint: "#ebe6fa",
    icon: ["M4 20h16", "M7 16v-4", "M12 16V8", "M17 16V5"],
  },
};

const FALLBACK: AreaStyle = {
  color: "#f0956b",
  ink: "#a94a22",
  tint: "#fbe9e0",
  icon: ["M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z"],
};

export const areaStyle = (topic: string): AreaStyle =>
  AREA_STYLE[topic] ?? FALLBACK;
