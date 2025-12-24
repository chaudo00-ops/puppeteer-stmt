import { DateTime } from "luxon";

type FormatMode = "machine_friendly" | "human_friendly";

/**
 * Options to control how the date should be formatted.
 */
type FormatOptions = {
	/** Input date — either an ISO string or a JS Date object */
	dateVal: string | Date;

	/** Optional timezone identifier, e.g. "America/New_York" */
	timeZone?: string;

	/** Whether to include hour and minute in the output (e.g., "Nov 1, 2025, 23:30") */
	showHour?: boolean;

	/** Whether to abbreviate the month name (e.g., "Nov" vs. "November") */
	monthAbbr?: boolean;

	/** Format mode: "technical" (machine-readable) or "human_friendly" (user-facing). Defaults to "human_friendly". */
	format?: FormatMode;

	/** Optional locale (e.g., "en", "fr", "de"). Affects month names and formatting conventions. */
	locale?: string;
};

/**
 * Date and time format patterns for different modes and styles.
 */
const PATTERN = {
	technical: {
		date: "yyyy-MM-dd",
		datetime: "yyyy-MM-dd, HH:mm",
	},
	human: {
		longDate: "MMMM d, yyyy",
		longDateTime: "MMMM d, yyyy, HH:mm",
		shortDate: "MMM d, yyyy",
		shortDateTime: "MMM d, yyyy, HH:mm",
	},
} as const;

/**
 * Chooses the appropriate Luxon format pattern string based on input options.
 *
 * @param opts
 * @returns A date/time format string compatible with Luxon’s `toFormat()`
 */
function resolvePattern(opts: { mode: FormatMode; showHour: boolean; monthAbbr: boolean }): string {
	const { mode, showHour, monthAbbr } = opts;

	if (mode === "machine_friendly") {
		// Technical formats are ISO-like and machine-friendly.
		return showHour ? PATTERN.technical.datetime : PATTERN.technical.date;
	}

	// Human-friendly formats (e.g., "Nov 1, 2025" or "November 1, 2025, 23:30")
	if (monthAbbr) {
		return showHour ? PATTERN.human.shortDateTime : PATTERN.human.shortDate;
	}
	return showHour ? PATTERN.human.longDateTime : PATTERN.human.longDate;
}

/**
 * Adds a trailing dot to English month abbreviations ("Jan.", "Feb.", etc.),
 * only if missing and only for English month tokens.
 *
 * @example
 * punctuateMonthAbbr("Nov 1, 2025") // → "Nov. 1, 2025"
 */
