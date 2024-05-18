import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
} from "graphql";

import { sql } from "drizzle-orm";
import { DrizzleD1Database } from "drizzle-orm/d1";

import { tbl_users } from "@/schema";

// Define the UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    profile: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

// Define the UserInputType for mutations
const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    profile: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const createRootQuery = (db: DrizzleD1Database) =>
  new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      users: {
        type: new GraphQLList(UserType),
        args: {
          offset: { type: GraphQLInt },
          limit: { type: GraphQLInt },
        },
        resolve(parent, args) {
          return db
            .select()
            .from(tbl_users)
            .limit(args.limit)
            .offset(args.offset)
            .all();
        },
      },
    },
  });

const createMutation = (db: DrizzleD1Database) =>
  new GraphQLObjectType({
    name: "Mutation",
    fields: {
      addUser: {
        type: UserType,
        args: {
          input: { type: new GraphQLNonNull(UserInputType) },
        },
        async resolve(parent, { input }) {
          const result = await db
            .insert(tbl_users)
            .values({
              name: input.name,
              email: input.email,
              profile: input.profile,
              createdAt: sql`(strftime('%s', 'now'))`,
              updatedAt: sql`(strftime('%s', 'now'))`,
            })
            .returning()
            .get();

          return result;
        },
      },
    },
  });

// Export the function to create the schema
export const createSchema = (db: DrizzleD1Database) =>
  new GraphQLSchema({
    query: createRootQuery(db),
    mutation: createMutation(db),
  });
