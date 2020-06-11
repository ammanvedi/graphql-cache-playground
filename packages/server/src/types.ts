import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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

export type CreatePokemonFields = {
  name: Scalars['String'];
  type: Array<PokemonType>;
  hp: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addPokemon?: Maybe<Pokemon>;
  updatePokemon?: Maybe<Pokemon>;
  updatePokedexLastSeenPokemon?: Maybe<Pokedex>;
};


export type MutationAddPokemonArgs = {
  pokemon: CreatePokemonFields;
};


export type MutationUpdatePokemonArgs = {
  id: Scalars['ID'];
  set: SetPokemonFields;
};


export type MutationUpdatePokedexLastSeenPokemonArgs = {
  id: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Node: ResolversTypes['Pokemon'] | ResolversTypes['Trainer'] | ResolversTypes['Potion'] | ResolversTypes['Pokeball'];
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  PokemonType: PokemonType;
  Pokemon: ResolverTypeWrapper<Pokemon>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Trainer: ResolverTypeWrapper<Trainer>;
  Character: ResolversTypes['Pokemon'] | ResolversTypes['Trainer'];
  PotionType: PotionType;
  Potion: ResolverTypeWrapper<Potion>;
  BallType: BallType;
  Pokeball: ResolverTypeWrapper<Pokeball>;
  InventoryItem: ResolversTypes['Pokeball'] | ResolversTypes['Potion'];
  Pokedex: ResolverTypeWrapper<Omit<Pokedex, 'items'> & { items: Array<ResolversTypes['InventoryItem']> }>;
  Query: ResolverTypeWrapper<{}>;
  SetPokemonFields: SetPokemonFields;
  CreatePokemonFields: CreatePokemonFields;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Node: ResolversParentTypes['Pokemon'] | ResolversParentTypes['Trainer'] | ResolversParentTypes['Potion'] | ResolversParentTypes['Pokeball'];
  ID: Scalars['ID'];
  String: Scalars['String'];
  PokemonType: PokemonType;
  Pokemon: Pokemon;
  Int: Scalars['Int'];
  Trainer: Trainer;
  Character: ResolversParentTypes['Pokemon'] | ResolversParentTypes['Trainer'];
  PotionType: PotionType;
  Potion: Potion;
  BallType: BallType;
  Pokeball: Pokeball;
  InventoryItem: ResolversParentTypes['Pokeball'] | ResolversParentTypes['Potion'];
  Pokedex: Omit<Pokedex, 'items'> & { items: Array<ResolversParentTypes['InventoryItem']> };
  Query: {};
  SetPokemonFields: SetPokemonFields;
  CreatePokemonFields: CreatePokemonFields;
  Mutation: {};
  Boolean: Scalars['Boolean'];
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Pokemon' | 'Trainer' | 'Potion' | 'Pokeball', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PokemonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pokemon'] = ResolversParentTypes['Pokemon']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Array<ResolversTypes['PokemonType']>, ParentType, ContextType>;
  hp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TrainerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Trainer'] = ResolversParentTypes['Trainer']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hometown?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CharacterResolvers<ContextType = any, ParentType extends ResolversParentTypes['Character'] = ResolversParentTypes['Character']> = {
  __resolveType: TypeResolveFn<'Pokemon' | 'Trainer', ParentType, ContextType>;
};

export type PotionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Potion'] = ResolversParentTypes['Potion']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  potionType?: Resolver<ResolversTypes['PotionType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PokeballResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pokeball'] = ResolversParentTypes['Pokeball']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  ballType?: Resolver<ResolversTypes['BallType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type InventoryItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['InventoryItem'] = ResolversParentTypes['InventoryItem']> = {
  __resolveType: TypeResolveFn<'Pokeball' | 'Potion', ParentType, ContextType>;
};

export type PokedexResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pokedex'] = ResolversParentTypes['Pokedex']> = {
  lastSeenPokemon?: Resolver<Maybe<ResolversTypes['Pokemon']>, ParentType, ContextType>;
  totalSeenPokemon?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['InventoryItem']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  pokedex?: Resolver<Maybe<ResolversTypes['Pokedex']>, ParentType, ContextType>;
  characters?: Resolver<Array<ResolversTypes['Character']>, ParentType, ContextType>;
  pokemon?: Resolver<Array<ResolversTypes['Pokemon']>, ParentType, ContextType, RequireFields<QueryPokemonArgs, never>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPokemon?: Resolver<Maybe<ResolversTypes['Pokemon']>, ParentType, ContextType, RequireFields<MutationAddPokemonArgs, 'pokemon'>>;
  updatePokemon?: Resolver<Maybe<ResolversTypes['Pokemon']>, ParentType, ContextType, RequireFields<MutationUpdatePokemonArgs, 'id' | 'set'>>;
  updatePokedexLastSeenPokemon?: Resolver<Maybe<ResolversTypes['Pokedex']>, ParentType, ContextType, RequireFields<MutationUpdatePokedexLastSeenPokemonArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Node?: NodeResolvers;
  Pokemon?: PokemonResolvers<ContextType>;
  Trainer?: TrainerResolvers<ContextType>;
  Character?: CharacterResolvers;
  Potion?: PotionResolvers<ContextType>;
  Pokeball?: PokeballResolvers<ContextType>;
  InventoryItem?: InventoryItemResolvers;
  Pokedex?: PokedexResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
