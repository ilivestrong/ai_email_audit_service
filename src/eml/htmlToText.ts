// src/eml/htmlToText.ts
import cheerio from "cheerio";

export function extractTextFromHtml(html: string): string {
  const $ = cheerio.load(html);
  $("script, style, img").remove();
  const text = $("body").text();
  return text.replace(/\s+/g, " ").trim();
}
