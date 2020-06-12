import { GraphData } from 'force-graph'

type NodeID = string

export enum NodeType {
    ROOT_QUERY,
    OPERATION,
    CONCRETE_TYPE,
    FIELD,
    REF
}

export type Node = {
    id: string
    name: string
    type: NodeType
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

const QUERY = 'Query';
export const PATH_DELIM = '>>>'

const isLeaf = (o: any) => typeof o !== 'object'

export const deriveNodeDisplayName = (o: { [key: string]: any }, path: string): string => {
    console.log(o, path)
    if (o.__typename && o.id) {
        return `${o.__typename}:${o.id}`;
    }

    return path;
}

export const deriveNodeType = (cacheObject: { [key: string]: any }, parent: { [key: string]: any } | null): NodeType => {
    if(!parent) {
        return NodeType.ROOT_QUERY
    }

    if (parent.__typename === QUERY) {
        return NodeType.OPERATION
    }

    if (cacheObject.__typename) {
        return NodeType.CONCRETE_TYPE
    }

    if (cacheObject.__ref) {
        return NodeType.REF
    }

    return NodeType.FIELD
}

export const cacheToGraph = (
    cacheObject: { [key: string]: any },
    graph: DirectedGraph,
    parent: { [key: string]: any } | null,
    objectPath: string = '',
    parentPath: string = ''
): void => {
    const { nodes, edges } = graph;

    if(
        cacheObject.__typename
        || parent?.__typename === QUERY
        || Array.isArray(cacheObject)
        || cacheObject.__ref
    ) {
        nodes.set(objectPath, {
            id: objectPath,
            name: deriveNodeDisplayName(cacheObject, objectPath),
            meta: cacheObject,
            type: deriveNodeType(cacheObject, parent)
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
            to: `${PATH_DELIM}${cacheObject.__ref}`
        })
    }


    Object.keys(cacheObject).forEach(key => {
        const child = cacheObject[key]
        if (!isLeaf(child)) {
            cacheToGraph(child, graph, cacheObject, `${objectPath}${PATH_DELIM}${key}`, objectPath)
        }
    })
}

export const graphToForceGraph = (graph: DirectedGraph): GraphData => {
    return {
        nodes: Array.from(graph.nodes.entries()).map(([id, {name, type}]) => ({ id, name, type })),
        links: graph.edges.map(e => ({ source: e.from, target: e.to })),
    }
}
