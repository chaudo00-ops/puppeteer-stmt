import { TBillingStatementDetails_Display } from "../helpers/h.0--types";
import { TSupportedLanguage } from "../helpers/h.0--translations";
import { BillingPuppeteerRenderer } from "../helpers/h.2.1--billingPuppeteerRenderer";

export async function drawStatementPdf(
	displayed_details: TBillingStatementDetails_Display,
	language: TSupportedLanguage = "en",
) {
	// Use Puppeteer renderer instead of pdf-lib
	const renderer = new BillingPuppeteerRenderer(displayed_details, language);
	const pdfBytes = await renderer.generate();

	// Return PDF bytes, HTML, and context
	return { pdf: pdfBytes, html: renderer.getHtml(), context: renderer.getContext() };
}
