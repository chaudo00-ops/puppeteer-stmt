import { getResultId } from "df-backend-02/dist/functions/cdkapi/shared/result-msg";
import { TCreateBillingStatementPdfParams } from "../../--IPMTDocPrinter";
import { TSupportedLanguage } from "../../helpers/h.0--translations";
import { TBillingStatementDetails } from "../../helpers/h.0--types";
import { longDescriptions } from "./1--collectStatementDetails_puppeteer";

export const balanceAdjustments: TBillingStatementDetails["balance_adjustments"] = [
	{
		bal_adj_id: "ba_g79pjBPzjhQHlr6t0dLwOE",
		sub_acc_id: "b_25x4HMhX_1731613358261",
		adj_amount: "9800",
		adj_time: "2025-10-31T12:00:00.000Z",
		applied_amount: "20000",
		unapplied_amount: "7800",
		notes: "note 2",
		created_time_utc: "2025-07-26T12:00:00.000Z",
		created_time: "2025-07-26T17:30:07.887Z",
		created_by: "u_m7TgkH8NPdwk",
		updated_time: "2025-07-27T01:30:07.887Z",
		updated_by: "u_m7TgkH8NPdwk",
	},
	{
		bal_adj_id: "ba_g79pmBPzjhQHlr6t0dLwOK",
		sub_acc_id: "b_25x4HMhX_1731613358261",
		adj_amount: "10000",
		adj_time: "2025-10-31T12:00:00.000Z",
		applied_amount: "9800",
		unapplied_amount: "200",
		notes: "note 2",
		created_time_utc: "2025-07-26T12:00:00.000Z",
		created_time: "2025-07-26T17:30:07.887Z",
		created_by: "u_m7TgkH8NPdwk",
		updated_time: "2025-07-27T01:30:07.887Z",
		updated_by: "u_m7TgkH8NPdwk",
	},
	{
		bal_adj_id: "ba_g79pmBPzjhQGlr4t0dLwOA",
		sub_acc_id: "b_25x4HMhX_1731613358261",
		adj_amount: "38000",
		adj_time: "2025-10-31T12:00:00.000Z",
		applied_amount: "28000",
		unapplied_amount: "2000",
		notes: "note 2",
		created_time_utc: "2025-07-26T12:00:00.000Z",
		created_time: "2025-07-26T17:30:07.887Z",
		created_by: "u_m7TgkH8NPdwk",
		updated_time: "2025-07-27T01:30:07.887Z",
		updated_by: "u_m7TgkH8NPdwk",
	},
];

