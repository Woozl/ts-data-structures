import SinglyLinkedList from "../singly-linked-list/SinglyLinkedList";

/**
 * Defines a generic queue where the first item added is the first
 * to come out.
 */
export default class Queue<T> {
    private queue: SinglyLinkedList<T>;

    constructor() {
        this.queue = new SinglyLinkedList<T>();
    }

    /**
     * Creates a `Queue` based on an `Iterable`. The first value in
     * `it` will represent the start of the Queue.
     * @param it `Iterable` to generate `Queue` from
     * @returns reference to filled `Queue` object
     */
    static from<T>(it: Iterable<T>): Queue<T> {
        const q = new Queue<T>();
        q.queue = SinglyLinkedList.from(it);
        return q;
    }

    /**
     * Adds a value to the queue.
     * @param val value to be added to queue
     */
    enqueue(val: T) {
        this.queue.append(val);
    }

    /**
     * Removes the item at the front of the queue and 
     * returns it.
     * @returns the value that was removed from the 
     * queue or `null` if the queue is empty
     */
    dequeue(): T | null {
        return this.queue.shift();
    }

    /**
     * Returns the value of the item at the front of the queue
     * without removing it.
     * @returns the value of the item at the beginning of the
     * queue or null if the queue is empty
     */
    peek(): T | null {
        return this.queue.get(0);
    }

    /**
     * @returns true if the queue is empty
     */
    isEmpty(): boolean {
        return this.queue.isEmpty();
    }

    /**
     * @returns an array based on the queue.
     */
    toArray(): Array<T> {
        return this.queue.toArray();
    }
}