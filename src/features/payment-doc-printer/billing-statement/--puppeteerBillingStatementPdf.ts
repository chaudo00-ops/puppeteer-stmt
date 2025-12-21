import type { TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { formatStatementDisplay } from "../helpers/h.4--formatDocumentsDisplay";
import { optimizePdfBuffer } from "../helpers/h.6--optimizePdf";
import { collectStatementDetails } from "./1--collectStatementDetails";
import { drawPuppeteerStatementPdf } from "./2--drawPuppeteerStatementPdf";
import { saveStatement } from "./3--saveStatement";

export async function puppeteerBillingStatementPdf(params: TCreateBillingStatementPdfParams) {
	const language = params.language || "en";

	// Step 1: Collect and format statement data
	const statement_details = await collectStatementDetails(params);
	const displayed_details = statement_details.map(stmt => formatStatementDisplay(stmt));

	// Step 2: Generate PDF and HTML using Puppeteer
	/** results: Array<{ pdf: Buffer; html: string }> */
	const includeSummaryFootnotes = statement_details.length > 1;

	const pdf_html_pairs = await Promise.all(
		displayed_details.map(async stmt => {
			const rendered = await drawPuppeteerStatementPdf(
				stmt,
				language,
				includeSummaryFootnotes,
			);
			const optimizedPdf = await optimizePdfBuffer(rendered.pdf);
			return {
				pdf: optimizedPdf,
				html: rendered.html,
			};
		}),
	);

	// Step 3: Save PDF and HTML versions
	const statement_uris = await Promise.all(
		pdf_html_pairs.map(({ pdf, html }) => saveStatement(params, pdf, html)),
	);

	const results = pdf_html_pairs.map(({ pdf, html }, index) => ({
		pdf,
		html,
		statement_uri: statement_uris[index],
	}));
	return results;
}
