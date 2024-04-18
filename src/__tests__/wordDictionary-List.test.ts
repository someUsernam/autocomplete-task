import { describe, expect, it } from "vitest";
import { WordDictionary } from "../wordDictionary-List";

describe("WordDictionary-List", () => {
	it("should return all words that start with the given query", () => {
		const autoComplete = new WordDictionary();
		autoComplete.insert("car");
		autoComplete.insert("carpet");
		autoComplete.insert("java");
		autoComplete.insert("javascript");
		autoComplete.insert("internet");

		expect(autoComplete.search("c")).toEqual(["car", "carpet"]);
		expect(autoComplete.search("car")).toEqual(["car", "carpet"]);
		expect(autoComplete.search("carp")).toEqual(["carpet"]);
		expect(autoComplete.search("jav")).toEqual(["java", "javascript"]);
		expect(autoComplete.search("intern")).toEqual(["internet"]);
		expect(autoComplete.search("foo")).toEqual([]);
	});
});
