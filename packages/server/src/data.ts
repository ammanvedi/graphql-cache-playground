import {BallType, InventoryItem, Pokedex, Pokemon, PokemonType, PotionType, Trainer} from "./types";

const initialPokemon: Array<Pokemon> = [
    {
        __typename: "Pokemon",
        hp: 100,
        id: "1",
        name: "Dragonite",
        type: [PokemonType.Fire]
    },
    {
        __typename: "Pokemon",
        hp: 100,
        id: "2",
        name: "Lapras",
        type: [PokemonType.Water]
    },
    {
        __typename: "Pokemon",
        hp: 100,
        id: "3",
        name: "Pikachu",
        type: [PokemonType.Electric]
    },
    {
        __typename: "Pokemon",
        hp: 100,
        id: "4",
        name: "Mew",
        type: [PokemonType.Psychic]
    },
]

const initialTrainers: Array<Trainer> = [
    {
        __typename: "Trainer",
        name: "Professor Oak",
        hometown: "Pallet Town",
        id: "1",
    },
    {
        __typename: "Trainer",
        name: "Ash Ketchum",
        hometown: "Pallet Town",
        id: "2",
    },
    {
        __typename: "Trainer",
        name: "Brock",
        hometown: "Pallet Town",
        id: "3",
    },
    {
        __typename: "Trainer",
        name: "Misty",
        hometown: "Pallet Town",
        id: "4",
    }
]

const initialItems: Array<InventoryItem> = [
    {
        id: "1",
        __typename: "Pokeball",
        count: 10,
        name: "Super Master Ball",
        ballType: BallType.Master
    },
    {
        id: "2",
        __typename: "Pokeball",
        count: 5,
        name: "Regular Ball",
        ballType: BallType.Normal
    },
    {
        id: "3",
        __typename: "Potion",
        potionType: PotionType.Energy,
        name: "Awesome Energy Potion"
    },
    {
        id: "4",
        __typename: "Potion",
        potionType: PotionType.Health,
        name: "Restoration Potion"
    }
]

const initialPokedex: Pokedex = {
    __typename: "Pokedex",
    items: initialItems,
    lastSeenPokemon: initialPokemon[0],
    totalSeenPokemon: 100,
}

export const data = {
    pokedex: initialPokedex,
    pokemon: initialPokemon,
    trainers: initialTrainers,
}