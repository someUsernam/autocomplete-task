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

	insert(word: string) {
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
		if (query.length === 0) return [];

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

export { WordDictionary };
