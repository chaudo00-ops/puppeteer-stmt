import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync } from 'fs';

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
  campaigns: Array.from({ length: 5 }, (_, i) => ({
    description: `Campaign ${i}`,
    impressions: '98,765',
    amount: '-$123.45'
  })),
  payments: Array.from({ length: 5 }, () => ({
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
    ...Array.from({ length: 4 }, (_, i) => ({
      description: `廣告活動 ${i + 1}`,
      impressions: '98,765',
      amount: '-$123.45'
    }))
  ],
  payments: Array.from({ length: 5 }, () => ({
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

// Load and convert logo to base64
const logoPath = join(__dirname, 'src', 'assets', 'logo-transparent.png');
const logoBuffer = readFileSync(logoPath);
const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

// HTML template
const generateHTML = (data: BillingData, logoDataUrl: string, language: Language = 'en'): string => {
  const t = translations[language];
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', sans-serif;
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      padding: 40px 60px;
    }
    h1 { font-size: 36px; font-weight: 400; }
    h2 { font-size: 18px; font-weight: 600; margin-bottom: 12px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    thead { background-color: #2c4a6e; color: white; }
    th, td { padding: 12px 16px; text-align: left; }
  </style>
</head>
<body>
  <h1>${t.billingStatements}</h1>

  <h2>${t.billTo}</h2>
  <p>${data.billTo.name}</p>
  <p>${data.billTo.company}</p>
  <p>${data.billTo.address}</p>

  <h2>${t.details}</h2>
  <p>${t.accountId}: ${data.details.accountId}</p>
  <p>${t.paymentsProfile}: ${data.details.paymentsProfile}</p>

  <h2>${t.summaryFor} ${data.summary.period}</h2>
  <p>${t.openingBalance}: ${data.summary.openingBalance}</p>
  <p>${t.totalAdSpend}: ${data.summary.totalAdSpend}</p>
  <p>${t.closingBalance}: ${data.summary.closingBalance}</p>

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
      ${data.campaigns.map(campaign => `
        <tr>
          <td>${campaign.description}</td>
          <td>${campaign.impressions}</td>
          <td>${campaign.amount}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>

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
      ${data.payments.map(payment => `
        <tr>
          <td>${payment.date}</td>
          <td>${payment.description}</td>
          <td>${payment.amount}</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
`;
};

// Generate HTML files
function generateHTMLFiles(): void {
  // Generate English version
  const billingDataEn = getBillingData('en');
  const htmlEn = generateHTML(billingDataEn, logoBase64, 'en');
  const outputPathEn = join(__dirname, 'src', 'output-pdfs', 'test-billing-statement-en.html');
  writeFileSync(outputPathEn, htmlEn);
  console.log(`✓ English HTML generated: ${outputPathEn}`);

  // Generate Traditional Chinese version
  const billingDataZhTW = getBillingData('zh-TW');
  const htmlZh = generateHTML(billingDataZhTW, logoBase64, 'zh-TW');
  const outputPathZh = join(__dirname, 'src', 'output-pdfs', 'test-billing-statement-zh-TW.html');
  writeFileSync(outputPathZh, htmlZh);
  console.log(`✓ Traditional Chinese HTML generated: ${outputPathZh}`);

  console.log('\n✓ Both language versions have been generated successfully!');
  console.log('  You can open these HTML files in a browser to verify the translations.');
  console.log('  The Traditional Chinese version includes a long campaign name to test text wrapping.');
}

generateHTMLFiles();
