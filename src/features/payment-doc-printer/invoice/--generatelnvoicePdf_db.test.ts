import { initPackage } from "../../../init-package";
initPackage();

import { initIntegrationTest } from "df-backend-02/dist/src/test/init-integration-test";
import { ads_test_utils } from "../../table-tests/helpers/ads-test-utils";
import { uTest_initAdsTables } from "../../table-tests/helpers/init-ads-tables";
import { generateInvoicePdf } from "./--generateInvoicePdf";
initIntegrationTest(
	__filename,
	[
		ads_test_utils.db.users.tester_clean,
		ads_test_utils.db.subaccounts.tester,
		ads_test_utils.db.extensions.tester.billing_statement,
	],
	ads_test_utils.initDBAndServices,
	uTest_initAdsTables,
);

const tester_ad_acc_id = ads_test_utils.tester.accounts.adAcc1.id;
const test_pmt_id = "p_6mTtPJ5xzQH8G954VQRB87";

describe("Basic invoice test", () => {
	test("1 row description invoice", async () => {
		const { pdf, html } = await generateInvoicePdf({
			sub_acc_id: tester_ad_acc_id,
			payment_id: test_pmt_id,
		});

		expect(pdf).toBeTruthy();
		expect(html).toContain("Invoice number");
	});
});
