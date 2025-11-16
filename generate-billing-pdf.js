import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Billing data
const billingData = {
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

// HTML template
const generateHTML = (data) => `
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
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
      height: 120px;
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <!-- Globe outline -->
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <!-- Latitude lines -->
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <!-- Longitude lines -->
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <!-- Text -->
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="bill-to">
    <h2>Bill To</h2>
    <p>${data.billTo.name}</p>
    <p>${data.billTo.company}</p>
    <p>${data.billTo.address}</p>
  </div>

  <div class="details-summary-container">
    <div class="details">
      <h2>Details</h2>
      <div class="detail-row">
        <span class="detail-label">Account ID</span>
        <span class="detail-value">${data.details.accountId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payments profile</span>
        <span class="detail-value">${data.details.paymentsProfile}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payments profile ID</span>
        <span class="detail-value">${data.details.paymentsProfileId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Statement issue date</span>
        <span class="detail-value">${data.details.statementIssueDate}</span>
      </div>
    </div>

    <div class="summary">
      <h2>Summary for ${data.summary.period}</h2>
      <div class="summary-row">
        <span class="summary-label">Opening balance</span>
        <span class="summary-value">${data.summary.openingBalance}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Total ad spend</span>
        <span class="summary-value">${data.summary.totalAdSpend}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Total payments received</span>
        <span class="summary-value">${data.summary.totalPaymentsReceived}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Closing balance</span>
        <span class="summary-value">${data.summary.closingBalance}</span>
      </div>
    </div>
  </div>

  <div class="activity-details">
    <h2>Activity Details</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Impressions</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="activity-details">
    <h2>Activity Details</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Impressions</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="activity-details">
    <h2>Activity Details</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Impressions</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="activity-details">
    <h2>Activity Details</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Impressions</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="activity-details">
    <h2>Activity Details</h2>
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Impressions</th>
          <th>Amount</th>
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
          <td style="text-align: right;">Subtotal :</td>
          <td>${data.totals.subtotal}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">Total :</td>
          <td>${data.totals.total}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Page 6 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="payments-received">
    <h2>Payments Received</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="payments-received">
    <h2>Payments Received</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="payments-received">
    <h2>Payments Received</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="payments-received">
    <h2>Payments Received</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
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
    <h1>Billing Statements</h1>
    <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="60" fill="none" stroke="#4a90e2" stroke-width="2"/>
      <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="60" ry="40" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="20" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <ellipse cx="100" cy="100" rx="40" ry="60" fill="none" stroke="#4a90e2" stroke-width="1"/>
      <text x="100" y="150" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#ff8c00" text-anchor="middle">GAMING WORLD</text>
    </svg>
  </div>

  <div class="payments-received">
    <h2>Payments Received</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
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
          <td style="text-align: right;">Tax :</td>
          <td>${data.totals.tax}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">Total payments received</td>
          <td>${data.totals.totalPaymentsReceived}</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;

async function generatePDF() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log('Setting content...');
  const html = generateHTML(billingData);
  await page.setContent(html, { waitUntil: 'networkidle0' });

  console.log('Generating PDF...');
  const outputPath = join(__dirname, 'src', 'output-pdfs', 'generated-billing-statement.pdf');

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

generatePDF().catch(console.error);
