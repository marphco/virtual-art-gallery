import { gql } from "@apollo/client";

// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//     }
//   }
// `;

export const GET_USER_DATA = gql`
query UserFavorites {
  me {
    _id
    username
    email
    savedArt {
      id
      title
      artist_titles
      description
      imageUrl
      # comment {
      #   id
      #   text
      # }
      
      
    }
  }
}
`;

export const QUERY_CHECKOUT= gql`
  query getCheckout($products: [CartItemInput]!) {
    checkout(products: $products) {
      session
    }
  }
`;





import { ApolloClient, InMemoryCache } from "@apollo/client";

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
