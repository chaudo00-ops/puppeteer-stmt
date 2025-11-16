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
	return output.replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b(?!\.)/g, "$1.");
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
