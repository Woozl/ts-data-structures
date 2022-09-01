export default class DisjointSet<T> {
    private parents: Map<T, T>;
    private rank: Map<T, number>;
    
    constructor(universe: T[]) {
        this.parents = new Map<T, T>();
        this.rank = new Map<T, number>();

        for(const item of universe) {
            this.parents.set(item, item);
            this.rank.set(item, 0);
        }
    }

    find(element: T): T | null {
        if(!this.parents.has(element)) return null;
        
        let root = element;
        while(root !== this.parents.get(root)) {
            root = this.parents.get(root)!;
        }

        return root;
    }

    union(a: T, b: T): boolean {
        const aParent = this.find(a);
        const bParent = this.find(b);

        // trying to union elements that do not exist in the universe
        if(!aParent || !bParent) return false;

        // trying to union two elements already in the same set
        if(aParent === bParent) return false;

        if(this.rank.get(a)! < this.rank.get(b)!)
            this.parents.set(aParent, bParent);
        else if(this.rank.get(a)! > this.rank.get(b)!)
            this.parents.set(bParent, aParent);
        else {
            this.parents.set(bParent, aParent);
            const currentRank = this.rank.get(aParent)!;
            this.rank.set(aParent, currentRank + 1);
        }

        return true;
    }

    printParents() {
        console.log(this.parents)
    }

    printSets() {
        const map = new Map<T, T[]>();

        for(const key of this.parents.keys()) {
            const value = this.parents.get(key)!;
            if(map.has(value)) {
                map.get(value)!.push(key);
            }

            else {
                map.set(value, [key]);
            }
        }

        console.log(map);
    }
}