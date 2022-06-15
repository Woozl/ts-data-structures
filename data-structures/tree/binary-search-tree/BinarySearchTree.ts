import ListNode from "../../singly-linked-list/ListNode";
import BinaryTreeNode from "./BinaryTreeNode";

export default class BinarySearchTree<T> {
    root: BinaryTreeNode<T> | null;
    sort: (a: T, b: T) => number;

    constructor(sort: (a: T, b: T) => number) {
        this.root = null;
        this.sort = sort;
    }

    insert(val: T): BinaryTreeNode<T> {
        if(this.root === null) {
            this.root = new BinaryTreeNode(val);
            return this.root;
        }

        let currentNode: BinaryTreeNode<T> | null = this.root;
        let parentNode = this.root;
        while(currentNode !== null) {
            parentNode = currentNode;

            // val < currentNode.value, go down left branch
            if(this.sort(val, currentNode.value) < 0)
                currentNode = currentNode.left;
            
            // val >= currentNode.value, go down right branch
            else
                currentNode = currentNode.right;
        }

        if(this.sort(val, parentNode.value) < 0) {
            parentNode.left = new BinaryTreeNode(val);
            return parentNode.left;
        }
        else {
            parentNode.right = new BinaryTreeNode(val);
            return parentNode.right;
        }

    }

    /**
     * 
     * @param val value to search the tree for
     * @returns the `BinaryTreeNode`, or `null` if not found
     */
    find(val: T): BinaryTreeNode<T> | null {
        if(this.root === null) return null;

        let currentNode: BinaryTreeNode<T> | null = this.root;

        while(currentNode !== null && currentNode.value !== val) {
            if(this.sort(val, currentNode.value) < 0) {
                currentNode = currentNode.left;
            }
            else {
                currentNode = currentNode.right;
            }
        }

        if(currentNode !== null && currentNode.value === val) return currentNode;

        return null;
    }

    /**
     * Traverses the tree in-order (Left, Node, Right)
     * @example
     * ```txt
     *      3
     *    /   \
     *   1     5
     *  / \   / \
     * 0   3 4   6
     * In-order: 0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6
     * ```
     * @returns an array containg the values of the tree
     * in-order
     */
    inorder(): T[] {
        if(this.root === null) return [];
        const vals: T[] = [];

        const stack: BinaryTreeNode<T>[] = [];
        let currentNode: BinaryTreeNode<T> | null = this.root;
        
        while(stack.length > 0 || currentNode !== null) {
            while(currentNode) {
                stack.push(currentNode);
                currentNode = currentNode.left;
            }
            const popped = stack.pop();
            vals.push(popped!.value);
            currentNode = popped!.right;
        }

        return vals;
    }

    preorder(): T[] {
        return [];
    }

    postorder(): T[] {
        return[];
    }

    /**
     * @returns true if the tree is empty
     */
    isEmpty(): boolean {
        return this.root === null;
    }

    /**
     * Pretty prints the tree.
     * @example
     * ```txt
     * ╰── 3
     *     ├── 5
     *     │   ├── 6
     *     │   ╰── 4
     *     ╰── 1
     *         ├── 2
     *         ╰── 0
     * ```
     */
    print() {
        if(this.root === null) {
            console.log("Tree is empty!");
            return;
        }

        const printTree = (node: BinaryTreeNode<T> | null, prefix: string, last: boolean) => {
            if(node === null) return;

            let printString = prefix;
            if(last) {
                printString += "╰── ";
                prefix += "    ";
            } else {
                printString += "├── ";
                prefix += "│   ";
            }
            console.log(printString + node.value);
            
            if(node.right && node.left) {
                printTree(node.right, prefix, false);
                printTree(node.left, prefix, true);
            } 
            else if(node.right || node.left) {
                printTree(node.right || node.left, prefix, true);
            }
            else {
                return;
            }
        }
        
        printTree(this.root, '', true);   
    }
}