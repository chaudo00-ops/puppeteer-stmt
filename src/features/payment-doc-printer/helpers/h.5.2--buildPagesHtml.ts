import { MARGIN_TOP_SECTION } from "./h.0--puppeteer-consts";
import { type TBillingStatementTranslations, type TSupportedLanguage } from "./h.0--translations";
import { joinWithAnd } from "./h.3.2--formatStringDisplay";
import {
	calculateActivityEntriesHeight,
	type TemplateContext,
} from "./h.5.1--prepareTemplateContext";

export function buildPagesHtml(
	context: TemplateContext,
	translations: TBillingStatementTranslations,
	language: TSupportedLanguage,
	includeSummaryFootnotes: boolean = false,
): string {
	const {
		account,
		paymentProfile,
		monthly_account_balance,
		pmt_prf_link_history,
		total_tax,
		activityPages,
		paymentPages,
		firstPageAvailableForActivity,
		generatePageHeader,
		generatePageFooter,
		generateActivityTableHeader,
		generatePaymentsTableHeader,
	} = context;

	let pagesHtml = "";
	let pageNumber = 1;

	if (activityPages.length === 0) {
		pagesHtml += `
  <!-- Page ${pageNumber} -->
  <div class="page">
    ${generatePageHeader()}
    <div class="page-content">

      <div class="bill-to section">
        <h3>${translations.billTo}</h3>
        <p class="bill-to subtitle">${paymentProfile.legal_name}</p>
        ${
			paymentProfile.type === "organization"
				? `<p class="bill-to subtitle">${paymentProfile.org_name || ""}</p>`
				: ""
		}
        <p>${paymentProfile.address_country}, ${paymentProfile.address_postal_code}</p>
      </div>

      <div class="details-summary-container section">
        <div class="details">
          <h3>${translations.details}</h3>
          <div class="detail-row">
            <span class="detail-label">${translations.accountName}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${account.ads_sub_acc_name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${translations.accountId}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${account.account_id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${translations.paymentsProfileId}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${paymentProfile.pmt_prf_id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${translations.statementIssueDate}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${monthly_account_balance.created_time}</span>
          </div>
        </div>

        <div class="summary">
          <h3>${translations.summaryFor} ${monthly_account_balance.billing_period_start} – ${
			monthly_account_balance.billing_period_end
		}</h3>
          <div class="summary-row">
            <span class="summary-label">${translations.openingBalance}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.opening_balance}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">${translations.totalAdSpend}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.total_ad_spend_adjusted}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">${translations.totalPaymentsReceived}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.total_payments_received}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">${translations.closingBalance}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.closing_balance}</span>
          </div>
${
	includeSummaryFootnotes
		? `<div class="summary-footnotes">
        <p>(1) Payment Profile "${paymentProfile.pmt_prf_name}" was active ${joinWithAnd(
				pmt_prf_link_history?.map(hist => hist.active_period_display) ?? [],
		  )}.</p>
        <p>(2) Balances were carried over between active periods.</p>
      </div>`
		: ""
}
        </div>
      </div>
    </div>
  </div>`;
		pageNumber++;
	} else {
		activityPages.forEach((campaigns, pageIndex) => {
			const isFirstPage = pageIndex === 0;
			const isLastActivityPage = pageIndex === activityPages.length - 1;

			const firstPageCampaignsHeight = calculateActivityEntriesHeight(campaigns, language);
			const customMarginTop =
				isFirstPage && activityPages.length !== 1
					? MARGIN_TOP_SECTION + firstPageAvailableForActivity - firstPageCampaignsHeight
					: MARGIN_TOP_SECTION;

			pagesHtml += `
  <!-- Page ${pageNumber} -->
  <div class="page ${isLastActivityPage ? "last-page" : ""}">
    ${generatePageHeader()}
    <div class="page-content">`;

			if (isFirstPage) {
				pagesHtml += `
      <div class="bill-to section">
        <h3>${translations.billTo}</h3>
        <p class="bill-to subtitle">${paymentProfile.legal_name}</p>
        ${
			paymentProfile.type === "organization"
				? `<p class="bill-to subtitle">${paymentProfile.org_name || ""}</p>`
				: ""
		}
        <p>${paymentProfile.address_country}, ${paymentProfile.address_postal_code}</p>
      </div>

      <div class="details-summary-container section">
        <div class="details">
          <h3>${translations.details}</h3>
          <div class="detail-row">
            <span class="detail-label">${translations.accountName}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${account.ads_sub_acc_name}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${translations.accountId}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${account.account_id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${translations.paymentsProfileId}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${paymentProfile.pmt_prf_id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">${translations.statementIssueDate}</span>
            <span class="dot-fill"></span>
            <span class="detail-value">${monthly_account_balance.created_time}</span>
          </div>
        </div>

        <div class="summary">
          <h3>${translations.summaryFor} ${monthly_account_balance.billing_period_start} – ${
					monthly_account_balance.billing_period_end
				}</h3>
          <div class="summary-row">
            <span class="summary-label">${translations.openingBalance}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.opening_balance}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">${translations.totalAdSpend}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.total_ad_spend_adjusted}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">${translations.totalPaymentsReceived}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.total_payments_received}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">${translations.closingBalance}</span>
            <span class="dot-fill"></span>
            <span class="summary-value">${monthly_account_balance.closing_balance}</span>
          </div>
          ${
				includeSummaryFootnotes
					? `<div class="summary-footnotes">
                  <p>(1) Payment Profile "${paymentProfile.pmt_prf_name}" was active ${joinWithAnd(
							pmt_prf_link_history?.map(hist => hist.active_period_display) ?? [],
					  )}.</p>
                  <p>(2) Balances were carried over between active periods.</p>
                </div>`
					: ""
			}
        </div>
      </div>`;
			}

			pagesHtml += `
      <div class="activity-details" style="margin-top: ${customMarginTop}px;">
        <table>
          ${generateActivityTableHeader()}
          <tbody>
            ${campaigns
				.map(
					campaign => `
            <tr>
              <td>${"cpgn_name" in campaign ? campaign.cpgn_name : campaign.bal_adj_id}</td>
              <td>${"cpgn_name" in campaign ? campaign.imp : ""}</td>
              <td>${"cpgn_name" in campaign ? campaign.cost : campaign.applied_amount}</td>
            </tr>`,
				)
				.join("")}
            ${
				isLastActivityPage
					? `
            <tr class="subtotal-row">
              <td></td>
              <td class="label" style="text-align: right;">${translations.subtotal}</td>
              <td class="value">${monthly_account_balance.total_ad_spend_adjusted}</td>
            </tr>
            <tr class="total-row">
              <td></td>
              <td class="label" style="text-align: right;">${translations.total}</td>
              <td class="value">${monthly_account_balance.total_ad_spend_adjusted}</td>
            </tr>`
					: ""
			}
          </tbody>
        </table>
      </div>
    </div>
    ${generatePageFooter()}
  </div>`;

			pageNumber++;
		});
	}

	if (paymentPages.length === 0) {
		pagesHtml += `
      <!-- Page ${pageNumber} -->
      <div class="page">
        ${generatePageHeader()}
        <div class="page-content">
          <div class="payments-received section">
            <table>
              ${generatePaymentsTableHeader()}
              <tbody>
              <tr class="subtotal-row">
                      <td></td>
                      <td style="text-align: right;">${translations.tax}</td>
                      <td>${total_tax}</td>
              </tr>
              <tr class="total-row">
                      <td></td>
                      <td class="label" style="text-align: right;">${
							translations.totalPaymentsReceived
						}</td>
                      <td class="value">${monthly_account_balance.total_payments_received}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
          `;
		pageNumber++;
	} else {
		paymentPages.forEach((pagePayments, pageIndex) => {
			const isLastPaymentPage = pageIndex === paymentPages.length - 1;

			pagesHtml += `
  <!-- Page ${pageNumber} -->
  <div class="page ${isLastPaymentPage ? "last-page" : ""}">
    ${generatePageHeader()}
    <div class="page-content">
      <div class="payments-received section">
        <table>
          ${generatePaymentsTableHeader()}
          <tbody>
            ${pagePayments
				.map(
					payment => `
            <tr>
              <td>${payment.paid_time}</td>
              <td>${payment.description}</td>
              <td>${payment.total_amount}</td>
            </tr>`,
				)
				.join("")}
            ${
				isLastPaymentPage
					? `
            <tr class="subtotal-row">
              <td></td>
              <td style="text-align: right;">${translations.tax}</td>
              <td>${total_tax}</td>
            </tr>
            <tr class="total-row">
              <td></td>
              <td class="label" style="text-align: right;">${translations.totalPaymentsReceived}</td>
              <td class="value">${monthly_account_balance.total_payments_received}</td>
            </tr>`
					: ""
			}
          </tbody>
        </table>
      </div>
    </div>
    ${generatePageFooter()}
  </div>`;

			pageNumber++;
		});
	}

	return pagesHtml;
}
