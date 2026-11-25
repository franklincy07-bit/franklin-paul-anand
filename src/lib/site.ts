// Site-wide settings for the Franklin Paul Anand website.

export const SITE_NAME = "Franklin Paul Anand";

export const DEFAULT_DESCRIPTION =
  "Strategic Leadership · Organisational Development · Social Impact. Building organisations and movements that enable young people and communities to thrive.";

/**
 * Search engines. While this is false, every page carries "noindex",
 * robots.txt asks all crawlers to stay away, and the sitemap is not
 * advertised. Change it to true only at launch, with the owner's approval
 * (tests/content-guard.test.mjs checks it until then).
 */
export const ALLOW_INDEXING = false;

/**
 * Google Analytics (Google tag) measurement ID. Loaded on every page of the
 * built site, never in local development. Set it to an empty string to
 * switch analytics off, and update the Privacy page if you do.
 */
export const GA_MEASUREMENT_ID = "G-40RP127LCS";
