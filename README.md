# Assignment Submission

Hello,

I hope this message finds you well. I am writing to submit the assignment you provided for the internship position.

First, let me express my gratitude for the opportunity to demonstrate my skills and problem-solving abilities. I was excited to receive your email and dive into the task at hand.

## Assignment Solution

I have provided two solutions to the auto-completion problem.

### Solution 1: WordDictionary List

My initial intuitive approach was to use a simple ArrayList, `WordDictionary`, that stores the dictionary in an array and uses the `filter` method to find the auto-completion candidates. This solution is straightforward and easy to understand.

However, it may not be the most efficient for large dictionaries, as the search time would be proportional to the size of the dictionary.

Solution: https://github.com/someUsernam/autocomplete-task/blob/main/src/wordDictionary-List.ts

However, after further consideration, I realized that a more scalable and efficient solution would be to use a data structure called a "Trie" or "Prefix Tree". This data structure allows for fast prefix-based searches, which is exactly what we need for the auto-completion feature.

### Solution 2: WordDictionary Trie (better performance)

#### WordDictionary Class

The `WordDictionary` class I've provided uses a Trie-based implementation. It has two main methods:

##### `addWord(word)`

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
```
## Time Complexity

The time complexity of the `addWord` method is O(k), where k is the length of the word being added, as we need to traverse the Trie and create new nodes for each character in the word.

The time complexity of the `search` method is O(k + m), where k is the length of the prefix and m is the number of matching words, as we need to traverse the Trie to find the matching words and then return them.

This solution is more efficient than the initial array-based approach, especially for large dictionaries, as the search time is not dependent on the size of the dictionary, but rather on the length of the prefix.

## Conclusion

I hope this explanation of my thought process and the provided solution is helpful. Please let me know if you have any further questions or if there's anything else I can do to assist with the internship application.

Thank you for your time and consideration.
