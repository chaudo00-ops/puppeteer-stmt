import { type TSupportedLanguage } from "./h.0--translations";
import type { TInvoiceDetails_Display } from "./h.0--types";
import { PuppeteerRenderer } from "./h.2--puppeteerRenderer";
import { generateInvoiceHtmlTemplate } from "./h.5--generateInvoiceHtmlTemplate";

/**
 * Invoice-specific Puppeteer renderer
 */
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

	/** Initialize and generate HTML */
	async init(): Promise<void> {
		const html = await generateInvoiceHtmlTemplate(this.invoice_details, {
			language: this.language,
			title: this.title,
		});
		this.setHtml(html);
	}

	/** Generate the PDF */
	async generate(): Promise<Uint8Array> {
		await this.init();
		return await this.renderToPdf();
	}
}
