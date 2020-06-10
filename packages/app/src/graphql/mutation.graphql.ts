import {gql} from '@apollo/client'
import {PokemonFragment} from "./fragment.graphql";

export const updatePokemonMutation = gql`
    ${PokemonFragment}
    mutation UpdatePokemon($id: ID!, $set: SetPokemonFields!) {
        updatePokemon(id: $id, set: $set) {
            ...PokemonFragment
        }
    }
`