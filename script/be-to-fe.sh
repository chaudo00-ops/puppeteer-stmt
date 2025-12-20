#!/bin/bash

# Hard-coded source and destination paths
DESTINATION="./"
SOURCE="../ads/dsp/be/src/features/payment-doc-printer"

# Copy billing-statement files
cp "$SOURCE/billing-statement/--puppeteerBillingStatementPdf.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.ts" 
cp "$SOURCE/billing-statement/__mocks__/1--collectStatementDetails.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails.ts"
cp "$SOURCE/billing-statement/__mocks__/1--collectStatementDetails_puppeteer.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails_puppeteer.ts"
cp "$SOURCE/billing-statement/2--drawPuppeteerStatementPdf.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/2--drawPuppeteerStatementPdf.ts"
cp -r "$SOURCE/billing-statement/__snapshots__/"* "$DESTINATION/src/features/payment-doc-printer/billing-statement/__snapshots__/"
cp "$SOURCE/billing-statement/1--collectStatementDetails.test.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails.test.ts"

# Copy helpers files
cp "$SOURCE/helpers/h.0--types.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.0--types.ts"
cp "$SOURCE/helpers/h.0--puppeteer-consts.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.0--puppeteer-consts.ts"
cp "$SOURCE/helpers/h.0--translations.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.0--translations.ts"
cp "$SOURCE/helpers/h.2--puppeteerRenderer.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.2--puppeteerRenderer.ts"
cp "$SOURCE/helpers/h.2.1--puppeteerBillingRenderer.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.2.1--puppeteerBillingRenderer.ts"
cp "$SOURCE/helpers/h.4--formatDocumentsDisplay.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.4--formatDocumentsDisplay.ts"
cp "$SOURCE/helpers/h.5--generateHtmlTemplate.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.5--generateHtmlTemplate.ts"
cp "$SOURCE/helpers/h.5.1--prepareTemplateContext.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.5.1--prepareTemplateContext.ts"
cp "$SOURCE/helpers/h.5.2--buildPagesHtml.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.5.2--buildPagesHtml.ts"
cp "$SOURCE/helpers/h.5.3--buildDocumentStyles.ts" "$DESTINATION/src/features/payment-doc-printer/helpers/h.5.3--buildDocumentStyles.ts"

# Puppeteer multiple payment profiles
cp "$SOURCE/billing-statement/--puppeteerBillingStatementPdf.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.ts"
cp "$SOURCE/billing-statement/--puppeteerBillingStatementPdf-MPP.test.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf-collectStatementDetails_puppeteer_MultiplePaymentProfiles.test.ts"
cp "$SOURCE/billing-statement/1--collectStatementDetails.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails.ts"
cp "$SOURCE/billing-statement/1--collectStatementDetails.test.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails.test.ts"
cp "$SOURCE/billing-statement/__mocks__/1--collectStatementDetails_puppeteer_MPP.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails_puppeteer_MultiplePaymentProfiles.ts"


# Copy src files
cp "$SOURCE/billing-statement/--puppeteerBillingStatementPdf.test.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.test.ts"
