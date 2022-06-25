export default class GraphVertex<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    getNeighbors(): GraphVertex<T>[] {
        return [];
    }

    isNeighborWith(vertex: GraphVertex<T>): boolean {
        return false;
    }
}