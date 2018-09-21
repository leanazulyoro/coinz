import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import fetch from 'node-fetch';
import { client as config } from 'isomorphic-config';
import { withClientState } from 'apollo-link-state';
import { defaults, resolvers } from './resolvers/index';


/* @see https://www.apollographql.com/docs/react/recipes/fragment-matching.html **/
const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);
const httpLink = new HttpLink({
  uri: `${config.services.graphql.host}${config.services.graphql.uri}`,
  fetch
});

const stateLink = withClientState({ resolvers, cache, defaults });

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, httpLink]),
  ssrMode: true,
});

export default client;
