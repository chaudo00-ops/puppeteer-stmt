# Billing Statement PDF Tests

## Overview

The `--puppeteerBillingStatementPdf.test.ts` file contains Jest unit tests for the billing statement PDF generation feature. These tests use visual regression testing to ensure that generated HTML matches expected output.

## Test Features

### Visual Regression Testing

The tests capture screenshots of generated HTML and compare them against baseline screenshots. This ensures that:
- HTML rendering is consistent across test runs
- Changes to the PDF generation are visually verified
- Different language versions render correctly

### Test Coverage

The test suite covers:

1. **Multi-language Support** - Tests all 7 supported languages:
   - English (en)
   - Traditional Chinese (zh-TW)
   - Simplified Chinese (zh-CN)
   - Vietnamese (vi)
   - Korean (ko)
   - Japanese (ja)
   - Spanish (es)

2. **PDF Generation Validation**:
   - Verifies PDF structure and format
   - Checks context information (page numbers, positions)
   - Tests different month inputs

3. **Screenshot Comparison**:
   - Baseline creation on first run
   - Pixel-by-pixel comparison on subsequent runs
   - Diff image generation for failed comparisons
   - Configurable difference threshold (1% by default)

## Running the Tests

### Prerequisites

The tests require a Chromium/Chrome browser to be installed. You have two options:

#### Option 1: Install Chrome via Puppeteer

```bash
npx puppeteer browsers install chrome
```

#### Option 2: Use System Chrome

Ensure Chrome or Chromium is installed on your system and accessible in PATH.

### Running Tests

```bash
# Run all tests
npm test

# Run only billing statement tests
npm test -- --testPathPatterns="puppeteerBillingStatementPdf"

# Run tests in watch mode
npm run test:watch
```

## Screenshot Management

### Directory Structure

Screenshots are stored in:
```
src/features/payment-doc-printer/billing-statement/__screenshots__/billing-statement/
├── baseline-en.png          # Baseline for English
├── baseline-zh-TW.png       # Baseline for Traditional Chinese
├── current-en.png           # Current test run (English)
├── diff-en.png              # Difference visualization (if test fails)
└── ...
```

### First Run

On the first test run, baseline screenshots will be created automatically. You'll see output like:

```
📸 Baseline screenshot created for en: .../baseline-en.png
   Future test runs will compare against this baseline.
```

### Subsequent Runs

On subsequent runs, current screenshots are compared against baselines:

```
✅ Screenshot matches baseline for en (diff: 0.0023%)
```

If there's a mismatch:

```
❌ Screenshot mismatch for en:
   Baseline: .../baseline-en.png
   Current:  .../current-en.png
   Diff:     .../diff-en.png
   Difference: 2.3456%
```

### Updating Baselines

If you intentionally changed the rendering and need to update baselines:

1. Delete the old baseline files:
   ```bash
   rm src/features/payment-doc-printer/billing-statement/__screenshots__/billing-statement/baseline-*.png
   ```

2. Run tests again to create new baselines:
   ```bash
   npm test -- --testPathPatterns="puppeteerBillingStatementPdf"
   ```

## Configuration

### Adjustable Parameters

In the test file, you can adjust:

```typescript
const SCREENSHOT_WIDTH = 816;      // Screenshot width (Letter at 96 DPI)
const SCREENSHOT_HEIGHT = 1056;    // Screenshot height (Letter at 96 DPI)
const PIXEL_DIFF_THRESHOLD = 0.01; // 1% pixel difference threshold
```

### Timeout

Individual tests have a 30-second timeout. Adjust if needed:

```typescript
it('test name', async () => {
  // test code
}, 30000); // 30 seconds
```

## Troubleshooting

### Chrome Not Found Error

If you see:
```
Could not find Chrome (ver. xxx). This can occur if either...
```

Solution: Install Chrome using Puppeteer:
```bash
npx puppeteer browsers install chrome
```

### Network Errors During Screenshot Capture

If screenshots fail to capture due to network timeouts, try:
- Increasing the `waitUntil` timeout in the test
- Using `waitUntil: 'domcontentloaded'` instead of `'networkidle0'`

### Memory Issues

For large screenshot batches, you might need to increase Node's memory:
```bash
NODE_OPTIONS='--max-old-space-size=4096' npm test
```

## Implementation Details

### Test Structure

Each language test:
1. Generates a billing statement PDF and HTML
2. Captures a screenshot of the HTML
3. Compares with baseline (if exists) or creates baseline
4. Reports match/mismatch with diff percentage

### Image Comparison

Uses Sharp library for:
- Reading images as raw buffers
- Pixel-by-pixel comparison
- Generating diff visualizations

### Mock Data

Tests use the same mock data structure as the main test pipeline (`test-pdf-lib-pipeline.ts`) to ensure consistency.
