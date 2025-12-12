import { getResultId } from "df-backend-02/dist/functions/cdkapi/shared/result-msg";
import { TCreateBillingStatementPdfParams } from "../../--IPMTDocPrinter";
import { TSupportedLanguage } from "../../helpers/h.0--translations";
import { TBillingStatementDetails } from "../../helpers/h.0--types";

/**
 * Mock implementation that mirrors the real multi-payment-profile flow.
 * We encode each mock profile in `params.sub_acc_id` and split by `||`
 * so tests can describe multiple payment profiles deterministically.
 */
export async function collectStatementDetails(
	params: TCreateBillingStatementPdfParams,
): Promise<TBillingStatementDetails[]> {
	const language = (params.language as TSupportedLanguage) || "en";
	const encodedProfiles = params.sub_acc_id
		.split("||")
		.map(segment => segment.trim())
		.filter(Boolean);

	if (!encodedProfiles.length)
		throw getResultId(
			"invalidParam",
			"At least one parameter group is required: numRows_campaignSpends|numRows_payments|org_name|long_desc|payment_profile_type|has_balance_adj",
		);

	return encodedProfiles.map((encoded, profileIndex) =>
		buildMockStatementDetails({ encoded, language, profileIndex }),
	);
}

function buildMockStatementDetails(params: {
	encoded: string;
	language: TSupportedLanguage;
	profileIndex: number;
}): TBillingStatementDetails {
	const config = parseProfileConfig(params.encoded, params.profileIndex);
	const { profileIndex, language } = params;
	const longDescription = longDescriptions[language] ?? longDescriptions.en;
	const subAccId = `b_mock_${profileIndex + 1}`;
	const linkedSubAccId = `b_mock_linked_${profileIndex + 1}`;
	const paymentProfileId = `pp_mock_${profileIndex + 1}`;

	const account: TBillingStatementDetails["account"] = {
		account_id: 111222333 + profileIndex,
		ads_sub_acc_name: `${config.orgName} Account ${profileIndex + 1}`,
		advertiser_time_zone_name: "America/New_York",
		linked_pmt_prf_id: paymentProfileId,
		linked_pmt_sub_acc_id: linkedSubAccId,
	};

	const createdTime = new Date(Date.UTC(2025, 8, 1 + profileIndex));
	const v2_payment_profile: TFields_v2_payment_profiles = {
		pmt_prf_id: paymentProfileId,
		sub_acc_id: linkedSubAccId,
		pmt_prf_name: `${config.orgName} payment profile ${profileIndex + 1}`,
		type: config.paymentProfileType,
		legal_name:
			config.paymentProfileType === "individual"
				? `${config.orgName} Owner`
				: config.orgName,
		org_name: config.paymentProfileType === "individual" ? null : config.orgName,
		email: `mock+${profileIndex + 1}@ganjing.com`,
		phone: undefined,
		phone_country_code: undefined,
		address_postal_code: "10940",
		address_country: "US",
		is_mgr: profileIndex % 2 === 0,
		created_by: "u_mock",
		created_time: createdTime,
		last_user_update_by: "u_mock",
		last_user_update_time: createdTime,
		is_del: false,
	};

	const balance_adjustments = config.hasBalanceAdjustments
		? buildBalanceAdjustments(linkedSubAccId, profileIndex)
		: [];

	const costGenerator = createSequentialCost(10000 + profileIndex * 500, 175);
	const monthly_campaign_spends = buildCampaignSpends({
		config,
		subAccId,
		longDescription,
		costGenerator,
		profileIndex,
	});

	const payments = buildPayments({ config, profileIndex });
	const monthly_account_balance = buildMonthlyAccountBalance(profileIndex);

	const pmt_prf_link_history: NonNullable<TBillingStatementDetails["pmt_prf_link_history"]> = [
		{
			linked_pmt_prf_id: paymentProfileId,
			linked_pmt_sub_acc_id: linkedSubAccId,
			sub_acc_id: subAccId,
			link_time: new Date(Date.UTC(2025, 8, 1 + profileIndex)).toISOString(),
			unlink_time: new Date(Date.UTC(2025, 11, 31)).toISOString(),
		},
	];

	return {
		account,
		payment_profile: v2_payment_profile,
		monthly_account_balance,
		balance_adjustments,
		monthly_campaign_spends,
		payments,
		pmt_prf_link_history,
	};
}

type TProfileConfig = {
	numCampaignRows: number;
	numPaymentRows: number;
	orgName: string;
	longDesc: boolean;
	paymentProfileType: TPaymentProfile_Type;
	hasBalanceAdjustments: boolean;
};

function parseProfileConfig(encoded: string, profileIndex: number): TProfileConfig {
	const parts = encoded.split("|");
	if (parts.length < 5)
		throw getResultId(
			"invalidParam",
			`Profile #${profileIndex + 1} expects parameters: numRows_campaignSpends|numRows_payments|org_name|long_desc|payment_profile_type|has_balance_adj`,
		);

	const [campaignRows, paymentRows, orgName, longDescFlag, profileType, hasAdjFlag] = parts;

	return {
		numCampaignRows: Number(campaignRows) || 0,
		numPaymentRows: Number(paymentRows) || 0,
		orgName: orgName || `Organization ${profileIndex + 1}`,
		longDesc: (longDescFlag || "false").toLowerCase() === "true",
		paymentProfileType: (profileType || "organization").toLowerCase() as TPaymentProfile_Type,
		hasBalanceAdjustments: hasAdjFlag === undefined ? true : hasAdjFlag !== "false",
	};
}

