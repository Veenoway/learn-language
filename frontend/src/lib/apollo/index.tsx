"use client";
import {
  ApolloProvider as Apollo,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }) => {
  return <Apollo client={client}>{children}</Apollo>;
};
