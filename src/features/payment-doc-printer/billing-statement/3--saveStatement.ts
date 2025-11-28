import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  STATEMENT_PREFIX,
  type TCreateBillingStatementPdfParams,
} from "../--IPMTDocPrinter";

export async function saveStatement(
  params: TCreateBillingStatementPdfParams,
  pdf: Uint8Array,
  html?: string
): Promise<string> {
  const { month: month_date, language } = params;
  /** month formatted as YYYY-mm */
  const month = month_date.toISOString().substring(0, 7);
  const languageSuffix = language;
  const fileName = `${languageSuffix}-${month}-${STATEMENT_PREFIX}.pdf`;
  const htmlFileName = `${languageSuffix}-${month}-${STATEMENT_PREFIX}.html`;

  // Save to output-pdfs directory
  const outputDir = path.join(__dirname, "..", "..", "..", "output-pdfs");
  const outputPath = path.join(outputDir, fileName);
  const htmlOutputPath = path.join(outputDir, htmlFileName);

  // Ensure the output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  // Write the PDF file
  await fs.writeFile(outputPath, pdf);

  // Optionally save HTML version for easy viewing
  if (html) {
    await fs.writeFile(htmlOutputPath, html, "utf-8");
  }

  return fileName;
}
