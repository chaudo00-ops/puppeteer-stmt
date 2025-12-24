import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { type TSupportedLanguage } from "./h.0--translations";
import type { TInvoiceDetails_Display } from "./h.0--types";
import {
	buildInvoicePagesHtml,
	type InvoiceTemplateContext,
} from "./h.5.2--buildInvoicePagesHtml";
import { buildInvoiceStyles } from "./h.5.3--buildInvoiceStyles";

type InvoiceHtmlOptions = {
	title: string;
	language: TSupportedLanguage;
};

const FONT_FAMILY_MAP: Record<TSupportedLanguage, string> = {
	en: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
	"zh-CN": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans SC', 'Microsoft YaHei', 'PingFang SC', sans-serif`,
	"zh-TW": `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans TC', 'Microsoft JhengHei', 'PingFang TC', sans-serif`,
	vi: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
	ko: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans KR', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif`,
	ja: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'Meiryo', sans-serif`,
	es: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
};

async function loadLogoBase64(): Promise<string> {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	const logoPath = path.join(__dirname, "..", "assets", "images", "gjw-logo-optimized.png");
	const logoBuffer = await fs.readFile(logoPath);
	return `data:image/png;base64,${logoBuffer.toString("base64")}`;
}

export async function generateInvoiceHtmlTemplate(
	details: TInvoiceDetails_Display,
	options: InvoiceHtmlOptions,
): Promise<string> {
	const logoBase64 = await loadLogoBase64();
	const fontFamily = FONT_FAMILY_MAP[options.language];

	const templateContext: InvoiceTemplateContext = {
		title: options.title,
		logoBase64,
		payment: details.payment,
		paymentProfile: details.paymentProfile,
	};

	const pagesHtml = buildInvoicePagesHtml(templateContext);
	const styles = buildInvoiceStyles(fontFamily);

	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  ${styles}
</head>
<body>
  ${pagesHtml}
</body>
</html>
`;
}
