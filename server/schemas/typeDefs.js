const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    artCount: Int
    savedArt: [Art]
  }

  type Art {
    id: ID!
    title: String!
    artist_titles: String
    description: String!
    image_id: String!
  }

  type Order {
  _id: ID!
  purchaseDate: String
  products: [Artwork]!
}

  type Auth {
    token: ID!
    user: User
  }

<<<<<<< HEAD
  input ArtInput {
    id: ID!
    title: String!
    artist_titles: String
    description: String!
    imageUrl: String!
=======
  type CheckoutResponse {
    sessionId: String!
>>>>>>> 2de1f030c1b36b355679ee2c566cdab56a87c414
  }

  type Query {
    users: [User]    # Define the 'users' field to query users
    user(username: String!): User
<<<<<<< HEAD
    saveArt(artData: ArtInput!): User
    me: User
  }

  type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeArt(artId: ID!): User
  saveArt(artData: ArtInput!): User # This is the saveArt mutation definition
}
=======
    artwork: [Artwork]!
    artworkById(id: ID!): Artwork
    getOrderById(id: ID!): Order
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    deleteArtwork(id: ID!): Artwork
    checkout(products: [ID]!): CheckoutResponse
  }
`;
>>>>>>> 2de1f030c1b36b355679ee2c566cdab56a87c414

`;
module.exports = typeDefs;