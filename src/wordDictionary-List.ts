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

export { WordDictionary };
