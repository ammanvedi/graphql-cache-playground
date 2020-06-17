# Examples

Each example sits on its own branch so you can follow this readme step by step, make sure you are aware of what is in the schema of the api by reading

`packages/server/src/schema.graphql`

Also make sure you have apollo dev tools installed for your browser and open it

# Example 1

run `git checkout example-1`

If we take a look at this example we can see that we are making a query for the pokedex. You can see this by looking in;

`Apollo Dev Tools > Queries`

And we can see how it is stored in the cache by looking in;

`Apollo Dev Tools > Cache`

The important things to notice here are

- We dont fetch any ID's in our queries
- The cache stored the response data alongside the query that requested it `pokemon` in this case

# Example 2

run `git checkout example-2`

This is a very similar case to example 1. But this time the response is an array and the query has variables

When you look in `Apollo Dev Tools > Cache` notice how the cache key is generated as `pokemon({"type":"ELECTRIC"})`

This is how apollo will uniquley identify your queries in the cache as a combination of endpoint and variables


# Example 3

run `git checkout example-3`

This example is the same as before but we have a button in the bottom right to update pokemon "3". Pokemon 3 is pikachu, which is data we already have in the cache. so when we click this we expect pikachu to be updated.

Press it.

We now have two disconnected graphs and we also have conflicting views from our data. Because Apollo hasnt not got enough information to take our mutation response and update the data we already have in the cache, yet!

# Example 4

run `git checkout example-4`

Take note of how the query has changed now

`Apollo Dev Tools > Queries`

in our fragment we now fetch an id for the pokemon. This has also changed the representation in `Apollo Dev Tools > Cache`, now we see that the query simply references "Pokemon:3", and we have a new orange reference node in our graph

This is because if we provide an id in our data apollo can use that with the type name to deterministically generate a cache key for that data. It can then use that to look up in the cache if we already store that object and update it if we do.

You can now see if we press the button again we do not get disconnected graphs rather we get our query and mutation referencing the same object.


# Example 5

run `git checkout example-5`

Here we have a set of pokedex data that has no intrinsic id on it, so how do we do something similar to example 4 so that future updates can find thid data in the cache ? Look in 

`packages/app/src/App.tsx`

You will see there is a function commented out, un comment it. This function will allow us to override apollos default cache key generation if we want to.

So uncomment it and add it to the cache config too

`cache: new InMemoryCache({possibleTypes, dataIdFromObject})`

You can now see that we store Pokedex under its own cache key!

# Example 6

run `git checkout example-6`

This is the busiest example so far and we have a few queries

1. Characters query with fetches poklemon and trainers
2. Electric pokemon query we have seen before
3. Pokedex query

Notice in the graph how the queries for characters and electric pokemon are sharing data.

We also have a button in the bottom right to add "Raichu" an electric pokemon. When we add Raichu we need to 

1. Update the characters query with a new item
2. Update the electric pokemon query with a new item as Raichu is electric type

Take a look at

`packages/app/src/component/cache-view/CacheView.tsx`

Line 56 to see the mutation and its config

Here we use the `update` config param to update the characters list and we use `refetch` to re fetch the electric pokemon query. 

Since we dont have any way to tell the cache that these things have been updated in the mutation response we have to this time do it manually










