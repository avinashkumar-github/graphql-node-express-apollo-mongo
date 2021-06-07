import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Query {
    users: [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }

  input createUserInput {
    name: String!
    email: String!
    age: Int!
  }

  input updateUserInput {
    name: String
    email: String
    age: Int
  }

  type Mutation {
    createUser(data: createUserInput!): User!
    updateUser(id: ID!, data: updateUserInput!): User!
    deleteUser(id: ID!): User!
  }
`;
