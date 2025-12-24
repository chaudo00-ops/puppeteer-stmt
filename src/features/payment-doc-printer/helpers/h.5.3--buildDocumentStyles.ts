import {
	COLUMN_GAP,
	DIVIDER_LINE_COLOR,
	FONT_SIZE_H1,
	FONT_SIZE_H2,
	FONT_SIZE_H3,
	FONT_SIZE_PARAGRAPH,
	FONT_SIZE_TOTAL,
	FONT_WEIGHT_H1,
	FONT_WEIGHT_H2,
	FONT_WEIGHT_H3,
	FONT_WEIGHT_PARAGRAPH,
	FONT_WEIGHT_TOTAL,
	LEFT_RIGHT_MARGIN,
	LOGO_HEIGHT,
	LOGO_WIDTH,
	MARGIN_TOP_HEADER,
	MARGIN_TOP_LOGO,
	MARGIN_TOP_SECTION,
	MARGIN_TOP_TABLE,
	PADDING_BOTTOM_SECTION,
	PAGE_CONTENT_HEIGHT,
	PAGE_FOOTER_HEIGHT,
	PAGE_HEADER_HEIGHT,
	PAGE_HEIGHT,
	PAGE_WIDTH,
	TABLE_CELL_PADDING_HORIZONTAL,
	TABLE_CELL_PADDING_VERTICAL,
	TABLE_DATA_FONT_SIZE,
	TABLE_DATA_FONT_WEIGHT,
	TABLE_EVEN_ROW_COLOR,
	TABLE_HEADER_BG_COLOR,
	TABLE_HEADER_FONT_SIZE,
	TABLE_HEADER_FONT_WEIGHT,
	TABLE_HEADER_HEIGHT,
	TABLE_HEADER_TEXT_COLOR,
	TABLE_TEXT_COLOR,
	TBL_ROW_HEIGHT,
	TEXT_COLOR,
	TEXT_COLOR_H1,
} from "./h.0--puppeteer-consts";

