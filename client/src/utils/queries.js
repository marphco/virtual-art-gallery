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
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache()
});

