import { promises as fs } from "fs";
import path from "path";
import {
	AVG_CHAR_WIDTH_CJK,
	AVG_CHAR_WIDTH_LATIN,
	BILL_TO_SECTION_HEIGHT_PX,
	COL_WIDTH_LG,
	COL_WIDTH_MD,
	COL_WIDTH_SM,
	DETAILS_SUMMARY_SECTION_HEIGHT_PX,
	PAGE_CONTENT_HEIGHT,
	PAGE_FOOTER_HEIGHT,
	TABLE_CELL_PADDING_HORIZONTAL,
	TABLE_CELL_PADDING_VERTICAL,
	TABLE_DATA_FONT_SIZE,
	TABLE_HEADER_HEIGHT,
	TABLE_ROW_HEIGHT,
	TABLE_SUBTOTAL_TOTAL_ROWS,
	TABLE_TITLE_HEIGHT,
} from "./h.0--puppeteer-consts";
import { type TBillingStatementTranslations, type TSupportedLanguage } from "./h.0--translations";
import type { TBillingStatementDetails_Display } from "./h.0--types";

type ActivityTableEntry =
	| TBillingStatementDetails_Display["monthly_campaign_spends"][number]
	| TBillingStatementDetails_Display["balance_adjustments"][number];
type PaymentEntry = TBillingStatementDetails_Display["payments"][number];

export type TemplateContext = {
	account: TBillingStatementDetails_Display["account"];
	paymentProfile: TBillingStatementDetails_Display["payment_profile"];
	monthly_account_balance: TBillingStatementDetails_Display["monthly_account_balance"];
	pmt_prf_link_history: TBillingStatementDetails_Display["pmt_prf_link_history"];
	total_tax: TBillingStatementDetails_Display["total_tax"];
	fontFamily: string;
	activityPages: ActivityTableEntry[][];
	paymentPages: PaymentEntry[][];
	firstPageAvailableForActivity: number;
	generatePageHeader: () => string;
	generatePageFooter: () => string;
	generateActivityTableHeader: () => string;
	generatePaymentsTableHeader: () => string;
};

function estimateRowHeight(text: string, language: TSupportedLanguage): number {
	const availableWidth = COL_WIDTH_LG - TABLE_CELL_PADDING_HORIZONTAL * 2;

	const AVG_CHAR_WIDTH = ["en", "vi", "es"].includes(language)
		? AVG_CHAR_WIDTH_LATIN
		: AVG_CHAR_WIDTH_CJK;
	const charsPerLine = Math.floor(availableWidth / AVG_CHAR_WIDTH);
	const numLines = Math.max(1, Math.ceil(text.length / charsPerLine));

	const calculatedHeight = TABLE_CELL_PADDING_VERTICAL * 2 + numLines * TABLE_DATA_FONT_SIZE;

	return Math.max(TABLE_ROW_HEIGHT, calculatedHeight);
}

export function calculateActivityEntriesHeight(
	campaigns: ActivityTableEntry[],
	language: TSupportedLanguage,
): number {
	return campaigns.reduce((total, entry) => {
		const description = "cpgn_name" in entry ? entry.cpgn_name : entry.bal_adj_id;
		return total + estimateRowHeight(description, language);
	}, 0);
}

