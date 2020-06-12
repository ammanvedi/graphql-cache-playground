import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient, ApolloProvider, defaultDataIdFromObject, HttpLink, InMemoryCache} from '@apollo/client';
import {CacheView} from "./component/cache-view/CacheView";
import {possibleTypes} from "./graphql/possibleTypes";
import {KeyFieldsFunction} from "@apollo/client/cache/inmemory/policies";

const dataIdFromObject: KeyFieldsFunction = (object, ctx) => {
  switch(object.__typename) {
    case "Pokedex":
      return "Pokedex";
  }

  return defaultDataIdFromObject(object, ctx)
}

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({possibleTypes, /*dataIdFromObject*/}),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
});

function App() {

  return (
    <ApolloProvider client={client}>
      <CacheView/>
    </ApolloProvider>
  );
}

export default App;
