import {
    CharactersQuery,
    PokemonType,
    useAddPokemonMutation,
    useCharactersQuery,
    usePokedexQuery,
    usePokemonQuery,
    useUpdatePokedexLastSeenMutation,
} from '../../graphql/types'
import { useApolloClient } from '@apollo/client'
import { cacheToGraph, DirectedGraph, graphToForceGraph, Node } from './helpers'
import React, { Fragment, useEffect, useRef } from 'react'
import ForceGraph, { ForceGraphInstance } from 'force-graph'
import {charactersQuery, pokemonQuery} from '../../graphql/query.graphql'

export const CacheView = () => {
    const graphContainerEl = useRef<HTMLDivElement>(null)
    const forceGraph = useRef<ForceGraphInstance>(ForceGraph())

    const pokemonVars = { type: PokemonType.Electric }

    const { data: pokedexData } = usePokedexQuery()
    const { data: pokemonData } = usePokemonQuery({
        variables: pokemonVars,
    })
    const { data: characterData } = useCharactersQuery()

    const [addPokemon, { loading: addPokemonLoading }] = useAddPokemonMutation({
        variables: {
            newPokemon: {
                name: 'Raichu',
                hp: 10000,
                type: [PokemonType.Electric],
            },
        },
        update: (store, { data }) => {
            if (data?.addPokemon) {
                const currentCharacterList = store.readQuery<CharactersQuery>({
                    query: charactersQuery,
                })
                console.log(currentCharacterList)
                const newData = {
                    ...currentCharacterList,
                    characters: [
                        ...((currentCharacterList || {}).characters || []),
                        data.addPokemon,
                    ],
                }
                store.writeQuery({
                    query: charactersQuery,
                    data: newData,
                })
            }
        },
        refetchQueries: [{query: pokemonQuery, variables: pokemonVars}]
    })

    const [
        updatePokedex,
        { loading: updatePokedexLoading },
    ] = useUpdatePokedexLastSeenMutation({
        variables: { id: '3' },
    })

    const client = useApolloClient()

    const cache = client.cache.extract(false)

    console.log('c', client.cache.extract(false))

    const graph: DirectedGraph = {
        nodes: new Map<string, Node>(),
        edges: [],
    }

    cacheToGraph(cache, graph, null)

    console.log('g', graph)

    useEffect(() => {
        if (!forceGraph.current || !graphContainerEl.current) {
            return
        }
        const renderGraph = graphToForceGraph(graph)
        //console.log('rg', renderGraph)
        forceGraph
            .current(graphContainerEl.current)
            .graphData(renderGraph)
            .nodeCanvasObject((node, ctx, globalScale) => {
                if (node.x == null || node.y == null) {
                    return
                }

                // @ts-ignore
                const label = node.name as string
                const fontSize = 12 / globalScale
                ctx.font = `${fontSize}px Sans-Serif`
                const textWidth = ctx.measureText(label).width
                const bckgDimensions = [textWidth, fontSize].map(
                    n => n + fontSize * 0.2
                ) // some padding

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'

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
                    ctx.fillStyle = '#000'
                }

                ctx.fillText(label, node.x, node.y)
            })
    }, [
        pokedexData,
        pokemonData,
        characterData,
        addPokemonLoading,
        updatePokedexLoading,
    ])

    return (
        <Fragment>
            <button onClick={() => updatePokedex()}>
                Update last seen pokemon in pokedex
            </button>
            <button onClick={() => addPokemon()}>Add raichu</button>
            <div ref={graphContainerEl} />
        </Fragment>
    )
}
