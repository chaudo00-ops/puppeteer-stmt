import puppeteer from "puppeteer";
import { promises as fs } from "fs";
import { join, dirname } from "path";
import { PDFContext } from "./h.1--pdfContext";
import { getTranslations, type TSupportedLanguage } from "./h.0--translations";
import {
  FONT_SIZE_H1,
  FONT_WEIGHT_H1,
  TEXT_COLOR_H1,
  MARGIN_TOP_HEADER,
  LOGO_WIDTH,
  LOGO_HEIGHT,
  MARGIN_TOP_LOGO,
  LEFT_RIGHT_MARGIN,
} from "./h.0--consts";
import { fileURLToPath } from "url";

/**
 * Base Puppeteer PDF renderer class
 */
export class PuppeteerRenderer<ContextType extends PDFContext> {
  protected context: ContextType;
  protected html: string = "";
  protected language: TSupportedLanguage;

  constructor(language: TSupportedLanguage) {
    this.language = language;
  }

  /**
   * Set the HTML content to render
   */
  setHtml(html: string): void {
    this.html = html;
  }

  /**
   * Get the context
   */
  getContext(): ContextType {
    return this.context;
  }

  /**
   * Render HTML to PDF
   */
  async renderToPdf(): Promise<Uint8Array> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    try {
      const page = await browser.newPage();
      await page.setContent(this.html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({
        format: "Letter",
        printBackground: true,
        footerTemplate: "<div></div>",
        margin: {
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
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

  /**
   * Save PDF as Uint8Array
   */
  async save(): Promise<Uint8Array> {
    return await this.renderToPdf();
  }
}