export async function collectStatementDetails(
	params: TCreateBillingStatementPdfParams,
): Promise<TBillingStatementDetails[]> {
	const { sub_acc_id } = params;
	const parts = sub_acc_id.split("|");
	if (parts.length < 5)
		throw getResultId(
			"invalidParam",
			'7 or more parameters are expected separated by "|": numRows_campaignSpends, numRows_payments, org_name, long_desc, payment_profile_type, has_balance_adj, pp_switch_count',
		);
	const numRows_campaignSpends = parseInt(parts[0]);
	const numRows_payments = parseInt(parts[1]);
	const org_name = parts[2];
	const long_desc = parts[3].toLowerCase() === "true";
	const payment_profile_type = parts[4].toLowerCase() as TPaymentProfile_Type;
	const has_balance_adj = parts[5] !== "false"; // treat undefined as true, treat true as true, treat false as false,
	const pp_switch_count = Number(parts[6]);
	const language: TSupportedLanguage = (params.language as TSupportedLanguage) || "en"; // Default language is English

	const longDescription = longDescriptions[language];

	const account: TBillingStatementDetails["account"] = {
		account_id: 2101715886,
		ads_sub_acc_name: "Tester's Ad Account",
		advertiser_time_zone_name: "America/New_York",
		linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
		linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
	};

	const payment_profile_1: TFields_v2_payment_profiles = {
		pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
		sub_acc_id: "b_25x4HMhX_1731613358261",
		pmt_prf_name: "Tester's Ad Account payment profile",
		type: "individual",
		legal_name: "John Smith",
		org_name: "Shen Yun Washington DC",
		email: "tester@ganjing.com",
		phone: "+1234567890",
		phone_country_code: "US",
		address_postal_code: "10940",
		address_country: "US",
		is_mgr: false,
		created_by: "u_HmBxnq3DWdwBFNC3TZV4p",
		created_time: "2025-05-11T14:57:07.782Z",
		last_user_update_by: "u_HmBxnq3DWdwBFNC3TZV4p",
		last_user_update_time: "2025-05-11T14:57:07.782Z",
		is_del: false,
	};

	const payment_profile_2: TFields_v2_payment_profiles = {
		pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
		sub_acc_id: "b_JJP3gMXt_1739228030676",
		pmt_prf_name: "Tester's Manager account payment profile",
		type: payment_profile_type,
		legal_name: "John Smith",
		org_name: org_name,
		email: "tester@ganjing.com",
		phone: "+1234567890",
		phone_country_code: "US",
		address_postal_code: "10940",
		address_country: "US",
		is_mgr: true,
		created_by: "u_HmBxnq3DWdwBFNC3TZV4p",
		created_time: "2025-10-01T21:43:35.783Z",
		last_user_update_by: "u_HmBxnq3DWdwBFNC3TZV4p",
		last_user_update_time: "2025-10-01T21:43:35.783Z",
		is_del: false,
	};

	const pmt_prf_link_history_1: TBillingStatementDetails["pmt_prf_link_history"] =
		pp_switch_count === 2
			? [
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-05-12T00:00:00.000Z",
						unlink_time: "2025-10-15T23:59:59.999Z",
					},
			  ]
			: pp_switch_count === 3
			? [
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-05-12T00:00:00.000Z",
						unlink_time: "2025-10-15T23:59:59.999Z",
					},
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-22T00:00:00.000Z",
						unlink_time: null,
					},
			  ]
			: [
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-05-12T00:00:00.000Z",
						unlink_time: "2025-10-02T23:59:59.999Z",
					}, // 1st link
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-06T00:00:00.000Z",
						unlink_time: "2025-10-08T00:00:00.000Z",
					}, // 3rd link
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-12T00:00:00.000Z",
						unlink_time: "2025-10-14T00:00:00.000Z",
					}, // 5th link
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-18T00:00:00.000Z",
						unlink_time: "2025-10-20T00:00:00.000Z",
					}, // 7th link
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-24T00:00:00.000Z",
						unlink_time: "2025-10-26T00:00:00.000Z",
					}, // 9th link
					{
						linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
						linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-30T00:00:00.000Z",
						unlink_time: "2025-10-31T00:00:00.000Z",
					}, // 11th link
			  ];
	const pmt_prf_link_history_2: TBillingStatementDetails["pmt_prf_link_history"] =
		pp_switch_count === 2
			? [
					{
						linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
						linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-16T00:00:00.000Z",
						unlink_time: "2025-11-10T23:59:59.999Z",
					},
			  ]
			: pp_switch_count === 3
			? [
					{
						linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
						linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-16T00:00:00.000Z",
						unlink_time: "2025-10-21T23:59:59.999Z",
					},
			  ]
			: [
					{
						linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
						linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-03T00:00:00.000Z",
						unlink_time: "2025-10-05T23:59:59.999Z",
					}, // 2nd link
					{
						linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
						linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-09T00:00:00.000Z",
						unlink_time: "2025-10-11T23:59:59.999Z",
					}, // 4th link
					{
						linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
						linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-15T00:00:00.000Z",
						unlink_time: "2025-10-17T23:59:59.999Z",
					}, // 6th link
					{
						linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
						linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-21T00:00:00.000Z",
						unlink_time: "2025-10-23T23:59:59.999Z",
					}, // 8th link
					{
						linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
						linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
						sub_acc_id: "b_25x4HMhX_1731613358261",
						link_time: "2025-10-27T00:00:00.000Z",
						unlink_time: "2025-10-29T23:59:59.999Z",
					}, // 10th link
			  ];

	const monthly_campaign_spends_1: Pick<
		TFields_v2_monthly_campaign_spend_ui,
		"sub_acc_id" | "cpgn_id" | "cpgn_name" | "cost" | "imp"
	>[] = buildCampaignSpends({
		profileIndex: 1,
		numCampaignSpends: numRows_campaignSpends,
		long_desc,
		longDescription,
	});

	const monthly_campaign_spends_2: Pick<
		TFields_v2_monthly_campaign_spend_ui,
		"sub_acc_id" | "cpgn_id" | "cpgn_name" | "cost" | "imp"
	>[] = buildCampaignSpends({
		profileIndex: 2,
		numCampaignSpends: numRows_campaignSpends,
		long_desc,
		longDescription,
	});

	const payments_received_1: TBillingStatementDetails["payments"] = buildPaymentsReceived({
		numPayments: numRows_payments,
		profileIndex: 1,
	});
	const payments_received_2: TBillingStatementDetails["payments"] = buildPaymentsReceived({
		numPayments: numRows_payments,
		profileIndex: 2,
	});

	const monthly_account_balance_1: TBillingStatementDetails["monthly_account_balance"] = {
		created_time: "2025-07-26T13:46:57.231Z",
		total_ad_spend_adjusted: 83400,
		period: "2025-10-01 -- 2025-10-31",
		opening_balance: 87500,
		closing_balance: 41000,
		total_payments_received: "46000",
	};

	const monthly_account_balance_2: TBillingStatementDetails["monthly_account_balance"] = {
		created_time: "2025-07-26T13:46:57.231Z",
		total_ad_spend_adjusted: 81100,
		period: "2025-10-01 -- 2025-10-31",
		opening_balance: 68600,
		closing_balance: -7200,
		total_payments_received: "70000",
	};

	const balance_adjustments: TFields_v2_balance_adjustments[] = has_balance_adj
		? [
				{
					bal_adj_id: "ba_g79pjBPzjhQHlr6t0dLwOE",
					sub_acc_id: "b_25x4HMhX_1731613358261",
					adj_amount: "9800",
					adj_time: "2025-10-31T12:00:00.000Z",
					applied_amount: "20000",
					unapplied_amount: "7800",
					notes: "note 2",
					created_time_utc: "2025-07-26T12:00:00.000Z",
					created_time: "2025-07-26T17:30:07.887Z",
					created_by: "u_m7TgkH8NPdwk",
					updated_time: "2025-07-27T01:30:07.887Z",
					updated_by: "u_m7TgkH8NPdwk",
				},
				{
					bal_adj_id: "ba_g79pmBPzjhQHlr6t0dLwOK",
					sub_acc_id: "b_25x4HMhX_1731613358261",
					adj_amount: "10000",
					adj_time: "2025-10-31T12:00:00.000Z",
					applied_amount: "9800",
					unapplied_amount: "200",
					notes: "note 2",
					created_time_utc: "2025-07-26T12:00:00.000Z",
					created_time: "2025-07-26T17:30:07.887Z",
					created_by: "u_m7TgkH8NPdwk",
					updated_time: "2025-07-27T01:30:07.887Z",
					updated_by: "u_m7TgkH8NPdwk",
				},
				{
					bal_adj_id: "ba_g79pmBPzjhQGlr4t0dLwOA",
					sub_acc_id: "b_25x4HMhX_1731613358261",
					adj_amount: "38000",
					adj_time: "2025-10-31T12:00:00.000Z",
					applied_amount: "28000",
					unapplied_amount: "2000",
					notes: "note 2",
					created_time_utc: "2025-07-26T12:00:00.000Z",
					created_time: "2025-07-26T17:30:07.887Z",
					created_by: "u_m7TgkH8NPdwk",
					updated_time: "2025-07-27T01:30:07.887Z",
					updated_by: "u_m7TgkH8NPdwk",
				},
		  ]
		: [];

	const statementDetails_1: TBillingStatementDetails = {
		account,
		payment_profile: payment_profile_1,
		monthly_account_balance: monthly_account_balance_1,
		monthly_campaign_spends: monthly_campaign_spends_1,
		payments: payments_received_1,
		pmt_prf_link_history: pmt_prf_link_history_1,
	};

	const statementDetails_2: TBillingStatementDetails = {
		account,
		payment_profile: payment_profile_2,
		monthly_account_balance: monthly_account_balance_2,
		...(has_balance_adj && { balance_adjustments }),
		monthly_campaign_spends: monthly_campaign_spends_2,
		payments: payments_received_2,
		pmt_prf_link_history: pmt_prf_link_history_2,
	};

	const res: TBillingStatementDetails[] = [statementDetails_1, statementDetails_2];

	return res;
}

