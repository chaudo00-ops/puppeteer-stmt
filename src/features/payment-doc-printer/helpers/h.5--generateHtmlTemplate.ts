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
  FONT_WEIGHT_H1,
  FONT_WEIGHT_H3,
  FONT_WEIGHT_PARAGRAPH,
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
  COLUMN_GAP,
  FONT_SIZE_H2,
  FONT_WEIGHT_H2,
  MARGIN_TOP_TABLE,
  TABLE_HEADER_BG_COLOR,
  TABLE_HEADER_TEXT_COLOR,
  TABLE_HEADER_HEIGHT,
  TABLE_HEADER_FONT_SIZE,
  TABLE_HEADER_FONT_WEIGHT,
  TABLE_EVEN_ROW_COLOR,
  TABLE_TEXT_COLOR,
  TBL_ROW_HEIGHT,
  TABLE_CELL_PADDING_HORIZONTAL,
  TABLE_CELL_PADDING_VERTICAL,
  TABLE_DATA_FONT_SIZE,
  TABLE_DATA_FONT_WEIGHT,
  FONT_SIZE_TOTAL,
  FONT_WEIGHT_TOTAL,
  COL_WIDTH_LG,
  COL_WIDTH_SM,
  COL_WIDTH_MD,
  // Numeric constants for page calculations
  PAGE_CONTENT_HEIGHT,
  BILL_TO_SECTION_HEIGHT_PX,
  DETAILS_SUMMARY_SECTION_HEIGHT_PX,
  TABLE_TITLE_HEIGHT,
  TABLE_ROW_HEIGHT,
  TABLE_SUBTOTAL_TOTAL_ROWS,
  PAGE_HEADER_HEIGHT,
  PAGE_FOOTER_HEIGHT,
  // Constants for multiline row height estimation
  AVG_CHAR_WIDTH_LATIN,
  AVG_CHAR_WIDTH_CJK,
} from "./h.0--consts";

/**
 * Estimate the height of a table row based on description text length
 * @param text - The description text
 * @returns Estimated row height in pixels
 */
function estimateRowHeight(text: string, language: TSupportedLanguage): number {
  // Calculate available text width (column width minus padding)
  const availableWidth = COL_WIDTH_LG - TABLE_CELL_PADDING_HORIZONTAL * 2;

  const AVG_CHAR_WIDTH = ["en", "vi", "es"].includes(language)
    ? AVG_CHAR_WIDTH_LATIN
    : AVG_CHAR_WIDTH_CJK;
  // Calculate approximate characters per line
  const charsPerLine = Math.floor(availableWidth / AVG_CHAR_WIDTH);

  // Calculate number of lines needed
  const numLines = Math.max(1, Math.ceil(text.length / charsPerLine));

  // Calculate row height: vertical padding + (lines * line height)
  const calculatedHeight =
    TABLE_CELL_PADDING_VERTICAL * 2 + numLines * TABLE_DATA_FONT_SIZE; // 12px font-size = line height

  // Return the larger of calculated height or minimum row height
  return Math.max(TABLE_ROW_HEIGHT, calculatedHeight);
}

/**
 * Calculate total height for an array of campaigns
 * @param campaigns - Array of campaign objects with cpgn_name
 * @returns Total height in pixels
 */
function calculateCampaignsHeight(
  campaigns: { cpgn_name: string }[],
  language: TSupportedLanguage
): number {
  return campaigns.reduce((total, campaign) => {
    return total + estimateRowHeight(campaign.cpgn_name, language);
  }, 0);
}

/**
 * Generate HTML template for billing statement
 */
