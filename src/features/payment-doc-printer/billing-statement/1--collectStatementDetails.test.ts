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
		ads_test_utils.db.extensions.tester.multi_payment_profile,
	],
	ads_test_utils.initDBAndServices,
	uTest_initAdsTables,
);

const tester_ad_acc_id = ads_test_utils.tester.accounts.adAcc1.id;

describe("collectStatementDetails - single payment profile", () => {
	test("2025-07", async () => {
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

		expect(balance_adjustments).toBeDefined();
		expect(derandomize(balance_adjustments!, ["updated_time", "adj_time", "created_time_utc"]))
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

describe("collectStatementDetails - multiple payment profiles", () => {
	test("collectStatementDetails: 2 Payment Profiles", async () => {
		const res = await collectStatementDetails({
			sub_acc_id: tester_ad_acc_id,
			month: new Date("2025-10"),
		});

		const {
			account: account_1,
			balance_adjustments: balance_adjustments_1,
			monthly_account_balance: monthly_account_balance_1,
			monthly_campaign_spends: monthly_campaign_spends_1,
			payment_profile: payment_profile_1,
			pmt_prf_link_history: pmt_prf_link_history_1,
			payments: payments_1,
		} = res[0];

		const {
			account: account_2,
			balance_adjustments: balance_adjustments_2,
			monthly_account_balance: monthly_account_balance_2,
			monthly_campaign_spends: monthly_campaign_spends_2,
			payment_profile: payment_profile_2,
			pmt_prf_link_history: pmt_prf_link_history_2,
			payments: payments_2,
		} = res[1];

		// 1. Account
		expect(account_1).toMatchInlineSnapshot(`
		{
		  "account_id": "2101715886",
		  "ads_sub_acc_name": "Tester's Ad Account",
		  "advertiser_time_zone_name": "America/New_York",
		  "linked_pmt_prf_id": "pp_9F7KW6w36jBmTC54PjGJwQ",
		  "linked_pmt_sub_acc_id": "b_25x4HMhX_1731613358261",
		}
	`);
		expect(account_1).toBe(account_2);

		// 2. Balance Adjustments
		expect(balance_adjustments_1).toBeUndefined();

		expect(balance_adjustments_2).toBeDefined();
		expect(
			derandomize(balance_adjustments_2!, ["updated_time", "adj_time", "created_time_utc"]),
		).toMatchInlineSnapshot(`
		[
		  {
		    "adj_amount": "9800",
		    "applied_amount": "20000",
		    "bal_adj_id": "ba_g79pjBPzjhQHlr6t0dLwOE",
		    "created_by": "u_m7TgkH8NPdwk",
		    "created_time": 2025-10-31T17:30:07.887Z,
		    "notes": "note 2",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unapplied_amount": "7800",
		    "updated_by": "u_m7TgkH8NPdwk",
		  },
		]
	`);

		// 3. Monthly Account Balance
		expect(monthly_account_balance_1).toMatchInlineSnapshot(`
		{
		  "closing_balance": 41000,
		  "created_time": 2025-07-26T13:46:57.231Z,
		  "opening_balance": 87500,
		  "period": "2025-10-01 -- 2025-10-31",
		  "total_ad_spend_adjusted": 83400,
		  "total_payments_received": "46000",
		}
	`);
		expect(monthly_account_balance_2).toMatchInlineSnapshot(`
		{
		  "closing_balance": -7200,
		  "created_time": 2025-07-26T13:46:57.231Z,
		  "opening_balance": 68600,
		  "period": "2025-10-01 -- 2025-10-31",
		  "total_ad_spend_adjusted": 81100,
		  "total_payments_received": "70000",
		}
	`);

		// 4. Monthly Campaign Spends
		expect(monthly_campaign_spends_1).toMatchInlineSnapshot(`
		[
		  {
		    "cost": "48692",
		    "cpgn_id": "m_BQHYy84R_1746892271737",
		    "cpgn_name": "Rose Perfume",
		    "imp": "2000",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		]
	`);
		expect(monthly_campaign_spends_2).toMatchInlineSnapshot(`
		[
		  {
		    "cost": "21823",
		    "cpgn_id": "m_Q3SWFFS6_1731102996720",
		    "cpgn_name": "Xiao long bao",
		    "imp": "2200",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		]
	`);

		// 5. Payment Profile
		expect(payment_profile_1).toMatchInlineSnapshot(`
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
		expect(payment_profile_2).toMatchInlineSnapshot(`
		{
		  "address_country": "US",
		  "address_postal_code": "10940",
		  "created_by": "u_HmBxnq3DWdwBFNC3TZV4p",
		  "created_time": 2025-10-01T21:43:35.783Z,
		  "email": "tester@ganjing.com",
		  "is_del": false,
		  "is_mgr": true,
		  "last_user_update_by": "u_HmBxnq3DWdwBFNC3TZV4p",
		  "last_user_update_time": 2025-10-01T21:43:35.783Z,
		  "legal_name": "John Smith",
		  "org_name": null,
		  "phone": "+1234567890",
		  "phone_country_code": "US",
		  "pmt_prf_id": "pp_g9bNcRyLfKfrjPfhsFWjVQ",
		  "pmt_prf_name": "Tester's Manager account payment profile",
		  "sub_acc_id": "b_JJP3gMXt_1739228030676",
		  "sub_acc_name": "Tester's Manager Account",
		  "type": "individual",
		}
	`);

		// 6. Payments
		expect(payments_1).toMatchInlineSnapshot(`
		[
		  {
		    "description": "p_mp_jnhGB1PZXmLmTzmNvTnxW7",
		    "paid_time": "2025-10-08T23:00:00.382Z",
		    "tax": "2345",
		    "total_amount": "517700",
		  },
		]
	`);
		expect(payments_2).toMatchInlineSnapshot(`
		[
		  {
		    "description": "p_mp_z4hb1JcqcwtW1FsZvFxcnF",
		    "paid_time": "2025-10-21T23:00:00.423Z",
		    "tax": "325",
		    "total_amount": "2825",
		  },
		]
	`);

		// 7. Payment Profile Links History
		expect(pmt_prf_link_history_1).toMatchInlineSnapshot(`
		[
		  {
		    "link_time": 2025-05-12T00:00:00.000Z,
		    "linked_pmt_prf_id": "pp_9F7KW6w36jBmTC54PjGJwQ",
		    "linked_pmt_sub_acc_id": "b_25x4HMhX_1731613358261",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unlink_time": 2025-10-15T23:59:59.999Z,
		  },
		]
	`);

		expect(pmt_prf_link_history_2).toMatchInlineSnapshot(`
		[
		  {
		    "link_time": 2025-10-16T00:00:00.000Z,
		    "linked_pmt_prf_id": "pp_g9bNcRyLfKfrjPfhsFWjVQ",
		    "linked_pmt_sub_acc_id": "b_JJP3gMXt_1739228030676",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unlink_time": 2025-11-10T23:59:59.999Z,
		  },
		]
	`);
	});

	test("collectStatementDetails: 3 Payment Profiles", async () => {
		const res = await collectStatementDetails({
			sub_acc_id: tester_ad_acc_id,
			month: new Date("2025-11"),
		});

		const {
			account: account_1,
			balance_adjustments: balance_adjustments_1,
			monthly_account_balance: monthly_account_balance_1,
			monthly_campaign_spends: monthly_campaign_spends_1,
			payment_profile: payment_profile_1,
			pmt_prf_link_history: pmt_prf_link_history_1,
			payments: payments_1,
		} = res[0];

		const {
			account: account_2,
			balance_adjustments: balance_adjustments_2,
			monthly_account_balance: monthly_account_balance_2,
			monthly_campaign_spends: monthly_campaign_spends_2,
			payment_profile: payment_profile_2,
			pmt_prf_link_history: pmt_prf_link_history_2,
			payments: payments_2,
		} = res[1];

		expect(res.length).toBe(2);

		// 1. Account
		expect(account_1).toMatchInlineSnapshot(`
		{
		  "account_id": "2101715886",
		  "ads_sub_acc_name": "Tester's Ad Account",
		  "advertiser_time_zone_name": "America/New_York",
		  "linked_pmt_prf_id": "pp_9F7KW6w36jBmTC54PjGJwQ",
		  "linked_pmt_sub_acc_id": "b_25x4HMhX_1731613358261",
		}
	`);
		expect(account_1).toBe(account_2);

		// 2. Balance Adjustments
		expect(balance_adjustments_1).toBeUndefined();

		expect(balance_adjustments_2).toBeDefined();
		expect(
			derandomize(balance_adjustments_2!, ["updated_time", "adj_time", "created_time_utc"]),
		).toMatchInlineSnapshot(`
		[
		  {
		    "adj_amount": "38000",
		    "applied_amount": "28000",
		    "bal_adj_id": "ba_g79pjBPzjhQHlr6t0gLaKB",
		    "created_by": "u_m7TgkH8NPdwk",
		    "created_time": 2025-07-26T17:30:07.887Z,
		    "notes": "note 2",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unapplied_amount": "1000",
		    "updated_by": "u_m7TgkH8NPdwk",
		  },
		]
	`);

		// 3. Monthly Account Balance
		expect(monthly_account_balance_1).toMatchInlineSnapshot(`
		{
		  "closing_balance": 41000,
		  "created_time": 2025-07-26T13:46:57.231Z,
		  "opening_balance": 87500,
		  "period": "2025-11-01 -- 2025-11-30",
		  "total_ad_spend_adjusted": 83400,
		  "total_payments_received": "46000",
		}
	`);
		expect(monthly_account_balance_2).toMatchInlineSnapshot(`
		{
		  "closing_balance": 41000,
		  "created_time": 2025-07-26T13:46:57.231Z,
		  "opening_balance": 87500,
		  "period": "2025-11-01 -- 2025-11-30",
		  "total_ad_spend_adjusted": 83400,
		  "total_payments_received": "46000",
		}
	`);

		// 4. Monthly Campaign Spends
		expect(monthly_campaign_spends_1).toMatchInlineSnapshot(`
		[
		  {
		    "cost": "48692",
		    "cpgn_id": "m_BQHYy84R_1746892271737",
		    "cpgn_name": "Rose Perfume",
		    "imp": "2000",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		]
	`);
		expect(monthly_campaign_spends_2).toMatchInlineSnapshot(`
		[
		  {
		    "cost": "21823",
		    "cpgn_id": "m_Q3SWFFS6_1731102996720",
		    "cpgn_name": "Xiao long bao",
		    "imp": "2200",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		  {
		    "cost": "98765",
		    "cpgn_id": "m_BQHYy84R_1746892271737",
		    "cpgn_name": "Rose Perfume",
		    "imp": "3300",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		  },
		]
	`);

		// 5. Payment Profile
		expect(payment_profile_1).toMatchInlineSnapshot(`
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
		expect(payment_profile_2).toMatchInlineSnapshot(`
		{
		  "address_country": "US",
		  "address_postal_code": "10940",
		  "created_by": "u_HmBxnq3DWdwBFNC3TZV4p",
		  "created_time": 2025-10-01T21:43:35.783Z,
		  "email": "tester@ganjing.com",
		  "is_del": false,
		  "is_mgr": true,
		  "last_user_update_by": "u_HmBxnq3DWdwBFNC3TZV4p",
		  "last_user_update_time": 2025-10-01T21:43:35.783Z,
		  "legal_name": "John Smith",
		  "org_name": null,
		  "phone": "+1234567890",
		  "phone_country_code": "US",
		  "pmt_prf_id": "pp_g9bNcRyLfKfrjPfhsFWjVQ",
		  "pmt_prf_name": "Tester's Manager account payment profile",
		  "sub_acc_id": "b_JJP3gMXt_1739228030676",
		  "sub_acc_name": "Tester's Manager Account",
		  "type": "individual",
		}
	`);

		// 6. Payments
		expect(payments_1).toMatchInlineSnapshot(`
		[
		  {
		    "description": "p_mp_jnhGB1PZXmLmTzmNvTnxW7",
		    "paid_time": "2025-11-08T23:00:00.382Z",
		    "tax": "2456",
		    "total_amount": "517700",
		  },
		]
	`);
		expect(payments_2).toMatchInlineSnapshot(`
		[
		  {
		    "description": "p_mp_z4hb1JcqcwtW1FsZvFxcnF",
		    "paid_time": "2025-11-21T23:00:00.423Z",
		    "tax": "325",
		    "total_amount": "2825",
		  },
		]
	`);

		// 7. Payment Profile Links History
		expect(pmt_prf_link_history_1).toMatchInlineSnapshot(`
		[
		  {
		    "link_time": 2025-11-11T00:00:00.000Z,
		    "linked_pmt_prf_id": "pp_9F7KW6w36jBmTC54PjGJwQ",
		    "linked_pmt_sub_acc_id": "b_25x4HMhX_1731613358261",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unlink_time": 2025-11-20T23:59:59.999Z,
		  },
		]
	`);

		expect(pmt_prf_link_history_2).toMatchInlineSnapshot(`
		[
		  {
		    "link_time": 2025-10-16T00:00:00.000Z,
		    "linked_pmt_prf_id": "pp_g9bNcRyLfKfrjPfhsFWjVQ",
		    "linked_pmt_sub_acc_id": "b_JJP3gMXt_1739228030676",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unlink_time": 2025-11-10T23:59:59.999Z,
		  },
		  {
		    "link_time": 2025-11-21T00:00:00.000Z,
		    "linked_pmt_prf_id": "pp_g9bNcRyLfKfrjPfhsFWjVQ",
		    "linked_pmt_sub_acc_id": "b_JJP3gMXt_1739228030676",
		    "sub_acc_id": "b_25x4HMhX_1731613358261",
		    "unlink_time": null,
		  },
		]
	`);
	});
});
