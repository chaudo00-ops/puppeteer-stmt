import {
	formatDateDisplay,
	formatDateDisplay_MultiPaymentProfile,
	getLastDateOfMonth,
} from "./h.3.1--formatDateDisplay";

describe("formatDateDisplay", () => {
	describe("valid date inputs: long format, with hours", () => {
		it("should handle different timezones correctly", () => {
			const input = "2025-07-16T12:00:00.000Z";

			const resultNY = formatDateDisplay({
				dateVal: input,
				timeZone: "America/New_York",
				showHour: true,
			});
			const resultTokyo = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Tokyo",
				showHour: true,
			});
			const resultLondon = formatDateDisplay({
				dateVal: input,
				timeZone: "Europe/London",
				showHour: true,
			});

			// New York is UTC-4 (EDT) in Jul., so 12:00 UTC becomes 08:00
			expect(resultNY).toBe("July 16, 2025, 08:00");

			// Tokyo is UTC+9, so 12:00 UTC becomes 21:00
			expect(resultTokyo).toBe("July 16, 2025, 21:00");

			// London is UTC+1 (BST) in Jul., so 12:00 UTC becomes 13:00
			expect(resultLondon).toBe("July 16, 2025, 13:00");
		});
	});

	describe("valid date inputs: human_friendly, long format, no hours", () => {
		it("should handle different timezones correctly", () => {
			const input = "2025-09-16T12:00:00.000Z";

			const result = formatDateDisplay({ dateVal: input });
			const resultNY = formatDateDisplay({ dateVal: input, timeZone: "America/New_York" });
			const resultTokyo = formatDateDisplay({ dateVal: input, timeZone: "Asia/Tokyo" });
			const resultLondon = formatDateDisplay({ dateVal: input, timeZone: "Europe/London" });

			expect(result).toBe("September 16, 2025");

			// New York is UTC-4 (EDT) in Jul., so 12:00 UTC becomes 08:00
			expect(resultNY).toBe("September 16, 2025");

			// Tokyo is UTC+9, so 12:00 UTC becomes 21:00
			expect(resultTokyo).toBe("September 16, 2025");

			// London is UTC+1 (BST) in Jul., so 12:00 UTC becomes 13:00
			expect(resultLondon).toBe("September 16, 2025");
		});
	});

	describe("valid date inputs: human_friendly, abbreviated format, with hours", () => {
		it("should handle different timezones correctly", () => {
			const input = "2025-07-16T12:00:00.000Z";

			const resultNY = formatDateDisplay({
				dateVal: input,
				timeZone: "America/New_York",
				showHour: true,
				monthAbbr: true,
			});
			const resultTokyo = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Tokyo",
				showHour: true,
				monthAbbr: true,
			});
			const resultLondon = formatDateDisplay({
				dateVal: input,
				timeZone: "Europe/London",
				showHour: true,
				monthAbbr: true,
			});

			// New York is UTC-4 (EDT) in Jul., so 12:00 UTC becomes 08:00
			expect(resultNY).toBe("Jul. 16, 2025, 08:00");

			// Tokyo is UTC+9, so 12:00 UTC becomes 21:00
			expect(resultTokyo).toBe("Jul. 16, 2025, 21:00");

			// London is UTC+1 (BST) in Jul., so 12:00 UTC becomes 13:00
			expect(resultLondon).toBe("Jul. 16, 2025, 13:00");
		});

		it("should handle May correctly", () => {
			const input = "2025-05-16T12:00:00.000Z";

			const resultLondon = formatDateDisplay({
				dateVal: input,
				timeZone: "Europe/London",
				showHour: true,
				monthAbbr: true,
			});
			// London is UTC+1 (BST) in Jul., so 12:00 UTC becomes 13:00
			expect(resultLondon).toBe("May 16, 2025, 13:00");
		});

		it("should handle ISO strings without milliseconds", () => {
			const input = "2025-07-16T20:00:00Z";
			const result = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Saigon",
				showHour: true,
				monthAbbr: true,
			});

			expect(result).toBe("Jul. 17, 2025, 03:00");
		});

		it("should handle ISO strings with timezone offset", () => {
			const input = "2025-07-16T15:00:00+02:00";
			const result = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Saigon",
				showHour: true,
				monthAbbr: true,
			});

			// 15:00+02:00 is 13:00 UTC, which becomes 20:00 in Asia/Saigon
			expect(result).toBe("Jul. 16, 2025, 20:00");
		});

		it("should handle dates across year boundaries", () => {
			const input = "2024-12-31T23:30:00.000Z";
			const result = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Saigon",
				showHour: true,
				monthAbbr: true,
			});

			// 23:30 UTC on Dec 31 becomes 06:30 on Jan 1 in Asia/Saigon
			expect(result).toBe("Jan. 1, 2025, 06:30");
		});

		it("should handle leap year dates", () => {
			const input = "2024-02-29T12:00:00.000Z";
			const result = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Saigon",
				showHour: true,
				monthAbbr: true,
			});

			expect(result).toBe("Feb. 29, 2024, 19:00");
		});
	});

	describe("valid date inputs: machine_friendly format, with hours", () => {
		it("should handle different timezones correctly", () => {
			const input = "2025-07-16T12:00:00.000Z";

			const resultNY = formatDateDisplay({
				dateVal: input,
				timeZone: "America/New_York",
				showHour: true,
				format: "machine_friendly",
			});
			const resultTokyo = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Tokyo",
				showHour: true,
				format: "machine_friendly",
			});
			const resultLondon = formatDateDisplay({
				dateVal: input,
				timeZone: "Europe/London",
				showHour: true,
				format: "machine_friendly",
			});

			// New York is UTC-4 (EDT) in Jul., so 12:00 UTC becomes 08:00
			expect(resultNY).toBe("2025-07-16, 08:00");

			// Tokyo is UTC+9, so 12:00 UTC becomes 21:00
			expect(resultTokyo).toBe("2025-07-16, 21:00");

			// London is UTC+1 (BST) in Jul., so 12:00 UTC becomes 13:00
			expect(resultLondon).toBe("2025-07-16, 13:00");
		});
	});
	describe("invalid date inputs", () => {
		it("should throw error for completely invalid date string", () => {
			const input = "not-a-date";

			expect(() => formatDateDisplay({ dateVal: input, timeZone: "Asia/Saigon" })).toThrow(
				"Invalid date",
			);
		});

		it("should throw error for malformed ISO string", () => {
			const input = "2025-13-45T25:70:00.000Z"; // Invalid month, day, hour, minute

			expect(() => formatDateDisplay({ dateVal: input, timeZone: "Asia/Saigon" })).toThrow(
				"Invalid date",
			);
		});

		it("should throw error for empty string", () => {
			const input = "";

			expect(() => formatDateDisplay({ dateVal: input, timeZone: "Asia/Saigon" })).toThrow(
				"Invalid date",
			);
		});
	});

	describe("timezone handling", () => {
		it("should handle invalid timezone gracefully", () => {
			const input = "2025-07-16T20:00:00.988Z";

			// Invalid timezone or date after zone set: the zone "Invalid/Timezone" is not supported

			expect(() =>
				formatDateDisplay({ dateVal: input, timeZone: "Invalid/Timezone" }),
			).toThrowError(/Invalid timezone/i);
		});

		it("should handle UTC timezone", () => {
			const input = "2025-07-16T20:00:00.988Z";
			const result = formatDateDisplay({ dateVal: input, timeZone: "UTC", showHour: true });

			expect(result).toBe("July 16, 2025, 20:00");
		});
	});

	describe("edge cases", () => {
		it("should handle very old dates", () => {
			const input = "1900-01-01T00:00:00.000Z";
			const result = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Saigon",
				showHour: true,
				monthAbbr: true,
			});

			// Note: Historical timezone data might vary
			expect(result).toContain("Jan. 1, 1900, 07:06");
		});

		it("should handle far future dates", () => {
			const input = "2100-12-31T23:59:59.999Z";
			const result = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Saigon",
				showHour: true,
				monthAbbr: true,
			});

			expect(result).toContain("Jan. 1, 2101, 06:59"); // Due to timezone offset
		});

		it("should handle dates with high precision milliseconds", () => {
			const input = "2025-07-16T20:00:00.123456Z";
			const result = formatDateDisplay({
				dateVal: input,
				timeZone: "Asia/Saigon",
				showHour: true,
				monthAbbr: true,
			});

			// Should still work even with microsecond precision (though only ms are preserved)
			expect(result).toBe("Jul. 17, 2025, 03:00");
		});
	});
});

