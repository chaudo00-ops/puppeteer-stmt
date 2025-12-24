import { initPackage } from "../../../init-package";
initPackage();

import { initIntegrationTest } from "df-backend-02/dist/src/test/init-integration-test";
import { ads_test_utils } from "../../table-tests/helpers/ads-test-utils";
import { uTest_initAdsTables } from "../../table-tests/helpers/init-ads-tables";
import { collectInvoiceDetails } from "./1--collectInvoiceDetails";
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
describe("collectInvoiceDetails", () => {
	test("Spending: 0 row, Payments: `0` row", async () => {
		const res = await collectInvoiceDetails({
			sub_acc_id: tester_ad_acc_id,
			payment_id: test_pmt_id,
		});

		expect(res).toMatchInlineSnapshot(`
		{
		  "account": {
		    "account_id": "2101715886",
		    "advertiser_time_zone_name": "America/New_York",
		  },
		  "payment": {
		    "paid_amount": "5078400",
		    "paid_time": 2025-07-16T20:00:00.988Z,
		    "payment_id": "p_6mTtPJ5xzQH8G954VQRB87",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "tax": "0",
		    "total_amount": "5078400",
		  },
		  "paymentProfile": {
		    "address_country": "US",
		    "address_postal_code": "10940",
		    "created_by": "u_HmBxnq3DWdwBFNC3TZV4p",
		    "created_time": 2025-05-11T14:57:07.782Z,
		    "email": "tester@ganjing.com",
		    "is_del": false,
		    "is_mgr": false,
		    "last_user_update_by": "u_HmBxnq3DWdwBFNC3TZV4p",
		    "last_user_update_time": 2025-05-11T14:57:07.782Z,
		    "legal_name": "John Smith",
		    "org_name": null,
		    "phone": "+1234567890",
		    "phone_country_code": "US",
		    "pmt_prf_id": "pp_9F7KW6w36jBmTC54PjGJwQ",
		    "pmt_prf_name": "Tester's Ad Account payment profile",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "sub_acc_name": "Tester's Ad Account",
		    "type": "individual",
		  },
		}
	`);
		const transformed_res = "....";
		expect(transformed_res).toBe(`....`);
	});
});
