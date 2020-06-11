import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import {join} from 'path';
import {Pokemon, Resolvers} from "./types";
import {data} from "./data";
import {ApolloServer} from "apollo-server";
import { addResolversToSchema } from '@graphql-tools/schema';

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), { loaders: [new GraphQLFileLoader()] });

const dataStore = data;

const resolvers: Resolvers = {
    Mutation: {
        addPokemon: (parent, {pokemon}) => {
            const newPokemon: Pokemon = {
                __typename: "Pokemon",
                id: (dataStore.pokemon.length + 1).toString(),
                ...pokemon
            }

            dataStore.pokemon = [...dataStore.pokemon, newPokemon];

            return newPokemon;
        },
        updatePokedexLastSeenPokemon: (parent, {id}) => {
            const pokemon = dataStore.pokemon.find(p => p.id === id);
            if (!pokemon) {
                throw new Error(`Could not find pokemon with id ${id}`)
            }

            dataStore.pokedex.lastSeenPokemon = pokemon;

            return dataStore.pokedex;
        },
        updatePokemon: (parent, {set, id}) => {
            for(let i = 0; i < dataStore.pokemon.length; i++) {
                const p = dataStore.pokemon[i];
                if(p.id === id) {
                    if (set.name) {
                        p.name = set.name;
                    }

                    if (set.hp != null) {
                        p.hp = set.hp;
                    }

                    if (set.type) {
                        p.type = set.type;
                    }

                    return p;
                }
            }

            return null;
        }
    },
    Query: {
        characters: () => {
            return [...dataStore.pokemon, ...dataStore.trainers]
        },
        pokedex: () => dataStore.pokedex,
        pokemon: (parent, {type}) => {
            if (!type) {
                return dataStore.pokemon
            }

            return dataStore.pokemon.filter(p => p.type.includes(type))
        }
    }
}

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers: resolvers as any,
});

const server = new ApolloServer({schema: schemaWithResolvers});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Gotta catch 'em all at ${url}`);
});