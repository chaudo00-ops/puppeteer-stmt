import { TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { formatStatementDisplay } from "../helpers/h.4--formatDocumentsDisplay";
import { collectStatementDetails } from "./1--collectStatementDetails";
import { drawStatementPdf } from "./2--drawBillingStatementPdf";
import { saveStatement } from "./3--saveStatement";

export async function generateBillingStatementPdf(params: TCreateBillingStatementPdfParams) {
	const language = params.language || "en";

	// Step 1.
	const statement_details = await collectStatementDetails(params);
	const displayed_details = formatStatementDisplay(statement_details);

	// Step 2.
	const { pdf, context } = await drawStatementPdf(displayed_details, language);

	// Step 3.
	const statement_uri = await saveStatement(params, pdf);

	return { pdf, context, statement_uri };
}
