import puppeteer from "puppeteer-core";
import puppeteerFull from "puppeteer";
import chromium from "@sparticuz/chromium";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync, existsSync } from "fs";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Type definitions
type Language = "en" | "zh-TW" | "zh-CN" | "vi" | "ko" | "ja" | "es";

interface Translations {
  billingStatements: string;
  billTo: string;
  details: string;
  accountId: string;
  paymentsProfile: string;
  paymentsProfileId: string;
  statementIssueDate: string;
  summary: string;
  summaryFor: string;
  openingBalance: string;
  totalAdSpend: string;
  totalPaymentsReceived: string;
  closingBalance: string;
  activityDetails: string;
  description: string;
  impressions: string;
  amount: string;
  subtotal: string;
  total: string;
  paymentsReceived: string;
  date: string;
  tax: string;
}

interface BillTo {
  name: string;
  company: string;
  address: string;
}

interface Details {
  accountId: string;
  paymentsProfile: string;
  paymentsProfileId: string;
  statementIssueDate: string;
}

interface Summary {
  period: string;
  openingBalance: string;
  totalAdSpend: string;
  totalPaymentsReceived: string;
  closingBalance: string;
}

interface Campaign {
  description: string;
  impressions: string;
  amount: string;
}

interface Payment {
  date: string;
  description: string;
  amount: string;
}

interface Totals {
  subtotal: string;
  total: string;
  tax: string;
  totalPaymentsReceived: string;
}

interface BillingData {
  billTo: BillTo;
  details: Details;
  summary: Summary;
  campaigns: Campaign[];
  payments: Payment[];
  totals: Totals;
}

// Billing data (English version)
const billingDataEn: BillingData = {
  billTo: {
    name: "Annie Y",
    company: "Shen Yun New York",
    address: "US, 10940",
  },
  details: {
    accountId: "111222333",
    paymentsProfile: "Shen Yun New York",
    paymentsProfileId: "444-555-6666",
    statementIssueDate: "May 25, 2025",
  },
  summary: {
    period: "Sep. 1, 2025 – Sep. 30, 2025",
    openingBalance: "$10,000",
    totalAdSpend: "-$1,300",
    totalPaymentsReceived: "$1,657.26",
    closingBalance: "$8,900",
  },
  campaigns: [
    {
      description:
        "Spring Breaking Business: All Chinese New Year's Investments, Participation, 2018, 2018, 2018 Spring Breaking Business: All Chinese New Year's Investments, Participation, 2018, 2018, 2018 Spring Breaking Business: All Chinese New Year's Investments, Participation, 2018, 2018, 2018",
      impressions: "98,765",
      amount: "-$123.45",
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      description: `Campaign ${i}`,
      impressions: "98,765",
      amount: "-$123.45",
    })),
  ],
  payments: Array.from({ length: 10 }, () => ({
    date: "2025-11-15, 16:07 (UTC-05:00)",
    description: "Mastercard ***8888",
    amount: "$300",
  })),
  totals: {
    subtotal: "-$8,247.50",
    total: "-$8,247.50",
    tax: "-$148.50",
    totalPaymentsReceived: "$1,657.26",
  },
};

