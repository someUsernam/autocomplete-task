# Assignment Submission

Hello,

I hope this message finds you well. I am writing to submit the assignment you provided for the internship position.

First, let me express my gratitude for the opportunity to demonstrate my skills and problem-solving abilities. I was excited to receive your email and dive into the task at hand.

## Assignment Solution

As per your instructions, I have provided two solutions to the auto-completion problem.

### Solution 1: AutoComplete Class

My initial intuitive approach was to use a simple class, `AutoComplete`, that stores the dictionary in an array and uses the `filter` method to find the auto-completion candidates. This solution is straightforward and easy to understand.

However, it may not be the most efficient for large dictionaries, as the search time would be proportional to the size of the dictionary.

```javascript

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

```