import { generateBillingStatementPdf } from "./src/features/payment-doc-printer/billing-statement/--generateBillingStatementPdf";

async function main() {
	console.log("Testing PDF-LIB billing statement pipeline...\n");

	// Test with English
	console.log("1. Generating English billing statement...");
	const resultEn = await generateBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun New York|false|organization",
		month: new Date("2025-11-01"),
		language: "en",
	});
	console.log(`✓ English PDF generated: ${resultEn.statement_uri}`);
	console.log(`  Pages: ${resultEn.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultEn.context.Y}`);

	// Test with Traditional Chinese
	console.log("\n2. Generating Traditional Chinese billing statement...");
	const resultZhTW = await generateBillingStatementPdf({
		sub_acc_id: "91|99|神韻紐約|true|organization",
		month: new Date("2025-11-01"),
		language: "zh-TW",
	});
	console.log(`✓ Traditional Chinese PDF generated: ${resultZhTW.statement_uri}`);
	console.log(`  Pages: ${resultZhTW.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultZhTW.context.Y}`);

	// Test with Simplified Chinese
	console.log("\n3. Generating Simplified Chinese billing statement...");
	const resultZhCN = await generateBillingStatementPdf({
		sub_acc_id: "91|99|神韵纽约|true|organization",
		month: new Date("2025-11-01"),
		language: "zh-CN",
	});
	console.log(`✓ Simplified Chinese PDF generated: ${resultZhCN.statement_uri}`);
	console.log(`  Pages: ${resultZhCN.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultZhCN.context.Y}`);

	// Test with Vietnamese
	console.log("\n4. Generating Vietnamese billing statement...");
	const resultVi = await generateBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun New York|false|organization",
		month: new Date("2025-11-01"),
		language: "vi",
	});
	console.log(`✓ Vietnamese PDF generated: ${resultVi.statement_uri}`);
	console.log(`  Pages: ${resultVi.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultVi.context.Y}`);

	// Test with Korean
	console.log("\n5. Generating Korean billing statement...");
	const resultKo = await generateBillingStatementPdf({
		sub_acc_id: "91|99|선윤 뉴욕|true|organization",
		month: new Date("2025-11-01"),
		language: "ko",
	});
	console.log(`✓ Korean PDF generated: ${resultKo.statement_uri}`);
	console.log(`  Pages: ${resultKo.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultKo.context.Y}`);

	// Test with Japanese
	console.log("\n6. Generating Japanese billing statement...");
	const resultJa = await generateBillingStatementPdf({
		sub_acc_id: "91|99|神韻ニューヨーク|true|organization",
		month: new Date("2025-11-01"),
		language: "ja",
	});
	console.log(`✓ Japanese PDF generated: ${resultJa.statement_uri}`);
	console.log(`  Pages: ${resultJa.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultJa.context.Y}`);

	// Test with Spanish
	console.log("\n7. Generating Spanish billing statement...");
	const resultEs = await generateBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun Nueva York|false|organization",
		month: new Date("2025-11-01"),
		language: "es",
	});
	console.log(`✓ Spanish PDF generated: ${resultEs.statement_uri}`);
	console.log(`  Pages: ${resultEs.context.getPageNo()}`);
	console.log(`  Final Y position: ${resultEs.context.Y}`);

	console.log("\n✅ All 7 language tests completed successfully!");
}

main().catch(console.error);
