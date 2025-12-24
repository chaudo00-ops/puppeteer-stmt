import { PDFFont } from "pdf-lib";
import { PDFContext } from "./h.1--pdfContext";
import { BillingPDFContext } from "./h.1.1--billingPdfContext";

export interface GeneratePdfResult {
  pdf: Uint8Array;
  context: PDFContext;
}

export interface InvoicePdfResult {
  pdf: Uint8Array;
  html: string;
}

export interface BillingPdfResult {
  pdf: Uint8Array;
  context: BillingPDFContext;
}

export type TBillingStatementDetails = {
  account: Pick<
    TFields_v2_sub_account,
    | "account_id"
    | "ads_sub_acc_name"
    | "advertiser_time_zone_name"
    | "linked_pmt_prf_id"
    | "linked_pmt_sub_acc_id"
  >;
  payment_profile: Pick<
    TFields_v2_payment_profiles,
    | "type"
    | "legal_name"
    | "org_name"
    | "address_country"
    | "address_postal_code"
    | "pmt_prf_name"
    | "pmt_prf_id"
  >;
  payments: Pick<
    TFields_v2_payments,
    "paid_time" | "description" | "total_amount" | "tax"
  >[];
  monthly_account_balance: Pick<
    TFields_v2_monthly_account_balance_ui,
    | "created_time"
    | "total_ad_spend_adjusted"
    | "period"
    | "opening_balance"
    | "closing_balance"
    | "total_payments_received"
  >;
  balance_adjustments?: TFields_v2_balance_adjustments[];
  monthly_campaign_spends: Pick<
    TFields_v2_monthly_campaign_spend_ui,
    "sub_acc_id" | "cpgn_id" | "cpgn_name" | "cost" | "imp"
  >[];
  pmt_prf_link_history?: Pick<
    TFields_v2_pmt_prf_links_history,
    | "linked_pmt_prf_id"
    | "linked_pmt_sub_acc_id"
    | "sub_acc_id"
    | "link_time"
    | "unlink_time"
  >[];
};

export type TBillingStatementDetails_Display = Omit<
  TBillingStatementDetails,
  "monthly_account_balance" | "pmt_prf_link_history" | "payments"
> & {
  monthly_account_balance: Omit<
    TBillingStatementDetails["monthly_account_balance"],
    "period" | "opening_balance" | "closing_balance" | "total_ad_spend_adjusted"
  > & {
    billing_period_start: string;
    billing_period_end: string;
    opening_balance: string;
    closing_balance: string;
    total_ad_spend_adjusted: string;
  };
  pmt_prf_link_history: (Pick<
    TFields_v2_pmt_prf_links_history,
    | "linked_pmt_prf_id"
    | "linked_pmt_sub_acc_id"
    | "sub_acc_id"
    | "link_time"
    | "unlink_time"
  > & {
    active_period_display: string;
  })[];
  payments: (Pick<
    TFields_v2_payments,
    "paid_time" | "description" | "total_amount" | "tax"
  > & {
    total_w_tax: string;
  })[];
  total_tax: string;
  total_payments: string;
  total_payments_with_tax: string;
};

export type TInvoiceDetails = {
  paymentProfile: Pick<
    TFields_v2_payment_profiles,
    | "legal_name"
    | "org_name"
    | "type"
    | "email"
    | "address_country"
    | "address_postal_code"
  >;
  payment: Pick<
    TFields_v2_payments,
    | "payment_id"
    | "paid_time"
    | "sub_acc_id"
    | "tax"
    | "total_amount"
    | "paid_amount"
  >;
  account: Pick<
    TFields_v2_sub_account,
    "advertiser_time_zone_name" | "account_id"
  >;
};

export type TInvoiceDetails_Display = {
  payment: TInvoiceDetails["payment"];
  paymentProfile: Omit<
    TInvoiceDetails["paymentProfile"],
    "legal_name" | "org_name" | "type"
  > & {
    payee_display_name: string;
  };
  account: TInvoiceDetails["account"];
};

export type TPdfTableName = "activity" | "payments" | "invoice";

export type TTextAlignment = "left" | "right";

export type TWrappedTextParams = {
  text: string;
  alignment: TTextAlignment;
  leftBoundary: number;
  rightBoundary: number;
  textWidth: number;
  font: PDFFont;
  size: number;
  spacing: number;
};

export type PmtPrfLinkHistoryItem_Display = Pick<
  TFields_v2_pmt_prf_links_history,
  | "linked_pmt_prf_id"
  | "linked_pmt_sub_acc_id"
  | "sub_acc_id"
  | "link_time"
  | "unlink_time"
> & {
  active_period_display: string;
};
