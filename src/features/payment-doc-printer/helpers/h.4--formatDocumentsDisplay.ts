import { getUTCOffsetDisplay } from "../../../shared/helpers/datetime-utils";
import type {
  TBillingStatementDetails,
  TBillingStatementDetails_Display,
  TInvoiceDetails,
  TInvoiceDetails_Display,
} from "./h.0--types";

import { formatNumberDisplay } from "./h.3--formatNumberDisplay";
import {
  formatDateDisplay,
  formatDateDisplay_MultiPaymentProfile,
  replaceUnderscoreWithSpace,
} from "./h.3.1--formatDateDisplay";

/** Transform invoice_details to display-ready format */
export function formatInvoiceDisplay(
  invoice_details: TInvoiceDetails
): TInvoiceDetails_Display {
  const timeZoneName = invoice_details.account.advertiser_time_zone_name!;

  const invoice_details_display: TInvoiceDetails_Display = {
    ...invoice_details,
    paymentProfile: {
      ...invoice_details.paymentProfile,

      // Payee display name
      payee_display_name:
        invoice_details.paymentProfile.type === "individual"
          ? invoice_details.paymentProfile.legal_name || ""
          : invoice_details.paymentProfile.org_name || "",
    },
    payment: {
      ...invoice_details.payment,

      // Invoice metadata
      payment_id: invoice_details.payment.payment_id.replace(/^p+_/, ""),
      sub_acc_id: `Account balance top up: ${invoice_details.account.account_id}`,

      // Dates
      paid_time: `${formatDateDisplay({
        dateVal: invoice_details.payment.paid_time,
        timeZone: timeZoneName,
        showHour: true,
        monthAbbr: false,
        format: "human_friendly",
      })} (UTC${getUTCOffsetDisplay(
        timeZoneName ?? ""
      )}) ${replaceUnderscoreWithSpace(timeZoneName)} Time`,

      // Positive dollar amounts
      tax: invoice_details.payment.tax,
      paid_amount: invoice_details.payment.paid_amount,
      total_amount: invoice_details.payment.total_amount,
    },
  };

  return invoice_details_display;
}

export function formatStatementDisplay(
  statement_details: TBillingStatementDetails
): TBillingStatementDetails_Display {
  const { period, ...rest_monthly_acount_balance } =
    statement_details.monthly_account_balance;
  const [billing_period_start, billing_period_end] = period.split(" -- ");
  const timeZoneName = statement_details.account.advertiser_time_zone_name!;

  // Sort ad campaigns by cost in descending order
  const sorted_spend = statement_details.monthly_campaign_spends.sort(
    (a, b) => Number(b.cost) - Number(a.cost)
  );

  // Sort payments by date
  const sorted_payments = statement_details.payments.sort((a, b) =>
    a.paid_time.localeCompare(b.paid_time)
  );

  const payment_profile = statement_details.payment_profile;

  // pmt_prf_link_history:

  const statement_details_display: TBillingStatementDetails_Display = {
    ...statement_details,
    monthly_account_balance: {
      ...rest_monthly_acount_balance,

      created_time: `${formatDateDisplay({
        dateVal: statement_details.monthly_account_balance.created_time,
        timeZone: timeZoneName,
        format: "human_friendly",
        monthAbbr: true,
        showHour: false,
      })}`,

      billing_period_start: formatDateDisplay({
        dateVal: billing_period_start,
        monthAbbr: true,
      }),

      billing_period_end: formatDateDisplay({
        dateVal: billing_period_end,
        monthAbbr: true,
      }),

      opening_balance: String(
        statement_details.monthly_account_balance.opening_balance
      ),
      closing_balance: String(
        statement_details.monthly_account_balance.closing_balance
      ),
      total_ad_spend_adjusted: String(
        statement_details.monthly_account_balance.total_ad_spend_adjusted
      ),
      total_payments_received:
        statement_details.monthly_account_balance.total_payments_received,
    },

    monthly_campaign_spends: sorted_spend.map((spend) => ({
      ...spend,
      cost: spend.cost,
      imp: formatNumberDisplay(Number(spend.imp)),
    })),

    ...(statement_details.balance_adjustments && {
      balance_adjustments: statement_details.balance_adjustments.map(
        (bal_adj) => ({
          ...bal_adj,
          bal_adj_id: `Bonus Ads`,
          applied_amount: String(bal_adj.applied_amount),
          notes: "",
        })
      ),
    }),

    /* Temporarily shortening payment profile id */
    payment_profile: {
      ...payment_profile,
      pmt_prf_id: payment_profile.pmt_prf_id.slice(0, 10),
    },

    payments: sorted_payments.map((payment) => ({
      ...payment,
      paid_time: `${formatDateDisplay({
        dateVal: payment.paid_time,
        timeZone: timeZoneName,
        format: "machine_friendly",
        showHour: true,
      })} (UTC${getUTCOffsetDisplay(timeZoneName ?? "")})`,
      tax: payment.tax,
      total_amount: payment.total_amount,
      total_w_tax: String(Number(payment.total_amount) + Number(payment.tax)),
    })),

    // Loops through the payments array accumulate the total of all tax values
    total_payments: String(
      statement_details.payments.reduce(
        (sum, payment) => sum + Number(payment.total_amount),
        0
      )
    ),

    total_tax: String(
      statement_details.payments.reduce(
        (sum, payment) => sum + Number(payment.tax),
        0
      )
    ),

    total_payments_with_tax: String(
      statement_details.payments.reduce(
        (sum, payment) => sum + Number(payment.tax + payment.total_amount),
        0
      )
    ),

    pmt_prf_link_history:
      statement_details.pmt_prf_link_history?.map((link_history) => {
        const target_month = billing_period_start.slice(0, 7);
        return {
          ...link_history,
          active_period_display: formatDateDisplay_MultiPaymentProfile(
            link_history.link_time,
            link_history.unlink_time,
            target_month,
            timeZoneName
          ),
        };
      }) ?? [],
  };

  return statement_details_display;
}
