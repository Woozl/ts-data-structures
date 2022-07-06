import Graph from '../Graph';

describe('Graph', () => {
    it('should create a graph', () => {
        const g = new Graph();
        expect(g).toBeInstanceOf(Graph);
    });

    it('should create a graph with generic objects', () => {
        const g = new Graph<Object>();
        const blah = {test: 'object'};
        g.addVertex(blah);
        expect(g.getVertexList()).toEqual([blah]);
    });

    let g: Graph<number>;
    beforeEach(() => g = new Graph<number>());

    describe('addVertex', () => {
        it('should add a vertex to the graph', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            expect(g.getVertexList()).toEqual([1, 2, 3]);
        });

        it('should not affect the graph when adding a vertex twice', () => {
            g.addVertex(1);
            g.addVertex(2);
            expect(g.getVertexList()).toEqual([1, 2]);
            g.addVertex(1);
            expect(g.getVertexList()).toEqual([1, 2]);
        });

        it('should work with generic objects', () => {
            const nodeA = {};
            const nodeB = {};
            const nodeC = {};
            const objGraph = new Graph<{}>();
            objGraph.addVertex(nodeA);
            objGraph.addVertex(nodeB);
            objGraph.addVertex(nodeC);
            expect(objGraph.getVertexList()).toEqual([nodeA, nodeB, nodeC]);
        });

        it('should return true if the vertex is not in the graph', () => {
            expect(g.addVertex(1)).toBe(true);
        });

        it('should return false if the vertex is already in the graph', () => {
            g.addVertex(1);
            expect(g.addVertex(1)).toBe(false);
        });
    });

    describe('addEdge', () => {
        it('should add an edge to the graph', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addEdge(1, 2);
            expect(g.getEdgeList()).toEqual([[1, 2]]);
        });

        it('should add an edge with weight to the graph', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addEdge(1, 2, 10);
            expect(g.getEdgeList()).toEqual([[1, 2]]);
            expect(g.getWeight(1, 2)).toBe(10);
        });

        it('should create a default weight of 1', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addEdge(1, 2);
            expect(g.getWeight(1, 2)).toBe(1);
        });

        it('should add multiple edges to the graph', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addVertex(4);
            g.addVertex(5);
            g.addEdge(1, 2);
            g.addEdge(1, 4);
            g.addEdge(2, 4);
            g.addEdge(2, 5);
            g.addEdge(3, 5);
            g.addEdge(4, 3);
            g.addEdge(4, 5);
            expect(g.getEdgeList()).toEqual([[1, 2], [1, 4], [2, 4], [2, 5], [3, 5], [4, 3], [4, 5]]);
        });

        it('should return false if the source vertex is not in the graph', () => {
            g.addVertex(2);
            expect(g.addEdge(1, 2)).toBe(false);
        });

        it('should return false if the destination vertex is not in the graph', () => {
            g.addVertex(1);
            expect(g.addEdge(1, 2)).toBe(false);
        });

        it('should return true if the edge can be added', () => {
            g.addVertex(1);
            g.addVertex(2);
            expect(g.addEdge(1, 2)).toBe(true);
        });

        it('should allow a vertex to add an edge to itself', () => {
            g.addVertex(1);
            expect(g.addEdge(1, 1)).toBe(true);
            expect(g.getEdgeList()).toEqual([[1, 1]]);
        });
    });

    describe('deleteVertex', () => {
        it('should delete a vertex from the graph', () => {
            g.addVertex(1);
            expect(g.getVertexList()).toEqual([1]);
            g.deleteVertex(1);
            expect(g.getVertexList()).toEqual([]);
        });

        it('should return false if the vertex is not in the graph', () => {
            expect(g.deleteVertex(1)).toBe(false);
        });

        it('should return true if the vertex exists in the graph', () => {
            g.addVertex(1);
            expect(g.deleteVertex(1)).toBe(true);
        });

        it('should not affect existing vertices if vertex does not exist', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            expect(g.getVertexList()).toEqual([1, 2, 3]);
            g.deleteVertex(4);
            expect(g.getVertexList()).toEqual([1, 2, 3]);
            g.deleteVertex(3);
            g.deleteVertex(2);
            g.deleteVertex(0);
            expect(g.getVertexList()).toEqual([1]);
        });

        it('should not affect existing edges if vertex does not exist', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addEdge(1, 3);
            g.addEdge(2, 3);
            g.addEdge(3, 1);
            g.addEdge(3, 2);
            expect(g.getEdgeList()).toEqual([[1, 3], [2, 3], [3, 1], [3, 2]]);
            g.deleteVertex(4);
            g.deleteVertex(0);
            expect(g.getEdgeList()).toEqual([[1, 3], [2, 3], [3, 1], [3, 2]]);
        });

        it('should delete references to vertex from all adjacency lists', () => {
            g.addVertex(2);
            g.addVertex(4);
            g.addVertex(6);
            g.addEdge(6, 2);
            g.addEdge(2, 4);
            g.addEdge(4, 6);
            expect(g.getEdgeList()).toEqual([[2, 4], [4, 6], [6, 2]]);
            g.deleteVertex(4);
            expect(g.getEdgeList()).toEqual([[6, 2]]);
        });

        it('should make the graph empty when the last vertex is deleted', () => {
            g.addVertex(1);
            g.addVertex(2);
            expect(g.getVertexList()).toEqual([1, 2]);
            g.deleteVertex(1);
            g.deleteVertex(2);
            expect(g.getVertexList()).toEqual([]);
        });
    });

    describe('deleteEdge', () => {
        beforeEach(() => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addVertex(4);
            g.addVertex(5);
            g.addEdge(1, 1);
            g.addEdge(1, 2);
            g.addEdge(2, 2);
            g.addEdge(2, 4);
            g.addEdge(2, 5);
            g.addEdge(3, 5);
            g.addEdge(5, 1);
            g.addEdge(5, 2);
        });

        it('should delete an edge from the graph', () => {
            expect(g.getEdgeList()).toEqual([[1, 1], [1, 2], [2, 2], [2, 4], [2, 5], [3, 5], [5, 1], [5, 2]]);
            g.deleteEdge(2, 4);
            expect(g.getEdgeList()).toEqual([[1, 1], [1, 2], [2, 2], [2, 5], [3, 5], [5, 1], [5, 2]]);
            g.deleteEdge(3, 5);
            expect(g.getEdgeList()).toEqual([[1, 1], [1, 2], [2, 2], [2, 5], [5, 1], [5, 2]]);
        });

        it('should delete an edge between the same vertex', () => {
            expect(g.getEdgeList()).toEqual([[1, 1], [1, 2], [2, 2], [2, 4], [2, 5], [3, 5], [5, 1], [5, 2]]);
            g.deleteEdge(1, 1);
            expect(g.getEdgeList()).toEqual([[1, 2], [2, 2], [2, 4], [2, 5], [3, 5], [5, 1], [5, 2]]);
            g.deleteEdge(2, 2);
            expect(g.getEdgeList()).toEqual([[1, 2], [2, 4], [2, 5], [3, 5], [5, 1], [5, 2]]);
        });

        it('should not delete an edge if the source vertex is not in the graph', () => {
            g.deleteEdge(100, 1);
            expect(g.getEdgeList()).toEqual([[1, 1], [1, 2], [2, 2], [2, 4], [2, 5], [3, 5], [5, 1], [5, 2]]);
        });

        it('should not delete an edge if the destination vertex is not in the graph', () => {
            g.deleteEdge(4, 100);
            expect(g.getEdgeList()).toEqual([[1, 1], [1, 2], [2, 2], [2, 4], [2, 5], [3, 5], [5, 1], [5, 2]]);
        });

        it('should return false if the source vertex is not in the graph', () => {
            expect(g.deleteEdge(-1, 2)).toBe(false);
        });

        it('should return false if the destination vertex is not in the graph', () => {
            expect(g.deleteEdge(3, 20)).toBe(false);
        });
        
        it('should return true if the edge was deleted', () => {
            expect(g.deleteEdge(2, 4)).toBe(true);
            expect(g.deleteEdge(2, 5)).toBe(true);
            expect(g.deleteEdge(2, 2)).toBe(true);
            expect(g.getEdgeList()).toEqual([[1, 1], [1, 2], [3, 5], [5, 1], [5, 2]]);
        });

        it('should empty the edge list if all the edges are deleted', () => {
            g.deleteEdge(2, 2);
            g.deleteEdge(1, 1);
            g.deleteEdge(5, 1);
            g.deleteEdge(2, 5);
            g.deleteEdge(1, 2);
            g.deleteEdge(5, 2);
            g.deleteEdge(3, 5);
            g.deleteEdge(2, 4);
            expect(g.getEdgeList()).toEqual([]);
        });

        it('should not affect vertices when deleting edges', () => {
            g.deleteEdge(2, 2);
            g.deleteEdge(1, 1);
            g.deleteEdge(5, 1);
            g.deleteEdge(2, 5);
            g.deleteEdge(1, 2);
            g.deleteEdge(5, 2);
            g.deleteEdge(3, 5);
            g.deleteEdge(2, 4);
            expect(g.getVertexList()).toEqual([1, 2, 3, 4, 5]);
        });
    });

    describe('getWeight', () => {
        it('should return the weight of an edge', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addEdge(1, 2, 100);
            expect(g.getWeight(1, 2)).toEqual(100);
        });

        it('should return null if the edge is not in the graph', () => {
            expect(g.getWeight(1, 2)).toBeNull();

            g.addVertex(2);
            expect(g.getWeight(1, 2)).toBeNull();
            expect(g.getWeight(2, 1)).toBeNull();
        });
    });

    describe('getNeighbors', () => {
        it('should return an array of all neighbors of a vertex', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addEdge(1, 3);
            g.addEdge(1, 2);
            g.addEdge(2, 2);
            g.addEdge(3, 1);
            expect(g.getNeighbors(1)).toEqual([3, 2]);
            expect(g.getNeighbors(2)).toEqual([2]);
            expect(g.getNeighbors(3)).toEqual([1]);
        });

        it('should return an empty array if the vertex has no neighbors', () => {
            g.addVertex(1);
            g.addVertex(2);
            expect(g.getNeighbors(1)).toEqual([]);
            g.addEdge(1, 2);
            expect(g.getNeighbors(2)).toEqual([]);
        });

        it('should return null if the vertex does not exist in the graph', () => {
            expect(g.getNeighbors(1)).toBeNull();
            g.addVertex(1);
        });
    });

    describe('getEdgeList', () => {
        it('should return an array of all edges of the graph', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addVertex(4);
            g.addEdge(1, 3);
            g.addEdge(2, 4);
            g.addEdge(3, 1);
            g.addEdge(1, 1);
            g.addEdge(1, 4);
            
            expect(g.getEdgeList()).toEqual([[1, 3], [1, 1], [1, 4], [2, 4], [3, 1]]);
        });

        it('should return an empty array if there are no edges', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addVertex(4);

            expect(g.getEdgeList()).toEqual([]);
        });
    });

    describe('getVertexList', () => {
        it('should return an array of all the vertices of the graph', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);

            expect(g.getVertexList()).toEqual([1, 2, 3]);
            
            g.addEdge(2, 3);
            g.addEdge(3, 1);
            g.addEdge(1, 2);
            
            expect(g.getVertexList()).toEqual([1, 2, 3]);
        });
        
        it('should return an empty array if there are no vertices', () => {
            expect(g.getVertexList()).toEqual([]);
        });
    });

    describe('print', () => {
        it('should pretty-print the graph', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addEdge(1, 2);
            g.addEdge(1, 3);
            g.addEdge(3, 1);

            const logSpy = jest.spyOn(console, 'log');
        
            g.print();

            expect(logSpy).toHaveBeenCalledWith(`1 → [2, 3]`);
            expect(logSpy).toHaveBeenCalledWith(`2 → null`);
            expect(logSpy).toHaveBeenCalledWith(`3 → [1]`);
        });

        it('should print the weights of the edges if specified', () => {
            g.addVertex(1);
            g.addVertex(2);
            g.addVertex(3);
            g.addEdge(1, 1, 230);
            g.addEdge(2, 1, 342);
            g.addEdge(3, 2, 135);

            const logSpy = jest.spyOn(console, 'log');
        
            g.print(true);

            expect(logSpy).toHaveBeenCalledWith(`1 → [1:230]`);
            expect(logSpy).toHaveBeenCalledWith(`2 → [1:342]`);
            expect(logSpy).toHaveBeenCalledWith(`3 → [2:135]`);
        });

        it('should not print anything if the graph is empty', () => {
            const logSpy = jest.spyOn(console, 'log');
        
            g.print();

            expect(logSpy).not.toHaveBeenCalled();
        });
    });
});