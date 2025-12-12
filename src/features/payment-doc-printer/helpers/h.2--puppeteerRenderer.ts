import puppeteer from "puppeteer";
import { type TSupportedLanguage } from "./h.0--translations";

/**
 * Base Puppeteer PDF renderer class
 */
export class PuppeteerRenderer {
	protected html: string = "";
	protected language: TSupportedLanguage;

	constructor(language: TSupportedLanguage) {
		this.language = language;
	}

	/** Set the HTML content to render */
	setHtml(html: string): void {
		this.html = html;
	}

	/** Get the generated HTML */
	getHtml(): string {
		return this.html;
	}

	/** Render HTML to PDF and save PDF as Uint8Array */
	async renderToPdf(): Promise<Uint8Array> {
		const browser = await puppeteer.launch({
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		});
		try {
			const page = await browser.newPage();
			// `networkidle0` means: wait until there are 0 network connections for at least 500ms
			await page.setContent(this.html, { waitUntil: "networkidle0" });

			const pdfBuffer = await page.pdf({
				format: "Letter",
				printBackground: true,
				margin: { top: "0px", right: "0px", bottom: "0px", left: "0px" },
				tagged: false,
				outline: false,
				scale: 1.0,
				preferCSSPageSize: true,
			});

			return new Uint8Array(pdfBuffer);
		} finally {
			await browser.close();
		}
	}
}
