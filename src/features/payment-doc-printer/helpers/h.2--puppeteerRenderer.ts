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
    const translations = getTranslations(this.language);

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    // Determine font family based on language
    const fontFamilyMap: Record<TSupportedLanguage, string> = {
      en: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
      "zh-CN": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif`,
      "zh-TW": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif`,
      vi: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
      ko: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif`,
      ja: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'Meiryo', sans-serif`,
      es: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    };

    const fontFamily = fontFamilyMap[this.language];

    try {
      const page = await browser.newPage();
      await page.setContent(this.html, { waitUntil: "networkidle0" });

      const logoPath = join(
        __dirname,
        "..",
        "assets",
        "images",
        "gjw-logo-transparent.png"
      );
      const logoBuffer = await fs.readFile(logoPath);
      const logoBase64 = `data:image/png;base64,${logoBuffer.toString(
        "base64"
      )}`;

      const pdfBuffer = await page.pdf({
        format: "Letter",
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: `
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            .header-wrapper {
              width: 100%;
              font-size: ${FONT_SIZE_H1}; /* CRITICAL: Base font size must be set */
              font-weight: ${FONT_WEIGHT_H1};
              color: ${TEXT_COLOR_H1};
              font-family: ${fontFamily};
              padding: 0 ${LEFT_RIGHT_MARGIN};
            }
            
            .header {
              display: flex;
              justify-content: space-between;
              align-items: flex-start;
            }
          
            .header h1 {
              font-size: ${FONT_SIZE_H1};
              font-weight: ${FONT_WEIGHT_H1};
              color: ${TEXT_COLOR_H1};
              margin-top: ${MARGIN_TOP_HEADER};
            }
          
            .logo {
              width: ${LOGO_WIDTH};
              height: ${LOGO_HEIGHT};
              margin-top: ${MARGIN_TOP_LOGO};
            }
          </style>
          <div class="header-wrapper">
            <div class="header">
              <h1>${translations.documentTitle}</h1>
              <img src="${logoBase64}" alt="Ganjing World Logo" class="logo" />
            </div>
          </div>
        `,
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
