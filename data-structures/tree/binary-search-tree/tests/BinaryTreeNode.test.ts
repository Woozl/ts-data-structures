import BinaryTreeNode from "../BinaryTreeNode";

describe('BinaryTreeNode', () => {
    it('should create a new node with an initialized value', () => {
        const node = new BinaryTreeNode<number>(1);
        expect(node.value).toBe(1)
    });

    it('should allow children nodes', () => {
        const nodeA = new BinaryTreeNode<number>(3);
        const nodeB = new BinaryTreeNode<number>(1);
        const nodeC = new BinaryTreeNode<number>(2, nodeB, nodeA);
        expect(nodeC.left?.value).toBe(1);
        expect(nodeC.right?.value).toBe(3);
    });

    it('should set children nodes to null if not initialized', () => {
        const node = new BinaryTreeNode<number>(1);
        expect(node.left).toBeNull();
        expect(node.right).toBeNull();
    });
});