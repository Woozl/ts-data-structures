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

        it('should delete a string without impacting other strings with the same prefix', () => {
            t.insert('answer');
            t.insert('any');
            t.insert('app');
            t.insert('apple');
            t.delete('apple')
            expect(t.hasWord('app')).toBe(true);
            expect(t.hasWord('apple')).toBe(false);
            t.delete('answer')
            expect(t.hasWord('any')).toBe(true);
            expect(t.hasWord('answer')).toBe(false);
        });

        it('should not change the Trie if a key that doesn\'t exist is requested', () => {
            t.insert('strength');
            t.insert('strenuous');
            t.insert('stripe');
            t.insert('fourth');
            t.insert('four');

            expect(t.hasWord('found')).toBe(false);
            t.delete('found');
            expect(t.hasWord('found')).toBe(false);

            t.delete('str')
            expect(t.hasWord('strength')).toBe(true);
            expect(t.hasWord('strenuous')).toBe(true);
            expect(t.hasWord('stripe')).toBe(true);

            t.delete('f')
            expect(t.hasWord('fourth')).toBe(true);
            expect(t.hasWord('four')).toBe(true);

            t.delete('fou')
            expect(t.hasWord('fourth')).toBe(true);
            expect(t.hasWord('four')).toBe(true);
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

    describe('print', () => {
        it('should log a prettyprinted version of the Trie', () => {
            t.insert('stable');
            t.insert('stab');
            t.insert('star');
            t.insert('stew');
            t.insert('apple');
            t.insert('app');

            const logSpy = jest.spyOn(console, 'log');

            t.print();

            expect(logSpy).toHaveBeenCalledWith('╰── root');
            expect(logSpy).toHaveBeenCalledWith('    ├── s');
            expect(logSpy).toHaveBeenCalledWith('    │   ╰── t');
            expect(logSpy).toHaveBeenCalledWith('    │       ├── a');
            expect(logSpy).toHaveBeenCalledWith('    │       │   ├── b*');
            expect(logSpy).toHaveBeenCalledWith('    │       │   │   ╰── l');
            expect(logSpy).toHaveBeenCalledWith('    │       │   │       ╰── e*');
            expect(logSpy).toHaveBeenCalledWith('    │       │   ╰── r*');
            expect(logSpy).toHaveBeenCalledWith('    │       ╰── e');
            expect(logSpy).toHaveBeenCalledWith('    │           ╰── w*');
            expect(logSpy).toHaveBeenCalledWith('    ╰── a');
            expect(logSpy).toHaveBeenCalledWith('        ╰── p');
            expect(logSpy).toHaveBeenCalledWith('            ╰── p*');
            expect(logSpy).toHaveBeenCalledWith('                ╰── l');
            expect(logSpy).toHaveBeenCalledWith('                    ╰── e*');
        });

        it('should print an empty Trie', () => {
            const logSpy = jest.spyOn(console, 'log');
            t.print();
            expect(logSpy).toHaveBeenCalledWith('╰── root');           
        });
    });
});