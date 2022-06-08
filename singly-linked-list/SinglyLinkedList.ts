import ListNode from "./ListNode";

/**
 * Defines a generic linked list with pointers in a
 * single direction. Provides tools to add, remove,
 * and search items.
 */
export default class SinglyLinkedList<T> {
    private head: ListNode<T> | null;
    private tail: ListNode<T> | null;
    private _length = 0;
    
    /**
     * Creates a new `SinglyLinkedList` with optional initial value.
     * @param val (optional) initial value for the list
     */
    constructor(val?: T) {
        if(val) {
            this.head = new ListNode<T>(val);
            ++this._length;
        } else {
            this.head = null;
        }
        this.tail = this.head;
    }

    /**
     * Returns a new `SinglyLinkedList` from an `Iterable` object.
     * @param it `Iterable` object to be converted
     * @returns new `SinglyLinkedList`
     */
    static from<T>(it: Iterable<T>): SinglyLinkedList<T> {
        const list = new SinglyLinkedList<T>();
        for(let item of it) list.append(item);
        return list;
    }

    /**
     * The current length of the list.
     */
    get length() {
        return this._length;
    }
    
    /**
     * Appends an item to the end of the list.
     * @param val item to be appended.
     */
    append(val: T) {
        const newNode = new ListNode(val);
        if(this.tail === null) {
            this.head = newNode;
            this.tail = this.head;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        ++this._length;
    }

    /**
     * Adds an item to the front of the list.
     * @param val item to be prepended
     */
    prepend(val: T) {
        const newNode = new ListNode(val);
        if(this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        newNode.next = this.head;
        this.head = newNode;
        ++this._length;
    }

    /**
     * Deletes the first item in the list and returns it.
     * @returns value that was deleted or `null` if list is empty
     */
    shift(): T | null {
        if(this.head === null) return null;
        const val = this.head.val;
        this.head = this.head.next;
        --this._length;
        return val;
    }

    /**
     * Deletes the last item in the list and returns it.
     * @returns value that was deleted or `null` if list is empty
     */
    pop(): T | null {
        if(this.head === null || this.tail === null) return null
        let curNode = this.head;
        while(curNode.next && (curNode.next !== this.tail)) curNode = curNode.next;
        const val = this.tail.val;
        this.tail = curNode;
        this.tail.next = null;
        --this._length;
        return val;
    }

    /**
     * Reverses the list in place.
     * @returns a reference to the list.
     */
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

    /**
     * Returns the index of the first item found that matches `target` or
     * zero if not in list.
     * @param target The item to search for
     */
    find(target: T): number {
        if(this.head === null) return -1;
        let curNode: ListNode<T> | null = this.head;
        let index = 0;
        while(curNode) {
            if(curNode.val === target) return index;
            curNode = curNode.next;
            ++index;
        }
        return -1;
    }

    /**
     * Deletes an item in the list based on it's index.
     * @param index the index of the item to be deleted
     * @returns the item that was deleted or `null` if index is out of bounds.
     */
    delete(index: number): T | null{
        if(!this.head || index < 0 || index >= this._length) return null;
        if(index === 0) return this.shift();
        if(index === this._length - 1) return this.pop();

        let i = 0;
        let curNode: ListNode<T> | null = this.head;
        let prevNode = curNode;
        while(curNode.next) {
            curNode = curNode.next;
            if(++i === index) {
                prevNode.next = curNode.next;
                curNode.next = null;
                --this._length;
                return curNode.val;
            }
            prevNode = curNode;
        }
        return null;
    }

    /**
     * Inserts a new value into the list at a specified index
     * @param val value to be added to list
     * @param index index for value to be inserted at or null if index isn't valid
     */
    insert(val: T, index: number): SinglyLinkedList<T> | null {
        if(index < 0 || index > this._length) return null;
        
        if(!this.head || index === this._length)
            this.append(val);
        else if(index === 0) 
            this.prepend(val);
        else {
            let i = 0;
            let curNode = this.head;
            let prevNode = this.head;
            let newNode = new ListNode(val);
            while(curNode.next) {
                curNode = curNode.next;
                if(++i === index) {
                    prevNode.next = newNode;
                    newNode.next = curNode;
                    return this;
                }
                prevNode = curNode;
            }
        }

        return this;
    }

    /**
     * Returns an array of the items in the list.
     * @returns array containing items in the list.
     */
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

    /**
     * @returns string representation of the list.
     */
     toString(): string {
        return `[${this.toArray().toString()}]`;
    }
};