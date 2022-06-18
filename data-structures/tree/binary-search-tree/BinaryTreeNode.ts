export default class BinaryTreeNode<T> {
    value: T;
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;

    constructor(value: T, left?: BinaryTreeNode<T>, right?: BinaryTreeNode<T>) {
        this.value = value;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}