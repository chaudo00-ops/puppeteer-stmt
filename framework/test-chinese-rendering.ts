import { generateBillingStatementPdf } from "./src/features/payment-doc-printer/billing-statement/--generateBillingStatementPdf";
import { promises as fs } from "fs";

async function testChineseRendering() {
	console.log("Testing Chinese character rendering...\n");

	// Generate minimal Chinese PDF
	const result = await generateBillingStatementPdf({
		sub_acc_id: "2|2|神韵纽约公司|false|organization",
		month: new Date(),
		language: "zh-CN",
	});

	const outputPath = "./test-chinese-minimal.pdf";
	await fs.writeFile(outputPath, result.pdf);

	const stats = await fs.stat(outputPath);
	console.log(`✓ Test PDF generated: ${outputPath}`);
	console.log(`  Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
	console.log(`  Billing pages: ${result.context.getBillingPage()}`);
	console.log(`  Payment pages: ${result.context.getPaymentPage()}`);
	console.log("\nExpected Chinese text in PDF:");
	console.log("  - Title: 账单对账单");
	console.log("  - Bill To: 账单收件人");
	console.log("  - Details: 详细信息");
	console.log("  - Table headers: 描述, 展示次数, 金额");
	console.log("  - Campaign names: 广告活动 0, 广告活动 1");
	console.log("  - Payments: 收到的付款");
	console.log("\nPlease open the PDF to verify all Chinese characters display correctly.");
}

testChineseRendering().catch(console.error);
