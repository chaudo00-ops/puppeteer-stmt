import { rgb } from "pdf-lib";

/** US Letter height (11") */
export const PAGE_HEIGHT = "11in"; // 792 pt
/** US Letter width (8.5") */
export const PAGE_WIDTH = "8.5in"; // 612 pt
/** Ganjing logo width */
export const LOGO_WIDTH = 131.66; // 98.745 pt
/** Ganjing logo height */
export const LOGO_HEIGHT = 66.6; // 49.95 pt

/** Document text color */
export const TEXT_COLOR = rgb(50 / 255, 50 / 255, 50 / 255);
export const TEXT_COLOR_H1 = "#000000";
// -----------------------------------------------------------------------------
// Header size
// -----------------------------------------------------------------------------
/** Document header top offset (81 pt) */
export const MARGIN_TOP_H1 = "70px";
/** Document footer offset (80 pt) */
export const DOC_FOOTER_OFFSET = 106.67; // 80 pt
/** Section header offset (25 pt) */
export const SEC_HEADER_OFFSET = 33.33; // 25 pt

// -----------------------------------------------------------------------------
// Define font sizes
// -----------------------------------------------------------------------------
/** h1 font size (24 pt) */
export const FONT_SIZE_H1 = "32px"; // 24 pt
/** h2 font size (16.5 pt) */
export const FONT_H2 = 22; // 16.5 pt
/** h3 font size (12 pt) */
export const FONT_H3 = 16; // 12 pt
/** regular font size (10.5 pt) */
export const FONT_REG = 14; // 10.5 pt
/** small font size (9 pt) */
export const FONT_SM = 12; // 9 pt

// -----------------------------------------------------------------------------
// Font weight
// -----------------------------------------------------------------------------
export const FONT_WEIGHT_H1 = 500;
// -----------------------------------------------------------------------------
// Line spacing (adjust as needed to match original)
// -----------------------------------------------------------------------------
/** Text spacing in section footer (12 pt) */
export const SEC_FOOTER_SPACING = 16; // 12 pt
/** Standard text spacing in document body (21 pt) */
export const TEXT_SPACING = 28; // 21 pt
/** Narrow text spacing in document body (14 pt) */
export const TEXT_SPACING_NARROW = 18.67; // 14 pt

/** Left margin (38 pt) */
export const LEFT_MARGIN = 50.67; // 38 pt
/** Right margin (38 pt) */
export const RIGHT_MARGIN = 50.67; // 38 pt
/** Left padding (40 pt) */
export const LEFT_PADDING = 53.33; // 40 pt
/** Half-page Left column x starting position for Statement Details Second Column */
export const LEFT_COLUMN_X = 440; // 330 pt

// -----------------------------------------------------------------------------
// Table constant values
// -----------------------------------------------------------------------------
/** Table header row height (20.5 pt) */
export const TBL_HEADER_HEIGHT = 27.33; // 20.5 pt
/** Table row height (29 pt) */
export const TBL_ROW_HEIGHT = 38.67; // 29 pt
/** Line spacing with in table row (12.75 pt)  */
export const TBL_LINE_SPACING = 17; // 12.75 pt
/** Table column width - SMALL (120 pt) */
export const COL_WIDTH_SM = 160; // 120 pt
/** Table column width - MEDIUM (178 pt) */
export const COL_WIDTH_MD = 237.33; // 178 pt
/** Table column width - LARGE (295 pt) */
export const COL_WIDTH_LG = 393.33; // 295 pt
/** Table cell padding (12 pt) */
export const CELL_PADDING = 16; // 12 pt
/** Table header border color */
export const TBL_BORDER_COLOR = rgb(220 / 255, 220 / 255, 220 / 255);