// Billing data (Traditional Chinese version)
const billingDataZhTW: BillingData = {
  billTo: {
    name: "楊安妮",
    company: "神韻紐約",
    address: "美國, 10940",
  },
  details: {
    accountId: "111222333",
    paymentsProfile: "神韻紐約",
    paymentsProfileId: "444-555-6666",
    statementIssueDate: "2025年5月25日",
  },
  summary: {
    period: "2025年9月1日 – 2025年9月30日",
    openingBalance: "$10,000",
    totalAdSpend: "-$1,300",
    totalPaymentsReceived: "$1,657.26",
    closingBalance: "$8,900",
  },
  campaigns: [
    // Add one long campaign name to test overflow
    {
      description:
        "春季大型促銷活動：全球華人新年慶典特別推廣計劃，包含線上線下整合行銷方案 春季大型促銷活動：全球華人新年慶典特別推廣計劃，包含線上線下整合行銷方案",
      impressions: "98,765",
      amount: "-$123.45",
    },
    {
      description:
        "春季大型促銷活動：全球華人新年慶典特別推廣計劃，包含線上線下整合行銷方案 春季大型促銷活動：全球華人新年慶典特別推廣計劃，包含線上線下整合行銷方案 春季大型促銷活動：全球華人新年慶典特別推廣計劃，包含線上線下整合行銷方案 春季大型促銷活動：全球華人新年慶典特別推廣計劃，包含線上線下整合行銷方案",
      impressions: "98,765",
      amount: "-$123.45",
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      description: `廣告活動 ${i + 1}`,
      impressions: "98,765",
      amount: "-$123.45",
    })),
  ],
  payments: Array.from({ length: 10 }, () => ({
    date: "2025-11-15, 16:07 (UTC-05:00)",
    description: "萬事達卡 ***8888",
    amount: "$300",
  })),
  totals: {
    subtotal: "-$8,247.50",
    total: "-$8,247.50",
    tax: "-$148.50",
    totalPaymentsReceived: "$1,657.26",
  },
};

// Billing data (Chinese Simplified version)
const billingDataZhCN: BillingData = {
  billTo: {
    name: "杨安妮",
    company: "神韵纽约",
    address: "美国, 10940",
  },
  details: {
    accountId: "111222333",
    paymentsProfile: "神韵纽约",
    paymentsProfileId: "444-555-6666",
    statementIssueDate: "2025年5月25日",
  },
  summary: {
    period: "2025年9月1日 – 2025年9月30日",
    openingBalance: "$10,000",
    totalAdSpend: "-$1,300",
    totalPaymentsReceived: "$1,657.26",
    closingBalance: "$8,900",
  },
  campaigns: [
    {
      description:
        "春季大型促销活动：全球华人新年庆典特别推广计划，包含线上线下整合营销方案",
      impressions: "98,765",
      amount: "-$123.45",
    },
    ...Array.from({ length: 90 }, (_, i) => ({
      description: `广告活动 ${i + 1}`,
      impressions: "98,765",
      amount: "-$123.45",
    })),
  ],
  payments: Array.from({ length: 99 }, () => ({
    date: "2025-11-15, 16:07 (UTC-05:00)",
    description: "万事达卡 ***8888",
    amount: "$300",
  })),
  totals: {
    subtotal: "-$8,247.50",
    total: "-$8,247.50",
    tax: "-$148.50",
    totalPaymentsReceived: "$1,657.26",
  },
};

// Billing data (Vietnamese version)
const billingDataVi: BillingData = {
  billTo: {
    name: "Annie Y",
    company: "Shen Yun New York",
    address: "Hoa Kỳ, 10940",
  },
  details: {
    accountId: "111222333",
    paymentsProfile: "Shen Yun New York",
    paymentsProfileId: "444-555-6666",
    statementIssueDate: "25 tháng 5, 2025",
  },
  summary: {
    period: "1 tháng 9, 2025 – 30 tháng 9, 2025",
    openingBalance: "$10,000",
    totalAdSpend: "-$1,300",
    totalPaymentsReceived: "$1,657.26",
    closingBalance: "$8,900",
  },
  campaigns: [
    {
      description:
        "Chiến dịch quảng cáo mùa xuân lớn: Kế hoạch khuyến mãi đặc biệt cho lễ hội năm mới toàn cầu",
      impressions: "98,765",
      amount: "-$123.45",
    },
    ...Array.from({ length: 90 }, (_, i) => ({
      description: `Chiến dịch ${i + 1}`,
      impressions: "98,765",
      amount: "-$123.45",
    })),
  ],
  payments: Array.from({ length: 99 }, () => ({
    date: "2025-11-15, 16:07 (UTC-05:00)",
    description: "Mastercard ***8888",
    amount: "$300",
  })),
  totals: {
    subtotal: "-$8,247.50",
    total: "-$8,247.50",
    tax: "-$148.50",
    totalPaymentsReceived: "$1,657.26",
  },
};

