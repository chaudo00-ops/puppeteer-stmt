"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfEditor = void 0;
const fontkit_1 = __importDefault(require("@pdf-lib/fontkit"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const pdf_lib_1 = require("pdf-lib");
const h_0__consts_1 = require("./h.0--consts");
class PdfEditor {
    constructor(title, language = "en") {
        this.statementTitle = title;
        this.language = language;
    }
    /** Initialize a new PDF document with one page */
    async init() {
        this.pdfDoc = await pdf_lib_1.PDFDocument.create();
        this.documentPage = this.pdfDoc.addPage([h_0__consts_1.PAGE_WIDTH, h_0__consts_1.PAGE_HEIGHT]);
        await this.initializeAssets();
    }
    addPageAndDrawHeader() {
        this.documentPage = this.pdfDoc.addPage([h_0__consts_1.PAGE_WIDTH, h_0__consts_1.PAGE_HEIGHT]);
        this.drawDocumentHeader();
        this.context.nextPage();
    }
    /** Draw statement header + GJW logo */
    drawDocumentHeader() {
        this.documentPage.drawText(this.statementTitle, {
            x: h_0__consts_1.LEFT_MARGIN,
            y: h_0__consts_1.PAGE_HEIGHT - h_0__consts_1.DOC_HEADER_OFFSET,
            size: h_0__consts_1.FONT_H1,
            font: this.getFont("regular"),
            color: h_0__consts_1.TEXT_COLOR,
        });
        if (!this.logoImage) {
            throw new Error("Logo image not initialized");
        }
        this.documentPage.drawImage(this.logoImage, {
            x: h_0__consts_1.PAGE_WIDTH - h_0__consts_1.LOGO_WIDTH - h_0__consts_1.RIGHT_MARGIN,
            y: h_0__consts_1.PAGE_HEIGHT - h_0__consts_1.DOC_HEADER_OFFSET,
            width: h_0__consts_1.LOGO_WIDTH,
            height: h_0__consts_1.LOGO_HEIGHT,
        });
        this.context.setY(h_0__consts_1.PAGE_HEIGHT - h_0__consts_1.DOC_HEADER_OFFSET);
    }
    drawTableHeader(labelsName, tableName) {
        const font = this.getFont("bold");
        const fillColor = (0, pdf_lib_1.rgb)(22 / 255, 53 / 255, 90 / 255);
        let currentX = h_0__consts_1.LEFT_MARGIN;
        labelsName.forEach((name, index) => {
            // Draw header cell fill color + background
            const colWidth = tableName === "payments" ? h_0__consts_1.COL_WIDTH_MD : index === 0 ? h_0__consts_1.COL_WIDTH_LG : h_0__consts_1.COL_WIDTH_SM;
            this.documentPage.drawRectangle({
                x: currentX,
                y: this.context.Y,
                width: colWidth,
                height: h_0__consts_1.TBL_HEADER_HEIGHT,
                color: fillColor,
                borderWidth: 0,
                borderColor: (0, pdf_lib_1.rgb)(220 / 255, 220 / 255, 220 / 255),
            });
            // Draw header text
            this.documentPage.drawText(`${name}`, {
                x: currentX + h_0__consts_1.CELL_PADDING,
                y: this.context.Y + (h_0__consts_1.TBL_HEADER_HEIGHT - h_0__consts_1.FONT_SM) / 2,
                size: h_0__consts_1.FONT_SM,
                font,
                color: (0, pdf_lib_1.rgb)(1, 1, 1),
            });
            currentX += colWidth;
        });
        this.context.setY(this.context.Y - h_0__consts_1.TBL_ROW_HEIGHT);
    }
    beginNewPage() {
        this.drawHorizontalLine(false);
        this.addPageAndDrawHeader();
    }
    drawHorizontalLine(offset = true) {
        if (offset) {
            this.context.setY(this.context.Y - h_0__consts_1.SEC_FOOTER_SPACING);
        }
        const y = this.context.Y;
        this.documentPage.drawLine({
            start: { x: h_0__consts_1.LEFT_MARGIN, y },
            end: { x: h_0__consts_1.PAGE_WIDTH - h_0__consts_1.RIGHT_MARGIN, y },
            thickness: 0.8,
            color: (0, pdf_lib_1.rgb)(0, 0, 0),
            opacity: 0.1,
        });
    }
    async initializeAssets() {
        // Initialize fonts
        this.pdfDoc.registerFontkit(fontkit_1.default);
        const interSemiBoldBytes = await fs_1.promises.readFile(this.getFontPath("Inter_18pt-SemiBold.ttf"));
        const interBoldBytes = await fs_1.promises.readFile(this.getFontPath("Inter_18pt-Bold.ttf"));
        const interRegularBytes = await fs_1.promises.readFile(this.getFontPath("Inter_18pt-Regular.ttf"));
        const interLightBytes = await fs_1.promises.readFile(this.getFontPath("Inter_18pt-Light.ttf"));
        this.interSemiBold = await this.pdfDoc.embedFont(interSemiBoldBytes);
        this.interBold = await this.pdfDoc.embedFont(interBoldBytes);
        this.interRegular = await this.pdfDoc.embedFont(interRegularBytes);
        this.interLight = await this.pdfDoc.embedFont(interLightBytes);
        // Initialize Chinese fonts if language is Chinese
        if (this.language === "zh-CN") {
            const notoSansSCRegularBytes = await fs_1.promises.readFile(this.getFontPath("NotoSansSC-Regular.otf"));
            const notoSansSCBoldBytes = await fs_1.promises.readFile(this.getFontPath("NotoSansSC-Bold.otf"));
            const notoSansSCLightBytes = await fs_1.promises.readFile(this.getFontPath("NotoSansSC-Light.otf"));
            // Embed fonts without subsetting (fonts are already subset versions)
            // SubsetOTF fonts from Noto CJK are pre-subsetted with commonly used characters
            this.notoSansSCRegular = await this.pdfDoc.embedFont(notoSansSCRegularBytes);
            this.notoSansSCBold = await this.pdfDoc.embedFont(notoSansSCBoldBytes);
            this.notoSansSCLight = await this.pdfDoc.embedFont(notoSansSCLightBytes);
        }
        // Initialize logo images
        const imageBytes = await fs_1.promises.readFile(this.getImagePath("gjw-logo-transparent.png"));
        this.logoImage = await this.pdfDoc.embedPng(imageBytes);
    }
    getFontPath(filename) {
        return path_1.default.join(__dirname, "..", "assets", "fonts", filename);
    }
    getImagePath(filename) {
        return path_1.default.join(__dirname, "..", "assets", "images", filename);
    }
    getContext() {
        return this.context;
    }
    /** Get the appropriate font based on language and weight */
    getFont(weight) {
        if (this.language === "zh-CN") {
            switch (weight) {
                case "bold":
                case "semibold":
                    return this.notoSansSCBold || this.interBold;
                case "light":
                    return this.notoSansSCLight || this.interLight;
                case "regular":
                default:
                    return this.notoSansSCRegular || this.interRegular;
            }
        }
        else {
            switch (weight) {
                case "bold":
                    return this.interBold;
                case "semibold":
                    return this.interSemiBold;
                case "light":
                    return this.interLight;
                case "regular":
                default:
                    return this.interRegular;
            }
        }
    }
    /** Save PDF as Uint8Array */
    async save() {
        return await this.pdfDoc.save();
    }
    /** Save as Base64 (useful for frontend previews or downloads) */
    async saveAsBase64() {
        return await this.pdfDoc.saveAsBase64({ dataUri: true });
    }
}
exports.PdfEditor = PdfEditor;
