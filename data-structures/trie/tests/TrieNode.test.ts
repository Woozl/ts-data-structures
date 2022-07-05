import TrieNode from '../TrieNode';

describe('TrieNode', () => {
    let t: TrieNode;
    beforeEach(() => {
        t = new TrieNode();
    })

    it('should create a new TrieNode', () => {
        expect(t).toHaveProperty('children');
        expect(t).toHaveProperty('isEndOfWord');
    });

    it('should allow children to be set', () => {
        t.children.set('a', new TrieNode());
        expect(t.children.has('a')).toBe(true);
    });

    it('should allow children to be retrieved', () => {
        t.children.set('b', new TrieNode());
        expect(t.children.get('b')).not.toBe(undefined);
    });

    it('should set isEndOfWord false by default', () => {
        expect(t.isEndOfWord).toBe(false);
    });

    it('should allow isEndOfWord to be set', () => {
        t.isEndOfWord = true;
        expect(t.isEndOfWord).toBe(true);
    });
});