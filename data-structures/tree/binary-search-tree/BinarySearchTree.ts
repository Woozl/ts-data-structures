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
     * Deletes the first node encountered with the value equal to `val`
     * @param val value of node to delete
     * @returns the deleted node or null if the value is not in the tree
     */
    delete(val: T): BinaryTreeNode<T> | null {
        if(this.root === null) return null;

        let deleteNode: BinaryTreeNode<T> | null = this.root;
        let parentNode = this.root;
        while(deleteNode !== null && deleteNode.value !== val) {
            parentNode = deleteNode;

            if(this.sort(val, deleteNode.value) < 0)
                deleteNode = deleteNode.left;
            else
                deleteNode = deleteNode.right;
        }

        // if the delete value wasn't found in the tree
        if(deleteNode === null || deleteNode.value !== val) return null;

        // case 1: the node to be deleted is the root and has no children
        if(deleteNode === this.root && deleteNode.left === null && deleteNode.right === null) {
            const deleteCopy = deleteNode;
            this.root = null;
            return deleteCopy;
        }
        
        // case 2: if the node to be deleted has no children
        if(deleteNode.left === null && deleteNode.right === null) {
            if(this.sort(val, parentNode.value) < 0)
                parentNode.left = null;
            else
                parentNode.right = null;

            return deleteNode;
        }

        // case 3: node has one child
        if((deleteNode.left !== null && deleteNode.right === null) ||
           (deleteNode.left === null && deleteNode.right !== null)) {
            if(deleteNode === this.root) 
                this.root = deleteNode.left || deleteNode.right;
            else if(this.sort(val, parentNode.value) < 0)
                parentNode.left = deleteNode.left || deleteNode.right;
            else
                parentNode.right = deleteNode.left || deleteNode.right;

            return deleteNode;
        }

        // case 4: node has two children
        if(deleteNode.left !== null && deleteNode.right !== null) {
            // find inorder successor
            let inorderSuccessor = deleteNode.right;
            let inorderParent = deleteNode;
            while(inorderSuccessor.left !== null) {
                inorderParent = inorderSuccessor;
                inorderSuccessor = inorderSuccessor.left;
            }
            
            // copy inorder successor's value to the node to be deleted
            deleteNode.value = inorderSuccessor.value; 
            
            // remove inorder successor:

            // inorder successor has one child
            if(inorderSuccessor.left === null && inorderSuccessor.right === null) {
                if(this.sort(inorderSuccessor.value, inorderParent.value) < 0)
                    inorderParent.left = null;
                else
                    inorderParent.right = null;
            }
            // inorder successor has right child
            if(inorderSuccessor.left === null && inorderSuccessor.right !== null) {
                inorderParent.right = inorderSuccessor.right;
            }

            return deleteNode;
        }

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