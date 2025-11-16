export type TSupportedLanguage = "en" | "zh-TW" | "zh-CN" | "vi" | "ko" | "ja" | "es";

export type TBillingStatementTranslations = {
	documentTitle: string;
	billTo: string;
	details: string;
	accountId: string;
	paymentsProfile: string;
	paymentsProfileId: string;
	statementIssueDate: string;
	summary: string;
	openingBalance: string;
	totalAdSpend: string;
	totalPaymentsReceived: string;
	closingBalance: string;
	activityDetails: string;
	paymentsReceived: string;
	description: string;
	impressions: string;
	amount: string;
	date: string;
	subtotal: string;
	total: string;
	tax: string;
	summaryFor: string; // "Summary for"
};

export const BILLING_STATEMENT_TRANSLATIONS: Record<
	TSupportedLanguage,
	TBillingStatementTranslations
> = {
	en: {
		documentTitle: "Billing Statements",
		billTo: "Bill To",
		details: "Details",
		accountId: "Account ID",
		paymentsProfile: "Payments profile",
		paymentsProfileId: "Payments profile ID",
		statementIssueDate: "Statement issue date",
		summary: "Summary for",
		openingBalance: "Opening balance",
		totalAdSpend: "Total ad spend",
		totalPaymentsReceived: "Total payments received",
		closingBalance: "Closing balance",
		activityDetails: "Activity Details",
		paymentsReceived: "Payments Received",
		description: "Description",
		impressions: "Impressions",
		amount: "Amount",
		date: "Date",
		subtotal: "Subtotal :",
		total: "Total :",
		tax: "Tax :",
		summaryFor: "Summary for",
	},
	"zh-CN": {
		documentTitle: "账单对账单",
		billTo: "账单收件人",
		details: "详细信息",
		accountId: "账户 ID",
		paymentsProfile: "付款资料",
		paymentsProfileId: "付款资料 ID",
		statementIssueDate: "对账单发出日期",
		summary: "摘要",
		openingBalance: "期初余额",
		totalAdSpend: "广告总支出",
		totalPaymentsReceived: "收到的总付款",
		closingBalance: "期末余额",
		activityDetails: "活动详情",
		paymentsReceived: "收到的付款",
		description: "描述",
		impressions: "展示次数",
		amount: "金额",
		date: "日期",
		subtotal: "小计：",
		total: "总计：",
		tax: "税：",
		summaryFor: "摘要",
	},
	"zh-TW": {
		documentTitle: "帳單對帳單",
		billTo: "帳單收件人",
		details: "詳細資訊",
		accountId: "帳戶 ID",
		paymentsProfile: "付款資料",
		paymentsProfileId: "付款資料 ID",
		statementIssueDate: "對帳單發出日期",
		summary: "摘要",
		openingBalance: "期初餘額",
		totalAdSpend: "廣告總支出",
		totalPaymentsReceived: "收到的總付款",
		closingBalance: "期末餘額",
		activityDetails: "活動詳情",
		paymentsReceived: "收到的付款",
		description: "描述",
		impressions: "展示次數",
		amount: "金額",
		date: "日期",
		subtotal: "小計：",
		total: "總計：",
		tax: "稅：",
		summaryFor: "摘要",
	},
	vi: {
		documentTitle: "Bảng Sao Kê Thanh Toán",
		billTo: "Hóa Đơn Cho",
		details: "Chi Tiết",
		accountId: "ID Tài Khoản",
		paymentsProfile: "Hồ sơ thanh toán",
		paymentsProfileId: "ID hồ sơ thanh toán",
		statementIssueDate: "Ngày phát hành bảng sao kê",
		summary: "Tóm Tắt",
		openingBalance: "Số dư đầu kỳ",
		totalAdSpend: "Tổng chi tiêu quảng cáo",
		totalPaymentsReceived: "Tổng thanh toán đã nhận",
		closingBalance: "Số dư cuối kỳ",
		activityDetails: "Chi Tiết Hoạt Động",
		paymentsReceived: "Thanh Toán Đã Nhận",
		description: "Mô Tả",
		impressions: "Lượt Hiển Thị",
		amount: "Số Tiền",
		date: "Ngày",
		subtotal: "Tổng phụ:",
		total: "Tổng cộng:",
		tax: "Thuế:",
		summaryFor: "Tóm tắt cho",
	},
	ko: {
		documentTitle: "청구서",
		billTo: "청구 대상",
		details: "세부정보",
		accountId: "계정 ID",
		paymentsProfile: "결제 프로필",
		paymentsProfileId: "결제 프로필 ID",
		statementIssueDate: "명세서 발행일",
		summary: "요약",
		openingBalance: "기초 잔액",
		totalAdSpend: "총 광고 지출",
		totalPaymentsReceived: "총 수령 결제",
		closingBalance: "기말 잔액",
		activityDetails: "활동 세부정보",
		paymentsReceived: "수령한 결제",
		description: "설명",
		impressions: "노출수",
		amount: "금액",
		date: "날짜",
		subtotal: "소계:",
		total: "합계:",
		tax: "세금:",
		summaryFor: "요약",
	},
	ja: {
		documentTitle: "請求明細書",
		billTo: "請求先",
		details: "詳細",
		accountId: "アカウント ID",
		paymentsProfile: "お支払いプロファイル",
		paymentsProfileId: "お支払いプロファイル ID",
		statementIssueDate: "明細書発行日",
		summary: "概要",
		openingBalance: "期首残高",
		totalAdSpend: "広告費用の合計",
		totalPaymentsReceived: "受領した支払いの合計",
		closingBalance: "期末残高",
		activityDetails: "アクティビティの詳細",
		paymentsReceived: "受領した支払い",
		description: "説明",
		impressions: "インプレッション数",
		amount: "金額",
		date: "日付",
		subtotal: "小計:",
		total: "合計:",
		tax: "税:",
		summaryFor: "概要",
	},
	es: {
		documentTitle: "Estados de Facturación",
		billTo: "Facturar a",
		details: "Detalles",
		accountId: "ID de Cuenta",
		paymentsProfile: "Perfil de pagos",
		paymentsProfileId: "ID del perfil de pagos",
		statementIssueDate: "Fecha de emisión del estado de cuenta",
		summary: "Resumen de",
		openingBalance: "Saldo inicial",
		totalAdSpend: "Gasto total en anuncios",
		totalPaymentsReceived: "Total de pagos recibidos",
		closingBalance: "Saldo final",
		activityDetails: "Detalles de Actividad",
		paymentsReceived: "Pagos Recibidos",
		description: "Descripción",
		impressions: "Impresiones",
		amount: "Cantidad",
		date: "Fecha",
		subtotal: "Subtotal:",
		total: "Total:",
		tax: "Impuesto:",
		summaryFor: "Resumen de",
	},
};

export function getTranslations(language: TSupportedLanguage): TBillingStatementTranslations {
	return BILLING_STATEMENT_TRANSLATIONS[language] || BILLING_STATEMENT_TRANSLATIONS.en;
}
