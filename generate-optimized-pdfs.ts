#!/usr/bin/env tsx

import { execSync } from "child_process";
import { statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Integrated PDF generation and optimization workflow
 *
 * This script:
 * 1. Generates PDFs using Puppeteer (with optimized logo)
 * 2. Automatically optimizes them with Ghostscript font subsetting
 * 3. Reports file size savings
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface SizeComparison {
  language: string;
  originalSize: number;
  optimizedSize: number;
  savings: number;
  savingsPercent: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

function getFileSize(filePath: string): number {
  try {
    return statSync(filePath).size;
  } catch {
    return 0;
  }
}

async function main() {
  console.log("\n🚀 Starting integrated PDF generation and optimization pipeline\n");
  console.log("=".repeat(80));

  // Step 1: Generate PDFs
  console.log("\n📄 Step 1: Generating PDFs with Puppeteer (using optimized logo)...\n");
  try {
    execSync("npm run generate-pdf", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ PDF generation failed:", error);
    process.exit(1);
  }

  // Step 2: Optimize PDFs
  console.log("\n⚡ Step 2: Optimizing PDFs with Ghostscript (font subsetting + compression)...\n");
  try {
    execSync("npm run optimize-pdf", { stdio: "inherit" });
  } catch (error) {
    console.error("❌ PDF optimization failed:", error);
    process.exit(1);
  }

  // Step 3: Compare sizes
  console.log("\n📊 Step 3: Comparing file sizes...\n");
  console.log("=".repeat(80));

  const languages = ["en", "zh-TW", "zh-CN", "vi", "ko", "ja", "es"];
  const outputDir = join(__dirname, "src", "output-pdfs");
  const comparisons: SizeComparison[] = [];

  console.log(
    "\n" +
      "Language".padEnd(12) +
      "Original".padEnd(14) +
      "Optimized".padEnd(14) +
      "Savings".padEnd(14) +
      "Reduction"
  );
  console.log("-".repeat(80));

  for (const lang of languages) {
    const originalPath = join(
      outputDir,
      `generated-billing-statement-${lang}.pdf`
    );
    const optimizedPath = join(
      outputDir,
      `generated-billing-statement-${lang}-optimized.pdf`
    );

    const originalSize = getFileSize(originalPath);
    const optimizedSize = getFileSize(optimizedPath);

    if (originalSize > 0 && optimizedSize > 0) {
      const savings = originalSize - optimizedSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(1);

      comparisons.push({
        language: lang,
        originalSize,
        optimizedSize,
        savings,
        savingsPercent,
      });

      console.log(
        lang.padEnd(12) +
          formatBytes(originalSize).padEnd(14) +
          formatBytes(optimizedSize).padEnd(14) +
          formatBytes(savings).padEnd(14) +
          `${savingsPercent}%`
      );
    }
  }

  // Calculate totals
  const totalOriginal = comparisons.reduce((sum, c) => sum + c.originalSize, 0);
  const totalOptimized = comparisons.reduce((sum, c) => sum + c.optimizedSize, 0);
  const totalSavings = totalOriginal - totalOptimized;
  const totalSavingsPercent = ((totalSavings / totalOriginal) * 100).toFixed(1);

  console.log("-".repeat(80));
  console.log(
    "TOTAL".padEnd(12) +
      formatBytes(totalOriginal).padEnd(14) +
      formatBytes(totalOptimized).padEnd(14) +
      formatBytes(totalSavings).padEnd(14) +
      `${totalSavingsPercent}%`
  );
  console.log("=".repeat(80));

  // Summary
  console.log("\n✅ Pipeline completed successfully!");
  console.log("\n💾 Optimization techniques applied:");
  console.log("   • Optimized logo (12 KB vs 257 KB original)");
  console.log("   • Font subsetting (only used characters embedded)");
  console.log("   • Flate compression (lossless ZIP-based compression)");
  console.log("   • Duplicate image detection (repeated logos)");
  console.log("   • PDF structure optimization");
  console.log("\n📁 Output files:");
  console.log(`   Original PDFs: ${outputDir}/generated-billing-statement-*.pdf`);
  console.log(
    `   Optimized PDFs: ${outputDir}/generated-billing-statement-*-optimized.pdf\n`
  );
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