describe("getLastDateOfMonth", () => {
	test("returns last day for a 31-day month", () => {
		expect(getLastDateOfMonth("2025-01")).toBe("2025-01-31");
		expect(getLastDateOfMonth("2025-07")).toBe("2025-07-31");
	});

	test("returns last day for a 30-day month", () => {
		expect(getLastDateOfMonth("2025-04")).toBe("2025-04-30");
		expect(getLastDateOfMonth("2025-11")).toBe("2025-11-30");
	});

	test("returns correct date for February in a normal year", () => {
		expect(getLastDateOfMonth("2025-02")).toBe("2025-02-28");
		expect(getLastDateOfMonth("2023-02")).toBe("2023-02-28");
	});

	test("returns correct date for February in a leap year", () => {
		expect(getLastDateOfMonth("2024-02")).toBe("2024-02-29");
		expect(getLastDateOfMonth("2032-02")).toBe("2032-02-29");
	});

	test("preserves leading zeros in month and day", () => {
		expect(getLastDateOfMonth("2025-03")).toBe("2025-03-31"); // day padded
		expect(getLastDateOfMonth("2025-09")).toBe("2025-09-30"); // month padded
	});

	test("works for year boundaries", () => {
		expect(getLastDateOfMonth("2025-12")).toBe("2025-12-31");
		expect(getLastDateOfMonth("2026-01")).toBe("2026-01-31");
	});
});

