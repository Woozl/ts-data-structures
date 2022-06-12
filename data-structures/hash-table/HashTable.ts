import SinglyLinkedList from "../singly-linked-list/SinglyLinkedList";
import polynomialRollingHash from "./hash";

const NUM_BUCKETS = 101;
const P = 7;

/**
 * Defines a hash table using strings of lowercase letters.
 * Uses polynomial rolling string hash and singly linked list
 * chaining to handle collisions.
 */
export default class HashTable<T> {
    private buckets: Array<SinglyLinkedList<{key: string, val: T}>>;

    constructor(numBuckets=NUM_BUCKETS) {
        this.buckets = new Array(numBuckets).fill(null).map(v => new SinglyLinkedList<{key: string, val: T}>());
    }
    
    /**
     * Checks if the provided key is a valid lowercase letter string
     * @param key key string to be checked
     */
    private static checkValidKey(key: string): boolean {
        return !key.match(/[^a-z]/)
    }

    /**
     * Computes string hash
     * @param key string to be hashed
     * @returns hash value to fit in `this.buckets.length`
     */
    private hash(key: string): number {
        if(!HashTable.checkValidKey(key))
            throw new Error(`Key "${key}" is not a valid lowercase letter string`);
        else
            return polynomialRollingHash(key, P, this.buckets.length);
    }

    /**
     * Sets a key value pair.
     * @param key
     * @param value
     */
    set(key: string, value: T) {
        this.buckets[this.hash(key)].append({key: key, val: value});
    }

    /**
     * Deletes and returns a value given a key.
     * @param key key-value pair to delete
     * @returns the delete value, or null if not found
     */
    delete(key: string): T | null {
        let searchList = this.buckets[this.hash(key)];
        let searchIndex = searchList.find({ cb: val => val.key === key });
        if(searchIndex === -1) return null;
        return searchList.delete(searchIndex)!.val;
    }

    /**
     * Returns a value for a given key, or null if the 
     * key-value pair doesn't exist.
     * @param key string key to search with
     * @returns corresponding value, or null if not found
     */
    search(key: string): T | null {
        let searchList = this.buckets[this.hash(key)];
        let searchIndex = searchList.find({ cb: val => val.key === key });
        if(searchIndex === -1) return null;
        return searchList.get(searchIndex)!.val;
    }

    toArray(): Array<Array<{key: string, val: T}>> {
        let out = new Array(this.buckets.length).fill(null);
        this.buckets.forEach((ll, i) => {
            if(!ll.isEmpty()) out[i] = ll.toArray();
        });
        return out;
    }

    /**
     * @returns an array showing the number of items in each bucket.
     */
    getCollisionArray(): Array<number> {
        return this.buckets.map(ll => ll.length);
    }
}