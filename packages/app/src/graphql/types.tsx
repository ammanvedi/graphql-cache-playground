import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Node = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum PokemonType {
  Grass = 'GRASS',
  Water = 'WATER',
  Fire = 'FIRE',
  Ice = 'ICE',
  Electric = 'ELECTRIC',
  Psychic = 'PSYCHIC'
}

export type Pokemon = Node & {
  __typename?: 'Pokemon';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: Array<PokemonType>;
  hp: Scalars['Int'];
};

export type Trainer = Node & {
  __typename?: 'Trainer';
  id: Scalars['ID'];
  name: Scalars['String'];
  hometown: Scalars['String'];
};

export type Character = Pokemon | Trainer;

export enum PotionType {
  Health = 'HEALTH',
  Energy = 'ENERGY'
}

export type Potion = Node & {
  __typename?: 'Potion';
  id: Scalars['ID'];
  name: Scalars['String'];
  potionType: PotionType;
};

export enum BallType {
  Normal = 'NORMAL',
  Master = 'MASTER'
}

export type Pokeball = Node & {
  __typename?: 'Pokeball';
  id: Scalars['ID'];
  name: Scalars['String'];
  count: Scalars['Int'];
  ballType: BallType;
};

export type InventoryItem = Pokeball | Potion;

export type Pokedex = {
  __typename?: 'Pokedex';
  lastSeenPokemon?: Maybe<Pokemon>;
  totalSeenPokemon: Scalars['Int'];
  items: Array<InventoryItem>;
};

export type Query = {
  __typename?: 'Query';
  pokedex?: Maybe<Pokedex>;
  characters: Array<Character>;
  pokemon: Array<Pokemon>;
};


export type QueryPokemonArgs = {
  type?: Maybe<PokemonType>;
};

export type SetPokemonFields = {
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Array<PokemonType>>;
  hp?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updatePokemon?: Maybe<Pokemon>;
};


export type MutationUpdatePokemonArgs = {
  id: Scalars['ID'];
  set: SetPokemonFields;
};

export type PokemonFragmentFragment = (
  { __typename?: 'Pokemon' }
  & Pick<Pokemon, 'id' | 'name' | 'type' | 'hp'>
);

export type UpdatePokemonMutationVariables = Exact<{
  id: Scalars['ID'];
  set: SetPokemonFields;
}>;


export type UpdatePokemonMutation = (
  { __typename?: 'Mutation' }
  & { updatePokemon?: Maybe<(
    { __typename?: 'Pokemon' }
    & PokemonFragmentFragment
  )> }
);

export type PokemonQueryVariables = Exact<{
  type?: Maybe<PokemonType>;
}>;


export type PokemonQuery = (
  { __typename?: 'Query' }
  & { pokemon: Array<(
    { __typename?: 'Pokemon' }
    & PokemonFragmentFragment
  )> }
);

export type CharactersQueryVariables = {};


export type CharactersQuery = (
  { __typename?: 'Query' }
  & { characters: Array<(
    { __typename?: 'Pokemon' }
    & Pick<Pokemon, 'name' | 'id' | 'type' | 'hp'>
  ) | (
    { __typename?: 'Trainer' }
    & Pick<Trainer, 'name' | 'id' | 'hometown'>
  )> }
);

export type PokedexQueryVariables = {};


export type PokedexQuery = (
  { __typename?: 'Query' }
  & { pokedex?: Maybe<(
    { __typename?: 'Pokedex' }
    & Pick<Pokedex, 'totalSeenPokemon'>
    & { lastSeenPokemon?: Maybe<(
      { __typename?: 'Pokemon' }
      & PokemonFragmentFragment
    )>, items: Array<(
      { __typename?: 'Pokeball' }
      & Pick<Pokeball, 'id' | 'name' | 'count' | 'ballType'>
    ) | (
      { __typename?: 'Potion' }
      & Pick<Potion, 'id' | 'name' | 'potionType'>
    )> }
  )> }
);

export const PokemonFragmentFragmentDoc = gql`
    fragment PokemonFragment on Pokemon {
  id
  name
  type
  hp
}
    `;
