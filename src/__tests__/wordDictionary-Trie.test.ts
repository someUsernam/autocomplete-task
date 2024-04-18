import { describe, expect, it } from "vitest";
import { WordDictionary } from "../wordDictionary-Trie";
import { generatedNames } from "./generatedNames";

const insertManyWords = (wordDictionary: WordDictionary, words: string[]) => {
	for (const word of words) {
		wordDictionary.insert(word);
	}
};

const words = ["car", "carpet", "java", "javascript", "internet"];

describe("WordDictionary-Trie", () => {
	it("should return all words that start with the given query", () => {
		const wordDictionary = new WordDictionary();
		insertManyWords(wordDictionary, words);

		expect(wordDictionary.search("c")).toEqual(["car", "carpet"]);
		expect(wordDictionary.search("car")).toEqual(["car", "carpet"]);
		expect(wordDictionary.search("carp")).toEqual(["carpet"]);
		expect(wordDictionary.search("jav")).toEqual(["java", "javascript"]);
		expect(wordDictionary.search("intern")).toEqual(["internet"]);
		expect(wordDictionary.search("foo")).toEqual([]);
	});

	it.each`
		word      | expectedResult
		${"car"}  | ${["car", "carpet"]}
		${"java"} | ${["java", "javascript"]}
	`(
		"should return multiple results=$expectedResult when full phrase=$word is searched",
		({ word, expectedResult }) => {
			// given
			const wordDictionary = new WordDictionary();
			insertManyWords(wordDictionary, words);

			// when
			const result = wordDictionary.search(word);

			// then
			expect(result).toEqual(expectedResult);
		},
	);

	it.each`
		word     | expectedResult
		${"ca"}  | ${["car", "carpet"]}
		${"jav"} | ${["java", "javascript"]}
	`(
		"should return multiple results=$expectedResult when partial phrase=$word is searched",
		({ word, expectedResult }) => {
			// given
			const wordDictionary = new WordDictionary();
			insertManyWords(wordDictionary, words);

			// when
			const partialPhrase1 = wordDictionary.search(word);

			// then
			expect(partialPhrase1).toEqual(expectedResult);
		},
	);

	it("should not throw error when 10,000 word search", () => {
		// given
		const wordDictionary = new WordDictionary();
		insertManyWords(wordDictionary, generatedNames);

		// then
		expect(() => {
			// when
			wordDictionary.search("a");
		}).not.toThrow();
	});

	it("should return empty search result when there is no words", () => {
		// given
		const wordDictionary = new WordDictionary();

		// when
		const result = wordDictionary.search("a");

		// then
		expect(result).toEqual([]);
	});

	it("should return empty search result when empty string is passed", () => {
		// given
		const wordDictionary = new WordDictionary();
		insertManyWords(wordDictionary, generatedNames);

		// when
		const result = wordDictionary.search("");

		// then
		expect(result).toEqual([]);
	});

	it("should return string array when 10000 words are passed", () => {
		// given
		const wordDictionary = new WordDictionary();
		insertManyWords(wordDictionary, generatedNames);

		// when
		const result = wordDictionary.search("a");

		// then
		expect(result).toEqual(expect.any(Array));
	});
});
