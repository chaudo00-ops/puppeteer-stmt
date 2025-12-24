import { rgb } from "pdf-lib";
import {
	CELL_PADDING,
	COL_WIDTH_LG,
	COL_WIDTH_SM,
	DOC_HEADER_OFFSET,
	FONT_REG,
	LEFT_MARGIN,
	PAGE_WIDTH,
	SEC_HEADER_OFFSET,
	TBL_LINE_SPACING,
	TBL_ROW_HEIGHT,
	TEXT_COLOR,
	TEXT_SPACING,
	TEXT_SPACING_NARROW,
} from "./h.0--consts";
import { TInvoiceDetails_Display } from "./h.0--types";
import { PDFContext } from "./h.1--pdfContext";
import { PdfEditor } from "./h.2--pdfEditor";

export class InvoicePdfEditor extends PdfEditor<PDFContext> {
	protected invoice_details: TInvoiceDetails_Display;
	declare context: PDFContext;

	constructor(invoiceTitle: string, invoice_details: TInvoiceDetails_Display) {
		super(invoiceTitle); // Call the parent constructor
		this.invoice_details = invoice_details;
	}

	async init() {
		await super.init();
		this.context = new PDFContext();
		this.context.resetContextState();
		this.setMetaData();
	}

	drawInvoiceInfo() {
		const invoice_profile = this.invoice_details.payment;

		// Move to next line
		this.context.setY(this.context.Y - 1.5 * SEC_HEADER_OFFSET);
		this.documentPage.drawText(`Invoice number\t${invoice_profile.payment_id}`, {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interBold,
			color: TEXT_COLOR,
		});

		// Move to next line
		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);

		this.documentPage.drawText(`Date of issue\t`, {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interBold,
			color: TEXT_COLOR,
		});

