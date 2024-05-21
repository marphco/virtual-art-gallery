const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Artwork {
    id: Int!
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

  type CheckoutResponse {
    sessionId: String!
  }

  type Query {
    user(username: String!): User
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

module.exports = typeDefs;
