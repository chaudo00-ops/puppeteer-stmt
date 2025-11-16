import { TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { TBillingStatementDetails } from "../helpers/h.0--types";
import { TSupportedLanguage } from "../helpers/h.0--translations";

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
	const language: TSupportedLanguage = (params.language as TSupportedLanguage) || "en";

	// Language-specific long descriptions
	const longDescriptions: Record<TSupportedLanguage, string> = {
		en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
		"zh-TW": "傳統中文範例文字：這是一段用於測試排版和印刷的示範文本。自從十五世紀以來，這類文本一直被用作印刷業的標準範例，當時一位不知名的印刷工匠將字模打亂以製作字體樣本書。",
		"zh-CN": "简体中文范例文字：这是一段用于测试排版和印刷的示范文本。自从十五世纪以来，这类文本一直被用作印刷业的标准范例，当时一位不知名的印刷工匠将字模打乱以制作字体样本书。",
		vi: "Văn bản tiếng Việt mẫu: Đây là đoạn văn bản giả được sử dụng trong ngành in ấn và sắp chữ. Lorem Ipsum đã trở thành văn bản giả tiêu chuẩn của ngành kể từ những năm 1500, khi một thợ in không tên đã lấy một dãy chữ và xáo trộn nó để tạo ra một cuốn sách mẫu.",
		ko: "한국어 샘플 텍스트: 이것은 인쇄 및 조판 산업의 더미 텍스트입니다. Lorem Ipsum은 1500년대 이래로 업계의 표준 더미 텍스트로 사용되어 왔으며, 당시 이름 없는 인쇄업자가 활자를 가져다가 뒤섞어 활자 견본 책을 만들었습니다.",
		ja: "日本語のサンプルテキスト：これは印刷および組版業界のダミーテキストです。Lorem Ipsumは1500年代以来、業界の標準的なダミーテキストとして使用されてきました。当時、名前の知られていない印刷業者が活字を取り出して混ぜ合わせ、活字見本帳を作成しました。",
		es: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido tomó una galera de tipos y la mezcló para hacer un libro de muestras tipográficas.",
	};

	const longDescription = longDescriptions[language];

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
