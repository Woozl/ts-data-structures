import SinglyLinkedList from '../SinglyLinkedList';

describe('SinglyLinkedList', () => {
    it('should create an empty list', () => {
        const ll = new SinglyLinkedList();
        expect(ll.toArray()).toEqual([]);
    });

    it('should create a list with an initial value', () => {
        const ll = new SinglyLinkedList(10);
        expect(ll.toArray()).toEqual([10]);
    });

    it('should create a list from an Iterable', () => {
        expect(SinglyLinkedList.from([1, 2, 3, 4]).toArray()).toEqual([1, 2, 3, 4]);
        expect(SinglyLinkedList.from('STRING').toArray()).toEqual(['S', 'T', 'R', 'I', 'N', 'G']);
    });

    it('should match length to size of list', () => {
        const ll = SinglyLinkedList.from([1, 2, 3, 4]);
        expect(ll.length).toBe(4);
        ll.pop();
        expect(ll.length).toBe(3);
        ll.shift();
        expect(ll.length).toBe(2);
        ll.append(4);
        expect(ll.length).toBe(3);
        ll.prepend(1);
        expect(ll.length).toBe(4);
    });
    
    describe('append', () => {
        it('should append an item to the end of the list', () => {
            const ll = SinglyLinkedList.from([1, 2, 3]);
            ll.append(4);
            expect(ll.toArray()).toEqual([1, 2, 3, 4]);
            expect(ll.length).toBe(4);
        });

        it('should add node if list is empty', () => {
            const ll = SinglyLinkedList.from("");
            ll.append("A");
            expect(ll.toArray()).toEqual(["A"]);
            expect(ll.length).toBe(1);
        })
    });
    
    describe('prepend', () => {
        it('should prepend an item to the beginning of the list', () => {
            const ll = SinglyLinkedList.from([1, 2, 3]);
            ll.prepend(0);
            expect(ll.toArray()).toEqual([0, 1, 2, 3]);
            expect(ll.length).toBe(4);
        });

        it('should add node if list is empty', () => {
            const ll = SinglyLinkedList.from("");
            ll.prepend("A");
            expect(ll.toArray()).toEqual(["A"]);
            expect(ll.length).toBe(1);
        })
    });

    describe('shift', () => { 
        it('should delete the first item', () => {
            const ll = SinglyLinkedList.from([1, 2, 3]);
            expect(ll.shift()).toBe(1);
            expect(ll.toArray()).toEqual([2, 3]);
            expect(ll.length).toBe(2);
        });
    
        it('should return null if list is empty', () => {
            const ll = SinglyLinkedList.from([]);
            expect(ll.shift()).toBeNull();
            expect(ll.toArray()).toEqual([]);
            expect(ll.length).toBe(0);
        });
    });

    describe('pop', () => {
        it('should delete the last item', () => {
            const ll = SinglyLinkedList.from([1, 2, 3])
            expect(ll.pop()).toBe(3);
            expect(ll.toArray()).toEqual([1, 2]);
            expect(ll.length).toBe(2);
        });

        it('should return null if list is empty', () => {
            const ll = SinglyLinkedList.from([]);
            expect(ll.pop()).toBeNull();
            expect(ll.toArray()).toEqual([]);
            expect(ll.length).toBe(0);
        });
    });

    describe('reverse', () => {
        it('should remain unchanged if empty', () => {
            const ll = SinglyLinkedList.from([]);
            expect(ll.reverse().toArray()).toEqual([]);
        });

        it('should reverse the list', () => {
            const ll = SinglyLinkedList.from([1, 2, 3]);
            expect(ll.reverse().toArray()).toEqual([3, 2, 1]);
        });
    });

    describe('find', () => {
        let ll: SinglyLinkedList<number>;
        beforeEach(() => {
            ll = SinglyLinkedList.from([1, 2, 3, 4, 5]);
        });

        it('should return index of value in list', () => {
            expect(ll.find(3)).toBe(2);
            expect(ll.find(1)).toBe(0);
            expect(ll.find(5)).toBe(4);
        });

        it('should return -1 if the item is not in the list', () => {
            expect(ll.find(6)).toBe(-1);
            expect(ll.find(-1)).toBe(-1);
        });

        it('should return -1 if the list is empty', () => {
            expect(SinglyLinkedList.from("").find("s")).toBe(-1);
        });
    });

    describe('delete', () => {
        let ll: SinglyLinkedList<string>;
        beforeEach(() => {
            ll = SinglyLinkedList.from("ABCDEF");
        });

        it('should delete node based on index', () => {
            expect(ll.delete(2)).toBe("C");
            expect(ll.toArray().join('')).toBe("ABDEF");

            expect(ll.delete(0)).toBe("A");
            expect(ll.toArray().join('')).toBe("BDEF");

            expect(ll.delete(3)).toBe("F");
            expect(ll.toArray().join('')).toBe("BDE");
        });

        it('should decrease length by one if node removed', () => {
            let prevLength = ll.length;
            ll.delete(2);
            expect(ll.length).toBe(prevLength - 1);
        });

        it('should not decrease length if node was not removed', () => {
            let prevLength = ll.length;
            ll.delete(-1);
            expect(ll.length).toBe(prevLength);
            ll.delete(ll.length);
            expect(ll.length).toBe(prevLength);
        });

        it('should return null if index is out of bounds', () => {
            expect(ll.delete(ll.length)).toBeNull();
            expect(ll.delete(-1)).toBeNull();
        });

        it('should return null if list is empty', () => {
            expect(SinglyLinkedList.from([]).delete(0)).toBeNull();
        });
    });

    describe('insert', () => {
        let ll: SinglyLinkedList<string>;
        beforeEach(() => {
            ll = SinglyLinkedList.from("ABCDEF");
        });

        it('should add an item to the list', () => {
            expect(ll.insert("X", 3)!.toArray().join('')).toBe("ABCXDEF");
            expect(ll.insert("X", 0)!.toArray().join('')).toBe("XABCXDEF");
            expect(ll.insert("X", ll.length)!.toArray().join('')).toBe("XABCXDEFX");
        });

        it('should increase length by one if a node is added', () => {
            let prevLength = ll.length
            expect(ll.insert("X", 2)!.length).toBe(prevLength + 1);
            expect(ll.insert("X", 0)!.length).toBe(prevLength + 2);
        });

        it('should not increase length if node was not added', () => {
            let prevLength = ll.length
            ll.insert("X", -1);
            expect(ll.length).toBe(prevLength);
            ll.insert("X", ll.length + 1);
            expect(ll.length).toBe(prevLength);
        });

        it('should return null if index is out of bounds', () => {
            expect(ll.insert("X", ll.length + 1)).toBeNull();
            expect(ll.insert("X", -1)).toBeNull();
        });
    });

    describe('toArray', () => {
        it('should return array based on list', () => {
            expect(SinglyLinkedList.from([1, 2, 3]).toArray()).toEqual([1, 2, 3]);
        });

        it('should return empty array if list is empty', () => {
            expect(SinglyLinkedList.from([]).toArray()).toEqual([]);
        });
    });

    describe('toString', () => {
        it('should print string representation of list', () => {
            const ll = SinglyLinkedList.from([1, 2, 3]);
            expect(ll.toString()).toBe("[1,2,3]");
            
            const ll2 = SinglyLinkedList.from("FOO");
            expect(ll2.toString()).toBe("[F,O,O]")
        });

        it('should print an empty list', () => {
            const ll = SinglyLinkedList.from([]);
            expect(ll.toString()).toBe("[]");
        });
    });
});