// Billing data (Korean version)
const billingDataKo: BillingData = {
  billTo: {
    name: "애니 Y",
    company: "션윈 뉴욕",
    address: "미국, 10940",
  },
  details: {
    accountId: "111222333",
    paymentsProfile: "션윈 뉴욕",
    paymentsProfileId: "444-555-6666",
    statementIssueDate: "2025년 5월 25일",
  },
  summary: {
    period: "2025년 9월 1일 – 2025년 9월 30일",
    openingBalance: "$10,000",
    totalAdSpend: "-$1,300",
    totalPaymentsReceived: "$1,657.26",
    closingBalance: "$8,900",
  },
  campaigns: [
    {
      description:
        "봄 대규모 프로모션 캠페인: 글로벌 중국 설날 축제 특별 홍보 계획, 온오프라인 통합 마케팅 솔루션 포함",
      impressions: "98,765",
      amount: "-$123.45",
    },
    ...Array.from({ length: 90 }, (_, i) => ({
      description: `광고 캠페인 ${i + 1}`,
      impressions: "98,765",
      amount: "-$123.45",
    })),
  ],
  payments: Array.from({ length: 99 }, () => ({
    date: "2025-11-15, 16:07 (UTC-05:00)",
    description: "Mastercard ***8888",
    amount: "$300",
  })),
  totals: {
    subtotal: "-$8,247.50",
    total: "-$8,247.50",
    tax: "-$148.50",
    totalPaymentsReceived: "$1,657.26",
  },
};

// Billing data (Japanese version)
const billingDataJa: BillingData = {
  billTo: {
    name: "アニー Y",
    company: "シェンユン・ニューヨーク",
    address: "アメリカ, 10940",
  },
  details: {
    accountId: "111222333",
    paymentsProfile: "シェンユン・ニューヨーク",
    paymentsProfileId: "444-555-6666",
    statementIssueDate: "2025年5月25日",
  },
  summary: {
    period: "2025年9月1日 – 2025年9月30日",
    openingBalance: "$10,000",
    totalAdSpend: "-$1,300",
    totalPaymentsReceived: "$1,657.26",
    closingBalance: "$8,900",
  },
  campaigns: [
    {
      description:
        "春の大規模プロモーションキャンペーン：グローバル中国新年祭特別プロモーション計画、オンライン・オフライン統合マーケティングソリューションを含む",
      impressions: "98,765",
      amount: "-$123.45",
    },
    ...Array.from({ length: 90 }, (_, i) => ({
      description: `広告キャンペーン ${i + 1}`,
      impressions: "98,765",
      amount: "-$123.45",
    })),
  ],
  payments: Array.from({ length: 99 }, () => ({
    date: "2025-11-15, 16:07 (UTC-05:00)",
    description: "Mastercard ***8888",
    amount: "$300",
  })),
  totals: {
    subtotal: "-$8,247.50",
    total: "-$8,247.50",
    tax: "-$148.50",
    totalPaymentsReceived: "$1,657.26",
  },
};

// Billing data (Spanish version)
const billingDataEs: BillingData = {
  billTo: {
    name: "Annie Y",
    company: "Shen Yun New York",
    address: "EE.UU., 10940",
  },
  details: {
    accountId: "111222333",
    paymentsProfile: "Shen Yun New York",
    paymentsProfileId: "444-555-6666",
    statementIssueDate: "25 de mayo de 2025",
  },
  summary: {
    period: "1 de sep. de 2025 – 30 de sep. de 2025",
    openingBalance: "$10,000",
    totalAdSpend: "-$1,300",
    totalPaymentsReceived: "$1,657.26",
    closingBalance: "$8,900",
  },
  campaigns: [
    {
      description:
        "Campaña de promoción masiva de primavera: Plan de promoción especial del Festival de Año Nuevo Chino global, incluye solución de marketing integrado en línea y fuera de línea",
      impressions: "98,765",
      amount: "-$123.45",
    },
    ...Array.from({ length: 90 }, (_, i) => ({
      description: `Campaña ${i + 1}`,
      impressions: "98,765",
      amount: "-$123.45",
    })),
  ],
  payments: Array.from({ length: 99 }, () => ({
    date: "2025-11-15, 16:07 (UTC-05:00)",
    description: "Mastercard ***8888",
    amount: "$300",
  })),
  totals: {
    subtotal: "-$8,247.50",
    total: "-$8,247.50",
    tax: "-$148.50",
    totalPaymentsReceived: "$1,657.26",
  },
};

