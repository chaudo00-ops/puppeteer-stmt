import { rgb } from "pdf-lib";
import {
	CELL_PADDING,
	COL_WIDTH_LG,
	COL_WIDTH_MD,
	COL_WIDTH_SM,
	DOC_HEADER_OFFSET,
	FONT_H2,
	FONT_H3,
	FONT_REG,
	FONT_SM,
	LEFT_COLUMN_X,
	LEFT_MARGIN,
	PAGE_HEIGHT,
	PAGE_WIDTH,
	RIGHT_MARGIN,
	SEC_HEADER_OFFSET,
	TBL_LINE_SPACING,
	TBL_ROW_HEIGHT,
	TEXT_COLOR,
	TEXT_SPACING,
	TEXT_SPACING_NARROW,
} from "./h.0--consts";
import { TBillingStatementDetails_Display, TPdfTableName, TWrappedTextParams } from "./h.0--types";
import {
	getTranslations,
	TBillingStatementTranslations,
	TSupportedLanguage,
} from "./h.0--translations";
import { BillingPDFContext } from "./h.1.1--billingPdfContext";
import { PdfEditor } from "./h.2--pdfEditor";

export class BillingPdfEditor extends PdfEditor<BillingPDFContext> {
	protected statement_details: TBillingStatementDetails_Display;
	protected translations: TBillingStatementTranslations;

	declare context: BillingPDFContext;

	constructor(
		statementTitle: string,
		statement_details: TBillingStatementDetails_Display,
		language: TSupportedLanguage = "en",
	) {
		super(statementTitle, language); // Call the parent constructor with language
		this.statement_details = statement_details;
		this.translations = getTranslations(language);
	}

	async init() {
		await super.init();
		this.context = new BillingPDFContext();
		this.context.resetPdfState();
		this.setMetaData();
	}

	drawBillTo() {
		const payment_profile = this.statement_details.paymentProfile;
		// Move to next line
		this.context.setY(this.context.Y - SEC_HEADER_OFFSET);
		this.documentPage.drawText(this.translations.billTo, {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_H3,
			font: this.getFont("bold"),
			color: TEXT_COLOR,
		});

		// Move to next line
		this.context.setY(this.context.Y - TEXT_SPACING);

		this.documentPage.drawText(`${payment_profile.legal_name}`, {
			x: LEFT_MARGIN,
			y: this.context.Y,
			size: FONT_H3,
			font: this.getFont("light"),
			color: TEXT_COLOR,
		});

		if (payment_profile.type === "organization") {
			// Move to next line
			this.drawWrappedText({
				text: payment_profile.org_name ?? "",
				alignment: "left",
				leftBoundary: LEFT_MARGIN,
				rightBoundary: -1,
				textWidth: PAGE_WIDTH - RIGHT_MARGIN - LEFT_MARGIN - 100,
				font: this.getFont("light"),
				size: FONT_H3,
				spacing: TEXT_SPACING,
			});
		}

		// Move to next line
		this.context.setY(this.context.Y - TEXT_SPACING);
		this.documentPage.drawText(
			`${payment_profile.address_country}, ${payment_profile.address_postal_code}`,
			{
				x: LEFT_MARGIN,
				y: this.context.Y,
				size: FONT_REG,
				font: this.getFont("light"),
				color: TEXT_COLOR,
			},
		);
	}

	saveBillingContext() {
		this.context.setBillingY(this.context.Y);
		this.context.setBillingPage(this.context.getPageNo());
	}

	savePaymentContext() {
		this.context.setPaymentY(this.context.Y);
		this.context.setPaymentPage(this.context.getPageNo());
	}

