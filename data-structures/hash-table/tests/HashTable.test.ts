import HashTable from '../HashTable';

describe('HashTable', () => {
    let ht: HashTable<number>;
    beforeEach(() => {
        ht = new HashTable<number>();
    });

    it('should throw error for invalid key string', () => {
        expect(() => ht.set('i have spaces', 1)).toThrowError();
        expect(() => ht.set('1h4venumb3r5', 1)).toThrowError();
        expect(() => ht.set('ihave$ymbols!', 1)).toThrowError();
        expect(() => ht.set('ihaveCAPITALS', 1)).toThrowError();
    });

    it('should set and retrieve value', () => {
        ht.set('one', 1);
        expect(ht.search('one')).toBe(1);
    });

    it('should set and retrieve value with collisions ', () => {
        ht.set('neat', 1);
        ht.set('drop', 2);
        expect(ht.search('neat')).toBe(1);
        expect(ht.search('drop')).toBe(2);
    });

    describe('search', () => {
    
        it('should return null if there is no value for a key', () => {
            expect(ht.search('noval')).toBeNull();
        });
    });

    describe('delete', () => {        
        it('should return null if there is no value for a key', () => {
            expect(ht.delete('noval')).toBeNull();
        });
    
        it('should delete a key value pair', () => {
            ht.set('neat', 42);
            expect(ht.search('neat')).toBe(42);
            expect(ht.delete('neat')).toBe(42);
            expect(ht.search('neat')).toBeNull();
        });
    });

    describe('toArray', () => {
        it('should output an array with all key val pairs', () => {
            ht.set('one', 1);
            ht.set('two', 2);
            ht.set('three', 3);
            let array = ht.toArray();
            let foundVals = new Set();
            array.forEach(bucket => {
                if(bucket !== null) bucket.forEach(pair => foundVals.add(pair.val));
            })
            expect(foundVals).toEqual(new Set([1, 2, 3]));
        });
    });

    describe('getCollisionArray', () => {
        it('should output collision array with correct number of items', () => {
            const words = new Set(['the', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'hen']);
            words.forEach(w => ht.set(w, 0));
            expect(ht.getCollisionArray().reduce((prev, cur) => prev + cur)).toBe(words.size);
        });
    });
});