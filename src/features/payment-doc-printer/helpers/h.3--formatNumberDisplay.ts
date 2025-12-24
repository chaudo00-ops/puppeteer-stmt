interface FormatCurrencyOptions {
  stripCurrency?: boolean;
  forceMinorDecimals?: boolean;
}

export function formatCurrencyDisplay(
  value: string | number,
  options: FormatCurrencyOptions = {}
): string {
  const { stripCurrency = false, forceMinorDecimals = true } = options;
  const formatted = formatCurrency(value, {
    currency_unit: "minor",
    forceMinorDecimals,
  });

  if (stripCurrency) {
    // Remove everything that is not part of the number, decimal, minus sign
    // This will handle formats like "$400" or "-1.000.000.000.000 €"
    return formatted.replace(/[^\d.,-]/g, "").trim();
  }

  return formatted;
}

export function formatNumberDisplay(value: number): string {
  const negativeSign = value < 0 ? "-" : "";
  const numberString = Math.abs(value).toString().replace(/\D/g, "");

  return `${negativeSign}${numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
