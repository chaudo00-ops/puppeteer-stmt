export function buildInvoiceStyles(fontFamily: string): string {
	return `
  <style>
    @page { size: 8.5in 11in; margin: 0; }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    body {
      font-family: ${fontFamily};
      color: #2b2b2b;
      background: #ffffff;
      font-size: 12px;
      line-height: 1.45;
    }
    .page {
      width: 8.5in;
      min-height: 11in;
      padding: 36px 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 8px;
    }
    .header-title {
      font-size: 24px;
      font-weight: 500;
      color: #111111;
    }
    .logo {
      width: 132px;
      height: auto;
    }
    .section {
      margin-top: 18px;
    }
    .section h3 {
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 6px;
      color: #111111;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 120px 1fr;
      row-gap: 4px;
      column-gap: 10px;
      font-size: 12px;
      line-height: 1.4;
    }
    .info-label {
      font-weight: 700;
    }
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 36px;
      font-size: 12px;
      line-height: 1.4;
    }
    .payee p,
    .payer p {
      margin-bottom: 2px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 12px;
      color: #2B2B2B;
    }
    thead th {
      background: #16355A;
      color: #FFFFFF;
      font-weight: 700;
      text-align: left;
      padding: 6px 10px;
      border: 1px solid #16355A;
    }
    tbody td {
      padding: 6px 10px;
      border: 1px solid #dcdcdc;
      vertical-align: middle;
    }
    tbody tr:nth-child(odd) {
      background: #F1F6FC;
    }
    .text-right {
      text-align: right;
    }
    .totals {
      margin-top: 10px;
      max-width: 240px;
      margin-left: auto;
      font-size: 12px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
    }
    .totals-row strong {
      font-weight: 600;
    }
    .totals-label {
      color: #555555;
    }
  </style>
`;
}
