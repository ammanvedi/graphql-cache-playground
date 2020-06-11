import { GraphData } from 'force-graph'

type NodeID = string

export type Node = {
    id: string
    name: string
    meta: object
}

type Edge = {
    from: NodeID
    to: NodeID
}

export type DirectedGraph = {
    nodes: Map<NodeID, Node>
    edges: Array<Edge>
}

const isConcreteTypedObject = (obj: any): boolean =>
    typeof obj === 'object' && !!obj.__typename

const isReferenceObject = (obj: any): boolean =>
    typeof obj === 'object' && !!obj.__ref

const ROOT_QUERY = 'ROOT_QUERY'
const TYPE_NAME = '__typename'
const REF = '__ref'
const QUERY = 'Query';

const isLeaf = (o: any) => typeof o !== 'object'

export const deriveNodeDisplayName = (o: { [key: string]: any }, path: string): string => {
    if (o.__typename && o.id) {
        return `${o.__typename}:${o.id}`;
    }

    return path;
}

export const cacheToGraph = (
    cacheObject: { [key: string]: any },
    graph: DirectedGraph,
    parent: { [key: string]: any } | null,
    objectPath: string = '',
    parentPath: string = ''
): void => {
    const { nodes, edges } = graph;
    console.log(objectPath)

    // nodes for all concrete type objects
    // nodes for all top level queries
    if(
        cacheObject.__typename
        || parent?.__typename === QUERY
        || Array.isArray(cacheObject)
        || cacheObject.__ref
    ) {
        nodes.set(objectPath, {
            id: objectPath,
            name: deriveNodeDisplayName(cacheObject, objectPath),
            meta: cacheObject
        });
        if (parentPath) {
            edges.push({
                from: objectPath,
                to: parentPath
            })
        }
    }

    if(cacheObject.__ref) {
        edges.push({
            from: objectPath,
            to: `:${cacheObject.__ref}`
        })
    }


    Object.keys(cacheObject).forEach(key => {
        const child = cacheObject[key]
        if (!isLeaf(child)) {
            cacheToGraph(child, graph, cacheObject, `${objectPath}:${key}`, objectPath)
        }
    })
}

export const graphToForceGraph = (graph: DirectedGraph): GraphData => {
    return {
        nodes: Array.from(graph.nodes.entries()).map(([id, {name}]) => ({ id, name })),
        links: graph.edges.map(e => ({ source: e.from, target: e.to })),
    }
}
