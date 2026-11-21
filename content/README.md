# Content: how to add and edit

All website text lives in this `content` folder. You never need to touch
application code to publish something. Every file is a plain text file
written in **Markdown**, a simple way of formatting text.

> **This repository is public.** Everything committed here, including files
> marked `draft: true` and the full history of every change, can be read by
> anyone. **Keep drafts, unpublished ideas and private notes outside this
> repository** (for example in a private document) and add a piece here only
> when it is ready to be published. `draft: true` hides a file from the
> website, not from the repository.

## Folder map

| Folder        | What goes here                                  | Appears on the site |
| ------------- | ----------------------------------------------- | ------------------- |
| `articles/`   | Field Notes, Insights and How-To articles       | Writing             |
| `videos/`     | One file per YouTube video                      | Videos              |
| `series/`     | Lesson series (groups of videos)                | Lessons             |
| `profile/`    | Your career, education, awards, short bio       | Home, About, Work With Me |
| `_templates/` | Templates to copy (never published)             | Nowhere             |

## Adding something new (in the GitHub website)

1. Open the matching template in `_templates/` and copy its contents.
2. Go to the destination folder, click **Add file → Create new file**.
3. Name the file with a short title, in lower case with hyphens, ending in
   `.md`. For example: `why-strategy-stalls.md`.
4. Paste the template, fill in the details between the `---` lines, and write
   your text underneath.
5. Choose **Create a new branch** and open a pull request. The automatic
   checks run on the pull request; the site is published only after the pull
   request is merged into `main`.

## The part between the `---` lines

This block, called *front matter*, gives the website facts about the entry.

```
---
title: Why strategy stalls         # shown as the heading
date: 2026-12-01                   # year-month-day
topics: [social-impact]            # one or more topics, in square brackets
draft: false                       # false = published, true = hidden from the site
---
```

- Keep the `---` lines exactly as they are.
- If something is wrong (a missing title, a mistyped date), the automatic
  check on GitHub will fail and say which file and which field to fix.
  Nothing broken is ever published.
- `draft: true` hides an entry from the website, but it is still public in
  this repository. Finish drafts elsewhere before adding them here.

## Formatting cheatsheet

| Write this               | To get                  |
| ------------------------ | ----------------------- |
| `**bold**`               | **bold**                |
| `*italic*`               | *italic*                |
| `## A heading`           | a section heading       |
| `> A quotation`          | an indented quotation   |
| `- item`                 | a bullet point          |
| `[text](https://…)`      | a link                  |

Files ending `.mdx` can also include interactive components. Use plain `.md`
unless a developer has set something up for you.


## Writing, videos and lessons

**Before publishing anything, run through the checklist in
`docs/publishing-checklist.md` (at the top of the repository).**

### Articles (`articles/`)

**1. Pick the template for what you're writing.** They're in
`_templates/`:

| You're writing… | Template | Layout on the site |
| --- | --- | --- |
| A story or lesson from experience | `article-field-notes.md` | Field Journal |
| A perspective or argument | `article-insight.md` | Feature |
| A practical step-by-step guide | `article-how-to.md` | Feature |

**2. Fill in the fields between the `---` lines:**

| Field | What to write |
| --- | --- |
| `title` | The headline. |
| `summary` | One or two sentences. Shown in lists, and as "The short version" on Insights and How-To. |
| `date` | Year-month-day, for example `2026-12-01`. |
| `type` | Already set by the template. Don't change it. |
| `entry` | **Field Notes only.** This note's number. Look at your last published Field Notes entry and add 1. The number is permanent: adding or removing other articles never changes it. Two published notes can't share a number; the site's check will tell you if they do. |
| `topics` | One or more of `strategic-leadership`, `organisational-development`, `social-impact`, `youth-leadership`, `evidence-learning`, inside the square brackets, separated by commas. |
| `themes` | Optional: `social-innovation`, or `ai-digital` (shown as "Exploring: AI & Digital"). |
| `featured` | `true` shows the article large at the top of the home page. |
| `takeaways` | Optional key points, e.g. `["First point", "Second point"]`. Leave `[]` to hide the section. |
| `storyCard` | **Field Notes only, optional.** Fill in all three lines, or leave all three as `""` to hide the card. A half-filled card is flagged by the site's checks. |
| `question` | **Field Notes only, optional.** A reflective question, or `""` to hide it. |
| `draft` | `false` to publish. `true` hides the entry from the site, but not from this public repository. |

**3. Write underneath.** Each `##` heading starts a new section:

- In **Field Notes**, sections are numbered 01, 02, 03 automatically.
- In **Insights and How-To**, the headings are listed under "In this piece".
- **Optional pull quote:** start a line with `> ` to show it as a large
  quote, for example `> The plan was never the problem.` Leave it out if
  you don't want one.
- **Optional image:** without a `cover` image, article lists show a simple
  text tile with the article type and topic instead.

**4. Before publishing**, run through `docs/publishing-checklist.md`.

**Safety nets:**
- Any optional section left empty simply doesn't appear: the story card,
  the question, the pull quote and the key takeaways can each be left out.
- The site's checks refuse to publish an article that still contains
  example or template text.
- Files named `example-…` never appear on the live site.

### Videos and lessons

- **Each YouTube video** gets a file in `videos/`, made from the
  `video.md` template. Put the 11-character ID from the YouTube address in
  `youtubeId`. Until then, leave it empty and the site shows a placeholder.
- **A lesson series** is a file in `series/`, made from the `series.md`
  template. To add a video to a series, set its `series` field to the
  series file name, without `.md`, and its `lesson` field to the lesson's
  number. Each lesson number can be used only once in a series; the site's
  checks will tell you if two lessons share one.
- **Linking writing and video:** to show a video at the end of an article,
  set the article's `video` field to the video file name, without `.md`.
  The video page then links back to the article automatically.
- **Privacy:** videos play only when a visitor presses play, in YouTube's
  privacy-enhanced mode. Nothing loads from YouTube before that.
- The written notes under a video's front matter, `takeaways` and
  `duration` are all optional; anything left empty doesn't appear.

### Your profile (`profile/profile.yaml`)

One file holds your short bio, career timeline, education, recognition,
languages and links. Edit it like a form: keep the indentation and the
`-` at the start of list items.

The same file also holds:

- the **About** introduction (`aboutIntro`) and the five areas of expertise
  (`expertise`);
- the **Work With Me** wording (`workWithMe`);
- `beyondTheTitle`: optional. The "Beyond the job title" section on the
  About page stays hidden until you write it;
- `links.contactForm`: the Formspree address. The contact form appears only
  once this is set. Until then, the page points people to LinkedIn.

### Example files

Files whose names start with `example-` are **placeholders that
illustrate the design**. They are drafts, so they never appear on the live
site. Delete them, or replace them with your own, whenever you like.
