/* Billing Statement To Do
 * Add Balance Adjustments
 * Shuffle. campaign name and cost
 *
 *
 */

import * as fs from "fs";
import * as path from "path";

import { puppeteerBillingStatementPdf } from "./--puppeteerBillingStatementPdf";

const SNAPSHOT_DIR = path.resolve(
  "./",
  "src/features/payment-doc-printer/billing-statement/__snapshots__/billing-statement"
);

function expectHtmlToMatchSnapshot(
  html: string | undefined,
  snapshotFileName: string
) {
  if (typeof html !== "string") {
    throw new Error(
      `HTML snapshot "${snapshotFileName}" can only be compared against a string value.`
    );
  }

  const snapshotPath = path.join(SNAPSHOT_DIR, snapshotFileName);
  const snapshotState = expect.getState().snapshotState as
    | { _updateSnapshot?: "all" | "new" | "none" }
    | undefined;
  const updateMode = snapshotState?._updateSnapshot ?? "new";
  const snapshotExists = fs.existsSync(snapshotPath);
  const canWriteNewSnapshot = updateMode === "all" || updateMode === "new";
  const shouldUpdateExistingSnapshot = updateMode === "all";

  if (!snapshotExists && !canWriteNewSnapshot) {
    throw new Error(
      `Missing HTML snapshot at ${snapshotPath}. Re-run the test with "-u" to create it.`
    );
  }

  if (
    (!snapshotExists && canWriteNewSnapshot) ||
    (snapshotExists && shouldUpdateExistingSnapshot)
  ) {
    fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
    fs.writeFileSync(snapshotPath, html, "utf-8");
  }

  const expectedHtml = fs.readFileSync(snapshotPath, "utf-8");
  expect(html).toBe(expectedHtml);
}

describe("English language", () => {
  describe("Short description", () => {
    test(`Edge case #1: No activity details records. No payments received records.`, async () => {
      // ✅ BREAK POINT defined
      // ✅ PASSED
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "0|0|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      });

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
      expectHtmlToMatchSnapshot(result.html, "en-short-0-0.html");
    }, 10000);

    test(`Edge case #2: Total rows are last on first Billing page`, async () => {
      // ✅ BREAK POINT defined
      // ✅ PASSED
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "9|17|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      });

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
      expectHtmlToMatchSnapshot(result.html, "en-short-9-17.html");
    }, 10000);

    test(`Edge case #3: Total rows are first on a new Billing and Payment page`, async () => {
      // ✅ BREAK POINT defined
      // ✅ DONE: Test passed
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "10|18|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      });

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
      expectHtmlToMatchSnapshot(result.html, "en-short-10-18.html");
    }, 10000);

    test(`Edge case #4: Total rows are last on continuation pages`, async () => {
      // ✅ BREAK POINT defined
      // 🌕 DONE: Test passed
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "28|36|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      });

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
      expectHtmlToMatchSnapshot(result.html, "en-short-28-36.html");
    }, 10000);

    test(`Edge case #5: Total rows are first on continuation pages`, async () => {
      // ✅ BREAK POINT defined
      // ✅ DONE: Test passed
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "29|37|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      });

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
      expectHtmlToMatchSnapshot(result.html, "en-short-29-37.html");
    }, 10000);
  });

  describe("Long description", () => {
    test(
      `Edge case #1: Total rows are last on first Billing page` +
        "Total rows preceded by a long description",
      async () => {
        // ✅ BREAK POINT defined
        // ✅ TEST PASSED
        // Generate the billing statement
        const result = await puppeteerBillingStatementPdf({
          sub_acc_id: "6|0|Shen Yun New York|true|organization",
          month: new Date("2025-11-01"),
          language: "en",
        });

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
        expectHtmlToMatchSnapshot(result.html, "en-long-6-0.html");
      },
      10000
    );

    test(
      `Edge case #2: Total rows are first on new page after first Billing page` +
        "Total rows preceded by a long description",
      async () => {
        // ✅ BREAK POINT defined
        // ✅ TEST PASSED
        // Generate the billing statement
        const result = await puppeteerBillingStatementPdf({
          sub_acc_id: "7|0|Shen Yun New York|true|organization",
          month: new Date("2025-11-01"),
          language: "en",
        });

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
        expectHtmlToMatchSnapshot(result.html, "en-long-7-0.html");
      },
      10000
    );

    test(
      `Edge case #3: Total rows are last on continuation pages` +
        "Total rows preceded by a long description",
      async () => {
        // ✅ BREAK POINT defined
        // ✅ TEST PASSED
        // Generate the billing statement
        const result = await puppeteerBillingStatementPdf({
          sub_acc_id: "18|0|Shen Yun New York|true|organization",
          month: new Date("2025-11-01"),
          language: "en",
        });

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
        expectHtmlToMatchSnapshot(result.html, "en-long-18-0.html");
      },
      10000
    );

    test(
      `Edge case #5: Total rows are first on continuation pages` +
        "Total rows preceded by a long description",
      async () => {
        // ✅ BREAK POINT defined
        // 🌕 DONE: Looking good
        // Generate the billing statement
        const result = await puppeteerBillingStatementPdf({
          sub_acc_id: "19|0|Shen Yun New York|true|organization",
          month: new Date("2025-11-01"),
          language: "en",
        });

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
        expectHtmlToMatchSnapshot(result.html, "en-long-19-0.html");
      },
      10000
    );
  });
});

