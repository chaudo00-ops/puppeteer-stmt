import { TCreateBillingStatementPdfParams } from "../../--IPMTDocPrinter";
import { TBillingStatementDetails } from "../../helpers/h.0--types";

export async function collectStatementDetails(
	params: TCreateBillingStatementPdfParams,
): Promise<TBillingStatementDetails[]> {
	const { sub_acc_id } = params;

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
		type: "individual",
		legal_name: "John Smith",
		org_name: "Shen Yun USA HQ",
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

	const pmt_prf_link_history_1: TBillingStatementDetails["pmt_prf_link_history"] = [
		{
			linked_pmt_prf_id: "pp_9F7KW6w36jBmTC54PjGJwQ",
			linked_pmt_sub_acc_id: "b_25x4HMhX_1731613358261",
			sub_acc_id: "b_25x4HMhX_1731613358261",
			link_time: "2025-05-12T00:00:00.000Z",
			unlink_time: "2025-10-15T23:59:59.999Z",
		},
	];
	const pmt_prf_link_history_2: TBillingStatementDetails["pmt_prf_link_history"] = [
		{
			linked_pmt_prf_id: "pp_g9bNcRyLfKfrjPfhsFWjVQ",
			linked_pmt_sub_acc_id: "b_JJP3gMXt_1739228030676",
			sub_acc_id: "b_25x4HMhX_1731613358261",
			link_time: "2025-10-16T00:00:00.000Z",
			unlink_time: "2025-11-10T23:59:59.999Z",
		},
	];

	const monthly_campaign_spends_1: Pick<
		TFields_v2_monthly_campaign_spend_ui,
		"sub_acc_id" | "cpgn_id" | "cpgn_name" | "cost" | "imp"
	>[] = buildCampaignSpends({
		subAccId: sub_acc_id,
		profileIndex: 1,
	});

	const monthly_campaign_spends_2: Pick<
		TFields_v2_monthly_campaign_spend_ui,
		"sub_acc_id" | "cpgn_id" | "cpgn_name" | "cost" | "imp"
	>[] = buildCampaignSpends({
		subAccId: sub_acc_id,
		profileIndex: 2,
	});

	const payments_received_1: TBillingStatementDetails["payments"] = buildPaymentsReceived({
		profileIndex: 1,
	});
	const payments_received_2: TBillingStatementDetails["payments"] = buildPaymentsReceived({
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

	const balance_adjustments: TFields_v2_balance_adjustments[] = [
		{
			bal_adj_id: "ba_g79pjBPzjhQHlr6t0dLwOE",
			sub_acc_id: "b_25x4HMhX_1731613358261",
			adj_amount: "9800",
			adj_time: "2025-10-26T12:00:00.000Z",
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
			adj_time: "2025-10-26T12:00:00.000Z",
			applied_amount: "9800",
			unapplied_amount: "200",
			notes: "note 2",
			created_time_utc: "2025-07-26T12:00:00.000Z",
			created_time: "2025-07-26T17:30:07.887Z",
			created_by: "u_m7TgkH8NPdwk",
			updated_time: "2025-07-27T01:30:07.887Z",
			updated_by: "u_m7TgkH8NPdwk",
		},
	];

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
		balance_adjustments,
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

function buildCampaignSpends(params: {
	subAccId: string;
	profileIndex: number;
}): TBillingStatementDetails["monthly_campaign_spends"] {
	const { profileIndex, subAccId } = params;
	const costGenerator = createSequentialCost(10000 + profileIndex * 500, 175);

	return Array.from({ length: 20 }, (_, index) => ({
		sub_acc_id: subAccId,
		cpgn_id: `m_${params.profileIndex}_${index}`,
		cpgn_name: `Campaign ${index + 1}`,
		cost: String(costGenerator()),
		imp: String(2000 + params.profileIndex * 100 + index * 25),
	}));
}

function buildPaymentsReceived(params: {
	profileIndex: number;
}): TBillingStatementDetails["payments"] {
	const { profileIndex } = params;
	const getNextDate = createSequentialDate(20, "2025-10-01", profileIndex + 1);
	return Array.from({ length: 20 }, (_, index) => ({
		paid_time: getNextDate(),
		description: ` Mastercard ***${String(8888 + params.profileIndex * 111 + index).slice(-4)}`,
		total_amount: String(30000 + params.profileIndex * 2500 + index * 500),
		tax: String(150 + index * 5),
	}));
}
