import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import type { TBillingStatementDetails_Display } from "./h.0--types";
import {
  type TBillingStatementTranslations,
  type TSupportedLanguage,
} from "./h.0--translations";
import {
  DIVIDER_LINE_COLOR,
  FONT_SIZE_H1,
  FONT_SIZE_H3,
  FONT_SIZE_PARAGRAPH,
  FONT_SIZE_SUBTITLE,
  FONT_WEIGHT_H1,
  FONT_WEIGHT_H3,
  FONT_WEIGHT_SUBTITLE,
  LEFT_RIGHT_MARGIN,
  LOGO_HEIGHT,
  LOGO_WIDTH,
  PADDING_BOTTOM_SECTION,
  MARGIN_TOP_H1,
  MARGIN_TOP_LOGO,
  MARGIN_TOP_SECTION,
  PAGE_HEIGHT,
  PAGE_WIDTH,
  TEXT_COLOR_H1,
  TEXT_COLOR_H3,
  TEXT_COLOR_PARAGRAPH,
  TEXT_COLOR_SUBTITLE,
  FONT_WEIGHT_PARAGRAPH,
  COLUMN_GAP,
} from "./h.0--consts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate HTML template for billing statement
 */
export async function generateHtmlTemplate(
  displayed_details: TBillingStatementDetails_Display,
  translations: TBillingStatementTranslations,
  language: TSupportedLanguage
): Promise<string> {
  // Load logo as base64
  const logoPath = join(
    __dirname,
    "..",
    "assets",
    "images",
    "gjw-logo-transparent.png"
  );
  const logoBuffer = await fs.readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  const {
    account,
    paymentProfile,
    monthly_account_balance,
    monthly_campaign_spends,
    payments,
    total_tax,
  } = displayed_details;

  // Determine font family based on language
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

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    /* Define exact page size and margins for 1:1 PDF mapping */
    @page {
      size: ${PAGE_WIDTH} ${PAGE_HEIGHT}; /* Letter size */
      margin: 0;
    }

    /* Ensure exact color reproduction in PDF */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    html {
      width: ${PAGE_WIDTH};
      height: ${PAGE_WIDTH};
    }

    body {
      font-family: ${fontFamily};
      font-size: 14px;
      color: #0F0F0F;
      line-height: 1.5;
      padding: 0px ${LEFT_RIGHT_MARGIN};
      width: ${PAGE_WIDTH};
      min-height: ${PAGE_WIDTH};
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header h1 {
      font-size: ${FONT_SIZE_H1};
      font-weight: ${FONT_WEIGHT_H1};
      color: ${TEXT_COLOR_H1};
      margin-top: ${MARGIN_TOP_H1};
    }

    .logo {
      width: ${LOGO_WIDTH};
      height: ${LOGO_HEIGHT};
      margin-top: ${MARGIN_TOP_LOGO};
    }

    .section {
      margin-top: ${MARGIN_TOP_SECTION};
      padding-bottom: ${PADDING_BOTTOM_SECTION};
      border-bottom: 1px solid ${DIVIDER_LINE_COLOR};
    }

    .bill-to h3 {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR_H3};
      line-height: 19px;
    }

    .bill-to p.subtitle {
      font-size: ${FONT_SIZE_SUBTITLE};
      font-weight: ${FONT_WEIGHT_SUBTITLE};
      color: ${TEXT_COLOR_SUBTITLE};
      line-height: 19px;
    }

    .bill-to p {
      font-size: ${FONT_SIZE_PARAGRAPH};
      color: ${TEXT_COLOR_PARAGRAPH};
      line-height: 17px;
    }

    .details-summary-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: ${COLUMN_GAP}; /* space between two columns */
      letter-spacing: 0px;
    }

    .details h3, .summary h3 {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR_H3};
      text-align: left;
      overflow: visible;
      white-space: nowrap;
      padding-bottom: 5.47px; 
    }

    .detail-row, .summary-row {
      font-size: ${FONT_SIZE_PARAGRAPH};
      font-weight: ${FONT_WEIGHT_PARAGRAPH};
      color: ${TEXT_COLOR_PARAGRAPH};
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
      gap: 4px; /* spacing between "Label" and "Value" inside each row */

      padding-top: 5.47px; 
      padding-bottom: 5.47px; 
    }

    .dot-fill {
      flex: 1;
      border-bottom: 1px dotted #ccc;
      margin: 0px;
      min-height: 1px; /* Changed from height: 0 */
      align-self: center; /* Aligns to bottom of flex container */
      margin-bottom: 0px; /* Adjust vertical position */
    }

    .detail-label, .summary-label {
      white-space: nowrap;
      text-align: left;
      flex: 0 0 auto;
    }

    .detail-value, .summary-value {
      white-space: nowrap;
      text-align: right;
      flex: 0 0 auto;
    }

    .activity-details {
      margin-bottom: 40px;
    }

    .activity-details h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    thead {
      background-color: #2c4a6e;
      color: white;
    }

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      font-size: 14px;
    }

    th:last-child, td:last-child {
      text-align: right;
    }

    tbody tr:nth-child(odd) {
      background-color: #f8f9fa;
    }

    tbody tr:nth-child(even) {
      background-color: white;
    }

    td {
      padding: 12px 16px;
      color: #333;
    }

    .total-row {
      background-color: white !important;
    }

    .total-row td {
      font-weight: 600;
      font-size: 16px;
      padding: 16px;
    }

    .subtotal-row td {
      text-align: right;
      padding: 12px 16px;
      font-weight: 500;
    }

    .payments-received {
      margin-top: 40px;
    }

    .payments-received h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    /* Page break handling */
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>
  <!-- Page 1 -->
  <div class="header">
    <h1>${translations.documentTitle}</h1>
    <img src="${logoBase64}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="bill-to section">
    <h3>${translations.billTo}</h3>
    <p class="bill-to subtitle">${paymentProfile.legal_name}</p>
    ${
      paymentProfile.type === "organization"
        ? `<p class="bill-to subtitle">${paymentProfile.org_name || ""}</p>`
        : ""
    }
    <p>${paymentProfile.address_country}, ${
    paymentProfile.address_postal_code
  }</p>
  </div>

  <div class="details-summary-container section">
    <div class="details">
      <h3>${translations.details}</h3>
      <div class="detail-row">
        <span class="detail-label">${translations.accountId}</span>
        <span class="dot-fill"></span>
        <span class="detail-value">${account.account_id}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${translations.paymentsProfile}</span>
        <span class="dot-fill"></span>
        <span class="detail-value">${paymentProfile.pmt_prf_name}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${translations.paymentsProfileId}</span>
        <span class="dot-fill"></span>
        <span class="detail-value">${paymentProfile.pmt_prf_id}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${translations.statementIssueDate}</span>
        <span class="dot-fill"></span>
        <span class="detail-value">${
          monthly_account_balance.created_time
        }</span>
      </div>
    </div>

    <div class="summary">
      <h3>${translations.summaryFor} ${
    monthly_account_balance.billing_period_start
  } – ${monthly_account_balance.billing_period_end}</h3>
      <div class="summary-row">
        <span class="summary-label">${translations.openingBalance}</span>
        <span class="dot-fill"></span>
        <span class="summary-value">${
          monthly_account_balance.opening_balance
        }</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${translations.totalAdSpend}</span>
        <span class="dot-fill"></span>
        <span class="summary-value">${
          monthly_account_balance.total_ad_spend
        }</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${translations.totalPaymentsReceived}</span>
        <span class="dot-fill"></span>
        <span class="summary-value">${
          monthly_account_balance.total_payments_received
        }</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${translations.closingBalance}</span>
        <span class="dot-fill"></span>
        <span class="summary-value">${
          monthly_account_balance.closing_balance
        }</span>
      </div>
    </div>
  </div>

  <div class="activity-details">
    <h2>${translations.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${translations.description}</th>
          <th>${translations.impressions}</th>
          <th>${translations.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${monthly_campaign_spends
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.cpgn_name}</td>
            <td>${campaign.imp}</td>
            <td>${campaign.cost}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="subtotal-row">
          <td></td>
          <td style="text-align: right;">${translations.subtotal}</td>
          <td>${monthly_account_balance.total_ad_spend_adjusted}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">${translations.total}</td>
          <td>${monthly_account_balance.total_ad_spend_adjusted}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Page break for payments -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${translations.documentTitle}</h1>
    <img src="${logoBase64}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${translations.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${translations.date}</th>
          <th>${translations.description}</th>
          <th>${translations.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${payments
          .map(
            (payment) => `
          <tr>
            <td>${payment.paid_time}</td>
            <td>${payment.description}</td>
            <td>${payment.total_amount}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="subtotal-row">
          <td></td>
          <td style="text-align: right;">${translations.tax}</td>
          <td>${total_tax}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">${
            translations.totalPaymentsReceived
          }</td>
          <td>${monthly_account_balance.total_payments_received}</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;
}
