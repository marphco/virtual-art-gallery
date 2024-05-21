import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;
export const GET_FAVORITES =gql `
query GetUserFavorites($username: String!) {
  user(username: $username) {
    savedArt {
      id
      title
      artist_titles
      description
      imageUrl
    }
  }
}`





import { ApolloClient, InMemoryCache } from "@apollo/client";

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
