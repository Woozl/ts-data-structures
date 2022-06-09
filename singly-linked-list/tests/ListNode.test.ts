import ListNode from "../ListNode";

describe('ListNode', () => {
    it('should create a new ListNode with initial value', () => {
        const ln = new ListNode(4);
        expect(ln.val).toBe(4);
        expect(ln.next).toBeNull();
    });

    it('should link to another node', () => {
        const nextNode = new ListNode(2);
        const ln = new ListNode(1, nextNode);
        expect(ln.next!.val).toBe(2);
        expect(ln.next).toBe(nextNode);
    });
});