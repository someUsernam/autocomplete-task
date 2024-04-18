class WordDictionary {
	dictionary: string[];

	constructor() {
		this.dictionary = [];
	}

	insert(word: string) {
		this.dictionary.push(word);
	}

	search(query: string): string[] {
		if (query.length === 0) return [];
		return this.dictionary.filter((word) => word.startsWith(query));
	}
}

const wordDictionary = new WordDictionary();
wordDictionary.insert("car");
wordDictionary.insert("carpet");
wordDictionary.insert("java");
wordDictionary.insert("javascript");
wordDictionary.insert("internet");

console.log(wordDictionary.search("c"));
console.log(wordDictionary.search("car"));
console.log(wordDictionary.search("carp"));
console.log(wordDictionary.search("jav"));
console.log(wordDictionary.search("intern"));
console.log(wordDictionary.search("foo"));

export { WordDictionary };
