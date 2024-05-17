import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      
    }
  }
`;


export const GET_ARTWORK = gql`
  query GetArtwork($id: ID!) {
    artwork(id: $id) {
      id
      title
      imageUrl
      description
    }
  }
`;

import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache()
});

