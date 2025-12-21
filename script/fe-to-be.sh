#!/bin/bash

# Hard-coded source and destination paths
SOURCE="./"
DESTINATION="../ads/dsp/be/src/features/payment-doc-printer"

# Copy billing-statement files
cp "$SOURCE/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.ts" "$DESTINATION/billing-statement/--puppeteerBillingStatementPdf.ts/"
# TODO: Handle 1--collectStatementDetails.ts for puppeteer specifically
cp "$SOURCE/src/features/payment-doc-printer/billing-statement/2--drawPuppeteerStatementPdf.ts" "$DESTINATION/billing-statement/2--drawPuppeteerStatementPdf.ts"

# Copy helpers files
cp "$SOURCE/src/features/payment-doc-printer/helpersh.0--types.ts" "$DESTINATION/helpers/h.0--types.ts"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.0--puppeteer-consts.ts" "$DESTINATION/helpers/h.0--puppeteer-consts.ts"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.0--translations.ts" "$DESTINATION/helpers/h.0--translations.ts"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.2--puppeteerRenderer.ts" "$DESTINATION/helpers/h.2--puppeteerRenderer.ts"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.2.1--puppeteerBillingRenderer.ts" "$DESTINATION/helpers/h.2.1--puppeteerBillingRenderer.ts"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.5--generateHtmlTemplate.ts" "$DESTINATION/helpers/h.5--generateHtmlTemplate.ts"
cp "$SOURCE/src/features/payment-doc-printer/helpers/h.6--optimizePdf.ts" "$DESTINATION/helpers/h.6--optimizePdf.ts"
cp "$SOURCE/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.test.ts" "$DESTINATION/billing-statement/--puppeteerBillingStatementPdf.test.ts"

Copy src files
cp "$SOURCE/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.test.ts" "$DESTINATION/billing-statement/--puppeteerBillingStatementPdf.test.ts"
