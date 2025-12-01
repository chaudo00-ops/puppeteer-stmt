import type { TBillingStatementDetails_Display } from "../helpers/h.0--types";
import type { TSupportedLanguage } from "../helpers/h.0--translations";
import { PuppeteerBillingRenderer } from "../helpers/h.2.1--puppeteerBillingRenderer";

export async function drawPuppeteerStatementPdf(
  displayed_details: TBillingStatementDetails_Display,
  language: TSupportedLanguage = "en"
) {
  // Use Puppeteer renderer instead of pdf-lib
  const renderer = new PuppeteerBillingRenderer(displayed_details, language);
  const pdfBytes = await renderer.generate();

  // Return PDF bytes, HTML, and context
  return {
    pdf: pdfBytes,
    html: renderer.getHtml(),
    context: renderer.getContext(),
  };
}
