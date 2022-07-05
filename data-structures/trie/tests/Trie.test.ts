import Trie from '../Trie';

describe('Trie', () => {
    let t: Trie;
    beforeEach(() => {
        t = new Trie();
    })

    it('should create a new Trie', () => {
        expect(t).toHaveProperty('root');
    });

    describe('insert', () => {
        it('should insert a new string', () => {
            t.insert('hello');
            expect(t.hasWord('hello')).toBe(true);
        });

        it('should insert an empty string', () => {
            t.insert('');
            expect(t.hasWord('')).toBe(true);
        });

        it('should not change a string that is already in the tree', () => {
            t.insert('string');
            t.insert('string');
            expect(t.hasWord('string')).toBe(true);
        });

        it('should insert a prefix without disturbing the longer words', () => {
            t.insert('racecar');
            expect(t.hasWord('racecar')).toBe(true);
            t.insert('race');
            expect(t.hasWord('racecar')).toBe(true);
            expect(t.hasWord('race')).toBe(true);
        });

        it('should insert a very long string', () => {
            t.insert('pneumonoultramicroscopicsilicovolcanoconiosis');
            expect(t.hasWord('pneumonoultramicroscopicsilicovolcanoconiosis')).toBe(true);
        });

        it('should insert two strings with the same prefix', () => {
            t.insert('shipbuilder');
            t.insert('shipyard');
            expect(t.hasWord('shipbuilder')).toBe(true);
            expect(t.hasWord('shipyard')).toBe(true);
        });
    });

    describe('delete', () => {
        it('should delete a string from the Trie', () => {
            t.insert('hello');
            expect(t.hasWord('hello')).toBe(true);
            t.delete('hello');
            expect(t.hasWord('hello')).toBe(false);
        });

        it('should not delete the prefix of a word', () => {
            t.insert('apple');
            t.delete('app');
            expect(t.hasWord('apple')).toBe(true);
        });

        it('should not change the Trie if the string is not in it', () => {
            t.insert('sand');
            t.delete('sandwich');
            expect(t.hasWord('sand'));
        });
    });

    describe('hasWord', () => {
        it('should return true if the string is in the Trie', () => {
            t.insert('hello');
            expect(t.hasWord('hello')).toBe(true);
        });

        it('should return false if the string is not in the Trie', () => {
            t.insert('hello');
            expect(t.hasWord('string')).toBe(false);
        });

        it('should return false if the string is a prefix of another word in the Trie', () => {
            t.insert('apple');
            expect(t.hasWord('app')).toBe(false);
        });

        it('should find if an empty string is in the Trie', () => {
            t.insert('');
            expect(t.hasWord('')).toBe(true);
        });
    });

    describe('hasPrefix', () => {
        it('should return true if the prefix is in the Trie', () => {
            t.insert('supercalifragilisticexpialidocious');
            expect(t.hasPrefix('super')).toBe(true);
        });

        it('should return true if the string is a whole word in the Trie', () => {
            t.insert('apple');
            expect(t.hasPrefix('apple')).toBe(true);
        });

        it('should return false if the prefix is not in the Trie', () => {
            t.insert('app');
            expect(t.hasPrefix('apple')).toBe(false);
        });
    });
});