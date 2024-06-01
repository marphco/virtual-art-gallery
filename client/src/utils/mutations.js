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




export const UPDATE_USERNAME = gql`
  mutation updateUsername($newUsername: String!) {
    updateUsername(newUsername: $newUsername) {
      _id
      username
    }
  }
`;

export const SAVE_ART = gql`
  mutation SaveArtwork($artData: ArtInput!) {
    saveArt(artData: $artData) {
      _id
      username
      email
      savedArt {
        id
        title
        artist_titles
        description
        imageUrl
        
      }
    }
  }
`;

export const REMOVE_ART = gql`
  mutation RemoveArtwork($artId: ID!) {
    removeArt(artId: $artId) {
      _id
      username
      email
      savedArt {
        id
        title
        artist_titles
        description
        imageUrl
      }
    }
  }
`;





// import { ApolloClient, InMemoryCache } from '@apollo/client';

// // Create a new ApolloClient instance
// const client = new ApolloClient({
//   uri: 'http://localhost:3000/graphql',
//   cache: new InMemoryCache(), });

// export default client;
