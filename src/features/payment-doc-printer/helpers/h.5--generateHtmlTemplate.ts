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
  MARGIN_TOP_HEADER,
  MARGIN_TOP_LOGO,
  MARGIN_TOP_SECTION,
  PAGE_HEIGHT,
  PAGE_WIDTH,
  TEXT_COLOR_H1,
  TEXT_COLOR,
  FONT_WEIGHT_PARAGRAPH,
  COLUMN_GAP,
  FONT_SIZE_H2,
  FONT_WEIGHT_H2,
  MARGIN_TOP_TABLE,
  TABLE_HEADER_BG_COLOR,
  TABLE_HEADER_TEXT_COLOR,
  TBL_HEADER_HEIGHT,
  TABLE_HEADER_FONT_SIZE,
  TABLE_HEADER_FONT_WEIGHT,
  TABLE_EVEN_ROW_COLOR,
  TABLE_TEXT_COLOR,
  PAGE_PADDING_TOP,
  PAGE_PADDING_BOTTOM,
  TBL_ROW_HEIGHT,
  TABLE_DATA_PADDING_LR,
  TABLE_DATA_PADDING_TB,
  TABLE_DATA_FONT_SIZE,
  TABLE_DATA_FONT_WEIGHT,
  FONT_SIZE_TOTAL,
  FONT_WEIGHT_TOTAL,
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
      padding-top: ${PAGE_PADDING_TOP};
      padding-bottom: ${PAGE_PADDING_BOTTOM};
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
      height: ${PAGE_HEIGHT};
    }

    body {
      font-family: ${fontFamily};
      font-size: ${FONT_SIZE_PARAGRAPH};
      font-weight: ${FONT_WEIGHT_PARAGRAPH};
      color: ${TEXT_COLOR};
      line-height: 1.5;
      padding: 0px ${LEFT_RIGHT_MARGIN};
      width: ${PAGE_WIDTH};
      min-height: ${PAGE_HEIGHT};
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
      margin-top: ${MARGIN_TOP_HEADER};
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
      color: ${TEXT_COLOR};
      line-height: 19px;
    }

    .bill-to p.subtitle {
      font-size: ${FONT_SIZE_SUBTITLE};
      font-weight: ${FONT_WEIGHT_SUBTITLE};
      color: ${TEXT_COLOR};
      line-height: 19px;
    }

    .bill-to p {
      font-size: ${FONT_SIZE_PARAGRAPH};
      color: ${TEXT_COLOR};
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
      color: ${TEXT_COLOR};
      text-align: left;
      overflow: visible;
      white-space: nowrap;
      padding-bottom: 5.47px; 
    }

    .detail-row, .summary-row {
      font-size: ${FONT_SIZE_PARAGRAPH};
      color: ${TEXT_COLOR};
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
      border-bottom: none !important;
    }

    .payments-received {
      border-bottom: none !important;
    }

    .payments-received h2 {
      font-size: ${FONT_SIZE_H2};
      font-weight: ${FONT_WEIGHT_H2};
      color: ${TEXT_COLOR};
    }

    /* Page break handling */
    .page-break {
      page-break-before: always;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* Use box-shadow instead of background-color for cleaner PDF rendering */
    thead tr:not(.table-title) th {
      color: ${TABLE_HEADER_TEXT_COLOR};
      background-color: ${TABLE_HEADER_BG_COLOR};
      font-size: ${TABLE_HEADER_FONT_SIZE};
      font-weight: ${TABLE_HEADER_FONT_WEIGHT};
      text-align: left;
      height: ${TBL_HEADER_HEIGHT};
      padding: 7px ${TABLE_DATA_PADDING_LR};
    }

    .table-title tr {
      background-color: white; /* ensure white background */
    }

    /* Remove border and padding from the table title row */
    .table-title th {
      text-align: left;        /* optional: align text */
      padding: 0;              /* remove padding */
      padding-bottom: ${MARGIN_TOP_TABLE};
    }

    .table-title h3 {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR};
      margin: 0;           /* remove default margin of h2 */
      padding: 0;          /* remove default padding */
    }

    tbody tr: {
      height: ${TBL_ROW_HEIGHT};
    }

    tbody tr:nth-child(odd) {
      background-color: white;
    }

    tbody tr:nth-child(even) {
      background-color: ${TABLE_EVEN_ROW_COLOR};
    }

    tbody tr:nth-last-child(3) {
      border-bottom: 1px solid ${DIVIDER_LINE_COLOR} !important;
    }

    td {
      padding: ${TABLE_DATA_PADDING_TB} ${TABLE_DATA_PADDING_LR};
      color: ${TABLE_TEXT_COLOR};
      font-size: ${TABLE_DATA_FONT_SIZE};
      font-weight: ${TABLE_DATA_FONT_WEIGHT};
    }

    .subtotal-row {
      background-color: white !important;
      border-bottom: 1px solid ${DIVIDER_LINE_COLOR} !important;
    }

    .total-row {
      font-weight: ${FONT_WEIGHT_TOTAL} !important;
      background-color: white !important;
    }

    .total-row td.label {
    font-weight: ${FONT_WEIGHT_TOTAL} !important;
      text-align: right;
    }

    .total-row td.value {
    font-weight: ${FONT_WEIGHT_TOTAL} !important;
      font-size: ${FONT_SIZE_TOTAL};
    }

  </style>
</head>
<body>
  <!-- Page 1 -->

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

  <div class="activity-details section">
    
    <table>
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
          <td class="label" style="text-align: right;">${
            translations.subtotal
          }</td>
          <td class="value">${
            monthly_account_balance.total_ad_spend_adjusted
          }</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td class="label" style="text-align: right;">${
            translations.total
          }</td>
          <td class="value">${
            monthly_account_balance.total_ad_spend_adjusted
          }</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Page break for payments -->
  <div class="page-break"></div>

  <div class="payments-received section">
    <table>
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
          <td class="label" style="text-align: right;">${
            translations.totalPaymentsReceived
          }</td>
          <td class="value">${
            monthly_account_balance.total_payments_received
          }</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;
}
