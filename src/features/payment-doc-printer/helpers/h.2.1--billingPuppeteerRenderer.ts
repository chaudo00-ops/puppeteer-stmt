import type { TBillingStatementDetails_Display } from "./h.0--types";
import { getTranslations, type TSupportedLanguage } from "./h.0--translations";
import { BillingPDFContext } from "./h.1.1--billingPdfContext";
import { PuppeteerRenderer } from "./h.2--puppeteerRenderer";
import { generateHtmlTemplate } from "./h.5--generateHtmlTemplate";

/**
 * Billing-specific Puppeteer renderer
 */
export class BillingPuppeteerRenderer extends PuppeteerRenderer<BillingPDFContext> {
  protected statement_details: TBillingStatementDetails_Display;

  constructor(
    statement_details: TBillingStatementDetails_Display,
    language: TSupportedLanguage = "en"
  ) {
    super(language);
    this.statement_details = statement_details;
    this.context = new BillingPDFContext();
  }

  /**
   * Initialize and generate HTML
   */
  async init(): Promise<void> {
    const translations = getTranslations(this.language);
    const html = await generateHtmlTemplate(
      this.statement_details,
      translations,
      this.language
    );
    this.setHtml(html);
  }

  /**
   * Generate the PDF
   */
  async generate(): Promise<Uint8Array> {
    await this.init();
    return await this.save();
  }

  /**
   * Get the generated HTML
   */
  getHtml(): string {
    return this.html;
  }
}
