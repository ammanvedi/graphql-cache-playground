import { gql } from '@apollo/client'
import { PokemonFragment } from './fragment.graphql'

export const pokemonQuery = gql`
    ${PokemonFragment}
    query Pokemon($type: PokemonType) {
        pokemon(type: $type) {
            ...PokemonFragment
        }
    }
`

export const charactersQuery = gql`
    query Characters {
        characters {
            ... on Node {
                name
                id
            }
            ... on Trainer {
                hometown
            }
            ... on Pokemon {
                type
                hp
            }
        }
    }
`

export const pokedexQuery = gql`
    ${PokemonFragment}
    query Pokedex {
        pokedex {
            totalSeenPokemon
            lastSeenPokemon {
                ...PokemonFragment
            }
        }
    }
`
