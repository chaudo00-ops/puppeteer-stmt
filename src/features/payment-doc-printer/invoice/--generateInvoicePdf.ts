import { formatInvoiceDisplay } from "../helpers/h.4--formatDocumentsDisplay";
import { collectInvoiceDetails } from "./1--collectInvoiceDetails";
import { drawInvoicePdf } from "./2--drawInvoicePdf";
import { saveInvoice } from "./3--saveInvoice";

type TCreateInvoicePdfParams = Pick<
  TFields_v2_payments,
  "payment_id" | "sub_acc_id"
>;

export async function generateInvoicePdf(params: TCreateInvoicePdfParams) {
  // Step 1.
  const invoice_details = await collectInvoiceDetails();
  const display_details = formatInvoiceDisplay(invoice_details);

  // Step 2.
  const { pdf, html } = await drawInvoicePdf(display_details);

  // Step 3.
  const invoice_uri = await saveInvoice(params, pdf, html);

  return { pdf, html, invoice_uri };
}
