import Stack from "../Stack";

describe('Stack', () => {
    it('should create an empty stack', () => {
        const s = new Stack();
        expect(s.isEmpty()).toBe(true);
        expect(s.length).toBe(0);
    });

    it('should create a stack from an Iterable', () => {
        const ns = Stack.from([1, 2, 3]);
        expect(ns.toArray()).toEqual([1, 2, 3]);
        expect(ns.length).toBe(3);

        const ss = Stack.from("STRING");
        expect(ss.toArray()).toEqual(["S", "T", "R", "I", "N", "G"]);
        expect(ss.length).toBe(6);
    });

    it('should create an empty stack from an empty Iterable', () => {
        const as = Stack.from([]);
        expect(as.toArray()).toEqual([]);
        expect(as.isEmpty()).toBe(true);
        expect(as.length).toBe(0);
        
        const ss = Stack.from("");
        expect(ss.toArray()).toEqual([]);
        expect(ss.isEmpty()).toBe(true);
        expect(ss.length).toBe(0);
    });

    it('should return correct length', () => {
        const s = Stack.from([1, 2, 3]);
        expect(s.length).toBe(3);
        s.pop();
        expect(s.length).toBe(2);
        s.pop();
        s.pop();
        expect(s.length).toBe(0);
        s.push(1);
        expect(s.length).toBe(1);
        s.peek();
        expect(s.length).toBe(1);
    });

    describe('pop', () => {
        it('should return the last added item', () => {
            const s = Stack.from([1, 2, 3]);
            expect(s.pop()).toBe(3);
            expect(s.length).toBe(2);
        });

        it('should remove the last item', () => {
            const s = Stack.from([1, 2, 3]);
            s.pop();
            expect(s.toArray()).toEqual([1, 2]);
            expect(s.length).toBe(2);
        });

        it('should return null if the stack is empty', () => {
            const s = Stack.from([]);
            expect(s.pop()).toBeNull();
        });
    });

    describe('peek', () => {
        it('should return the last added item', () => {
            const s = Stack.from([1, 2, 3]);
            expect(s.peek()).toBe(3);
        });

        it('should not remove the last item', () => {
            const s = Stack.from([1, 2, 3]);
            s.peek();
            expect(s.toArray()).toEqual([1, 2, 3]);
            expect((s.length)).toBe(3);
        });

        it('should return null if the stack is empty', () => {
            const s = Stack.from([]);
            expect(s.peek()).toBeNull();
        });
    });

    describe('push', () => {
        it('should add an element to the top of the stack', () => {
            const s = Stack.from([1, 2, 3]);
            s.push(4);
            expect(s.toArray()).toEqual([1, 2, 3, 4]);
        });

        it('should add the first node if stack is empty', () => {
            const s = new Stack<number>();
            s.push(1);
            expect(s.toArray()).toEqual([1]);
            expect(s.length).toBe(1);
        });
    });

    describe('isEmpty', () => {
        it('should return true if stack is empty', () => {
            const s = new Stack<number>();
            expect(s.isEmpty()).toBe(true);
            expect(s.length).toBe(0);
        });

        it('should return false if stack is not empty', () => {
            const s = Stack.from("STRING");
            expect(s.isEmpty()).toBe(false);
            expect(s.length).toBeGreaterThan(0);
        });
    });

    describe('toArray', () => {
        it('should create an array based on the stack', () => {
            const ns = Stack.from([1, 2, 3]);
            expect(ns.toArray()).toEqual([1, 2, 3]);

            const ss = Stack.from("ABC");
            expect(ss.toArray()).toEqual(["A", "B", "C"]);
        });

        it('should create an empty array for an empty Stack', () => {
            const s = Stack.from([]);
            expect(s.isEmpty()).toBe(true);
            expect(s.toArray()).toEqual([]);
        });
    });
});