	drawStatementDetails() {
		const payment_profile = this.statement_details.paymentProfile;
		const account = this.statement_details.account;
		const account_balance = this.statement_details.monthly_account_balance;

		const pointerYStart = this.context.Y;
		let pointerLeftEnd = pointerYStart;

		// Begins of left-column - Details  section
		// Draw section header
		this.context.setY(this.context.Y - SEC_HEADER_OFFSET);

		this.drawLeftAlignedText(this.translations.details, LEFT_MARGIN, this.getFont("semibold"), FONT_H3);

		this.context.setY(this.context.Y - TEXT_SPACING);

		// Statement details
		// Define the text lines as an array for easier processing
		const statementDetailsLines = [
			{
				label: this.translations.accountId,
				value: account.account_id,
			},

			{
				label: this.translations.paymentsProfile,
				value: payment_profile.pmt_prf_name,
			},
			{
				label: this.translations.paymentsProfileId,
				value: payment_profile.pmt_prf_id,
			},
			{
				label: this.translations.statementIssueDate,
				value: account_balance.created_time,
			},
		];
		// Draw each line
		statementDetailsLines.forEach(({ label, value }) => {
			// Draw labels and dashes
			const dashStart = this.drawLeftAlignedText(
				`${label}`,
				LEFT_MARGIN,
				this.getFont("regular"),
				FONT_REG,
			);

			// Draw regular value (after colon)
			const rightBoundary = Math.ceil(PAGE_WIDTH / 2.5);

			const textLength = this.getFont("regular").widthOfTextAtSize(`${value}`, FONT_REG);
			const overflowText = rightBoundary - textLength <= dashStart;

			let dashEnd = rightBoundary;

			if (!overflowText) {
				// If text stays on one line
				dashEnd = this.drawRightAlignedText(
					`${value}`,
					rightBoundary,
					this.getFont("regular"),
					FONT_REG,
				);
				this.drawDashedLine(dashStart, dashEnd, FONT_SM, this.getFont("regular"));
			} else {
				// If text needs to be wrapped on next line
				dashEnd = rightBoundary;

				this.drawDashedLine(dashStart, dashEnd, FONT_SM, this.getFont("regular"));

				if (typeof value !== "string" || !value) return;

				this.drawWrappedText({
					text: value,
					alignment: "right",
					leftBoundary: -1,
					rightBoundary: rightBoundary,
					textWidth: rightBoundary - 2 * LEFT_MARGIN,
					font: this.getFont("regular"),
					size: FONT_REG,
					spacing: TEXT_SPACING,
				});
			}

			// Move to next line
			this.context.setY(this.context.Y - TEXT_SPACING);
		});
		// Ends left-column - Details  section
		pointerLeftEnd = this.context.Y + TEXT_SPACING;

		// Begins right-column - Summary section
		// Draw statement header
		this.context.setY(pointerYStart - SEC_HEADER_OFFSET);

		const leftBoundary = LEFT_COLUMN_X;

		this.drawLeftAlignedText(
			`${this.translations.summaryFor} ${account_balance.billing_period_start} \u2013 ${account_balance.billing_period_end}`,
			leftBoundary,
			this.getFont("semibold"),
			FONT_H3,
		);

		this.context.setY(this.context.Y - TEXT_SPACING);

		// Statement Summary
		// Define the text lines as an array for easier processing
		const statementSummaryLines = [
			{
				label: this.translations.openingBalance,
				value: account_balance.opening_balance,
			},

			{
				label: this.translations.totalAdSpend,
				value: account_balance.total_ad_spend,
			},
			{
				label: this.translations.totalPaymentsReceived,
				value: account_balance.total_payments_received,
			},
			{
				label: this.translations.closingBalance,
				value: account_balance.closing_balance,
			},
		];
		// Draw each line
		statementSummaryLines.forEach(({ label, value }) => {
			// Draw labels and dashes
			const dashStart = this.drawLeftAlignedText(
				`${label}`,
				leftBoundary,
				this.getFont("regular"),
				FONT_REG,
			);

			// Draw regular value (after colon)
			const rightBoundary = PAGE_WIDTH - 40;

			const dashEnd = this.drawRightAlignedText(
				`${value}`,
				rightBoundary,
				this.getFont("regular"),
				FONT_REG,
			);

			this.drawDashedLine(dashStart, dashEnd, FONT_SM, this.getFont("regular"));
			// Move to next line
			this.context.setY(this.context.Y - TEXT_SPACING);
			// Ends right-column - Summary section
		});

		const endY = this.context.Y < pointerLeftEnd ? this.context.Y : pointerLeftEnd;
		this.context.setY(endY);

		return;
	}

