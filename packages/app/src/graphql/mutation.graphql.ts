import {gql} from '@apollo/client'
import {PokemonFragment} from "./fragment.graphql";

export const updatePokemonMutation = gql`
    ${PokemonFragment}
    mutation UpdatePokemon($id: ID!, $set: SetPokemonFields!) {
        updatePokemon(id: $id, set: $set) {
            ...PokemonFragment
        }
    }
`;

export const updatePokedexLastSeenMutation = gql`
    mutation UpdatePokedexLastSeen($id: ID!) {
        updatePokedexLastSeenPokemon(id: $id) {
            lastSeenPokemon {
                id
            }
        }
    }
`

export const addPokemonMutation = gql`
    ${PokemonFragment}
    mutation AddPokemon($newPokemon: CreatePokemonFields!) {
        addPokemon(pokemon: $newPokemon) {
            ...PokemonFragment
        }
    }
`