describe("formatDateDisplay_MultiPaymentProfile", () => {
	const targetMonth = "2025-09-01"; // September 2025
	const timeZone = "UTC";

	test("same-month normal range", () => {
		const result = formatDateDisplay_MultiPaymentProfile(
			"2025-09-10",
			"2025-09-20",
			targetMonth,
			timeZone,
		);
		expect(result).toBe("Sep. 10-20");
	});

	test("startDate < target month → clamp startDay to 1", () => {
		const result = formatDateDisplay_MultiPaymentProfile(
			"2025-04-30",
			"2025-09-15",
			targetMonth,
			timeZone,
		);
		expect(result).toBe("Sep. 1-15");
	});

	test("endDate > target month → clamp endDay to last day of month", () => {
		const result = formatDateDisplay_MultiPaymentProfile(
			"2025-09-14",
			"2025-11-15",
			targetMonth,
			timeZone,
		);
		expect(result).toBe("Sep. 14-30"); // September has 30 days
	});

	test("start and end both outside → full month", () => {
		const result = formatDateDisplay_MultiPaymentProfile(
			"2025-01-01",
			"2025-12-31",
			targetMonth,
			timeZone,
		);
		expect(result).toBe("Sep. 1-30");
	});

	test("startDate equals first day of month → no clamping", () => {
		const result = formatDateDisplay_MultiPaymentProfile(
			"2025-09-01",
			"2025-09-10",
			targetMonth,
			timeZone,
		);
		expect(result).toBe("Sep. 1-10");
	});

	test("endDate equals last day of month → no clamping", () => {
		const result = formatDateDisplay_MultiPaymentProfile(
			"2025-09-10",
			"2025-09-30",
			targetMonth,
			timeZone,
		);
		expect(result).toBe("Sep. 10-30");
	});
});
