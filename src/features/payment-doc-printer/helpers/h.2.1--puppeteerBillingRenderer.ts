import { getTranslations, type TSupportedLanguage } from "./h.0--translations";
import type { TBillingStatementDetails_Display } from "./h.0--types";
import { PuppeteerRenderer } from "./h.2--puppeteerRenderer";
import { generateHtmlTemplate } from "./h.5--generateHtmlTemplate";

/**
 * Billing-specific Puppeteer renderer
 */
export class PuppeteerBillingRenderer extends PuppeteerRenderer {
	protected statement_details: TBillingStatementDetails_Display;
	protected includeSummaryFootnotes: boolean;

	constructor(
		statement_details: TBillingStatementDetails_Display,
		language: TSupportedLanguage = "en",
		includeSummaryFootnotes: boolean = false,
	) {
		super(language);
		this.statement_details = statement_details;
		this.includeSummaryFootnotes = includeSummaryFootnotes;
	}

	/** Initialize and generate HTML */
	async init(): Promise<void> {
		const translations = getTranslations(this.language);
		const html = await generateHtmlTemplate(
			this.statement_details,
			translations,
			this.language,
			this.includeSummaryFootnotes,
		);
		this.setHtml(html);
	}

	/** Generate the PDF */
	async generate(): Promise<Uint8Array> {
		await this.init();
		return await this.renderToPdf();
	}
}
