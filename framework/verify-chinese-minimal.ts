import { generateBillingStatementPdf } from "./src/features/payment-doc-printer/billing-statement/--generateBillingStatementPdf";
import { promises as fs } from "fs";

async function verifyMinimalChinese() {
	console.log("Generating ultra-minimal Chinese PDF for verification...\n");

	// Generate with just 1 spending and 1 payment row
	const result = await generateBillingStatementPdf({
		sub_acc_id: "1|1|测试公司|false|organization",
		month: new Date(),
		language: "zh-CN",
	});

	const outputPath = "./verify-chinese-ultra-minimal.pdf";
	await fs.writeFile(outputPath, result.pdf);

	const stats = await fs.stat(outputPath);
	console.log(`✓ Verification PDF generated: ${outputPath}`);
	console.log(`  Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
	console.log(`  Pages: ${result.context.getBillingPage() + result.context.getPaymentPage()}`);

	console.log("\n📋 This PDF should contain:");
	console.log("  Page 1:");
	console.log("    - Title: 账单对账单 (NOT 'Billing Statements')");
	console.log("    - 账单收件人 section");
	console.log("    - 详细信息 section");
	console.log("    - 摘要 section");
	console.log("    - 活动详情 section");
	console.log("    - Table header: 描述 | 展示次数 | 金额");
	console.log("    - Row: 广告活动 1 | 98,765 | -$123.45");
	console.log("    - 小计： and 总计：");
	console.log("\n  Page 2:");
	console.log("    - Title: 账单对账单");
	console.log("    - Header: 收到的付款 (NOT 'Payments Received')");
	console.log("    - Table header: 日期 | 描述 | 金额");
	console.log("    - 税：");
	console.log("    - 收到的总付款");

	console.log("\n✅ All Chinese characters should render clearly with NO boxes (□)");
	console.log("✅ All English labels should be replaced with Chinese");
}

verifyMinimalChinese().catch(console.error);