export const UpdatePokemonDocument = gql`
    mutation UpdatePokemon($id: ID!, $set: SetPokemonFields!) {
  updatePokemon(id: $id, set: $set) {
    ...PokemonFragment
  }
}
    ${PokemonFragmentFragmentDoc}`;
export type UpdatePokemonMutationFn = ApolloReactCommon.MutationFunction<UpdatePokemonMutation, UpdatePokemonMutationVariables>;

/**
 * __useUpdatePokemonMutation__
 *
 * To run a mutation, you first call `useUpdatePokemonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePokemonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePokemonMutation, { data, loading, error }] = useUpdatePokemonMutation({
 *   variables: {
 *      id: // value for 'id'
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdatePokemonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePokemonMutation, UpdatePokemonMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdatePokemonMutation, UpdatePokemonMutationVariables>(UpdatePokemonDocument, baseOptions);
      }
export type UpdatePokemonMutationHookResult = ReturnType<typeof useUpdatePokemonMutation>;
export type UpdatePokemonMutationResult = ApolloReactCommon.MutationResult<UpdatePokemonMutation>;
export type UpdatePokemonMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdatePokemonMutation, UpdatePokemonMutationVariables>;
export const PokemonDocument = gql`
    query Pokemon($type: PokemonType) {
  pokemon(type: $type) {
    ...PokemonFragment
  }
}
    ${PokemonFragmentFragmentDoc}`;

/**
 * __usePokemonQuery__
 *
 * To run a query within a React component, call `usePokemonQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokemonQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokemonQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePokemonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PokemonQuery, PokemonQueryVariables>) {
        return ApolloReactHooks.useQuery<PokemonQuery, PokemonQueryVariables>(PokemonDocument, baseOptions);
      }
export function usePokemonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PokemonQuery, PokemonQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PokemonQuery, PokemonQueryVariables>(PokemonDocument, baseOptions);
        }
export type PokemonQueryHookResult = ReturnType<typeof usePokemonQuery>;
export type PokemonLazyQueryHookResult = ReturnType<typeof usePokemonLazyQuery>;
export type PokemonQueryResult = ApolloReactCommon.QueryResult<PokemonQuery, PokemonQueryVariables>;
export const CharactersDocument = gql`
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
    `;

/**
 * __useCharactersQuery__
 *
 * To run a query within a React component, call `useCharactersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCharactersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCharactersQuery({
 *   variables: {
 *   },
 * });
 */
export function useCharactersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
        return ApolloReactHooks.useQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, baseOptions);
      }
export function useCharactersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CharactersQuery, CharactersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CharactersQuery, CharactersQueryVariables>(CharactersDocument, baseOptions);
        }
export type CharactersQueryHookResult = ReturnType<typeof useCharactersQuery>;
export type CharactersLazyQueryHookResult = ReturnType<typeof useCharactersLazyQuery>;
export type CharactersQueryResult = ApolloReactCommon.QueryResult<CharactersQuery, CharactersQueryVariables>;
export const PokedexDocument = gql`
    query Pokedex {
  pokedex {
    lastSeenPokemon {
      ...PokemonFragment
    }
    totalSeenPokemon
    items {
      ... on Node {
        id
        name
      }
      ... on Pokeball {
        count
        ballType
      }
      ... on Potion {
        potionType
      }
    }
  }
}
    ${PokemonFragmentFragmentDoc}`;

/**
 * __usePokedexQuery__
 *
 * To run a query within a React component, call `usePokedexQuery` and pass it any options that fit your needs.
 * When your component renders, `usePokedexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePokedexQuery({
 *   variables: {
 *   },
 * });
 */
export function usePokedexQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PokedexQuery, PokedexQueryVariables>) {
        return ApolloReactHooks.useQuery<PokedexQuery, PokedexQueryVariables>(PokedexDocument, baseOptions);
      }
export function usePokedexLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PokedexQuery, PokedexQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PokedexQuery, PokedexQueryVariables>(PokedexDocument, baseOptions);
        }
export type PokedexQueryHookResult = ReturnType<typeof usePokedexQuery>;
export type PokedexLazyQueryHookResult = ReturnType<typeof usePokedexLazyQuery>;
export type PokedexQueryResult = ApolloReactCommon.QueryResult<PokedexQuery, PokedexQueryVariables>;