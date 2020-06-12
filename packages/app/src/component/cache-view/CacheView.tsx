import {
    CharactersQuery,
    PokemonType,
    useAddPokemonMutation,
    useCharactersQuery,
    usePokedexQuery,
    usePokemonQuery,
    useUpdatePokedexLastSeenMutation, useUpdatePokemonMutation,
} from '../../graphql/types'
import { useApolloClient } from '@apollo/client'
import {
    cacheToGraph,
    DirectedGraph,
    graphToForceGraph,
    Node,
    NodeType,
    PATH_DELIM,
} from './helpers'
import React, { Fragment, useEffect, useRef } from 'react'
import ForceGraph, { ForceGraphInstance } from 'force-graph'
import { charactersQuery, pokemonQuery } from '../../graphql/query.graphql'

const btnStyle = {
    marginBottom: 10
}

const NodeColors = {
    [NodeType.REF]: 'orange',
    [NodeType.CONCRETE_TYPE]: 'red',
    [NodeType.FIELD]: 'blue',
    [NodeType.OPERATION]: 'darkgreen',
    [NodeType.ROOT_QUERY]: 'pink',
    default: '#000',
}

const NodeLegend = {
    [NodeType.REF]: 'Reference Link',
    [NodeType.CONCRETE_TYPE]: 'Typed Object',
    [NodeType.FIELD]: 'Object Field',
    [NodeType.OPERATION]: 'GraphQL Operation',
    [NodeType.ROOT_QUERY]: 'ROOT Query',
}

export const CacheView = () => {
    const graphContainerEl = useRef<HTMLDivElement>(null)
    const forceGraph = useRef<ForceGraphInstance>(ForceGraph())

    const pokemonVars = { type: PokemonType.Electric }

    // const { data: pokedexData } = usePokedexQuery()
    const { data: pokemonData } = usePokemonQuery({
        variables: pokemonVars,
    })
    const [updatePokemon, {loading: updatePokemonLoading}] = useUpdatePokemonMutation({
        variables: {
            id: "3",
            set: {
                hp: 213123
            }
        }
    })
    // const { data: characterData } = useCharactersQuery()

    // const [addPokemon, { loading: addPokemonLoading }] = useAddPokemonMutation({
    //     variables: {
    //         newPokemon: {
    //             name: 'Raichu',
    //             hp: 10000,
    //             type: [PokemonType.Electric],
    //         },
    //     },
    //     update: (store, { data }) => {
    //         if (data?.addPokemon) {
    //             const currentCharacterList = store.readQuery<CharactersQuery>({
    //                 query: charactersQuery,
    //             })
    //             const newData = {
    //                 ...currentCharacterList,
    //                 characters: [
    //                     ...((currentCharacterList || {}).characters || []),
    //                     data.addPokemon,
    //                 ],
    //             }
    //             store.writeQuery({
    //                 query: charactersQuery,
    //                 data: newData,
    //             })
    //         }
    //     },
    //     refetchQueries: [{ query: pokemonQuery, variables: pokemonVars }],
    // })

    // const [
    //     updatePokedex,
    //     { loading: updatePokedexLoading },
    // ] = useUpdatePokedexLastSeenMutation({
    //     variables: { id: '3' },
    // })

    const client = useApolloClient()

    const cache = client.cache.extract(false)

    const graph: DirectedGraph = {
        nodes: new Map<string, Node>(),
        edges: [],
    }

    cacheToGraph(cache, graph, null, "", "", true)

    useEffect(() => {
        if (!forceGraph.current || !graphContainerEl.current) {
            return
        }
        const renderGraph = graphToForceGraph(graph)
        forceGraph
            .current(graphContainerEl.current)
            .backgroundColor('#000')
            .linkColor(() => '#fff')
            .linkWidth(() => 3)
            .graphData(renderGraph)
            .nodeCanvasObject((node, ctx, globalScale) => {
                if (node.x == null || node.y == null) {
                    return
                }

                // @ts-ignore
                const nodePath = node.name.split(PATH_DELIM)
                const shortName = nodePath[nodePath.length - 1]

                // @ts-ignore
                const label = shortName
                const fontSize = 15 / globalScale
                ctx.font = `bold ${fontSize}px Sans-Serif`
                const textWidth = ctx.measureText(label).width
                const bckgDimensions = [textWidth, fontSize].map(
                    n => n + fontSize * 0.2
                ) // some padding

                // @ts-ignore
                ctx.fillStyle = NodeColors[node.type] || NodeColors.default

                ctx.fillRect(
                    node.x - bckgDimensions[0] / 2,
                    node.y - bckgDimensions[1] / 2,
                    // @ts-ignore
                    ...bckgDimensions
                )

                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                // @ts-ignore
                if (node.color) {
                    // @ts-ignore
                    ctx.fillStyle = node.color
                } else {
                    // @ts-ignore
                    ctx.fillStyle = '#fff'
                }

                ctx.fillText(label, node.x, node.y)
            })
    }, [
        // pokedexData,
        pokemonData,
        updatePokemonLoading
        // characterData,
        // addPokemonLoading,
        // updatePokedexLoading,
    ])

    return (
        <Fragment>


            <div ref={graphContainerEl} />
            <ul
                style={{
                    listStyleType: 'none',
                    position: 'fixed',
                    bottom: 20,
                    left: 20,
                    color: '#fff',
                }}
            >
                {Object.keys(NodeLegend).map(type => {
                    // @ts-ignore
                    const legendName = NodeLegend[type]
                    // @ts-ignore
                    const color = NodeColors[type]

                    return (
                        <li style={{ marginBottom: 10 }}>
                            <span
                                style={{
                                    marginRight: 10,
                                    verticalAlign: 'middle',
                                    width: 20,
                                    height: 20,
                                    display: 'inline-block',
                                    backgroundColor: color,
                                }}
                            />
                            <span>{legendName}</span>
                        </li>
                    )
                })}
            </ul>
            <div
                style={{
                    listStyleType: 'none',
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    width: 300,
                    textAlign: 'right'
                }}
            >
                {/*<button style={btnStyle} onClick={() => updatePokedex()}>*/}
                {/*    Update last seen pokemon in pokedex*/}
                {/*</button>*/}
                {/*<button style={btnStyle} onClick={() => addPokemon()}>Add raichu</button>*/}
                <button style={btnStyle} onClick={() => updatePokemon()}>Update Pokemon 3</button>
            </div>
        </Fragment>
    )
}
