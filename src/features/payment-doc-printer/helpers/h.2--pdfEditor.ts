import fontkit from "@pdf-lib/fontkit";
import { promises as fs } from "fs";
import path from "path";
import { PDFDocument, PDFFont, PDFImage, PDFPage, rgb } from "pdf-lib";
import {
	CELL_PADDING,
	COL_WIDTH_LG,
	COL_WIDTH_MD,
	COL_WIDTH_SM,
	DOC_HEADER_OFFSET,
	FONT_H1,
	FONT_SM,
	LEFT_MARGIN,
	LOGO_HEIGHT,
	LOGO_WIDTH,
	PAGE_HEIGHT,
	PAGE_WIDTH,
	RIGHT_MARGIN,
	SEC_FOOTER_SPACING,
	TBL_HEADER_HEIGHT,
	TBL_ROW_HEIGHT,
	TEXT_COLOR,
} from "./h.0--consts";
import { TPdfTableName } from "./h.0--types";
import { PDFContext } from "./h.1--pdfContext";

export class PdfEditor<ContextType extends PDFContext> {
	protected pdfDoc: PDFDocument;
	protected documentPage: PDFPage;
	protected context: ContextType;
	// Import inter font
	protected interSemiBold: PDFFont;
	protected interBold: PDFFont;
	protected interRegular: PDFFont;
	protected interLight: PDFFont;
	protected statementTitle: string;

	// Define logo image
	protected logoImage: PDFImage | undefined;
	constructor(title: string) {
		this.statementTitle = title;
	}

	/** Initialize a new PDF document with one page */
	async init() {
		this.pdfDoc = await PDFDocument.create();
		this.documentPage = this.pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
		await this.initializeAssets();
	}

	addPageAndDrawHeader() {
		this.documentPage = this.pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);

		this.drawDocumentHeader();
		this.context.nextPage();
	}

	/** Draw statement header + GJW logo */
	drawDocumentHeader() {
		this.documentPage.drawText(this.statementTitle, {
			x: LEFT_MARGIN,
			y: PAGE_HEIGHT - DOC_HEADER_OFFSET,
			size: FONT_H1,
			font: this.interRegular,
			color: TEXT_COLOR,
		});

		if (!this.logoImage) {
			throw new Error("Logo image not initialized");
		}
		this.documentPage.drawImage(this.logoImage, {
			x: PAGE_WIDTH - LOGO_WIDTH - RIGHT_MARGIN,
			y: PAGE_HEIGHT - DOC_HEADER_OFFSET,
			width: LOGO_WIDTH,
			height: LOGO_HEIGHT,
		});

		this.context.setY(PAGE_HEIGHT - DOC_HEADER_OFFSET);
	}

	drawTableHeader(labelsName: readonly string[], tableName: TPdfTableName) {
		const font = this.interBold;
		const fillColor = rgb(22 / 255, 53 / 255, 90 / 255);

		let currentX = LEFT_MARGIN;

		labelsName.forEach((name, index) => {
			// Draw header cell fill color + background

			const colWidth =
				tableName === "payments" ? COL_WIDTH_MD : index === 0 ? COL_WIDTH_LG : COL_WIDTH_SM;

			this.documentPage.drawRectangle({
				x: currentX,
				y: this.context.Y,
				width: colWidth,
				height: TBL_HEADER_HEIGHT,
				color: fillColor,
				borderWidth: 0,
				borderColor: rgb(220 / 255, 220 / 255, 220 / 255),
			});

			// Draw header text
			this.documentPage.drawText(`${name}`, {
				x: currentX + CELL_PADDING,
				y: this.context.Y + (TBL_HEADER_HEIGHT - FONT_SM) / 2, // Center in middle
				size: FONT_SM,
				font,
				color: rgb(1, 1, 1),
			});
			currentX += colWidth;
		});
		this.context.setY(this.context.Y - TBL_ROW_HEIGHT);
	}

	beginNewPage() {
		this.drawHorizontalLine(false);
		this.addPageAndDrawHeader();
	}

	drawHorizontalLine(offset: boolean = true) {
		if (offset) {
			this.context.setY(this.context.Y - SEC_FOOTER_SPACING);
		}
		const y = this.context.Y;

		this.documentPage.drawLine({
			start: { x: LEFT_MARGIN, y },
			end: { x: PAGE_WIDTH - RIGHT_MARGIN, y },
			thickness: 0.8,
			color: rgb(0, 0, 0),
			opacity: 0.1,
		});
	}

	async initializeAssets() {
		// Initialize fonts
		this.pdfDoc.registerFontkit(fontkit);

		const interSemiBoldBytes = await fs.readFile(this.getFontPath("Inter_18pt-SemiBold.ttf"));
		const interBoldBytes = await fs.readFile(this.getFontPath("Inter_18pt-Bold.ttf"));
		const interRegularBytes = await fs.readFile(this.getFontPath("Inter_18pt-Regular.ttf"));
		const interLightBytes = await fs.readFile(this.getFontPath("Inter_18pt-Light.ttf"));

		this.interSemiBold = await this.pdfDoc.embedFont(interSemiBoldBytes);
		this.interBold = await this.pdfDoc.embedFont(interBoldBytes);
		this.interRegular = await this.pdfDoc.embedFont(interRegularBytes);
		this.interLight = await this.pdfDoc.embedFont(interLightBytes);

		// Initialize logo images
		const imageBytes = await fs.readFile(this.getImagePath("gjw-logo-optimized.png"));
		this.logoImage = await this.pdfDoc.embedPng(imageBytes);
	}

	getFontPath(filename: string) {
		return path.join(__dirname, "..", "assets", "fonts", filename);
	}

	getImagePath(filename: string) {
		return path.join(__dirname, "..", "assets", "images", filename);
	}

	getContext() {
		return this.context;
	}

	/** Save PDF as Uint8Array */
	async save(): Promise<Uint8Array> {
		return await this.pdfDoc.save();
	}

	/** Save as Base64 (useful for frontend previews or downloads) */
	async saveAsBase64(): Promise<string> {
		return await this.pdfDoc.saveAsBase64({ dataUri: true });
	}
}
