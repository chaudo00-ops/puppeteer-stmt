# Billing Statement PDF Generation

This project provides two methods to generate billing statement PDFs identical to your sample.

## Method 1: Automated Puppeteer Script (Recommended)

### Setup

```bash
# Install Puppeteer
npm install puppeteer

# Run the generator
npm run generate-pdf
```

### What it does

The `generate-billing-pdf.js` script:
- Generates a complete HTML template with all styling
- Creates 91 campaigns (Campaign 0 through Campaign 90)
- Creates 99 payment records
- Automatically splits content across 10 pages
- Outputs PDF to: `src/output-pdfs/generated-billing-statement.pdf`

### Customizing the data

Edit the `billingData` object in `generate-billing-pdf.js`:

```javascript
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
  // ... campaigns and payments arrays
};
```

## Method 2: Browser Print to PDF

### Setup

1. Open `billing-statement-template.html` in your web browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac) to print
3. Select "Save as PDF" as the destination
4. Configure print settings:
   - Paper size: A4
   - Margins: Default
   - Background graphics: Enabled
5. Save the PDF

### Advantages

- No dependencies required
- Works in any modern browser
- Easy to preview before saving
- Can quickly edit data in the HTML/JavaScript

### Customizing the data

Edit the JavaScript at the bottom of `billing-statement-template.html`:

```javascript
// Modify the number of campaigns
for (let i = 0; i <= 90; i++) { // Change 90 to your desired count
  campaigns.push({
    description: `Campaign ${i}`,
    impressions: '98,765',
    amount: '-$123.45'
  });
}

// Modify the number of payments
for (let i = 0; i < 99; i++) { // Change 99 to your desired count
  payments.push({
    date: '2025-11-15, 16:07 (UTC-05:00)',
    description: 'Mastercard ***8888',
    amount: '$300'
  });
}
```

## PDF Structure

Both methods generate a 10-page PDF with:

### Page 1
- Header with "Billing Statements" title and Gaming World logo
- Bill To section (name, company, address)
- Details section (Account ID, Payment profile, etc.)
- Summary section (Opening balance, Total ad spend, etc.)
- Activity Details table with first 12 campaigns

### Pages 2-5
- Continued Activity Details tables with 20 campaigns each
- Page 5 ends with Subtotal and Total rows

### Pages 6-10
- Payments Received tables with 20 payment records each
- Page 10 ends with Tax and Total payments received rows

## Styling Features

- Professional layout with navy blue table headers
- Alternating row colors (white and light gray)
- Dotted leader lines in Details/Summary sections
- SVG logo for "Gaming World"
- Proper page breaks for printing
- Responsive design for different page sizes

## Troubleshooting

### Puppeteer installation fails

If Puppeteer fails to install due to network issues:
1. Use Method 2 (Browser Print to PDF) instead
2. Or try: `PUPPETEER_SKIP_DOWNLOAD=true npm install puppeteer`
3. Then manually install Chrome/Chromium

### PDF doesn't match exactly

Check these settings:
- Paper size should be A4
- Background graphics must be enabled
- Margins should be consistent
- Font rendering may vary by system

## File Locations

- Puppeteer script: `generate-billing-pdf.js`
- HTML template: `billing-statement-template.html`
- Output directory: `src/output-pdfs/`
- Original sample: `src/output-pdfs/billing-stmt-91|99|Shen Yun New York|false|organization-2025-11.pdf`
