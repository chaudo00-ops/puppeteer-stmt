import { STATEMENT_PREFIX, TCreateBillingStatementPdfParams } from "../--IPMTDocPrinter";
import { uploadFileForUser } from "../helpers/h.3--uploadFileForUser";
import { uint8ArrayToBuffer } from "../../../shared/helpers/uint8array-to-buffer";

export async function saveStatement(
	params: TCreateBillingStatementPdfParams,
	pdf: Uint8Array,
): Promise<string> {
	const { sub_acc_id, month: month_date, language } = params;
	/** month formatted as YYYY-mm */
	const month = month_date.toISOString().substring(0, 7);
	const languageSuffix = language === "zh-CN" ? "-zh" : "";
	const upload_res = await uploadFileForUser(
		sub_acc_id,
		`${STATEMENT_PREFIX}${sub_acc_id}-${month}${languageSuffix}.pdf`,
		{ buffer: uint8ArrayToBuffer(pdf) },
		undefined,
		"private",
	);

	return upload_res.new_file_name;
}
