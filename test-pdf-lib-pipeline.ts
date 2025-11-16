import { generateBillingStatementPdf } from "./src/features/payment-doc-printer/billing-statement/--generateBillingStatementPdf";

async function main() {
	console.log("Testing PDF-LIB billing statement pipeline...\n");

	// Test with English
	console.log("Generating English billing statement...");
	const resultEn = await generateBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun New York|false|organization",
		month: new Date("2025-11-01"),
		language: "en",
	});
	console.log(`✓ English PDF generated: ${resultEn.statement_uri}`);
	console.log(`  Pages: ${resultEn.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultEn.context.Y}`);

	// Test with Chinese
	console.log("\nGenerating Chinese billing statement...");
	const resultZh = await generateBillingStatementPdf({
		sub_acc_id: "91|99|神韵纽约|true|organization",
		month: new Date("2025-11-01"),
		language: "zh-CN",
	});
	console.log(`✓ Chinese PDF generated: ${resultZh.statement_uri}`);
	console.log(`  Pages: ${resultZh.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultZh.context.Y}`);

	console.log("\n✅ All tests completed successfully!");
}

main().catch(console.error);