export async function generateHtmlTemplate(
  displayed_details: TBillingStatementDetails_Display,
  translations: TBillingStatementTranslations,
  language: TSupportedLanguage
): Promise<string> {
  const {
    account,
    paymentProfile,
    monthly_account_balance,
    monthly_campaign_spends,
    payments,
    total_tax,
  } = displayed_details;

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const logoPath = join(
    __dirname,
    "..",
    "assets",
    "images",
    "gjw-logo-transparent.png"
  );
  const logoBuffer = await fs.readFile(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

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

  // Calculate page capacities for table rows
  const firstPageFixedHeight =
    BILL_TO_SECTION_HEIGHT_PX + DETAILS_SUMMARY_SECTION_HEIGHT_PX;
  const activityTableOverhead =
    TABLE_TITLE_HEIGHT + TABLE_HEADER_HEIGHT + PAGE_FOOTER_HEIGHT;
  const paymentsTableOverhead =
    TABLE_TITLE_HEIGHT + TABLE_HEADER_HEIGHT + PAGE_FOOTER_HEIGHT;

  // Available height for table rows on first page (after fixed sections)
  // Calculate both with and without footer rows
  const firstPageAvailableForActivity =
    PAGE_CONTENT_HEIGHT - firstPageFixedHeight - activityTableOverhead;

  // Available height for table rows on continuation pages
  const continuationPageAvailable =
    PAGE_CONTENT_HEIGHT - activityTableOverhead - TABLE_ROW_HEIGHT; // Subtract 1 table row height to maintain breathable footer space

  // Full page for payments table
  const paymentsPageAvailable =
    PAGE_CONTENT_HEIGHT - paymentsTableOverhead - TABLE_ROW_HEIGHT; // Subtract 1 table row height to maintain breathable footer space
  const paymentsPageRowsWithTotal = Math.floor(
    (paymentsPageAvailable - TABLE_SUBTOTAL_TOTAL_ROWS) / TABLE_ROW_HEIGHT
  );
  const paymentsPageRowsWithoutTotal = Math.floor(
    paymentsPageAvailable / TABLE_ROW_HEIGHT
  );

  // Split activity campaigns into pages using dynamic height calculation
  const activityPages: (typeof monthly_campaign_spends)[] = [];
  const remainingCampaigns = [...monthly_campaign_spends];
  if (remainingCampaigns.length > 0) {
    // Calculate total height of all campaigns
    const totalCampaignsHeight = calculateCampaignsHeight(
      remainingCampaigns,
      language
    );

    // Check if everything fits on first page (with footer)
    if (
      totalCampaignsHeight <=
      firstPageAvailableForActivity - TABLE_SUBTOTAL_TOTAL_ROWS
    ) {
      activityPages.push(remainingCampaigns.splice(0));
    } else {
      // First page - fill until we run out of space
      let currentPageCampaigns: typeof monthly_campaign_spends = [];
      let currentPageHeight = 0;
      let availableHeight = firstPageAvailableForActivity;

      while (remainingCampaigns.length > 0) {
        const nextCampaign = remainingCampaigns[0];
        const nextCampaignHeight = estimateRowHeight(
          nextCampaign.cpgn_name,
          language
        );
        const remainingCampaignsHeight = calculateCampaignsHeight(
          remainingCampaigns,
          language
        );

        // If remaining campaigns fit with footer, add them all to current page
        if (
          currentPageHeight +
            remainingCampaignsHeight +
            TABLE_SUBTOTAL_TOTAL_ROWS <=
          availableHeight
        ) {
          currentPageCampaigns.push(...remainingCampaigns.splice(0));
          activityPages.push(currentPageCampaigns);
          break;
        }

        // Check if next campaign fits on current page (without footer for now)
        if (currentPageHeight + nextCampaignHeight <= availableHeight) {
          currentPageCampaigns.push(remainingCampaigns.shift()!);
          currentPageHeight += nextCampaignHeight;
        } else {
          // Current page is full, start a new page
          if (currentPageCampaigns.length > 0) {
            activityPages.push(currentPageCampaigns);
          }
          currentPageCampaigns = [];
          currentPageHeight = 0;
          availableHeight = continuationPageAvailable;
        }
      }

      // Handle any remaining campaigns
      if (
        currentPageCampaigns.length > 0 &&
        !activityPages.includes(currentPageCampaigns)
      ) {
        activityPages.push(currentPageCampaigns);

        // Edge case: Subtotal + Total row on a new page
        const height = calculateCampaignsHeight(currentPageCampaigns, language);
        if (height + TABLE_SUBTOTAL_TOTAL_ROWS > continuationPageAvailable) {
          activityPages.push([]);
        }
      } else if (
        remainingCampaigns.length === 0 &&
        activityPages.length === 0
      ) {
        // Edge case: no pages created yet
        activityPages.push([]);
        console.log(`🫐🫐🫐 pushing [] to activityPages`);
      }
    }
  }

  // Split payments into pages
  const paymentPages: (typeof payments)[] = [];
  const remainingPayments = [...payments];

  if (remainingPayments.length > 0) {
    // Check if everything fits on first payment page (with footer)
    if (remainingPayments.length <= paymentsPageRowsWithTotal) {
      paymentPages.push(remainingPayments.splice(0));
    } else {
      // First payment page without footer
      const firstChunk = remainingPayments.splice(
        0,
        paymentsPageRowsWithoutTotal
      );
      paymentPages.push(firstChunk);

      // Continue with remaining rows - use without footer until last page
      while (remainingPayments.length > paymentsPageRowsWithTotal) {
        const chunk = remainingPayments.splice(0, paymentsPageRowsWithoutTotal);
        paymentPages.push(chunk);
      }

      // Last chunk (will have footer)
      if (remainingPayments.length > 0) {
        paymentPages.push(remainingPayments.splice(0));
      } else {
        // No remaining rows means the footer needs its own dedicated page
        paymentPages.push([]);
      }
    }
  }

  // Helper to generate page header
  const generatePageHeader = () => `
    <div class="page-header">
      <div class="header">
        <h1>${translations.documentTitle}</h1>
        <img src="${logoBase64}" alt="Ganjing World Logo" class="logo" />
      </div>
    </div>`;

  // Helper to generate page footer
  const generatePageFooter = () => `
    <div class="page-footer">
    </div>`;

  // Helper to generate activity table header (without title for continuation)
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

  // Helper to generate payments table header (without title for continuation)
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

  // Generate all pages
  let pagesHtml = "";
  let pageNumber = 1;

  // Generate activity detail pages
  activityPages.forEach((campaigns, pageIndex) => {
    const isFirstPage = pageIndex === 0;
    const isLastActivityPage = pageIndex === activityPages.length - 1;

    const firstPageCampaignsHeight = calculateCampaignsHeight(
      campaigns,
      language
    );
    // Subtotal + Total rows not on first page
    const customMarginTop =
      isFirstPage && activityPages.length !== 1
        ? MARGIN_TOP_SECTION +
          firstPageAvailableForActivity -
          firstPageCampaignsHeight
        : MARGIN_TOP_SECTION;

    pagesHtml += `
  <!-- Page ${pageNumber} -->
  <div class="page ${isLastActivityPage ? "last-page" : ""}">
    ${generatePageHeader()}
    <div class="page-content">`;

    // First page includes bill-to and details-summary sections
    if (isFirstPage) {
      pagesHtml += `
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
            <span class="summary-label">${
              translations.totalPaymentsReceived
            }</span>
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
      </div>`;
    }

    // Activity details table
    pagesHtml += `
      <div class="activity-details" style="margin-top: ${customMarginTop}px;">
        <table>
          ${generateActivityTableHeader()}
          <tbody>
            ${campaigns
              .map(
                (campaign) => `
            <tr>
              <td>${campaign.cpgn_name}</td>
              <td>${campaign.imp}</td>
              <td>${campaign.cost}</td>
            </tr>`
              )
              .join("")}
            ${
              isLastActivityPage
                ? `
            <tr class="subtotal-row">
              <td></td>
              <td class="label" style="text-align: right;">${translations.subtotal}</td>
              <td class="value">${monthly_account_balance.total_ad_spend_adjusted}</td>
            </tr>
            <tr class="total-row">
              <td></td>
              <td class="label" style="text-align: right;">${translations.total}</td>
              <td class="value">${monthly_account_balance.total_ad_spend_adjusted}</td>
            </tr>`
                : ""
            }
          </tbody>
        </table>
      </div>
    </div>
    ${generatePageFooter()}
  </div>`;

    pageNumber++;
  });

  // Generate payment pages
  paymentPages.forEach((pagePayments, pageIndex) => {
    const isLastPaymentPage = pageIndex === paymentPages.length - 1;

    pagesHtml += `
  <!-- Page ${pageNumber} -->
  <div class="page ${isLastPaymentPage ? "last-page" : ""}">
    ${generatePageHeader()}
    <div class="page-content">
      <div class="payments-received section">
        <table>
          ${generatePaymentsTableHeader()}
          <tbody>
            ${pagePayments
              .map(
                (payment) => `
            <tr>
              <td>${payment.paid_time}</td>
              <td>${payment.description}</td>
              <td>${payment.total_amount}</td>
            </tr>`
              )
              .join("")}
            ${
              isLastPaymentPage
                ? `
            <tr class="subtotal-row">
              <td></td>
              <td style="text-align: right;">${translations.tax}</td>
              <td>${total_tax}</td>
            </tr>
            <tr class="total-row">
              <td></td>
              <td class="label" style="text-align: right;">${translations.totalPaymentsReceived}</td>
              <td class="value">${monthly_account_balance.total_payments_received}</td>
            </tr>`
                : ""
            }
          </tbody>
        </table>
      </div>
    </div>
    ${generatePageFooter()}
  </div>`;

    pageNumber++;
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    /* Define exact page size and margins for 1:1 PDF mapping */
    /* @page is part of the CSS paged media / print layout specification */
    /* Keep @page for PDF generation, but simplify it */
    @page {
      size: ${PAGE_WIDTH}in ${PAGE_HEIGHT}in; /* Letter: 8.5in 11in */
      margin: 0; /* No margins - we control spacing in .page divs */
    }

    /* Ensure exact color reproduction in PDF */
    /* Keep color reproduction settings - these are critical */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* Remove fixed sizing from html/body - let pages flow naturally */
    html, body {
      margin: 0;
      padding: 0;
      background: #e0e0e0; /* Gray background to show page separation */
    }

    body {
      font-family: ${fontFamily};
      font-size: ${FONT_SIZE_PARAGRAPH}px;
      font-weight: ${FONT_WEIGHT_PARAGRAPH};
      color: ${TEXT_COLOR};
      line-height: 1.5;
      width: ${PAGE_WIDTH}in;
      min-height: ${PAGE_HEIGHT}in;
      padding: 0;
    }

    .page {
      width: ${PAGE_WIDTH}in;
      min-height: ${PAGE_HEIGHT}in;
      background: white;
      page-break-after: always;
      position: relative;
      padding: 0 ${LEFT_RIGHT_MARGIN}px;
    }

    .page-header {
      background: white;
      width: 100%;
      height: ${PAGE_HEADER_HEIGHT}px;
      font-size: ${FONT_SIZE_H1}px; /* CRITICAL: Base font size must be set */
      font-weight: ${FONT_WEIGHT_H1};
      color: ${TEXT_COLOR_H1};
      font-family: ${fontFamily};
    }

    .page-content {
      min-height: ${PAGE_CONTENT_HEIGHT}px;  /* 11in - 142px header - 28px footer */
    }

    .page-footer {
      height: ${PAGE_FOOTER_HEIGHT}px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header h1 {
      font-size: ${FONT_SIZE_H1}px;
      font-weight: ${FONT_WEIGHT_H1};
      color: ${TEXT_COLOR_H1};
      margin-top: ${MARGIN_TOP_HEADER}px;
    }

    .logo {
      width: ${LOGO_WIDTH}px;
      height: ${LOGO_HEIGHT}px;
      margin-top: ${MARGIN_TOP_LOGO}px;
    }

    .section {
      margin-top: ${MARGIN_TOP_SECTION}px;
      padding-bottom: ${PADDING_BOTTOM_SECTION}px;
      border-bottom: 1px solid ${DIVIDER_LINE_COLOR};
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .bill-to h3 {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR};
      line-height: 19px;
    }

    .bill-to p.subtitle {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_PARAGRAPH};
      color: ${TEXT_COLOR};
      line-height: 19px;
    }

    .bill-to p {
      font-size: ${FONT_SIZE_PARAGRAPH}px;
      color: ${TEXT_COLOR};
      line-height: 17px;
    }

    .details-summary-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: ${COLUMN_GAP}px; /* space between two columns */
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
      font-size: ${FONT_SIZE_PARAGRAPH}px;
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
      font-size: ${FONT_SIZE_H2}px;
      font-weight: ${FONT_WEIGHT_H2};
      color: ${TEXT_COLOR};
    }

    /* Page break handling */
    .page-break {
      page-break-before: always;
    }

    table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* Ensure table headers repeat on each page when table spans multiple pages */
    thead {
      display: table-header-group;
    }

    tbody {
      display: table-row-group;
    }

    /* Prevent table rows from being split across pages */
    tr {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Use box-shadow instead of background-color for cleaner PDF rendering */
    thead tr:not(.table-title) th {
      color: ${TABLE_HEADER_TEXT_COLOR};
      background-color: ${TABLE_HEADER_BG_COLOR};
      font-size: ${TABLE_HEADER_FONT_SIZE}px;
      font-weight: ${TABLE_HEADER_FONT_WEIGHT};
      text-align: left;
      height: ${TABLE_HEADER_HEIGHT}px;
      padding: 7px ${TABLE_CELL_PADDING_HORIZONTAL}px;
    }

    .table-title tr {
      background-color: white; /* ensure white background */
    }

    /* Remove border and padding from the table title row */
    .table-title th {
      text-align: left;        /* optional: align text */
      padding: 0;              /* remove padding */
      padding-bottom: ${MARGIN_TOP_TABLE}px;
    }

    .table-title h3 {
      font-size: ${FONT_SIZE_H3}px;
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR};
      margin: 0;           /* remove default margin of h2 */
      padding: 0;          /* remove default padding */
    }

    tbody tr {
      min-height: ${TBL_ROW_HEIGHT}px;
    }

    tbody tr:nth-child(odd) {
      background-color: white;
    }

    tbody tr:nth-child(even) {
      background-color: ${TABLE_EVEN_ROW_COLOR};
    }

    tbody tr:last-child:not(.total-row) {
      border-bottom: 1px solid ${TABLE_EVEN_ROW_COLOR} !important;
    }

    .last-page tbody tr:nth-last-child(3) {
      border-bottom: 1px solid ${DIVIDER_LINE_COLOR} !important;
    }

    td {
      padding: ${TABLE_CELL_PADDING_VERTICAL}px ${TABLE_CELL_PADDING_HORIZONTAL}px;
      color: ${TABLE_TEXT_COLOR};
      font-size: ${TABLE_DATA_FONT_SIZE}px;
      font-weight: ${TABLE_DATA_FONT_WEIGHT};
      vertical-align: top;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
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
      font-size: ${FONT_SIZE_TOTAL}px;
    }

    /* Print-specific adjustments */
    @media print {
      html, body {
        background: white; /* Remove gray background in print */
      }

      .page {
        box-shadow: none; /* Remove visual separators */
        height: ${PAGE_HEIGHT}in; /* Fixed height for each printed page */
        min-height: ${PAGE_HEIGHT}in;
        overflow: hidden; /* Prevent content overflow */
      }

      .page:last-child {
        page-break-after: auto;
      }

      /* Prevent breaks at margin-top of table sections */
      .activity-details,
      .payments-received {
        page-break-before: avoid;
        break-before: avoid;
      }

      /* Allow tables to break across pages but keep rows together */
      table {
        page-break-inside: auto;
      }

      /* Keep table title with its header */
      .table-title {
        page-break-after: avoid;
        break-after: avoid;
      }

      /* Keep subtotal and total rows together */
      .subtotal-row {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>
`;
}
