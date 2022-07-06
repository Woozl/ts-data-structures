export default class Graph<T> {
    private adjacencyTable: Map<T, Map<T, number> | null>;

    constructor() {
        this.adjacencyTable = new Map<T, Map<T, number> | null>();
    }

    addVertex(v: T): boolean {
        if(this.adjacencyTable.has(v))
            return false;

        this.adjacencyTable.set(v, null);
        return true;
    }

    addEdge(u: T, v: T, weight: number = 1): boolean {
        if(!this.adjacencyTable.has(u) || !this.adjacencyTable.has(v))
            return false;

        // if the `u` node in the adjacency map already has a corresponding
        // destination map, add `v` and `weight` to it, otherwise, create a new
        // map, then add `v` and `weight` to it.
        if(this.adjacencyTable.get(u) !== null) {
            this.adjacencyTable.get(u)!.set(v, weight);
        }
        else {
            const destinationTable = new Map<T, number>();
            this.adjacencyTable.set(u, destinationTable);
            destinationTable.set(v, weight);
        }

        return true;
    }

    deleteVertex(v: T): boolean {
        if(!this.adjacencyTable.has(v)) return false;

        this.adjacencyTable.delete(v);

        this.adjacencyTable.forEach(destinationTable => 
            destinationTable?.delete(v)
        );

        return true;
    }

    deleteEdge(u: T, v: T): boolean {
        if(!this.adjacencyTable.has(u) || !this.adjacencyTable.has(v))
            return false;

        let hadV = this.adjacencyTable.get(u)!.delete(v);

        if(this.adjacencyTable.get(u)!.size === 0)
            this.adjacencyTable.set(u, null);

        return hadV;
    }

    getWeight(u: T, v: T): number | null {
        if(!this.adjacencyTable.has(u) || !this.adjacencyTable.has(v))
            return null;

        return this.adjacencyTable.get(u)?.get(v) ?? null;
    }

    getNeighbors(v: T): T[] {
        if(!this.adjacencyTable.has(v))
            return [];

        const res: T[] = [];
        this.adjacencyTable.get(v)?.forEach((_, node) => res.push(node));
        return res;
    }

    getEdgeList(): T[][] {
        const res: T[][] = [];
        this.adjacencyTable.forEach((destTable, sourceNode) => {
            if(destTable) {
                destTable.forEach((_, targetNode) => {
                    res.push([sourceNode, targetNode]);
                });
            }
        });
        return res;
    }

    print(printWeight = false) {
        this.adjacencyTable.forEach((destTable, sourceNode) => {
            let str = `${sourceNode} → `;

            if(destTable) {
                str += '[';
                let destTableSize = destTable.size;
                destTable.forEach((weight, destNode) => {
                    --destTableSize;
                    str += destNode;
                    str += printWeight ? `:${weight}` : '';
                    str += destTableSize > 0 ? ', ' : '';
                });
                str += ']';
            }
            else {
                str += 'null';
            }

            console.log(str);
        });
    }
}