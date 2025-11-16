/**
 * Format currency with proper commas and decimal places
 * @param value - The value to format (in minor units, e.g., cents)
 * @param options - Formatting options
 * @returns Formatted currency string
 */
function formatCurrency(
	value: string | number,
	options: { currency_unit: "minor" | "major" } = { currency_unit: "minor" }
): string {
	const numValue = typeof value === "string" ? parseFloat(value) : value;

	// Convert from minor units (cents) to major units (dollars) if needed
	const majorValue = options.currency_unit === "minor" ? numValue / 100 : numValue;

	// Format with 2 decimal places and thousands separator
	const formatted = Math.abs(majorValue).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// Add sign
	const sign = majorValue < 0 ? "-" : "";

	return `${sign}$${formatted}`;
}

export function formatCurrencyDisplay(value: string | number): string {
	return formatCurrency(value, { currency_unit: "minor" });
}

export function formatNumberDisplay(value: number): string {
	const negativeSign = value < 0 ? "-" : "";
	const numberString = Math.abs(value).toString().replace(/\D/g, "");

	return `${negativeSign}${numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
