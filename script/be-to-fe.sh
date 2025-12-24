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

# Copy invoice files
cp -r "$SOURCE/invoice/"* "$DESTINATION/src/features/payment-doc-printer/invoice/" 

# Copy helper files
cp -r "$SOURCE/helpers/"* "$DESTINATION/src/features/payment-doc-printer/helpers/"

# Puppeteer multiple payment profiles
cp "$SOURCE/billing-statement/--puppeteerBillingStatementPdf.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.ts"
cp "$SOURCE/billing-statement/--puppeteerBillingStatementPdf-MPP.test.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf-collectStatementDetails_puppeteer_MultiplePaymentProfiles.test.ts"
cp "$SOURCE/billing-statement/1--collectStatementDetails.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails.ts"
cp "$SOURCE/billing-statement/1--collectStatementDetails.test.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails.test.ts"
cp "$SOURCE/billing-statement/__mocks__/1--collectStatementDetails_puppeteer_MPP.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/1--collectStatementDetails_puppeteer_MultiplePaymentProfiles.ts"


# Copy src files
cp "$SOURCE/billing-statement/--puppeteerBillingStatementPdf.test.ts" "$DESTINATION/src/features/payment-doc-printer/billing-statement/--puppeteerBillingStatementPdf.test.ts"
