import { formatCurrency } from "df-helpers/dist/format-currency";

export function formatCurrencyDisplay(value: string | number): string {
	return formatCurrency(value, { currency_unit: "minor" });
}

export function formatNumberDisplay(value: number): string {
	const negativeSign = value < 0 ? "-" : "";
	const numberString = Math.abs(value).toString().replace(/\D/g, "");

	return `${negativeSign}${numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
