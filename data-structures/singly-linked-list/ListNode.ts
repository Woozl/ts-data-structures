/**
 * Defines a node for a list linked in one direction.
 * Includes a generic value and pointer to the next node, which
 * can be null to indicate the end of the list.
 */
export default class ListNode<T> {
    val: T;
    next: ListNode<T> | null;

    /**
     * 
     * @param val generic value stored in this node
     * @param next optional argument specifyin the next `ListNode`. If not specified, `this.next` equals `null`.
     */
    constructor(val: T, next?: ListNode<T>) {
        this.val = val;
        this.next = next ? next : null;
    }
};