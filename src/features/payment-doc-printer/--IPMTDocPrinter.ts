import type { TSupportedLanguage } from "./helpers/h.0--translations";

/** File name prefix of invoices */
export const INVOICE_PREFIX = "invoice-";
/** File name prefix of billing statements */
export const STATEMENT_PREFIX = "billing-stmt-";

export type TCreateInvoicePdfParams = Pick<
  TFields_v2_payments,
  "payment_id" | "sub_acc_id"
>;

export type TCreateBillingStatementPdfParams = {
  sub_acc_id: string;
  month: Date;
  language?: TSupportedLanguage; // Optional language parameter, defaults to "en"
};

type TCreateBillingStatementResult = {
  pdf: Uint8Array;
  statement_uri: string;
};

type TCreateInvoiceResult = {
  pdf: Uint8Array;
  invoice_uri: string;
};

export interface IPMTDocPrinter {
  generateBillingStatementPdf(
    params: TCreateBillingStatementPdfParams
  ): Promise<TCreateBillingStatementResult>;

  generateInvoicePdf(
    params: TCreateInvoicePdfParams
  ): Promise<TCreateInvoiceResult>;
}
