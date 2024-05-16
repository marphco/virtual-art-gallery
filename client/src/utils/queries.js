// import { gql } from '@apollo/client';

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
      
//     }
//   }
// `;
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your GraphQL server URL
  cache: new InMemoryCache()
});

// Define your GraphQL query
const GET_ART = gql`
  query GetArt {
    getArt {
      _id
      title
      description
      image
    }
  }
`;

// Send the GraphQL query using the client
client.query({
  query: GET_ART
})
.then(result => {
  console.log(result.data.getArt); // Log the fetched art data
})
.catch(error => {
  console.error('Error fetching art data:', error);
});