// Function to get billing data based on language
function getBillingData(language: Language): BillingData {
  switch (language) {
    case "zh-TW":
      return billingDataZhTW;
    case "zh-CN":
      return billingDataZhCN;
    case "vi":
      return billingDataVi;
    case "ko":
      return billingDataKo;
    case "ja":
      return billingDataJa;
    case "es":
      return billingDataEs;
    default:
      return billingDataEn;
  }
}

// Load and convert optimized logo to base64
const logoPath = join(__dirname, "src", "assets", "logo-optimized.png");
const logoBuffer = readFileSync(logoPath);
const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

// Translations
const translations: Record<Language, Translations> = {
  en: {
    billingStatements: "Billing Statements",
    billTo: "Bill To",
    details: "Details",
    accountId: "Account ID",
    paymentsProfile: "Payments profile",
    paymentsProfileId: "Payments profile ID",
    statementIssueDate: "Statement issue date",
    summary: "Summary",
    summaryFor: "Summary for",
    openingBalance: "Opening balance",
    totalAdSpend: "Total ad spend",
    totalPaymentsReceived: "Total payments received",
    closingBalance: "Closing balance",
    activityDetails: "Activity Details",
    description: "Description",
    impressions: "Impressions",
    amount: "Amount",
    subtotal: "Subtotal",
    total: "Total",
    paymentsReceived: "Payments Received",
    date: "Date",
    tax: "Tax",
  },
  "zh-TW": {
    billingStatements: "帳單報表",
    billTo: "帳單收件人",
    details: "詳細資訊",
    accountId: "帳戶 ID",
    paymentsProfile: "付款資料",
    paymentsProfileId: "付款資料 ID",
    statementIssueDate: "對帳單發出日期",
    summary: "摘要",
    summaryFor: "摘要",
    openingBalance: "期初餘額",
    totalAdSpend: "廣告總支出",
    totalPaymentsReceived: "總收款金額",
    closingBalance: "期末餘額",
    activityDetails: "活動詳情",
    description: "說明",
    impressions: "曝光次數",
    amount: "金額",
    subtotal: "小計",
    total: "總計",
    paymentsReceived: "已收款項",
    date: "日期",
    tax: "稅金",
  },
  "zh-TW": {
    billingStatements: "帳單報表",
    billTo: "帳單收件人",
    details: "詳細資訊",
    accountId: "帳戶 ID",
    paymentsProfile: "付款資料",
    paymentsProfileId: "付款資料 ID",
    statementIssueDate: "對帳單發出日期",
    summary: "摘要",
    summaryFor: "摘要",
    openingBalance: "期初餘額",
    totalAdSpend: "廣告總支出",
    totalPaymentsReceived: "總收款金額",
    closingBalance: "期末餘額",
    activityDetails: "活動詳情",
    description: "說明",
    impressions: "曝光次數",
    amount: "金額",
    subtotal: "小計",
    total: "總計",
    paymentsReceived: "已收款項",
    date: "日期",
    tax: "稅金",
  },
  "zh-CN": {
    billingStatements: "账单报表",
    billTo: "账单收件人",
    details: "详细信息",
    accountId: "账户 ID",
    paymentsProfile: "付款资料",
    paymentsProfileId: "付款资料 ID",
    statementIssueDate: "对账单发出日期",
    summary: "摘要",
    summaryFor: "摘要",
    openingBalance: "期初余额",
    totalAdSpend: "广告总支出",
    totalPaymentsReceived: "总收款金额",
    closingBalance: "期末余额",
    activityDetails: "活动详情",
    description: "说明",
    impressions: "曝光次数",
    amount: "金额",
    subtotal: "小计",
    total: "总计",
    paymentsReceived: "已收款项",
    date: "日期",
    tax: "税金",
  },
  vi: {
    billingStatements: "Báo cáo thanh toán",
    billTo: "Gửi hóa đơn đến",
    details: "Chi tiết",
    accountId: "ID tài khoản",
    paymentsProfile: "Hồ sơ thanh toán",
    paymentsProfileId: "ID hồ sơ thanh toán",
    statementIssueDate: "Ngày phát hành báo cáo",
    summary: "Tóm tắt",
    summaryFor: "Tóm tắt cho",
    openingBalance: "Số dư đầu kỳ",
    totalAdSpend: "Tổng chi tiêu quảng cáo",
    totalPaymentsReceived: "Tổng số tiền đã nhận",
    closingBalance: "Số dư cuối kỳ",
    activityDetails: "Chi tiết hoạt động",
    description: "Mô tả",
    impressions: "Lượt hiển thị",
    amount: "Số tiền",
    subtotal: "Tổng phụ",
    total: "Tổng cộng",
    paymentsReceived: "Thanh toán đã nhận",
    date: "Ngày",
    tax: "Thuế",
  },
  ko: {
    billingStatements: "청구서",
    billTo: "청구 대상",
    details: "세부 정보",
    accountId: "계정 ID",
    paymentsProfile: "결제 프로필",
    paymentsProfileId: "결제 프로필 ID",
    statementIssueDate: "명세서 발행일",
    summary: "요약",
    summaryFor: "요약",
    openingBalance: "기초 잔액",
    totalAdSpend: "총 광고 지출",
    totalPaymentsReceived: "총 수령액",
    closingBalance: "기말 잔액",
    activityDetails: "활동 세부정보",
    description: "설명",
    impressions: "노출수",
    amount: "금액",
    subtotal: "소계",
    total: "합계",
    paymentsReceived: "수령한 결제",
    date: "날짜",
    tax: "세금",
  },
  ja: {
    billingStatements: "請求書",
    billTo: "請求先",
    details: "詳細",
    accountId: "アカウントID",
    paymentsProfile: "支払いプロファイル",
    paymentsProfileId: "支払いプロファイルID",
    statementIssueDate: "明細書発行日",
    summary: "概要",
    summaryFor: "概要",
    openingBalance: "期首残高",
    totalAdSpend: "広告費総額",
    totalPaymentsReceived: "受取総額",
    closingBalance: "期末残高",
    activityDetails: "アクティビティの詳細",
    description: "説明",
    impressions: "インプレッション数",
    amount: "金額",
    subtotal: "小計",
    total: "合計",
    paymentsReceived: "受領済み支払い",
    date: "日付",
    tax: "税",
  },
  es: {
    billingStatements: "Extractos de facturación",
    billTo: "Facturar a",
    details: "Detalles",
    accountId: "ID de cuenta",
    paymentsProfile: "Perfil de pagos",
    paymentsProfileId: "ID de perfil de pagos",
    statementIssueDate: "Fecha de emisión del extracto",
    summary: "Resumen",
    summaryFor: "Resumen de",
    openingBalance: "Saldo inicial",
    totalAdSpend: "Gasto total en anuncios",
    totalPaymentsReceived: "Total de pagos recibidos",
    closingBalance: "Saldo final",
    activityDetails: "Detalles de actividad",
    description: "Descripción",
    impressions: "Impresiones",
    amount: "Cantidad",
    subtotal: "Subtotal",
    total: "Total",
    paymentsReceived: "Pagos recibidos",
    date: "Fecha",
    tax: "Impuesto",
  },
};

