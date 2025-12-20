import { initPackage } from "../../../init-package";
initPackage();

import { initIntegrationTest } from "df-backend-02/dist/src/test/init-integration-test";
import * as fs from "fs";
import * as path from "path";
import { ads_test_utils } from "../../table-tests/helpers/ads-test-utils";
import { uTest_initAdsTables } from "../../table-tests/helpers/init-ads-tables";
import { puppeteerBillingStatementPdf } from "./--puppeteerBillingStatementPdf-MultiplePaymentProfiles";
import { dbg_var_saveStmt } from "./3--saveStatement";

initIntegrationTest(
	__filename,
	[
		ads_test_utils.db.users.tester_clean,
		ads_test_utils.db.subaccounts.tester,
		ads_test_utils.db.extensions.tester.billing_statement,
		ads_test_utils.db.extensions.tester.multi_payment_profile,
	],
	ads_test_utils.initDBAndServices,
	uTest_initAdsTables,
);

jest.mock("./1--collectStatementDetails-MultiplePaymentProfiles", () =>
	require("./__mocks__/1--collectStatementDetails_puppeteer_MultiplePaymentProfiles"),
);

dbg_var_saveStmt.save_html = true;

const tester_ad_acc_id = ads_test_utils.tester.accounts.adAcc1.id;

/*
 * Billing Statement To Do
 * Add Balance Adjustments
 * Shuffle. campaign name and cost
 */

/*
 * Test for case where there Payment Profile ID overflows to the next line
 */

const SNAPSHOT_DIR = path.resolve(
	"./",
	"src/features/payment-doc-printer/billing-statement/__snapshots__/billing-statement",
);

function expectHtmlToMatchSnapshot(html: string | undefined, snapshotFileName: string) {
	if (typeof html !== "string") {
		throw new Error(
			`HTML snapshot "${snapshotFileName}" can only be compared against a string value.`,
		);
	}

	const snapshotPath = path.join(SNAPSHOT_DIR, snapshotFileName);
	const snapshotState = expect.getState().snapshotState as
		| { _updateSnapshot?: "all" | "new" | "none" }
		| undefined;
	const updateMode = snapshotState?._updateSnapshot ?? "new";
	const snapshotExists = fs.existsSync(snapshotPath);
	const canWriteNewSnapshot = updateMode === "all" || updateMode === "new";
	const shouldUpdateExistingSnapshot = updateMode === "all";

	if (!snapshotExists && !canWriteNewSnapshot) {
		throw new Error(
			`Missing HTML snapshot at ${snapshotPath}. Re-run the test with "-u" to create it.`,
		);
	}

	if (
		(!snapshotExists && canWriteNewSnapshot) ||
		(snapshotExists && shouldUpdateExistingSnapshot)
	) {
		fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
		fs.writeFileSync(snapshotPath, html, "utf-8");
	}

	const expectedHtml = fs.readFileSync(snapshotPath, "utf-8");
	expect(html).toBe(expectedHtml);
}

describe("English language", () => {
	describe("Short description", () => {
		test(`Edge case #1: No activity details records. No payments received records.`, async () => {
			// ✅ BREAK POINT defined
			// ✅ PASSED
			// Generate the billing statement
			const results = await puppeteerBillingStatementPdf({
				sub_acc_id: tester_ad_acc_id,
				month: new Date("2025-10"),
				language: "en",
			});

			// Verify the result structure
			expect(results[0]).toHaveProperty("pdf");
			expect(results[0]).toHaveProperty("html");
			expect(results[0]).toHaveProperty("statement_uri");

			// Verify PDF is generated
			expect(results[0].pdf).toBeInstanceOf(Uint8Array);
			expect(results[0].pdf.length).toBeGreaterThan(0);

			// Verify HTML is generated
			expect(results[0].html).toBeTruthy();
			expect(typeof results[0].html).toBe("string");
			expectHtmlToMatchSnapshot(results[0].html, "en-short-pmt-prf-1.html");

			// Verify the result structure
			expect(results[1]).toHaveProperty("pdf");
			expect(results[1]).toHaveProperty("html");
			expect(results[0]).toHaveProperty("statement_uri");

			// Verify PDF is generated
			expect(results[1].pdf).toBeInstanceOf(Uint8Array);
			expect(results[1].pdf.length).toBeGreaterThan(0);

			// Verify HTML is generated
			expect(results[1].html).toBeTruthy();
			expect(typeof results[1].html).toBe("string");
			expectHtmlToMatchSnapshot(results[1].html, "en-short-pmt-prf-2.html");
		}, 10000);
	});
});

