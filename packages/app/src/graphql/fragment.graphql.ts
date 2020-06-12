import {gql} from '@apollo/client'

export const PokemonFragment = gql`
    fragment PokemonFragment on Pokemon {
        id
        name
        type
        hp
    }
`