export function buildDocumentStyles(fontFamily: string): string {
	return `
  <style>
    /* Define exact page size and margins for 1:1 PDF mapping */
    /* @page is part of the CSS paged media / print layout specification */
    /* Keep @page for PDF generation, but simplify it */
    @page {
      size: ${PAGE_WIDTH}in ${PAGE_HEIGHT}in; /* Letter: 8.5in 11in */
      margin: 0; /* No margins - we control spacing in .page divs */
    }

    /* Ensure exact color reproduction in PDF */
    /* Keep color reproduction settings - these are critical */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* Remove fixed sizing from html/body - let pages flow naturally */
    html, body {
      margin: 0;
      padding: 0;
      background: #e0e0e0; /* Gray background to show page separation */
    }

    body {
      font-family: ${fontFamily};
      font-size: ${FONT_SIZE_PARAGRAPH}px;
      font-weight: ${FONT_WEIGHT_PARAGRAPH};
      color: ${TEXT_COLOR};
      line-height: 1.5;
      width: ${PAGE_WIDTH}in;
      min-height: ${PAGE_HEIGHT}in;
      padding: 0;
    }

    .page {
      width: ${PAGE_WIDTH}in;
      min-height: ${PAGE_HEIGHT}in;
      background: white;
      page-break-after: always;
      position: relative;
      padding: 0 ${LEFT_RIGHT_MARGIN}px;
    }

    .page-header {
      background: white;
      width: 100%;
      height: ${PAGE_HEADER_HEIGHT}px;
      font-size: ${FONT_SIZE_H1}px; /* CRITICAL: Base font size must be set */
      font-weight: ${FONT_WEIGHT_H1};
      color: ${TEXT_COLOR_H1};
      font-family: ${fontFamily};
    }

    .page-content {
      min-height: ${PAGE_CONTENT_HEIGHT}px;  /* 11in - 142px header - 28px footer */
    }

    .page-footer {
      height: ${PAGE_FOOTER_HEIGHT}px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .header h1 {
      font-size: ${FONT_SIZE_H1}px;
      font-weight: ${FONT_WEIGHT_H1};
      color: ${TEXT_COLOR_H1};
      margin-top: ${MARGIN_TOP_HEADER}px;
    }

    .logo {
      width: ${LOGO_WIDTH}px;
      height: ${LOGO_HEIGHT}px;
      margin-top: ${MARGIN_TOP_LOGO}px;
    }

    .section {
      margin-top: ${MARGIN_TOP_SECTION}px;
      padding-bottom: ${PADDING_BOTTOM_SECTION}px;
      border-bottom: 1px solid ${DIVIDER_LINE_COLOR};
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .bill-to h3 {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR};
      line-height: 22px;
    }

    .bill-to p.subtitle {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_PARAGRAPH};
      color: ${TEXT_COLOR};
      line-height: 22px;
    }

    .bill-to p {
      font-size: ${FONT_SIZE_PARAGRAPH}px;
      color: ${TEXT_COLOR};
      line-height: 22px;
    }

    .gjw-info h3 {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR};
      line-height: 22px;
      text-align: right;
      flex: 0 0 auto;
    }
      
    .gjw-info p {
      font-size: ${FONT_SIZE_PARAGRAPH}px;
      color: ${TEXT_COLOR};
      line-height: 22px;
      text-align: right;
      flex: 0 0 auto;
    }

    .details-summary-container {
      display: grid;
      grid-template-columns: 320px 1fr; /* left 320px, right fills remaining */
      column-gap: ${COLUMN_GAP}px; /* space between two columns */
      letter-spacing: 0px;
    }

    .details h3, .summary h3 {
      font-size: ${FONT_SIZE_H3};
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR};
      text-align: left;
      white-space: nowrap;
      padding-bottom: 5.47px; 
    }

    .detail-row, .summary-row {
      font-size: ${FONT_SIZE_PARAGRAPH}px;
      color: ${TEXT_COLOR};
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
      gap: 2px; /* spacing between "Label" and "Value" inside each row */
      padding-top: 5.47px; 
      padding-bottom: 5.47px; 
    }

    .dot-fill {
      flex: 1;
      border-bottom: 1px dotted #ccc;
      margin: 0px;
      min-height: 1px; /* Changed from height: 0 */
      align-self: center; /* Aligns to bottom of flex container */
      margin-bottom: 0px; /* Adjust vertical position */
    }

    .detail-label, .summary-label {
      white-space: nowrap;
      text-align: left;
      flex: 0 0 auto;
    }

    .detail-value, .summary-value {
      white-space: nowrap;
      text-align: right;
      flex: 0 0 auto;
    }

    .summary-footnotes {
      font-size: 12px;
      color:${TEXT_COLOR};
      opacity: 1;
      line-height: 1.4;
      font-weight: 100;
    }

    .summary-footnotes p {
      margin: 4px 0;
    }

    .activity-details {
      border-bottom: none !important;
    }

    .payments-received {
      border-bottom: none !important;
    }

    .payments-received h2 {
      font-size: ${FONT_SIZE_H2}px;
      font-weight: ${FONT_WEIGHT_H2};
      color: ${TEXT_COLOR};
    }

    /* Page break handling */
    .page-break {
      page-break-before: always;
    }

    table {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
      border-spacing: 0;
    }

    /* Ensure table headers repeat on each page when table spans multiple pages */
    thead {
      display: table-header-group;
    }

    tbody {
      display: table-row-group;
    }

    /* Prevent table rows from being split across pages */
    tr {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Use box-shadow instead of background-color for cleaner PDF rendering */
    thead tr:not(.table-title) th {
      color: ${TABLE_HEADER_TEXT_COLOR};
      background-color: ${TABLE_HEADER_BG_COLOR};
      font-size: ${TABLE_HEADER_FONT_SIZE}px;
      font-weight: ${TABLE_HEADER_FONT_WEIGHT};
      text-align: left;
      height: ${TABLE_HEADER_HEIGHT}px;
      padding: 7px ${TABLE_CELL_PADDING_HORIZONTAL}px;
    }

    .table-title tr {
      background-color: white; /* ensure white background */
    }

    /* Remove border and padding from the table title row */
    .table-title th {
      text-align: left;        /* optional: align text */
      padding: 0;              /* remove padding */
      padding-bottom: ${MARGIN_TOP_TABLE}px;
    }

    .table-title h3 {
      font-size: ${FONT_SIZE_H3}px;
      font-weight: ${FONT_WEIGHT_H3};
      color: ${TEXT_COLOR};
      margin: 0;           /* remove default margin of h2 */
      padding: 0;          /* remove default padding */
    }

    tbody tr {
      min-height: ${TBL_ROW_HEIGHT}px;
    }

    tbody tr:nth-child(odd):not(.total-row) {
      background-color: white;
      border-bottom: 1px solid ${TABLE_EVEN_ROW_COLOR};
    }

    tbody tr:nth-child(even) {
      background-color: ${TABLE_EVEN_ROW_COLOR};
    }

    .last-page .activity-details tbody tr:nth-last-child(3) {
      border-bottom: 1px solid ${TABLE_EVEN_ROW_COLOR} !important;
    }
      
    .last-page .payments-received tbody tr:nth-last-child(2) {
      border-bottom: 1px solid ${TABLE_EVEN_ROW_COLOR} !important;
    }

    td {
      padding: ${TABLE_CELL_PADDING_VERTICAL}px ${TABLE_CELL_PADDING_HORIZONTAL}px;
      color: ${TABLE_TEXT_COLOR};
      font-size: ${TABLE_DATA_FONT_SIZE}px;
      font-weight: ${TABLE_DATA_FONT_WEIGHT};
      vertical-align: top;
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }

    .subtotal-row {
      background-color: white !important;
      border-bottom: 1px solid ${TABLE_EVEN_ROW_COLOR} !important;
    }

    .total-row {
      font-weight: ${FONT_WEIGHT_TOTAL} !important;
      background-color: white !important;

    }

    .total-row td.label {
    font-weight: ${FONT_WEIGHT_TOTAL} !important;
      text-align: right;
    }

    .total-row td.value {
    font-weight: ${FONT_WEIGHT_TOTAL} !important;
      font-size: ${FONT_SIZE_TOTAL}px;
    }

    .bold-cell {
      font-weight: bold;
    }

    /* Print-specific adjustments */
    @media print {
      html, body {
        background: white; /* Remove gray background in print */
      }

      .page {
        box-shadow: none; /* Remove visual separators */
        height: ${PAGE_HEIGHT}in; /* Fixed height for each printed page */
        min-height: ${PAGE_HEIGHT}in;
        overflow: hidden; /* Prevent content overflow */
      }

      .page:last-child {
        page-break-after: auto;
      }

      /* Prevent breaks at margin-top of table sections */
      .activity-details,
      .payments-received {
        page-break-before: avoid;
        break-before: avoid;
      }

      /* Allow tables to break across pages but keep rows together */
      table {
        page-break-inside: auto;
      }

      /* Keep table title with its header */
      .table-title {
        page-break-after: avoid;
        break-after: avoid;
      }

      /* Keep subtotal and total rows together */
      .subtotal-row {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  </style>
  `;
}
