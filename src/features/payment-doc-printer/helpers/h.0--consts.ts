import { rgb } from "pdf-lib";
// -----------------------------------------------------------------------------
// Document Settings
// -----------------------------------------------------------------------------
/** US Letter height (11") */
export const PAGE_HEIGHT = "11in"; // 792 pt
/** US Letter width (8.5") */
export const PAGE_WIDTH = "8.5in"; // 612 pt

/** Left margin (38 pt) */
export const LEFT_RIGHT_MARGIN = "50px"; // 38 pt
/** Left padding (40 pt) */
export const LEFT_PADDING = 53.33; // 40 pt
/** Half-page Left column x starting position for Statement Details Second Column */
export const LEFT_COLUMN_X = 440; // 330 pt
// -----------------------------------------------------------------------------
// Header settings
// -----------------------------------------------------------------------------
export const PAGE_PADDING_TOP = "142px";
export const PAGE_PADDING_BOTTOM = "28px";
export const MARGIN_TOP_HEADER = "60px";
export const MARGIN_TOP_SECTION = "30px"; // Distance between a section header and the bottom of the previous section
export const MARGIN_TOP_TABLE = "12px";
export const PADDING_BOTTOM_SECTION = "16px"; // Distance between a section header and the bottom of the previous section
export const DOC_FOOTER_OFFSET = 106.67; // 80 pt

/** Ganjing logo */
export const LOGO_WIDTH = "131.66px"; // 98.745 pt
export const LOGO_HEIGHT = "66.54px"; // 49.95 pt
export const MARGIN_TOP_LOGO = "33.6px";

// -----------------------------------------------------------------------------
// Define font sizes
// -----------------------------------------------------------------------------
export const FONT_SIZE_H1 = "32px";
export const FONT_SIZE_H2 = "18x";
export const FONT_SIZE_H3 = "16px";
export const FONT_SIZE_PARAGRAPH = "14px";
export const FONT_REG = 14;
export const FONT_SM = 12;
export const FONT_SIZE_SUBTITLE = "16px";
export const FONT_SIZE_TOTAL = "22px";

// -----------------------------------------------------------------------------
// Font weight
// -----------------------------------------------------------------------------
export const FONT_WEIGHT_H1 = 500;
export const FONT_WEIGHT_H2 = 700;
export const FONT_WEIGHT_H3 = 700;
export const FONT_WEIGHT_SUBTITLE = 400;
export const FONT_WEIGHT_PARAGRAPH = 400;
export const FONT_WEIGHT_TOTAL = 600;

// -----------------------------------------------------------------------------
// Color settings
// -----------------------------------------------------------------------------
export const TEXT_COLOR = "#0F0F0F";
export const TEXT_COLOR_H1 = "#000000";
export const DIVIDER_LINE_COLOR = "#DCDCDC";

// -----------------------------------------------------------------------------
// Two Column settings
// -----------------------------------------------------------------------------
export const COLUMN_GAP = "80px";

// -----------------------------------------------------------------------------
// Line spacing (adjust as needed to match original)
// -----------------------------------------------------------------------------
/** Text spacing in section footer (12 pt) */
export const SEC_FOOTER_SPACING = 16; // 12 pt
/** Standard text spacing in document body (21 pt) */
export const TEXT_SPACING = 28; // 21 pt
/** Narrow text spacing in document body (14 pt) */
export const TEXT_SPACING_NARROW = 18.67; // 14 pt

// -----------------------------------------------------------------------------
// Table constant values
// -----------------------------------------------------------------------------
export const TBL_HEADER_HEIGHT = "28px";
/** Table row height (29 pt) */
export const TBL_ROW_HEIGHT = "38px"; // 29 pt
/** Line spacing with in table row (12.75 pt)  */
export const TBL_LINE_SPACING = 17; // 12.75 pt
/** Table column width - SMALL (120 pt) */
export const COL_WIDTH_SM = 160; // 120 pt
/** Table column width - MEDIUM (178 pt) */
export const COL_WIDTH_MD = 237.33; // 178 pt
/** Table column width - LARGE (295 pt) */
export const COL_WIDTH_LG = 393.33; // 295 pt
/** Table cell padding (12 pt) */
export const TABLE_DATA_PADDING_LR = "16px"; // 12 pt
export const TABLE_DATA_PADDING_TB = "12px"; // 12 pt

/** Table header border color */
export const TBL_BORDER_COLOR = rgb(220 / 255, 220 / 255, 220 / 255);

export const TABLE_HEADER_BG_COLOR = "#16355A";
export const TABLE_HEADER_TEXT_COLOR = "#FFFFFF";

export const TABLE_HEADER_FONT_SIZE = "12px";
export const TABLE_HEADER_FONT_WEIGHT = 700;

export const TABLE_EVEN_ROW_COLOR = "#F1F6FC";

export const TABLE_TEXT_COLOR = "#2B2B2B";

export const TABLE_DATA_FONT_SIZE = "12px";
export const TABLE_DATA_FONT_WEIGHT = 400;