	drawActivityTable() {
		// Draw table below details
		const transactionTable = this.statement_details.monthly_campaign_spends;
		const labelsKey: readonly (keyof Pick<
			TFields_v2_monthly_campaign_spend_ui,
			"cpgn_name" | "imp" | "cost"
		>)[] = ["cpgn_name", "imp", "cost"] as const;

		const labelsName = [this.translations.description, this.translations.impressions, this.translations.amount] as const;

		// Table settings
		/** Table Header */
		let isHeader = true;

		if (transactionTable.length === 0) return;
		transactionTable.forEach((row, rowIndex) => {
			// Predict the row height in the soon to be drawn table row
			const rowHeight = this.predictRowHeight(row, labelsKey[0]);

			if (this.context.Y - rowHeight < 0) {
				this.context.setY(this.context.Y + TBL_ROW_HEIGHT);
				this.beginNewPage();
				this.context.setY(PAGE_HEIGHT - DOC_HEADER_OFFSET);
				isHeader = true;
			}

			// Draw Header
			if (isHeader) {
				// Document Header + Activity Details
				if (rowIndex == 0) {
					this.context.setY(this.context.Y - 2 * TEXT_SPACING_NARROW);
				} else {
					this.context.setY(this.context.Y - SEC_HEADER_OFFSET - TEXT_SPACING_NARROW);
				}
				this.documentPage.drawText(this.translations.activityDetails, {
					x: LEFT_MARGIN,
					y: this.context.Y,
					size: FONT_H3,
					font: this.getFont("bold"),
					color: TEXT_COLOR,
				});

				// Table Headers
				this.context.setY(this.context.Y - 2 * TEXT_SPACING);
				this.drawTableHeader(labelsName, "activity");
				isHeader = false;
			}

			// Draw cell text
			this.drawTableRow(row, rowIndex, labelsKey, "activity");
		});

		// Draw total balance
		if (this.context.Y < 30) {
			this.context.setY(this.context.Y + TBL_ROW_HEIGHT);
			this.beginNewPage();
			isHeader = true;
		}

		// Document Header + Activity Details
		if (isHeader) {
			// If Total Balance is the only thing on the new page
			this.context.setY(this.context.Y - SEC_HEADER_OFFSET - TEXT_SPACING_NARROW);
			this.documentPage.drawText(this.translations.activityDetails, {
				x: LEFT_MARGIN,
				y: this.context.Y,
				size: FONT_H3,
				font: this.getFont("bold"),
				color: TEXT_COLOR,
			});
			this.context.setY(this.context.Y - TEXT_SPACING);
			this.drawHorizontalLine(false);
		} else {
			// If total balance has some table rows before it
			this.context.setY(this.context.Y + TBL_ROW_HEIGHT);
			this.drawHorizontalLine(false);
		}
		// Draw Total Balance
		this.context.setY(this.context.Y - TEXT_SPACING);
		this.drawTotalSpendingBalance();
	}

