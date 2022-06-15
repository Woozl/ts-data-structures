import BinarySearchTree from "../BinarySearchTree";

describe('BinarySearchTree', () => {
    it('should add and find items in the tree', () => {
        let bst = new BinarySearchTree<number>((a, b) => a-b);
        bst.insert(0);
        bst.insert(1);
        const two = bst.insert(2);
        bst.insert(3);
        bst.insert(4);
        bst.insert(5);
        const six = bst.insert(6);
        bst.insert(7);
        bst.insert(8);
        bst.insert(9);
        expect(bst.find(6)).toBe(six);
        expect(bst.find(2)).toBe(two);
    });

    it('should store and traverse nodes in order', () => {
        let arr = [];
        let bst = new BinarySearchTree<number>((a,b) => a-b);
        for(let i = 0; i < 100; ++i) {
            arr.push(i);
            bst.insert(i);
        }
        expect(bst.inorder()).toEqual(arr);
    });
});