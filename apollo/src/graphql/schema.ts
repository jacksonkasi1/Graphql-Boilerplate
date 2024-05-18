
import { makeExecutableSchema } from "@graphql-tools/schema";

// ** import types from modules
import { userTypeDefs } from "./modules/user/types";

import { resolvers } from "./resolvers";

const baseTypeDefs = `#graphql
  type Query
  type Mutation
`;

const typeDefs = [baseTypeDefs, userTypeDefs];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