/*
describe("Multiple languages", () => {
  describe("Short description", () => {
    test(`en`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "68|95|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "en",
      });

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
    }, 10000);

    test(`zh-TW`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "87|99|神韻紐約|false|organization",
        month: new Date("2025-11-01"),
        language: "zh-TW",
      });

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
      expectHtmlToMatchSnapshot(result.html, "short-lang-zh-tw.html");
    }, 10000);

    test(`zh-CN`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|神韵纽约|false|organization",
        month: new Date("2025-11-01"),
        language: "zh-CN",
      });

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
      expectHtmlToMatchSnapshot(result.html, "short-lang-zh-cn.html");
    }, 10000);

    test(`vi`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "vi",
      });

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
      expectHtmlToMatchSnapshot(result.html, "short-lang-vi.html");
    }, 10000);

    test(`ko`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|Shen Yun New York|false|organization",
        month: new Date("2025-11-01"),
        language: "ko",
      });

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
      expectHtmlToMatchSnapshot(result.html, "short-lang-ko.html");
    }, 10000);

    test(`ja`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "87|99|神韻ニューヨーク|false|organization",
        month: new Date("2025-11-01"),
        language: "ja",
      });

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
      expectHtmlToMatchSnapshot(result.html, "short-lang-ja.html");
    }, 10000);

    test(`es`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|Shen Yun Nueva York|false|organization",
        month: new Date("2025-11-01"),
        language: "es",
      });

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
      expectHtmlToMatchSnapshot(result.html, "short-lang-es.html");
    }, 10000);
  });

  describe("Long description", () => {
    test(`en`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "68|95|Shen Yun New York|TRUE|organization",
        month: new Date("2025-12-01"),
        language: "en",
      });

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
    }, 10000);

    test(`zh-TW`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "87|99|神韻紐約|true|organization",
        month: new Date("2025-12-01"),
        language: "zh-TW",
      });

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
      expectHtmlToMatchSnapshot(result.html, "long-lang-zh-tw.html");
    }, 10000);

    test(`zh-CN`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|神韵纽约|true|organization",
        month: new Date("2025-12-01"),
        language: "zh-CN",
      });

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
      expectHtmlToMatchSnapshot(result.html, "long-lang-zh-cn.html");
    }, 10000);

    test(`vi`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|Shen Yun New York|true|organization",
        month: new Date("2025-12-01"),
        language: "vi",
      });

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
      expectHtmlToMatchSnapshot(result.html, "long-lang-vi.html");
    }, 10000);

    test(`ko`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|Shen Yun New York|true|organization",
        month: new Date("2025-12-01"),
        language: "ko",
      });

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
      expectHtmlToMatchSnapshot(result.html, "long-lang-ko.html");
    }, 10000);

    test(`ja`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "87|99|神韻ニューヨーク|true|organization",
        month: new Date("2025-12-01"),
        language: "ja",
      });

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
      expectHtmlToMatchSnapshot(result.html, "long-lang-ja.html");
    }, 10000);

    test(`es`, async () => {
      // Generate the billing statement
      const result = await puppeteerBillingStatementPdf({
        sub_acc_id: "91|99|Shen Yun Nueva York|true|organization",
        month: new Date("2025-12-01"),
        language: "es",
      });

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
      expectHtmlToMatchSnapshot(result.html, "long-lang-es.html");
    }, 10000);
  });
});
*/
