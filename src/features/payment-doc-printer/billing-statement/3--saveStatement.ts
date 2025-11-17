import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import {
  STATEMENT_PREFIX,
  type TCreateBillingStatementPdfParams,
} from "../--IPMTDocPrinter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function saveStatement(
  params: TCreateBillingStatementPdfParams,
  pdf: Uint8Array,
  html?: string
): Promise<string> {
  const { month: month_date, language } = params;
  /** month formatted as YYYY-mm */
  const month = month_date.toISOString().substring(0, 7);
  const languageSuffix = language;
  const fileName = `${STATEMENT_PREFIX}-${month}-${languageSuffix}.pdf`;
  const htmlFileName = `${STATEMENT_PREFIX}-${month}-${languageSuffix}.html`;

  // Save to output-pdfs directory
  const outputDir = join(__dirname, "..", "..", "..", "output-pdfs");
  const outputPath = join(outputDir, fileName);
  const htmlOutputPath = join(outputDir, htmlFileName);

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
