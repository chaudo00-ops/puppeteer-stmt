import { ICrudAction } from "df-backend-02/dist/functions/cdkapi/shared/crud-ql-types";
import { g_di } from "df-deps-injector";
import { TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { getRecAttributesAdv } from "../../common/get-rec-attributes-adv";
import { TBillingStatementDetails } from "../helpers/h.0--types";

export async function collectStatementDetails(
	params: TCreateBillingStatementPdfParams,
): Promise<TBillingStatementDetails[]> {
	const { sub_acc_id, month } = params;
	/** Start month formatted as YYYY-mm */
	const start_month = new Date(month.getUTCFullYear(), month.getUTCMonth(), 15)
		.toISOString()
		.substring(0, 7);
	/**
	 * End month formatted as YYYY-mm
	 *
	 * Attention: if we delete the date 15, then it is by default 1. Due to timezone difference,
	 * The UTC time could be the previous month's last day, and we end up having the same end_month as start_month!
	 */
	const end_month = new Date(month.getUTCFullYear(), month.getUTCMonth() + 1, 15)
		.toISOString()
		.substring(0, 7);

	// 1. Load account record:
	const account = await getRecAttributesAdv<TFields_v2_sub_account>()(
		sub_acc_id,
		"throw",
		"v2_sub_account",
		[
			"account_id",
			"ads_sub_acc_name",
			"advertiser_time_zone_name",
			"linked_pmt_prf_id",
			"linked_pmt_sub_acc_id",
		],
	);

	// 2. Load PP record:
	// -----------------------------------------------------------------------

	const linked_pmt_prf_history = await (
		g_di.resolve("CrudAction") as ICrudAction<TFields_v2_pmt_prf_links_history>
	)
		.escalate()
		.get({
			table: "v2_pmt_prf_links_history",
			action: "get-by-billing_admin",
			wheres: [
				{ field: "sub_acc_id", value: sub_acc_id },
				{ field: "link_time", op: "<=", value: `${end_month}-01T00:00:00.000Z` },
				{ field: "unlink_time", op: ">=", value: `${start_month}-01T00:00:00.000Z` },
			],
		});

	// Query a Payment Profile that is currently linked and has unlink_time = null
	const linked_pmt_prf_history_2 = await (
		g_di.resolve("CrudAction") as ICrudAction<TFields_v2_pmt_prf_links_history>
	)
		.escalate()
		.get({
			table: "v2_pmt_prf_links_history",
			action: "get-by-billing_admin",
			wheres: [
				{ field: "sub_acc_id", value: sub_acc_id },
				{ field: "link_time", op: "<=", value: `${end_month}-01T00:00:00.000Z` },
				{ field: "unlink_time", value: null as any },
			],
		});

	const pmt_prf_link_history: TBillingStatementDetails["pmt_prf_link_history"] = [
		...linked_pmt_prf_history.list.map(history => ({
			linked_pmt_prf_id: history.linked_pmt_prf_id!,
			linked_pmt_sub_acc_id: history.linked_pmt_sub_acc_id!,
			sub_acc_id: history.sub_acc_id!,
			link_time: history.link_time,
			unlink_time: history.unlink_time,
		})),
		...linked_pmt_prf_history_2.list.map(history => ({
			linked_pmt_prf_id: history.linked_pmt_prf_id!,
			linked_pmt_sub_acc_id: history.linked_pmt_sub_acc_id!,
			sub_acc_id: history.sub_acc_id!,
			link_time: history.link_time,
			unlink_time: history.unlink_time,
		})),
	];

	let payment_profiles: TFields_v2_payment_profiles[];
	if (pmt_prf_link_history.length > 0) {
		payment_profiles = await Promise.all(
			pmt_prf_link_history.map(pair =>
				fetchPaymentProfile(pair.linked_pmt_prf_id!, pair.linked_pmt_sub_acc_id!),
			),
		);
	} else {
		const pmt_prf_res = await (
			g_di.resolve("CrudAction") as ICrudAction<TFields_v2_payment_profiles>
		)
			.escalate()
			.get({
				table: "v2_payment_profiles",
				action: "get-by-billing_admin",
				wheres: [
					{ field: "pmt_prf_id", value: account.linked_pmt_prf_id! },
					{ field: "sub_acc_id", value: account.linked_pmt_sub_acc_id! },
				],
			});
		payment_profiles = pmt_prf_res.list as TFields_v2_payment_profiles[];
	}

	const uniquePaymentProfiles: TFields_v2_payment_profiles[] = Array.from(
		new Map(
			payment_profiles.map(item => [
				`${item.pmt_prf_id}::${item.sub_acc_id}`, // composite key
				item,
			]),
		).values(),
	);
	// 3. Load record from v2_monthly_account_balance
	const monthly_account_balances: TBillingStatementDetails["monthly_account_balance"][] =
		await Promise.all(
			uniquePaymentProfiles.map(pmt_prf =>
				fetchAccountBalance({
					sub_acc_id,
					pmt_prf_id: pmt_prf.pmt_prf_id!,
					pmt_sub_acc_id: pmt_prf.sub_acc_id!,
					start_month,
				}),
			),
		);

	// 4. Load v2_balance_adjustments
	// -----------------------------------------------------------------------

	const balance_adj_res = await (
		g_di.resolve("CrudAction") as ICrudAction<TFields_v2_balance_adjustments>
	)
		.escalate()
		.get({
			table: "v2_balance_adjustments",
			action: "get-by-billing_admin",
			wheres: [
				{
					field: "adj_time",
					op: "between",
					values: [`${start_month}-01T00:00:00.000Z`, `${end_month}-01T00:00:00.000Z`],
				},
				{ field: "sub_acc_id", value: sub_acc_id },
			],
		});

	const balance_adjustments = balance_adj_res.list as TFields_v2_balance_adjustments[];

	const has_balance_adj = balance_adjustments.length > 0;

	const balance_adj_assign_to = has_balance_adj
		? latestLinkedProfile(pmt_prf_link_history, balance_adjustments[0].adj_time)
		: undefined;

	// 5. Load monthly_campaign_spend
	// -----------------------------------------------------------------------

	const monthly_campaign_spends: TBillingStatementDetails["monthly_campaign_spends"][] =
		await Promise.all(
			uniquePaymentProfiles.map(pmt_prf =>
				fetchCampaignSpend({
					sub_acc_id,
					pmt_prf_id: pmt_prf.pmt_prf_id!,
					pmt_sub_acc_id: pmt_prf.sub_acc_id!,
					start_month,
					end_month,
				}),
			),
		);

	// 6. payments
	const payments: TBillingStatementDetails["payments"][] = await Promise.all(
		uniquePaymentProfiles.map(pmt_prf =>
			fetchPayments({
				sub_acc_id,
				pmt_prf_id: pmt_prf.pmt_prf_id!,
				pmt_sub_acc_id: pmt_prf.sub_acc_id!,
				start_month,
				end_month,
			}),
		),
	);

	const res: TBillingStatementDetails[] = uniquePaymentProfiles.map((payment_profile, index) => ({
		account,
		payment_profile: payment_profile,
		monthly_account_balance: monthly_account_balances[index],
		monthly_campaign_spends: monthly_campaign_spends[index],
		payments: payments[index],
		...(has_balance_adj &&
			payment_profile.pmt_prf_id === balance_adj_assign_to && { balance_adjustments }),
		pmt_prf_link_history: pmt_prf_link_history.filter(
			history => history.linked_pmt_prf_id === payment_profile.pmt_prf_id,
		),
	}));

	return res;
}

async function fetchPaymentProfile(pmt_prf_id: string, pmt_sub_acc_id: string) {
	const pmt_prf_res = await (
		g_di.resolve("CrudAction") as ICrudAction<TFields_v2_payment_profiles>
	)
		.escalate()
		.get({
			table: "v2_payment_profiles",
			action: "get-by-billing_admin",
			wheres: [
				{ field: "pmt_prf_id", op: "=", value: pmt_prf_id },
				{ field: "sub_acc_id", op: "=", value: pmt_sub_acc_id },
			],
		});
	const paymentProfile = pmt_prf_res.list[0] as TFields_v2_payment_profiles;

	return paymentProfile;
}

async function fetchAccountBalance(params: {
	sub_acc_id: string;
	pmt_prf_id: string;
	pmt_sub_acc_id: string;
	start_month: string;
}) {
	const { sub_acc_id, pmt_prf_id, pmt_sub_acc_id, start_month } = params;

	// 3. Load record from v2_monthly_account_balance

	const balance_res = await (
		g_di.resolve("CrudAction") as ICrudAction<TFields_v2_monthly_account_balance>
	)
		.escalate()
		.get({
			table: "v2_monthly_account_balance",
			action: "get-by-billing_admin",
			wheres: [
				{ field: "sub_acc_id", value: sub_acc_id },
				{ field: "period", op: "like", value: `${start_month}%` },
				{ field: "pmt_prf_id", op: "=", value: pmt_prf_id },
				{ field: "pmt_sub_acc_id", op: "=", value: pmt_sub_acc_id },
			],
		});

	const account_balance = balance_res.list[0] as TFields_v2_monthly_account_balance_ui;

	// 4. monthly_account_balance

	const monthly_account_balance: TBillingStatementDetails["monthly_account_balance"] = {
		created_time: account_balance.created_time,
		total_ad_spend_adjusted: account_balance.total_ad_spend_adjusted,
		period: account_balance.period,
		opening_balance: account_balance.opening_balance,
		closing_balance: account_balance.closing_balance,
		total_payments_received: account_balance.total_payments_received,
	};

	return monthly_account_balance;
}

async function fetchCampaignSpend(params: {
	sub_acc_id: string;
	pmt_prf_id: string;
	pmt_sub_acc_id: string;
	start_month: string;
	end_month: string;
}) {
	const { sub_acc_id, pmt_prf_id, pmt_sub_acc_id, start_month, end_month } = params;

	// 6.1 Collect monthly_campaign_spend records

	const campaign_spend_res = await (
		g_di.resolve("CrudAction") as ICrudAction<TFields_v2_monthly_campaign_spend>
	)
		.escalate()
		.get({
			table: "v2_monthly_campaign_spend",
			action: "get-by-billing_admin",
			wheres: [
				{ field: "sub_acc_id", value: sub_acc_id },
				{ field: "pmt_prf_id", op: "=", value: pmt_prf_id },
				{ field: "pmt_sub_acc_id", op: "=", value: pmt_sub_acc_id },
				{
					field: "month",
					op: "between",
					values: [`${start_month}-01T00:00:00.000Z`, `${end_month}-01T00:00:00.000Z`],
				},
			],
		});

	const campaign_spend = campaign_spend_res.list as TFields_v2_monthly_campaign_spend_ui[];

	// 6.2 Iterate through the monthly_campaign_spend records and append the cpgn_name

	const monthly_campaign_spends: TBillingStatementDetails["monthly_campaign_spends"] =
		campaign_spend.map(spend => {
			return {
				sub_acc_id: spend.sub_acc_id,
				cpgn_id: spend.cpgn_id,
				cpgn_name: spend.cpgn_name,
				cost: spend.cost,
				imp: spend.imp,
			};
		});

	return monthly_campaign_spends;
}

async function fetchPayments(params: {
	sub_acc_id: string;
	pmt_prf_id: string;
	pmt_sub_acc_id: string;
	start_month: string;
	end_month: string;
}) {
	const { sub_acc_id, pmt_prf_id, pmt_sub_acc_id, start_month, end_month } = params;

	const payments_res = await (g_di.resolve("CrudAction") as ICrudAction<TFields_v2_payments>)
		.escalate()
		.get({
			table: "v2_payments",
			action: "get-by-billing_admin",
			wheres: [
				{ field: "sub_acc_id", value: sub_acc_id },
				{ field: "pmt_prf_id", op: "=", value: pmt_prf_id },
				{ field: "pmt_sub_acc_id", op: "=", value: pmt_sub_acc_id },
				{
					field: "paid_time",
					op: "between",
					values: [`${start_month}-01T00:00:00.000Z`, `${end_month}-01T00:00:00.000Z`],
				},
			],
		});

	const payments = (payments_res.list as TFields_v2_payments[]).map(item => ({
		paid_time: item.paid_time.toISOString(),
		description: item.description,
		total_amount: item.total_amount,
		tax: item.tax,
	}));

	return payments;
}

/*
 * Find the payment profile that has the latest link time that is still earlier than the balance adjust time (adj_time)
 */
function latestLinkedProfile(
	link_history_records: TBillingStatementDetails["pmt_prf_link_history"],
	balance_adj_time: Date,
): string | undefined {
	const sorted = link_history_records!
		.map(item => ({
			pmt_prf_id: item.linked_pmt_prf_id,
			link_time: new Date(item.link_time).getTime(),
		}))
		.filter(item => item.link_time < balance_adj_time.getTime())
		.sort((a, b) => b.link_time - a.link_time);

	return sorted.length > 0 ? sorted[0].pmt_prf_id : undefined;
}
