import {PokemonType, useCharactersQuery, usePokedexQuery, usePokemonQuery} from "../../graphql/types";
import {useApolloClient} from "@apollo/client";

export const CacheView = () => {
    const {data: pokedexData} = usePokedexQuery();
    const {data: pokemonData} = usePokemonQuery({variables: {type: PokemonType.Psychic}})
    const {data: charactesrData} = useCharactersQuery();
    const client = useApolloClient();

    console.log(client.cache.extract(false))

    return null
}