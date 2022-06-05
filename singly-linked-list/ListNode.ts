export default class ListNode<T> {
    val: T;
    next: ListNode<T> | null;
    constructor(val: T, next?: ListNode<T>) {
        this.val = val;
        this.next = next ? next : null;
    }
};