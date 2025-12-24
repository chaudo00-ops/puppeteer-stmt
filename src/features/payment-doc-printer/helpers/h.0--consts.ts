import { rgb } from "pdf-lib";

/** US Letter height (11") */
export const PAGE_HEIGHT = 792;
/** US Letter width (8.5") */
export const PAGE_WIDTH = 612;
/** Ganjing logo width */
export const LOGO_WIDTH = 98.745;
/** Ganjing logo height */
export const LOGO_HEIGHT = 49.95;

/** Document text color */
export const TEXT_COLOR = rgb(50 / 255, 50 / 255, 50 / 255);

// -----------------------------------------------------------------------------
// Define font sizes
// -----------------------------------------------------------------------------
/** h1 font size (24 pt) */
export const FONT_H1 = 24;
/** h2 font size (16.5 pt) */
export const FONT_H2 = 16.5;
/** h3 font size (12 pt) */
export const FONT_H3 = 12;
/** regular font size (10.5 pt) */
export const FONT_REG = 10.5;
/** small font size (9 pt) */
export const FONT_SM = 9;

// -----------------------------------------------------------------------------
// Header size
// -----------------------------------------------------------------------------
/** Document header top offset (81 pt) */
export const DOC_HEADER_OFFSET = 81;
/** Document footer offset (80 pt) */
export const DOC_FOOTER_OFFSET = 80;
/** Section header offset (25 pt) */
export const SEC_HEADER_OFFSET = 25;

// -----------------------------------------------------------------------------
// Line spacing (adjust as needed to match original)
// -----------------------------------------------------------------------------
/** Text spacing in section footer (12 pt) */
export const SEC_FOOTER_SPACING = 12;
/** Standard text spacing in document body (21 pt) */
export const TEXT_SPACING = 21;
/** Narrow text spacing in document body (14 pt) */
export const TEXT_SPACING_NARROW = 14;

/** Left margin (38 pt) */
export const LEFT_MARGIN = 38;
/** Right margin (38 pt) */
export const RIGHT_MARGIN = 38;
/** Left padding (40 pt) */
export const LEFT_PADDING = 40;
/** Half-page Left column x starting position for Statement Details Second Column */
export const LEFT_COLUMN_X = 330;

// -----------------------------------------------------------------------------
// Table constant values
// -----------------------------------------------------------------------------
/** Table header row height (20.5 pt) */
export const TBL_HEADER_HEIGHT = 20.5;
/** Table row height (29 pt) */
export const TBL_ROW_HEIGHT = 29;
/** Line spacing with in table row (12.75 pt)  */
export const TBL_LINE_SPACING = 12.75;
/** Table column width - SMALL (120 pt) */
export const COL_WIDTH_SM = 120;
/** Table column width - MEDIUM (236 pt) */
export const COL_WIDTH_MD = 178;
/** Table column width - LARGE (295 pt) */
export const COL_WIDTH_LG = 295;
/** Table cell padding (12 pt) */
export const CELL_PADDING = 12;
/** Table header border color */
export const TBL_BORDER_COLOR = rgb(220 / 255, 220 / 255, 220 / 255);
