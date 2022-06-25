import GraphVertex from "./GraphVertex";

export default class Graph<T> {
    constructor() {

    }

    addVertex(vertex: GraphVertex<T>) {

    }

    addEdge(u: GraphVertex<T>, v: GraphVertex<T>, weight: number) {

    }

    deleteVertex(vertex: GraphVertex<T>): T | null {
        return null;
    }

    deleteEdge(u: GraphVertex<T>, v: GraphVertex<T>): number {
        return 0;
    }
}