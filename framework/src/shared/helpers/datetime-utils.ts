import { DateTime } from "luxon";
/**
 *
 * @param timezone
 * @param useShortHourForm boolean. Default to false.
 * @returns For example: "-4", "+11", "+9.30" if useShortHourForm is true;
 *      Return "-04:00", "+11:00", "+09.30" if useShortHourForm is false.
 */
export function getUTCOffsetDisplay(timezone: string, useShortHourForm: boolean = false): string {
	const dt = DateTime.now().setZone(timezone);
	let result = dt.toFormat("ZZ");
	result = useShortHourForm
		? result
				.replace("+00:00", "")
				.replace(":00", "")
				.replace(/([+-])0(?=\d)/, "$1")
		: result;
	return result;
}

export function getDateStringWithoutHour(dStr: Date | string | undefined): string {
	if (!dStr) return "";

	const date = dStr instanceof Date ? dStr : new Date(dStr);

	const isValidDate = !isNaN(date.getTime());
	if (!isValidDate) return "";

	date.setHours(12); // To avoid the error caused by timezone difference of user
	return date.toISOString().split("T")[0];
}
