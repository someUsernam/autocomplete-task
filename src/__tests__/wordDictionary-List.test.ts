import { describe, expect, it } from "vitest";
import { WordDictionary } from "../wordDictionary-List";

describe("WordDictionary-List", () => {
	it("should return all words that start with the given query", () => {
		const wordDictionary = new WordDictionary();
		wordDictionary.insert("car");
		wordDictionary.insert("carpet");
		wordDictionary.insert("java");
		wordDictionary.insert("javascript");
		wordDictionary.insert("internet");

		expect(wordDictionary.search("c")).toEqual(["car", "carpet"]);
		expect(wordDictionary.search("car")).toEqual(["car", "carpet"]);
		expect(wordDictionary.search("carp")).toEqual(["carpet"]);
		expect(wordDictionary.search("jav")).toEqual(["java", "javascript"]);
		expect(wordDictionary.search("intern")).toEqual(["internet"]);
		expect(wordDictionary.search("foo")).toEqual([]);
	});
});
