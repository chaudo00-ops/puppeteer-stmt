import { getResultId } from "df-backend-02/dist/functions/cdkapi/shared/result-msg";
import { TCreateBillingStatementPdfParams } from "../../--IPMTDocPrinter";
import { TBillingStatementDetails } from "../../helpers/h.0--types";

export async function collectStatementDetails(
	params: TCreateBillingStatementPdfParams,
): Promise<TBillingStatementDetails> {
	const { sub_acc_id } = params;
	const parts = sub_acc_id.split("|");
	if (parts.length < 5)
		throw getResultId(
			"invalidParam",
			'5 or more parameters are expected separated by "|": numRows_campaignSpends, numRows_payments, org_name, long_desc, payment_profile_type, has_balance_adj',
		);
	const numRows_campaignSpends = parseInt(parts[0]);
	const numRows_payments = parseInt(parts[1]);
	const org_name = parts[2];
	const long_desc = parts[3].toLowerCase() === "true";
	const payment_profile_type = parts[4].toLowerCase() as TPaymentProfile_Type;
	const has_balance_adj = parts[5] !== "false"; // treat undefined as true, treat true as true, treat false as false,

	const longDescription =
		"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido el cuours";

	const daily_campaign_ad_spend: Pick<
		TFields_v2_monthly_campaign_spend_ui,
		"sub_acc_id" | "cpgn_id" | "cpgn_name" | "cost" | "imp"
	>[] = Array.from({ length: numRows_campaignSpends }, (_, index) => ({
		sub_acc_id,
		cpgn_id: `m_${index}`,
		cpgn_name: `Campaign ${
			long_desc && (index % 9 === 0 || index % 37 === 0 || index % 38 === 0)
				? longDescription
				: index
		}`,
		cost: long_desc ? "12345" : String(randomCostInRange(10000, 100000)), // if not long_desc, random cost to test sorting, if long_desc, no random cost to maintain predictability of long_desc records ordering
		imp: "98765",
	}));

	// TODO: use numRows_payments to generate
	const payments_received: TBillingStatementDetails["payments"] = Array.from(
		{ length: numRows_payments },
		(_, index) => ({
			paid_time: randomDateLastYear(), // generate random date to test sorting
			description: " Mastercard ***8888",
			total_amount: "30000",
			tax: "150",
		}),
	);

	const v2_payment_profile: TFields_v2_payment_profiles = {
		pmt_prf_id: "444-555-6666",
		sub_acc_id: "",
		pmt_prf_name: "",
		type: payment_profile_type,
		legal_name: "Annie Y",
		org_name: org_name,
		email: "annie.y@ganjing.com",
		phone: undefined,
		phone_country_code: undefined,
		address_postal_code: "10940",
		address_country: "US",
		is_mgr: undefined,
		created_by: undefined,
		created_time: undefined,
		last_user_update_by: undefined,
		last_user_update_time: undefined,
		is_del: undefined,
	};

	const balance_adjustments: TFields_v2_balance_adjustments[] = has_balance_adj
		? [
				{
					bal_adj_id: "ba_bDnmJsD32BbDmKPHrk4kXV",
					sub_acc_id: "b_25x4HMhX_1731613358261",
					adj_amount: "23000",
					adj_time: "2025-07-18 08:00:00",
					applied_amount: "20000",
					unapplied_amount: "3000",
					notes: "note 4",
					created_time_utc: "2025-07-18 08:00:00",
					created_time: "2025-07-26 13:31:24.608-04",
					created_by: "u_m7TgkH8NPdwk",
					updated_time: "2025-07-26 21:31:24.608",
					updated_by: "u_m7TgkH8NPdwk",
				},
				{
					bal_adj_id: "ba_g79pjBPzjhQHlr6t0dPjYP",
					sub_acc_id: "b_25x4HMhX_1731613358261",
					adj_amount: "9800",
					adj_time: "2025-07-26 08:00:00",
					applied_amount: "2000",
					unapplied_amount: "7800",
					notes: "note 2",
					created_time_utc: "2025-07-26 08:00:00",
					created_time: "2025-07-26 13:30:07.887-04",
					created_by: "u_m7TgkH8NPdwk",
					updated_time: "2025-07-26 21:30:07.887",
					updated_by: "u_m7TgkH8NPdwk",
				},
				{
					bal_adj_id: "ba_jWpWzFlXk5jnMnrzZ50Hy5",
					sub_acc_id: "b_25x4HMhX_1731613358261",
					adj_amount: "5000",
					adj_time: "2025-07-24 08:00:00",
					applied_amount: "4000",
					unapplied_amount: "1000",
					notes: "note 3",
					created_time_utc: "2025-07-17 08:00:00",
					created_time: "2025-07-26 13:30:54.422-04",
					created_by: "u_m7TgkH8NPdwk",
					updated_time: "2025-07-26 13:30:54.422-04",
					updated_by: "u_m7TgkH8NPdwk",
				},
		  ]
		: [];

	const res: TBillingStatementDetails = {
		account: {
			account_id: 111222333,
			ads_sub_acc_name: org_name,
			advertiser_time_zone_name: "America/New_York",
		},
		payment_profile: v2_payment_profile,
		monthly_account_balance: {
			period: "2025-09-01 -- 2025-09-30", // <= Summary for <end>
			total_ad_spend_adjusted: 824750,
			created_time: randomDateLastYear(), // <= Statement issue date
			opening_balance: 1000000,
			closing_balance: 890000,
			total_payments_received: "165726", // <= Total payments received (in cents)
		},
		balance_adjustments,
		monthly_campaign_spends: daily_campaign_ad_spend,
		payments: payments_received,
	};
	return res;
}

/*
 * generate a random integer between 10,000 and 100,000
 * for purpose of testing only
 */
function randomCostInRange(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Give a random date within 1 year time frame
 * For purpose of testing only
 */
function randomDateLastYear(): string {
	const now = Date.now();
	const yearMs = 365 * 24 * 60 * 60 * 1000;
	return new Date(now - Math.random() * yearMs).toISOString();
}
