import { formatCurrencyDisplay, formatNumberDisplay } from "./h.3--formatNumberDisplay";

describe("formatCurrencyDisplay", () => {
	test("positive number", () => {
		// Positive values
		expect(formatCurrencyDisplay(100000000000000)).toMatchInlineSnapshot(
			`"$1,000,000,000,000.00"`,
		);

		expect(formatCurrencyDisplay(123456789)).toMatchInlineSnapshot(`"$1,234,567.89"`);
		expect(formatCurrencyDisplay(1789023)).toMatchInlineSnapshot(`"$17,890.23"`);
		expect(formatCurrencyDisplay(165726)).toMatchInlineSnapshot(`"$1,657.26"`);
		expect(formatCurrencyDisplay(4100)).toMatchInlineSnapshot(`"$41.00"`);
		expect(formatCurrencyDisplay(7780)).toMatchInlineSnapshot(`"$77.80"`);
		expect(formatCurrencyDisplay(306)).toMatchInlineSnapshot(`"$3.06"`);
		expect(formatCurrencyDisplay(52)).toMatchInlineSnapshot(`"$0.52"`);
		expect(formatCurrencyDisplay(2)).toMatchInlineSnapshot(`"$0.02"`);
		expect(formatCurrencyDisplay(0)).toMatchInlineSnapshot(`"$0.00"`);
	});
	test("negative number", () => {
		// Negative values
		expect(formatCurrencyDisplay(-100000000000000)).toMatchInlineSnapshot(
			`"-$1,000,000,000,000.00"`,
		);

		expect(formatCurrencyDisplay(-123456789)).toMatchInlineSnapshot(`"-$1,234,567.89"`);
		expect(formatCurrencyDisplay(-1789023)).toMatchInlineSnapshot(`"-$17,890.23"`);
		expect(formatCurrencyDisplay(-165726)).toMatchInlineSnapshot(`"-$1,657.26"`);
		expect(formatCurrencyDisplay(-4100)).toMatchInlineSnapshot(`"-$41.00"`);
		expect(formatCurrencyDisplay(-7780)).toMatchInlineSnapshot(`"-$77.80"`);
		expect(formatCurrencyDisplay(-306)).toMatchInlineSnapshot(`"-$3.06"`);
		expect(formatCurrencyDisplay(-52)).toMatchInlineSnapshot(`"-$0.52"`);
		expect(formatCurrencyDisplay(-2)).toMatchInlineSnapshot(`"-$0.02"`);
		expect(formatCurrencyDisplay(-0)).toMatchInlineSnapshot(`"-$0.00"`);
	});

	test("strip currency", () => {
		// Positive values
		expect(formatCurrencyDisplay(123456789, { stripCurrency: true })).toMatchInlineSnapshot(
			`"1,234,567.89"`,
		);
		expect(formatCurrencyDisplay(1789023, { stripCurrency: true })).toMatchInlineSnapshot(
			`"17,890.23"`,
		);
		expect(formatCurrencyDisplay(4100, { stripCurrency: true })).toMatchInlineSnapshot(
			`"41.00"`,
		);
		expect(formatCurrencyDisplay(-7780, { stripCurrency: true })).toMatchInlineSnapshot(
			`"-77.80"`,
		);
		expect(formatCurrencyDisplay(-306, { stripCurrency: true })).toMatchInlineSnapshot(
			`"-3.06"`,
		);
		expect(formatCurrencyDisplay(0, { stripCurrency: true })).toMatchInlineSnapshot(`"0.00"`);
	});

	test("force minor decimals", () => {
		// Positive values
		expect(formatCurrencyDisplay(4100, { forceMinorDecimals: false })).toMatchInlineSnapshot(
			`"$41"`,
		);
	});
});

describe("formatNumberDisplay", () => {
	test("positive number", () => {
		// Positive values
		expect(formatNumberDisplay(0)).toMatchInlineSnapshot(`"0"`);

		expect(formatNumberDisplay(1)).toMatchInlineSnapshot(`"1"`);
		expect(formatNumberDisplay(11)).toMatchInlineSnapshot(`"11"`);
		expect(formatNumberDisplay(111)).toMatchInlineSnapshot(`"111"`);
		expect(formatNumberDisplay(1111)).toMatchInlineSnapshot(`"1,111"`);
		expect(formatNumberDisplay(11111)).toMatchInlineSnapshot(`"11,111"`);
		expect(formatNumberDisplay(111111)).toMatchInlineSnapshot(`"111,111"`);
	});

	test("negative number", () => {
		// Negative values
		expect(formatNumberDisplay(-1)).toMatchInlineSnapshot(`"-1"`);
		expect(formatNumberDisplay(-11)).toMatchInlineSnapshot(`"-11"`);
		expect(formatNumberDisplay(-111)).toMatchInlineSnapshot(`"-111"`);
		expect(formatNumberDisplay(-1111)).toMatchInlineSnapshot(`"-1,111"`);
		expect(formatNumberDisplay(-11111)).toMatchInlineSnapshot(`"-11,111"`);
		expect(formatNumberDisplay(-111111)).toMatchInlineSnapshot(`"-111,111"`);
	});
});
