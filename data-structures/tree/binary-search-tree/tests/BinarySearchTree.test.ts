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

    it('should sort tree according to sort callback', () => {
        const strings = BinarySearchTree.from(['swing', 'play', 'laugh', 'ride'], (a,b) => a.localeCompare(b));
        expect(strings.inorder()).toEqual(['laugh', 'play', 'ride', 'swing']);

        const numbers = BinarySearchTree.from([3, 1, 0, 2, 8, 6, 5, 4, 7], (a,b) => a-b);
        expect(numbers.inorder()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    });

    describe('from', () => {
        it('should create a new BinarySearchTree from an Iterable', () => { 
            const bst = BinarySearchTree.from([10, 5, 15, 23, 11, 32, 49, 4, 2, 16], (a,b)=>a-b);
            expect(bst.inorder()).toEqual([2, 4, 5, 10, 11, 15, 16, 23, 32, 49]);
        });
    });

    describe('insert', () => {
        it('should insert the value at the root if the tree is empty', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            expect(tree.insert(10).value).toBe(10);
            expect(tree.isEmpty()).toBe(false);
        });

        let tree: BinarySearchTree<number>;
        beforeEach(() => {
            tree = BinarySearchTree.from([3, 1, 0, 2, 8, 6], (a,b)=>a-b);
        });

        it('should return the node it inserted', () => {
            const inserted = tree.insert(9);
            expect(inserted.value).toBe(9);
            expect(inserted.left).toBeNull();
            expect(inserted.right).toBeNull();
        });

        it('should insert the node in the correct order', () => {
            tree.insert(9);
            tree.insert(-1);
            tree.insert(2.5);
            expect(tree.inorder()).toEqual([-1, 0, 1, 2, 2.5, 3, 6, 8, 9]);
        });
    });

    describe('find', () => {
        let tree: BinarySearchTree<number>;
        beforeEach(() => {
            tree = BinarySearchTree.from([3, 1, 0, 2, 8, 6], (a,b)=>a-b);
        });

        it('should return null if the tree is empty', () => {
            const emptreey = new BinarySearchTree<number>((a,b)=>a-b);
            expect(emptreey.find(1)).toBeNull();
        });
        
        it('should return null if the value isn\'t in the tree', () => {
            expect(tree.find(111)).toBeNull();
            expect(tree.find(-1)).toBeNull();
            expect(tree.find(5)).toBeNull();
        });

        it('should return the node if it is found', () => {
            let found = tree.find(3);
            expect(found?.value).toBe(3);
            expect(found?.left?.value).toBe(1);
            expect(found?.right?.value).toBe(8);

            found = tree.find(8);
            expect(found?.value).toBe(8);
            expect(found?.left?.value).toBe(6);
            expect(found?.right).toBeNull();
        });

        it('should return the first node if there are multiple with the same value', () => {
            tree.insert(8);
            const found = tree.find(8);
            expect(found?.value).toBe(8);
            expect(found?.left?.value).toBe(6);
            expect(found?.right?.value).toBe(8);
        });
    });

    describe('delete', () => {
        it('should return null if the tree is empty', () => {
            const emptreey = new BinarySearchTree<number>((a,b) => a-b);
            expect(emptreey.delete(1)).toBeNull();
        });
        
        it('should delete the root if it is the only node', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            tree.insert(1);
            const deleted = tree.delete(1);
            expect(tree.isEmpty()).toBe(true);
            expect(deleted?.value).toBe(1);
        });
        
        it('should delete the root node with one child', () => {
            const tree = BinarySearchTree.from([1, 2], (a,b)=>a-b);
            expect(tree.delete(1)?.value).toBe(1);
            expect(tree.inorder()).toEqual([2]);
        });

        it('should delete node with two children where the inorder successor has right child', () => {
            const tree = BinarySearchTree.from([3, 1, 8, 6, 7], (a,b)=>a-b);
            expect(tree.delete(3)?.value).toBe(3);
            expect(tree.inorder()).toEqual([1, 6, 7, 8]);
        });

        let tree: BinarySearchTree<number>;
        beforeEach(() => {
            tree = BinarySearchTree.from([3, 1, 0, 2, 8, 6, 5, 4, 7], (a,b)=>a-b);
        });

        it('should return null if the value is not found in the tree', () => {
            expect(tree.delete(11)).toBeNull();
        });

        it('should delete leaf nodes', () => {
            expect(tree.delete(0)?.value).toBe(0);
            expect(tree.inorder()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
            expect(tree.delete(2)?.value).toBe(2);
            expect(tree.inorder()).toEqual([1, 3, 4, 5, 6, 7, 8]);
            expect(tree.delete(4)?.value).toBe(4);
            expect(tree.inorder()).toEqual([1, 3, 5, 6, 7, 8]);
            expect(tree.delete(7)?.value).toBe(7);
            expect(tree.inorder()).toEqual([1, 3, 5, 6, 8]);
        });

        it('should delete nodes with one child', () => {
            expect(tree.delete(5)?.value).toBe(5);
            expect(tree.inorder()).toEqual([0, 1, 2, 3, 4, 6, 7, 8]);
            expect(tree.delete(8)?.value).toBe(8);
            expect(tree.inorder()).toEqual([0, 1, 2, 3, 4, 6, 7]);
            expect(tree.delete(2)?.value).toBe(2); // no children
            expect(tree.inorder()).toEqual([0, 1, 3, 4, 6, 7]);
            expect(tree.delete(1)?.value).toBe(1);
            expect(tree.inorder()).toEqual([0, 3, 4, 6, 7]);
            expect(tree.delete(0)?.value).toBe(0); // no children
            expect(tree.inorder()).toEqual([3, 4, 6, 7]);
            expect(tree.delete(3)?.value).toBe(3);
            expect(tree.inorder()).toEqual([4, 6, 7]);
        });

        it('should delete nodes with two children', () => {
            expect(tree.delete(6)?.value).toBe(6);
            expect(tree.inorder()).toEqual([0, 1, 2, 3, 4, 5, 7, 8]);
            expect(tree.delete(3)?.value).toBe(3);
            expect(tree.inorder()).toEqual([0, 1, 2, 4, 5, 7, 8]);
            expect(tree.delete(4)?.value).toBe(4);
            expect(tree.inorder()).toEqual([0, 1, 2, 5, 7, 8]);
            expect(tree.delete(1)?.value).toBe(1);
            expect(tree.inorder()).toEqual([0, 2, 5, 7, 8]);
            expect(tree.delete(5)?.value).toBe(5);
            expect(tree.inorder()).toEqual([0, 2, 7, 8]);
            expect(tree.delete(7)?.value).toBe(7);
            expect(tree.inorder()).toEqual([0, 2, 8]);
        });
    });

    describe('inorder', () => {
        it('should return an empty array if tree is empty', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            expect(tree.inorder()).toEqual([]);
        });

        it('should traverse a tree inorder', () => {
            const tree = BinarySearchTree.from([3, 1, 0, 2, 8, 6, 5, 7, 4], (a,b)=>a-b)
            expect(tree.inorder()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
    });

    describe('preorder', () => {
        it('should return an empty array if tree is empty', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            expect(tree.preorder()).toEqual([]);
        });
        
        it('should traverse a tree preorder', () => {
            const tree = BinarySearchTree.from([3, 1, 0, 2, 8, 6, 5, 7, 4], (a,b)=>a-b)
            expect(tree.preorder()).toEqual([3, 1, 0, 2, 8, 6, 5, 4, 7]);
        });        
    });

    describe('postorder', () => {
        it('should return an empty array if tree is empty', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            expect(tree.postorder()).toEqual([]);
        });

        it('should traverse a tree postorder', () => {
            const tree = BinarySearchTree.from([3, 1, 0, 2, 8, 6, 5, 7, 4], (a,b)=>a-b)
            expect(tree.postorder()).toEqual([0, 2, 1, 4, 5, 7, 6, 8, 3]);
        });       
    });

    describe('isEmpty', () => {
        it('should return true if the tree is empty', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            expect(tree.isEmpty()).toBe(true);
        });
        it('should return false if the tree is not empty', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            tree.insert(1);
            tree.insert(0);
            expect(tree.isEmpty()).toBe(false);
        });
    });

    describe('print', () => {
        it('should log a prettyprinted version of the tree', () => {
            const tree = BinarySearchTree.from([3, 5, 6, 4, 1, 2, 0, -1], (a,b)=>a-b);
            const logSpy = jest.spyOn(console, 'log');

            tree.print();

            expect(logSpy).toHaveBeenCalledWith('╰── 3');
            expect(logSpy).toHaveBeenCalledWith('    ├── 5');
            expect(logSpy).toHaveBeenCalledWith('    │   ├── 6');
            expect(logSpy).toHaveBeenCalledWith('    │   ╰── 4');
            expect(logSpy).toHaveBeenCalledWith('    ╰── 1');
            expect(logSpy).toHaveBeenCalledWith('        ├── 2');
            expect(logSpy).toHaveBeenCalledWith('        ╰── 0');
            expect(logSpy).toHaveBeenCalledWith('            ╰── -1');
        });

        it('should log a message if the tree is empty', () => {
            const tree = new BinarySearchTree<number>((a,b)=>a-b);
            const logSpy = jest.spyOn(console, 'log');

            tree.print();

            expect(logSpy).toHaveBeenCalledWith('Tree is empty!');
        });
    });
});