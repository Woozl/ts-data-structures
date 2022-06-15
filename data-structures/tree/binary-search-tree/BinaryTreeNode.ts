export default class BinaryTreeNode<T> {
    value: T;
    left: BinaryTreeNode<T> | null;
    right: BinaryTreeNode<T> | null;

    constructor(value: T, left=null, right=null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}