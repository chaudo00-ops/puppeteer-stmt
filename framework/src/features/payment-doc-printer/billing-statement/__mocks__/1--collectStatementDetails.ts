import { TCreateBillingStatementPdfParams } from "../../--IPMTDocPrinter";
import { TBillingStatementDetails } from "../../helpers/h.0--types";

export async function collectStatementDetails(
	params: TCreateBillingStatementPdfParams,
): Promise<TBillingStatementDetails> {
	const { sub_acc_id } = params;
	const parts = sub_acc_id.split("|");
	if (parts.length < 5)
		throw new Error(
			'invalidParam: 5 parameters are expected separated by "|": numRows_campaignSpends, numRows_payments, org_name, long_desc, payment_profile_type',
		);
	const numRows_campaignSpends = parseInt(parts[0]);
	const numRows_payments = parseInt(parts[1]);
	const org_name = parts[2];
	const long_desc = parts[3].toLowerCase() === "true";
	const payment_profile_type = parts[4].toLowerCase() as TPaymentProfile_Type;

	const language = params.language || "en";
	const longDescription =
		language === "zh-CN"
			? "这是一个很长的中文描述示例，用于测试PDF生成器在处理长文本时的换行和排版功能。该描述包含了足够多的中文字符以确保文本需要在多行中显示。"
			: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido el cuours";

	const daily_campaign_ad_spend: Pick<
		TFields_v2_monthly_campaign_spend_ui,
		"sub_acc_id" | "cpgn_id" | "cpgn_name" | "cost" | "imp"
	>[] = Array.from({ length: numRows_campaignSpends }, (_, index) => ({
		sub_acc_id,
		cpgn_id: `m_${index}`,
		cpgn_name:
			long_desc && (index % 9 === 0 || index % 37 === 0 || index % 38 === 0)
				? longDescription
				: language === "zh-CN"
					? `广告活动 ${index}`
					: `Campaign ${index}`,
		cost: "12345",
		imp: "98765",
	}));

	// TODO: use numRows_payments to generate
	const payments_received: TBillingStatementDetails["payments"] = Array.from(
		{ length: numRows_payments },
		(_, index) => ({
			paid_time: new Date().toISOString(),
			description: " Mastercard ***8888",
			total_amount: "30000",
			tax: "150",
		}),
	);

	const v2_payment_profile: TFields_v2_payment_profiles = {
		pmt_prf_id: "444-555-6666",
		sub_acc_id: "",
		pmt_prf_name: org_name, // <= Payment profile name
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

	const res: TBillingStatementDetails = {
		account: { account_id: 111222333, advertiser_time_zone_name: "America/New_York" },
		paymentProfile: v2_payment_profile,
		monthly_account_balance: {
			period: "2025-09-01 -- 2025-09-30", // <= Summary for <end>
			total_ad_spend_adjusted: 824750,
			created_time: "May 25, 2025", // <= Statement issue date
			opening_balance: 1000000,
			closing_balance: 890000,
			total_payments_received: "165726", // <= Total payments received (in cents)
			total_ad_spend: "130000",
		},
		balance_adjustments: [],
		monthly_campaign_spends: daily_campaign_ad_spend,
		payments: payments_received,
	};
	return res;
}
