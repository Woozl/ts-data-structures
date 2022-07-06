import UndirectedGraph from '../UndirectedGraph';

describe('UndirectedGraph', () => {
    it('should create an undirected graph', () => {
        const g = new UndirectedGraph<number>();
        expect(g).toBeInstanceOf(UndirectedGraph);
    });

    describe('addEdge', () => {
        it('should add a directed edge in both directions', () => {
            const g = new UndirectedGraph<number>();
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addEdge(1, 2);
            expect(g.getEdgeList()).toEqual([[1, 2], [2, 1]]);
            g.addEdge(3, 2);
            expect(g.getEdgeList()).toEqual([[1, 2], [2, 1], [2, 3], [3, 2]]);
        });

        it('should add the weight to both directed edges', () => {
            const g = new UndirectedGraph<number>();
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addEdge(1, 2, 10);
            expect(g.getWeight(1, 2)).toBe(10);
            expect(g.getWeight(2, 1)).toBe(10);
        });

        it('should return true if both directed edges are added', () => {
            const g = new UndirectedGraph<number>();
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            expect(g.addEdge(1, 2)).toBe(true);
        });

        it('should return false if the vertices are invalid', () => {
            const g = new UndirectedGraph<number>();
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            expect(g.addEdge(0, 2)).toBe(false);
            expect(g.addEdge(2, 4)).toBe(false);
        });
    });

    describe('deleteEdge', () => {
        it('should delete both directed edges', () => {
            const g = new UndirectedGraph<number>();
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);

            g.addEdge(1, 2);
            expect(g.getEdgeList()).toEqual([[1, 2], [2, 1]]);
            g.deleteEdge(1, 2);
            expect(g.getEdgeList()).toEqual([]);

            g.addEdge(3, 2);
            expect(g.getEdgeList()).toEqual([[2, 3], [3, 2]]);
            g.deleteEdge(2, 3); // backwards
            expect(g.getEdgeList()).toEqual([]);
        });

        it('should return true if both vertices are valid', () => {
            const g = new UndirectedGraph<number>();
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            expect(g.deleteEdge(1, 2)).toBe(false);
            g.addEdge(1, 2);
            expect(g.deleteEdge(1, 2)).toBe(true);

            expect(g.deleteEdge(2, 1)).toBe(false);
            g.addEdge(1, 2);
            expect(g.deleteEdge(2, 1)).toBe(true);
        });
    });
});