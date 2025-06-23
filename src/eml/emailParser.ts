// src/eml/emlParser.ts
import * as fs from "fs";
import { simpleParser } from "mailparser";
import { extractTextFromHtml } from "./htmlToText";

export async function parseEml(
  filePath: string
): Promise<{ text: string; subject: string; hasImageAttachment: boolean }> {
  const raw = fs.readFileSync(filePath);
  const parsed = await simpleParser(raw);

  const subject = parsed.subject || "";
  const hasImageAttachment = parsed.attachments?.some((att) =>
    att.contentType?.startsWith("image/")
  );
  const bodyAsText =
    parsed.text || (parsed.html ? extractTextFromHtml(parsed.html) : "");

  return { text: bodyAsText, subject, hasImageAttachment };
}
