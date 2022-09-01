/**
 * Defines a generic disjoint set with operations to find which set an 
 * item is in, union two sets, and add new singleton sets.
 */
export default class DisjointSet<T> {
    private parents: Map<T, T>;
    private rank: Map<T, number>;
    private _size: number;
    
    /**
     * Creates a new `DisjointSet` object with singleton sets defined by
     * an array of items `universe`.
     * @param universe items to initialize disjoint set with
     */
    constructor(universe: T[]) {
        this.parents = new Map<T, T>();
        this.rank = new Map<T, number>();
        this._size = universe.length;

        for(const item of universe) {
            this.parents.set(item, item);
            this.rank.set(item, 0);
        }
    }

    /**
     * Create a new singleton set in this disjoint set with item `element` 
     * which is the root. Set has rank 0.
     * @param element item to add to disjoint set
     * @returns `true` if set is created, `false` if the element is already
     * in the set
     */
    makeSet(element: T): boolean {
        if(this.parents.has(element)) return false;

        this.parents.set(element, element);
        this.rank.set(element, 0);
        this._size++;
        return true;
    }    

    /**
     * Finds which set an element belongs to. Returns the parent
     * of the set which can be used to compare if items are in the same
     * set. Two elements from the same set will have the same parent.
     * @param element item to search
     * @returns the parent element for the set, or `null` if the element
     * is not in the set 
     */
    find(element: T): T | null {
        if(!this.parents.has(element)) return null;
        
        let root = element;
        while(root !== this.parents.get(root)) {
            root = this.parents.get(root)!;
        }

        return root;
    }

    /**
     * Merges two sets together based on one item from each set
     * @params `a`, `b` - two items from different sets 
     * @returns `true` if the sets were merged, `false` if the items do 
     * not exist or are already in the same set.
     */
    union(a: T, b: T): boolean {
        const aParent = this.find(a);
        const bParent = this.find(b);

        // trying to union elements that do not exist in the universe
        if(!aParent || !bParent) return false;

        // trying to union two elements already in the same set
        if(aParent === bParent) return false;

        // merge the sets with the higher rank being the new parent
        if(this.rank.get(aParent)! < this.rank.get(bParent)!)
            this.parents.set(aParent, bParent);
        else if(this.rank.get(aParent)! > this.rank.get(bParent)!)
            this.parents.set(bParent, aParent);
        else {
            this.parents.set(bParent, aParent);
            // if the ranks are the same, the new group gets a higher rank
            const currentRank = this.rank.get(aParent)!;
            this.rank.set(aParent, currentRank + 1);
        }

        return true;
    }

    /**
     * @returns the number of items in the disjoint set
     */
    size() {
        return this._size;
    }

    /**
     * Prints a map describing the node each node points to. Nodes which
     * point to themselves are root nodes.
     */
    printParents() {
        DisjointSet.mapPrintHelper("Parents", this.parents);
    }

    /**
     * Returns the rank of an elements **set**.
     * @param element element of set
     * @returns rank of set or `null` if that element doesn't exist
     */
    getRank(element: T): number | null {
        const set = this.find(element);

        if(set === null) return null;

        return this.rank.get(set)!;
    }
    
    /**
     * Print the current ranks of each set. The rank represents 
     * the maximum number of jumps that must be done to find the root of
     * the set. A set with just one item (the root) has a rank of zero.  
     */
    printRanks() {
        // set parent -> rank
        const out = new Map<T, number>();

        // for all the items in the disjoint set, find the parent
        // of the set they belong to
        for(const value of this.parents.values()) {
            const parent = this.find(value)!;
            
            out.set(parent, this.rank.get(parent)!)
        }
        
        DisjointSet.mapPrintHelper("Ranks", out);
    }

    /**
     * Prints a map of all the sets. The map relates
     * parent nodes to a `Set` object containing all 
     * the nodes in that parent's set.
     * 
     * @example // Two sets with parents 6 and 4 prints
     * Map(2) { 6 => Set(3) { 1, 3, 6 }, 4 => Set(3) { 2, 4, 5 } }
     */
    printSets() {
        // parent node -> set of items
        const out = new Map<T, Set<T>>();

        // for all the items in the disjoint set, find the parent
        // of the set they belong to
        for(const [key, value] of this.parents.entries()) {
            const parent = this.find(value)!;
            
            if(out.has(parent))
                out.get(parent)!.add(key);
            else
                out.set(parent, new Set([key]));
        }
        
        DisjointSet.mapPrintHelper("Sets", out);
    }

    private static mapPrintHelper(title: string, map: Map<any, any>) {
        console.log(`${title}:`);
        for(const [key, value] of map.entries()) {
            const printVal = value instanceof Set
                ? `[ ${Array.from(value).join(', ')} ]`
                : value;

            console.log(`${key} → ${printVal}`);
        }
    }
}