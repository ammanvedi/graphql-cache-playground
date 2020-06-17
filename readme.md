#GraphQL Cache Playground
This playground provides some examples intended to help understand the graphql cache through example and by rendering the cache as a graph.

It provides both a server and client with a GraphQL api based on fetching and updating Pokemon!

![](https://i.imgur.com/wvxiq2t.png)

# Prerequisites

### Install Lerna
`npm install -g lerna`

### Install Apollo Dev Tools
[Chrome](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

# Running the Playground

### Install Dependencies
`lerna bootstrap`

### Start Client & Server
`lerna run start`

You can access the front end at `http://localhost:3000/`

# Important Files

Take a look at the schema in 

`packages/server/src/schema.graphql`

There are six examples in this repository, each one has a branch of its own, take a look at the examples readme for more info

`/examples.mdexamples`