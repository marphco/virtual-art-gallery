import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_ARTWORK = gql`
  mutation deleteArtwork($id: ID!) {
    deleteArtwork(id: $id) {
      id
    }
  }
`;

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
  query {
    artwork {
      id
      title
      artist_titles
      description
      image_id
    }
  }
`;

export const GET_ARTWORK_BY_ID = gql`
  query getArtworkById($id: ID!) {
    artworkById(id: $id) {
      id
    }
  }
`;

import { ApolloClient, InMemoryCache } from '@apollo/client';

// Create a new ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

export default client;
