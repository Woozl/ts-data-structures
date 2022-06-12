import SinglyLinkedList from "../singly-linked-list/SinglyLinkedList";

/**
 * Defines a generic linked list based stack where 
 * the last item added is the first item out.
 */
export default class Stack<T> {
    private stack: SinglyLinkedList<T>;

    get length() {
        return this.stack.length;
    }
    
    constructor() {
        this.stack = new SinglyLinkedList<T>();
    }

    /**
     * Creates a `Stack` based on an `Iterable`. The first value in
     * `it` will represent the start of the Stack.
     * @param it `Iterable` to generate `Stack` from
     * @returns reference to filled `Staack` object
     */
    static from<T>(it: Iterable<T>): Stack<T> {
        let s = new Stack<T>();

        // If we consider an iterable example: [1, 2, 3]
        // the mental model would suggest 3 is the most recent
        // addition to the stack. If we were to directly convert
        // the iterable to a SinglyLinkedList, the stack operations
        // pop and push would be SinglyLinkedList operation pop and
        // append, respectively. However, SinglyLinkedList.pop() is
        // O(n). If we reverse the list, we can use prepend and unshift,
        // which are both O(1), preserving the mental model and 
        // effiency of the stack.
        s.stack = SinglyLinkedList.from(it).reverse();
        return s;
    }

    /**
     * Removes the element at the top of the stack and returns it.
     * @returns the element at the top of the stack or null if the stack is empty
     */
    pop(): T | null {
        return this.stack.shift();
    }

    /**
     * Returns the element at the top of the stack but does not remove it.
     * @returns the element at the top of the stack or null if the stack is empty
     */
    peek(): T | null {
        return this.stack.get(0);
    }
    
    /**
     * Adds a value to the stack
     * @param val value to add to the top of the stack
     */
    push(val: T) {
        this.stack.prepend(val);
    }

    /**
     * @returns true if the stack is empty
     */
    isEmpty(): boolean {
        return this.stack.isEmpty();
    }

    /**
     * @returns an array based on the queue.
     */
    toArray(): Array<T> {
        // see note in from<T>() for why `stack` is reversed
        return this.stack.reverse().toArray();
    }
}