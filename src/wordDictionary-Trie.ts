class WordDictionaryNode {
	children: Map<string, WordDictionaryNode>;
	isEnd: boolean;

	constructor() {
		this.children = new Map();
		this.isEnd = false;
	}
}

const doesChildrenNodeExist = (
	node: WordDictionaryNode | undefined,
): node is WordDictionaryNode => {
	return node !== undefined;
};

class WordDictionary {
	root: WordDictionaryNode;

	constructor() {
		this.root = new WordDictionaryNode();
	}

	addWord(word: string) {
		let node = this.root;
		for (const char of word) {
			let currentNode = node.children.get(char);

			if (!doesChildrenNodeExist(currentNode)) {
				currentNode = new WordDictionaryNode();
				node.children.set(char, currentNode);
			}
			node = currentNode;
		}
		node.isEnd = true;
	}

	search(query: string): string[] {
		let node = this.root;
		for (const char of query) {
			const currentNode = node.children.get(char);

			if (!doesChildrenNodeExist(currentNode)) {
				return [];
			}
			node = currentNode;
		}
		return this.dfs(node, query);
	}

	dfs(node: WordDictionaryNode, query: string): string[] {
		const result = [];
		if (node.isEnd) {
			result.push(query);
		}
		for (const [char, child] of node.children) {
			result.push(...this.dfs(child, query + char));
		}
		return result;
	}
}

const autoComplete = new WordDictionary();
autoComplete.addWord("car");
autoComplete.addWord("carpet");
autoComplete.addWord("java");
autoComplete.addWord("javascript");
autoComplete.addWord("internet");

console.log(autoComplete.search("c"));
console.log(autoComplete.search("car"));
console.log(autoComplete.search("carp"));
console.log(autoComplete.search("jav"));
console.log(autoComplete.search("intern"));
console.log(autoComplete.search("foo"));

// class WordDictionaryNode {
// 	constructor() {
// 		this.children = new Map();
// 		this.isEnd = false;
// 	}
// }

// class WordDictionary {
// 	constructor() {
// 		this.root = new WordDictionaryNode();
// 	}

// 	addWord(word) {
// 		let node = this.root;
// 		for (const char of word) {
// 			if (!node.children.get(char)) {
// 				node.children.set(char, new WordDictionaryNode());
// 			}
// 			node = node.children.get(char);
// 		}
// 		node.isEnd = true;
// 	}

// 	search(query) {
// 		let node = this.root;
// 		for (const char of query) {
// 			if (!node.children.get(char)) {
// 				return null;
// 			}
// 			node = node.children.get(char);
// 		}
// 		return node;
// 	}

// 	autocomplete(query) {
// 		const node = this.search(query);
// 		if (!node) {
// 			return [];
// 		}
// 		return this.dfs(node, query);
// 	}

// 	dfs(node, query) {
// 		const result = [];
// 		if (node.isEnd) {
// 			result.push(query);
// 		}
// 		for (const [char, child] of node.children) {
// 			result.push(...this.dfs(child, query + char));
// 		}
// 		return result;
// 	}
// }

export { WordDictionary };
