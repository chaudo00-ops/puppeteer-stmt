import type { TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { formatStatementDisplay } from "../helpers/h.4--formatDocumentsDisplay";
import { collectStatementDetails } from "./1--collectStatementDetails";
import { drawStatementPdf } from "./2--drawBillingStatementPdf";
import { saveStatement } from "./3--saveStatement";

export async function generateBillingStatementPdf(
  params: TCreateBillingStatementPdfParams
) {
  const language = params.language || "en";

  // Step 1: Collect and format statement data
  const statement_details = await collectStatementDetails(params);
  const displayed_details = formatStatementDisplay(statement_details);

  // Step 2: Generate PDF and HTML using Puppeteer
  const { pdf, html, context } = await drawStatementPdf(
    displayed_details,
    language
  );

  // Step 3: Save PDF and HTML versions
  const statement_uri = await saveStatement(params, pdf, html);

  return { pdf, html, context, statement_uri };
}
