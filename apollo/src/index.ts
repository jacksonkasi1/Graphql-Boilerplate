// ** import ApolloServer
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startServerAndCreateCloudflareWorkersHandler } from "@as-integrations/cloudflare-workers";

// ** import graphql
import { schema } from "./graphql/schema";

// ** import drizzle
import { drizzle } from "drizzle-orm/d1";

// ** import config
import { Env, Context } from "./config/env";

const server = new ApolloServer<Context>({
  schema, //  typeDefs & resolvers
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

export default {
  fetch: startServerAndCreateCloudflareWorkersHandler<Env, Context>(server, {
    context: async ({ request, env, ctx }) => {
      const db = drizzle(env.DB);
      return { db, request, env, ctx };
    },
  }),
};