/*
 * generate sequential cost values starting from 10,000, incrementing by 100
 * for purpose of testing only
 */
function createSequentialCost(start: number = 10000, increment: number = 100) {
	let current = start;

	return function (): number {
		const value = current;
		current += increment;
		return value;
	};
}

/*
 * generate randomized date values across a deterministic range that depends on
 * the number of payments. This ensures the rendered table has unsorted dates,
 * which allows tests to verify sorting logic.
 */

function createSequentialDate(
	totalPayments: number,
	startDate: string = "2025-10-01",
	seedInput: number,
): () => string {
	const total = Math.max(0, totalPayments);
	const currentDate = new Date(startDate);
	currentDate.setDate(currentDate.getDate() + seedInput);
	const sequentialDates: string[] = [];

	for (let i = 0; i < total; i++) {
		sequentialDates.push(new Date(currentDate).toISOString());
		currentDate.setDate(currentDate.getDate() + 1);
	}

	const random = createDeterministicRandom(seedInput + total);
	const dates = sequentialDates.slice();
	for (let i = dates.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[dates[i], dates[j]] = [dates[j], dates[i]];
	}

	let cursor = 0;
	return function (): string {
		if (cursor < dates.length) {
			return dates[cursor++];
		}

		const fallbackDate = new Date(currentDate).toISOString();
		currentDate.setDate(currentDate.getDate() + 1);
		cursor++;
		return fallbackDate;
	};
}
function createDeterministicRandom(seedInput: number): () => number {
	let seed = ((seedInput || 1) >>> 0) ^ 0xa5a5a5a5;

	return function (): number {
		seed = (seed * 1664525 + 1013904223) >>> 0;
		return seed / 0xffffffff;
	};
}

