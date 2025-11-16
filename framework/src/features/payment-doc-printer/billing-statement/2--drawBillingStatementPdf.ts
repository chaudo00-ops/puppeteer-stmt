import { TBillingStatementDetails_Display } from "../helpers/h.0--types";
import { TSupportedLanguage } from "../helpers/h.0--translations";
import { BillingPdfEditor } from "../helpers/h.2.1--billingPdfEditor";

export async function drawStatementPdf(
	displayed_details: TBillingStatementDetails_Display,
	language: TSupportedLanguage = "en",
) {
	const documentTitle = language === "zh-CN" ? "账单对账单" : "Billing Statements";
	const editor = new BillingPdfEditor(documentTitle, displayed_details, language);
	await editor.init();

	editor.drawDocumentHeader();

	editor.drawBillTo();
	editor.drawHorizontalLine();

	editor.drawStatementDetails();
	editor.drawHorizontalLine();

	editor.drawActivityTable();
	editor.saveBillingContext();

	editor.drawPaymentsReceived();
	editor.savePaymentContext();
	const pdfBytes = await editor.save();

	// Do something with pdfBytes (download, send to backend, etc.)
	return { pdf: pdfBytes, context: editor.context };
}