// HTML template
const generateHTML = (
  data: BillingData,
  logoDataUrl: string,
  language: Language = "en"
): string => {
  const t = translations[language];
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', 'Noto Sans SC', 'Noto Sans KR', 'Noto Sans JP', 'Malgun Gothic', 'Yu Gothic', sans-serif;
      font-size: 14px;
      color: #333;
      line-height: 1.5;
      padding: 40px 60px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 40px;
    }

    .header h1 {
      font-size: 36px;
      font-weight: 400;
      color: #333;
    }

    .logo {
      width: 120px;
      height: auto;
    }

    .bill-to {
      margin-bottom: 40px;
    }

    .bill-to h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 12px;
    }

    .bill-to p {
      color: #555;
      margin: 4px 0;
    }

    .details-summary-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #e0e0e0;
    }

    .details h2, .summary h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .detail-row, .summary-row {
      display: flex;
      justify-content: space-between;
      margin: 8px 0;
      color: #555;
    }

    .detail-row::after, .summary-row::after {
      content: '';
      flex: 1;
      border-bottom: 1px dotted #ccc;
      margin: 0 10px;
      align-self: flex-end;
      margin-bottom: 4px;
    }

    .detail-label, .summary-label {
      white-space: nowrap;
    }

    .detail-value, .summary-value {
      white-space: nowrap;
      font-weight: 500;
    }

    .activity-details {
      margin-bottom: 40px;
    }

    .activity-details h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    thead {
      background-color: #2c4a6e;
      color: white;
    }

    th {
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      font-size: 14px;
    }

    th:last-child, td:last-child {
      text-align: right;
    }

    tbody tr:nth-child(odd) {
      background-color: #f8f9fa;
    }

    tbody tr:nth-child(even) {
      background-color: white;
    }

    td {
      padding: 12px 16px;
      color: #333;
    }

    .total-row {
      background-color: white !important;
    }

    .total-row td {
      font-weight: 600;
      font-size: 16px;
      padding: 16px;
    }

    .subtotal-row td {
      text-align: right;
      padding: 12px 16px;
      font-weight: 500;
    }

    .payments-received {
      margin-top: 40px;
    }

    .payments-received h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
    }

    /* Page break handling */
    .page-break {
      page-break-before: always;
    }

    @media print {
      body {
        padding: 20px 40px;
      }
    }
  </style>
