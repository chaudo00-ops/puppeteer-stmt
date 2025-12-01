import type { TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { formatStatementDisplay } from "../helpers/h.4--formatDocumentsDisplay";
import { collectStatementDetails } from "./1--collectStatementDetails";
import { drawPuppeteerStatementPdf } from "./2--drawPuppeteerStatementPdf";
import type { BillingPDFContext } from "../helpers/h.1.1--billingPdfContext";

/**
 * Generate billing statement PDF with context tracking for testing
 * This function returns both the PDF and the context with position information
 */
export async function generateBillingStatementPdf(
  params: TCreateBillingStatementPdfParams
): Promise<{ pdf: Uint8Array; context: BillingPDFContext }> {
  const language = params.language || "en";

  // Step 1: Collect and format statement data
  const statement_details = await collectStatementDetails(params);
  const displayed_details = formatStatementDisplay(statement_details);

  // Step 2: Generate PDF and HTML using Puppeteer with context tracking
  const { pdf, context } = await drawPuppeteerStatementPdf(
    displayed_details,
    language
  );

  return { pdf, context };
}
