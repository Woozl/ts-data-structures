/**
 * Defines a trie node with a `children` variable mapping
 * string characters to children `TrieNodes` and an 
 * `isEndOfWord` boolean to represent the end of an inserted
 * string.
 */
export default class TrieNode {
    children: Map<string, TrieNode>;
    isEndOfWord: boolean;

    constructor() {
        this.children = new Map<string, TrieNode>();
        this.isEndOfWord = false;
    }
}