</head>
<body>
  <!-- Page 1 -->
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="bill-to">
    <h2>${t.billTo}</h2>
    <p>${data.billTo.name}</p>
    <p>${data.billTo.company}</p>
    <p>${data.billTo.address}</p>
  </div>

  <div class="details-summary-container">
    <div class="details">
      <h2>${t.details}</h2>
      <div class="detail-row">
        <span class="detail-label">${t.accountId}</span>
        <span class="detail-value">${data.details.accountId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${t.paymentsProfile}</span>
        <span class="detail-value">${data.details.paymentsProfile}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${t.paymentsProfileId}</span>
        <span class="detail-value">${data.details.paymentsProfileId}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">${t.statementIssueDate}</span>
        <span class="detail-value">${data.details.statementIssueDate}</span>
      </div>
    </div>

    <div class="summary">
      <h2>${t.summaryFor} ${data.summary.period}</h2>
      <div class="summary-row">
        <span class="summary-label">${t.openingBalance}</span>
        <span class="summary-value">${data.summary.openingBalance}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${t.totalAdSpend}</span>
        <span class="summary-value">${data.summary.totalAdSpend}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${t.totalPaymentsReceived}</span>
        <span class="summary-value">${data.summary.totalPaymentsReceived}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">${t.closingBalance}</span>
        <span class="summary-value">${data.summary.closingBalance}</span>
      </div>
    </div>
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns
          .slice(0, 12)
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 2 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns
          .slice(12, 32)
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 3 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns
          .slice(32, 52)
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 4 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns
          .slice(52, 72)
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 5 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="activity-details">
    <h2>${t.activityDetails}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.description}</th>
          <th>${t.impressions}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.campaigns
          .slice(72)
          .map(
            (campaign) => `
          <tr>
            <td>${campaign.description}</td>
            <td>${campaign.impressions}</td>
            <td>${campaign.amount}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="subtotal-row">
          <td></td>
          <td style="text-align: right;">${t.subtotal} :</td>
          <td>${data.totals.subtotal}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">${t.total} :</td>
          <td>${data.totals.total}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Page 6 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments
          .slice(0, 20)
          .map(
            (payment) => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 7 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments
          .slice(20, 40)
          .map(
            (payment) => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 8 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments
          .slice(40, 60)
          .map(
            (payment) => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 9 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments
          .slice(60, 80)
          .map(
            (payment) => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>

  <!-- Page 10 -->
  <div class="page-break"></div>
  <div class="header">
    <h1>${t.billingStatements}</h1>
    <img src="${logoDataUrl}" alt="Gaming World Logo" class="logo" />
  </div>

  <div class="payments-received">
    <h2>${t.paymentsReceived}</h2>
    <table>
      <thead>
        <tr>
          <th>${t.date}</th>
          <th>${t.description}</th>
          <th>${t.amount}</th>
        </tr>
      </thead>
      <tbody>
        ${data.payments
          .slice(80)
          .map(
            (payment) => `
          <tr>
            <td>${payment.date}</td>
            <td>${payment.description}</td>
            <td>${payment.amount}</td>
          </tr>
        `
          )
          .join("")}
        <tr class="subtotal-row">
          <td></td>
          <td style="text-align: right;">${t.tax} :</td>
          <td>${data.totals.tax}</td>
        </tr>
        <tr class="total-row">
          <td></td>
          <td style="text-align: right;">${t.totalPaymentsReceived}</td>
          <td>${data.totals.totalPaymentsReceived}</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
</html>
`;
};

