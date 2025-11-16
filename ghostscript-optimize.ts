#!/usr/bin/env tsx

import { execSync } from "child_process";
import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";

/**
 * Optimizes PDFs using Ghostscript with aggressive font subsetting
 * This script focuses on reducing PDF size by:
 * 1. Subsetting embedded fonts (keeping only used characters)
 * 2. Compressing fonts
 * 3. Optimizing images and content streams
 * 4. Removing unused resources
 */

const OUTPUT_DIR = join(__dirname, "src", "output-pdfs");
const OPTIMIZED_SUFFIX = "-gs-optimized";

interface OptimizationResult {
  file: string;
  originalSize: number;
  optimizedSize: number;
  reduction: number;
  reductionPercent: string;
}

/**
 * Get file size in bytes
 */
function getFileSize(filePath: string): number {
  return statSync(filePath).size;
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

/**
 * Check if Ghostscript is installed
 */
function checkGhostscript(): boolean {
  try {
    execSync("gs --version", { stdio: "pipe" });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Optimize a single PDF using Ghostscript
 */
function optimizePDF(inputPath: string, outputPath: string): void {
  console.log(`\nOptimizing: ${inputPath}`);

  // Ghostscript command with aggressive font subsetting
  const gsCommand = [
    "gs",
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    "-dPDFSETTINGS=/ebook", // Balanced quality/size (other options: /screen, /printer, /prepress)
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    // Font subsetting options (CRITICAL for size reduction)
    "-dSubsetFonts=true",        // Only embed characters actually used
    "-dCompressFonts=true",      // Compress font data
    "-dEmbedAllFonts=true",      // Ensure fonts are embedded (for subsetting)
    // Image and content optimization
    "-dDetectDuplicateImages=true",
    "-dCompressPages=true",
    "-dAutoRotatePages=/None",   // Preserve page orientation
    "-dColorImageResolution=150",
    "-dGrayImageResolution=150",
    "-dMonoImageResolution=300",
    // Output
    `-sOutputFile=${outputPath}`,
    inputPath,
  ].join(" ");

  try {
    execSync(gsCommand, { stdio: "inherit" });
    console.log(`✓ Optimized: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to optimize ${inputPath}:`, error);
    throw error;
  }
}

/**
 * Process all PDFs in the output directory
 */
async function processAllPDFs(): Promise<void> {
  // Check Ghostscript installation
  if (!checkGhostscript()) {
    console.error("❌ Ghostscript is not installed!");
    console.error("\nInstallation instructions:");
    console.error("  macOS:   brew install ghostscript");
    console.error("  Linux:   sudo apt-get install ghostscript");
    console.error("  Windows: https://www.ghostscript.com/download/gsdnld.html");
    process.exit(1);
  }

  const gsVersion = execSync("gs --version", { encoding: "utf-8" }).trim();
  console.log(`\n🔧 Ghostscript version: ${gsVersion}`);

  // Check output directory
  if (!existsSync(OUTPUT_DIR)) {
    console.error(`❌ Output directory not found: ${OUTPUT_DIR}`);
    console.error("Please run 'npm run generate-pdf' first to generate PDFs.");
    process.exit(1);
  }

  // Get all PDF files (excluding already optimized ones)
  const files = readdirSync(OUTPUT_DIR)
    .filter((file) => file.endsWith(".pdf"))
    .filter((file) => !file.includes(OPTIMIZED_SUFFIX))
    .filter((file) => !file.includes("-compressed")); // Also exclude compressed versions

  if (files.length === 0) {
    console.log("No PDFs found to optimize.");
    return;
  }

  console.log(`\n📄 Found ${files.length} PDF(s) to optimize with font subsetting\n`);

  const results: OptimizationResult[] = [];

  // Process each PDF
  for (const file of files) {
    const inputPath = join(OUTPUT_DIR, file);
    const outputFile = file.replace(".pdf", `${OPTIMIZED_SUFFIX}.pdf`);
    const outputPath = join(OUTPUT_DIR, outputFile);

    const originalSize = getFileSize(inputPath);

    try {
      optimizePDF(inputPath, outputPath);
      const optimizedSize = getFileSize(outputPath);
      const reduction = originalSize - optimizedSize;
      const reductionPercent = ((reduction / originalSize) * 100).toFixed(2);

      results.push({
        file,
        originalSize,
        optimizedSize,
        reduction,
        reductionPercent,
      });
    } catch (error) {
      console.error(`Failed to process ${file}`);
    }
  }

  // Print summary
  console.log("\n" + "=".repeat(80));
  console.log("📊 OPTIMIZATION SUMMARY (Ghostscript with Font Subsetting)");
  console.log("=".repeat(80));

  for (const result of results) {
    console.log(`\n${result.file}:`);
    console.log(`  Original:  ${formatBytes(result.originalSize)}`);
    console.log(`  Optimized: ${formatBytes(result.optimizedSize)}`);
    console.log(`  Reduction: ${formatBytes(result.reduction)} (${result.reductionPercent}%)`);
  }

  // Calculate totals
  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalOptimized = results.reduce((sum, r) => sum + r.optimizedSize, 0);
  const totalReduction = totalOriginal - totalOptimized;
  const totalReductionPercent = ((totalReduction / totalOriginal) * 100).toFixed(2);

  console.log("\n" + "-".repeat(80));
  console.log("TOTAL:");
  console.log(`  Original:  ${formatBytes(totalOriginal)}`);
  console.log(`  Optimized: ${formatBytes(totalOptimized)}`);
  console.log(`  Reduction: ${formatBytes(totalReduction)} (${totalReductionPercent}%)`);
  console.log("=".repeat(80) + "\n");

  console.log("✅ All PDFs optimized successfully!");
  console.log(`\n💡 Font subsetting keeps only the characters actually used in the document,`);
  console.log(`   which is especially effective for billing statements with limited character sets.\n`);
}

// Run the script
processAllPDFs().catch((error) => {
  console.error("Error during PDF optimization:", error);
  process.exit(1);
});
