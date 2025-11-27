#!/bin/bash

# Hard-coded source and destination paths
SOURCE="./"
DESTINATION="../ads/dsp/be/src/features/payment-doc-printer"

# Copy billing-statement files
cp "$SOURCE/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.ts" "$DESTINATION/billing-statement/"
# TODO: Handle 1--collectStatementDetails.ts for puppeteer specifically
cp "$SOURCE/src/features/payment-doc-printer/billing-statement/2--drawPuppeteerStatementPdf.ts" "$DESTINATION/billing-statement/"

# Copy helpers files
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.0--puppeteer-consts.ts" "$DESTINATION/helpers/"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.0--translations.ts" "$DESTINATION/helpers/"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.2--puppeteerRenderer.ts" "$DESTINATION/helpers/"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.2.1--puppeteerBillingRenderer.ts" "$DESTINATION/helpers/"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.5--generateHtmlTemplate.ts" "$DESTINATION/helpers/"

# Copy src files
cp "$SOURCE/test-pdf-lib-pipeline.ts" "$DESTINATION/billing-statement/--puppeteerBillingStatementPdf-test.ts"
