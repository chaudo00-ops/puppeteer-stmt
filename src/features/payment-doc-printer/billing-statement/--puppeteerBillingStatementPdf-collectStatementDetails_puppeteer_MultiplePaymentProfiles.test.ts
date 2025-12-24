import { initPackage } from "../../../init-package";
initPackage();

import { initIntegrationTest } from "df-backend-02/dist/src/test/init-integration-test";
import * as fs from "fs";
import * as path from "path";
import { ads_test_utils } from "../../table-tests/helpers/ads-test-utils";
import { uTest_initAdsTables } from "../../table-tests/helpers/init-ads-tables";
import { puppeteerBillingStatementPdf } from "./--puppeteerBillingStatementPdf";
import { dbg_var_saveStmt } from "./3--saveStatement";

initIntegrationTest(
	__filename,
	[
		ads_test_utils.db.users.tester_clean,
		ads_test_utils.db.subaccounts.tester,
		ads_test_utils.db.subaccounts.tester_pmt_prf_links,
		ads_test_utils.db.extensions.tester.billing_statement,
		ads_test_utils.db.extensions.tester.multi_payment_profile,
	],
	ads_test_utils.initDBAndServices,
	uTest_initAdsTables,
);

jest.mock("./1--collectStatementDetails", () =>
	require("./__mocks__/1--collectStatementDetails_puppeteer_MPP"),
);

dbg_var_saveStmt.save_html = true;

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

describe("PP Switch Count = 2", () => {
	describe("Short description", () => {
		test(`Edge case #1: No activity details records. No payments received records.`, async () => {
			// ✅ BREAK POINT defined
			// ✅ PASSED
			// Generate the billing statement
			const results = await puppeteerBillingStatementPdf({
				sub_acc_id: "0|0|Shen Yun New York|false|organization|true|2",
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
			expectHtmlToMatchSnapshot(results[0].html, "en-short-0-0-pmt-prf-1.html");

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
			expectHtmlToMatchSnapshot(results[1].html, "en-short-0-0-pmt-prf-2.html");
		}, 20000);

		test(`Edge case #2: Total rows are last on first Billing page`, async () => {
			// ✅ BREAK POINT defined
			// ✅ PASSED
			// Generate the billing statement
			const results = await puppeteerBillingStatementPdf({
				sub_acc_id: "9|17|Shen Yun New York|false|organization|true|2",
				month: new Date("2025-11-01"),
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
			expectHtmlToMatchSnapshot(results[0].html, "en-short-9-17-pmt-prf-1.html");

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
			expectHtmlToMatchSnapshot(results[1].html, "en-short-9-17-pmt-prf-2.html");
		}, 20000);
	});

	describe("Long description", () => {
		test(
			`Edge case #1: Total rows are last on first Billing page` +
				"Total rows preceded by a long description",
			async () => {
				// ✅ BREAK POINT defined
				// ✅ TEST PASSED
				// Generate the billing statement
				const results = await puppeteerBillingStatementPdf({
					sub_acc_id: "6|0|Shen Yun New York|true|organization|true|2",
					month: new Date("2025-11-01"),
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
				expectHtmlToMatchSnapshot(results[0].html, "en-long-6-0-pmt-prf-1.html");

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
				expectHtmlToMatchSnapshot(results[1].html, "en-long-6-0-pmt-prf-2.html");
			},
			20000,
		);
	});
});

describe("PP Switch Count = 3", () => {
	describe("Short description", () => {
		test(`Edge case #1: No activity details records. No payments received records.`, async () => {
			// ✅ BREAK POINT defined
			// ✅ PASSED
			// Generate the billing statement
			const results = await puppeteerBillingStatementPdf({
				sub_acc_id: "20|20|Shen Yun New York|false|organization|true|3",
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
			expectHtmlToMatchSnapshot(results[0].html, "en-short-20-20-pmt-prf-1.html");

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
			expectHtmlToMatchSnapshot(results[1].html, "en-short-20-20-pmt-prf-2.html");
		}, 20000);
	});
});

describe("PP Switch Count = 5", () => {
	test(`Normal case: 30|30`, async () => {
		// ✅ BREAK POINT defined
		// ✅ PASSED
		// Generate the billing statement
		const results = await puppeteerBillingStatementPdf({
			sub_acc_id: "30|30|Shen Yun New York|false|organization|true|5",
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
		expectHtmlToMatchSnapshot(results[0].html, "en-short-30-30-pmt-prf-1.html");

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
		expectHtmlToMatchSnapshot(results[1].html, "en-short-30-30-pmt-prf-2.html");
	}, 20000);
});
