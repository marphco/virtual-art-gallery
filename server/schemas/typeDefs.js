const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    
  }

  type Artwork {
  id: ID!
  title: String!
  description: String!
  imageUrl: String!

}
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    
    user(username: String!): User
    artwork(id: ID!): Artwork
    
    
    
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  
  }
`;

module.exports = typeDefs;
