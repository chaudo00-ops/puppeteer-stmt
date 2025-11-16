import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the generate script to analyze character usage
const script = readFileSync(
  join(__dirname, "generate-billing-pdf.ts"),
  "utf-8"
);

// Extract unique characters from each language section
const sections = {
  "zh-TW": script.match(/billingDataZhTW[\s\S]*?^};/m)?.[0] || "",
  "zh-CN": script.match(/billingDataZhCN[\s\S]*?^};/m)?.[0] || "",
  ja: script.match(/billingDataJa[\s\S]*?^};/m)?.[0] || "",
  ko: script.match(/billingDataKo[\s\S]*?^};/m)?.[0] || "",
};

const translationSections = {
  "zh-TW": script.match(/"zh-TW": \{[\s\S]*?\n  \},/)?.[0] || "",
  "zh-CN": script.match(/"zh-CN": \{[\s\S]*?\n  \},/)?.[0] || "",
  ja: script.match(/ja: \{[\s\S]*?\n  \},/)?.[0] || "",
  ko: script.match(/ko: \{[\s\S]*?\n  \},/)?.[0] || "",
};

console.log("Character Usage Analysis\n");
console.log("=" .repeat(60));

for (const [lang, content] of Object.entries(sections)) {
  const translationContent = translationSections[lang] || "";
  const combined = content + translationContent;

  // Extract only CJK characters
  const cjkChars = new Set(
    combined.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\uac00-\ud7af]/g) || []
  );

  console.log(`\n${lang.toUpperCase()}:`);
  console.log(`  Unique CJK characters: ${cjkChars.size}`);
  console.log(`  Sample: ${Array.from(cjkChars).slice(0, 20).join("")}`);

  // Estimate font embedding size
  const estimatedSize = cjkChars.size * 0.5; // ~0.5 KB per glyph average
  console.log(`  Estimated font data: ~${Math.round(estimatedSize)} KB`);
}

console.log("\n" + "=".repeat(60));
console.log("\nNote: This is the data content. When rendered with repeated");
console.log("campaigns (90+ items), actual character count increases significantly.");
