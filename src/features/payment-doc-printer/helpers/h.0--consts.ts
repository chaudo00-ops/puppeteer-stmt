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
export const PAGE_WIDTH = 8.5; // 612 pt
export const PAGE_HEIGHT = 11; // 792 pt

export const LEFT_RIGHT_MARGIN = 50; // ≈ 38 pt
export const LEFT_PADDING = 53.33; // 40 pt

// Positioning for dual-column layout on statements
export const LEFT_COLUMN_X = 440; // 330 pt

// -----------------------------------------------------------------------------
// PAGE PADDING & SPACING
// -----------------------------------------------------------------------------
export const MARGIN_TOP_HEADER = 60;
export const MARGIN_TOP_SECTION = 24; // Space between sections
export const MARGIN_TOP_TABLE = 12; // Space above tables
export const PADDING_BOTTOM_SECTION = 16; // Space below a section header

// -----------------------------------------------------------------------------
// LOGO SETTINGS
// -----------------------------------------------------------------------------
export const LOGO_WIDTH = 131.66; // ≈ 98.745 pt
export const LOGO_HEIGHT = 66.54; // ≈ 49.95 pt
export const MARGIN_TOP_LOGO = 33.6;

// -----------------------------------------------------------------------------
// TYPOGRAPHY — FONT SIZES & WEIGHTS
// -----------------------------------------------------------------------------
export const FONT_SIZE_H1 = 32;
export const FONT_WEIGHT_H1 = 500;

export const FONT_SIZE_H2 = 18; // Fixed typo from "18x"
export const FONT_WEIGHT_H2 = 700;

export const FONT_SIZE_H3 = 16;
export const FONT_WEIGHT_H3 = 700;

export const FONT_SIZE_PARAGRAPH = 14;
export const FONT_WEIGHT_PARAGRAPH = 400;

export const FONT_SIZE_TOTAL = 22;
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
export const COLUMN_GAP = 80;

// -----------------------------------------------------------------------------
// TABLE CONFIGURATION
// -----------------------------------------------------------------------------
// Table dimensions
export const TABLE_HEADER_HEIGHT = 28;
export const TBL_ROW_HEIGHT = 38; // ≈ 29 pt

// Column widths
export const COL_WIDTH_SM = 160; // Small column (Impression, Cost)
export const COL_WIDTH_MD = 237.33; // Medium column (Payments table)
export const COL_WIDTH_LG = 393.33; // Large column (Description)

// Padding for table cells
export const TABLE_CELL_PADDING_HORIZONTAL = 16; // 12 pt
export const TABLE_CELL_PADDING_VERTICAL = 12; // 12 pt

// Table borders & colors
export const TBL_BORDER_COLOR = rgb(220 / 255, 220 / 255, 220 / 255);
export const TABLE_HEADER_BG_COLOR = "#16355A";
export const TABLE_HEADER_TEXT_COLOR = "#FFFFFF";
export const TABLE_EVEN_ROW_COLOR = "#F1F6FC";
export const TABLE_TEXT_COLOR = "#2B2B2B";

// Table typography
export const TABLE_HEADER_FONT_SIZE = 12;
export const TABLE_HEADER_FONT_WEIGHT = 700;
export const TABLE_DATA_FONT_SIZE = 12;
export const TABLE_DATA_FONT_WEIGHT = 400;

// NUMERIC HEIGHT VALUES FOR PAGE CALCULATIONS (in pixels)
// Table component heights
export const TABLE_TITLE_HEIGHT = 52; // h3 title (16px) + margin-top (24px) + padding bottom (12 px)
export const TABLE_ROW_HEIGHT = 38;
export const TABLE_SUBTOTAL_TOTAL_ROWS = 80; // subtotal + total rows

// Constants for multiline row height estimation
export const AVG_CHAR_WIDTH_LATIN = 8; // Average character width for 12px font
export const AVG_CHAR_WIDTH_CJK = 14; // Average character width for CJK 12px font
// -----------------------------------------------------------------------------
// NUMERIC HEIGHT VALUES FOR PAGE CALCULATIONS (in pixels)
// -----------------------------------------------------------------------------
export const PAGE_HEADER_HEIGHT = 108;
export const PAGE_FOOTER_HEIGHT = 48;
export const PAGE_CONTENT_HEIGHT = 900; // PAGE_HEIGHT (1056) - HEADER - FOOTER

// Section heights (approximate)
export const BILL_TO_SECTION_HEIGHT_PX = 140;
export const DETAILS_SUMMARY_SECTION_HEIGHT_PX = 190;
