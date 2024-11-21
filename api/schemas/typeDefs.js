const typeDefs = `#graphql
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    artCount: Int
    savedArt: [Art]
    orders: [Order]
  }

  type Art {
  id: ID!
  title: String!
  artist_titles: [String]
  description: String!
  imageUrl: String!
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
    artist_titles: [String] 
    description: String!
    imageUrl: String!
}

  type CartItem {
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
    imageUrl: String!
  }

  input CartItemInput {
    id: ID!
    name: String!
    price: Float!
    quantity: Int!
    imageUrl: String!
  }

  type CheckoutResponse {
    session: ID!
    # order: Order!
  }

  type Query {
    users: [User]    
    user(username: String!): User
    saveArt(artData: [ArtInput]!): User
    me: User
    getOrderById(id: ID!): Order
    checkout(products: [CartItemInput]!): CheckoutResponse
  
  }

  type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  removeArt(artId: ID!): User
  saveArt(artData: ArtInput!): User 
  updateUsername(newUsername: String!): User
}

`;
module.exports = typeDefs;