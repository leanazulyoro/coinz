import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"
import client from "./apollo/apolloClient";
import { ApolloProvider } from "react-apollo";
import Routes from './routes';

hydrate(
  <ApolloProvider client={client}>
    <Router>
      <Routes />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
