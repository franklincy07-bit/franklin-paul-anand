// Guards against publishing placeholder content on the Franklin Paul Anand
// site. Runs in CI via `pnpm test`.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";

const ROOT = "content";
const FOLDERS = ["articles", "videos", "series"];

// Text that only appears in example files and templates.
const PLACEHOLDERS = [
  "[Example",
  "Your article title",
  "How to … (your guide title)",
  "One or two sentences shown",
  "One or two sentences – shown",
  "Start in the moment – what you saw",
  "Open with the idea in one or two sentences",
  "Who this guide is for, and what they'll be able to do",
  "Video title",
  "Series title",
  "[Step one]",
  "[Title to be confirmed]",
];

function readEntries() {
  const entries = [];
  for (const folder of FOLDERS) {
    for (const name of readdirSync(join(ROOT, folder))) {
      if (!name.endsWith(".md") && !name.endsWith(".mdx")) continue;
      if (name.startsWith("_")) continue;
      const text = readFileSync(join(ROOT, folder, name), "utf8");
      const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
      assert.ok(match, `${folder}/${name} has no front matter`);
      entries.push({
        path: `${folder}/${name}`,
        name,
        data: parse(match[1]) ?? {},
        text,
      });
    }
  }
  return entries;
}

const entries = readEntries();

test("example files are always drafts", () => {
  for (const e of entries.filter((e) => e.name.startsWith("example-"))) {
    assert.equal(e.data.draft, true, `${e.path} must keep "draft: true"`);
  }
});

test("published content contains no example or template text", () => {
  for (const e of entries.filter((e) => e.data.draft !== true)) {
    for (const phrase of PLACEHOLDERS) {
      assert.ok(
        !e.text.includes(phrase),
        `${e.path} is published but still contains placeholder text: "${phrase}"`,
      );
    }
  }
});

test("published Field Notes have unique entry numbers", () => {
  const seen = new Map();
  for (const e of entries.filter(
    (e) => e.data.type === "field-notes" && e.data.draft !== true,
  )) {
    const n = e.data.entry;
    if (n == null) continue;
    assert.ok(
      !seen.has(n),
      `Field Notes entry ${n} is used by both ${seen.get(n)} and ${e.path}`,
    );
    seen.set(n, e.path);
  }
});

test("published story cards are complete or empty", () => {
  // The card shows only when all three parts are written. A half-filled card
  // would silently disappear, so the build points it out instead.
  for (const e of entries.filter((e) => e.data.draft !== true)) {
    const card = e.data.storyCard;
    if (!card) continue;
    const parts = ["context", "happened", "learned"].map((k) =>
      String(card[k] ?? "").trim(),
    );
    const filled = parts.filter((p) => p.length > 0).length;
    assert.ok(
      filled === 0 || filled === 3,
      `${e.path}: fill in all three story card parts (context, happened, learned) or leave all three empty`,
    );
  }
});

test("published lessons have unique numbers within each series", () => {
  const seen = new Map();
  for (const e of entries.filter(
    (e) => e.path.startsWith("videos/") && e.data.draft !== true,
  )) {
    const { series, lesson } = e.data;
    if (!series || lesson == null) continue;
    const key = `${series}#${lesson}`;
    assert.ok(
      !seen.has(key),
      `Lesson ${lesson} of series "${series}" is used by both ${seen.get(key)} and ${e.path}`,
    );
    seen.set(key, e.path);
  }
});

test("the guard itself catches a published placeholder", () => {
  const fake = {
    path: "articles/fake.md",
    data: { draft: false },
    text: "---\ntitle: Your article title\n---\n",
  };
  assert.ok(PLACEHOLDERS.some((p) => fake.text.includes(p)));
});

test("the Franklin Paul Anand site stays out of search engines until launch", () => {
  // Change ALLOW_INDEXING (and this test) only at launch, with the owner's
  // approval.
  const site = readFileSync("src/lib/site.ts", "utf8");
  assert.match(site, /export const ALLOW_INDEXING = false;/);
  const base = readFileSync("src/layouts/Base.astro", "utf8");
  assert.ok(base.includes('content="noindex, nofollow"'));
});
