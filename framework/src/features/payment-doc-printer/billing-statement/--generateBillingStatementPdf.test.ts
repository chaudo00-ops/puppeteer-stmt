import { BillingPdfResult } from "../helpers/h.0--types";
import { generateBillingStatementPdf } from "./--generateBillingStatementPdf";

jest.mock("./1--collectStatementDetails");

describe("Parallel test", () => {
	let testResults: BillingPdfResult[] = [];
	beforeAll(async () => {
		// Run all myFunction calls concurrently
		testResults = await Promise.all([
			// Basic row test: Spending: 91 row, Payments: 99 row
			generateBillingStatementPdf({
				sub_acc_id: "91|99|Shen Yun New York|false|organization",
				month: new Date(),
			}), // for test 1

			// Edge case #1: Spending: 92 row, Payments: 100 row
			generateBillingStatementPdf({
				sub_acc_id: "92|100|Shen Yun New York|false|organization",
				month: new Date(),
			}), // for test 2

			// Edge case #3: Spending: 100 row, Payments: 100 row
			generateBillingStatementPdf({
				sub_acc_id:
					"100|100|Shen Yun Performing Arts New York Company, presenting 5,000 years of Chinese culture through classical dance and majestic music.|true|organization",
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

		console.log(`DEBUG: ${JSON.stringify(final_state)}`);
		expect(final_state).toMatchInlineSnapshot(`
		Object {
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
		Object {
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
		Object {
		  "billingPage": 8,
		  "billingY": 597,
		  "paymentPage": 14,
		  "paymentY": 597,
		}
	`);
	});
});

describe("Basic rows test", () => {
	test("Spending: 0 row, Payments: `0` row", async () => {
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
		Object {
		  "billingPage": 1,
		  "billingY": 469,
		  "paymentPage": 2,
		  "paymentY": 597,
		}
	`);
	});

	test("Spending: 1 row, Payments: `1` row", async () => {
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
		Object {
		  "billingPage": 1,
		  "billingY": 316,
		  "paymentPage": 2,
		  "paymentY": 547,
		}
	`);
	});

	test("Spending: 11 rows, Payments: 19 rows", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "11|19|Shen Yun NY|false|organization",
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
		Object {
		  "billingPage": 1,
		  "billingY": 26,
		  "paymentPage": 2,
		  "paymentY": 25,
		}
	`);
	});

	test("Spending: 13 row, Payments: 21 row", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "13|21|Shen Yun New York|false|organization",
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
		Object {
		  "billingPage": 2,
		  "billingY": 547,
		  "paymentPage": 4,
		  "paymentY": 547,
		}
	`);
	});
});

describe("Edge case #1: Total balance is the only entry on a new page", () => {
	test("Edge case #1: Spending: 12 row, Payments: 20 row", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "12|20|Shen Yun New York|false|organization",
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
		Object {
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
		Object {
		  "billingPage": 2,
		  "billingY": 376.25,
		  "paymentPage": 4,
		  "paymentY": 597,
		}
	`);
	});

	// Last long description + total balance is last row on page
	test("Spending: 37 row, Payments: 29 row", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id:
				"37|29|Shen Yun Performing Arts New York Company, presenting 5,000 years of Chinese culture through classical dance and majestic music.|true|organization",
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
		Object {
		  "billingPage": 3,
		  "billingY": 60.5,
		  "paymentPage": 5,
		  "paymentY": 315,
		}
	`);
	});

	// Last long description is first row on new page + total balance is first row on new page
	test("Spending: 38 row, Payments: 30 row", async () => {
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
		Object {
		  "billingPage": 4,
		  "billingY": 597,
		  "paymentPage": 6,
		  "paymentY": 286,
		}
	`);
	});

	// Last long description + total description are first things on a new page
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
		Object {
		  "billingPage": 4,
		  "billingY": 492.25,
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
		Object {
		  "billingPage": 1,
		  "billingY": 190.25,
		  "paymentPage": 2,
		  "paymentY": 518,
		}
	`);
	});
});

describe("Chinese Language Support (zh-CN)", () => {
	test("Basic Chinese billing statement: 5 spending rows, 5 payment rows", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "5|5|神韵纽约公司|false|organization",
			month: new Date(),
			language: "zh-CN",
		});

		expect(pdf).toBeTruthy();
		expect(context.getBillingPage()).toBeGreaterThan(0);
		expect(context.getPaymentPage()).toBeGreaterThan(0);
	});

	test("Chinese with long description: 12 spending rows, 20 payment rows", async () => {
		const { pdf, context } = await generateBillingStatementPdf({
			sub_acc_id: "12|20|神韵艺术团是一个致力于复兴五千年中华神传文化的艺术团体|true|organization",
			month: new Date(),
			language: "zh-CN",
		});

		expect(pdf).toBeTruthy();
		expect(context.getBillingPage()).toBeGreaterThan(0);
		expect(context.getPaymentPage()).toBeGreaterThan(0);
	});
});
