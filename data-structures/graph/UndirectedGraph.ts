import Graph from "./Graph";

export default class UndirectedGraph<T> extends Graph<T> {
    constructor() {
        super();
    }
    
    addEdge(u: T, v: T, weight = 1): boolean {
        return super.addEdge(u, v, weight) && super.addEdge(v, u, weight);
    }

    deleteEdge(u: T, v: T): boolean {
        return super.deleteEdge(u, v) && super.deleteEdge(v, u);
    }
}