function buildCampaignSpends(params: {
	config: TProfileConfig;
	subAccId: string;
	longDescription: string;
	costGenerator: () => number;
	profileIndex: number;
}): TBillingStatementDetails["monthly_campaign_spends"] {
	const { config, subAccId, longDescription, costGenerator } = params;
	return Array.from({ length: config.numCampaignRows }, (_, index) => ({
		sub_acc_id: subAccId,
		cpgn_id: `m_${params.profileIndex}_${index}`,
		cpgn_name:
			config.longDesc && (index % 5 === 0 || index % 6 === 0 || index % 17 === 0)
				? longDescription
				: `Campaign ${index + 1}`,
		cost: config.longDesc ? "12345" : String(costGenerator()),
		imp: String(2000 + params.profileIndex * 100 + index * 25),
	}));
}

function buildPayments(params: {
	config: TProfileConfig;
	profileIndex: number;
}): TBillingStatementDetails["payments"] {
	const getNextDate = createSequentialDate(
		params.config.numPaymentRows,
		"2025-10-01",
		params.profileIndex + 1,
	);
	return Array.from({ length: params.config.numPaymentRows }, (_, index) => ({
		paid_time: getNextDate(),
		description: ` Mastercard ***${String(8888 + params.profileIndex * 111 + index).slice(-4)}`,
		total_amount: String(30000 + params.profileIndex * 2500 + index * 500),
		tax: String(150 + index * 5),
	}));
}

function buildMonthlyAccountBalance(
	profileIndex: number,
): TBillingStatementDetails["monthly_account_balance"] {
	return {
		period: "2025-09-01 -- 2025-09-30",
		total_ad_spend_adjusted: 824750 + profileIndex * 3250,
		created_time: new Date(Date.UTC(2025, 8, 15 + profileIndex)).toISOString(),
		opening_balance: 1000000 - profileIndex * 12500,
		closing_balance: 890000 - profileIndex * 15000,
		total_payments_received: String(165726 + profileIndex * 4500),
	};
}

function buildBalanceAdjustments(
	subAccId: string,
	profileIndex: number,
): TFields_v2_balance_adjustments[] {
	return [
		{
			bal_adj_id: `ba_mock_${profileIndex + 1}_1`,
			sub_acc_id: subAccId,
			adj_amount: "23000",
			adj_time: "2025-07-18 08:00:00",
			applied_amount: "20000",
			unapplied_amount: "3000",
			notes: "Mock adjustment 1",
			created_time_utc: "2025-07-18 08:00:00",
			created_time: "2025-07-26 13:31:24.608-04",
			created_by: "u_mock",
			updated_time: "2025-07-26 21:31:24.608",
			updated_by: "u_mock",
		},
		{
			bal_adj_id: `ba_mock_${profileIndex + 1}_2`,
			sub_acc_id: subAccId,
			adj_amount: "9800",
			adj_time: "2025-07-26 08:00:00",
			applied_amount: "2000",
			unapplied_amount: "7800",
			notes: "Mock adjustment 2",
			created_time_utc: "2025-07-26 08:00:00",
			created_time: "2025-07-26 13:30:07.887-04",
			created_by: "u_mock",
			updated_time: "2025-07-26 21:30:07.887",
			updated_by: "u_mock",
		},
	];
}

const longDescriptions: Record<TSupportedLanguage, string> = {
	en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
	"zh-TW":
		"傳統中文範例文字：這是一段用於測試排版和印刷的示範文本。自從十五世紀以來，這類文本一直被用作印刷業的標準範例，當時一位不知名的印刷工匠將字模打亂以製作字體樣本書。",
	"zh-CN":
		"简体中文范例文字：这是一段用于测试排版和印刷的示范文本。自从十五世纪以来，这类文本一直被用作印刷业的标准范例，当时一位不知名的印刷工匠将字模打乱以制作字体样本书。",
	vi: "Văn bản tiếng Việt mẫu: Đây là đoạn văn bản giả được sử dụng trong ngành in ấn và sắp chữ. Lorem Ipsum đã trở thành văn bản giả tiêu chuẩn của ngành kể từ những năm 1500, khi một thợ in không tên đã lấy một dãy chữ và xáo trộn nó để tạo ra một cuốn sách mẫu.",
	ko: "한국어 샘플 텍스트: 이것은 인쇄 및 조판 산업의 더미 텍스트입니다. Lorem Ipsum은 1500년대 이래로 업계의 표준 더미 텍스트로 사용되어 왔으며, 당시 이름 없는 인쇄업자가 활자를 가져다가 뒤섞어 활자 견본 책을 만들었습니다.",
	ja: "日本語のサンプルテキスト：これは印刷および組版業界のダミーテキストです。Lorem Ipsumは1500年代以来、業界の標準的なダミーテキストとして使用されてきました。当時、名前の知られていない印刷業者が活字を取り出して混ぜ合わせ、活字見本帳を作成しました。",
	es: "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor desconocido tomó una galera de tipos y la mezcló para hacer un libro de muestras tipográficas.",
};

function createSequentialCost(start: number = 10000, increment: number = 100) {
	let current = start;
	return function (): number {
		const value = current;
		current += increment;
		return value;
	};
}

function createSequentialDate(
	totalPayments: number,
	startDate: string,
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
