import Queue from "../Queue";

describe('Queue', () => {
    it('should create an empty queue', () => {
        const q = new Queue()
        expect(q.dequeue()).toBeNull();
    });

    it('should create a queue from an Iterable', () => {
        const aq = Queue.from([1, 2, 3])
        expect(aq.dequeue()).toBe(1);

        const sq = Queue.from("STRING");
        expect(sq.dequeue()).toBe("S");
    });

    it('should create an empty queue from an empty Iterable', () => {
        let eq: Queue<number | string> = Queue.from([]);
        expect(eq.dequeue()).toBeNull();

        eq = Queue.from("");
        expect(eq.dequeue()).toBeNull();
    });
    
    describe('enqueue', () => {
        it('should add item to an empty queue', () => {
            let q = new Queue<number>();
            q.enqueue(4);
            expect(q.toArray()).toEqual([4]);
        });

        it('should add item to end in a queue already containing items', () => {
            let q = Queue.from([1, 2, 3]);
            q.enqueue(4);
            expect(q.toArray()).toEqual([1, 2, 3, 4]);
        });
    });

    describe('dequeue', () => {
        it('should return the first item from the queue', () => {
            let q = Queue.from([1, 2, 3]);
            expect(q.dequeue()).toBe(1);
        });

        it('should delete the first item from the queue', () => {
            let q = Queue.from([1, 2, 3]);
            expect(q.dequeue()).toBe(1);
            expect(q.toArray()).toEqual([2, 3]);
        });

        it('should return null if the list is empty', () => {
            let q = Queue.from([]);
            expect(q.dequeue()).toBeNull();
            expect(q.toArray()).toEqual([]);
        });
    });

    describe('peek', () => {
        it('should return the first item from the queue', () => {
            let q = Queue.from([1, 2, 3]);
            expect(q.peek()).toBe(1);
        });
        
        it('should not delete the node', () => {
            let q = Queue.from([1, 2, 3]);
            expect(q.peek()).toBe(1);
            expect(q.toArray()).toEqual([1, 2, 3]);
        });

        it('should return null if the list is empty', () => {
            let q = Queue.from([]);
            expect(q.peek()).toBeNull();
            expect(q.toArray()).toEqual([]);
        }); 
    });

    describe('isEmpty', () => {
        it('should return true if the queue is empty', () => {
            const q = Queue.from([]);
            expect(q.isEmpty()).toBe(true);
        });

        it('should return false if the queue has items in it', () => {
            const q = Queue.from([1, 2, 3]);
            expect(q.isEmpty()).toBe(false);
        });
    });

    describe('toArray', () => {
        it('should return an array based on the queue', () => {
            const aq = Queue.from([1, 2, 3]);
            expect(aq.toArray()).toEqual([1, 2, 3]);

            const sq = Queue.from("ABC");
            expect(sq.toArray()).toEqual(["A", "B", "C"]);
        });

        it('should return an empty array if queue is empty', () => {
            const q = Queue.from([]);
            expect(q.toArray()).toEqual([]);
        });
    });
});