import { PAGE_HEIGHT } from "./h.0--consts";
import { PDFContext } from "./h.1--pdfContext";

export class BillingPDFContext extends PDFContext {
	public billingY: number;
	public billingPage: number;
	public paymentY: number;
	public paymentPage: number;

	constructor(
		/** Starts at the top of the page */
		pointerY: number = PAGE_HEIGHT,
		pointerX: number = 0,
		pageNo: number = 1,
		/** End of Billing Activity table: y position and page number */
		billingY: number = PAGE_HEIGHT,
		billingPage: number = 1,
		/** End of Payment table: y position and page number */
		paymentY: number = PAGE_HEIGHT,
		paymentPage: number = 1,
	) {
		super(pointerY, pointerX, pageNo);
		this.billingY = billingY;
		this.billingPage = billingPage;
		this.paymentY = paymentY;
		this.paymentPage = paymentPage;
	}

	getBillingY(): number {
		return this.billingY;
	}

	setBillingY(newValue: number): void {
		this.billingY = newValue;
	}

	getPaymentY(): number {
		return this.paymentY;
	}

	setPaymentY(newValue: number): void {
		this.paymentY = newValue;
	}

	getBillingPage(): number {
		return this.billingPage;
	}

	setBillingPage(newValue: number): void {
		this.billingPage = newValue;
	}

	getPaymentPage(): number {
		return this.paymentPage;
	}

	setPaymentPage(newValue: number): void {
		this.paymentPage = newValue;
	}
}
