import { initPackage } from "../../../init-package";
initPackage();

import { initIntegrationTest } from "df-backend-02/dist/src/test/init-integration-test";
import { ads_test_utils } from "../../table-tests/helpers/ads-test-utils";
import { uTest_initAdsTables } from "../../table-tests/helpers/init-ads-tables";
import { collectStatementDetails } from "../billing-statement/1--collectStatementDetails";
import { collectInvoiceDetails } from "../invoice/1--collectInvoiceDetails";
import {
  formatInvoiceDisplay,
  formatStatementDisplay,
} from "./h.4--formatDocumentsDisplay";
initIntegrationTest(
  __filename,
  [
    ads_test_utils.db.users.tester_clean,
    ads_test_utils.db.subaccounts.tester,
    ads_test_utils.db.extensions.tester.billing_statement,
  ],
  ads_test_utils.initDBAndServices,
  uTest_initAdsTables
);

const tester_ad_acc_id = ads_test_utils.tester.accounts.adAcc1.id;
const test_pmt_id = "p_NQb8J0RQQhsqNdRlZJFztW";

describe("Format document display for Billing Statement", () => {
  test("Billing statement for 2025-07", async () => {
    const billing_details = await collectStatementDetails({
      sub_acc_id: tester_ad_acc_id,
      month: new Date("2025-07"),
    });
    const display_details = formatStatementDisplay(billing_details[0]);

    expect(display_details).toMatchInlineSnapshot(`
		{
		  "account": {
		    "account_id": "2101715886",
		    "ads_sub_acc_name": "Tester's Ad Account",
		    "advertiser_time_zone_name": "America/New_York",
		    "linked_pmt_prf_id": "pp_9F7KW6w36jBmTC54PjGJwQ",
		    "linked_pmt_sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		  "monthly_account_balance": {
		    "billing_period_end": "Jul. 5, 2025",
		    "billing_period_start": "Jul. 1, 2025",
		    "closing_balance": "$410",
		    "created_time": "Jul. 26, 2025",
		    "opening_balance": "$875",
		    "total_ad_spend_adjusted": "-$834",
		    "total_payments_received": "$460",
		  },
		  "monthly_campaign_spends": [
		    {
		      "cost": "-$486.92",
		      "cpgn_id": "m_BQHYy84R_1746892271737",
		      "cpgn_name": "Rose Perfume",
		      "imp": "2,000",
		      "sub_acc_id": "b_25x4HMhX_1731613358261",
		    },
		    {
		      "cost": "-$218.23",
		      "cpgn_id": "m_Q3SWFFS6_1731102996720",
		      "cpgn_name": "Xiao long bao",
		      "imp": "2,200",
		      "sub_acc_id": "b_25x4HMhX_1731613358261",
		    },
		  ],
		  "payment_profile": {
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
		  "payments": [
		    {
		      "description": "p_mp_jnhGB1PZXmLmTzmNvTnxW7",
		      "paid_time": "2025-07-15, 19:00 (UTC-04:00)",
		      "tax": "0",
		      "total_amount": "$5,177",
		    },
		    {
		      "description": "p_mp_z4hb1JcqcwtW1FsZvFxcnF",
		      "paid_time": "2025-07-15, 19:00 (UTC-04:00)",
		      "tax": "325",
		      "total_amount": "$28.25",
		    },
		    {
		      "description": "p_mp_Rr18KDQZvw1HHsF8f0tZ5d",
		      "paid_time": "2025-07-16, 16:00 (UTC-04:00)",
		      "tax": "0",
		      "total_amount": "$50,784",
		    },
		    {
		      "description": "p_mp_Dj6zz5WcHRz35Cx1Flq91f",
		      "paid_time": "2025-07-16, 23:00 (UTC-04:00)",
		      "tax": "0",
		      "total_amount": "$21,294",
		    },
		    {
		      "description": "p_mp_T5nZT5l8Pf17TltbksR3WQ",
		      "paid_time": "2025-07-16, 23:00 (UTC-04:00)",
		      "tax": "0",
		      "total_amount": "$73,283",
		    },
		  ],
		  "pmt_prf_link_history": [],
		  "total_tax": "-$3.25",
		}
	`);
  });
});

describe("Format document display for Invoice", () => {
  test("Invoice for tester_ad_acc_id", async () => {
    const invoice_details = await collectInvoiceDetails();
    const display_details = formatInvoiceDisplay(invoice_details);

    expect(display_details).toMatchInlineSnapshot(`
		{
		  "account": {
		    "account_id": "2101715886",
		    "advertiser_time_zone_name": "America/New_York",
		  },
		  "payment": {
		    "paid_amount": "$25",
		    "paid_time": "July 15, 2025, 19:00 (UTC-04:00) America/New York Time",
		    "payment_id": "NQb8J0RQQhsqNdRlZJFztW",
		    "sub_acc_id": "Account balance top up: 2101715886",
		    "tax": "$3.25",
		    "total_amount": "$28.25",
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
		    "payee_display_name": "John Smith",
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
  });
});
