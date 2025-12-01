import { initPackage } from "../../../init-package";
initPackage();

import { initIntegrationTest } from "df-backend-02/dist/src/test/init-integration-test";
import { ads_test_utils } from "../../table-tests/helpers/ads-test-utils";
import { BillingPdfResult } from "../helpers/h.0--types";
import { generateBillingStatementPdf } from "./--generateBillingStatementPdf";

initIntegrationTest(__filename, [], ads_test_utils.initDBAndServices);

jest.mock("./1--collectStatementDetails");

describe("Parallel test", () => {
	let testResults: BillingPdfResult[];
	beforeAll(async () => {
		// Run all myFunction calls concurrently
		testResults = await Promise.all([
			// Basic row test: Spending: 88 rows, Balance Adjustments: 3 rows, Payments: 99 row
			generateBillingStatementPdf({
				sub_acc_id: "88|99|Shen Yun New York|false|organization",
				month: new Date(),
			}), // for test 1

			// Edge case #1: Spending: 89 row, Balance Adjustments: 3 rows Payments: 100 row
			generateBillingStatementPdf({
				sub_acc_id: "89|100|Shen Yun New York|false|organization",
				month: new Date(),
			}), // for test 2

			// Edge case #3: Spending: 97 row, Balance Adjustments: 3 rows, Payments: 100 row
			generateBillingStatementPdf({
				sub_acc_id:
					"97|100|Shen Yun Performing Arts New York Company, presenting 5,000 years of Chinese culture through classical dance and majestic music.|true|organization",
				month: new Date(),
			}), // for test 3
		]);
	});
	test("Basic row test: Spending: 91 row, Payments: 99 row", async () => {
		const { pdf, context } = testResults[0];
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};

		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 5,
		  "billingY": 25,
		  "paymentPage": 10,
		  "paymentY": 25,
		}
	`);
	});

	test("Edge case #1: Spending: 92 row, Payments: 100 row", async () => {
		const { pdf, context } = testResults[1];
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 6,
		  "billingY": 597,
		  "paymentPage": 12,
		  "paymentY": 597,
		}
	`);
	});

	test("Edge case #2: Spending: 100 row, Payments: 100 row", async () => {
		const { pdf, context } = testResults[2];
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 7,
		  "billingY": 28.25,
		  "paymentPage": 13,
		  "paymentY": 597,
		}
	`);
	});
});

describe("Basic rows test", () => {
	test("Spending: 0 row, Payments: `0` row", async () => {
		// + Balance adjustments: 3 rows
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "0|0|Shen Yun NY|false|organization",
			month: new Date(),
		});

		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 1,
		  "billingY": 469,
		  "paymentPage": 2,
		  "paymentY": 597,
		}
	`);
	});

	test("Spending: 1 row, Payments: `1` row", async () => {
		// + Balance adjustments: 3 rows
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "1|1|Shen Yun NY|false|organization",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 1,
		  "billingY": 229,
		  "paymentPage": 2,
		  "paymentY": 547,
		}
	`);
	});

	test("Spending: 8 rows, Payments: 19 rows", async () => {
		// + Balance adjustments: 3 rows
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "8|19|Shen Yun NY|false|organization",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 1,
		  "billingY": 26,
		  "paymentPage": 2,
		  "paymentY": 25,
		}
	`);
	});

	test("Spending: 10 row, Payments: 21 row", async () => {
		// + Balance adjustments: 3 rows
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "10|21|Shen Yun New York|false|organization",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 2,
		  "billingY": 547,
		  "paymentPage": 4,
		  "paymentY": 547,
		}
	`);
	});
});

describe("Edge case #1: Total balance is the only entry on a new page", () => {
	test("Edge case #1: Spending: 9 row, Payments: 20 row", async () => {
		// + Balance adjustments: 3 rows
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "9|20|Shen Yun New York|false|organization",
			month: new Date(),
		});

		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 2,
		  "billingY": 597,
		  "paymentPage": 4,
		  "paymentY": 597,
		}
	`);
	});
});

describe("Edge case #2: Text overflow to multiple lines", () => {
	test("Spending: 12 row, Payments: 20 row", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			// + Balance adjustments: 3 rows
			sub_acc_id:
				"12|20|Shen Yun Performing Arts New York Company, presenting 5,000 years of Chinese culture through classical dance and majestic music.|true|organization",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 2,
		  "billingY": 289.25,
		  "paymentPage": 4,
		  "paymentY": 597,
		}
	`);
	});

	// Last long description is last row on a page
	test("Spending: 38 row, Payments: 30 row", async () => {
		// + Balance adjustments: 3 rows
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id:
				"38|30|Shen Yun Performing Arts New York Company, presenting 5,000 years of Chinese culture through classical dance and majestic music.|true|organization",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 4,
		  "billingY": 500,
		  "paymentPage": 6,
		  "paymentY": 286,
		}
	`);
	});

	// Last long description is first row on a new page
	test("Spending: 39 row, Payments: 32 row", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id:
				"39|32|Shen Yun Performing Arts New York Company, presenting 5,000 years of Chinese culture through classical dance and majestic music.|true|organization",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 4,
		  "billingY": 405.25,
		  "paymentPage": 6,
		  "paymentY": 228,
		}
	`);
	});
});

describe("Use case #3: Payment profile type is 'individual'", () => {
	test("Spending: 2 rows, Payments: 2 rows", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id:
				"2|2|Shen Yun Performing Arts New York Company, presenting 5,000 years of Chinese culture through classical dance and majestic music.|true|individual",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 1,
		  "billingY": 103.25,
		  "paymentPage": 2,
		  "paymentY": 518,
		}
	`);
	});
});

describe("Edge case #4: No balance adjustments record", () => {
	test("Balance adjustment = []", async () => {
		// + Balance adjustments: 3 rows
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "8|19|Shen Yun NY|false|organization|false",
			month: new Date(),
		});
		expect(pdf).toBeTruthy();

		const final_state = {
			billingY: context.getBillingY(),
			billingPage: context.getBillingPage(),
			paymentY: context.getPaymentY(),
			paymentPage: context.getPaymentPage(),
		};
		expect(final_state).toMatchInlineSnapshot(`
		{
		  "billingPage": 1,
		  "billingY": 113,
		  "paymentPage": 2,
		  "paymentY": 25,
		}
	`);
	});
});
