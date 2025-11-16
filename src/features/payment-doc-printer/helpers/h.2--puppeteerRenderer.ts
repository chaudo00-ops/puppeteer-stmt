import puppeteer from "puppeteer-core";
import puppeteerFull from "puppeteer";
import chromium from "@sparticuz/chromium";
import os from "os";
import { existsSync } from "fs";
import { PDFContext } from "./h.1--pdfContext";
import type { TSupportedLanguage } from "./h.0--translations";

/**
 * Get browser launch configuration based on platform
 */
async function getBrowserConfig() {
  const platform = os.platform();
  const isProduction = process.env.NODE_ENV === "production";
  const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME;

  // Use @sparticuz/chromium for Linux/production/Lambda
  if (platform === "linux" || isProduction || isLambda) {
    return {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
  }

  // For development (macOS/Windows), use puppeteer's bundled Chrome
  let execPath: string | undefined;
  try {
    execPath = puppeteerFull.executablePath();
  } catch (error) {
    // Fallback to system Chrome if bundled Chromium not found
    const executablePaths = {
      darwin: [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
      ],
      win32: [
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      ],
    };

    const paths =
      executablePaths[platform as keyof typeof executablePaths] || [];
    execPath = paths.find((p) => existsSync(p));
  }

  return {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
    ...(execPath && { executablePath: execPath }),
  };
}

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
    const browserConfig = await getBrowserConfig();
    const browser = await puppeteer.launch(browserConfig);

    try {
      const page = await browser.newPage();
      await page.setContent(this.html, { waitUntil: "networkidle0" });

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "20px",
          right: "40px",
          bottom: "20px",
          left: "40px",
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