	drawPaymentsReceived() {
		const paymentTable = this.statement_details.payments;
		const labelsKey: readonly (keyof TFields_v2_payments)[] = [
			"paid_time",
			"description",
			"total_amount",
		] as const;
		const labelsName = [this.translations.date, this.translations.description, this.translations.amount] as const;

		// Table settings
		let isHeader = true;

		this.addPageAndDrawHeader();

		// If there is no payments
		if (paymentTable.length === 0) {
			// Document Header + Payments Received
			this.context.setY(
				PAGE_HEIGHT - DOC_HEADER_OFFSET - SEC_HEADER_OFFSET - TEXT_SPACING_NARROW,
			);

			this.documentPage.drawText(this.translations.paymentsReceived, {
				x: LEFT_MARGIN,
				y: this.context.Y,
				size: FONT_H3,
				font: this.getFont("semibold"),
				color: TEXT_COLOR,
			});
			this.context.setY(this.context.Y - 2 * TEXT_SPACING);
		}

		paymentTable.forEach((row, rowIndex) => {
			// Predict the row height in the soon to be drawn table row
			const rowHeight = this.predictRowHeight(row, labelsKey[0]);

			if (this.context.Y - rowHeight < 0) {
				this.context.setY(this.context.Y + TBL_ROW_HEIGHT);
				this.beginNewPage();
				isHeader = true;
			}

			// Draw Header
			if (isHeader) {
				// Document Header + Payments Received
				this.context.setY(
					PAGE_HEIGHT - DOC_HEADER_OFFSET - SEC_HEADER_OFFSET - TEXT_SPACING_NARROW,
				);

				this.documentPage.drawText(this.translations.paymentsReceived, {
					x: LEFT_MARGIN,
					y: this.context.Y,
					size: FONT_H3,
					font: this.getFont("semibold"),
					color: TEXT_COLOR,
				});

				// Table Header
				this.context.setY(this.context.Y - 2 * TEXT_SPACING);
				this.drawTableHeader(labelsName, "payments");
				isHeader = false;
			}

			// Draw table row
			this.drawTableRow(row, rowIndex, labelsKey, "payments");
		});

		// Draw total balance
		if (this.context.Y < 30) {
			this.context.setY(this.context.Y + TBL_ROW_HEIGHT);
			this.beginNewPage();
			isHeader = true;
		}

		if (isHeader) {
			// If Total Payments Received is the only thing on a new page
			this.context.setY(
				PAGE_HEIGHT - DOC_HEADER_OFFSET - SEC_HEADER_OFFSET - TEXT_SPACING_NARROW,
			);

			this.documentPage.drawText(this.translations.paymentsReceived, {
				x: LEFT_MARGIN,
				y: this.context.Y,
				size: FONT_H3,
				font: this.getFont("semibold"),
				color: TEXT_COLOR,
			});
			this.context.setY(this.context.Y - TEXT_SPACING);

			this.drawHorizontalLine(false);
		} else {
			// If total balance has some table rows before it
			this.context.setY(this.context.Y + TBL_ROW_HEIGHT);
			this.drawHorizontalLine(false);
		}
		// Draw Total Payments Received
		this.context.setY(this.context.Y - TEXT_SPACING);
		this.drawTotalPaymentsReceived();
	}

	drawTotalSpendingBalance() {
		// Table settings
		const account_balance = this.statement_details.monthly_account_balance;

		// Draw Current balance , Payment and Total
		const subtotalFont = this.getFont("regular");
		let labelWidth = subtotalFont.widthOfTextAtSize(this.translations.subtotal, FONT_REG);
		this.documentPage.drawText(this.translations.subtotal, {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y, // Center in middle
			size: FONT_REG,
			font: subtotalFont,
			color: TEXT_COLOR,
		});

		this.documentPage.drawText(account_balance.total_ad_spend_adjusted, {
			x: LEFT_MARGIN + CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_REG,
			font: subtotalFont,
			color: TEXT_COLOR,
		});

		this.drawHorizontalLine();
		this.context.setY(this.context.Y - TEXT_SPACING);

		const totalFont = this.getFont("semibold");
		labelWidth = totalFont.widthOfTextAtSize(this.translations.total, FONT_REG);
		this.documentPage.drawText(this.translations.total, {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y,
			size: FONT_REG,
			font: totalFont,
			color: TEXT_COLOR,
		});
		this.documentPage.drawText(account_balance.total_ad_spend_adjusted, {
			x: LEFT_MARGIN + CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_H2,
			font: totalFont,
			color: TEXT_COLOR,
		});
	}

