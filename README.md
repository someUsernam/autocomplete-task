## Assignment Solution

I have provided two solutions to the auto-completion problem.

### Solution 1: WordDictionary List

My initial intuitive approach was to use a simple ArrayList, `WordDictionary`, that stores the dictionary in an array and uses the `filter` method to find the auto-completion candidates. This solution is straightforward and easy to understand.

However, it may not be the most efficient for large dictionaries, as the search time would be proportional to the size of the dictionary.

[Solution](https://github.com/someUsernam/autocomplete-task/blob/main/src/wordDictionary-List.ts)

### Solution 2: WordDictionary Trie (better performance)

However, after further consideration, I realized that a more scalable and efficient solution would be to use a data structure called a "Trie" or "Prefix Tree". This data structure allows for fast prefix-based searches, which is exactly what we need for the auto-completion feature.

#### Tests

I have also attached tests for this implementation:
[TESTS](https://github.com/someUsernam/autocomplete-task/blob/main/src/__tests__/wordDictionary-Trie.test.ts)

you can clone repo and run this command `npm run test` to test these implementation;

#### WordDictionary Class

The `WordDictionary` class I've provided uses a Trie-based implementation. It has two main methods:

##### `insert(word)`

This method adds a word to the dictionary by building a tree-like structure, where each node represents a character in the word.

##### `search(query)`

This method takes a prefix as input and returns a list of all words in the dictionary that start with that prefix. It achieves this by performing a depth-first search (DFS) on the Trie structure, starting from the node that represents the given prefix.

```javascript
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
```
## Time Complexity

The time complexity of the `addWord` method is O(k), where k is the length of the word being added, as we need to traverse the Trie and create new nodes for each character in the word.

The time complexity of the `search` method is O(k + m), where k is the length of the prefix and m is the number of matching words, as we need to traverse the Trie to find the matching words and then return them.

This solution is more efficient than the initial array-based approach, especially for large dictionaries, as the search time is not dependent on the size of the dictionary, but rather on the length of the prefix.

## Conclusion

I had fun time writing out these implementations. Trie is definitly interresting one. While the basic Trie solution I provided is effective, I know there are more advanced variants that can offer even better performance. One such implementation is the Pruning Radix Trie, which is considered a state-of-the-art approach for large dictionaries. I would love to learn more about this and other Trie optimizations, but I think that would be beyond the scope of what was required for this particular task.

Thank you for your time and consideration.
