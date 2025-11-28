import { puppeteerBillingStatementPdf } from "./--puppeteerBillingStatementPdf";
import puppeteer from "puppeteer";
import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import type { TSupportedLanguage } from "../helpers/h.0--translations";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe("puppeteerBillingStatementPdf", () => {
  const SCREENSHOTS_DIR = join(
    __dirname,
    "__screenshots__",
    "billing-statement"
  );
  const SCREENSHOT_WIDTH = 816; // Letter width at 96 DPI
  const SCREENSHOT_HEIGHT = 1056; // Letter height at 96 DPI
  const PIXEL_DIFF_THRESHOLD = 0.01; // 1% pixel difference threshold

  type TestCase = {
    name: string;
    params: {
      sub_acc_id: string;
      month: Date;
      language: TSupportedLanguage;
    };
  };

  const testCases: TestCase[] = [
    {
      name: "en",
      params: {
        sub_acc_id: "68|95|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      },
    },
    {
      name: "zh-TW",
      params: {
        sub_acc_id: "87|99|神韻紐約|false|organization",
        month: new Date("2025-11-01"),
        language: "zh-TW",
      },
    },
    {
      name: "zh-CN",
      params: {
        sub_acc_id: "91|99|神韵纽约|false|organization",
        month: new Date("2025-11-01"),
        language: "zh-CN",
      },
    },
    {
      name: "vi",
      params: {
        sub_acc_id: "91|99|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "vi",
      },
    },
    {
      name: "ko",
      params: {
        sub_acc_id: "91|99|선윤 뉴욕|false|organization",
        month: new Date("2025-11-01"),
        language: "ko",
      },
    },
    {
      name: "ja",
      params: {
        sub_acc_id: "87|99|神韻ニューヨーク|false|organization",
        month: new Date("2025-11-01"),
        language: "ja",
      },
    },
    {
      name: "es",
      params: {
        sub_acc_id: "91|99|Shen Yun Nueva York|false|organization",
        month: new Date("2025-11-01"),
        language: "es",
      },
    },
  ];

  beforeAll(async () => {
    // Ensure screenshots directory exists
    if (!existsSync(SCREENSHOTS_DIR)) {
      await mkdir(SCREENSHOTS_DIR, { recursive: true });
    }
  });

  /**
   * Capture screenshot of HTML content
   */
  async function captureHtmlScreenshot(
    html: string,
    screenshotPath: string
  ): Promise<void> {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        deviceScaleFactor: 1,
      });

      await page.setContent(html, { waitUntil: "networkidle0" });

      // Ensure the directory exists
      const screenshotDir = dirname(screenshotPath);
      if (!existsSync(screenshotDir)) {
        await mkdir(screenshotDir, { recursive: true });
      }

      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
        type: "png",
      });
    } finally {
      await browser.close();
    }
  }

  /**
   * Compare two images and return the difference percentage
   */
  async function compareImages(
    image1Path: string,
    image2Path: string
  ): Promise<{ match: boolean; diffPercentage: number }> {
    try {
      const img1Buffer = await readFile(image1Path);
      const img2Buffer = await readFile(image2Path);

      const img1 = sharp(img1Buffer);
      const img2 = sharp(img2Buffer);

      const [meta1, meta2] = await Promise.all([
        img1.metadata(),
        img2.metadata(),
      ]);

      // If dimensions don't match, images are different
      if (
        meta1.width !== meta2.width ||
        meta1.height !== meta2.height
      ) {
        return { match: false, diffPercentage: 100 };
      }

      const [data1, data2] = await Promise.all([
        img1.raw().toBuffer(),
        img2.raw().toBuffer(),
      ]);

      // Compare pixel by pixel
      let differentPixels = 0;
      const totalPixels = data1.length / (meta1.channels || 3);

      for (let i = 0; i < data1.length; i++) {
        if (data1[i] !== data2[i]) {
          differentPixels++;
        }
      }

      const diffPercentage = differentPixels / (totalPixels * (meta1.channels || 3));
      const match = diffPercentage <= PIXEL_DIFF_THRESHOLD;

      return { match, diffPercentage };
    } catch (error) {
      console.error("Error comparing images:", error);
      return { match: false, diffPercentage: 100 };
    }
  }

  describe.each(testCases)("$name language", ({ name, params }) => {
    it(`should generate correct HTML for ${name}`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf(params);

      // Verify the result structure
      expect(result).toHaveProperty("pdf");
      expect(result).toHaveProperty("html");
      expect(result).toHaveProperty("statement_uri");

      // Verify PDF is generated
      expect(result.pdf).toBeInstanceOf(Uint8Array);
      expect(result.pdf.length).toBeGreaterThan(0);

      // Verify HTML is generated
      expect(result.html).toBeTruthy();
      expect(typeof result.html).toBe("string");
      expect(result.html.length).toBeGreaterThan(0);

      // Define screenshot paths
      const baselineScreenshotPath = join(
        SCREENSHOTS_DIR,
        `baseline-${name}.png`
      );
      const currentScreenshotPath = join(
        SCREENSHOTS_DIR,
        `current-${name}.png`
      );
      const diffScreenshotPath = join(SCREENSHOTS_DIR, `diff-${name}.png`);

      // Capture current screenshot
      await captureHtmlScreenshot(result.html, currentScreenshotPath);

      // Check if baseline exists
      const baselineExists = existsSync(baselineScreenshotPath);

      if (!baselineExists) {
        // First run: create baseline
        await writeFile(baselineScreenshotPath, await readFile(currentScreenshotPath));
        console.log(
          `\n📸 Baseline screenshot created for ${name}: ${baselineScreenshotPath}`
        );
        console.log(
          `   Future test runs will compare against this baseline.`
        );
      } else {
        // Subsequent runs: compare with baseline
        const comparison = await compareImages(
          baselineScreenshotPath,
          currentScreenshotPath
        );

        if (!comparison.match) {
          // Create a diff image for debugging
          const [baselineImg, currentImg] = await Promise.all([
            sharp(baselineScreenshotPath).raw().toBuffer({ resolveWithObject: true }),
            sharp(currentScreenshotPath).raw().toBuffer({ resolveWithObject: true }),
          ]);

          // Create a simple diff visualization
          const diffBuffer = Buffer.alloc(baselineImg.data.length);
          for (let i = 0; i < baselineImg.data.length; i++) {
            const diff = Math.abs(baselineImg.data[i] - currentImg.data[i]);
            diffBuffer[i] = diff > 0 ? 255 : 0; // Highlight differences in white
          }

          await sharp(diffBuffer, {
            raw: {
              width: baselineImg.info.width,
              height: baselineImg.info.height,
              channels: baselineImg.info.channels,
            },
          })
            .png()
            .toFile(diffScreenshotPath);

          console.log(
            `\n❌ Screenshot mismatch for ${name}:`
          );
          console.log(`   Baseline: ${baselineScreenshotPath}`);
          console.log(`   Current:  ${currentScreenshotPath}`);
          console.log(`   Diff:     ${diffScreenshotPath}`);
          console.log(
            `   Difference: ${(comparison.diffPercentage * 100).toFixed(4)}%`
          );
        }

        expect(comparison.match).toBe(true);

        if (comparison.match) {
          console.log(
            `\n✅ Screenshot matches baseline for ${name} (diff: ${(comparison.diffPercentage * 100).toFixed(4)}%)`
          );
        }
      }
    }, 30000); // 30 second timeout for each test
  });

  describe("PDF generation validation", () => {
    it("should generate valid PDF", async () => {
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "68|95|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      });

      // Verify PDF magic number (PDF header)
      const pdfHeader = String.fromCharCode(...result.pdf.slice(0, 5));
      expect(pdfHeader).toBe("%PDF-");
    });

    it("should handle different months", async () => {
      const months = [
        new Date("2025-01-01"),
        new Date("2025-06-01"),
        new Date("2025-12-01"),
      ];

      for (const month of months) {
        const result = await puppeteerBillingStatementPdf({
          sub_acc_id: "68|95|Shen Yun New York|false|organization",
          month,
          language: "en",
        });

        expect(result.pdf).toBeInstanceOf(Uint8Array);
        expect(result.pdf.length).toBeGreaterThan(0);
      }
    });
  });
});
