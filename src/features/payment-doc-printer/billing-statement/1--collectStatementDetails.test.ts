import { initPackage } from "../../../init-package";
initPackage();

import { initIntegrationTest } from "df-backend-02/dist/src/test/init-integration-test";
import { ads_test_utils } from "../../table-tests/helpers/ads-test-utils";
import { uTest_initAdsTables } from "../../table-tests/helpers/init-ads-tables";
import { derandomize } from "../../table-tests/helpers/utest-derandomize";
import { collectStatementDetails } from "./1--collectStatementDetails";
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

describe("collectStatementDetails", () => {
	test("Spending: 0 row, Payments: `0` row", async () => {
		const res = await collectStatementDetails({
			sub_acc_id: tester_ad_acc_id,
			month: new Date("2025-07"),
		});

		const {
			account,
			balance_adjustments,
			monthly_account_balance: monthly_account_balance,
			monthly_campaign_spends,
			payment_profile: paymentProfile,
			payments,
		} = res[0];

		expect(derandomize(balance_adjustments, ["updated_time", "adj_time", "created_time_utc"]))
			.toMatchInlineSnapshot(`
		[
		  {
		    "adj_amount": "23000",
		    "applied_amount": "20000",
		    "bal_adj_id": "ba_bDnmJsD32BbDmKPHrk4kXV",
		    "created_by": "u_m7TgkH8NPdwk",
		    "created_time": 2025-07-26T17:31:24.608Z,
		    "notes": "note 4",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unapplied_amount": "3000",
		    "updated_by": "u_m7TgkH8NPdwk",
		  },
		  {
		    "adj_amount": "5000",
		    "applied_amount": "4000",
		    "bal_adj_id": "ba_jWpWzFlXk5jnMnrzZ50Hy5",
		    "created_by": "u_m7TgkH8NPdwk",
		    "created_time": 2025-07-26T17:30:54.422Z,
		    "notes": "note 3",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unapplied_amount": "1000",
		    "updated_by": "u_m7TgkH8NPdwk",
		  },
		  {
		    "adj_amount": "9800",
		    "applied_amount": "2000",
		    "bal_adj_id": "ba_g79pjBPzjhQHlr6t0dPjYP",
		    "created_by": "u_m7TgkH8NPdwk",
		    "created_time": 2025-07-26T17:30:07.887Z,
		    "notes": "note 2",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unapplied_amount": "7800",
		    "updated_by": "u_m7TgkH8NPdwk",
		  },
		]
	`);
		expect(account).toMatchInlineSnapshot(`
		{
		  "account_id": "2101715886",
		  "ads_sub_acc_name": "Tester's Ad Account",
		  "advertiser_time_zone_name": "America/New_York",
		  "linked_pmt_prf_id": "pp_9F7KW6w36jBmTC54PjGJwQ",
		  "linked_pmt_sub_acc_id": "b_25x4HMhX_1731613358261",
		}
	`);
		expect(monthly_account_balance).toMatchInlineSnapshot(`
		{
		  "closing_balance": 41000,
		  "created_time": 2025-07-26T13:46:57.231Z,
		  "opening_balance": 87500,
		  "period": "2025-07-01 -- 2025-07-05",
		  "total_ad_spend_adjusted": 83400,
		  "total_payments_received": "46000",
		}
	`);
		expect(monthly_campaign_spends).toMatchInlineSnapshot(`
		[
		  {
		    "cost": "48692",
		    "cpgn_id": "m_BQHYy84R_1746892271737",
		    "cpgn_name": "Rose Perfume",
		    "imp": "2000",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		  {
		    "cost": "21823",
		    "cpgn_id": "m_Q3SWFFS6_1731102996720",
		    "cpgn_name": "Xiao long bao",
		    "imp": "2200",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		]
	`);
		expect(paymentProfile).toMatchInlineSnapshot(`
		{
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
		}
	`);

		expect(payments).toMatchInlineSnapshot(`
		[
		  {
		    "description": "p_mp_Rr18KDQZvw1HHsF8f0tZ5d",
		    "paid_time": "2025-07-16T20:00:00.988Z",
		    "tax": "0",
		    "total_amount": "5078400",
		  },
		  {
		    "description": "p_mp_Dj6zz5WcHRz35Cx1Flq91f",
		    "paid_time": "2025-07-17T03:00:00.316Z",
		    "tax": "0",
		    "total_amount": "2129400",
		  },
		  {
		    "description": "p_mp_T5nZT5l8Pf17TltbksR3WQ",
		    "paid_time": "2025-07-17T03:00:00.316Z",
		    "tax": "0",
		    "total_amount": "7328300",
		  },
		  {
		    "description": "p_mp_jnhGB1PZXmLmTzmNvTnxW7",
		    "paid_time": "2025-07-15T23:00:00.382Z",
		    "tax": "0",
		    "total_amount": "517700",
		  },
		  {
		    "description": "p_mp_z4hb1JcqcwtW1FsZvFxcnF",
		    "paid_time": "2025-07-15T23:00:00.423Z",
		    "tax": "325",
		    "total_amount": "2825",
		  },
		]
	`);
	});
});
