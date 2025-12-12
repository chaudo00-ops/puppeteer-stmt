import type { TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { formatStatementDisplay } from "../helpers/h.4--formatDocumentsDisplay";
import { collectStatementDetails } from "./1--collectStatementDetails";
import { drawPuppeteerStatementPdf } from "./2--drawPuppeteerStatementPdf";
import { saveStatement } from "./3--saveStatement";

export async function puppeteerBillingStatementPdf(params: TCreateBillingStatementPdfParams) {
	const language = params.language || "en";

	// Step 1: Collect and format statement data
	const statement_details = await collectStatementDetails(params);
	const displayed_details = formatStatementDisplay(statement_details);

	// Step 2: Generate PDF and HTML using Puppeteer
	const { pdf, html } = await drawPuppeteerStatementPdf(displayed_details, language);

	// Step 3: Save PDF and HTML versions
	const statement_uri = await saveStatement(params, pdf, html);

	return { pdf, html, statement_uri };
}