		this.documentPage.drawText(`${invoice_profile.paid_time}`, {
			x: LEFT_MARGIN + this.interBold.widthOfTextAtSize(`Date of issue\t`, FONT_REG),
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		// Move to next line
		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText(`Date of paid\t`, {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interBold,
			color: TEXT_COLOR,
		});

		this.documentPage.drawText(`${invoice_profile.paid_time}`, {
			x: LEFT_MARGIN + this.interBold.widthOfTextAtSize(`Date of paid\t`, FONT_REG),
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});
	}

	drawBillingInfo() {
		this.context.setY(this.context.Y - 1.5 * SEC_HEADER_OFFSET);

		const startY = this.context.Y;
		// Draw Payee
		this.documentPage.drawText("Gan Jing World", {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interBold,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING);
		this.documentPage.drawText("33 Fulton Street", {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText("Middletown, New York 10940", {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText("United States", {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText("+1 833-849-0818", {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText("help@ganjingworld.com", {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		const endYLeft = this.context.Y;

		this.context.setY(startY);

		// Draw Payer
		const payer_profile = this.invoice_details.paymentProfile;

		// Move to next line
		this.context.setY(startY);

		const leftBoundary = Math.ceil(PAGE_WIDTH / 2) + LEFT_MARGIN;

		this.documentPage.drawText("Bill To", {
			x: leftBoundary,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interBold,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING);
		this.documentPage.drawText(payer_profile.payee_display_name, {
			x: leftBoundary,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText(payer_profile.email, {
			x: leftBoundary,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText(payer_profile.address_postal_code, {
			x: leftBoundary,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		this.documentPage.drawText(payer_profile.address_country, {
			x: leftBoundary,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		const endYRight = this.context.Y;
		const endY = endYLeft > endYRight ? endYLeft : endYRight;
		this.context.setY(endY);
	}

	drawInvoiceTable(): void {
		this.context.setY(this.context.Y - DOC_HEADER_OFFSET);

		// Draw table below details
		const payments = this.invoice_details.payment;

		const labelsKey = ["sub_acc_id", "tax", "paid_amount"] as const;
		const labelsName = ["Description", "Tax", "Amount"] as const;

		// Table settings
		/** Table Header */
		if (Object.keys(payments).length === 0) return;

		this.drawTableHeader(labelsName, "invoice");
		this.drawTableRow(payments, 1, labelsKey);
		this.drawHorizontalLine(false);

		// Draw Total Balance
		this.context.setY(this.context.Y - TEXT_SPACING);
		this.drawInvoiceTotal();
	}

	drawInvoiceTotal() {
		const payments = this.invoice_details.payment;

		let labelWidth = this.interLight.widthOfTextAtSize("Subtotal", FONT_REG);
		this.documentPage.drawText("Subtotal", {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.documentPage.drawText(payments.paid_amount, {
			x: LEFT_MARGIN + 2 * CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		labelWidth = this.interLight.widthOfTextAtSize("Tax", FONT_REG);
		this.documentPage.drawText("Tax", {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});
		this.documentPage.drawText(payments.tax, {
			x: LEFT_MARGIN + 2 * CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		labelWidth = this.interLight.widthOfTextAtSize("Total", FONT_REG);
		this.documentPage.drawText("Total", {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});
		this.documentPage.drawText(payments.total_amount, {
			x: LEFT_MARGIN + 2 * CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interLight,
			color: TEXT_COLOR,
		});

		this.context.setY(this.context.Y - TEXT_SPACING_NARROW);
		labelWidth = this.interSemiBold.widthOfTextAtSize("Amount Paid", FONT_REG);
		this.documentPage.drawText("Amount Paid", {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interSemiBold,
			color: TEXT_COLOR,
		});
		this.documentPage.drawText(`${payments.total_amount} USD`, {
			x: LEFT_MARGIN + 2 * CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_REG,
			font: this.interSemiBold,
			color: TEXT_COLOR,
		});
	}

	drawTableRow<T extends Record<string, any>>(
		row: T,
		rowIndex: number,
		labelsKey: readonly string[],
	) {
		// Alternate row background color
		const fillColor =
			rowIndex % 2 == 0
				? rgb(255 / 255, 255 / 255, 255 / 255)
				: rgb(241 / 255, 246 / 255, 252 / 255);

		let rowHeight = TBL_ROW_HEIGHT;
		let lineSpacing = TBL_ROW_HEIGHT;
		let rectangleHeight = TBL_ROW_HEIGHT;
		const lines: string[] = [];
		labelsKey.forEach((key, index) => {
			if (index == 0) {
				const value = row[key];
				const words: string[] = value.split(" ");

				let currentLine = "";
				words.forEach(word => {
					const testLine = currentLine !== "" ? `${currentLine} ${word}` : word;
					const width = this.interRegular.widthOfTextAtSize(testLine, FONT_REG);

					if (width < COL_WIDTH_LG - 2 * CELL_PADDING) {
						currentLine = testLine;
					} else {
						if (currentLine) lines.push(currentLine);
						currentLine = word;
					}
				});

				if (currentLine) lines.push(currentLine);

				if (lines.length > 1) {
					rowHeight = lines.length * TBL_LINE_SPACING;
				}

				// Draw cell background

				rectangleHeight = lines.length > 1 ? rowHeight + 20 : rowHeight;
				this.documentPage.drawRectangle({
					x: LEFT_MARGIN,
					y: this.context.Y + TBL_ROW_HEIGHT - rectangleHeight,
					width: COL_WIDTH_LG + 2 * COL_WIDTH_SM,
					height: rectangleHeight,
					color: fillColor,
					borderWidth: 0,
					borderColor: rgb(0, 0, 0),
				});

				// Draw text line
				lineSpacing = lines.length <= 1 ? TBL_ROW_HEIGHT : TBL_LINE_SPACING;
				lines.forEach(line => {
					this.documentPage.drawText(line, {
						x: LEFT_MARGIN + CELL_PADDING,
						y: this.context.Y + (TBL_ROW_HEIGHT - FONT_REG) / 2,
						size: FONT_REG,
						font: this.interRegular,
					});
					this.context.setY(this.context.Y - lineSpacing);
				});

				this.context.setY(this.context.Y + rowHeight);
			} else {
				const value = row[key];

				const x =
					index === 1
						? LEFT_MARGIN + COL_WIDTH_LG + CELL_PADDING
						: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM + CELL_PADDING;
				this.documentPage.drawText(`${value}`, {
					x,
					y: this.context.Y + (TBL_ROW_HEIGHT - FONT_REG) / 2, // Center in middle
					size: FONT_REG,
					font: this.interRegular,
					color: TEXT_COLOR,
				});
			}
		});

		if (lines.length > 1) {
			this.context.setY(this.context.Y - rectangleHeight + TBL_ROW_HEIGHT);
		} else {
			this.context.setY(this.context.Y);
		}
	}

	/** Set PDF metadata */
	setMetaData() {
		this.pdfDoc.setTitle("Invoice");
		this.pdfDoc.setAuthor("Ganjing World");
		this.pdfDoc.setSubject("Invoice");
		this.pdfDoc.setCreator("Ganjing World");
		this.pdfDoc.setProducer("Ganjing World");
	}
}