/*
describe("Multiple languages", () => {
  describe("Short description", () => {
	test(`en`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "68|95|Shen Yun New York|false|organization",
		month: new Date("2025-11-01"),
		language: "en",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	}, 10000);

	test(`zh-TW`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "87|99|神韻紐約|false|organization",
		month: new Date("2025-11-01"),
		language: "zh-TW",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "short-lang-zh-tw.html");
	}, 10000);

	test(`zh-CN`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|神韵纽约|false|organization",
		month: new Date("2025-11-01"),
		language: "zh-CN",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "short-lang-zh-cn.html");
	}, 10000);

	test(`vi`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun New York|false|organization",
		month: new Date("2025-11-01"),
		language: "vi",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "short-lang-vi.html");
	}, 10000);

	test(`ko`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun New York|false|organization",
		month: new Date("2025-11-01"),
		language: "ko",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "short-lang-ko.html");
	}, 10000);

	test(`ja`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "87|99|神韻ニューヨーク|false|organization",
		month: new Date("2025-11-01"),
		language: "ja",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "short-lang-ja.html");
	}, 10000);

	test(`es`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun Nueva York|false|organization",
		month: new Date("2025-11-01"),
		language: "es",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "short-lang-es.html");
	}, 10000);
  });

  describe("Long description", () => {
	test(`en`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "68|95|Shen Yun New York|TRUE|organization",
		month: new Date("2025-12-01"),
		language: "en",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	}, 10000);

	test(`zh-TW`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "87|99|神韻紐約|true|organization",
		month: new Date("2025-12-01"),
		language: "zh-TW",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "long-lang-zh-tw.html");
	}, 10000);

	test(`zh-CN`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|神韵纽约|true|organization",
		month: new Date("2025-12-01"),
		language: "zh-CN",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "long-lang-zh-cn.html");
	}, 10000);

	test(`vi`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun New York|true|organization",
		month: new Date("2025-12-01"),
		language: "vi",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "long-lang-vi.html");
	}, 10000);

	test(`ko`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun New York|true|organization",
		month: new Date("2025-12-01"),
		language: "ko",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "long-lang-ko.html");
	}, 10000);

	test(`ja`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "87|99|神韻ニューヨーク|true|organization",
		month: new Date("2025-12-01"),
		language: "ja",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "long-lang-ja.html");
	}, 10000);

	test(`es`, async () => {
	  // Generate the billing statement
	  const result = await puppeteerBillingStatementPdf({
		sub_acc_id: "91|99|Shen Yun Nueva York|true|organization",
		month: new Date("2025-12-01"),
		language: "es",
	  });

	  // Verify the result structure
	  expect(result).toHaveProperty("pdf");
	  expect(result).toHaveProperty("html");
	  expect(result).toHaveProperty("statement_uri");

	  // Verify PDF is generated
	  expect(result.pdf).toBeInstanceOf(Uint8Array);
	  expect(result.pdf.length).toBeGreaterThan(0);

	  // Verify HTML is generated
	  expect(result.html).toBeTruthy();
	  expect(typeof result.html).toBe("string");
	  expect(result.html.length).toBeGreaterThan(0);
	  expectHtmlToMatchSnapshot(result.html, "long-lang-es.html");
	}, 10000);
  });
});
*/
