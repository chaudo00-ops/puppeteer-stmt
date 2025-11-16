"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingPdfEditor = void 0;
const pdf_lib_1 = require("pdf-lib");
const h_0__consts_1 = require("./h.0--consts");
const h_0__translations_1 = require("./h.0--translations");
const h_1_1__billingPdfContext_1 = require("./h.1.1--billingPdfContext");
const h_2__pdfEditor_1 = require("./h.2--pdfEditor");
class BillingPdfEditor extends h_2__pdfEditor_1.PdfEditor {
    constructor(statementTitle, statement_details, language = "en") {
        super(statementTitle, language); // Call the parent constructor with language
        this.statement_details = statement_details;
        this.translations = (0, h_0__translations_1.getTranslations)(language);
    }
    async init() {
        await super.init();
        this.context = new h_1_1__billingPdfContext_1.BillingPDFContext();
        this.context.resetPdfState();
        this.setMetaData();
    }
    drawBillTo() {
        const payment_profile = this.statement_details.paymentProfile;
        // Move to next line
        this.context.setY(this.context.Y - h_0__consts_1.SEC_HEADER_OFFSET);
        this.documentPage.drawText(this.translations.billTo, {
            x: h_0__consts_1.LEFT_MARGIN,
            y: this.context.Y,
            size: h_0__consts_1.FONT_H3,
            font: this.getFont("bold"),
            color: h_0__consts_1.TEXT_COLOR,
        });
        // Move to next line
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
        this.documentPage.drawText(`${payment_profile.legal_name}`, {
            x: h_0__consts_1.LEFT_MARGIN,
            y: this.context.Y,
            size: h_0__consts_1.FONT_H3,
            font: this.getFont("light"),
            color: h_0__consts_1.TEXT_COLOR,
        });
        if (payment_profile.type === "organization") {
            // Move to next line
            this.drawWrappedText({
                text: payment_profile.org_name ?? "",
                alignment: "left",
                leftBoundary: h_0__consts_1.LEFT_MARGIN,
                rightBoundary: -1,
                textWidth: h_0__consts_1.PAGE_WIDTH - h_0__consts_1.RIGHT_MARGIN - h_0__consts_1.LEFT_MARGIN - 100,
                font: this.getFont("light"),
                size: h_0__consts_1.FONT_H3,
                spacing: h_0__consts_1.TEXT_SPACING,
            });
        }
        // Move to next line
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
        this.documentPage.drawText(`${payment_profile.address_country}, ${payment_profile.address_postal_code}`, {
            x: h_0__consts_1.LEFT_MARGIN,
            y: this.context.Y,
            size: h_0__consts_1.FONT_REG,
            font: this.getFont("light"),
            color: h_0__consts_1.TEXT_COLOR,
        });
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
        this.context.setY(this.context.Y - h_0__consts_1.SEC_HEADER_OFFSET);
        this.drawLeftAlignedText(this.translations.details, h_0__consts_1.LEFT_MARGIN, this.getFont("semibold"), h_0__consts_1.FONT_H3);
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
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
            const dashStart = this.drawLeftAlignedText(`${label}`, h_0__consts_1.LEFT_MARGIN, this.getFont("regular"), h_0__consts_1.FONT_REG);
            // Draw regular value (after colon)
            const rightBoundary = Math.ceil(h_0__consts_1.PAGE_WIDTH / 2.5);
            const textLength = this.getFont("regular").widthOfTextAtSize(`${value}`, h_0__consts_1.FONT_REG);
            const overflowText = rightBoundary - textLength <= dashStart;
            let dashEnd = rightBoundary;
            if (!overflowText) {
                // If text stays on one line
                dashEnd = this.drawRightAlignedText(`${value}`, rightBoundary, this.getFont("regular"), h_0__consts_1.FONT_REG);
                this.drawDashedLine(dashStart, dashEnd, h_0__consts_1.FONT_SM, this.getFont("regular"));
            }
            else {
                // If text needs to be wrapped on next line
                dashEnd = rightBoundary;
                this.drawDashedLine(dashStart, dashEnd, h_0__consts_1.FONT_SM, this.getFont("regular"));
                if (typeof value !== "string" || !value)
                    return;
                this.drawWrappedText({
                    text: value,
                    alignment: "right",
                    leftBoundary: -1,
                    rightBoundary: rightBoundary,
                    textWidth: rightBoundary - 2 * h_0__consts_1.LEFT_MARGIN,
                    font: this.getFont("regular"),
                    size: h_0__consts_1.FONT_REG,
                    spacing: h_0__consts_1.TEXT_SPACING,
                });
            }
            // Move to next line
            this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
        });
        // Ends left-column - Details  section
        pointerLeftEnd = this.context.Y + h_0__consts_1.TEXT_SPACING;
        // Begins right-column - Summary section
        // Draw statement header
        this.context.setY(pointerYStart - h_0__consts_1.SEC_HEADER_OFFSET);
        const leftBoundary = h_0__consts_1.LEFT_COLUMN_X;
        this.drawLeftAlignedText(`${this.translations.summaryFor} ${account_balance.billing_period_start} \u2013 ${account_balance.billing_period_end}`, leftBoundary, this.getFont("semibold"), h_0__consts_1.FONT_H3);
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
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
            const dashStart = this.drawLeftAlignedText(`${label}`, leftBoundary, this.getFont("regular"), h_0__consts_1.FONT_REG);
            // Draw regular value (after colon)
            const rightBoundary = h_0__consts_1.PAGE_WIDTH - 40;
            const dashEnd = this.drawRightAlignedText(`${value}`, rightBoundary, this.getFont("regular"), h_0__consts_1.FONT_REG);
            this.drawDashedLine(dashStart, dashEnd, h_0__consts_1.FONT_SM, this.getFont("regular"));
            // Move to next line
            this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
            // Ends right-column - Summary section
        });
        const endY = this.context.Y < pointerLeftEnd ? this.context.Y : pointerLeftEnd;
        this.context.setY(endY);
        return;
    }
    drawActivityTable() {
        // Draw table below details
        const transactionTable = this.statement_details.monthly_campaign_spends;
        const labelsKey = ["cpgn_name", "imp", "cost"];
        const labelsName = [this.translations.description, this.translations.impressions, this.translations.amount];
        // Table settings
        /** Table Header */
        let isHeader = true;
        if (transactionTable.length === 0)
            return;
        transactionTable.forEach((row, rowIndex) => {
            // Predict the row height in the soon to be drawn table row
            const rowHeight = this.predictRowHeight(row, labelsKey[0]);
            if (this.context.Y - rowHeight < 0) {
                this.context.setY(this.context.Y + h_0__consts_1.TBL_ROW_HEIGHT);
                this.beginNewPage();
                this.context.setY(h_0__consts_1.PAGE_HEIGHT - h_0__consts_1.DOC_HEADER_OFFSET);
                isHeader = true;
            }
            // Draw Header
            if (isHeader) {
                // Document Header + Activity Details
                if (rowIndex == 0) {
                    this.context.setY(this.context.Y - 2 * h_0__consts_1.TEXT_SPACING_NARROW);
                }
                else {
                    this.context.setY(this.context.Y - h_0__consts_1.SEC_HEADER_OFFSET - h_0__consts_1.TEXT_SPACING_NARROW);
                }
                this.documentPage.drawText(this.translations.activityDetails, {
                    x: h_0__consts_1.LEFT_MARGIN,
                    y: this.context.Y,
                    size: h_0__consts_1.FONT_H3,
                    font: this.getFont("bold"),
                    color: h_0__consts_1.TEXT_COLOR,
                });
                // Table Headers
                this.context.setY(this.context.Y - 2 * h_0__consts_1.TEXT_SPACING);
                this.drawTableHeader(labelsName, "activity");
                isHeader = false;
            }
            // Draw cell text
            this.drawTableRow(row, rowIndex, labelsKey, "activity");
        });
        // Draw total balance
        if (this.context.Y < 30) {
            this.context.setY(this.context.Y + h_0__consts_1.TBL_ROW_HEIGHT);
            this.beginNewPage();
            isHeader = true;
        }
        // Document Header + Activity Details
        if (isHeader) {
            // If Total Balance is the only thing on the new page
            this.context.setY(this.context.Y - h_0__consts_1.SEC_HEADER_OFFSET - h_0__consts_1.TEXT_SPACING_NARROW);
            this.documentPage.drawText(this.translations.activityDetails, {
                x: h_0__consts_1.LEFT_MARGIN,
                y: this.context.Y,
                size: h_0__consts_1.FONT_H3,
                font: this.getFont("bold"),
                color: h_0__consts_1.TEXT_COLOR,
            });
            this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
            this.drawHorizontalLine(false);
        }
        else {
            // If total balance has some table rows before it
            this.context.setY(this.context.Y + h_0__consts_1.TBL_ROW_HEIGHT);
            this.drawHorizontalLine(false);
        }
        // Draw Total Balance
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
        this.drawTotalSpendingBalance();
    }
    drawPaymentsReceived() {
        const paymentTable = this.statement_details.payments;
        const labelsKey = [
            "paid_time",
            "description",
            "total_amount",
        ];
        const labelsName = [this.translations.date, this.translations.description, this.translations.amount];
        // Table settings
        let isHeader = true;
        this.addPageAndDrawHeader();
        // If there is no payments
        if (paymentTable.length === 0) {
            // Document Header + Payments Received
            this.context.setY(h_0__consts_1.PAGE_HEIGHT - h_0__consts_1.DOC_HEADER_OFFSET - h_0__consts_1.SEC_HEADER_OFFSET - h_0__consts_1.TEXT_SPACING_NARROW);
            this.documentPage.drawText(this.translations.paymentsReceived, {
                x: h_0__consts_1.LEFT_MARGIN,
                y: this.context.Y,
                size: h_0__consts_1.FONT_H3,
                font: this.getFont("semibold"),
                color: h_0__consts_1.TEXT_COLOR,
            });
            this.context.setY(this.context.Y - 2 * h_0__consts_1.TEXT_SPACING);
        }
        paymentTable.forEach((row, rowIndex) => {
            // Predict the row height in the soon to be drawn table row
            const rowHeight = this.predictRowHeight(row, labelsKey[0]);
            if (this.context.Y - rowHeight < 0) {
                this.context.setY(this.context.Y + h_0__consts_1.TBL_ROW_HEIGHT);
                this.beginNewPage();
                isHeader = true;
            }
            // Draw Header
            if (isHeader) {
                // Document Header + Payments Received
                this.context.setY(h_0__consts_1.PAGE_HEIGHT - h_0__consts_1.DOC_HEADER_OFFSET - h_0__consts_1.SEC_HEADER_OFFSET - h_0__consts_1.TEXT_SPACING_NARROW);
                this.documentPage.drawText(this.translations.paymentsReceived, {
                    x: h_0__consts_1.LEFT_MARGIN,
                    y: this.context.Y,
                    size: h_0__consts_1.FONT_H3,
                    font: this.getFont("semibold"),
                    color: h_0__consts_1.TEXT_COLOR,
                });
                // Table Header
                this.context.setY(this.context.Y - 2 * h_0__consts_1.TEXT_SPACING);
                this.drawTableHeader(labelsName, "payments");
                isHeader = false;
            }
            // Draw table row
            this.drawTableRow(row, rowIndex, labelsKey, "payments");
        });
        // Draw total balance
        if (this.context.Y < 30) {
            this.context.setY(this.context.Y + h_0__consts_1.TBL_ROW_HEIGHT);
            this.beginNewPage();
            isHeader = true;
        }
        if (isHeader) {
            // If Total Payments Received is the only thing on a new page
            this.context.setY(h_0__consts_1.PAGE_HEIGHT - h_0__consts_1.DOC_HEADER_OFFSET - h_0__consts_1.SEC_HEADER_OFFSET - h_0__consts_1.TEXT_SPACING_NARROW);
            this.documentPage.drawText(this.translations.paymentsReceived, {
                x: h_0__consts_1.LEFT_MARGIN,
                y: this.context.Y,
                size: h_0__consts_1.FONT_H3,
                font: this.getFont("semibold"),
                color: h_0__consts_1.TEXT_COLOR,
            });
            this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
            this.drawHorizontalLine(false);
        }
        else {
            // If total balance has some table rows before it
            this.context.setY(this.context.Y + h_0__consts_1.TBL_ROW_HEIGHT);
            this.drawHorizontalLine(false);
        }
        // Draw Total Payments Received
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
        this.drawTotalPaymentsReceived();
    }
    drawTotalSpendingBalance() {
        // Table settings
        const account_balance = this.statement_details.monthly_account_balance;
        // Draw Current balance , Payment and Total
        const subtotalFont = this.getFont("regular");
        let labelWidth = subtotalFont.widthOfTextAtSize(this.translations.subtotal, h_0__consts_1.FONT_REG);
        this.documentPage.drawText(this.translations.subtotal, {
            x: h_0__consts_1.LEFT_MARGIN + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM - labelWidth,
            y: this.context.Y,
            size: h_0__consts_1.FONT_REG,
            font: subtotalFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
        this.documentPage.drawText(account_balance.total_ad_spend_adjusted, {
            x: h_0__consts_1.LEFT_MARGIN + h_0__consts_1.CELL_PADDING + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM,
            y: this.context.Y,
            size: h_0__consts_1.FONT_REG,
            font: subtotalFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
        this.drawHorizontalLine();
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
        const totalFont = this.getFont("semibold");
        labelWidth = totalFont.widthOfTextAtSize(this.translations.total, h_0__consts_1.FONT_REG);
        this.documentPage.drawText(this.translations.total, {
            x: h_0__consts_1.LEFT_MARGIN + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM - labelWidth,
            y: this.context.Y,
            size: h_0__consts_1.FONT_REG,
            font: totalFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
        this.documentPage.drawText(account_balance.total_ad_spend_adjusted, {
            x: h_0__consts_1.LEFT_MARGIN + h_0__consts_1.CELL_PADDING + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM,
            y: this.context.Y,
            size: h_0__consts_1.FONT_H2,
            font: totalFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
    }
    drawTotalPaymentsReceived() {
        const account_balance = this.statement_details.monthly_account_balance;
        const taxFont = this.getFont("regular");
        let labelWidth = taxFont.widthOfTextAtSize(this.translations.tax, h_0__consts_1.FONT_REG);
        this.documentPage.drawText(this.translations.tax, {
            x: h_0__consts_1.LEFT_MARGIN + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM - labelWidth,
            y: this.context.Y,
            size: h_0__consts_1.FONT_REG,
            font: taxFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
        this.documentPage.drawText(this.statement_details.total_tax, {
            x: h_0__consts_1.LEFT_MARGIN + 2 * h_0__consts_1.CELL_PADDING + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM,
            y: this.context.Y,
            size: h_0__consts_1.FONT_REG,
            font: taxFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
        this.drawHorizontalLine();
        this.context.setY(this.context.Y - h_0__consts_1.TEXT_SPACING);
        const totalPaymentFont = this.getFont("semibold");
        labelWidth = totalPaymentFont.widthOfTextAtSize(this.translations.totalPaymentsReceived, h_0__consts_1.FONT_REG);
        this.documentPage.drawText(this.translations.totalPaymentsReceived, {
            x: h_0__consts_1.LEFT_MARGIN + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM - labelWidth,
            y: this.context.Y,
            size: h_0__consts_1.FONT_REG,
            font: totalPaymentFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
        this.documentPage.drawText(account_balance.total_payments_received, {
            x: h_0__consts_1.LEFT_MARGIN + 2 * h_0__consts_1.CELL_PADDING + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM,
            y: this.context.Y,
            size: h_0__consts_1.FONT_H2,
            font: totalPaymentFont,
            color: h_0__consts_1.TEXT_COLOR,
        });
    }
    /** Sub-class function */
    drawTableRow(row, rowIndex, labelsKey, tableName) {
        // Alternate row background color
        const wrappedWidth = tableName === "payments"
            ? h_0__consts_1.COL_WIDTH_MD - 2 * h_0__consts_1.CELL_PADDING
            : h_0__consts_1.COL_WIDTH_LG - 2 * h_0__consts_1.CELL_PADDING;
        const fillColor = rowIndex % 2 == 0
            ? (0, pdf_lib_1.rgb)(255 / 255, 255 / 255, 255 / 255)
            : (0, pdf_lib_1.rgb)(241 / 255, 246 / 255, 252 / 255);
        let rowHeight = h_0__consts_1.TBL_ROW_HEIGHT;
        let lineSpacing = h_0__consts_1.TBL_ROW_HEIGHT;
        const lines = [];
        labelsKey.forEach((key, index) => {
            // Handle wrapping text to next line logic for Activity table Description column
            if (index == 0) {
                const words = row[key].split(" ");
                let currentLine = "";
                words.forEach(word => {
                    const testLine = currentLine !== "" ? `${currentLine} ${word}` : word;
                    const width = this.interRegular.widthOfTextAtSize(testLine, h_0__consts_1.FONT_SM);
                    if (width < wrappedWidth) {
                        currentLine = testLine;
                    }
                    else {
                        if (currentLine)
                            lines.push(currentLine);
                        currentLine = word;
                    }
                });
                if (currentLine)
                    lines.push(currentLine);
                if (lines.length > 1) {
                    rowHeight = lines.length * h_0__consts_1.TBL_LINE_SPACING;
                }
                // Draw rectangle cell background
                const rectangleHeight = lines.length > 1 ? rowHeight + 20 : rowHeight;
                this.documentPage.drawRectangle({
                    x: h_0__consts_1.LEFT_MARGIN,
                    y: this.context.Y + h_0__consts_1.TBL_ROW_HEIGHT - rectangleHeight,
                    width: h_0__consts_1.COL_WIDTH_LG + 2 * h_0__consts_1.COL_WIDTH_SM,
                    height: rectangleHeight,
                    color: fillColor,
                    borderWidth: 0,
                    borderColor: (0, pdf_lib_1.rgb)(0, 0, 0),
                });
                // Draw text line
                lineSpacing = lines.length <= 1 ? h_0__consts_1.TBL_ROW_HEIGHT : h_0__consts_1.TBL_LINE_SPACING;
                lines.forEach(line => {
                    this.documentPage.drawText(line, {
                        x: h_0__consts_1.LEFT_MARGIN + h_0__consts_1.CELL_PADDING,
                        y: this.context.Y + (h_0__consts_1.TBL_ROW_HEIGHT - h_0__consts_1.FONT_SM) / 2,
                        size: h_0__consts_1.FONT_SM,
                        font: this.getFont("regular"),
                    });
                    this.context.setY(this.context.Y - lineSpacing);
                });
                this.context.setY(this.context.Y + rowHeight);
            }
            else {
                const value = row[key];
                const x = tableName === "payments"
                    ? h_0__consts_1.LEFT_MARGIN + index * h_0__consts_1.COL_WIDTH_MD + h_0__consts_1.CELL_PADDING // payments table has equal column width
                    : index === 1 // activity table column #1 has large width
                        ? h_0__consts_1.LEFT_MARGIN + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.CELL_PADDING // activity table column #2, #3 have small width
                        : h_0__consts_1.LEFT_MARGIN + h_0__consts_1.COL_WIDTH_LG + h_0__consts_1.COL_WIDTH_SM + h_0__consts_1.CELL_PADDING;
                this.documentPage.drawText(`${value}`, {
                    x,
                    y: this.context.Y + (h_0__consts_1.TBL_ROW_HEIGHT - h_0__consts_1.FONT_SM) / 2,
                    size: h_0__consts_1.FONT_SM,
                    font: this.getFont("regular"),
                    color: h_0__consts_1.TEXT_COLOR,
                });
            }
        });
        if (lines.length > 1) {
            this.context.setY(this.context.Y - rowHeight - 20);
        }
        else {
            this.context.setY(this.context.Y - rowHeight);
        }
    }
    drawWrappedText(params) {
        const { text, alignment, leftBoundary, rightBoundary, textWidth, font, size, spacing } = params;
        const words = text.split(" ");
        const lines = [];
        let currentLine = "";
        words.forEach(word => {
            /** Temporary variable to estimate the line length after adding the current word */
            const testLine = currentLine !== "" ? `${currentLine} ${word}` : word;
            const width = font.widthOfTextAtSize(testLine, size);
            if (width < textWidth) {
                currentLine = testLine;
            }
            else {
                if (currentLine)
                    lines.push(currentLine);
                currentLine = word;
            }
        });
        if (currentLine)
            lines.push(currentLine);
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
                    const _exhaustiveCheck = alignment;
                    throw new Error(`internalErr: (EFA203) invalid alignment ${_exhaustiveCheck}`);
            }
        });
        return lines.length * spacing;
    }
    /** @returns The x position where the text ends */
    drawLeftAlignedText(text, leftBoundary, font = this.getFont("regular"), size = h_0__consts_1.FONT_SM) {
        const textWidth = font.widthOfTextAtSize(text, size);
        this.documentPage.drawText(text, {
            x: leftBoundary,
            y: this.context.Y,
            size,
            font,
            color: h_0__consts_1.TEXT_COLOR,
        });
        return leftBoundary + textWidth;
    }
    /** @returns The x position where the text starts */
    drawRightAlignedText(text, rightBoundary, font = this.getFont("regular"), size = h_0__consts_1.FONT_SM) {
        const textWidth = font.widthOfTextAtSize(text, size);
        const x = rightBoundary - textWidth;
        this.documentPage.drawText(text, {
            x,
            y: this.context.Y,
            size,
            font,
            color: h_0__consts_1.TEXT_COLOR,
        });
        return x;
    }
    predictRowHeight(row, label) {
        let rowHeight = h_0__consts_1.TBL_ROW_HEIGHT;
        const words = row[label].split(" ");
        let currentLine = "";
        const lines = [];
        words.forEach(word => {
            const testLine = currentLine !== "" ? `${currentLine} ${word}` : word;
            const width = this.getFont("regular").widthOfTextAtSize(testLine, h_0__consts_1.FONT_SM);
            if (width <= h_0__consts_1.COL_WIDTH_LG) {
                currentLine = testLine;
            }
            else {
                if (currentLine)
                    lines.push(currentLine);
                currentLine = word;
            }
        });
        if (currentLine)
            lines.push(currentLine);
        if (lines.length > 1) {
            rowHeight = lines.length * h_0__consts_1.TBL_LINE_SPACING + 20;
        }
        return rowHeight;
    }
    beginNewPage() {
        this.drawHorizontalLine(false);
        this.addPageAndDrawHeader();
    }
    drawDashedLine(leftBoundary, rightBoundary, size = h_0__consts_1.FONT_SM, font = this.getFont("regular")) {
        const height = font.heightAtSize(size);
        this.documentPage.drawLine({
            start: { x: leftBoundary + 2, y: this.context.Y + 0.25 * height },
            end: { x: rightBoundary - 2, y: this.context.Y + 0.25 * height },
            thickness: 1,
            color: h_0__consts_1.TEXT_COLOR,
            opacity: 1,
            dashArray: [2, 1],
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
exports.BillingPdfEditor = BillingPdfEditor;
