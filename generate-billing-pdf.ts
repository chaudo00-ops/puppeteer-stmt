import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Type definitions
type Language = 'en' | 'zh-TW';

interface Translations {
  billingStatements: string;
  billTo: string;
  details: string;
  accountId: string;
  paymentsProfile: string;
  paymentsProfileId: string;
  statementIssueDate: string;
  summary: string;
  summaryFor: string;
  openingBalance: string;
  totalAdSpend: string;
  totalPaymentsReceived: string;
  closingBalance: string;
  activityDetails: string;
  description: string;
  impressions: string;
  amount: string;
  subtotal: string;
  total: string;
  paymentsReceived: string;
  date: string;
  tax: string;
}

interface BillTo {
  name: string;
  company: string;
  address: string;
}

interface Details {
  accountId: string;
  paymentsProfile: string;
  paymentsProfileId: string;
  statementIssueDate: string;
}

interface Summary {
  period: string;
  openingBalance: string;
  totalAdSpend: string;
  totalPaymentsReceived: string;
  closingBalance: string;
}

interface Campaign {
  description: string;
  impressions: string;
  amount: string;
}

interface Payment {
  date: string;
  description: string;
  amount: string;
}

interface Totals {
  subtotal: string;
  total: string;
  tax: string;
  totalPaymentsReceived: string;
}

interface BillingData {
  billTo: BillTo;
  details: Details;
  summary: Summary;
  campaigns: Campaign[];
  payments: Payment[];
  totals: Totals;
}

// Billing data (English version)
const billingDataEn: BillingData = {
  billTo: {
    name: 'Annie Y',
    company: 'Shen Yun New York',
    address: 'US, 10940'
  },
  details: {
    accountId: '111222333',
    paymentsProfile: 'Shen Yun New York',
    paymentsProfileId: '444-555-6666',
    statementIssueDate: 'May 25, 2025'
  },
  summary: {
    period: 'Sep. 1, 2025 – Sep. 30, 2025',
    openingBalance: '$10,000',
    totalAdSpend: '-$1,300',
    totalPaymentsReceived: '$1,657.26',
    closingBalance: '$8,900'
  },
  campaigns: Array.from({ length: 91 }, (_, i) => ({
    description: `Campaign ${i}`,
    impressions: '98,765',
    amount: '-$123.45'
  })),
  payments: Array.from({ length: 99 }, () => ({
    date: '2025-11-15, 16:07 (UTC-05:00)',
    description: 'Mastercard ***8888',
    amount: '$300'
  })),
  totals: {
    subtotal: '-$8,247.50',
    total: '-$8,247.50',
    tax: '-$148.50',
    totalPaymentsReceived: '$1,657.26'
  }
};

// Billing data (Traditional Chinese version)
const billingDataZhTW: BillingData = {
  billTo: {
    name: '楊安妮',
    company: '神韻紐約',
    address: '美國, 10940'
  },
  details: {
    accountId: '111222333',
    paymentsProfile: '神韻紐約',
    paymentsProfileId: '444-555-6666',
    statementIssueDate: '2025年5月25日'
  },
  summary: {
    period: '2025年9月1日 – 2025年9月30日',
    openingBalance: '$10,000',
    totalAdSpend: '-$1,300',
    totalPaymentsReceived: '$1,657.26',
    closingBalance: '$8,900'
  },
  campaigns: [
    // Add one long campaign name to test overflow
    {
      description: '春季大型促銷活動：全球華人新年慶典特別推廣計劃，包含線上線下整合行銷方案',
      impressions: '98,765',
      amount: '-$123.45'
    },
    ...Array.from({ length: 90 }, (_, i) => ({
      description: `廣告活動 ${i + 1}`,
      impressions: '98,765',
      amount: '-$123.45'
    }))
  ],
  payments: Array.from({ length: 99 }, () => ({
    date: '2025-11-15, 16:07 (UTC-05:00)',
    description: '萬事達卡 ***8888',
    amount: '$300'
  })),
  totals: {
    subtotal: '-$8,247.50',
    total: '-$8,247.50',
    tax: '-$148.50',
    totalPaymentsReceived: '$1,657.26'
  }
};

// Function to get billing data based on language
function getBillingData(language: Language): BillingData {
  return language === 'zh-TW' ? billingDataZhTW : billingDataEn;
}

// Load and convert logo to base64
const logoPath = join(__dirname, 'src', 'assets', 'logo-transparent.png');
const logoBuffer = readFileSync(logoPath);
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