function punctuateMonthAbbr(output: string): string {
	return output.replace(/\b(Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b(?!\.)/g, "$1.");
}

/**
 * Formats a date according to the specified options.
 *
 * @param dateVal - The date to format. Can be a string (ISO format) or a JS Date object.
 * @param timeZone - Optional timezone identifier (e.g., "America/New_York").
 * @param showHour - Whether to include hour and minute (e.g., `true` → "Nov 1, 2025, 23:30").
 * @param monthAbbr - Whether to abbreviate month name ("Nov" instead of "November").
 * @param format - Output style. `"technical"` → machine-friendly (e.g., "2025-11-01, 23:30"); `"human_friendly"` → user-facing ("November 1, 2025, 23:30").
 * @param locale - Optional locale for month and date formatting.
 *
 * @returns A formatted date string.
 *
 * @example
 * formatDateDisplay({ dateVal: "2025-11-01T23:30", showHour: true })
 * // → "November 1, 2025, 23:30"
 *
 * @example
 * formatDateDisplay({ dateVal: "2025-11-01", monthAbbr: true })
 * // → "Nov. 1, 2025"
 *
 * @example
 * formatDateDisplay({ dateVal: "2025-11-01T23:30", format: "technical" })
 * // → "2025-11-01, 23:30"
 */
export function formatDateDisplay({
	dateVal,
	timeZone,
	showHour = false,
	monthAbbr = false,
	format = "human_friendly",
	locale,
}: FormatOptions): string {
	// 1) Normalize input
	let dt = typeof dateVal === "string" ? DateTime.fromISO(dateVal) : DateTime.fromJSDate(dateVal);

	if (!dt.isValid) {
		const reason = dt.invalidExplanation ?? dt.invalidReason ?? "Unknown reason";
		throw new Error(`Invalid date: ${reason}`);
	}

	// 2) Apply locale and timezone (if provided)
	if (locale) dt = dt.setLocale(locale);
	if (timeZone) dt = dt.setZone(timeZone);

	if (!dt.isValid) {
		const reason = dt.invalidExplanation ?? dt.invalidReason ?? "Unknown reason";
		throw new Error(`Invalid timezone or date after zone set: ${reason}`);
	}

	// 3) Determine the correct format pattern
	const pattern = resolvePattern({
		mode: format,
		showHour,
		monthAbbr,
	});

	// 4) Format the date and optionally punctuate abbreviated months
	const formatted = dt.toFormat(pattern);
	return monthAbbr ? punctuateMonthAbbr(formatted) : formatted;
}

export function replaceUnderscoreWithSpace(input: string): string {
	return input.replace(/_/g, " ");
}

/**
 * Returns the last calendar date of a given month.
 *
 * @param ym - A string representing a year and month in "YYYY-MM" format.
 *             Example: "2025-02".
 *
 * @returns A string representing the last day of that month in "YYYY-MM-DD" format.
 *          Handles leap years automatically.
 *
 * @example
 *   getLastDateOfMonth("2025-02"); // "2025-02-28"
 */
export function getLastDateOfMonth(ym: string): string {
	// ym = "2025-02" for example
	const [yearStr, monthStr] = ym.split("-");
	const year = Number(yearStr);
	const month = Number(monthStr);

	// Create a date for the *next* month, day=0 gives the last day of previous month
	const lastDay = new Date(year, month, 0).getDate();

	return `${yearStr}-${monthStr}-${String(lastDay).padStart(2, "0")}`;
}

/**
 * Formats a date range (link_time → unlink_time) into a condensed month/day display
 * for a specified target month, with full timezone-aware handling.
 *
 * Expected date format for link_time and unlink_time:
 *   "Sep. 16, 2025"   (3-letter month + period, day, year)
 *
 * target_month format:
 *   "YYYY-MM-01" (only the "YYYY-MM" portion is used)
 *
 * Behavior:
 *   - If link_time is before the target month → startDay = 1
 *   - If unlink_time is after the target month → endDay = last day of the month
 *   - Otherwise actual day values are used
 *   - Month name in the output always reflects target_month
 *
 * Returns a string like: "Sep. 1-15" or "Sep. 14-30"
 */

export function formatDateDisplay_MultiPaymentProfile(
	link_time: string,
	unlink_time: string,
	target_month: string,
	timeZone: string = "America/New_York",
): string {
	// Parse Date.toString() format directly
	const startDate = new Date(link_time);
	const endDate = new Date(unlink_time);

	// Get date components in the specified timezone
	const getDateInTimeZone = (date: Date): { year: number; month: number; day: number } => {
		const formatter = new Intl.DateTimeFormat("en-US", {
			timeZone,
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		});

		const parts = formatter.formatToParts(date);
		return {
			year: parseInt(parts.find(p => p.type === "year")!.value),
			month: parseInt(parts.find(p => p.type === "month")!.value),
			day: parseInt(parts.find(p => p.type === "day")!.value),
		};
	};

	// Extract YYYY-MM and parse target month
	const targetMonthStr = target_month.slice(0, 7); // "2025-09"
	const [targetYear, targetMonthNum] = targetMonthStr.split("-").map(Number);

	// Build first and last day of target month
	const firstOfMonth = new Date(targetYear, targetMonthNum - 1, 1);
	const lastOfMonth = new Date(targetYear, targetMonthNum, 0);

	// Get day numbers in the specified timezone
	const startDateInfo = getDateInTimeZone(startDate);
	const endDateInfo = getDateInTimeZone(endDate);
	const firstOfMonthInfo = getDateInTimeZone(firstOfMonth);
	const lastOfMonthInfo = getDateInTimeZone(lastOfMonth);

	// Compare dates to determine if clamping is needed
	const isStartBeforeMonth =
		startDateInfo.year < firstOfMonthInfo.year ||
		(startDateInfo.year === firstOfMonthInfo.year &&
			startDateInfo.month < firstOfMonthInfo.month) ||
		(startDateInfo.year === firstOfMonthInfo.year &&
			startDateInfo.month === firstOfMonthInfo.month &&
			startDateInfo.day < firstOfMonthInfo.day);

	const isEndAfterMonth =
		endDateInfo.year > lastOfMonthInfo.year ||
		(endDateInfo.year === lastOfMonthInfo.year && endDateInfo.month > lastOfMonthInfo.month) ||
		(endDateInfo.year === lastOfMonthInfo.year &&
			endDateInfo.month === lastOfMonthInfo.month &&
			endDateInfo.day > lastOfMonthInfo.day);

	// Determine final start and end days
	const startDay = isStartBeforeMonth ? 1 : startDateInfo.day;
	const endDay = isEndAfterMonth ? lastOfMonthInfo.day : endDateInfo.day;

	// Format month name in the timezone
	const targetMonthName =
		firstOfMonth.toLocaleString("en-US", {
			month: "short",
			timeZone,
		}) + ".";

	return `${targetMonthName} ${startDay}-${endDay}`;
}
