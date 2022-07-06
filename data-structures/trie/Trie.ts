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
        let currentNode = this.root;

        for(const c of string) {
            if(currentNode.children.has(c)) {
                currentNode = currentNode.children.get(c)!;
            }
            else {
                currentNode.children.set(c, new TrieNode());
                currentNode = currentNode.children.get(c)!;
            }
        }

        currentNode.isEndOfWord = true;
    }

    /**
     * Deletes a string key if it is in the Trie
     * @param string key to be deleted
     */
    delete(string: string) {
        const recurse = (s = string, node = this.root, level = 0): boolean => {
            if(level === s.length) {
                if(node.children.size > 0) {
                    node.isEndOfWord = false;
                    return false;
                }
                else {
                    return true;
                }
            }
            
            const childDeleted = recurse(s, node.children.get(s[level])!, level + 1);

            if(childDeleted) {
                node.children.delete(s[level]);
            }

            return false;
        };

        recurse();
    }

    /**
     * Checks if a string is in the Trie
     * @param string key to be searched
     * @returns true if the word is in the Trie
     */
    hasWord(string: string): boolean {
        let currentNode = this.root;
        
        for(const c of string) {
            if(!currentNode.children.has(c)) return false;

            currentNode = currentNode.children.get(c)!;
        }

        return currentNode.isEndOfWord;
    }

    /**
     * Checks if the Trie contains a prefix
     * @param string key to be searched
     * @returns true if the word is in the Trie
     */
    hasPrefix(string: string): boolean {
        let currentNode = this.root;

        for(const c of string) {
            if(!currentNode.children.has(c)) return false;

            currentNode = currentNode.children.get(c)!;
        }

        return true;
    }

    /**
     * Pretty prints the tree. Asterisks represent
     * end of key.
     * @example
     * Trie containing 'app', 'apple', 'answer', and 'any'
     * ```txt
     * ╰── root
     *      ╰── a
     *          ├── p
     *          │   ╰── p*
     *          │       ╰── l
     *          │           ╰── e*
     *          ╰── n
     *              ├── s
     *              │   ╰── w
     *              │       ╰── e
     *              │           ╰── r*
     *              ╰── y*
     * ```
     */
    print() {
        const printTree = (node: TrieNode | null, prefix: string, last: boolean, c: string) => {
            if(node !== null) {

                let printString = prefix;
                if(last) {
                    printString += "╰── ";
                    prefix += "    ";
                } else {
                    printString += "├── ";
                    prefix += "│   ";
                }
                console.log(printString + c);

                let numChildren = node.children.size;
                if(numChildren > 0) {
                    for(const child of node.children) {
                        --numChildren;

                        if(numChildren === 0) // change to curved bracket for final child
                            printTree(child[1], prefix, true, `${child[0]}${child[1].isEndOfWord ? '*' : ''}`);
                        else
                            printTree(child[1], prefix, false, `${child[0]}${child[1].isEndOfWord ? '*' : ''}`);
                    }
                }
                else {
                    return;
                }
            }
        }
        
        printTree(this.root, '', true, 'root');   
    }
}