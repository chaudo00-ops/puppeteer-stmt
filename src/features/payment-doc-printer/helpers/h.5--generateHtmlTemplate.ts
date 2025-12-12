import { type TBillingStatementTranslations, type TSupportedLanguage } from "./h.0--translations";
import type { TBillingStatementDetails_Display } from "./h.0--types";
import { prepareTemplateContext } from "./h.5.1--prepareTemplateContext";
import { buildPagesHtml } from "./h.5.2--buildPagesHtml";
import { buildDocumentStyles } from "./h.5.3--buildDocumentStyles";

/**
 * Generate HTML template for billing statement by composing the three helper modules.
 */
export async function generateHtmlTemplate(
	displayed_details: TBillingStatementDetails_Display,
	translations: TBillingStatementTranslations,
	language: TSupportedLanguage,
): Promise<string> {
	const templateContext = await prepareTemplateContext(displayed_details, translations, language);

	const pagesHtml = buildPagesHtml(templateContext, translations, language);
	const styles = buildDocumentStyles(templateContext.fontFamily);

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
