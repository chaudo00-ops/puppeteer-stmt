import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { generateInvoicePdf } from "./src/features/payment-doc-printer/invoice/--generateInvoicePdf";

function usage(): string {
	return [
		"Usage:",
		"  npm run generate-invoice -- <sub_acc_id> <payment_id>",
		"  or set env vars SUB_ACC_ID and PAYMENT_ID",
		"",
		"Optional env:",
		"  OUTPUT_DIR=tmp",
	].join("\n");
}

async function main() {
	const [argSubAccId, argPaymentId] = process.argv.slice(2);
	const sub_acc_id = argSubAccId ?? process.env.SUB_ACC_ID;
	const payment_id = argPaymentId ?? process.env.PAYMENT_ID;

	if (!sub_acc_id || !payment_id) {
		console.error(usage());
		process.exit(1);
	}

	const outputDir = process.env.OUTPUT_DIR ?? "tmp";
	await mkdir(outputDir, { recursive: true });

	console.log("Generating invoice PDF via Puppeteer...");
	const { pdf, html, invoice_uri } = await generateInvoicePdf({ sub_acc_id, payment_id });

	const safePaymentId = payment_id.replace(/[^a-zA-Z0-9_-]/g, "_");
	const pdfPath = path.join(outputDir, `invoice-${safePaymentId}.pdf`);
	const htmlPath = path.join(outputDir, `invoice-${safePaymentId}.html`);

	await writeFile(pdfPath, pdf);
	await writeFile(htmlPath, html);

	console.log(`✓ Saved PDF: ${pdfPath}`);
	console.log(`✓ Saved HTML: ${htmlPath}`);
	console.log(`✓ Uploaded invoice URI: ${invoice_uri}`);
}

main().catch(error => {
	console.error("Failed to generate invoice:", error);
	process.exit(1);
});
