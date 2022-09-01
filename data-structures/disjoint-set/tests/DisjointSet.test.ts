import DisjointSet from '../DisjointSet'

describe('DisjointSet', () => {
    it('should create a disjoint set', () => {
        const ds = new DisjointSet<number>([]);
        expect(ds).toBeInstanceOf(DisjointSet);
    });

    it('should create a disjoint set initialized with singleton sets', () => {
        const ds = new DisjointSet([1, 2, 3, 4, 5, 6, 7, 8]);

        // each element should be its own parent
        for(let i = 1; i <= 8; ++i) {
            expect(ds.find(i)).toBe(i);
        }
    });

    it('should create a disjoint set with generic object types', () => {
        const a = {blah: "blah"};
        const b = {foo: "foo"};
        const c = {bar: "bar"};

        const ds = new DisjointSet<{[key: string]: string}>([a, b, c]);
        expect(ds.find(a)).toBe(a);
        expect(ds.find(b)).toBe(b);
        expect(ds.find(c)).toBe(c);
    });

    it('should create a disjoint set where all singletons are rank 0', () => {
        const ds = new DisjointSet([1, 2, 3, 4, 5, 6, 7, 8]);

        // each element should be rank 0
        for(let i = 1; i <= 8; ++i) {
            expect(ds.getRank(i)).toBe(0);
        }
    });

    describe('makeSet', () => { 
        it('should add a new singleton set and return true', () => {
            const ds = new DisjointSet([1, 2, 3]);

            expect(ds.find(4)).toBeNull();
            expect(ds.makeSet(4)).toBe(true);
            expect(ds.find(4)).toBe(4);
        });

        it('should initialize new sets with rank 0', () => {
            const ds = new DisjointSet([1, 2, 3]);
            
            expect(ds.makeSet(4)).toBe(true);
            expect(ds.getRank(4)).toBe(0);
        });

        it('should return false if the element already exists in the set', () => {
            const ds = new DisjointSet([1, 2, 3]);
            expect(ds.makeSet(1)).toBe(false);
            expect(ds.makeSet(3)).toBe(false);
        });
    });

    describe('find', () => {
        it('should return null if the element is not in the set', () => {
            const ds = new DisjointSet([1, 2, 3]);

            expect(ds.find(4)).toBe(null);
        });

        it('should return the same node if it is the parent', () => {
            const ds = new DisjointSet([1, 2, 3]);

            expect(ds.find(1)).toBe(1);
            expect(ds.find(2)).toBe(2);
            expect(ds.find(3)).toBe(3);
        });

        it('should find the parent item of the set', () => {
            const ds = new DisjointSet([1, 2, 3, 4, 5, 6]);
            ds.union(1, 2);
            ds.union(2, 3);
            // [1, 2, 3], [4], [5], [6]
            
            expect(ds.find(1)).toBe(1);
            expect(ds.find(2)).toBe(1);
            expect(ds.find(3)).toBe(1);

            expect(ds.find(4)).toBe(4);
            expect(ds.find(5)).toBe(5);
            expect(ds.find(6)).toBe(6);
        });

        it('should be equal if used on two items in the same set', () => {
            const ds = new DisjointSet([1, 2, 3, 4, 5, 6]);
            ds.union(1, 2);
            ds.union(2, 3);
            ds.union(3, 4);
            ds.union(4, 5);
            // [1, 2, 3, 4, 5], [6]

            expect(ds.find(1) === ds.find(2)).toBe(true);
            expect(ds.find(5) === ds.find(3)).toBe(true);
            expect(ds.find(2) === ds.find(4)).toBe(true);
            expect(ds.find(5) === ds.find(1)).toBe(true);
            expect(ds.find(5) === ds.find(3)).toBe(true);

            expect(ds.find(6) === ds.find(3)).toBe(false);
            expect(ds.find(6) === ds.find(4)).toBe(false);
            expect(ds.find(5) === ds.find(6)).toBe(false);
            expect(ds.find(1) === ds.find(6)).toBe(false);
        });
    });

    describe('union', () => { 
        it('should union two sets together and return true', () => {
            const ds = new DisjointSet([1, 2, 3, 4, 5, 6]);
            expect(ds.union(1, 2)).toBe(true);
            expect(ds.find(1) === ds.find(2)).toBe(true);
        });

        it('should return false if the elements are not in the disjoint set', () => {
            const ds = new DisjointSet([1, 2, 3]);
            expect(ds.union(100, 200)).toBe(false);
        });

        it('should return false if the elements are already in the same set', () => {
            const ds = new DisjointSet([1, 2, 3]);
            ds.union(1, 2);
            expect(ds.union(1, 2)).toBe(false);
        });

        describe("should not increase the rank if one of the set's rank is lower", () => {
            let ds: DisjointSet<number>;
            beforeEach(() => {
                ds = new DisjointSet([1, 2, 3, 4, 5, 6, 7, 8]);
                ds.union(1, 2);
                ds.union(2, 3);
                ds.union(4, 5);
                ds.union(5, 6);
                ds.union(1, 4);
                ds.union(7, 8);
                // [1, 2, 3, 4, 5, 6] (rank 2), [7, 8] (rank 1)
            })
            
            it('should merge set `a` into set `b` if rank of `a` is lower', () => {
                const set1Rank = ds.getRank(1)!; // 2
                const set7Rank = ds.getRank(7)!; // 1
                expect(set1Rank).toBeGreaterThan(set7Rank);

                ds.union(7, 1);

                expect(ds.getRank(1)!).toBeLessThanOrEqual(set1Rank);
            });

            it('should merge set `b` into set `a` if rank of `b` is lower', () => {
                const set1Rank = ds.getRank(1)!; // 2
                const set7Rank = ds.getRank(7)!; // 1
                expect(set1Rank).toBeGreaterThan(set7Rank);

                ds.union(1, 7);

                expect(ds.getRank(1)!).toBeLessThanOrEqual(set1Rank);
            });
        });

        it('should increase increase the rank of the new set by one when combining two sets of the same rank', () => {
            const ds = new DisjointSet([1, 2, 3, 4]);

            expect(ds.getRank(1)).toBe(0);
            expect(ds.getRank(2)).toBe(0);
            
            ds.union(1, 2);
            // [1, 2], [3], [4]

            expect(ds.getRank(1)).toBe(1);
            expect(ds.getRank(2)).toBe(1);

            ds.union(3, 4);
            // [1, 2], [3, 4] both rank 1

            expect(ds.getRank(1)).toBe(1);
            expect(ds.getRank(3)).toBe(1);

            ds.union(1, 3);
            // [1, 2, 3, 4] rank 2

            expect(ds.getRank(1)).toBe(2);
        });
    });

    describe('size', () => {
        it('should return zero if there are no elements in disjoint set', () => {
            const ds = new DisjointSet<number>([]);

            expect(ds.size()).toBe(0);
        });

        it('should return size of all items in disjoint set', () => {
            const ds = new DisjointSet([1, 2, 3, 4, 5, 6]);

            expect(ds.size()).toBe(6);
        });

        it('should should update the size when a new set is added to the disjoint set', () => {
            const ds = new DisjointSet([1, 2, 3]);

            expect(ds.size()).toBe(3);

            ds.makeSet(4);

            expect(ds.size()).toBe(4);
        });
    });

    describe('printParents', () => {
        let logSpy: jest.SpyInstance;
        beforeEach(() => {logSpy = jest.spyOn(console, 'log')});
        afterEach(() => jest.clearAllMocks());

        it('should print the direct parent of each item in the disjoint set', () => {
            const ds = new DisjointSet([1, 2, 3, 4, 5, 6]);
            ds.union(1, 2);
            ds.union(2, 3);
            ds.union(4, 5);
            ds.union(5, 6);

            ds.printParents();

            expect(logSpy).toHaveBeenCalledWith('Parents:');
            expect(logSpy).toHaveBeenCalledWith('1 → 1');
            expect(logSpy).toHaveBeenCalledWith('2 → 1');
            expect(logSpy).toHaveBeenCalledWith('3 → 1');
            expect(logSpy).toHaveBeenCalledWith('4 → 4');
            expect(logSpy).toHaveBeenCalledWith('5 → 4');
            expect(logSpy).toHaveBeenCalledWith('6 → 4');
        });

        it('should print just "Parents:" for a disjoint set with no items', () => {
            const ds = new DisjointSet([]);
            ds.printParents();
            expect(logSpy).toHaveBeenCalledWith("Parents:");
        });
    });

    describe('getRank', () => {
        it('should return the rank of the set', () => {
            const ds = new DisjointSet([1, 2, 3, 4]);

            expect(ds.getRank(1)).toBe(0);
            ds.union(1, 2);
            expect(ds.getRank(1)).toBe(1);
            ds.union(3, 4);
            expect(ds.getRank(4)).toBe(1);
            ds.union(3, 2);
            expect(ds.getRank(2)).toBe(2);
        });

        it('should return null if the element does not exist in the disjoint set', () => {
            const ds = new DisjointSet([1, 2, 3, 4]);

            expect(ds.getRank(10)).toBeNull();
        });
    });

    describe('printRanks', () => {
        let logSpy: jest.SpyInstance;
        beforeEach(() => {logSpy = jest.spyOn(console, 'log')});
        afterEach(() => jest.clearAllMocks());

        it('should print the ranks of each set', () => {
            const ds = new DisjointSet([1, 2, 3, 4, 5, 6]);
            ds.union(1, 2);
            ds.union(2, 3);
            ds.union(4, 5);
            ds.union(5, 6);

            ds.printRanks();

            expect(logSpy).toHaveBeenCalledWith('Ranks:');
            expect(logSpy).toHaveBeenCalledWith('1 → 1');
            expect(logSpy).toHaveBeenCalledWith('4 → 1');
        });

        it('should print just "Ranks:" for a a disjoint set with no items', () => {
            const ds = new DisjointSet([]);
            ds.printRanks();
            expect(logSpy).toHaveBeenCalledWith("Ranks:");
        });
    });

    describe('printSets', () => {
        let logSpy: jest.SpyInstance;
        beforeEach(() => {logSpy = jest.spyOn(console, 'log')});
        afterEach(() => jest.clearAllMocks());

        it('should print the ranks of each set', () => {
            const ds = new DisjointSet([1, 2, 3, 4, 5, 6]);
            ds.union(1, 2);
            ds.union(2, 3);
            ds.union(4, 5);
            ds.union(5, 6);
            // [1, 2, 3], [4, 5, 6]

            ds.printSets();

            expect(logSpy).toHaveBeenCalledWith('Sets:');
            expect(logSpy).toHaveBeenCalledWith('1 → [ 1, 2, 3 ]');
            expect(logSpy).toHaveBeenCalledWith('4 → [ 4, 5, 6 ]');
        });

        it('should print just "Sets:" for a a disjoint set with no items', () => {
            const ds = new DisjointSet([]);
            ds.printSets();
            expect(logSpy).toHaveBeenCalledWith("Sets:");
        });
    });
});