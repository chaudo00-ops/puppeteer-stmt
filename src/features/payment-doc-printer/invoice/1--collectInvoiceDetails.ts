import type { TInvoiceDetails } from "../helpers/h.0--types";

export async function collectInvoiceDetails(): Promise<TInvoiceDetails> {
  const res: TInvoiceDetails = {
    paymentProfile: {
      type: "individual",
      legal_name: "John Smith",
      org_name: "Shen Yun",
      email: "tester@ganjing.com",
      address_postal_code: "10940",
      address_country: "US",
    },
    payment: {
      payment_id: "p_6mTtPJ5xzQH8G954VQRB87",
      sub_acc_id: "b_25x4HMhX_1731613358261",
      total_amount: "5078400",
      tax: "0",
      paid_time: "2025-07-16T20:00:00.988Z",
      paid_amount: "5078400",
    },
    account: {
      advertiser_time_zone_name: "America/New_York",
      account_id: 2101715886,
    },
  };
  return res;
}
