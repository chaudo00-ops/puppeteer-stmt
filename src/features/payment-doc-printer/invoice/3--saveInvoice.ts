import { promises as fs } from "fs";
import path from "path";
import { INVOICE_PREFIX, type TCreateInvoicePdfParams } from "../--IPMTDocPrinter";
import { fileURLToPath } from "url";

export async function saveInvoice(
  payment: TCreateInvoicePdfParams,
  pdf: Uint8Array,
  html?: string
): Promise<string> {
  const { sub_acc_id, payment_id } = payment;

  const fileName = `${INVOICE_PREFIX}${sub_acc_id}-${payment_id}.pdf`;
  const htmlFileName = `${INVOICE_PREFIX}${sub_acc_id}-${payment_id}.html`;

  // Save to output-pdfs directory
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
