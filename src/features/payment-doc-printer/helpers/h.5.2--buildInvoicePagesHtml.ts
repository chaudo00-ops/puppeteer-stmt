import type { TInvoiceDetails_Display } from "./h.0--types";

export type InvoiceTemplateContext = {
	title: string;
	logoBase64: string;
	payment: TInvoiceDetails_Display["payment"];
	paymentProfile: TInvoiceDetails_Display["paymentProfile"];
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

export function buildInvoicePagesHtml(context: InvoiceTemplateContext): string {
	const { title, logoBase64, payment, paymentProfile } = context;

	return `
  <div class="page">
    <div class="header">
      <div class="header-title">${safeText(title)}</div>
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
          <span class="totals-label">Subtotal</span>
          <span>${safeText(payment.paid_amount)}</span>
        </div>
        <div class="totals-row">
          <span class="totals-label">Tax</span>
          <span>${safeText(payment.tax)}</span>
        </div>
        <div class="totals-row">
          <span class="totals-label">Total</span>
          <span>${safeText(payment.total_amount)}</span>
        </div>
        <div class="totals-row">
          <strong>Amount Paid</strong>
          <strong>${safeText(payment.total_amount)} USD</strong>
        </div>
      </div>
    </div>
  </div>
`;
}
