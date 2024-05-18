export const userTypeDefs = `#graphql
  scalar Date

  type User {
    id: Int!
    name: String!
    email: String!
    profile: String!
    createdAt: Date!
    updatedAt: Date!
  }

  input UserInput {
    name: String!
    email: String!
    profile: String!
  }

  type Query {
    users(offset: Int, limit: Int): [User]
    user(id: Int!): User
  }

  type Mutation {
    addUser(input: UserInput!): User
    updateUser(id: Int!, input: UserInput!): User
    deleteUser(id: Int!): DeleteUserResponse
  }

  type DeleteUserResponse {
    success: Boolean!
    message: String!
    data: UserData
  }

  type UserData {
    user: User
  }
`;