	drawTotalPaymentsReceived() {
		const account_balance = this.statement_details.monthly_account_balance;

		const taxFont = this.getFont("regular");
		let labelWidth = taxFont.widthOfTextAtSize(this.translations.tax, FONT_REG);
		this.documentPage.drawText(this.translations.tax, {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y,
			size: FONT_REG,
			font: taxFont,
			color: TEXT_COLOR,
		});

		this.documentPage.drawText(this.statement_details.total_tax, {
			x: LEFT_MARGIN + 2 * CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_REG,
			font: taxFont,
			color: TEXT_COLOR,
		});

		this.drawHorizontalLine();
		this.context.setY(this.context.Y - TEXT_SPACING);

		const totalPaymentFont = this.getFont("semibold");
		labelWidth = totalPaymentFont.widthOfTextAtSize(this.translations.totalPaymentsReceived, FONT_REG);
		this.documentPage.drawText(this.translations.totalPaymentsReceived, {
			x: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM - labelWidth,
			y: this.context.Y,
			size: FONT_REG,
			font: totalPaymentFont,
			color: TEXT_COLOR,
		});
		this.documentPage.drawText(account_balance.total_payments_received, {
			x: LEFT_MARGIN + 2 * CELL_PADDING + COL_WIDTH_LG + COL_WIDTH_SM,
			y: this.context.Y,
			size: FONT_H2,
			font: totalPaymentFont,
			color: TEXT_COLOR,
		});
	}

	/** Sub-class function */
	drawTableRow<T extends Record<string, any>>(
		row: T,
		rowIndex: number,
		labelsKey: readonly string[],
		tableName: TPdfTableName,
	) {
		// Alternate row background color
		const wrappedWidth =
			tableName === "payments"
				? COL_WIDTH_MD - 2 * CELL_PADDING
				: COL_WIDTH_LG - 2 * CELL_PADDING;

		const fillColor =
			rowIndex % 2 == 0
				? rgb(255 / 255, 255 / 255, 255 / 255)
				: rgb(241 / 255, 246 / 255, 252 / 255);

		let rowHeight = TBL_ROW_HEIGHT;
		let lineSpacing = TBL_ROW_HEIGHT;
		const lines: string[] = [];

		labelsKey.forEach((key, index) => {
			// Handle wrapping text to next line logic for Activity table Description column
			if (index == 0) {
				const words: string[] = row[key].split(" ");

				let currentLine = "";
				words.forEach(word => {
					const testLine = currentLine !== "" ? `${currentLine} ${word}` : word;
					const width = this.interRegular.widthOfTextAtSize(testLine, FONT_SM);

					if (width < wrappedWidth) {
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

				// Draw rectangle cell background
				const rectangleHeight = lines.length > 1 ? rowHeight + 20 : rowHeight;
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
						y: this.context.Y + (TBL_ROW_HEIGHT - FONT_SM) / 2,
						size: FONT_SM,
						font: this.getFont("regular"),
					});
					this.context.setY(this.context.Y - lineSpacing);
				});

				this.context.setY(this.context.Y + rowHeight);
			} else {
				const value = row[key];
				const x =
					tableName === "payments"
						? LEFT_MARGIN + index * COL_WIDTH_MD + CELL_PADDING // payments table has equal column width
						: index === 1 // activity table column #1 has large width
							? LEFT_MARGIN + COL_WIDTH_LG + CELL_PADDING // activity table column #2, #3 have small width
							: LEFT_MARGIN + COL_WIDTH_LG + COL_WIDTH_SM + CELL_PADDING;
				this.documentPage.drawText(`${value}`, {
					x,
					y: this.context.Y + (TBL_ROW_HEIGHT - FONT_SM) / 2, // Center in middle
					size: FONT_SM,
					font: this.getFont("regular"),
					color: TEXT_COLOR,
				});
			}
		});

