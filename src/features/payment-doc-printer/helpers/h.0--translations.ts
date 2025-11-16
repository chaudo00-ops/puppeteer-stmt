export type TSupportedLanguage = "en" | "zh-CN";

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
};

export function getTranslations(language: TSupportedLanguage): TBillingStatementTranslations {
	return BILLING_STATEMENT_TRANSLATIONS[language] || BILLING_STATEMENT_TRANSLATIONS.en;
}
