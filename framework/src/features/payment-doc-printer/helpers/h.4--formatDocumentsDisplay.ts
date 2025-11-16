import { getUTCOffsetDisplay } from "../../../shared/helpers/datetime-utils";
import {
	TBillingStatementDetails,
	TBillingStatementDetails_Display,
	TInvoiceDetails,
	TInvoiceDetails_Display,
} from "./h.0--types";
import { formatCurrencyDisplay, formatNumberDisplay } from "./h.3--formatNumberDisplay";
import { formatDateDisplay, replaceUnderscoreWithSpace } from "./h.3.1--formatDateDisplay";
("src/features/payment-doc-printer/helpers/h.5--formatDocumentsDisplay.ts");

/** Transform invoice_details to display-ready format */
export function formatInvoiceDisplay(invoice_details: TInvoiceDetails): TInvoiceDetails_Display {
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
			sub_acc_id: `Account balance top up: ${invoice_details.payment.sub_acc_id}`,

			// Dates
			paid_time: `${formatDateDisplay({
				dateVal: invoice_details.payment.paid_time,
				timeZone: timeZoneName,
				showHour: true,
				monthAbbr: false,
				format: "human_friendly",
			})} (UTC${getUTCOffsetDisplay(timeZoneName ?? "")}) ${replaceUnderscoreWithSpace(
				timeZoneName,
			)} Time`,

			// Positive dollar amounts
			tax: formatCurrencyDisplay(invoice_details.payment.tax),
			total_amount: formatCurrencyDisplay(invoice_details.payment.total_amount),
			paid_total: formatCurrencyDisplay(
				Number(invoice_details.payment.total_amount) + Number(invoice_details.payment.tax),
			),
		},
	};

	return invoice_details_display;
}

export function formatStatementDisplay(
	statement_details: TBillingStatementDetails,
): TBillingStatementDetails_Display {
	const { period, ...rest_monthly_acount_balance } = statement_details.monthly_account_balance;
	const [billing_period_start, billing_period_end] = period.split(" -- ");
	const timeZoneName = statement_details.account.advertiser_time_zone_name!;

	const statement_details_display: TBillingStatementDetails_Display = {
		...statement_details,
		monthly_account_balance: {
			...rest_monthly_acount_balance,

			billing_period_start: formatDateDisplay({
				dateVal: billing_period_start,
				monthAbbr: true,
			}),
			billing_period_end: formatDateDisplay({
				dateVal: billing_period_end,
				monthAbbr: true,
			}),

			opening_balance: formatCurrencyDisplay(
				statement_details.monthly_account_balance.opening_balance,
			),
			closing_balance: formatCurrencyDisplay(
				statement_details.monthly_account_balance.closing_balance,
			),
			total_ad_spend: formatCurrencyDisplay(
				-Number(statement_details.monthly_account_balance.total_ad_spend),
			),
			total_ad_spend_adjusted: formatCurrencyDisplay(
				-Number(statement_details.monthly_account_balance.total_ad_spend_adjusted),
			),
			total_payments_received: formatCurrencyDisplay(
				statement_details.monthly_account_balance.total_payments_received,
			),
		},

		monthly_campaign_spends: statement_details.monthly_campaign_spends.map(spend => ({
			...spend,
			cost: formatCurrencyDisplay(-Number(spend.cost)),
			imp: formatNumberDisplay(Number(spend.imp)),
		})),

		payments: statement_details.payments.map(payment => ({
			...payment,
			paid_time: `${formatDateDisplay({
				dateVal: payment.paid_time,
				timeZone: timeZoneName,
				format: "machine_friendly",
				showHour: true,
			})} (UTC${getUTCOffsetDisplay(timeZoneName ?? "")})`,
			total_amount: formatCurrencyDisplay(payment.total_amount),
		})),

		// Loops through the payments array accumulate the total of all tax values
		total_tax: formatCurrencyDisplay(
			-Number(
				statement_details.payments.reduce((sum, payment) => sum + Number(payment.tax), 0),
			),
		),
	};

	return statement_details_display;
}