export function buildCampaignSpends(params: {
	profileIndex: number;
	numCampaignSpends: number;
	long_desc: boolean;
	longDescription: string;
}): TBillingStatementDetails["monthly_campaign_spends"] {
	const { profileIndex, numCampaignSpends, long_desc, longDescription } = params;
	const costGenerator = createSequentialCost(10000 + profileIndex * 500, 175);

	return Array.from({ length: numCampaignSpends }, (_, index) => ({
		sub_acc_id: "b_25x4HMhX_1731613358261",
		cpgn_id: `m_${params.profileIndex}_${index}`,
		cpgn_name:
			long_desc && (index % 5 === 0 || index % 6 === 0 || index % 17 === 0)
				? longDescription
				: `Campaign ${index + 1}`,
		cost: long_desc ? "12345" : String(costGenerator()),
		imp: String(2000 + params.profileIndex * 100 + index * 25),
	}));
}

export function buildPaymentsReceived(params: {
	profileIndex: number;
	numPayments: number;
}): TBillingStatementDetails["payments"] {
	const { profileIndex, numPayments } = params;
	const getNextDate = createSequentialDate(numPayments, "2025-10-01", profileIndex + 1);
	return Array.from({ length: numPayments }, (_, index) => ({
		paid_time: getNextDate(),
		description: ` Mastercard ***${String(8888 + params.profileIndex * 111 + index).slice(-4)}`,
		total_amount: String(30000 + params.profileIndex * 2500 + index * 500),
		tax: String(150 + index * 5),
	}));
}
