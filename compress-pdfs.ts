import { PDFDocument } from 'pdf-lib';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function compressPDF(inputPath: string, outputPath: string): Promise<{ original: number; compressed: number }> {
  // Read the PDF
  const pdfBytes = readFileSync(inputPath);
  const originalSize = pdfBytes.length;

  // Load and save with compression
  const pdfDoc = await PDFDocument.load(pdfBytes, {
    ignoreEncryption: true,
  });

  // Save with maximum compression
  const compressedBytes = await pdfDoc.save({
    useObjectStreams: false, // Disable object streams for smaller size
    addDefaultPage: false,
    objectsPerTick: 50,
  });

  writeFileSync(outputPath, compressedBytes);
  const compressedSize = compressedBytes.length;

  return { original: originalSize, compressed: compressedSize };
}

async function main() {
  const languages = ['en', 'zh-TW', 'zh-CN', 'vi', 'ko', 'ja', 'es'];
  const inputDir = join(__dirname, 'src', 'output-pdfs');

  console.log('Compressing PDFs...\n');

  for (const lang of languages) {
    const inputPath = join(inputDir, `generated-billing-statement-${lang}.pdf`);
    const outputPath = join(inputDir, `generated-billing-statement-${lang}-compressed.pdf`);

    try {
      const { original, compressed } = await compressPDF(inputPath, outputPath);
      const reduction = ((1 - compressed / original) * 100).toFixed(1);
      console.log(`${lang.padEnd(8)} ${(original / 1024).toFixed(0)} KB → ${(compressed / 1024).toFixed(0)} KB (${reduction}% reduction)`);
    } catch (error) {
      console.error(`Error compressing ${lang}:`, error);
    }
  }
}

main().catch(console.error);
