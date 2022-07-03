import TrieNode from "./TrieNode";

/**
 * Defines a Trie (Prefix Tree) that can store
 * a set of string keys. 
 */
export default class Trie {
    private root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    /**
     * Inserts a string key
     * @param string key to be stored
     */
    insert(string: string) {

    }

    /**
     * Deletes a string key
     * @param string key to be deleted
     */
    delete(string: string) {

    }

    /**
     * Checks if a string is in the Trie
     * @param string key to be searched
     * @returns true if the word is in the Trie
     */
    hasWord(string: string): boolean {

        return false;
    }

    /**
     * Checks if the Trie contains a prefix
     * @param string key to be searched
     * @returns true if the word is in the Trie
     */
    hasPrefix(string: string): boolean {

        return false;
    }
}