export async function prepareTemplateContext(
	displayed_details: TBillingStatementDetails_Display,
	translations: TBillingStatementTranslations,
	language: TSupportedLanguage,
): Promise<TemplateContext> {
	const {
		account,
		payment_profile: paymentProfile,
		monthly_account_balance,
		monthly_campaign_spends,
		balance_adjustments,
		payments,
		total_tax,
		pmt_prf_link_history,
	} = displayed_details;

	const logoPath = path.join(__dirname, "..", "assets", "images", "gjw-logo-transparent.png");
	const logoBuffer = await fs.readFile(logoPath);
	const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

	const fontFamilyMap: Record<TSupportedLanguage, string> = {
		en: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
		"zh-CN": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif`,
		"zh-TW": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif`,
		vi: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
		ko: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif`,
		ja: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'Meiryo', sans-serif`,
		es: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
	};

	const fontFamily = fontFamilyMap[language];

	const firstPageFixedHeight = BILL_TO_SECTION_HEIGHT_PX + DETAILS_SUMMARY_SECTION_HEIGHT_PX;
	const activityTableOverhead = TABLE_TITLE_HEIGHT + TABLE_HEADER_HEIGHT + PAGE_FOOTER_HEIGHT;
	const paymentsTableOverhead = TABLE_TITLE_HEIGHT + TABLE_HEADER_HEIGHT + PAGE_FOOTER_HEIGHT;

	const firstPageAvailableForActivity =
		PAGE_CONTENT_HEIGHT - firstPageFixedHeight - activityTableOverhead;

	const continuationPageAvailable =
		PAGE_CONTENT_HEIGHT - activityTableOverhead - TABLE_ROW_HEIGHT;

	const paymentsPageAvailable = PAGE_CONTENT_HEIGHT - paymentsTableOverhead - TABLE_ROW_HEIGHT;
	const paymentsPageRowsWithTotal = Math.floor(
		(paymentsPageAvailable - TABLE_SUBTOTAL_TOTAL_ROWS) / TABLE_ROW_HEIGHT,
	);
	const paymentsPageRowsWithoutTotal = Math.floor(paymentsPageAvailable / TABLE_ROW_HEIGHT);

	const activityPages: ActivityTableEntry[][] = [];
	const remainingActivityEntries: ActivityTableEntry[] = [
		...monthly_campaign_spends,
		...balance_adjustments,
	];
	if (remainingActivityEntries.length > 0) {
		const totalCampaignsHeight = calculateActivityEntriesHeight(
			remainingActivityEntries,
			language,
		);

		if (totalCampaignsHeight <= firstPageAvailableForActivity - TABLE_SUBTOTAL_TOTAL_ROWS) {
			activityPages.push(remainingActivityEntries.splice(0));
		} else {
			let currentPageCampaigns: ActivityTableEntry[] = [];
			let currentPageHeight = 0;
			let availableHeight = firstPageAvailableForActivity;

			while (remainingActivityEntries.length > 0) {
				const nextCampaign = remainingActivityEntries[0];
				const rowDescription =
					"cpgn_name" in nextCampaign ? nextCampaign.cpgn_name : nextCampaign.bal_adj_id;
				const nextCampaignHeight = estimateRowHeight(rowDescription, language);
				const remainingCampaignsHeight = calculateActivityEntriesHeight(
					remainingActivityEntries,
					language,
				);

				if (
					currentPageHeight + remainingCampaignsHeight + TABLE_SUBTOTAL_TOTAL_ROWS <=
					availableHeight
				) {
					currentPageCampaigns.push(...remainingActivityEntries.splice(0));
					activityPages.push(currentPageCampaigns);
					break;
				}

				if (currentPageHeight + nextCampaignHeight <= availableHeight) {
					currentPageCampaigns.push(remainingActivityEntries.shift()!);
					currentPageHeight += nextCampaignHeight;
				} else {
					if (currentPageCampaigns.length > 0) {
						activityPages.push(currentPageCampaigns);
					}
					currentPageCampaigns = [];
					currentPageHeight = 0;
					availableHeight = continuationPageAvailable;
				}
			}

			if (currentPageCampaigns.length > 0 && !activityPages.includes(currentPageCampaigns)) {
				activityPages.push(currentPageCampaigns);

				const height = calculateActivityEntriesHeight(currentPageCampaigns, language);
				const pageAvailable =
					activityPages.length > 1
						? continuationPageAvailable
						: firstPageAvailableForActivity;
				if (height + TABLE_SUBTOTAL_TOTAL_ROWS > pageAvailable) {
					activityPages.push([]);
				}
			} else if (remainingActivityEntries.length === 0 && activityPages.length === 0) {
				activityPages.push([]);
			}
		}
	}

	const paymentPages: PaymentEntry[][] = [];
	const remainingPayments = [...payments];

	if (remainingPayments.length > 0) {
		if (remainingPayments.length <= paymentsPageRowsWithTotal) {
			paymentPages.push(remainingPayments.splice(0));
		} else {
			const firstChunk = remainingPayments.splice(0, paymentsPageRowsWithoutTotal);
			paymentPages.push(firstChunk);

			while (remainingPayments.length > paymentsPageRowsWithTotal) {
				const chunk = remainingPayments.splice(0, paymentsPageRowsWithoutTotal);
				paymentPages.push(chunk);
			}

			if (remainingPayments.length > 0) {
				paymentPages.push(remainingPayments.splice(0));
			} else {
				paymentPages.push([]);
			}
		}
	}

	const generatePageHeader = () => `
    <div class="page-header">
      <div class="header">
        <h1>${translations.documentTitle}</h1>
        <img src="${logoBase64}" alt="Ganjing World Logo" class="logo" />
      </div>
    </div>`;

	const generatePageFooter = () => `
    <div class="page-footer">
    </div>`;

	const generateActivityTableHeader = () => `
          <colgroup>
            <col style="width: ${COL_WIDTH_LG}px;">
            <col style="width: ${COL_WIDTH_SM}px;">
            <col style="width: ${COL_WIDTH_SM}px;">
          </colgroup>
          <thead>
            <tr class="table-title">
              <th colspan="3">
                <h3>${translations.activityDetails}</h3>
              </th>
            </tr>
            <tr>
              <th>${translations.description}</th>
              <th>${translations.impressions}</th>
              <th>${translations.amount}</th>
            </tr>
          </thead>`;

	const generatePaymentsTableHeader = () => `
          <colgroup>
            <col style="width: ${COL_WIDTH_MD}px;">
            <col style="width: ${COL_WIDTH_MD}px;">
            <col style="width: ${COL_WIDTH_MD};">
          </colgroup>
          <thead>
            <tr class="table-title">
              <th colspan="3">
                <h3>${translations.paymentsReceived}</h3>
              </th>
            </tr>
            <tr>
              <th>${translations.date}</th>
              <th>${translations.description}</th>
              <th>${translations.amount}</th>
            </tr>
          </thead>`;

	return {
		account,
		paymentProfile,
		monthly_account_balance,
		pmt_prf_link_history,
		total_tax,
		fontFamily,
		activityPages,
		paymentPages,
		firstPageAvailableForActivity,
		generatePageHeader,
		generatePageFooter,
		generateActivityTableHeader,
		generatePaymentsTableHeader,
	};
}