		if (lines.length > 1) {
			this.context.setY(this.context.Y - rowHeight - 20);
		} else {
			this.context.setY(this.context.Y - rowHeight);
		}
	}

	drawWrappedText(params: TWrappedTextParams) {
		const { text, alignment, leftBoundary, rightBoundary, textWidth, font, size, spacing } =
			params;
		const words = text.split(" ");
		const lines = [];
		let currentLine = "";

		words.forEach(word => {
			/** Temporary variable to estimate the line length after adding the current word */
			const testLine = currentLine !== "" ? `${currentLine} ${word}` : word;
			const width = font.widthOfTextAtSize(testLine, size);

			if (width < textWidth) {
				currentLine = testLine;
			} else {
				if (currentLine) lines.push(currentLine);
				currentLine = word;
			}
		});

		if (currentLine) lines.push(currentLine);

		lines.forEach(line => {
			this.context.setY(this.context.Y - spacing);
			switch (alignment) {
				case "left":
					this.drawLeftAlignedText(line, leftBoundary, font, size);
					break;
				case "right":
					this.drawRightAlignedText(line, rightBoundary, font, size);
					break;
				default:
					const _exhaustiveCheck: never = alignment;
					throw new Error(`internalErr: (EFA203) invalid alignment ${_exhaustiveCheck}`);
			}
		});

		return lines.length * spacing;
	}
	/** @returns The x position where the text ends */
	drawLeftAlignedText(
		text: string,
		leftBoundary: number,
		font = this.getFont("regular"),
		size = FONT_SM,
	) {
		const textWidth = font.widthOfTextAtSize(text, size);

		this.documentPage.drawText(text, {
			x: leftBoundary,
			y: this.context.Y,
			size,
			font,
			color: TEXT_COLOR,
		});

		return leftBoundary + textWidth;
	}

	/** @returns The x position where the text starts */
	drawRightAlignedText(
		text: string,
		rightBoundary: number,
		font = this.getFont("regular"),
		size = FONT_SM,
	) {
		const textWidth = font.widthOfTextAtSize(text, size);
		const x = rightBoundary - textWidth;
		this.documentPage.drawText(text, {
			x,
			y: this.context.Y,
			size,
			font,
			color: TEXT_COLOR,
		});
		return x;
	}

	predictRowHeight<T extends Record<string, any>>(row: T, label: string) {
		let rowHeight = TBL_ROW_HEIGHT;
		const words: string[] = row[label].split(" ");
		let currentLine = "";
		const lines = [];

		words.forEach(word => {
			const testLine = currentLine !== "" ? `${currentLine} ${word}` : word;
			const width = this.getFont("regular").widthOfTextAtSize(testLine, FONT_SM);

			if (width <= COL_WIDTH_LG) {
				currentLine = testLine;
			} else {
				if (currentLine) lines.push(currentLine);
				currentLine = word;
			}
		});

		if (currentLine) lines.push(currentLine);

		if (lines.length > 1) {
			rowHeight = lines.length * TBL_LINE_SPACING + 20;
		}
		return rowHeight;
	}

	beginNewPage() {
		this.drawHorizontalLine(false);
		this.addPageAndDrawHeader();
	}

	drawDashedLine(
		leftBoundary: number,
		rightBoundary: number,
		size = FONT_SM,
		font = this.getFont("regular"),
	) {
		const height = font.heightAtSize(size);
		this.documentPage.drawLine({
			start: { x: leftBoundary + 2, y: this.context.Y + 0.25 * height }, // Start 1 fontSize below title
			end: { x: rightBoundary - 2, y: this.context.Y + 0.25 * height }, // End near right edge
			thickness: 1,
			color: TEXT_COLOR, // Same blue as text
			opacity: 1,
			dashArray: [2, 1], // 5 units dash, 5 units gap
			dashPhase: 0,
		});
	}

	/** Set PDF metadata */
	setMetaData() {
		this.pdfDoc.setTitle("Billing Statement");
		this.pdfDoc.setAuthor("Ganjing World");
		this.pdfDoc.setSubject("Billing Statement");
		this.pdfDoc.setCreator("Ganjing World");
		this.pdfDoc.setProducer("Ganjing World");
	}
}
