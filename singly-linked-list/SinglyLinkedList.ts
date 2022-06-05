import ListNode from "./ListNode";

export default class SinglyLinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    
    constructor(val?: T) {
        this.head = val ? new ListNode<T>(val) : null;
        this.tail = this.head;
    }
    
    append(val: T) {
        const newNode = new ListNode(val);
        if(this.tail === null) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    prepend(val: T) {
        const newNode = new ListNode(val);
        if(this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        newNode.next = this.head;
        this.head = newNode;
    }

    shift(): T | null {
        if(this.head === null) return null;
        const val = this.head.val;
        this.head = this.head.next;
        return val;
    }

    pop(): T | null {
        if(this.head === null || this.tail === null) return null
        let curNode = this.head;
        while(curNode.next && (curNode.next !== this.tail)) curNode = curNode.next;
        const val = this.tail.val;
        this.tail = curNode;
        this.tail.next = null;
        return val;
    }

    reverse(): SinglyLinkedList<T> {
        if(this.head === null || this.tail === null)
            return this;

        let prevNode = this.head;
        let curNode: ListNode<T> | null = this.head;
        let nextNode: ListNode<T> | null  = this.head;

        nextNode = curNode.next
        while(nextNode) {
            curNode = nextNode;
            nextNode = curNode.next;
            curNode.next = prevNode;
            prevNode = curNode;
        }
        
        let tmp = this.head;
        this.head = this.tail;
        this.tail = tmp;

        this.tail.next = null;

        return this;
    }

    toArray(): Array<T> {
        if(this.head === null) return [];
        let curNode: ListNode<T> | null = this.head;
        const output = [];
        while(curNode) {
            output.push(curNode.val);
            curNode = curNode.next;
        }
        return output;
    }
};