const languageNames: Record<Language, string> = {
  en: "English",
  "zh-TW": "Traditional Chinese",
  "zh-CN": "Simplified Chinese",
  vi: "Vietnamese",
  ko: "Korean",
  ja: "Japanese",
  es: "Spanish",
};

/**
 * Get browser launch configuration based on platform
 * - macOS/Windows (development): Use puppeteer's bundled Chromium
 * - Linux (production/Lambda): Use @sparticuz/chromium
 */
async function getBrowserConfig() {
  const platform = os.platform();
  const isProduction = process.env.NODE_ENV === "production";
  const isLambda = !!process.env.AWS_LAMBDA_FUNCTION_NAME;

  // Use @sparticuz/chromium for Linux/production/Lambda
  if (platform === "linux" || isProduction || isLambda) {
    console.log("Using @sparticuz/chromium for production/Linux environment");
    return {
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    };
  }

  // For development (macOS/Windows), use puppeteer's bundled Chrome
  console.log("Using puppeteer bundled Chromium for development");

  // Get the bundled Chromium path from puppeteer
  let execPath: string | undefined;
  try {
    execPath = puppeteerFull.executablePath();
    console.log(`Found bundled Chromium at: ${execPath}`);
  } catch (error) {
    console.log("Could not find bundled Chromium, trying system Chrome...");

    // Fallback to system Chrome if bundled Chromium not found
    const executablePaths = {
      darwin: [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
      ],
      win32: [
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      ],
    };

    const paths = executablePaths[platform as keyof typeof executablePaths] || [];
    execPath = paths.find((p) => existsSync(p));

    if (execPath) {
      console.log(`Found system Chrome at: ${execPath}`);
    }
  }

  return {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
    ...(execPath && { executablePath: execPath }),
  };
}

async function generatePDF(language: Language = "en"): Promise<void> {
  console.log(`Launching browser for ${languageNames[language]} PDF...`);
  const browserConfig = await getBrowserConfig();
  const browser = await puppeteer.launch(browserConfig);

  const page = await browser.newPage();

  console.log("Setting content...");
  const billingData = getBillingData(language);
  const html = generateHTML(billingData, logoBase64, language);
  await page.setContent(html, { waitUntil: "networkidle0" });

  console.log("Generating PDF...");
  const outputPath = join(
    __dirname,
    "src",
    "output-pdfs",
    `generated-billing-statement-${language}.pdf`
  );

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "20px",
      right: "40px",
      bottom: "20px",
      left: "40px",
    },
    tagged: false,
    outline: false,
    scale: 1.0,
    preferCSSPageSize: true,
  });

  await browser.close();

  console.log(`PDF generated successfully: ${outputPath}`);
}

// Main execution
async function main(): Promise<void> {
  const languages: Language[] = [
    "en",
    "zh-TW",
    "zh-CN",
    "vi",
    "ko",
    "ja",
    "es",
  ];

  console.log("Starting PDF generation for all 7 languages...\n");

  for (const language of languages) {
    await generatePDF(language);
    console.log("");
  }

  console.log("All 7 language PDFs generated successfully!");
  console.log("\nGenerated files:");
  languages.forEach((lang) => {
    console.log(
      `  - generated-billing-statement-${lang}.pdf (${languageNames[lang]})`
    );
  });
}

main().catch(console.error);
