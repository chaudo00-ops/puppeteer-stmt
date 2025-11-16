import { promises as fs } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { TBillingStatementDetails_Display } from "./h.0--types";
import { TBillingStatementTranslations } from "./h.0--translations";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generate HTML template for billing statement
 */
export async function generateHtmlTemplate(
	displayed_details: TBillingStatementDetails_Display,
	translations: TBillingStatementTranslations,
	language: "en" | "zh-CN" = "en",
): Promise<string> {
	// Load logo as base64
	const logoPath = join(__dirname, "..", "assets", "images", "gjw-logo-transparent.png");
	const logoBuffer = await fs.readFile(logoPath);
	const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

	const { account, paymentProfile, monthly_account_balance, monthly_campaign_spends, payments, total_tax } = displayed_details;

	// Determine font family based on language
	const fontFamily = language === "zh-CN"
		? `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif`
		: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`;

	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: ${fontFamily};
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      padding: 40px 60px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
    }

    .header h1 {
      font-size: 36px;
      font-weight: 400;
      color: #333;
    }

    .logo {
      width: 120px;
      height: auto;
    }

    .bill-to {
      margin-bottom: 40px;
    }

    .bill-to h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }

    .bill-to p {
      color: #555;
      margin: 4px 0;
    }

    .details-summary-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #e0e0e0;
    }

    .details h2, .summary h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .detail-row, .summary-row {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      color: #555;
    }

    .detail-row::after, .summary-row::after {
      content: '';
      flex: 1;
      border-bottom: 1px dotted #ccc;
      margin: 0 10px;
      align-self: flex-end;
      margin-bottom: 4px;
    }

    .detail-label, .summary-label {
      white-space: nowrap;
    }

    .detail-value, .summary-value {
      white-space: nowrap;
      font-weight: 500;
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

    @media print {
      body {
        padding: 20px 40px;
      }
    }
  </style>
</head>
<body>
  <!-- Page 1 -->
  <div class="header">
    <h1>${translations.documentTitle}</h1>
    <img src="${logoBase64}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="bill-to">
    <h2>${translations.billTo}</h2>
    <p>${paymentProfile.legal_name}</p>
    ${paymentProfile.type === "organization" ? `<p>${paymentProfile.org_name || ""}</p>` : ""}
    <p>${paymentProfile.address_country}, ${paymentProfile.address_postal_code}</p>
  </div>

  <div class="details-summary-container">
    <div class="details">
      <h2>${translations.details}</h2>
      <div class="detail-row">
        <span class="detail-label">${translations.accountId}</span>
        <span class="detail-value">${account.account_id}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${translations.paymentsProfile}</span>
        <span class="detail-value">${paymentProfile.pmt_prf_name}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${translations.paymentsProfileId}</span>
        <span class="detail-value">${paymentProfile.pmt_prf_id}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${translations.statementIssueDate}</span>
        <span class="detail-value">${monthly_account_balance.created_time}</span>
      </div>
    </div>

    <div class="summary">
      <h2>${translations.summaryFor} ${monthly_account_balance.billing_period_start} – ${monthly_account_balance.billing_period_end}</h2>
      <div class="summary-row">
        <span class="summary-label">${translations.openingBalance}</span>
        <span class="summary-value">${monthly_account_balance.opening_balance}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${translations.totalAdSpend}</span>
        <span class="summary-value">${monthly_account_balance.total_ad_spend}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${translations.totalPaymentsReceived}</span>
        <span class="summary-value">${monthly_account_balance.total_payments_received}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${translations.closingBalance}</span>
        <span class="summary-value">${monthly_account_balance.closing_balance}</span>
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
          <td style="text-align: right;">${translations.totalPaymentsReceived}</td>
          <td>${monthly_account_balance.total_payments_received}</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;
}
