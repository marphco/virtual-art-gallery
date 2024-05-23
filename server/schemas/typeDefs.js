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
  products: [CartItem]!
}

  type Auth {
    token: ID!
    user: User
  }

  input ArtInput {
    id: ID!
    title: String!
    artist_titles: String
    description: String!
    imageUrl: String!
  }

  type CartItem {
    id: ID!
    price: Float!
    quantity: Int!
  }

  input CartItemInput {
    id: ID!
    price: Float!
    quantity: Int!
  }

  type CheckoutResponse {
    session: ID!
    # order: Order!
  }

  type Query {
    users: [User]    # Define the 'users' field to query users
    user(username: String!): User
    saveArt(artData: [ArtInput]!): User
    me: User
    getOrderById(id: ID!): Order
    # product(id: ID!): Product
  checkout(products: [CartItemInput]!): CheckoutResponse
  }

  type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeArt(artId: ID!): User
  saveArt(artData: ArtInput!): User # This is the saveArt mutation definition
}

`;
module.exports = typeDefs;