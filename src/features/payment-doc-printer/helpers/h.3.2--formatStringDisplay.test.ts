import { joinWithAnd } from "./h.3.2--formatStringDisplay";

describe("joinWithAnd", () => {
	test("returns empty string for empty array", () => {
		expect(joinWithAnd([])).toBe("");
	});

	test("returns the single item for array of length 1", () => {
		expect(joinWithAnd(["apple"])).toBe("apple");
	});

	test("joins two items with 'and'", () => {
		expect(joinWithAnd(["apple", "banana"])).toBe("apple and banana");
	});

	test("joins three items with commas and Oxford comma", () => {
		expect(joinWithAnd(["apple", "banana", "cherry"])).toBe("apple, banana, and cherry");
	});

	test("joins many items correctly", () => {
		expect(joinWithAnd(["a", "b", "c", "d"])).toBe("a, b, c, and d");
	});

	test("handles items containing spaces", () => {
		expect(joinWithAnd(["New York", "Los Angeles", "Chicago"])).toBe(
			"New York, Los Angeles, and Chicago",
		);
	});

	test("does not mutate the original array", () => {
		const items = ["a", "b", "c"];
		joinWithAnd(items);
		expect(items).toEqual(["a", "b", "c"]);
	});
});
