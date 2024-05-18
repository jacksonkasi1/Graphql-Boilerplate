// import { gql } from "apollo-server";

export const userTypeDefs = `#graphql
  scalar Date

  type User {
    id: ID!
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
    user(id: ID!): User
  }

  type Mutation {
    addUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }
`;
