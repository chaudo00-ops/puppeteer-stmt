import type {
  InvoicePdfResult,
  TInvoiceDetails_Display,
} from "../helpers/h.0--types";
import { PuppeteerInvoiceRenderer } from "../helpers/h.2.2--puppeteerInvoiceRenderer";

export async function drawInvoicePdf(
  invoice_details: TInvoiceDetails_Display
): Promise<InvoicePdfResult> {
  const renderer = new PuppeteerInvoiceRenderer(
    invoice_details,
    "en",
    "Invoice - PAID"
  );
  const pdfBytes = await renderer.generate();

  return {
    pdf: pdfBytes,
    html: renderer.getHtml(),
  };
}