// Translations
const translations: Record<Language, Translations> = {
  en: {
    billingStatements: 'Billing Statements',
    billTo: 'Bill To',
    details: 'Details',
    accountId: 'Account ID',
    paymentsProfile: 'Payments profile',
    paymentsProfileId: 'Payments profile ID',
    statementIssueDate: 'Statement issue date',
    summary: 'Summary',
    summaryFor: 'Summary for',
    openingBalance: 'Opening balance',
    totalAdSpend: 'Total ad spend',
    totalPaymentsReceived: 'Total payments received',
    closingBalance: 'Closing balance',
    activityDetails: 'Activity Details',
    description: 'Description',
    impressions: 'Impressions',
    amount: 'Amount',
    subtotal: 'Subtotal',
    total: 'Total',
    paymentsReceived: 'Payments Received',
    date: 'Date',
    tax: 'Tax'
  },
  'zh-TW': {
    billingStatements: '帳單報表',
    billTo: '帳單收件人',
    details: '詳細資訊',
    accountId: '帳戶 ID',
    paymentsProfile: '付款資料',
    paymentsProfileId: '付款資料 ID',
    statementIssueDate: '對帳單發出日期',
    summary: '摘要',
    summaryFor: '摘要',
    openingBalance: '期初餘額',
    totalAdSpend: '廣告總支出',
    totalPaymentsReceived: '總收款金額',
    closingBalance: '期末餘額',
    activityDetails: '活動詳情',
    description: '說明',
    impressions: '曝光次數',
    amount: '金額',
    subtotal: '小計',
    total: '總計',
    paymentsReceived: '已收款項',
    date: '日期',
    tax: '稅金'
  }
};

// HTML template
const generateHTML = (data: BillingData, logoDataUrl: string, language: Language = 'en'): string => {
  const t = translations[language];
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', sans-serif;
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
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="bill-to">
    <h2>${t.billTo}</h2>
    <p>${data.billTo.name}</p>
    <p>${data.billTo.company}</p>
    <p>${data.billTo.address}</p>
  </div>

  <div class="details-summary-container">
    <div class="details">
      <h2>${t.details}</h2>
      <div class="detail-row">
        <span class="detail-label">${t.accountId}</span>
        <span class="detail-value">${data.details.accountId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${t.paymentsProfile}</span>
        <span class="detail-value">${data.details.paymentsProfile}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${t.paymentsProfileId}</span>
        <span class="detail-value">${data.details.paymentsProfileId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${t.statementIssueDate}</span>
        <span class="detail-value">${data.details.statementIssueDate}</span>
      </div>
    </div>

    <div class="summary">
      <h2>${t.summaryFor} ${data.summary.period}</h2>
      <div class="summary-row">
        <span class="summary-label">${t.openingBalance}</span>
        <span class="summary-value">${data.summary.openingBalance}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${t.totalAdSpend}</span>
        <span class="summary-value">${data.summary.totalAdSpend}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${t.totalPaymentsReceived}</span>
        <span class="summary-value">${data.summary.totalPaymentsReceived}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${t.closingBalance}</span>
        <span class="summary-value">${data.summary.closingBalance}</span>
      </div>
    </div>
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns.slice(0, 12).map(campaign => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 2 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns.slice(12, 32).map(campaign => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 3 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns.slice(32, 52).map(campaign => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 4 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns.slice(52, 72).map(campaign => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 5 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns.slice(72).map(campaign => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `).join('')}
        <tr class="subtotal-row">
          <td></td>
          <td style="text-align: right;">${t.subtotal} :</td>
          <td>${data.totals.subtotal}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">${t.total} :</td>
          <td>${data.totals.total}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Page 6 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments.slice(0, 20).map(payment => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 7 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments.slice(20, 40).map(payment => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 8 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments.slice(40, 60).map(payment => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 9 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments.slice(60, 80).map(payment => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>

  <!-- Page 10 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments.slice(80).map(payment => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `).join('')}
        <tr class="subtotal-row">
          <td></td>
          <td style="text-align: right;">${t.tax} :</td>
          <td>${data.totals.tax}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">${t.totalPaymentsReceived}</td>
          <td>${data.totals.totalPaymentsReceived}</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;
};

async function generatePDF(language: Language = 'en'): Promise<void> {
  console.log(`Launching browser for ${language === 'en' ? 'English' : 'Traditional Chinese'} PDF...`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('Setting content...');
  const billingData = getBillingData(language);
  const html = generateHTML(billingData, logoBase64, language);
  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  const langSuffix = language === 'en' ? 'en' : 'zh-TW';
  const outputPath = join(__dirname, 'src', 'output-pdfs', `generated-billing-statement-${langSuffix}.pdf`);

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '40px',
      bottom: '20px',
      left: '40px'
    }
  });

  await browser.close();

  console.log(`PDF generated successfully: ${outputPath}`);
}

// Main execution
async function main(): Promise<void> {
  // Generate English version
  await generatePDF('en');

  // Generate Traditional Chinese version
  await generatePDF('zh-TW');
}

main().catch(console.error);
