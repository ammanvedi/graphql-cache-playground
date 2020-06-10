import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {CacheView} from "./component/cache-view/CacheView";
import {possibleTypes} from "./graphql/possibleTypes";

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache({possibleTypes}),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
});

function App() {

  return (
    <ApolloProvider client={client}>
      <CacheView/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
