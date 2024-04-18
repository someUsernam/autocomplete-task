class WordDictionary {
	dictionary: string[];

	constructor() {
		this.dictionary = [];
	}

	insert(word: string) {
		this.dictionary.push(word);
	}

	search(query: string): string[] {
		return this.dictionary.filter((word) => word.startsWith(query));
	}
}

const autoComplete = new WordDictionary();
autoComplete.insert("car");
autoComplete.insert("carpet");
autoComplete.insert("java");
autoComplete.insert("javascript");
autoComplete.insert("internet");

console.log(autoComplete.search("c"));
console.log(autoComplete.search("car"));
console.log(autoComplete.search("carp"));
console.log(autoComplete.search("jav"));
console.log(autoComplete.search("intern"));
console.log(autoComplete.search("foo"));

export { WordDictionary };
