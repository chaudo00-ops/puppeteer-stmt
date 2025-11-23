// -----------------------------------------------------------------------------
// PDF Styling Constants (Refactored & Organized)
// -----------------------------------------------------------------------------
// All constants grouped by purpose with clear headings and comments.
// Units noted: "px" used for DOM rendering reference; comments include pt values.
// -----------------------------------------------------------------------------

import { rgb } from "pdf-lib";

// -----------------------------------------------------------------------------
// PAGE DIMENSIONS & LAYOUT
// -----------------------------------------------------------------------------
export const PAGE_WIDTH = "8.5in"; // 612 pt
export const PAGE_HEIGHT = "11in"; // 792 pt

export const LEFT_RIGHT_MARGIN = "50px"; // ≈ 38 pt
export const LEFT_PADDING = 53.33; // 40 pt

// Positioning for dual-column layout on statements
export const LEFT_COLUMN_X = 440; // 330 pt

// -----------------------------------------------------------------------------
// PAGE PADDING & SPACING
// -----------------------------------------------------------------------------
export const PAGE_PADDING_TOP = "142px";
export const PAGE_PADDING_BOTTOM = "28px";

export const MARGIN_TOP_HEADER = "60px";
export const MARGIN_TOP_SECTION = "30px"; // Space between sections
export const MARGIN_TOP_TABLE = "12px"; // Space above tables
export const PADDING_BOTTOM_SECTION = "16px"; // Space below a section header

// -----------------------------------------------------------------------------
// LOGO SETTINGS
// -----------------------------------------------------------------------------
export const LOGO_WIDTH = "131.66px"; // ≈ 98.745 pt
export const LOGO_HEIGHT = "66.54px"; // ≈ 49.95 pt
export const MARGIN_TOP_LOGO = "33.6px";

// -----------------------------------------------------------------------------
// TYPOGRAPHY — FONT SIZES & WEIGHTS
// -----------------------------------------------------------------------------
export const FONT_SIZE_H1 = "32px";
export const FONT_WEIGHT_H1 = 500;

export const FONT_SIZE_H2 = "18px"; // Fixed typo from "18x"
export const FONT_WEIGHT_H2 = 700;

export const FONT_SIZE_H3 = "16px";
export const FONT_WEIGHT_H3 = 700;

export const FONT_SIZE_PARAGRAPH = "14px";
export const FONT_WEIGHT_PARAGRAPH = 400;

export const FONT_SIZE_TOTAL = "22px";
export const FONT_WEIGHT_TOTAL = 600;

// -----------------------------------------------------------------------------
// COLORS
// -----------------------------------------------------------------------------
export const TEXT_COLOR = "#0F0F0F";
export const TEXT_COLOR_H1 = "#000000";
export const DIVIDER_LINE_COLOR = "#DCDCDC";

// -----------------------------------------------------------------------------
// TWO-COLUMN LAYOUT
// -----------------------------------------------------------------------------
export const COLUMN_GAP = "80px";

// -----------------------------------------------------------------------------
// TABLE CONFIGURATION
// -----------------------------------------------------------------------------
// Table dimensions
export const TBL_HEADER_HEIGHT = "28px";
export const TBL_ROW_HEIGHT = "38px"; // ≈ 29 pt

// Column widths
export const COL_WIDTH_SM = "160px"; // Small column (Impression, Cost)
export const COL_WIDTH_MD = "237.33px"; // Medium column (Payments table)
export const COL_WIDTH_LG = "393.33px"; // Large column (Description)

// Padding for table cells
export const TABLE_DATA_PADDING_LR = "16px"; // 12 pt
export const TABLE_DATA_PADDING_TB = "12px"; // 12 pt

// Table borders & colors
export const TBL_BORDER_COLOR = rgb(220 / 255, 220 / 255, 220 / 255);
export const TABLE_HEADER_BG_COLOR = "#16355A";
export const TABLE_HEADER_TEXT_COLOR = "#FFFFFF";
export const TABLE_EVEN_ROW_COLOR = "#F1F6FC";
export const TABLE_TEXT_COLOR = "#2B2B2B";

// Table typography
export const TABLE_HEADER_FONT_SIZE = "12px";
export const TABLE_HEADER_FONT_WEIGHT = 700;
export const TABLE_DATA_FONT_SIZE = "12px";
export const TABLE_DATA_FONT_WEIGHT = 400;
