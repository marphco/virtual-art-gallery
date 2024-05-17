const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    password: String
    
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    getArt: [Art]
    
    
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  
  }
`;

module.exports = typeDefs;
