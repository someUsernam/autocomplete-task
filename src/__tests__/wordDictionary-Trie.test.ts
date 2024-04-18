import { faker } from "@faker-js/faker";
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
			const result = wordDictionary.search(word);

			// then
			expect(result).toEqual(expectedResult);
		},
	);

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

	it("should return results when 10,000 words are inserted", () => {
		// given
		const wordDictionary = new WordDictionary();
		insertManyWords(wordDictionary, generatedNames);

		// when
		const result = wordDictionary.search("A");

		// then
		expect(result.length).toBeGreaterThan(0);
	});

	it("should not throw error when 1 million word search", () => {
		// given
		const wordDictionary = new WordDictionary();
		const words = Array.from({ length: 1000000 }, () =>
			faker.person.firstName(),
		);
		insertManyWords(wordDictionary, words);

		// then
		expect(() => {
			// when
			wordDictionary.search("A");
		}).not.toThrow();
	});
});
