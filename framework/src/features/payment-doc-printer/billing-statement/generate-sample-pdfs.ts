import { promises as fs } from "fs";
import path from "path";
import { generateBillingStatementPdf } from "./--generateBillingStatementPdf";

async function generateSamplePDFs() {
	console.log("Generating sample billing statements...\n");

	// Generate English billing statement
	console.log("1. Generating English billing statement...");
	const englishResult = await generateBillingStatementPdf({
		sub_acc_id: "12|20|Shen Yun Performing Arts New York Company|true|organization",
		month: new Date(),
		language: "en",
	});

	const englishPath = path.join(__dirname, "../../../../sample-billing-statement-english.pdf");
	await fs.writeFile(englishPath, englishResult.pdf);
	console.log(`✓ English PDF saved to: ${englishPath}`);
	console.log(
		`  Pages: Billing=${englishResult.context.getBillingPage()}, Payment=${englishResult.context.getPaymentPage()}\n`,
	);

	// Generate Chinese billing statement
	console.log("2. Generating Chinese (Simplified) billing statement...");
	const chineseResult = await generateBillingStatementPdf({
		sub_acc_id: "12|20|神韵艺术团是一个致力于复兴五千年中华神传文化的艺术团体|true|organization",
		month: new Date(),
		language: "zh-CN",
	});

	const chinesePath = path.join(__dirname, "../../../../sample-billing-statement-chinese.pdf");
	await fs.writeFile(chinesePath, chineseResult.pdf);
	console.log(`✓ Chinese PDF saved to: ${chinesePath}`);
	console.log(
		`  Pages: Billing=${chineseResult.context.getBillingPage()}, Payment=${chineseResult.context.getPaymentPage()}\n`,
	);

	console.log("✓ Done! Sample PDFs generated successfully.");
	console.log("\nYou can view them at:");
	console.log(`  - English: ${englishPath}`);
	console.log(`  - Chinese: ${chinesePath}`);
}

// Run the function
generateSamplePDFs().catch(error => {
	console.error("Error generating sample PDFs:", error);
	process.exit(1);
});
