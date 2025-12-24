import { promises as fs } from "fs";
import path from "path";
import { type TSupportedLanguage } from "./h.0--translations";
import type { TInvoiceDetails_Display } from "./h.0--types";
import { PuppeteerRenderer } from "./h.2--puppeteerRenderer";

type InvoiceHtmlOptions = {
	title: string;
	language: TSupportedLanguage;
};

const FONT_FAMILY_MAP: Record<TSupportedLanguage, string> = {
	en: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
	"zh-CN": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif`,
	"zh-TW": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif`,
	vi: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
	ko: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif`,
	ja: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'Meiryo', sans-serif`,
	es: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
};

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function safeText(value: string | null | undefined): string {
	return escapeHtml(value ?? "");
}

async function generateInvoiceHtmlTemplate(
	details: TInvoiceDetails_Display,
	options: InvoiceHtmlOptions,
): Promise<string> {
	const { payment, paymentProfile } = details;

	const logoPath = path.join(__dirname, "..", "assets", "images", "gjw-logo-optimized.png");
	const logoBuffer = await fs.readFile(logoPath);
	const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

	const fontFamily = FONT_FAMILY_MAP[options.language];

	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
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
      color: #0F0F0F;
      background: #ffffff;
    }
    .page {
      width: 8.5in;
      min-height: 11in;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 20px;
    }
    .header-title {
      font-size: 32px;
      font-weight: 500;
      color: #000000;
    }
    .logo {
      width: 132px;
      height: auto;
    }
    .section {
      margin-top: 28px;
    }
    .section h3 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 160px 1fr;
      row-gap: 8px;
      column-gap: 12px;
      font-size: 14px;
      line-height: 1.5;
    }
    .info-label {
      font-weight: 700;
    }
    .two-column {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 40px;
      font-size: 14px;
      line-height: 1.5;
    }
    .payee p,
    .payer p {
      margin-bottom: 4px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 12px;
      font-size: 12px;
      color: #2B2B2B;
    }
    thead th {
      background: #16355A;
      color: #FFFFFF;
      font-weight: 700;
      text-align: left;
      padding: 10px 12px;
    }
    tbody td {
      padding: 12px;
      border: 1px solid #DCDCDC;
    }
    tbody tr:nth-child(odd) {
      background: #F1F6FC;
    }
    .text-right {
      text-align: right;
    }
    .totals {
      margin-top: 16px;
      max-width: 320px;
      margin-left: auto;
      font-size: 14px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
    }
    .totals-row strong {
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="header-title">${safeText(options.title)}</div>
      <img class="logo" src="${logoBase64}" alt="Gan Jing World" />
    </div>

    <div class="section">
      <div class="info-grid">
        <div class="info-label">Invoice number</div>
        <div>${safeText(payment.payment_id)}</div>
        <div class="info-label">Date of issue</div>
        <div>${safeText(payment.paid_time)}</div>
        <div class="info-label">Date of paid</div>
        <div>${safeText(payment.paid_time)}</div>
      </div>
    </div>

    <div class="section two-column">
      <div class="payee">
        <h3>Gan Jing World</h3>
        <p>33 Fulton Street</p>
        <p>Middletown, New York 10940</p>
        <p>United States</p>
        <p>+1 833-849-0818</p>
        <p>help@ganjingworld.com</p>
      </div>
      <div class="payer">
        <h3>Bill To</h3>
        <p>${safeText(paymentProfile.payee_display_name)}</p>
        <p>${safeText(paymentProfile.email)}</p>
        <p>${safeText(paymentProfile.address_postal_code)}</p>
        <p>${safeText(paymentProfile.address_country)}</p>
      </div>
    </div>

    <div class="section">
      <table>
        <colgroup>
          <col style="width: 60%">
          <col style="width: 20%">
          <col style="width: 20%">
        </colgroup>
        <thead>
          <tr>
            <th>Description</th>
            <th class="text-right">Tax</th>
            <th class="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${safeText(payment.sub_acc_id)}</td>
            <td class="text-right">${safeText(payment.tax)}</td>
            <td class="text-right">${safeText(payment.paid_amount)}</td>
          </tr>
        </tbody>
      </table>

      <div class="totals">
        <div class="totals-row">
          <span>Subtotal</span>
          <span>${safeText(payment.paid_amount)}</span>
        </div>
        <div class="totals-row">
          <span>Tax</span>
          <span>${safeText(payment.tax)}</span>
        </div>
        <div class="totals-row">
          <span>Total</span>
          <span>${safeText(payment.total_amount)}</span>
        </div>
        <div class="totals-row">
          <strong>Amount Paid</strong>
          <strong>${safeText(payment.total_amount)} USD</strong>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`;
}

export class PuppeteerInvoiceRenderer extends PuppeteerRenderer {
	protected invoice_details: TInvoiceDetails_Display;
	protected title: string;

	constructor(
		invoice_details: TInvoiceDetails_Display,
		language: TSupportedLanguage = "en",
		title: string = "Invoice - PAID",
	) {
		super(language);
		this.invoice_details = invoice_details;
		this.title = title;
	}

	async init(): Promise<void> {
		const html = await generateInvoiceHtmlTemplate(this.invoice_details, {
			language: this.language,
			title: this.title,
		});
		this.setHtml(html);
	}

	async generate(): Promise<Uint8Array> {
		await this.init();
		return await this.renderToPdf();
	}
}
